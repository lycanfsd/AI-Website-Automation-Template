import { NextResponse } from "next/server";
import {
  adminLeadNotesMaxCharacters,
  isLeadStatus,
  type LeadStatus,
} from "@/lib/admin-leads";
import { isRequestBodyTooLarge } from "@/lib/request-limits";
import {
  getAdminLeadError,
  updateLeadInSupabase,
} from "@/lib/supabase-admin-leads";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export const runtime = "nodejs";
const maxAdminLeadUpdateBytes = 6_000;
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

export async function PATCH(request: Request, context: RouteContext) {
  // TODO: Replace starter password auth with role-based auth before larger client deployments.
  const { id } = await context.params;
  let body: unknown;

  if (!uuidPattern.test(id)) {
    return NextResponse.json(
      { ok: false, errors: { form: "Invalid lead identifier." } },
      { status: 400 },
    );
  }

  if (isRequestBodyTooLarge(request, maxAdminLeadUpdateBytes)) {
    return NextResponse.json(
      { ok: false, errors: { form: "Lead update is too large." } },
      { status: 413 },
    );
  }

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { form: "Invalid update format." } },
      { status: 400 },
    );
  }

  const values = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const status = typeof values.status === "string" ? values.status : undefined;
  const notes = typeof values.notes === "string" ? values.notes : undefined;
  let statusUpdate: LeadStatus | undefined;

  if (status) {
    if (!isLeadStatus(status)) {
      return NextResponse.json(
        { ok: false, errors: { status: "Choose a valid lead status." } },
        { status: 400 },
      );
    }

    statusUpdate = status;
  }

  if (notes && notes.length > adminLeadNotesMaxCharacters) {
    return NextResponse.json(
      {
        ok: false,
        errors: {
          notes: `Notes must be ${adminLeadNotesMaxCharacters.toLocaleString()} characters or fewer.`,
        },
      },
      { status: 400 },
    );
  }

  try {
    const lead = await updateLeadInSupabase(id, {
      status: statusUpdate,
      notes,
    });

    return NextResponse.json({ ok: true, lead });
  } catch (error) {
    const adminError = getAdminLeadError(error);

    console.error("Admin lead update error", {
      status: adminError.status,
      message: adminError.logMessage,
    });

    return NextResponse.json(
      {
        ok: false,
        errors: {
          form:
            adminError.status === 503
              ? "Lead dashboard storage is not configured."
              : "Unable to update this lead right now.",
        },
      },
      { status: adminError.status },
    );
  }
}
