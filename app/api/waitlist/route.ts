import { NextResponse } from "next/server";

// Временное хранилище вейтлиста в памяти (в продакшене перенаправляется в DB/Directus/Postgres)
interface WaitlistEntry {
  email: string;
  telegram: string;
  socials?: Record<string, string>;
  created_at: string;
}

const waitlistStore: WaitlistEntry[] = [];
let initialCounter = 1420;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, telegram, socials } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, error: "Укажите корректный email" }, { status: 400 });
    }

    if (!telegram || telegram.trim().length < 2) {
      return NextResponse.json({ success: false, error: "Укажите вальдный Telegram-ник" }, { status: 400 });
    }

    const newEntry: WaitlistEntry = {
      email,
      telegram,
      socials: socials || {},
      created_at: new Date().toISOString(),
    };

    waitlistStore.push(newEntry);
    initialCounter += 1;

    console.log("[Waitlist Signup]", newEntry);

    return NextResponse.json({
      success: true,
      position: initialCounter,
      message: "Заявка успешно принята!",
    });
  } catch (err: unknown) {
    console.error("[Waitlist API Error]", err);
    return NextResponse.json({ success: false, error: "Ошибка сервера" }, { status: 500 });
  }
}
