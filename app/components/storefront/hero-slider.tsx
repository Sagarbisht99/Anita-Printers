"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { heroSlides } from "@/app/lib/storefront/hero-slides";
import { useDragSlide } from "@/app/lib/storefront/use-drag-slide";

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
          {heroSlides.map((slide, i) => (
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
                  className="absolute inset-0 h-full w-full pointer-events-none object-cover object-center select-none"
                />
              </div>
            </Link>
          ))}
        </div>

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
    </section>
  );
}
