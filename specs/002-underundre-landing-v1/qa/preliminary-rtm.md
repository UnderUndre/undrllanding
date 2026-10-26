# Preliminary Requirements Traceability Matrix (Draft RTM)

**Feature**: `002-underundre-landing-v1`  
**Standard**: ISO/IEC/IEEE 29148:2018 (Clauses 5.2.5 & 5.2.6)  
**Date**: 2026-10-26  
**Status**: Active Baseline for Plan & Test Stages

---

## 1. Risk-Based Testing Matrix

| Req ID | Тип | Формулировка / Скоуп | Impact (1–5) | Prob (1–5) | Risk Score | Категория Риска | Обязательные техники верификации | Planned Verification Level |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FR-001** | FR | Hero TCO Audit ($490) + Loss Framing + Upwork Escrow | 5 | 3 | **15** | High | Copy match, CTA link destination check, Upwork URL syntax | Visual QA + Functional Smoke |
| **FR-002** | FR | 3-Tier Product Ladder ($490 / $3.5k / $4.9k) | 5 | 3 | **15** | High | Pricing accuracy check, post-audit gating badge check | Visual QA + Content Audit |
| **FR-003** | FR | Lead Capture Route (`/api/lead`) + Zero Lead Loss Fallback | 5 | 4 | **20** | **Critical** | Zod Schema Validation, Error Injection, Fallback Mailto Trigger, Telegram Dispatch | Integration Test + Manual Failover |
| **FR-004** | FR | Brand & Metadata Decontamination (Purge Medusa 2.0 & Undrlla title) | 4 | 3 | **12** | Medium | Head metadata inspection, Title template check, Footer slug switch | Unit / Integration Test |
| **FR-005** | FR | Favicon Replacement (2.8 MB SVG → `favicon.ico`) | 4 | 2 | **8** | Medium | Network payload inspection (<15 KB), Mime-type verification | Network / Performance Pass |
| **FR-006** | FR | Navigation & Section Anchor Integrity (`#audit`, `#comparison`, `#opsec`) | 4 | 2 | **8** | Medium | Navigation click-through, Anchor scroll positioning | Functional QA |
| **FR-007** | FR | Telemetry Section Typo Fix ("AI AI" → "03 / TELEMETRY & TRIAGE") | 3 | 2 | **6** | Medium | String assertion, Architecture spec card review | Content Verification |
| **FR-008** | FR | Umami Self-Hosted Analytics Script Integration | 3 | 3 | **9** | Medium | Script injection check (env present vs env absent) | Integration Smoke |
| **FR-009** | FR | Open Graph & Twitter Social Card Tags | 4 | 2 | **8** | Medium | Social card metadata validator, DOM query inspection | SEO / Metadata Audit |
| **FR-010** | FR | Deterministic `preview.html` Static Mirror | 3 | 2 | **6** | Medium | Standalone browser render, Copy parity diff | Automated HTML Audit |
| **NFR-001** | NFR | Core Web Vitals ($\text{LCP} \le 1.5$s, $\text{CLS} = 0$, $\text{FCP} \le 1.0$s) | 5 | 3 | **15** | High | Lighthouse Performance Run, Network Throttling Pass | Performance Gate |
| **NFR-002** | NFR | Mobile Viewport ($\ge 320$px, `scrollWidth <= innerWidth`) | 4 | 3 | **12** | Medium | Playwright Responsive Emulation (320px, 375px, 768px, 1440px) | Automated E2E |
| **NFR-003** | NFR | Accessibility (WCAG 2.1 AA $\ge 4.5:1$ Contrast, Touch Targets $\ge 44$px) | 4 | 3 | **12** | Medium | `axe-core` accessibility audit, Color picker contrast check | A11y Audit |
| **NFR-004** | NFR | Closed-Loop Visual Feedback (Dual Viewport Screenshots 375px / 1440px) | 5 | 4 | **20** | **Critical** | Browser Automation Render, Font-ready sync, Visual Review Pass ($k \le 3$) | Visual Gate (Actor-Critic) |

---

## 2. Критические требования (Risk $\ge 20$) — Протокол Верификации

1. **FR-003 (Lead Capture Route & Fallback)**:
   - *Техники:* Decision Table + Fault Injection + State Transition.
   - *Условие приёмки:*
     - Валидный ввод $\to$ 200 OK + отправка алерта (или сохранение).
     - Невалидный ввод (плохой email, пустые поля) $\to$ 400 Bad Request с точными Zod ошибками.
     - Серверная ошибка или отсутствие сети $\to$ автоматическое открытие fallback-модалки с `mailto:` и ссылкой на Upwork Direct Contracts. Ни один лид не пропадает.
2. **NFR-004 (Visual Feedback Loop)**:
   - *Техники:* Browser Use / Playwright Headless + `document.fonts.ready` + Visual Review.
   - *Условие приёмки:*
     - Рендер на 375px (эмуляция iPhone) с DPR=3: отсутствие горизонтального скролла, читаемые бейджи, корректный перенос длинных строк.
     - Рендер на 1440px: правильная центровка контейнеров, соблюдение вертикального ритма отступов.
