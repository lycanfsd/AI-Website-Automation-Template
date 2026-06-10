import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Privacy Policy",
    description: `Privacy policy template for ${siteConfig.businessName}, including lead form data, follow-up, and third-party service providers.`,
    path: "/privacy",
  }),
};

export default function PrivacyPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-copper-600">
          Legal
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink">
          Privacy policy
        </h1>
        <div className="legal-copy mt-8">
          {/* TODO: Have qualified counsel review this privacy policy for each client's location, tools, data retention, and regulated service requirements. */}
          <p>
            This privacy policy is a starter template for {siteConfig.businessName}.
            It explains how information submitted through this website may be
            collected and used. It is not legal advice and should be reviewed
            and customized before the website is launched for a real business.
          </p>
          <h2>Information we collect</h2>
          <p>
            When someone submits a lead form, consultation request, or contact
            form, the business may collect information such as full name, email
            address, phone number, preferred service, primary goal, timeline,
            message details, source page, submission date, lead status, and
            internal notes added by the business team.
          </p>
          <h2>How information is used</h2>
          <p>
            The business may use submitted information to respond to inquiries,
            schedule consultations, answer questions, provide requested
            information, organize leads, improve follow-up, and manage customer
            communications.
          </p>
          <h2>Email and phone follow-up</h2>
          <p>
            By submitting a form, visitors agree that the business may contact
            them about their inquiry by email, phone call, text message, or
            another contact method they provided. Visitors can ask the business
            to stop non-essential follow-up at any time.
          </p>
          <h2>Third-party services</h2>
          <p>
            The business may use third-party services to operate this website
            and respond to leads. These may include website hosting, database or
            CRM tools, email delivery providers, analytics tools, spam
            prevention, scheduling tools, and AI providers used to create draft
            messages for the business owner to review.
          </p>
          <h2>AI-assisted drafts</h2>
          <p>
            AI tools in this template are used only to generate draft review
            responses or lead follow-up messages. Drafts should be reviewed and
            edited by the business owner before being sent or posted. Sensitive
            personal, medical, financial, or legal details should not be entered
            unless the client has reviewed the tool setup and privacy
            requirements for their business.
          </p>
          <h2>No sale of personal information</h2>
          <p>
            This template is intended for business lead capture and follow-up.
            The business should not sell lead form information. The client
            should customize this section if their actual data practices,
            advertising tools, or legal obligations require more specific
            disclosures.
          </p>
          <h2>Template review required</h2>
          <p>
            This page is not a final privacy policy for every business. The
            client should update it to match their actual services, location,
            technology providers, data retention practices, analytics tools,
            advertising tools, and consent requirements.
          </p>
          <h2>Contact</h2>
          <p>
            Privacy questions can be sent to {siteConfig.email} or asked by
            calling {siteConfig.phone}.
          </p>
        </div>
      </div>
    </section>
  );
}
