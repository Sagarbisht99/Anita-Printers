"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  Headset,
  Palette,
  PackageCheck,
  Ruler,
  Sparkles,
  Tags,
  ThumbsUp,
} from "lucide-react";
import type {
  StoreCategoryDetail,
  StoreProductItem,
} from "@/app/actions/store/catalog";
import { StoreBreadcrumb } from "@/app/components/store/ui/breadcrumb";
import { StoreProductCard } from "@/app/components/store/ui/product-card";
import { QuoteButton } from "@/app/components/store/ui/quote-popup";
import { trail } from "@/app/lib/seo/breadcrumbs";

const HERO_PERKS = [
  { icon: Palette, label: "100% Customized" },
  { icon: BadgePercent, label: "Affordable Options" },
  { icon: PackageCheck, label: "Bulk Orders Welcome" },
  { icon: Headset, label: "Quality Support" },
] as const;

const ABOUT_FEATURES = [
  {
    icon: ThumbsUp,
    title: "100% Satisfaction",
    body: "Proof-first process — approve before we print.",
  },
  {
    icon: Palette,
    title: "Customisation Options",
    body: "Sizes, colours, materials, and finishes to your brief.",
  },
  {
    icon: Tags,
    title: "Wide Range of Products",
    body: "One unit for stationery, packaging, and specialty print.",
  },
  {
    icon: Sparkles,
    title: "Tailored Solutions for Everyone",
    body: "Corporate, retail, events, and schools — quoted fairly.",
  },
] as const;

const QUOTE_STEPS = [
  {
    title: "Share your requirements",
    body: "Tell us the product, quantity, size, and deadline through the quote form or a call.",
  },
  {
    title: "Receive a quotation",
    body: "We confirm pricing, MOQ, and timeline based on your specifications.",
  },
  {
    title: "Approve artwork and details",
    body: "Send your artwork (or request design help) and approve the final proof.",
  },
  {
    title: "Production & Dispatch",
    body: "We print, quality-check, pack, and dispatch from our Noida unit.",
  },
] as const;

const CATEGORY_FAQS = [
  {
    q: "What is the minimum order quantity?",
    a: "MOQ depends on the specific product and specifications. Each product page lists its confirmed MOQ — request a quote for your exact requirements.",
  },
  {
    q: "Can I customise size, colour, and finish?",
    a: "Yes. Customisation options vary by product. Open any product to see supported sizes and colours, or share your own specifications in the quote request.",
  },
  {
    q: "How do I get a price?",
    a: "Pricing depends on quantity, size, material, and finish. Share your requirements and we will send a written quotation — there is no fixed checkout price.",
  },
  {
    q: "Do you take bulk / corporate orders?",
    a: "Yes. Anita Printers is a B2B production partner. Share your ongoing or one-time volume requirements and we will quote accordingly.",
  },
  {
    q: "How long does production take?",
    a: "Timeline is confirmed with your quotation after artwork and specifications are locked. Rush requirements can be discussed when you enquire.",
  },
  {
    q: "Do you deliver across India?",
    a: "Yes. Orders are dispatched by courier from our Noida unit to offices, shops, and venues across India.",
  },
] as const;

export function CategoryDetailView({
  category,
  products,
}: {
  category: StoreCategoryDetail;
  products: StoreProductItem[];
}) {
  const breadcrumbItems = trail(
    { name: "Products", path: "/products" },
    { name: category.name },
  );

  const heroImage = products.find((p) => p.image)?.image ?? null;
  const aboutImage =
    products.map((p) => p.image).filter(Boolean)[1] ??
    products.find((p) => p.image)?.image ??
    null;

  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <StoreBreadcrumb items={breadcrumbItems} className="mb-6" />

      {/* Hero */}
      <section className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-store-navy sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {category.name}
          </h1>
          {category.description ? (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-store-muted sm:text-[15px]">
              {category.description}
            </p>
          ) : null}
          <ul className="mt-7 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
            {HERO_PERKS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-store-line bg-white text-store-navy shadow-sm">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <span className="text-xs leading-snug font-medium text-store-ink">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#efe7dc] shadow-[0_20px_48px_-30px_rgba(15,61,102,0.4)]">
          {heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroImage}
              alt={category.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center">
              <span className="text-sm font-semibold text-store-muted">
                {category.name}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Products in this category */}
      <section className="mt-12" aria-label="Products in this category">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-store-navy">
              Products in this category
            </h2>
            <p className="mt-1.5 text-sm text-store-muted">
              We customise every product to your requirements.{" "}
              <Link
                href="/products"
                className="font-semibold text-store-navy hover:underline"
              >
                By {category.name} →
              </Link>
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-store-line bg-store-surface px-6 py-12 text-center">
            <p className="text-sm text-store-muted">
              This category does not have listed products yet.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <QuoteButton
                category={category.name}
                intent="category-empty"
                className="rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-store-navy-dark"
              >
                Request a Quote
              </QuoteButton>
              <Link
                href="/products"
                className="rounded-full border border-store-line px-5 py-2.5 text-sm font-semibold text-store-ink transition hover:border-store-navy hover:text-store-navy"
              >
                Browse all products
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-5 grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <StoreProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* About */}
      <section className="mt-12">
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-store-navy">
              About {category.name}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-store-muted sm:text-[15px]">
              {category.description ??
                `Custom ${category.name.toLowerCase()} are designed to meet your exact business needs. Made from high-quality materials, they deliver durability, style, and a professional finish. Whether for branding, packaging, or everyday use, these products help your business stand out with a lasting impression.`}
            </p>
          </div>
          {aboutImage ? (
            <div className="overflow-hidden rounded-2xl border border-store-line bg-[#efe7dc]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={aboutImage}
                alt={`${category.name} examples`}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          ) : null}
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_FEATURES.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="rounded-2xl border border-store-line bg-white p-5 transition hover:border-store-navy/30 hover:shadow-[0_14px_30px_-20px_rgba(15,61,102,0.35)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-store-navy/8 text-store-navy">
                <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
              </span>
              <h3 className="mt-3 text-sm font-bold text-store-ink">{title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-store-muted">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* How to get a quote */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight text-store-navy">
          How to Get a Quote
        </h2>
        <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {QUOTE_STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-store-navy text-sm font-bold text-white tabular-nums">
                {index + 1}
              </span>
              <div>
                <h3 className="text-sm font-bold text-store-ink">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-store-muted">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA banner */}
      <section className="mt-12 overflow-hidden rounded-2xl border border-store-line bg-[#f2f5f9]">
        <div className="flex flex-col items-center gap-6 px-6 py-8 sm:flex-row sm:px-8">
          {heroImage ? (
            <div className="hidden h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-store-line bg-white sm:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <h3 className="text-lg font-bold tracking-tight text-store-navy sm:text-xl">
              Need {category.name.toLowerCase()} for your business?
            </h3>
            <p className="mt-1 text-sm text-store-muted">
              Share your requirements — we&apos;ll handle the rest with quality
              and care.
            </p>
          </div>
          <QuoteButton
            category={category.name}
            intent="category-banner"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-store-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-store-navy-dark"
          >
            Request a Quote
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
          </QuoteButton>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12" aria-label="Category frequently asked questions">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-store-navy">
            Frequently Asked Questions
          </h2>
          <Link
            href="/#faq"
            className="inline-flex items-center gap-1 text-sm font-semibold text-store-navy hover:underline"
          >
            View all FAQs
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
          </Link>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {CATEGORY_FAQS.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-store-line bg-white px-4 py-3.5 open:border-store-navy/20"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-store-ink marker:content-none">
                <span className="flex items-start justify-between gap-3">
                  <span className="min-w-0 text-left leading-snug">{item.q}</span>
                  <span
                    aria-hidden
                    className="mt-0.5 shrink-0 text-store-muted transition group-open:rotate-45 group-hover:text-store-accent sm:mt-0"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-store-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Bottom nav */}
      <nav className="mt-10 flex flex-wrap gap-3" aria-label="More categories">
        <Link
          href="/products"
          className="rounded-full border border-store-line bg-white px-5 py-2.5 text-sm font-semibold text-store-ink transition hover:border-store-navy hover:text-store-navy"
        >
          ← All products
        </Link>
        <QuoteButton
          category={category.name}
          intent="category-bottom"
          className="inline-flex items-center gap-2 rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-store-navy-dark"
        >
          Request a Quote
          <Ruler className="h-4 w-4" strokeWidth={2.25} aria-hidden />
        </QuoteButton>
      </nav>
    </article>
  );
}
