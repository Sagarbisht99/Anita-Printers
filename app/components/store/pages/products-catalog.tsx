"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  fetchStoreCategories,
  fetchStoreProductsPage,
} from "@/app/actions/store/catalog";
import { StoreProductCard } from "@/app/components/store/ui/product-card";
import { StorePagination } from "@/app/components/store/ui/pagination";
import { catalogFilters } from "@/app/lib/store/b2b-content";
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
  const [technique, setTechnique] = useState("Any");
  const [material, setMaterial] = useState("Any");
  const [moq, setMoq] = useState("Any");
  const [leadTime, setLeadTime] = useState("Any");

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

  const activeFilters = useMemo(
    () =>
      [technique, material, moq, leadTime].filter((value) => value !== "Any"),
    [technique, material, moq, leadTime],
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-[0.14em] text-store-muted uppercase">
          Offset · Screen · Bulk catalog
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-store-navy sm:text-4xl">
          Shop / Catalog
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-store-muted">
          {search ? (
            `Results for “${search}”`
          ) : (
            <>
              Stationery, packaging, apparel, bags, and gifting — filter by
              category, offset/screen technique, GSM, MOQ, and lead time. Need
              the full service list?{" "}
              <a
                href="/services"
                className="font-semibold text-store-navy hover:underline"
              >
                Visit Services
              </a>
              .
            </>
          )}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-2xl border border-store-line bg-store-surface p-5 lg:sticky lg:top-24">
          <p className="text-sm font-semibold text-store-navy">Filters</p>

          <div className="mt-5 space-y-5">
            <FilterGroup label="Category">
              <button
                type="button"
                onClick={() => {
                  setCategoryId(null);
                  setPage(1);
                  updateUrl({ categoryId: null, page: 1 });
                }}
                className={chipClass(categoryId === null)}
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
                  className={chipClass(categoryId === category.id)}
                >
                  {category.name}
                </button>
              ))}
            </FilterGroup>

            <FilterSelect
              label="Print technique"
              value={technique}
              onChange={setTechnique}
              options={["Any", ...catalogFilters.techniques]}
            />
            <FilterSelect
              label="Material / GSM"
              value={material}
              onChange={setMaterial}
              options={["Any", ...catalogFilters.materials]}
            />
            <FilterSelect
              label="MOQ range"
              value={moq}
              onChange={setMoq}
              options={["Any", ...catalogFilters.moqRanges]}
            />
            <FilterSelect
              label="Lead time"
              value={leadTime}
              onChange={setLeadTime}
              options={["Any", ...catalogFilters.leadTimes]}
            />
          </div>

          {activeFilters.length > 0 ? (
            <p className="mt-5 text-xs text-store-muted">
              Buyer filters applied: {activeFilters.join(" · ")}. Product list
              stays live from inventory; filter tags guide your RFQ.
            </p>
          ) : null}
        </aside>

        <div>
          {productsQuery.isError ? (
            <p className="text-sm text-rose-600">Could not load products.</p>
          ) : loading && products.length === 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
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
                className={`grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 ${
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
        </div>
      </div>
    </main>
  );
}

function chipClass(active: boolean) {
  return `mr-2 mb-2 rounded-full px-3 py-1.5 text-xs font-medium transition ${
    active
      ? "bg-store-navy text-white"
      : "border border-store-line text-store-ink hover:border-store-navy/30"
  }`;
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-wide text-store-muted uppercase">
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block text-xs">
      <span className="font-semibold tracking-wide text-store-muted uppercase">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2 text-sm text-store-ink"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
