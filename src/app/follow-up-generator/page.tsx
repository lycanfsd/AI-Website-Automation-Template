import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin-page-header";
import { LeadFollowUpTool } from "@/components/lead-follow-up-tool";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Lead Follow-up Generator",
    description: "Generate professional email, SMS, and DM replies for new leads.",
    path: "/follow-up-generator",
    noIndex: true,
  }),
};

export default function LeadFollowUpPage() {
  return (
    <>
      <section className="bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8">
        <AdminPageHeader
          eyebrow="AI-assisted"
          title="Lead follow-up generator"
          description="Create fast, useful reply drafts for new lead inquiries based on their goals, timeline, service interest, and message."
        />
      </section>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <LeadFollowUpTool />
          <p className="mt-6 text-sm leading-6 text-zinc-500">
            TODO: Pull real lead context from the CRM and log owner-approved
            messages back to the lead record. Keep sending manual unless a
            client explicitly approves a messaging integration. Confirm legal,
            medical, privacy, and regulated-service language with the client
            before use.
          </p>
        </div>
      </section>
    </>
  );
}
