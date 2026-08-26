"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useDragSlide } from "@/app/lib/storefront/use-drag-slide";

/** Production showcase — replace image URLs anytime. */
const slides = [
  {
    id: "bill-books",
    alt: "Bill books and invoice pads — business stationery",
    image:
      "https://cms.cloudinary.vpsvc.com/image/upload/if_ar_gt_1.1/c_scale,t_pdpHeroGallery_Gallery/if_else/c_scale,w_816/if_end/f_auto,q_auto:best,dpr_1.0/India%20LOB/Stationery%2C%20Letterheads%20and%20Stamps/Bill%20Books%20A4%20and%20A5/IN_Bill-Books-A4-A5_Hero-image_01",
  },
  {
    id: "brochures",
    alt: "Brochures and fold styles — marketing print",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZPT_0x1oQN_ogsq-NIugEZB2JF9lrqCLD14MrMhbEEj8RmbBAddBJu78&s=10",
  },
  {
    id: "catalogs",
    alt: "Catalogs, magazines, and product books",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdvts2qdafgD6J7ptVSUlhB1lPCoNbWxPIGB5fB4UtNuzszs9PfaqOeEE&s=10",
  },
  {
    id: "publishing",
    alt: "Books, magazines, and publishing print",
    image: "https://3.imimg.com/data3/IU/EB/MY-10841785/imgbooksmags-500x500.jpg",
  },
  {
    id: "pocket-notes",
    alt: "Pocket notebooks and diaries",
    image:
      "https://rukminim3.flixcart.com/image/480/640/xif0q/diary-notebook/u/f/l/pocket-notes-03-pocket-notes-03-mudrit-original-imaheebheqakfxzp.jpeg?q=20",
  },
  {
    id: "folders",
    alt: "Presentation folders and annual report covers",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2026/6/619245064/DB/YN/WO/35983597/presentation-folder-printing-500x500.jpeg",
  },
  {
    id: "packaging",
    alt: "Eco-friendly kraft product boxes and packaging",
    image:
      "https://dxqrsynswv8av.cloudfront.net/images/products_gallery_images/6_1750304563048_1755156873140.jpg",
  },
  {
    id: "wedding",
    alt: "Wedding invitation and premium stationery",
    image:
      "https://img.magnific.com/free-psd/watercolor-wedding-design-poster-template_23-2149648273.jpg?semt=ais_hybrid&w=740&q=80",
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
          Offset &amp; screen at their best
          <span
            aria-hidden
            className="ml-1.5 inline-block h-2.5 w-2.5 translate-y-[-2px] bg-store-accent align-middle sm:h-3 sm:w-3 sm:translate-y-[-3px]"
          />
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-[#555] sm:mt-6 sm:text-base sm:leading-8">
          Every bulk stationery run, every apparel print, every packaging job —
          proofed with care so corporate, retail, event, and school brands ship
          work that looks the way it was meant to.
        </p>

        <Link
          href="/services"
          className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-[#1a1a1a] transition hover:text-store-navy sm:mt-6"
        >
          Explore offset &amp; screen services
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt={isCenter ? slide.alt : ""}
                  draggable={false}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
