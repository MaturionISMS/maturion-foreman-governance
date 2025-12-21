# PR SCOPE CONTROL POLICY

## Status
Canonical Governance Policy  
Version: v1  
Authority: Governance  
Applies To: All Builders, All PRs, All Repositories

---

## 1. Purpose

This policy prevents cascading failures caused by excessive initial scope.

Large-scope work destroys diagnostic clarity by aggregating unrelated causes,
leading to repeated CI failures with non-local root causes.

This is a governance risk, not a style concern.

---

## 2. Canonical Risk Declaration

### Risk: Cascading Failure via Scope Explosion

When multiple independent responsibility domains are changed in a single PR,
failures become non-local, non-diagnostic, and self-reinforcing.

This risk is treated with the same severity as:
- governance drift
- test dodging
- silent audit failure

---

## 3. Single-Responsibility PR Rule (Non-Negotiable)

A PR may address **exactly one** responsibility domain.

Examples of responsibility domains:
- Database lifecycle (schema, migrations, pooling)
- Email delivery
- Logging / audit
- Error handling
- Test infrastructure
- CI workflows

“Related” is not sufficient.
“Already touching it” is not sufficient.
“Easier together” is not sufficient.

Builder-facing rule:
> If a PR cannot be named with a single noun phrase, it is too large.

---

## 4. Mandatory Pre-PR Scope Declaration

Before opening a PR, the Builder MUST submit a Scope Declaration.

If the Builder cannot complete the declaration cleanly, the PR must not start.

### Scope Declaration Template

## Scope Declaration

### PR Responsibility Domain
(Exactly one responsibility)

### Explicitly In Scope
- Item A
- Item B

### Explicitly Out of Scope
- Email
- Logging
- Tests
- CI
- Migrations
- Deployment
- Infra

### Expected Verification Signal
- CI: GREEN
- Tests: unchanged / GREEN
- Governance Gates: GREEN

---

## 5. Incremental GREEN Gate (Hard QA Rule)

A PR must reach GREEN in isolation before any additional responsibility is introduced.

Rules:
- Fix one domain → CI GREEN → STOP
- If a second domain is required, open a new PR with a new scope declaration

Prohibited:
- “We’ll fix tests later”
- “It will be green after the next change”
- “Let’s bundle while we’re here”

---

## 6. QA CHECK: Scope Isolation (Add verbatim to QA checklists)

- [ ] PR addresses exactly one responsibility domain
- [ ] No unrelated subsystems touched
- [ ] CI is GREEN before additional changes
- [ ] Tests are unchanged unless tests are the explicit scope
- [ ] Failure signals are attributable to one cause only

If any item is false → QA = RED.

---

## 7. Cascading Failure Circuit Breaker

If a PR fails CI more than **3 consecutive times** with **different root causes**,
the PR MUST be closed and reset.

Not patched.
Not “one more retry”.
Closed.

This prevents compounding fixes and loss of causality.

---

## 8. Enforcement Principle

Causality preservation is a governance goal.

Small changes preserve observability.
Large changes destroy it.

This policy exists to preserve trust without requiring human code review.

---

End of PR SCOPE CONTROL POLICY
