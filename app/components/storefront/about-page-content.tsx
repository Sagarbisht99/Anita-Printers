"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Factory,
  Leaf,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { aboutProfile, siteContact } from "@/app/lib/storefront/b2b-content";

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=80",
    alt: "Apparel print run on the floor",
    label: "Apparel lines",
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
    alt: "Production machinery",
    label: "Press bay",
  },
  {
    src: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
    alt: "Embroidery close-up",
    label: "Embroidery",
  },
  {
    src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=900&q=80",
    alt: "Business card printing",
    label: "Cards & stationery",
  },
];

const pillars = [
  {
    title: "Quality assurance",
    body: "Five-stage QC — artwork lock, pre-press, first-article, in-line, and outbound carton audit.",
    Icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Machine capacity",
    body: "Parallel apparel and commercial print lines so event deadlines don’t stall stationery runs.",
    Icon: Factory,
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Factory access",
    body: "Corporate buyers can schedule floor visits for sampling days and process walkthroughs.",
    Icon: Users,
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
  },
];

const timeline = [
  {
    year: "Start",
    title: "Homegrown print desk",
    body: "Built around proof-first discipline for local brands and agencies.",
  },
  {
    year: "Scale",
    title: "Multi-technique floor",
    body: "Screen, DTF, embroidery, UV, and offset under one Gurugram roof.",
  },
  {
    year: "Today",
    title: "Pan-India B2B partner",
    body: "GST invoices, multi-city splits, and dedicated account managers.",
  },
];

export function AboutPageContent() {
  return (
    <>
      {/* Full-bleed hero */}
      <section className="relative isolate min-h-[52vh] overflow-hidden border-b border-store-line sm:min-h-[56vh]">
        <Image
          src="https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,31,54,0.92)_0%,rgba(15,61,102,0.78)_48%,rgba(8,31,54,0.55)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,59,88,0.22),transparent_45%)]" />

        <div className="relative mx-auto flex min-h-[52vh] max-w-6xl flex-col justify-end px-4 py-12 sm:min-h-[56vh] sm:px-6 sm:py-14 lg:justify-center">
          <p className="store-fade-up text-sm font-semibold tracking-[0.2em] text-store-accent uppercase">
            About us
          </p>
          <h1
            className="store-fade-up mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.25rem]"
            style={{ animationDelay: "80ms" }}
          >
            Anita Printers
          </h1>
          <p
            className="store-fade-up mt-3 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {aboutProfile.headline} One accountable partner from proof to
            invoice — apparel, stationery, and merch at scale.
          </p>
          <div
            className="store-fade-up mt-6 flex flex-wrap gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-store-navy transition hover:bg-store-paper"
            >
              Talk to sales
            </Link>
            <Link
              href="/products"
              className="rounded-full border border-white/35 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              Browse catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Story + floor image */}
      <section className="border-b border-store-line bg-store-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-store-accent uppercase">
              Our story
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-store-navy sm:text-4xl">
              {aboutProfile.headline}
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-store-muted">
              {aboutProfile.body}
            </p>
            <p className="mt-4 text-[15px] leading-7 text-store-muted">
              Our Gurugram hub houses screen carousels, DTF lines, embroidery
              heads, UV/offset presses, and a finishing bay for packing,
              tagging, and multi-city splits.
            </p>
            <div className="mt-6 flex items-start gap-2.5 text-sm text-store-ink">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-store-accent"
                aria-hidden
              />
              <span>{siteContact.addressLines.join(", ")}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80"
                alt="Print production floor"
                fill
                className="object-cover transition duration-700 hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80"
                alt="Custom bottle branding"
                fill
                className="object-cover transition duration-700 hover:scale-[1.03]"
                sizes="25vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80"
                alt="Finished apparel stack"
                fill
                className="object-cover transition duration-700 hover:scale-[1.03]"
                sizes="25vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Capacity strip */}
      <section className="border-b border-store-line bg-store-navy-deeper text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
          {aboutProfile.capacity.map((item) => (
            <div
              key={item.label}
              className="bg-store-navy-deeper px-5 py-8 text-center sm:py-10"
            >
              <p className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {item.value}
              </p>
              <p className="mt-2 text-xs text-white/60 sm:text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Floor gallery */}
      <section className="border-b border-store-line bg-store-paper">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-store-muted uppercase">
                Inside the hub
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-store-navy">
                Production at a glance
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-store-muted">
              From first proof to packed cartons — a floor built for brand
              accuracy and bulk reliability.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((item, i) => (
              <figure
                key={item.src}
                className={`group relative overflow-hidden rounded-2xl ${
                  i === 0 ? "sm:col-span-2 sm:row-span-2 min-h-[280px]" : "min-h-[180px]"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pt-10 pb-4 text-sm font-semibold text-white">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="border-b border-store-line bg-store-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <h2 className="text-center text-3xl font-bold tracking-tight text-store-navy">
            How we grew with brands
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {timeline.map((item, i) => (
              <div key={item.title} className="relative pt-2">
                <p className="text-xs font-bold tracking-[0.18em] text-store-accent uppercase">
                  {item.year}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-store-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-store-muted">
                  {item.body}
                </p>
                {i < timeline.length - 1 ? (
                  <div
                    aria-hidden
                    className="absolute top-4 right-0 hidden h-px w-1/3 bg-store-line md:block"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars with images */}
      <section className="border-b border-store-line bg-store-paper">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <h2 className="text-3xl font-bold tracking-tight text-store-navy">
            What buyers feel on the floor
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {pillars.map(({ title, body, Icon, image }) => (
              <article
                key={title}
                className="overflow-hidden rounded-2xl border border-store-line bg-white"
              >
                <div className="relative h-44">
                  <Image
                    src={image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-store-navy text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-store-ink">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-store-muted">
                    {body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Eco + certifications */}
      <section className="border-b border-store-line bg-store-surface">
        <div className="mx-auto grid max-w-6xl items-stretch gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80"
              alt="Sustainable materials and packaging"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-store-navy-deeper/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-2 text-white">
              <Leaf className="h-5 w-5 text-store-accent" aria-hidden />
              <span className="text-sm font-semibold">
                Better inks. Smarter stock.
              </span>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-store-muted uppercase">
              Responsibility
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-store-navy">
              Certifications & eco-initiatives
            </h2>
            <ul className="mt-6 space-y-3">
              {aboutProfile.certifications.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-store-line bg-store-paper px-4 py-3.5 text-sm leading-relaxed text-store-ink"
                >
                  <BadgeCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-store-accent"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

    </>
  );
}
