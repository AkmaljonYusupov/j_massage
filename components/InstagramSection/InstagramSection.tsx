"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import {
  INSTAGRAM_POSTS,
  INSTAGRAM_PROFILE_URL,
  toEmbedUrl,
  type InstagramPost,
} from "./instagram.data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/**
 * Bitta video kartasi - haqiqiy Instagram pleyeri ko'rinib turadi.
 *
 * Sakkizta embed birdan yuklansa sahifa sekinlashadi, shuning uchun
 * iframe faqat karta ekranga yaqinlashganda ulanadi (IntersectionObserver).
 * Foydalanuvchi uchun bu sezilmaydi - u scroll qilib yetganda video joyida.
 */
function VideoCard({
  post,
  index,
  className,
}: {
  post: InstagramPost;
  index: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <motion.div
      ref={ref}
      variants={item}
      className={cn(
        "relative mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-2xl border border-revoza-ink/10 bg-[#fffef6] sm:max-w-none",
        className
      )}
    >
      {visible && (
        /*
          Instagram embed ichida video atrofida qora chetlar va pastda
          "View more / likes / Add a comment" paneli bo'ladi. Iframe
          kattalashtirilib, yuqori markazdan masshtablanadi - shu tufayli
          faqat videoning o'zi ko'rinadi, qolgani karta chetidan tashqarida
          qoladi va kesiladi.
        */
        <iframe
          src={toEmbedUrl(post.url)}
          title={`Instagram ${index + 1}`}
          loading="lazy"
          allowFullScreen
          scrolling="no"
          className="absolute left-1/2 top-1/2 border-0"
          style={{
            /*
              Sozlash uchun uch qiymat:
              - width: iframe qanchalik keng bo'lsa, ichidagi video shuncha
                katta bo'ladi. 200% - video kartaning to'liq balandligini
                qoplashi va pastda oq panel ko'rinmasligi uchun.
              - height: iframe ichidagi to'liq kontent balandligi
                (yuqori panel + video + pastki panel).
              - translateY dagi 27px: video markazini kartaning markaziga
                to'g'rilaydi (pastki panel yuqoridagidan balandroq).
            */
            width: "200%",
            height: "calc(115% + 166px)",
            transform: "translate(-50%, calc(-50% + 27px))",
          }}
        />
      )}
    </motion.div>
  );
}

export function InstagramSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#fffef6] py-20 text-revoza-ink sm:py-28">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-revoza-ink/15 bg-white/70 px-4 py-2 text-xs font-semibold tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-revoza-sage" />
              {t("instagram.badge")}
            </span>

            <h2 className="mt-6 max-w-xl text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-[2.4rem]">
              {t("instagram.title")}
            </h2>
          </div>

          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ripple
            className="ripple-btn ripple-sage group inline-flex h-12 shrink-0 items-center gap-2.5 self-start rounded-full bg-revoza-sage-dark pl-2 pr-6 text-[15px] font-bold text-white transition-transform duration-300 hover:-translate-y-0.5 sm:self-auto"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-revoza-sage-dark transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
            {t("instagram.cta")}
          </a>
        </motion.div>

        {/* 4 x 2 grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        >
          {INSTAGRAM_POSTS.map((post, i) => (
            <VideoCard
              key={post.id}
              post={post}
              index={i}
              /* eng kichik ekranda faqat dastlabki 4 tasi ko'rinadi */
              className={i >= 4 ? "hidden sm:block" : undefined}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}