import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductsCatalog } from "@/app/components/storefront/products-catalog";

export const metadata: Metadata = {
  title: "Products",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsCatalog />
    </Suspense>
  );
}
