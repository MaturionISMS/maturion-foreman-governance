# LESSONS TO CANON WORKFLOW

## Status
Governance Process Definition  
Version: v1  
Authority: Johan Ras  
Applies To: Foreman, Builders, Governance Administrator  
Scope: Maturion Platform

---

## 1. Purpose

This document defines the **formal workflow** for promoting lessons learned from build failures, operational incidents, and architectural discoveries into **canonical governance**.

This is a **governance protocol definition only**.  
- It defines **what** must happen and **when**  
- It defines **who** has authority to approve promotion  
- It does **not** define execution automation or enforcement mechanisms  
- Execution responsibility remains with designated agent roles per canonical governance

---

## 2. Governance Authority and Canon Sources

This workflow operates **downstream** from and in **full alignment** with:

1. **Primary Canon**: `maturion/canon/BOOTSTRAP_CANON.md` (when created)  
   - Defines bootstrap requirements and validator foundations  
   - Establishes validator terminal state invariants  
   - Defines validator convergence as a core governance requirement

2. **Governance Canon**: `governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md`  
   - Defines governance as canonical memory  
   - Establishes memory principles (no ephemeral memory, all learning promoted or discarded)  
   - Defines One-Time Build Law and Build-to-Green requirements

3. **Learning Canon**: `governance/canon/LEARNING_INTAKE_AND_PROMOTION_MODEL.md`  
   - Defines learning intake triggers  
   - Defines promotion decision criteria  
   - Defines structural change requirements  
   - Defines validation questions for promotion completeness

4. **This Document**: Maturion-scoped workflow implementation  
   - Operationalizes canonical learning principles for Maturion platform  
   - Defines workflow stages and handoffs  
   - Does NOT redefine or override canonical governance

**Authority Hierarchy**:  
If conflict exists between this document and canonical governance (`governance/canon/**`), **canonical governance prevails**.

---

## 3. What Qualifies as a "Lesson Learned"

A lesson qualifies for canon promotion consideration when it meets **any** of the following criteria:

### 3.1 Repeated Correction Pattern
- The same correction has been required across **multiple PRs** (2+ occurrences)  
- The same failure class has occurred **after** previous learning was documented  
- The same architectural gap has been identified in **different contexts**

### 3.2 Gate Failure Pattern
- PR gate failures occurring **after** handover from builder to governance enforcement  
- Gate expectations misaligned with builder understanding  
- Gate applicability misapplied (wrong agent role assumptions)

### 3.3 Architectural Mismatch Pattern
- Architecture assumptions proven incomplete during implementation  
- Missing architecture requirements discovered during build  
- Deployment/environment/configuration requirements not explicit in architecture  
- Non-testable configuration boundaries not documented

### 3.4 Governance Gap Pattern
- Missing governance rule that would have prevented failure  
- Unenforced invariant that caused downstream breakage  
- Schema incompleteness that allowed non-compliant artifacts  
- Agent contract ambiguity that caused role confusion

### 3.5 One-Time Build Law Violation
- Failure on first delivery to Johan (UI verification failure)  
- Build not 100% functional on first handover  
- QA-as-proof failure (QA passed but production failed)

### 3.6 Separation of Duties Violation
- Cross-agent QA execution (catastrophic governance failure)  
- Builder executing FM-scoped QA or vice versa  
- Governance Administrator executing build/runtime QA

**Key Principle**:  
A lesson is **not** just "something went wrong" — it must reveal a **structural gap** in governance, architecture, or process that can be **preventatively addressed** through canonical update.

---

## 4. Promotion Criteria (When a Lesson MUST Be Promoted)

Per `governance/canon/LEARNING_INTAKE_AND_PROMOTION_MODEL.md` Section 4, promotion is **mandatory** when:

### 4.1 Governance-Class Lessons
- The lesson reveals a **missing canonical rule**  
- The lesson reveals an **unenforced invariant**  
- The lesson affects **future builds globally** (not local/one-time)  
- The lesson indicates **gate applicability mismatch** requiring canon clarification

**Promotion Target**: Canonical governance (`governance/canon/**`)

### 4.2 Architecture-Class Lessons
- The lesson reveals **missing or incorrect architecture assumptions**  
- The lesson reveals **architecture completeness gaps** (deployment, environment, migration)  
- The lesson affects **system design principles**

**Promotion Target**: Architecture requirements (`governance/canon/ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md`)

### 4.3 QA-Class Lessons
- The lesson reveals **insufficient test coverage**  
- The lesson reveals **QA/gate mismatch** (QA passed but gate failed)  
- The lesson indicates **new QA domain** required (e.g., configuration/deployment validation)

**Promotion Target**: QA policy (`governance/policy/QA_POLICY_MASTER.md`)

### 4.4 Discard Criteria
A lesson may be **discarded without promotion** only if:
- Local, non-repeatable, execution-only issue  
- Already fully covered by existing canonical governance  
- Does not reveal structural gap

**Important**: Failure to promote a qualifying lesson is itself a **governance defect** requiring escalation.

---

## 5. Approval Authority

**Sole Approval Authority**: Johan Ras (Human Owner)

### 5.1 Approval Scope
Johan has **final and exclusive authority** to:
- Approve or reject canon promotion  
- Determine severity and priority of promoted learning  
- Resolve conflicts between learning and existing canon  
- Authorize exceptions to governance protocol

### 5.2 Delegation
Johan may delegate:
- **Foreman** may propose canon updates and implement upon approval  
- **Governance Administrator** may draft governance artifacts upon explicit instruction  
- **No agent** may self-approve canon promotion

### 5.3 Approval Record Requirements
All approved promotions MUST be recorded with:
- Date of approval  
- Approving authority (Johan Ras)  
- Canonical artifact(s) affected  
- Rationale for promotion  
- Evidence citation (PR, issue, failure log)

---

## 6. Review Stages for Canon Promotion

Canon promotion follows a **staged review workflow** to ensure quality, alignment, and auditability.

### Stage 1: Lesson Capture and Classification
**Responsible Agent**: Foreman (or agent that detected the lesson)

**Activities**:
1. Document the raw lesson in structured format:
   - Context (build / PR / app / domain)
   - Trigger (what failed or was discovered)
   - Classification (governance / architecture / QA / execution)
   - Impact (time loss, rework, risk, recurrence potential)
   - Evidence (logs, gate output, commit references, issue links)

2. Classify lesson using Section 3 criteria (what qualifies)

3. Determine if lesson meets promotion criteria per Section 4

4. Create **Lesson Promotion Proposal** if promotion is required

**Exit Criteria**: Lesson Promotion Proposal created and ready for Stage 2

---

### Stage 2: Root Cause Analysis and Canon Gap Identification
**Responsible Agent**: Foreman

**Activities**:
1. Perform root cause analysis:
   - Primary root cause (deepest structural cause)
   - Secondary root causes (contributing factors)
   - Failure classes identified (what categories of failures are possible)

2. Identify canon gaps:
   - Which canonical document(s) should have prevented this?
   - What rule/schema/requirement is missing?
   - What enforcement mechanism failed or is absent?

3. Map to promotion targets:
   - Canonical governance update required?
   - Architecture completeness update required?
   - QA policy update required?
   - Agent contract update required?
   - Schema/template update required?

4. Draft proposed canonical changes (not yet approved)

**Exit Criteria**: Root cause analysis complete, canon gaps identified, draft changes prepared

---

### Stage 3: Promotion Proposal Submission
**Responsible Agent**: Foreman

**Activities**:
1. Compile promotion proposal package:
   - Executive summary (1-2 paragraphs)
   - Root cause analysis (from Stage 2)
   - Canon gap analysis
   - Proposed canonical changes (specific text/diffs)
   - Validation questions (Section 6.2 of LEARNING_INTAKE_AND_PROMOTION_MODEL.md)
   - Expected impact (how this prevents recurrence)
   - Ripple effect assessment (what downstream systems affected)

2. Submit to Johan for approval with recommendation

**Exit Criteria**: Proposal submitted to Johan, awaiting approval decision

---

### Stage 4: Approval Decision
**Responsible Agent**: Johan Ras

**Activities**:
1. Review promotion proposal  
2. Validate alignment with canonical governance philosophy  
3. Assess ripple effects and risks  
4. Make decision:
   - **Approve**: Proceed to Stage 5 (implementation)
   - **Reject**: Document rationale, close promotion (lesson remains non-canonical)
   - **Revise**: Request changes to proposal, return to Stage 2 or 3

**Exit Criteria**: Explicit approval decision recorded

---

### Stage 5: Canon Update Implementation
**Responsible Agent**: Governance Administrator (when governance artifacts affected) OR Foreman (when architecture/QA artifacts affected)

**Activities**:
1. Implement approved canonical changes:
   - Update canonical governance documents (`governance/canon/**`)
   - Update architecture requirements
   - Update QA policies
   - Update schemas/templates
   - Update agent contracts

2. Ensure structural change (not documentation-only):
   - New rule added (enforceable)
   - New schema field added (validated)
   - New gate check added (automated)
   - New architecture requirement added (mandatory)

3. Cross-reference the lesson:
   - Include reference to originating failure/issue/PR
   - Include effective date of canonical change
   - Include version update

4. Create PR with canonical changes

**Exit Criteria**: Canonical updates implemented, PR created, ready for Stage 6

---

### Stage 6: Promotion Completeness Validation
**Responsible Agent**: Foreman

**Activities**:
1. Apply validation questions from `governance/canon/LEARNING_INTAKE_AND_PROMOTION_MODEL.md` Section 6.2:

   **Q1**: Can the same failure class be **structurally prevented** from recurring?  
   - YES = valid promotion  
   - NO = incomplete, return to Stage 5

   **Q2**: Is the prevention mechanism **automatically enforced**?  
   - YES = valid promotion  
   - NO = incomplete, return to Stage 5

   **Q3**: Will future builds **automatically incorporate** this learning?  
   - YES = valid promotion  
   - NO = incomplete, return to Stage 5

   **Q4**: Can compliance be **audited**?  
   - YES = valid promotion  
   - NO = incomplete, return to Stage 5

2. If all validation questions answered YES, promotion is **complete and valid**

3. Document validation results in PR description or canonical artifact

**Exit Criteria**: All validation questions answered YES, promotion verified complete

---

### Stage 7: Canonical Integration and Propagation
**Responsible Agent**: Governance Administrator (merge and propagation coordination)

**Activities**:
1. Merge approved canonical changes to main branch

2. Update dependent artifacts:
   - Update templates if schemas changed
   - Update enforcement workflows if gates changed
   - Update agent contracts if responsibilities changed

3. Communicate canonical change:
   - Update relevant issues with canon reference
   - Record in governance memory (if Memory Fabric available)
   - Notify affected agents (if notification system available)

4. Monitor for ripple effects:
   - Ensure downstream builds incorporate new canonical requirements
   - Ensure no regressions introduced by canonical change

**Exit Criteria**: Canonical changes merged, dependencies updated, propagation verified

---

## 7. Canon Update Protocol

### 7.1 Update Principles
- **Minimal, Surgical Changes**: Update only what is necessary to address the lesson  
- **Versioned and Auditable**: All canonical changes versioned and traceable to originating lesson  
- **Non-Breaking Where Possible**: Prefer additive changes over breaking changes  
- **Effective Date**: Clearly state when new canonical requirements take effect

### 7.2 Update Targets (Canonical Artifacts)

**Governance Canon** (`governance/canon/**`):
- Governance principles and philosophy  
- Agent roles and responsibilities  
- Learning and promotion models  
- Compliance and standards requirements

**Architecture Canon** (`governance/canon/ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md`):
- Architecture completeness requirements  
- Deployment, environment, migration requirements  
- Non-testable configuration boundaries

**QA Policy** (`governance/policy/QA_POLICY_MASTER.md`):
- QA domains and coverage requirements  
- Red QA and Green QA definitions  
- QA-as-proof enforcement

**Schemas** (`governance/schemas/**`):
- Scope declaration schema  
- Agent contract schema  
- Failure/effectiveness schemas

**Templates** (`governance/templates/**`):
- Scope declaration template  
- Domain entry template  
- Effectiveness/failure templates

**Agent Contracts** (`governance/agents/**`, `.github/agents/**`):
- Builder agent contracts  
- Foreman agent contracts  
- Governance Administrator agent contract

### 7.3 Update Format
All canonical updates MUST include:
- **Section Reference**: Which section of which canonical document  
- **Change Type**: Addition / Modification / Deprecation  
- **Rationale**: Why this change is required (reference to lesson/failure)  
- **Effective Date**: When this canonical requirement takes effect  
- **Impact Assessment**: What downstream systems/builds are affected

### 7.4 Update Commit Message Format
```
chore(governance): Promote lesson to canon - [Brief Description]

Lesson Source: [Issue #XXX / PR #XXX / Failure Log]
Root Cause: [Primary root cause from Stage 2]
Canon Gap: [What was missing in canonical governance]
Canonical Update: [Which artifact(s) updated]
Validation: [All 4 validation questions answered YES]

Authority: Johan Ras
Effective Date: [YYYY-MM-DD]
```

---

## 8. Separation: Governance Definition vs. Execution Responsibility

### 8.1 This Document Defines Protocol Only
This document establishes:
- **What** actions are required (workflow stages)  
- **When** actions are required (promotion criteria)  
- **Who** has authority (Johan Ras approval, agent roles)  
- **How** actions are structured (review stages, validation questions)

This document does **NOT**:
- ❌ Implement automation or enforcement mechanisms  
- ❌ Execute the workflow (agents execute per their contracts)  
- ❌ Monitor compliance (governance gates enforce)  
- ❌ Trigger notifications (future tooling may implement)

### 8.2 Execution Responsibility Per Agent Role
Execution of this workflow is the responsibility of:

**Foreman**:
- Detect lessons requiring promotion (Stage 1)  
- Perform root cause analysis (Stage 2)  
- Submit promotion proposals (Stage 3)  
- Validate promotion completeness (Stage 6)  
- Coordinate with Governance Administrator

**Governance Administrator**:
- Implement approved governance artifact changes (Stage 5 - governance scope only)  
- Merge canonical changes (Stage 7)  
- Ensure governance completeness and coherence  
- **Never self-approve** promotion

**Johan Ras**:
- Approve or reject promotion proposals (Stage 4)  
- Resolve conflicts and ambiguities  
- Authorize exceptions

### 8.3 No Implied Automation
This workflow definition does **not** imply:
- Automated lesson detection  
- Automated promotion triggering  
- Automated canonical updates  
- Automated validation

Automation **may** be implemented in future to support this workflow, but such automation:
- Requires separate architecture and approval  
- Must not weaken governance  
- Must preserve human authority (Johan approval)  
- Must remain auditable

---

## 9. Alignment with One-Time Build Law

This workflow is **explicitly designed** to enforce and support **One-Time Build Law** by:

### 9.1 Preventing Recurrence
- Lessons are promoted **before** next build begins  
- Canonical updates make previous failures **structurally impossible** to repeat  
- Future builds inherit protection from past failures

### 9.2 Build-to-Green Reinforcement
- Architectural gaps that caused build failures become **mandatory architecture requirements**  
- QA gaps that allowed gate failures become **mandatory QA domains**  
- Governance gaps that caused ambiguity become **explicit canonical rules**

### 9.3 QA-as-Proof Strengthening
- Repeated QA/gate mismatches are promoted to canon  
- QA coverage requirements expand to cover newly discovered failure modes  
- Gate applicability mismatches are resolved at canonical level

### 9.4 Continuous Improvement Without Regression
- Each promoted lesson **raises the governance floor**  
- No build can proceed without satisfying all prior learning  
- Governance continuously evolves to eliminate known failure modes

**Key Principle**:  
One-Time Build Law requires that **each build benefits from all prior learning**.  
This workflow ensures prior learning becomes **canonical and enforceable**, not ephemeral.

---

## 10. Audit Readiness and Enforceability

### 10.1 Audit Trail Requirements
Every lesson promotion MUST maintain:
- **Origin Evidence**: Link to original failure (issue, PR, log)  
- **Classification Record**: Why this lesson qualifies (Section 3)  
- **Promotion Decision**: Why promotion was required (Section 4)  
- **Approval Record**: Johan's approval with date and rationale  
- **Canonical Changes**: Exact diffs of canonical artifacts updated  
- **Validation Record**: All 4 validation questions answered with evidence  
- **Effective Date**: When canonical change takes effect

### 10.2 Audit Questions (Must Be Answerable)
For any promoted lesson, the following MUST be answerable:

1. **What failed?** (Context and trigger)  
2. **Why did it fail?** (Root cause analysis)  
3. **Why was governance insufficient?** (Canon gap identification)  
4. **What canonical change was made?** (Specific artifact and diff)  
5. **Who approved the change?** (Johan Ras with date)  
6. **How does this prevent recurrence?** (Validation questions)  
7. **When did this become enforceable?** (Effective date)

### 10.3 Enforceability Requirements
Promoted learning MUST result in **enforceable** governance:

**Valid (Enforceable)**:
- ✅ New canonical rule with gate check  
- ✅ New schema field with validation  
- ✅ New architecture requirement with checklist item  
- ✅ New QA domain with test suite  
- ✅ New agent constraint with contract update

**Invalid (Not Enforceable)**:
- ❌ "Lessons learned" document without rule changes  
- ❌ "Best practices" guide without mandatory requirements  
- ❌ "Recommendations" without enforcement  
- ❌ Documentation update without structural change

**Per `governance/canon/LEARNING_INTAKE_AND_PROMOTION_MODEL.md` Section 6.1**:  
"Promotion without enforceable structural change is invalid."

### 10.4 Compliance Validation
To verify enforceability, the following MUST be demonstrable:
- Canonical rule exists (text in governance artifact)  
- Validation mechanism exists (gate check / schema validation / checklist)  
- Enforcement is automatic (not manual / not optional)  
- Non-compliance is detectable (audit trail / gate failure)

---

## 11. Cross-References

This workflow aligns with and references:

1. **`maturion/canon/BOOTSTRAP_CANON.md`** (when created)  
   - Validator foundations and terminal state requirements

2. **`governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md`**  
   - Section 2: Governance as Canonical Memory  
   - Section 7: Learning and Continuous Improvement  
   - Section 3: Build Philosophy (One-Time Build Law)

3. **`governance/canon/LEARNING_INTAKE_AND_PROMOTION_MODEL.md`**  
   - Section 2: Learning Intake Triggers  
   - Section 4: Promotion Decision  
   - Section 6.1: Learning Promotion Enforcement  
   - Section 6.2: Promotion Completeness Validation

4. **`governance/canon/ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md`**  
   - All sections (architecture lessons promoted here)

5. **`governance/policy/QA_POLICY_MASTER.md`**  
   - QA domains and coverage (QA lessons promoted here)

6. **Agent Contracts** (`.github/agents/**`)  
   - Builder contracts (execution responsibility)  
   - Foreman contract (orchestration responsibility)  
   - Governance Administrator contract (governance maintenance responsibility)

---

## 12. Explicit Non-Scope

This workflow **does not**:
- ❌ Define execution logic or automation  
- ❌ Implement CI/CD pipelines  
- ❌ Create monitoring or alerting systems  
- ❌ Define UI for lesson management  
- ❌ Replace agent contracts (agents own execution)  
- ❌ Override canonical governance (`governance/canon/**` is authoritative)

---

## 13. Revision History

| Version | Date       | Author                | Changes                              |
|---------|------------|-----------------------|--------------------------------------|
| v1      | 2025-12-23 | Governance Admin      | Initial creation per Issue #653      |

---

**End of LESSONS TO CANON WORKFLOW**

🔒 **Effect**:  
This workflow ensures that all qualifying lessons are promoted to canonical governance through a structured, auditable, approval-gated process. This strengthens One-Time Build Law by ensuring no known failure mode can recur once learning has been promoted to canon.
