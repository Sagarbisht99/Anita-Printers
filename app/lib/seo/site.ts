import { siteInfo } from "@/app/lib/store/site-info";

/** Public site URL — set NEXT_PUBLIC_SITE_URL in production (https://anitaprinters.in). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://anitaprinters.in";

export const siteConfig = {
  name: siteInfo.brand,
  legalName: siteInfo.brand,
  domain: "anitaprinters.in",
  url: SITE_URL,
  tagline: siteInfo.tagline,
  locale: "en_IN",
  defaultDescription:
    "Anita Printers in Noida — offset & screen printing for visiting cards, letterheads, labels, stickers, carry bags, boxes, flex, wedding cards, and custom packaging. Bulk orders, GST invoices, pan-India delivery.",
  defaultKeywords: [
    "Anita Printers",
    "printing services Noida",
    "offset printing",
    "screen printing",
    "visiting card printing",
    "letterhead printing",
    "custom packaging",
    "bulk printing India",
    "corporate stationery",
    "label printing",
    "flex printing",
    "wedding card printing",
  ],
  defaultOgImage: "/pop-up-image.png",
  twitterHandle: undefined as string | undefined,
  geo: {
    latitude: 28.5832,
    longitude: 77.326,
  },
  address: {
    street: "A-87, Sector-2",
    locality: "Noida",
    region: "Uttar Pradesh",
    postalCode: "201301",
    country: "IN",
  },
} as const;

export function absoluteUrl(path = ""): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageTitle(title: string): string {
  return `${title} | ${siteConfig.name}`;
}
