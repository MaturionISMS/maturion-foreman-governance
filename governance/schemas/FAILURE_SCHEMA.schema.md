# FAILURE SCHEMA

## Status
Canonical Governance Specification  
Version: v1  
Authority: Foreman (FM)

---

## 1. Purpose

This document defines the normative schema for **Failure Recording** artifacts.

Failures record defects in the **original build completeness** (architecture and/or build execution),
and are used to compute Build Effectiveness over time.

Failures are distinct from improvements:
- Failures reduce Build Effectiveness
- Improvements do not reduce Build Effectiveness (tracked separately)

A failure artifact is valid only if it conforms to this schema.

---

## 2. Failure Artifact Location

For each build, failure artifacts MUST be stored at:

architecture/builds/<build-id>/failures/failure-<NNN>.md

csharp
Copy code

The active build is declared in:

architecture/BUILD_ACTIVE

markdown
Copy code

---

## 3. Core Invariants

1. If system completeness is reduced below 100% due to an omission or defect in the original build,
   a failure record MUST be created.

2. No agent may conclude, hand over, or declare success while:
   - Failure recording is required but missing, OR
   - Failure artifacts are invalid, OR
   - Build effectiveness report is inconsistent with recorded failures.

---

## 4. Required Fields (Normative)

Each failure record MUST include the following exact markers.

### 4.1 Header
- `FAILURE_SCHEMA_VERSION: v1`
- `BUILD_ID: <string>`
- `DATE_UTC: <YYYY-MM-DD>`
- `OWNER: Foreman`
- `FAILURE_ID: <string>` (unique within build)
- `FAILURE_SEQ: <NNN>` (zero-padded integer, matches filename)

### 4.2 Detection
- `DETECTED_BY: <CI|QA|BUILDER_ESCALATION|PROD|AUDIT|OTHER>`
- `DETECTION_CONTEXT: <short string>`
- `FAILURE_SIGNATURE: <short string>`  
  (stable identifier; e.g. "SMTP configuration incomplete", "Prisma schema mismatch")

### 4.3 Classification
- `FAILURE_TYPE: <ARCHITECTURE_OMISSION|ARCHITECTURE_AMBIGUITY|TEST_OMISSION|QA_GAP|CI_GAP|GOVERNANCE_GAP|IMPLEMENTATION_DEFECT|OTHER>`
- `ATTRIBUTION: <ARCHITECTURE|GOVERNANCE|IMPLEMENTATION|ENVIRONMENT|MIXED>`
- `SEVERITY: <S1|S2|S3|S4>`  
  - S1: blocks release / breaks invariants
  - S2: blocks merge gates / core workflows
  - S3: partial functionality
  - S4: minor / informational

### 4.4 Impact
- `SYSTEM_COMPLETENESS_BEFORE: <0-100>%`
- `SYSTEM_COMPLETENESS_AFTER: <0-100>%`
- `ARCHITECTURE_UPDATE_REQUIRED: <YES|NO>`
- `TEST_UPDATE_REQUIRED: <YES|NO>`
- `GOVERNANCE_UPDATE_REQUIRED: <YES|NO>`
- `CI_GATE_UPDATE_REQUIRED: <YES|NO>`

### 4.5 Root Cause
- `ROOT_CAUSE_SUMMARY: <short paragraph>`
- `WHY_THIS_WAS_NOT_PREVENTED: <short paragraph>`

### 4.6 Remediation & Prevention
- `IMMEDIATE_FIX: <short paragraph>`
- `PREVENTION_CHANGE: <short paragraph>`
- `ROLLDOWN_TARGETS: <comma-separated list or NONE>`  
  (e.g. "ARCHITECTURE, CHECKLIST, CI_GATES, AGENT_SCHEMA")

### 4.7 Penalty & Accounting
- `PENALTY_POINTS: <integer>`
- `PENALTY_RATIONALE: <short paragraph>`
- `EFFECTIVENESS_IMPACT: <short string>`  
  (e.g. "100→90", "90→82")

### 4.8 Evidence
- `EVIDENCE_LINKS: <one or more URLs or repo paths>`
- `REPRO_STEPS: <short steps or NONE>`

### 4.9 Status
- `FAILURE_STATUS: <OPEN|RESOLVED>`
- `RESOLUTION_NOTES: <short paragraph or NONE>`

---

## 5. Validity Rules

A failure record is INVALID if:
- Any required marker is missing
- Values are outside allowed enumerations
- `FAILURE_SEQ` does not match the filename number
- `PENALTY_POINTS` is missing or non-integer
- `FAILURE_STATUS: RESOLVED` but `RESOLUTION_NOTES` is NONE

---

## 6. Failure vs Improvement (Normative)

A recorded event MUST be a Failure if:
- The application would not be “correct” at initial delivery without this change, OR
- The omission should have been included in architecture/specification at build time, OR
- Tests/QA gates required to prove correctness were missing at delivery.

An event MUST be an Improvement (not a failure) if:
- It enhances the system beyond original intent, OR
- It is a roadmap feature, optimization, or non-required refinement.

---

## 7. Canonical Precedence

This schema is canonical.

If a conflict exists between this schema and any failure artifact,
this schema prevails.

---

End of FAILURE SCHEMA
