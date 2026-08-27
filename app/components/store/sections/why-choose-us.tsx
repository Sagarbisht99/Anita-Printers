import {
  Clock3,
  Factory,
  Layers,
  PackageCheck,
  Play,
  type LucideIcon,
} from "lucide-react";
import { usps } from "@/app/lib/store/b2b-content";

const uspIcons: LucideIcon[] = [Layers, Clock3, Factory, PackageCheck];

export function WhyChooseUs() {
  return (
    <section className="border-b border-store-line bg-store-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* Left: copy + featured media */}
          <div>
            <p className="text-sm font-semibold tracking-wide text-store-navy">
              Offset · Screen · Bulk
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-store-ink sm:text-4xl lg:text-[2.6rem] lg:leading-tight">
              Why people choose us
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-store-muted sm:text-base">
              Visiting cards, letterheads, barcodes, stickers, labels, tags,
              brochures, posters, leaflets, carry bags, boxes, flex, plastic
              printing, and shadi cards — offset for volume, screen for specialty.
            </p>

            <div className="relative mt-10 max-w-md">
              {/* Soft blob behind */}
              <div
                aria-hidden
                className="absolute -top-4 -left-4 h-[88%] w-[92%] rounded-[42%_58%_48%_52%/52%_42%_58%_48%] bg-[#e8eef4]"
              />
              <div
                aria-hidden
                className="absolute inset-x-8 bottom-6 top-10 opacity-40"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(15,61,102,0.14) 1px, transparent 1px)",
                  backgroundSize: "14px 14px",
                }}
              />

              <div className="group/media relative overflow-hidden rounded-[46%_54%_48%_52%/56%_44%_56%_44%] shadow-[0_24px_50px_-28px_rgba(15,61,102,0.4)]">
                <div className="relative aspect-[4/5] w-full min-h-[320px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://www.printvenue.com/cdn/shop/files/a-man-make-print-on-the-tshirt-with-the-help-of-machine.webp?v=1769671661&width=900"
                    alt="Custom t-shirt printing on production machine"
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover/media:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-store-navy/0 transition duration-300 group-hover/media:bg-store-navy/15" />
                </div>
              </div>

              <button
                type="button"
                aria-label="Watch how we work"
                className="absolute right-4 bottom-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-store-navy text-white shadow-lg transition hover:scale-105 hover:bg-store-logo sm:right-6 sm:bottom-8"
              >
                <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden />
              </button>
            </div>
          </div>

          {/* Right: 2x2 feature cards */}
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            {usps.map((item, index) => {
              const Icon = uspIcons[index] ?? Layers;

              return (
                <article
                  key={item.title}
                  className="group cursor-default rounded-2xl border border-store-line bg-store-paper px-5 pt-8 pb-7 text-center transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-store-navy hover:bg-store-navy hover:shadow-[0_22px_40px_-20px_rgba(15,61,102,0.55)] sm:px-6"
                >
                  <div className="relative mx-auto mb-5 flex h-16 w-24 items-start justify-center">
                    <div
                      aria-hidden
                      className="absolute top-0 h-14 w-24 rounded-b-full bg-store-rose-soft transition-colors duration-300 group-hover:bg-white/15"
                    />
                    <div className="relative z-10 mt-5 flex h-12 w-12 items-center justify-center rounded-full bg-store-navy text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-store-navy group-hover:shadow-lg">
                      <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-store-ink transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-store-muted transition-colors duration-300 group-hover:text-white/75">
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
