import type { Metadata } from "next";
import { SitemapPageContent } from "@/app/components/store/pages";
import { createPageMetadata } from "@/app/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Sitemap",
  description:
    "HTML sitemap for Anita Printers — browse home, about, services, product catalog, contact, and policies.",
  path: "/sitemap",
  noIndex: true,
});

export default function SitemapPage() {
  return <SitemapPageContent />;
}
