import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteContact } from "@/app/lib/store/b2b-content";
import { brandLogo } from "@/app/lib/seo/brand-icons";

const companyLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Catalog" },
  { href: "/contact", label: "Contact" },
  { href: "/#faq", label: "FAQs" },
  { href: "/sitemap", label: "Sitemap" },
];

const whatWePrintLinks = [
  { href: "/products?q=card", label: "Visiting Card" },
  { href: "/products?q=letterhead", label: "Letterhead" },
  { href: "/products?q=sticker", label: "Sticker / Label / Tag" },
  { href: "/products?q=brochure", label: "Brochure / Leaflet" },
  { href: "/products?q=poster", label: "Poster / Flex" },
  { href: "/products?q=bag", label: "Carry Bag / Box" },
  { href: "/products?q=wedding", label: "Shadi Card" },
  { href: "/services", label: "View all services" },
];

const marqueePills = [
  { label: "Request a Quote", href: "/contact" },
  { label: "Barcode", href: "/products?q=barcode" },
  { label: "Sticker", href: "/products?q=sticker" },
  { label: "Label", href: "/products?q=label" },
  { label: "Tag", href: "/products?q=tag" },
  { label: "Letterhead", href: "/products?q=letterhead" },
  { label: "Visiting Card", href: "/products?q=card" },
  { label: "Plastic Material Printing", href: "/products?q=plastic" },
  { label: "Brochures", href: "/products?q=brochure" },
  { label: "Posters", href: "/products?q=poster" },
  { label: "Leaflets", href: "/products?q=leaflet" },
  { label: "Carry Bag", href: "/products?q=bag" },
  { label: "Box", href: "/products?q=box" },
  { label: "Shadi Card", href: "/products?q=wedding" },
];

export async function StoreFooter() {
  const year = new Date().getFullYear();
  const pillRow = [...marqueePills, ...marqueePills];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-store-navy-deeper text-white">
      {/* Ambient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-[12%] h-56 w-56 rounded-full bg-store-accent/20 blur-3xl footer-orb"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-10 h-64 w-64 rounded-full bg-store-logo/25 blur-3xl footer-orb-delay"
      />
      {/* Big Anita watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 text-[22vw] leading-none font-extrabold tracking-tight text-white/[0.04] select-none lg:text-[16rem]"
      >
        Anita
      </span>

      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-12 lg:grid-cols-4 lg:gap-8 lg:py-14">
        {/* Brand */}
        <div className="footer-col col-span-2 lg:col-span-1">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.02]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brandLogo.svg}
              alt="Anita Printers"
              width={44}
              height={44}
              className="h-10 w-10 object-contain transition duration-500 group-hover:rotate-6"
            />
            <span className="text-lg font-bold tracking-tight text-white">
              Anita Printers
            </span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
            Offset &amp; screen printing — visiting cards, letterheads,
            stickers, brochures, bags, boxes, flex, and shadi cards.
          </p>
          <p className="mt-4 text-xs text-white/50">
            GSTIN{" "}
            <span className="font-mono text-sm text-white/85">
              {siteContact.gstin}
            </span>
          </p>
        </div>

        {/* Company */}
        <div className="footer-col min-w-0">
          <p className="text-xs font-semibold tracking-[0.16em] text-store-accent uppercase">
            Company
          </p>
          <ul className="mt-4 space-y-2.5">
            {companyLinks.map((link) => (
              <li key={link.href + link.label}>
                <Link href={link.href} className="footer-link-slide text-sm text-white/70">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* What we print */}
        <div className="footer-col min-w-0">
          <p className="text-xs font-semibold tracking-[0.16em] text-store-accent uppercase">
            What we print
          </p>
          <ul className="mt-4 space-y-2.5">
            {whatWePrintLinks.map((link) => (
              <li key={link.href + link.label}>
                <Link href={link.href} className="footer-link-slide text-sm text-white/70">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col col-span-2 min-w-0 lg:col-span-1">
          <p className="text-xs font-semibold tracking-[0.16em] text-store-accent uppercase">
            Contact
          </p>

          <div className="mt-4 space-y-4 text-sm text-white/75">
            <div className="flex items-start gap-2.5">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-store-accent"
                strokeWidth={2}
                aria-hidden
              />
              <address className="not-italic leading-relaxed">
                {siteContact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone
                className="mt-0.5 h-4 w-4 shrink-0 text-store-accent"
                strokeWidth={2}
                aria-hidden
              />
              <div className="min-w-0 space-y-1">
                {siteContact.phones.map((phone) => (
                  <a
                    key={phone.href}
                    href={phone.href}
                    className="block py-0.5 text-sm text-white/90 transition hover:text-white"
                  >
                    {phone.display}
                  </a>
                ))}
                <a
                  href={siteContact.landline.href}
                  className="block py-0.5 text-sm text-white/75 transition hover:text-white"
                >
                  {siteContact.landline.display}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Mail
                className="mt-0.5 h-4 w-4 shrink-0 text-store-accent"
                strokeWidth={2}
                aria-hidden
              />
              <a
                href={`mailto:${siteContact.email}`}
                className="min-w-0 break-all text-sm text-white/75 transition hover:text-white sm:break-normal"
              >
                {siteContact.email}
              </a>
            </div>

            <p className="text-xs text-white/50">{siteContact.hours}</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10 pb-20">
        <div aria-hidden className="footer-shimmer absolute inset-x-0 top-0 h-px" />
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left">
          <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:gap-3">
            <p className="text-xs text-white/55">
              © {year} Anita Printers. All Rights Reserved.
            </p>
            <p className="text-xs text-white/45">
              <span className="text-store-accent" aria-hidden>
                ❤
              </span>{" "}
              Created by{" "}
              <a
                href="https://webign.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition hover:text-white"
              >
                webign.in
              </a>{" "}
              &amp;{" "}
              <a
                href="https://codewithsagar.online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition hover:text-white"
              >
                codewithsagar.online
              </a>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-white/45 sm:justify-end">
            <Link href="/privacy" className="footer-link-slide">
              Privacy
            </Link>
            <Link href="/terms" className="footer-link-slide">
              Terms
            </Link>
            <Link href="/shipping" className="footer-link-slide">
              Shipping
            </Link>
            <Link href="/refund" className="footer-link-slide">
              Refunds
            </Link>
            <Link href="/sitemap" className="footer-link-slide text-store-accent/80">
              Sitemap
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom pill marquee */}
      <div className="fixed inset-x-0 bottom-0 z-[120] border-t border-white/10 bg-store-navy">
        <div className="overflow-hidden py-3">
          <div
            className="bottom-marquee flex w-max items-center gap-3"
            role="region"
            aria-label="Quick links"
          >
            {pillRow.map((pill, index) => (
              <Link
                key={`${pill.label}-${index}`}
                href={pill.href}
                className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold whitespace-nowrap text-white/85 backdrop-blur-sm transition hover:border-store-accent hover:bg-store-accent hover:text-white sm:text-sm"
              >
                {pill.label}
                <span aria-hidden className="text-store-accent">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
