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

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    fetchStoreCategories(),
    fetchStoreProducts({ take: 8 }),
  ]);

  return (
    <>
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
