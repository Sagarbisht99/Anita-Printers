import type { Metadata } from "next";
import { LegalPage } from "@/app/components/store/pages";
import { JsonLdScript } from "@/app/components/store/seo/json-ld-script";
import { createPageMetadata } from "@/app/lib/seo/metadata";
import { breadcrumbJsonLd, jsonLdGraph, webPageJsonLd } from "@/app/lib/seo/json-ld";

export const metadata: Metadata = createPageMetadata({
  title: "Refund & Cancellation",
  description:
    "Refund and cancellation policy for custom print orders at Anita Printers — samples, proofs, defects, and cancellation rules.",
  path: "/refund",
});

export default function RefundPage() {
  const schemas = jsonLdGraph(
    webPageJsonLd({
      name: "Refund & Cancellation Policy",
      description:
        "Cancellation and refund rules for custom print orders at Anita Printers.",
      path: "/refund",
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Refund & Cancellation", path: "/refund" },
    ]),
  );

  return (
    <>
      <JsonLdScript data={schemas} />
      <LegalPage title="Refund & Cancellation Policy" updated="23 August 2026">
        <p>
          Because most Anita Printers work is custom-made to your artwork and
          specifications, refunds and cancellations follow the rules below.
        </p>

        <h2>1. Cancellation before production</h2>
        <p>
          You may cancel an order before artwork approval and before production
          starts. Any advance paid may be refunded after deducting design or
          administrative charges already incurred, if applicable.
        </p>

        <h2>2. Cancellation after production starts</h2>
        <p>
          Once printing, cutting, stitching, or finishing has begun, the order
          generally cannot be cancelled. Custom goods are made specifically for
          you and are not restockable as standard inventory.
        </p>

        <h2>3. Defects & reprints</h2>
        <p>
          If the finished product has a clear production defect relative to the
          approved proof (wrong size, major colour failure, missing pages, etc.),
          contact us within a reasonable time with photos and order details. We
          may reprint, repair, or offer a partial/full credit at our discretion.
        </p>

        <h2>4. Not eligible for refund</h2>
        <ul>
          <li>Minor colour variation within normal print tolerance</li>
          <li>Errors in customer-supplied artwork after approval</li>
          <li>Change of mind after production has started</li>
          <li>Delay caused by late artwork approval or incomplete files</li>
        </ul>

        <h2>5. Refund method & timing</h2>
        <p>
          Approved refunds are processed to the original payment method or as
          store credit, as mutually agreed. Processing time depends on the
          payment provider and bank.
        </p>

        <h2>6. Contact</h2>
        <p>
          For cancellation or refund requests, use the{" "}
          <a
            href="/contact"
            className="font-medium text-store-navy hover:underline"
          >
            contact page
          </a>{" "}
          with your order reference.
        </p>
      </LegalPage>
    </>
  );
}
