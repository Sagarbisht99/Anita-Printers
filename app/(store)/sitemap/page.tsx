import type { Metadata } from "next";
import { SitemapPageContent } from "@/app/components/storefront/sitemap-page-content";

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "Anita Printers sitemap — browse home, about, services, catalog, contact, and policies.",
};

export default function SitemapPage() {
  return <SitemapPageContent />;
}
