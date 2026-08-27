import Link from "next/link";
import { printingServiceCatalog } from "@/app/lib/store/b2b-content";

const audienceHoverStyles = [
  "hover:-translate-y-1 hover:border-store-navy hover:bg-store-navy [&_h3]:group-hover:text-white [&_p]:group-hover:text-white/75",
  "hover:-translate-y-1 hover:border-store-accent hover:bg-store-accent [&_h3]:group-hover:text-white [&_p]:group-hover:text-white/80",
  "hover:-translate-y-1 hover:border-store-navy hover:bg-white hover:shadow-[0_16px_32px_-18px_rgba(15,61,102,0.35)]",
  "hover:-translate-y-1 hover:border-store-logo hover:bg-store-logo [&_h3]:group-hover:text-white [&_p]:group-hover:text-white/80",
] as const;

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
            className="shrink-0 text-sm font-semibold text-store-navy underline-offset-4 transition-colors hover:text-store-accent hover:underline"
          >
            View all services
          </Link>
        </div>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-store-muted">
          From barcodes and visiting cards to brochures, carry bags, flex, and
          shadi cards — offset for bulk paper jobs, screen for plastic and
          specialty materials.
        </p>

        {/* Core products — accent bar + rose wash */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {coreProducts.map((line) => (
            <div
              key={line.id}
              className="group relative overflow-hidden rounded-xl border border-transparent border-t border-t-store-navy/15 pt-5 transition-all duration-300 hover:border-store-accent/25 hover:bg-store-rose-soft hover:px-4 hover:pb-4 hover:pt-5"
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 h-full w-0.5 origin-top scale-y-0 bg-store-accent transition-transform duration-300 group-hover:scale-y-100"
              />
              <h3 className="text-base font-semibold text-store-navy transition-colors group-hover:text-store-accent">
                {line.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-store-ink">
                {line.items.join(" · ")}
              </p>
            </div>
          ))}
        </div>

        {/* Techniques — navy lift vs accent lift */}
        <div className="mt-10 grid gap-6 border-t border-store-line pt-10 lg:grid-cols-2">
          {techniques.map((technique, i) => (
            <Link
              key={technique.id}
              href={`/services#${technique.id}`}
              className={`group block rounded-2xl border border-store-line bg-store-paper p-6 transition-all duration-300 hover:-translate-y-1 ${
                i === 0
                  ? "hover:border-store-navy hover:bg-store-navy hover:shadow-[0_18px_36px_-20px_rgba(15,61,102,0.5)]"
                  : "hover:border-store-accent hover:bg-store-accent hover:shadow-[0_18px_36px_-20px_rgba(196,59,88,0.45)]"
              }`}
            >
              <p
                className={`text-xs font-semibold tracking-[0.14em] uppercase transition-colors ${
                  i === 0
                    ? "text-store-accent group-hover:text-white/70"
                    : "text-store-accent group-hover:text-white/75"
                }`}
              >
                {technique.eyebrow}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-store-navy transition-colors group-hover:text-white">
                {technique.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-store-muted transition-colors group-hover:text-white/80">
                {technique.summary}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-store-navy underline-offset-4 transition-colors group-hover:text-white group-hover:underline">
                Full {technique.name.toLowerCase()} list
              </span>
            </Link>
          ))}
        </div>

        {/* Audiences — 4 different colours */}
        <div className="mt-12 grid gap-5 border-t border-store-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience, i) => (
            <div
              key={audience.id}
              className={`group cursor-default rounded-2xl border border-store-line bg-store-paper p-5 transition-all duration-300 ${audienceHoverStyles[i] ?? audienceHoverStyles[0]}`}
            >
              <h3 className="text-base font-semibold text-store-navy transition-colors">
                {audience.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-store-muted transition-colors">
                {audience.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
