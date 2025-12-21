# COMPLIANCE AND STANDARDS GOVERNANCE

## Status
Canonical Governance Policy  
Version: v1  
Authority: Johan Ras  
Applies To: All Apps, All Builds, Foreman Office, Builders, Governance Admin

---

## 1. Purpose

This policy defines how Maturion achieves **continuous audit readiness** and
**international standards compliance** across the entire build-and-maintain factory.

Compliance is not a statement. It is an enforced system property:
- controls are mapped
- evidence is generated
- audits are reproducible
- drift is blocked

---

## 2. Compliance Model

Maturion operates a three-layer compliance model:

1) **Standards Layer**  
   Defines which standards and control families apply.

2) **Control Implementation Layer**  
   Maps controls to:
   - architecture requirements
   - system design decisions
   - build gates and QA proofs

3) **Evidence & Audit Layer**  
   Produces:
   - machine-verifiable evidence
   - audit reports (ISO/NIST-aligned)
   - traceability from requirement → control → evidence

No control is considered implemented unless evidence is continuously producible.

---

## 3. Mandatory Standards Baseline

Unless explicitly excluded by governance for a specific app, the following are included:

### 3.1 ISO 27001 (Information Security Management System)
- ISMS controls must be mapped, evidenced, and auditable.
- Security controls must be verifiable in CI/QA and runtime evidence.

### 3.2 ISO 31000 (Risk Management)
- Risk assessments are required for material changes.
- Risk treatment decisions must be recorded, traceable, and reviewable.

### 3.3 NIST (minimum alignment)
- NIST CSF (Identify, Protect, Detect, Respond, Recover) used as a control lens
- NIST-aligned incident and operational maturity targets are tracked

Governance may later add:
- SOC 2 (Trust Services Criteria)
- GDPR/POPIA (privacy compliance where applicable)
- OWASP ASVS (application security verification)
- ISO 22301 (business continuity) if required by product scope

---

## 4. Compliance Artifacts (Required)

Each governed application MUST have a compliance folder in its governance-facing structure
(either in FM build records or an app governance mirror) containing:

- `COMPLIANCE_SCOPE.md`  
  Declares which standards apply and why.

- `CONTROL_MAPPING.md`  
  Maps controls to:
  - architecture artifacts
  - QA gates / tests
  - runtime evidence sources

- `EVIDENCE_CATALOG.md`  
  Enumerates all evidence items and where they are produced.

- `AUDIT_REPORT.md` (generated or reproducible)
  A structured report that can be reproduced on demand.

If an app does not have these artifacts, it is not compliance-ready.

---

## 5. Control Traceability Rule (Non-negotiable)

Every control declared in `CONTROL_MAPPING.md` must map to:

- Architecture: where and how the control is designed
- QA: how it is verified pre-deploy (CI gates/tests)
- Evidence: how it is proven post-deploy (logs, audit trails, metrics)

If any link is missing → control is invalid → compliance is RED.

---

## 6. Evidence Requirements

Evidence must be:

- Automated where possible
- Tamper-evident (audit logs, immutable logs, or cryptographic integrity where appropriate)
- Timestamped
- Attributable (who/what generated it)
- Reproducible

Evidence sources may include:
- CI logs and gate results
- test reports
- architecture validation reports
- audit logs
- incident records
- risk registers
- deployment manifests
- configuration drift reports

---

## 7. Incident, Risk, and Project Integration (ISMS Integration)

Maturion governance and the build factory must integrate into ISMS systems:

### 7.1 Incident Management
- Incidents must produce learning and failures when they indicate build incompleteness
- Incident postmortems must map to:
  - failure records
  - learning artifacts
  - governance promotion (when required)

### 7.2 Risk Management
- Material changes require risk assessment
- Risk treatment must be explicit and auditable
- Risk outcomes must influence architecture requirements

### 7.3 Project / PIT Integration
- Projects define scope boundaries and change intent
- Analytics are used to detect drift, recurring failure patterns, and governance weak points

If any integration is missing, it must be recorded as a governance gap.

---

## 8. Compliance Gates (CI/QA Enforcement)

Governance requires the following gates (minimum):

- Scope Declaration gate (single responsibility PR)
- Scope-to-diff gate (domain + file alignment)
- Cascading Failure circuit breaker gate
- Learning roll-down gate
- Failure recording gate
- Failure promotion gate (governance update required evidence)
- Compliance artifact presence gate (COMPLIANCE_SCOPE/CONTROL_MAPPING/EVIDENCE_CATALOG)

Passing gates indicates compliance readiness.
Failing gates indicates non-compliance and blocks release.

---

## 9. Audit Outputs

The system must support:
- ISO 27001 audit evidence compilation
- ISO 31000 risk evidence compilation
- NIST-aligned operational posture evidence compilation

Audit reports must be reproducible from:
- governance artifacts
- build artifacts
- evidence catalog sources

---

## 10. Precedence

This document is canonical.

If any app process or agent behavior conflicts with this policy,
this policy prevails.

---

End of COMPLIANCE AND STANDARDS GOVERNANCE
