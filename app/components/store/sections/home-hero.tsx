import Link from "next/link";
import {
  ArrowRight,
  Ruler,
  Package,
  Truck,
  Headset,
  Star,
} from "lucide-react";
import { QuoteButton } from "@/app/components/store/ui/quote-popup";

const assurances = [
  { icon: Ruler, label: "Custom Sizes & Finishes" },
  { icon: Package, label: "Bulk Order Support" },
  { icon: Truck, label: "Pan-India Delivery" },
  { icon: Headset, label: "Personalized Assistance" },
] as const;

const stats = [
  { value: "2,500+", label: "Businesses served" },
  { value: "12 Lakh+", label: "Prints delivered" },
] as const;

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-store-line bg-gradient-to-b from-store-paper/70 via-white to-white">
      {/* Soft background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-store-navy/6 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-store-accent/10 blur-3xl"
      />

      <div className="relative mx-auto grid min-h-[88vh] max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-20">
        {/* Left: copy */}
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-store-line bg-white px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-store-navy uppercase shadow-sm">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3 w-3 fill-store-accent text-store-accent"
                  aria-hidden
                />
              ))}
            </span>
            Trusted by 2,500+ businesses
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-store-navy sm:text-5xl lg:text-[3.5rem] lg:leading-[1.07]">
            Your Brand.
            <br />
            Our Print{" "}
            <span className="bg-gradient-to-r from-store-navy to-store-accent bg-clip-text text-transparent">
              Expertise.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-store-muted sm:text-base">
            Custom hang tags, labels, stickers, packaging boxes, carry bags and
            more — offset and screen printing with quotation-based bulk
            ordering.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <QuoteButton
              intent="home-hero"
              className="inline-flex items-center gap-2 rounded-full bg-store-navy px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-store-navy/25 transition hover:bg-store-navy-dark focus-visible:ring-2 focus-visible:ring-store-navy/40 focus-visible:outline-none sm:text-base"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
            </QuoteButton>
            <Link
              href="/products"
              className="inline-flex items-center rounded-full border border-store-navy/30 bg-white px-7 py-3.5 text-sm font-semibold text-store-navy transition hover:border-store-navy hover:bg-store-navy hover:text-white focus-visible:ring-2 focus-visible:ring-store-navy/40 focus-visible:outline-none sm:text-base"
            >
              Explore Products
            </Link>
          </div>

          {/* Assurance row */}
          <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-store-line pt-7 sm:grid-cols-4">
            {assurances.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-store-navy/8 text-store-navy">
                  <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                </span>
                <span className="text-xs leading-snug font-medium text-store-ink">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: product collage */}
        <div className="relative">
          <div className="relative aspect-[5/4] min-h-[320px] overflow-hidden rounded-3xl bg-[#efe7dc] shadow-[0_32px_70px_-32px_rgba(15,61,102,0.45)] lg:aspect-auto lg:min-h-[62vh]">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.55),transparent_60%)]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/Luxury Artisanal Branding Collection.png"
              alt="Luxury artisanal branding collection by Anita Printers"
              className="absolute inset-0 h-full w-full object-cover select-none"
            />
          </div>

          {/* Floating stats card */}
          <div className="absolute -bottom-5 left-4 flex gap-4 rounded-2xl border border-store-line bg-white px-5 py-3.5 shadow-[0_16px_40px_-16px_rgba(15,61,102,0.35)] sm:left-6 lg:-left-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-lg font-bold tracking-tight text-store-navy sm:text-xl">
                  {stat.value}
                </p>
                <p className="text-[11px] leading-tight text-store-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
