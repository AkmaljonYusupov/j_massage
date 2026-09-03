import { NextResponse } from "next/server";

/**
 * Kontakt formasidan kelgan arizani Telegram bot orqali yuboradi.
 *
 * Ishlashi uchun loyiha ildizida ".env.local" faylida ikkita qiymat
 * bo'lishi kerak (namuna: env.example.txt):
 *   TELEGRAM_BOT_TOKEN=...
 *   TELEGRAM_CHAT_ID=...
 */

interface ContactPayload {
  fullName?: unknown;
  phone?: unknown;
  message?: unknown;
}

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const fullName = clean(body.fullName, 100);
  const phone = clean(body.phone, 30);
  const message = clean(body.message, 1000);

  const digits = phone.replace(/\D/g, "");

  if (fullName.length < 3 || digits.length < 12 || message.length < 5) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID topilmadi");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const text = [
    "<b>Yangi ariza - J Massage School</b>",
    "",
    `<b>Ism:</b> ${escapeHtml(fullName)}`,
    `<b>Telefon:</b> ${escapeHtml(phone)}`,
    "",
    `<b>Xabar:</b>`,
    escapeHtml(message),
  ].join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error("Telegram API xatosi:", detail);
      return NextResponse.json({ error: "telegram_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Yuborishda xatolik:", error);
    return NextResponse.json({ error: "network_failed" }, { status: 500 });
  }
}