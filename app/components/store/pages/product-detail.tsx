"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Phone,
  ReceiptIndianRupee,
  Ruler,
  ShieldCheck,
  Truck,
} from "lucide-react";
import type {
  StoreProductDetail,
  StoreProductItem,
} from "@/app/actions/store/catalog";
import { StoreBreadcrumb } from "@/app/components/store/ui/breadcrumb";
import { StoreProductCard } from "@/app/components/store/ui/product-card";
import { useQuotePopup } from "@/app/components/store/ui/quote-popup";
import { trail } from "@/app/lib/seo/breadcrumbs";
import { categoryPath } from "@/app/lib/seo/paths";
import { formatInr } from "@/app/lib/format/currency";
import { siteContact } from "@/app/lib/store/site-info";

const ORDER_STEPS = [
  {
    title: "Share requirements",
    body: "Tell us quantity, size, colour, and deadline. Your selections from this page go into the quote automatically.",
  },
  {
    title: "Receive quotation",
    body: "We confirm final pricing, MOQ fit, and production timeline for your specifications.",
  },
  {
    title: "Approve artwork & specs",
    body: "Send your artwork or request design help, then approve the digital proof before printing starts.",
  },
  {
    title: "Production & dispatch",
    body: "Bulk production at our Noida unit, quality check, packing, and courier dispatch.",
  },
] as const;

const SECTION_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "specifications", label: "Specifications" },
  { id: "customization", label: "Customization" },
  { id: "bulk-orders", label: "Bulk orders" },
] as const;

const BENEFITS = [
  {
    icon: ShieldCheck,
    label: "Proof before print",
    body: "Approve the digital proof — nothing goes to press without your sign-off.",
  },
  {
    icon: ReceiptIndianRupee,
    label: "GST invoices for businesses",
    body: "Proper tax invoices on every order — built for B2B accounting.",
  },
  {
    icon: Truck,
    label: "Pan-India dispatch",
    body: "Packed and couriered from our Noida unit to cities across India.",
  },
  {
    icon: Ruler,
    label: "Custom sizes & finishes",
    body: "Sizes, materials, and finishes tailored to your brief, not a fixed catalog.",
  },
] as const;

export function ProductDetailView({
  product,
  related,
}: {
  product: StoreProductDetail;
  related: StoreProductItem[];
}) {
  const gallery = useMemo(() => {
    const images = [product.image, ...product.imageGallery].filter(
      Boolean,
    ) as string[];
    return images.length > 0 ? images : [null];
  }, [product.image, product.imageGallery]);

  const [activeImage, setActiveImage] = useState(0);
  const moq = Math.max(1, product.quantity || 1);
  const defaultSize = product.defaultSize?.trim() || "Custom";
  const defaultColor = product.defaultColor?.trim() || "Red";

  const sizePresets = useMemo(() => {
    const list = [...product.sizes];
    if (!list.some((s) => s.toLowerCase() === defaultSize.toLowerCase())) {
      list.unshift(defaultSize);
    }
    return Array.from(new Set(list));
  }, [product.sizes, defaultSize]);

  const colorPresets = useMemo(() => {
    const list = [...product.colors];
    if (!list.some((c) => c.toLowerCase() === defaultColor.toLowerCase())) {
      list.unshift(defaultColor);
    }
    return Array.from(new Set(list));
  }, [product.colors, defaultColor]);

  const [orderQty, setOrderQty] = useState(moq);
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const { openQuotePopup } = useQuotePopup();

  const hasSizeOptions = sizePresets.length > 0;
  const hasColorOptions = colorPresets.length > 0;
  const canEnquire = orderQty >= moq;

  const categoryHref = product.categorySlug
    ? categoryPath(product.categorySlug)
    : "/products";

  const breadcrumbItems = trail(
    { name: "Products", path: "/products" },
    ...(product.categoryName && product.categorySlug
      ? [{ name: product.categoryName, path: categoryHref }]
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
      size: hasSizeOptions ? selectedSize.trim() || undefined : undefined,
      color: hasColorOptions ? selectedColor.trim() || undefined : undefined,
      intent,
    });
  }

  const specificationRows: Array<{ label: string; value: string }> = [
    { label: "Product", value: product.titleName },
    ...(product.categoryName
      ? [{ label: "Category", value: product.categoryName }]
      : []),
    { label: "Minimum order", value: `${moq}+ units` },
    {
      label: "Starting price",
      value: `${formatInr(product.pricing)} / unit*`,
    },
    ...(product.sizes.length > 0
      ? [{ label: "Available sizes", value: product.sizes.join(", ") }]
      : []),
    ...(product.colors.length > 0
      ? [{ label: "Available colours", value: product.colors.join(", ") }]
      : []),
  ];

  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <StoreBreadcrumb items={breadcrumbItems} className="mb-6" />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Gallery */}
        <div className="min-w-0 space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-store-line bg-store-navy-deeper shadow-[0_24px_48px_-32px_rgba(15,61,102,0.35)]">
            {gallery[activeImage] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={gallery[activeImage]!}
                alt={product.titleName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_top,rgba(29,111,184,0.35),transparent_55%),linear-gradient(160deg,#0b1f33_0%,#163a5c_100%)] px-6 text-center">
                <p className="text-xs font-semibold tracking-[0.16em] text-store-accent uppercase">
                  Anita Printers
                </p>
                <p className="max-w-xs text-lg font-bold tracking-tight text-white sm:text-xl">
                  {product.titleName}
                </p>
                <p className="text-sm text-white/65">
                  Custom print · Noida production
                </p>
              </div>
            )}
          </div>

          {gallery.length > 1 ? (
            <div className="flex gap-2 overflow-x-auto pb-1" role="list">
              {gallery.map((src, index) => (
                <button
                  key={`${src}-${index}`}
                  type="button"
                  role="listitem"
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1} of ${product.titleName}`}
                  aria-current={activeImage === index}
                  className={`size-16 shrink-0 overflow-hidden rounded-xl border-2 transition focus-visible:ring-2 focus-visible:ring-store-navy/40 focus-visible:outline-none ${
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

          {/* Why businesses choose us */}
          <div className="rounded-2xl border border-store-line bg-white px-5 py-5">
            <p className="text-xs font-semibold tracking-[0.14em] text-store-muted uppercase">
              Why businesses choose us
            </p>
            <ul className="mt-3 space-y-3">
              {BENEFITS.map(({ icon: Icon, label, body }) => (
                <li
                  key={label}
                  className="flex items-start gap-2.5 text-sm text-store-ink"
                >
                  <Icon
                    className="mt-0.5 h-4 w-4 shrink-0 text-store-accent"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                  <span>
                    {label}
                    <span className="block text-xs leading-relaxed text-store-muted">
                      {body}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick order desk */}
          <div className="rounded-2xl border border-store-line bg-store-paper/80 px-5 py-5">
            <p className="text-xs font-semibold tracking-[0.14em] text-store-muted uppercase">
              Quick order desk
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-store-muted">
              Prefer to talk? Call or WhatsApp our Noida desk — we reply with
              MOQ and lead time.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={siteContact.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-store-navy px-4 py-2 text-xs font-semibold text-white transition hover:bg-store-navy-dark"
              >
                <Phone className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
                {siteContact.phone}
              </a>
              <a
                href={siteContact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-store-line bg-white px-4 py-2 text-xs font-semibold text-store-ink transition hover:border-[#25D366] hover:text-[#128C7E]"
              >
                <MessageCircle
                  className="h-3.5 w-3.5"
                  strokeWidth={2.25}
                  aria-hidden
                />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Quote configuration panel */}
        <div className="flex h-full flex-col rounded-2xl border border-store-line bg-white p-4 shadow-[0_18px_40px_-28px_rgba(15,61,102,0.35)] sm:p-5">
          {product.categoryName && product.categorySlug ? (
            <Link
              href={categoryHref}
              className="text-xs font-semibold tracking-[0.14em] text-store-muted uppercase hover:text-store-navy"
            >
              {product.categoryName}
            </Link>
          ) : (
            <p className="text-xs font-semibold tracking-[0.14em] text-store-muted uppercase">
              Catalog
            </p>
          )}

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-store-navy sm:text-3xl">
            {product.titleName}
          </h1>

          {product.descriptionContent ? (
            <p className="mt-3 text-sm leading-relaxed text-store-muted">
              {product.descriptionContent.split("\n")[0]}
            </p>
          ) : null}

          <div className="mt-4 rounded-xl border border-store-line bg-store-paper/80 px-4 py-3.5">
            <p className="text-sm text-store-muted">Pricing is customized</p>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-sm text-store-muted">Starting from</span>
              <span className="text-2xl font-bold tracking-tight text-store-ink sm:text-3xl">
                {formatInr(product.pricing)}
              </span>
              <span className="text-sm text-store-muted">/ unit</span>
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-store-muted">
              * Final price depends on quantity, size, and finish — confirmed in
              your written quotation. Minimum order{" "}
              <span className="font-semibold text-store-ink">{moq}+</span>.
            </p>
          </div>

          <div className="mt-5 space-y-5">
            <p className="text-xs font-semibold tracking-[0.14em] text-store-muted uppercase">
              Configure your order
            </p>

            <div>
              <label
                htmlFor="pdp-qty"
                className="text-sm font-medium text-store-ink"
              >
                Quantity <span className="text-store-accent">*</span>
              </label>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setOrderQty((q) => Math.max(moq, q - 1))}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-store-line bg-store-paper text-lg text-store-ink transition hover:border-store-navy/40 focus-visible:ring-2 focus-visible:ring-store-navy/20 focus-visible:outline-none"
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
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-store-line bg-store-paper text-lg text-store-ink transition hover:border-store-navy/40 focus-visible:ring-2 focus-visible:ring-store-navy/20 focus-visible:outline-none"
                >
                  +
                </button>
                <span className="text-xs text-store-muted">MOQ {moq}</span>
              </div>
            </div>

            {hasSizeOptions ? (
              <div>
                <label
                  htmlFor="pdp-size"
                  className="text-sm font-medium text-store-ink"
                >
                  Size
                </label>
                <div
                  className="mt-2 flex flex-wrap gap-2"
                  role="radiogroup"
                  aria-label="Size presets"
                >
                  {sizePresets.map((size) => {
                    const active =
                      selectedSize.trim().toLowerCase() === size.toLowerCase();
                    return (
                      <button
                        key={size}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-full border px-3.5 py-2 text-sm transition focus-visible:ring-2 focus-visible:ring-store-navy/20 focus-visible:outline-none ${
                          active
                            ? "border-store-navy bg-store-navy font-semibold text-white"
                            : "border-store-line bg-store-paper text-store-ink hover:border-store-navy/40"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
                <input
                  id="pdp-size"
                  type="text"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  placeholder="Or type a custom size"
                  className="mt-2 h-11 w-full rounded-xl border border-store-line bg-store-paper px-3 text-sm text-store-ink outline-none focus:border-store-navy/40 focus:ring-2 focus:ring-store-navy/10"
                />
              </div>
            ) : null}

            {hasColorOptions ? (
              <div>
                <label
                  htmlFor="pdp-color"
                  className="text-sm font-medium text-store-ink"
                >
                  Colour
                </label>
                <div
                  className="mt-2 flex flex-wrap gap-2"
                  role="radiogroup"
                  aria-label="Colour presets"
                >
                  {colorPresets.map((color) => {
                    const active =
                      selectedColor.trim().toLowerCase() === color.toLowerCase();
                    return (
                      <button
                        key={color}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setSelectedColor(color)}
                        className={`rounded-full border px-3.5 py-2 text-sm transition focus-visible:ring-2 focus-visible:ring-store-navy/20 focus-visible:outline-none ${
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
                <input
                  id="pdp-color"
                  type="text"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  placeholder="Or type a custom colour"
                  className="mt-2 h-11 w-full rounded-xl border border-store-line bg-store-paper px-3 text-sm text-store-ink outline-none focus:border-store-navy/40 focus:ring-2 focus:ring-store-navy/10"
                />
              </div>
            ) : null}

            {canEnquire ? (
              <p className="text-xs font-medium text-store-navy">
                Ready — {orderQty} units
                {hasSizeOptions && selectedSize.trim()
                  ? ` · ${selectedSize.trim()}`
                  : ""}
                {hasColorOptions && selectedColor.trim()
                  ? ` · ${selectedColor.trim()}`
                  : ""}
              </p>
            ) : (
              <p className="text-xs text-store-muted">
                Enter a quantity of at least {moq} to continue.
              </p>
            )}
          </div>

          <div className="mt-auto pt-6">
            <button
              type="button"
              disabled={!canEnquire}
              onClick={() => openEnquiry("pdp-quote")}
              className="w-full rounded-full bg-store-navy px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-store-navy-dark disabled:cursor-not-allowed disabled:opacity-45 focus-visible:ring-2 focus-visible:ring-store-navy/30 focus-visible:outline-none"
            >
              Get a Custom Quote
            </button>

            <p className="mt-3 text-xs leading-relaxed text-store-muted">
              Product, quantity, size, and colour go into the quote form
              automatically. Pricing and timeline are confirmed in the
              quotation — this is not an online checkout.
            </p>
          </div>
        </div>
      </div>

      {/* Section navigation */}
      <nav
        aria-label="Product sections"
        className="mt-12 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
      >
        <div className="flex gap-2 pb-1">
          {SECTION_LINKS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="shrink-0 rounded-full border border-store-line bg-white px-4 py-2 text-sm font-semibold text-store-ink transition hover:border-store-navy hover:text-store-navy focus-visible:ring-2 focus-visible:ring-store-navy/20 focus-visible:outline-none"
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Overview */}
      <section id="overview" className="mt-8 scroll-mt-28">
        <h2 className="text-lg font-bold text-store-navy sm:text-xl">
          Product overview
        </h2>
        {product.descriptionContent ? (
          <div className="mt-3 rounded-2xl border border-store-line bg-white px-5 py-5">
            <p className="text-sm leading-relaxed whitespace-pre-line text-store-muted">
              {product.descriptionContent}
            </p>
          </div>
        ) : (
          <div className="mt-3 rounded-2xl border border-store-line bg-white px-5 py-5">
            <p className="text-sm leading-relaxed text-store-muted">
              Bulk-ready custom print from Anita Printers (Noida). Configure
              quantity, size, and colour on this page, then request a quote —
              we confirm pricing, proof, and delivery in writing.
            </p>
          </div>
        )}
      </section>

      {/* Specifications */}
      <section id="specifications" className="mt-10 scroll-mt-28">
        <h2 className="text-lg font-bold text-store-navy sm:text-xl">
          Specifications
        </h2>
        <div className="mt-3 overflow-hidden rounded-2xl border border-store-line bg-white">
          <table className="w-full text-left text-sm">
            <tbody>
              {specificationRows.map((row) => (
                <tr key={row.label} className="border-b border-store-line last:border-b-0">
                  <th
                    scope="row"
                    className="w-2/5 bg-store-paper/60 px-4 py-3 font-semibold text-store-ink sm:px-5"
                  >
                    {row.label}
                  </th>
                  <td className="px-4 py-3 text-store-muted sm:px-5">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Customization */}
      <section id="customization" className="mt-10 scroll-mt-28">
        <h2 className="text-lg font-bold text-store-navy sm:text-xl">
          Customization options
        </h2>
        <p className="mt-2 text-sm text-store-muted">
          Select options above — they are attached to your quote request
          automatically.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-store-line bg-white px-5 py-5">
            <h3 className="text-sm font-semibold text-store-ink">Quantity</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-store-muted">
              Order from {moq}+ units. Bulk pricing is confirmed in the
              quotation.
            </p>
          </div>
          {hasSizeOptions ? (
            <div className="rounded-2xl border border-store-line bg-white px-5 py-5">
              <h3 className="text-sm font-semibold text-store-ink">Size</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-store-muted">
                Choose a preset or type a custom size.
              </p>
            </div>
          ) : null}
          {hasColorOptions ? (
            <div className="rounded-2xl border border-store-line bg-white px-5 py-5">
              <h3 className="text-sm font-semibold text-store-ink">Colour</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-store-muted">
                Choose a preset or type a custom colour/theme.
              </p>
            </div>
          ) : null}
          <div className="rounded-2xl border border-store-line bg-white px-5 py-5">
            <h3 className="text-sm font-semibold text-store-ink">
              Additional requirements
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-store-muted">
              Add notes in the quote form for artwork help, special finishes, or
              deadlines.
            </p>
          </div>
        </div>
      </section>

      {/* How bulk orders work */}
      <section id="bulk-orders" className="mt-10 scroll-mt-28">
        <h2 className="text-lg font-bold text-store-navy sm:text-xl">
          How bulk orders work
        </h2>
        <p className="mt-2 text-sm text-store-muted">
          A quotation-led process — no online payment or order tracking.
        </p>
        <ol className="mt-4 space-y-4 rounded-2xl border border-store-line bg-store-surface px-5 py-5">
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
        <button
          type="button"
          disabled={!canEnquire}
          onClick={() => openEnquiry("pdp-bulk")}
          className="mt-5 rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-store-navy-dark disabled:cursor-not-allowed disabled:opacity-45"
        >
          Enquire about this product
        </button>
      </section>

      {/* Related products */}
      {related.length > 0 ? (
        <section className="mt-12" aria-label="Related products">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-store-navy sm:text-xl">
              Related products
            </h2>
            {product.categorySlug ? (
              <Link
                href={categoryHref}
                className="text-sm font-semibold text-store-navy hover:underline"
              >
                View all {product.categoryName ?? "category"}
              </Link>
            ) : null}
          </div>
          <div className="mt-5 grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <StoreProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Bottom CTA */}
      <section className="mt-10 rounded-2xl border border-store-line bg-store-surface px-6 py-8 sm:px-8">
        <h2 className="text-lg font-bold text-store-navy">
          Ready to order in bulk?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-store-muted">
          Tell us quantity and requirements. Anita Printers (Noida) will
          confirm pricing, proof, and dispatch in a written quotation.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={!canEnquire}
            onClick={() => openEnquiry("pdp-bottom")}
            className="rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-45"
          >
            Get a Custom Quote
          </button>
          <Link
            href="/products"
            className="rounded-full border border-store-line px-5 py-2.5 text-sm font-semibold text-store-ink transition hover:border-store-navy hover:text-store-navy"
          >
            Back to products
          </Link>
        </div>
      </section>
    </article>
  );
}
