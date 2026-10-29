export interface UnderundreCopy {
  hero: {
    badge: string;
    title1: string;
    titleAccent: string;
    title2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    microcopy: string;
    badges: {
      escrow: { label: string; value: string };
      sla: { label: string; value: string };
      viaNegativa: { label: string; value: string };
      ip: { label: string; value: string };
      tax: { label: string; value: string };
    };
  };
  tagline: {
    directive: string;
    words: string[];
    author: string;
  };
  telemetry: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    cards: Array<{ step: string; title: string; desc: string }>;
  };
  pricing: {
    badge: string;
    title: string;
    subtitle: string;
    card0: {
      heroTag: string;
      tier: string;
      title: string;
      desc: string;
      price: string;
      priceAnchor: string;
      flatFee: string;
      creditNote: string;
      turnaround: string;
      deliverablesTitle: string;
      deliverables: string[];
      demandGate: string;
      cta: string;
    };
    card1: {
      tier: string;
      title: string;
      desc: string;
      price: string;
      flatFee: string;
      retainer: string;
      delivery: string;
      scopeTitle: string;
      scope: string[];
      deployment: string;
      cta: string;
    };
    card2: {
      tier: string;
      title: string;
      desc: string;
      price: string;
      flatFee: string;
      gatedNote: string;
      delivery: string;
      scopeTitle: string;
      scope: string[];
      gatedNotice: string;
      cta: string;
    };
  };
  fork: {
    badge: string;
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    cards: Array<{ title: string; subtitle: string; price: string; details: string; cta: string }>;
  };
  opsec: {
    badge: string;
    title: string;
    subtitle: string;
    steps: Array<{ num: string; title: string; desc: string }>;
    legalTitle: string;
    legalH4: string;
    legalDesc: string;
    legalBadge: string;
    commTitle: string;
    commH4: string;
    commDesc: string;
    commBadge: string;
  };
  comparison: {
    badge: string;
    title: string;
    subtitle: string;
    headers: {
      metric: string;
      underundre: string;
      agencies: string;
      freelancers: string;
    };
    rows: Array<{ metric: string; underundre: string; agencies: string; freelancers: string }>;
  };
  vibeWarning: {
    badge: string;
    title: string;
    desc: string;
    fateTitle: string;
    fateDesc: string;
    standardTitle: string;
    standardDesc: string;
    ruleOfThumb: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{ q: string; a: string[] }>;
  };
  cta: {
    badge: string;
    title: string;
    subtitle: string;
    thankYouTitle: string;
    thankYouLoom: string;
    thankYouEscrow: string;
    thankYouTriage: string;
    triageBtn: string;
    fallbackNotice: string;
    fallbackBtn: string;
    labels: {
      email: string;
      messenger: string;
      messengerPlaceholder: string;
      bottleneck: string;
      stack: string;
      stackPlaceholder: string;
      submitBtn: string;
      submitting: string;
    };
    bottlenecks: {
      whatsapp: string;
      excel: string;
      saasTax: string;
      custom: string;
      other: string;
    };
    directLinks: {
      title: string;
      note: string;
    };
  };
}

export const underundreCopy: Record<"ru" | "en", UnderundreCopy> = {
  ru: {
    hero: {
      badge: "3X СЕРТИФИЦИРОВАННЫЙ АРХИТЕКТОР SALESFORCE | 0% SAAS-ПОБОРОВ | ЭСКРОУ UPWORK",
      title1: "Хватит сжигать $15k–$40k/год на",
      titleAccent: "SaaS-подписках",
      title2: "и ручных костылях.",
      subtitle:
        "Провожу 48-часовой Workaround TCO Audit по методологии TDABC: оцифровываю скрытые расходы на ручной труд, срезаю лишние подписки и выдаю спецификацию OpenAPI 3.0 со схемой БД и Docker-моком. Пилотная цена $350 (далее $490). 100% стоимости засчитывается в разработку.",
      ctaPrimary: "Запросить аудит за $350 →",
      ctaSecondary: "Смотреть FOSS-стек без лицензий",
      microcopy:
        "Пилотная квота: первые 10 аудитов по $350 вместо $490 (Demand Gate). Ответ — персональный 90-секундный Loom-разбор в течение 4 рабочих часов. Оплата — защищённый эскроу Upwork Direct Contracts (5% комиссия, 0% для вас). NACE 62.01.",
      badges: {
        escrow: { label: "Защита капитала", value: "Upwork 5% Эскроу" },
        sla: { label: "Срок аудита", value: "48 часов жесткий SLA" },
        viaNegativa: { label: "Via Negativa", value: "Защита от сжигания бюджета" },
        ip: { label: "Права на код", value: "100% передача прав" },
        tax: { label: "Налоговый код", value: "Стандарт NACE 62.01" },
      },
    },
    tagline: {
      directive: "ДИРЕКТИВА VIA NEGATIVA",
      words:
        "Если ваш бизнес держится на ручном переносе заказов из WhatsApp, сведении разрозненных таблиц Excel и дорогих подписках за пользователя — вы платите пожизненный невидимый налог на операционное трение.".split(
          " "
        ),
      author: "— Инженерный манифест UnderUndre §18.9",
    },
    telemetry: {
      badge: "Инженерный стандарт поставки",
      title: "Каждый аудит собирается тем же конвейером, что и боевые системы клиентов.",
      subtitle:
        "Каждый бриф, валидация и артефакт проходят через строгий типизированный пайплайн: никакого «на глаз», только схемы, контракты и алерты о сбоях.",
      ctaPrimary: "Запросить свой аудит ($350) →",
      ctaSecondary: "Код и артефакты — на GitHub",
      cards: [
        {
          step: "01 / INGEST",
          title: "Webhook Ingest",
          desc: "Приём сырого JSON с intake-эндпоинтов без задержек.",
        },
        {
          step: "02 / ZOD GUARD",
          title: "Zod Schema Node",
          desc: "Строгая типизация рантайма на TypeScript. Битая структура отсекается сразу.",
        },
        {
          step: "03 / TELEMETRY & TRIAGE",
          title: "Telemetry & Triage",
          desc: "Классификация намерений и приоритизация задач менее чем за 1.2 секунды.",
        },
        {
          step: "04 / DB STORAGE",
          title: "Supabase RLS DB",
          desc: "Шифрованная запись в PostgreSQL с политиками Row Level Security (RLS).",
        },
        {
          step: "05 / INCIDENT DLQ",
          title: "Telegram DLQ",
          desc: "Мгновенное оповещение в канал инженеров с повтором сбойных пакетов в 1 клик.",
        },
      ],
    },
    pricing: {
      badge: "Продуктовая лестница — Фиксированная цена и SLA",
      title: "Фиксированные чеки. Ноль почасовой оплаты.",
      subtitle:
        "Выберите формат входа: 48-часовой аудит костылей за $350 или опенсорсный офис под ключ без лицензий. Средства замораживаются в Upwork Direct Contracts (5% эскроу).",
      card0: {
        heroTag: "ПИЛОТ — ПЕРВЫЕ 10 АУДИТОВ (100% В СЧЁТ РАЗРАБОТКИ)",
        tier: "ПРОДУКТ 0 — 48H АУДИТ КОСТЫЛЕЙ",
        title: "Workaround TCO Audit & Architecture Spec",
        desc: "Безопасный вход под лимитом корпоративных карт ($500). Одометр скрытых расходов на ручной труд и SaaS-поборы по TDABC.",
        price: "$350",
        priceAnchor: "вместо $490 после пилотной десятки",
        flatFee: "фикс под ключ",
        creditNote: "100% суммы засчитывается при переходе в Спринт А или Б",
        turnaround: "Готовность: 24–48 часов (жесткий SLA)",
        deliverablesTitle: "Состав поставки (Код NACE 62.01):",
        deliverables: [
          "Оцифровка расходов TDABC: выявление скрытого ФОТ (WhatsApp, сверка счетов, DSO).",
          "Штамп Via Negativa: запрет автоматизации, если затраты на переход выше экономии.",
          "Спецификация OpenAPI 3.0 для сквозной интеграции.",
          "Схема PostgreSQL DDL и Docker Compose mock-контейнер.",
        ],
        demandGate: "Обязательный Demand Gate: начальный аудит перед крупными кастомными спринтами.",
        cta: "Запросить аудит за $350 →",
      },
      card1: {
        tier: "СПРИНТ А — FOSS ОФИСНЫЙ СТЕК",
        title: "B2B Operations & FOSS Office Stack",
        desc: "Ликвидация $15k–$40k/год поборов за лицензии (Salesforce, Notion, Linear, Intercom) на приватном сервере Hetzner.",
        price: "$3,500",
        flatFee: "разовый сетап под ключ",
        retainer: "+ $500/мес за мониторинг бэкапов Restic S3 и безопасность",
        delivery: "Срок развёртывания: 3–5 рабочих дней",
        scopeTitle: "Фиксированный состав спринта:",
        scope: [
          "Twenty CRM / EspoCRM: 0$ за пользователя, полные права на данные.",
          "FOSS Suite: Outline (Docs), Plane (Tasks), Chatwoot (Inbox), Cal.com.",
          "Docker Memory Fencing: изоляция RAM и 16GB NVMe Swap против падений.",
          "Выделенный инстанс n8n или воркеры Trigger.dev v3 в коде.",
          "Traefik v3 reverse proxy с автоматическими сертификатами Let's Encrypt SSL.",
        ],
        deployment: "Развёртывание на одном Hetzner CPX42 (€82.69/мес). Запасной клапан ликвидности.",
        cta: "Обсудить FOSS-офис ($3,500) →",
      },
      card2: {
        tier: "СПРИНТ Б — СИСТЕМЫ ПОСЛЕ АУДИТА",
        title: "Sovereign Booking & Custom Systems",
        desc: "Автономная платформа онлайн-записи для сервисного бизнеса (3–25 сотрудников). Доступна по результатам TCO-аудита.",
        price: "$4,900",
        flatFee: "фикс под ключ",
        gatedNote: "Доступен строго после прохождения TCO-аудита",
        delivery: "Срок: 14 календарных дней (Timebox)",
        scopeTitle: "Состав системы (Fixed Scope Knife):",
        scope: [
          "Брендированная страница компании + публичные профили мастеров и услуг.",
          "Онлайн-запись: расписание, свободные слоты, отмена, защита от двойной брони.",
          "3 фиксированные роли: OWNER / OPERATOR / PERFORMER, отзыв доступов.",
          "Локализация ru/en из коробки; валюта, таймзона и брендинг через конфиг.",
        ],
        gatedNotice: "Защищённый гейт: сначала TCO-аудит за $350 для верификации требований.",
        cta: "Запросить через TCO-аудит →",
      },
    },
    fork: {
      badge: "Кастомная разработка поверх ядра",
      title: "Fork & Care: Доработки под нишу на базе Спринта Б",
      subtitle:
        "Нестандартные воркфлоу, нишевые платёжные шлюзы, интеграции со складом. Кастомный код изолирован в адаптерах — ядро остаётся чистым, обновления шаблона не ломают систему.",
      step1: "Шаг 1 — Развёртывание форка (разово)",
      step2: "Шаг 2 — Ежемесячная поддержка Care (от $149/мес)",
      step3: "Шаг 3 — Пакеты доработок Change Packs (результат вместо часов)",
      cards: [
        {
          title: "Fork Foundation",
          subtitle: "Чистый деплой Спринта Б",
          price: "$4,900",
          details: "Hetzner VPS · Docker · Traefik · Postgres · боты — без кастомного кода. Care от $149/мес.",
          cta: "Выбрать Foundation →",
        },
        {
          title: "Fork Tailored",
          subtitle: "База + до 25ч кастомизации",
          price: "$6,800",
          details: "Свои поля бронирования, адаптация под нишу, +1 внешняя интеграция. Care $349/мес.",
          cta: "Выбрать Tailored →",
        },
        {
          title: "Fork Enterprise-Lite",
          subtitle: "Сложные интеграции и шлюзы",
          price: "$8,900+",
          details: "Кастомная логика, нестандартные банки, складские интеграции. Care $349–$690/мес.",
          cta: "Обсудить Enterprise →",
        },
      ],
    },
    opsec: {
      badge: "Протокол нулевого финансового риска",
      title: "Как я на 100% исключаю ваш финансовый и технический риск.",
      subtitle:
        "Вы никогда не переводите деньги на анонимные счета. Все расчёты идут через официальный Upwork Direct Contracts Escrow с независимым арбитражем.",
      steps: [
        {
          num: "1",
          title: "Эскроу и аудит (День 1)",
          desc: "Вы замораживаете депозит в эскроу. Я разбираю архитектуру: если подходит готовое FOSS-решение, разворачиваю его без лишних затрат. Если нужна кастомная логика — фиксирую схему DDL.",
        },
        {
          num: "2",
          title: "Сборка на конвейере (Дни 1–13)",
          desc: "Разработка идёт на моём изолированном staging-сервере. Вы получаете закрытые превью-ссылки и видеоразборы прогресса без слепых зон.",
        },
        {
          num: "3",
          title: "Приёмка на Staging (День 14)",
          desc: "Живой 60-минутный созвон. Проверяем полный цикл бронирования. Вы подтверждаете работу и получаете полный доступ к Git-репозиторию и серверу.",
        },
        {
          num: "4",
          title: "7-дневный гарантийный SLA",
          desc: "7 календарных дней бесплатной гарантийной поддержки. Любые критические дефекты P1/P2 устраняются в течение 24 часов за мой счёт.",
        },
      ],
      legalTitle: "ЮРИДИЧЕСКИЙ СТАНДАРТ ПЕРЕДАЧИ КОДА",
      legalH4: "100% отчуждение прав на код по коду NACE 62.01",
      legalDesc:
        "Исходный код, SQL-миграции DDL и спецификации OpenAPI передаются в вашу исключительную собственность в приватный GitHub. Работа по стандарту EU NACE 62.01.",
      legalBadge: "100% ПЕРЕДАЧА ПРАВ",
      commTitle: "ПРОТОКОЛ СВЯЗИ",
      commH4: "Асинхронная скорость: защита от совещательной усталости",
      commDesc:
        "Я бережу ваш срок сдачи и не трачу часы на бесконечные созвоны в Zoom. Статусы и видеоразборы передаются асинхронно в Telegram и Loom. Созвоны строго по расписанию: Кикофф (30 мин) и сдача на 14 день (60 мин).",
      commBadge: "100% ФОКУС НА КОДЕ",
    },
    comparison: {
      badge: "Сравнение подходов",
      title: "Инженерная скорость против рыночной неэффективности.",
      subtitle:
        "Посмотрите, как продуктовый инженерный подход ликвидирует раздувание бюджетов и непредсказуемость фрилансеров.",
      headers: {
        metric: "Критерий оценки",
        underundre: "Бюро UnderUndre",
        agencies: "Традиционные агентства",
        freelancers: "Фриланс-биржи",
      },
      rows: [
        {
          metric: "Срок поставки",
          underundre: "3–14 календарных дней (гарантия)",
          agencies: "От 3 до 6 месяцев",
          freelancers: "Непредсказуемо (2–12 недель)",
        },
        {
          metric: "Модель оплаты",
          underundre: "Фиксированный чек $350–$490 аудит / $3,500 – $4,900 спринт",
          agencies: "$30,000 – $60,000+ (почасовая оплата T&M)",
          freelancers: "$30–$80/час (раздувание часов)",
        },
        {
          metric: "Лицензии на CRM / софт",
          underundre: "$0 / месяц (приватный опенсорс на Hetzner)",
          agencies: "$15,000 – $35,000 / год (Salesforce / HubSpot)",
          freelancers: "Интеграция CRM не входит",
        },
        {
          metric: "Безопасность капитала",
          underundre: "100% защита Upwork Direct Contracts Escrow",
          agencies: "50% невозвратная предоплата",
          freelancers: "100% предоплата или риск пропажи",
        },
        {
          metric: "Качество архитектуры",
          underundre: "Next.js 15 + Supabase + строгие типы Zod",
          agencies: "Тяжёлый оверинжиниринг на легаси",
          freelancers: "Спагетти-код без документации",
        },
      ],
    },
    vibeWarning: {
      badge: "Ловушка вайб-кодинга на $10,000/неделю",
      title: "Сначала архитектура — иначе заплатите спасателям $10k/нед за чистку нейрохрючева.",
      desc: "Бессистемный вайб-кодинг в ИИ-редакторах создаёт опасную иллюзию скорости. Без предварительных спецификаций, нормализации схем БД (DDL) и валидации на входе нейросети генерируют раздутый код с незаметными дырами безопасности.",
      fateTitle: "Судьба вайб-кода (Риск)",
      fateDesc:
        "100,000 строк неподдерживаемых портянок. В итоге приходится нанимать специалистов за $10k/неделю, чтобы просто удалить 65% мусора и заделать утечки данных.",
      standardTitle: "Инженерный стандарт UnderUndre",
      standardDesc:
        "Ноль преждевременного оверинжиниринга. Готовые опенсорсные ядра для типовых задач и строгая типизация DDL + Zod для кастомных процессов.",
      ruleOfThumb:
        "Правило гаечного ключа: приходите с чётким бизнес-процессом. Я собираю долговечную инфраструктуру, а не одноразовый макет.",
    },
    faq: {
      badge: "Прозрачность и правила игры",
      title: "Часто задаваемые вопросы",
      subtitle: "Всё об условиях работы, эскроу, правах на код и составе поставок.",
      items: [
        {
          q: "Что такое Workaround TCO Audit и почему $350?",
          a: [
            "Это вводный 24–48-часовой аудит операционных костылей по методологии TDABC (Time-Driven Activity-Based Costing). Я оцифровываю наблюдаемые потери на ручной труд (переписка в WhatsApp, сведение таблиц) и срезаю лишние подписки.",
            "На выходе вы получаете отчёт Via Negativa (запрет невыгодной автоматизации), спецификацию OpenAPI 3.0 и DDL схему PostgreSQL. $350 — пилотная цена для первых 10 аудитов (далее $490). 100% суммы засчитывается в оплату Спринта А или Б.",
          ],
        },
        {
          q: "Всегда ли вы пишете кастомный код с нуля?",
          a: [
            "Нет. На первом шаге я провожу строгий отбор. Если задачу решает проверенный опенсорсный инструмент (Twenty CRM, Outline, Cal.com), я не сжигаю ваш бюджет на велосипеды.",
            "Кастомный код пишется только там, где у вашего бизнеса есть уникальный процесс.",
          ],
        },
        {
          q: "Как меня защищает Upwork Direct Contracts Escrow?",
          a: [
            "Вы вносите оплату на защищённый эскроу-счёт Upwork Direct Contracts (5% комиссия, 0% клиенту). Я не прикасаюсь к капиталу до сдачи работ.",
            "Средства переводятся только после проверки работоспособности на живой демонстрации.",
          ],
        },
        {
          q: "Кому принадлежат права на созданный код и инфраструктуру?",
          a: [
            "Вы получаете 100% исключительные права на исходный код и архитектуру по классификатору EU NACE 62.01 сразу после закрытия вехи в эскроу.",
            "Репозиторий передаётся в ваш GitHub, доступы к серверам остаются только у вас.",
          ],
        },
        {
          q: "Что входит в 7-дневную гарантийную поддержку (SLA)?",
          a: [
            "В течение 7 дней после релиза я бесплатно и в приоритетном порядке закрываю любые инциденты P1 (падение сервиса) и P2 (сбой ключевого сценария) за 24 часа.",
          ],
        },
      ],
    },
    cta: {
      badge: "Пилотная квота — первые 10 аудитов",
      title: "Хватит сжигать бюджет. Запустите систему в этом месяце.",
      subtitle:
        "Я беру не более 3 инженерных спринтов в месяц для соблюдения строгих сроков. Оставьте короткий бриф — пришлю персональный 90-секундный Loom-разбор и эскроу-ссылку.",
      thankYouTitle: "Бриф получен.",
      thankYouLoom: "В течение 4 рабочих часов пришлю приватный 90-секундный Loom-разбор вашего узкого места на Email",
      thankYouEscrow: "В этот же Loom войдёт точный объём аудита и защищённая ссылка на эскроу Upwork Direct Contracts ($350, 0% комиссии для вас).",
      thankYouTriage: "Нужно живое обсуждение до аудита?",
      triageBtn: "Взять 15-минутный слот триажа →",
      fallbackNotice: "Форма не прошла: напишите напрямую — отвечу так же быстро.",
      fallbackBtn: "Написать в Telegram / LinkedIn →",
      labels: {
        email: "Рабочий Email *",
        messenger: "Telegram / WhatsApp / LinkedIn (опционально — для быстрой отправки Loom)",
        messengerPlaceholder: "@username или ссылка на профиль",
        bottleneck: "Главный засор в операционке *",
        stack: "Команда и текущий стек (кратко) *",
        stackPlaceholder: "Например: 8 сотрудников, запись вручную в WhatsApp + таблицы Excel, Remonline за $200/мес...",
        submitBtn: "Запросить аудит за $350 →",
        submitting: "Отправляю бриф...",
      },
      bottlenecks: {
        whatsapp: "Ручная запись в WhatsApp/Telegram, no-show и пустые окна",
        excel: "Хаос в таблицах: двойные брони, сверка счетов вручную",
        saasTax: "Переплачиваю за SaaS-лицензии — хочу FOSS-офис ($3,500)",
        custom: "Нужна система записи на команду / кастомный спринт",
        other: "Другая операционная боль",
      },
      directLinks: {
        title: "Не готовы к аудиту? Задайте вопрос по архитектуре напрямую:",
        note: "Оплата — только через защищённый эскроу Upwork Direct Contracts (5% комиссия) со 100% отчуждением прав на код.",
      },
    },
  },
  en: {
    hero: {
      badge: "3X SALESFORCE CERTIFIED ARCHITECT | ZERO SAAS TAXES | UPWORK ESCROW VERIFIED",
      title1: "Stop Burning $15k–$40k/Yr on",
      titleAccent: "SaaS Seat Taxes",
      title2: "& Manual Workarounds.",
      subtitle:
        "I perform a 48-Hour Workaround TCO Audit using Time-Driven Activity-Based Costing (TDABC): I pinpoint exact manual labor payroll leaks, eliminate redundant subscriptions, and deliver an OpenAPI 3.0 specification with a Docker mock. Pilot price $350 (then $490). 100% credited toward implementation.",
      ctaPrimary: "Request the Audit for $350 →",
      ctaSecondary: "Explore Grand Slam FOSS Stack",
      microcopy:
        "Pilot quota: first 10 audits at $350 instead of $490 (Demand Gate). You get a personal 90-second Loom teardown within 4 business hours. Payment via Upwork Direct Contracts escrow (5% fee, 0% for you). NACE 62.01.",
      badges: {
        escrow: { label: "Escrow Protection", value: "Upwork 5% Escrow" },
        sla: { label: "Turnaround SLA", value: "48-Hour Forensics" },
        viaNegativa: { label: "Via Negativa", value: "Anti-Waste Guarantee" },
        ip: { label: "IP Ownership", value: "100% Code Transfer" },
        tax: { label: "Tax Compliance", value: "NACE 62.01 Code" },
      },
    },
    tagline: {
      directive: "VIA NEGATIVA DIRECTIVE",
      words:
        "If your operational workflow relies on manual copy-paste across WhatsApp, fragmented Excel sheets, and expensive SaaS seat taxes, you are paying a permanent invisible tax on human friction.".split(
          " "
        ),
      author: "— UnderUndre Engineering Manifesto §18.9",
    },
    telemetry: {
      badge: "Engineering Delivery Standard",
      title: "Every audit runs through the same typed pipeline I ship for client systems.",
      subtitle:
        "Every brief, validation, and artifact goes through a strict typed pipeline: no eyeballing, only schemas, contracts, and failure alerts.",
      ctaPrimary: "Request your audit ($350) →",
      ctaSecondary: "Code & artifacts on GitHub",
      cards: [
        {
          step: "01 / INGEST",
          title: "Webhook Ingest",
          desc: "Raw JSON payload received from intake endpoints.",
        },
        {
          step: "02 / ZOD GUARD",
          title: "Zod Schema Node",
          desc: "Runtime validation via TypeScript Zod. Corrupted packets trapped immediately.",
        },
        {
          step: "03 / TELEMETRY & TRIAGE",
          title: "Telemetry Triage",
          desc: "Intent classification and task priority scoring in <1.2 seconds.",
        },
        {
          step: "04 / DB STORAGE",
          title: "Supabase RLS DB",
          desc: "Encrypted write to PostgreSQL with strict Row Level Security (RLS) policies.",
        },
        {
          step: "05 / INCIDENT DLQ",
          title: "Telegram DLQ",
          desc: "Instant dispatch to engineering channel with one-click replay for quarantined packets.",
        },
      ],
    },
    pricing: {
      badge: "Sovereign Product Ladder — Fixed Price & SLA",
      title: "Fixed-Price Product Ladder. Zero Hourly Billing.",
      subtitle:
        "Pick your entry point: a 48-hour Workaround TCO Audit at $350 or a turnkey license-free FOSS office stack. Funds stay protected in Upwork Direct Contracts Escrow (5% fee).",
      card0: {
        heroTag: "PILOT — FIRST 10 AUDITS (100% CREDITED)",
        tier: "PRODUCT 0 — 48H WORKAROUND AUDIT",
        title: "Workaround TCO Audit & Architecture Spec",
        desc: "Low-risk entry under corporate card limits ($500). Odometer for manual labor payroll leaks & SaaS waste using TDABC.",
        price: "$350",
        priceAnchor: "instead of $490 after the pilot ten",
        flatFee: "flat fee",
        creditNote: "100% credited toward Sprint A or B implementation",
        turnaround: "Turnaround: 24–48 Hours SLA",
        deliverablesTitle: "Included Deliverables (EU NACE 62.01):",
        deliverables: [
          "TDABC Cost Forensics: uncovers WhatsApp copy-paste, billing reconciliation & DSO leaks.",
          "Official Via Negativa Verdict: stops wasteful automation when switching costs exceed savings.",
          "OpenAPI 3.0 specification for automated bypass.",
          "PostgreSQL DDL schema & Docker Compose mock container.",
        ],
        demandGate: "Demand Gate: Required first step before executing large custom engineering sprints.",
        cta: "Request the Audit for $350 →",
      },
      card1: {
        tier: "SPRINT A — FOSS OFFICE STACK",
        title: "B2B Operations & Office Stack",
        desc: "Erase $15k–$40k/yr in SaaS seat taxes (Salesforce, Notion, Linear, Intercom) with private cloud FOSS on Hetzner.",
        price: "$3,500",
        flatFee: "setup flat fee",
        retainer: "+ $500/month monitoring & Restic backup retainer",
        delivery: "Delivery: 3 to 5 Business Days",
        scopeTitle: "Included Scope (Fixed Scope):",
        scope: [
          "Twenty CRM / EspoCRM: 0 seat licenses, full data ownership.",
          "FOSS Suite: Outline (Docs), Plane (Tasks), Chatwoot (Inbox), Cal.com.",
          "Docker Compose Memory Fencing: 16GB NVMe Swap against OOM.",
          "Dedicated n8n workflow instance or Trigger.dev v3 tasks.",
          "Traefik v3 reverse proxy with automated Let's Encrypt SSL.",
        ],
        deployment: "Deployment: Single Hetzner CPX42 (€82.69/mo). Emergency cash-flow valve.",
        cta: "Discuss FOSS Office ($3,500) →",
      },
      card2: {
        tier: "SPRINT B — POST-AUDIT SPRINT",
        title: "Sovereign Booking & Custom Systems",
        desc: "Turnkey booking platform for multi-staff service businesses (3–25 employees). Available upon successful TCO audit completion.",
        price: "$4,900",
        flatFee: "flat fee",
        gatedNote: "Available Upon TCO Audit Completion",
        delivery: "Delivery: 14 Calendar Days Flat",
        scopeTitle: "Included Scope (Fixed Scope Knife):",
        scope: [
          "Branded business page + public per-master pages with portfolio & services.",
          "Online booking: catalog, schedule, free slots, confirm/cancel, double-booking protection.",
          "Three roles: OWNER / OPERATOR / PERFORMER, individual accounts, access revocation.",
          "ru/en out of the box; currency, timezone & branding via configuration.",
        ],
        gatedNotice: "Gated SKU: start with the $350 TCO Audit to qualify for this 14-day production sprint.",
        cta: "Request via TCO Audit First →",
      },
    },
    fork: {
      badge: "For Sprint B Clients Who Outgrow the Template",
      title: "Fork & Care: Custom Development on Your Sprint B Base",
      subtitle:
        "Niche workflows, non-standard payment gateways, extra languages, integrations. Your custom code lives in isolated adapters — the core template stays untouched.",
      step1: "Step 1 — Fork Deployment (one-time)",
      step2: "Step 2 — Monthly Care (required 3–6 months with any fork)",
      step3: "Step 3 — Change Packs (results, not hours)",
      cards: [
        {
          title: "Fork Foundation",
          subtitle: "Clean Sprint B Deploy",
          price: "$4,900",
          details: "Hetzner VPS · Docker · Traefik · Postgres · branding · bots · crypto/Stars — zero custom code.",
          cta: "Start Fork Foundation →",
        },
        {
          title: "Fork Tailored",
          subtitle: "Sprint B + up to 25h customization",
          price: "$6,800",
          details: "Custom booking fields, niche adaptation, +1 integration. Care $349/mo.",
          cta: "Start Fork Tailored →",
        },
        {
          title: "Fork Enterprise-Lite",
          subtitle: "Complex scenarios & custom reports",
          price: "$8,900+",
          details: "Custom payment gateways, warehouse CRM sync, custom reporting. Care $349–$690/mo.",
          cta: "Discuss Enterprise →",
        },
      ],
    },
    opsec: {
      badge: "Zero Risk & Instant Contract Protocol",
      title: "How I Eliminate 100% of Your Financial and Technical Risk.",
      subtitle:
        "You never transfer money to unverified personal accounts. I utilize standardized escrow mechanisms (Upwork Direct Contracts) or instant e-Signed agreements.",
      steps: [
        {
          num: "1",
          title: "Escrow & TCO Audit (Day 1)",
          desc: "You fund escrow safely. I audit your business model using TDABC: if a battle-tested engine fits best, I leverage it. If proprietary architecture is required, I lock custom DDL schemas.",
        },
        {
          num: "2",
          title: "Conveyor Build & Staging (Days 1–13)",
          desc: "Development runs in an isolated bureau staging environment. You get private staging preview URLs and walkthroughs to inspect live progress with zero blind spots.",
        },
        {
          num: "3",
          title: "Live Verification & Handover (Day 14)",
          desc: "A 60-minute live session. I execute a live $1 test transaction to verify the pipeline. Upon confirming functionality, you authorize escrow release and receive 100% Git repo ownership.",
        },
        {
          num: "4",
          title: "7-Day Bugfix SLA",
          desc: "7 calendar days of post-release warranty. Any P1 (downtime) or P2 (broken flow) issues are resolved within 24 hours at zero additional cost.",
        },
      ],
      legalTitle: "LEGAL & COMPLIANCE STANDARD",
      legalH4: "NACE 62.01 Code Handover & DocuSeal ESIGN Protocol",
      legalDesc:
        "Source code, DDL SQL schemas, and OpenAPI specs are transferred under EU NACE 62.01 classification. Contracts signed via DocuSeal conform to ESIGN Act 2000 & eIDAS 910/2014 standards.",
      legalBadge: "ESIGN & NACE 62.01 CERTIFIED",
      commTitle: "COMMUNICATION PROTOCOL",
      commH4: "Async-First Velocity: Zero Meeting Fatigue",
      commDesc:
        "I protect your delivery timeline by eliminating daily Zoom overhead. Daily updates and build walkthroughs are delivered asynchronously via Loom and Telegram. Synchronous calls are strictly reserved for Day 1 Kickoff (30 min) and Day 14 Live Verification (60 min).",
      commBadge: "100% BUILD FOCUS",
    },
    comparison: {
      badge: "Comparison",
      title: "Engineered Speed vs. Industry Standard Inefficiency.",
      subtitle: "See how Productized Engineering eliminates budget drag and unpredictable freelance timelines.",
      headers: {
        metric: "Evaluation Metric",
        underundre: "UnderUndre Productized Bureau",
        agencies: "Traditional Software Agencies",
        freelancers: "Marketplace Freelancers",
      },
      rows: [
        {
          metric: "Delivery Timeline",
          underundre: "3–14 Calendar Days (Guaranteed)",
          agencies: "3 to 6 Months",
          freelancers: "Unpredictable (2–12 Weeks)",
        },
        {
          metric: "Pricing Structure",
          underundre: "$350–$490 Audit / $3,500 – $4,900 Sprint",
          agencies: "$30,000 – $60,000+ (T&M)",
          freelancers: "$30–$80/hr (Scope bloat)",
        },
        {
          metric: "CRM User Seat Fees",
          underundre: "$0 / month (Self-Hosted Open Source)",
          agencies: "$15,000 – $35,000 / yr (Salesforce/HubSpot)",
          freelancers: "No CRM integration included",
        },
        {
          metric: "Capital Security",
          underundre: "100% Upwork Escrow Protection",
          agencies: "50% non-refundable upfront deposit",
          freelancers: "100% upfront or weekly tracking",
        },
        {
          metric: "Architecture Quality",
          underundre: "Next.js 15 + Supabase + Zod Types",
          agencies: "Over-engineered legacy stack",
          freelancers: "Undocumented spaghetti code",
        },
      ],
    },
    vibeWarning: {
      badge: "The $10,000/Week Vibe-Coding Trap",
      title: "Plan Architecture First — Or Pay Rescue Teams $10,000/Wk to Delete AI Slop.",
      desc: "Unstructured 'vibe-coding' in AI editors creates a dangerous illusion of speed. Without upfront technical specifications, strict schema modeling (DDL), and security guardrails (Zod + Supabase RLS), LLMs generate bloated, duplicate codebases filled with silent API leaks.",
      fateTitle: "The Vibe-Coded Fate",
      fateDesc:
        "100,000 lines of unmaintainable prompt spaghetti. You end up hiring $10k/week cleanup agencies (like Slopfix) just to delete 65% of the bloat and patch data leaks.",
      standardTitle: "The UnderUndre Standard",
      standardDesc:
        "Zero premature over-engineering. I deploy Shopify/FOSS cores when standard solutions suffice + custom Next.js 15 landing funnels, or full-stack Supabase DDL architectures when proprietary scale demands it.",
      ruleOfThumb:
        "Rule of Thumb: Bring a clear business flow and technical boundaries. I engineer durable infrastructure, not disposable prototype slop.",
    },
    faq: {
      badge: "Clarity & Ground Rules",
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about my process, escrow terms, code ownership, and technical deliverables.",
      items: [
        {
          q: "What is the Workaround TCO Audit, and why $350?",
          a: [
            "My introductory 24–48h TDABC audit uncovers hidden manual labor payroll leaks (e.g. WhatsApp copy-paste, billing reconciliation) and bloated SaaS subscriptions.",
            "I deliver an official Via Negativa verdict (stopping wasteful automation when switching costs are too high) along with a complete OpenAPI 3.0 specification and PostgreSQL DDL schema. $350 is the pilot price for the first 10 audits (then $490). 100% of the fee is credited toward Sprint A or B.",
          ],
        },
        {
          q: "Do you always build custom full-stack code from scratch?",
          a: [
            "No. I practice pragmatic architecture triage on Day 1. If an existing FOSS tool solves your backend needs without seat taxes, I won't waste your runway reinventing the wheel.",
            "I only build custom applications when your business model genuinely requires proprietary workflows.",
          ],
        },
        {
          q: "How does Upwork Direct Contracts Escrow protect my capital?",
          a: [
            "You deposit the flat fee directly into Upwork Direct Contracts (5% fee, 0% client fee). I never touch your capital upfront.",
            "Funds are released only upon successful deployment and live verification during Day 14 onboarding.",
          ],
        },
        {
          q: "Who owns the code, intellectual property, and hosting?",
          a: [
            "You receive 100% exclusive intellectual property and source code ownership upon sprint completion and escrow release, under EU NACE 62.01 classification.",
            "The repository is transferred directly to your GitHub, and servers remain entirely under your control.",
          ],
        },
        {
          q: "What is covered under the 7-Day Bugfix SLA?",
          a: [
            "For 7 calendar days post-deployment, I provide priority incident resolution. Any P1 (system outage) or P2 (broken workflow) defect is resolved within 24 hours at zero charge.",
          ],
        },
      ],
    },
    cta: {
      badge: "Pilot Quota — First 10 Audits",
      title: "Stop Burning Runway. Ship Your Product This Month.",
      subtitle:
        "I accept only 3 engineering sprints per month to enforce my strict delivery SLA. Leave a short brief — you get a personal 90-second Loom teardown and the escrow link.",
      thankYouTitle: "Brief received.",
      thankYouLoom: "Within 4 business hours I will send a private 90-second Loom teardown of your bottleneck to your Email",
      thankYouEscrow: "The teardown includes the exact audit scope and a secure Upwork Direct Contracts escrow link ($350, 0% client fees).",
      thankYouTriage: "Need a live discussion before the audit?",
      triageBtn: "Book a 15-min Triage Slot →",
      fallbackNotice: "The form did not go through: message me directly — same fast response.",
      fallbackBtn: "Message me on Telegram / LinkedIn →",
      labels: {
        email: "Work Email *",
        messenger: "Telegram / WhatsApp / LinkedIn (optional — for fast Loom delivery)",
        messengerPlaceholder: "@handle or profile link",
        bottleneck: "Primary operational bottleneck *",
        stack: "Team & current stack (briefly) *",
        stackPlaceholder: "e.g. 8 staff, bookings handled manually in WhatsApp + Excel sheets, Remonline at $200/mo...",
        submitBtn: "Request the Audit for $350 →",
        submitting: "Sending brief...",
      },
      bottlenecks: {
        whatsapp: "Manual WhatsApp/TG booking, no-shows and empty slots",
        excel: "Spreadsheet chaos: double bookings, manual billing reconciliation",
        saasTax: "Overpaying for SaaS licenses — want a FOSS office ($3,500)",
        custom: "Need a multi-staff booking system / custom sprint",
        other: "Other operational friction",
      },
      directLinks: {
        title: "Not ready for the audit? Ask an architecture question directly:",
        note: "Payment only via secure Upwork Direct Contracts escrow (5% fee) with 100% IP code transfer.",
      },
    },
  },
};

export function getUnderundreCopy(lang: "ru" | "en"): UnderundreCopy {
  return underundreCopy[lang] || underundreCopy.en;
}
