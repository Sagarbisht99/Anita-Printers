"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  fetchStoreCategories,
  fetchStoreProductsPage,
  type StoreCategoryItem,
  type StoreProductsPage,
} from "@/app/actions/store/catalog";
import { StoreBreadcrumb } from "@/app/components/store/ui/breadcrumb";
import { StoreProductCard } from "@/app/components/store/ui/product-card";
import { StorePagination } from "@/app/components/store/ui/pagination";
import { catalogFilters } from "@/app/lib/store/b2b-content";
import { trail } from "@/app/lib/seo/breadcrumbs";
import { storefrontKeys } from "@/app/lib/query/keys";

export const PRODUCTS_PAGE_SIZE = 12;
const PAGE_SIZE = PRODUCTS_PAGE_SIZE;

export type ProductsCatalogProps = {
  initialCategories?: StoreCategoryItem[];
  initialProducts?: StoreProductsPage;
  /** Filters the server prefetch was built from; `initialProducts` is only reused while these still match. */
  initialFilters?: {
    categoryId: number | null;
    search: string;
    page: number;
  };
};

export function ProductsCatalog({
  initialCategories,
  initialProducts,
  initialFilters,
}: ProductsCatalogProps = {}) {
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

  function selectCategory(nextCategoryId: number | null) {
    setCategoryId(nextCategoryId);
    setPage(1);
    updateUrl({ categoryId: nextCategoryId, page: 1 });
  }

  const categoriesQuery = useQuery({
    queryKey: storefrontKeys.categories.lists(),
    queryFn: fetchStoreCategories,
    initialData: initialCategories,
  });

  const matchesInitialFilters =
    initialFilters !== undefined &&
    initialFilters.categoryId === categoryId &&
    initialFilters.search === search &&
    initialFilters.page === page;

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
    initialData: matchesInitialFilters ? initialProducts : undefined,
    placeholderData: (prev) => prev,
  });

  const categories = categoriesQuery.data ?? [];
  const result = productsQuery.data;
  const products = result?.items ?? [];
  const total = result?.total ?? 0;
  const totalPages = result?.totalPages ?? 1;
  const loading = productsQuery.isLoading || productsQuery.isFetching;

  const activeBuyerFilters = useMemo(
    () =>
      [technique, material, moq, leadTime].filter((value) => value !== "Any"),
    [technique, material, moq, leadTime],
  );

  const activeCategory = useMemo(
    () => categories.find((item) => item.id === categoryId) ?? null,
    [categories, categoryId],
  );

  const pageTitle = search
    ? `Search: ${search}`
    : activeCategory
      ? activeCategory.name
      : "Product Catalog";

  const breadcrumbItems =
    activeCategory || search
      ? trail(
          { name: "Products", path: "/products" },
          activeCategory
            ? { name: activeCategory.name }
            : { name: `Search: ${search.slice(0, 40)}` },
        )
      : trail({ name: "Products" });

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <StoreBreadcrumb items={breadcrumbItems} className="mb-5" />
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-[0.14em] text-store-muted uppercase">
          Offset · Screen · Bulk catalog
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-store-navy sm:text-4xl">
          {pageTitle}
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

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-lg border border-store-line bg-store-surface p-4 lg:sticky lg:top-24">
          <p className="text-sm font-semibold text-store-navy">Filters</p>

          <div className="mt-4 space-y-6">
            <FilterSection title="Category">
              <CategoryTabs
                categories={categories}
                categoryId={categoryId}
                onSelect={selectCategory}
              />
            </FilterSection>

            <FilterSection title="Print technique">
              <FilterSelect
                value={technique}
                onChange={setTechnique}
                options={["Any", ...catalogFilters.techniques]}
              />
            </FilterSection>

            <FilterSection title="Material / GSM">
              <FilterSelect
                value={material}
                onChange={setMaterial}
                options={["Any", ...catalogFilters.materials]}
              />
            </FilterSection>

            <FilterSection title="MOQ range">
              <FilterSelect
                value={moq}
                onChange={setMoq}
                options={["Any", ...catalogFilters.moqRanges]}
              />
            </FilterSection>

            <FilterSection title="Lead time">
              <FilterSelect
                value={leadTime}
                onChange={setLeadTime}
                options={["Any", ...catalogFilters.leadTimes]}
              />
            </FilterSection>
          </div>

          {activeBuyerFilters.length > 0 ? (
            <p className="mt-5 border-t border-store-line pt-4 text-xs text-store-muted">
              Buyer filters: {activeBuyerFilters.join(", ")}
            </p>
          ) : null}
        </aside>

        <div>
          <p className="mb-4 text-sm text-store-muted">
            {total} product{total === 1 ? "" : "s"} found
          </p>

          {productsQuery.isError ? (
            <p className="text-sm text-rose-600">Could not load products.</p>
          ) : loading && products.length === 0 ? (
            <ProductGridSkeleton />
          ) : products.length === 0 ? (
            <p className="rounded-lg border border-store-line bg-store-surface px-5 py-10 text-center text-sm text-store-muted">
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
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-store-line pb-5 last:border-b-0 last:pb-0">
      <p className="mb-2 text-xs font-semibold text-store-muted uppercase">
        {title}
      </p>
      {children}
    </section>
  );
}

function CategoryTabs({
  categories,
  categoryId,
  onSelect,
}: {
  categories: StoreCategoryItem[];
  categoryId: number | null;
  onSelect: (categoryId: number | null) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const [canScrollDown, setCanScrollDown] = useState(false);

  useLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollHeight - el.clientHeight;
      setCanScrollDown(max > 4 && el.scrollTop < max - 4);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const resize = new ResizeObserver(update);
    resize.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      resize.disconnect();
    };
  }, [categories]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const active = el.querySelector<HTMLElement>('[data-active="true"]');
    active?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [categoryId, categories]);

  return (
    <div className="relative">
      <div
        ref={listRef}
        role="tablist"
        aria-label="Product categories"
        className="flex max-h-56 flex-col gap-1 overflow-y-auto overscroll-contain pr-1 scrollbar-thin sm:max-h-64 lg:max-h-[min(50vh,20rem)]"
      >
        <CategoryTab
          active={categoryId === null}
          onClick={() => onSelect(null)}
        >
          All
        </CategoryTab>
        {categories.map((category) => (
          <CategoryTab
            key={category.id}
            active={categoryId === category.id}
            onClick={() => onSelect(category.id)}
          >
            {category.name}
          </CategoryTab>
        ))}
      </div>
      {canScrollDown ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-store-surface to-transparent"
          aria-hidden
        />
      ) : null}
    </div>
  );
}

function CategoryTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      data-active={active ? "true" : "false"}
      onClick={onClick}
      className={`w-full shrink-0 rounded-md border px-3 py-2 text-left text-sm ${
        active
          ? "border-store-navy bg-store-navy font-semibold text-white"
          : "border-store-line bg-store-paper text-store-ink hover:border-store-navy/40"
      }`}
    >
      {children}
    </button>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-md border border-store-line bg-store-paper px-3 py-2 text-sm text-store-ink"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border border-store-line bg-store-surface"
        >
          <div className="aspect-square animate-pulse bg-store-line/60" />
          <div className="space-y-2 p-4">
            <div className="h-4 w-3/4 animate-pulse rounded bg-store-line/60" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-store-line/50" />
          </div>
        </div>
      ))}
    </div>
  );
}
