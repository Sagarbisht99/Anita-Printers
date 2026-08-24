"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { QuoteButton } from "@/app/components/storefront/quote-popup";
import { quoteItemOptions } from "@/app/lib/storefront/b2b-content";

export function QuickQuoteForm({ compact = false }: { compact?: boolean }) {
  const [item, setItem] = useState(quoteItemOptions[0] ?? "");
  const [qty, setQty] = useState("250");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-store-line bg-store-surface p-6 sm:p-8">
        <p className="text-lg font-semibold text-store-navy">Request received</p>
        <p className="mt-2 text-sm leading-relaxed text-store-muted">
          Thanks — our B2B desk will call you back with a quick estimate for{" "}
          {qty} × {item}.
        </p>
        <QuoteButton className="mt-5 inline-flex rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white">
          Open quote popup
        </QuoteButton>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`rounded-2xl border border-store-line bg-store-surface ${
        compact ? "p-5" : "p-6 sm:p-8"
      }`}
    >
      {!compact ? (
        <>
          <p className="text-xs font-semibold tracking-[0.16em] text-store-muted uppercase">
            Quick lead
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-store-navy">
            Interactive quote calculator
          </h2>
          <p className="mt-2 text-sm text-store-muted">
            Select an item and quantity — we’ll call back with a ballpark or
            sample plan the same business day.
          </p>
        </>
      ) : null}

      <div className={`grid gap-4 ${compact ? "" : "mt-6 sm:grid-cols-3"}`}>
        <label className="block text-sm">
          <span className="font-medium text-store-ink">Item</span>
          <select
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5 text-store-ink outline-none focus:border-store-navy/40"
          >
            {quoteItemOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-store-ink">Quantity</span>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5 text-store-ink outline-none focus:border-store-navy/40"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-store-ink">Phone / WhatsApp</span>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 ..."
            className="mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5 text-store-ink outline-none focus:border-store-navy/40"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-5 rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-store-navy-dark"
      >
        Get a quick callback
      </button>
    </form>
  );
}

// Keep ReactNode import used for consistency if needed later
export type { ReactNode };
