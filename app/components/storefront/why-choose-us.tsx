import { usps } from "@/app/lib/storefront/b2b-content";

export function WhyChooseUs() {
  return (
    <section className="border-b border-store-line bg-store-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <p className="text-xs font-semibold tracking-[0.16em] text-store-muted uppercase">
          Why choose us
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-store-navy sm:text-4xl">
          Built for procurement, not one-off gifting chaos
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-store-muted sm:text-base">
          Clear MOQs, proof discipline, and production capacity that holds up
          when your launch date is fixed.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {usps.map((item, index) => (
            <div key={item.title} className="border-t border-store-line pt-5">
              <p className="text-xs font-semibold tracking-[0.14em] text-store-muted uppercase">
                0{index + 1}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-store-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-store-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
