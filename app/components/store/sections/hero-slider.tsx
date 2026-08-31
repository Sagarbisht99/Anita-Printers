"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { heroSlides } from "@/app/lib/store/hero-slides";
import { useDragSlide } from "@/app/lib/store/use-drag-slide";

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = heroSlides.length;

  const go = useCallback(
    (delta: number) => {
      setIndex((current) => (current + delta + total) % total);
    },
    [total],
  );

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + total) % total);
    },
    [total],
  );

  const { bindDrag, wasDragged } = useDragSlide({
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
    }, 5000);
    return () => window.clearInterval(id);
  }, [paused, total]);

  return (
    <section className="relative border-b border-store-line bg-store-paper">
      <div
        className="relative cursor-grab overflow-hidden active:cursor-grabbing"
        role="region"
        aria-label="Hero slideshow"
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
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {heroSlides.map((slide) => (
            <Link
              key={slide.id}
              href={slide.href}
              className="relative block w-full shrink-0"
              aria-label={slide.title}
              draggable={false}
              onClick={(e) => {
                if (wasDragged()) e.preventDefault();
              }}
            >
              <div className="relative h-[260px] w-full sm:h-[320px] md:h-[400px] lg:h-[480px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  draggable={false}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center select-none"
                />
              </div>
            </Link>
          ))}
        </div>

        {total > 1 ? (
          <>
            <button
              type="button"
              data-no-drag
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="absolute top-1/2 left-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-white/15 text-white backdrop-blur-[2px] transition hover:bg-white/25 sm:left-4 sm:h-11 sm:w-11"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.25} aria-hidden />
            </button>
            <button
              type="button"
              data-no-drag
              onClick={() => go(1)}
              aria-label="Next slide"
              className="absolute top-1/2 right-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-white/15 text-white backdrop-blur-[2px] transition hover:bg-white/25 sm:right-4 sm:h-11 sm:w-11"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.25} aria-hidden />
            </button>
          </>
        ) : null}

        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-4">
          {heroSlides.map((item, i) => (
            <button
              key={item.id}
              type="button"
              data-no-drag
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-store-navy"
                  : "w-2 bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-7">
        <h1 className="text-2xl font-bold tracking-tight text-store-navy sm:text-3xl lg:text-[2rem]">
          Offset &amp; Screen Printing in Noida
        </h1>
        <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-store-muted sm:text-base">
          Anita Printers — bulk visiting cards, labels, stickers, carry bags,
          boxes, flex, wedding cards, custom packaging, and apparel with GST
          invoices and pan-India delivery.
        </p>
      </div>
    </section>
  );
}
