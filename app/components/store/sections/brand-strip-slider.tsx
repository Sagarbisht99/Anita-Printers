"use client";

import type { PartnerBrand } from "@/app/lib/store/partner-brands";

type BrandStripSliderProps = {
  brands: PartnerBrand[];
};

export function BrandStripSlider({ brands }: BrandStripSliderProps) {
  if (brands.length === 0) return null;

  const row = [...brands, ...brands];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex overflow-hidden rounded-[1.25rem] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
          <div className="flex shrink-0 items-center justify-center bg-white px-4 py-4 sm:px-6">
            <span className="whitespace-nowrap text-sm font-bold tracking-[0.12em] text-black uppercase sm:text-base">
              Our client
            </span>
          </div>

          <div className="relative flex-1 overflow-hidden bg-white">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent" />

            <div
              className="brand-marquee group/track flex w-max items-center gap-3 py-2 sm:gap-4"
              role="region"
              aria-label="Partner brands"
            >
              {row.map((brand, index) => (
                <div
                  key={`${brand.logo}-${index}`}
                  className="flex shrink-0 items-center justify-center"
                >
                  <span className="flex h-14 w-28 items-center justify-center rounded-[0.9rem] bg-white px-2 shadow-[0_0_0_1px_rgba(0,0,0,0.05)] transition-transform duration-200 hover:scale-[1.02] sm:h-16 sm:w-32 md:h-20 md:w-36">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      width={120}
                      height={72}
                      draggable={false}
                      className="max-h-full max-w-[82%] object-contain select-none"
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
