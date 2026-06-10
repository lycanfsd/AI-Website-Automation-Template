import type { Metadata } from "next";
import { AdminLeadsDashboard } from "@/components/admin-leads-dashboard";
import { AdminPageHeader } from "@/components/admin-page-header";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Lead Dashboard",
    description: "Admin dashboard for reviewing and managing submitted leads.",
    path: "/dashboard",
    noIndex: true,
  }),
};

export default function LeadsDashboardPage() {
  return (
    <>
      <section className="bg-zinc-50 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <AdminPageHeader
          eyebrow="Admin"
          title="Lead dashboard"
          description="Review submitted leads, update status, and keep internal notes for follow-up."
        />
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AdminLeadsDashboard />
        </div>
      </section>
    </>
  );
}
