import { NextResponse } from "next/server";
import { LeadSubmissionSchema } from "@/specs/002-underundre-landing-v1/contracts/lead-api";

const BOTTLENECK_LABELS: Record<string, string> = {
  "whatsapp-manual": "Manual WhatsApp/TG booking & no-shows (TCO Audit $350)",
  "excel-chaos": "Spreadsheet / double-booking & billing chaos (TCO Audit $350)",
  "saas-tax-foss": "SaaS seat tax bleed -> FOSS Office Stack ($3,500)",
  "custom-sprint": "Multi-staff booking / custom system (via TCO Audit)",
  other: "Other workflow bottleneck",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = LeadSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Check email and stack description.",
          errors: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const lead = parsed.data;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_ALERT_CHAT_ID || process.env.TELEGRAM_CHAT_ID;

    let telegramSent = false;

    if (botToken && chatId) {
      try {
        const bottleneckLabel = BOTTLENECK_LABELS[lead.bottleneckType] || lead.bottleneckType;
        const text = [
          "<b>[NEW LEAD — UnderUndre v1]</b>",
          `<b>Email:</b> ${escapeHtml(lead.email)}`,
          `<b>Messenger / Social:</b> ${escapeHtml(lead.messenger || "Not provided (email only)")}`,
          `<b>Bottleneck:</b> ${escapeHtml(bottleneckLabel)}`,
          "<b>Team & Stack:</b>",
          escapeHtml(lead.stackAndTeam),
        ].join("\n");

        const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: "HTML",
          }),
          signal: AbortSignal.timeout(4000),
        });

        if (res.ok) {
          telegramSent = true;
        }
      } catch (err) {
        console.error("Telegram alert dispatch failed:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: telegramSent
        ? "Audit request received."
        : "Audit request received (fallback mode).",
      fallback: telegramSent ? "none" : "direct",
    });
  } catch (error) {
    console.error("Error processing lead submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        fallback: "direct",
      },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
