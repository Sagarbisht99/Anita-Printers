"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStoreCategories } from "@/app/actions/storefront";
import { quoteItemOptions } from "@/app/lib/storefront/b2b-content";
import { storefrontKeys } from "@/app/lib/query/keys";

export type QuotePopupPrefill = {
  category?: string;
  product?: string;
  intent?: string;
};

type QuotePopupContextValue = {
  openQuotePopup: (prefill?: QuotePopupPrefill) => void;
  closeQuotePopup: () => void;
};

const QuotePopupContext = createContext<QuotePopupContextValue | null>(null);

export function useQuotePopup() {
  const ctx = useContext(QuotePopupContext);
  if (!ctx) {
    throw new Error("useQuotePopup must be used within QuotePopupProvider");
  }
  return ctx;
}

export function QuotePopupProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<QuotePopupPrefill>({});

  const openQuotePopup = useCallback((next?: QuotePopupPrefill) => {
    setPrefill(next ?? {});
    setOpen(true);
  }, []);

  const closeQuotePopup = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({ openQuotePopup, closeQuotePopup }),
    [openQuotePopup, closeQuotePopup],
  );

  return (
    <QuotePopupContext.Provider value={value}>
      {children}
      <QuotePopupModal
        open={open}
        prefill={prefill}
        onClose={closeQuotePopup}
      />
    </QuotePopupContext.Provider>
  );
}

export function QuoteButton({
  children = "Get a Quote",
  className = "",
  category,
  product,
  intent,
  type = "button",
}: {
  children?: ReactNode;
  className?: string;
  category?: string;
  product?: string;
  intent?: string;
  type?: "button" | "submit";
}) {
  const { openQuotePopup } = useQuotePopup();

  return (
    <button
      type={type}
      className={className}
      onClick={() => openQuotePopup({ category, product, intent })}
    >
      {children}
    </button>
  );
}

function QuotePopupModal({
  open,
  prefill,
  onClose,
}: {
  open: boolean;
  prefill: QuotePopupPrefill;
  onClose: () => void;
}) {
  const titleId = useId();
  const categoriesQuery = useQuery({
    queryKey: storefrontKeys.categories.lists(),
    queryFn: fetchStoreCategories,
    enabled: open,
  });

  const categoryOptions = useMemo(() => {
    const fromDb = (categoriesQuery.data ?? []).map((c) => c.name);
    const merged = [...fromDb, ...quoteItemOptions];
    return Array.from(new Set(merged));
  }, [categoriesQuery.data]);

  const defaultCategory =
    prefill.category ||
    categoryOptions[0] ||
    quoteItemOptions[0] ||
    "Custom / Other";

  const [category, setCategory] = useState(defaultCategory);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState("100");
  const [notes, setNotes] = useState(prefill.product ? `Product: ${prefill.product}` : "");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;
    setCategory(prefill.category || categoryOptions[0] || quoteItemOptions[0]);
    setNotes(prefill.product ? `Product: ${prefill.product}` : "");
    setSent(false);
  }, [open, prefill.category, prefill.product, categoryOptions]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close quote popup"
        className="absolute inset-0 bg-store-navy/45 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-store-line bg-white shadow-[0_24px_80px_-24px_rgba(11,31,74,0.55)] sm:max-w-lg sm:rounded-3xl"
      >
        <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-store-line bg-white px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-store-muted uppercase">
              Get a quote
            </p>
            <h2
              id={titleId}
              className="mt-1 text-xl font-bold tracking-tight text-store-navy"
            >
              Tell us what you need
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3 py-1 text-lg text-store-muted hover:bg-store-paper hover:text-store-ink"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {sent ? (
          <div className="px-5 py-8 sm:px-6">
            <p className="text-lg font-semibold text-store-navy">
              Request received
            </p>
            <p className="mt-2 text-sm leading-relaxed text-store-muted">
              Thanks{name ? `, ${name}` : ""}. We’ll call back about{" "}
              <strong className="text-store-ink">
                {quantity} × {category}
              </strong>
              {prefill.product ? ` (${prefill.product})` : ""}.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 px-5 py-5 sm:px-6 sm:py-6">
            <label className="block text-sm">
              <span className="font-medium text-store-ink">Category</span>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5 text-store-ink outline-none focus:border-store-navy/40"
              >
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="font-medium text-store-ink">Your name</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5 outline-none focus:border-store-navy/40"
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
                  className="mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5 outline-none focus:border-store-navy/40"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="font-medium text-store-ink">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5 outline-none focus:border-store-navy/40"
                />
              </label>
              <label className="block text-sm">
                <span className="font-medium text-store-ink">Quantity</span>
                <input
                  type="number"
                  min={1}
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5 outline-none focus:border-store-navy/40"
                />
              </label>
            </div>

            <label className="block text-sm">
              <span className="font-medium text-store-ink">Notes / product</span>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Sizes, colours, deadline, print method…"
                className="mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5 outline-none focus:border-store-navy/40"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-store-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#071536]"
            >
              Submit quote request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
