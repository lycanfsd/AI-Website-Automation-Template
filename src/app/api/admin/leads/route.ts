import { NextResponse } from "next/server";
import { getAdminLeadError, fetchLeadsFromSupabase } from "@/lib/supabase-admin-leads";

export const runtime = "nodejs";

export async function GET() {
  // TODO: Replace starter password auth with role-based auth before larger client deployments.
  try {
    const leads = await fetchLeadsFromSupabase();

    return NextResponse.json({ ok: true, leads });
  } catch (error) {
    const adminError = getAdminLeadError(error);

    console.error("Admin leads fetch error", adminError.message);

    return NextResponse.json(
      {
        ok: false,
        errors: {
          form:
            adminError.status === 503
              ? "Lead dashboard storage is not configured."
              : "Unable to load leads right now.",
        },
      },
      { status: adminError.status },
    );
  }
}
