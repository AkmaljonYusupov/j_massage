"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * SPA mavzusidagi chiziqli fon animatsiyasi.
 *
 * Spa - mineral suvli shifo markazi. Shundan kelib chiqib beshta motiv:
 *   1) suv yuzasidagi oqim chiziqlari (chetlarga qarab so'nadi),
 *   2) tomchi tushganda tarqaladigan halqalar,
 *   3) suv ostidan ko'tariladigan mayda pufakchalar,
 *   4) issiq suvdan ko'tariladigan bug' o'ramlari,
 *   5) zen bog'idagi tarash izlari va bargcha konturlari.
 *
 * Barcha element faqat kontur bilan chizilgan. Markazi maska orqali
 * so'ndirilgan - shu tufayli fon matn o'qilishiga xalaqit bermaydi.
 */
export function SpaLines({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  const loop = (duration: number, delay = 0) => ({
    duration,
    delay,
    repeat: Infinity,
    ease: "easeInOut" as const,
  });

  const flowTop = [
    { d: "M-120,120 C150,58 330,180 590,118 C850,56 1050,168 1340,104", o: 0.55, w: 1.6, dur: 15 },
    { d: "M-120,162 C160,100 340,222 600,158 C860,94 1060,206 1340,146", o: 0.4, w: 1.3, dur: 18 },
    { d: "M-120,206 C170,148 350,262 610,200 C870,138 1070,246 1340,190", o: 0.28, w: 1, dur: 22 },
  ];

  const flowBottom = [
    { d: "M-120,600 C170,545 360,662 620,600 C880,538 1080,646 1340,586", o: 0.45, w: 1.5, dur: 19 },
    { d: "M-120,646 C180,590 370,704 630,642 C890,580 1090,690 1340,632", o: 0.3, w: 1.1, dur: 24 },
  ];

  const bubbles = [
    { cx: 120, r: 3.5, dur: 14, delay: 0 },
    { cx: 168, r: 2.2, dur: 18, delay: 2.5 },
    { cx: 92, r: 2.8, dur: 16, delay: 5 },
    { cx: 1330, r: 3, dur: 17, delay: 1.2 },
    { cx: 1378, r: 2, dur: 21, delay: 4.4 },
    { cx: 1296, r: 2.6, dur: 15, delay: 7 },
  ];

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 1440 720"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          {/* Chiziqlar chap va o'ng chetda so'niydi - kesilgan uchlar ko'rinmaydi */}
          <linearGradient id="spa-fade-x" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="18%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="82%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>

          {/* Markaz so'ndirilgan maska - matn ustida chiziq bo'lmaydi */}
          <radialGradient id="spa-center-mask" cx="50%" cy="50%" r="62%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="55%" stopColor="#555555" />
            <stop offset="100%" stopColor="#ffffff" />
          </radialGradient>
          <mask id="spa-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="720">
            <rect width="1440" height="720" fill="url(#spa-center-mask)" />
          </mask>
        </defs>

        <g mask="url(#spa-mask)">
          {/* ---- 1. Suv oqimi chiziqlari ---- */}
          <g fill="none" strokeLinecap="round" className="text-revoza-sage">
            {flowTop.map((line, i) => (
              <motion.path
                key={`flow-top-${i}`}
                d={line.d}
                stroke="url(#spa-fade-x)"
                strokeWidth={line.w}
                opacity={line.o}
                initial={{ pathLength: 0 }}
                animate={
                  reduceMotion
                    ? { pathLength: 1 }
                    : { pathLength: 1, x: [0, 64, 0], y: [0, 12, 0] }
                }
                transition={{
                  pathLength: {
                    duration: 2.2,
                    delay: 0.2 + i * 0.25,
                    ease: "easeInOut",
                  },
                  x: loop(line.dur, i * 1.2),
                  y: loop(line.dur, i * 1.2),
                }}
              />
            ))}

            {flowBottom.map((line, i) => (
              <motion.path
                key={`flow-bottom-${i}`}
                d={line.d}
                stroke="url(#spa-fade-x)"
                strokeWidth={line.w}
                opacity={line.o}
                initial={{ pathLength: 0 }}
                animate={
                  reduceMotion
                    ? { pathLength: 1 }
                    : { pathLength: 1, x: [0, -56, 0], y: [0, -10, 0] }
                }
                transition={{
                  pathLength: {
                    duration: 2.2,
                    delay: 0.5 + i * 0.25,
                    ease: "easeInOut",
                  },
                  x: loop(line.dur, i * 1.6),
                  y: loop(line.dur, i * 1.6),
                }}
              />
            ))}
          </g>

          {/* ---- 2. Tomchi halqalari (chapda) ---- */}
          <g fill="none" stroke="currentColor" className="text-revoza-sage">
            {[0, 1, 2, 3].map((i) => (
              <motion.circle
                key={`ripple-left-${i}`}
                cx="235"
                cy="430"
                r="46"
                strokeWidth="1.2"
                initial={{ scale: 0.35, opacity: 0 }}
                animate={
                  reduceMotion
                    ? { scale: 1, opacity: 0.14 }
                    : { scale: [0.35, 2.7], opacity: [0.34, 0] }
                }
                transition={{
                  duration: 9,
                  delay: i * 2.25,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                style={{ transformOrigin: "235px 430px" }}
              />
            ))}
          </g>

          {/* ---- 2b. Tomchi halqalari (o'ngda) ---- */}
          <g fill="none" stroke="currentColor" className="text-[#7D6BA9]">
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={`ripple-right-${i}`}
                cx="1210"
                cy="215"
                r="38"
                strokeWidth="1"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={
                  reduceMotion
                    ? { scale: 1, opacity: 0.12 }
                    : { scale: [0.4, 2.3], opacity: [0.26, 0] }
                }
                transition={{
                  duration: 11,
                  delay: i * 3.6,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                style={{ transformOrigin: "1210px 215px" }}
              />
            ))}
          </g>

          {/* ---- 3. Suv pufakchalari ---- */}
          <g fill="none" stroke="currentColor" className="text-revoza-sage">
            {bubbles.map((b, i) => (
              <motion.circle
                key={`bubble-${i}`}
                cx={b.cx}
                cy={700}
                r={b.r}
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={
                  reduceMotion
                    ? { opacity: 0.2 }
                    : { y: [0, -520], opacity: [0, 0.4, 0.4, 0] }
                }
                transition={{
                  duration: b.dur,
                  delay: b.delay,
                  repeat: Infinity,
                  ease: "easeOut",
                  times: [0, 0.15, 0.75, 1],
                }}
              />
            ))}
          </g>

          {/* ---- 4. Bug' o'ramlari ---- */}
          <g fill="none" strokeLinecap="round" stroke="currentColor" className="text-revoza-sage">
            {[
              { d: "M300,690 C332,634 268,604 304,552 C334,508 288,484 314,442", x: 0, dur: 13 },
              { d: "M356,706 C386,652 326,622 360,572 C388,530 344,504 368,464", x: 12, dur: 16 },
              { d: "M250,714 C278,668 226,642 256,598", x: -10, dur: 11 },
            ].map((steam, i) => (
              <motion.path
                key={`steam-${i}`}
                d={steam.d}
                strokeWidth="1.3"
                strokeDasharray="7 11"
                opacity={0.2}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        strokeDashoffset: [0, -72],
                        x: [0, steam.x, 0],
                        opacity: [0.1, 0.26, 0.1],
                      }
                }
                transition={loop(steam.dur, i * 0.9)}
              />
            ))}
          </g>

          {/* ---- 5. Zen bog'i - tarash izlari ---- */}
          <g fill="none" stroke="currentColor" className="text-revoza-sage">
            {[0, 1, 2, 3].map((i) => (
              <motion.path
                key={`zen-${i}`}
                d={`M${1120 + i * 26},720 A${180 + i * 26},${180 + i * 26} 0 0 1 ${1440},${470 - i * 26}`}
                strokeWidth="1"
                opacity={0.16 - i * 0.02}
                initial={{ pathLength: 0 }}
                animate={
                  reduceMotion
                    ? { pathLength: 1, opacity: 0.16 - i * 0.02 }
                    : {
                        pathLength: 1,
                        opacity: [0.16 - i * 0.02, 0.28 - i * 0.03, 0.16 - i * 0.02],
                      }
                }
                transition={{
                  pathLength: { duration: 2.2, delay: 0.6 + i * 0.3, ease: "easeInOut" },
                  opacity: { duration: 12 + i * 2, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            ))}
          </g>

          {/* ---- 6. Bargcha konturlari ---- */}
          <g fill="none" stroke="currentColor" strokeWidth="1.2" className="text-revoza-sage">
            <motion.g
              opacity={0.2}
              animate={
                reduceMotion ? undefined : { rotate: [-6, 6, -6], y: [0, -10, 0] }
              }
              transition={loop(19)}
              style={{ transformOrigin: "150px 130px" }}
            >
              <path d="M150,130 C118,104 118,58 150,32 C182,58 182,104 150,130 Z" />
              <path d="M150,32 L150,130" />
            </motion.g>

            <motion.g
              opacity={0.15}
              animate={
                reduceMotion ? undefined : { rotate: [7, -7, 7], y: [0, 12, 0] }
              }
              transition={loop(23, 1.5)}
              style={{ transformOrigin: "1290px 560px" }}
            >
              <path d="M1290,560 C1262,538 1262,498 1290,476 C1318,498 1318,538 1290,560 Z" />
              <path d="M1290,476 L1290,560" />
            </motion.g>
          </g>
        </g>
      </svg>
    </div>
  );
}