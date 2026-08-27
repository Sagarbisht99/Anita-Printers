import { partnerBrands } from "@/app/lib/storefront/partner-brands";

export function BrandStrip() {
  const row = [...partnerBrands, ...partnerBrands];

  return (
    <div className="overflow-hidden border-b border-store-line bg-store-surface">
      <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-7">
        <div className="pointer-events-none absolute inset-y-0 left-4 z-10 w-12 bg-gradient-to-r from-store-surface to-transparent sm:left-6" />
        <div className="pointer-events-none absolute inset-y-0 right-4 z-10 w-12 bg-gradient-to-l from-store-surface to-transparent sm:right-6" />
        <div className="brand-marquee flex w-max items-center gap-10 py-1 sm:gap-14">
          {row.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex shrink-0 items-center gap-3.5 sm:gap-4"
            >
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-store-line bg-white shadow-sm sm:h-16 sm:w-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brand.logo}
            alt=""
            width={64}
            height={64}
            className="h-full w-full object-contain p-1.5"
          />
              </span>
              <span className="max-w-[9rem] truncate text-sm font-bold tracking-wide text-black select-none sm:max-w-none sm:text-lg">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
