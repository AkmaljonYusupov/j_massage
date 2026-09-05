"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextMorphProps {
  /** Almashib turadigan so'zlar */
  words: string[];
  /** Bir so'z necha millisekund turadi */
  interval?: number;
  className?: string;
}

/**
 * So'zlar ketma-ket almashib turadigan animatsiya.
 *
 * Har bir so'z harfma-harf, blur holatidan chiqib paydo bo'ladi va
 * xuddi shunday yo'qoladi. AnimatePresence "popLayout" rejimida ishlaydi,
 * shuning uchun eski so'z chiqib ketayotganda yangisi joyiga siljiydi.
 */
export function TextMorph({
  words,
  interval = 2600,
  className,
}: TextMorphProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2 || reduceMotion) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval, reduceMotion]);

  const chars = useMemo(() => Array.from(words[index] ?? ""), [index, words]);

  if (!words.length) return null;

  if (reduceMotion) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={index}
        className={cn("inline-flex overflow-hidden pb-[0.12em]", className)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4 }}
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ delay: i * 0.028, duration: 0.32 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
}