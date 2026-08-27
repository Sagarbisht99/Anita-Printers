"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  fetchStoreCategories,
  fetchStoreProducts,
  type StoreCategoryItem,
  type StoreProductItem,
} from "@/app/actions/store/catalog";
import { StoreProductCard } from "@/app/components/store/ui/product-card";
import { storefrontKeys } from "@/app/lib/query/keys";

export function CuratedPicks({
  initialCategories,
  initialProducts,
}: {
  initialCategories: StoreCategoryItem[];
  initialProducts: StoreProductItem[];
}) {
  const searchParams = useSearchParams();
  const categoryFromUrl = Number(searchParams.get("categoryId") || "");
  const [categoryId, setCategoryId] = useState<number | null>(
    Number.isInteger(categoryFromUrl) && categoryFromUrl > 0
      ? categoryFromUrl
      : null,
  );

  useEffect(() => {
    const next = Number(searchParams.get("categoryId") || "");
    setCategoryId(Number.isInteger(next) && next > 0 ? next : null);
  }, [searchParams]);

  const categoriesQuery = useQuery({
    queryKey: storefrontKeys.categories.lists(),
    queryFn: fetchStoreCategories,
    initialData: initialCategories,
  });

  const productsQuery = useQuery({
    queryKey: storefrontKeys.products.list({
      categoryId: categoryId ?? "all",
      take: 8,
    }),
    queryFn: () =>
      fetchStoreProducts({
        categoryId,
        take: 8,
      }),
    initialData: categoryId === null ? initialProducts : undefined,
  });

  const categories = categoriesQuery.data ?? [];
  const products = productsQuery.data ?? [];
  const loadingProducts = productsQuery.isLoading || productsQuery.isFetching;

  return (
    <section id="curated-picks" className="bg-store-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <h2 className="text-center text-2xl font-bold tracking-tight text-store-navy sm:text-3xl">
          Curated picks for bulk print
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-store-muted">
          Offset stationery &amp; packaging alongside screen apparel and
          specialty goods — filter by category or{" "}
          <a href="/services" className="font-semibold text-store-navy hover:underline">
            see full services
          </a>
          .
        </p>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1 rounded-full border border-store-line bg-store-paper p-1">
            <button
              type="button"
              onClick={() => setCategoryId(null)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                categoryId === null
                  ? "bg-store-navy text-white"
                  : "text-store-ink hover:bg-white"
              }`}
            >
              All products
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setCategoryId(category.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  categoryId === category.id
                    ? "bg-store-navy text-white"
                    : "text-store-ink hover:bg-white"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {productsQuery.isError ? (
          <p className="mt-10 text-center text-sm text-rose-600">
            Could not load products. Please try again.
          </p>
        ) : loadingProducts && products.length === 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-store-line bg-store-paper"
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
          <p className="mt-10 text-center text-sm text-store-muted">
            No products in this category yet. Browse{" "}
            <a href="/services" className="font-semibold text-store-navy hover:underline">
              offset &amp; screen services
            </a>{" "}
            or request a custom quote.
          </p>
        ) : (
          <div
            className={`mt-10 grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
              loadingProducts ? "opacity-60" : ""
            }`}
          >
            {products.map((product) => (
              <StoreProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
