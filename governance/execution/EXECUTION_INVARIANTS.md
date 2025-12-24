# Execution Invariants

**Status**: Canonical  
**Authority**: Execution Canon  
**Source Basis**: Phase 1 Classification - Category A (Vision & Canonical Intent) and Category B (Execution Canon)  
**Last Canonized**: 2025-12-24

---

## Purpose

This document defines system-wide rules that execution may never violate—the immutable invariants that preserve system integrity, quality, and governance supremacy.

**An invariant is a rule that must be true always, everywhere, without exception.**

---

## Core Invariants

### INV-1: 100% GREEN Is Absolute

**Statement**: A build is complete if and only if it is 100% GREEN.

**Definition of 100% GREEN**:
- Zero compilation errors
- Zero type errors
- Zero lint errors
- Zero test failures
- Zero runtime errors
- Zero deployment failures
- Zero warnings (unless explicitly whitelisted)
- All QA checks passing
- All governance gates passing
- Full functionality verified
- All test infrastructure complete
- ZERO TEST DEBT

**Absoluteness**:
- 99% ≠ GREEN (99% = RED = 0%)
- 301/303 tests passing ≠ GREEN (= TOTAL FAILURE)
- One failing test = System is RED
- "Close enough" does NOT exist in the vocabulary

**Enforcement**: Merge gates block ANY PR that is not 100% GREEN.

**Source**: BUILD_PHILOSOPHY.md, Zero Test Debt Constitutional Rule

---

### INV-2: Zero Test Debt, Always

**Statement**: Test debt is never permitted under any circumstances, at any time, in any build.

**Test Debt Defined**:
- Failing tests
- Skipped tests (.skip(), .todo(), commented out)
- Incomplete tests (stubs, no assertions, TODO comments)
- Incomplete test infrastructure (stub helpers, incomplete fixtures, broken mocks)
- Test configuration issues (missing dependencies, broken setup)
- Hidden test debt (tests with warnings, excluded tests, suppressed errors)

**Enforcement**:
```
TEST DEBT DETECTED → STOP EXECUTION → FIX ALL DEBT → RE-RUN QA → VERIFY ZERO DEBT → CONTINUE
```

**No Exceptions**:
- Not "will fix later"
- Not "acceptable for this context"
- Not "temporary exception"
- Not "minor issue"

**Absoluteness**: ANY test debt = Execution BLOCKED.

**Source**: BUILD_PHILOSOPHY.md v1.2, Zero Test Debt Constitutional Rule

---

### INV-3: Architecture Before QA Before Building

**Statement**: Architecture must be complete before QA is created, and QA must exist (and be RED) before building begins.

**Sequence**:
```
ARCHITECTURE (complete) → RED QA (failing tests) → BUILD TO GREEN (implementation)
```

**Never Allowed**:
- Building before architecture exists
- Building before QA exists
- QA created after building
- Architecture modified to fit implementation

**Enforcement**:
- Builders refuse work without Red QA (SBHC)
- Merge gates verify Red QA existed before building
- Architecture checklist validates completeness before QA creation

**Source**: BUILD_PHILOSOPHY.md, QA-as-Proof principle

---

### INV-4: Separation of Duties Is Absolute

**Statement**: Architect, implementer, and validator roles are strictly separated with no overlap.

**Role Boundaries**:
- **FM (Foreman)**: Architect + QA Designer + Orchestrator + Validator
- **Builder**: Implementer only
- **Validator**: Process compliance checker

**Never Allowed**:
- FM writes production code
- Builder modifies architecture
- Builder creates QA
- Same entity validates its own work
- Role crossover or boundary blur

**Enforcement**:
- FM refuses to write code (role violation)
- Builder refuses to build without Red QA (SBHC)
- Validator checks evidence, doesn't re-run QA

**Source**: BUILD_PHILOSOPHY.md, Maturion Governance Constitution

---

### INV-5: Governance Supremacy Rule (GSR)

**Statement**: Governance rules override all other instructions and considerations.

**Authority Hierarchy**:
1. Guardrails and Safety Charter (highest)
2. Build Philosophy
3. Constitutional Safeguards (CS1-CS6)
4. Governance Constitution
5. Agent Contracts
6. User requests (lowest)

**Implication**:
- User cannot request quality shortcuts
- User cannot request governance bypasses
- User cannot request test debt acceptance
- User cannot override constitutional rules

**Enforcement**:
- Quality gates block compromised builds
- Constitutional checks block governance violations
- CS1-CS6 halt execution on violations

**Source**: Maturion Governance Constitution (GSR)

---

### INV-6: Evidence Beats Intent

**Statement**: Execution is proven by evidence, not claims or intent.

**Evidence Requirements**:
- Architecture document exists and is complete
- Red QA existed before building (build logs prove it)
- Green QA exists after building (validation logs prove it)
- Process compliance verified (audit trail proves it)
- All steps have timestamps and are traceable

**Never Accepted**:
- "I believe it works" (requires proof)
- "It should be fine" (requires evidence)
- "QA probably passed" (requires validation)
- "I followed the process" (requires audit trail)

**Enforcement**: Merge gates verify evidence existence and validity.

**Source**: BUILD_PHILOSOPHY.md, QA-as-Proof principle

---

### INV-7: Cumulative QA Prevents Regression

**Statement**: When a new wave completes, all previous wave QA must pass.

**Process**:
```
Wave N completes → Run QA for Waves 0, 1, 2, ..., N → All must be 100% GREEN
```

**Implication**:
- New work cannot break old work
- Regression is detected immediately
- System is always 100% GREEN across all waves

**Enforcement**: Wave completion gates run cumulative QA.

**Source**: WAVE_MODEL.md

---

### INV-8: One-Prompt One-Job Doctrine (OPOJD)

**Statement**: When a prompt is given, the entire job lifecycle executes without interruption.

**Full Lifecycle**:
```
ARCHITECTURE → RED QA → BUILD-TO-GREEN → VALIDATION → MERGE → EVIDENCE → NOTIFY
```

**Never Allowed**:
- Pausing between phases (unless CS2 or violation)
- Asking "Should I continue?" mid-execution
- Deferring work without blocker
- Entering idle state with pending work

**Legitimate Pauses Only**:
- CS2 trigger (protected file approval)
- CS1-CS6 violation
- Unrecoverable failure

**Enforcement**: Agent state machine enforces continuous execution.

**Source**: Maturion Governance Constitution (OPOJD)

---

### INV-9: Quality Compounds, Never Erodes

**Statement**: Each wave strengthens total system quality; quality never degrades.

**Mechanism**:
- Wave N is 100% GREEN before completion
- Wave N+1 must maintain Wave N's 100% GREEN (cumulative QA)
- Learning from failures strengthens architecture checklists and QA suites
- Future builds benefit from all past learnings

**Implication**:
- Quality at Wave 5 ≥ Quality at Wave 4 ≥ Quality at Wave 3 (always ≥, never <)
- Architecture checklist grows (never shrinks)
- QA coverage expands (never contracts)
- Governance strengthens (never weakens)

**Enforcement**: Cumulative QA + Feedback Loop ensure compounding.

**Source**: EXECUTION_PHILOSOPHY.md, Feedback Loop & Continuous Improvement

---

### INV-10: Constitutional Foundation Precedes Execution

**Statement**: Wave 0 (Builder Constitutional Systems) must complete before any execution waves (1, 2, 3, ...) begin.

**Rationale**: Cannot execute at scale without constitutional foundation. Building before constitutional systems exist = building on sand.

**Wave 0 Content**:
- Governance-Aligned Builder Reasoning Blueprint
- Strict Builder Handover Contract
- Builder Memory Constitutional Protection
- Builder cognitive governance systems
- Builder monitoring and analytics

**Enforcement**: Wave dependency analysis blocks Wave 1 start until Wave 0 complete.

**Source**: CANONICAL_BACKLOG_SEQUENCE.md, Wave 0 definition

---

### INV-11: Proof Before Handover

**Statement**: No work is "complete" until proven complete.

**Proof Requirements**:
- **For Architecture**: Validated against checklist, complete, unambiguous
- **For QA**: Comprehensive, RED before building, GREEN after building
- **For Building**: All QA green, zero test debt, full functionality verified
- **For Handover**: Evidence complete, governance validated, ready for merge

**Never Allowed**:
- "Will prove later"
- "Good enough for now"
- "Temporary exception"
- "Acceptable debt"

**Enforcement**: Handover contracts (SBHC) require proof before acceptance.

**Source**: EXECUTION_PHILOSOPHY.md, Proof-Before-Handover

---

### INV-12: Autonomous Execution Within Boundaries

**Statement**: Execution proceeds autonomously unless explicitly blocked by governance.

**Default**: ASSUME PERMISSION, CHECK GOVERNANCE, CONTINUE IF COMPLIANT

**Blocking Conditions**:
- CS2 trigger (protected file)
- CS1-CS6 violation
- Unrecoverable failure
- Governance rule conflict

**Never Allowed**:
- Asking "Should I continue?" when no violation exists
- Pausing for unnecessary approvals
- Deferring without blocker
- Waiting when execution should proceed

**Enforcement**: OPOJD, Agent state machine

**Source**: Maturion Governance Constitution (OPOJD, Assume-Continue)

---

### INV-13: Builders Are Constrained Implementers

**Statement**: Builders implement to specifications; they do not architect, do not modify governance, do not skip quality gates.

**Builder Boundaries**:
- Accept "Build to Green" instructions ONLY
- Require Red QA before building
- Build until QA is 100% GREEN
- Respect architecture absolutely
- Cannot modify architecture
- Cannot skip tests
- Cannot introduce test debt
- Cannot weaken governance

**Enforcement**: Builder Constitutional Systems (Wave 0)

**Source**: FM_ROLE_CANON.md, BUILDER_CONSTITUTIONAL_SYSTEMS.md

---

### INV-14: Memory Integrity Is Protected

**Statement**: Constitutional memory (governance documents, guardrails, constitutional rules) cannot be modified by execution agents.

**Protected Memory**:
- Guardrails and Safety Charter
- Build Philosophy
- Constitutional Safeguards (CS1-CS6)
- Governance Constitution
- FM Role Canon
- All governance canon documents

**Modification Rules**:
- Only ARC-approved process can modify
- Only custodian can approve modifications
- Agents have read-only access
- Modifications require CS2 approval

**Enforcement**: BMCP (Builder Memory Constitutional Protection), file permissions, CS2

**Source**: Guardrails and Safety Charter, Builder Constitutional Systems

---

### INV-15: Learning from Failure Is Mandatory

**Statement**: Every failure activates Feedback Loop (FL) to ensure the failure cannot recur.

**Feedback Loop Process**:
```
FAILURE DETECTED → ANALYZE ROOT CAUSE → FIX IMMEDIATE ISSUE → LOCK LEARNING → VERIFY
```

**Learning Artifacts**:
- Architecture checklist updated (if architecture gap)
- QA suite enhanced (if QA gap)
- Governance rule added (if governance gap)
- Implementation fixed (if implementation gap)

**Result**: This failure type cannot recur. System permanently improves.

**Enforcement**: FL activation is automatic on failure.

**Source**: BUILD_PHILOSOPHY.md (FL/CI), EXECUTION_PHILOSOPHY.md

---

## Invariant Violations

### What Happens When Invariant Violated

**Immediate Actions**:
1. **Execution HALTS** (no forward progress)
2. **Violation LOGGED** (audit trail)
3. **Escalation TRIGGERED** (custodian notified)
4. **Resolution REQUIRED** (must restore invariant)

**Cannot Proceed Until**:
- Invariant restored
- Violation resolved
- Evidence of restoration provided
- Governance validation passes

### Severity of Violations

**Critical Violations** (Immediate Halt):
- INV-1: Building with non-100% GREEN
- INV-2: Any test debt exists
- INV-3: Building without Red QA
- INV-5: Governance rule bypassed
- INV-10: Execution wave before Wave 0

**Major Violations** (Escalation):
- INV-4: Role boundary crossed
- INV-6: Proceeding without evidence
- INV-8: OPOJD not followed
- INV-14: Constitutional memory modified

**All violations are serious. None are "minor" or "acceptable."**

---

## Invariant Validation

### Continuous Validation

Invariants are validated:
- **At each phase transition**: Before proceeding to next phase
- **At merge gates**: Before allowing PR merge
- **At wave completion**: Before marking wave complete
- **In CI/CD**: Automated checks on every commit

### Validation Mechanisms

- **CS1-CS6**: Constitutional Safeguards validate during execution
- **Merge Gates**: Validate before merge
- **Cumulative QA**: Validates INV-7 (no regression)
- **SBHC**: Validates INV-3 (Red QA before building)
- **GSR Enforcement**: Validates INV-5 (governance supremacy)

---

## Relationship to Other Documents

These invariants are derived from and enforce:
- **BUILD_PHILOSOPHY.md**: INV-1, INV-2, INV-3, INV-4, INV-6, INV-15
- **Maturion Governance Constitution**: INV-5, INV-8, INV-12
- **WAVE_MODEL.md**: INV-7, INV-9, INV-10
- **EXECUTION_PHILOSOPHY.md**: INV-9, INV-11, INV-12, INV-15
- **BUILDER_CONSTITUTIONAL_SYSTEMS.md**: INV-13, INV-14
- **FM_ROLE_CANON.md**: INV-4, INV-13

**Invariants are distilled wisdom from governance canon.**

---

## Summary

These 15 invariants ensure:
- Quality is absolute (INV-1, INV-2)
- Process is disciplined (INV-3, INV-4, INV-8)
- Governance is supreme (INV-5)
- Evidence is required (INV-6)
- Regression is prevented (INV-7, INV-9)
- Foundation precedes execution (INV-10)
- Completion is proven (INV-11)
- Autonomy is bounded (INV-12, INV-13)
- Memory is protected (INV-14)
- Learning is mandatory (INV-15)

**Violate an invariant = Violate the system's integrity.**

---

**Source Documents**:
- `BUILD_PHILOSOPHY.md`
- `maturion/philosophy/maturion-governance-constitution.md`
- `governance/maturion/VISION.md`
- `governance/maturion/PRINCIPLES.md`
- `governance/maturion/FM_ROLE_CANON.md`
- `governance/maturion/EXECUTION_PHILOSOPHY.md`
- `governance/execution/WAVE_MODEL.md`
- `governance/execution/BUILDER_CONSTITUTIONAL_SYSTEMS.md`
