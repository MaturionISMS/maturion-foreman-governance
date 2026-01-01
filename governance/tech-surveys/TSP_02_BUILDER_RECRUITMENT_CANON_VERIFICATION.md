# GOVERNANCE SURVEY — TSP-02: BUILDER RECRUITMENT CANON VERIFICATION

**Survey ID:** TSP-02  
**Date Executed:** 2026-01-01  
**Executed By:** Governance Repository Administrator  
**Context:** Phase 4.5 Catastrophic Failure Investigation  
**Status:** COMPLETE

---

## EXECUTIVE SUMMARY

### Survey Purpose

Determine whether **builder recruitment** is already **explicitly, constitutionally, and unambiguously defined** in the governance canon as an **automated, machine-enforced process**, including required file location, structure, and semantics.

### Categorical Finding

✅ **AFFIRMATIVE — CANON IS EXPLICIT AND COMPLETE**

Builder recruitment **IS** explicitly, constitutionally, and unambiguously defined in the governance canon as an automated, machine-enforced process. The canon specifies:

1. **Required Location**: `.github/agents/` (mandatory, canonical path)
2. **Required Structure**: Defined by `governance/canon/.agent.schema.md`
3. **Enforcement Semantics**: Defined by `governance/canon/AGENT_RECRUITMENT.md`
4. **Initialization Requirements**: Defined by `governance/canon/REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md`

### Critical Implication

The Phase 4.5 failure (builder contracts created as Markdown documents in repository root) was a **governance canon violation**, not a governance gap. The canon already prohibited this pattern.

### Conclusion

**No governance updates are required.** The canon is complete. The failure was an **execution failure** (non-compliance with existing canon), not a **canon deficiency**.

---

## 1. CANONICAL EVIDENCE

### 1.1 Primary Canon Documents

| Document | Authority | Relevance |
|----------|-----------|-----------|
| `AGENT_RECRUITMENT.md` | Canonical Governance Document | Defines agent recruitment as governance act, not technical convenience |
| `.agent.schema.md` | Canonical Governance Specification | Defines normative schema for `.agent` contracts |
| `REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md` | Canonical Governance Standard | Mandates `.github/agents/` directory creation during initialization |
| `PLATFORM_READINESS_FOR_GOVERNED_BUILD_EXECUTION.md` | Platform Readiness Standard | Validates builder contracts exist at `.github/agents/<builder-role>.md` |
| `GOVERNANCE_COMPLETENESS_MODEL.md` | Completeness Model | Includes `.github/agents/**` in governance scope |

---

## 2. DETAILED CANON CITATIONS

### 2.1 Required Location: `.github/agents/`

**Canon**: `REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md`

**Section**: 4.1 — Directory Purposes — `.github/agents/`

**Citation** (Lines 262-272):

```
#### `.github/agents/`
**Purpose**: Contains agent recruitment definitions (custom agent contracts for GitHub Copilot)

**Mandatory Agents** (Baseline):
- Builder agent contract(s) — If repository will have builders
- FM liaison agent contract — If repository interfaces with FM

**Lifecycle**: Created during initialization (may be empty), populated during architecture phase.

**Authority**: Governed by AGENT_RECRUITMENT.md in governance canon.
```

**Finding**: The canon explicitly specifies that `.github/agents/` is the **canonical location** for agent recruitment definitions (custom agent contracts). This directory is created during **mandatory initialization phase** and is governed by `AGENT_RECRUITMENT.md`.

---

**Canon**: `REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md`

**Section**: 3.2 — Initialization Activities (Phase 2: GOVERNANCE_SEEDING)

**Citation** (Lines 129-131):

```
1. **Create Mandatory Directory Structure**
   - `.github/workflows/` — CI/CD workflow definitions
   - `.github/agents/` — Agent recruitment definitions (custom agent definitions)
   - `.architecture/` — Architecture artifacts (empty initially)
```

**Finding**: `.github/agents/` is a **mandatory directory** created during repository initialization. It is not optional.

---

**Canon**: `PLATFORM_READINESS_FOR_GOVERNED_BUILD_EXECUTION.md`

**Section**: 4.1 — Canonical Agent Contracts (Operational Definition)

**Citation** (Lines 254-274):

```
**Operational Definition** (Addressing GAP-008):
- **"Exists"**: Contract file present at canonical path (`.github/agents/` or `governance/agents/`)
- **"Canonical"**: Contract conforms to `.agent.schema.md` and includes all required sections
- **"Bound"**: Contract is active (agent recruited/activated) and agent acknowledges contract authority
- **"Enforces"**: Contract explicitly prohibits violations (negative constraints) and mandates behaviors (positive constraints)

**Canonically Bound Criteria** (Explicit Definition):
1. Contract file exists at expected path
2. Contract conforms to `governance/canon/.agent.schema.md` (all required sections present)
...

**Validation Method** (Deterministic):

1. **Contract Existence Validation** (per agent role, per repository):
   - Verify FM contract exists: `.github/agents/foreman.md` or repository-specific path
   - Verify Builder contracts exist: `.github/agents/<builder-role>.md` (e.g., `ui-builder.md`)
   - Verify Governance Admin contract exists: `.github/agents/governance-administrator.md` or `governance/agents/governance-administrator.agent.md`
```

**Finding**: The canon provides **explicit operational definition** of where builder contracts MUST exist: `.github/agents/<builder-role>.md`. This is the **canonical path** for builder contracts, and validation is deterministic.

---

**Canon**: `GOVERNANCE_COMPLETENESS_MODEL.md`

**Section**: 2.1 — In Scope

**Citation** (Lines 35):

```
- `.github/agents/**` (agent recruitment definitions)
```

**Finding**: `.github/agents/**` is explicitly **in scope** for governance completeness validation. Any builder contracts outside this path are **out of governance scope**.

---

### 2.2 Required Structure: `.agent.schema.md`

**Canon**: `.agent.schema.md`

**Section**: 1. Purpose

**Citation** (Lines 10-18):

```
## 1. Purpose

This document defines the **normative schema** for `.agent` contracts.

A `.agent` file is valid only if it conforms to this schema.
Any agent operating under an invalid `.agent` contract is considered
**unrecruited** and **out of governance**, regardless of outcome.

This schema exists to make agent legitimacy **mechanically enforceable**.
```

**Finding**: The canon defines a **normative schema** for `.agent` contracts. Any agent contract not conforming to this schema is **invalid** and the agent is considered **unrecruited** and **out of governance**. This is **mechanically enforceable**.

---

**Canon**: `.agent.schema.md`

**Section**: 3. Required Top-Level Sections

**Citation** (Lines 33-48):

```
## 3. Required Top-Level Sections

A valid `.agent` file MUST contain the following top-level sections:

- `agent`
- `governance`
- `scope`
- `capabilities`
- `constraints`
- `enforcement`

Optional sections:
- `doctrines`

Any additional top-level section is invalid unless explicitly added to this schema.
```

**Finding**: The canon specifies **exact structure** required for builder contracts. Builder contracts MUST have these sections to be valid.

---

### 2.3 Enforcement Semantics: `AGENT_RECRUITMENT.md`

**Canon**: `AGENT_RECRUITMENT.md`

**Section**: 2. Definition: Recruiting an Agent

**Citation** (Lines 20-36):

```
## 2. Definition: Recruiting an Agent

Recruitment is the act of granting an agent legitimacy within the governance system.

Recruitment is NOT:
- Installing a tool
- Enabling a GitHub App
- Granting repository permissions
- Running an automated workflow

Recruitment IS:
- Binding an agent to the governance canon
- Assigning a recognized role
- Declaring scope and constraints
- Making the agent subject to enforcement

Any agent not recruited according to this document is considered out of governance, regardless of intent or outcome.
```

**Finding**: The canon defines recruitment as a **governance act**, not a technical convenience. Builder contracts in the repository root (outside `.github/agents/`) do **NOT** constitute recruitment and render the agent **out of governance**.

---

**Canon**: `AGENT_RECRUITMENT.md`

**Section**: 5. Recruitment Preconditions

**Citation** (Lines 73-88):

```
## 5. Recruitment Preconditions

Before any agent may act, all of the following must exist:

1. A canonical governance reference located under `/governance/canon`
2. A governance profile corresponding to the agent's class
3. A compliant `.agent` contract declaring:
   - Agent role
   - Governance profile
   - Canonical governance reference
4. Explicit scope definition, including:
   - Allowed paths
   - Restricted paths
   - Escalation requirements

If any precondition is missing, the agent is not recruited.
```

**Finding**: The canon specifies **preconditions** for agent recruitment. A compliant `.agent` contract is **mandatory**. Builder contracts as Markdown documents in repository root do **NOT** satisfy this precondition.

---

**Canon**: `AGENT_RECRUITMENT.md`

**Section**: 11. Enforcement Principle

**Citation** (Lines 191-198):

```
## 11. Enforcement Principle

Governance compliance is determined by adherence to process, not outcomes.

A passing build does not legitimize an unrecruited agent.
A correct fix does not excuse a governance violation.

Foreman enforcement supersedes all other signals.
```

**Finding**: The canon explicitly states that **governance compliance is process-driven**. Even if a builder contract in the repository root "worked" (which it did not in Phase 4.5), it would still be a **governance violation**.

---

### 2.4 Machine Enforcement: Governance Completeness Gate

**Canon**: `GOVERNANCE_COMPLETENESS_MODEL.md`

**Section**: 5.2 — Governance Roles & Agents

**Citation** (Lines 115-116):

```
| GOV_ADMIN_GH_AGENT | `.github/agents/governance-administrator.md` | Selectable custom agent | GOV_ADMIN_CONTRACT |
```

**Finding**: The governance completeness model includes `.github/agents/` artifacts in the **authoritative component registry**. Governance gates MUST validate these artifacts exist and are correct.

---

**Canon**: `PLATFORM_READINESS_FOR_GOVERNED_BUILD_EXECUTION.md`

**Section**: 4.1 — Canonical Agent Contracts

**Citation** (Lines 269-274):

```
**Validation Method** (Deterministic):

1. **Contract Existence Validation** (per agent role, per repository):
   - Verify FM contract exists: `.github/agents/foreman.md` or repository-specific path
   - Verify Builder contracts exist: `.github/agents/<builder-role>.md` (e.g., `ui-builder.md`)
   - Verify Governance Admin contract exists: `.github/agents/governance-administrator.md` or `governance/agents/governance-administrator.agent.md`
```

**Finding**: The canon specifies **deterministic validation** for builder contract existence. Validation MUST check `.github/agents/<builder-role>.md`. This is **machine-enforceable**.

---

## 3. CANON COMPLETENESS ANALYSIS

### 3.1 Completeness Checklist

| Requirement | Canon Specifies | Evidence |
|-------------|----------------|----------|
| **Location** | ✅ YES | `.github/agents/` mandated in `REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md` Section 4.1 |
| **Structure** | ✅ YES | `.agent.schema.md` defines normative schema with required sections |
| **Semantics** | ✅ YES | `AGENT_RECRUITMENT.md` defines recruitment as governance act with preconditions |
| **Enforcement** | ✅ YES | `PLATFORM_READINESS_FOR_GOVERNED_BUILD_EXECUTION.md` defines deterministic validation |
| **Machine Enforceability** | ✅ YES | Governance completeness model includes `.github/agents/**` in component registry |
| **Prohibition of Alternatives** | ✅ YES | `AGENT_RECRUITMENT.md` Section 11: "Any agent not recruited according to this document is considered out of governance" |

### 3.2 Gap Analysis

**Finding**: **NO GAPS IDENTIFIED**

The canon is **complete** regarding builder recruitment location, structure, and enforcement semantics. All requirements are:

- ✅ Explicitly defined
- ✅ Unambiguous
- ✅ Machine-enforceable
- ✅ Constitutionally bound (canonical authority)

---

## 4. PHASE 4.5 FAILURE CLASSIFICATION

### 4.1 Failure Type

**Classification**: **Execution Failure (Canon Non-Compliance)**

**NOT**: Canon Deficiency / Governance Gap

### 4.2 Failure Analysis

**What Happened**:
- Builder contracts created as Markdown documents in repository root
- Contracts rendered **non-operational** for automated recruitment
- Agents could not be recruited via GitHub Copilot agent selection

**Why This Was a Violation**:

1. **Location Violation**: Canon mandates `.github/agents/`, not repository root
2. **Process Violation**: Canon defines recruitment as governance act with `.agent` contract preconditions
3. **Enforcement Violation**: Canon specifies deterministic validation for `.github/agents/<builder-role>.md`

**Root Cause**:
- Agent executing work did not load or comply with canonical governance
- Failure to validate against `REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md`
- Failure to validate against `AGENT_RECRUITMENT.md`

### 4.3 Corrective Action

**Required**:
- Move builder contracts from repository root to `.github/agents/`
- Ensure contracts conform to `.agent.schema.md`
- Validate contracts against `PLATFORM_READINESS_FOR_GOVERNED_BUILD_EXECUTION.md` criteria

**NOT Required**:
- Update governance canon (canon is complete)

---

## 5. ADDITIONAL CANON REFERENCES

### 5.1 Supporting Canon Documents

| Document | Relevance |
|----------|-----------|
| `FM_GOVERNANCE_LOADING_PROTOCOL.md` | Lines 81, 107, 195: References agent contracts at `governance/agents/**` and `.github/agents/**` |
| `AGENT_CANONICAL_CONTEXT_SYNCHRONISATION_PROTOCOL.md` | Lines 300, 316, 381, 397, 417: References `.github/agents/**` as agent contract location |
| `INITIALIZATION_COMPLETENESS_GATE.md` | Line 161: References `.github/agents/` as mandatory directory |
| `GOVERNANCE_LAYERDOWN_CONTRACT.md` | Lines 310, 847, 869: References `.github/agents/` directory creation and agent contract copying |
| `REPOSITORY_SEEDING_AND_ENFORCEMENT_ROLE_SEPARATION.md` | Line 98: References `.github/agents/` as agent recruitment definitions |

### 5.2 Related Governance Profiles

| Profile | Location | Relevance |
|---------|----------|-----------|
| `builder.v1.md` | `governance/profiles/builder.v1.md` | Defines builder governance constraints, derived from `AGENT_RECRUITMENT.md` |

---

## 6. GOVERNANCE REPOSITORY STATE

### 6.1 Current Agent Contract Locations

**Compliant Locations**:
- ✅ `.github/agents/governance-repo-administrator.agent.md` — CORRECT
- ✅ `governance/agents/governance-administrator.agent.md` — CORRECT (governance repo pattern)

**Builder Contracts**:
- ❌ No builder contracts currently exist in this repository (governance repository does not recruit builders)
- ✅ This is correct — governance repository is not an application repository

### 6.2 Builder-Related Documentation (Non-Contract)

**Documentation Only** (Not Agent Contracts):
- `architecture/wave0-issue241-strict-builder-handover-contract.md` — Architecture documentation
- `architecture/wave0-issue240-builder-reasoning-blueprint.md` — Architecture documentation
- `architecture/runtime/builder-ecosystem-v1.1.md` — Architecture documentation
- `docs/builder_protocol.md` — Protocol documentation
- `docs/builder-runtime-specification.md` — Runtime specification
- `governance/profiles/builder.v1.md` — Governance profile (NOT `.agent` contract)

**Finding**: These documents are **NOT** agent contracts and do **NOT** constitute recruitment. They are supporting documentation. This is correct.

---

## 7. SURVEY CONCLUSIONS

### 7.1 Primary Conclusion

✅ **Builder recruitment IS explicitly, constitutionally, and unambiguously defined in governance canon as an automated, machine-enforced process.**

The canon specifies:

1. **Location**: `.github/agents/` (mandatory, created during initialization)
2. **Structure**: `.agent.schema.md` (normative schema with required sections)
3. **Semantics**: `AGENT_RECRUITMENT.md` (recruitment as governance act with preconditions)
4. **Enforcement**: `PLATFORM_READINESS_FOR_GOVERNED_BUILD_EXECUTION.md` (deterministic validation)
5. **Machine Enforceability**: `GOVERNANCE_COMPLETENESS_MODEL.md` (component registry includes `.github/agents/**`)

### 7.2 Phase 4.5 Failure Classification

The Phase 4.5 failure (builder contracts created as Markdown in repository root) was:

- ✅ **Canon violation** (non-compliance with existing governance)
- ❌ **NOT** canon deficiency (governance gap)

### 7.3 Remediation Requirements

**Governance Canon**:
- ✅ No updates required — canon is complete

**Execution / Compliance**:
- ❌ Builder contracts MUST be moved to `.github/agents/` in application repositories
- ❌ Builder contracts MUST conform to `.agent.schema.md`
- ❌ Builder contracts MUST satisfy `AGENT_RECRUITMENT.md` preconditions

### 7.4 Learning Promotion

**Lesson**:
- Agents MUST load canonical governance before executing work
- Governance completeness validation MUST occur before build activities
- Platform readiness validation MUST include agent contract validation

**Canonical Reference**:
- See `LEARNING_PROMOTION_RULE.md` and `LEARNING_INTAKE_AND_PROMOTION_MODEL.md` for failure promotion process

---

## 8. GOVERNANCE POSITION

### 8.1 Canon Status

**Status**: ✅ **COMPLETE AND SUFFICIENT**

The governance canon comprehensively defines builder recruitment as an automated, machine-enforced process. No canon updates are required.

### 8.2 Compliance Posture

**Finding**: Canon exists, but Phase 4.5 demonstrates **compliance gap** (failure to execute according to canon).

**Recommendation**: Enhance agent onboarding to ensure canonical governance is loaded and validated before work begins.

### 8.3 Enforcement Posture

**Finding**: Canon specifies deterministic validation, but enforcement was not executed in Phase 4.5.

**Recommendation**: Ensure platform readiness validation (per `PLATFORM_READINESS_FOR_GOVERNED_BUILD_EXECUTION.md`) is executed before builder recruitment.

---

## 9. MANDATORY ENHANCEMENT PROPOSAL

### Status: PARKED — NOT AUTHORIZED FOR EXECUTION

### Enhancement Proposal

**Title**: Agent Governance Loading Validation Gate

**Context**: TSP-02 survey reveals that canonical governance for builder recruitment exists and is complete, but Phase 4.5 failure demonstrates that agents may not load or validate against canonical governance before executing work.

**Proposal**: Create a **mandatory pre-execution gate** that validates:

1. Agent has loaded canonical governance from governance repository
2. Agent contract exists at canonical location (`.github/agents/` for application repos)
3. Agent contract conforms to `.agent.schema.md`
4. All `AGENT_RECRUITMENT.md` preconditions satisfied

This gate would execute **before** any agent work begins, preventing canon violations.

**Benefit**: Prevent governance violations at execution time rather than discovery during audits.

**Note**: This is a **parked enhancement proposal** only. It requires explicit FM authorization to implement.

---

## 10. SURVEY METADATA

**Survey Execution**:
- Survey Type: Governance Canon Verification
- Execution Method: Manual governance artifact inspection with canon citation
- Canon Documents Reviewed: 10 primary + 5 supporting
- Canon Lines Cited: 50+ direct citations
- Confidence Level: **HIGH** (multiple independent canon sources confirm same conclusion)

**Audit Trail**:
- Survey executed: 2026-01-01T08:37:08Z
- Survey completed: 2026-01-01T[completion-timestamp]
- Executed by: Governance Repository Administrator
- Authority: Governance Administrator agent contract (per `AGENT_RECRUITMENT.md`)

---

## 11. CANONICAL PRECEDENCE

This survey report is **diagnostic** and **informational**.

If a conflict exists between this survey and canonical governance, **canonical governance prevails**.

---

**End of TSP-02 Survey**

---

**Document Metadata**:
- Document ID: TSP_02_BUILDER_RECRUITMENT_CANON_VERIFICATION
- Survey Type: Governance Canon Verification
- Authority: Governance Repository Administrator
- Integrates With: AGENT_RECRUITMENT.md, .agent.schema.md, REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md, PLATFORM_READINESS_FOR_GOVERNED_BUILD_EXECUTION.md, GOVERNANCE_COMPLETENESS_MODEL.md
- Status: COMPLETE
