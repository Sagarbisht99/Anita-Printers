import Link from "next/link";
import { siteContact } from "@/app/lib/store/b2b-content";
import { footerPrintMarquee } from "@/app/lib/store/sitemap-links";

const companyLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Catalog" },
  { href: "/contact", label: "Contact" },
  { href: "/#faq", label: "FAQs" },
  { href: "/sitemap", label: "Sitemap" },
];

const printLinks = [
  { href: "/services#what-we-print", label: "Visiting Card" },
  { href: "/services#what-we-print", label: "Letterhead" },
  { href: "/services#what-we-print", label: "Sticker / Label / Tag" },
  { href: "/services#what-we-print", label: "Brochure / Leaflet" },
  { href: "/services#what-we-print", label: "Poster / Flex" },
  { href: "/services#what-we-print", label: "Carry Bag / Box" },
  { href: "/services#what-we-print", label: "Shadi Card" },
  { href: "/services", label: "View all services" },
];

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram", icon: "instagram" },
  { href: "https://facebook.com", label: "Facebook", icon: "facebook" },
  { href: "https://linkedin.com", label: "LinkedIn", icon: "linkedin" },
] as const;

export function StoreFooter() {
  const year = new Date().getFullYear();
  const marquee = [...footerPrintMarquee, ...footerPrintMarquee];

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
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-[70%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(196,59,88,0.12),transparent_70%)]"
      />

      {/* Drifting watermark */}
      <p
        aria-hidden
        className="footer-watermark pointer-events-none absolute inset-x-0 bottom-6 text-center text-[18vw] leading-none font-bold tracking-tight text-white/[0.04] select-none sm:text-[13vw]"
      >
        Anita
      </p>


      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-14">
        {/* Brand */}
        <div className="footer-col" style={{ animationDelay: "0ms" }}>
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.02]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Anita Printers"
              width={44}
              height={44}
              className="h-10 w-10 object-contain transition duration-500 group-hover:rotate-6"
            />
            <span className="text-lg font-bold tracking-tight text-white">
              Anita Printers
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            Offset &amp; screen printing — visiting cards, letterheads,
            stickers, brochures, bags, boxes, flex, and shadi cards.
          </p>
          <p className="mt-4 text-xs text-white/50">
            GSTIN{" "}
            <span className="font-mono text-sm text-white/85">
              {siteContact.gstin}
            </span>
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {socialLinks.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="footer-social flex h-9 w-9 items-center justify-center rounded-full bg-store-accent text-white"
              >
                <SocialIcon name={icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div className="footer-col" style={{ animationDelay: "80ms" }}>
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
        <div className="footer-col" style={{ animationDelay: "160ms" }}>
          <p className="text-xs font-semibold tracking-[0.16em] text-store-accent uppercase">
            What we print
          </p>
          <ul className="mt-4 space-y-2.5">
            {printLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="footer-link-slide text-sm text-white/70">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col" style={{ animationDelay: "240ms" }}>
          <p className="text-xs font-semibold tracking-[0.16em] text-store-accent uppercase">
            Contact
          </p>
          <div className="mt-4 space-y-2.5 text-sm text-white/75">
            {siteContact.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="mt-4 space-y-2 text-sm">
            {siteContact.phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="footer-link-slide block font-semibold text-white"
              >
                {phone.display}
              </a>
            ))}
            <a
              href={siteContact.landline.href}
              className="footer-link-slide block text-white/80"
            >
              {siteContact.landline.display}
            </a>
            <a
              href={`mailto:${siteContact.email}`}
              className="footer-link-slide block break-all text-white/80"
            >
              {siteContact.email}
            </a>
            <p className="text-white/50">{siteContact.hours}</p>
          </div>
        </div>
      </div>

      {/* Bottom bar with shimmer line */}
      <div className="relative border-t border-white/10">
        <div aria-hidden className="footer-shimmer absolute inset-x-0 top-0 h-px" />
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-xs text-white/55">
            © {year} Anita Printers. All Rights Reserved.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/45">
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
    </footer>
  );
}

function SocialIcon({
  name,
}: {
  name: (typeof socialLinks)[number]["icon"];
}) {
  const className = "h-4 w-4 fill-current";
  switch (name) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.064 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
  }
}
