"use client";

import { useState } from "react";
import Link from "next/link";
import { quoteItemOptions } from "@/app/lib/store/b2b-content";

const steps = ["Specs", "Artwork", "Delivery", "Review"] as const;

export function RfqForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    itemType: quoteItemOptions[0],
    units: "500",
    deadline: "",
    pincode: "",
    budget: "",
    company: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
    fileName: "",
  });

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function next() {
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-store-line bg-store-surface p-8">
        <h2 className="text-2xl font-bold text-store-navy">RFQ submitted</h2>
        <p className="mt-3 text-sm leading-relaxed text-store-muted">
          We’ve logged your request for {form.units} × {form.itemType}. A
          specialist will reply with pricing, proof timeline, and sample options
          within one business day.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/#faq"
            className="rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white"
          >
            View FAQs
          </Link>
          <Link
            href="/products"
            className="rounded-full border border-store-line px-5 py-2.5 text-sm font-semibold text-store-navy"
          >
            Back to catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-store-line bg-store-surface p-6 sm:p-8"
    >
      <div className="flex flex-wrap gap-2">
        {steps.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(index)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              index === step
                ? "bg-store-navy text-white"
                : "bg-store-paper text-store-muted"
            }`}
          >
            {index + 1}. {label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {step === 0 ? (
          <>
            <label className="block text-sm sm:col-span-2">
              <span className="font-medium text-store-ink">Item type</span>
              <select
                value={form.itemType}
                onChange={(e) => update("itemType", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5"
              >
                {quoteItemOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="font-medium text-store-ink">Units</span>
              <input
                value={form.units}
                onChange={(e) => update("units", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-store-ink">Budget band (₹)</span>
              <input
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
                placeholder="e.g. 1.5L – 2L"
                className="mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5"
              />
            </label>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <label className="block text-sm sm:col-span-2">
              <span className="font-medium text-store-ink">
                Artwork file (.AI, .PDF, .PNG)
              </span>
              <input
                type="file"
                accept=".ai,.pdf,.png,.jpg,.jpeg,.eps"
                onChange={(e) =>
                  update("fileName", e.target.files?.[0]?.name ?? "")
                }
                className="mt-1.5 block w-full text-sm text-store-muted file:mr-3 file:rounded-full file:border-0 file:bg-store-navy file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
              />
              {form.fileName ? (
                <span className="mt-2 block text-xs text-store-navy">
                  Selected: {form.fileName}
                </span>
              ) : null}
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="font-medium text-store-ink">Notes for designer</span>
              <textarea
                rows={4}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Print locations, Pantone refs, size mix…"
                className="mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5"
              />
            </label>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <label className="block text-sm">
              <span className="font-medium text-store-ink">Deadline</span>
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => update("deadline", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-store-ink">Delivery pincode</span>
              <input
                value={form.pincode}
                onChange={(e) => update("pincode", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-store-ink">Company</span>
              <input
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-store-ink">Contact name</span>
              <input
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-store-ink">Phone</span>
              <input
                required
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-store-ink">Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-store-line bg-store-paper px-3 py-2.5"
              />
            </label>
          </>
        ) : null}

        {step === 3 ? (
          <div className="sm:col-span-2 space-y-3 rounded-xl bg-store-paper p-5 text-sm text-store-ink">
            <p>
              <strong>Item:</strong> {form.itemType}
            </p>
            <p>
              <strong>Units:</strong> {form.units}
            </p>
            <p>
              <strong>Budget:</strong> {form.budget || "To be advised"}
            </p>
            <p>
              <strong>File:</strong> {form.fileName || "Will share later"}
            </p>
            <p>
              <strong>Deadline / pin:</strong> {form.deadline || "Flexible"} /{" "}
              {form.pincode || "—"}
            </p>
            <p>
              <strong>Contact:</strong> {form.name} · {form.phone} · {form.email}
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="rounded-full border border-store-line px-5 py-2.5 text-sm font-semibold text-store-navy"
          >
            Back
          </button>
        ) : null}
        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            className="rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white"
          >
            Submit RFQ
          </button>
        )}
      </div>
    </form>
  );
}
