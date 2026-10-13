import { Mail, MessageCircle, Phone } from "lucide-react";
import { QuickQuoteForm } from "@/app/components/store/ui/quick-quote";
import { siteContact } from "@/app/lib/store/b2b-content";

const nextSteps = [
  {
    step: "01",
    title: "Share requirements",
    body: "Item, quantity, size, and deadline — through the form or a quick call.",
  },
  {
    step: "02",
    title: "Receive a written quotation",
    body: "MOQ, per-unit price, and lead time confirmed for your exact specs.",
  },
  {
    step: "03",
    title: "Approve & produce",
    body: "Approve the digital proof — bulk production, QC, and courier dispatch from Noida.",
  },
] as const;

export function HomeEnquirySection() {
  return (
    <section className="border-b border-store-line bg-store-navy-deeper">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
          <div className="mx-auto max-w-xl lg:mx-0">
            <p className="text-xs font-semibold tracking-[0.16em] text-store-accent uppercase">
              Request a quote
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Tell us what you need printed
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Share your product type, quantity, and specifications. We will
              review the requirements and respond with a written quotation —
              no online payment or checkout.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/75">
              <li className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-store-accent" aria-hidden />
                Quotation-based pricing confirmed for your specs
              </li>
              <li className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-store-accent" aria-hidden />
                GST invoices on every order
              </li>
              <li className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-store-accent" aria-hidden />
                Production and courier dispatch from Noida
              </li>
            </ul>

            {/* What happens next */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs font-semibold tracking-[0.16em] text-white/50 uppercase">
                What happens next
              </p>
              <ol className="mt-4 space-y-4">
                {nextSteps.map((item) => (
                  <li key={item.step} className="flex gap-3.5">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-store-accent/15 text-xs font-bold text-store-accent tabular-nums">
                      {item.step}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-white/60">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Quick contact */}
            <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
              <a
                href={siteContact.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-store-accent hover:bg-store-accent"
              >
                <Phone className="h-4 w-4" strokeWidth={2} aria-hidden />
                {siteContact.phone}
              </a>
              <a
                href={siteContact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[#25D366] hover:bg-[#25D366]"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden />
                WhatsApp
              </a>
              <a
                href={`mailto:${siteContact.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-store-logo hover:bg-store-logo"
              >
                <Mail className="h-4 w-4" strokeWidth={2} aria-hidden />
                Email
              </a>
            </div>
            <p className="mt-4 text-xs text-white/45">{siteContact.hours}</p>
          </div>

          <QuickQuoteForm
            compact
            leadSource="Source: Homepage enquiry form"
            className="bg-white"
          />
        </div>
      </div>
    </section>
  );
}
