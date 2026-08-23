"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  fetchStoreCategories,
  fetchStoreProductsPage,
} from "@/app/actions/storefront";
import { StoreProductCard } from "@/app/components/storefront/product-card";
import { StorePagination } from "@/app/components/storefront/store-pagination";
import { storefrontKeys } from "@/app/lib/query/keys";

const PAGE_SIZE = 12;

export function ProductsCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("q")?.trim() ?? "";
  const categoryFromUrl = Number(searchParams.get("categoryId") || "");
  const pageFromUrl = Math.max(1, Number(searchParams.get("page") || 1));

  const [categoryId, setCategoryId] = useState<number | null>(
    Number.isInteger(categoryFromUrl) && categoryFromUrl > 0
      ? categoryFromUrl
      : null,
  );
  const [page, setPage] = useState(pageFromUrl);

  useEffect(() => {
    const nextCategory = Number(searchParams.get("categoryId") || "");
    setCategoryId(
      Number.isInteger(nextCategory) && nextCategory > 0 ? nextCategory : null,
    );
    setPage(Math.max(1, Number(searchParams.get("page") || 1)));
  }, [searchParams]);

  function updateUrl(next: {
    categoryId?: number | null;
    page?: number;
  }) {
    const params = new URLSearchParams(searchParams.toString());
    const nextCategory =
      next.categoryId === undefined ? categoryId : next.categoryId;
    const nextPage = next.page ?? page;

    if (nextCategory) params.set("categoryId", String(nextCategory));
    else params.delete("categoryId");

    if (nextPage > 1) params.set("page", String(nextPage));
    else params.delete("page");

    const query = params.toString();
    router.replace(query ? `/products?${query}` : "/products");
  }

  const categoriesQuery = useQuery({
    queryKey: storefrontKeys.categories.lists(),
    queryFn: fetchStoreCategories,
  });

  const productsQuery = useQuery({
    queryKey: storefrontKeys.products.list({
      categoryId: categoryId ?? "all",
      search: search || undefined,
      page,
      pageSize: PAGE_SIZE,
    }),
    queryFn: () =>
      fetchStoreProductsPage({
        categoryId,
        search,
        page,
        pageSize: PAGE_SIZE,
      }),
    placeholderData: (prev) => prev,
  });

  const categories = categoriesQuery.data ?? [];
  const result = productsQuery.data;
  const products = result?.items ?? [];
  const total = result?.total ?? 0;
  const totalPages = result?.totalPages ?? 1;
  const loading = productsQuery.isLoading || productsQuery.isFetching;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-[0.14em] text-store-muted uppercase">
          Catalog
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-store-navy sm:text-4xl">
          Products
        </h1>
        <p className="mt-2 text-sm text-store-muted">
          {search
            ? `Results for “${search}”`
            : "Browse our full print catalog for bulk and custom orders."}
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setCategoryId(null);
            setPage(1);
            updateUrl({ categoryId: null, page: 1 });
          }}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            categoryId === null
              ? "bg-store-navy text-white"
              : "border border-store-line bg-store-surface text-store-ink hover:border-store-navy/30"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => {
              setCategoryId(category.id);
              setPage(1);
              updateUrl({ categoryId: category.id, page: 1 });
            }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              categoryId === category.id
                ? "bg-store-navy text-white"
                : "border border-store-line bg-store-surface text-store-ink hover:border-store-navy/30"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {productsQuery.isError ? (
        <p className="text-sm text-rose-600">Could not load products.</p>
      ) : loading && products.length === 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-store-line bg-store-surface"
            >
              <div className="aspect-square animate-pulse bg-store-line/60" />
              <div className="space-y-2 p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-store-line/60" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-store-line/50" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="rounded-2xl border border-store-line bg-store-surface px-5 py-10 text-center text-sm text-store-muted">
          No products found.
        </p>
      ) : (
        <>
          <div
            className={`grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
              loading ? "opacity-60" : ""
            }`}
          >
            {products.map((product) => (
              <StoreProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8">
            <StorePagination
              page={page}
              totalPages={totalPages}
              total={total}
              pageSize={PAGE_SIZE}
              disabled={loading}
              onPageChange={(nextPage) => {
                setPage(nextPage);
                updateUrl({ page: nextPage });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </>
      )}
    </main>
  );
}
