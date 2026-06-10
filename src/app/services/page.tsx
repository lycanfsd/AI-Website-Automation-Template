import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";
import {
  audienceFit,
  serviceCards,
  serviceHeroStats,
  serviceProcess,
  servicesFaqs,
  serviceTrustPoints,
} from "@/lib/services-page-data";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Services",
    description: `${siteConfig.businessName} offers ${serviceCards.map((service) => service.title).join(", ")} for ${siteConfig.serviceArea.toLowerCase()}.`,
    path: "/services",
  }),
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image
          src="/images/peakform-hero.png"
          alt={`${siteConfig.businessName} coach supporting a client in a modern training studio`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/88 to-ink/45" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
          <div className="min-w-0 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-100">
              {siteConfig.businessName} services
            </p>
            <h1 className="mt-4 max-w-[21rem] text-balance text-3xl font-semibold leading-tight tracking-normal sm:max-w-3xl sm:text-6xl">
              Coaching options built around your body, schedule, and next goal.
            </h1>
            <p className="mt-5 max-w-[21rem] text-pretty text-base leading-7 text-zinc-100 sm:max-w-2xl sm:text-xl sm:leading-8">
              Start with a free consultation, then choose the right mix of
              training, nutrition, online support, and accountability for your
              real life.
            </p>
            <div className="mt-8 flex max-w-[21rem] flex-col gap-3 sm:max-w-none sm:flex-row">
              <ButtonLink href="/contact">{siteConfig.primaryCta}</ButtonLink>
              <ButtonLink href="#service-options" variant="secondary">
                Compare services
              </ButtonLink>
            </div>
          </div>

          <div className="grid max-w-[21rem] min-w-0 gap-4 self-end sm:max-w-none sm:grid-cols-3 lg:grid-cols-1">
            {serviceHeroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur"
              >
                <p className="text-3xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-zinc-200">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
          {serviceTrustPoints.map((point) => {
            const Icon = point.icon;

            return (
              <div key={point.label} className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-brand-50 text-brand-700">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <p className="text-sm font-semibold text-ink">{point.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="service-options" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Service options"
            title="Choose the support level that fits the season you are in."
            description="Compare the most common starting points, then use the free consultation to choose the plan that best matches your goals."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-6 shadow-soft"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid size-12 place-items-center rounded-lg bg-brand-50 text-brand-700">
                      <Icon aria-hidden="true" className="size-6" />
                    </div>
                    <Link
                      href="/contact"
                      aria-label={`Ask about ${service.title}`}
                      className="grid size-10 place-items-center rounded-full border border-zinc-200 text-zinc-500 transition hover:border-brand-600 hover:text-brand-700"
                    >
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    {service.description}
                  </p>
                  <p className="mt-5 rounded-lg bg-zinc-50 p-3 text-sm font-medium leading-6 text-zinc-700">
                    {service.bestFor}
                  </p>
                  <ul className="mt-5 grid gap-3 text-sm text-zinc-700">
                    {service.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2
                          aria-hidden="true"
                          className="size-4 text-brand-700"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href="/contact" variant="secondary" className="mt-6">
                    Book a consult
                  </ButtonLink>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeading
            eyebrow="Who this is for"
            title={`${siteConfig.businessName} is for people who want practical coaching, not another overwhelming plan.`}
            description="The best fit is someone who wants expert support, realistic structure, and a clear next step before committing."
          />
          {/* TODO: Replace these audience-fit bullets with the client's actual ideal customer profile. */}
          <div className="grid gap-3 sm:grid-cols-2">
            {audienceFit.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-soft"
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-brand-700"
                />
                <p className="text-sm leading-6 text-zinc-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="How it works"
            title="A simple path from interest to a plan you can actually follow."
            description="The consultation keeps the first step clear and low pressure while helping the coach recommend the right service."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {serviceProcess.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className="rounded-lg border border-zinc-200 bg-white p-5 shadow-soft"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid size-10 place-items-center rounded-lg bg-ink text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <Icon aria-hidden="true" className="size-6 text-copper-600" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions before choosing a service."
            description="Here are the details most people want to understand before booking a consultation."
          />
          {/* TODO: Review FAQs for the client's location, credentials, scope of practice, and cancellation policies. */}
          <div className="grid gap-3">
            {servicesFaqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-zinc-200 bg-white p-5 shadow-soft"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink">
                  <span className="flex items-center gap-3">
                    <HelpCircle
                      aria-hidden="true"
                      className="size-5 shrink-0 text-brand-700"
                    />
                    {faq.question}
                  </span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-6 text-zinc-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-900 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-100">
              Free consultation
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-normal sm:text-4xl">
              Not sure which service fits? Start with the consult.
            </h2>
            <p className="mt-4 text-base leading-7 text-brand-100">
              Share your goals, schedule, and training history.{" "}
              {siteConfig.businessName} will help you choose the path that makes
              the most sense before you commit.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" className="bg-white text-ink hover:bg-brand-50">
              {siteConfig.primaryCta}
            </ButtonLink>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
