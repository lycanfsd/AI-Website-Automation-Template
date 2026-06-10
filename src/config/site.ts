import { clientConfig } from "@/config/client";

export const siteConfig = {
  businessName: clientConfig.businessName,
  tagline: clientConfig.tagline,
  industry: clientConfig.industry,
  location: clientConfig.location,
  description: clientConfig.seoDescription,
  phone: clientConfig.phone,
  email: clientConfig.email,
  address: clientConfig.address,
  websiteUrl: clientConfig.websiteUrl,
  bookingUrl: clientConfig.bookingUrl,
  logoText: clientConfig.logoText,
  logoPath: clientConfig.logoPath,
  primaryCta: clientConfig.primaryCTA,
  secondaryCta: clientConfig.secondaryCTA,
  serviceArea: clientConfig.serviceArea,
  hours: clientConfig.hours,
  offer: clientConfig.offer,
  toneStyleSuggestion: clientConfig.toneStyleSuggestion,
  seoTitle: clientConfig.seoTitle,
  seoDescription: clientConfig.seoDescription,
};

export const socialLinks = [
  { label: "Instagram", href: clientConfig.instagramUrl },
  { label: "Facebook", href: clientConfig.facebookUrl },
].filter((item) => item.href);

export const marketingNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Book", href: "/contact" },
];

export const toolNav = [
  { label: "Leads", href: "/dashboard" },
  { label: "Reviews", href: "/review-generator" },
  { label: "Follow-up", href: "/follow-up-generator" },
  { label: "Settings", href: "/settings" },
];
