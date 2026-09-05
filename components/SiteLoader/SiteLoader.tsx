"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

/** Xavfsizlik chorasi: rasm sekin yuklansa ham loader shu vaqtdan ortiq turmaydi */
const MAX_DURATION = 3500;
/** Kamida shuncha ko'rinadi - tez ochilganda "yaltirab" o'tib ketmasligi uchun */
const MIN_DURATION = 900;

export function SiteLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const started = Date.now();

    const hide = () => {
      const elapsed = Date.now() - started;
      const wait = Math.max(0, MIN_DURATION - elapsed);
      window.setTimeout(() => setVisible(false), wait);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
    }

    const failsafe = window.setTimeout(() => setVisible(false), MAX_DURATION);

    return () => {
      window.removeEventListener("load", hide);
      window.clearTimeout(failsafe);
    };
  }, []);

  // Loader ochiq turganda sahifa scroll qilinmasin
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="site-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-revoza-ink"
        >
          {/* Suvga tomchi tushgandek tarqaladigan halqalar */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute rounded-full border border-revoza-sage/40"
                style={{ width: 180, height: 180 }}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: [0.4, 2.4], opacity: [0.5, 0] }}
                transition={{
                  duration: 3,
                  delay: i * 1,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <Image
              src="/logo-white.png"
              alt="J Massage School"
              width={1756}
              height={652}
              priority
              quality={100}
              unoptimized
              className="h-14 w-auto sm:h-16"
            />
          </motion.div>

          {/* Yupqa progress chizig'i */}
          <div className="relative mt-8 h-[3px] w-40 overflow-hidden rounded-full bg-white/15">
            <motion.span
              className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-revoza-sage"
              animate={{ x: ["-120%", "320%"] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}