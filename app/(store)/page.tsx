import { Suspense } from "react";
import {
  fetchStoreCategories,
  fetchStoreProducts,
} from "@/app/actions/storefront";
import { BrandStrip } from "@/app/components/storefront/brand-strip";
import { BulkSavings } from "@/app/components/storefront/bulk-savings";
import { CuratedPicks } from "@/app/components/storefront/curated-picks";
import { ExploreCategories } from "@/app/components/storefront/explore-categories";
import { HeroSlider } from "@/app/components/storefront/hero-slider";

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
      <BulkSavings />
    </>
  );
}
