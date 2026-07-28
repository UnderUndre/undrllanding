import WaitlistForm from "./waitlist-form";

export default function HeroUndrlla() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-950">
      {/* Эффекты фона: тонкая сетка и контрастное свечение */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-900/30 via-orange-600/20 to-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto mb-12">
          {/* Радикально честный бейдж */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Закрытый Альфа-Набор</span>
            <span className="text-slate-600">•</span>
            <span className="text-orange-400 font-bold">Первым 50 создателям бесплатно</span>
          </div>

          {/* Заголовок H1 — 3-Second CRO Rule */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Запусти свой маркетплейс с{" "}
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-emerald-400 bg-clip-text text-transparent">
              уникальным брендингом
            </span>{" "}
            и лендингом в один клик
          </h1>

          {/* Подзаголовок */}
          <p className="text-lg md:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed mb-8">
            Мы только запускаемся и ищем первых 50 партнеров-создателей. Вы получаете полностью развернутый маркетплейс на Medusa 2.0 с приёмом карт (Paddle / Stripe) и крипты (SHKeeper) бесплатно за отзыв.
          </p>

          {/* Социальные показатели с 100% честностью */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 text-base font-bold">0 / 50</span>
              <span>мест в альфа-группе</span>
            </div>
            <div className="hidden sm:block text-slate-700">•</div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-base font-bold">$0</span>
              <span>стоимость деплоя для первых 50</span>
            </div>
            <div className="hidden sm:block text-slate-700">•</div>
            <div className="flex items-center gap-2">
              <span className="text-orange-400 text-base font-bold">SHKeeper + Medusa 2.0</span>
              <span>автономный движок</span>
            </div>
          </div>
        </div>

        {/* Форма Waitlist */}
        <div id="waitlist" className="scroll-mt-32">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
