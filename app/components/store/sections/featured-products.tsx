"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  fetchStoreProducts,
  type StoreCategoryItem,
  type StoreProductItem,
} from "@/app/actions/store/catalog";
import { useQuotePopup } from "@/app/components/store/ui/quote-popup";
import { storefrontKeys } from "@/app/lib/query/keys";
import { categoryPath, productPath } from "@/app/lib/seo/paths";
import { formatInr } from "@/app/lib/format/currency";

const VISIBLE_PRODUCTS = 8;

function PopularPrintCard({ product }: { product: StoreProductItem }) {
  const { openQuotePopup } = useQuotePopup();
  const detailHref = productPath(product.slug);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-store-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-store-navy hover:shadow-[0_18px_36px_-22px_rgba(15,61,102,0.4)]">
      <Link
        href={detailHref}
        className="relative aspect-square shrink-0 overflow-hidden bg-[#eef2f6]"
      >
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.titleName}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-sm font-medium text-store-muted">
            {product.titleName}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col px-4 pt-3.5 pb-4">
        {product.categoryName && product.categorySlug ? (
          <Link
            href={categoryPath(product.categorySlug)}
            className="text-[10px] font-semibold tracking-[0.1em] text-store-muted uppercase hover:text-store-navy"
          >
            {product.categoryName}
          </Link>
        ) : product.categoryName ? (
          <p className="text-[10px] font-semibold tracking-[0.1em] text-store-muted uppercase">
            {product.categoryName}
          </p>
        ) : null}

        <Link href={detailHref} className="mt-1">
          <h3 className="line-clamp-2 text-sm leading-snug font-semibold text-store-ink group-hover:text-store-navy">
            {product.titleName}
          </h3>
        </Link>

        {product.shortDescription ? (
          <p className="mt-1.5 line-clamp-2 text-[11px] leading-snug font-medium text-[#3d4654]">
            {product.shortDescription}
          </p>
        ) : null}

        <p className="mt-2 text-xs text-store-muted">
          From{" "}
          <span className="text-sm font-semibold text-store-ink">
            {formatInr(product.pricing)}
          </span>{" "}
          / pc · MOQ {product.quantity}+
        </p>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-3.5">
          <button
            type="button"
            onClick={() =>
              openQuotePopup({
                product: product.titleName,
                category: product.categoryName ?? undefined,
                imageUrl: product.image ?? undefined,
                quantity: product.quantity || undefined,
                intent: "popular-prints",
              })
            }
            className="rounded-full bg-store-navy px-3 py-2 text-xs font-semibold text-white transition hover:bg-store-navy-dark"
          >
            Order
          </button>
          <Link
            href={detailHref}
            className="rounded-full border border-store-navy px-3 py-2 text-center text-xs font-semibold text-store-navy transition hover:bg-store-navy hover:text-white"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export function FeaturedProducts({
  categories,
  products,
}: {
  categories: StoreCategoryItem[];
  products: StoreProductItem[];
}) {
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const chipsRef = useRef<HTMLDivElement>(null);
  const [chipsCanScrollLeft, setChipsCanScrollLeft] = useState(false);
  const [chipsCanScrollRight, setChipsCanScrollRight] = useState(false);

  const updateChipScrollState = useCallback(() => {
    const el = chipsRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setChipsCanScrollLeft(el.scrollLeft > 4);
    setChipsCanScrollRight(max > 4 && el.scrollLeft < max - 4);
  }, []);

  useLayoutEffect(() => {
    updateChipScrollState();
    const el = chipsRef.current;
    if (!el) return;
    const onScroll = () => updateChipScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });
    const resize = new ResizeObserver(() => updateChipScrollState());
    resize.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      resize.disconnect();
    };
  }, [categories, updateChipScrollState]);

  const scrollChipsBy = (direction: -1 | 1) => {
    const el = chipsRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * Math.max(160, el.clientWidth * 0.6),
      behavior: "smooth",
    });
  };

  const productsQuery = useQuery({
    queryKey: storefrontKeys.products.list({
      categoryId: categoryId ?? "all",
      take: VISIBLE_PRODUCTS,
    }),
    queryFn: () =>
      fetchStoreProducts({ categoryId, take: VISIBLE_PRODUCTS }),
    initialData: categoryId === null ? products : undefined,
  });

  const filtered = productsQuery.data ?? [];
  const loading = productsQuery.isLoading || productsQuery.isFetching;

  if (categories.length === 0 && products.length === 0) return null;

  return (
    <section className="border-b border-store-line bg-store-paper">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-store-navy sm:text-3xl">
            Popular Prints
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-store-muted">
            Browse our most popular products across hang tags, packaging
            inserts, sticker labels, and more.
          </p>
        </div>

        {/* Category chips — 3–4 visible, rest via slider arrows */}
        <div className="relative mx-auto mt-7 w-full max-w-3xl">
          {chipsCanScrollLeft ? (
            <button
              type="button"
              onClick={() => scrollChipsBy(-1)}
              className="absolute top-1/2 left-0 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-store-line bg-white text-store-navy shadow-sm transition hover:border-store-navy/40"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2.25} aria-hidden />
            </button>
          ) : null}
          {chipsCanScrollRight ? (
            <button
              type="button"
              onClick={() => scrollChipsBy(1)}
              className="absolute top-1/2 right-0 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-store-line bg-white text-store-navy shadow-sm transition hover:border-store-navy/40"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
            </button>
          ) : null}

          <div
            ref={chipsRef}
            role="tablist"
            aria-label="Filter by category"
            className="flex gap-2 overflow-x-auto px-9 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden"
          >
          <button
            type="button"
            onClick={() => setCategoryId(null)}
            className={`snap-start shrink-0 rounded-full border px-4 py-2 text-xs font-semibold whitespace-nowrap transition sm:text-sm ${
              categoryId === null
                ? "border-store-navy bg-store-navy text-white"
                : "border-store-line bg-white text-store-ink hover:border-store-navy/40"
            }`}
          >
            All categories
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={categoryId === category.id}
              onClick={() => setCategoryId(category.id)}
              className={`snap-start shrink-0 rounded-full border px-4 py-2 text-xs font-semibold whitespace-nowrap transition sm:text-sm ${
                categoryId === category.id
                  ? "border-store-navy bg-store-navy text-white"
                  : "border-store-line bg-white text-store-ink hover:border-store-navy/40"
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
        ) : loading && filtered.length === 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-store-line bg-white"
              >
                <div className="aspect-square animate-pulse bg-store-line/60" />
                <div className="space-y-2 p-4">
                  <div className="h-3 w-3/4 animate-pulse rounded bg-store-line/60" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-store-line/50" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
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
            className={`mt-8 grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 ${
              loading ? "opacity-60" : ""
            }`}
          >
            {filtered
              .slice(0, VISIBLE_PRODUCTS)
              .map((product) => (
                <PopularPrintCard key={product.id} product={product} />
              ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full bg-store-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-store-navy-dark"
          >
            View All Products
            <ChevronRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
