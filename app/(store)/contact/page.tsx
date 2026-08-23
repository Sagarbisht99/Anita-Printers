import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-medium tracking-[0.16em] text-store-muted uppercase">
        Get in touch
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-store-navy sm:text-4xl">
        Contact Anita Printers
      </h1>
      <p className="mt-4 text-[15px] leading-7 text-store-muted">
        Share your product, quantity, and deadline. We’ll get back with a quote.
        A full enquiry form can be wired to server actions later.
      </p>

      <div className="mt-10 space-y-6 rounded-2xl border border-store-line bg-store-surface px-6 py-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-store-muted uppercase">
            Email
          </p>
          <p className="mt-2 text-store-ink">hello@anitaprinters.example</p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-store-muted uppercase">
            Phone
          </p>
          <p className="mt-2 text-store-ink">+91 00000 00000</p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-store-muted uppercase">
            Hours
          </p>
          <p className="mt-2 text-store-ink">Mon–Sat, 10:00 AM – 7:00 PM</p>
        </div>
      </div>

      <p className="mt-8 text-sm text-store-muted">
        Looking for policies? See{" "}
        <Link href="/terms" className="font-medium text-store-navy hover:underline">
          Terms
        </Link>
        ,{" "}
        <Link href="/privacy" className="font-medium text-store-navy hover:underline">
          Privacy
        </Link>
        ,{" "}
        <Link href="/shipping" className="font-medium text-store-navy hover:underline">
          Shipping
        </Link>
        , and{" "}
        <Link href="/refund" className="font-medium text-store-navy hover:underline">
          Refunds
        </Link>
        .
      </p>
    </main>
  );
}
