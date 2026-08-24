"use client";

import Link from "next/link";
import { QuoteButton } from "@/app/components/storefront/quote-popup";

export function StorePageHero({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: Array<{ href: string; label: string; primary?: boolean }>;
}) {
  return (
    <div className="border-b border-store-line bg-[linear-gradient(180deg,#f7f8fa_0%,#eef2f6_100%)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs font-semibold tracking-[0.16em] text-store-muted uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-store-navy sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-store-muted">
          {description}
        </p>
        {actions?.length ? (
          <div className="mt-7 flex flex-wrap gap-3">
            {actions.map((action) => {
              const className = action.primary
                ? "rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-store-navy-dark"
                : "rounded-full border border-store-navy/25 bg-white px-5 py-2.5 text-sm font-semibold text-store-navy transition hover:bg-store-paper";
              const isQuotePopup =
                action.href === "/quote" ||
                action.href.startsWith("/quote?");

              if (isQuotePopup) {
                return (
                  <QuoteButton
                    key={action.href + action.label}
                    className={className}
                  >
                    {action.label}
                  </QuoteButton>
                );
              }

              return (
                <Link
                  key={action.href + action.label}
                  href={action.href}
                  className={className}
                >
                  {action.label}
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
