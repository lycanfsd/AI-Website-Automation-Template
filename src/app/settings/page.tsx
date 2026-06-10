import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin-page-header";
import { SettingsPreview } from "@/components/settings-preview";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Settings",
    description: "Customize the demo business details for a ClientFlow AI client.",
    path: "/settings",
    noIndex: true,
  }),
};

export default function SettingsPage() {
  return (
    <>
      <section className="bg-zinc-50 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <AdminPageHeader
          eyebrow="Customization"
          title="Settings and client-specific copy"
          description="Use this page as a lightweight customization center for client name, offer, contact details, and launch-specific configuration."
        />
      </section>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SettingsPreview />
        </div>
      </section>
    </>
  );
}
