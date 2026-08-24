import { partnerBrands } from "@/app/lib/storefront/partner-brands";
import { testimonials } from "@/app/lib/storefront/b2b-content";

export function TestimonialsPartners() {
  return (
    <section className="border-b border-store-line bg-store-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <p className="text-xs font-semibold tracking-[0.16em] text-store-muted uppercase">
          Clients & partners
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-store-navy sm:text-4xl">
          Trusted by brand, event, and corporate teams
        </h2>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {partnerBrands.map((brand) => (
            <span
              key={brand}
              className="text-sm font-semibold tracking-wide text-store-ink/45 sm:text-base"
            >
              {brand}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote
              key={item.name}
              className="rounded-2xl border border-store-line bg-store-paper p-6"
            >
              <p className="text-sm leading-relaxed text-store-ink">
                “{item.quote}”
              </p>
              <footer className="mt-5">
                <p className="text-sm font-semibold text-store-navy">
                  {item.name}
                </p>
                <p className="mt-1 text-xs text-store-muted">{item.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
