import type { Metadata } from "next";
import { Suspense } from "react";
import {
  fetchStoreCategories,
  fetchStoreProductsPage,
} from "@/app/actions/store/catalog";
import {
  ProductsCatalog,
  PRODUCTS_PAGE_SIZE,
} from "@/app/components/store/pages";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Shop offset stationery, packaging, screen apparel, bags, and promotional print — filter by technique, MOQ, and lead time.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const search = firstValue(params.q)?.trim() ?? "";
  const parsedCategory = Number(firstValue(params.categoryId));
  const categoryId =
    Number.isInteger(parsedCategory) && parsedCategory > 0
      ? parsedCategory
      : null;
  const page = Math.max(1, Number(firstValue(params.page)) || 1);

  // Prefetch on the server so the first paint ships real products instead of a
  // skeleton; the client query reuses this and only refetches on filter change.
  const [initialCategories, initialProducts] = await Promise.all([
    fetchStoreCategories(),
    fetchStoreProductsPage({
      categoryId,
      search,
      page,
      pageSize: PRODUCTS_PAGE_SIZE,
    }),
  ]);

  return (
    <Suspense fallback={null}>
      <ProductsCatalog
        initialCategories={initialCategories}
        initialProducts={initialProducts}
        initialFilters={{ categoryId, search, page }}
      />
    </Suspense>
  );
}
