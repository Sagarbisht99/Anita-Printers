import type { Metadata } from "next";
import { LegalPage } from "@/app/components/store/pages";

export const metadata: Metadata = {
  title: "Shipping Policy",
};

export default function ShippingPage() {
  return (
    <LegalPage title="Shipping Policy" updated="23 August 2026">
      <p>
        This policy covers how Anita Printers handles dispatch and delivery for
        print and custom product orders.
      </p>

      <h2>1. Production before shipping</h2>
      <p>
        Custom print jobs are produced after artwork approval. Shipping timelines
        begin after production is complete, not from the initial enquiry date.
      </p>

      <h2>2. Delivery options</h2>
      <ul>
        <li>Local hand delivery or pickup where available</li>
        <li>Courier / logistics partner for outstation orders</li>
      </ul>
      <p>
        Available options and charges are confirmed with your quotation based on
        location, weight, and urgency.
      </p>

      <h2>3. Estimated timelines</h2>
      <p>
        Standard production windows vary by product (cards, apparel, gifts,
        large-format, etc.). We share an estimated dispatch date when your order
        is confirmed. Courier transit time is additional.
      </p>

      <h2>4. Address accuracy</h2>
      <p>
        Please provide a complete and correct delivery address and phone number.
        Delays or failed attempts caused by incorrect details are the customer’s
        responsibility.
      </p>

      <h2>5. Risk in transit</h2>
      <p>
        Once a parcel is handed to the courier, transit tracking applies as per
        the carrier. If goods arrive damaged, notify us promptly with photos so
        we can help raise a claim or arrange a reprint where appropriate.
      </p>

      <h2>6. Bulk & urgent orders</h2>
      <p>
        Large quantities or rush jobs may use alternate packing or carriers.
        Extra shipping costs for express service will be shared before
        confirmation.
      </p>
    </LegalPage>
  );
}
