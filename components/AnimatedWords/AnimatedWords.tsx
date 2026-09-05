"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

interface AnimatedWordsProps {
  /** Animatsiya qilinadigan matn */
  text: string;
  /** Boshlanish kechikishi (sekundda) */
  delay?: number;
  /** Har bir so'z orasidagi kechikish */
  stagger?: number;
  className?: string;
}

/**
 * Sarlavha uchun sodda animatsiya: har bir so'z pastdan ko'tariladi va
 * blur holatidan aniq holatga o'tadi. 3D burilish va ustidan suzuvchi
 * yorug'lik chizig'i yo'q - faqat tinch, o'qishga xalaqit bermaydigan
 * harakat.
 */
export function AnimatedWords({
  text,
  delay = 0,
  stagger = 0.055,
  className,
}: AnimatedWordsProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.1em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "0.7em", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: "0em", opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}