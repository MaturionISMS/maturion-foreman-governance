# LEARNING INTAKE AND PROMOTION MODEL

## Status
Canonical Learning Governance  
Authority: Johan Ras  
Applies To: Foreman, Builders, Governance Administrator

---

## 1. Purpose

This model defines how raw lessons learned from builds,
PR gate failures, QA mismatches, and operational friction
are captured, evaluated, and promoted into governance.

Learning that is not promoted is discarded.
Learning may not remain local.

---

## 2. Learning Intake Triggers

Learning intake is MANDATORY when any of the following occur:
- PR gate failure after handover
- Repeated PR gate failures for the same cause
- UI failure on first delivery
- Builder unable to predict gate outcome
- Architecture assumptions proven incomplete
- Governance enforcement mismatch (e.g. PartPulse case)

---

## 3. Raw Learning Intake Record

All learning begins as a **Raw Learning Record** containing:
- Context (build / PR / app)
- Trigger (what failed)
- Classification (execution / architecture / governance)
- Impact (time loss, rework, risk)
- Evidence (logs, gate output, screenshots)

Raw learning has NO authority by itself.

---

## 4. Promotion Decision

The Foreman evaluates each learning and MUST decide:

### Promote to Governance if:
- The lesson reveals a missing rule
- The lesson reveals an unenforced invariant
- The lesson affects future builds globally

### Promote to Architecture if:
- The lesson reveals missing or incorrect assumptions
- The lesson affects system design

### Promote to QA if:
- The lesson reveals insufficient test coverage
- The lesson reveals gate/QA mismatch

### Discard if:
- Local, non-repeatable, execution-only issue
- Already covered by existing governance

---

## 5. Promotion Targets

Promoted learning MUST result in one or more of:
- Canon update
- Schema update
- PR gate rule update
- Agent contract update
- QA/gate definition update

Promotion without structural change is invalid.

---

## 6. Governance Feedback Loop

Once promoted:
- Learning becomes canonical
- Applies to all future builds
- Is auditable
- Prevents recurrence

Failure to promote qualifying learning is a governance defect.

---

## 7. PartPulse Classification (Example)

The PartPulse experience is classified as:
- Root Cause: Missing PR gate precondition invariant
- Domain: Governance + Builder Handover
- Promotion Target:
  - Builder agent contracts
  - PR Gate Precondition Rule
  - Governance completeness enforcement

This promotion is mandatory and irreversible.

---

End of LEARNING INTAKE AND PROMOTION MODEL
🔒 Effect:
This ensures PartPulse pain can never repeat.
