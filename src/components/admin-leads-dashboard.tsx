"use client";

import {
  AlertCircle,
  Inbox,
  LoaderCircle,
  RefreshCw,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { LeadDetailDrawer } from "@/components/lead-detail-drawer";
import { LeadStatusBadge } from "@/components/lead-status-badge";
import {
  formatLeadDate,
  leadStatusLabels,
  leadStatuses,
  type LeadRecord,
  type LeadStatus,
} from "@/lib/admin-leads";
import { cx } from "@/lib/utils";

type LeadsApiResponse = {
  ok: boolean;
  leads?: LeadRecord[];
  lead?: LeadRecord;
  errors?: {
    form?: string;
  };
};

type StatusFilter = "all" | LeadStatus;

export function AdminLeadsDashboard() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [drawerError, setDrawerError] = useState("");

  async function loadLeads() {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/leads", {
        cache: "no-store",
      });
      const payload = (await response.json()) as LeadsApiResponse;

      if (!response.ok || !payload.ok || !payload.leads) {
        setError(payload.errors?.form || "Unable to load leads right now.");
        return;
      }

      setLeads(payload.leads);
    } catch {
      setError("Unable to load leads right now.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;
      const matchesSearch =
        query.length === 0 ||
        [
          lead.full_name,
          lead.email,
          lead.phone,
          lead.primary_goal,
          lead.preferred_service,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [leads, searchQuery, statusFilter]);

  const statusCounts = useMemo(() => {
    return leads.reduce<Record<LeadStatus, number>>(
      (counts, lead) => ({
        ...counts,
        [lead.status]: counts[lead.status] + 1,
      }),
      {
        new: 0,
        contacted: 0,
        booked: 0,
        closed: 0,
        lost: 0,
      },
    );
  }, [leads]);

  async function updateLead(
    leadId: string,
    updates: { status: LeadStatus; notes: string },
  ) {
    setIsSaving(true);
    setDrawerError("");

    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const payload = (await response.json()) as LeadsApiResponse;

      if (!response.ok || !payload.ok || !payload.lead) {
        setDrawerError(payload.errors?.form || "Unable to update this lead.");
        return;
      }

      setLeads((current) =>
        current.map((lead) => (lead.id === payload.lead?.id ? payload.lead : lead)),
      );
      setSelectedLead(payload.lead);
    } catch {
      setDrawerError("Unable to update this lead.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="grid min-w-0 gap-6">
      <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {leadStatuses.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status)}
            className={cx(
              "rounded-lg border p-4 text-left shadow-soft transition",
              statusFilter === status
                ? "border-brand-600 bg-brand-50"
                : "border-zinc-200 bg-white hover:border-brand-600",
            )}
          >
            <p className="text-sm font-medium text-zinc-500">
              {leadStatusLabels[status]}
            </p>
            <p className="mt-2 text-2xl font-semibold text-ink">
              {statusCounts[status]}
            </p>
          </button>
        ))}
      </div>

      <div className="min-w-0 rounded-lg border border-zinc-200 bg-white p-4 shadow-soft">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="flex min-h-11 min-w-0 items-center gap-3 rounded-lg border border-zinc-300 px-3 lg:w-96">
            <Search aria-hidden="true" className="size-4 text-zinc-400" />
            <span className="sr-only">Search leads</span>
            <input
              className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-zinc-400"
              placeholder="Search name, email, phone, or goal"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>

          <div className="flex min-w-0 flex-wrap gap-2">
            <FilterButton
              active={statusFilter === "all"}
              label={`All (${leads.length})`}
              onClick={() => setStatusFilter("all")}
            />
            {leadStatuses.map((status) => (
              <FilterButton
                key={status}
                active={statusFilter === status}
                label={leadStatusLabels[status]}
                onClick={() => setStatusFilter(status)}
              />
            ))}
            <button
              type="button"
              onClick={() => void loadLeads()}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-zinc-300 px-4 text-sm font-semibold text-ink transition hover:border-brand-600"
            >
              <RefreshCw aria-hidden="true" className="size-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <StateMessage
          icon="loading"
          title="Loading leads"
          description="Fetching the latest submissions from Supabase."
        />
      ) : null}

      {!isLoading && error ? (
        <StateMessage
          icon="error"
          title="Unable to load leads"
          description={error}
        />
      ) : null}

      {!isLoading && !error && filteredLeads.length === 0 ? (
        <StateMessage
          icon="empty"
          title="No leads found"
          description="Try changing the filter or search, or submit a test lead from the contact page."
        />
      ) : null}

      {!isLoading && !error && filteredLeads.length > 0 ? (
        <>
          <div className="hidden overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-soft lg:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 text-xs uppercase tracking-[0.12em] text-zinc-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Lead</th>
                  <th className="px-5 py-4 font-semibold">Service</th>
                  <th className="px-5 py-4 font-semibold">Timeline</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Created</th>
                  <th className="px-5 py-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="px-5 py-5">
                      <p className="font-semibold text-ink">{lead.full_name}</p>
                      <p className="mt-1 text-zinc-500">{lead.email}</p>
                      <p className="mt-1 text-zinc-500">{lead.phone}</p>
                    </td>
                    <td className="px-5 py-5 text-zinc-700">
                      {lead.preferred_service}
                    </td>
                    <td className="px-5 py-5 text-zinc-700">{lead.timeline}</td>
                    <td className="px-5 py-5">
                      <LeadStatusBadge status={lead.status} />
                    </td>
                    <td className="px-5 py-5 text-zinc-700">
                      {formatLeadDate(lead.created_at)}
                    </td>
                    <td className="px-5 py-5">
                      <button
                        type="button"
                        onClick={() => setSelectedLead(lead)}
                        className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand-600"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 lg:hidden">
            {filteredLeads.map((lead) => (
              <article
                key={lead.id}
                className="rounded-lg border border-zinc-200 bg-white p-5 shadow-soft"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-ink">{lead.full_name}</h2>
                    <p className="mt-1 text-sm text-zinc-500">{lead.email}</p>
                  </div>
                  <LeadStatusBadge status={lead.status} />
                </div>
                <p className="mt-4 text-sm font-medium text-zinc-700">
                  {lead.preferred_service}
                </p>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600">
                  {lead.primary_goal}
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-zinc-500">
                  <span>{lead.timeline}</span>
                  <span>{formatLeadDate(lead.created_at)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLead(lead)}
                  className="mt-5 inline-flex min-h-10 w-full items-center justify-center rounded-full border border-zinc-300 px-4 text-sm font-semibold text-ink"
                >
                  View details
                </button>
              </article>
            ))}
          </div>
        </>
      ) : null}

      <LeadDetailDrawer
        lead={selectedLead}
        isSaving={isSaving}
        error={drawerError}
        onClose={() => {
          setSelectedLead(null);
          setDrawerError("");
        }}
        onSave={updateLead}
      />
    </div>
  );
}

function FilterButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "min-h-10 rounded-full px-4 text-sm font-semibold transition",
        active
          ? "bg-brand-600 text-white"
          : "border border-zinc-300 text-ink hover:border-brand-600",
      )}
    >
      {label}
    </button>
  );
}

function StateMessage({
  icon,
  title,
  description,
}: {
  icon: "loading" | "error" | "empty";
  title: string;
  description: string;
}) {
  const Icon =
    icon === "loading" ? LoaderCircle : icon === "error" ? AlertCircle : Inbox;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center shadow-soft">
      <Icon
        aria-hidden="true"
        className={cx(
          "mx-auto size-8",
          icon === "loading" && "animate-spin text-brand-700",
          icon === "error" && "text-red-600",
          icon === "empty" && "text-zinc-400",
        )}
      />
      <h2 className="mt-4 text-xl font-semibold text-ink">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-600">
        {description}
      </p>
    </div>
  );
}
