"use client";

import { useState, type ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Loader2, Send, X } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

/** Telefon raqam maskasi: "+998 XX XXX XX XX" */
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

/**
 * Modal oynadagi aloqa formasi.
 * Trigger sifatida istalgan tugmani bolalar (children) orqali beriladi.
 */
export function ContactModal({ children }: { children: ReactNode }) {
  const { t } = useLanguage();

  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const nameValid = fullName.trim().length >= 3;
  const phoneValid = countDigits(phone) === 9;
  const messageValid = message.trim().length >= 5;
  const formValid = nameValid && phoneValid && messageValid;

  function reset() {
    setFullName("");
    setPhone("+998 ");
    setMessage("");
    setTouched(false);
    setStatus("idle");
  }

  async function handleSubmit() {
    setTouched(true);
    if (!formValid || status === "sending") return;

    setStatus("sending");
    try {
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
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setTimeout(reset, 250);
      }}
    >
      <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-[70] w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-revoza-ink/10 bg-[#fffef6] p-6 text-revoza-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)] focus:outline-none ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:duration-150 data-[state=open]:duration-250 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogPrimitive.Title className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {t("contact.formTitle")}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-2 text-sm text-revoza-ink/60">
                {t("contact.description")}
              </DialogPrimitive.Description>
            </div>

            <DialogPrimitive.Close
              aria-label={t("navbar.closeMenu")}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-revoza-ink/5 text-revoza-ink/60 transition-colors hover:bg-revoza-ink/10 hover:text-revoza-ink"
            >
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>
          </div>

          <div className="mt-6 h-px w-full bg-revoza-ink/10" />

          <div className="mt-6 space-y-4">
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
                placeholder="+998 90 123 45 67"
                className={cn(
                  fieldBase,
                  "tracking-wide tabular-nums",
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
                rows={4}
                maxLength={600}
                className={cn(
                  fieldBase,
                  "min-h-[120px] resize-y leading-relaxed",
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
            data-ripple
            className="ripple-btn ripple-sage-dark mt-6 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-revoza-sage px-7 text-[15px] font-bold text-white disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
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
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}