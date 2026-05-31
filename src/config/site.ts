export const siteConfig = {
  // TODO: Replace these defaults for each client deployment.
  businessName:
    process.env.NEXT_PUBLIC_CLIENT_BUSINESS_NAME || "PeakForm Coaching",
  tagline: "Personalized coaching for stronger, healthier weeks.",
  description:
    "A premium local coaching studio helping busy adults build strength, improve mobility, and stay consistent with expert guidance.",
  phone: process.env.NEXT_PUBLIC_CLIENT_PHONE || "(555) 014-2048",
  email: process.env.NEXT_PUBLIC_CLIENT_EMAIL || "hello@peakform.test",
  address:
    process.env.NEXT_PUBLIC_CLIENT_ADDRESS || "418 Summit Ave, Austin, TX",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  primaryCta: "Book a free consult",
  secondaryCta: "View services",
  serviceArea: "Austin and nearby communities",
  hours: "Mon-Fri 6am-7pm, Sat 8am-1pm",
  offer: "Free 20-minute fit assessment for new leads",
};

export const socialLinks = [
  // TODO: Replace these demo URLs with each client's real social profiles.
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
];

export const marketingNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Book", href: "/contact" },
];

export const toolNav = [
  { label: "Leads", href: "/admin/leads" },
  { label: "Reviews", href: "/tools/review-response" },
  { label: "Follow-up", href: "/tools/lead-follow-up" },
  { label: "Settings", href: "/settings" },
];
