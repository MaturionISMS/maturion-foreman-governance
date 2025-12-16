# QA_POLICY_MASTER.md
**Master QA, Verification & ISO Policy**

---

## Document Status

**Type**: Constitutional — Canonical Policy  
**Authority**: Supreme — Applies to ALL repositories in Maturion Engineering Ecosystem  
**Version**: 1.0  
**Effective Date**: 2025-12-16  
**Owner**: Foreman (FM) — Governed Authority  
**Approval Authority**: Johan (Maturion Engineering Leadership)  
**Scope**: Universal — All application repositories MUST implement

---

## Document Purpose

This document is the **single canonical source of truth** for QA, verification, and failure-handling doctrine across the entire Maturion ecosystem.

It exists to enable **safe, autonomous, one-time builds at speed**, including real-world operational scenarios where:

- Requirements are approved verbally or via chat
- Decisions are made immediately
- Changes must ship rapidly (≤ 1 hour)
- Failure is not acceptable
- Repeat failure is catastrophic

All application repositories MUST implement a practical version of this policy.  
No repository may redefine or weaken it.

---

## Design Reality (Non-Negotiable Context)

This policy is designed for an operating model where:

- **One human owner** supervises **many AI builder agents**
- Systems will handle **company secrets** and **high-value assets**
- Builds must succeed **the first time**
- Failures may be **unknown in advance** and only discovered at runtime
- Any discovered failure must be **eliminated permanently**

Therefore:

> **Failures are tolerated ONCE.**  
> **Repeat failures are governance violations.**

This is not a preference. This is the operational constraint under which the system must function.

---

## Table of Contents

1. [Core Definitions](#section-1-core-definitions)
2. [QA Coverage Model (Master Taxonomy)](#section-2-qa-coverage-model-master-taxonomy)
3. [Forbidden vs Allowed Handling (Strict)](#section-3-forbidden-vs-allowed-handling-strict)
4. [Governance Gate Relationship](#section-4-governance-gate-relationship)
5. [Continuous Feedback & Learning Doctrine (FL/CI)](#section-5-continuous-feedback--learning-doctrine-flci)
6. [ISO/IEC 27001 Alignment (Explicit)](#section-6-isoiec-27001-alignment-explicit)
7. [Ownership, Update & Approval Rules](#section-7-ownership-update--approval-rules)
8. [Acceptance Criteria](#section-8-acceptance-criteria)
9. [Summary & Commitment](#section-9-summary--commitment)

---

## Section 1: Core Definitions

This section formally defines the foundational concepts that govern all QA and verification activities.

### 1.1 Build-to-Green

**Build-to-Green** is the canonical instruction format for all code implementation across the Maturion ecosystem.

#### 1.1.1 Local Green

**Definition**: Development signal indicating that tests pass on developer's local environment or in isolated build context.

**Characteristics**:
- Tests execute and pass
- Build compiles without errors
- Linting passes locally
- Type checking succeeds
- Runtime errors not observed in tested scenarios

**Authority**: Local Green is **necessary but NOT sufficient** for merge authority.

**Purpose**: Provides immediate feedback to builders during implementation.

**Limitation**: Does NOT prove:
- Full system integration
- Production readiness
- Governance compliance
- Constitutional adherence

#### 1.1.2 Gate-Eligible Green

**Definition**: Verified QA state that qualifies for Governance Gate evaluation and merge authority.

**Characteristics**:
- All tests pass (100%)
- Zero errors (build, lint, runtime, type)
- Zero warnings (unless explicitly whitelisted)
- Zero test debt (no skips, stubs, or incomplete tests)
- Full QA coverage verified
- Build Philosophy process followed
- Evidence trail complete
- Constitutional compliance verified

**Authority**: Gate-Eligible Green is **necessary and sufficient** for merge consideration.

**Validation**: Must be independently verified by Foreman and Governance Gate.

**Guarantee**: If Gate-Eligible Green is achieved through proper process, build will function correctly on first deployment.

#### 1.1.3 Relationship

```
Local Green + Process Compliance + Evidence Trail + Constitutional Validation = Gate-Eligible Green
```

**Critical Distinction**:
- Local Green = "Tests pass"
- Gate-Eligible Green = "System is allowed to merge"

Builders aim for Local Green.  
Foreman validates Gate-Eligible Green.  
Governance Gate enforces merge authority.

---

### 1.2 Test Dodging

**Test Dodging** is any action, explicit or implicit, that avoids confronting a failing, incomplete, or inaccurate QA signal in order to continue execution.

#### 1.2.1 Constitutional Status

Test Dodging is a **governance violation**, not a technical decision.

- **Intent is irrelevant**
- **Effect is decisive**
- **Zero tolerance enforced**

#### 1.2.2 Prohibited Actions (Non-Exhaustive)

Test Dodging includes, but is not limited to:

**Direct Test Avoidance**:
- Using `.skip()`, `.only()`, or `.todo()` to bypass tests
- Disabling tests via configuration
- Commenting out test code or assertions
- Using conditional test execution to avoid failures
- Reducing test coverage to achieve GREEN
- Removing failing tests from test suite

**Structural or Indirect Dodging**:
- Creating empty test suites (no actual tests)
- Writing placeholder tests without assertions
- Narrowing assertions to avoid exposing failures
- Rewriting tests to always pass regardless of implementation
- Reclassifying behavior tests as "structure-only" to avoid failures
- Adjusting test expectations instead of fixing implementation

**Process-Level Dodging**:
- Proceeding with partial GREEN (e.g., 301/303 tests)
- Labeling failures as "minor" or "non-critical"
- Deferring test fixes to future issues or sprints
- Proceeding due to urgency, deadlines, or scope pressure
- Treating helper or infrastructure test failures as ignorable
- Accepting "close enough" as passing

**Error Suppression**:
- Using `|| true` to mask command failures
- Redirecting errors to `/dev/null`
- Empty catch blocks that swallow exceptions
- Suppressing warnings without proper justification
- Ignoring error logs or exit codes

**All such actions are constitutionally equivalent violations.**

#### 1.2.3 Detection and Enforcement

Upon detection of Test Dodging:

1. **Execution MUST STOP immediately**
2. **Test Dodging Incident MUST be registered** in governance memory
3. **Incident MUST be escalated to Foreman**
4. **Test debt MUST be eliminated fully**
5. **Full QA MUST be re-run to 100% GREEN**
6. **Execution may resume ONLY after resolution**

**No exceptions. No overrides without constitutional amendment.**

#### 1.2.4 Rationale

Broken code fails loudly.  
Test Dodging allows the system to lie to itself.  
Autonomous systems cannot survive lies.  
Truthful QA is a non-negotiable safety requirement.

---

### 1.3 Orphaned / Parked QA

**Orphaned QA** (also called **Parked QA**) refers to tests that cannot currently execute to completion but must be retained for future activation.

#### 1.3.1 Constitutional Status

Orphaned QA is **forbidden by default**.

Tests MUST execute and MUST pass.

**The ONLY exception** is through the **Governed QA Parking Station**.

#### 1.3.2 Governed QA Parking Station

The QA Parking Station is the **only legitimate mechanism** for handling tests that cannot currently run.

**Requirements**:

1. **Structural Exclusion (Not Skip)**
   - Tests physically moved to `/qa-parking/orphaned/`
   - Tests removed from active test suite via build configuration
   - NO use of `.skip()` or conditional disabling
   - Tests remain fully written and valid

2. **Mandatory Registry**
   - Entry created in `/qa-parking/registry.json`
   - Test identity, reason, and blocking condition recorded
   - Timestamp of parking action
   - Owner/responsible party identified

3. **Explicit Blocking Reason**
   - Technical dependency unavailable (e.g., external API not ready)
   - Feature not yet implemented (dependency on future work)
   - Infrastructure limitation (e.g., environment not available)
   - **NEVER** "test is failing" or "don't have time"

4. **Reactivation Condition**
   - Clear, measurable condition for when test can return
   - Example: "When UserAuth API v2 is deployed to staging"
   - Example: "When database migration #47 is complete"
   - NOT vague ("someday" or "when we have time")

5. **Watcher / Reminder Mechanism**
   - Automated monitoring of reactivation condition
   - Alert triggered when condition appears met
   - Weekly governance review of parked tests
   - Escalation if test remains parked > 30 days

6. **Evidence Trail**
   - Complete audit log of parking action
   - Justification reviewed and approved by Foreman
   - Constitutional compliance verified
   - Regular status updates logged

#### 1.3.3 Parking Station Example

```json
{
  "test_id": "user-auth-v2-integration-001",
  "test_path": "/qa-parking/orphaned/user-auth-v2/integration.test.ts",
  "parked_date": "2025-12-16T10:30:00Z",
  "reason": "Integration test requires UserAuth API v2 which is not yet deployed to any environment",
  "blocking_condition": "UserAuth API v2 deployed to staging environment",
  "blocking_ticket": "ISSUE-123",
  "reactivation_watch": "api-deployment-monitor",
  "owner": "foreman",
  "approved_by": "johan",
  "review_frequency": "weekly",
  "escalation_threshold_days": 30,
  "evidence_refs": [
    "/evidence/qa-parking/user-auth-v2-parking-justification.md"
  ]
}
```

#### 1.3.4 What is NOT Allowed

❌ **Skipping tests** (`.skip()`, `.todo()`)  
❌ **Commenting out tests**  
❌ **Conditional test execution** (`if (env !== 'prod') { test(...) }`)  
❌ **Parking tests because they fail**  
❌ **Parking tests to meet deadlines**  
❌ **Parking tests without registry entry**  
❌ **Parking tests without reactivation condition**

**Violation of these rules = Test Dodging incident**

---

### 1.4 Catastrophic Failure

**Catastrophic Failure** is any failure that violates the One-Time Build Law or True North principles.

#### 1.4.1 Definition

A **Catastrophic Failure** occurs when:

1. **Build does not work on first deployment** after merge, OR
2. **UI does not function as specified** in architecture, OR
3. **API returns incorrect data** or errors not in specification, OR
4. **Data corruption or loss** occurs, OR
5. **Security vulnerability** is introduced, OR
6. **Governance rule** is violated during build process, OR
7. **Constitutional safeguard** is bypassed, OR
8. **Evidence trail** is incomplete or falsified

#### 1.4.2 Severity Classification

**Critical Severity**:
- Data loss or corruption
- Security breach or vulnerability introduction
- Complete system failure (unable to function)
- Governance framework compromise

**High Severity**:
- Major feature non-functional
- Significant UX degradation
- Performance regression > 50%
- Multiple integration failures

**Medium Severity**:
- Single feature non-functional
- Minor UX issue
- Performance regression 20-50%
- Isolated integration failure

**Low Severity**:
- Visual bug (no functional impact)
- Documentation error
- Performance regression < 20%
- Minor edge case failure

**All severity levels are Catastrophic Failures and trigger FL/CI.**

#### 1.4.3 Response Protocol

Upon Catastrophic Failure detection:

1. **IMMEDIATE PAUSE** of all related execution
2. **INCIDENT REGISTRATION** in governance memory (CS3)
3. **ROOT CAUSE ANALYSIS (RCA)** activation
4. **FAILURE LOOP (FL) ACTIVATION** for learning capture
5. **CORRECTIVE ACTION** design and implementation
6. **ARCHITECTURE UPDATE** if gap identified
7. **QA ENHANCEMENT** to prevent recurrence
8. **CONTINUOUS IMPROVEMENT (CI)** propagation

---

### 1.5 Double-Catastrophic Failure

**Double-Catastrophic Failure** is the recurrence of a previously observed and supposedly resolved Catastrophic Failure.

#### 1.5.1 Definition

A **Double-Catastrophic Failure** occurs when:

1. A Catastrophic Failure was observed previously, AND
2. The same failure class was documented and resolved, AND
3. QA was allegedly enhanced to detect it, AND
4. The **same failure class occurs again**

This indicates:
- FL/CI did not function correctly
- QA enhancement was incomplete
- Architecture update was inadequate
- System did not learn from failure

#### 1.5.2 Constitutional Status

Double-Catastrophic Failure is a **CRITICAL GOVERNANCE VIOLATION**.

It indicates **systemic failure of the learning mechanism**, not just a technical error.

#### 1.5.3 Response Protocol

Upon Double-Catastrophic Failure detection:

1. **IMMEDIATE ESCALATION TO JOHAN**
2. **COMPLETE HALT of autonomous operations** in affected domain
3. **DEEP SYSTEM AUDIT** of FL/CI mechanism
4. **GOVERNANCE REVIEW** of enforcement effectiveness
5. **CONSTITUTIONAL REVIEW** if safeguards were bypassed
6. **COMPREHENSIVE REMEDIATION** before any resumption
7. **HUMAN OVERSIGHT REINSTATED** until confidence restored

**This is the most severe failure category. It represents existential risk to autonomous operations.**

---

## Section 2: QA Coverage Model (Master Taxonomy)

This section enumerates the complete taxonomy of QA domains that MUST be covered for every build.

### 2.1 Architecture Conformance

**Purpose**: Verify implementation matches architectural specification exactly.

**Test Categories**:
- Component structure matches architecture diagram
- Data flow matches architecture specification
- API contracts match architecture definition
- State management matches architecture design
- Error handling matches architecture requirements
- Security controls match architecture specification

**Coverage Requirement**: 100% of architectural components must have conformance tests.

**Failure Impact**: Architecture Conformance failure = Catastrophic Failure (build did not follow specification).

---

### 2.2 Integration & Wiring

**Purpose**: Verify all system components integrate correctly and data flows end-to-end.

**Test Categories**:
- Component-to-component communication
- API integration (internal and external)
- Database integration and queries
- Event handling and pub/sub
- Service orchestration
- Cross-module dependencies

**Coverage Requirement**: Every integration point must have tests.

**Failure Impact**: Integration failure = Catastrophic Failure (system components don't work together).

---

### 2.3 Functional Behavior

**Purpose**: Verify system performs expected functions correctly.

**Test Categories**:
- Feature functionality (happy path)
- Business logic correctness
- Data transformations accuracy
- Calculation correctness
- Workflow execution
- State transitions

**Coverage Requirement**: Every feature in architecture must have functional tests.

**Failure Impact**: Functional failure = Catastrophic Failure (system doesn't do what it should).

---

### 2.4 UX / Human Interaction Correctness

**Purpose**: Verify user-facing interactions work as designed.

**Test Categories**:
- UI component rendering
- User input handling
- Form validation
- Navigation and routing
- Visual feedback (loading states, errors, success messages)
- Accessibility compliance (WCAG 2.1 Level AA minimum)
- Responsive design
- Interactive element behavior

**Coverage Requirement**: Every user-facing element must have UX tests.

**Failure Impact**: UX failure = Catastrophic Failure (human cannot use system).

---

### 2.5 AI Reasoning & Continuity

**Purpose**: Verify AI agent reasoning is consistent, contextually appropriate, and maintains continuity across interactions.

**Test Categories**:
- Reasoning chain validation
- Context maintenance across turns
- Memory recall accuracy
- Decision consistency
- Goal achievement validation
- Constraint adherence
- Constitutional compliance
- Hallucination detection

**Coverage Requirement**: Every AI agent interaction pattern must have reasoning tests.

**Failure Impact**: Reasoning failure = Catastrophic Failure (AI cannot be trusted).

---

### 2.6 Memory Integrity

**Purpose**: Verify system correctly stores, retrieves, and maintains state across sessions.

**Test Categories**:
- Data persistence accuracy
- State recovery after restart
- Session continuity
- Memory retrieval correctness
- Memory update consistency
- Memory garbage collection
- Memory isolation (tenant separation)

**Coverage Requirement**: Every memory operation must have integrity tests.

**Failure Impact**: Memory failure = Catastrophic Failure (system cannot remember).

---

### 2.7 Security & Compliance

**Purpose**: Verify system adheres to security requirements and compliance standards.

**Test Categories**:
- Authentication and authorization
- Input validation and sanitization
- SQL injection prevention
- XSS prevention
- CSRF protection
- Secrets management (no secrets in code)
- Access control enforcement
- Audit logging
- ISO 27001 control validation
- GDPR compliance (data protection)

**Coverage Requirement**: Every security control must have validation tests.

**Failure Impact**: Security failure = CRITICAL Catastrophic Failure (potential breach).

---

### 2.8 Regression Prevention

**Purpose**: Verify previously fixed bugs do not re-occur.

**Test Categories**:
- Bug reproduction tests (from past incidents)
- Edge case tests (from past failures)
- Integration regression tests
- Performance regression tests
- Security regression tests

**Coverage Requirement**: Every resolved Catastrophic Failure must have permanent regression test.

**Failure Impact**: Regression = Double-Catastrophic Failure (learning system failed).

---

### 2.9 Performance & Resilience

**Purpose**: Verify system performs acceptably under expected and stressed conditions.

**Test Categories**:
- Response time benchmarks
- Throughput testing
- Load testing
- Stress testing
- Graceful degradation under load
- Error recovery
- Timeout handling
- Resource limits enforcement

**Coverage Requirement**: Every performance-critical path must have performance tests.

**Failure Impact**: Performance failure = Catastrophic Failure (system unusable at scale).

---

### 2.10 Evidence Integrity & Auditability

**Purpose**: Verify governance evidence is complete, accurate, and tamper-proof.

**Test Categories**:
- Evidence trail completeness
- Evidence timestamp validation
- Evidence hash verification
- Evidence immutability
- Evidence retrieval accuracy
- Audit log integrity
- Compliance report accuracy

**Coverage Requirement**: Every governance action must generate verifiable evidence.

**Failure Impact**: Evidence failure = CRITICAL Catastrophic Failure (cannot prove compliance).

---

### 2.11 Coverage Matrix

All domains must be testable and traceable.

| Domain | Required | Criticality | Failure Severity |
|--------|----------|-------------|------------------|
| Architecture Conformance | ✅ Mandatory | Critical | Catastrophic |
| Integration & Wiring | ✅ Mandatory | Critical | Catastrophic |
| Functional Behavior | ✅ Mandatory | Critical | Catastrophic |
| UX / Human Interaction | ✅ Mandatory | Critical | Catastrophic |
| AI Reasoning & Continuity | ✅ Mandatory | Critical | Catastrophic |
| Memory Integrity | ✅ Mandatory | Critical | Catastrophic |
| Security & Compliance | ✅ Mandatory | **CRITICAL+** | **CRITICAL Catastrophic** |
| Regression Prevention | ✅ Mandatory | Critical | Double-Catastrophic |
| Performance & Resilience | ✅ Mandatory | High | Catastrophic |
| Evidence Integrity | ✅ Mandatory | **CRITICAL+** | **CRITICAL Catastrophic** |

**No domain may be omitted. All domains are mandatory.**

---

## Section 3: Forbidden vs Allowed Handling (Strict)

This section defines what is categorically forbidden and what is allowed only through governance.

### 3.1 Forbidden (Always)

The following actions are **ABSOLUTELY FORBIDDEN** in all circumstances:

#### 3.1.1 Test Skipping Mechanisms

❌ **`describe.skip()` / `it.skip()` / `test.skip()`**  
❌ **`.only()` committed to repository**  
❌ **Conditional test disabling** (`if (process.env.SKIP_TESTS) return`)  
❌ **Commenting out tests**  
❌ **Removing tests from suite**

**Rationale**: These mechanisms allow test dodging and accumulate test debt.

#### 3.1.2 Error Suppression

❌ **`|| true` to mask command failures**  
❌ **`2>/dev/null` to hide errors**  
❌ **Empty catch blocks** (`catch (e) {}`)  
❌ **Swallowing errors without logging**  
❌ **Ignoring non-zero exit codes**

**Rationale**: Error suppression prevents detection of failures.

#### 3.1.3 Passing Green by Exclusion

❌ **Reducing test coverage to avoid failures**  
❌ **Narrowing assertions to always pass**  
❌ **Rewriting tests instead of fixing implementation**  
❌ **Excluding known-failing tests from suite**  
❌ **Reporting 301/303 as "passing"**

**Rationale**: This is test dodging disguised as QA.

#### 3.1.4 Process Shortcuts

❌ **Skipping Architecture phase**  
❌ **Skipping Red QA creation**  
❌ **Building without "Build to Green" instruction**  
❌ **Merging without Governance Gate**  
❌ **Manual merge without evidence trail**

**Rationale**: Process shortcuts bypass constitutional safeguards.

### 3.2 Allowed (Only via Governance)

The following actions MAY be performed ONLY through governed mechanisms:

#### 3.2.1 QA Parking (Governed)

**Mechanism**: Governed QA Parking Station (Section 1.3)

**Allowed**: Tests physically moved to `/qa-parking/orphaned/` with full registry entry and reactivation condition.

**NOT Allowed**: Any other form of test exclusion.

**Requirements**:
- ✅ Structural exclusion (not skip)
- ✅ Mandatory registry entry
- ✅ Explicit blocking reason
- ✅ Reactivation condition defined
- ✅ Watcher mechanism active
- ✅ Evidence trail complete

#### 3.2.2 Warning Whitelisting (Governed)

**Mechanism**: Explicit warning whitelist in `/foreman/qa/allowed-warnings.json`

**Allowed**: Specific warnings that are:
- Documented and justified
- Reviewed and approved by Foreman
- Non-critical to functionality
- Planned for resolution in defined timeline

**NOT Allowed**: Blanket warning suppression or "ignore all warnings."

**Requirements**:
- ✅ Explicit whitelist entry with justification
- ✅ Approval by Foreman
- ✅ Resolution plan documented
- ✅ Regular review (quarterly)

#### 3.2.3 Emergency Bypass (Governed)

**Mechanism**: CS2 Architecture Approval Workflow with emergency provisions

**Allowed**: Bypassing specific governance checks in genuine emergency (production down, security breach, data loss imminent).

**NOT Allowed**: Using "emergency" for convenience or deadline pressure.

**Requirements**:
- ✅ Johan explicit approval required
- ✅ Full audit trail mandatory
- ✅ Immediate retrospective scheduled
- ✅ Governance gap analysis completed
- ✅ Safeguard enhancement implemented

**This is the ONLY permitted governance bypass, and it is used extremely rarely.**

---

## Section 4: Governance Gate Relationship

This section defines how QA integrates with the Governance Gate.

### 4.1 Governance Gate Purpose

The **Governance Gate** is the final authority for all code merges.

It validates:
- Process compliance (not code quality)
- Evidence trail completeness
- Constitutional adherence
- No shortcuts taken

**Code quality is validated during Build-to-Green. Gate validates process.**

### 4.2 QA State Required for Gate

**Pre-Condition**: Before Governance Gate evaluates merge request:

✅ **Build-to-Green complete**  
✅ **Full QA suite executed**  
✅ **100% tests passing (Gate-Eligible Green)**  
✅ **Zero test debt verified**  
✅ **Evidence bundle generated**  
✅ **All automated checks passed**

**If any pre-condition missing → Gate evaluation FAILS.**

### 4.3 Difference Between "Tests Passed" and "Allowed to Merge"

This is the critical distinction:

#### "Tests Passed" (Local Green)
- Tests ran successfully
- Assertions passed
- Build compiled
- Linting passed
- **BUT**: May not have followed Build Philosophy
- **BUT**: May lack evidence trail
- **BUT**: May have constitutional violations

#### "Allowed to Merge" (Gate-Eligible Green)
- Tests passed (100%)
- Build Philosophy followed exactly
- Evidence trail complete and verifiable
- Constitutional safeguards passed
- Governance compliance verified
- **AND**: Gate authorizes merge

**Key Principle**: Tests passing is necessary but never sufficient for merge.

### 4.4 Evidence Required to Justify Merge Authority

The Governance Gate requires the following evidence:

1. **Architecture Evidence**
   - Architecture document exists and is complete
   - Architecture checklist validated
   - All checklist items addressed

2. **Red QA Evidence**
   - QA test suite exists
   - Build log shows pre-build QA run
   - Pre-build QA status was RED (failing)
   - Red QA existed before building started

3. **Build Instruction Evidence**
   - Build task record shows instruction "Build to Green"
   - Architecture reference provided to builder
   - QA suite reference provided to builder

4. **Green QA Evidence**
   - Build completion log exists
   - Final QA status: GREEN (100% passing)
   - Zero test debt verified
   - Zero errors and zero warnings (or whitelisted)

5. **Process Timeline Evidence**
   - All process steps have timestamps
   - Steps happened in correct order: Architecture → Red QA → Build → Green QA
   - No steps out of order
   - No shortcuts taken

6. **Constitutional Compliance Evidence**
   - CS1-CS6 checks passed
   - QIEL validation results
   - QIC validation results
   - GSR validation results

**If ANY evidence is missing or invalid → Merge BLOCKED.**

### 4.5 Gate Enforcement

The Governance Gate is **non-bypassable** (except emergency provisions in Section 3.2.3).

- Gate decision is final
- No human override permitted (except emergency)
- If gate fails, merge is blocked
- Builder must return to appropriate phase to fix

**This ensures no shortcuts bypass due process.**

---

## Section 5: Continuous Feedback & Learning Doctrine (FL/CI)

This section encodes the rule that **every failure MUST result in permanent prevention**.

### 5.1 The Learning Law

**Constitutional Mandate**:

> Every Catastrophic Failure MUST result in permanent prevention mechanisms.

This is not optional. This is the core learning mechanism of the autonomous system.

### 5.2 Failure Loop (FL) Activation

**Trigger**: Any Catastrophic Failure detected (Section 1.4)

**FL Process**:

```
Catastrophic Failure Detected
  ↓
FL ACTIVATION
  ↓
IMMEDIATE PAUSE of related execution
  ↓
ROOT CAUSE ANALYSIS (RCA)
  ↓
FAILURE CLASSIFICATION
  ↓
STRUCTURAL FIX implementation
  ↓
QA ENHANCEMENT to detect forever
  ↓
POLICY UPDATE if needed
  ↓
PROPAGATION to all repositories
  ↓
CONTINUOUS IMPROVEMENT (CI) achieved
```

### 5.3 Root Cause Classification

Every failure must be classified into one of these categories:

1. **Architecture Gap**
   - Requirement was not defined in architecture
   - Architecture was incomplete or ambiguous
   - **Fix**: Update architecture, add to checklist

2. **QA Gap**
   - Architecture was complete, but QA did not test this aspect
   - Test coverage was insufficient
   - **Fix**: Add tests to permanent QA suite

3. **Implementation Gap**
   - Architecture and QA were correct, but implementation was wrong
   - Builder did not follow specifications
   - **Fix**: Correct implementation, verify with existing QA

4. **Process Gap**
   - Build Philosophy was not followed
   - Shortcuts were taken
   - **Fix**: Enhance process enforcement

5. **Governance Gap**
   - Constitutional safeguard was missing or ineffective
   - **Fix**: Add new constitutional rule or enhance existing

**Every failure MUST be classified. "Unknown" is not acceptable.**

### 5.4 Structural Fix Requirement

For each failure, a **structural fix** must be implemented:

**NOT Acceptable**:
- ❌ "We'll be more careful next time"
- ❌ "Manual review will catch this"
- ❌ "This was a one-time mistake"

**Required**:
- ✅ Architecture updated to include missing aspect
- ✅ Architecture checklist updated with new item
- ✅ QA test added to permanently detect this failure class
- ✅ Process enforcement enhanced if needed
- ✅ Constitutional rule added if needed

**The fix must be structural, not behavioral.**

### 5.5 QA Enhancement to Detect Forever

After structural fix, QA MUST be enhanced:

1. **Add Regression Test**
   - Test that reproduces original failure
   - Test that verifies fix works
   - Test that will catch this failure class if it recurs

2. **Validate Test Effectiveness**
   - Temporarily reintroduce the bug
   - Verify test catches it (turns RED)
   - Remove bug again
   - Verify test passes (turns GREEN)

3. **Add to Permanent Suite**
   - Test becomes part of core QA suite
   - Test runs on every build forever
   - Test is never removed or disabled

**This ensures the same failure can NEVER happen again.**

### 5.6 Policy Update if Needed

If the failure revealed a policy gap:

1. **Identify Policy Gap**
   - What policy was missing?
   - What should have prevented this?
   - Why didn't existing policy catch it?

2. **Update Policy**
   - Add new rule or clarify existing
   - Update this document (QA_POLICY_MASTER.md)
   - Update constitutional documents if needed

3. **Approval Required**
   - Policy updates require Johan approval
   - Submit via FM notification protocol
   - Document rationale and impact

### 5.7 Propagation to All Repositories

Learning MUST propagate system-wide:

1. **Update Global Architecture Template**
   - New checklist items added to template
   - Future projects inherit learning automatically

2. **Update Global QA Template**
   - New test patterns added to template
   - Future projects include these tests by default

3. **Notify All Active Repositories**
   - Foreman notifies all active repos of learning
   - Each repo must incorporate learning
   - Compliance verified through governance audits

**Failure to propagate learning is itself a governance violation.**

### 5.8 FL/CI Success Criteria

FL/CI is complete when:

- ✅ Root cause identified and classified
- ✅ Structural fix implemented
- ✅ QA enhanced with regression test
- ✅ Test validated (catches failure if reintroduced)
- ✅ Policy updated if needed
- ✅ Learning propagated to all repos
- ✅ Evidence trail documented
- ✅ System can NEVER repeat this failure

**Only then is FL/CI complete and execution may resume.**

### 5.9 Double-Catastrophic Failure Prevention

If a Double-Catastrophic Failure occurs (Section 1.5), it means FL/CI failed.

**Response**:
1. **Audit FL/CI mechanism** — Why didn't it work?
2. **Enhance FL/CI process** — Add missing safeguards
3. **Meta-learning applied** — System learns how to learn better

**This is the highest priority governance issue.**

---

## Section 6: ISO/IEC 27001 Alignment (Explicit)

This section provides explicit mapping of the QA & governance system to ISO 27001 requirements.

### 6.1 Purpose of ISO Alignment

This mapping ensures:
- **Audit readiness** — System can demonstrate compliance at any time
- **Evidence-based compliance** — All claims are backed by verifiable evidence
- **No "paper security"** — Controls are actually enforced, not just documented

### 6.2 ISO 27001 Clause Mapping

#### Clause 4: Context of the Organization

**ISO Requirement**: Understand organization context, stakeholders, and ISMS scope.

**Maturion Implementation**:
- Design Reality (this document) documents operational context
- Philosophy Tree defines system scope
- Governance Constitution defines stakeholder roles

**Evidence**: 
- `/maturion/philosophy-tree.md`
- `/maturion/philosophy/maturion-governance-constitution.md`
- This document (QA_POLICY_MASTER.md)

#### Clause 5: Leadership

**ISO Requirement**: Management commitment, policy, roles, responsibilities, authorities.

**Maturion Implementation**:
- Johan is ultimate authority (established in constitution)
- Foreman has governed authority for QA and verification
- Clear ownership and approval rules (Section 7 of this document)

**Evidence**:
- `.github/foreman/agent-contract.md`
- This document Section 7 (Ownership & Approval Rules)

#### Clause 6: Planning

**ISO Requirement**: Risk assessment, treatment, objectives, planning to achieve them.

**Maturion Implementation**:
- Architecture Design Checklist (systematic risk identification)
- Red QA creation (control validation planning)
- FL/CI (continuous improvement planning)

**Evidence**:
- `/foreman/architecture-design-checklist.md`
- `/foreman/qa/qa-first-workflow.md`
- Section 5 of this document (FL/CI)

#### Clause 7: Support

**ISO Requirement**: Resources, competence, awareness, communication, documented information.

**Maturion Implementation**:
- Builder network provides competence
- Governance memory provides documented information
- Evidence system provides immutable records

**Evidence**:
- `/foreman/builders/MANIFEST.md`
- `/memory/` directory structure
- `/evidence/` directory structure

#### Clause 8: Operation

**ISO Requirement**: Operational planning, risk assessment, risk treatment.

**Maturion Implementation**:
- Build Philosophy defines operational process
- QA-First Workflow implements controls
- Governance Gate enforces controls

**Evidence**:
- `/BUILD_PHILOSOPHY.md`
- Section 4 of this document (Governance Gate)
- `/foreman/qa/qa-first-workflow.md`

#### Clause 9: Performance Evaluation

**ISO Requirement**: Monitoring, measurement, analysis, internal audit, management review.

**Maturion Implementation**:
- QA execution provides continuous measurement
- QIEL provides quality analysis
- Governance memory provides audit trail
- FL/CI provides management review mechanism

**Evidence**:
- QA execution logs
- `/lib/foreman/qiel-config.ts`
- Section 5 of this document (FL/CI)

#### Clause 10: Improvement

**ISO Requirement**: Nonconformity, corrective action, continual improvement.

**Maturion Implementation**:
- Catastrophic Failure classification (nonconformity identification)
- FL/CI process (corrective action)
- Learning propagation (continual improvement)

**Evidence**:
- Section 1.4 of this document (Catastrophic Failure)
- Section 5 of this document (FL/CI)
- `/foreman/feedback-loop/FL_CI_SYSTEM.md`

### 6.3 Annex A Control Mapping

#### A.8: Asset Management

**Relevant Controls**:
- A.8.1: Inventory of assets
- A.8.2: Ownership of assets
- A.8.3: Acceptable use of assets

**Maturion Implementation**:
- All code is tracked in git (asset inventory)
- All modules have defined owners (asset ownership)
- Governance rules define acceptable use

**QA Coverage**: Repository structure tests, asset tracking tests

#### A.12: Operations Security

**Relevant Controls**:
- A.12.1: Operational procedures and responsibilities
- A.12.6: Technical vulnerability management

**Maturion Implementation**:
- Build Philosophy defines operational procedures
- FL/CI implements vulnerability remediation
- Security scanning in QA (Section 2.7)

**QA Coverage**: Security & Compliance tests (Section 2.7)

#### A.14: System Acquisition, Development and Maintenance

**Relevant Controls**:
- A.14.1: Security requirements of information systems
- A.14.2: Security in development and support processes
- A.14.3: Test data

**Maturion Implementation**:
- Architecture phase defines security requirements
- Build-to-Green implements secure SDLC
- Test helper governance ensures proper test data

**QA Coverage**: 
- Architecture Conformance tests (Section 2.1)
- Security & Compliance tests (Section 2.7)
- Test helper validation (referenced documents)

#### A.16: Information Security Incident Management

**Relevant Controls**:
- A.16.1: Management of information security incidents
- A.16.2: Assessment and decision on information security events

**Maturion Implementation**:
- CS3 Incident Workflow
- Catastrophic Failure classification and response
- FL/CI for incident learning

**QA Coverage**: Incident management tests, evidence integrity tests (Section 2.10)

#### A.18: Compliance

**Relevant Controls**:
- A.18.1: Compliance with legal and contractual requirements
- A.18.2: Information security reviews

**Maturion Implementation**:
- This document (QA_POLICY_MASTER.md) defines compliance framework
- Governance Gate enforces compliance
- Evidence system provides audit trail

**QA Coverage**: Evidence Integrity & Auditability tests (Section 2.10)

### 6.4 Change Management (A.12.1.2 and A.14.2.2)

**ISO Requirement**: Changes to systems must be controlled through formal change management.

**Maturion Implementation**:

1. **Architecture Approval** (CS2):
   - All changes start with architecture design
   - Protected file changes require explicit approval
   - Evidence trail required

2. **Build-to-Green Process**:
   - Formal process for implementing changes
   - Red QA defines acceptance criteria
   - Green QA verifies correct implementation

3. **Governance Gate**:
   - Final validation before merge
   - Ensures process was followed
   - Blocks unauthorized changes

**QA Coverage**: Process compliance tests in Governance Gate

### 6.5 Secure SDLC (A.14.2)

**ISO Requirement**: Security must be integrated throughout development lifecycle.

**Maturion Implementation**:

1. **Architecture Phase** — Security requirements defined
2. **Red QA Phase** — Security tests created
3. **Build Phase** — Security controls implemented
4. **Validation Phase** — Security validated
5. **Gate Phase** — Security evidence verified

**QA Coverage**: Security & Compliance tests (Section 2.7) run at every phase

### 6.6 Test Information (A.14.3)

**ISO Requirement**: Test data must be protected and controlled.

**Maturion Implementation**:
- Test helper functions governance (no real production data in tests)
- Test fixtures generate synthetic data
- No secrets in test code
- Test data isolation (tenant separation)

**QA Coverage**: Test helper validation, secrets scanning

### 6.7 Operational Control (A.12)

**ISO Requirement**: Operations must be controlled and monitored.

**Maturion Implementation**:
- Build Philosophy defines operational control
- QA-First Workflow implements control procedures
- QIEL monitors quality continuously
- Governance Gate enforces control compliance

**QA Coverage**: All QA domains (Section 2) provide operational monitoring

### 6.8 Continuous Improvement (Clause 10)

**ISO Requirement**: ISMS must continually improve.

**Maturion Implementation**:
- FL/CI mechanism (Section 5)
- Every failure triggers improvement
- Learning propagates system-wide
- Meta-learning (system learns how to learn)

**QA Coverage**: FL/CI tests, learning propagation tests

### 6.9 Audit Evidence

**ISO Requirement**: System must generate audit evidence for compliance demonstration.

**Maturion Implementation**:
- Evidence system (`/evidence/` directory)
- Immutable evidence records
- Complete audit trail
- Evidence integrity verification (Section 2.10)

**QA Coverage**: Evidence Integrity & Auditability tests (Section 2.10)

### 6.10 Compliance Validation

**This QA Policy Master itself satisfies ISO 27001 requirement for documented operational procedures and security controls.**

**Audit Readiness Statement**:

✅ All ISO 27001 Clauses 4-10 mapped to Maturion implementations  
✅ All relevant Annex A controls mapped to Maturion implementations  
✅ All controls have QA coverage defined  
✅ Evidence system provides audit trail  
✅ System is audit-ready at all times  

**No "paper security" — All documented controls are actually enforced through QA and governance.**

---

## Section 7: Ownership, Update & Approval Rules

This section defines who owns this policy, how it is updated, and approval requirements.

### 7.1 Ownership

**Policy Owner**: Foreman (FM)

**Responsibilities**:
- Keep this policy current and accurate
- Update policy when new failure classes discovered
- Propose policy enhancements based on learning
- Ensure policy is enforced across all repositories
- Respond to policy clarification requests

**Authority**: Governed Authority (FM operates within constitutional boundaries)

### 7.2 Approval Authority

**Policy Changes Require**:
- **Johan Approval** — Explicit approval required for ALL policy updates
- **Via FM Notification Protocol** — Updates submitted through governance notification system
- **With Justification** — Rationale and impact must be documented

**Approval Process**:
1. Foreman identifies need for policy update (via FL/CI or proactive review)
2. Foreman drafts policy update with justification
3. Foreman submits to Johan via notification center
4. Johan reviews and approves/rejects/requests changes
5. If approved, Foreman implements and propagates
6. Update logged in governance memory

**No policy update may occur without this approval.**

### 7.3 Policy Update Triggers

This policy MUST be updated when:

1. **New Failure Class Discovered**
   - Catastrophic Failure occurs that is not covered by existing policy
   - New failure pattern requires new definition or rule
   - **Trigger**: FL/CI process identifies policy gap

2. **Constitutional Amendment**
   - Build Philosophy updated
   - Constitutional document (CS1-CS6) updated
   - Governance framework changes
   - **Trigger**: Constitutional update requires policy alignment

3. **ISO 27001 Requirement Change**
   - ISO standard updated
   - New Annex A controls added
   - Compliance requirements change
   - **Trigger**: External compliance requirement

4. **Operational Reality Change**
   - Design reality evolves (e.g., new types of AI agents)
   - New repositories with different constraints
   - New security threats or vulnerabilities
   - **Trigger**: Environmental change

5. **Systemic Learning**
   - Multiple FL/CI cycles reveal pattern
   - Meta-learning suggests policy enhancement
   - Governance audit identifies gap
   - **Trigger**: Continuous improvement process

**Foreman MUST propose update within 24 hours of trigger event.**

### 7.4 Update Procedure

**Step-by-Step**:

1. **Identify Update Need**
   - Document trigger event
   - Analyze gap or change requirement
   - Draft proposed policy update

2. **Impact Analysis**
   - Identify affected sections
   - Assess impact on existing repos
   - Determine implementation effort
   - Evaluate urgency

3. **Draft Update**
   - Write proposed policy text
   - Update relevant sections
   - Add/modify definitions if needed
   - Update version and changelog

4. **Justification Documentation**
   - Why is update needed?
   - What failure or gap does it address?
   - How does it improve system?
   - What is the cost of NOT updating?

5. **Approval Request**
   - Submit to Johan via FM notification protocol
   - Include: proposed update, justification, impact analysis
   - Request review and decision

6. **Approval Decision**
   - Johan approves, rejects, or requests changes
   - If changes requested, return to step 3
   - If approved, proceed to step 7
   - If rejected, document rationale and close

7. **Implementation**
   - Update this document (QA_POLICY_MASTER.md)
   - Commit to repository
   - Update version number
   - Update last modified date
   - Log in governance memory

8. **Propagation** (see Section 7.5)

### 7.5 Policy Update Propagation

After policy update approval and implementation:

1. **Gap Analysis in All Repos**
   - Foreman analyzes each active repository
   - Identifies where new policy affects each repo
   - Documents gaps and required changes

2. **Implementation Updates**
   - Each affected repo must implement policy update
   - Implementation follows Build Philosophy (Architecture → Red QA → Build to Green)
   - Timeline: 72 hours for normal updates, 24 hours for critical

3. **Validation**
   - Foreman validates each repo's implementation
   - QA must include tests for new policy requirement
   - Evidence trail must demonstrate compliance

4. **Compliance Verification**
   - All repos must confirm compliance
   - Governance audit checks adherence
   - Non-compliance triggers escalation

**No repository may ignore policy updates. Compliance is mandatory.**

### 7.6 Emergency Policy Updates

In cases of **critical security vulnerability** or **imminent catastrophic failure risk**:

**Fast-Track Process**:
1. Foreman identifies critical need
2. Immediate notification to Johan (via emergency channel)
3. Verbal or rapid approval obtained
4. Policy updated immediately
5. Propagation to all repos within 24 hours
6. Formal documentation completed within 48 hours

**Evidence Required**:
- Emergency justification
- Approval record (even if verbal, must be logged)
- Implementation timeline
- Validation results

**This is used RARELY and only for genuine emergencies.**

### 7.7 Policy Review Schedule

**Regular Reviews**:
- **Quarterly**: Foreman reviews policy for accuracy and completeness
- **Annually**: Comprehensive policy audit
- **Post-Incident**: After any Double-Catastrophic Failure
- **Pre-Audit**: Before external ISO 27001 audit

**Review Output**:
- Policy accuracy confirmed OR update proposed
- Compliance status assessed
- Improvement opportunities identified
- Governance effectiveness validated

### 7.8 Version Control

**This Document**:
- **Current Version**: 1.0
- **Version Format**: Major.Minor (e.g., 1.0, 1.1, 2.0)
- **Major Version Change**: Significant policy addition or fundamental change
- **Minor Version Change**: Clarification, refinement, or small addition
- **Version History**: Maintained in changelog at end of document

**Immutability**:
- Previous versions archived in governance memory
- Version history provides audit trail
- Changes are additive where possible (not destructive)

---

## Section 8: Acceptance Criteria

This section defines how to validate that this policy is effective and enforceable.

### 8.1 Policy Completeness

This policy is complete when:

✅ **Human Readable**: Non-technical stakeholders (Johan) can understand it  
✅ **System Enforceable**: Automated systems (Foreman, QIEL, Governance Gate) can enforce it  
✅ **No Ambiguity**: No room for interpretation or "creative" compliance  
✅ **Deterministic**: Same inputs always produce same enforcement outcome  
✅ **All Domains Covered**: Every QA domain (Section 2) has clear requirements  
✅ **Failure Handling Defined**: Every failure type has defined response (Section 1, 5)  
✅ **ISO Aligned**: All ISO 27001 requirements explicitly mapped (Section 6)  
✅ **Ownership Clear**: Roles and approval processes unambiguous (Section 7)

**Validation**: This document satisfies all criteria above.

### 8.2 Implementation Readiness

All repositories can implement this policy without reinterpretation when:

✅ **Clear Instructions**: Every requirement is actionable  
✅ **Examples Provided**: Forbidden and allowed actions are illustrated  
✅ **No Hidden Requirements**: All expectations are explicit  
✅ **Tooling Defined**: Mechanisms for enforcement are specified  
✅ **Evidence Specified**: What to log and how to prove compliance is clear  

**Validation**: This document provides implementation guidance throughout.

### 8.3 Enforcement Readiness

This policy is enforceable when:

✅ **Detection Mechanisms Exist**: Violations can be detected automatically  
✅ **Escalation Paths Defined**: Who to notify and when is clear  
✅ **Remediation Procedures Exist**: How to fix violations is specified  
✅ **Audit Trail Maintained**: All enforcement actions are logged  
✅ **No Bypass Available**: Policy cannot be circumvented (except emergency provisions)

**Validation**: Enforcement mechanisms defined throughout this document.

### 8.4 Audit Readiness

System is audit-ready when:

✅ **Evidence Complete**: All claims are backed by verifiable evidence  
✅ **ISO Mapping Explicit**: Every ISO requirement maps to implementation  
✅ **Compliance Provable**: System can demonstrate compliance on demand  
✅ **No Paper Security**: All documented controls are actually enforced  

**Validation**: Section 6 (ISO Alignment) provides complete mapping and evidence references.

### 8.5 Operational Readiness

This policy enables safe autonomous operations when:

✅ **Speed Without Risk**: Changes can ship rapidly (≤ 1 hour) without quality compromise  
✅ **One-Time Builds**: First deployment works correctly  
✅ **Failure Tolerance**: Single failure is tolerated and learned from  
✅ **Repeat Prevention**: Same failure never occurs twice (Double-Catastrophic prevented)  
✅ **Autonomous Scale**: One human can supervise many AI agents safely  

**Validation**: This is the ultimate acceptance criterion. The policy enables the Design Reality (beginning of document).

---

## Section 9: Summary & Commitment

### 9.1 Policy Purpose Restated

This policy exists to enable **speed without risk**.

It is the reason Maturion can scale beyond what human teams can safely do.

It is the foundation of autonomous, AI-driven software development at production scale.

### 9.2 Core Principles

1. **Failures Tolerated Once** — Same failure twice = governance violation
2. **Build-to-Green is Universal** — Only valid instruction format
3. **Test Dodging is Forbidden** — No exceptions, zero tolerance
4. **Zero Test Debt is Absolute** — No partial passes, no "close enough"
5. **QA Coverage is Complete** — All domains (Section 2) are mandatory
6. **Governance Gate is Final** — No merge without gate approval
7. **FL/CI is Mandatory** — Every failure produces permanent learning
8. **ISO Compliance is Explicit** — All controls mapped and enforced

**These principles are non-negotiable.**

### 9.3 Binding Authority

This policy is binding on:

- All AI agents (Foreman, Builders, Reasoning Engines, Memory Systems)
- All autonomous systems (QIEL, QIC, Governance Gate, FL/CI)
- All human contributors (Developers, Reviewers, Administrators)
- All application repositories (Current and future)

**No entity may bypass this policy without following governance procedures (Section 3.2, 7.2).**

### 9.4 Enforcement Commitment

The Maturion Engineering Ecosystem commits to:

- **Rigorous Enforcement** — No soft passes, no exceptions
- **Continuous Learning** — Every failure improves the system
- **Systemic Evolution** — Learning propagates system-wide
- **Evidence-Based Compliance** — All claims backed by proof
- **Audit Readiness** — Compliance demonstrable at all times

**This is not aspirational. This is operational reality.**

### 9.5 Success Criteria

This policy succeeds when:

✅ Builds ship in ≤ 1 hour from approval to production  
✅ Builds work correctly on first deployment  
✅ Same failure NEVER happens twice  
✅ Autonomous operations scale safely  
✅ ISO 27001 audits pass without findings  
✅ Johan can supervise many AI agents without risk  

**This is the measure of success.**

---

## Changelog

### Version 1.0 (2025-12-16)
**Status**: Initial Release

**Summary**: Created canonical QA Policy Master document consolidating all QA, verification, and failure-handling doctrine.

**Contents**:
- Core Definitions (Build-to-Green, Test Dodging, Orphaned QA, Catastrophic Failures)
- QA Coverage Model (10 mandatory domains)
- Forbidden vs Allowed Handling (strict rules)
- Governance Gate Relationship (process compliance validation)
- FL/CI Doctrine (learning from failures)
- ISO 27001 Alignment (explicit mapping)
- Ownership & Approval Rules (governance procedures)

**Approved By**: [Pending Johan Approval]

**Effective Date**: [Upon Approval]

---

## Related Documents

### Constitutional Layer
- `/BUILD_PHILOSOPHY.md` — Build Philosophy (Supreme Authority)
- `.github/foreman/agent-contract.md` — Agent Contract
- `/maturion/philosophy/maturion-governance-constitution.md` — Governance Constitution
- `/foreman/constitution/CS1-CS6` — Constitutional Safeguards

### Governance Layer  
- `/GOVERNANCE_GATE_CANON.md` — Governance Gate Definition
- `/foreman/governance/quality-integrity-contract.md` — QIC
- `/foreman/governance/zero-test-debt-constitutional-rule.md` — Zero Test Debt
- `/foreman/governance/test-dodging-constitutional-rule.md` — Test Dodging
- `/foreman/governance/governance-supremacy-rule.md` — GSR

### Operational Layer
- `/foreman/qa/qa-first-workflow.md` — QA-First Workflow
- `/foreman/architecture-design-checklist.md` — Architecture Checklist
- `/foreman/feedback-loop/FL_CI_SYSTEM.md` — FL/CI System

### Implementation Layer
- `/lib/foreman/qiel-config.ts` — QIEL Configuration
- `/lib/foreman/qa/test-debt-scanner.ts` — Test Debt Scanner
- `/tests/qic/` — Quality Integrity Contract Tests

---

## Document Authority

**This is a constitutional policy document.**  
**It cannot be overridden by local rules.**  
**Compliance is MANDATORY.**  
**Violations are governance incidents.**

**Authority**: Maturion Engineering Leadership (Johan)  
**Status**: Active and Enforced  
**Scope**: Universal — All Maturion Engineering Ecosystem

---

*End of QA_POLICY_MASTER.md v1.0*
