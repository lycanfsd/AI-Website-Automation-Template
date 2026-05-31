import type { Metadata } from "next";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { BookingForm } from "@/components/booking-form";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact and Booking",
  description: "Book a free consult with PeakForm Coaching.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Booking"
            title="Tell us what you want to improve. We will help you choose the first step."
            description={siteConfig.offer}
          />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-2xl font-semibold text-ink">Contact details</h2>
            <div className="mt-6 grid gap-4">
              {[
                { label: siteConfig.phone, href: `tel:${siteConfig.phone}`, icon: Phone },
                { label: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail },
                { label: siteConfig.address, href: "#", icon: MapPin },
                { label: siteConfig.hours, href: "#", icon: Clock3 },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-4 text-sm font-medium text-zinc-700 shadow-soft"
                  >
                    <span className="grid size-10 place-items-center rounded-lg bg-brand-50 text-brand-700">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    {item.label}
                  </a>
                );
              })}
            </div>
            {/* TODO: Replace demo contact details, office hours, and service area for each client launch. */}
            <p className="mt-6 text-sm leading-6 text-zinc-600">
              New inquiries are reviewed by the PeakForm team and answered with
              the best next step for your goals.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-soft sm:p-6">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
}
