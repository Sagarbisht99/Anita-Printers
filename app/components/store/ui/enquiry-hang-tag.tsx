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

/** Hanging plaque CTA — opens quote popup (Anita accent + silver chain). */
export function EnquiryHangTag() {
  return (
    <div className="enquiry-hang pointer-events-none fixed top-[4.25rem] right-1.5 z-[72] flex scale-90 flex-col items-center sm:top-[5.25rem] sm:right-4 sm:scale-100 md:right-6">
      {/* Silver chain — shorter on mobile */}
      <div aria-hidden className="flex flex-col items-center">
        <span className="h-1.5 w-1.5 rounded-full bg-linear-to-b from-[#eef1f5] to-[#8a93a0] shadow-sm ring-1 ring-black/15 sm:h-2 sm:w-2" />
        <span className="h-2 w-px bg-linear-to-b from-[#c5ccd6] to-[#7e8794] sm:h-2.5" />
        <span className="hidden h-2.5 w-2.5 rounded-full bg-linear-to-b from-[#f4f6f8] to-[#7a8492] shadow-sm ring-1 ring-black/20 sm:block" />
        <span className="hidden h-3 w-px bg-linear-to-b from-[#c5ccd6] to-[#7e8794] sm:block" />
        <span className="h-1.5 w-1.5 rounded-full bg-linear-to-b from-[#eef1f5] to-[#8a93a0] shadow-sm ring-1 ring-black/15 sm:h-2 sm:w-2" />
        <span className="h-2 w-px bg-linear-to-b from-[#c5ccd6] to-transparent sm:h-2.5" />
      </div>

      <QuoteButton
        intent="hang-enquiry"
        aria-label="Enquiry now — open quote form"
        className="enquiry-hang-tag pointer-events-auto relative mt-0.5 rounded-md border border-[#081f36]/30 bg-[linear-gradient(165deg,#e86b82_0%,#c43b58_42%,#9e2f45_100%)] px-3 py-2.5 text-center shadow-[0_12px_28px_-10px_rgba(196,59,88,0.7),inset_0_1px_0_rgba(255,255,255,0.35)] transition active:translate-y-0.5 sm:px-5 sm:py-3.5"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[3px] rounded-[3px] border border-[#081f36]/25"
        />

        <CornerRivet className="top-1.5 left-1.5 h-2 w-2 sm:top-2 sm:left-2 sm:h-2.5 sm:w-2.5" />
        <CornerRivet className="top-1.5 right-1.5 h-2 w-2 sm:top-2 sm:right-2 sm:h-2.5 sm:w-2.5" />
        <CornerRivet className="bottom-1.5 left-1.5 h-2 w-2 sm:bottom-2 sm:left-2 sm:h-2.5 sm:w-2.5" />
        <CornerRivet className="right-1.5 bottom-1.5 h-2 w-2 sm:right-2 sm:bottom-2 sm:h-2.5 sm:w-2.5" />

        <span className="relative block text-[10px] leading-[1.15] font-extrabold tracking-[0.14em] text-white uppercase sm:text-xs sm:tracking-[0.16em]">
          Enquiry
          <br />
          Now
        </span>
      </QuoteButton>
    </div>
  );
}
