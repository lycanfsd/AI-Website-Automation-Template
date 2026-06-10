import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Terms and Disclaimer",
    description: `Terms and wellness disclaimer for ${siteConfig.businessName}. Review this page with counsel before client launch.`,
    path: "/terms",
  }),
};

export default function TermsPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-copper-600">
          Legal
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink">
          Terms and disclaimer
        </h1>
        <div className="legal-copy mt-8">
          <p>
            By using this website, visitors agree to use the information and
            booking tools responsibly and understand that final service terms
            are confirmed directly with {siteConfig.businessName}.
          </p>
          <h2>No medical advice</h2>
          <p>
            Content on this website is for general wellness and business
            information only. It is not medical advice, diagnosis, or treatment.
            Visitors should consult a qualified healthcare professional before
            starting a fitness, nutrition, recovery, or wellness program.
          </p>
          <h2>Results vary</h2>
          <p>
            Testimonials, reviews, or service descriptions do not guarantee
            specific outcomes. Results depend on individual goals, consistency,
            health status, and other factors.
          </p>
          <h2>AI-assisted tools</h2>
          <p>
            Draft responses and follow-up messages should be reviewed by a human
            before sending. The business remains responsible for accuracy,
            compliance, and customer communications.
          </p>
          <h2>Client customization</h2>
          <p>
            TODO: Have legal counsel adapt these terms for the specific client,
            state requirements, licensed services, cancellation policies, and
            payment terms.
          </p>
        </div>
      </div>
    </section>
  );
}
