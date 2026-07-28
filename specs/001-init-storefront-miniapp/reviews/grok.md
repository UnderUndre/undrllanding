# SpecKit Review: 001-init-storefront-miniapp

**Reviewer**: grok
**Reviewed at**: 2026-07-23T10:06:54Z
**Commit**: abe17c3efc40307f44092e7075dca7e38c984311
**Artifacts reviewed**: spec.md; repo reality (Cruip template); undrlla 001; ECOSYSTEM.md

## Summary

Spec describes a full commerce + TG + taxi/barter surface; **repository is still a generic landing template**. TG auth required here while undrlla defers it. Scope includes flagship modules before Wave-1 shop. plan/tasks absent.

## Findings

| ID | Severity | Area | Finding | Recommendation |
|---|---|---|---|---|
| F1 | CRITICAL | Artifacts / reality | No plan.md/tasks.md; code ≠ spec (Cruip README, no Directus cart). | Spec Wave-1 only; implement shop against undrlla contract; add plan/tasks. |
| F2 | CRITICAL | Consistency | Requires Telegram initData auth; undrlla FR-017 **defers** TG auth. | Align: implement undrlla TG auth first, or landing Wave-1 without Mini App login. |
| F3 | HIGH | Scope | P2 stories pull taxi/barter/MAQ before Tier-A shop proven. | ECOSYSTEM Wave-1: catalog/cart/checkout/booking only; feature flags for rest. |
| F4 | HIGH | Security | TG initData HMAC must be server-side; if landing calls Directus with elevated token, **IDOR risk**. | Browser uses user JWT only; never embed static admin tokens. |
| F5 | MEDIUM | Hidden assumption | Dynamic undesign from branding_settings — fails closed styling if Directus down? | Cached last-known theme + safe default theme. |
| F6 | MEDIUM | Stakeholder | "Approved" status vs empty implementation path. | Status → Draft until Wave-1 tasks exist. |

## Alternative approaches considered

- Separate flagship-web app (rejected in ECOSYSTEM — one codebase).
- Medusa storefront reuse from undrllegacy (migration cost).

## VERDICT

```yaml
verdict: CRITICAL
reviewer: grok
reviewed_at: 2026-07-23T10:06:54Z
commit: abe17c3efc40307f44092e7075dca7e38c984311
critical_count: 2
high_count: 2
medium_count: 2
low_count: 0
```
