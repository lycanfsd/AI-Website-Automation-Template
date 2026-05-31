import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy template for PeakForm Coaching.",
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
          <p>
            This privacy policy explains how {siteConfig.businessName} may
            collect and use information submitted through this website.
          </p>
          <h2>Information we collect</h2>
          <p>
            Contact forms may collect name, phone number, email address,
            service interest, and details voluntarily shared by the visitor.
          </p>
          <h2>How information is used</h2>
          <p>
            Information is used to respond to inquiries, schedule consults,
            provide requested services, and improve the client experience.
          </p>
          <h2>Sharing</h2>
          <p>
            Information is not sold. It may be shared with service providers
            that support scheduling, CRM, analytics, email, or website hosting.
          </p>
          <h2>Client customization</h2>
          <p>
            TODO: Have legal counsel adapt this policy for the specific client,
            location, tools, analytics stack, and data retention practices.
          </p>
          <h2>Contact</h2>
          <p>
            Questions can be sent to {siteConfig.email} or by calling{" "}
            {siteConfig.phone}.
          </p>
        </div>
      </div>
    </section>
  );
}
