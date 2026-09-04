"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useDragSlide } from "@/app/lib/store/use-drag-slide";

/** Production showcase — paste your image URLs in `image` for each type. */
const slides = [
  { id: "barcode", title: "Barcode", alt: "Barcode printing", image: "https://sumanlabels.com/wp-content/uploads/2026/04/How-to-Create-Print-MRP-Sticker-with-Barcode.png" },
  { id: "sticker", title: "Sticker", alt: "Sticker printing", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu-qOJHnR8XNcLx7d0xh43cHu7YTHohu0J9j6o-34_A0VW4Y1y9cwy0GU&s=10" },
  { id: "label", title: "Label", alt: "Label printing", image: "https://5.imimg.com/data5/SELLER/Default/2024/11/464438609/HG/JR/DM/13753960/roll-form-label-500x500.png" },
  { id: "tag", title: "Tag", alt: "Tag printing", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHUP00UD_xF-r04ynGH9LtZYUnl6QScoShKz5upeBYDByisFOvv3lYOCEy&s=10" },
  {
    id: "letterhead",
    title: "Letterhead",
    alt: "Letterhead printing",
    image: "https://quapri.in/_next/image?url=https%3A%2F%2Fwp.quapri.in%2Fwp-content%2Fuploads%2F2024%2F04%2FCustom-Letterheads.webp&w=1920&q=75",
  },
  {
    id: "visiting-card",
    title: "Visiting Card",
    alt: "Visiting card printing",
    image: "https://quapri.in/_next/image?url=https%3A%2F%2Fwp.quapri.in%2Fwp-content%2Fuploads%2F2024%2F04%2FMatteVisitingCards_3.webp&w=1920&q=75",
  },
  {
    id: "plastic",
    title: "Plastic Material",
    alt: "Plastic material printing",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRE9LnPe9BIjt3xDmPm66GmbZ0VrruGA9VzwkmIHC5O4byMcp7fHTS9Mg&s=10",
  },
  {
    id: "brochures",
    title: "Brochures",
    alt: "Brochure printing",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbggsmrf3AGcg7U5czIVaginc7CaXgNcpAv4DnkR61XPanfKLQek32AHo&s=10",
  },
  { id: "posters", title: "Posters", alt: "Poster printing", image: "https://i.pinimg.com/736x/0b/08/ca/0b08cac9aa11850132899984f1a623f5.jpg" },
  { id: "leaflets", title: "Leaflets", alt: "Leaflet printing", image: "https://cms-artifacts.motionarray.com/content/motion_array/1927369/Stack_Of_Flyers_Mockup_high_resolution_preview_1927369.jpg?Expires=2079235643&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=Qx3tqWHYZawRBLWWMcW8~4rXjQfcseHtvOTZPJTUrlhI4DhLc6YVyShBlgYANiw0Lt0-~zkQRx9cOo1YEYRHOi9PDWzl00fXPMvoZF4vINqJhivLfEJoPFMcSs1POQKW4OOAHpwYuxsSLfmHuD7NcIi4iWZCvyxBtlnz-f7VWTlw~t6OQfwGDSh4reNwMmsaJW3fzy7GPEP707f-Zyx1v1QF0nmii-Bs05jrSts~MTgLiR1g7RtaiVGTrVxMyvR-4cb4n6eig7T5zEoow1E2n8~KHDI7ZpH4Dw7RxPC6IheJWLXtpRQnlJ8bqkFzOh99DK0YQzdRUR9NAXui1pCSgA__" },
  {
    id: "carry-bag",
    title: "Carry Bag",
    alt: "Carry bag printing",
    image: "https://cms.cloudinary.vpsvc.com/image/upload/if_ar_gt_1.1/c_scale,t_pdpHeroGallery_Gallery/if_else/c_scale,w_816/if_end/f_auto,q_auto:best,dpr_1.0/India%20LOB/Premium%20option%20in%20paper%20bag/Premium_option_in_Paper_bags_02",
  },
  { id: "box", title: "Box", alt: "Box packaging printing", image: "https://cms.cloudinary.vpsvc.com/image/upload/c_scale,dpr_1.0,f_auto,q_auto:good,w_700/India%20LOB/marketing%20Materials/Full%20Print%20Mailer%20Boxes/IN_Full-Print-Mailer-Boxes_Overview" },
  { id: "flex", title: "Flex", alt: "Flex banner printing", image: "https://5.imimg.com/data5/SELLER/Default/2025/8/535534704/CL/ZW/AR/118380186/flex-banner-printing-services-500x500.png" },
  {
    id: "shadi-card",
    title: "Shadi Card",
    alt: "Shadi / wedding card printing",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH1E8C0l_vqK5JEorEAoxkELOswVrcTPgItK4vYdSWl4YrlpN_sMlOXGb_&s=10",
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
  const [index, setIndex] = useState(0);
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
          Barcode, sticker, label, tag, letterhead, visiting card, plastic
          printing, brochures, posters, leaflets, carry bag, box, flex, and
          shadi card — offset &amp; screen under one roof.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:mt-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[#1a1a1a] transition hover:text-store-navy"
          >
            Browse product catalog
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[#555] transition hover:text-store-navy"
          >
            Explore offset &amp; screen services
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
          </Link>
        </div>
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
                {slide.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={slide.image}
                    alt={isCenter ? slide.alt : ""}
                    draggable={false}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-store-navy px-2">
                    <span
                      className={`text-center font-semibold text-white ${
                        isCenter ? "text-sm sm:text-base" : "text-[10px] sm:text-xs"
                      }`}
                    >
                      {slide.title}
                    </span>
                  </div>
                )}
                {slide.image ? (
                  <span
                    className={`absolute inset-x-0 bottom-0 bg-store-navy/75 text-center font-semibold text-white ${
                      isCenter
                        ? "px-2 py-1.5 text-xs sm:text-sm"
                        : "px-1 py-1 text-[9px] sm:text-[10px]"
                    }`}
                  >
                    {slide.title}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
