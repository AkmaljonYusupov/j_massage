"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

import { GALLERY_IMAGES } from "./gallery.data";

/** Avtomatik siljish tezligi (piksel/sekund) */
const SPEED = 45;

export function GallerySection() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const halfRef = useRef(0);

  // Uzluksiz aylanish uchun ro'yxat ikki marta chiziladi
  const loopImages = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    /**
     * Cheksiz aylanish: lenta yarim uzunlikdan o'tsa, boshiga qaytariladi.
     * Ikkala nusxa bir xil bo'lgani uchun bu sakrash ko'zga tashlanmaydi -
     * shu tufayli o'ngga ham, chapga ham cheksiz surish mumkin.
     */
    const normalize = () => {
      const half = halfRef.current;
      if (half <= 0) return;
      if (el.scrollLeft >= half) {
        el.scrollLeft -= half;
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft += half;
      }
    };

    const measure = () => {
      halfRef.current = el.scrollWidth / 2;
    };

    measure();
    el.scrollLeft = 1;

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(el);

    // --- avtomatik siljish ---
    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = now - last;
      last = now;
      if (!pausedRef.current && !reduceMotion) {
        el.scrollLeft += (SPEED * delta) / 1000;
      }
      normalize();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    // --- sichqoncha g'ildiragi: vertikal aylantirish gorizontal surishga aylanadi ---
    const onWheel = (event: WheelEvent) => {
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      if (!delta) return;
      event.preventDefault();
      el.scrollLeft += delta;
      normalize();
    };

    // --- barmoq bilan surish (iOS / Android) ---
    const pause = () => {
      pausedRef.current = true;
    };
    const resume = () => {
      pausedRef.current = false;
    };

    const onScroll = () => normalize();

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });
    el.addEventListener("touchcancel", resume, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
      el.removeEventListener("touchcancel", resume);
    };
  }, [reduceMotion]);

  return (
    <section className="relative overflow-hidden bg-[#fffef6] pt-5  pb-5">
      {/* chetlarda yumshoq so'nish */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#fffef6] to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#fffef6] to-transparent sm:w-28" />

      <div
        ref={trackRef}
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
        className="no-scrollbar flex overflow-x-auto overscroll-x-contain"
        style={{ scrollBehavior: "auto", touchAction: "pan-x pan-y" }}
      >
        <div className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4">
          {loopImages.map((image, i) => (
            <div
              key={`${image.src}-${i}`}
              className="group relative h-[190px] w-[250px] shrink-0 overflow-hidden rounded-2xl sm:h-[240px] sm:w-[320px] lg:h-[290px] lg:w-[390px]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                draggable={false}
                sizes="(max-width: 640px) 250px, (max-width: 1024px) 320px, 390px"
                className="select-none object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}