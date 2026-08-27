import type { Metadata } from "next";
import { ServicesPageContent } from "@/app/components/store/pages";

export const metadata: Metadata = {
  title: "Services — What We Print",
  description:
    "Barcode, sticker, label, tag, letterhead, visiting card, plastic printing, brochures, posters, leaflets, carry bags, boxes, flex, and shadi cards — plus offset & screen services at Anita Printers.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
