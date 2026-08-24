import type { Metadata } from "next";
import Link from "next/link";
import { RfqForm } from "@/app/components/storefront/rfq-form";
import { StorePageHero } from "@/app/components/storefront/store-page-hero";

export const metadata: Metadata = {
  title: "Request a Custom Quote",
  description:
    "Multi-step RFQ for bulk print — specs, artwork, deadline, and delivery pincode.",
};

export default function QuotePage() {
  return (
    <>
      <StorePageHero
        eyebrow="RFQ"
        title="Request a custom quote"
        description="Share item type, units, files, deadline, delivery pincode, and budget. We’ll return pricing, proof timeline, and sample options."
        actions={[
          { href: "/artwork-guidelines", label: "Spec sheet & guidelines" },
          { href: "/enterprise", label: "Enterprise terms" },
        ]}
      />

      <main className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_0.85fr]">
        <RfqForm />

        <aside className="space-y-6">
          <div className="rounded-2xl border border-store-line bg-store-paper p-6">
            <h2 className="text-lg font-semibold text-store-navy">
              Spec sheet download
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-store-muted">
              Print guidelines cover template margins, bleed, DPI, Pantone
              notes, and file naming for apparel and stationery.
            </p>
            <Link
              href="/artwork-guidelines"
              className="mt-4 inline-flex rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white"
            >
              Open artwork guidelines
            </Link>
          </div>

          <div className="rounded-2xl border border-store-line bg-store-surface p-6 text-sm text-store-muted">
            <p className="font-semibold text-store-ink">What happens next</p>
            <ol className="mt-3 list-decimal space-y-2 pl-4">
              <li>B2B desk reviews MOQ and technique fit.</li>
              <li>You receive a soft proof or sample plan.</li>
              <li>Approve → production slot → GST invoice & dispatch.</li>
            </ol>
          </div>
        </aside>
      </main>
    </>
  );
}
