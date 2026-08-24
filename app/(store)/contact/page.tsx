import type { Metadata } from "next";
import Link from "next/link";
import { StorePageHero } from "@/app/components/storefront/store-page-hero";
import { QuickQuoteForm } from "@/app/components/storefront/quick-quote";
import { siteContact } from "@/app/lib/storefront/b2b-content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Address, phone, WhatsApp, map location, and inquiry form for Anita Printers.",
};

export default function ContactPage() {
  return (
    <>
      <StorePageHero
        eyebrow="Contact"
        title="Talk to the Anita Printers B2B desk"
        description="Share your product, quantity, and deadline — or call / WhatsApp for a same-day direction on MOQ and technique."
        actions={[
          { href: "/quote", label: "Full RFQ form", primary: true },
          { href: siteContact.whatsapp, label: "WhatsApp business" },
        ]}
      />

      <main className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-2xl border border-store-line bg-store-surface p-6">
            <h2 className="text-lg font-semibold text-store-navy">
              Facility & desk
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-store-ink">
              {siteContact.addressLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <dl className="mt-6 space-y-3 text-sm">
              <div>
                <dt className="text-xs font-semibold tracking-wide text-store-muted uppercase">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a
                    href={siteContact.phoneHref}
                    className="font-semibold text-store-navy hover:underline"
                  >
                    {siteContact.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wide text-store-muted uppercase">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${siteContact.email}`}
                    className="font-semibold text-store-navy hover:underline"
                  >
                    {siteContact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wide text-store-muted uppercase">
                  Hours
                </dt>
                <dd className="mt-1 text-store-ink">{siteContact.hours}</dd>
              </div>
            </dl>
            <a
              href={siteContact.whatsapp}
              className="mt-6 inline-flex rounded-full bg-[#128C7E] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border border-store-line">
            <iframe
              title="Anita Printers location map"
              src={siteContact.mapEmbed}
              className="h-72 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-store-navy">
            Inquiry form
          </h2>
          <QuickQuoteForm />
          <p className="mt-6 text-sm text-store-muted">
            Policies:{" "}
            <Link href="/terms" className="text-store-navy hover:underline">
              Terms
            </Link>
            ,{" "}
            <Link href="/privacy" className="text-store-navy hover:underline">
              Privacy
            </Link>
            ,{" "}
            <Link href="/shipping" className="text-store-navy hover:underline">
              Shipping
            </Link>
            ,{" "}
            <Link href="/refund" className="text-store-navy hover:underline">
              Refunds
            </Link>
            ,{" "}
            <Link href="/#faq" className="text-store-navy hover:underline">
              FAQ
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  );
}
