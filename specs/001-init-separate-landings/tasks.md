# Tasks: Multi-Project Isolated Landing Engine

**Repository**: `undrllanding` | **Directory**: `specs/001-init-separate-landings`  
**Created**: 2026-08-16 | **Spec**: [`spec.md`](./spec.md) | **Plan**: [`plan.md`](./plan.md)

---

## Task Breakdown

### Phase 1: Directory Restructuring & Resolver (Priority: P1) [US1]

- [X] **TASK-101** `[FE]` `[US1]`: Refactor `undrllanding` directory structure: create `projects/undrlla/` and move existing Medusa lander components.
- [X] **TASK-102** `[FE]` `[US1]`: Create `lib/project-config.ts` project resolver inspecting `process.env.NEXT_PUBLIC_PROJECT_NAME`.
- [X] **TASK-103** `[FE]` `[US1]`: Update `app/(default)/page.tsx` and root metadata to render active project config dynamically.

---

### Phase 2: Undreseller Landing Components (Priority: P1) [US1]

- [X] **TASK-201** `[FE]` `[US1]`: Create `projects/undreseller/config.ts` and `projects/undreseller/components/hero-undreseller.tsx`.
- [X] **TASK-202** `[FE]` `[US1]`: Create `projects/undreseller/components/sprint-pricing.tsx` displaying $3,500 B2B Automation and $4,900 14-Day SaaS MVP cards.
- [X] **TASK-203** `[FE]` `[US1]`: Create `projects/undreseller/components/loom-demo-section.tsx` displaying 90-second Loom video teardown.
- [X] **TASK-204** `[FE]` `[US1]`: Add Upwork Direct Contracts Escrow (0% fee) and 7-Day SLA trust badges to Undreseller lander.

---

### Phase 3: Build Verification & Deployment (Priority: P2) [US1]

- [X] **TASK-301** `[E2E]` `[US1]`: Test `NEXT_PUBLIC_PROJECT_NAME=undreseller pnpm dev` and verify Undreseller lander renders cleanly.
- [X] **TASK-302** `[E2E]` `[US1]`: Test `NEXT_PUBLIC_PROJECT_NAME=undrrlla pnpm dev` and verify fallback to Undrlla lander.
- [X] **TASK-303** `[E2E]` `[US1]`: Run `pnpm build` under both environment configurations to ensure zero TypeScript/hydration build errors.

---

## Dependency Graph

```text
TASK-101 → TASK-102 → TASK-103
TASK-201 → TASK-202 → TASK-203 → TASK-204
TASK-301 → TASK-302 → TASK-303
```

---

## Parallel Lanes

| Lane | Assigned Tasks | Agent Domain |
|---|---|---|
| Lane 1 (Resolver & Core Layout) | TASK-101, TASK-102, TASK-103 | Frontend (`[FE]`) |
| Lane 2 (Undreseller Components) | TASK-201, TASK-202, TASK-203, TASK-204 | Frontend (`[FE]`) |
| Lane 3 (Build & Verification) | TASK-301, TASK-302, TASK-303 | Test Engineer (`[E2E]`) |

---

## Agent Summary

| Tag | Count | Description |
|---|---|---|
| `[FE]` | 7 | Next.js UI components, layout, and project resolver |
| `[E2E]` | 3 | Verification testing and production build checks |

---

## Definition of Done

- All tasks checked and verified.
- `NEXT_PUBLIC_PROJECT_NAME=undreseller` builds and renders Undreseller lander cleanly.
- `NEXT_PUBLIC_PROJECT_NAME=undrlla` builds and renders Undrlla lander cleanly.
- `pnpm build` succeeds with zero errors.
