import type { Metadata } from "next";
import { AboutPageContent } from "@/app/components/store/pages";
import { JsonLdScript } from "@/app/components/store/seo/json-ld-script";
import { createPageMetadata } from "@/app/lib/seo/metadata";
import { aboutKeywords } from "@/app/lib/seo/keywords";
import { breadcrumbJsonLd, jsonLdGraph, webPageJsonLd } from "@/app/lib/seo/json-ld";

export const metadata: Metadata = createPageMetadata({
  title: "About Anita Printers",
  description:
    "Learn about Anita Printers — offset & screen printing in Noida since decades of bulk jobs for corporate, retail, events, and schools. Proof-first production and pan-India dispatch.",
  path: "/about",
  keywords: aboutKeywords,
});

export default function AboutPage() {
  const schemas = jsonLdGraph(
    webPageJsonLd({
      name: "About Anita Printers",
      description:
        "Offset and screen printing in Noida — bulk jobs for corporate, retail, events, and schools with proof-first production.",
      path: "/about",
      type: "AboutPage",
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  );

  return (
    <>
      <JsonLdScript data={schemas} />
      <AboutPageContent />
    </>
  );
}
