import type { Metadata } from "next";
import { LeadFollowUpTool } from "@/components/lead-follow-up-tool";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Lead Follow-up Generator",
  description: "Generate quick SMS and email follow-up drafts for new leads.",
};

export default function LeadFollowUpPage() {
  return (
    <>
      <section className="bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="AI-assisted"
            title="Lead follow-up generator"
            description="Create fast, useful response drafts for new inquiries, missed calls, post-consult next steps, and inactive leads."
          />
        </div>
      </section>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <LeadFollowUpTool />
          <p className="mt-6 text-sm leading-6 text-zinc-500">
            TODO: Pull real lead context from the CRM and log sent messages back
            to the client record.
          </p>
        </div>
      </section>
    </>
  );
}
