"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/app/lib/storefront/b2b-content";
import { useDragSlide } from "@/app/lib/storefront/use-drag-slide";

export function TestimonialsPartners() {
  const total = testimonials.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (delta: number) => {
      setIndex((current) => (current + delta + total) % total);
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
    }, 4500);
    return () => window.clearInterval(id);
  }, [paused, total]);

  const visible = [-2, -1, 0, 1, 2].map((offset) => {
    const i = (index + offset + total) % total;
    return { item: testimonials[i], offset, key: `${i}-${offset}` };
  });

  return (
    <section className="border-b border-store-line bg-store-paper">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.16em] text-store-muted uppercase">
            Clients & partners
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-store-navy sm:text-4xl">
            Testimonials
          </h2>
        </div>

        <div
          className="relative mt-12 cursor-grab touch-pan-y active:cursor-grabbing"
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
        >
          <button
            type="button"
            data-no-drag
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="absolute top-1/2 left-0 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-store-navy text-white shadow-md transition hover:bg-store-navy-dark sm:-left-2 lg:-left-4"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.5} aria-hidden />
          </button>
          <button
            type="button"
            data-no-drag
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="absolute top-1/2 right-0 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-store-navy text-white shadow-md transition hover:bg-store-navy-dark sm:-right-2 lg:-right-4"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.5} aria-hidden />
          </button>

          <div className="px-10 sm:hidden">
            <TestimonialCard item={testimonials[index]} active />
          </div>

          <div className="hidden items-stretch justify-center gap-3 px-10 sm:flex lg:gap-4 lg:px-12">
            {visible.map(({ item, offset, key }) => {
              const abs = Math.abs(offset);
              const hideOuterOnTablet = abs === 2;
              return (
                <div
                  key={key}
                  className={`w-full max-w-[160px] transition duration-500 md:max-w-[180px] lg:max-w-[200px] ${
                    hideOuterOnTablet ? "hidden xl:block" : ""
                  } ${
                    offset === 0
                      ? "z-10 scale-100 opacity-100"
                      : abs === 1
                        ? "scale-[0.96] opacity-70"
                        : "scale-[0.9] opacity-40"
                  }`}
                >
                  <TestimonialCard item={item} active={offset === 0} />
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((item, i) => (
              <button
                key={item.name}
                type="button"
                data-no-drag
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-store-navy"
                    : "w-2.5 bg-store-navy/25 hover:bg-store-navy/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  item,
  active,
}: {
  item: (typeof testimonials)[number];
  active?: boolean;
}) {
  return (
    <article
      className={`flex h-full flex-col items-center rounded-2xl border bg-white px-3.5 py-5 text-center shadow-[0_18px_40px_-28px_rgba(29,111,184,0.35)] sm:px-4 sm:py-6 ${
        active ? "border-store-navy/15" : "border-store-line"
      }`}
    >
      <p
        className={`self-start font-serif text-4xl leading-none ${
          active ? "text-store-navy" : "text-store-line"
        }`}
        aria-hidden
      >
        “
      </p>

      <div className="relative -mt-1 h-14 w-14 overflow-hidden rounded-full border-2 border-store-line bg-store-paper sm:h-16 sm:w-16">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="64px"
          draggable={false}
          className={`pointer-events-none object-cover select-none transition ${
            active ? "grayscale-0" : "grayscale"
          }`}
        />
      </div>

      <p
        className={`mt-3 line-clamp-4 text-xs leading-relaxed sm:text-[13px] ${
          active ? "text-store-ink" : "text-store-muted"
        }`}
      >
        {item.quote}
      </p>

      <div className="mt-3 flex items-center justify-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${
              i < item.rating
                ? active
                  ? "fill-store-navy text-store-navy"
                  : "fill-store-navy/30 text-store-navy/30"
                : "text-store-line"
            }`}
            aria-hidden
          />
        ))}
      </div>

      <p className="mt-3 text-sm font-bold text-store-ink">{item.name}</p>
      <p className="mt-0.5 line-clamp-2 text-[11px] text-store-muted">
        {item.role}
      </p>
    </article>
  );
}
