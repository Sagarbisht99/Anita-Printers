"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  fetchStoreCategories,
  fetchStoreProducts,
  type StoreCategoryItem,
  type StoreProductItem,
} from "@/app/actions/store/catalog";
import { StoreProductCard } from "@/app/components/store/ui/product-card";
import { storefrontKeys } from "@/app/lib/query/keys";
import Link from "next/link";

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
  const catalogHref =
    categoryId != null
      ? `/products?categoryId=${categoryId}`
      : "/products";

  return (
    <section id="curated-picks" className="bg-store-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <h2 className="text-center text-2xl font-bold tracking-tight text-store-navy sm:text-3xl">
          Popular Prints
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-store-muted">
          Pick a category — mugs, t-shirts, hoodies, gifts, and more.{" "}
          <Link
            href="/products"
            className="font-semibold text-store-navy hover:underline"
          >
            See full catalog
          </Link>
        </p>

        <div className="mt-8">
          <label className="mb-3 block text-center text-xs font-semibold text-store-muted uppercase">
            Choose category
          </label>
          <CategoryChipSlider
            categories={categories}
            categoryId={categoryId}
            onSelect={setCategoryId}
          />
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
                className="overflow-hidden rounded-lg border border-store-line bg-store-paper"
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
            No products in this category yet. Browse the{" "}
            <Link
              href="/products"
              className="font-semibold text-store-navy hover:underline"
            >
              full catalog
            </Link>{" "}
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

        <div className="mt-10 flex justify-center">
          <Link
            href={catalogHref}
            className="inline-flex items-center gap-2 rounded-full bg-store-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-store-navy-dark"
          >
            {categoryId != null ? "View category in catalog" : "View all products"}
            <ChevronRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CategoryChipSlider({
  categories,
  categoryId,
  onSelect,
}: {
  categories: StoreCategoryItem[];
  categoryId: number | null;
  onSelect: (id: number | null) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(max > 4 && el.scrollLeft < max - 4);
  }, []);

  useLayoutEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => updateScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });

    const resize = new ResizeObserver(() => updateScrollState());
    resize.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      resize.disconnect();
    };
  }, [categories, updateScrollState]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const active = el.querySelector<HTMLElement>('[data-active="true"]');
    active?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [categoryId, categories]);

  const scrollByAmount = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.max(220, el.clientWidth * 0.55), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-store-surface to-transparent transition-opacity sm:w-14 ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-store-surface to-transparent transition-opacity sm:w-14 ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
      />

      {canScrollLeft ? (
        <button
          type="button"
          onClick={() => scrollByAmount(-1)}
          className="absolute top-1/2 left-0 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-store-line bg-store-paper text-store-navy shadow-sm transition hover:border-store-navy/40"
          aria-label="Scroll categories left"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2.25} aria-hidden />
        </button>
      ) : null}

      {canScrollRight ? (
        <button
          type="button"
          onClick={() => scrollByAmount(1)}
          className="absolute top-1/2 right-0 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-store-line bg-store-paper text-store-navy shadow-sm transition hover:border-store-navy/40"
          aria-label="Scroll categories right"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
        </button>
      ) : null}

      <div
        ref={scrollerRef}
        role="tablist"
        aria-label="Product categories"
        className="flex gap-2 overflow-x-auto px-1 py-1 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden"
      >
        <CategoryTab
          active={categoryId === null}
          onClick={() => onSelect(null)}
        >
          All products
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
      className={`snap-start shrink-0 rounded-md border px-4 py-2.5 text-sm whitespace-nowrap transition ${
        active
          ? "border-store-navy bg-store-navy font-semibold text-white"
          : "border-store-line bg-store-paper text-store-ink hover:border-store-navy/40"
      }`}
    >
      {children}
    </button>
  );
}
