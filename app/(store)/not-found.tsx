import Link from "next/link";
import { StoreBreadcrumb } from "@/app/components/store/ui/breadcrumb";
import { QuoteButton } from "@/app/components/store/ui/quote-popup";
import { createPageMetadata } from "@/app/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Page not found",
  path: "/404",
});

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <StoreBreadcrumb
        items={[{ name: "Home", path: "/" }, { name: "Page not found" }]}
        className="mb-6"
      />
      <p className="text-xs font-semibold tracking-[0.2em] text-store-accent uppercase">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-store-navy sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-store-muted">
        The page you are looking for does not exist or may have been moved.
        Browse our products or request a quote instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/products"
          className="rounded-full bg-store-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-store-navy-dark"
        >
          Browse products
        </Link>
        <QuoteButton
          intent="not-found"
          className="rounded-full border border-store-navy px-6 py-3 text-sm font-semibold text-store-navy transition hover:bg-store-navy hover:text-white"
        >
          Request a Quote
        </QuoteButton>
        <Link
          href="/"
          className="rounded-full border border-store-line px-6 py-3 text-sm font-semibold text-store-ink transition hover:border-store-navy hover:text-store-navy"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
