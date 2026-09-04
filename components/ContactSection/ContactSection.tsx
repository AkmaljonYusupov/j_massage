"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Loader2, Phone, Send } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SpaLines } from "@/components/SpaLines/SpaLines";
import { cn } from "@/lib/utils";
import {
  CONTACT_INSTAGRAM_URL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  CONTACT_TELEGRAM_URL,
} from "./contact.data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M23.91 3.79 20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.28-.84-.95L6.3 13.7.85 12c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.54 1.74z" />
    </svg>
  );
}

/**
 * Telefon raqam maskasi: "+998 XX XXX XX XX".
 * Foydalanuvchi nima yozsa ham faqat raqamlar olinadi va shaklga solinadi.
 */
function formatPhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("998")) {
    digits = digits.slice(3);
  }
  digits = digits.slice(0, 9);

  const parts = [
    digits.slice(0, 2),
    digits.slice(2, 5),
    digits.slice(5, 7),
    digits.slice(7, 9),
  ].filter(Boolean);

  return parts.length ? `+998 ${parts.join(" ")}` : "+998 ";
}

function countDigits(value: string) {
  return value.replace(/\D/g, "").replace(/^998/, "").length;
}

const pillItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

interface ContactPillProps {
  href: string;
  external?: boolean;
  /** Ekran o'quvchilar uchun - vizual ko'rinmaydi */
  label: string;
  value: string;
  icon: React.ReactNode;
  /**
   * true bo'lsa, kichik ekranda faqat ikonka qoladi (matn yashirinadi) -
   * shu tufayli uchala havola mobilda ham bitta qatorga sig'adi.
   */
  compactOnMobile?: boolean;
  /** Telefon uchun - "hoziroq qo'ng'iroq qiling" ma'nosidagi pulsatsiya */
  pulse?: boolean;
  /** Har bir tarmoq uchun o'z rangi (to'liq Tailwind klasslari) */
  iconHoverClass: string;
  borderHoverClass: string;
  washClass: string;
  ringClass: string;
}

/**
 * Ixcham "pill" ko'rinishidagi aloqa havolasi.
 * Hover: rangli gradient yoyiladi, ikonka to'ladi va biroz buriladi,
 * o'ng tarafdan strelka sirg'alib chiqadi.
 */
function ContactPill({
  href,
  external,
  label,
  value,
  icon,
  compactOnMobile = false,
  pulse = false,
  iconHoverClass,
  borderHoverClass,
  washClass,
  ringClass,
}: ContactPillProps) {
  return (
    <motion.a
      variants={pillItem}
      href={href}
      aria-label={`${label}: ${value}`}
      title={value}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group relative inline-flex shrink-0 items-center gap-2.5 overflow-hidden rounded-full border border-revoza-ink/10 bg-white/60 p-1.5 outline-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_20px_-14px_rgba(60,50,40,0.55)]",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffef6]",
        compactOnMobile ? "pr-1.5 sm:pr-3.5" : "pr-3 sm:pr-3.5",
        borderHoverClass,
        ringClass
      )}
    >
      {/* hover'da chapdan o'ngga yoyiladigan rangli gradient */}
      <span
        className={cn(
          "pointer-events-none absolute inset-0 origin-left scale-x-0 rounded-full opacity-0 transition-all duration-500 ease-out group-hover:scale-x-100 group-hover:opacity-100",
          washClass
        )}
      />

      <span className="relative flex shrink-0">
        <span
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full bg-revoza-ink/[0.06] text-revoza-ink/55 transition-all duration-300 group-hover:scale-105 group-hover:-rotate-6",
            iconHoverClass
          )}
        >
          {icon}
        </span>

        {pulse && (
          <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-revoza-sage opacity-70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-revoza-sage ring-2 ring-[#fffef6]" />
          </span>
        )}
      </span>

      <span
        className={cn(
          "relative whitespace-nowrap text-[13.5px] font-bold tabular-nums tracking-[-0.01em] sm:text-[15px]",
          compactOnMobile && "hidden sm:inline"
        )}
      >
        {value}
      </span>

      {/* hover'da sirg'alib chiqadigan strelka */}
      <span
        className={cn(
          "relative hidden w-0 shrink-0 -translate-x-1 overflow-hidden opacity-0 transition-all duration-300 group-hover:w-4 group-hover:translate-x-0 group-hover:opacity-100 sm:block",
          compactOnMobile && "hidden sm:block"
        )}
      >
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </motion.a>
  );
}

type Status = "idle" | "sending" | "sent" | "error";

export function ContactSection() {
  const { t } = useLanguage();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const nameValid = fullName.trim().length >= 3;
  const phoneValid = countDigits(phone) === 9;
  const messageValid = message.trim().length >= 5;
  const formValid = nameValid && phoneValid && messageValid;

  async function handleSubmit() {
    setTouched(true);
    if (!formValid || status === "sending") return;

    setStatus("sending");
    try {
      // TODO: bu yerga o'zingizning yuborish manzilingizni qo'ying
      // (masalan Telegram bot uchun /api/contact route).
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, phone, message }),
      });
      if (!res.ok) throw new Error("request failed");

      setStatus("sent");
      setFullName("");
      setPhone("+998 ");
      setMessage("");
      setTouched(false);
    } catch {
      setStatus("error");
    }
  }

  const fieldBase =
    "w-full rounded-2xl border bg-white px-5 py-4 text-[15px] text-revoza-ink outline-none transition-all placeholder:text-revoza-ink/40 focus:border-revoza-sage focus:ring-4 focus:ring-revoza-sage/15";

  return (
    <section className="relative overflow-hidden bg-[#fffef6] py-20 text-revoza-ink sm:py-28">
      <SpaLines />

      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* --- Chap ustun --- */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-revoza-ink/15 bg-white/70 px-4 py-2 text-xs font-semibold tracking-wide"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-revoza-sage" />
              {t("contact.badge")}
            </motion.span>

            <motion.h2
              variants={item}
              className="mt-6 text-[2.1rem] font-extrabold leading-[1.1] tracking-tight sm:text-[2.8rem]"
            >
              {t("contact.title")}
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-5 max-w-md text-base leading-relaxed text-revoza-ink/65"
            >
              {t("contact.description")}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-2 sm:gap-2.5"
            >
              <ContactPill
                href={CONTACT_PHONE_HREF}
                label={t("contact.phoneLabel")}
                value={CONTACT_PHONE_DISPLAY}
                icon={<Phone className="h-[17px] w-[17px]" />}
                pulse
                iconHoverClass="group-hover:bg-revoza-sage group-hover:text-white"
                borderHoverClass="hover:border-revoza-sage/40"
                washClass="bg-gradient-to-r from-revoza-sage/12 to-transparent"
                ringClass="focus-visible:ring-revoza-sage/40"
              />

              <ContactPill
                href={CONTACT_TELEGRAM_URL}
                external
                label="Telegram"
                value="@janna_masagee"
                compactOnMobile
                icon={<TelegramIcon className="h-[17px] w-[17px]" />}
                iconHoverClass="group-hover:bg-[#229ED9] group-hover:text-white"
                borderHoverClass="hover:border-[#229ED9]/40"
                washClass="bg-gradient-to-r from-[#229ED9]/12 to-transparent"
                ringClass="focus-visible:ring-[#229ED9]/40"
              />

              <ContactPill
                href={CONTACT_INSTAGRAM_URL}
                external
                label="Instagram"
                value="@janna_massagee"
                compactOnMobile
                icon={<Instagram className="h-[17px] w-[17px]" />}
                iconHoverClass="group-hover:bg-[#E1306C] group-hover:text-white"
                borderHoverClass="hover:border-[#E1306C]/40"
                washClass="bg-gradient-to-r from-[#E1306C]/12 to-transparent"
                ringClass="focus-visible:ring-[#E1306C]/40"
              />
            </motion.div>
          </motion.div>

          {/* --- Forma --- */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[28px] border border-revoza-ink/10 bg-[#fffef6] p-6 shadow-[0_6px_20px_-14px_rgba(60,50,40,0.4)] sm:p-9"
          >
            <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {t("contact.formTitle")}
            </h3>
            <div className="mt-5 h-px w-full bg-revoza-ink/10" />

            <div className="mt-7 space-y-4">
              <div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t("contact.fullNamePlaceholder")}
                  className={cn(
                    fieldBase,
                    touched && !nameValid
                      ? "border-red-400/70 focus:border-red-400 focus:ring-red-400/15"
                      : "border-revoza-ink/10"
                  )}
                />
                {touched && !nameValid && (
                  <p className="mt-1.5 pl-1 text-xs text-red-500">
                    {t("contact.errorName")}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  onFocus={() => {
                    if (!phone) setPhone("+998 ");
                  }}
                  placeholder="+998 90 123 45 67"
                  className={cn(
                    fieldBase,
                    "tracking-wide",
                    touched && !phoneValid
                      ? "border-red-400/70 focus:border-red-400 focus:ring-red-400/15"
                      : "border-revoza-ink/10"
                  )}
                />
                {touched && !phoneValid && (
                  <p className="mt-1.5 pl-1 text-xs text-red-500">
                    {t("contact.errorPhone")}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("contact.messagePlaceholder")}
                  rows={5}
                  maxLength={600}
                  className={cn(
                    fieldBase,
                    "min-h-[140px] resize-y leading-relaxed",
                    touched && !messageValid
                      ? "border-red-400/70 focus:border-red-400 focus:ring-red-400/15"
                      : "border-revoza-ink/10"
                  )}
                />
                <div className="mt-1.5 flex items-center justify-between pl-1">
                  {touched && !messageValid ? (
                    <p className="text-xs text-red-500">
                      {t("contact.errorMessage")}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className="text-xs text-revoza-ink/40">
                    {message.length}/600
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === "sending"}
              className="mt-6 inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-revoza-sage px-7 text-[15px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-revoza-sage-dark disabled:pointer-events-none disabled:opacity-60"
            >
              {status === "sending" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {t("contact.submit")}
            </button>

            {status === "sent" && (
              <p className="mt-4 text-sm font-semibold text-revoza-sage-dark">
                {t("contact.successMessage")}
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm font-semibold text-red-500">
                {t("contact.errorSubmit")}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}