import { NextResponse, type NextRequest } from "next/server";
import { siteConfig } from "@/config/site";
import {
  validateLeadFollowUpPayload,
  type ValidatedLeadFollowUpInput,
} from "@/lib/lead-follow-up-validation";

export const runtime = "nodejs";

type OpenAIErrorResponse = {
  error?: {
    code?: string;
    message?: string;
    type?: string;
  };
};

type OpenAITextContent = {
  text?: unknown;
};

type OpenAIOutputItem = {
  content?: unknown;
};

type OpenAIResponse = OpenAIErrorResponse & {
  output?: unknown;
  output_text?: unknown;
};

function getChannelGuidance(channel: ValidatedLeadFollowUpInput["channel"]) {
  const guidance: Record<ValidatedLeadFollowUpInput["channel"], string> = {
    email:
      "Return a polished email with a useful subject suggestion. Format exactly as: Subject: <subject> then a blank line, then the email body. Keep it under 170 words.",
    sms: "Return a short, conversational SMS under 450 characters. No subject line. Sound natural and easy to reply to.",
    "instagram-dm":
      "Return a casual but professional Instagram DM under 700 characters. No subject line. Make it feel human and approachable.",
  };

  return guidance[channel];
}

function getToneGuidance(tone: ValidatedLeadFollowUpInput["tone"]) {
  const guidance: Record<ValidatedLeadFollowUpInput["tone"], string> = {
    friendly: "friendly, warm, and approachable",
    professional: "professional, clear, and polished",
    motivational: "encouraging and grounded, without hype",
    premium: "premium, thoughtful, and high-touch",
    "short-direct": "brief, direct, and useful",
  };

  return guidance[tone];
}

function buildPrompt(input: ValidatedLeadFollowUpInput) {
  const leadName = input.leadName || "there";
  const bookingLine = siteConfig.bookingUrl
    ? `Booking URL, if useful: ${siteConfig.bookingUrl}`
    : "No booking URL is configured. Ask the lead to reply with a good time.";

  return `
Draft one reply to a new lead for ${siteConfig.businessName}, a local fitness/wellness business.

Lead name: ${leadName}
Lead goal: ${input.goal || "Not provided"}
Preferred service: ${input.preferredService}
Timeline: ${input.timeline}
Message from lead: ${input.leadMessage || "Not provided"}
Tone: ${getToneGuidance(input.tone)}
Channel: ${input.channel}
${bookingLine}

Channel requirements:
- ${getChannelGuidance(input.channel)}

Safety and quality rules:
- Sound human, helpful, and specific to the lead's inquiry.
- Encourage a consultation or quick conversation for personalized advice.
- Avoid medical advice, diagnosis, treatment instructions, or claims.
- Avoid legal advice or statements about legal responsibility.
- Avoid guaranteed fitness, health, pain relief, weight-loss, or body-composition outcomes.
- Do not promise unrealistic timelines or results.
- Do not invent details, staff names, prices, availability, or services not provided.
- Do not mention that you are an AI.
- Return only the message draft.
`.trim();
}

function extractResponseText(data: OpenAIResponse) {
  if (typeof data.output_text === "string") {
    return data.output_text.trim();
  }

  if (!Array.isArray(data.output)) {
    return "";
  }

  return data.output
    .flatMap((item) => {
      const outputItem = item as OpenAIOutputItem;

      if (!Array.isArray(outputItem.content)) {
        return [];
      }

      return outputItem.content
        .map((content: OpenAITextContent) =>
          typeof content.text === "string" ? content.text : "",
        )
        .filter(Boolean);
    })
    .join("\n")
    .trim();
}

function getSafeOpenAIError(data: OpenAIErrorResponse) {
  if (data.error?.code || data.error?.type) {
    return {
      code: data.error.code,
      type: data.error.type,
    };
  }

  return undefined;
}

export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Submit valid lead details before generating a follow-up." },
      { status: 400 },
    );
  }

  const validation = validateLeadFollowUpPayload(payload);

  if (!validation.ok) {
    return NextResponse.json(
      {
        error: "Please fix the follow-up form and try again.",
        fieldErrors: validation.fieldErrors,
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "OpenAI is not configured yet. Add OPENAI_API_KEY on the server to generate AI follow-ups.",
      },
      { status: 503 },
    );
  }

  const model =
    process.env.OPENAI_FOLLOW_UP_MODEL?.trim() ||
    process.env.OPENAI_REVIEW_MODEL?.trim() ||
    "gpt-5.4-mini";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        instructions:
          "You write concise, human lead follow-up drafts for local fitness and wellness businesses. Follow channel formatting and safety rules exactly.",
        input: buildPrompt(validation.data),
        max_output_tokens: validation.data.channel === "email" ? 230 : 130,
        temperature: 0.55,
        store: false,
      }),
      signal: controller.signal,
    });

    const data = (await response.json().catch(() => ({}))) as OpenAIResponse;

    if (!response.ok) {
      console.error("OpenAI lead follow-up request failed", {
        status: response.status,
        error: getSafeOpenAIError(data),
      });

      if (response.status === 429) {
        return NextResponse.json(
          {
            error:
              "OpenAI rate limit reached. Wait a moment and try generating again.",
          },
          { status: 429 },
        );
      }

      return NextResponse.json(
        {
          error:
            "OpenAI could not generate a follow-up right now. Please try again.",
        },
        { status: 502 },
      );
    }

    const draft = extractResponseText(data);

    if (!draft) {
      console.error("OpenAI lead follow-up returned no draft text", {
        model,
      });
      return NextResponse.json(
        {
          error:
            "OpenAI returned an empty draft. Please try again with more lead context.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ draft });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        {
          error:
            "OpenAI took too long to respond. Please try again in a moment.",
        },
        { status: 504 },
      );
    }

    console.error("OpenAI lead follow-up request error", {
      name: error instanceof Error ? error.name : "UnknownError",
    });

    return NextResponse.json(
      {
        error:
          "The lead follow-up generator could not connect to OpenAI. Please try again.",
      },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
