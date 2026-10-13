"use client";

import Link from "next/link";
import type { StoreProductItem } from "@/app/actions/store/catalog";
import { categoryPath, productPath } from "@/app/lib/seo/paths";
import { formatInr } from "@/app/lib/format/currency";

export function StoreProductCard({ product }: { product: StoreProductItem }) {
  const detailHref = productPath(product.slug);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-store-line bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-store-navy hover:shadow-[0_22px_40px_-22px_rgba(15,61,102,0.45)]">
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

      <div className="flex flex-1 flex-col bg-white px-4 pt-4 pb-4">
        {product.categoryName && product.categorySlug ? (
          <Link
            href={categoryPath(product.categorySlug)}
            className="text-[11px] font-semibold tracking-[0.12em] text-store-muted uppercase hover:text-store-navy"
          >
            {product.categoryName}
          </Link>
        ) : product.categoryName ? (
          <p className="text-[11px] font-semibold tracking-[0.12em] text-store-muted uppercase">
            {product.categoryName}
          </p>
        ) : null}

        <Link href={detailHref} className="mt-1.5">
          <h3 className="line-clamp-2 min-h-11 text-base leading-snug font-semibold text-store-ink group-hover:text-store-navy">
            {product.titleName}
          </h3>
        </Link>

        {product.shortDescription ? (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-store-muted">
            {product.shortDescription}
          </p>
        ) : null}

        <p className="mt-3 text-sm text-store-muted">
          From{" "}
          <span className="text-base font-semibold text-store-ink">
            {formatInr(product.pricing)}
          </span>{" "}
          / pc
        </p>
        <p className="mt-1 text-xs text-store-muted">MOQ {product.quantity}+</p>

        <div className="mt-auto pt-4">
          <Link
            href={detailHref}
            className="block rounded-full border border-store-navy bg-store-paper px-3 py-2.5 text-center text-sm font-semibold text-store-navy transition hover:bg-store-navy hover:text-white"
          >
            View Product
          </Link>
        </div>
      </div>
    </article>
  );
}
