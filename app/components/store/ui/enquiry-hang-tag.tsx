"use client";

import { QuoteButton } from "@/app/components/store/ui/quote-popup";

function CornerRivet({ className }: { className: string }) {
  return (
    <span aria-hidden className={`absolute ${className}`}>
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-[#081f36]/55" />
      <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-[#081f36]/55" />
    </span>
  );
}

/** Hanging plaque CTA — desktop only; opens quote popup. */
export function EnquiryHangTag() {
  return (
    <div className="enquiry-hang pointer-events-none fixed top-[4.75rem] right-4 z-[72] hidden flex-col items-center lg:flex xl:right-6">
      {/* Silver chain */}
      <div aria-hidden className="flex flex-col items-center">
        <span className="h-2 w-2 rounded-full bg-linear-to-b from-[#eef1f5] to-[#8a93a0] shadow-sm ring-1 ring-black/15" />
        <span className="h-2.5 w-px bg-linear-to-b from-[#c5ccd6] to-[#7e8794]" />
        <span className="h-2.5 w-2.5 rounded-full bg-linear-to-b from-[#f4f6f8] to-[#7a8492] shadow-sm ring-1 ring-black/20" />
        <span className="h-3 w-px bg-linear-to-b from-[#c5ccd6] to-[#7e8794]" />
        <span className="h-2 w-2 rounded-full bg-linear-to-b from-[#eef1f5] to-[#8a93a0] shadow-sm ring-1 ring-black/15" />
        <span className="h-2.5 w-px bg-linear-to-b from-[#c5ccd6] to-transparent" />
      </div>

      <QuoteButton
        intent="hang-enquiry"
        aria-label="Enquiry now — open quote form"
        className="enquiry-hang-tag pointer-events-auto relative mt-0.5 rounded-md border border-[#081f36]/30 bg-[linear-gradient(165deg,#e86b82_0%,#c43b58_42%,#9e2f45_100%)] px-5 py-3.5 text-center shadow-[0_12px_28px_-10px_rgba(196,59,88,0.7),inset_0_1px_0_rgba(255,255,255,0.35)] transition active:translate-y-0.5"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[3px] rounded-[3px] border border-[#081f36]/25"
        />

        <CornerRivet className="top-2 left-2 h-2.5 w-2.5" />
        <CornerRivet className="top-2 right-2 h-2.5 w-2.5" />
        <CornerRivet className="bottom-2 left-2 h-2.5 w-2.5" />
        <CornerRivet className="right-2 bottom-2 h-2.5 w-2.5" />

        <span className="relative block text-xs leading-[1.15] font-extrabold tracking-[0.16em] text-white uppercase">
          Enquiry
          <br />
          Now
        </span>
      </QuoteButton>
    </div>
  );
}
