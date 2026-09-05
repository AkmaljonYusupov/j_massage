"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { FAQ_IMAGE, FAQ_ITEMS } from "./faq.data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/**
 * Bo'lim foni - qolgan bo'limlar bilan bir xil uslubda:
 * nozik nuqtali to'r va yumshoq yorug'lik. To'r chetlarga borib so'niydi.
 */
function FaqBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(60,50,40,0.12) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(80% 65% at 50% 40%, #000 25%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(80% 65% at 50% 40%, #000 25%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 20% 15%, rgba(122,140,100,0.14) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

export function FaqSection() {
  const { t } = useLanguage();
  // Birinchi savol boshidan ochiq turadi
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  return (
    <section className="relative overflow-hidden bg-[#fffef6] py-20 text-revoza-ink sm:py-28">
      <FaqBackdrop />

      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-16">
          {/* --- Chap ustun --- */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.span
              variants={item}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-revoza-ink/15 bg-white/70 px-4 py-2 text-xs font-semibold tracking-wide"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-revoza-sage" />
              {t("faq.badge")}
            </motion.span>

            <motion.h2
              variants={item}
              className="mt-6 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-[2.6rem]"
            >
              {t("faq.titleLine1")}
              <br className="hidden sm:block" /> {t("faq.titleLine2")}
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-5 max-w-md text-[15px] leading-relaxed text-revoza-ink/65"
            >
              {t("faq.description")}
            </motion.p>

            <motion.div
              variants={item}
              className="group relative mt-10 aspect-[21/10] w-full overflow-hidden rounded-2xl"
            >
              <Image
                src={FAQ_IMAGE}
                alt=""
                fill
                sizes="(max-width: 1024px) 90vw, 460px"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
              />

              {/* Yumshoq qorayish - matn va nur ustida turishi uchun */}
              <span className="absolute inset-0 bg-gradient-to-t from-revoza-ink/60 via-revoza-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Diagonal yorug'lik chizig'i - chapdan o'ngga sirg'aladi */}
              <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-[420%]" />

              {/* Ichki nozik ramka */}
              <span className="pointer-events-none absolute inset-3 rounded-xl border border-white/0 transition-all duration-500 group-hover:inset-4 group-hover:border-white/35" />

              {/* Pastdan ko'tariladigan izoh */}
              <span className="absolute bottom-5 left-6 right-6 translate-y-3 text-sm font-bold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {t("faq.imageCaption")}
              </span>
            </motion.div>
          </motion.div>

          {/* --- Savollar --- */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-col gap-5"
          >
            {FAQ_ITEMS.map((faq) => {
              const open = openId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  variants={item}
                  className="overflow-hidden rounded-xl bg-[#edf0e6] transition-shadow duration-300 hover:shadow-[0_10px_26px_-20px_rgba(60,50,40,0.6)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : faq.id)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-5 px-6 py-[18px] text-left transition-colors hover:bg-[#e7ebde]"
                  >
                    <span className="text-[15px] font-bold leading-snug sm:text-base">
                      {t(faq.questionKey)}
                    </span>

                    <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                      <AnimatePresence mode="wait" initial={false}>
                        {open ? (
                          <motion.span
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                          >
                            <X className="h-5 w-5" strokeWidth={2.5} />
                          </motion.span>
                        ) : (
                          <motion.span
                            key="open"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Plus className="h-5 w-5" strokeWidth={2.5} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mx-6 border-t border-revoza-ink/10" />
                        <p className="px-6 pb-6 pt-5 text-sm leading-relaxed text-revoza-ink/60">
                          {t(faq.answerKey)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}