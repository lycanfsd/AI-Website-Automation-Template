import { clientConfig } from "@/config/client";
import { siteConfig, socialLinks } from "@/config/site";
import { absoluteUrl, defaultOgImage } from "@/lib/seo";

export function LocalBusinessJsonLd() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${absoluteUrl("/")}#local-business`,
    name: siteConfig.businessName,
    description: siteConfig.seoDescription,
    url: absoluteUrl("/"),
    image: defaultOgImage.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: siteConfig.address,
    areaServed: siteConfig.serviceArea,
    openingHours: siteConfig.hours,
    priceRange: "$$",
    sameAs: socialLinks.map((link) => link.href),
    makesOffer: clientConfig.services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        areaServed: siteConfig.serviceArea,
      },
    })),
    potentialAction: {
      "@type": "ReserveAction",
      name: siteConfig.primaryCta,
      target: {
        "@type": "EntryPoint",
        urlTemplate: siteConfig.bookingUrl || absoluteUrl("/contact"),
      },
    },
  };

  if (!socialLinks.length) {
    delete schema.sameAs;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
