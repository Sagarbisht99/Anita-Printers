"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { heroSlides } from "@/app/lib/storefront/hero-slides";

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const total = heroSlides.length;

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, 5000);
    return () => window.clearInterval(id);
  }, [total]);

  function goTo(next: number) {
    setIndex((next + total) % total);
  }

  return (
    <section className="relative border-b border-store-line bg-[#f2ebe1]">
      <div className="relative overflow-hidden">
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
            >
              <div className="relative h-[220px] w-full sm:h-[280px] md:h-[340px] lg:h-[400px]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index - 1)}
          className="absolute top-1/2 left-2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg text-store-navy shadow-sm transition hover:bg-white sm:left-4 sm:h-10 sm:w-10"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          className="absolute top-1/2 right-2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg text-store-navy shadow-sm transition hover:bg-white sm:right-4 sm:h-10 sm:w-10"
          aria-label="Next slide"
        >
          ›
        </button>

        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-4">
          {heroSlides.map((item, i) => (
            <button
              key={item.id}
              type="button"
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
