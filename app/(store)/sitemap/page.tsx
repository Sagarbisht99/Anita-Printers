import type { Metadata } from "next";
import { SitemapPageContent } from "@/app/components/store/pages";
import { JsonLdScript } from "@/app/components/store/seo/json-ld-script";
import { createPageMetadata } from "@/app/lib/seo/metadata";
import { breadcrumbJsonLd, jsonLdGraph, webPageJsonLd } from "@/app/lib/seo/json-ld";

export const metadata: Metadata = createPageMetadata({
  title: "HTML Sitemap",
  description:
    "HTML sitemap for Anita Printers — browse home, about, services, product catalog, contact, and policies.",
  path: "/sitemap",
});

export default function SitemapPage() {
  const schemas = jsonLdGraph(
    webPageJsonLd({
      name: "HTML Sitemap",
      description:
        "Browse every Anita Printers page — services, catalog, policies, and contact.",
      path: "/sitemap",
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Sitemap", path: "/sitemap" },
    ]),
  );

  return (
    <>
      <JsonLdScript data={schemas} />
      <SitemapPageContent />
    </>
  );
}
