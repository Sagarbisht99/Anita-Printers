"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { QuickQuoteForm } from "@/app/components/storefront/quick-quote";
import { siteContact } from "@/app/lib/storefront/b2b-content";

const channels = [
  {
    title: "Call the desk",
    detail: siteContact.phone,
    href: siteContact.phoneHref,
    Icon: Phone,
    cta: "Call now",
  },
  {
    title: "Email orders",
    detail: siteContact.email,
    href: `mailto:${siteContact.email}`,
    Icon: Mail,
    cta: "Send email",
  },
  {
    title: "Visit hours",
    detail: siteContact.hours,
    href: null,
    Icon: Clock3,
    cta: null,
  },
  {
    title: "Production hub",
    detail: siteContact.addressLines.slice(1).join(", "),
    href: null,
    Icon: MapPin,
    cta: null,
  },
];

export function ContactPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate min-h-[48vh] overflow-hidden border-b border-store-line sm:min-h-[52vh]">
        <Image
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          priority
          className="object-cover object-[center_30%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,31,54,0.92)_0%,rgba(15,61,102,0.8)_50%,rgba(8,31,54,0.55)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(196,59,88,0.2),transparent_45%)]" />

        <div className="relative mx-auto flex min-h-[48vh] max-w-6xl flex-col justify-end px-4 py-12 sm:min-h-[52vh] sm:px-6 sm:py-14 lg:justify-center">
          <p className="store-fade-up text-sm font-semibold tracking-[0.2em] text-store-accent uppercase">
            Contact
          </p>
          <h1
            className="store-fade-up mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ animationDelay: "80ms" }}
          >
            Talk to the B2B desk
          </h1>
          <p
            className="store-fade-up mt-3 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            Share product, quantity, and deadline — or call / WhatsApp for
            same-day direction on MOQ and technique.
          </p>
          <div
            className="store-fade-up mt-6 flex flex-wrap gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href="#inquiry"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-store-navy transition hover:bg-store-paper"
            >
              Send inquiry
            </a>
            <a
              href={siteContact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              <WhatsAppIcon />
              WhatsApp business
            </a>
          </div>
        </div>
      </section>

      {/* Channel cards */}
      <section className="border-b border-store-line bg-store-paper">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:py-12">
          {channels.map(({ title, detail, href, Icon, cta }) => (
            <div
              key={title}
              className="rounded-2xl border border-store-line bg-white p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-store-navy text-white">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h2 className="mt-4 text-sm font-semibold tracking-wide text-store-muted uppercase">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed font-medium text-store-ink">
                {detail}
              </p>
              {href && cta ? (
                <a
                  href={href}
                  className="mt-4 inline-block text-sm font-semibold text-store-navy hover:underline"
                >
                  {cta}
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* Form + map */}
      <section className="border-b border-store-line bg-store-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div id="inquiry">
            <p className="text-xs font-semibold tracking-[0.16em] text-store-muted uppercase">
              Quick lead
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-store-navy">
              Send a quick inquiry
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-store-muted">
              Prefer a full RFQ with artwork upload? Use the quote form — or
              drop a quick note here and we&apos;ll call back.
            </p>
            <div className="mt-6">
              <QuickQuoteForm compact />
            </div>
            <p className="mt-5 text-sm text-store-muted">
              Policies:{" "}
              <Link href="/terms" className="text-store-navy hover:underline">
                Terms
              </Link>
              ,{" "}
              <Link href="/privacy" className="text-store-navy hover:underline">
                Privacy
              </Link>
              ,{" "}
              <Link href="/shipping" className="text-store-navy hover:underline">
                Shipping
              </Link>
              ,{" "}
              <Link href="/refund" className="text-store-navy hover:underline">
                Refunds
              </Link>
              ,{" "}
              <Link href="/#faq" className="text-store-navy hover:underline">
                FAQ
              </Link>
              .
            </p>
          </div>

          <div className="space-y-5">
            <div className="relative overflow-hidden rounded-2xl">
              <div className="relative aspect-[16/10]">
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                  alt="Anita Printers workspace"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-store-line bg-store-paper">
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <h3 className="text-base font-semibold text-store-navy">
                    Find the hub
                  </h3>
                  <p className="mt-1 text-xs text-store-muted">
                    {siteContact.addressLines[0]}
                  </p>
                </div>
                <MapPin className="h-5 w-5 text-store-accent" aria-hidden />
              </div>
              <iframe
                title="Anita Printers location map"
                src={siteContact.mapEmbed}
                className="h-72 w-full border-0 sm:h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              href={siteContact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#128C7E] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#0f7a6e]"
            >
              <WhatsAppIcon />
              Chat on WhatsApp — usually fastest for MOQ checks
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-store-navy-deeper">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-4 py-10 sm:flex-row sm:items-center sm:px-6 sm:py-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Questions before you order?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/70">
              Check MOQs, lead times, and file tips in our FAQ — or message the
              desk directly.
            </p>
          </div>
          <Link
            href="/#faq"
            className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-store-navy transition hover:bg-store-paper"
          >
            View FAQs
          </Link>
        </div>
      </section>
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
