import { NextResponse, type NextRequest } from "next/server";
import {
  validateReviewResponsePayload,
  type ValidatedReviewResponseInput,
} from "@/lib/review-response-validation";
import { isRequestBodyTooLarge } from "@/lib/request-limits";

export const runtime = "nodejs";
const maxReviewRequestBytes = 8_000;

type OpenAIErrorResponse = {
  error?: {
    code?: string;
    message?: string;
    type?: string;
  };
};

type OpenAITextContent = {
  text?: unknown;
  type?: unknown;
};

type OpenAIOutputItem = {
  content?: unknown;
};

type OpenAIResponse = OpenAIErrorResponse & {
  output?: unknown;
  output_text?: unknown;
};

function getBusinessTypeLabel(type: ValidatedReviewResponseInput["businessType"]) {
  const labels: Record<ValidatedReviewResponseInput["businessType"], string> = {
    "personal-trainer": "personal trainer",
    gym: "gym",
    "med-spa": "med spa",
    chiropractor: "chiropractor",
    "physical-therapy": "physical therapy clinic",
    "yoga-pilates": "yoga or Pilates studio",
    "nutrition-coach": "nutrition coach",
    other: "local fitness or wellness business",
  };

  return labels[type];
}

function getRatingGuidance(rating: ValidatedReviewResponseInput["rating"]) {
  if (rating === "5") {
    return "For a 5-star review, be warm, grateful, and lightly personalized to the review.";
  }

  if (rating === "3" || rating === "4") {
    return "For a 3-4 star review, be appreciative, acknowledge the feedback, and invite the customer to return or reconnect.";
  }

  return "For a 1-2 star review, be apologetic and calm, do not argue, do not admit legal liability or fault, and ask them to contact the business directly to discuss details offline.";
}

function buildPrompt(input: ValidatedReviewResponseInput) {
  const businessName = input.businessName || "the business";

  return `
Draft one concise public review response for a ${getBusinessTypeLabel(input.businessType)}.

Business name: ${businessName}
Star rating: ${input.rating}
Requested tone: ${input.tone}
Customer review:
${input.review}

Rules:
- ${getRatingGuidance(input.rating)}
- Keep the response business-appropriate, concise, and ready for the owner to edit.
- Do not invent facts, customer details, services, outcomes, or staff names.
- Do not make medical claims, diagnoses, or treatment claims.
- Do not provide legal advice or make statements about legal responsibility.
- Do not promise specific weight loss, pain relief, health outcomes, or guaranteed results.
- For negative or sensitive reviews, encourage moving the conversation offline.
- Do not mention that you are an AI.
- Return only the response draft, with no heading, bullets, notes, or disclaimer.
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

  if (isRequestBodyTooLarge(request, maxReviewRequestBytes)) {
    return NextResponse.json(
      { error: "Review request is too large. Please shorten the review text." },
      { status: 413 },
    );
  }

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Submit valid review details before generating a response." },
      { status: 400 },
    );
  }

  const validation = validateReviewResponsePayload(payload);

  if (!validation.ok) {
    return NextResponse.json(
      {
        error: "Please fix the review response form and try again.",
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
          "OpenAI is not configured yet. Add OPENAI_API_KEY on the server to generate AI drafts.",
      },
      { status: 503 },
    );
  }

  const model = process.env.OPENAI_REVIEW_MODEL?.trim() || "gpt-5.4-mini";
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
          "You write concise, careful public review responses for local fitness and wellness businesses. Follow all safety and factuality rules exactly.",
        input: buildPrompt(validation.data),
        max_output_tokens: 180,
        temperature: 0.4,
        store: false,
      }),
      signal: controller.signal,
    });

    const data = (await response.json().catch(() => ({}))) as OpenAIResponse;

    if (!response.ok) {
      console.error("OpenAI review response request failed", {
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
            "OpenAI could not generate a response right now. Please try again.",
        },
        { status: 502 },
      );
    }

    const draft = extractResponseText(data);

    if (!draft) {
      console.error("OpenAI review response returned no draft text", {
        model,
      });
      return NextResponse.json(
        {
          error:
            "OpenAI returned an empty draft. Please try again with more review context.",
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

    console.error("OpenAI review response request error", {
      name: error instanceof Error ? error.name : "UnknownError",
    });

    return NextResponse.json(
      {
        error:
          "The review response generator could not connect to OpenAI. Please try again.",
      },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
