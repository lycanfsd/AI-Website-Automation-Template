import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { marketingNav, siteConfig, socialLinks, toolNav } from "@/config/site";

const socialIcons = {
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
};

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-white text-sm font-bold text-ink">
              PF
            </span>
            <div>
              <p className="font-semibold">{siteConfig.businessName}</p>
              <p className="text-sm text-zinc-300">Powered by ClientFlow AI</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-zinc-300">
            Premium local coaching, practical consults, and quick follow-up for
            Austin-area clients who want a stronger, healthier routine.
          </p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map((item) => {
              const Icon = socialIcons[item.label as keyof typeof socialIcons];

              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="grid size-10 place-items-center rounded-lg border border-white/15 text-zinc-300 transition hover:border-white/40 hover:text-white"
                >
                  <Icon aria-hidden="true" className="size-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-400">
            Navigate
          </p>
          <div className="mt-4 grid gap-3 text-sm">
            {[...marketingNav, ...toolNav].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-zinc-300 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-400">
            Contact
          </p>
          <div className="mt-4 grid gap-3 text-sm text-zinc-300">
            <a className="flex items-center gap-2 hover:text-white" href={`tel:${siteConfig.phone}`}>
              <Phone aria-hidden="true" className="size-4" />
              {siteConfig.phone}
            </a>
            <a className="flex items-center gap-2 hover:text-white" href={`mailto:${siteConfig.email}`}>
              <Mail aria-hidden="true" className="size-4" />
              {siteConfig.email}
            </a>
            <p className="flex items-center gap-2">
              <MapPin aria-hidden="true" className="size-4" />
              {siteConfig.address}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Copyright {new Date().getFullYear()} {siteConfig.businessName}.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
