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
import { createPageMetadata } from "@/app/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Product Catalog",
  description:
    "Browse Anita Printers product catalog — offset stationery, packaging, labels, apparel, and promotional print. Filter by category, MOQ, and request bulk pricing.",
  path: "/products",
  keywords: [
    "printing products catalog",
    "bulk print products",
    "custom print catalog India",
  ],
});

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
