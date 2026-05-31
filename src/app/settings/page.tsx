import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { SettingsPreview } from "@/components/settings-preview";

export const metadata: Metadata = {
  title: "Settings",
  description: "Customize the demo business details for a ClientFlow AI client.",
};

export default function SettingsPage() {
  return (
    <>
      <section className="bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Customization"
            title="Settings and client-specific copy"
            description="Use this page as a lightweight customization center for client name, offer, contact details, and launch-specific configuration."
          />
        </div>
      </section>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SettingsPreview />
        </div>
      </section>
    </>
  );
}
