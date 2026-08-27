import { Suspense } from "react";
import {
  fetchStoreCategories,
  fetchStoreProducts,
} from "@/app/actions/store/catalog";
import {
  BrandStrip,
  BulkSavings,
  CuratedPicks,
  ExploreCategories,
  FaqSection,
  HeroSlider,
  HowItWorks,
  PrintingServicesPreview,
  PrintingShowcase,
  TestimonialsPartners,
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
      <Suspense fallback={null}>
        <CuratedPicks
          initialCategories={categories}
          initialProducts={products}
        />
      </Suspense>
      <ExploreCategories initialCategories={categories} />
      <WhyChooseUs />
      <VisionHomegrown />
      <HowItWorks />
      <PrintingShowcase />
      <PrintingServicesPreview />
      <BulkSavings />
      <TestimonialsPartners />
      <FaqSection />
    </>
  );
}
