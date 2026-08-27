"use client";

import Link from "next/link";
import { HeaderSearch } from "@/app/components/store/ui/header-search";
import { QuoteButton } from "@/app/components/store/ui/quote-popup";
import { siteContact } from "@/app/lib/store/b2b-content";

const navLinks = [
  { href: "/products", label: "Catalog" },
  { href: "/services", label: "Services" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

export function StoreHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-store-line bg-store-surface">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 sm:gap-3"
          aria-label="Anita Printers home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt=""
            width={44}
            height={44}
            className="h-9 w-9 object-contain sm:h-10 sm:w-10"
          />
          <span className="hidden text-base font-bold tracking-tight text-store-navy min-[400px]:inline sm:text-lg">
            Anita Printers
          </span>
        </Link>

        <HeaderSearch className="mx-2 mr-4 hidden min-w-0 flex-1 max-w-xl md:block lg:mr-6" />

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-store-navy transition-all duration-300 hover:bg-store-navy hover:text-white"
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

          <QuoteButton
            intent="header"
            className="rounded-full bg-store-navy px-3 py-2 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-store-accent sm:px-4 sm:text-sm"
          >
            Get in touch
          </QuoteButton>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto border-t border-store-line px-4 py-2 lg:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-store-navy transition-colors hover:bg-store-navy hover:text-white"
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
