import type { Metadata } from "next";
import { AboutPageContent } from "@/app/components/storefront/about-page-content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Anita Printers — Noida offset & screen printing partner for stationery, packaging, apparel, corporate, retail, events, and schools.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
