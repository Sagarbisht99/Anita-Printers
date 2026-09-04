"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { StoreProductDetail } from "@/app/actions/store/catalog";
import { StoreBreadcrumb } from "@/app/components/store/ui/breadcrumb";
import { QuoteButton } from "@/app/components/store/ui/quote-popup";
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

  const hasSpecs =
    product.sizes.length > 0 ||
    product.colors.length > 0 ||
    product.quantities.length > 0;

  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <StoreBreadcrumb items={breadcrumbItems} className="mb-6" />

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:items-start">
        {/* Gallery */}
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

          <div className="mt-6 space-y-4">
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

        {/* Buy / info panel */}
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
              <span className="font-semibold text-store-ink">
                {product.quantityLabel}+
              </span>
            </p>
          </div>

          {product.descriptionContent ? (
            <p className="mt-5 text-sm leading-relaxed text-store-muted whitespace-pre-line">
              {product.descriptionContent}
            </p>
          ) : (
            <p className="mt-5 text-sm leading-relaxed text-store-muted">
              Bulk-ready print product from Anita Printers, Noida. Share your
              quantity and artwork on WhatsApp or request a quote — we confirm
              rate, proof, and delivery timeline.
            </p>
          )}

          {product.quantities.length > 1 ? (
            <div className="mt-6">
              <p className="text-xs font-semibold tracking-[0.12em] text-store-muted uppercase">
                Available quantities
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.quantities.map((qty) => (
                  <span
                    key={qty}
                    className="rounded-full border border-store-line bg-white px-3 py-1.5 text-xs font-medium text-store-ink"
                  >
                    {qty}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {product.sizes.length > 0 ? (
            <div className="mt-5">
              <p className="text-xs font-semibold tracking-[0.12em] text-store-muted uppercase">
                Sizes
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="rounded-md border border-store-line bg-white px-3 py-1.5 text-xs font-medium text-store-ink"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {product.colors.length > 0 ? (
            <div className="mt-5">
              <p className="text-xs font-semibold tracking-[0.12em] text-store-muted uppercase">
                Colours
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="rounded-md border border-store-line bg-white px-3 py-1.5 text-xs font-medium text-store-ink"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuoteButton
              product={product.titleName}
              category={product.categoryName ?? undefined}
              imageUrl={product.image ?? undefined}
              className="flex-1 rounded-full bg-store-navy px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-store-navy-dark"
            >
              Get a Quote
            </QuoteButton>
            <QuoteButton
              product={product.titleName}
              category={product.categoryName ?? undefined}
              imageUrl={product.image ?? undefined}
              intent="sample"
              className="flex-1 rounded-full border border-store-navy px-5 py-3 text-center text-sm font-semibold text-store-navy transition hover:bg-store-navy hover:text-white"
            >
              Request sample
            </QuoteButton>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-store-muted">
            Share artwork on WhatsApp or email after you enquire — no upload
            needed on this page.
          </p>
        </div>
      </div>

      {hasSpecs ? (
        <section className="mt-12 border-t border-store-line pt-10">
          <h2 className="text-xl font-bold text-store-navy">Product details</h2>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {product.quantities.length > 0 ? (
              <SpecRow
                label="Quantities"
                value={product.quantities.join(", ")}
              />
            ) : null}
            {product.sizes.length > 0 ? (
              <SpecRow label="Sizes" value={product.sizes.join(", ")} />
            ) : null}
            {product.colors.length > 0 ? (
              <SpecRow label="Colours" value={product.colors.join(", ")} />
            ) : null}
            <SpecRow
              label="Base price"
              value={`${formatInr(product.pricing)} / unit`}
            />
            {product.categoryName ? (
              <SpecRow label="Category" value={product.categoryName} />
            ) : null}
          </dl>
        </section>
      ) : null}

      <section className="mt-10 rounded-2xl border border-store-line bg-store-surface px-6 py-8 sm:px-8">
        <h2 className="text-lg font-bold text-store-navy">
          Ready to order in bulk?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-store-muted">
          Tell us quantity, city, and deadline. Anita Printers (Noida) will
          confirm pricing, proof, and dispatch for corporate, retail, events,
          and school jobs.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <QuoteButton
            product={product.titleName}
            category={product.categoryName ?? undefined}
            imageUrl={product.image ?? undefined}
            className="rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white"
          >
            Enquire now
          </QuoteButton>
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

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-store-line bg-white px-4 py-3">
      <dt className="text-xs font-semibold tracking-widest text-store-muted uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-store-ink">{value}</dd>
    </div>
  );
}
