"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { useLang } from "@/context/lang-context";
import { getUnderundreCopy } from "../locales";
import { getContactChannels } from "@/lib/social-links";

// v20.2b (Duplex Delivery Protocol & Zero Hallucination Gate)
// 1. Email is the mandatory B2B trunk line (for CFO budget approvals and video breakdowns).
// 2. Messengers (Telegram / WhatsApp / LinkedIn / Email only) are impulse bypass pings.
// 3. Mandate 5 (Guessing Ban): Odometer strictly calculates physical hours (Hours/Year),
// zero dollar revenue/savings estimation before verified payroll telemetry.

type RoleType = "owner" | "ops_lead" | "manager";
type SymptomType = "whatsapp_manual" | "excel_chaos" | "saas_tax" | "custom_process";
type TeamSizeType = "1-3" | "4-10" | "11-25" | "25+";
type TelemetryType = "csv_logs" | "live_screen" | "verbal";
type RoutineHoursType = "under_5" | "5-15" | "15-30" | "over_30";
type ChannelType = "telegram" | "whatsapp" | "linkedin" | "email_only";

const ODOMETER_RANGES: Record<TeamSizeType, Record<RoutineHoursType, [number, number]>> = {
  "1-3": {
    under_5: [104, 780],
    "5-15": [260, 2340],
    "15-30": [780, 4680],
    over_30: [1560, 6240],
  },
  "4-10": {
    under_5: [416, 2600],
    "5-15": [1040, 3900],
    "15-30": [3120, 7800],
    over_30: [6240, 15600],
  },
  "11-25": {
    under_5: [1144, 6500],
    "5-15": [2860, 19500],
    "15-30": [8580, 39000],
    over_30: [17160, 58500],
  },
  "25+": {
    under_5: [2600, 13000],
    "5-15": [6500, 39000],
    "15-30": [19500, 78000],
    over_30: [39000, 117000],
  },
};

export default function CtaUnderundre() {
  const { lang } = useLang();
  const t = getUnderundreCopy(lang).cta;

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [fallbackMode, setFallbackMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // v20.2b Intake state
  const [channelType, setChannelType] = useState<ChannelType>("telegram");
  const [channelHandle, setChannelHandle] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedChannel, setSubmittedChannel] = useState<ChannelType>("telegram");

  const [role, setRole] = useState<RoleType>("owner");
  const [symptom, setSymptom] = useState<SymptomType>("whatsapp_manual");
  const [teamSize, setTeamSize] = useState<TeamSizeType>("4-10");
  const [telemetry, setTelemetry] = useState<TelemetryType>("csv_logs");
  const [routineHours, setRoutineHours] = useState<RoutineHoursType>("5-15");

  // Spec 005 FR-017: no setState after unmount — abort the in-flight fetch.
  const abortRef = useRef<AbortController | null>(null);
  useEffect(() => () => abortRef.current?.abort(), []);

  const triageUrl = process.env.NEXT_PUBLIC_CAL_TRIAGE_URL;
  const socialLinks = getContactChannels();

  // Dynamic Odometer bounds (pure physical hours per year)
  const [minHours, maxHours] = useMemo(() => {
    return ODOMETER_RANGES[teamSize][routineHours] || [1040, 3900];
  }, [teamSize, routineHours]);

  const teamLabels: Record<TeamSizeType, string> = {
    "1-3": lang === "ru" ? "1–3 чел" : "1–3 people",
    "4-10": lang === "ru" ? "4–10 чел" : "4–10 people",
    "11-25": lang === "ru" ? "11–25 чел" : "11–25 people",
    "25+": lang === "ru" ? "25+ чел" : "25+ people",
  };

  const hoursLabels: Record<RoutineHoursType, string> = {
    under_5: lang === "ru" ? "<5 ч" : "<5 hrs",
    "5-15": lang === "ru" ? "5–15 ч" : "5–15 hrs",
    "15-30": lang === "ru" ? "15–30 ч" : "15–30 hrs",
    over_30: lang === "ru" ? "30+ ч" : "30+ hrs",
  };

  const channelLabels: Record<ChannelType, string> = {
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    linkedin: "LinkedIn",
    email_only: lang === "ru" ? "Только Email" : "Email only",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const email = ((formData.get("email") as string) || "").trim();
    const handleInput = ((formData.get("channelHandle") as string) || "").trim();
    const contact = channelType === "email_only" ? "Email only" : handleInput;

    const website = ((formData.get("website") as string) || "").trim();

    setSubmittedEmail(email);
    setSubmittedChannel(channelType);

    const structuredMessage =
      `[Role: ${role}] [Symptom: ${symptom}] [Team: ${teamSize}] ` +
      `[Telemetry: ${telemetry}] [RoutineHours: ${routineHours}] ` +
      `[Channel: ${channelType} -> ${contact}] ` +
      `[Odometer: ${minHours.toLocaleString()}–${maxHours.toLocaleString()} hrs/yr]`;

    const payload = {
      email,
      contact,
      topic: "tco-audit-v20.2b",
      message: structuredMessage,
      metadata: {
        role,
        symptom,
        teamSize,
        telemetryReadiness: telemetry,
        routineHoursPerWeek: routineHours,
        annualHoursMin: minHours,
        annualHoursMax: maxHours,
        channelType,
        channelHandle: contact,
        website,
        protocolVersion: "v20.2b-duplex",
      },
    };

    try {
      abortRef.current?.abort();
      abortRef.current = new AbortController();
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: abortRef.current.signal,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        if (data.fallback === "direct" || data.fallback === "partial") {
          setFallbackMode(true);
        }
      } else {
        setStatus("error");
        setErrorMessage(
          data.message ||
            (lang === "ru"
              ? "Не удалось отправить бриф. Напишите напрямую в мессенджер ниже."
              : "Submission failed. Reach out directly via messenger below.")
        );
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      console.error("Lead submit error:", err);
      setStatus("error");
      setFallbackMode(true);
    }
  };

  return (
    <section id="contact" className="py-20 bg-brand-bg text-slate-900 dark:text-white border-b border-brand-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-950/40 text-orange-600 dark:text-orange-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-3 border border-purple-300 dark:border-purple-800/40">
          {t.badge}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          {t.title}
        </h2>
        <p className="text-slate-600 dark:text-purple-200/70 max-w-xl mx-auto mb-10 text-sm">
          {t.subtitle}
        </p>

        {status === "success" ? (
          <div className="p-8 bg-brand-surface dark:bg-[#120524] border border-brand-border dark:border-purple-800/40 rounded-2xl text-left max-w-xl mx-auto mb-10 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">☕</span>
              <h3 className="text-brand-green font-bold text-lg">
                {lang === "ru" ? "Бриф принят и поставлен в очередь" : "Brief accepted & queued"}
              </h3>
            </div>

            {/* Контур 3: Smart Two-Speed & Duplex Dispatch Feedback */}
            <div className="p-4 bg-purple-950/40 border border-purple-800/40 rounded-xl text-xs text-purple-200 leading-relaxed space-y-1.5">
              <div>
                <strong>{lang === "ru" ? "Магистральный стояк (Email):" : "Primary Trunk (Email):"}</strong>{" "}
                {lang === "ru"
                  ? `Полный видеоразбор процесса и отчёт одометра придут на почту ${submittedEmail ? `(${submittedEmail})` : ""} в течение 24 рабочих часов.`
                  : `Full process video teardown and odometer report will be sent to your email ${submittedEmail ? `(${submittedEmail})` : ""} within 24 business hours.`}
              </div>
              {submittedChannel !== "email_only" && (
                <div className="text-purple-300/80">
                  <strong>{lang === "ru" ? "Импульсный пинг:" : "Impulse ping:"}</strong>{" "}
                  {lang === "ru"
                    ? `Короткое уведомление с прямой ссылкой продублируется в ${channelLabels[submittedChannel]}.`
                    : `A direct notification with link will be mirrored to ${channelLabels[submittedChannel]}.`}
                </div>
              )}
              {role === "manager" && (
                <div className="text-orange-400 font-medium pt-1 border-t border-purple-900/30">
                  {lang === "ru"
                    ? "🛡️ Staff Proxy: Видео разбито на 45–60 сек выжимку специально для быстрой защиты перед вашим руководством."
                    : "🛡️ Staff Proxy: Video is tailored as a 45–60 sec briefing specifically for defending before leadership."}
                </div>
              )}
            </div>

            {/* Контур 3: Green Corridor for Urgent Inquiries */}
            <div className="space-y-2 pt-2 border-t border-purple-900/40">
              <a
                href={triageUrl || "#contact"}
                id="btn-instant-escrow"
                target={triageUrl ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="block w-full py-3.5 px-4 bg-brand-orange hover:bg-orange-600 active:scale-[0.98] text-white text-center font-bold rounded-lg text-xs shadow-md transition-all cursor-pointer"
              >
                {lang === "ru"
                  ? "Забронировать 48-часовой слот аудита ($350) без ожидания очереди →"
                  : "Book a 48-hour audit slot ($350) without queue delay →"}
              </a>
              <div className="text-[11px] text-purple-300/60 text-center leading-relaxed">
                {lang === "ru"
                  ? "Безопасный расчёт: средства депонируются в независимый эскроу (Upwork / Stripe) до вашей приёмки спецификации."
                  : "Protected escrow: funds remain held in escrow (Upwork / Stripe) until you approve the specification."}
              </div>
            </div>

            {fallbackMode && socialLinks.length > 0 && (
              <div className="pt-4 border-t border-purple-900/40">
                <p className="text-xs text-orange-300 mb-2">
                  {lang === "ru" ? "Не дошло уведомление? Напишите напрямую:" : "Need direct contact? Reach out here:"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map(({ key, label, url, Icon }) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-800/50 text-purple-200 text-xs font-semibold hover:border-orange-500/50 transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 bg-brand-surface dark:bg-[#120524] rounded-2xl border border-brand-border dark:border-purple-800/40 text-left max-w-xl mx-auto mb-10 space-y-5 shadow-2xl"
          >
            {status === "error" && (
              <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-800/50 rounded-lg text-xs text-red-700 dark:text-red-300">
                {errorMessage}
              </div>
            )}

            {/* Контур 1: Landing Gate (Протокол «Дуплекс») */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-purple-200 mb-1" htmlFor="lead-email">
                  {lang === "ru"
                    ? "Рабочий Email * (куда прислать спецификацию и ссылку на видеоразбор)"
                    : "Work Email * (where to send specification and video breakdown link)"}
                </label>
                <input
                  id="lead-email"
                  type="email"
                  name="email"
                  required
                  placeholder="name@company.com"
                  className="w-full px-4 py-2.5 bg-white dark:bg-[#090212] border border-slate-300 dark:border-purple-900/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-orange"
                />
              </div>

              {/* Протокол «Дуплекс»: Выбор импульсного канала связи */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-purple-200 mb-1" htmlFor="lead-channel-handle">
                  {lang === "ru"
                    ? "Предпочитаемый канал связи * (импульсный пинг)"
                    : "Preferred contact channel * (impulse ping)"}
                </label>
                <div className="flex gap-2">
                  <select
                    id="lead-channel-type"
                    value={channelType}
                    onChange={(e) => setChannelType(e.target.value as ChannelType)}
                    className="w-1/3 min-w-[110px] sm:min-w-[130px] px-3 py-2.5 bg-white dark:bg-[#090212] border border-slate-300 dark:border-purple-900/50 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-orange"
                  >
                    <option value="telegram">Telegram</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="email_only">{lang === "ru" ? "Только Email" : "Email only"}</option>
                  </select>
                  <input
                    id="lead-channel-handle"
                    type="text"
                    name="channelHandle"
                    value={channelHandle}
                    onChange={(e) => setChannelHandle(e.target.value)}
                    disabled={channelType === "email_only"}
                    required={channelType !== "email_only"}
                    placeholder={
                      channelType === "email_only"
                        ? (lang === "ru" ? "Вся доставка строго в почту" : "All delivery via email only")
                        : channelType === "telegram"
                        ? "@username"
                        : channelType === "whatsapp"
                        ? "+1 234 567 8900"
                        : "linkedin.com/in/username"
                    }
                    className="w-2/3 px-4 py-2.5 bg-white dark:bg-[#090212] border border-slate-300 dark:border-purple-900/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-orange disabled:opacity-50 disabled:bg-slate-100 dark:disabled:bg-slate-900/50"
                  />
                </div>
              </div>

              {/* Gate 1: Role */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-purple-200 mb-1" htmlFor="lead-role">
                  {lang === "ru" ? "Ваша роль в компании (Gate 1) *" : "Your role in the company (Gate 1) *"}
                </label>
                <select
                  id="lead-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as RoleType)}
                  className="w-full px-4 py-2.5 bg-white dark:bg-[#090212] border border-slate-300 dark:border-purple-900/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-orange"
                >
                  <option value="owner">
                    {lang === "ru" ? "Владелец / CEO / COO (Решаю по бюджету лично)" : "Owner / CEO / COO (Direct economic decision-maker)"}
                  </option>
                  <option value="ops_lead">
                    {lang === "ru" ? "Руководитель направления / Operations Lead" : "Operations Lead / Department Head"}
                  </option>
                  <option value="manager">
                    {lang === "ru" ? "Менеджер / Подбираю решение для руководства" : "Manager / Researching solution for leadership"}
                  </option>
                </select>
              </div>

              {/* Gate 2: Symptom */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-purple-200 mb-1" htmlFor="lead-symptom">
                  {lang === "ru" ? "Главный симптом / засор (Gate 2) *" : "Primary symptom / bottleneck (Gate 2) *"}
                </label>
                <select
                  id="lead-symptom"
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value as SymptomType)}
                  className="w-full px-4 py-2.5 bg-white dark:bg-[#090212] border border-slate-300 dark:border-purple-900/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-orange"
                >
                  <option value="whatsapp_manual">
                    {lang === "ru" ? "Ручная запись в мессенджерах, пустые окна, no-show" : "Manual booking in WhatsApp/chat, empty slots, no-show"}
                  </option>
                  <option value="excel_chaos">
                    {lang === "ru" ? "Хаос в таблицах: ручная сверка счетов и оплат" : "Excel chaos: manual reconciliation of invoices and payments"}
                  </option>
                  <option value="saas_tax">
                    {lang === "ru" ? "Переплата за SaaS-лицензии (хотим FOSS-стек)" : "Excessive SaaS seat taxes (want self-hosted FOSS stack)"}
                  </option>
                  <option value="custom_process">
                    {lang === "ru" ? "Кастомный нестандартный процесс" : "Custom unique operational process"}
                  </option>
                </select>
              </div>

              {/* Gate 6: Team Size */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-purple-200 mb-1" htmlFor="lead-team">
                  {lang === "ru" ? "Команда в процессе (Gate 6) *" : "Team involved in process (Gate 6) *"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(["1-3", "4-10", "11-25", "25+"] as TeamSizeType[]).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setTeamSize(size)}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                        teamSize === size
                          ? "bg-brand-orange text-white border-brand-orange shadow-sm"
                          : "bg-white dark:bg-[#090212] border-slate-300 dark:border-purple-900/50 text-slate-700 dark:text-purple-200 hover:border-orange-500/50"
                      }`}
                    >
                      {teamLabels[size]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-purple-200 mb-1" htmlFor="lead-website">
                  {lang === "ru" ? "Сайт компании (опционально)" : "Company website (optional)"}
                </label>
                <input
                  id="lead-website"
                  type="url"
                  name="website"
                  placeholder="https://yourcompany.com"
                  className="w-full px-4 py-2.5 bg-white dark:bg-[#090212] border border-slate-300 dark:border-purple-900/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            {/* Контур 2: Telemetry & Depth Gate */}
            <div className="pt-4 border-t border-slate-200 dark:border-purple-900/40 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-purple-200 mb-1" htmlFor="lead-telemetry">
                  {lang === "ru"
                    ? "Доступ к данным для аудита (Gate 5 — Telemetry Readiness) *"
                    : "Data access for audit (Gate 5 — Telemetry Readiness) *"}
                </label>
                <select
                  id="lead-telemetry"
                  value={telemetry}
                  onChange={(e) => setTelemetry(e.target.value as TelemetryType)}
                  className="w-full px-4 py-2.5 bg-white dark:bg-[#090212] border border-slate-300 dark:border-purple-900/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-orange"
                >
                  <option value="csv_logs">
                    {lang === "ru" ? "Есть выгрузка / логи / CSV (W = 1.0)" : "CSV export / server logs / structured data available (W = 1.0)"}
                  </option>
                  <option value="live_screen">
                    {lang === "ru" ? "Покажем живой экран 15 минут (W = 0.9)" : "Live 15-min screen share of actual workflow (W = 0.9)"}
                  </option>
                  <option value="verbal">
                    {lang === "ru" ? "Только расскажем на словах (W = 0.5)" : "Verbal walkthrough only (W = 0.5)"}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-purple-200 mb-1" htmlFor="lead-hours">
                  {lang === "ru" ? "Сколько часов в неделю уходит на рутину на человека? *" : "Weekly routine hours per team member? *"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(["under_5", "5-15", "15-30", "over_30"] as RoutineHoursType[]).map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setRoutineHours(h)}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                        routineHours === h
                          ? "bg-brand-orange text-white border-brand-orange shadow-sm"
                          : "bg-white dark:bg-[#090212] border-slate-300 dark:border-purple-900/50 text-slate-700 dark:text-purple-200 hover:border-orange-500/50"
                      }`}
                    >
                      {hoursLabels[h]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Контур 2.5: Одометр нагрузки (ЧИСТЫЕ ЧАСЫ, НОЛЬ ГАДАНИЯ НА ДЕНЬГАХ) */}
            <div className="p-4 bg-[#090212] border border-orange-500/30 rounded-xl text-left text-xs space-y-1.5 shadow-inner">
              <div className="text-orange-400 font-mono font-bold uppercase tracking-wide">
                {lang === "ru" ? "Предварительный одометр нагрузки:" : "Preliminary Load Odometer:"}
              </div>
              <div className="text-purple-200/90 font-medium text-xs sm:text-sm">
                {lang === "ru" ? (
                  <>
                    Команда {teamLabels[teamSize]} × {hoursLabels[routineHours]} рутины/нед ={" "}
                    <strong className="text-white font-bold">
                      {minHours.toLocaleString()} – {maxHours.toLocaleString()} часов ручного труда в год
                    </strong>.
                  </>
                ) : (
                  <>
                    Team {teamLabels[teamSize]} × {hoursLabels[routineHours]} routine/wk ={" "}
                    <strong className="text-white font-bold">
                      {minHours.toLocaleString()} – {maxHours.toLocaleString()} hours of manual labor / year
                    </strong>.
                  </>
                )}
              </div>
              <div className="text-slate-500 text-[11px] leading-relaxed">
                {lang === "ru"
                  ? "* Денежный эквивалент вымывания ФОТ и потерь от DSO рассчитывается в отчёте аудита строго по подтверждённой ставке (Guessing Ban)."
                  : "* The monetary equivalent of payroll leakage and DSO losses is calculated in the audit report strictly from verified payroll rates (Guessing Ban)."}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 bg-brand-orange hover:bg-orange-600 active:scale-[0.98] disabled:opacity-50 text-white font-bold rounded-lg shadow-lg shadow-orange-950/40 transition-all text-sm cursor-pointer"
            >
              {status === "loading"
                ? (lang === "ru" ? "Отправляю бриф..." : "Submitting brief...")
                : (lang === "ru" ? "Запросить TCO-аудит за $350 →" : "Request TCO Audit for $350 →")}
            </button>
          </form>
        )}

        {socialLinks.length > 0 && (
          <div className="pt-6 border-t border-brand-border text-xs text-slate-500 dark:text-purple-300/60">
            <p className="mb-3">{t.directLinks.title}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
              {socialLinks.map(({ key, label, url, Icon }) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-100 hover:bg-purple-200 dark:bg-purple-950/60 dark:hover:bg-purple-900/70 text-slate-900 dark:text-purple-200 rounded-lg font-semibold transition-colors border border-purple-300 dark:border-purple-800/40"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label} →
                </a>
              ))}
            </div>
            <p className="text-slate-400 dark:text-purple-300/40">{t.directLinks.note}</p>
          </div>
        )}
      </div>
    </section>
  );
}
