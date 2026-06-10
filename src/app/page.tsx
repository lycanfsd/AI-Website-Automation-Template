import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  MapPin,
  MessageSquareText,
  Phone,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";
import { BookingForm } from "@/components/booking-form";
import { ButtonLink } from "@/components/button-link";
import { LocalBusinessJsonLd } from "@/components/local-business-json-ld";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/config/site";
import { services } from "@/lib/demo-data";
import {
  aiReputationBenefits,
  benefits,
  consultationSteps,
  conversionHighlights,
  faqs,
  localProof,
  problemSolution,
  testimonials,
  trustIndicators,
} from "@/lib/homepage-data";

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image
          src="/images/peakform-hero.png"
          alt={`${siteConfig.businessName} coach guiding a client through movement in a modern wellness studio serving ${siteConfig.location}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/84 to-ink/18" />
        <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1fr_0.74fr] lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-100">
              <MapPin aria-hidden="true" className="size-4" />
              {siteConfig.serviceArea}
            </p>
            <h1 className="max-w-[21rem] text-balance text-3xl font-semibold leading-tight tracking-normal sm:max-w-3xl sm:text-6xl lg:text-7xl">
              Feel stronger, move better, and know exactly what to do next.
            </h1>
            <p className="mt-5 max-w-[21rem] text-pretty text-base leading-7 text-zinc-100 sm:max-w-[34rem] sm:text-xl sm:leading-8">
              {siteConfig.businessName} helps {siteConfig.serviceArea.toLowerCase()}{" "}
              adults build practical strength, improve mobility, and stay
              consistent with a clear plan from a real local coach.
            </p>
            <div className="mt-8 flex max-w-[21rem] flex-col gap-3 sm:max-w-none sm:flex-row">
              <ButtonLink href="/contact" className="w-full sm:w-auto">
                {siteConfig.primaryCta}
              </ButtonLink>
              <ButtonLink
                href="#book-consult"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Ask for plan options
              </ButtonLink>
            </div>
            <div className="mt-8 grid gap-3 text-sm text-zinc-100 sm:grid-cols-3">
              {trustIndicators.map((item) => {
                const Icon = item.icon;

                return (
                  <p key={item.label} className="flex items-center gap-2">
                    <Icon aria-hidden="true" className="size-4 text-brand-100" />
                    {item.label}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="hidden rounded-lg border border-white/15 bg-white/10 p-5 shadow-soft backdrop-blur md:block">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-100">
              New client consult
            </p>
            <div className="mt-5 grid gap-4">
              {conversionHighlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-white text-brand-700">
                    <CheckCircle2 aria-hidden="true" className="size-5" />
                  </span>
                  <p className="text-sm font-semibold text-white">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-white p-4 text-ink">
              <p className="text-sm font-semibold">
                New inquiry workflow
              </p>
              <p className="mt-2 text-3xl font-semibold">3 steps</p>
              <p className="text-sm text-zinc-600">
                capture the lead, review the goal, follow up fast
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {localProof.map((point) => (
            <div key={point} className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
                <CheckCircle2 aria-hidden="true" className="size-5" />
              </span>
              <p className="text-sm font-semibold text-ink">{point}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeading
            eyebrow="Problem and solution"
            title="Most people do not need more fitness noise. They need a coach who can make the first step obvious."
            description="If you have been putting off training because every option feels too intense, too vague, or too hard to sustain, the consult is built to make the next decision easier."
          />
          <div className="grid gap-4">
            {problemSolution.map((item) => (
              <article
                key={item.problem}
                className="rounded-lg border border-zinc-200 bg-zinc-50 p-5"
              >
                <p className="text-sm font-semibold text-copper-600">Problem</p>
                <h3 className="mt-2 text-lg font-semibold text-ink">
                  {item.problem}
                </h3>
                <p className="mt-4 flex gap-3 text-sm leading-6 text-zinc-700">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-brand-700"
                  />
                  {item.solution}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="border-y border-zinc-200 bg-zinc-50 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Services"
            title="Focused coaching options for strength, mobility, and sustainable routines."
            description="Each offer is designed to start with a conversation, not a one-size-fits-all package."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 5).map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="rounded-lg border border-zinc-200 bg-white p-5 shadow-soft"
                >
                  <div className="grid size-11 place-items-center rounded-lg bg-brand-50 text-brand-700">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {service.description}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-semibold text-brand-700"
                  >
                    Ask about this service
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Benefits"
            title="A premium experience should feel personal before, during, and after the consult."
            description={`${siteConfig.businessName} is positioned around practical outcomes a local client can feel, not vague promises.`}
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="rounded-lg border border-zinc-200 bg-white p-5 shadow-soft"
                >
                  <Icon aria-hidden="true" className="size-6 text-copper-600" />
                  <h3 className="mt-5 text-lg font-semibold text-ink">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-ink px-4 py-14 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="How consultations work"
              title="From first inquiry to first plan in three clear steps."
              description="A low-pressure process helps visitors feel safe booking the first conversation."
              tone="light"
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/contact"
                className="w-full bg-white text-ink hover:bg-brand-50 sm:w-auto"
              >
                Schedule the free consult
              </ButtonLink>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Phone aria-hidden="true" className="size-4" />
                Call {siteConfig.phone}
              </a>
            </div>
          </div>
          <div className="grid gap-4">
            {consultationSteps.map((step, index) => (
              <article
                key={step.title}
                className="flex gap-4 rounded-lg border border-white/15 bg-white/10 p-5"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-sm font-semibold text-ink">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-200">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Reviews"
            title="People book when the business feels trusted before they walk in."
            description="Replace these demo reviews with real client testimonials, Google reviews, or short case studies."
          />
          {/* TODO: Replace demo testimonials with approved client reviews and attribution. */}
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="rounded-lg border border-zinc-200 bg-white p-6 shadow-soft"
              >
                <Quote aria-hidden="true" className="size-7 text-brand-700" />
                <p className="mt-5 text-base leading-7 text-zinc-700">
                  {testimonial.quote}
                </p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-ink">{testimonial.name}</p>
                    <p className="text-sm text-zinc-500">{testimonial.detail}</p>
                  </div>
                  <div className="flex text-copper-500" aria-label="5 star review">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        aria-hidden="true"
                        className="size-4 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeading
            eyebrow="Follow-up and reputation"
            title="Behind the scenes, every inquiry and review gets handled faster."
            description={`${siteConfig.businessName} uses ClientFlow AI to keep communication timely, organized, and personal while the team stays in control of each conversation.`}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {aiReputationBenefits.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-lg border border-zinc-200 bg-white p-5 shadow-soft"
                >
                  <Icon aria-hidden="true" className="size-6 text-brand-700" />
                  <h3 className="mt-5 text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions local leads ask before booking."
            description="Keep answers concrete, short, and specific to the client business."
          />
          {/* TODO: Customize FAQs around the client's policies, credentials, location, and service constraints. */}
          <div className="grid gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-zinc-200 bg-white p-5 shadow-soft"
              >
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink">
                  {faq.question}
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-6 text-zinc-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="book-consult" className="bg-brand-900 px-4 py-14 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-100">
              <Sparkles aria-hidden="true" className="size-4" />
              Start here
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-normal sm:text-5xl">
              {siteConfig.primaryCta} and leave with a realistic first step.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-brand-100">
              Share your goal, preferred schedule, and the type of support you
              are considering. {siteConfig.businessName} will follow up with
              available consult times and the best next step for your situation.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-brand-100 sm:grid-cols-2">
              <p className="flex items-center gap-2">
                <CalendarCheck aria-hidden="true" className="size-4" />
                {siteConfig.offer}
              </p>
              <p className="flex items-center gap-2">
                <MessageSquareText aria-hidden="true" className="size-4" />
                Response within one business day
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-white p-5 text-ink shadow-soft sm:p-6">
            {/* TODO: Connect this homepage lead form to each client's CRM or booking workflow. */}
            <BookingForm sourcePage="homepage-final-cta" />
          </div>
        </div>
      </section>
    </>
  );
}
