import type { Metadata } from "next";
import { AboutPageContent } from "@/app/components/storefront/about-page-content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Factory capacity, QA standards, and eco initiatives at Anita Printers — Gurugram B2B print partner.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
