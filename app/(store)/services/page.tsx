import type { Metadata } from "next";
import { ServicesPageContent } from "@/app/components/store/pages";
import { JsonLdScript } from "@/app/components/store/seo/json-ld-script";
import { createPageMetadata } from "@/app/lib/seo/metadata";
import { servicesKeywords } from "@/app/lib/seo/keywords";
import {
  breadcrumbJsonLd,
  jsonLdGraph,
  servicesPageJsonLd,
  webPageJsonLd,
} from "@/app/lib/seo/json-ld";

export const metadata: Metadata = createPageMetadata({
  title: "Printing Services",
  description:
    "Offset & screen printing services at Anita Printers — barcodes, stickers, labels, tags, letterheads, visiting cards, brochures, posters, carry bags, boxes, flex, wedding cards, and apparel.",
  path: "/services",
  keywords: servicesKeywords,
});

export default function ServicesPage() {
  const schemas = jsonLdGraph(
    webPageJsonLd({
      name: "Printing Services — Anita Printers",
      description:
        "Offset and screen printing services for commercial stationery, packaging, apparel, and specialty jobs in Noida.",
      path: "/services",
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
    servicesPageJsonLd(),
  );

  return (
    <>
      <JsonLdScript data={schemas} />
      <ServicesPageContent />
    </>
  );
}
