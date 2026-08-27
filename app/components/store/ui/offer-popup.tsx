"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuotePopup } from "@/app/components/store/ui/quote-popup";

const DELAY_MS = 7500;

export function OfferPopup({
  enabled,
  imageUrl,
}: {
  enabled: boolean;
  imageUrl: string | null;
}) {
  const [open, setOpen] = useState(false);
  const { openQuotePopup } = useQuotePopup();

  useEffect(() => {
    if (!enabled || !imageUrl) return;

    const timer = window.setTimeout(() => setOpen(true), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [enabled, imageUrl]);

  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function dismiss() {
    setOpen(false);
  }

  if (!enabled || !imageUrl || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Special offer"
    >
      <button
        type="button"
        className="absolute inset-0 bg-store-navy-deeper/65 backdrop-blur-[2px]"
        aria-label="Close offer"
        onClick={dismiss}
      />

      <div className="relative z-10 max-h-[min(85vh,720px)] w-full max-w-[min(92vw,420px)] overflow-y-auto animate-[store-fade-up_0.45s_ease-out]">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-2 right-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-store-navy shadow-lg transition hover:bg-store-paper sm:-top-3 sm:-right-3 sm:h-10 sm:w-10"
        >
          <X className="h-5 w-5" strokeWidth={2.5} aria-hidden />
        </button>

        <button
          type="button"
          onClick={() => {
            dismiss();
            openQuotePopup({
              intent: "offer-popup",
            });
          }}
          className="block w-full overflow-hidden rounded-xl bg-white text-left shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] ring-1 ring-black/10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Special offer — tap to request a quote"
            width={840}
            height={1180}
            className="h-auto w-full object-contain"
          />
        </button>
      </div>
    </div>
  );
}
