"use client";

import Link from "next/link";
import { MapPin, ShieldCheck, MessageSquare, FileCheck2 } from "lucide-react";
import { StoreBreadcrumb } from "@/app/components/store/ui/breadcrumb";
import { QuoteButton } from "@/app/components/store/ui/quote-popup";
import { aboutProfile, siteContact } from "@/app/lib/store/b2b-content";
import { trail } from "@/app/lib/seo/breadcrumbs";

const pillars = [
  {
    title: "Proof before print",
    body: "You approve a digital proof — size, colour, and layout locked — before production starts.",
    Icon: FileCheck2,
  },
  {
    title: "Customisation support",
    body: "Sizes, colours, finishes, and artwork guidance configured per product and confirmed in your quotation.",
    Icon: MessageSquare,
  },
  {
    title: "Clear B2B process",
    body: "Share requirements, receive a written quotation, approve specs, then production and dispatch.",
    Icon: ShieldCheck,
  },
] as const;

const timeline = [
  {
    year: "Step 1",
    title: "Share requirements",
    body: "Tell us the product, quantity, size, and deadline — online, by phone, or WhatsApp.",
  },
  {
    year: "Step 2",
    title: "Receive quotation",
    body: "We confirm pricing, MOQ fit, and timeline based on your exact specifications.",
  },
  {
    year: "Step 3",
    title: "Approve & produce",
    body: "Approve the artwork proof, then we print, quality-check, pack, and dispatch.",
  },
] as const;

export function AboutPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-store-line bg-store-navy-deeper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/banner-2.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,31,54,0.94)_0%,rgba(15,61,102,0.8)_50%,rgba(8,31,54,0.6)_100%)]" />

        <div className="relative mx-auto flex min-h-[380px] max-w-6xl flex-col items-center justify-center px-4 py-14 text-center sm:px-6">
          <StoreBreadcrumb
            items={trail({ name: "About" })}
            tone="dark"
            className="mb-4 justify-center"
          />
          <p className="text-sm font-semibold tracking-[0.2em] text-store-accent uppercase">
            About us
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
            About Anita Printers
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80">
            {aboutProfile.headline} Custom B2B printing for brands, shops, and
            institutions.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <QuoteButton
              intent="about-sales"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-store-navy transition hover:bg-store-accent hover:text-white"
            >
              Request a Quote
            </QuoteButton>
            <Link
              href="/services"
              className="rounded-full border border-white/35 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-store-navy"
            >
              View services
            </Link>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="border-b border-store-line bg-store-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.16em] text-store-accent uppercase">
              Our story
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-store-navy sm:text-4xl">
              {aboutProfile.headline}
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-store-muted">
              {aboutProfile.body}
            </p>
            <div className="mt-6 flex items-start gap-2.5 text-sm text-store-ink">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-store-accent"
                aria-hidden
              />
              <span>{siteContact.addressLines.join(", ")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-store-line bg-store-navy-deeper text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <h2 className="text-3xl font-bold tracking-tight">
            How we work with brands
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
            A straightforward quotation-led process — no online payment or
            checkout.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {timeline.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white/5 px-5 py-6 transition hover:bg-white/8"
              >
                <p className="text-xs font-bold tracking-[0.18em] text-store-accent uppercase">
                  {item.year}
                </p>
                <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-b border-store-line bg-store-paper">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <h2 className="text-3xl font-bold tracking-tight text-store-navy">
            What working with us looks like
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {pillars.map(({ title, body, Icon }) => (
              <article
                key={title}
                className="rounded-2xl border border-store-line bg-white px-6 py-6 transition hover:-translate-y-1 hover:border-store-navy hover:shadow-[0_18px_36px_-22px_rgba(15,61,102,0.4)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-store-navy text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-store-ink">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-store-muted">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
