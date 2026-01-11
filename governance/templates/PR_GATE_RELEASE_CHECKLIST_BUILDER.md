# PR Gate Release Checklist — Builder Agent

## Status
**Type**: PR Gate Release Checklist (Canonical Documentation)  
**Authority**: Governance (Canonical)  
**Version**: 2.0.0  
**Effective Date**: 2026-01-11  
**Agent Role**: Builder Agent  
**Canonical Reference**: `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md`

---

## Purpose

This checklist defines the **complete set of requirements** that Builder Agents must satisfy for PR gate approval.

**Predictability Guarantee**: If all checklist items are satisfied, the PR gate **MUST pass**.

If a PR satisfies all items but still fails, that is a **governance defect**, not an agent failure.

---

## Agent Role Definition

**Builder Agents**: Agents executing build-to-green for application code changes

**Examples**:
- GitHub Copilot executing code changes
- Local builder agents
- CI/CD builder automation
- Any agent producing executable artifacts

**Canonical Reference**: `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md` Section 4.1

---

## Complete PR Gate Checklist for Builder Agents

### Category 0: Execution Bootstrap Protocol (MANDATORY)

**Gate**: Execution verification before handover  
**Canonical Reference**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`

**MANDATORY FOR**: All Builder PRs involving build artifacts, tests, configuration changes, or any changes that can fail in CI.  
**OPTIONAL FOR**: Pure documentation changes without CI impact (rare for builders).

#### 7-Step Execution Bootstrap Protocol
- [ ] **0.1** Step 1: Requirements documented (clear list of features, tests, changes)
- [ ] **0.2** Step 2: Actual artifacts created (code, tests, configs actually created)
- [ ] **0.3** Step 3: Executed/verified locally (build run, tests executed, linting passed)
- [ ] **0.4** Step 4: Output captured (build logs, test output, exit codes recorded)
- [ ] **0.5** Step 5: Preflight validated (all gates triggered by PR enumerated and checked)
- [ ] **0.6** Step 6: PREHANDOVER_PROOF attached (complete proof in PR description per template)
- [ ] **0.7** Step 7: Completion declared (only after Steps 1-6 complete and execution GREEN)

**Template**: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`

**Builder-Specific Requirements**:
- Step 3 MUST include: Full build execution, complete test suite run, linting, type checking
- Step 4 MUST include: Build logs showing 100% GREEN, zero test failures, zero warnings
- Step 5 MUST include: BUILD_QA_REPORT.json validation, GOVERNANCE_COMPLIANCE_REPORT.json validation

**Prohibition**: Do NOT hand over Builder PRs without PREHANDOVER_PROOF demonstrating local Build-to-Green completion.

**Authority**: Mandatory per `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` (Effective: 2026-01-11)

---

### Category 1: Build-to-Green Enforcement

**Gate**: Builder QA enforcement gate  
**Canonical Reference**: `BUILD_PHILOSOPHY.md`, `governance/canon/BUILDER_FIRST_PR_MERGE_MODEL.md`

- [ ] **1.1** Architecture document designed before Red QA
- [ ] **1.2** Red QA created before build execution
- [ ] **1.3** Build-to-Green process completed following correct sequence
- [ ] **1.4** Green QA achieved (100% tests passing)
- [ ] **1.5** Zero test debt verified (no skipped, stubbed, or incomplete tests)
- [ ] **1.6** Test infrastructure complete (no stub helpers, incomplete fixtures, or broken mocks)

---

### Category 2: Architecture and Build Artifacts

**Gate**: Architecture completeness validation  
**Canonical Reference**: `governance/canon/ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md`

- [ ] **2.1** Architecture document present and valid
- [ ] **2.2** Architecture checklist completed
- [ ] **2.3** Build artifacts generated (as applicable to project type)
- [ ] **2.4** Evidence trail complete (timestamps, process order documented)

---

### Category 3: Builder QA Reports

**Gate**: Builder QA artifact enforcement  
**Canonical Reference**: `governance/canon/BUILDER_FIRST_PR_MERGE_MODEL.md`

- [ ] **3.1** `.qa/builder/BUILD_QA_REPORT.json` present
- [ ] **3.2** `.qa/builder/BUILD_QA_REPORT.json` is valid JSON (parseable, conforms to schema)
- [ ] **3.3** `build_status == "PASS"` in BUILD_QA_REPORT.json
- [ ] **3.4** `merge_readiness.ready == true` in BUILD_QA_REPORT.json
- [ ] **3.5** `.qa/builder/GOVERNANCE_COMPLIANCE_REPORT.json` present
- [ ] **3.6** `.qa/builder/GOVERNANCE_COMPLIANCE_REPORT.json` is valid JSON (parseable, conforms to schema)
- [ ] **3.7** `compliance_status == "COMPLIANT"` in GOVERNANCE_COMPLIANCE_REPORT.json
- [ ] **3.8** `.qa/builder/SUMMARY.md` present

**Schema References**:
- `governance/schemas/BUILD_QA_REPORT.schema.json`
- `governance/schemas/GOVERNANCE_COMPLIANCE_REPORT.schema.json`
- `governance/schemas/BUILDER_QA_SUMMARY.structure.md`

---

### Category 4: 100% GREEN QA (QIEL)

**Gate**: QIEL (QA Integrity Enforcement Layer)  
**Canonical Reference**: `BUILD_PHILOSOPHY.md`, `GOVERNANCE_GATE_CANON.md`

- [ ] **4.1** All tests executed (no skipped tests)
- [ ] **4.2** All tests passing (100% pass rate, zero failures)
- [ ] **4.3** Zero compilation errors
- [ ] **4.4** Zero lint errors
- [ ] **4.5** Zero runtime errors
- [ ] **4.6** Zero warnings (unless explicitly whitelisted in governance)
- [ ] **4.7** Zero test debt of any kind
- [ ] **4.8** Build logs parsed and clean
- [ ] **4.9** Vercel deployment simulation passed (if applicable)

---

### Category 5: Build Philosophy Compliance

**Gate**: Build process validation  
**Canonical Reference**: `BUILD_PHILOSOPHY.md`

- [ ] **5.1** Architecture → Red QA → Build → Green QA sequence followed
- [ ] **5.2** Process timeline correct (no steps out of order)
- [ ] **5.3** No shortcuts or governance bypasses detected
- [ ] **5.4** One-Time Build Law satisfied (100% functional on first delivery)

---

### Category 6: Constitutional Safeguards (CS1-CS6, GSR)

**Gate**: Constitutional safeguard enforcement  
**Canonical Reference**: `GOVERNANCE_GATE_CANON.md`

#### CS1: Constitutional Integrity
- [ ] **6.1** No modifications to immutable paths (unless explicitly approved)
- [ ] **6.2** No modifications to constitutional files (unless explicitly approved)
- [ ] **6.3** File hashes match baseline (for protected files)
- [ ] **6.4** No suppression comments added (eslint-disable, @ts-ignore, etc.)
- [ ] **6.5** No governance bypasses detected

#### CS2: Architecture Approval Workflow (if applicable)
- [ ] **6.6** If protected files modified → Architecture approval present
- [ ] **6.7** Approval authority verified (Owner or designee)
- [ ] **6.8** Approval scope matches changes
- [ ] **6.9** Approval timestamp before implementation

#### CS3: Incident Feedback Loop
- [ ] **6.10** No unresolved critical incidents blocking deployment
- [ ] **6.11** Incident feedback loop operational
- [ ] **6.12** Post-deployment verification configured (if applicable)

#### CS4: Compliance Monitoring
- [ ] **6.13** Alert system operational
- [ ] **6.14** No suppressed critical alerts
- [ ] **6.15** Governance notifications configured

#### CS5: Performance Enforcement
- [ ] **6.16** No lazy code patterns detected
- [ ] **6.17** OPOJD compliance verified
- [ ] **6.18** Execution continuity ≥ 95%

#### CS6: Execution Boundary
- [ ] **6.19** No boundary violations detected
- [ ] **6.20** All operations within authorized scope
- [ ] **6.21** Tenant isolation maintained (if applicable)

#### GSR: Governance Supremacy Rule
- [ ] **6.22** No governance overrides detected
- [ ] **6.23** No user request bypasses
- [ ] **6.24** QA failures resulted in build blocks (not ignored)
- [ ] **6.25** Architecture rules enforced

---

### Category 7: Constitutional Sandbox Compliance (BL-024)

**Gate**: Constitutional vs Procedural compliance validation  
**Canonical Reference**: `governance/canon/CONSTITUTIONAL_SANDBOX_PATTERN.md`, `BUILD_PHILOSOPHY.md` (v1.5)

**Purpose**: Verify constitutional requirements satisfied regardless of procedural path taken

#### Constitutional Requirements (ALL MUST BE YES)
- [ ] **7.1** Zero Test Debt: Confirmed (no failing, skipped, or incomplete tests)
- [ ] **7.2** 100% GREEN: Achieved (all tests passing, zero warnings, zero errors)
- [ ] **7.3** BUILD_PHILOSOPHY Sequence: Maintained (Architecture → Red QA → Build to Green)
- [ ] **7.4** Governance Gates: Satisfied (all validation gates passed)
- [ ] **7.5** Quality Integrity: Verified (comprehensive QA, no quality negotiation)
- [ ] **7.6** No constitutional rule violations (GSR, QIC respected)

#### Procedural Adaptations (IF ANY)
- [ ] **7.7** Procedural guidance adaptations documented (if flexibility applied)
- [ ] **7.8** Constitutional justification provided (for any adaptation)
- [ ] **7.9** Efficiency gain or context-appropriate optimization verified (if adapted)
- [ ] **7.10** Adaptation does not weaken governance enforcement

**Note**: Constitutional compliance is MANDATORY. Procedural flexibility is PERMITTED within constitutional boundaries. See `governance/canon/CONSTITUTIONAL_SANDBOX_PATTERN.md` for tier hierarchy and decision framework.

---

### Category 8: Execution Bootstrap Protocol (PREHANDOVER_PROOF)

**Gate**: Execution verification enforcement  
**Canonical Reference**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`

**Purpose**: Verify builder followed 7-step execution verification before PR handover

**Applicability**: REQUIRED for PRs containing executable artifacts (workflows, gates, contracts, configurations). OPTIONAL (but recommended) for documentation-only changes.

#### PREHANDOVER_PROOF Presence
- [ ] **8.1** PREHANDOVER_PROOF section present in PR description (if executable artifacts included)
- [ ] **8.2** PREHANDOVER_PROOF follows canonical template (governance/templates/PREHANDOVER_PROOF_TEMPLATE.md)

#### Artifacts Created (Step 2)
- [ ] **8.3** Artifacts documented with verification commands
- [ ] **8.4** Verification output included (ls, cat, tree, or equivalent)
- [ ] **8.5** Status marked as VERIFIED

#### Execution Validation (Steps 3-4)
- [ ] **8.6** Commands executed locally documented
- [ ] **8.7** Command outputs included
- [ ] **8.8** Exit codes captured (all must be 0 for success)
- [ ] **8.9** Status marked as ALL GREEN (or failures explained and resolved)

#### Preflight Gate Status (Step 5)
- [ ] **8.10** ALL gates triggered by PR changes enumerated
- [ ] **8.11** Each gate has validation method documented
- [ ] **8.12** Each gate has evidence provided
- [ ] **8.13** All applicable gates show PASS or SKIP (no FAIL at handover)
- [ ] **8.14** Gate enumeration method documented (how gates were identified)

#### Execution Timestamp and Environment
- [ ] **8.15** Validation timestamp included (YYYY-MM-DD HH:MM:SS UTC)
- [ ] **8.16** Environment details documented (OS, shell, tool versions)
- [ ] **8.17** Validator identified (agent name or human name)

#### Handover Guarantee
- [ ] **8.18** Explicit guarantee statement included
- [ ] **8.19** Known environment differences documented (or "None known")
- [ ] **8.20** Root cause commitment included (RCA if CI fails)

**Prohibition**: PRs with executable artifacts MUST NOT be handed over without complete PREHANDOVER_PROOF.

**Note**: If PREHANDOVER_PROOF is incomplete or missing for executable artifacts, this is a protocol violation. Builder must add PREHANDOVER_PROOF before handover.

---

## Predictability Invariant

> **If all checklist items above are satisfied, the PR gate MUST pass.**

If a PR satisfies all items but the gate fails:
1. This is classified as a **governance defect**
2. The gate logic must be updated to align with this checklist
3. This is NOT a builder failure or builder accountability issue

---

## Usage Instructions

### For Builder Agents (Pre-Handover)

Before creating a PR or requesting review:
1. **Complete Execution Bootstrap Protocol (Category 0)** — MANDATORY for all Builder PRs
   - Follow all 7 steps
   - Run full local build and test suite
   - Capture build logs and test output
   - Attach PREHANDOVER_PROOF to PR description
   - Validate preflight gates
2. Review this checklist completely
3. Verify each item is satisfied
4. Generate all required artifacts (Category 3)
5. Run full QA suite (Category 4)
6. Optionally: Run GPCA (Gate-Predictive Compliance Analysis) for prediction
7. Only submit PR when all items are checked AND PREHANDOVER_PROOF attached

### For PR Gate Implementation

Gate logic must:
1. Detect agent role as "builder"
2. Evaluate only the items in this checklist
3. Block PR if ANY item is not satisfied
4. Pass PR if ALL items are satisfied
5. Provide clear failure messages citing specific checklist items

---

## Related Documents

- `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` - **NEW: Mandatory execution verification (v2.0.0)**
- `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md` - **NEW: PREHANDOVER_PROOF template (v2.0.0)**
- `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md` - Agent role gate definitions
- `BUILD_PHILOSOPHY.md` - Build-to-Green, One-Time Build Law, Constitutional Sandbox Pattern
- `governance/canon/BUILDER_FIRST_PR_MERGE_MODEL.md` - Builder QA contracts
- `GOVERNANCE_GATE_CANON.md` - Constitutional safeguards (CS1-CS6, GSR)
- `governance/canon/GATE_PREDICTIVE_COMPLIANCE_ANALYSIS.md` - GPCA model
- `governance/canon/CONSTITUTIONAL_SANDBOX_PATTERN.md` - Constitutional vs Procedural hierarchy (BL-024)
- `governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md` - BL-024 (Constitutional Sandbox discovery)
- `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` - 7-step execution verification (Category 8)
- `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md` - PREHANDOVER_PROOF template

---

## Versioning

### v2.0.0 (2026-01-11)
- **BREAKING**: Added mandatory Category 0: Execution Bootstrap Protocol
- Added PREHANDOVER_PROOF requirement for all Builder PRs
- Updated pre-handover instructions to include 7-step protocol with builder-specific requirements
- Added references to EXECUTION_BOOTSTRAP_PROTOCOL.md and PREHANDOVER_PROOF_TEMPLATE.md
- Ripple from Issue: "Ripple Execution Bootstrap Protocol to FM Orchestration & Builder PR Requirements"

### v1.1.0 (2026-01-09)
- Added Category 7: Constitutional Sandbox Compliance (BL-024)
- Added constitutional vs procedural validation requirements
- Added procedural adaptation documentation requirements
- Reference to CONSTITUTIONAL_SANDBOX_PATTERN.md

### v1.0.0 (2025-12-22)
- Initial release
- Complete builder gate requirements documented
- Traceable to existing gate behavior
- Predictability invariant established

---

**End of Builder Agent PR Gate Release Checklist**
