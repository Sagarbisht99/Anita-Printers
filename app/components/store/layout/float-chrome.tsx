"use client";

import Link from "next/link";
import { Phone, Package } from "lucide-react";
import { EnquiryHangTag } from "@/app/components/store/ui/enquiry-hang-tag";
import { QuoteButton } from "@/app/components/store/ui/quote-popup";
import { siteContact } from "@/app/lib/store/b2b-content";

type MarqueeItem =
  | { label: string; href: string; openQuote?: false }
  | { label: string; openQuote: true };

const marqueeItems: MarqueeItem[] = [
  { label: "Barcode", href: "/services#what-we-print" },
  { label: "Sticker", href: "/services#what-we-print" },
  { label: "Label", href: "/services#what-we-print" },
  { label: "Tag", href: "/services#what-we-print" },
  { label: "Letterhead", href: "/products?q=letterhead" },
  { label: "Visiting Card", href: "/products?q=card" },
  { label: "Plastic Material Printing", href: "/services#screen" },
  { label: "Brochures", href: "/products?q=brochure" },
  { label: "Posters", href: "/products?q=poster" },
  { label: "Leaflets", href: "/products?q=leaflet" },
  { label: "Carry Bag", href: "/products?q=bag" },
  { label: "Box", href: "/products?q=box" },
  { label: "Flex", href: "/products?q=flex" },
  { label: "Shadi Card", href: "/products?q=wedding" },
  { label: "Offset Printing", href: "/services#offset" },
  { label: "Screen Printing", href: "/services#screen" },
  { label: "Request a Quote", openQuote: true },
];

export function StoreFloatChrome() {
  const row = [...marqueeItems, ...marqueeItems];

  return (
    <>
      <QuoteButton
        aria-label="Bulk order quote"
        intent="bulk-order"
        className="fixed top-1/2 left-0 z-[70] hidden -translate-y-1/2 flex-col items-center gap-2 rounded-none bg-store-accent px-2 py-3.5 text-white shadow-md transition hover:bg-[#a8324c] sm:flex sm:px-2.5 sm:py-4"
      >
        <Package className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
        <span
          className="text-[10px] font-bold tracking-[0.18em] uppercase sm:text-[11px]"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          Bulk Order
        </span>
      </QuoteButton>

      <EnquiryHangTag />

      <div className="fixed right-3 bottom-[4.75rem] z-[70] flex flex-col gap-2.5 sm:right-5 sm:bottom-24 sm:gap-3">
        <a
          href={siteContact.phoneHref}
          aria-label="Call Anita Printers"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-store-navy text-white shadow-lg transition hover:bg-store-navy-dark sm:h-12 sm:w-12"
        >
          <Phone className="h-5 w-5" aria-hidden />
        </a>
        <a
          href={siteContact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Anita Printers"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:bg-[#1ebe57] sm:h-12 sm:w-12"
        >
          <WhatsAppIcon />
        </a>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-[65] border-t border-white/10 bg-store-navy-deeper">
        <div className="overflow-hidden py-2.5">
          <div className="bottom-marquee flex w-max items-center gap-3 px-3">
            {row.map((item, index) => {
              const chipClass =
                "inline-flex shrink-0 items-center gap-2 rounded-full bg-store-navy px-4 py-2 text-xs font-semibold whitespace-nowrap text-white transition hover:bg-store-navy-dark sm:text-sm";

              if ("openQuote" in item && item.openQuote) {
                return (
                  <QuoteButton
                    key={`${item.label}-${index}`}
                    className={chipClass}
                    intent="marquee-quote"
                  >
                    {item.label}
                    <span aria-hidden className="text-white/70">
                      →
                    </span>
                  </QuoteButton>
                );
              }

              return (
                <Link
                  key={`${item.label}-${index}`}
                  href={item.href}
                  className={chipClass}
                >
                  {item.label}
                  <span aria-hidden className="text-white/70">
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
