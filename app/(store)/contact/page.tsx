import type { Metadata } from "next";
import { ContactPageContent } from "@/app/components/store/pages";
import { JsonLdScript } from "@/app/components/store/seo/json-ld-script";
import { createPageMetadata } from "@/app/lib/seo/metadata";
import { contactKeywords } from "@/app/lib/seo/keywords";
import {
  breadcrumbJsonLd,
  contactPageJsonLd,
  jsonLdGraph,
} from "@/app/lib/seo/json-ld";

export const metadata: Metadata = createPageMetadata({
  title: "Contact & Get a Quote",
  description:
    "Contact Anita Printers in Noida for offset stationery, packaging, and screen apparel quotes. Call +91 98102 75776, WhatsApp, email, or send your enquiry online.",
  path: "/contact",
  keywords: contactKeywords,
});

export default function ContactPage() {
  const schemas = jsonLdGraph(
    contactPageJsonLd(),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ]),
  );

  return (
    <>
      <JsonLdScript data={schemas} />
      <ContactPageContent />
    </>
  );
}
