import type { Metadata } from "next";
import { ServicesPageContent } from "@/app/components/store/pages";
import { createPageMetadata } from "@/app/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Printing Services",
  description:
    "Offset & screen printing services at Anita Printers — barcodes, stickers, labels, tags, letterheads, visiting cards, brochures, posters, carry bags, boxes, flex, wedding cards, and apparel.",
  path: "/services",
  keywords: [
    "offset printing services",
    "screen printing services",
    "label printing",
    "flex printing",
    "wedding card printing",
    "custom box printing",
  ],
});

export default function ServicesPage() {
  return <ServicesPageContent />;
}
