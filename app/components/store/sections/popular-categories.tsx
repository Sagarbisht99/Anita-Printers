"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type {
  StoreCategoryItem,
  StoreProductItem,
} from "@/app/actions/store/catalog";
import { categoryPath } from "@/app/lib/seo/paths";

const SLIDER_CATEGORIES = 6;

export function PopularCategories({
  categories,
  products,
}: {
  categories: StoreCategoryItem[];
  products: StoreProductItem[];
}) {
  const imageByCategoryId = new Map<number, string>();
  for (const product of products) {
    if (
      product.categoryId &&
      product.image &&
      !imageByCategoryId.has(product.categoryId)
    ) {
      imageByCategoryId.set(product.categoryId, product.image);
    }
  }

  const featured = categories.slice(0, SLIDER_CATEGORIES);
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
  }, [featured.length, updateScrollState]);

  const scrollByAmount = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * Math.max(240, el.clientWidth * 0.7),
      behavior: "smooth",
    });
  };

  if (featured.length === 0) return null;

  return (
    <section className="bg-store-surface">
      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-9">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
          
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-store-navy sm:text-3xl">
              Popular categories
            </h2>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-store-navy hover:underline"
          >
            View All Categories
            <ChevronRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
          </Link>
        </div>

        <div className="relative mt-8">
          {canScrollLeft ? (
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              className="absolute top-1/2 left-0 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-store-line bg-white text-store-navy shadow-md transition hover:border-store-navy/40"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.25} aria-hidden />
            </button>
          ) : null}
          {canScrollRight ? (
            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              className="absolute top-1/2 right-0 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-store-line bg-white text-store-navy shadow-md transition hover:border-store-navy/40"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.25} aria-hidden />
            </button>
          ) : null}

          <div
            ref={scrollerRef}
            role="list"
            aria-label="Popular categories"
            className="flex gap-5 overflow-x-auto px-0.5 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden"
          >
            {featured.map((category) => {
              const image = imageByCategoryId.get(category.id);
              return (
                <Link
                  key={category.id}
                  role="listitem"
                  href={categoryPath(category.slug)}
                  className="group w-[min(72vw,220px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-store-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-store-navy hover:shadow-[0_22px_40px_-22px_rgba(15,61,102,0.45)] sm:w-[200px] lg:w-[calc((100%-6.25rem)/6)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#eef2f6]">
                    {image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={image}
                        alt={category.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-store-navy to-store-navy-deeper px-4 text-center">
                        <span className="text-sm font-semibold text-white/90">
                          {category.name}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="px-3.5 py-3">
                    <h3 className="text-sm font-semibold leading-snug text-store-ink group-hover:text-store-navy">
                      {category.name}
                    </h3>
                    {category.description ? (
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-store-muted">
                        {category.description}
                      </p>
                    ) : null}
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-store-navy">
                      View products
                      <ChevronRight
                        className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
                        strokeWidth={2.25}
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

     
      </div>
    </section>
  );
}
