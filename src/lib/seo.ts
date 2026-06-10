import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const configuredSiteUrl = siteConfig.websiteUrl || "https://example.com";
const normalizedSiteUrl = /^https?:\/\//i.test(configuredSiteUrl)
  ? configuredSiteUrl.replace(/\/$/, "")
  : `https://${configuredSiteUrl.replace(/\/$/, "")}`;

export const siteUrl = normalizedSiteUrl;

export const defaultOgImage = {
  url: `${siteUrl}/images/peakform-hero.png`,
  alt: `${siteConfig.businessName} coaching space serving ${siteConfig.location}`,
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  openGraphTitle?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  openGraphTitle,
}: PageMetadataOptions): Metadata {
  const ogTitle = openGraphTitle || `${title} | ${siteConfig.businessName}`;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      title: ogTitle,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.businessName,
      images: [defaultOgImage],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [defaultOgImage.url],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}
