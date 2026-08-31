"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { HeaderSearch } from "@/app/components/store/ui/header-search";
import { QuoteButton } from "@/app/components/store/ui/quote-popup";
import { MobileNav } from "@/app/components/store/layout/mobile-nav";
import { storeNavLinks } from "@/app/lib/store/navigation";
import { siteContact } from "@/app/lib/store/b2b-content";
import { brandLogo } from "@/app/lib/seo/brand-icons";

export function StoreHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-store-line bg-store-surface">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 sm:gap-3"
          aria-label="Anita Printers home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brandLogo.svg}
            alt="Anita Printers"
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
          {storeNavLinks.map((link) => (
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
            className="hidden flex-col leading-tight lg:flex"
          >
            <span className="text-[11px] text-store-muted">Need Help?</span>
            <span className="text-sm font-semibold text-store-navy">
              {siteContact.phone}
            </span>
          </a>

          <QuoteButton
            intent="header"
            className="hidden rounded-full bg-store-navy px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-store-accent lg:inline-flex"
          >
            Get in touch
          </QuoteButton>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="store-mobile-nav"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-store-line text-store-navy transition hover:border-store-navy hover:bg-store-navy hover:text-white lg:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={2.25} aria-hidden />
          </button>
        </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
