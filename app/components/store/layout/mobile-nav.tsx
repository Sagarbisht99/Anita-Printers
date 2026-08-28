"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Mail, Phone, X } from "lucide-react";
import { HeaderSearch } from "@/app/components/store/ui/header-search";
import { useQuotePopup } from "@/app/components/store/ui/quote-popup";
import { storeNavLinks } from "@/app/lib/store/navigation";
import { siteContact } from "@/app/lib/store/b2b-content";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  const { openQuotePopup } = useQuotePopup();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[100] lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`absolute inset-0 bg-store-navy/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        id="store-mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`absolute top-0 right-0 flex h-full w-[min(100%,18.5rem)] flex-col bg-store-surface shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-store-line px-4 py-4">
          <span className="text-sm font-bold tracking-tight text-store-navy">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-store-navy transition hover:bg-store-navy hover:text-white"
          >
            <X className="h-5 w-5" strokeWidth={2.25} aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <HeaderSearch
            className="mb-5"
            inputClassName="py-2.5 pl-9"
            onNavigate={onClose}
          />

          <nav className="flex flex-col gap-1">
            {storeNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="rounded-xl px-3 py-3 text-base font-semibold text-store-navy transition hover:bg-store-navy hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 space-y-3 border-t border-store-line pt-5">
            <a
              href={siteContact.phoneHref}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-store-navy transition hover:bg-store-paper"
            >
              <Phone className="h-4 w-4 shrink-0 text-store-accent" aria-hidden />
              <span>
                <span className="block text-[11px] text-store-muted">
                  Call us
                </span>
                {siteContact.phone}
              </span>
            </a>
            <a
              href={`mailto:${siteContact.email}`}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-store-navy transition hover:bg-store-paper"
            >
              <Mail className="h-4 w-4 shrink-0 text-store-accent" aria-hidden />
              <span className="truncate">{siteContact.email}</span>
            </a>
          </div>
        </div>

        <div className="border-t border-store-line p-4">
          <button
            type="button"
            onClick={() => {
              onClose();
              openQuotePopup({ intent: "mobile-nav" });
            }}
            className="w-full rounded-full bg-store-navy px-4 py-3 text-sm font-semibold text-white transition hover:bg-store-accent"
          >
            Get in touch
          </button>
        </div>
      </aside>
    </div>
  );
}
