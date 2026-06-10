import { CalendarCheck, MessageSquareText } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { siteConfig } from "@/config/site";

export function CtaBand() {
  return (
    <section className="bg-brand-900 px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-100">
            <MessageSquareText aria-hidden="true" className="size-4" />
            Lead-ready template
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-normal sm:text-4xl">
            Turn more local interest into booked consults.
          </h2>
          <p className="mt-4 text-base leading-7 text-brand-100">
            Use the booking page, dashboard, and response generators as a
            polished foundation for each ClientFlow AI client build.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href="/contact"
            className="w-full bg-white text-ink hover:bg-brand-50 sm:w-auto"
          >
            <span className="inline-flex items-center gap-2">
              <CalendarCheck aria-hidden="true" className="size-4" />
              {siteConfig.primaryCta}
            </span>
          </ButtonLink>
          <ButtonLink
            href="/dashboard"
            variant="secondary"
            className="w-full border-white/40 bg-transparent text-white hover:border-white hover:text-white sm:w-auto"
          >
            View dashboard
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
