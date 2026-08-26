"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/app/lib/storefront/b2b-content";
import { useDragSlide } from "@/app/lib/storefront/use-drag-slide";

export function TestimonialsPartners() {
  const total = testimonials.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);

  const go = useCallback(
    (delta: number) => {
      setIndex((current) => (current + delta + total) % total);
      setFadeKey((k) => k + 1);
    },
    [total],
  );

  const { bindDrag } = useDragSlide({
    onSwipe: go,
    onDragStart: () => setPaused(true),
    onDragEnd: () => {
      window.setTimeout(() => setPaused(false), 600);
    },
  });

  useEffect(() => {
    if (paused || total < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
      setFadeKey((k) => k + 1);
    }, 5500);
    return () => window.clearInterval(id);
  }, [paused, total]);

  const active = testimonials[index];

  return (
    <section className="relative overflow-hidden border-b border-store-line bg-store-navy-deeper text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-store-accent/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -left-10 h-80 w-80 rounded-full bg-store-logo/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-store-accent uppercase">
              Client stories
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]">
              Trusted for bulk print
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/65 sm:text-base">
              Offset stationery, screen apparel, packaging, and event print —
              from corporate desks to wedding planners across India.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-no-drag
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/15"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.25} aria-hidden />
            </button>
            <button
              type="button"
              data-no-drag
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/15"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.25} aria-hidden />
            </button>
          </div>
        </div>

        <div
          className="mt-10 cursor-grab touch-pan-y active:cursor-grabbing sm:mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseDown={bindDrag.onMouseDown}
          onMouseMove={bindDrag.onMouseMove}
          onMouseUp={bindDrag.onMouseUp}
          onMouseLeave={() => {
            bindDrag.onMouseLeave();
            setPaused(false);
          }}
          onTouchStart={bindDrag.onTouchStart}
          onTouchMove={bindDrag.onTouchMove}
          onTouchEnd={bindDrag.onTouchEnd}
          role="region"
          aria-label="Testimonials slider"
          aria-live="polite"
        >
          <div
            key={fadeKey}
            className="store-fade-up grid items-center gap-8 lg:grid-cols-[220px_1fr] lg:gap-12"
          >
            <div className="relative mx-auto w-full max-w-[220px] lg:mx-0">
              <div className="absolute -inset-2 rounded-[2rem] bg-linear-to-br from-store-accent/40 via-transparent to-store-logo/30 blur-sm" />
              <div className="relative aspect-square overflow-hidden rounded-[1.75rem] border border-white/15 bg-store-navy shadow-[0_24px_60px_-28px_rgba(0,0,0,0.65)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.image}
                  alt={active.name}
                  draggable={false}
                  className="pointer-events-none h-full w-full object-cover select-none"
                />
              </div>
            </div>

            <blockquote className="min-w-0">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < active.rating
                        ? "fill-store-accent text-store-accent"
                        : "text-white/25"
                    }`}
                    aria-hidden
                  />
                ))}
              </div>

              <p className="mt-5 text-xl leading-snug font-medium tracking-tight text-white sm:text-2xl sm:leading-relaxed lg:text-[1.65rem]">
                “{active.quote}”
              </p>

              <footer className="mt-8 border-t border-white/15 pt-6">
                <p className="text-base font-bold tracking-tight text-white">
                  {active.name}
                </p>
                <p className="mt-0.5 text-sm text-white/55">{active.role}</p>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
