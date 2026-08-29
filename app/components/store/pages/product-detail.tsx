"use client";

import { useMemo, useState } from "react";
import type { StoreProductDetail } from "@/app/actions/store/catalog";
import { QuoteButton } from "@/app/components/store/ui/quote-popup";
import {
  defaultPriceTiers,
  printLocations,
} from "@/app/lib/store/b2b-content";

function formatInr(amount: number) {
  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
}

export function ProductDetailView({ product }: { product: StoreProductDetail }) {
  const gallery = useMemo(() => {
    const images = [
      product.image,
      ...product.imageGallery,
    ].filter(Boolean) as string[];
    return images.length > 0 ? images : [null];
  }, [product.image, product.imageGallery]);

  const [activeImage, setActiveImage] = useState(0);
  const [method, setMethod] = useState("Offset");
  const [locations, setLocations] = useState<string[]>(["Front chest"]);
  const [fileName, setFileName] = useState("");

  const tiers = defaultPriceTiers.map((tier) => ({
    ...tier,
    unit: Math.max(1, Math.round(product.pricing * tier.multiplier)),
  }));

  function toggleLocation(location: string) {
    setLocations((prev) =>
      prev.includes(location)
        ? prev.filter((item) => item !== location)
        : [...prev, location],
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <p className="text-xs font-semibold tracking-[0.14em] text-store-muted uppercase">
        {product.categoryName ?? "Catalog"}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-store-navy sm:text-4xl">
        {product.titleName}
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-store-line bg-[#eef2f6]">
            {gallery[activeImage] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={gallery[activeImage]!}
                alt={product.titleName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-store-muted">
                Product imagery
              </div>
            )}
          </div>
          {gallery.length > 1 ? (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {gallery.map((src, index) => (
                <button
                  key={`${src}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border ${
                    activeImage === index
                      ? "border-store-navy"
                      : "border-store-line"
                  }`}
                >
                  {src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  ) : null}
                </button>
              ))}
            </div>
          ) : null}
          <p className="mt-4 text-sm text-store-muted">
            High-res gallery includes fabric/cardstock close-ups on request.
            Ask for a print-quality video demo with your RFQ.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <p className="text-sm text-store-muted">
              Base from{" "}
              <span className="text-xl font-bold text-store-ink">
                {formatInr(product.pricing)}
              </span>{" "}
              / unit · {product.quantityLabel}+ MOQ band
            </p>
            {product.descriptionContent ? (
              <p className="mt-3 text-sm leading-relaxed text-store-muted">
                {product.descriptionContent}
              </p>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-store-muted">
                Offset or screen decoration with proof-before-print workflow.
                Pick volume tier, upload artwork, and request a sample before
                bulk — ideal for corporate, retail, events, and schools.
              </p>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-store-navy">
              Dynamic tiered pricing
            </h2>
            <div className="mt-3 overflow-hidden rounded-xl border border-store-line">
              <table className="w-full text-left text-sm">
                <thead className="bg-store-paper text-store-muted">
                  <tr>
                    <th className="px-4 py-3 font-medium">Volume</th>
                    <th className="px-4 py-3 font-medium">Band</th>
                    <th className="px-4 py-3 font-medium">Unit price</th>
                  </tr>
                </thead>
                <tbody>
                  {tiers.map((tier) => (
                    <tr key={tier.range} className="border-t border-store-line">
                      <td className="px-4 py-3 text-store-ink">{tier.range}</td>
                      <td className="px-4 py-3 text-store-muted">{tier.label}</td>
                      <td className="px-4 py-3 font-semibold text-store-navy">
                        {formatInr(tier.unit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-store-navy">
              Customization configurator
            </h2>
            <label className="mt-3 block text-sm">
              <span className="font-medium text-store-ink">Print method</span>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5"
              >
                {["Offset", "Screen Print", "DTF", "Embroidery", "UV Printing"].map(
                  (item) => (
                    <option key={item}>{item}</option>
                  ),
                )}              </select>
            </label>
            <p className="mt-4 text-sm font-medium text-store-ink">
              Print locations
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {printLocations.map((location) => {
                const active = locations.includes(location);
                return (
                  <button
                    key={location}
                    type="button"
                    onClick={() => toggleLocation(location)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      active
                        ? "bg-store-navy text-white"
                        : "border border-store-line text-store-ink"
                    }`}
                  >
                    {location}
                  </button>
                );
              })}
            </div>
            <label className="mt-4 block text-sm">
              <span className="font-medium text-store-ink">
                Upload artwork (.AI / .PDF / .PNG)
              </span>
              <input
                type="file"
                accept=".ai,.pdf,.png,.jpg,.jpeg"
                onChange={(e) =>
                  setFileName(e.target.files?.[0]?.name ?? "")
                }
                className="mt-1.5 block w-full text-sm text-store-muted file:mr-3 file:rounded-full file:border-0 file:bg-store-navy file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
              />
              {fileName ? (
                <span className="mt-1 block text-xs text-store-navy">
                  {fileName}
                </span>
              ) : null}
            </label>
          </div>

          <div className="flex flex-wrap gap-3">
            <QuoteButton
              product={product.titleName}
              category={product.categoryName ?? undefined}
              imageUrl={product.image ?? undefined}
              className="rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white"
            >
              Get a Quote
            </QuoteButton>
            <QuoteButton
              product={product.titleName}
              category={product.categoryName ?? undefined}
              imageUrl={product.image ?? undefined}
              intent="sample"
              className="rounded-full border border-store-navy px-5 py-2.5 text-sm font-semibold text-store-navy"
            >
              Request sample box
            </QuoteButton>
          </div>
        </div>
      </div>

      <section className="mt-12 grid gap-6 border-t border-store-line pt-10 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold text-store-navy">
            Technical specifications
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-store-line pb-2">
              <dt className="text-store-muted">Sizes</dt>
              <dd className="text-right font-medium text-store-ink">
                {product.sizes.length ? product.sizes.join(", ") : "S–XXL / custom"}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-store-line pb-2">
              <dt className="text-store-muted">Colours / materials</dt>
              <dd className="text-right font-medium text-store-ink">
                {product.colors.length
                  ? product.colors.join(", ")
                  : "Swatches on request · Pantone match available"}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-store-line pb-2">
              <dt className="text-store-muted">GSM / stock</dt>
              <dd className="text-right font-medium text-store-ink">
                180–280 GSM apparel · 300–350 GSM card options
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-store-line pb-2">
              <dt className="text-store-muted">Print dimensions</dt>
              <dd className="text-right font-medium text-store-ink">
                Up to A3 placement · custom layouts supported
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-store-muted">Selected method</dt>
              <dd className="text-right font-medium text-store-ink">
                {method} · {locations.join(", ") || "TBD"}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-store-line bg-store-paper p-6">
          <h2 className="text-xl font-bold text-store-navy">
            Sample request for B2B buyers
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-store-muted">
            Order a decorated sample or mixed sample box before committing to a
            full production run. Sample cost can often be adjusted against a
            confirmed bulk PO of 100+ units.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-store-ink">
            <li>• 1–5 piece decorated samples</li>
            <li>• Blank fabric / cardstock feel packs</li>
            <li>• Colour chip + print technique guide</li>
          </ul>
          <QuoteButton
            product={product.titleName}
            category={product.categoryName ?? undefined}
            imageUrl={product.image ?? undefined}
            intent="sample"
            className="mt-6 inline-flex rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white"
          >
            Request sample
          </QuoteButton>
        </div>
      </section>
    </main>
  );
}
