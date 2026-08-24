"use client";

import Link from "next/link";
import type { StoreProductItem } from "@/app/actions/storefront";
import { QuoteButton } from "@/app/components/storefront/quote-popup";
import { defaultPriceTiers } from "@/app/lib/storefront/b2b-content";

function formatInr(amount: number) {
  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
}

const swatches = ["#0f3d66", "#1d6fb8", "#c43b58", "#ffffff", "#5c6b7a"];

export function StoreProductCard({ product }: { product: StoreProductItem }) {
  const detailHref = `/products/${encodeURIComponent(product.slug)}`;
  const tierPreview = defaultPriceTiers.slice(0, 2).map((tier) => ({
    range: tier.range,
    unit: Math.max(1, Math.round(product.pricing * tier.multiplier)),
  }));

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-store-line bg-white transition hover:border-store-navy/30 hover:shadow-[0_18px_40px_-28px_rgba(29,111,184,0.45)]">
      <Link
        href={detailHref}
        className="relative aspect-square shrink-0 overflow-hidden bg-[#eef2f6]"
      >
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.titleName}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-sm font-medium text-store-muted">
            {product.titleName}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col bg-white px-4 pt-4 pb-4">
        <Link href={detailHref}>
          <h3 className="line-clamp-2 min-h-[3rem] text-base leading-snug font-semibold text-store-ink hover:text-store-navy">
            {product.titleName}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-store-muted">
          From{" "}
          <span className="font-semibold text-store-ink">
            {formatInr(product.pricing)}
          </span>{" "}
          / pc · {product.quantityLabel}+ MOQ
        </p>

        <ul className="mt-3 space-y-1 text-xs text-store-muted">
          {tierPreview.map((tier) => (
            <li key={tier.range}>
              {tier.range} @{" "}
              <span className="font-semibold text-store-ink">
                {formatInr(tier.unit)}
              </span>
              /pc
            </li>
          ))}
        </ul>

        <div className="mt-3 flex items-center gap-1.5">
          {swatches.map((color) => (
            <span
              key={color}
              title="Colour / material swatch"
              className="h-4 w-4 rounded-full border border-store-line"
              style={{ backgroundColor: color }}
            />
          ))}
          <span className="ml-1 text-[11px] text-store-muted">+ more</span>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <Link
            href={detailHref}
            className="flex-1 rounded-full border border-store-navy bg-store-paper px-3 py-2.5 text-center text-sm font-semibold text-store-navy transition hover:bg-store-navy hover:text-white"
          >
            View
          </Link>
          <QuoteButton
            product={product.titleName}
            category={product.categoryName ?? undefined}
            className="flex-1 rounded-full bg-store-navy px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-store-navy-dark"
          >
            Order
          </QuoteButton>
        </div>
      </div>
    </article>
  );
}
