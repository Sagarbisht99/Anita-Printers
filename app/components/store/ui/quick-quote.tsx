"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { QuoteButton } from "@/app/components/store/ui/quote-popup";
import {
  getEnquiryCaptcha,
  submitEnquiry,
} from "@/app/actions/store/enquiries";
import { quoteItemOptions } from "@/app/lib/store/b2b-content";

export function QuickQuoteForm({ compact = false }: { compact?: boolean }) {
  const [item, setItem] = useState(quoteItemOptions[0] ?? "");
  const [qty, setQty] = useState("250");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [captcha, setCaptcha] = useState<{
    a: number;
    b: number;
    token: string;
  } | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    void refreshCaptcha();
  }, [refreshCaptcha]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (!captcha) {
      setError("Anti-spam check is loading. Please wait a moment.");
      void refreshCaptcha();
      return;
    }
    setSubmitting(true);
    try {
      const result = await submitEnquiry({
        name: name || "Website lead",
        phone,
        email: "",
        category: item,
        quantity: Number(qty) || undefined,
        notes: "Quick lead form",
        website,
        captchaToken: captcha.token,
        captchaAnswer,
      });
      if (result.error) {
        setError(result.error);
        void refreshCaptcha();
        return;
      }
      setSent(true);
    } catch {
      setError("Could not submit. Please try again.");
      void refreshCaptcha();
    } finally {
      setSubmitting(false);
    }
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
      className={`relative rounded-2xl border border-store-line bg-store-surface ${
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
            Select an item and quantity — we&apos;ll call back with a ballpark or
            sample plan the same business day.
          </p>
        </>
      ) : null}

      <div className={`grid gap-4 ${compact ? "" : "mt-6 sm:grid-cols-2"}`}>
        <label className="block text-sm">
          <span className="font-medium text-store-ink">Your name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
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
      </div>

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

      <label className="mt-4 block text-sm">
        <span className="font-medium text-store-ink">
          Anti-spam check
          {captcha ? ` — what is ${captcha.a} + ${captcha.b}?` : ""}
        </span>
        <div className="mt-1.5 flex gap-2">
          <input
            required
            inputMode="numeric"
            value={captchaAnswer}
            onChange={(e) => setCaptchaAnswer(e.target.value)}
            placeholder="Answer"
            disabled={!captcha}
            className="w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5 text-store-ink outline-none focus:border-store-navy/40 disabled:opacity-60"
          />
          <button
            type="button"
            onClick={() => void refreshCaptcha()}
            className="shrink-0 rounded-xl border border-store-line px-3 text-xs font-semibold text-store-muted transition hover:border-store-navy/40 hover:text-store-navy"
          >
            Refresh
          </button>
        </div>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-store-navy-dark disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Get a quick callback"}
      </button>
      {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
    </form>
  );
}
