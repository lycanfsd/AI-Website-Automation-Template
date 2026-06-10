import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { marketingNav, siteConfig, socialLinks } from "@/config/site";

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
          <div className="flex min-w-0 items-center gap-3">
            {siteConfig.logoPath ? (
              <Image
                src={siteConfig.logoPath}
                alt={`${siteConfig.businessName} logo`}
                width={40}
                height={40}
                className="size-10 shrink-0 rounded-lg object-contain"
              />
            ) : (
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-sm font-bold text-ink">
                {siteConfig.logoText}
              </span>
            )}
            <div className="min-w-0">
              <p className="font-semibold">{siteConfig.businessName}</p>
              <p className="text-sm text-zinc-300">Powered by ClientFlow AI</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-zinc-300">
            {siteConfig.description}
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
            {marketingNav.map((item) => (
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
            <a className="flex min-w-0 items-center gap-2 hover:text-white" href={`tel:${siteConfig.phone}`}>
              <Phone aria-hidden="true" className="size-4 shrink-0" />
              <span className="min-w-0 break-words">{siteConfig.phone}</span>
            </a>
            <a className="flex min-w-0 items-center gap-2 hover:text-white" href={`mailto:${siteConfig.email}`}>
              <Mail aria-hidden="true" className="size-4 shrink-0" />
              <span className="min-w-0 break-all">{siteConfig.email}</span>
            </a>
            <p className="flex min-w-0 items-center gap-2">
              <MapPin aria-hidden="true" className="size-4 shrink-0" />
              <span className="min-w-0 break-words">{siteConfig.address}</span>
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
