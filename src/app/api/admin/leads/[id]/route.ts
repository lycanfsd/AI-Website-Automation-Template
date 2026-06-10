import { NextResponse } from "next/server";
import { isLeadStatus, type LeadStatus } from "@/lib/admin-leads";
import {
  getAdminLeadError,
  updateLeadInSupabase,
} from "@/lib/supabase-admin-leads";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export const runtime = "nodejs";

export async function PATCH(request: Request, context: RouteContext) {
  // TODO: Replace starter password auth with role-based auth before larger client deployments.
  const { id } = await context.params;
  let body: unknown;

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

  try {
    const lead = await updateLeadInSupabase(id, {
      status: statusUpdate,
      notes,
    });

    return NextResponse.json({ ok: true, lead });
  } catch (error) {
    const adminError = getAdminLeadError(error);

    console.error("Admin lead update error", adminError.message);

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
