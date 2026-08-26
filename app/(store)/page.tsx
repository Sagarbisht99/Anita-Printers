import { Suspense } from "react";
import {
  fetchStoreCategories,
  fetchStoreProducts,
} from "@/app/actions/storefront";
import { BrandStrip } from "@/app/components/storefront/brand-strip";
import { BulkSavings } from "@/app/components/storefront/bulk-savings";
import { CuratedPicks } from "@/app/components/storefront/curated-picks";
import { ExploreCategories } from "@/app/components/storefront/explore-categories";
import { FaqSection } from "@/app/components/storefront/faq-section";
import { HeroSlider } from "@/app/components/storefront/hero-slider";
import { HowItWorks } from "@/app/components/storefront/how-it-works";
import { PrintingServicesPreview } from "@/app/components/storefront/printing-services-preview";
import { PrintingShowcase } from "@/app/components/storefront/printing-showcase";
import { TestimonialsPartners } from "@/app/components/storefront/testimonials-partners";
import { VisionHomegrown } from "@/app/components/storefront/vision-homegrown";
import { WhyChooseUs } from "@/app/components/storefront/why-choose-us";

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
