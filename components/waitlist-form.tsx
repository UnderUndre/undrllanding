"use client";

import { useState } from "react";

type SocialPlatform = "linkedin" | "twitter" | "instagram" | "facebook" | "whatsapp" | "discord";

const SOCIAL_CONFIG: Record<SocialPlatform, { label: string; placeholder: string; icon: string }> = {
  linkedin: { label: "LinkedIn", placeholder: "https://linkedin.com/in/username", icon: "💼" },
  twitter: { label: "Twitter / X", placeholder: "@username", icon: "🐦" },
  instagram: { label: "Instagram", placeholder: "@username", icon: "📸" },
  facebook: { label: "Facebook", placeholder: "https://facebook.com/profile", icon: "👤" },
  whatsapp: { label: "WhatsApp", placeholder: "+79001234567", icon: "💬" },
  discord: { label: "Discord", placeholder: "username#1234", icon: "🎮" },
};

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [activeSocials, setActiveSocials] = useState<SocialPlatform[]>([]);
  const [socialValues, setSocialValues] = useState<Record<SocialPlatform, string>>({
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "",
    whatsapp: "",
    discord: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [position, setPosition] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleSocial = (platform: SocialPlatform) => {
    if (activeSocials.includes(platform)) {
      setActiveSocials(activeSocials.filter((p) => p !== platform));
    } else {
      setActiveSocials([...activeSocials, platform]);
    }
  };

  const handleSocialChange = (platform: SocialPlatform, value: string) => {
    setSocialValues({ ...socialValues, [platform]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Пожалуйста, введите корректный Email");
      return;
    }

    if (!telegram || telegram.trim().length < 2) {
      setError("Пожалуйста, укажите ваш Telegram-ник (@username)");
      return;
    }

    setLoading(true);

    try {
      const selectedSocials: Record<string, string> = {};
      activeSocials.forEach((platform) => {
        if (socialValues[platform].trim()) {
          selectedSocials[platform] = socialValues[platform].trim();
        }
      });

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          telegram: telegram.trim().startsWith("@") ? telegram.trim() : `@${telegram.trim()}`,
          socials: selectedSocials,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setPosition(data.position || 1421);
      } else {
        setError(data.error || "Ошибка сохранения. Попробуйте ещё раз.");
      }
    } catch {
      setError("Сеть недоступна. Проверьте соединение.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-8 text-center backdrop-blur-md shadow-2xl shadow-emerald-900/20">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl text-emerald-400 border border-emerald-500/40">
          🎉
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Вы успешно в списке вейтлиста!</h3>
        <p className="text-emerald-300 text-lg mb-4">
          Ваш номер в очереди на ранний доступ к платформе: <span className="font-extrabold text-emerald-400 text-xl">#{position}</span>
        </p>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          Мы напишем вам в Telegram <span className="font-semibold text-white">{telegram}</span> сразу при открытии первой волны бета-теста маркетплейсов.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-5 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-black/80">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-2">
          🔥 Ранний доступ • Wave-1 Beta
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
          Забронируйте место на запуск маркетплейса
        </h3>
        <p className="text-slate-400 text-xs md:text-sm mt-1">
          Первые 100 участников получают приоритетный провижининг и персональный саппорт.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-950/50 p-3 text-sm text-red-300 text-center animate-pulse">
          ⚠️ {error}
        </div>
      )}

      {/* Обязательные поля */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
            Email <span className="text-orange-400">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ceo@mycompany.com"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
            Telegram никнейм <span className="text-orange-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              placeholder="@username"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-sm"
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Используется для быстрой связи и выдачи инвайта в Telegram Mini App.</p>
        </div>
      </div>

      {/* Прогрессивное раскрытие опциональных соцсетей */}
      <div className="pt-2 border-t border-slate-800/80">
        <label className="block text-xs font-medium text-slate-400 mb-2">
          Где ещё с вами связаться? <span className="text-slate-500 font-normal">(опционально)</span>
        </label>
        
        {/* Кнопки переключения соцсетей */}
        <div className="flex flex-wrap gap-2 mb-3">
          {(Object.keys(SOCIAL_CONFIG) as SocialPlatform[]).map((platform) => {
            const isSelected = activeSocials.includes(platform);
            const config = SOCIAL_CONFIG[platform];
            return (
              <button
                type="button"
                key={platform}
                onClick={() => toggleSocial(platform)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-slate-700 text-white border border-slate-500 shadow-sm"
                    : "bg-slate-950/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <span>{config.icon}</span>
                <span>{config.label}</span>
                <span className="text-slate-500 font-bold ml-0.5">{isSelected ? "✓" : "+"}</span>
              </button>
            );
          })}
        </div>

        {/* Раскрывающиеся поля ввода для выбранных соцсетей */}
        {activeSocials.length > 0 && (
          <div className="space-y-3 pt-2 animate-fadeIn">
            {activeSocials.map((platform) => {
              const config = SOCIAL_CONFIG[platform];
              return (
                <div key={platform} className="relative flex items-center">
                  <div className="absolute left-3 text-sm">{config.icon}</div>
                  <input
                    type="text"
                    value={socialValues[platform]}
                    onChange={(e) => handleSocialChange(platform, e.target.value)}
                    placeholder={`${config.label}: ${config.placeholder}`}
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-950 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => toggleSocial(platform)}
                    className="absolute right-3 text-slate-500 hover:text-slate-300 text-xs"
                    title="Удалить"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 py-4 px-6 text-sm font-bold text-slate-950 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Сохранение заявки..." : "🚀 Забронировать доступ в Waitlist"}
      </button>

      {/* Элементы снятия страхов и доверия под CTA */}
      <div className="pt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-400 font-bold">✓</span> Без спама
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-400 font-bold">✓</span> Без привязки банковской карты
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-400 font-bold">✓</span> Автоматический домен в 1 клик
        </span>
      </div>
    </form>
  );
}
