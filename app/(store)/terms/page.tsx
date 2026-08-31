import type { Metadata } from "next";
import { LegalPage } from "@/app/components/store/pages";
import { JsonLdScript } from "@/app/components/store/seo/json-ld-script";
import { createPageMetadata } from "@/app/lib/seo/metadata";
import { breadcrumbJsonLd, jsonLdGraph, webPageJsonLd } from "@/app/lib/seo/json-ld";

export const metadata: Metadata = createPageMetadata({
  title: "Terms & Conditions",
  description:
    "Terms and conditions for using the Anita Printers website and ordering offset, screen, packaging, and custom print services.",
  path: "/terms",
});

export default function TermsPage() {
  const schemas = jsonLdGraph(
    webPageJsonLd({
      name: "Terms & Conditions",
      description:
        "Terms for using Anita Printers website and ordering print services.",
      path: "/terms",
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Terms & Conditions", path: "/terms" },
    ]),
  );

  return (
    <>
      <JsonLdScript data={schemas} />
      <LegalPage title="Terms & Conditions" updated="23 August 2026">
      <p>
        These Terms & Conditions govern your use of the Anita Printers website
        and any offset printing, screen printing, apparel, packaging, stationery,
        or related services you request from us. By placing an order or using
        this site, you agree to these terms.
      </p>

      <h2>1. Orders & quotations</h2>
      <p>
        Product listings on this site may show estimated starting prices. Final
        pricing depends on quantity, material, finish, artwork, and delivery
        requirements. A quotation becomes binding only after we confirm it in
        writing and you approve the artwork and order details.
      </p>

      <h2>2. Artwork & approvals</h2>
      <p>
        You are responsible for providing accurate artwork, text, and
        specifications. We may request corrections if files are unsuitable for
        print. Production begins only after you approve the final proof (digital
        or physical, as applicable).
      </p>

      <h2>3. Colour & print variation</h2>
      <p>
        Screen colours and printed colours can differ. Minor variation between
        proofs, samples, and final output is normal in commercial printing and
        is not treated as a defect unless it materially fails the approved
        specification.
      </p>

      <h2>4. Payment</h2>
      <p>
        Payment terms are stated on your quotation or invoice. We may require
        advance payment for custom or bulk work. Orders may be paused if payment
        is overdue.
      </p>

      <h2>5. Delivery & timelines</h2>
      <p>
        Estimated turnaround starts after artwork approval and payment
        confirmation (where required). Delays due to incomplete files, late
        approvals, courier issues, or force majeure are outside our control.
      </p>

      <h2>6. Intellectual property</h2>
      <p>
        You confirm that you own or have rights to all content you submit. You
        grant Anita Printers a limited licence to use that content solely to
        fulfil your order. Our own designs, templates, and site content remain
        our property.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        Our liability for any order is limited to the amount paid for that
        order. We are not liable for indirect, incidental, or consequential
        losses arising from use of the site or our services.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may update these terms from time to time. The version posted on this
        page applies to new orders placed after the update date.
      </p>

      <h2>9. Contact</h2>
      <p>
        For questions about these terms, reach us via the{" "}
        <a href="/contact" className="font-medium text-store-navy hover:underline">
          contact page
        </a>
        .
      </p>
      </LegalPage>
    </>
  );
}
