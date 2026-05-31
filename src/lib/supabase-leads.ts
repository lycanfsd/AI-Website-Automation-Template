import type { ValidLeadSubmission } from "@/lib/lead-validation";

type LeadStatus = "new";

type SupabaseLeadInsert = {
  full_name: string;
  email: string;
  phone: string;
  preferred_service: string;
  primary_goal: string;
  timeline: string;
  message: string | null;
  source_page: string;
  status: LeadStatus;
  notes: string | null;
};

type SupabaseLeadRow = SupabaseLeadInsert & {
  id: string;
  created_at: string;
};

type SaveLeadResult = {
  duplicate: boolean;
  lead: Pick<SupabaseLeadRow, "id" | "created_at">;
};

class SupabaseLeadError extends Error {
  constructor(
    message: string,
    public status = 500,
  ) {
    super(message);
  }
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new SupabaseLeadError(
      "Lead storage is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on the server.",
      503,
    );
  }

  return { url, serviceRoleKey };
}

function getSupabaseHeaders(serviceRoleKey: string) {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

function toSupabaseLead(input: ValidLeadSubmission): SupabaseLeadInsert {
  return {
    full_name: input.fullName,
    email: input.email,
    phone: input.phone,
    preferred_service: input.preferredService,
    primary_goal: input.primaryGoal,
    timeline: input.timelineToStart,
    message: input.message || null,
    source_page: input.sourcePage || "contact",
    status: "new",
    notes: null,
  };
}

async function readErrorMessage(response: Response) {
  try {
    const payload = (await response.json()) as { message?: string; details?: string };
    return payload.message || payload.details || response.statusText;
  } catch {
    return response.statusText;
  }
}

async function findRecentDuplicate(lead: SupabaseLeadInsert) {
  const { url, serviceRoleKey } = getSupabaseConfig();
  const search = new URLSearchParams({
    select: "id,created_at",
    email: `eq.${lead.email}`,
    phone: `eq.${lead.phone}`,
    preferred_service: `eq.${lead.preferred_service}`,
    created_at: `gte.${new Date(Date.now() - 90_000).toISOString()}`,
    order: "created_at.desc",
    limit: "1",
  });

  const response = await fetch(`${url}/rest/v1/leads?${search.toString()}`, {
    method: "GET",
    headers: getSupabaseHeaders(serviceRoleKey),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new SupabaseLeadError(await readErrorMessage(response), response.status);
  }

  const rows = (await response.json()) as Array<Pick<SupabaseLeadRow, "id" | "created_at">>;
  return rows[0];
}

export async function saveLeadToSupabase(
  input: ValidLeadSubmission,
): Promise<SaveLeadResult> {
  const lead = toSupabaseLead(input);
  const duplicate = await findRecentDuplicate(lead);

  if (duplicate) {
    return { duplicate: true, lead: duplicate };
  }

  const { url, serviceRoleKey } = getSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/leads`, {
    method: "POST",
    headers: {
      ...getSupabaseHeaders(serviceRoleKey),
      Prefer: "return=representation",
    },
    body: JSON.stringify(lead),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new SupabaseLeadError(await readErrorMessage(response), response.status);
  }

  const rows = (await response.json()) as Array<SupabaseLeadRow>;
  const savedLead = rows[0];

  if (!savedLead) {
    throw new SupabaseLeadError("Supabase did not return the saved lead.");
  }

  return {
    duplicate: false,
    lead: {
      id: savedLead.id,
      created_at: savedLead.created_at,
    },
  };
}

export function getLeadStorageError(error: unknown) {
  if (error instanceof SupabaseLeadError) {
    return {
      status: error.status,
      message: error.message,
    };
  }

  return {
    status: 500,
    message: "Unable to save the lead right now.",
  };
}
