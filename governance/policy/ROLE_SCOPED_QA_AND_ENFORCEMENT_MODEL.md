# Role-Scoped QA and Enforcement Model

**Status:** Canonical  
**Authority:** Johan Ras  
**Scope:** All repositories in Maturion ecosystem  
**Version:** 1.0  

## 1. Purpose

This document formalizes the architectural separation between:
- **QA responsibility** (generating truth via reports)
- **Enforcement responsibility** (verifying truth via gates)
- **Agent role boundaries** (Builder ≠ FM ≠ Governance)

This separation was established through:
- Builder QA Reports (BUILDER AGENT DIRECTIVE)
- Enforcement-Only Gate Model (PR GATES REDESIGN DIRECTIVE)
- Cross-Repository Governance Alignment Policy

This document consolidates these concepts into explicit governance structure.

## 2. Core Architectural Principles

### 2.1 QA Produces Truth
- QA is performed by agents BEFORE handover
- QA results are recorded in machine-readable reports
- QA reports are committed to the repository
- QA reports are the authoritative source of correctness status

### 2.2 Gates Enforce Truth
- PR gates verify that QA reports exist
- PR gates validate that QA reports are schema-compliant
- PR gates check that QA reports declare PASS
- PR gates do NOT perform QA, debugging, or discovery

### 2.3 Roles Are Segregated
- Each agent role has distinct QA responsibilities
- Each agent role generates its own QA reports
- No agent role performs another role's QA
- No agent role shares QA logic with another role

### 2.4 Governance Is Multi-Layered
- **Corporate Canon**: Defined centrally, applies universally
- **Local Enforcement**: One Governance Administrator per repository
- **Role Enforcement**: Each role enforces its own correctness
- **Gate Enforcement**: All gates enforce all roles uniformly

## 3. Agent Role Definitions

### 3.1 Builder Agent (Per Repository)

**Responsibility Domain:**
- Application code correctness
- Build artifact generation
- Functional validation
- Integration testing (within repository)

**QA Responsibilities:**
- Generate `.qa/builder/BUILD_QA_REPORT.json`
- Generate `.qa/builder/GOVERNANCE_COMPLIANCE_REPORT.json` (builder-scoped only)
- Generate `.qa/builder/UI_VERIFICATION_REPORT.json`
- Generate `.qa/builder/SUMMARY.md`

**Gate Responsibilities:**
- NONE (Builder does not enforce, Builder generates QA)

**Handover Criteria:**
- All Builder QA Reports exist
- All Builder QA Reports are schema-compliant
- All Builder QA Reports declare `status: "PASS"`

**Prohibited Actions:**
- Waiting for PR gates to discover errors
- Waiting for CI to reveal failures
- Assuming gates will "sort it out"
- Performing FM QA
- Performing Governance QA (beyond builder-scoped compliance)

**Authority:** Builder operates within repository boundaries per agent contract

### 3.2 FM Agent (Cross-Repository)

**Responsibility Domain:**
- Business logic correctness
- Cross-repository integration
- FM-specific validation
- Operational correctness

**QA Responsibilities:**
- Generate `.qa/fm/FM_LOGIC_QA_REPORT.json`
- Generate `.qa/fm/INTEGRATION_QA_REPORT.json`
- Generate `.qa/fm/OPERATIONAL_READINESS_REPORT.json`
- Generate `.qa/fm/SUMMARY.md`

**Gate Responsibilities:**
- NONE (FM does not enforce, FM generates QA)

**Handover Criteria:**
- All FM QA Reports exist
- All FM QA Reports are schema-compliant
- All FM QA Reports declare `status: "PASS"`

**Prohibited Actions:**
- Executing Builder QA
- Executing Governance QA
- Operating without cross-repository authorization
- Performing enforcement (gates do enforcement)

**Authority:** FM operates cross-repository with explicit authorization per CROSS_REPOSITORY_GOVERNANCE_ALIGNMENT_POLICY.md

### 3.3 Governance Administrator Agent (Per Repository)

**Responsibility Domain:**
- Governance policy compliance (repository-scoped)
- Canon alignment verification
- Policy artifact validation
- Governance structure enforcement

**QA Responsibilities:**
- Generate `.qa/governance/GOVERNANCE_CANON_COMPLIANCE_REPORT.json`
- Generate `.qa/governance/POLICY_VALIDATION_REPORT.json`
- Generate `.qa/governance/STRUCTURE_COMPLIANCE_REPORT.json`
- Generate `.qa/governance/SUMMARY.md`

**Gate Responsibilities:**
- NONE (Governance Administrator does not enforce, generates QA)

**Handover Criteria:**
- All Governance QA Reports exist
- All Governance QA Reports are schema-compliant
- All Governance QA Reports declare `status: "PASS"`

**Prohibited Actions:**
- Executing Builder QA
- Executing FM QA
- Modifying corporate canon (Corporate Governance Authority only)
- Cross-repository operations without authorization
- Application logic changes
- FM logic changes

**Authority:** Governance Administrator operates within single repository per agent contract

**Scope Clarification:**
- **One Governance Administrator per repository**
- Enforces corporate canon locally
- Reports compliance to Corporate Governance Authority
- Escalates canon conflicts or gaps

### 3.4 Corporate Governance Authority (Johan Ras)

**Responsibility Domain:**
- Governance canon definition
- Policy authorization
- Governance architecture
- Cross-repository governance coordination

**QA Responsibilities:**
- NONE (Corporate Authority defines, does not execute QA)

**Gate Responsibilities:**
- NONE (Corporate Authority authorizes, does not execute gates)

**Enforcement Mechanism:**
- Via Governance Administrator agents in each repository
- Via PR gates enforcing QA report requirements
- Via FM Office visibility requirements

**Authority:** All repositories, all agents, all governance decisions

## 4. Governance Structure: Corporate vs Local

### 4.1 Corporate Canon (Defined Centrally)

**Location:** `MaturionISMS/maturion-foreman-governance` repository

**Scope:** All repositories in Maturion ecosystem

**Content:**
- Agent behavior policies
- QA and enforcement models
- Cross-repository alignment policies
- PR gate requirements
- Escalation protocols

**Authority:** Johan Ras (Corporate Governance Authority)

**Modification:** Requires explicit authorization from Corporate Governance Authority

### 4.2 Local Enforcement (Per Repository)

**Agent:** Governance Administrator (one per repository)

**Scope:** Single repository only

**Responsibilities:**
- Enforce corporate canon locally
- Validate policy compliance
- Generate governance QA reports
- Escalate canon conflicts

**Authority:** Repository-scoped governance enforcement per corporate canon

**Prohibited:**
- Modifying corporate canon
- Creating local governance that conflicts with corporate canon
- Cross-repository enforcement without authorization

### 4.3 Canon Propagation Model

**Process:**
1. Corporate canon defined in governance repository
2. Governance Administrator in target repository identifies canon updates
3. Governance Administrator validates local compliance with canon
4. Governance Administrator generates compliance report
5. Non-compliance escalated to Corporate Governance Authority

**Enforcement:**
- Corporate canon is binding immediately upon definition
- Local repositories MUST align with corporate canon
- Governance Administrators enforce alignment locally
- FM Office visibility REQUIRED for all cross-repository governance actions

## 5. QA Report Directory Structure (Multi-Role)

```
.qa/
├── builder/
│   ├── BUILD_QA_REPORT.json
│   ├── GOVERNANCE_COMPLIANCE_REPORT.json (builder-scoped)
│   ├── UI_VERIFICATION_REPORT.json
│   └── SUMMARY.md
├── fm/
│   ├── FM_LOGIC_QA_REPORT.json
│   ├── INTEGRATION_QA_REPORT.json
│   ├── OPERATIONAL_READINESS_REPORT.json
│   └── SUMMARY.md
└── governance/
    ├── GOVERNANCE_CANON_COMPLIANCE_REPORT.json
    ├── POLICY_VALIDATION_REPORT.json
    ├── STRUCTURE_COMPLIANCE_REPORT.json
    └── SUMMARY.md
```

**Segregation Rules:**
- Each role generates reports in its own directory
- No role reads another role's QA reports for its own QA logic
- PR gates read ALL role directories to enforce ALL roles
- All reports MUST exist and PASS for PR merge

## 6. PR Gate Enforcement Model (Role-Agnostic)

### 6.1 Gate Behavior (Uniform Across Roles)

**For each applicable role:**
1. Locate required QA reports in `.qa/<role>/`
2. Validate JSON schema conformance
3. Check `status` field = "PASS" in each report
4. FAIL immediately if:
   - Report missing
   - Report malformed
   - Report declares FAIL
   - Report is stale (commit mismatch)
5. Emit enforcement report to `.github/gate-reports/`

### 6.2 Gate Scope

**Governance Repository:**
- Governance QA Reports required
- Builder QA Reports required (for governance artifacts)
- FM QA Reports NOT required (governance-only work)

**Application Repository:**
- Builder QA Reports required
- Governance QA Reports required
- FM QA Reports required (if FM-applicable work)

**FM Repository:**
- FM QA Reports required
- Governance QA Reports required
- Builder QA Reports required (for FM artifacts)

### 6.3 Gate Prohibited Actions (All Roles)

PR gates MUST NOT:
- Execute QA logic
- Perform debugging
- Inspect PR comments
- Query GitHub APIs (except artifact retrieval)
- Count failure signatures
- Perform root-cause analysis
- Differentiate between role failures (all failures are equal)

## 7. Handover Compliance (Role-Specific)

### 7.1 Builder Handover

**Preconditions:**
- All `.qa/builder/` reports exist and PASS
- All governance artifacts validated (if applicable)
- No prohibited actions detected

**Verification:**
- Read `.qa/builder/SUMMARY.md`
- Confirm "READY FOR MERGE" or equivalent
- Verify commit hash matches HEAD

### 7.2 FM Handover

**Preconditions:**
- All `.qa/fm/` reports exist and PASS
- All integration validations complete
- FM Office visibility recorded (if cross-repo)

**Verification:**
- Read `.qa/fm/SUMMARY.md`
- Confirm "READY FOR MERGE" or equivalent
- Verify commit hash matches HEAD

### 7.3 Governance Handover

**Preconditions:**
- All `.qa/governance/` reports exist and PASS
- Corporate canon compliance verified
- No governance conflicts detected

**Verification:**
- Read `.qa/governance/SUMMARY.md`
- Confirm "READY FOR MERGE" or equivalent
- Verify commit hash matches HEAD

### 7.4 Multi-Role Handover

**Preconditions:**
- ALL applicable role QA reports exist and PASS
- ALL summaries confirm readiness
- ALL commit hashes match HEAD

**Enforcement:**
- PR gate reads ALL applicable `.qa/` directories
- PR gate FAILS if ANY role reports FAIL
- PR gate FAILS if ANY role reports missing

## 8. Escalation Model (Role-Aware)

### 8.1 Builder Escalation

**When:**
- Builder QA identifies issue agent cannot fix
- Builder blocked by infrastructure gap
- Builder scope violation detected

**To:** Johan Ras (Corporate Governance Authority)

**Include:**
- Blocker description
- Builder role context
- Proposed solution
- Scope impact

### 8.2 FM Escalation

**When:**
- FM QA identifies cross-repository conflict
- FM blocked by authorization gap
- FM integration failure cannot be resolved

**To:** Johan Ras (Corporate Governance Authority)

**Include:**
- Blocker description
- Cross-repository context
- Proposed solution
- FM Office visibility status

### 8.3 Governance Escalation

**When:**
- Canon conflict detected
- Policy gap identified
- Governance enforcement deadlock

**To:** Johan Ras (Corporate Governance Authority)

**Include:**
- Canon reference
- Conflict details
- Minimal correction required
- Impact assessment

## 9. Enforcement Invariants

### 9.1 QA-Gate Separation

**Invariant:** QA and enforcement are distinct responsibilities

**Violation:** PR gate performs QA logic

**Consequence:** Gate rewrite mandatory per PR GATES REDESIGN DIRECTIVE

### 9.2 Role Segregation

**Invariant:** Each role performs only its own QA

**Violation:** Builder performs FM QA, or FM performs Governance QA, etc.

**Consequence:** Role contract violation, work must be redone by correct role

### 9.3 Corporate Canon Authority

**Invariant:** Corporate canon is binding on all repositories

**Violation:** Local governance conflicts with corporate canon

**Consequence:** Local governance invalid, must align with corporate canon

### 9.4 One Governance Administrator Per Repository

**Invariant:** Each repository has exactly one Governance Administrator agent

**Violation:** Multiple governance agents in single repository, or no governance agent

**Consequence:** Governance enforcement undefined, must establish single agent

## 10. Related Governance

This document is part of the governance framework:

- **AGENT_NON_STALLING_AND_ESCALATION_POLICY.md** - Defines agent behavior when blocked
- **PR_GATE_FAILURE_HANDLING_PROTOCOL.md** - Defines gate failure investigation
- **PR_GATE_DEBUG_REPORTS_POLICY.md** - Defines gate observability
- **CROSS_REPOSITORY_GOVERNANCE_ALIGNMENT_POLICY.md** - Defines cross-repo governance
- **BUILDER AGENT DIRECTIVE** (this document codifies) - Established Builder QA model
- **PR GATES REDESIGN DIRECTIVE** (this document codifies) - Established enforcement-only gates

All policies are aligned with this role-scoped model.

## 11. Binding Status

This document is **CANONICAL** and **BINDING** on:
- All agent roles (Builder, FM, Governance Administrator)
- All PR gates (enforcement-only)
- All repositories (corporate canon)
- All governance policies

**Authority:** Johan Ras (Corporate Governance Authority)

**Effective:** Immediately upon merge

---

**Document Status:** Canonical  
**Version:** 1.0  
**Last Updated:** 2025-12-22  
**Authority:** Johan Ras
