"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  fetchStoreCategories,
  type StoreCategoryItem,
} from "@/app/actions/storefront";
import { storefrontKeys } from "@/app/lib/query/keys";

export function ExploreCategories({
  initialCategories,
}: {
  initialCategories: StoreCategoryItem[];
}) {
  const { data, isError } = useQuery({
    queryKey: storefrontKeys.categories.lists(),
    queryFn: fetchStoreCategories,
    initialData: initialCategories,
  });

  const categories = data ?? [];

  return (
    <section id="explore-categories" className="border-t border-store-line bg-store-paper">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-store-navy sm:text-3xl">
              Explore our categories
            </h2>
            <p className="mt-2 max-w-xl text-sm text-store-muted">
              From offset cards and packaging to screen apparel, bags, and
              gifting — pick a category or browse{" "}
              <Link href="/services" className="font-semibold text-store-navy hover:underline">
                offset &amp; screen services
              </Link>
              .
            </p>
          </div>
          <Link
            href="/products"
            className="shrink-0 text-sm font-semibold text-store-navy hover:underline"
          >
            View all
          </Link>
        </div>

        {isError ? (
          <p className="mt-8 text-sm text-rose-600">
            Could not load categories.
          </p>
        ) : categories.length === 0 ? (
          <p className="mt-8 text-sm text-store-muted">
            Categories will appear here once added. Meanwhile explore{" "}
            <Link href="/services" className="font-semibold text-store-navy hover:underline">
              offset &amp; screen printing services
            </Link>
            .
          </p>
        ) : (
          <div className="mt-8 flex gap-5 overflow-x-auto pb-2 sm:gap-6 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-4 xl:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?categoryId=${category.id}`}
                className="group flex w-[160px] shrink-0 flex-col items-center sm:w-[180px] md:w-auto"
              >
                <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#eef3f8] to-[#e4ebf2] p-4 transition group-hover:from-[#e6edf4] group-hover:to-[#dce5ee]">
                  {category.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={category.image}
                      alt=""
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span className="px-2 text-center text-xs font-medium tracking-wide text-store-muted uppercase">
                      {category.name}
                    </span>
                  )}
                </div>
                <p className="mt-3.5 line-clamp-2 text-center text-base font-medium text-store-ink group-hover:text-store-navy">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
