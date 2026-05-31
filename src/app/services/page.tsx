import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Services",
  description: "PeakForm Coaching service offerings and ClientFlow AI template sections.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Services"
            title="Premium wellness services with a booking flow built to convert."
            description="Use these blocks as client-ready placeholders, then tailor service names, benefits, and intake questions for each local business."
          />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="rounded-lg border border-zinc-200 bg-white p-6 shadow-soft"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="grid size-12 place-items-center rounded-lg bg-brand-50 text-brand-700">
                    <Icon aria-hidden="true" className="size-6" />
                  </div>
                  <ArrowRight aria-hidden="true" className="size-5 text-zinc-300" />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-ink">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {service.description}
                </p>
                <ul className="mt-5 grid gap-3 text-sm text-zinc-700">
                  {["Goal review", "Personalized next step", "Simple consult CTA"].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2
                          aria-hidden="true"
                          className="size-4 text-brand-700"
                        />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow="Process"
            title="A clear journey from curious visitor to booked lead."
            description="Every service page should make the next action obvious and reduce friction for mobile visitors."
          />
          <div className="grid gap-4">
            {[
              "Lead chooses the service that best matches their goal.",
              "The booking page captures contact details, goals, and preferred timeline.",
              "The admin dashboard helps the business prioritize and follow up quickly.",
              "Review and follow-up tools support consistent, on-brand communication.",
            ].map((step, index) => (
              <div
                key={step}
                className="flex gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-5"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-ink text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-zinc-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl">
          <ButtonLink href="/contact">Start with a consult</ButtonLink>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
