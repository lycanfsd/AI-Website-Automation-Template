"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Menu, X } from "lucide-react";
import { useState } from "react";
import { marketingNav, siteConfig, toolNav } from "@/config/site";
import { cx } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const bookingHref = siteConfig.bookingUrl || "/contact";
  const isAdminArea = [
    "/dashboard",
    "/review-generator",
    "/follow-up-generator",
    "/settings",
  ].some((path) => pathname === path || pathname.startsWith(`${path}/`));
  const navItems = isAdminArea ? [...marketingNav, ...toolNav] : marketingNav;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/92 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          {siteConfig.logoPath ? (
            <Image
              src={siteConfig.logoPath}
              alt={`${siteConfig.businessName} logo`}
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-lg object-contain"
            />
          ) : (
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-ink text-sm font-bold text-white">
              {siteConfig.logoText}
            </span>
          )}
          <span className="min-w-0 max-w-[12.5rem] sm:max-w-none">
            <span className="block truncate text-sm font-semibold text-ink">
              {siteConfig.businessName}
            </span>
            <span className="block truncate text-xs text-zinc-500">
              {siteConfig.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "rounded-full px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={bookingHref}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            <CalendarCheck aria-hidden="true" className="size-4" />
            {siteConfig.primaryCta}
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="grid size-11 shrink-0 place-items-center rounded-lg border border-zinc-300 text-ink transition hover:bg-zinc-100 lg:hidden"
        >
          {open ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>
      </div>

      {open ? (
        <div className="border-t border-zinc-200 bg-white px-4 py-4 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center rounded-lg px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={bookingHref}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              <CalendarCheck aria-hidden="true" className="size-4 shrink-0" />
              {siteConfig.primaryCta}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
