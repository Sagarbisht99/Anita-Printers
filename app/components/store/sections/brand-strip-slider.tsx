"use client";

import type { PartnerBrand } from "@/app/lib/store/partner-brands";

type BrandStripSliderProps = {
  brands: PartnerBrand[];
};

export function BrandStripSlider({ brands }: BrandStripSliderProps) {
  if (brands.length === 0) return null;

  const row = [...brands, ...brands];

  return (
    <div className="overflow-hidden border-b border-store-line bg-store-surface">
      <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-7">
        <div className="pointer-events-none absolute inset-y-0 left-4 z-10 w-10 bg-linear-to-r from-store-surface to-transparent sm:left-6 sm:w-14" />
        <div className="pointer-events-none absolute inset-y-0 right-4 z-10 w-10 bg-linear-to-l from-store-surface to-transparent sm:right-6 sm:w-14" />
        <div
          className="brand-marquee group/track flex w-max items-center gap-10 py-1 sm:gap-14"
          role="region"
          aria-label="Partner brands"
        >
          {row.map((brand, index) => (
            <div
              key={`${brand.logo}-${index}`}
              className="flex shrink-0 items-center justify-center"
            >
              <span className="relative flex h-14 w-28 items-center justify-center sm:h-16 sm:w-32 md:h-18 md:w-36">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={72}
                  draggable={false}
                  className="max-h-full w-full object-contain select-none"
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
