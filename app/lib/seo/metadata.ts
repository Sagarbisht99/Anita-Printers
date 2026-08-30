import type { Metadata } from "next";
import { absoluteUrl, pageTitle, siteConfig } from "@/app/lib/seo/site";

type PageSeoInput = {
  title: string;
  description?: string;
  path?: string;
  /** Path under public/ or absolute URL */
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
  type?: "website" | "article";
};

function resolveImageUrl(image: string): string {
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return absoluteUrl(image.startsWith("/") ? image : `/${image}`);
}

export function createPageMetadata({
  title,
  description = siteConfig.defaultDescription,
  path = "",
  image = siteConfig.defaultOgImage,
  keywords = [...siteConfig.defaultKeywords],
  noIndex = false,
  type = "website",
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = resolveImageUrl(image);
  const fullTitle = pageTitle(title);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      ...(siteConfig.twitterHandle
        ? { site: siteConfig.twitterHandle, creator: siteConfig.twitterHandle }
        : {}),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export const defaultStoreMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline} | Noida`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.defaultDescription,
  keywords: [...siteConfig.defaultKeywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.defaultDescription,
    images: [
      {
        url: resolveImageUrl(siteConfig.defaultOgImage),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.defaultDescription,
    images: [resolveImageUrl(siteConfig.defaultOgImage)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    // Add tokens when available:
    // google: "your-google-verification-code",
  },
};
