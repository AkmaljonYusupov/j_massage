"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Sichqoncha kirgan nuqtadan tarqaladigan to'ldirish effekti.
 *
 * Ishlatish tartibi:
 *   const { ref, pos, onMouseEnter } = useRipple<HTMLAnchorElement>();
 *   <Link ref={ref} onMouseEnter={onMouseEnter}
 *         className="group relative overflow-hidden ...">
 *     <RippleCircle pos={pos} className="bg-revoza-ink" />
 *     <span className="relative z-10">...</span>
 *   </Link>
 *
 * Ota elementda "group", "relative" va "overflow-hidden" bo'lishi shart,
 * mazmun esa "relative z-10" bilan doira ustida turishi kerak.
 */
export function useRipple<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMouseEnter = (event: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return { ref, pos, onMouseEnter };
}

interface RippleCircleProps {
  pos: { x: number; y: number };
  /** To'ldirish rangi, masalan "bg-revoza-ink" */
  className?: string;
}

export function RippleCircle({ pos, className }: RippleCircleProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute h-10 w-10 scale-0 rounded-full transition-transform duration-700 ease-in-out group-hover:scale-[18]",
        className
      )}
      style={{ left: pos.x - 20, top: pos.y - 20 }}
    />
  );
}