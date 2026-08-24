import type { Metadata } from "next";
import Link from "next/link";
import { QuoteButton } from "@/app/components/storefront/quote-popup";
import { StorePageHero } from "@/app/components/storefront/store-page-hero";
import {
  bulkCustomizationServices,
  enterpriseBenefits,
} from "@/app/lib/storefront/b2b-content";

export const metadata: Metadata = {
  title: "Enterprise / Corporate Portal",
  description:
    "Dedicated account managers, Net 30/60 terms, GST invoicing, and multi-location fulfillment.",
};

export default function EnterprisePage() {
  return (
    <>
      <StorePageHero
        eyebrow="B2B corporate portal"
        title="Enterprise accounts built for recurring print programs"
        description="Dedicated managers, credit terms, GST-ready billing, and inventory storage so your offices and events stay stocked without chaos."
        actions={[
          { href: "/quote", label: "Apply for corporate account", primary: true },
          { href: "/contact", label: "Talk to enterprise desk" },
        ]}
      />

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-2xl font-bold text-store-navy">
          Corporate account benefits
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {enterpriseBenefits.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-store-line bg-store-surface p-6"
            >
              <h3 className="text-lg font-semibold text-store-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-store-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 text-2xl font-bold text-store-navy">
          Bulk customization services
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bulkCustomizationServices.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-store-line bg-store-paper p-5"
            >
              <h3 className="font-semibold text-store-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-store-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-store-line bg-store-navy px-6 py-10 text-white sm:px-10">
          <h2 className="text-2xl font-bold">Ready for Net 30 / Net 60?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75">
            Share your monthly print volume, GST details, and preferred billing
            cycle. We’ll map credit terms, SKU catalogs, and fulfillment rules
            for your brand.
          </p>
          <QuoteButton className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-store-navy">
            Start enterprise RFQ
          </QuoteButton>
        </div>
      </main>
    </>
  );
}
