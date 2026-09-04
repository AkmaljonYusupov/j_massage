"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SpaLines } from "@/components/SpaLines/SpaLines";
import { TEAM_MEMBERS } from "./team.data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function TeamSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#fffef6] py-20 text-revoza-ink sm:py-28">
      <SpaLines />

      <div className="container relative">
        {/* --- Sarlavha --- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-revoza-ink/15 bg-white/70 px-4 py-2 text-xs font-semibold tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-revoza-sage" />
            {t("team.badge")}
          </span>

          <h2 className="mt-6 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-[2.6rem]">
            {t("team.title")}
          </h2>

          <p className="mt-5 text-base leading-relaxed text-revoza-ink/65">
            {t("team.description")}
          </p>
        </motion.div>

        {/* --- Kartalar --- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TEAM_MEMBERS.map((member) => (
            <motion.article
              key={member.id}
              variants={item}
              className="rounded-2xl border border-revoza-ink/10 bg-white/60 p-3"
            >
              <div className="relative aspect-[7/6] w-full overflow-hidden rounded-xl">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col items-center px-3 pb-6 pt-6 text-center">
                <h3 className="text-lg font-bold tracking-tight">
                  {member.name}
                </h3>

                <span className="mt-5 h-px w-[82%] bg-revoza-ink/12" />

                <p className="mt-5 text-sm leading-relaxed text-revoza-ink/60">
                  {t(member.bioKey)}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* --- Pastki qator --- */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:flex-row"
        >
          <div className="flex -space-x-3">
            {TEAM_MEMBERS.slice(0, 2).map((member) => (
              <span
                key={`avatar-${member.id}`}
                className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-[#fffef6]"
              >
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </span>
            ))}
          </div>

          <p className="text-sm text-revoza-ink/70">
            {t("team.ctaText")}{" "}
            <Link
              href="/contact"
              className="font-bold text-revoza-ink underline decoration-revoza-sage decoration-2 underline-offset-4 transition-colors hover:text-revoza-sage-dark"
            >
              {t("team.ctaLink")}
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}