import { NextResponse } from "next/server";
import { LeadSubmissionSchema } from "@/specs/002-underundre-landing-v1/contracts/lead-api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = LeadSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const lead = parsed.data;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_ALERT_CHAT_ID;

    let telegramSent = false;

    if (botToken && chatId) {
      try {
        const text = `
🚨 <b>New Inbound Lead — UnderUndre Landing v1</b>
<b>Name:</b> ${escapeHtml(lead.name)}
<b>Email:</b> ${escapeHtml(lead.email)}
<b>Company:</b> ${escapeHtml(lead.company || "N/A")}
<b>Monthly SaaS Waste:</b> ${escapeHtml(lead.estimatedMonthlySaaSCost || "N/A")}
<b>Product Interest:</b> ${escapeHtml(lead.productInterest)}
<b>Details:</b>
${escapeHtml(lead.details || "N/A")}
        `.trim();

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
        ? "Lead captured and dispatched to telegram successfully."
        : "Lead captured successfully (fallback mode).",
      fallback: telegramSent ? "none" : "upwork",
      upworkUrl: "https://www.upwork.com/direct-contracts",
    });
  } catch (error) {
    console.error("Error processing lead submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        fallback: "upwork",
        upworkUrl: "https://www.upwork.com/direct-contracts",
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
