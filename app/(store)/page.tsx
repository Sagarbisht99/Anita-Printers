import { Suspense } from "react";
import {
  fetchStoreCategories,
  fetchStoreProducts,
} from "@/app/actions/store/catalog";
import {
  BrandStrip,
  BulkSavings,
  CustomizedPackaging,
  CuratedPicks,
  FaqSection,
  HeroSlider,
  HowItWorks,
  PrintingServicesPreview,
  PrintingShowcase,
  VisionHomegrown,
  WhyChooseUs,
} from "@/app/components/store/sections";
import { HomeJsonLd } from "@/app/components/store/seo/store-json-ld";
import { JsonLdScript } from "@/app/components/store/seo/json-ld-script";
import { createPageMetadata } from "@/app/lib/seo/metadata";
import { homeKeywords } from "@/app/lib/seo/keywords";
import { jsonLdGraph, webPageJsonLd } from "@/app/lib/seo/json-ld";

export const metadata = createPageMetadata({
  title: "Offset & Screen Printing in Noida",
  description:
    "Anita Printers — bulk offset & screen printing in Noida. Visiting cards, labels, stickers, carry bags, boxes, flex, wedding cards, and custom packaging with GST invoices and pan-India delivery.",
  path: "/",
  keywords: homeKeywords,
});

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    fetchStoreCategories(),
    fetchStoreProducts({ take: 8 }),
  ]);

  return (
    <>
      <JsonLdScript
        data={jsonLdGraph(
          webPageJsonLd({
            name: "Anita Printers — Offset & Screen Printing in Noida",
            description:
              "Bulk offset & screen printing in Noida. Visiting cards, labels, stickers, carry bags, boxes, flex, wedding cards, and custom packaging.",
            path: "/",
          }),
        )}
      />
      <HomeJsonLd />
      <HeroSlider />
      <BrandStrip />
      <CustomizedPackaging />
      <Suspense fallback={null}>
        <CuratedPicks
          initialCategories={categories}
          initialProducts={products}
        />
      </Suspense>
      <WhyChooseUs />
      <VisionHomegrown />
      <HowItWorks />
      <PrintingShowcase />
      <PrintingServicesPreview />
      <BulkSavings />
      <FaqSection />
    </>
  );
}
