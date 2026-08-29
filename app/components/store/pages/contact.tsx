"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { QuickQuoteForm } from "@/app/components/store/ui/quick-quote";
import { QuoteButton } from "@/app/components/store/ui/quote-popup";
import { siteContact } from "@/app/lib/store/b2b-content";

const channels = [
  {
    title: "Call mobile",
    detail: siteContact.phones.map((p) => p.display).join(" · "),
    href: siteContact.phoneHref,
    Icon: Phone,
    cta: "Call now",
  },
  {
    title: "Landline",
    detail: siteContact.landline.display,
    href: siteContact.landline.href,
    Icon: Phone,
    cta: "Call landline",
  },
  {
    title: "Email orders",
    detail: siteContact.email,
    href: `mailto:${siteContact.email}`,
    Icon: Mail,
    cta: "Send email",
  },
  {
    title: "Visit us",
    detail: siteContact.addressLines.slice(1).join(", "),
    href: null,
    Icon: MapPin,
    cta: null,
  },
];

/** Each channel card gets a different hover colour */
const channelHoverStyles = [
  "hover:-translate-y-1.5 hover:border-store-navy hover:bg-store-navy hover:shadow-[0_20px_36px_-18px_rgba(15,61,102,0.5)] [&_.ch-icon]:group-hover:bg-white [&_.ch-icon]:group-hover:text-store-navy [&_.ch-title]:group-hover:text-white/65 [&_.ch-detail]:group-hover:text-white [&_.ch-cta]:group-hover:text-white",
  "hover:-translate-y-1.5 hover:border-store-accent hover:bg-store-accent hover:shadow-[0_20px_36px_-18px_rgba(196,59,88,0.45)] [&_.ch-icon]:group-hover:bg-white [&_.ch-icon]:group-hover:text-store-accent [&_.ch-title]:group-hover:text-white/70 [&_.ch-detail]:group-hover:text-white [&_.ch-cta]:group-hover:text-white",
  "hover:-translate-y-1.5 hover:border-store-logo hover:bg-store-logo hover:shadow-[0_20px_36px_-18px_rgba(29,111,184,0.5)] [&_.ch-icon]:group-hover:bg-white [&_.ch-icon]:group-hover:text-store-logo [&_.ch-title]:group-hover:text-white/70 [&_.ch-detail]:group-hover:text-white [&_.ch-cta]:group-hover:text-white",
  "hover:-translate-y-1.5 hover:border-store-navy hover:bg-white hover:shadow-[0_20px_36px_-18px_rgba(15,61,102,0.35)] [&_.ch-icon]:group-hover:bg-store-accent [&_.ch-title]:group-hover:text-store-accent [&_.ch-detail]:group-hover:text-store-navy",
] as const;

export function ContactPageContent() {
  return (
    <>
      <section className="relative isolate min-h-[48vh] overflow-hidden border-b border-store-line sm:min-h-[52vh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=80"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
                />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,31,54,0.92)_0%,rgba(15,61,102,0.8)_50%,rgba(8,31,54,0.55)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(196,59,88,0.2),transparent_45%)]" />

        <div className="relative mx-auto flex min-h-[48vh] max-w-6xl flex-col items-center justify-center px-4 py-12 text-center sm:min-h-[52vh] sm:px-6 sm:py-14">
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
            Share product, quantity, and deadline — we&apos;ll recommend offset,
            screen, or a hybrid and quote MOQ for corporate, retail, event, or
            school jobs.
          </p>
          <div
            className="store-fade-up mt-6 flex flex-wrap justify-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <QuoteButton
              intent="contact-hero"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-store-navy transition-all duration-300 hover:scale-[1.03] hover:bg-store-accent hover:text-white"
            >
              Send inquiry
            </QuoteButton>
            <a
              href={siteContact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-store-navy"
            >
              <WhatsAppIcon />
              WhatsApp business
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-store-line bg-store-paper">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:py-12">
          {channels.map(({ title, detail, href, Icon, cta }, i) => (
            <div
              key={title}
              className={`group rounded-2xl border border-store-line bg-white p-5 transition-all duration-300 ${channelHoverStyles[i] ?? channelHoverStyles[0]}`}
            >
              <div className="ch-icon flex h-10 w-10 items-center justify-center rounded-full bg-store-navy text-white transition-all duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h2 className="ch-title mt-4 text-sm font-semibold tracking-wide text-store-muted uppercase transition-colors">
                {title}
              </h2>
              <p className="ch-detail mt-2 text-sm leading-relaxed font-medium text-store-ink transition-colors">
                {detail}
              </p>
              {href && cta ? (
                <a
                  href={href}
                  className="ch-cta mt-4 inline-block text-sm font-semibold text-store-navy underline-offset-4 transition-colors hover:underline"
                >
                  {cta}
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>

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
              Tell us if you need offset stationery/packaging or screen
              apparel/specialty — we&apos;ll call back with MOQ and lead time.
              Prefer a full RFQ with artwork? Use the quote form below.
            </p>
            <div className="mt-6">
              <QuickQuoteForm compact />
            </div>
            <p className="mt-5 text-sm text-store-muted">
              Policies:{" "}
              <Link
                href="/terms"
                className="font-medium text-store-navy transition-colors hover:text-store-accent hover:underline"
              >
                Terms
              </Link>
              ,{" "}
              <Link
                href="/privacy"
                className="font-medium text-store-navy transition-colors hover:text-store-accent hover:underline"
              >
                Privacy
              </Link>
              ,{" "}
              <Link
                href="/shipping"
                className="font-medium text-store-navy transition-colors hover:text-store-accent hover:underline"
              >
                Shipping
              </Link>
              ,{" "}
              <Link
                href="/refund"
                className="font-medium text-store-navy transition-colors hover:text-store-accent hover:underline"
              >
                Refunds
              </Link>
              ,{" "}
              <Link
                href="/#faq"
                className="font-medium text-store-navy transition-colors hover:text-store-accent hover:underline"
              >
                FAQ
              </Link>
              .
            </p>
          </div>

          <div className="space-y-5">
            <div className="group relative overflow-hidden rounded-2xl">
              <div className="relative aspect-[16/10]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://img.magnific.com/free-photo/contact-register-feedback-support-help-concept_53876-124243.jpg"
                  alt="Anita Printers workspace"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-store-navy/0 transition duration-300 group-hover:bg-store-navy/15" />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-store-line bg-store-paper transition-all duration-300 hover:border-store-navy/25 hover:shadow-[0_16px_32px_-20px_rgba(15,61,102,0.35)]">
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <h3 className="text-base font-semibold text-store-navy">
                    Find the hub
                  </h3>
                  <p className="mt-1 text-xs text-store-muted">
                    {siteContact.addressLines.join(", ")}
                  </p>
                  <p className="mt-1 text-xs font-medium text-store-ink">
                    GSTIN: {siteContact.gstin}
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
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#128C7E] px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0f7a6e] hover:shadow-[0_14px_28px_-12px_rgba(18,140,126,0.55)]"
            >
              <WhatsAppIcon />
              Chat on WhatsApp — usually fastest for MOQ checks
            </a>
          </div>
        </div>
      </section>

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
            className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-store-navy transition-all duration-300 hover:scale-[1.03] hover:bg-store-accent hover:text-white"
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
