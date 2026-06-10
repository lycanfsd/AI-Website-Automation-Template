import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin-page-header";
import { ReviewResponseTool } from "@/components/review-response-tool";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Review Response Generator",
    description: "Generate on-brand responses for local business reviews.",
    path: "/review-generator",
    noIndex: true,
  }),
};

export default function ReviewResponsePage() {
  return (
    <>
      <section className="bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8">
        <AdminPageHeader
          eyebrow="AI-assisted"
          title="Review response generator"
          description="Draft polite, brand-safe replies that help local businesses respond faster while keeping the final approval human."
        />
      </section>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ReviewResponseTool />
          <p className="mt-6 text-sm leading-6 text-zinc-500">
            TODO: Review the prompt and model settings for each client before
            launch. Keep review publishing manual; do not automatically post
            generated responses to third-party platforms.
          </p>
        </div>
      </section>
    </>
  );
}
