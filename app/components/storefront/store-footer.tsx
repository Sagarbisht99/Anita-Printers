import Link from "next/link";
import Image from "next/image";
import { siteContact } from "@/app/lib/storefront/b2b-content";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Catalog / Shop" },
  { href: "/contact", label: "Request a Quote" },
  { href: "/contact", label: "Contact" },
  { href: "/#faq", label: "FAQs" },
];

const categoryLinks = [
  { href: "/products?q=apparel", label: "Custom Apparel" },
  { href: "/products?q=tshirt", label: "T-Shirts & Polos" },
  { href: "/products?q=hoodie", label: "Hoodies & Sweatshirts" },
  { href: "/products?q=card", label: "Business Cards" },
  { href: "/products?q=stationery", label: "Printed Stationery" },
  { href: "/products?q=mug", label: "Mug Printing" },
  { href: "/products?q=bag", label: "Tote Bags" },
  { href: "/products?q=gift", label: "Corporate Gifting" },
  { href: "/products?q=marketing", label: "Marketing Materials" },
  { href: "/products", label: "View All Products" },
];

const serviceLinks = [
  { href: "/products?q=screen", label: "Screen Printing" },
  { href: "/products?q=dtf", label: "DTF Printing" },
  { href: "/products?q=embroidery", label: "Embroidery" },
  { href: "/products?q=uv", label: "UV Printing" },
  { href: "/products?q=offset", label: "Offset Printing" },
  { href: "/products?q=sublimation", label: "Sublimation" },
  { href: "/contact", label: "Bulk / B2B Orders" },
  { href: "/contact", label: "Sample Boxes" },
];

const policyLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/shipping", label: "Shipping Policy" },
  { href: "/refund", label: "Return & Refund" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/#faq", label: "Help & FAQ" },
  { href: "/contact", label: "File Specs" },
];

const trustItems = [
  "GST-ready invoices",
  "Proof before print",
  "Pan-India dispatch",
  "Dedicated B2B desk",
  "Sample before bulk",
  "Multi-technique floor",
];

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram", icon: "instagram" },
  { href: "https://x.com", label: "X", icon: "x" },
  { href: "https://facebook.com", label: "Facebook", icon: "facebook" },
  { href: "https://youtube.com", label: "YouTube", icon: "youtube" },
  { href: "https://linkedin.com", label: "LinkedIn", icon: "linkedin" },
] as const;

export function StoreFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-store-navy-deeper text-white">
      <p
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-8 translate-y-1/3 text-center text-[16vw] leading-none font-bold tracking-tight text-white/[0.035] select-none sm:text-[12vw]"
      >
        Anita
      </p>



      {/* Main columns */}
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-6 lg:gap-8 lg:py-14">
        <div className="md:col-span-2 lg:col-span-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image
              src="/logo.svg"
              alt="Anita Printers"
              width={44}
              height={44}
              className="h-10 w-10 object-contain"
              unoptimized
            />
            <span className="text-lg font-bold tracking-tight text-white">
              Anita Printers
            </span>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
            High-volume B2B printing & custom apparel — screen, DTF,
            embroidery, offset, and UV under one roof with GST-ready corporate
            billing.
          </p>

          <div className="mt-5 space-y-2 text-sm text-white/75">
            {siteContact.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="mt-5 space-y-1.5 text-sm">
            <a
              href={siteContact.phoneHref}
              className="block font-semibold text-white transition hover:text-store-accent"
            >
              {siteContact.phone}
            </a>
            <a
              href={`mailto:${siteContact.email}`}
              className="block text-white/80 transition hover:text-white"
            >
              {siteContact.email}
            </a>
            <p className="text-white/55">{siteContact.hours}</p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            {socialLinks.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-store-accent text-white transition hover:bg-white hover:text-store-accent"
              >
                <SocialIcon name={icon} />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Company" links={navLinks} />
        <FooterColumn title="Categories" links={categoryLinks} />
        <FooterColumn title="Services" links={serviceLinks} />
        <FooterColumn title="Policies" links={policyLinks} />
      </div>

      {/* Extra info row */}
 

      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-5 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/55">
              © {year} Anita Printers. All Rights Reserved.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/45">
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
              <Link href="/shipping" className="hover:text-white">
                Shipping
              </Link>
              <Link href="/refund" className="hover:text-white">
                Refunds
              </Link>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </div>
          </div>
          <p className="max-w-5xl text-[11px] leading-relaxed text-white/40 sm:text-xs">
            Disclaimer: Product colours, finishes, and lead times may vary
            slightly from on-screen previews depending on material, print
            technique, and artwork. Custom / personalised orders are produced
            only after proof approval and are non-returnable except for
            manufacturing defects. Prices, MOQs, and dispatch estimates shared
            online are indicative — final quotes are confirmed by our B2B desk.
            Anita Printers is not liable for delays caused by courier partners,
            incorrect artwork supplied by the client, or force majeure events.
            By placing an order you agree to our Terms, Privacy, Shipping, and
            Refund policies.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.16em] text-store-accent uppercase">
        {title}
      </p>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="text-sm text-white/70 transition hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
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
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186 31.247 31.247 0 000 12.017c0 1.992.184 3.937.502 5.832a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136c.318-1.895.502-3.84.502-5.832 0-1.992-.184-3.937-.502-5.831zM9.545 15.568V8.466l6.273 3.551-6.273 3.551z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
  }
}
