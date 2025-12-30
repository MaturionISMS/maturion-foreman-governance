# PR GATE EVALUATION AND ROLE PROTOCOL

## Status
**Type**: Constitutional Governance Rule  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2025-12-23  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Precedence**: Subordinate only to GOVERNANCE_PURPOSE_AND_SCOPE.md

---

## 1. Purpose

This document defines the **canonical operational protocol** for evaluating PR gates based on agent role applicability. It serves as the authoritative reference for gate evaluation semantics, ensuring consistent, predictable, and role-aware enforcement across all Maturion systems.

This protocol resolves **Documentation Gap D-002** identified in the Governance Dependency and Activation Readiness Scan.

**Objectives:**
- Establish explicit gate evaluation process by agent role
- Define evaluation order and precedence
- Distinguish legacy gates from modern governance model
- Specify handling of contradictory or ambiguous gate results
- Provide escalation procedures for stuck PRs
- Enable auditable, deterministic gate enforcement

---

## 2. Governance Authority

This protocol derives authority from and operationalizes:

| Canonical Document | Authority Relationship |
|-------------------|----------------------|
| **AGENT_ROLE_GATE_APPLICABILITY.md** | Defines which gates apply to which agent roles |
| **PR_GATE_PRECONDITION_RULE.md** | Defines gate precondition requirements ("No green gate, no handover") |
| **GOVERNANCE_ENFORCEMENT_TRANSITION.md** | Deprecates legacy gates, establishes modern model as authoritative |
| **BYG_DOCTRINE.md** | Defines agent roles (Foreman, Builder, Codex, Human) and authorities |
| **GOVERNANCE_PURPOSE_AND_SCOPE.md** | Establishes governance as canonical memory |
| **GOVERNANCE_COMPLETENESS_MODEL.md** | Defines governance enforcement semantics |

This protocol is a **lower-level operational document** that implements the canonical principles defined in these higher-authority sources. Where conflicts exist, higher-authority documents prevail.

---

## 3. Core Principles

### 3.1 Agent Role is Authoritative

**Principle**: Gate applicability is determined by **agent role**, not by file paths, workflow triggers, PR metadata, or heuristics.

**Rationale**: Only the agent's canonical role defines their responsibilities and therefore the gates they must satisfy.

### 3.2 Gates Prove Compliance, Not Discover Defects

**Principle**: PR gates are **enforcement mechanisms**, not discovery tools.

**Rationale**: Per One-Time Build Law, QA-as-Proof philosophy, and CI_CONFIRMATORY_NOT_DIAGNOSTIC.md, agents must achieve compliance **before** handover. Gates verify that compliance was achieved, not discover problems.

**Canonical Reference**: governance/canon/CI_CONFIRMATORY_NOT_DIAGNOSTIC.md

### 3.3 Predictable Enforcement

**Principle**: Gate evaluation must be **deterministic and predictable**.

**Rationale**: Agents must be able to predict gate outcomes before submission. Unpredictable gate failures indicate governance defects, not agent failures.

### 3.4 No Weakening Through Protocol

**Principle**: This operational protocol does **not** weaken enforcement defined in canonical sources.

**Rationale**: Protocol clarifies **how** to evaluate gates; it does not change **what** gates require or **when** they apply.

---

## 4. Agent Role Definitions (Operational Summary)

This section summarizes agent roles for gate evaluation purposes. Full definitions exist in source documents (BYG_DOCTRINE.md, AGENT_ROLE_GATE_APPLICABILITY.md).

### 4.1 Builder Agents

**Identity**: Agents executing build-to-green for application code changes

**Canonical Reference**: 
- `governance/canon/AGENT_RECRUITMENT.md` (Section 4.1)
- `governance/canon/BUILDER_FIRST_PR_MERGE_MODEL.md`
- `BUILD_PHILOSOPHY.md`

**Gate Scope**: Subject to **full governance enforcement** including:
- Build-to-Green enforcement
- Architecture completeness
- Builder QA reports (`.qa/builder/*` artifacts)
- 100% GREEN QA (QIEL enforcement)
- Build Philosophy compliance
- All Constitutional Safeguards (CS1-CS6)

### 4.2 Governance Administrator Agents

**Identity**: Agents maintaining governance artifacts, schemas, policies, and enforcement

**Canonical Reference**:
- `governance/agents/governance-administrator.agent.md`
- `governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md`
- `governance/canon/GOVERNANCE_COMPLETENESS_MODEL.md`

**Gate Scope**: Subject to **governance-scoped enforcement only**:
- Governance artifact compliance (schemas, policies valid)
- Governance enforcement alignment (no weakening)
- Constitutional Safeguards (CS1 for governance files only)
- **NOT** subject to builder-specific gates (Build-to-Green, architecture artifacts, builder QA reports)

**Rationale**: Governance administrators maintain documentation and policy artifacts, not executable applications requiring builds/tests.

### 4.3 FM (Foreman) Agents

**Identity**: Agents orchestrating builds, managing workflows, and enforcing governance

**Canonical Reference**:
- `governance/philosophy/BYG_DOCTRINE.md` (Section 3)
- `governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md`

**Gate Scope**: Subject to **FM-scoped governance requirements**:
- FM orchestration contracts satisfied
- Learning promotion rules followed
- Failure promotion rules followed
- Effectiveness tracking maintained
- Constitutional Safeguards (CS1 for FM-owned files, CS3, CS4, CS5, CS6)
- **NOT** subject to builder-specific gates unless FM is acting as a builder

**Rationale**: FM orchestrates and governs. Builder gates apply only when FM produces application code.

### 4.4 Human Authority

**Identity**: Johan Ras (final authority, sole release authority)

**Canonical Reference**: `governance/philosophy/BYG_DOCTRINE.md` (Section 3)

**Gate Scope**: Human authority is **not subject to automated gates**. Human has:
- Sole release authority
- Sole authority to classify failures as architectural
- Authority to approve or reject governance changes
- Final arbiter of escalation decisions

---

## 5. Gate Classification (Legacy vs. Modern)

### 5.1 Legacy Gate Model (DEPRECATED)

**Status**: Deprecated as of 2025-12-23 per `GOVERNANCE_ENFORCEMENT_TRANSITION.md`

**Characteristics**:
- Assumed uniform gate applicability across all agent roles
- Inferred applicability from workflow triggers and file paths
- Lacked explicit agent role-aware logic
- Did not distinguish governance validation from builder QA validation

**Prohibition**: Agents MUST NOT rely on legacy gate semantics for compliance decisions.

**Transition Rule**: Until all gates implement role-aware logic, governance administrator PRs blocked by misapplied builder gates may be overridden with citation of AGENT_ROLE_GATE_APPLICABILITY.md as authority.

### 5.2 Modern Gate Model (CANONICAL)

**Status**: Authoritative as of 2025-12-23 per `GOVERNANCE_ENFORCEMENT_TRANSITION.md`

**Characteristics**:
- Explicit agent role-aware gate applicability
- Gates evaluate based on agent's canonical role
- Clear separation between governance compliance and execution compliance
- Deterministic, predictable enforcement
- Supports Gate-Predictive Compliance Analysis (GPCA)

**Authority**: Modern gate model is defined in:
- `GOVERNANCE_COMPLETENESS_MODEL.md` (enforcement semantics)
- `AGENT_ROLE_GATE_APPLICABILITY.md` (role-to-gate mapping)
- `PR_GATE_PRECONDITION_RULE.md` (precondition requirements)

---

## 6. Gate Evaluation Process

This section defines the **step-by-step operational protocol** for evaluating PR gates.

### 6.1 Phase 1: Agent Role Detection

**Objective**: Determine the agent role submitting the PR

**Methods** (in order of preference):

#### Method 1: Explicit Agent Declaration
- Agent declares role in PR description or commit message
- Format: `AGENT_ROLE: builder` or `AGENT_ROLE: governance-administrator` or `AGENT_ROLE: fm`
- Gates read declared role and proceed to Phase 2

#### Method 2: Agent Contract Reference
- Agent references its `.agent` contract file in PR description
- Gate reads contract to determine role
- Contract must include `role:` field with value `builder`, `governance-administrator`, or `fm`

#### Method 3: Repository Context (Governance Repo Only)
- **Applies only to**: `maturion-foreman-governance` repository
- **Logic**:
  - IF PR contains only governance artifacts (schemas, policies, canon, templates)
  - AND no application code (no `src/`, `app/`, `lib/`, build configs)
  - THEN assume `governance-administrator` role
  - OTHERWISE require explicit agent declaration
- **Rationale**: Governance repo is pure governance; changes to governance artifacts typically come from governance administrator

#### Method 4: Escalation (If Role Cannot Be Determined)
- If none of the above methods successfully identify agent role
- Gate MUST fail with clear error message
- Error message MUST instruct agent to declare role explicitly
- **Example Error Message**:
  ```
  ❌ PR Gate Failed: Unable to Determine Agent Role
  
  This PR does not declare an agent role. PR gate evaluation requires explicit role declaration.
  
  Please add one of the following to your PR description:
  - AGENT_ROLE: builder
  - AGENT_ROLE: governance-administrator
  - AGENT_ROLE: fm
  
  Canonical Reference: governance/canon/PR_GATE_EVALUATION_AND_ROLE_PROTOCOL.md Section 6.1
  ```

**PROHIBITED Methods**:
- ❌ Inferring role solely from file paths
- ❌ Inferring role from PR title or description prose
- ❌ Inferring role from GitHub user or team
- ❌ Default assumptions without verification

**Output**: Agent role identified: `builder`, `governance-administrator`, `fm`, or `unknown` (escalation required)

---

### 6.2 Phase 2: Applicable Gate Selection

**Objective**: Determine which gates apply to the detected agent role

**Process**:

1. **Load Agent Role Gate Mapping** from `AGENT_ROLE_GATE_APPLICABILITY.md`

2. **Select Applicable Gates** based on agent role:

#### For Builder Agents:
```
APPLICABLE_GATES = [
  "Build-to-Green Enforcement",
  "Architecture Completeness Validation",
  "Builder QA Reports",
  "100% GREEN QA (QIEL)",
  "Build Philosophy Compliance",
  "Constitutional Safeguards (CS1-CS6, GSR)"
]
```

#### For Governance Administrator Agents:
```
APPLICABLE_GATES = [
  "Governance Artifact Compliance",
  "Governance Enforcement Alignment",
  "Constitutional Safeguards (CS1 for governance files only)"
]
```

#### For FM Agents:
```
APPLICABLE_GATES = [
  "FM Orchestration Contracts",
  "Learning Promotion Rules",
  "Failure Promotion Rules",
  "Effectiveness Tracking",
  "Constitutional Safeguards (CS1 for FM-owned files, CS3-CS6)"
]

# Additional gates if FM is acting as builder:
IF fm_is_building_application_code:
  APPLICABLE_GATES += [
    "Build-to-Green Enforcement",
    "Architecture Completeness Validation",
    "Builder QA Reports"
  ]
```

3. **Exclude Inapplicable Gates**: All gates not in `APPLICABLE_GATES` list for the detected role are **not evaluated** for this PR.

**Output**: List of gates that will be evaluated in Phase 3

---

### 6.3 Phase 3: Gate Evaluation

**Objective**: Evaluate each applicable gate and record results

**Process**:

1. **For each gate in APPLICABLE_GATES:**
   
   a. **Load Gate Requirements** from canonical source (e.g., BUILDER_FIRST_PR_MERGE_MODEL.md for Builder QA Reports gate)
   
   b. **Evaluate Gate Logic** against PR contents:
      - Check for required artifacts
      - Validate artifact schemas
      - Verify preconditions satisfied
      - Validate semantic requirements (e.g., `build_status == "PASS"`)
   
   c. **Record Gate Result**:
      - `PASS`: Gate requirement satisfied
      - `FAIL`: Gate requirement not satisfied
      - `SKIP`: Gate not applicable (should not occur if Phase 2 is correct)
      - `ERROR`: Gate evaluation encountered error (governance defect)

2. **For each evaluated gate, generate detailed output:**
   - Gate name
   - Gate result (PASS/FAIL/ERROR)
   - If FAIL or ERROR: specific requirement not satisfied
   - If FAIL or ERROR: canonical reference for requirement
   - If FAIL or ERROR: suggested corrective action

**Example Gate Evaluation Output**:
```
✅ Gate: Governance Artifact Compliance
   Status: PASS
   Details: All governance schemas validated successfully

❌ Gate: Builder QA Reports
   Status: FAIL
   Agent Role: builder
   Failed Requirement: Builder QA artifact missing
   Missing Artifact: .qa/builder/BUILD_QA_REPORT.json
   Canonical Reference: governance/canon/BUILDER_FIRST_PR_MERGE_MODEL.md
   Action Required: Generate Builder QA reports before handover
```

**Output**: Gate evaluation results for all applicable gates

---

### 6.4 Phase 4: Overall PR Gate Status Determination

**Objective**: Determine overall PR gate status based on individual gate results

**Logic**:

```pseudocode
function determinePRGateStatus(gate_results):
    // Count gates by result
    num_pass = count(gate_results where result == PASS)
    num_fail = count(gate_results where result == FAIL)
    num_error = count(gate_results where result == ERROR)
    num_total = length(gate_results)
    
    // Determine overall status
    if num_error > 0:
        return "ERROR" // Governance defect - escalate
    elif num_fail > 0:
        return "FAIL"  // Agent did not satisfy requirements
    elif num_pass == num_total:
        return "PASS"  // All gates satisfied
    else:
        return "ERROR" // Unexpected state - escalate
    end if
end function
```

**PR Gate Status Values**:
- `PASS`: All applicable gates passed. PR may proceed to review/merge.
- `FAIL`: One or more applicable gates failed. PR must be corrected.
- `ERROR`: Gate evaluation encountered error. Governance defect suspected. Escalate to Governance Administrator.

**Output**: Overall PR gate status with summary of results

---

### 6.5 Phase 5: Result Communication and Next Steps

**Objective**: Communicate gate results to submitting agent and provide clear next steps

#### If PR Gate Status == PASS:

**Communication**:
```
✅ PR Gate Evaluation: PASS

Agent Role: {detected_role}
Gates Evaluated: {num_gates}
Result: All applicable gates satisfied

This PR satisfies all required governance gates and may proceed to review/merge.

Canonical Reference: governance/canon/PR_GATE_PRECONDITION_RULE.md
```

**Next Steps**: PR may proceed to human review and merge consideration

---

#### If PR Gate Status == FAIL:

**Communication**:
```
❌ PR Gate Evaluation: FAIL

Agent Role: {detected_role}
Gates Evaluated: {num_gates}
Gates Failed: {num_failed}

Failed Gates:
{list of failed gates with details from Phase 3}

Action Required: Correct the above failures and re-submit PR for gate evaluation.

Canonical Reference: governance/canon/PR_GATE_PRECONDITION_RULE.md
```

**Next Steps**: Agent must correct failures and re-submit PR. Gate evaluation will re-run.

**Prohibition**: Per PR_GATE_PRECONDITION_RULE.md, PR MAY NOT proceed to review/merge with failed gates.

---

#### If PR Gate Status == ERROR:

**Communication**:
```
⚠️ PR Gate Evaluation: ERROR

Agent Role: {detected_role}
Gates Evaluated: {num_gates}
Gates with Errors: {num_errors}

Error Details:
{list of gates with errors and error messages}

This indicates a potential governance defect, not an agent failure.

Action Required: HALT execution. Escalate to Governance Administrator.

Provide the following information in escalation:
- This error message (complete)
- Agent role: {detected_role}
- PR description and diff
- Minimal reproduction steps

Canonical Reference: governance/canon/GOVERNANCE_ENFORCEMENT_TRANSITION.md Section 5
```

**Next Steps**: Agent MUST halt execution and escalate to Governance Administrator. Agent MUST NOT attempt to work around gate error or modify governance to satisfy gate.

---

## 7. Evaluation Order and Precedence

### 7.1 Gate Evaluation Order

Gates are evaluated in the following order to optimize for fast failure and clear error messaging:

1. **Agent Role Detection** (Phase 1) - If this fails, all subsequent evaluation is blocked
2. **Constitutional Safeguards (CS1)** - Protected file modification detection
3. **Governance Artifact Compliance** (for governance admin) or **Architecture Completeness** (for builder)
4. **QA Enforcement Gates** (QIEL, Builder QA Reports, etc.) - for builder
5. **Governance-Specific Gates** (Learning Promotion, Failure Promotion, etc.) - for FM
6. **Additional Constitutional Safeguards** (CS2-CS6, GSR)

**Rationale**: Early evaluation of fundamental requirements (role detection, constitutional protections) prevents wasted evaluation of lower-priority gates that would be irrelevant if fundamentals are violated.

### 7.2 Short-Circuit Behavior

**Rule**: Gate evaluation MAY short-circuit (stop early) on first `ERROR` result.

**Rationale**: `ERROR` results indicate governance defects requiring escalation. Continuing evaluation would provide no additional value and could confuse diagnosis.

**Guarantee**: Gate evaluation MUST NOT short-circuit on `FAIL` results. All applicable gates must be evaluated so the agent receives complete feedback on all requirements not satisfied.

### 7.3 Precedence of Gate Requirements

When multiple gates specify overlapping or conflicting requirements, precedence is determined by canonical authority hierarchy:

1. **GOVERNANCE_PURPOSE_AND_SCOPE.md** (highest)
2. **BYG_DOCTRINE.md**
3. **AGENT_ROLE_GATE_APPLICABILITY.md**
4. **Specific canonical models** (e.g., BUILDER_FIRST_PR_MERGE_MODEL.md)
5. **Gate implementation** (lowest)

**Rule**: If a gate implementation contradicts a higher-authority canonical document, the **canonical document is authoritative**. The gate implementation is defective and must be corrected.

---

## 8. Handling Contradictory or Ambiguous Gate Results

### 8.1 Contradictory Gate Results

**Definition**: Contradictory gate results occur when:
- Two applicable gates evaluate the same requirement differently (one PASS, one FAIL)
- Gate logic produces inconsistent results on re-evaluation without PR changes
- Gate evaluation produces result inconsistent with canonical requirements

**Classification**: Contradictory gate results are **governance defects**, not agent failures.

**Response Protocol**:
1. **Halt gate evaluation** immediately
2. **Set overall PR gate status to ERROR**
3. **Generate detailed error report**:
   - List contradictory gates
   - Show conflicting results
   - Cite canonical sources for each gate
4. **Escalate to Governance Administrator**
5. **Do NOT** ask agent to resolve contradiction (agent cannot fix governance defect)

**Example Error Message**:
```
⚠️ PR Gate Evaluation: ERROR - Contradictory Gate Results Detected

Gate A: "Builder QA Reports"
  Result: PASS
  Canonical Reference: governance/canon/BUILDER_FIRST_PR_MERGE_MODEL.md
  
Gate B: "QIEL Enforcement"
  Result: FAIL
  Reason: test_status != "PASS"
  Canonical Reference: governance/canon/BUILDER_FIRST_PR_MERGE_MODEL.md

Contradiction: Both gates reference the same canonical source and evaluate related
requirements (Builder QA), but produce inconsistent results. This indicates a
governance defect in gate implementation logic.

Action Required: HALT execution. Escalate to Governance Administrator.

Classification: GOVERNANCE_DEFECT (not agent failure)
```

---

### 8.2 Ambiguous Gate Requirements

**Definition**: Ambiguous gate requirements occur when:
- Gate requirement language is unclear or admits multiple interpretations
- Canonical source does not provide sufficient detail to evaluate requirement
- Gate cannot determine if requirement is satisfied due to missing context

**Classification**: Ambiguous requirements are **governance incompleteness defects**.

**Response Protocol**:
1. **Set gate result to ERROR** (not FAIL - agent is not at fault)
2. **Generate detailed error report**:
   - Cite ambiguous requirement text
   - Explain ambiguity
   - Cite canonical source
3. **Escalate to Governance Administrator for clarification**
4. **Do NOT** guess at interpretation or apply heuristics

**Example Error Message**:
```
⚠️ Gate Evaluation: ERROR - Ambiguous Requirement

Gate: "Architecture Completeness Validation"
Requirement: "Architecture document must be complete"
Canonical Reference: governance/canon/ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md

Ambiguity: "Complete" is not defined with objective criteria. Gate cannot determine
if architecture document satisfies this requirement without subjective judgment.

Action Required: Escalate to Governance Administrator for requirement clarification.

Classification: GOVERNANCE_INCOMPLETENESS (governance defect)
```

---

### 8.3 Misapplied Gate Detection

**Definition**: Misapplied gate occurs when:
- Builder-specific gate is applied to governance administrator PR
- Governance-specific gate is applied to builder PR
- Gate applicability does not match agent role per AGENT_ROLE_GATE_APPLICABILITY.md

**Classification**: Misapplied gates are **governance defects**, not agent failures.

**Response Protocol**:
1. **Detect misapplication** during Phase 2 (Applicable Gate Selection)
2. **Exclude misapplied gate** from evaluation
3. **Log misapplication** for governance administrator review
4. **Continue gate evaluation** with correctly applicable gates
5. **Generate warning message** (not ERROR - evaluation can proceed, but governance needs correction)

**Example Warning Message**:
```
⚠️ Warning: Misapplied Gate Detected (Non-Blocking)

Gate: "Builder QA Reports"
Agent Role: governance-administrator
Applicability: This gate applies to "builder" role only
Canonical Reference: governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md Section 5.1.3

Action Taken: Gate excluded from evaluation for this PR (correct behavior per canon)

Governance Action Required: Gate implementation should detect agent role and skip
evaluation for non-applicable roles. This warning indicates gate logic needs update.

Classification: GOVERNANCE_DEFECT (gate implementation needs role-aware logic)
```

**Guarantee**: Misapplied gates MUST NOT cause PR to fail. Agent satisfying all applicable gates for their role must achieve PASS status.

---

## 9. Stuck PR Handling

### 9.1 Stuck PR Definition

Per `GOVERNANCE_ENFORCEMENT_TRANSITION.md` Section 5.1, a PR is **stuck** when:

1. **Governance Contradiction**: Gate enforcement contradicts canonical governance policy
2. **Governance Gap**: Required governance artifact is missing, preventing compliant submission
3. **Pending Owner Decision**: Ambiguous governance interpretation requires human authority escalation
4. **Circular Dependency**: Gate requires artifact that cannot be produced within current governance scope

A PR is **NOT stuck** when:
- Builder QA fails due to implementation defects (builder responsibility)
- Tests fail due to code errors (builder responsibility)
- Linting fails due to style violations (builder responsibility)
- Build fails due to compilation errors (builder responsibility)

### 9.2 Stuck PR Detection

**Detection Methods**:
- Gate evaluation produces `ERROR` status (Phase 4)
- Contradictory gate results detected (Section 8.1)
- Ambiguous gate requirements detected (Section 8.2)
- Agent reports inability to satisfy gate despite complying with canonical requirements

### 9.3 Stuck PR Response Protocol

**Prohibition**: When PR is stuck, agent MUST NOT:
- Enter indefinite retry/rebuild loops
- Disable gates to force merge
- Create placeholder artifacts to satisfy gates
- Modify governance to weaken enforcement

**Required Actions**:
1. **HALT execution** immediately
2. **Classify stuck reason**: governance defect vs. implementation defect
3. **Escalate to Governance Administrator** with:
   - Exact gate failure/error message
   - Agent role and responsibility domain
   - Canonical governance references (if applicable)
   - Minimal reproduction steps
   - PR diff and description
4. **AWAIT governance resolution** - do not proceed until governance provides corrective action

**Escalation Path**:
```
Submitting Agent 
  → Governance Administrator 
  → Johan Ras (if governance ambiguity exists)
```

### 9.4 Governance Administrator Response to Stuck PR

**Governance Administrator Responsibilities**:

1. **Classify Root Cause**:
   - Governance contradiction (conflicting canonical requirements)
   - Governance gap (missing canonical requirement or definition)
   - Governance incompleteness (ambiguous canonical requirement)
   - Gate implementation defect (gate logic does not match canon)
   - Agent misunderstanding (agent failure, not governance failure)

2. **If Governance Defect**:
   - Update canonical governance to resolve contradiction/gap/ambiguity
   - Update gate implementation to align with canon
   - Document in governance evolution log
   - Provide updated guidance to agent
   - Unblock PR if agent is compliant with corrected governance

3. **If Agent Failure**:
   - Provide clarification on canonical requirements
   - Direct agent to satisfy requirements
   - Do NOT modify governance to accommodate agent failure

---

## 10. Escalation Procedures

### 10.1 Escalation Triggers

Escalation is required when:
- Gate evaluation produces `ERROR` status
- Contradictory gate results detected
- Ambiguous gate requirements detected
- PR is stuck (Section 9)
- Agent cannot determine applicable gate requirements
- Agent role cannot be determined

### 10.2 Escalation Levels

Per `governance/escalation/ESCALATION_POLICY.md`:

| Level | Authority | Escalation Trigger |
|-------|-----------|-------------------|
| **L1: Builder** | Builder agent | Implementation defects, test failures, build failures |
| **L2: Foreman (FM)** | FM orchestration agent | Architecture failures, QA design failures, builder coordination failures |
| **L3: Codex** | Governance mutation executor | Governance defects, gate logic defects, canonical contradictions |
| **L4: Human (Johan Ras)** | Final authority | Governance ambiguity, architectural classification, release authority |

### 10.3 Escalation Protocol for Gate Evaluation Failures

**If Gate Status == FAIL**:
- **Classification**: Agent responsibility (implementation defect)
- **Escalation Level**: L1 (Builder) or L2 (FM, depending on agent role)
- **Action**: Agent corrects failures, re-submits PR

**If Gate Status == ERROR**:
- **Classification**: Governance defect
- **Escalation Level**: L3 (Codex / Governance Administrator)
- **Action**: Governance Administrator corrects governance or gate implementation
- **Further Escalation to L4**: If governance ambiguity exists or canonical change required

### 10.4 Human Notification Requirements

Per `GOVERNANCE_INCIDENT_RESPONSE_DOCTRINE.md`, human (Johan Ras) must be notified when:
- PR remains stuck for more than 1 business day
- Gate evaluation produces `ERROR` status repeatedly (same root cause)
- Governance defect requires canonical policy change
- Escalation to L4 is triggered

**Notification Methods** (to be documented per Gap W-005):
- GitHub issue creation in governance repository
- Direct notification (email/Slack)
- PR comment tagging @johanras

---

## 11. Audit and Compliance

### 11.1 Gate Evaluation Audit Trail

**Requirement**: Every gate evaluation MUST generate a complete audit trail including:
- Timestamp of evaluation
- PR identifier (number, branch, commit SHA)
- Agent role detected
- List of applicable gates
- Result for each gate (PASS/FAIL/ERROR)
- Overall PR gate status
- Canonical references for all requirements evaluated

**Storage**: Audit trail MUST be stored in:
- GitHub Actions workflow logs (for CI-executed gates)
- Evidence artifacts (per `EVIDENCE_CATALOG.schema.md`) (for FM app-executed gates)
- PR comments (summary only, with link to full logs)

**Retention**: Audit trails MUST be retained per audit readiness requirements (minimum 3 years for compliance).

### 11.2 Compliance and Standards Alignment

This gate evaluation protocol aligns with:

| Standard | Requirement | Alignment |
|----------|-------------|-----------|
| **ISO 27001** (Information Security Management) | Documented governance controls, audit trails | Audit trail requirement (11.1), canonical authority traceability |
| **ISO 31000** (Risk Management) | Governance defect classification, escalation procedures | Section 8 (contradictions/ambiguity), Section 9 (stuck PR handling) |
| **NIST Cybersecurity Framework** | Governance as predictable, auditable control mechanism | Deterministic evaluation (Section 6), precedence rules (Section 7.3) |

**Governance Assurance Principle**: Gate evaluation protocol strengthens governance assurance by:
- Increasing enforcement precision (role-aware gates)
- Reducing false positive gate failures
- Improving audit traceability (canonical reference in every gate result)
- Establishing clear escalation paths (stuck PR handling)

### 11.3 Periodic Gate Evaluation Audit

**Requirement**: Governance Administrator MUST periodically audit gate evaluation to verify:
- Agent role detection is implemented correctly
- Gate applicability logic matches AGENT_ROLE_GATE_APPLICABILITY.md
- No gates use prohibited inference methods (file paths, workflow triggers)
- Failure messages are clear and role-specific
- No builder gates are applied to non-builder agents

**Audit Frequency**: Quarterly, or after any gate modification or canonical governance change affecting gate evaluation

---

## 12. Operational Checklists Reference

This protocol is operationalized through **PR Gate Release Checklists** that provide explicit, itemized requirements for each agent role.

### 12.1 Available Checklists

| Agent Role | Checklist Location | Purpose |
|-----------|-------------------|---------|
| **Builder Agent** | `governance/templates/PR_GATE_RELEASE_CHECKLIST_BUILDER.md` | Complete requirements for builder PR handover |
| **Governance Administrator** | `governance/templates/PR_GATE_RELEASE_CHECKLIST_GOVERNANCE_ADMIN.md` | Complete requirements for governance admin PR handover |
| **FM Agent** | `governance/templates/PR_GATE_RELEASE_CHECKLIST_FM.md` | Complete requirements for FM PR handover |

### 12.2 Checklist Overview

**Reference**: `governance/templates/PR_GATE_RELEASE_CHECKLISTS_README.md`

**Purpose**: Checklists enable:
- **Predictable gate outcomes**: If all checklist items satisfied → gate MUST pass
- **Pre-flight validation**: Agents can self-check before handover
- **Gate implementation guidance**: Authoritative requirements list for gate developers
- **GPCA support**: Checklists form the basis for Gate-Predictive Compliance Analysis

**Guarantee**: If all checklist items for a role are satisfied, the PR gate MUST pass. If a compliant PR fails, that is a governance defect, not an agent failure.

---

## 13. Related Documents

This protocol integrates with and clarifies:

| Document | Relationship |
|----------|--------------|
| **CI_CONFIRMATORY_NOT_DIAGNOSTIC.md** | Establishes CI as confirmation only, defines preflight evaluation obligation |
| **AGENT_ROLE_GATE_APPLICABILITY.md** | Defines which gates apply to which roles (authoritative source for Phase 2) |
| **PR_GATE_PRECONDITION_RULE.md** | Defines gate precondition requirements (no green gate, no handover) |
| **GOVERNANCE_ENFORCEMENT_TRANSITION.md** | Deprecates legacy gates, establishes modern model as authoritative |
| **BYG_DOCTRINE.md** | Defines agent roles and authorities |
| **GOVERNANCE_PURPOSE_AND_SCOPE.md** | Establishes governance as canonical memory |
| **GOVERNANCE_COMPLETENESS_MODEL.md** | Defines governance enforcement semantics |
| **BUILDER_FIRST_PR_MERGE_MODEL.md** | Defines builder QA contracts (inputs to builder gates) |
| **GATE_PREDICTIVE_COMPLIANCE_ANALYSIS.md** | Defines GPCA model (uses this protocol for prediction) |
| **ESCALATION_POLICY.md** | Defines escalation levels and authorities |
| **GOVERNANCE_INCIDENT_RESPONSE_DOCTRINE.md** | Defines governance incident classification and response |

---

## 14. FM App Alignment Requirements

For FM Office App (`maturion-foreman-app`) to fully implement this protocol:

### 14.1 Required Capabilities

1. **Agent Role Detection** (Section 6.1):
   - Implement Methods 1-3 for role detection
   - Generate clear error message if role cannot be determined

2. **Applicable Gate Selection** (Section 6.2):
   - Load gate-to-role mapping from AGENT_ROLE_GATE_APPLICABILITY.md
   - Select applicable gates based on detected role
   - Exclude inapplicable gates from evaluation

3. **Gate Evaluation** (Section 6.3):
   - For each applicable gate, load requirements from canonical source
   - Evaluate gate logic against PR contents
   - Record detailed results (PASS/FAIL/ERROR with specifics)

4. **Overall Status Determination** (Section 6.4):
   - Implement logic from Section 6.4
   - Handle ERROR status correctly (escalate, not fail agent)

5. **Result Communication** (Section 6.5):
   - Generate clear, role-specific messages
   - Include canonical references in all failure/error messages
   - Provide actionable next steps

6. **Contradiction/Ambiguity Handling** (Section 8):
   - Detect contradictory gate results
   - Detect ambiguous requirements
   - Escalate to Governance Administrator (not fail agent)

7. **Stuck PR Handling** (Section 9):
   - Detect stuck conditions
   - Halt execution (no retry loops)
   - Escalate with complete information

8. **Audit Trail Generation** (Section 11.1):
   - Generate complete audit trail for every evaluation
   - Store per retention requirements

### 14.2 Implementation Validation

**Requirement**: FM app implementation of this protocol MUST be validated against:
- Test cases covering all agent roles
- Test cases covering contradictory/ambiguous gate scenarios
- Test cases covering stuck PR scenarios
- Audit trail completeness validation

**Gap Reference**: This addresses Documentation Gap D-002 from Governance Dependency and Activation Readiness Scan.

---

## 15. Success Criteria

This protocol is successful when:

- ✅ Gate evaluation is **deterministic and predictable** (same inputs → same outputs)
- ✅ Agent role determines gate applicability **authoritatively** (no inference from metadata)
- ✅ Governance Administrator PRs are **not blocked by builder-only gates**
- ✅ Builder PR rigor is **unchanged and strict** (no weakening of builder requirements)
- ✅ FM PRs are **evaluated under correct role context**
- ✅ **No manual overrides** are required for correctly-scoped work
- ✅ Gate failures are **predictable and role-appropriate**
- ✅ Contradictory/ambiguous gate results are **detected and escalated** (not misclassified as agent failure)
- ✅ Stuck PRs are **handled systematically** (halt and escalate, not retry indefinitely)
- ✅ Complete audit trail is **generated for every gate evaluation**
- ✅ FM app implementation is **validated and aligned** with this protocol

---

## 16. Version History

### v1.0.0 (2025-12-23)
- Initial protocol definition
- Resolves Documentation Gap D-002 from Governance Dependency and Activation Readiness Scan
- Defines agent role detection (6.1)
- Defines applicable gate selection (6.2)
- Defines gate evaluation process (6.3-6.5)
- Defines evaluation order and precedence (Section 7)
- Defines contradiction/ambiguity handling (Section 8)
- Defines stuck PR handling (Section 9)
- Defines escalation procedures (Section 10)
- Defines audit requirements (Section 11)
- References operational checklists (Section 12)
- Specifies FM app alignment requirements (Section 14)

---

## 17. Authority Statement

**This protocol is constitutional and binding.**

All PR gates MUST follow this operational protocol. No repository, agent, or workflow may:
- Deviate from agent role-based gate applicability model
- Infer agent role from non-authoritative signals (file paths, workflow triggers)
- Block governance work with misapplied gates
- Weaken builder enforcement
- Skip escalation when governance defects detected
- Generate incomplete audit trails
- Create exceptions or overrides without canonical authority

**Violations are governance incidents and must be escalated per Section 10.**

---

**Status**: Active and Enforced  
**Owner**: Governance Administrator  
**Approval Authority**: Johan Ras  
**Last Updated**: 2025-12-23

---

*End of PR Gate Evaluation and Role Protocol v1.0.0*
