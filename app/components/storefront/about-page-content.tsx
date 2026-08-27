"use client";

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
    src: "https://fairprintindia.com/wp-content/uploads/2023/05/print-house-worker-setting-parameters-modern-offset-printing-machine-1-scaled.jpg",
    alt: "Offset stationery and card printing",
    label: "Offset stationery",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlRI1prdpTvRqhGK2VdsObzhgFTRZbefxaJaFTfwjiT2XXcz3I5c9IY4i&s=10",
    alt: "Screen print apparel run on the floor",
    label: "Screen apparel",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7OtfAl4xTa7PI1Lsr-Zdo2g68XqiF42Rm5lHJUi4xSst170DZ9MHbd36h&s=10",
    alt: "Custom packaging and product boxes",
    label: "Packaging",
  },
  {
    src: "https://content.jdmagicbox.com/v2/comp/jaunpur/b6/9999p5452.5452.241129205629.f4b6/catalogue/kamal-press-rizwikhan-jaunpur-printing-press-o8xkaz0okj.jpg",
    alt: "Business stationery and catalogs",
    label: "Corporate kits",
  },
];

const pillars = [
  {
    title: "Quality assurance",
    body: "Five-stage QC — artwork lock, pre-press, first-article, in-line, and outbound carton audit.",
    Icon: ShieldCheck,
    image:
      "https://content.jdmagicbox.com/comp/vizianagaram/m1/9999p8922.8922.180905033757.j8m1/catalogue/ss-printers-vizianagaram-nkjogr2ku7.jpg",
  },
  {
    title: "Machine capacity",
    body: "Parallel apparel and commercial print lines so event deadlines don’t stall stationery runs.",
    Icon: Factory,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5cvSApHcOCSfltox2IflyKYlZLmdQmFTKYhKpxnF6EW800PRgL80CT1E&s=10",
  },
  {
    title: "Factory access",
    body: "Corporate buyers can schedule floor visits for sampling days and process walkthroughs.",
    Icon: Users,
    image:
      "https://content.jdmagicbox.com/v2/comp/jaunpur/b6/9999p5452.5452.241129205629.f4b6/catalogue/kamal-press-rizwikhan-jaunpur-printing-press-o8xkaz0okj.jpg",
  },
];

const timeline = [
  {
    year: "Start",
    title: "Homegrown print desk",
    body: "Built around proof-first discipline for local brands, shops, and agencies.",
  },
  {
    year: "Scale",
    title: "Offset + screen floor",
    body: "Commercial offset for bulk paper jobs and screen for apparel, bags, and specialty — under one Noida roof.",
  },
  {
    year: "Today",
    title: "Pan-India B2B partner",
    body: "Corporate, retail, events, and schools — GST invoices, multi-city splits, dedicated account managers.",
  },
];
export function AboutPageContent() {
  return (
    <>
      {/* Full-bleed hero */}
      <section className="relative isolate min-h-[52vh] overflow-hidden border-b border-store-line sm:min-h-[56vh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=2000&q=80"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-center"
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
            {aboutProfile.headline} Stationery, packaging, apparel, and
            specialty print for corporate, retail, events, and schools.
          </p>
          <div
            className="store-fade-up mt-6 flex flex-wrap gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-store-navy transition-all duration-300 hover:scale-[1.03] hover:bg-store-accent hover:text-white"
            >
              Talk to sales
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-white/35 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-store-navy"
            >
              View services
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
              Our Noida hub houses offset presses for commercial stationery
              and packaging, screen carousels for apparel and specialty
              materials, plus DTF, embroidery, UV finishing, and a packing bay
              for multi-city splits — serving companies, shops, weddings, and
              institutes.
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80"
                  alt="Print production floor"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80"
                  alt="Custom bottle branding"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80"
                  alt="Finished apparel stack"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
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
              className="group bg-store-navy-deeper px-5 py-8 text-center transition-colors duration-300 hover:bg-store-navy sm:py-10"
            >
              <p className="text-2xl font-extrabold tracking-tight transition-transform duration-300 group-hover:scale-105 sm:text-3xl">
                {item.value}
              </p>
              <p className="mt-2 text-xs text-white/60 transition-colors group-hover:text-white/85 sm:text-sm">
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
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
              <div
                key={item.title}
                className="group relative rounded-2xl border border-transparent p-4 pt-2 transition-all duration-300 hover:-translate-y-1 hover:border-store-navy/15 hover:bg-store-paper hover:shadow-[0_16px_32px_-20px_rgba(15,61,102,0.3)]"
              >
                <p className="text-xs font-bold tracking-[0.18em] text-store-accent uppercase transition-colors group-hover:text-store-navy">
                  {item.year}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-store-ink transition-colors group-hover:text-store-navy">
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
            {pillars.map(({ title, body, Icon, image }, i) => (
              <article
                key={title}
                className={`group overflow-hidden rounded-2xl border border-store-line bg-white transition-all duration-300 hover:-translate-y-1.5 ${
                  i === 0
                    ? "hover:border-store-navy hover:shadow-[0_22px_40px_-20px_rgba(15,61,102,0.45)]"
                    : i === 1
                      ? "hover:border-store-accent hover:shadow-[0_22px_40px_-20px_rgba(196,59,88,0.4)]"
                      : "hover:border-store-logo hover:shadow-[0_22px_40px_-20px_rgba(29,111,184,0.45)]"
                }`}
              >
                <div className="relative h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                />
                  <div className="absolute inset-0 bg-store-navy/0 transition duration-300 group-hover:bg-store-navy/10" />
                </div>
                <div className="p-6">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition-all duration-300 group-hover:scale-110 ${
                      i === 0
                        ? "bg-store-navy group-hover:bg-store-navy"
                        : i === 1
                          ? "bg-store-navy group-hover:bg-store-accent"
                          : "bg-store-navy group-hover:bg-store-logo"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-store-ink transition-colors group-hover:text-store-navy">
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
          <div className="group relative min-h-[320px] overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://5.imimg.com/data5/SELLER/Default/2022/1/PZ/WU/CI/142005548/sp-idf-346-500x500.jpg"
                  alt="Sustainable materials and packaging"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
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
                  className="group flex items-start gap-3 rounded-xl border border-store-line bg-store-paper px-4 py-3.5 text-sm leading-relaxed text-store-ink transition-all duration-300 hover:-translate-x-0 hover:border-store-accent/30 hover:bg-store-rose-soft hover:pl-5"
                >
                  <BadgeCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-store-accent transition-transform duration-300 group-hover:scale-110"
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
