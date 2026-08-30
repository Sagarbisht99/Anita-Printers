import type { Metadata } from "next";
import { ContactPageContent } from "@/app/components/store/pages";
import { createPageMetadata } from "@/app/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact & Get a Quote",
  description:
    "Contact Anita Printers in Noida for offset stationery, packaging, and screen apparel quotes. Call +91 98102 75776, WhatsApp, email, or send your enquiry online.",
  path: "/contact",
  keywords: [
    "Anita Printers contact",
    "printing quote Noida",
    "bulk print enquiry",
    "WhatsApp printing order",
  ],
});

export default function ContactPage() {
  return <ContactPageContent />;
}
