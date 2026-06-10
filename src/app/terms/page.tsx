import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Terms and Disclaimer",
    description: `Plain-English terms and disclaimer template for ${siteConfig.businessName}, including AI draft, medical, legal, and results disclaimers.`,
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
          {/* TODO: Have qualified counsel customize these terms for the client's actual services, jurisdiction, credentials, payment terms, cancellation policy, and compliance obligations. */}
          <p>
            These terms are a starter template for {siteConfig.businessName}.
            They are written in plain English for a general business lead
            capture website and should not be treated as final legal advice.
            Each client should customize and review this page before launch.
          </p>
          <h2>Use of this website</h2>
          <p>
            Visitors may use this website to learn about the business, review
            available services, and submit an inquiry or consultation request.
            Final service details, pricing, scheduling, availability, payment
            terms, cancellation policies, and client agreements are confirmed
            directly with {siteConfig.businessName}.
          </p>
          <h2>No guaranteed leads or sales</h2>
          <p>
            This website template and its lead capture tools do not guarantee
            any number of leads, bookings, sales, reviews, revenue, or business
            outcomes. Results depend on the client&apos;s market, offer,
            reputation, traffic, follow-up, operations, and many other factors.
          </p>
          <h2>No medical advice</h2>
          <p>
            Content on this website is for general wellness and business
            information only. It is not medical advice, diagnosis, or treatment.
            Visitors should consult a qualified healthcare professional for
            medical concerns and before starting or changing a fitness,
            nutrition, recovery, physical therapy, chiropractic, aesthetic, or
            wellness program when appropriate.
          </p>
          <h2>No legal advice</h2>
          <p>
            Website content, AI-generated drafts, privacy language, terms, and
            disclaimers are not legal advice. Business owners should work with
            qualified counsel to confirm that policies, claims, consent
            language, and customer communications match their actual business
            and local requirements.
          </p>
          <h2>No guaranteed health or fitness results</h2>
          <p>
            Testimonials, reviews, service descriptions, and marketing copy do
            not guarantee weight loss, strength gains, pain relief, recovery,
            aesthetic outcomes, health improvements, or any other specific
            result. Individual outcomes vary based on personal history,
            consistency, health status, provider guidance, and other factors.
          </p>
          <h2>AI-assisted tools</h2>
          <p>
            AI-generated review responses and lead follow-up messages are draft
            suggestions only. They are not automatically sent, posted, or
            published by this template. The business owner is responsible for
            reviewing, editing, approving, and deciding whether to use any draft
            before sending or posting it.
          </p>
          <h2>Accuracy and customer communications</h2>
          <p>
            The business owner is responsible for making sure customer
            communications are accurate, appropriate, compliant, and consistent
            with the business&apos;s real services, credentials, availability,
            pricing, policies, and scope of practice. AI drafts should not be
            used to make medical claims, legal claims, guaranteed outcome
            promises, or statements the business cannot support.
          </p>
          <h2>Client customization</h2>
          <p>
            This page should be customized for the client&apos;s actual
            business, location, licensed services, credentials, payment terms,
            cancellation policies, privacy practices, AI usage, and regulatory
            requirements before launch.
          </p>
        </div>
      </div>
    </section>
  );
}
