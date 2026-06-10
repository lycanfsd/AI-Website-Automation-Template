"use client";

import { LoaderCircle, Mail, Phone, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  adminLeadNotesMaxCharacters,
  formatLeadDate,
  leadStatusOptions,
  type LeadRecord,
  type LeadStatus,
} from "@/lib/admin-leads";
import { LeadStatusBadge } from "@/components/lead-status-badge";

type LeadDetailDrawerProps = {
  lead: LeadRecord | null;
  isSaving: boolean;
  error?: string;
  onClose: () => void;
  onSave: (leadId: string, updates: { status: LeadStatus; notes: string }) => void;
};

export function LeadDetailDrawer({
  lead,
  isSaving,
  error,
  onClose,
  onSave,
}: LeadDetailDrawerProps) {
  const [status, setStatus] = useState<LeadStatus>("new");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (lead) {
      setStatus(lead.status);
      setNotes(lead.notes || "");
    }
  }, [lead]);

  if (!lead) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-ink/50 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-6">
      <button
        type="button"
        aria-label="Close lead details"
        className="absolute inset-0 size-full cursor-default"
        onClick={onClose}
      />
      <aside
        aria-labelledby="lead-detail-title"
        aria-modal="true"
        role="dialog"
        className="relative ml-auto flex h-full w-full max-w-xl flex-col overflow-hidden rounded-lg bg-white shadow-soft"
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 p-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-copper-600">
              Lead details
            </p>
            <h2
              id="lead-detail-title"
              className="mt-2 text-2xl font-semibold text-ink"
            >
              {lead.full_name}
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Created {formatLeadDate(lead.created_at)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-11 shrink-0 place-items-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:bg-zinc-50 hover:text-ink"
            aria-label="Close"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <div className="grid flex-1 gap-6 overflow-y-auto p-5">
          <div className="flex flex-wrap items-center gap-3">
            <LeadStatusBadge status={lead.status} />
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
              {lead.source_page}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={`mailto:${lead.email}`}
              className="flex min-w-0 items-center gap-3 rounded-lg border border-zinc-200 p-4 text-sm font-medium text-zinc-700 hover:border-brand-600"
            >
              <Mail aria-hidden="true" className="size-4 shrink-0 text-brand-700" />
              <span className="min-w-0 break-all">{lead.email}</span>
            </a>
            <a
              href={`tel:${lead.phone}`}
              className="flex min-w-0 items-center gap-3 rounded-lg border border-zinc-200 p-4 text-sm font-medium text-zinc-700 hover:border-brand-600"
            >
              <Phone aria-hidden="true" className="size-4 shrink-0 text-brand-700" />
              <span className="min-w-0 break-words">{lead.phone}</span>
            </a>
          </div>

          <div className="grid gap-4 rounded-lg bg-zinc-50 p-4">
            <DetailRow label="Preferred service" value={lead.preferred_service} />
            <DetailRow label="Timeline" value={lead.timeline} />
            <DetailRow label="Primary goal" value={lead.primary_goal} />
            <DetailRow
              label="Message"
              value={lead.message || "No extra message provided."}
            />
          </div>

          <div className="grid gap-4">
            <label className="grid gap-2 text-sm font-medium text-ink">
              Status
              <select
                className="min-h-11 rounded-lg border border-zinc-300 bg-white px-3 text-sm text-ink outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-100"
                value={status}
                onChange={(event) => setStatus(event.target.value as LeadStatus)}
              >
                {leadStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-ink">
              Internal notes
              <textarea
                className="min-h-32 rounded-lg border border-zinc-300 bg-white px-3 py-3 text-sm text-ink outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-100"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Add follow-up notes, owner context, or next steps."
                maxLength={adminLeadNotesMaxCharacters}
              />
              <span className="text-xs font-normal text-zinc-500">
                {notes.trim().length}/{adminLeadNotesMaxCharacters}
              </span>
            </label>

            {error ? (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {error}
              </p>
            ) : null}
          </div>
        </div>

        <div className="border-t border-zinc-200 p-5">
          <button
            type="button"
            disabled={isSaving}
            onClick={() => onSave(lead.id, { status, notes })}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSaving ? (
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
            ) : (
              <Save aria-hidden="true" className="size-4" />
            )}
            {isSaving ? "Saving..." : "Save lead updates"}
          </button>
        </div>
      </aside>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
        {label}
      </p>
      <p className="mt-1 break-words text-sm leading-6 text-zinc-800">{value}</p>
    </div>
  );
}
