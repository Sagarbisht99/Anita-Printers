"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  customPackagingContent,
  type CustomPackagingItem,
} from "@/app/lib/store/custom-packaging";

function PackagingCard({
  item,
  onOpen,
}: {
  item: CustomPackagingItem;
  onOpen: () => void;
}) {
  const isTall = item.size === "lg";

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${item.title}`}
      className="group flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-store-line bg-white text-left transition duration-300 hover:shadow-[0_16px_32px_-20px_rgba(15,61,102,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-store-navy"
    >
      <div
        className={`flex w-full items-center justify-center bg-white px-3 pt-5 sm:px-4 sm:pt-6 ${
          isTall
            ? "min-h-[200px] py-4 sm:min-h-[240px]"
            : "min-h-[120px] py-3 sm:min-h-[140px]"
        }`}
      >
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt=""
            className={`h-auto w-auto max-w-[86%] object-contain object-center transition duration-500 group-hover:scale-[1.03] ${
              isTall
                ? "max-h-[220px] sm:max-h-[260px]"
                : "max-h-[110px] sm:max-h-[128px]"
            }`}
          />
        ) : null}
      </div>

      <p className="px-3 pb-4 pt-1 text-center text-[0.8125rem] leading-snug font-normal text-[#3d4654] sm:px-4 sm:pb-4 sm:text-sm">
        {item.title}
      </p>
    </button>
  );
}

function PackagingLightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: CustomPackagingItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const titleId = useId();
  const item = items[index];
  const hasMany = items.length > 1;
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  const onTouchStart = useCallback((event: React.TouchEvent) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  }, []);

  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
      const delta = endX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(delta) < 48) return;
      if (delta > 0) onPrev();
      else onNext();
    },
    [onPrev, onNext],
  );

  if (!item?.image) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-store-navy/80 p-3 backdrop-blur-[2px] sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))] z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-store-ink shadow-md transition hover:bg-white sm:top-5 sm:right-5"
      >
        <X className="h-5 w-5" strokeWidth={2.25} aria-hidden />
      </button>

      {hasMany ? (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPrev();
            }}
            aria-label="Previous image"
            className="absolute top-1/2 left-2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-store-ink shadow-md transition hover:bg-white sm:left-4 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
            className="absolute top-1/2 right-2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-store-ink shadow-md transition hover:bg-white sm:right-4 sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
          </button>
        </>
      ) : null}

      <div
        className="relative flex max-h-[min(92dvh,900px)] w-full max-w-4xl flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex max-h-[min(78dvh,760px)] w-full items-center justify-center rounded-2xl bg-white p-4 shadow-[0_28px_80px_-28px_rgba(8,31,54,0.55)] sm:p-6 md:p-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.title}
            className="max-h-[min(70dvh,680px)] w-auto max-w-full object-contain"
          />
        </div>

        <div className="mt-3 flex flex-col items-center gap-1 px-2 text-center sm:mt-4">
          <p
            id={titleId}
            className="text-sm font-semibold text-white sm:text-base"
          >
            {item.title}
          </p>
          {hasMany ? (
            <p className="text-xs text-white/70 tabular-nums">
              {index + 1} / {items.length}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

type CustomizedPackagingGridProps = {
  items: CustomPackagingItem[];
};

export function CustomizedPackagingGrid({
  items,
}: CustomizedPackagingGridProps) {
  const { title, subtitle, stepsLine } = customPackagingContent;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || items.length === 0) return current;
      return (current - 1 + items.length) % items.length;
    });
  }, [items.length]);
  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || items.length === 0) return current;
      return (current + 1) % items.length;
    });
  }, [items.length]);

  return (
    <section className="border-b border-store-line bg-white">
      <div className="mx-auto max-w-[72rem] px-4 py-12 sm:px-6 sm:py-14 lg:py-16">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="text-[1.625rem] font-bold tracking-tight text-[#1c2430] sm:text-[1.875rem] lg:text-[2rem]">
            {title}
          </h2>
          <p className="mt-2 text-base font-normal text-[#3d4654] sm:text-[1.0625rem]">
            {subtitle}
          </p>
          <p className="mt-1.5 text-sm text-[#8b95a5]">{stepsLine}</p>
          <Link
            href="/products"
            className="mt-4 inline-flex text-sm font-semibold text-store-navy underline-offset-4 hover:underline"
          >
            Browse packaging in catalog →
          </Link>
        </header>

        <div className="mt-8 columns-2 gap-3 sm:mt-10 sm:gap-4 md:columns-3 lg:columns-4 lg:gap-5">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="mb-3 break-inside-avoid sm:mb-4 lg:mb-5"
            >
              <PackagingCard
                item={item}
                onOpen={() => setActiveIndex(index)}
              />
            </div>
          ))}
        </div>
      </div>

      {activeIndex !== null ? (
        <PackagingLightbox
          items={items}
          index={activeIndex}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
        />
      ) : null}
    </section>
  );
}
