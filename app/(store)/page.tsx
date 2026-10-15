import {
  fetchStoreCategories,
  fetchStoreProducts,
} from "@/app/actions/store/catalog";
import {
  BrandStrip,
  FaqSection,
  FeaturedProducts,
  HomeHero,
  HomeEnquirySection,
  HowItWorks,
  PopularCategories,
  PrintingCapabilities,
  PrintingServicesPreview,
  VisionHomegrown,
  WhyChooseUs,
} from "@/app/components/store/sections";
import { HomeJsonLd } from "@/app/components/store/seo/store-json-ld";
import { JsonLdScript } from "@/app/components/store/seo/json-ld-script";
import { createPageMetadata } from "@/app/lib/seo/metadata";
import { homeKeywords } from "@/app/lib/seo/keywords";
import { jsonLdGraph, webPageJsonLd } from "@/app/lib/seo/json-ld";

export const metadata = createPageMetadata({
  title: "Custom Printing Solutions for Brands | Anita Printers, Noida",
  description:
    "Anita Printers — bulk custom printing in Noida. Hang tags, woven labels, sticker labels, visiting cards, envelopes, packaging inserts, and more. Quotation-based pricing with GST invoicing.",
  path: "/",
  keywords: homeKeywords,
});

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    fetchStoreCategories(),
    fetchStoreProducts({ take: 24 }),
  ]);

  return (
    <>
      <JsonLdScript
        data={jsonLdGraph(
          webPageJsonLd({
            name: "Anita Printers — Custom Printing Solutions, Noida",
            description:
              "Bulk custom printing in Noida — hang tags, labels, visiting cards, packaging inserts, and more with quotation-based pricing.",
            path: "/",
          }),
        )}
      />
      <HomeJsonLd />
      <HomeHero />
      <PopularCategories categories={categories} products={products} />
      <PrintingCapabilities />
      <BrandStrip />
      <VisionHomegrown />
      <WhyChooseUs />
      <HowItWorks />
      <FeaturedProducts categories={categories} products={products} />
      <PrintingServicesPreview />
      <HomeEnquirySection />
      <FaqSection />
    </>
  );
}
