import { NextResponse } from "next/server";
import {
  addEntry,
  getStats,
  hasEmail,
  hasTelegram,
  type WaitlistEntry,
} from "@/lib/waitlist-store";

const DISPOSABLE_DOMAINS = new Set([
  "tempmail.com",
  "mailinator.com",
  "10minutemail.com",
  "dispostable.com",
  "guerrillamail.com",
  "throwawaymail.com",
  "yopmail.com",
  "sharklasers.com",
  "trashmail.com",
]);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function sendTelegramAlert(entry: WaitlistEntry, pos: number) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn(
      "[Telegram Alert Warning] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing in .env.local! Message skipped."
    );
    return false;
  }

  const socialLinks =
    entry.socials && Object.keys(entry.socials).length > 0
      ? Object.entries(entry.socials)
          .map(([k, v]) => `  • <b>${escapeHtml(k)}:</b> ${escapeHtml(v)}`)
          .join("\n")
      : "  • None";

  const stats = getStats();
  const h1 = entry.h1_variant ? entry.h1_variant.toUpperCase() : "?";
  const message =
    `🚀 <b>НОВАЯ ЗАЯВКА В WAITLIST (#${pos})</b>\n\n` +
    `📧 <b>Email:</b> <code>${escapeHtml(entry.email)}</code>\n` +
    `💬 <b>Telegram:</b> ${entry.telegram ? `<code>${escapeHtml(entry.telegram)}</code>` : "<i>Не указан</i>"}\n` +
    `🧪 <b>H1 A/B:</b> variant <code>${h1}</code> (session A=${stats.h1_variants.a} B=${stats.h1_variants.b})\n` +
    `🌐 <b>Доп. соцсети:</b>\n${socialLinks}\n\n` +
    `📊 <b>Альфа:</b> ${stats.claimed} / ${stats.limit} (осталось ${stats.remaining})\n` +
    `📅 <b>Дата:</b> ${new Date().toLocaleString("ru-RU")}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId.trim(),
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => null);
      console.error("[Telegram API Error]", res.status, errJson);
      return false;
    }

    console.log("[Telegram Alert Sent Successfully] Position #", pos);
    return true;
  } catch (err) {
    console.error("[Telegram Alert Fetch Failed]", err);
    return false;
  }
}

/** Public alpha counter for landing UI */
export async function GET() {
  return NextResponse.json({
    success: true,
    ...getStats(),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, telegram, socials, h1_variant } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Укажите валидный email адрес" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const domain = cleanEmail.split("@")[1];

    if (DISPOSABLE_DOMAINS.has(domain)) {
      return NextResponse.json(
        { success: false, error: "Временные одноразовые почты не принимаются" },
        { status: 400 }
      );
    }

    if (hasEmail(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: "Этот email уже зарегистрирован в вейтлисте" },
        { status: 400 }
      );
    }

    let cleanTg = "";
    if (telegram && typeof telegram === "string" && telegram.trim().length > 0) {
      cleanTg = telegram.trim().startsWith("@")
        ? telegram.trim().toLowerCase()
        : `@${telegram.trim().toLowerCase()}`;
      if (hasTelegram(cleanTg)) {
        return NextResponse.json(
          { success: false, error: "Этот Telegram аккаунт уже зарегистрирован" },
          { status: 400 }
        );
      }
    }

    const variant =
      h1_variant === "a" || h1_variant === "b" ? (h1_variant as "a" | "b") : undefined;

    const newEntry: WaitlistEntry = {
      email: cleanEmail,
      telegram: cleanTg,
      socials: socials || {},
      created_at: new Date().toISOString(),
      h1_variant: variant,
    };

    const { position, stats } = addEntry(newEntry);
    await sendTelegramAlert(newEntry, position);

    return NextResponse.json({
      success: true,
      position,
      message: "Заявка успешно принята!",
      h1_variant: variant ?? null,
      ...stats,
    });
  } catch (err: unknown) {
    console.error("[Waitlist API Error]", err);
    return NextResponse.json({ success: false, error: "Ошибка сервера" }, { status: 500 });
  }
}
