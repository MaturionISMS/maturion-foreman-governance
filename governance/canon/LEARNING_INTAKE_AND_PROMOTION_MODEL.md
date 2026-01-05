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

**Failure to promote qualifying learning is a governance defect.**

### 6.1 Learning Promotion Enforcement

**Non-Negotiable Rules**:

1. **Failure to Promote is a Defect**: If learning qualifies for promotion (per Section 4) but is NOT promoted, this is itself a governance violation requiring escalation.

2. **Repeated Failures are Governance Violations**: If the same failure class occurs after learning has been promoted and structural changes made, this indicates:
   - Learning promotion was incomplete
   - Structural changes were inadequate
   - Enforcement mechanism failed
   
   This triggers **EMERGENCY classification and TARP (Trigger Action Response Plan) activation**:
   - Immediate STOP of all related execution
   - Emergency assessment: Why did prevention fail?
   - Rapid corrective actions: Forward-scan, structural fixes, automation
   - Evidence of system-level change required before ANY resumption
   - Document as EMERGENCY in FL/CI registry with TARP completion report

3. **Learning Must Result in Structural Change**: Promotion without enforceable structural change is invalid. Documentation-only updates are insufficient unless the documentation defines new enforceable rules or schemas.

**Structural Change Examples (Valid)**:
- ✅ New canonical governance rule added
- ✅ Schema updated with new required fields
- ✅ PR gate updated to check new condition
- ✅ Architecture completeness requirements expanded
- ✅ QA domain added with mandatory tests
- ✅ Agent contract updated with new constraints

**Documentation-Only Examples (Invalid)**:
- ❌ "Lessons learned" document without rule changes
- ❌ "Best practices" guide without enforcement
- ❌ "Recommendations" without mandatory requirements
- ❌ Architecture update without corresponding QA update

### 6.2 Promotion Completeness Validation

After learning promotion, the following MUST be verifiable:

**Validation Questions**:
1. Can the same failure class be **structurally prevented** from recurring? (Yes = valid, No = incomplete)
2. Is the prevention mechanism **automatically enforced**? (Yes = valid, No = incomplete)
3. Will future builds **automatically incorporate** this learning? (Yes = valid, No = incomplete)
4. Can compliance be **audited**? (Yes = valid, No = incomplete)

If answer to ANY question is NO, promotion is **incomplete** and must be strengthened.

### 6.3 BL Forward-Scan Obligation (BL-019-Derived)

**Mandatory Requirement**: When ANY Bootstrap Learning (BL) or Feedback Loop/Continuous Improvement (FL/CI) entry is recorded, the system MUST perform a forward-scan of ALL relevant pending work to identify and correct additional instances of the same failure pattern.

**Context**: Recording a single learning instance without scanning for additional occurrences allows the same failure to recur immediately, violating the "never repeat" principle of the One-Time Build system.

**Bootstrap Learning Source**:
- **BL-019** (FM App, Wave 2): After BL-018 documented QA Catalog misalignment in Subwave 2.2, FM failed to forward-scan remaining Wave 2 subwaves (2.3 to 2.14). This allowed the same pattern to occur in Subwave 2.3 on the **same day**, affecting 9 of 14 total subwaves (64%).

**Forward-Scan Process** (Mandatory):

When a BL is recorded:

1. **Identify Failure Pattern**
   - Extract the root cause category (planning gap, architecture gap, QA gap, etc.)
   - Define the failure pattern in abstract, reusable terms
   - Identify the scope of work that could exhibit the same pattern

2. **Scan All In-Scope Pending Work**
   - For wave-level learnings: scan all pending subwaves in the same wave
   - For feature-level learnings: scan all pending features with similar characteristics
   - For process-level learnings: scan all pending work using the same process
   - Include work that has been planned but not yet authorized

3. **Validate Each Instance**
   - Apply the new learning/ratchet to each pending work item
   - Identify which items fail the new validation
   - Document all instances requiring correction

4. **Correct All Instances**
   - Do NOT proceed with only the triggering instance
   - Correct ALL identified instances before authorizing ANY of them
   - Use automation where possible (validation scripts, gates)
   - Record forward-scan results in FL/CI registry

5. **Evidence and Auditability**
   - Document that forward-scan was performed
   - List all items scanned
   - List all items requiring correction
   - List all corrections applied
   - Archive forward-scan results as evidence

**Prohibited Actions**:

- ❌ Recording a BL without performing forward-scan
- ❌ Correcting only the triggering instance and proceeding with others
- ❌ Assuming "other instances are probably fine" without validation
- ❌ Deferring forward-scan corrections to "handle them later"
- ❌ Issuing authorizations before forward-scan corrections complete

**Forward-Scan Validation Questions**:

Before considering a BL complete:

1. Has forward-scan been performed for all relevant pending work? (Yes = valid, No = incomplete)
2. Have ALL instances requiring correction been identified? (Yes = valid, No = incomplete)
3. Have ALL identified instances been corrected? (Yes = valid, No = incomplete)
4. Is there evidence of forward-scan and corrections? (Yes = valid, No = incomplete)

If answer to ANY question is NO, BL processing is **incomplete**.

**Second-Time Failure Prevention**:

Forward-scan is the PRIMARY mechanism for preventing second-time failures. A second occurrence of the same failure pattern indicates:
- Forward-scan was not performed
- Forward-scan was incomplete
- Corrections were not applied to all instances

Second-time failures are classified as **EMERGENCY** and trigger **TARP (Trigger Action Response Plan)** activation, requiring:
- Immediate STOP
- Emergency root cause analysis
- Rapid corrective actions
- Evidence of system-level change
- TARP completion before resumption

**Integration with Existing Sections**:

- Extends Section 6.1 (Enforcement): Failure to forward-scan is a governance violation
- Extends Section 6.2 (Validation): Forward-scan evidence is required for promotion completeness
- Complements Section 4 (Promotion Decision): Forward-scan is mandatory for all promoted learnings

**Example: BL-019 Forward-Scan (FM App)**

When BL-018 was recorded (Wave 2.2 QA misalignment):

✅ **Should have happened**:
1. Identify pattern: QA ranges assigned without catalog validation
2. Scan: All Wave 2 subwaves (2.1 to 2.14)
3. Validate: Run catalog alignment check on each subwave
4. Correct: Extend QA Catalog and regenerate specs for all misaligned subwaves
5. Evidence: Document forward-scan results, record corrections

❌ **What actually happened**:
1. BL-018 recorded for Subwave 2.2 only
2. No forward-scan performed
3. Subwave 2.3 issued with same pattern
4. Builder rejected (governance working)
5. **Second-time failure triggered** (beyond catastrophic)

**Ratchet Condition**: Forward-scan after BL recording is now a **mandatory, non-negotiable requirement**. Failure to forward-scan is a governance violation.

**FM Pre-Authorization Checklist Integration**:

Forward-scan obligation is implemented as **Item 2.4 (BL/FL-CI Ratchet Status)** of the canonical **FM Pre-Authorization Checklist** (`FM_PREAUTH_CHECKLIST_CANON.md`). FM MUST execute the full pre-authorization checklist before wave/subwave authorization, which includes mandatory BL forward-scan verification. The checklist ensures that:
- ALL Bootstrap Learnings are reviewed for applicability
- All active BL/FL-CI entries are resolved
- Forward-scan is completed after any new BL/FL-CI creation
- Second-time failure prevention mechanisms are validated

---

## 7. PartPulse Classification and Promotion (Completed Example)

The PartPulse application produced **validated FL/CI lessons** through real production, CI, and deployment failures. These lessons have been **promoted into canonical governance** per this model.

### 7.1 PartPulse Root Cause Analysis

**Primary Root Cause**: Architecture incompleteness — deployment, environment, and configuration requirements were not explicit in architecture.

**Secondary Root Causes**:
- Missing governance rule requiring explicit deployment target declaration
- Missing governance rule requiring environment variable documentation
- Missing governance rule requiring migration execution strategy
- Insufficient QA coverage for configuration and deployment validation
- No explicit acknowledgment of non-testable configuration boundaries

### 7.2 PartPulse Failure Classes Identified

| Failure Class | Description | Recurrence Potential |
|--------------|-------------|---------------------|
| Deployment Configuration Missing | Required deployment files (e.g., `vercel.json`) not present or misconfigured | HIGH |
| Environment/Provider Mismatch | Environment variable expectations differ between local and production | HIGH |
| Database Migration Ambiguity | Unclear who executes migrations and when | MEDIUM |
| Incomplete Fix | Symptom addressed but root cause remains | HIGH |
| Non-Testable Configuration | Production config not testable in CI, no manual verification checklist | MEDIUM |

### 7.3 PartPulse Promotion Targets and Actions

**Promotion Actions Completed**:

1. **Canonical Governance Update**:
   - ✅ Created `ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md` (new canonical document)
   - ✅ Added Section 3.1: Deployment Target Declaration (mandatory)
   - ✅ Added Section 3.2: Runtime Entrypoint and Filesystem Expectations (mandatory)
   - ✅ Added Section 3.3: Environment Variable Requirements and Provider Constraints (mandatory)
   - ✅ Added Section 3.4: Database and Data Migration Strategy (mandatory)
   - ✅ Added Section 3.5: Non-Testable Configuration Failure Boundaries (mandatory)

2. **QA Policy Update**:
   - ✅ Updated `QA_POLICY_MASTER.md` Section 2.10: Configuration and Deployment Validation (new QA domain)
   - ✅ Added configuration and deployment as valid and mandatory QA targets
   - ✅ Added requirement: repeatable failure classes MUST result in permanent QA assertions
   - ✅ Added requirement: incomplete fixes are distinct failure class requiring complete remediation
   - ✅ Added requirement: tests must validate both configuration AND effects

3. **Learning Promotion Enforcement**:
   - ✅ Updated this document (LEARNING_INTAKE_AND_PROMOTION_MODEL.md) Section 6.1: Learning Promotion Enforcement
   - ✅ Clarified: failure to promote qualifying learning is governance defect
   - ✅ Clarified: repeated failures after learning exists are governance violations (Double-Catastrophic)
   - ✅ Clarified: learning promotion must result in structural change, not documentation alone

### 7.4 PartPulse Learning Effect

**Structural Prevention Achieved**:
- Architecture missing deployment, environment, or migration strategy is now **constitutionally incomplete**
- Pre-implementation gates MUST validate architecture completeness per new requirements
- QA MUST include configuration and deployment validation where testable
- Non-testable configuration MUST have documented manual verification procedures

**Enforcement Mechanisms**:
- Foreman validates architecture completeness before creating Red QA
- Builder receives rejection if architecture incomplete
- Governance Gate blocks PR if architecture completeness not demonstrated
- Build Effectiveness Score penalized for post-deployment architecture incompleteness discovery

**Propagation**:
- All future builds (including FM app) MUST satisfy new architecture completeness requirements
- All active projects MUST review architecture for PartPulse-derived gaps
- Architecture templates updated to include deployment, environment, and migration sections

### 7.5 PartPulse Promotion Completeness Validation

**Validation Questions Applied**:

1. ✅ **Can same failure class be structurally prevented?**  
   YES — Architecture completeness requirements now mandate explicit deployment, environment, and migration documentation.

2. ✅ **Is prevention mechanism automatically enforced?**  
   YES — Foreman validates completeness pre-implementation, Governance Gate validates completeness pre-merge.

3. ✅ **Will future builds automatically incorporate learning?**  
   YES — Canonical governance applies to all builds; architecture incomplete without PartPulse-derived sections.

4. ✅ **Can compliance be audited?**  
   YES — Architecture artifacts either contain required sections or are flagged as incomplete; evidence is traceable.

**Result**: PartPulse promotion is **COMPLETE and VALID**.

---

## 8. Promotion Obligations Discharge

This document, combined with created/updated artifacts, **fully discharges** the learning promotion obligations from PartPulse FL/CI experience.

**Key Artifacts Updated**:
1. `governance/canon/ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md` (NEW)
2. `governance/policy/QA_POLICY_MASTER.md` (UPDATED — Section 2.10, 2.12)
3. `governance/canon/LEARNING_INTAKE_AND_PROMOTION_MODEL.md` (UPDATED — Section 6, 7)

**Evidence of Promotion**:
- Issue #1 (this issue) triggered promotion
- Canonical governance strengthened with PartPulse-derived invariants
- Structural changes implemented and enforceable
- All future builds inherit protection against PartPulse failure classes

**One-Time Build Law Compliance**:
- PartPulse failures cannot recur if governance is followed
- FM app and future apps are structurally protected
- Learning promotion obligation satisfied

---

End of LEARNING INTAKE AND PROMOTION MODEL
🔒 Effect:
This ensures PartPulse pain can never repeat.
Architecture incompleteness is now constitutionally detectable and preventable.
