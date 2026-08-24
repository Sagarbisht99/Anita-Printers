"use client";

import Link from "next/link";
import Image from "next/image";
import { QuoteButton } from "@/app/components/storefront/quote-popup";
import { siteContact } from "@/app/lib/storefront/b2b-content";

const companyLinks = [
  { href: "/about", label: "About us" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/enterprise", label: "Enterprise" },
  { href: "/products", label: "Catalog" },
];

const supportLinks = [
  { href: "/#faq", label: "FAQ" },
  { href: "/artwork-guidelines", label: "Artwork guidelines" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/shipping", label: "Shipping Policy" },
  { href: "/refund", label: "Refund & Cancellation" },
];

export function StoreFooter() {
  return (
    <footer className="border-t border-store-line bg-store-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/logo.png"
            alt="Anita Printers"
            width={160}
            height={50}
            className="h-11 w-auto object-contain"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-store-muted">
            High-volume B2B printing & custom apparel — screen, DTF,
            embroidery, offset, and UV with GST-ready corporate billing.
          </p>
          <p className="mt-4 text-sm font-semibold text-store-navy">
            <a href={siteContact.phoneHref}>{siteContact.phone}</a>
          </p>
          <p className="mt-1 text-sm text-store-muted">{siteContact.email}</p>
          <QuoteButton className="mt-4 text-sm font-semibold text-store-navy hover:underline">
            Request a quote
          </QuoteButton>
        </div>

        <FooterColumn title="Company" links={companyLinks} />
        <FooterColumn title="Support" links={supportLinks} />
        <FooterColumn title="Policies" links={legalLinks} />
      </div>

      <div className="border-t border-store-line">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-store-muted sm:px-6">
          © {new Date().getFullYear()} Anita Printers. All rights reserved.
        </p>
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
      <p className="text-xs font-semibold tracking-[0.14em] text-store-navy uppercase">
        {title}
      </p>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-store-ink transition hover:text-store-navy"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
