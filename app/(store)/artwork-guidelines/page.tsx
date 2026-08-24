import type { Metadata } from "next";
import Link from "next/link";
import { QuoteButton } from "@/app/components/storefront/quote-popup";
import { StorePageHero } from "@/app/components/storefront/store-page-hero";
import { artworkGuidelines } from "@/app/lib/storefront/b2b-content";

export const metadata: Metadata = {
  title: "Artwork & File Guidelines",
  description:
    "300 DPI rules, vector specs, RGB vs CMYK, bleed, and naming for print-ready files.",
};

export default function ArtworkGuidelinesPage() {
  return (
    <>
      <StorePageHero
        eyebrow="Support utility"
        title="Artwork & file guidelines"
        description="Resolution, vector requirements, colour conversion, bleed, and naming — so proofs lock faster and reprints stay rare."
        actions={[
          { href: "/quote", label: "Upload files with RFQ", primary: true },
          { href: "/portfolio", label: "Technique guide" },
        ]}
      />

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {artworkGuidelines.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-store-line bg-store-surface p-6"
            >
              <h2 className="text-lg font-semibold text-store-navy">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-store-muted">
                {item.body}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-store-line bg-store-paper p-6 sm:p-8">
          <h2 className="text-xl font-bold text-store-navy">
            Quick checklist before you upload
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-store-ink">
            <li>• 300 DPI at final size for raster art</li>
            <li>• Outlined fonts in PDF / AI</li>
            <li>• CMYK for offset cards; RGB OK for DTF soft proofs</li>
            <li>• 3 mm bleed + 5 mm safe margin on stationery</li>
            <li>• Pantone codes noted in the file or RFQ notes</li>
          </ul>
          <QuoteButton className="mt-6 inline-flex rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white">
            Start RFQ with files
          </QuoteButton>
        </section>
      </main>
    </>
  );
}
