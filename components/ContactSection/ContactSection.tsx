"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Loader2, Phone, Send } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
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
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-revoza-sage/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#7D6BA9]/10 blur-3xl" />

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
              className="mt-10 grid max-w-md gap-3"
            >
              {/* Telefon boksi */}
              <a
                href={CONTACT_PHONE_HREF}
                className="group flex items-center gap-3.5 rounded-2xl border border-revoza-ink/10 bg-white/70 p-4 shadow-[0_4px_14px_-10px_rgba(60,50,40,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-revoza-sage/30"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-revoza-sage text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-revoza-sage-dark">
                  <Phone className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-revoza-ink/50">
                    {t("contact.phoneLabel")}
                  </span>
                  <span className="block truncate text-[15px] font-bold">
                    {CONTACT_PHONE_DISPLAY}
                  </span>
                </span>
              </a>

              {/* Telegram boksi */}
              <a
                href={CONTACT_TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 rounded-2xl border border-revoza-ink/10 bg-white/70 p-4 shadow-[0_4px_14px_-10px_rgba(60,50,40,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-[#229ED9]/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-revoza-ink/5 text-revoza-ink/60 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#229ED9] group-hover:text-white">
                  <TelegramIcon className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-revoza-ink/50">
                    Telegram
                  </span>
                  <span className="block truncate text-[15px] font-bold">
                    @janna_masagee
                  </span>
                </span>
              </a>

              {/* Instagram boksi */}
              <a
                href={CONTACT_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 rounded-2xl border border-revoza-ink/10 bg-white/70 p-4 shadow-[0_4px_14px_-10px_rgba(60,50,40,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E1306C]/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-revoza-ink/5 text-revoza-ink/60 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#E1306C] group-hover:text-white">
                  <Instagram className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-revoza-ink/50">
                    Instagram
                  </span>
                  <span className="block truncate text-[15px] font-bold">
                    @janna_massagee
                  </span>
                </span>
              </a>
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