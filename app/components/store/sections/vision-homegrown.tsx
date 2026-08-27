"use client";

import { useEffect, useRef, useState } from "react";
import { siteContact } from "@/app/lib/store/b2b-content";

const highlights = [
  "Offset for bulk stationery & packaging",
  "Screen for apparel, bags & specialty",
  "Corporate · retail · events · schools",
  "Proof-first, pan-India bulk dispatch",
];

const stats = [
  { value: 2500, suffix: "+", label: "Happy Clients" },
  { value: 1800, suffix: "+", label: "Google Reviews" },
  { value: 12, suffix: " Lakh +", label: "Products Delivered" },
  { value: 4500, suffix: "+", label: "5 - Star Ratings" },
] as const;

export function VisionHomegrown() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [counts, setCounts] = useState(() => stats.map(() => 0));

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const duration = 1400;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(stats.map((stat) => Math.round(stat.value * eased)));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started]);

  return (
    <section className="border-b border-store-line bg-store-surface">
      <div className="mx-auto max-w-6xl space-y-4 px-4 py-10 sm:px-6 sm:py-14">
        {/* Vision + Homegrown */}
        <div className="grid overflow-hidden rounded-2xl bg-[#eceff3] shadow-[0_10px_30px_-18px_rgba(15,61,102,0.35)] lg:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-store-ink uppercase sm:text-3xl">
              Our Vision
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-store-muted sm:text-[15px]">
              We aim to be the printing partner brands trust for offset
              commercial print and screen specialty work — creative solutions,
              reliable innovation, and finish quality that holds up in bulk.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-store-muted sm:text-[15px]">
              From visiting cards, brochures, and product boxes to tees,
              uniforms, tote bags, and wedding stationery, Anita Printers keeps
              raising the bar for B2B print — clear proofs and on-time dispatch
              across India.
            </p>
          </div>

          <div className="bg-store-navy-deeper px-5 py-7 text-white sm:px-7 sm:py-8 lg:rounded-r-2xl">
            <div className="flex items-center gap-3">
              <IndiaMapIcon className="h-9 w-9 shrink-0 text-store-accent" />
              <p className="text-lg font-bold tracking-wide sm:text-xl">
                WE ARE{" "}
                <span className="text-store-accent uppercase">Homegrown.</span>
              </p>
            </div>

            <ul className="mt-5 grid gap-x-6 gap-y-2.5 text-sm text-white/90 sm:grid-cols-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="group/hl flex items-start gap-2 rounded-lg px-2 py-1.5 transition-colors duration-300 hover:bg-white/10"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-store-accent transition-transform duration-300 group-hover/hl:scale-150"
                    aria-hidden
                  />
                  <span className="transition-colors group-hover/hl:text-white">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div
              ref={statsRef}
              className="mt-6 grid grid-cols-2 border-t border-white/20 pt-5 sm:grid-cols-4"
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`group/stat px-2 py-2 text-center transition-colors duration-300 hover:bg-white/8 ${
                    index % 2 === 1 ? "border-l border-white/20" : ""
                  } ${index >= 2 ? "border-t border-white/20 sm:border-t-0" : ""} ${
                    index > 0 ? "sm:border-l sm:border-white/25" : ""
                  }`}
                >
                  <p className="text-xl font-extrabold tracking-tight tabular-nums transition-colors group-hover/stat:text-store-accent sm:text-2xl">
                    {counts[index].toLocaleString("en-IN")}
                    {stat.suffix}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-white/70 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bulk CTA */}
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-[#eceff3] px-6 py-5 shadow-[0_10px_30px_-18px_rgba(15,61,102,0.28)] sm:flex-row sm:items-center sm:px-8">
          <div>
            <h3 className="text-lg font-bold text-store-ink sm:text-xl">
              Need Bulk Quantities?
            </h3>
            <p className="mt-1 max-w-xl text-sm text-store-muted">
              We&apos;ve got you covered! Competitive B2B pricing on offset
              stationery & packaging and screen apparel & specialty — fast
              delivery for corporate, retail, events, and schools.
            </p>
          </div>
          <a
            href={siteContact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-store-logo px-5 py-3 text-sm font-bold tracking-wide text-white uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-store-accent hover:shadow-[0_14px_28px_-14px_rgba(196,59,88,0.5)]"
          >
            <WhatsAppIcon />
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

function IndiaMapIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M48.2 6.5c2.1-.8 4.4.2 5.4 2.2l2.8 5.4c.7 1.4 2.2 2.1 3.7 1.8l5.1-1.1c2.2-.5 4.4.9 4.9 3.1l1.6 6.8c.3 1.4 1.5 2.4 2.9 2.5l6.1.6c2.3.2 4 2.3 3.6 4.6l-1.2 6.2c-.3 1.4.2 2.8 1.3 3.6l4.6 3.4c1.8 1.3 2.1 3.8.7 5.4l-3.6 4.3c-.8 1-.9 2.4-.3 3.5l2.4 4.9c.9 1.9.2 4.2-1.7 5.1l-5.2 2.5c-1.2.6-1.9 1.8-1.9 3.1v5.2c0 2.1-1.7 3.8-3.8 3.8h-4.4c-1.3 0-2.5.7-3.2 1.8l-2.9 4.6c-1.2 1.9-3.8 2.1-5.3.4l-3.9-4.1c-.9-.9-2.2-1.2-3.4-.7l-5.5 2.3c-2 .8-4.3-.2-5-2.2l-2-5.4c-.4-1.2-1.5-2-2.7-2.1l-5.8-.7c-2.2-.3-3.8-2.3-3.4-4.5l1.2-6c.3-1.4-.1-2.8-1.1-3.6l-4.3-3.5c-1.7-1.4-1.8-4-.2-5.5l4.1-4c.9-.9 1.2-2.2.9-3.4l-1.5-5.1c-.6-2.1.6-4.3 2.7-4.9l5.4-1.7c1.2-.4 2.1-1.4 2.4-2.6l1.4-5.8c.5-2.1 2.6-3.4 4.7-2.9l5.2 1.1c1.3.3 2.7-.3 3.4-1.4l2.8-4.2c.8-1.2 2.3-1.7 3.7-1.2z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
