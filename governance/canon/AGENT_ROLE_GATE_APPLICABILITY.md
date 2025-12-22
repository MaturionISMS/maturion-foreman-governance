# AGENT ROLE GATE APPLICABILITY

## Status
**Type**: Constitutional Governance Rule  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2025-12-22  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Precedence**: Subordinate only to GOVERNANCE_PURPOSE_AND_SCOPE.md

---

## 1. Purpose

This document provides **explicit, canonical clarification** defining **which governance gates apply to which agent roles**.

The objective is to eliminate ambiguity where **builder-specific gate expectations** are incorrectly evaluated against **non-builder agents**, while preserving strict enforcement for builder handovers.

This clarification ensures that:
- Enforcement is applied strictly — but only where it applies
- Agent roles determine gate applicability authoritatively
- Builder rigor is preserved and never weakened
- Governance work is not blocked by misapplied gates
- Gate logic is precise, not inferred from metadata

---

## 2. Constitutional Mandate

This rule derives authority from and implements:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Role definitions and responsibilities
- **BUILD_PHILOSOPHY.md** - One-Time Build Law, 100% GREEN mandate for builders
- **PR_GATE_PRECONDITION_RULE.md** - Gate precondition enforcement
- **BUILDER_FIRST_PR_MERGE_MODEL.md** - Builder QA as canonical truth
- **GOVERNANCE_GATE_CANON.md** - Gate enforcement model

---

## 3. Core Principle

**Governance gates are agent-role aware.**

Gate applicability is determined by:
1. **Agent role** (authoritative - who is submitting the PR)
2. **Canonical gate definitions** (what the gate enforces)
3. **Governance contracts** (what each role must satisfy)

Gate applicability **MUST NOT** be inferred from:
- ❌ File paths modified
- ❌ Workflow triggers
- ❌ PR metadata or labels
- ❌ Repository structure
- ❌ CI analytics or heuristics

**Agent role is authoritative for gate applicability.**

---

## 4. Agent Role Definitions

### 4.1 Builder Agents

**Identity**: Agents executing build-to-green for application code changes

**Examples**:
- GitHub Copilot executing code changes
- Local builder agents
- CI/CD builder automation
- Any agent producing executable artifacts

**Canonical References**:
- `governance/canon/AGENT_RECRUITMENT.md` (Builder class definition)
- `governance/canon/BUILDER_FIRST_PR_MERGE_MODEL.md` (Builder contracts)
- `BUILD_PHILOSOPHY.md` (Build-to-Green mandate)

---

### 4.2 Governance Administrator Agents

**Identity**: Agents maintaining governance artifacts, schemas, policies, and enforcement

**Examples**:
- Governance repository administrator
- Policy maintenance agents
- Schema evolution agents
- Governance audit agents

**Canonical References**:
- `governance/agents/governance-administrator.agent.md` (Agent contract)
- `governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md` (Role definition)
- `governance/canon/GOVERNANCE_COMPLETENESS_MODEL.md` (Responsibilities)

---

### 4.3 FM (Foreman) Agents

**Identity**: Agents orchestrating builds, managing workflows, and enforcing governance

**Examples**:
- Foreman App agents
- Foreman runtime orchestration
- Workflow management agents

**Canonical References**:
- `governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md` (FM role definition)
- `.github/foreman/agent-contract.md` (FM contracts - where applicable)

---

## 5. Gate Applicability by Agent Role

### 5.1 Builder Agent Gate Requirements

Builder agents **MUST** satisfy all of the following:

#### 5.1.1 Build-to-Green Enforcement
- **Gate**: Builder QA enforcement gate
- **Requirements**:
  - Architecture designed before Red QA
  - Red QA created before build
  - Build-to-Green process completed
  - Green QA achieved (100% tests passing)
  - Zero test debt verified
- **Canonical Reference**: `BUILD_PHILOSOPHY.md`, `BUILDER_FIRST_PR_MERGE_MODEL.md`

#### 5.1.2 Architecture and Build Artifacts
- **Gate**: Architecture completeness validation
- **Requirements**:
  - Architecture document present and validated
  - Architecture checklist completed
  - Build artifacts generated
  - Evidence trail complete
- **Canonical Reference**: `governance/canon/ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md`

#### 5.1.3 Builder QA Reports
- **Gate**: Builder QA artifact enforcement
- **Requirements**:
  - `.qa/builder/BUILD_QA_REPORT.json` present and valid
  - `.qa/builder/GOVERNANCE_COMPLIANCE_REPORT.json` present and valid
  - `.qa/builder/SUMMARY.md` present
  - `build_status == "PASS"`
  - `merge_readiness.ready == true`
  - `compliance_status == "COMPLIANT"`
- **Canonical Reference**: `governance/canon/BUILDER_FIRST_PR_MERGE_MODEL.md`

#### 5.1.4 100% GREEN QA
- **Gate**: QIEL (QA Integrity Enforcement Layer)
- **Requirements**:
  - All tests executed (no skips)
  - All tests passing (100%)
  - Zero compilation errors
  - Zero lint errors
  - Zero runtime errors
  - Zero warnings (unless whitelisted)
  - Zero test debt
- **Canonical Reference**: `BUILD_PHILOSOPHY.md`, `GOVERNANCE_GATE_CANON.md`

#### 5.1.5 Build Philosophy Compliance
- **Gate**: Build process validation
- **Requirements**:
  - Architecture → Red QA → Build → Green QA sequence followed
  - Process timeline correct
  - No shortcuts or bypasses
- **Canonical Reference**: `BUILD_PHILOSOPHY.md`

#### 5.1.6 All Constitutional Safeguards
- **Gates**: CS1-CS6, GSR enforcement
- **Requirements**:
  - Constitutional integrity (CS1)
  - Architecture approval (CS2, if required)
  - Incident feedback compliance (CS3)
  - Alert system operational (CS4)
  - Performance enforcement (CS5)
  - Execution boundary compliance (CS6)
  - Governance supremacy (GSR)
- **Canonical Reference**: `GOVERNANCE_GATE_CANON.md`

**Summary**: Builder agents are subject to **full governance enforcement** including all build quality, architectural, and constitutional requirements.

---

### 5.2 Governance Administrator Agent Gate Requirements

Governance administrator agents **MUST** satisfy the following:

#### 5.2.1 Governance Artifact Compliance
- **Gate**: Governance structure validation
- **Requirements**:
  - Governance schemas valid
  - Governance policies complete
  - Canonical references correct
  - No governance contradictions
  - Governance completeness maintained
- **Canonical Reference**: `governance/canon/GOVERNANCE_COMPLETENESS_MODEL.md`

#### 5.2.2 Governance Enforcement Alignment
- **Gate**: Enforcement semantic validation (when modifying enforcement)
- **Requirements**:
  - Enforcement changes align with canon
  - No enforcement weakening
  - No CI-discovery introduction
  - Gate applicability correctly defined
- **Canonical Reference**: This document, `GOVERNANCE_GATE_CANON.md`

#### 5.2.3 Constitutional Safeguards (Governance-Scoped)
- **Gates**: CS1 (Constitutional integrity - for governance files only)
- **Requirements**:
  - No modifications to protected governance files without approval
  - No governance bypasses introduced
- **Canonical Reference**: `GOVERNANCE_GATE_CANON.md`

#### 5.2.4 Gates That DO NOT Apply
Governance administrator agents are **NOT REQUIRED** to satisfy:
- ❌ Build-to-Green enforcement (no application code to build)
- ❌ Architecture and build artifacts (governance is documentation)
- ❌ Builder QA reports (no `.qa/builder/*` artifacts expected)
- ❌ 100% GREEN QA (no tests to execute)
- ❌ Build Philosophy compliance (no build process applicable)

**Rationale**: Governance administrators maintain governance artifacts (documentation, schemas, policies). These are not executable applications requiring builds or tests. Applying builder-specific gates to governance work is a **governance error**, not a compliance failure.

**Summary**: Governance administrator agents are subject to **governance-scoped enforcement only** (schemas, policies, enforcement semantics, canonical integrity).

---

### 5.3 FM Agent Gate Requirements

FM agents **MUST** satisfy the following:

#### 5.3.1 FM-Scoped Governance Requirements
- **Gate**: FM governance compliance
- **Requirements**:
  - FM orchestration contracts satisfied
  - Learning promotion rules followed
  - Failure promotion rules followed
  - Effectiveness tracking maintained
- **Canonical Reference**: `governance/canon/LEARNING_PROMOTION_RULE.md`, `governance/canon/FAILURE_PROMOTION_RULE.md`

#### 5.3.2 Constitutional Safeguards (FM-Scoped)
- **Gates**: CS1 (for FM-owned files), CS3, CS4, CS5, CS6
- **Requirements**:
  - Incident feedback loop operational (CS3)
  - Alert system functional (CS4)
  - Continuous execution (CS5)
  - Execution boundaries respected (CS6)
- **Canonical Reference**: `GOVERNANCE_GATE_CANON.md`

#### 5.3.3 Gates That DO NOT Apply (Unless Acting as Builder)
FM agents are **NOT REQUIRED** to satisfy builder-specific gates unless explicitly acting as a builder:
- ❌ Builder QA reports (unless FM is building application code)
- ❌ Architecture artifacts (unless FM is designing new architecture)
- ❌ Build-to-Green (unless FM is executing builds)

**Rationale**: FM orchestrates and governs. When FM acts as a builder (producing application code), builder gates apply. When FM acts as orchestrator (managing governance, learning, failures), FM-scoped gates apply.

**Summary**: FM agents are subject to **FM-scoped governance requirements** as defined by canon. Builder gates apply only when FM acts as builder.

---

## 6. Non-Negotiable Invariants

### 6.1 Agent Role is Authoritative

**Invariant**: Gate applicability is determined by **agent role**, not by:
- File paths modified
- Workflow triggers
- PR labels or metadata
- Repository structure
- Heuristic inference

**Enforcement**: Gate logic **MUST** evaluate agent role explicitly. Gates that infer applicability from non-authoritative signals are **governance defects**.

---

### 6.2 Misapplied Gates are Governance Errors

**Invariant**: Applying builder-specific gates to non-builder agents is a **governance error**, not a compliance failure.

**Examples of Governance Errors**:
- Requiring `.qa/builder/BUILD_QA_REPORT.json` from Governance Administrator
- Requiring architecture artifacts from governance documentation PR
- Requiring 100% GREEN QA from schema update PR
- Requiring Build-to-Green evidence from policy clarification PR

**Response**: If misapplied gate blocks valid work:
1. Classify as governance defect (not agent failure)
2. Update gate logic to evaluate agent role correctly
3. Document in governance evolution log
4. Ensure future prevention

**NOT ALLOWED**: Asking non-builder agents to "work around" misapplied gates or produce fake artifacts to satisfy inapplicable requirements.

---

### 6.3 Builder Enforcement Remains Strict

**Invariant**: This clarification **DOES NOT** weaken builder enforcement in any way.

**Confirmation**:
- ✅ Builder agents remain subject to full Build-to-Green rigor
- ✅ Builder agents remain subject to all architecture requirements
- ✅ Builder agents remain subject to 100% GREEN QA mandate
- ✅ Builder agents remain subject to all constitutional safeguards
- ✅ No exceptions, no relaxations, no bypasses for builders

**Guarantee**: Builder PR failure rates and enforcement strictness are unchanged by this clarification.

---

### 6.4 Governance Work is Not Weakened

**Invariant**: Governance administrator agents remain subject to governance-scoped enforcement.

**Confirmation**:
- ✅ Governance schemas must be valid
- ✅ Governance policies must be complete
- ✅ Governance completeness must be maintained
- ✅ Enforcement changes must align with canon
- ✅ No governance bypasses permitted

**Guarantee**: Governance quality and rigor are unchanged by this clarification.

---

## 7. Gate Implementation Requirements

### 7.1 Agent Role Detection

PR gates **MUST** detect agent role using one of these authoritative methods:

**Method 1: Explicit Agent Declaration**
- Agent declares role in PR description or metadata
- Format: `AGENT_ROLE: builder` or `AGENT_ROLE: governance-administrator`
- Gates read declared role

**Method 2: Agent Contract Reference**
- Agent references its `.agent` contract file
- Gate reads contract to determine role
- Contract includes `role: builder` or `role: governance-administrator`

**Method 3: Repository Context (Governance Repo Only)**
- For `maturion-foreman-governance` repository specifically:
  - If PR contains only governance artifacts (schemas, policies, canon, templates)
  - AND no application code (no `src/`, `app/`, `lib/`, build configs)
  - THEN assume governance administrator role
  - OTHERWISE require explicit agent declaration

**PROHIBITED**:
- ❌ Inferring role solely from file paths
- ❌ Inferring role from PR title or description prose
- ❌ Inferring role from GitHub user or team
- ❌ Default assumptions without verification

---

### 7.2 Gate Evaluation Logic

Gates **MUST** implement agent-role-aware evaluation:

```pseudocode
function evaluateGate(pr):
    agentRole = detectAgentRole(pr)
    
    if agentRole == "builder":
        enforceBuilderGates(pr)
    elif agentRole == "governance-administrator":
        enforceGovernanceGates(pr)
    elif agentRole == "fm":
        enforceFMGates(pr)
    else:
        fail("Unknown or undeclared agent role")
    end if
end function
```

---

### 7.3 Clear Failure Messages

When a gate fails, the failure message **MUST** clearly indicate:
1. **Which agent role** was detected
2. **Which gates were evaluated** for that role
3. **Which specific requirement** was not satisfied
4. **Canonical reference** for the requirement

**Example Failure Message**:
```
❌ PR Gate Failed: Builder QA Enforcement

Agent Role Detected: builder
Applicable Gates: Build-to-Green, Architecture Artifacts, Builder QA Reports, QIEL
Failed Requirement: Builder QA artifact missing
Missing Artifact: .qa/builder/BUILD_QA_REPORT.json
Canonical Reference: governance/canon/BUILDER_FIRST_PR_MERGE_MODEL.md

Action Required: Generate Builder QA reports before handover.
```

---

## 8. Transition Safety

### 8.1 During Transition Period

**Context**: This clarification may take effect while existing gates are being updated.

**Safety Rule**: Until all gates implement agent-role-aware logic:
- Governance administrator PRs blocked by misapplied builder gates → Governance override authorized
- Overrides **MUST** cite this document as authority
- Overrides **MUST** be documented in PR comments
- No new gates may be deployed without agent-role awareness

---

### 8.2 After Transition Complete

**Effective**: When all gates implement agent-role-aware evaluation

**Rule**: Any gate failure is considered **intentional enforcement**:
- If gate blocks builder → Builder did not satisfy builder requirements
- If gate blocks governance admin → Governance admin did not satisfy governance requirements
- If gate blocks FM → FM did not satisfy FM requirements

**No ambiguity, no exceptions, no surprises.**

---

## 9. Audit and Compliance

### 9.1 Gate Audit Requirements

Governance Administrator **MUST** periodically audit gates to verify:
- ✅ Agent role detection is implemented correctly
- ✅ Gate applicability logic matches this document
- ✅ No gates use prohibited inference methods
- ✅ Failure messages are clear and role-specific
- ✅ No builder gates are applied to non-builder agents

**Audit Frequency**: Quarterly, or after any gate modification

---

### 9.2 Misprediction Handling

If a gate blocks work due to incorrect agent role evaluation:
1. **Classify as governance defect** (not agent failure)
2. **File incident report** with details
3. **Update gate logic** to fix role evaluation
4. **Document in governance evolution log**
5. **Test fix against historical PRs**
6. **Deploy updated gate**

**NOT ALLOWED**: Asking agents to work around gate defects or modify their work to satisfy misapplied gates.

---

## 10. Operational Checklists

This canonical clarification is operationalized through **PR Gate Release Checklists** that provide explicit, itemized requirements for each agent role:

### Available Checklists
- **Builder Agent**: `governance/templates/PR_GATE_RELEASE_CHECKLIST_BUILDER.md`
- **Governance Administrator**: `governance/templates/PR_GATE_RELEASE_CHECKLIST_GOVERNANCE_ADMIN.md`
- **FM Agent**: `governance/templates/PR_GATE_RELEASE_CHECKLIST_FM.md`

### Checklist Overview
**Reference**: `governance/templates/PR_GATE_RELEASE_CHECKLISTS_README.md`

**Purpose**: Checklists provide complete, itemized requirements that enable:
- Predictable gate outcomes (if all items satisfied → gate MUST pass)
- Pre-flight validation (agents can self-check before handover)
- Gate implementation guidance (authoritative requirements list)
- GPCA (Gate-Predictive Compliance Analysis) support

**Guarantee**: If all checklist items for a role are satisfied, the PR gate MUST pass. If a compliant PR fails, that is a governance defect, not an agent failure.

---

## 11. Related Documents

This document integrates with and clarifies:
- `GOVERNANCE_PURPOSE_AND_SCOPE.md` - Agent role definitions
- `BUILD_PHILOSOPHY.md` - Builder requirements (100% GREEN mandate)
- `BUILDER_FIRST_PR_MERGE_MODEL.md` - Builder QA contracts
- `GOVERNANCE_GATE_CANON.md` - Gate enforcement model
- `PR_GATE_PRECONDITION_RULE.md` - Gate precondition enforcement
- `GOVERNANCE_COMPLETENESS_MODEL.md` - Governance administrator responsibilities
- `AGENT_RECRUITMENT.md` - Agent class definitions

---

## 12. Guiding Principle

> **Enforce strictly — but only where enforcement applies.**

This clarification does not weaken governance.  
It **makes governance precise**.

Precision is a prerequisite for scale.

---

## 13. Success Criteria

This clarification is successful when:
- ✅ Canonical governance explicitly defines gate applicability by agent role
- ✅ Governance Administrator PRs are not blocked by builder-only gates
- ✅ Builder PR rigor is unchanged and strict
- ✅ FM PRs are evaluated under correct role context
- ✅ No manual overrides are required for correctly-scoped work
- ✅ Gate failures are predictable and role-appropriate
- ✅ Future ambiguity of this class is eliminated

---

## 14. Version History

### v1.0.0 (2025-12-22)
- Initial canonical clarification
- Defines agent-role-based gate applicability
- Establishes Builder, Governance Administrator, and FM gate requirements
- Sets non-negotiable invariants
- Provides gate implementation requirements
- Ensures no enforcement weakening
- Includes operational PR Gate Release Checklists for all three agent roles

---

## 15. Authority Statement

**This document is constitutional and binding.**

All PR gates MUST follow this model. No repository, agent, or workflow may:
- Apply builder gates to non-builder agents
- Infer agent role from non-authoritative signals
- Block governance work with misapplied gates
- Weaken builder enforcement
- Create exceptions or overrides without canonical authority

**Violations are governance incidents and must be escalated.**

---

**Status**: Active and Enforced  
**Owner**: Governance Administrator  
**Approval Authority**: Johan Ras  
**Last Updated**: 2025-12-22

---

*End of Agent Role Gate Applicability v1.0.0*
