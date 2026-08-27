import type { Metadata } from "next";
import { SitemapPageContent } from "@/app/components/store/pages";

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "Anita Printers sitemap — browse home, about, services, catalog, contact, and policies.",
};

export default function SitemapPage() {
  return <SitemapPageContent />;
}
