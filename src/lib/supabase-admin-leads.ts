import {
  isLeadStatus,
  type LeadRecord,
  type LeadStatus,
} from "@/lib/admin-leads";

type UpdateLeadInput = {
  status?: LeadStatus;
  notes?: string;
};

class SupabaseAdminLeadError extends Error {
  constructor(
    message: string,
    public status = 500,
    public exposeToClient = false,
  ) {
    super(message);
  }
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new SupabaseAdminLeadError(
      "Lead dashboard is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on the server.",
      503,
      true,
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

async function readErrorMessage(response: Response) {
  try {
    const payload = (await response.json()) as { message?: string; details?: string };
    return payload.message || payload.details || response.statusText;
  } catch {
    return response.statusText;
  }
}

function normalizeLeadRow(row: LeadRecord): LeadRecord {
  return {
    ...row,
    status: isLeadStatus(row.status) ? row.status : "new",
  };
}

export async function fetchLeadsFromSupabase() {
  const { url, serviceRoleKey } = getSupabaseConfig();
  const search = new URLSearchParams({
    select:
      "id,created_at,full_name,email,phone,preferred_service,primary_goal,timeline,message,source_page,status,notes",
    order: "created_at.desc",
    limit: "250",
  });

  const response = await fetch(`${url}/rest/v1/leads?${search.toString()}`, {
    method: "GET",
    headers: getSupabaseHeaders(serviceRoleKey),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new SupabaseAdminLeadError(
      await readErrorMessage(response),
      response.status,
    );
  }

  const rows = (await response.json()) as LeadRecord[];
  return rows.map(normalizeLeadRow);
}

export async function updateLeadInSupabase(id: string, input: UpdateLeadInput) {
  const { url, serviceRoleKey } = getSupabaseConfig();
  const updates: Partial<Pick<LeadRecord, "status" | "notes">> = {};

  if (input.status) {
    updates.status = input.status;
  }

  if (typeof input.notes === "string") {
    updates.notes = input.notes.trim() || null;
  }

  if (Object.keys(updates).length === 0) {
    throw new SupabaseAdminLeadError("No lead updates were provided.", 400);
  }

  const search = new URLSearchParams({
    id: `eq.${id}`,
    select:
      "id,created_at,full_name,email,phone,preferred_service,primary_goal,timeline,message,source_page,status,notes",
  });

  const response = await fetch(`${url}/rest/v1/leads?${search.toString()}`, {
    method: "PATCH",
    headers: {
      ...getSupabaseHeaders(serviceRoleKey),
      Prefer: "return=representation",
    },
    body: JSON.stringify(updates),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new SupabaseAdminLeadError(
      await readErrorMessage(response),
      response.status,
    );
  }

  const rows = (await response.json()) as LeadRecord[];
  const lead = rows[0];

  if (!lead) {
    throw new SupabaseAdminLeadError("Lead not found.", 404);
  }

  return normalizeLeadRow(lead);
}

export function getAdminLeadError(error: unknown) {
  if (error instanceof SupabaseAdminLeadError) {
    return {
      status: error.status,
      message: error.exposeToClient
        ? error.message
        : "Unable to load leads right now.",
      logMessage: error.message,
    };
  }

  return {
    status: 500,
    message: "Unable to load leads right now.",
    logMessage:
      error instanceof Error
        ? `${error.name}: ${error.message}`
        : "Unknown admin lead error.",
  };
}
