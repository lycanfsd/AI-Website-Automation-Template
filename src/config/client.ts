// ClientFlow AI client customization
// Edit this file first when reusing the template for a new local business.
// Keep values plain and human-readable so non-developers can update copy safely.

import {
  clientPresets,
  type ClientFaq,
  type ClientPresetKey,
  type ClientService,
  type ClientTestimonial,
} from "@/config/client-presets";

export type { ClientFaq, ClientPresetKey, ClientService, ClientTestimonial };

// Switch this value to quickly try a different niche preset.
// Options:
// - "personalTrainer"
// - "smallGym"
// - "medSpa"
// - "chiropractor"
// - "physicalTherapy"
// - "yogaPilates"
// - "nutritionCoach"
const activePreset: ClientPresetKey = "personalTrainer";

const preset = clientPresets[activePreset];

export const clientConfig = {
  // Public business name shown in the header, footer, SEO, emails, and page copy.
  businessName:
    process.env.NEXT_PUBLIC_CLIENT_BUSINESS_NAME || preset.businessName,

  // Short positioning line used in headers and supporting copy.
  tagline: preset.tagline,

  // Broad client niche. Useful for prompts, SEO, and copy adaptation.
  industry: preset.industry,

  // City/region the business serves.
  location: preset.location,

  // Public contact phone number.
  phone: process.env.NEXT_PUBLIC_CLIENT_PHONE || preset.phone,

  // Public contact email address.
  email: process.env.NEXT_PUBLIC_CLIENT_EMAIL || preset.email,

  // Public address or service-area description.
  address: process.env.NEXT_PUBLIC_CLIENT_ADDRESS || preset.address,

  // Public website URL used for canonical links, sitemap, robots, and sharing metadata.
  // TODO: Set NEXT_PUBLIC_SITE_URL to the client's real production domain before launch.
  websiteUrl: process.env.NEXT_PUBLIC_SITE_URL || preset.websiteUrl,

  // Optional external booking link. Leave blank to use the built-in contact page.
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || preset.bookingUrl,

  // Social profile URLs. Leave blank if the client does not use that platform.
  instagramUrl: preset.instagramUrl,
  facebookUrl: preset.facebookUrl,

  // Header logo text. Use initials for text-logo clients, or pair with logoPath.
  logoText: preset.logoText,

  // Optional logo image path from /public, for example "/images/client-logo.png".
  logoPath: preset.logoPath,

  // Main and secondary calls to action used across marketing pages.
  primaryCTA: preset.primaryCTA,
  secondaryCTA: preset.secondaryCTA,

  // Local service area displayed in the homepage hero.
  serviceArea: preset.serviceArea,

  // Public business hours shown on the contact page.
  hours: preset.hours,

  // Lead magnet or consult offer shown on booking sections.
  offer: preset.offer,

  // Writing direction for humans and future AI prompt customization.
  toneStyleSuggestion: preset.toneStyleSuggestion,

  // Core services for the homepage, services page, and lead form options.
  services: preset.services,

  // Approved testimonials or demo placeholders. Replace with real reviews when available.
  testimonials: preset.testimonials,

  // Common questions shown on the homepage FAQ section.
  faqs: preset.faqs,

  // Brand color reference for client handoff. Tailwind tokens live in tailwind.config.ts.
  brandColors: preset.brandColors,

  // Default SEO metadata for the site.
  seoTitle: preset.seoTitle,
  seoDescription: preset.seoDescription,
};
