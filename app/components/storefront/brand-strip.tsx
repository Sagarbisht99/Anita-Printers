import { partnerBrands } from "@/app/lib/storefront/partner-brands";

export function BrandStrip() {
  const row = [...partnerBrands, ...partnerBrands];

  return (
    <div className="overflow-hidden border-b border-store-line bg-store-surface">
      <div className="relative mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6">
        <div className="pointer-events-none absolute inset-y-0 left-4 z-10 w-10 bg-gradient-to-r from-store-surface to-transparent sm:left-6" />
        <div className="pointer-events-none absolute inset-y-0 right-4 z-10 w-10 bg-gradient-to-l from-store-surface to-transparent sm:right-6" />
        <div className="brand-marquee flex w-max items-center gap-12 py-1.5 sm:gap-14">
          {row.map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              className="shrink-0 text-base font-semibold tracking-wide text-store-ink/40 select-none sm:text-lg"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
