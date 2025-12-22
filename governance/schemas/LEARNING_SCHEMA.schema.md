# LEARNING SCHEMA

## Status
Canonical Governance Specification  
Version: v1  
Authority: Foreman (FM)

---

## 1. Purpose

This document defines the normative schema for **Learning Roll-Down** artifacts.

Learning artifacts are mandatory records created in response to:
- CI failures
- QA failures
- Architecture drift
- Builder escalation
- Production incidents
- Any event that reduces system completeness below 100%

A learning artifact is valid only if it conforms to this schema.

---

## 2. Learning Artifact Location

For each build, the learning artifact MUST be stored at:

architecture/builds/<build-id>/learning.md

csharp
Copy code

The active build is declared in:

architecture/BUILD_ACTIVE

markdown
Copy code

---

## 3. Core Invariant

No agent may conclude, hand over, or declare success while:
- `LEARNING_REQUIRED: YES` and `LEARNING_STATUS: OPEN`, OR
- the learning artifact is missing or invalid.

Learning completeness is binary:
- Resolved
- Unresolved

---

## 4. Required Top-Level Sections

A valid `learning.md` MUST contain the following sections in order:

1. Header
2. Event
3. Impact
4. Root Cause
5. Remediation
6. Roll-Down Targets
7. Evidence
8. Status

---

## 5. Required Fields (Normative)

The `learning.md` file MUST include the following exact key markers:

### 5.1 Header
- `LEARNING_SCHEMA_VERSION: v1`
- `BUILD_ID: <string>`
- `DATE_UTC: <YYYY-MM-DD>`
- `OWNER: Foreman`
- `LEARNING_ID: <string>` (unique within build directory)

### 5.2 Event
- `SOURCE_EVENT: <CI|QA|BUILDER_ESCALATION|PROD|OTHER>`
- `TRIGGER: <short string>`
- `FAILURE_SIGNATURE: <short string>`  
  (e.g. "Prisma missing column pdfPath" or "SMTP configuration incomplete")
- `AFFECTED_REPO: <org/repo>`
- `AFFECTED_REF: <branch|pr|commit>`
- `SEVERITY: <S1|S2|S3|S4>`
  - S1: blocks release or breaks invariants
  - S2: blocks merge gate or breaks core workflows
  - S3: reduces quality, partial function
  - S4: minor, informational, no functional impact

### 5.3 Impact
- `SYSTEM_COMPLETENESS_BEFORE: <0-100>%`
- `SYSTEM_COMPLETENESS_AFTER: <0-100>%`
- `ARCHITECTURE_IMPACT: <YES|NO>`
- `GOVERNANCE_UPDATE_REQUIRED: <YES|NO>`
- `AGENT_BEHAVIOR_UPDATE_REQUIRED: <YES|NO>`
- `QA_GATES_AFFECTED: <YES|NO>`

### 5.4 Root Cause
- `ROOT_CAUSE_SUMMARY: <short paragraph>`
- `CLASSIFICATION: <ARCHITECTURE_GAP|IMPLEMENTATION_DEFECT|GOVERNANCE_GAP|CI_GAP|ENV_GAP|OTHER>`
- `WHY_THIS_WAS_NOT_PREVENTED: <short paragraph>`

### 5.5 Remediation
- `IMMEDIATE_FIX: <short paragraph>`
- `PREVENTION_CHANGE: <short paragraph>`
- `OWNER_ACTIONS: <bullet list>`

### 5.6 Roll-Down Targets
Each target MUST be listed explicitly:

- `ROLLDOWN_ARCHITECTURE: <YES|NO>`
- `ROLLDOWN_CHECKLIST: <YES|NO>`
- `ROLLDOWN_AGENT_SCHEMA: <YES|NO>`
- `ROLLDOWN_CI_GATES: <YES|NO>`

If any roll-down is YES, the file MUST include the specific target paths:

- `ARCHITECTURE_TARGET_PATHS: <comma-separated paths or NONE>`
- `GOVERNANCE_TARGET_PATHS: <comma-separated paths or NONE>`
- `CI_TARGET_PATHS: <comma-separated paths or NONE>`

### 5.7 Evidence
- `EVIDENCE_LINKS: <one or more URLs or repo paths>`
- `REPRO_STEPS: <short steps or NONE>`

### 5.8 Status
- `LEARNING_REQUIRED: <YES|NO>`
- `LEARNING_STATUS: <OPEN|RESOLVED>`
- `RESOLUTION_NOTES: <short paragraph or NONE>`

---

## 6. Validity Rules

A `learning.md` file is INVALID if:
- Any required marker is missing
- Any required value is outside allowed enumerations
- `LEARNING_REQUIRED: YES` but `LEARNING_STATUS` is missing or not OPEN/RESOLVED
- Roll-down flags are YES but corresponding target paths are NONE

---

## 7. Resolution Rules

If `LEARNING_REQUIRED: YES`, resolution requires:
- `LEARNING_STATUS: RESOLVED`
- `RESOLUTION_NOTES` filled with what changed
- Evidence links updated or expanded
- Any declared roll-down targets completed or explicitly scheduled under governance change management

---

## 8. Canonical Precedence

This schema is canonical.

If a conflict exists between this schema and any learning artifact,
this schema prevails.

---

End of LEARNING SCHEMA
