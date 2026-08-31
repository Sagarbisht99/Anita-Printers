import { brandLogo } from "@/app/lib/seo/brand-icons";
import { faqs, printingServiceCatalog, processSteps } from "@/app/lib/store/b2b-content";
import { siteInfo } from "@/app/lib/store/site-info";
import { absoluteUrl, siteConfig } from "@/app/lib/seo/site";

const ORG_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

/** Merge multiple schema nodes into one JSON-LD graph (preferred by Google). */
export function jsonLdGraph(...nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.map(({ "@context": _, ...rest }) => rest),
  };
}

export function localBusinessJsonLd() {
  const serviceKeywords = printingServiceCatalog.coreProducts.flatMap(
    (g) => g.items,
  );

  return {
    "@type": ["PrintShop", "LocalBusiness"],
    "@id": ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(brandLogo.svg),
    },
    image: absoluteUrl(brandLogo.icon512),
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
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteInfo.mapQuery)}`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteInfo.primaryPhone.href.replace("tel:", ""),
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        telephone: siteInfo.landline.href.replace("tel:", ""),
        contactType: "customer service",
        areaServed: "IN",
      },
      {
        "@type": "ContactPoint",
        email: siteInfo.email,
        contactType: "sales",
        areaServed: "IN",
      },
    ],
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
    areaServed: [
      { "@type": "City", name: "Noida" },
      { "@type": "AdministrativeArea", name: "Delhi NCR" },
      { "@type": "Country", name: "India" },
    ],
    knowsAbout: serviceKeywords,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Bank Transfer, Cheque",
    sameAs: [siteInfo.whatsappBase],
  };
}

export function webSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.defaultDescription,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
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

export function webPageJsonLd(input: {
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "FAQPage";
}) {
  const url = absoluteUrl(input.path);
  const type = input.type ?? "WebPage";
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: input.name,
    description: input.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-IN",
    primaryImageOfPage: absoluteUrl(siteConfig.defaultOgImage),
  };
}

export function faqPageJsonLd() {
  return {
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    isPartOf: { "@id": WEBSITE_ID },
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

export function howToOrderJsonLd() {
  return {
    "@type": "HowTo",
    "@id": `${siteConfig.url}/#howto-order`,
    name: "How to order from Anita Printers",
    description:
      "Four steps from requirement to delivery — share specs, get price, approve proof, we print and deliver.",
    totalTime: "P7D",
    step: processSteps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.body,
      url: absoluteUrl(step.href),
    })),
  };
}

export function servicesPageJsonLd() {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl("/services")}#services`,
    name: "Anita Printers printing services",
    numberOfItems: printingServiceCatalog.techniques.length,
    itemListElement: printingServiceCatalog.techniques.map(
      (technique, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          "@id": `${absoluteUrl("/services")}#${technique.id}`,
          name: technique.name,
          description: technique.summary,
          provider: { "@id": ORG_ID },
          areaServed: { "@type": "Country", name: "India" },
          serviceType: technique.name,
          url: absoluteUrl(`/services#${technique.id}`),
        },
      }),
    ),
  };
}

export function contactPageJsonLd() {
  const url = absoluteUrl("/contact");
  return {
    "@type": "ContactPage",
    "@id": `${url}#webpage`,
    url,
    name: "Contact Anita Printers",
    description:
      "Get a quote for offset and screen printing — call, WhatsApp, email, or send an online enquiry.",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": ORG_ID },
    inLanguage: "en-IN",
  };
}

export function itemListJsonLd(
  items: Array<{ name: string; slug: string; image?: string | null }>,
  listName: string,
) {
  return {
    "@type": "ItemList",
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(`/products/${item.slug}`),
      ...(item.image ? { image: item.image } : {}),
    })),
  };
}

export function productJsonLd(input: {
  name: string;
  description: string;
  slug: string;
  image?: string | null;
  images?: string[];
  price?: number;
  category?: string | null;
}) {
  const url = absoluteUrl(`/products/${input.slug}`);
  const gallery = input.images?.filter(Boolean) ?? [];
  const images =
    gallery.length > 0
      ? gallery
      : input.image
        ? [input.image]
        : [absoluteUrl(siteConfig.defaultOgImage)];

  const hasPrice = Boolean(input.price && input.price > 0);

  const offer: Record<string, unknown> = {
    "@type": "Offer",
    url,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: { "@id": ORG_ID },
  };

  if (hasPrice) {
    offer.price = input.price;
  } else {
    offer.priceSpecification = {
      "@type": "PriceSpecification",
      priceCurrency: "INR",
      description: "Quote-based bulk pricing — contact for MOQ rates",
    };
  }

  return {
    "@type": "Product",
    "@id": `${url}#product`,
    name: input.name,
    description: input.description,
    url,
    sku: input.slug,
    image: images,
    ...(input.category ? { category: input.category } : {}),
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    manufacturer: { "@id": ORG_ID },
    offers: offer,
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
