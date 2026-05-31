import type { Metadata } from "next";
import { ReviewResponseTool } from "@/components/review-response-tool";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Review Response Generator",
  description: "Generate on-brand responses for local business reviews.",
};

export default function ReviewResponsePage() {
  return (
    <>
      <section className="bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="AI-assisted"
            title="Review response generator"
            description="Draft polite, brand-safe replies that help local businesses respond faster while keeping the final approval human."
          />
        </div>
      </section>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ReviewResponseTool />
          <p className="mt-6 text-sm leading-6 text-zinc-500">
            TODO: Connect this tool to a live AI provider and review platform API
            when a client needs automated drafting from real review data.
          </p>
        </div>
      </section>
    </>
  );
}
