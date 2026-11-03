import { NextResponse } from "next/server";
import { GenericLeadSubmissionSchema } from "@/lib/schemas/content-schema";
import { RateLimiter } from "@/lib/lead/rate-limit";
import { escapeHtml, maskEmail } from "@/lib/lead/sanitize";

// General-purpose pluggable lead intake (spec 003 FR-005, T-016/T-017; hardened spec 005).
// Dispatchers: Telegram (TELEGRAM_BOT_TOKEN + TELEGRAM_ALERT_CHAT_ID) and
// Webhook (LEAD_WEBHOOK_URL). Response semantics:
//   fallback: "direct"  — no sinks configured (lead logged redacted)
//   fallback: "none"    — all configured sinks delivered
//   fallback: "partial" — some sink failed/timed out (still HTTP 200, never a 500)

const rateLimiter = new RateLimiter();

// Oversized-body guard (spec 005 FR-008): Content-Length checked BEFORE
// buffering; also a hard post-read cap for chunked requests without the header.
class PayloadTooLargeError extends Error {}

async function readJsonWithLimit(request: Request, maxBytes = 64 * 1024): Promise<unknown> {
  const declared = Number(request.headers.get("content-length") || "0");
  if (declared > maxBytes) {
    throw new PayloadTooLargeError();
  }
  const text = await request.text();
  if (text.length > maxBytes) {
    throw new PayloadTooLargeError();
  }
  return JSON.parse(text);
}

function redactedLeadLog(lead: {
  email: string;
  contact: string;
  topic: string;
  message: string;
  metadata: Record<string, unknown>;
}): string {
  // PII hygiene (review F7): email/contact masked, never raw.
  return JSON.stringify({
    email: maskEmail(lead.email),
    contact: lead.contact ? "***" : "",
    topic: lead.topic,
    messageLength: lead.message.length,
    metadataKeys: Object.keys(lead.metadata),
  });
}

async function dispatchTelegram(lead: {
  email: string;
  contact: string;
  topic: string;
  message: string;
  metadata: Record<string, unknown>;
}): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ALERT_CHAT_ID || process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return true; // not configured — counts as delivered (no-op)

  const metadataLines = Object.entries(lead.metadata)
    .slice(0, 20)
    .map(([key, value]) => `<b>${escapeHtml(key)}:</b> ${escapeHtml(String(value))}`);
  const text = [
    "<b>[NEW LEAD]</b>",
    `<b>Email:</b> ${escapeHtml(lead.email)}`,
    `<b>Contact:</b> ${escapeHtml(lead.contact || "Not provided (email only)")}`,
    `<b>Topic:</b> ${escapeHtml(lead.topic)}`,
    ...metadataLines,
    "<b>Brief:</b>",
    escapeHtml(lead.message),
  ].join("\n");

  const apiRoot = process.env.TELEGRAM_API_ROOT || "https://api.telegram.org";
  try {
    const res = await fetch(`${apiRoot}/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
      signal: AbortSignal.timeout(10000),
    });
    return res.ok;
  } catch (err) {
    console.error("Telegram dispatch failed:", err instanceof Error ? err.message : String(err));
    return false;
  }
}

async function dispatchWebhook(payload: {
  email: string;
  contact: string;
  topic: string;
  message: string;
  metadata: Record<string, unknown>;
  timestamp: string;
}): Promise<boolean> {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) return true; // not configured — counts as delivered (no-op)

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(4000),
    });
    return res.ok;
  } catch (err) {
    console.error("Webhook dispatch failed:", err);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const ip = rateLimiter.resolveClientIp(request);
    const { allowed, retryAfterSec } = rateLimiter.check(ip);
    if (!allowed) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Try again in a minute." },
        { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
      );
    }

    let body: unknown;
    try {
      body = await readJsonWithLimit(request);
    } catch (err) {
      if (err instanceof PayloadTooLargeError) {
        return NextResponse.json(
          { success: false, message: "Payload too large." },
          { status: 413 }
        );
      }
      throw err;
    }

    const parsed = GenericLeadSubmissionSchema.safeParse(body);
    if (!parsed.success) {
      // Error disclosure (spec 005 FR-014): field paths only in production;
      // full Zod error map only outside production.
      const errors =
        process.env.NODE_ENV === "production"
          ? parsed.error.issues.map((issue) => ({
              path: issue.path.join("."),
              message: issue.message,
            }))
          : parsed.error.format();
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Check email and brief.",
          errors,
        },
        { status: 400 }
      );
    }

    const lead = { ...parsed.data, timestamp: new Date().toISOString() };

    const telegramConfigured = Boolean(
      process.env.TELEGRAM_BOT_TOKEN &&
        (process.env.TELEGRAM_ALERT_CHAT_ID || process.env.TELEGRAM_CHAT_ID)
    );
    const webhookConfigured = Boolean(process.env.LEAD_WEBHOOK_URL);

    if (!telegramConfigured && !webhookConfigured) {
      console.log(`[lead] (redacted) ${redactedLeadLog(lead)}`);
      return NextResponse.json({
        success: true,
        message: "Brief received (direct mode).",
        fallback: "direct",
      });
    }

    const [telegramOk, webhookOk] = await Promise.all([
      dispatchTelegram(lead),
      dispatchWebhook(lead),
    ]);

    const fallback = telegramOk && webhookOk ? "none" : "partial";
    if (fallback === "partial") {
      console.warn(`[lead] partial dispatch failure (telegram=${telegramOk}, webhook=${webhookOk})`);
    }

    return NextResponse.json({
      success: true,
      message: "Brief received.",
      fallback,
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
