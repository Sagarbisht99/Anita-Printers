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
import {
  CheckCircle2,
  ChevronDown,
  Hash,
  Mail,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Tag,
  User,
  X,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchStoreCategories } from "@/app/actions/store/catalog";
import {
  getEnquiryCaptcha,
  submitEnquiry,
} from "@/app/actions/store/enquiries";
import { quoteItemOptions } from "@/app/lib/store/b2b-content";
import {
  digitsOnly,
  validateEnquiryForm,
  type EnquiryFieldErrors,
} from "@/app/lib/store/enquiry-validation";
import { storefrontKeys } from "@/app/lib/query/keys";
import { brandLogo } from "@/app/lib/seo/brand-icons";

const SUCCESS_AUTO_CLOSE_MS = 6000;

export type QuotePopupPrefill = {
  category?: string;
  product?: string;
  intent?: string;
  imageUrl?: string;
  quantity?: number;
  size?: string;
  color?: string;
  /** Called once after a successful enquiry submit. */
  onSuccess?: () => void;
};

function buildEnquiryNotes(prefill: QuotePopupPrefill): string {
  const lines: string[] = [];
  if (prefill.product) lines.push(`Product: ${prefill.product}`);
  if (prefill.quantity) lines.push(`Quantity: ${prefill.quantity}`);
  if (prefill.size) lines.push(`Size: ${prefill.size}`);
  if (prefill.color) lines.push(`Colour: ${prefill.color}`);
  if (prefill.intent === "sample") lines.push("Request: Sample");
  return lines.join("\n");
}

type QuotePopupContextValue = {
  openQuotePopup: (prefill?: QuotePopupPrefill) => void;
  closeQuotePopup: () => void;
};

const QuotePopupContext = createContext<QuotePopupContextValue | null>(null);

/** 16px base font on phones keeps iOS Safari from zooming on focus. */
const fieldClass =
  "w-full rounded-2xl border border-store-line bg-white py-3 pl-11 pr-4 text-base text-store-ink placeholder:text-store-muted outline-none transition focus:border-store-navy/40 focus:ring-2 focus:ring-store-navy/10 sm:text-sm";

const fieldIconClass =
  "pointer-events-none absolute left-3.5 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-store-muted";

const fieldErrorClass = "border-rose-400 focus:border-rose-500";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 px-1 text-xs text-rose-600" role="alert">
      {message}
    </p>
  );
}

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
  quantity,
  size,
  color,
  type = "button",
  ...rest
}: {
  children?: ReactNode;
  className?: string;
  category?: string;
  product?: string;
  intent?: string;
  imageUrl?: string;
  quantity?: number;
  size?: string;
  color?: string;
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
        openQuotePopup({
          category,
          product,
          intent,
          imageUrl,
          quantity,
          size,
          color,
        })
      }
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
  const [quantity, setQuantity] = useState(
    String(Math.max(1, prefill.quantity ?? 100)),
  );
  const [notes, setNotes] = useState(() => buildEnquiryNotes(prefill));
  const [website, setWebsite] = useState("");
  const [captcha, setCaptcha] = useState<{
    a: number;
    b: number;
    token: string;
  } | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<EnquiryFieldErrors>({});

  const refreshCaptcha = useCallback(async () => {
    try {
      const next = await getEnquiryCaptcha();
      setCaptcha(next);
      setCaptchaAnswer("");
    } catch {
      setCaptcha(null);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    setCategory(prefill.category || categoryOptions[0] || quoteItemOptions[0]);
    setName("");
    setPhone("");
    setEmail("");
    setNotes(buildEnquiryNotes(prefill));
    setQuantity(String(Math.max(1, prefill.quantity ?? 100)));
    setWebsite("");
    setCaptchaAnswer("");
    setSent(false);
    setSubmitError(null);
    setSubmitting(false);
    setFieldErrors({});
    void refreshCaptcha();
  }, [open, prefill, categoryOptions, refreshCaptcha]);

  useEffect(() => {
    if (!open || !sent) return;
    const timer = window.setTimeout(() => onClose(), SUCCESS_AUTO_CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [open, sent, onClose]);

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

    const errors = validateEnquiryForm({
      name,
      phone,
      email,
      quantity,
      captchaAnswer,
    });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (!captcha) {
      setSubmitError("Captcha is loading. Please wait a moment.");
      void refreshCaptcha();
      return;
    }
    setSubmitting(true);
    try {
      const result = await submitEnquiry({
        name,
        phone,
        email,
        category,
        quantity: Number(quantity) || undefined,
        notes,
        website,
        captchaToken: captcha.token,
        captchaAnswer,
      });
      if (result.error) {
        setSubmitError(result.error);
        void refreshCaptcha();
        return;
      }
      setSent(true);
      prefill.onSuccess?.();
      setWebsite("");
      setCaptchaAnswer("");
    } catch {
      setSubmitError("Could not submit enquiry. Please try again.");
      void refreshCaptcha();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4">
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
        className="relative z-10 flex max-h-[94dvh] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-store-line bg-gradient-to-b from-store-paper via-white to-white shadow-[0_28px_90px_-28px_rgba(8,31,54,0.55)]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-store-paper text-store-muted shadow-sm transition hover:bg-white hover:text-store-ink"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={2.25} aria-hidden />
        </button>

        {sent ? (
          <div className="flex flex-col items-center px-6 py-12 text-center sm:px-8">
            <CheckCircle2
              className="h-14 w-14 text-store-accent"
              strokeWidth={1.75}
              aria-hidden
            />
            <h2
              id={titleId}
              className="mt-4 text-xl font-bold tracking-tight text-store-navy sm:text-2xl"
            >
              Request received
            </h2>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-store-muted">
              Thanks{name ? `, ${name}` : ""}. We&apos;ll call back about{" "}
              <strong className="text-store-ink">
                {quantity} × {category}
              </strong>
              {prefill.product ? ` (${prefill.product})` : ""}.
            </p>
            <p className="mt-6 text-xs text-store-muted">
              Closing automatically…
            </p>
          </div>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col items-center px-5 pt-6 pb-1 text-center sm:px-7">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brandLogo.svg}
                alt="Anita Printers"
                className="h-9 w-auto"
              />
              <h2
                id={titleId}
                className="mt-2.5 text-xl font-bold tracking-tight text-store-navy sm:text-2xl"
              >
                Let&apos;s plan your order
              </h2>
              <p className="mt-1 text-xs text-store-muted sm:text-sm">
                Free quotation with Anita Printers
              </p>
              {prefill.product ? (
                <span className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-full bg-store-navy/10 px-3 py-1 text-xs font-semibold text-store-navy">
                  <span className="truncate">{prefill.product}</span>
                </span>
              ) : null}
            </div>

            {/* Form */}
            <form
              onSubmit={onSubmit}
              noValidate
              className="relative grid grid-cols-1 gap-2.5 px-5 pt-4 pb-5 sm:grid-cols-2 sm:px-7"
            >
              <div>
                <label className="sr-only" htmlFor="qp-name">
                  Your name
                </label>
                <div className="relative">
                  <User className={fieldIconClass} strokeWidth={2} aria-hidden />
                  <input
                    id="qp-name"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name *"
                    aria-invalid={Boolean(fieldErrors.name)}
                    className={`${fieldClass} ${fieldErrors.name ? fieldErrorClass : ""}`}
                  />
                </div>
                <FieldError message={fieldErrors.name} />
              </div>

              <div>
                <label className="sr-only" htmlFor="qp-email">
                  Email address
                </label>
                <div className="relative">
                  <Mail className={fieldIconClass} strokeWidth={2} aria-hidden />
                  <input
                    id="qp-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    aria-invalid={Boolean(fieldErrors.email)}
                    className={`${fieldClass} ${fieldErrors.email ? fieldErrorClass : ""}`}
                  />
                </div>
                <FieldError message={fieldErrors.email} />
              </div>

              <div>
                <label className="sr-only" htmlFor="qp-phone">
                  Mobile number
                </label>
                <div className="relative">
                  <Phone className={fieldIconClass} strokeWidth={2} aria-hidden />
                  <span className="pointer-events-none absolute left-9 top-1/2 -translate-y-1/2 text-sm font-semibold text-store-ink">
                    +91
                  </span>
                  <input
                    id="qp-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => setPhone(digitsOnly(e.target.value))}
                    placeholder="Mobile Number *"
                    aria-invalid={Boolean(fieldErrors.phone)}
                    className={`${fieldClass} pl-20 ${fieldErrors.phone ? fieldErrorClass : ""}`}
                  />
                </div>
                <FieldError message={fieldErrors.phone} />
              </div>

              <div>
                <label className="sr-only" htmlFor="qp-quantity">
                  Quantity
                </label>
                <div className="relative">
                  <Hash className={fieldIconClass} strokeWidth={2} aria-hidden />
                  <input
                    id="qp-quantity"
                    type="number"
                    min={1}
                    required
                    inputMode="numeric"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(digitsOnly(e.target.value, 8))
                    }
                    placeholder="Quantity *"
                    aria-invalid={Boolean(fieldErrors.quantity)}
                    className={`${fieldClass} [&::-webkit-inner-spin-button]:appearance-none ${fieldErrors.quantity ? fieldErrorClass : ""}`}
                  />
                </div>
                <FieldError message={fieldErrors.quantity} />
              </div>

              <div className="sm:col-span-2">
                <label className="sr-only" htmlFor="qp-category">
                  Category
                </label>
                <div className="relative">
                  <Tag className={fieldIconClass} strokeWidth={2} aria-hidden />
                  <select
                    id="qp-category"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`${fieldClass} appearance-none pr-11`}
                  >
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-store-muted"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="sr-only" htmlFor="qp-notes">
                  Notes / requirements
                </label>
                <div className="relative">
                  <MessageSquareText
                    className="pointer-events-none absolute left-3.5 top-3.5 h-[17px] w-[17px] text-store-muted"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <textarea
                    id="qp-notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Notes — sizes, colours, deadline…"
                    className={`${fieldClass} resize-none py-3`}
                  />
                </div>
              </div>

              {/* Honeypot — hidden from humans */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
              >
                <label>
                  Website
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </label>
              </div>

              <div className="sm:col-span-2">
                <label className="sr-only" htmlFor="qp-captcha">
                  Captcha answer
                </label>
                <div
                  className={`relative flex items-center gap-2 rounded-2xl border bg-white py-2.5 pr-2 pl-11 transition focus-within:ring-2 focus-within:ring-store-navy/10 ${
                    fieldErrors.captchaAnswer
                      ? "border-rose-400 focus-within:border-rose-500"
                      : "border-store-line focus-within:border-store-navy/40"
                  }`}
                >
                  <ShieldCheck
                    className={fieldIconClass}
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span className="shrink-0 text-sm font-semibold tabular-nums text-store-ink">
                    {captcha ? `${captcha.a} + ${captcha.b}` : "…"}
                  </span>
                  <span className="shrink-0 text-store-muted" aria-hidden>
                    =
                  </span>
                  <input
                    id="qp-captcha"
                    required
                    inputMode="numeric"
                    value={captchaAnswer}
                    onChange={(e) =>
                      setCaptchaAnswer(digitsOnly(e.target.value, 6))
                    }
                    aria-label="Captcha answer"
                    aria-invalid={Boolean(fieldErrors.captchaAnswer)}
                    placeholder="?"
                    className="w-full min-w-0 rounded-xl border border-store-line bg-store-paper px-2 py-2 text-center text-sm font-semibold text-store-ink outline-none transition focus:border-store-navy/40 disabled:opacity-60"
                    disabled={!captcha}
                  />
                  <button
                    type="button"
                    aria-label="Refresh captcha"
                    onClick={() => void refreshCaptcha()}
                    className="shrink-0 rounded-xl border border-store-line px-3 py-2 text-xs font-semibold text-store-muted transition hover:border-store-navy/40 hover:text-store-navy"
                  >
                    ↻
                  </button>
                </div>
                <FieldError message={fieldErrors.captchaAnswer} />
              </div>

              {submitError ? (
                <p className="rounded-xl bg-rose-50 px-3 py-2 text-center text-sm text-rose-600 sm:col-span-2">
                  {submitError}
                </p>
              ) : null}

              <p className="pt-0.5 text-center text-xs leading-relaxed text-store-muted sm:col-span-2">
                By submitting, you agree to our{" "}
                <a
                  href="/terms"
                  className="font-semibold text-store-navy underline underline-offset-2 hover:text-store-navy-dark"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="font-semibold text-store-navy underline underline-offset-2 hover:text-store-navy-dark"
                >
                  Privacy Policy
                </a>
                .
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-store-navy px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-store-navy/25 transition hover:bg-store-navy-dark disabled:opacity-60 sm:col-span-2"
              >
                {submitting ? "Submitting…" : "Submit quote request"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
