import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { sendLeadEmails } from "@/lib/lead-email";
import { validateLeadSubmission } from "@/lib/lead-validation";
import { isRequestBodyTooLarge } from "@/lib/request-limits";
import { getLeadStorageError, saveLeadToSupabase } from "@/lib/supabase-leads";

export const runtime = "nodejs";
const maxLeadRequestBytes = 12_000;

export async function POST(request: Request) {
  let body: unknown;

  if (isRequestBodyTooLarge(request, maxLeadRequestBytes)) {
    return NextResponse.json(
      {
        ok: false,
        errors: { form: "Submission is too large. Please shorten your message." },
      },
      { status: 413 },
    );
  }

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { form: "Invalid submission format." } },
      { status: 400 },
    );
  }

  const validation = validateLeadSubmission(body);

  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, errors: validation.errors },
      { status: 400 },
    );
  }

  if (validation.isSpam) {
    return NextResponse.json({
      ok: true,
      message: "Thanks. Your request has been received.",
    });
  }

  try {
    const result = await saveLeadToSupabase(validation.data);

    if (!result.duplicate) {
      try {
        await sendLeadEmails({
          lead: validation.data,
          submittedAt: result.lead.created_at,
          leadId: result.lead.id,
        });
      } catch (emailError) {
        const message =
          emailError instanceof Error ? emailError.message : "Unknown email error";
        console.error("Lead email notification failed after save", message);
      }
    }

    return NextResponse.json({
      ok: true,
      duplicate: result.duplicate,
      message: result.duplicate
        ? "Thanks. Your consultation request has already been received."
        : `Thanks. Your consultation request has been received, and ${siteConfig.businessName} will follow up soon.`,
    });
  } catch (error) {
    const storageError = getLeadStorageError(error);

    console.error("Lead storage error", {
      status: storageError.status,
      message: storageError.logMessage,
    });

    return NextResponse.json(
      {
        ok: false,
        errors: {
          form:
            storageError.status === 503
              ? "Lead storage is not configured yet. Please contact the business directly."
              : "We could not save your request right now. Please try again or contact us directly.",
        },
      },
      { status: storageError.status },
    );
  }
}
