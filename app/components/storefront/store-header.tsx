"use client";

import Link from "next/link";
import Image from "next/image";
import { HeaderSearch } from "@/app/components/storefront/header-search";
import { QuoteButton } from "@/app/components/storefront/quote-popup";
import { siteContact } from "@/app/lib/storefront/b2b-content";

const navLinks = [
  { href: "/products", label: "Catalog" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/enterprise", label: "Enterprise" },
  { href: "/about", label: "About" },
];

export function StoreHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-store-line bg-store-surface">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <Link href="/" className="shrink-0" aria-label="Anita Printers home">
          <Image
            src="/logo.png"
            alt="Anita Printers"
            width={180}
            height={56}
            className="h-9 w-auto object-contain sm:h-11"
            priority
          />
        </Link>

        <HeaderSearch className="mx-2 mr-4 hidden min-w-0 flex-1 max-w-xl md:block lg:mr-6" />

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-store-navy transition hover:bg-store-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4 lg:ml-3">
          <a
            href={siteContact.phoneHref}
            className="hidden flex-col leading-tight sm:flex"
          >
            <span className="text-[11px] text-store-muted">Need Help?</span>
            <span className="text-sm font-semibold text-store-navy">
              {siteContact.phone}
            </span>
          </a>

          <QuoteButton className="rounded-full bg-store-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#071536]">
            Request Quote
          </QuoteButton>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto border-t border-store-line px-4 py-2 lg:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-store-navy hover:bg-store-paper"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="border-t border-store-line px-4 py-2 md:hidden">
        <HeaderSearch inputClassName="py-2 pl-9" />
      </div>
    </header>
  );
}
