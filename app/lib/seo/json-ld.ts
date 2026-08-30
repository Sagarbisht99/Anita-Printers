import { faqs } from "@/app/lib/store/b2b-content";
import { siteInfo } from "@/app/lib/store/site-info";
import { absoluteUrl, siteConfig } from "@/app/lib/seo/site";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "PrintShop",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.svg"),
    image: absoluteUrl(siteConfig.defaultOgImage),
    description: siteConfig.defaultDescription,
    telephone: siteInfo.primaryPhone.href.replace("tel:", ""),
    email: siteInfo.email,
    taxID: siteInfo.gstin,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:30",
        closes: "19:00",
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    priceRange: "₹₹",
    sameAs: [siteInfo.whatsapp],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.defaultDescription,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function productJsonLd(input: {
  name: string;
  description: string;
  slug: string;
  image?: string | null;
  price?: number;
}) {
  const url = absoluteUrl(`/products/${input.slug}`);
  const images = input.image ? [input.image] : [absoluteUrl(siteConfig.defaultOgImage)];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    url,
    image: images,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "INR",
      ...(input.price && input.price > 0 ? { price: input.price } : {}),
      availability: "https://schema.org/InStock",
      seller: { "@id": `${siteConfig.url}/#organization` },
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
