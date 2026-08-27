import type { Metadata } from "next";
import { ContactPageContent } from "@/app/components/store/pages";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Request a quote for offset stationery, packaging, or screen apparel — phone, WhatsApp, map, and inquiry form for Anita Printers.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
