import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductsCatalog } from "@/app/components/storefront/products-catalog";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Shop offset stationery, packaging, screen apparel, bags, and promotional print — filter by technique, MOQ, and lead time.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsCatalog />
    </Suspense>
  );
}
