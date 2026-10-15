"use client";

import Link from "next/link";
import { ChevronRight, Layers, PackageCheck, Ruler, Sparkles } from "lucide-react";
import type { StoreCategoryCard } from "@/app/actions/store/catalog";
import { StoreBreadcrumb } from "@/app/components/store/ui/breadcrumb";
import { QuoteButton } from "@/app/components/store/ui/quote-popup";
import { trail } from "@/app/lib/seo/breadcrumbs";
import { categoryPath } from "@/app/lib/seo/paths";

const INDEX_PERKS = [
  { icon: Layers, label: "Every print product in one place" },
  { icon: Ruler, label: "Custom sizes & finishes" },
  { icon: PackageCheck, label: "Bulk & corporate orders" },
  { icon: Sparkles, label: "Pan-India delivery" },
] as const;

export function CategoriesIndexView({
  categories,
}: {
  categories: StoreCategoryCard[];
}) {
  const breadcrumbItems = trail({ name: "Categories" });
  const totalProducts = categories.reduce(
    (sum, category) => sum + category.productCount,
    0,
  );

  return (
    <article>
   
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12" aria-label="All printing categories">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-store-navy">
              All categories
            </h2>
            <p className="mt-1.5 text-sm text-store-muted">
              Pick a category to see products, MOQs, and customisation options.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-store-navy hover:underline"
          >
            Browse all products
            <ChevronRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-store-line bg-store-surface px-6 py-12 text-center">
            <p className="text-sm text-store-muted">
              No categories are listed yet — tell us what you need and we&apos;ll
              quote it.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <QuoteButton
                intent="categories-index-empty"
                className="rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-store-navy-dark"
              >
                Request a Quote
              </QuoteButton>
              <Link
                href="/products"
                className="rounded-full border border-store-line px-5 py-2.5 text-sm font-semibold text-store-ink transition hover:border-store-navy hover:text-store-navy"
              >
                Browse all products
              </Link>
            </div>
          </div>
        ) : (
          <ul className="mt-5 grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <li key={category.id} className="flex">
                <Link
                  href={categoryPath(category.slug)}
                  className="group flex w-full flex-col overflow-hidden rounded-2xl border border-store-line bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-store-navy hover:shadow-[0_22px_40px_-22px_rgba(15,61,102,0.45)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#eef2f6]">
                    {category.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={category.image}
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
                  <div className="flex flex-1 flex-col px-4 py-4">
                    <h3 className="text-base font-semibold leading-snug text-store-ink group-hover:text-store-navy">
                      {category.name}
                    </h3>
                    {category.description ? (
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-store-muted">
                        {category.description}
                      </p>
                    ) : null}
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <span className="text-xs font-medium text-store-muted tabular-nums">
                        {category.productCount}{" "}
                        {category.productCount === 1 ? "product" : "products"}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-store-navy">
                        View products
                        <ChevronRight
                          className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
                          strokeWidth={2.25}
                          aria-hidden
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-store-line bg-[#f2f5f9]">
          <div className="flex flex-col items-center gap-6 px-6 py-8 text-center sm:flex-row sm:px-8 sm:text-left">
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold tracking-tight text-store-navy sm:text-xl">
                Not sure which category fits your requirement?
              </h2>
              <p className="mt-1 text-sm text-store-muted">
                Share your specs on a call or through the quote form —
                we&apos;ll point you to the right product and quote it fairly.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap justify-center gap-3">
              <QuoteButton
                intent="categories-index-banner"
                className="rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-store-navy-dark"
              >
                Request a Quote
              </QuoteButton>
              <Link
                href="/products"
                className="rounded-full border border-store-line bg-white px-5 py-2.5 text-sm font-semibold text-store-ink transition hover:border-store-navy hover:text-store-navy"
              >
                Browse products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
