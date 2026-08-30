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
import { CheckCircle2, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchStoreCategories } from "@/app/actions/store/catalog";
import { submitEnquiry } from "@/app/actions/store/enquiries";
import { quoteItemOptions } from "@/app/lib/store/b2b-content";
import { storefrontKeys } from "@/app/lib/query/keys";

/** Shown when no product-specific image is passed into the popup. */
export const DEFAULT_QUOTE_IMAGE = "/pop-up-image.png";

export type QuotePopupPrefill = {
  category?: string;
  product?: string;
  intent?: string;
  imageUrl?: string;
};

type QuotePopupContextValue = {
  openQuotePopup: (prefill?: QuotePopupPrefill) => void;
  closeQuotePopup: () => void;
};

const QuotePopupContext = createContext<QuotePopupContextValue | null>(null);

/** 16px base font on phones keeps iOS Safari from zooming on focus. */
const fieldClass =
  "mt-1.5 w-full rounded-xl border border-store-line bg-white px-3 py-2.5 text-base text-store-ink outline-none transition focus:border-store-navy/40 focus:ring-2 focus:ring-store-navy/10 sm:text-sm";

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
      const imageUrl = trigger.getAttribute("data-quote-image") || undefined;

      openQuotePopup({ product, category, intent, imageUrl });
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
  imageUrl,
  type = "button",
  ...rest
}: {
  children?: ReactNode;
  className?: string;
  category?: string;
  product?: string;
  intent?: string;
  imageUrl?: string;
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
      onClick={() =>
        openQuotePopup({ category, product, intent, imageUrl })
      }
      {...rest}
    >
      {children}
    </button>
  );
}

function QuoteVisualPanel({
  imageUrl,
  product,
  category,
  compact = false,
}: {
  imageUrl: string;
  product?: string;
  category?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-store-navy-deeper ${
        compact ? "h-36 sm:h-44" : "min-h-[220px] md:min-h-0 md:flex-1"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-store-navy-deeper/95 via-store-navy/55 to-store-navy/20" />
      <div
        className={`relative flex h-full flex-col justify-end ${
          compact ? "p-4" : "p-6 md:p-8"
        }`}
      >
        <p className="text-[10px] font-semibold tracking-[0.2em] text-store-accent uppercase sm:text-[11px]">
          Get a quote
        </p>
        <p
          className={`mt-1 font-bold tracking-tight text-white ${
            compact ? "text-lg" : "text-xl sm:text-2xl"
          }`}
        >
          {product ?? "Tell us what you need"}
        </p>
        {category ? (
          <span className="mt-2 inline-flex w-fit rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur-sm">
            {category}
          </span>
        ) : null}
        {!compact ? (
          <p className="mt-4 hidden max-w-xs text-sm leading-relaxed text-white/75 md:block">
            Share quantity, sizes, and deadline — our B2B desk replies with
            offset, screen, or hybrid pricing.
          </p>
        ) : null}
      </div>
    </div>
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
  const heroImage = prefill.imageUrl?.trim() || DEFAULT_QUOTE_IMAGE;

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
        className="absolute inset-0 bg-store-navy/50 backdrop-blur-[3px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-store-line bg-white shadow-[0_28px_90px_-28px_rgba(8,31,54,0.55)] sm:max-h-[90dvh] sm:max-w-4xl sm:rounded-2xl lg:max-w-5xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-store-muted shadow-md transition hover:bg-white hover:text-store-ink md:top-4 md:right-4"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={2.25} aria-hidden />
        </button>

        {sent ? (
          <div className="flex min-h-0 flex-1 flex-col md:flex-row">
            <QuoteVisualPanel
              imageUrl={heroImage}
              product={prefill.product}
              category={category}
              compact
            />
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center md:px-10 md:py-12">
              <CheckCircle2
                className="h-14 w-14 text-store-accent"
                strokeWidth={1.75}
                aria-hidden
              />
              <h2 className="mt-4 text-xl font-bold text-store-navy">
                Request received
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-store-muted">
                Thanks{name ? `, ${name}` : ""}. We&apos;ll call back about{" "}
                <strong className="text-store-ink">
                  {quantity} × {category}
                </strong>
                {prefill.product ? ` (${prefill.product})` : ""}.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-8 rounded-full bg-store-navy px-8 py-3 text-sm font-semibold text-white transition hover:bg-store-navy-dark"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col md:flex-row">
            {/* Mobile: compact hero strip */}
            <div className="md:hidden">
              <QuoteVisualPanel
                imageUrl={heroImage}
                product={prefill.product}
                category={prefill.category ?? category}
                compact
              />
            </div>

            {/* Desktop: full left panel */}
            <div className="hidden w-[42%] shrink-0 md:flex md:flex-col">
              <QuoteVisualPanel
                imageUrl={heroImage}
                product={prefill.product}
                category={prefill.category ?? category}
              />
            </div>

            {/* Form */}
            <form
              onSubmit={onSubmit}
              className="flex min-h-0 min-w-0 flex-1 flex-col bg-store-paper/40"
            >
              <div className="shrink-0 border-b border-store-line bg-white px-5 py-4 sm:px-6 sm:py-5">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-store-muted uppercase">
                  Quote request
                </p>
                <h2
                  id={titleId}
                  className="mt-0.5 text-lg font-bold tracking-tight text-store-navy sm:text-xl"
                >
                  {prefill.product
                    ? `Order: ${prefill.product}`
                    : "Tell us what you need"}
                </h2>
              </div>

              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
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
                  <p className="rounded-xl bg-rose-50 px-3 py-2 text-center text-sm text-rose-600">
                    {submitError}
                  </p>
                ) : null}
              </div>

              <div className="shrink-0 border-t border-store-line bg-white px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-store-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-store-navy-dark disabled:opacity-60"
                >
                  {submitting ? "Submitting…" : "Submit quote request"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
