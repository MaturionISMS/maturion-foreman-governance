# GOVERNANCE GATE STANDARD RESPONSE

## Status
Governance Communication Protocol  
Version: v1  
Authority: Johan Ras  
Applies To: Foreman, All Agents  
Scope: Maturion Platform  
Source of Truth: `maturion/canon/BOOTSTRAP_CANON.md` (when created), `governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md`

---

## 1. Purpose

This document defines the **standard response protocol** that Foreman must use when communicating governance gate failures in PRs.

This is a **communication protocol definition for human collaboration only**.  
- It defines **what** Foreman should communicate when a governance gate fails  
- It defines **how** to structure gate failure responses  
- It defines **when** to escalate vs. when to provide guidance  
- It does **not** define tooling, automation, or enforcement mechanisms  
- It does **not** implement gate logic or validation rules

**Key Principle**:  
Gate failures indicate **enforcement defects**, not acceptable states. The task is always to **fix enforcement** so the gate passes without bypass, never to weaken tests or relax governance semantics.

---

## 2. Governance Authority and Canon Sources

This protocol operates **downstream** from and in **full alignment** with:

1. **Primary Canon**: `maturion/canon/BOOTSTRAP_CANON.md` (when created)  
   - Source of truth for bootstrap requirements  
   - Defines governance gate semantics  
   - Establishes gate failure handling requirements

2. **Governance Canon**: `governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md`  
   - Defines One-Time Build Law  
   - Establishes Build-to-Green requirements  
   - Defines QA-as-Proof enforcement  
   - Defines governance as canonical memory

3. **Gate Canon**: `GOVERNANCE_GATE_CANON.md`  
   - Defines gate execution point (PR merge time only)  
   - Establishes agent-role-based gate applicability  
   - Defines evidence-based validation  
   - Defines zero-tolerance enforcement

4. **Learning Workflow**: `maturion/process/LESSONS_TO_CANON_WORKFLOW.md`  
   - Defines how gate failures inform canonical learning  
   - Establishes promotion criteria for governance improvements  
   - Ensures continuous improvement without regression

5. **Validator Convergence**: `maturion/process/VALIDATOR_CONVERGENCE_CHECKLIST.md`  
   - Defines validator terminal pass/fail semantics  
   - Establishes convergence requirements  
   - Ensures consistent, predictable validator behavior

**Authority Hierarchy**:  
If conflict exists between this document and higher canonical governance, **higher canon prevails**.

---

## 3. What is a Governance Gate Failure?

A **governance gate failure** occurs when:

1. **Validator FAIL**: One or more validators returned `status: "FAIL"` with violations detected  
2. **Precondition FAIL**: Gate preconditions not met (Build-to-Green incomplete, QA not executed, evidence missing)  
3. **Role Mismatch**: Gate applicability misapplied (builder gates evaluated against non-builder agent)  
4. **Infrastructure FAIL**: Gate executor unable to validate due to missing infrastructure

### 3.1 What a Gate Failure Is NOT

A gate failure is **not**:
- ❌ A test failure (tests fail during Build-to-Green, not at gate)  
- ❌ A build failure (builds fail during Build-to-Green, not at gate)  
- ❌ A code quality issue (code quality validated during Build-to-Green)  
- ❌ An optional check (gates enforce mandatory compliance only)  
- ❌ A warning or suggestion (gates are binary: PASS or FAIL)

**Key Distinction**:  
Gate failures validate **process compliance** and **governance adherence**, not code correctness.

---

## 4. Standard Response Protocol

When a governance gate fails, Foreman MUST follow this response protocol:

### 4.1 Response Structure

Every gate failure response MUST include:

1. **Status Declaration**: Clear statement that gate failed  
2. **Failure Context**: Which validator(s) failed, what violations were detected  
3. **Root Cause Analysis**: Why the gate failed (role mismatch? missing evidence? validator defect?)  
4. **Corrective Action**: What must be done to make the gate pass  
5. **Canonical Reference**: Which canonical governance artifact(s) define the requirement  
6. **Escalation Trigger**: When to escalate to Johan vs. when to proceed with fix

### 4.2 Tone and Clarity

Responses must be:
- ✅ **Professional**: Clear, factual, non-judgmental  
- ✅ **Actionable**: Provide specific next steps  
- ✅ **Evidence-based**: Reference specific violations, not subjective interpretation  
- ✅ **Governance-aligned**: Reinforce canonical principles (One-Time Build Law, Build-to-Green, QA-as-Proof)  
- ✅ **Educational**: Help the recipient understand *why* the gate failed, not just *what* failed

Responses must **not** be:
- ❌ Apologetic (gate failures are expected during bootstrap)  
- ❌ Dismissive (every gate failure is meaningful)  
- ❌ Suggestive of bypass (never propose weakening governance)  
- ❌ Ambiguous (always provide clear corrective action)

---

## 5. Verbatim Response Templates

Use these templates verbatim when responding to gate failures. Customize only the bracketed placeholders.

### 5.1 Template: Validator FAIL (Terminal State Correct)

**Use when**: A validator correctly returned FAIL with violations detected

```markdown
## Governance Gate Failure

**Status**: FAIL  
**Validator**: [Validator Name, e.g., CS1 Constitutional Validator]  
**Violations Detected**: [Number] violation(s)

### Violations

[List each violation with type, description, severity from validator output]

### Root Cause

The validator detected [brief explanation of what was violated, e.g., "modifications to protected constitutional files"].

This is a **correct gate failure** — the validator is functioning as designed. The PR contains changes that violate governance requirements.

### Required Corrective Action

**Do NOT**:
- ❌ Bypass or disable the gate  
- ❌ Weaken the validator logic  
- ❌ Remove or suppress the violations  
- ❌ Modify governance to "make the gate pass"

**DO**:
- ✅ Revert the violating changes from this PR  
- ✅ If changes are necessary, create a separate governance-scoped PR with proper approval  
- ✅ Ensure this PR contains only changes within approved scope

### Canonical Reference

- **Gate Canon**: `GOVERNANCE_GATE_CANON.md` Section 5 (Zero-Tolerance Enforcement)  
- **Validator Convergence**: `maturion/process/VALIDATOR_CONVERGENCE_CHECKLIST.md` Section 6 (Terminal FAIL)  
- **[Specific Governance Rule]**: [Reference to the specific canonical artifact that was violated]

### Next Steps

1. Review violations listed above  
2. Revert violating changes  
3. Re-run gate validation  
4. If gate passes, PR may proceed to merge

**Bootstrap Principle**:  
Gate failures indicate enforcement is working correctly. Bootstrap does not relax governance semantics — it ensures they are properly enforced.
```

---

### 5.2 Template: Validator FAIL (Terminal State Violated)

**Use when**: A validator returned PASS despite evidence of violations, OR a validator overwrote terminal FAIL state

```markdown
## Governance Gate Failure (Validator Defect Detected)

**Status**: FAIL  
**Validator**: [Validator Name]  
**Issue Type**: Validator Convergence Violation

### Problem

The [Validator Name] validator [describe the issue, e.g., "returned PASS despite detecting violations" OR "overwrote terminal FAIL state during execution"].

**Evidence**:
[Provide specific evidence from logs, e.g., "Violations array contains [N] items but status = PASS"]

### Root Cause

This is a **validator implementation defect**. The validator violated terminal FAIL semantics as defined in `maturion/process/VALIDATOR_CONVERGENCE_CHECKLIST.md`.

**Violated Requirement**: [Reference specific checklist section, e.g., "Section 4.2: Terminal FAIL State"]

This is **not** a PR defect — this is a **governance infrastructure defect** requiring immediate correction.

### Required Corrective Action

**Immediate**:
1. Halt this PR (gate failure is valid, validator defect must be fixed first)  
2. Create **separate governance PR** to fix validator convergence violation  
3. Apply validator fix per `maturion/process/VALIDATOR_CONVERGENCE_CHECKLIST.md`  
4. Validate fix against convergence conditions (Section 5)  
5. Merge validator fix  
6. Re-validate original PR with corrected validator

**Do NOT**:
- ❌ Bypass gate because validator is broken  
- ❌ "Work around" validator defect  
- ❌ Merge PR before validator is fixed

### Canonical Reference

- **Validator Convergence**: `maturion/process/VALIDATOR_CONVERGENCE_CHECKLIST.md` Section 4 (Mandatory Checks), Section 6 (Terminal Pass/Fail Rules)  
- **Gate Canon**: `GOVERNANCE_GATE_CANON.md` Section 4 (Evidence-Based Validation)

### Escalation Required

**Escalate to Johan**: Yes (validator defect is a governance-class failure requiring approval for corrective action)

**Lesson Promotion Required**: Yes (validator convergence violation qualifies per `maturion/process/LESSONS_TO_CANON_WORKFLOW.md` Section 3.4: Governance Gap Pattern)

### Next Steps

1. Escalate to Johan with this analysis  
2. Await approval to create validator fix PR  
3. Implement validator fix in separate PR  
4. Validate convergence  
5. Merge validator fix  
6. Return to original PR and re-validate
```

---

### 5.3 Template: Gate Applicability Mismatch (Role-Based)

**Use when**: Builder-specific gates are incorrectly applied to non-builder agent PRs

```markdown
## Governance Gate Failure (Applicability Mismatch Detected)

**Status**: FAIL  
**Gate**: [Gate Name, e.g., Build-to-Green Evidence Gate]  
**Agent Role**: [Submitting Agent Role, e.g., Governance Administrator]

### Problem

The gate [Gate Name] is being evaluated against a PR submitted by a **[Agent Role]** agent.

**Gate Applicability**:  
This gate applies to: **Builder Agents** only

**Agent Role**: **[Agent Role]**

**Result**: Gate applicability mismatch — gate requirements do not apply to this agent role.

### Root Cause

This is a **gate configuration defect**, not a PR compliance failure.

Per `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md`:
- Builder agents are subject to Build-to-Green, architecture, 100% GREEN QA, and full governance controls  
- Governance Administrator agents are subject to governance-scoped enforcement only (schemas, policies, canonical integrity)  
- Applying builder-specific gates to non-builder agents is a **governance error**

### Required Corrective Action

**Do NOT**:
- ❌ Force Governance Administrator to satisfy builder-specific requirements (out of scope)  
- ❌ Bypass gate without fixing applicability logic  
- ❌ Weaken builder gate requirements to accommodate governance PRs

**DO**:
- ✅ Fix gate applicability logic to be agent-role aware  
- ✅ Apply only governance-scoped gates to this PR  
- ✅ Preserve full builder gate rigor for builder PRs

### Canonical Reference

- **Agent Role Gate Applicability**: `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md` Section 3 (Core Principle), Section 4 (Agent Role Definitions)  
- **Gate Canon**: `GOVERNANCE_GATE_CANON.md` Section 3.3 (Agent-Role-Based Applicability)

### Escalation Required

**Escalate to Johan**: Yes (gate applicability defect is a governance-class failure requiring approval for corrective action)

**Lesson Promotion Required**: Yes (gate applicability mismatch qualifies per `maturion/process/LESSONS_TO_CANON_WORKFLOW.md` Section 3.2: Gate Failure Pattern)

### Next Steps

1. Escalate to Johan with this analysis  
2. Await approval to fix gate applicability logic  
3. Create separate governance PR to fix gate configuration  
4. Implement agent-role-aware gate logic  
5. Validate gate logic against all agent roles  
6. Merge gate fix  
7. Return to original PR and re-validate with correct gate applicability
```

---

### 5.4 Template: Precondition FAIL (Missing Evidence)

**Use when**: Gate preconditions are not met (Build-to-Green incomplete, evidence missing, etc.)

```markdown
## Governance Gate Failure (Precondition Not Met)

**Status**: FAIL  
**Precondition**: [Precondition Name, e.g., Build-to-Green Evidence Bundle]

### Problem

The gate requires the following precondition: **[Precondition Name]**

**Status**: Not met

**Evidence**:  
[Describe what is missing, e.g., "Build-to-Green evidence bundle not found in PR artifacts"]

### Root Cause

Per `GOVERNANCE_GATE_CANON.md` Section 6 (Execution Point), the governance gate requires these preconditions:

1. ✅ PR exists and is ready for merge  
2. ✅ Build-to-Green process completed  
3. ✅ Full QA suite executed  
4. ✅ Evidence bundle generated  
5. ✅ All automated checks passed

**Missing**: [Identify which precondition(s) are not satisfied]

This is **not a gate defect** — the precondition requirement is correct. The PR is not yet ready for gate validation.

### Required Corrective Action

**Do NOT**:
- ❌ Bypass precondition check  
- ❌ Skip Build-to-Green or QA execution  
- ❌ Generate fake evidence to satisfy precondition

**DO**:
- ✅ Complete Build-to-Green process (if not already done)  
- ✅ Execute full QA suite (if not already done)  
- ✅ Generate required evidence bundle  
- ✅ Ensure all automated checks pass  
- ✅ Re-run gate validation after preconditions satisfied

### Canonical Reference

- **Gate Canon**: `GOVERNANCE_GATE_CANON.md` Section 6 (Execution Point, Pre-Conditions)  
- **Build Philosophy**: `governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md` Section 3 (Build Philosophy)

### Next Steps

1. Complete missing precondition: [Specific action, e.g., "Execute Build-to-Green process and generate evidence bundle"]  
2. Verify precondition is now satisfied  
3. Re-run gate validation  
4. If gate passes, PR may proceed to merge

**Bootstrap Principle**:  
Preconditions exist to ensure gate validation is meaningful. Skipping preconditions undermines governance integrity.
```

---

### 5.5 Template: Infrastructure FAIL (Gate Executor Defect)

**Use when**: Gate executor itself is broken (missing dependencies, crashed, unable to validate)

```markdown
## Governance Gate Failure (Infrastructure Defect Detected)

**Status**: FAIL  
**Component**: Gate Executor Infrastructure

### Problem

The governance gate executor was unable to complete validation due to an infrastructure failure.

**Error**:  
[Provide error message or description, e.g., "Gate executor script not found", "Missing required dependency", "Unhandled exception during validation"]

### Root Cause

This is a **governance infrastructure defect**, not a PR defect.

The gate executor failed to implement fail-safe behavior as required by `maturion/process/VALIDATOR_CONVERGENCE_CHECKLIST.md` Section 4.4 (Missing Infrastructure Causes FAIL).

**Violated Requirement**: Gate infrastructure must implement graceful degradation — missing dependencies must cause terminal FAIL with clear violation, not crash.

### Required Corrective Action

**Immediate**:
1. Halt this PR (infrastructure must be fixed before gate validation can proceed)  
2. Create **separate governance PR** to fix gate executor infrastructure  
3. Implement fail-safe behavior (graceful degradation on missing dependencies)  
4. Validate gate executor against convergence requirements  
5. Merge gate executor fix  
6. Re-validate original PR with corrected gate executor

**Do NOT**:
- ❌ Bypass gate because infrastructure is broken  
- ❌ Disable gate temporarily  
- ❌ Merge PR before gate executor is fixed

### Canonical Reference

- **Validator Convergence**: `maturion/process/VALIDATOR_CONVERGENCE_CHECKLIST.md` Section 4.4 (Missing Infrastructure Causes FAIL)  
- **Gate Canon**: `GOVERNANCE_GATE_CANON.md` Section 4 (Evidence-Based Validation)

### Escalation Required

**Escalate to Johan**: Yes (gate executor defect is a governance-class failure requiring approval for corrective action)

**Lesson Promotion Required**: Yes (gate infrastructure failure qualifies per `maturion/process/LESSONS_TO_CANON_WORKFLOW.md` Section 3.4: Governance Gap Pattern)

### Next Steps

1. Escalate to Johan with this analysis  
2. Await approval to create gate executor fix PR  
3. Implement gate executor fix in separate PR  
4. Validate fail-safe behavior  
5. Merge gate executor fix  
6. Return to original PR and re-validate
```

---

## 6. Escalation Triggers

Foreman must escalate to Johan when any of the following conditions are met:

### 6.1 Mandatory Escalation (ALWAYS Escalate)

Escalate **immediately** when:

1. **Validator Convergence Violation**: Validator violated terminal FAIL semantics (Section 5.2 template)  
2. **Gate Applicability Mismatch**: Builder gates incorrectly applied to non-builder agent (Section 5.3 template)  
3. **Gate Executor Infrastructure Failure**: Gate infrastructure itself is broken (Section 5.5 template)  
4. **Canonical Conflict**: Gate requirement conflicts with canonical governance  
5. **Governance Regression**: Previously passing gate now fails due to governance change (not PR change)  
6. **Ambiguous Requirement**: Gate failure, but requirement is ambiguous or undefined in canon  
7. **Repeated Gate Failure Pattern**: Same gate failure occurring across multiple PRs (indicates structural governance gap)

### 6.2 Optional Escalation (Foreman Judgment)

Foreman **may** escalate (use judgment) when:

1. **Complex Root Cause**: Gate failure root cause is unclear or requires governance interpretation  
2. **Multiple Simultaneous Failures**: Several gates failing for interconnected reasons  
3. **Bootstrap Ambiguity**: Unclear whether gate failure is valid during bootstrap phase  
4. **Risk of Governance Weakening**: Concern that proposed fix might weaken governance enforcement

### 6.3 No Escalation Required (Proceed with Fix)

Foreman **should not** escalate when:

1. **Clear Validator FAIL**: Validator correctly detected violations, PR contains out-of-scope changes (Section 5.1 template)  
2. **Clear Precondition FAIL**: Preconditions not met, clear corrective action available (Section 5.4 template)  
3. **Straightforward Fix**: Gate failure has obvious corrective action aligned with canonical governance

### 6.4 Escalation Format

When escalating, Foreman must provide:

```markdown
## Escalation to Johan

**Issue Type**: [Validator Convergence Violation / Gate Applicability Mismatch / Infrastructure Failure / Other]

**PR Context**: [PR number, branch, agent role]

**Gate Failure Summary**: [Brief description of what failed]

**Root Cause Analysis**: [Detailed explanation of why it failed]

**Governance Impact**: [Why this requires Johan's approval — e.g., "Potential governance regression", "Canon clarification needed", "Structural governance gap"]

**Proposed Corrective Action**: [Recommended fix with justification]

**Canonical References**: [List all relevant canonical governance artifacts]

**Risk Assessment**: [What happens if we proceed with fix? What happens if we don't?]

**Recommendation**: [Foreman's recommended path forward]
```

---

## 7. Required Response Metadata

Every gate failure response MUST include the following metadata for audit and traceability:

### 7.1 Mandatory Metadata Fields

```markdown
**Gate Failure ID**: [Unique identifier, e.g., GF-2025-12-23-001]  
**PR Number**: [GitHub PR number]  
**Branch**: [Branch name]  
**Agent Role**: [Submitting agent role]  
**Timestamp**: [ISO 8601 timestamp of gate failure]  
**Validator(s) Failed**: [List of validators that returned FAIL]  
**Violations Count**: [Total number of violations detected]  
**Severity**: [Highest severity among violations: CRITICAL / HIGH / MEDIUM / LOW]  
**Escalated**: [Yes / No]  
**Canonical References**: [List of canonical governance artifacts referenced]
```

### 7.2 Optional Metadata Fields

```markdown
**Related Failures**: [Links to related gate failures, if applicable]  
**Lesson Promotion Candidate**: [Yes / No — does this qualify for canon promotion?]  
**Estimated Fix Time**: [Foreman's estimate of time to correct]  
**Blocking**: [Is this blocking other work? Yes / No]
```

---

## 8. Communication Principles

### 8.1 Gate Failures Are Expected During Bootstrap

**Principle**: Gate failures during bootstrap are **normal and healthy** — they indicate governance is being enforced.

**Communication Guideline**:
- Frame gate failures as **enforcement validation**, not setbacks  
- Reinforce that bootstrap does **not** relax governance — it ensures governance is properly implemented  
- Emphasize that fixing enforcement (not weakening tests) is always the goal

**Example Language**:
> "This gate failure confirms that governance enforcement is active and functioning as designed. Bootstrap phase means we fix enforcement gaps, not relax governance requirements."

### 8.2 Tests Must Not Be Weakened

**Principle**: Gate failures must **never** result in weakened tests, disabled validators, or relaxed governance.

**Communication Guideline**:
- Explicitly state that weakening tests is **not** an acceptable corrective action  
- Provide alternative corrective actions that preserve or strengthen governance  
- Escalate immediately if proposed fix would weaken governance

**Example Language**:
> "The corrective action is to fix the enforcement mechanism, not to weaken the validator or disable the check. Governance integrity is non-negotiable."

### 8.3 Bootstrap Does Not Relax Governance Semantics

**Principle**: Bootstrap is about **implementing** governance correctly, not relaxing it.

**Communication Guideline**:
- Clarify that bootstrap means "governance is being established", not "governance is optional"  
- Distinguish between "enforcement not yet implemented" (valid during bootstrap) and "governance rule relaxed" (never valid)  
- Ensure fixes strengthen enforcement, not weaken requirements

**Example Language**:
> "We are in bootstrap phase, which means enforcement mechanisms are still being validated and corrected. This does not mean governance requirements are relaxed — it means we are ensuring they are properly enforced."

### 8.4 Enforcement Defects vs. PR Defects

**Principle**: Distinguish between **PR defects** (PR contains violations) and **enforcement defects** (gate/validator is broken).

**Communication Guideline**:
- Clearly state whether gate failure is due to PR content or enforcement infrastructure  
- PR defects: Provide corrective action for PR (revert changes, fix violations)  
- Enforcement defects: Provide corrective action for governance infrastructure (fix validator, fix gate logic)

**Example Language (PR Defect)**:
> "This gate failure is caused by out-of-scope changes in the PR. The validator is functioning correctly. Corrective action: revert the violating changes."

**Example Language (Enforcement Defect)**:
> "This gate failure is caused by a defect in the validator implementation. The PR content is not the issue. Corrective action: fix the validator in a separate governance PR."

---

## 9. Separation: Governance Definition vs. Execution Responsibility

### 9.1 This Document Defines Protocol Only

This document establishes:
- **What** Foreman should communicate when a gate fails  
- **How** to structure gate failure responses  
- **When** to escalate vs. when to provide guidance  
- **What** metadata to include for audit trail

This document does **NOT**:
- ❌ Implement gate execution logic  
- ❌ Provide automation or tooling for gate responses  
- ❌ Execute validators or gates  
- ❌ Generate responses automatically

### 9.2 Execution Responsibility Per Agent Role

Execution of this protocol is the responsibility of:

**Foreman**:
- Detect gate failures (from CI output, gate executor logs)  
- Classify gate failure type (validator FAIL, precondition FAIL, infrastructure FAIL, applicability mismatch)  
- Select appropriate response template (Section 5)  
- Populate template with failure-specific details  
- Determine escalation necessity (Section 6)  
- Post response in PR as comment  
- Track gate failure for lesson promotion consideration

**Governance Administrator**:
- Maintain this protocol document as canonical governance  
- Update response templates when new gate failure patterns are identified  
- **Never** execute gate responses (Foreman's responsibility)

**Johan Ras**:
- Receive escalations  
- Approve corrective actions for governance-class failures  
- Resolve ambiguities in gate requirements  
- Authorize governance changes resulting from gate failures

### 9.3 No Implied Automation

This protocol does **not** imply:
- Automated gate failure detection (Foreman does this manually via CI output)  
- Automated response generation (Foreman uses templates but composes manually)  
- Automated escalation (Foreman determines escalation necessity)  
- Automated lesson promotion (per `LESSONS_TO_CANON_WORKFLOW.md`, promotion requires Johan approval)

Such automation **may** be implemented in future, but requires separate architecture and approval.

---

## 10. Alignment with One-Time Build Law

This protocol supports **One-Time Build Law** by:

### 10.1 Preventing Governance Regression

- Standard responses reinforce canonical governance principles  
- Explicit prohibition on weakening tests prevents regression  
- Escalation triggers catch potential governance weakening attempts

**Effect**: Gate failures strengthen governance over time, never weaken it.

### 10.2 Ensuring Predictable Enforcement

- Consistent response structure makes gate failures predictable  
- Clear corrective actions enable builders to fix violations confidently  
- Metadata tracking enables pattern detection and lesson promotion

**Effect**: Builders can achieve 100% GREEN QA because gate expectations are clear and consistent.

### 10.3 Enabling Continuous Improvement

- Gate failure responses inform lesson promotion (per `LESSONS_TO_CANON_WORKFLOW.md`)  
- Validator convergence violations are escalated and corrected  
- Gate applicability mismatches are promoted to canonical clarification

**Effect**: Each gate failure makes governance stronger and more precise.

---

## 11. Alignment with Existing Governance

This protocol aligns with and reinforces:

### 11.1 Lessons to Canon Workflow

**From**: `maturion/process/LESSONS_TO_CANON_WORKFLOW.md`

**Alignment**:
- Gate failures qualify as lessons (Section 3.2: Gate Failure Pattern)  
- Foreman detects gate failure patterns and proposes promotion  
- Escalation triggers ensure qualifying lessons reach Johan for approval  
- Response metadata provides evidence for promotion decision

### 11.2 Validator Convergence Checklist

**From**: `maturion/process/VALIDATOR_CONVERGENCE_CHECKLIST.md`

**Alignment**:
- Response templates distinguish between validator FAIL (correct) and validator defect (convergence violation)  
- Validator convergence violations trigger mandatory escalation  
- Response metadata enables convergence validation and audit

### 11.3 One-Time Build Law

**From**: `governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md` Section 3

**Alignment**:
- Standard responses reinforce Build-to-Green requirements  
- Prohibition on weakening tests preserves QA-as-Proof  
- Clear corrective actions enable 100% GREEN QA on first attempt

### 11.4 Agent Role Gate Applicability

**From**: `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md`

**Alignment**:
- Response templates include gate applicability mismatch detection  
- Mandatory escalation for applicability mismatches ensures misapplied gates are corrected  
- Responses preserve builder rigor while enabling governance work

---

## 12. Audit Readiness and Enforceability

### 12.1 Audit Trail Requirements

Every gate failure response MUST maintain:
- **Gate Failure ID**: Unique identifier for traceability  
- **Timestamp**: When gate failure occurred  
- **PR Context**: Which PR, branch, agent role  
- **Failure Evidence**: Violations detected, validators failed, severity  
- **Response Action**: What corrective action was recommended  
- **Escalation Record**: Whether escalated, to whom, outcome  
- **Canonical References**: Which canonical governance artifacts were cited

### 12.2 Audit Questions (Must Be Answerable)

For any gate failure response, the following MUST be answerable:

1. **What gate failed?** (Gate name, validator name)  
2. **Why did it fail?** (Root cause: PR defect, enforcement defect, applicability mismatch)  
3. **What was the response?** (Which template was used, what corrective action recommended)  
4. **Was it escalated?** (Yes/No, to whom, why)  
5. **What was the outcome?** (Gate passed after fix? Validator corrected? Canon updated?)  
6. **Was lesson promoted?** (Did this gate failure result in canonical update?)

### 12.3 Enforceability

This protocol is enforceable through:

**Code Review**:  
Foreman's PR comments reviewed for adherence to standard response templates.

**Escalation Discipline**:  
Johan reviews escalations to ensure mandatory escalation triggers were followed.

**Lesson Promotion**:  
Gate failure patterns tracked and promoted per `LESSONS_TO_CANON_WORKFLOW.md`.

**Audit**:  
Periodic review of gate failure responses to ensure protocol compliance and identify improvement opportunities.

---

## 13. Cross-References

This protocol aligns with and references:

1. **`maturion/canon/BOOTSTRAP_CANON.md`** (when created)  
   - Source of truth for bootstrap requirements and gate semantics

2. **`governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md`**  
   - Section 2: Governance as Canonical Memory  
   - Section 3: Build Philosophy (One-Time Build Law)  
   - Section 4: Roles and Responsibilities (Foreman duties)

3. **`GOVERNANCE_GATE_CANON.md`**  
   - Section 3: Core Principles (Agent-Role-Based Applicability, Zero-Tolerance Enforcement)  
   - Section 4: Evidence-Based Validation  
   - Section 6: Execution Point (Pre-Conditions)

4. **`governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md`**  
   - Section 3: Core Principle (Agent role is authoritative)  
   - Section 4: Agent Role Definitions  
   - Section 6: Gate Applicability Matrix

5. **`maturion/process/LESSONS_TO_CANON_WORKFLOW.md`**  
   - Section 3: What Qualifies as a Lesson Learned  
   - Section 4: Promotion Criteria  
   - Section 6: Review Stages for Canon Promotion

6. **`maturion/process/VALIDATOR_CONVERGENCE_CHECKLIST.md`**  
   - Section 4: Mandatory Validator Checks  
   - Section 6: Terminal Pass/Fail Rules  
   - Section 11: Validator Convergence Validation Checklist

---

## 14. Explicit Non-Scope

This protocol **does not**:
- ❌ Implement gate execution logic or automation  
- ❌ Define validator logic or convergence implementation  
- ❌ Create CI/CD pipelines for gate enforcement  
- ❌ Provide automated response generation tooling  
- ❌ Replace Foreman's judgment (protocol provides structure, Foreman provides interpretation)  
- ❌ Override canonical governance (higher canon prevails)

---

## 15. Revision History

| Version | Date       | Author                | Changes                              |
|---------|------------|-----------------------|--------------------------------------|
| v1      | 2025-12-23 | Governance Admin      | Initial creation per Issue #653      |

---

**End of GOVERNANCE GATE STANDARD RESPONSE**

🔒 **Effect**:  
This protocol ensures Foreman provides consistent, professional, actionable responses to governance gate failures, reinforcing canonical governance principles (One-Time Build Law, Build-to-Green, QA-as-Proof) while enabling continuous improvement through lesson promotion. Gate failures become learning opportunities that strengthen governance over time, never weaken it.
