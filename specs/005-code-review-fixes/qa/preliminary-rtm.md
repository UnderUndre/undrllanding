# Preliminary Requirements Traceability Matrix (Draft RTM)

**Feature**: 005-code-review-fixes
**Drafted**: 2026-11-02 (after requirements-audit PASS)
**Scoring**: Risk = Impact (1–5) × Probability (1–5)

| Req ID | Тип | Формулировка (кратко) | Impact | Prob | Risk Score | Обязательные техники верификации | Planned Verification Level |
|---|---|---|---|---|---|---|---|
| FR-001 | FR | Валидация name/domain + function-form replaceAll в scaffold | 3 | 3 | 9 | EP (валид/инвалид имя: `Br"and`, `$&`, `<>`, пустое), негативные, partial-write тест | Automated (CLI test) |
| FR-002 | FR | Snapshot/restore реестра при сбое scaffold | 3 | 3 | 9 | Симуляция сбоя (mock validate exit 1), байт-сравнение реестра до/после | Automated (CLI test) |
| FR-003 | FR | Rate limiter: trusted header + eviction при size>10k | 4 | 4 | 16 | BVA (5/6 запросов, 60s окно), негативные (спуф XFF), симуляция флуда 10k+ уникальных IP, header-present/absent матрица | Automated (API test) + Manual (Caddy staging) |
| FR-004 | FR | Security headers (HSTS, CSP, XFO, nosniff, Referrer-Policy) enforcing | 4 | 3 | 12 | Contract test (curl на все роуты), CSP-отчёт в staging, негативные (iframe embed попытка) | Automated CI Pipeline |
| FR-005 | FR | Icon route: re-anchor, allowlist, async fs, SVG CSP | 4 | 2 | 8 | Негативные (`../.env`, абс. путь, не-allowlist расширение), EP по расширениям, заголовочный тест SVG | Automated (route test) |
| FR-006 | FR | vitest контур: pick/maskEmail/escapeHtml/schema/loaders | 4 | 3 | 12 | Unit-контур (fallback-матрица uk→en→ru→"", BVA полей схемы), coverage-порог на перечисленные функции | Automated CI Pipeline |
| FR-007 | FR | scripts/verify-gates.mjs (V1/V2/V2a/V3) по контракту 004 | 3 | 2 | 6 | Contract test гейтов на фикстурах (pass-файлы + заведомо битые), CLI --brand матрица | Automated CI Pipeline |
| FR-008 | FR | Metadata bounds: ключи ≤50, finite, Content-Length pre-check | 3 | 3 | 9 | BVA (49/50/51 символ, 20/21 ключ, 1e308), негативные (oversize body → rejection до чтения) | Automated (unit + API test) |
| FR-009 | FR | Loaders: typed error вместо process.exit | 3 | 2 | 6 | Симуляция битого JSON → error boundary 500 (не kill процесса), негативные на build-валидации | Automated (route test) |
| FR-010 | FR | Build fail на registry miss | 4 | 2 | 8 | Негативные (NEXT_PUBLIC_PROJECT_NAME=unknown → build fail), EP (alias undreseller резолвится) | Automated (build test) |
| FR-011 | FR | Удаление мёртвого кода (undrlla keys, .faq, ForkServiceLine, undrlla_lang) | 2 | 2 | 4 | Grep-скан = 0 вхождений, smoke обеих тем/языков | Automated (grep gate) |
| FR-012 | FR | Runner ENV passthrough + удаление /api/hello | 2 | 2 | 4 | docker config inspect, негативный (404 на /api/hello) | Automated (CI) |
| FR-013 | FR | Gitleaks hook + скан .history/ | 4 | 3 | 12 | Негативные (тестовый токен в коммит → reject), EP (.env.example allowlist → pass), скан-отчёт = 0 | Automated (pre-commit) + Manual |
| FR-014 | FR | Error map → field paths в прод; href https?: allowlist | 3 | 3 | 9 | Негативные (validation error → нет полной схемы), EP (javascript: href → schema reject) | Automated (API + schema test) |
| FR-015 | FR | Pin next exact + patches/README | 3 | 2 | 6 | package.json inspect, pnpm audit = 0 High/Critical | Automated (CI) |
| FR-016 | FR | generate-preview slug валидация + gitignore preview.html | 2 | 2 | 4 | Негативные (`../slug` → reject), позитивный под дефолтный slug | Automated (script test) |
| FR-017 | FR | AbortController в lead-формах | 2 | 3 | 6 | Симуляция unmount в ожидании ответа (React test), отсутствие warning | Automated (component test) |
| FR-018 | FR | Удаление page-level generateMetadata | 1 | 2 | 2 | Smoke OG-тегов из layout | Automated (grep + smoke) |
| NFR-001 | NFR | validate/test/build/verify green; байт-идентичность тела (кроме намеренных правок) | 4 | 3 | 12 | CI pipeline сквозной; byte-diff тела V3 (заголовки исключены) | Automated CI Pipeline |
| NFR-002 | NFR | Только vitest как новая dev-dep; ноль новых runtime-deps | 2 | 2 | 4 | package.json diff inspect | Automated (CI) |
| NFR-003 | NFR | Additive brand contract сохранён (003/004) | 4 | 2 | 8 | Scaffold+build смоук демо-бренда, schema-compat тест | Automated CI Pipeline |

## Комментарии к скорингу

- **High (16): FR-003** — rate limiter: единственная находка с живым внешним атакующим вектором на проде. Верификация: BVA по окну, спуф-негативы, флуд-симуляция, ручная проверка за Caddy.
- **Medium (12): FR-004, FR-006, FR-013, NFR-001** — периметр, тестовый контур, секреты, сквозной пайплайн: все закрываются автоматическими CI-гейтами.
- **Low (≤4): FR-011, FR-012, FR-016, FR-018, NFR-002** — гигиена и smoke-уровень.

Risk ≥ 20 (обязательные Decision Table + State Transition + Exploratory Charter + UAT): не назначено — ни одно требование не достигает критического порога, максимум 16 (FR-003, High-полоса: BVA + негативные + симуляция сбоев).

## Покрытие → следующий шаг

RTM передаёт в `plan.md` два обязательных архитектурных решения из аудита:
1. Gitleaks allowlist для `*.example` плейсхолдеров (иначе pre-commit hook блокирует репозиторий).
2. Контракт гейта V3 (004 verify-gates): byte-diff сравнивает тело ответа, исключая security headers из FR-004.
