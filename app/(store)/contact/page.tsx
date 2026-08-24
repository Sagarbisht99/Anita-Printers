import type { Metadata } from "next";
import { ContactPageContent } from "@/app/components/storefront/contact-page-content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Address, phone, WhatsApp, map location, and inquiry form for Anita Printers.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
