"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useDragSlide } from "@/app/lib/storefront/use-drag-slide";

/** Production showcase — replace image URLs anytime. */
const slides = [
  {
    id: "floor",
    alt: "Print production team at work",
    image:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "embroidery",
    alt: "Embroidery machine close-up",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "bottle",
    alt: "Custom bottle branding on press",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "cards",
    alt: "Bulk card printing",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "apparel",
    alt: "Custom apparel finishing",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "packaging",
    alt: "Branded packaging and boxes",
    image:
      "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "stationery",
    alt: "Business stationery set",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
  },
];

const OFFSETS = [-3, -2, -1, 0, 1, 2, 3] as const;

const SHIFT_BY_OFFSET: Record<number, string> = {
  [-3]: "-28vw",
  [-2]: "-19vw",
  [-1]: "-9.5vw",
  [0]: "0px",
  [1]: "9.5vw",
  [2]: "19vw",
  [3]: "28vw",
};

export function PrintingShowcase() {
  const total = slides.length;
  const [index, setIndex] = useState(3);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (delta: number) => {
      setIndex((current) => (current + delta + total) % total);
    },
    [total],
  );

  const { bindDrag, wasDragged } = useDragSlide({
    onSwipe: go,
    onDragStart: () => setPaused(true),
    onDragEnd: (didDrag) => {
      window.setTimeout(() => setPaused(false), didDrag ? 800 : 0);
    },
  });

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, 4000);
    return () => window.clearInterval(id);
  }, [paused, total]);

  return (
    <section className="border-b border-store-line bg-white">
      <div className="mx-auto max-w-5xl px-4 pt-14 pb-8 text-center sm:px-6 sm:pt-16 sm:pb-10">
        <h2 className="text-[1.65rem] leading-tight font-bold tracking-tight text-[#1a1a1a] sm:text-4xl sm:leading-[1.2] lg:text-[2.75rem]">
          Anita Printers&apos; Promise:
          <br />
          Printing at its Best. Period
          <span
            aria-hidden
            className="ml-1.5 inline-block h-2.5 w-2.5 translate-y-[-2px] bg-store-accent align-middle sm:h-3 sm:w-3 sm:translate-y-[-3px]"
          />
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-[#555] sm:mt-6 sm:text-base sm:leading-8">
          Every print, every order — Anita Printers has poured heart and soul
          into each one, with unwavering pride in delivering exceptional quality
          that brings your brand&apos;s vision to life.
        </p>

        <Link
          href="/products"
          className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-[#1a1a1a] transition hover:text-store-navy sm:mt-6"
        >
          Continue exploring
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
        </Link>
      </div>

      <div
        className="relative mx-auto mb-12 w-full max-w-6xl cursor-grab touch-pan-y px-2 active:cursor-grabbing sm:mb-14 sm:px-4 lg:max-w-7xl"
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
        aria-label="Production showcase slider"
      >
        <div className="relative mx-auto flex h-[150px] items-center justify-center sm:h-[200px] md:h-[240px] lg:h-[280px]">
          {OFFSETS.map((offset) => {
            const slideIndex = (index + offset + total) % total;
            const slide = slides[slideIndex];
            const abs = Math.abs(offset);
            const isCenter = offset === 0;

            const width =
              abs === 0
                ? "min(26%, 240px)"
                : abs === 1
                  ? "min(20%, 180px)"
                  : abs === 2
                    ? "min(16%, 145px)"
                    : "min(13%, 120px)";
            const height =
              abs === 0 ? "100%" : abs === 1 ? "90%" : abs === 2 ? "78%" : "66%";
            const scale =
              isCenter ? 1 : abs === 1 ? 0.96 : abs === 2 ? 0.9 : 0.84;
            const opacity =
              abs === 0 ? 1 : abs === 1 ? 0.94 : abs === 2 ? 0.8 : 0.65;

            return (
              <button
                key={`${slide.id}-${offset}`}
                type="button"
                onClick={() => {
                  if (wasDragged()) return;
                  if (offset !== 0) go(offset);
                }}
                className="absolute top-1/2 left-1/2 overflow-hidden rounded-lg border border-black/5 bg-store-paper shadow-[0_12px_32px_-18px_rgba(0,0,0,0.35)] transition-all duration-500 ease-out md:rounded-xl"
                style={{
                  width,
                  height,
                  zIndex: 10 - abs,
                  opacity,
                  transform: `translate(calc(-50% + ${SHIFT_BY_OFFSET[offset]}), -50%) scale(${scale})`,
                }}
                aria-label={isCenter ? slide.alt : `Show ${slide.alt}`}
                aria-current={isCenter}
              >
                <Image
                  src={slide.image}
                  alt={isCenter ? slide.alt : ""}
                  fill
                  draggable={false}
                  sizes="(max-width: 768px) 35vw, 240px"
                  className="pointer-events-none object-cover select-none"
                  priority={isCenter}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
