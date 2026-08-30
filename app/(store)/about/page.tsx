import type { Metadata } from "next";
import { AboutPageContent } from "@/app/components/store/pages";
import { createPageMetadata } from "@/app/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About Us",
  description:
    "Learn about Anita Printers — offset & screen printing in Noida since decades of bulk jobs for corporate, retail, events, and schools. Proof-first production and pan-India dispatch.",
  path: "/about",
  keywords: [
    "about Anita Printers",
    "printing company Noida",
    "offset print shop",
    "screen printing unit",
  ],
});

export default function AboutPage() {
  return <AboutPageContent />;
}
