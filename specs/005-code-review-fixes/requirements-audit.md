# Requirements Audit Report: 005-code-review-fixes

- **Standard**: ISO/IEC/IEEE 29148:2018 (Clauses 5.2.5 & 5.2.6)
- **Status**: **PASS** (1 non-blocking remediation note, see §2)
- **Audit Date**: 2026-11-02
- **Auditor**: ZCode (Valera Digital Plumber Standard)
- **Feature Target**: `undrllanding/specs/005-code-review-fixes/spec.md`
- **Input artifacts**: `docs/reviews/code-review-antigravity.md`, `docs/reviews/security-audit-antigravity.md` (commit `cd57751`)

---

## 1. Стоп-слова и неквантованные метрики (Gate 1)

- **Обнаружено нарушений**: **0**

Ключевые формулировки проверены на квантованность:

- FR-001: `name` — printable без `"`, ≤80 символов; `domain` — regex `/^[a-z0-9.-]+$/i`, ≤253 — детерминированный pass/fail.
- FR-003: eviction при size > 10,000; заголовок `LEAD_TRUSTED_IP_HEADER` env-конфигурируем — бинарная проверка.
- FR-004: точные заголовки и CSP-строка (`max-age=63072000; includeSubDomains`, `frame-ancestors 'none'`) — curl-проверка.
- FR-005: re-anchor внутри `public/` + allowlist `.svg/.png/.ico` + per-route CSP — бинарный тест.
- FR-008: ключи ≤50 символов, `.finite()` для чисел — unit-тест.
- US3-AC2: 10 запросов → 6-й возвращает 429 — точное число.
- SC-003: «ноль CRITICAL/HIGH при повторном аудите» — измеримо повторным прогоном.

Стоп-слов из списка гейта (`fast`, `secure`, `удобно`, `scalable`, `периодически`…) в тексте требований не обнаружено.

## 2. Матрица конфликтов (Gate 2: Consistency Cross-Check)

| ID 1 | ID 2 | Суть взаимодействия | Статус |
|---|---|---|---|
| FR-013 (gitleaks: rejection токен-формы `[0-9]{8,10}:[A-Za-z0-9_-]{30,}`) | Существующие плейсхолдеры `.env.example` (`1234567890:ABCdef…`) | **Ложноположительное срабатывание**: плейсхолдер совпадает с токен-формой → hook заблокирует легитимные коммиты. Разрешение: allowlist-правило в gitleaks config для `*.example`. Зафиксировать в plan/tasks. | RESOLVED (требование к плану) |
| FR-004 (security headers на всех ответах) | NFR-001 (byte-identical HTML baseline) | Не конфликт: заголовки вне HTML-тела; но verify-gates byte-diff должен сравнивать только тело ответа, не headers. Зафиксировать в контракте гейта V3. | RESOLVED (требование к плану) |
| FR-003 (fallback на socket remote address) | NFR-003 (zero-config default) | Дополнение: без env-переменной лимитер работает на remote address — sane default сохранён. | PASS |
| FR-009 (runtime typed errors) | FR-010 (build fail на registry miss) | Разные фазы: runtime (error boundary 500) vs build-time (throw). Не пересекаются. | PASS |
| FR-005 (re-anchor в `public/`) | 004 FR-008 (source-of-truth `public/projects/<slug>/`) | Дополнение: re-anchor не сужает легитимные пути брендов — все они внутри `public/`. | PASS |
| FR-011 (удаление `.faq` блоков из locales) | 004 US3 (FAQ рендерится из `data/faq.json`) | Не конфликт: JSON — канон, locales-копия мертва (подтверждено ревью F-14). | PASS |

Неразрешённых логических конфликтов: **0**.

## 3. Анализ полноты (Gate 3: Boundary & Failure Coverage)

- **Edge-cases: ДА** — path traversal (`../`, абсолютные пути), flood ротированными IP (429 + bounded map), injection через `$&`/`"` в имени бренда, mid-run сбой scaffold (rollback), N=0 метаданных (optional record), N=MAX (20 ключей / 10,000 записей карты).
- **Fallback-стратегии: ДА** — `LEAD_TRUSTED_IP_HEADER` отсутствует → socket address; gitleaks плейсхолдеры → allowlist; registry miss → build fail (вместо silent fallback).
- **Таймауты/гонки: ДА** — существующие 4s `AbortSignal.timeout` на внешних вызовах сохраняются; FR-017 закрывает setState-after-unmount; Content-Length pre-check против буферизации больших тел.
- **Ошибочные состояния UI: ДА** — error boundary вместо `process.exit` (FR-009); 500-страница остаётся generic (S-08 фиксируется field-paths).
- Замечание: поведение rate limiter при пустом (unset) заголовке от не-Caddy деплоя определено (fallback) — покрытие полное.

## 4. Однозначность (Gate 4)

- Терминология единая: «rate limiter», «icon route», «registry», «trusted header», «scaffold» — без синонимических скачков.
- Все 26 находок аудитов сведены в Disposition Map (раздел 6 спеки) — двойного толкования границ скоупа нет.
- «printable» в FR-001 уточнено негативным тестом (нет `"`, длина ≤80) — проверяемо.

## 5. Итоговый статус гейта

- **GATE VERDICT: PASS**
- Нарушений: Gate 1 — 0; Gate 2 — 0 (2 требования к плану зафиксированы); Gate 3 — 0; Gate 4 — 0.
- Байпас не применялся.
- **Business plan**: unchanged (техдолг-закалка; ICP/цены/гейты не затронуты).

### Требования к plan.md (переносятся в план)

1. Зафиксировать gitleaks allowlist для `*.example` плейсхолдеров (иначе hook блокирует репо).
2. Уточнить контракт гейта V3 (004 verify-gates): byte-diff сравнивает тело ответа, исключая security headers, добавленные FR-004.
