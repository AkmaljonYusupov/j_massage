"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { GALLERY_IMAGES } from "./gallery.data";

/** Bir to'liq aylanish necha soniyada tugasin */
const SPEED_SECONDS = 42;

export function GallerySection() {
  const reduceMotion = useReducedMotion();

  // Uzluksiz aylanish uchun ro'yxat ikki marta chiziladi:
  // birinchi nusxa chapga to'liq siljiganda ikkinchisi uning o'rnini egallaydi.
  const loopImages = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

  return (
    <section className="relative overflow-hidden bg-[#fffef6] pb-20 sm:pb-28">
      {/* chetlarda yumshoq so'nish - rasmlar keskin kesilmaydi */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#fffef6] to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#fffef6] to-transparent sm:w-28" />

      <div className="group flex overflow-hidden">
        <motion.div
          className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{
            duration: SPEED_SECONDS,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ willChange: "transform" }}
        >
          {loopImages.map((image, i) => (
            <div
              key={`${image.src}-${i}`}
              className="relative h-[190px] w-[250px] shrink-0 overflow-hidden rounded-2xl sm:h-[240px] sm:w-[320px] lg:h-[290px] lg:w-[390px]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 250px, (max-width: 1024px) 320px, 390px"
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}