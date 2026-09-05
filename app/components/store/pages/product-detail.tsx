"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { StoreProductDetail } from "@/app/actions/store/catalog";
import { StoreBreadcrumb } from "@/app/components/store/ui/breadcrumb";
import { useQuotePopup } from "@/app/components/store/ui/quote-popup";
import { trail } from "@/app/lib/seo/breadcrumbs";
import { formatInr } from "@/app/lib/format/currency";

const ORDER_STEPS = [
  {
    title: "Share quantity & artwork",
    body: "Tell us MOQ, size, and city. Send AI / PDF / PNG on WhatsApp or email after you enquire.",
  },
  {
    title: "Approve digital proof",
    body: "We confirm rate and share a soft proof. Printing starts only after you approve.",
  },
  {
    title: "Bulk print & dispatch",
    body: "Noida production, packed to your brief, with courier tracking across India.",
  },
] as const;

const TRUST_POINTS = [
  { label: "Proof first", hint: "No print without your OK" },
  { label: "Noida plant", hint: "Offset & screen in-house" },
  { label: "Pan-India", hint: "Courier with tracking" },
] as const;

export function ProductDetailView({ product }: { product: StoreProductDetail }) {
  const gallery = useMemo(() => {
    const images = [product.image, ...product.imageGallery].filter(
      Boolean,
    ) as string[];
    return images.length > 0 ? images : [null];
  }, [product.image, product.imageGallery]);

  const [activeImage, setActiveImage] = useState(0);
  const moq = Math.max(1, product.quantity || 1);
  const [orderQty, setOrderQty] = useState(moq);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const { openQuotePopup } = useQuotePopup();

  const needsSize = product.sizes.length > 0;
  const needsColor = product.colors.length > 0;
  const canEnquire =
    orderQty >= moq &&
    (!needsSize || Boolean(selectedSize)) &&
    (!needsColor || Boolean(selectedColor));

  const breadcrumbItems = trail(
    { name: "Products", path: "/products" },
    ...(product.categoryName && product.categoryId
      ? [
          {
            name: product.categoryName,
            path: `/products?categoryId=${product.categoryId}`,
          },
        ]
      : []),
    { name: product.titleName },
  );

  function openEnquiry(intent?: string) {
    if (!canEnquire) return;
    openQuotePopup({
      product: product.titleName,
      category: product.categoryName ?? undefined,
      imageUrl: product.image ?? undefined,
      quantity: orderQty,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
      intent,
    });
  }

  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <StoreBreadcrumb items={breadcrumbItems} className="mb-6" />

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-12">
        {/* Gallery — trust block only on desktop beside the long buy panel */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-store-line bg-[#eef2f6] shadow-[0_24px_48px_-32px_rgba(15,61,102,0.35)]">
            {gallery[activeImage] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={gallery[activeImage]!}
                alt={product.titleName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-store-muted">
                {product.titleName}
              </div>
            )}
          </div>

          {gallery.length > 1 ? (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {gallery.map((src, index) => (
                <button
                  key={`${src}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1}`}
                  className={`size-16 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                    activeImage === index
                      ? "border-store-navy"
                      : "border-store-line hover:border-store-navy/40"
                  }`}
                >
                  {src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </button>
              ))}
            </div>
          ) : null}

          <div className="mt-6 hidden space-y-4 lg:block">
            <div className="rounded-2xl border border-store-line bg-store-surface px-5 py-5">
              <p className="text-xs font-semibold tracking-[0.14em] text-store-muted uppercase">
                How bulk orders work
              </p>
              <ol className="mt-4 space-y-4">
                {ORDER_STEPS.map((step, index) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-store-navy text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-store-ink">
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-store-muted">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {TRUST_POINTS.map((point) => (
                <div
                  key={point.label}
                  className="rounded-xl border border-store-line bg-white px-3 py-3 text-center"
                >
                  <p className="text-xs font-semibold text-store-navy">
                    {point.label}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-store-muted">
                    {point.hint}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buy / configure panel */}
        <div className="lg:sticky lg:top-24">
          {product.categoryName ? (
            <Link
              href={`/products?categoryId=${product.categoryId}`}
              className="text-xs font-semibold tracking-[0.14em] text-store-muted uppercase hover:text-store-navy"
            >
              {product.categoryName}
            </Link>
          ) : (
            <p className="text-xs font-semibold tracking-[0.14em] text-store-muted uppercase">
              Catalog
            </p>
          )}

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-store-navy sm:text-4xl">
            {product.titleName}
          </h1>

          <div className="mt-5 rounded-2xl border border-store-line bg-store-paper/80 px-5 py-4">
            <p className="text-sm text-store-muted">Starting from</p>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-3xl font-bold tracking-tight text-store-ink">
                {formatInr(product.pricing)}
              </span>
              <span className="text-sm text-store-muted">/ unit</span>
            </p>
            <p className="mt-2 text-sm text-store-muted">
              Minimum order{" "}
              <span className="font-semibold text-store-ink">{moq}+</span>
            </p>
          </div>

          {product.descriptionContent ? (
            <p className="mt-5 text-sm leading-relaxed whitespace-pre-line text-store-muted">
              {product.descriptionContent}
            </p>
          ) : (
            <p className="mt-5 text-sm leading-relaxed text-store-muted">
              Choose quantity
              {needsSize ? ", size" : ""}
              {needsColor ? ", and colour" : ""} — then request a quote. Anita
              Printers (Noida) confirms rate, proof, and delivery.
            </p>
          )}

          <div className="mt-6 space-y-5 rounded-2xl border border-store-line bg-white p-4 sm:p-5">
            <p className="text-xs font-semibold tracking-[0.14em] text-store-muted uppercase">
              1. Select options
            </p>

            {/* Quantity */}
            <div>
              <label
                htmlFor="pdp-qty"
                className="text-sm font-medium text-store-ink"
              >
                Quantity
              </label>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setOrderQty((q) => Math.max(moq, q - 1))}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-store-line bg-store-paper text-lg text-store-ink transition hover:border-store-navy/40"
                >
                  −
                </button>
                <input
                  id="pdp-qty"
                  type="number"
                  min={moq}
                  step={1}
                  value={orderQty}
                  onChange={(e) => {
                    const next = Number(e.target.value);
                    setOrderQty(
                      Number.isFinite(next) && next >= moq
                        ? Math.floor(next)
                        : moq,
                    );
                  }}
                  className="h-11 w-28 rounded-xl border border-store-line bg-store-paper px-3 text-center text-sm font-semibold tabular-nums text-store-ink outline-none focus:border-store-navy/40 focus:ring-2 focus:ring-store-navy/10"
                />
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setOrderQty((q) => Math.min(1_000_000, q + 1))}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-store-line bg-store-paper text-lg text-store-ink transition hover:border-store-navy/40"
                >
                  +
                </button>
                <span className="text-xs text-store-muted">MOQ {moq}</span>
              </div>
            </div>

            {/* Size dropdown */}
            {needsSize ? (
              <div>
                <label
                  htmlFor="pdp-size"
                  className="text-sm font-medium text-store-ink"
                >
                  Size
                </label>
                <select
                  id="pdp-size"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-store-line bg-store-paper px-3 text-sm text-store-ink outline-none focus:border-store-navy/40 focus:ring-2 focus:ring-store-navy/10"
                >
                  <option value="">Select size</option>
                  {product.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            {/* Colour chips */}
            {needsColor ? (
              <div>
                <p className="text-sm font-medium text-store-ink">Colour</p>
                <div
                  className="mt-2 flex flex-wrap gap-2"
                  role="radiogroup"
                  aria-label="Colour"
                >
                  {product.colors.map((color) => {
                    const active = selectedColor === color;
                    return (
                      <button
                        key={color}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setSelectedColor(color)}
                        className={`rounded-full border px-3.5 py-2 text-sm transition ${
                          active
                            ? "border-store-navy bg-store-navy font-semibold text-white"
                            : "border-store-line bg-store-paper text-store-ink hover:border-store-navy/40"
                        }`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {!canEnquire ? (
              <p className="text-xs text-store-muted">
                Select
                {needsSize && !selectedSize ? " size" : ""}
                {needsSize && !selectedSize && needsColor && !selectedColor
                  ? " and"
                  : ""}
                {needsColor && !selectedColor ? " colour" : ""} to continue.
              </p>
            ) : (
              <p className="text-xs font-medium text-store-navy">
                Ready — {orderQty} units
                {selectedSize ? ` · ${selectedSize}` : ""}
                {selectedColor ? ` · ${selectedColor}` : ""}
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              disabled={!canEnquire}
              onClick={() => openEnquiry()}
              className="flex-1 rounded-full bg-store-navy px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-store-navy-dark disabled:cursor-not-allowed disabled:opacity-45"
            >
              Get a Quote
            </button>
            <button
              type="button"
              disabled={!canEnquire}
              onClick={() => openEnquiry("sample")}
              className="flex-1 rounded-full border border-store-navy px-5 py-3 text-center text-sm font-semibold text-store-navy transition hover:bg-store-navy hover:text-white disabled:cursor-not-allowed disabled:opacity-45"
            >
              Request sample
            </button>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-store-muted">
            Your quantity, size, and colour go into the quote form automatically.
          </p>
        </div>
      </div>

      <section className="mt-10 rounded-2xl border border-store-line bg-store-surface px-6 py-8 sm:px-8">
        <h2 className="text-lg font-bold text-store-navy">
          Ready to order in bulk?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-store-muted">
          Tell us quantity, city, and deadline. Anita Printers (Noida) will
          confirm pricing, proof, and dispatch.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={!canEnquire}
            onClick={() => openEnquiry()}
            className="rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-45"
          >
            Enquire now
          </button>
          <Link
            href="/products"
            className="rounded-full border border-store-line px-5 py-2.5 text-sm font-semibold text-store-ink transition hover:border-store-navy hover:text-store-navy"
          >
            Back to catalog
          </Link>
        </div>
      </section>
    </article>
  );
}
