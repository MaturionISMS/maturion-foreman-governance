# PR GATE PRECONDITION RULE

## Status
Canonical Governance Rule  
Authority: Johan Ras  
Applies To: All Builders, Foreman, Governance Administrator  
Precedence: Subordinate only to GOVERNANCE_PURPOSE_AND_SCOPE.md

---

## 1. Purpose

This rule enforces the One-Time Build Law by preventing
handover of builds that do not already satisfy all required PR gates.

PR gates exist to PROVE correctness.
They are not review suggestions, signals, or advisory checks.

---

## 2. Rule (Absolute)

A pull request MAY NOT be handed over, reviewed, or merged unless:

- All required PR gates are GREEN
- Gates were executed prior to handover
- Gate execution environment matches merge environment

“No green gate, no handover.”

---

## 3. Scope of Gates Covered

This rule applies to:
- Governance-level gates (completeness, dependency closure, compliance)
- FM-level gates (QA structure, learning enforcement, failure promotion)
- Any gate declared as REQUIRED by governance

Informational or advisory checks MUST be explicitly marked as such in governance.
All others are REQUIRED by default.

---

## 4. Prohibited Practices

The following are explicitly forbidden:
- Handing over with known gate failures
- Declaring confidence without proof
- Expecting governance enforcement to “catch up later”
- Treating PR gates as post-hoc validation

---

## 5. Failure Classification

If a PR gate fails after handover:
- The failure is SYSTEMIC, not executional
- Classified as a Governance or Architecture defect
- Requires learning intake and promotion

Repeated violations constitute a governance breach.

---

## 6. Enforcement

- Foreman enforces this rule operationally
- Governance Administrator audits and reports violations
- PRs violating this rule are INVALID by definition

---

## 7. Rationale

This rule exists to preserve:
- One-Time Build Law
- QA-as-proof philosophy
- Clean learning loops
- Causal accountability
- Auditability
- CI as confirmation (not discovery) per CI_CONFIRMATORY_NOT_DIAGNOSTIC.md

## 8. Related Documents

- CI_CONFIRMATORY_NOT_DIAGNOSTIC.md - Establishes preflight evaluation obligation
- PR_GATE_EVALUATION_AND_ROLE_PROTOCOL.md - Defines gate evaluation process
- AGENT_ROLE_GATE_APPLICABILITY.md - Defines which gates apply to which agents

---

End of PR GATE PRECONDITION RULE
