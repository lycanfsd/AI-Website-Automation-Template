import type { Metadata } from "next";
import { CalendarCheck, Clock3, Filter, Search } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { StatusBadge } from "@/components/status-badge";
import { demoLeads, leadStats } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Lead Dashboard",
  description: "Admin dashboard for reviewing and prioritizing leads.",
};

export default function LeadsDashboardPage() {
  return (
    <>
      <section className="bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Admin"
            title="Lead dashboard"
            description="A simple operator view for tracking inquiries, urgency, booking status, and next-step notes."
          />
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {leadStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-zinc-200 bg-white p-5 shadow-soft"
              >
                <p className="text-sm text-zinc-500">{stat.label}</p>
                <p className="mt-3 text-3xl font-semibold text-ink">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-brand-700">
                  {stat.helper}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-soft md:flex-row md:items-center md:justify-between">
            <div className="flex min-h-11 items-center gap-3 rounded-lg border border-zinc-300 px-3 md:w-96">
              <Search aria-hidden="true" className="size-4 text-zinc-400" />
              <span className="text-sm text-zinc-500">Search leads</span>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex min-h-10 items-center gap-2 rounded-full border border-zinc-300 px-4 text-sm font-semibold text-ink">
                <Filter aria-hidden="true" className="size-4" />
                Filter
              </button>
              <button className="inline-flex min-h-10 items-center gap-2 rounded-full bg-brand-600 px-4 text-sm font-semibold text-white">
                <CalendarCheck aria-hidden="true" className="size-4" />
                Booked
              </button>
            </div>
          </div>

          <div className="mt-6 hidden overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-soft lg:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 text-xs uppercase tracking-[0.12em] text-zinc-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Lead</th>
                  <th className="px-5 py-4 font-semibold">Service</th>
                  <th className="px-5 py-4 font-semibold">Source</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Urgency</th>
                  <th className="px-5 py-4 font-semibold">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {demoLeads.map((lead) => (
                  <tr key={lead.name}>
                    <td className="px-5 py-5">
                      <p className="font-semibold text-ink">{lead.name}</p>
                      <p className="mt-1 text-zinc-500">{lead.notes}</p>
                    </td>
                    <td className="px-5 py-5 text-zinc-700">{lead.service}</td>
                    <td className="px-5 py-5 text-zinc-700">{lead.source}</td>
                    <td className="px-5 py-5">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-5 py-5 text-zinc-700">{lead.urgency}</td>
                    <td className="px-5 py-5 text-zinc-700">{lead.received}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid gap-4 lg:hidden">
            {demoLeads.map((lead) => (
              <article
                key={lead.name}
                className="rounded-lg border border-zinc-200 bg-white p-5 shadow-soft"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-ink">{lead.name}</h2>
                    <p className="mt-1 text-sm text-zinc-500">{lead.service}</p>
                  </div>
                  <StatusBadge status={lead.status} />
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-700">{lead.notes}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-zinc-500">
                  <span>{lead.source}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 aria-hidden="true" className="size-3" />
                    {lead.received}
                  </span>
                  <span>{lead.urgency} urgency</span>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-sm leading-6 text-zinc-500">
            TODO: Add authentication, database-backed leads, CRM sync, and status
            mutations before using this dashboard in production.
          </p>
        </div>
      </section>
    </>
  );
}
