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
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchStoreCategories } from "@/app/actions/store/catalog";
import { submitEnquiry } from "@/app/actions/store/enquiries";
import { quoteItemOptions } from "@/app/lib/store/b2b-content";
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

/** 16px base font on phones keeps iOS Safari from zooming on focus. */
const fieldClass =
  "mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5 text-base text-store-ink outline-none focus:border-store-navy/40 sm:text-sm";

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

  // Any /quote link or [data-open-quote] click opens the popup site-wide
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest(
        'a[href="/quote"], a[href^="/quote?"], [data-open-quote]',
      );
      if (!trigger) return;

      event.preventDefault();

      const product = trigger.getAttribute("data-quote-product") || undefined;
      const category = trigger.getAttribute("data-quote-category") || undefined;
      const intent = trigger.getAttribute("data-quote-intent") || undefined;

      openQuotePopup({ product, category, intent });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [openQuotePopup]);

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
  ...rest
}: {
  children?: ReactNode;
  className?: string;
  category?: string;
  product?: string;
  intent?: string;
  type?: "button" | "submit";
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "onClick" | "className" | "children"
>) {
  const { openQuotePopup } = useQuotePopup();

  return (
    <button
      type={type}
      className={className}
      onClick={() => openQuotePopup({ category, product, intent })}
      {...rest}
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
  const [notes, setNotes] = useState(
    prefill.product ? `Product: ${prefill.product}` : "",
  );
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setCategory(prefill.category || categoryOptions[0] || quoteItemOptions[0]);
    setNotes(prefill.product ? `Product: ${prefill.product}` : "");
    setSent(false);
    setSubmitError(null);
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

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
      const result = await submitEnquiry({
        name,
        phone,
        email,
        category,
        quantity: Number(quantity) || undefined,
        notes,
      });
      if (result.error) {
        setSubmitError(result.error);
        return;
      }
      setSent(true);
    } catch {
      setSubmitError("Could not submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4">
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
        className="relative z-10 flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-store-line bg-white shadow-[0_24px_80px_-24px_rgba(29,111,184,0.55)] sm:max-h-[90dvh] sm:max-w-lg sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-store-line px-4 py-3.5 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-store-muted uppercase">
              Get a quote
            </p>
            <h2
              id={titleId}
              className="mt-0.5 text-lg font-bold tracking-tight text-store-navy sm:text-xl"
            >
              Tell us what you need
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-store-muted transition hover:bg-store-paper hover:text-store-ink"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={2.25} aria-hidden />
          </button>
        </div>

        {sent ? (
          <div className="overflow-y-auto px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6">
            <p className="text-lg font-semibold text-store-navy">
              Request received
            </p>
            <p className="mt-2 text-sm leading-relaxed text-store-muted">
              Thanks{name ? `, ${name}` : ""}. We&apos;ll call back about{" "}
              <strong className="text-store-ink">
                {quantity} × {category}
              </strong>
              {prefill.product ? ` (${prefill.product})` : ""}.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-store-navy px-5 py-3 text-sm font-semibold text-white sm:w-auto sm:py-2.5"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="font-medium text-store-ink">Your name</span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={fieldClass}
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-medium text-store-ink">
                    Phone / WhatsApp
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 ..."
                    className={fieldClass}
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
                    className={fieldClass}
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
                    className={fieldClass}
                  />
                </label>
              </div>

              <label className="block text-sm">
                <span className="font-medium text-store-ink">Category</span>
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={fieldClass}
                >
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm">
                <span className="font-medium text-store-ink">
                  Notes / product
                </span>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Sizes, colours, deadline, print method…"
                  className={`${fieldClass} resize-none`}
                />
              </label>

              {submitError ? (
                <p className="text-center text-sm text-rose-600">
                  {submitError}
                </p>
              ) : null}
            </div>

            <div className="shrink-0 border-t border-store-line px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-store-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-store-navy-dark disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit quote request"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
