import Link from "next/link";
import { printingServiceCatalog } from "@/app/lib/storefront/b2b-content";

export function PrintingServicesPreview() {
  const { techniques, audiences, coreProducts } = printingServiceCatalog;

  return (
    <section className="border-b border-store-line bg-store-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <p className="text-xs font-semibold tracking-[0.16em] text-store-muted uppercase">
          Print capabilities
        </p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-store-navy sm:text-4xl">
            What we print every day
          </h2>
          <Link
            href="/services#what-we-print"
            className="shrink-0 text-sm font-semibold text-store-navy underline-offset-4 hover:underline"
          >
            View all services
          </Link>
        </div>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-store-muted">
          From barcodes and visiting cards to brochures, carry bags, flex, and
          shadi cards — offset for bulk paper jobs, screen for plastic and
          specialty materials.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {coreProducts.map((line) => (
            <div key={line.id} className="border-t border-store-navy/15 pt-5">
              <h3 className="text-base font-semibold text-store-navy">
                {line.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-store-ink">
                {line.items.join(" · ")}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-10 border-t border-store-line pt-10 lg:grid-cols-2">
          {techniques.map((technique) => (
            <div key={technique.id}>
              <p className="text-xs font-semibold tracking-[0.14em] text-store-accent uppercase">
                {technique.eyebrow}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-store-navy">
                {technique.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-store-muted">
                {technique.summary}
              </p>
              <Link
                href={`/services#${technique.id}`}
                className="mt-4 inline-block text-sm font-semibold text-store-navy underline-offset-4 hover:underline"
              >
                Full {technique.name.toLowerCase()} list
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 border-t border-store-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => (
            <div key={audience.id}>
              <h3 className="text-base font-semibold text-store-navy">
                {audience.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-store-muted">
                {audience.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
