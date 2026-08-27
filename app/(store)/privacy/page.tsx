import type { Metadata } from "next";
import { LegalPage } from "@/app/components/store/pages";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="23 August 2026">
      <p>
        Anita Printers respects your privacy. This policy explains what
        information we collect when you use our website or place a print order,
        and how we use it.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>Contact details you share (name, phone, email, address)</li>
        <li>Order and enquiry details, including artwork files you upload</li>
        <li>Basic technical data such as browser type and approximate location</li>
      </ul>

      <h2>2. How we use information</h2>
      <ul>
        <li>To respond to enquiries and fulfil print orders</li>
        <li>To send order updates and delivery communication</li>
        <li>To improve our website and service quality</li>
      </ul>

      <h2>3. Sharing</h2>
      <p>
        We do not sell your personal information. We may share limited details
        with courier partners, payment providers, or service vendors only as
        needed to complete your order or operate the site.
      </p>

      <h2>4. Data retention</h2>
      <p>
        We keep order and enquiry records for as long as needed for business,
        legal, and accounting purposes. Artwork may be retained to support
        reprints unless you ask us to delete it where feasible.
      </p>

      <h2>5. Security</h2>
      <p>
        We take reasonable steps to protect personal data. No online transmission
        or storage method is completely secure; please share only what is needed
        for your order.
      </p>

      <h2>6. Your choices</h2>
      <p>
        You may request access, correction, or deletion of personal information
        we hold about you, subject to legal retention requirements. Contact us
        through the{" "}
        <a href="/contact" className="font-medium text-store-navy hover:underline">
          contact page
        </a>
        .
      </p>

      <h2>7. Updates</h2>
      <p>
        We may revise this policy periodically. The updated date at the top of
        this page reflects the latest version.
      </p>
    </LegalPage>
  );
}
