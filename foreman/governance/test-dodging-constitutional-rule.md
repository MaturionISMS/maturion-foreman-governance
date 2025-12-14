# Test Dodging Constitutional Rule

## Status
CONSTITUTIONAL — ABSOLUTE

## Definition

Test Dodging is any action, explicit or implicit, that avoids confronting
a failing, incomplete, or inaccurate QA signal in order to continue execution.

Test Dodging is a governance violation, not a technical decision.

Intent is irrelevant.
Effect is decisive.

---

## Prohibited Actions (Non-Exhaustive)

Test Dodging includes, but is not limited to:

### Direct Test Avoidance
- Skipping tests
- Disabling tests
- Commenting out assertions
- Using `.skip`, conditional exits, or environment guards
- Reducing coverage to achieve GREEN

### Structural or Indirect Dodging
- Empty test suites
- Placeholder tests without assertions
- Narrowing assertions to avoid failures
- Rewriting tests to always pass
- Reclassifying behavior tests as “structure-only” to avoid failure
- Adjusting tests instead of fixing the implementation

### Process-Level Dodging
- Proceeding with partial GREEN
- Labeling failures as “minor” or “non-critical”
- Deferring test fixes to later issues
- Proceeding due to urgency or scope pressure
- Treating helper or infrastructure failures as ignorable

All such actions are constitutionally equivalent.

---

## Enforcement

Upon detection of Test Dodging:

1. Execution MUST STOP immediately
2. A Test Dodging Incident MUST be registered
3. The incident MUST be escalated to Foreman
4. Test debt MUST be eliminated fully
5. Full QA MUST be re-run to 100% GREEN
6. Execution may resume ONLY after resolution

No exceptions.
No overrides without constitutional amendment.

---

## Relationship to Zero Test Debt

Test Dodging is the primary mechanism by which test debt accumulates.

Therefore:
- Zero Test Debt enforcement IMPLICITLY requires Test Dodging prevention
- Any Test Dodging incident is also a Test Debt incident

---

## Rationale

Broken code fails loudly.
Test Dodging allows the system to lie to itself.

Autonomous systems cannot survive lies.

Truthful QA is a non-negotiable safety requirement.
✅ This document makes test dodging a crime against the system, not a style issue.

