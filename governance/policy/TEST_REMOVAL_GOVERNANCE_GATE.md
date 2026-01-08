# TEST REMOVAL GOVERNANCE GATE

## Status
Canonical Governance Policy  
Version: v1.0  
Authority: Corporate Governance Canon  
Effective Date: 2026-01-08  
Triggered By: INCIDENT-2026-01-08-INCORRECT-TEST-REMOVAL  
Owner: Johan Ras (CS2)

---

## 1. Purpose

This policy establishes a **zero-tolerance governance gate** for test removal across all repositories in the Maturion Engineering Ecosystem.

Tests are architectural QA artifacts that drive implementation. Their removal represents potential loss of:
- Required architectural coverage
- Quality assurance safeguards
- Specification traceability
- Regression protection

This policy ensures that test removal decisions are:
- Evidence-based
- Architecturally justified
- Properly reviewed
- Fully documented

This policy is **normative and mandatory**.

---

## 2. Constitutional Authority

This policy derives authority from:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Governance as canonical memory and enforcement
- **QA_POLICY_MASTER.md** - QA coverage requirements and verification doctrine
- **BUILD_PHILOSOPHY.md** - One-Time Build Law and zero-tolerance for failures
- **BOOTSTRAP_EXECUTION_LEARNINGS.md** - BL-[TBD] documenting INCIDENT-2026-01-08

---

## 3. Core Principles

### 3.1 Zero-Tolerance Policy

**Tests SHALL NOT be removed without proving one of:**
1. Test validates behavior no longer required (with architecture change proof)
2. Test is duplicate of existing coverage (with coverage analysis)
3. Test is malformed/incorrect (with technical analysis)

**Burden of proof is on remover, not reviewer.**

### 3.2 Tests Drive Implementation

Tests exist to drive and verify implementation of architectural requirements.

**The fact that a feature is not yet implemented is NOT justification for test removal.**

Tests for unimplemented features:
- Define expected behavior
- Establish acceptance criteria
- Prevent scope drift
- Enable test-driven development

### 3.3 Traceability Is Mandatory

Test removal requires explicit traceability analysis demonstrating:
- What architectural requirement the test validates
- Where that requirement is specified
- Why removal is justified

### 3.4 Impact Must Be Assessed

Test removal requires assessment of:
- What architectural requirement loses QA coverage
- What behavior will be untested
- What risk removal creates

---

## 4. Prohibited Justifications

**The following justifications are REJECTED:**

- ❌ "Tests are speculative" (without traceability analysis proving no architectural basis)
- ❌ "Features not implemented" (tests exist to drive implementation)
- ❌ "Class names not found in architecture" (wrong abstraction level - see ARCHITECTURE_TEST_TRACEABILITY_METHODOLOGY.md)
- ❌ "Tests are noisy" (not a valid reason for removal)
- ❌ "Tests slow down development" (tests ARE development)
- ❌ "Tests are failing" (fix tests, don't remove them)
- ❌ "Too many RED tests" (implement features, don't remove tests)

**Note:** These justifications may indicate legitimate concerns, but they require different solutions than test removal.

---

## 5. Required Evidence for Test Removal

**Must provide ALL of:**

### 5.1 Traceability Analysis

For each test being removed, provide:

```markdown
Test Name: [test_name]
Validates: [behavior description]
Architecture Requirement: [requirement text]
Architecture Section: [document + section reference]
Traceability Status: FOUND / NOT FOUND

If NOT FOUND: 
- Prove requirement was removed from architecture
- Show architecture change approval (CS2+)
- Show date of requirement removal
```

### 5.2 Impact Analysis

```markdown
Architectural Coverage Impact:
- Requirement losing coverage: [requirement]
- Behavior becoming untested: [behavior]
- Risk created by removal: [risk assessment]
- Mitigation plan: [plan or justification why not needed]
```

### 5.3 Alternative Coverage (if claiming duplicate)

```markdown
Duplicate Test Analysis:
- Existing test covering same behavior: [test_name]
- Coverage equivalence proof: [demonstration]
- Why both tests exist: [historical context]
- Safe to remove: YES/NO with justification
```

---

## 6. Approval Requirements

| Tests Being Removed | Required Approval | Required Evidence |
|---------------------|-------------------|-------------------|
| 1-5 tests | FM approval | Traceability analysis per test |
| 6-10 tests | FM + Governance Administrator review | Traceability + impact analysis |
| 11+ tests | **CS2 approval** | Full traceability matrix + architecture review |

**Note:** These thresholds are minimums. Higher-risk removals may require CS2 approval regardless of count.

---

## 7. Test Removal Process

### Step 1: Traceability Analysis

Map each test to architectural requirement using **CORRECT methodology** (see ARCHITECTURE_TEST_TRACEABILITY_METHODOLOGY.md):

```
Test → Validates What? → Required By? → Architecture Section?
```

**Do NOT use incorrect methodology:**
- ❌ Searching for class names in architecture
- ❌ Looking for implementation details
- ❌ Expecting architecture to specify "how" instead of "what"

### Step 2: Justify Removal

Prove ONE of:
- **Requirement removed**: Show architecture change document and CS2 approval
- **Duplicate coverage**: Show equivalent test with coverage proof
- **Malformed test**: Show technical error and why unfixable

### Step 3: Submit for Review

Create removal proposal document with:
- Complete traceability matrix
- Justification per test
- Impact analysis
- Alternative coverage (if applicable)
- Risk assessment

### Step 4: Governance Review

- **FM**: Reviews traceability methodology (correct approach used?)
- **Governance Administrator**: Reviews governance impact (does this weaken QA?)
- **CS2**: Approves if >10 tests OR high-risk removal

### Step 5: Document

Record removal in:
- `DEBT_REGISTER.md` (if removing required coverage creates technical debt)
- `TEST_REMOVAL_LOG.md` (audit trail - create if doesn't exist)
- Architecture change notes (which requirements now lack QA)
- Bootstrap learnings (if removal reveals governance gap)

---

## 8. Enforcement

### 8.1 Violation Definition

**Test Dodging** is defined as:
- Removing tests without following this process
- Using prohibited justifications
- Insufficient evidence or analysis
- Bypassing approval requirements
- Failing to document removal

### 8.2 Violation Response

If tests removed without following this process:

1. **Immediate Work Stoppage**: All related work halts
2. **Immediate Restoration**: Tests restored via revert or re-creation
3. **Incident Report**: Formal incident created with root cause analysis
4. **Agent Contract Review**: Review whether agent contract requires clarification
5. **Bootstrap Learning**: Capture lesson if systemic gap revealed

### 8.3 Repeat Violations

Repeat violations indicate:
- Insufficient agent training
- Unclear governance communication
- Contract ambiguity requiring resolution

Response:
- Escalate to CS2
- Review agent authorization
- Update agent contracts/training
- Consider process improvements

---

## 9. Emergency Bypass (Exceptional Cases Only)

### 9.1 When Emergency Bypass May Be Considered

Emergency bypass may be considered ONLY when:
- Production system is broken
- Test removal is blocking critical hotfix
- CS2 explicitly authorizes bypass
- Full retrospective analysis will be completed

### 9.2 Emergency Bypass Process

1. **CS2 Authorization**: Explicit approval required
2. **Immediate Documentation**: Create incident ticket
3. **Time-Box**: Set deadline for retrospective analysis
4. **Restoration Plan**: Define when/how tests will be restored or properly justified
5. **Post-Mortem**: Complete within 48 hours

**Note:** Emergency bypass does NOT excuse lack of analysis. It defers it.

---

## 10. Bootstrap Learning

### Reference Incident

**INCIDENT-2026-01-08-INCORRECT-TEST-REMOVAL**

**Summary**: 60 Wave 0 tests incorrectly removed as "speculative" when they validated architectural requirements. Removal based on wrong traceability methodology (looking for class names instead of requirements).

**Root Cause**:
1. Wrong traceability methodology applied (implementation-focused vs requirement-focused)
2. Misunderstanding of test purpose (driving implementation vs validating existing code)
3. No governance gate for test removal
4. Insufficient evidence requirements

**Impact**:
- Lost QA coverage for architectural requirements
- Created impression that architecture lacked specification
- Required full analysis and restoration effort
- Revealed governance gap requiring this policy

**Prevention**: This policy establishes governance gate preventing recurrence.

---

## 11. Related Policies

- **ARCHITECTURE_TEST_TRACEABILITY_METHODOLOGY.md** - Correct traceability methodology
- **QA_POLICY_MASTER.md** - Overall QA doctrine
- **BUILDER_QA_HANDOVER_POLICY.md** - Builder QA responsibilities
- **BOOTSTRAP_EXECUTION_LEARNINGS.md** - Lessons learned from bootstrap execution

---

## 12. Review and Updates

**Policy Owner**: Johan Ras (CS2)  
**Review Cycle**: Annual  
**Next Review**: 2027-01-08  
**Update Authority**: CS2 or Governance Administrator with CS2 approval

Updates to this policy require:
- Governance change proposal
- Impact analysis
- CS2 approval
- Layer-down to affected repositories

---

## 13. Acceptance Criteria

This policy is considered implemented when:

- ✅ All agents trained on test removal requirements
- ✅ Test removal log established (if not exists)
- ✅ FM contract updated with test removal gate reference
- ✅ Builder contracts updated with test removal requirements
- ✅ Traceability methodology documented (companion policy)
- ✅ Bootstrap learning recorded
- ✅ Policy included in canonical governance manifest

---

**END OF POLICY**
