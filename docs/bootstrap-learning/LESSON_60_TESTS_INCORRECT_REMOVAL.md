# Bootstrap Learning: Incorrect Test Removal Incident

**Lesson ID**: BL-021  
**Date**: 2026-01-08  
**Classification**: CATASTROPHIC (First-Time Governance Infrastructure Gap)  
**Triggered By**: INCIDENT-2026-01-08-INCORRECT-TEST-REMOVAL  
**Related PR**: APGI-cmy/maturion-foreman-governance#477

---

## Executive Summary

60 Wave 0 tests were incorrectly identified for removal as "speculative" when they actually validated architectural requirements. The root cause was using the wrong traceability methodology (looking for implementation class names in architecture instead of mapping test behaviors to architectural requirements).

**This incident revealed a critical governance gap: no policy existed for test removal, and no methodology existed for test-to-architecture traceability analysis.**

**This must never happen again.**

---

## What Happened

### The Incident

During Wave 0 execution, a proposal was made to remove 60 tests based on a traceability analysis that concluded these tests were "speculative" and lacked architectural grounding.

**The analysis was flawed.** The tests DID validate architectural requirements, but the wrong methodology was used to trace them.

### The Wrong Methodology

**What was done (INCORRECT)**:
1. Identified class names referenced in tests (e.g., `EvidenceGenerator`, `DecisionTracker`)
2. Searched architecture documents for those exact class names
3. When class names were not found, concluded tests were ungrounded
4. Recommended test removal as "cleanup of speculative code"

**Why this was wrong**:
- Architecture specifies WHAT the system must do (requirements, behaviors, capabilities)
- Architecture does NOT specify HOW to implement it (class names, method signatures)
- Tests bridge the gap: they validate REQUIREMENTS through IMPLEMENTATION
- Looking for class names confuses abstraction levels

### What Should Have Been Done (CORRECT)

**Correct methodology**:
1. For each test, identify: What behavior does this test validate?
2. Find the architectural requirement that specifies this behavior
3. Map test → behavior → requirement → architecture section
4. Only if NO requirement exists (explicit or implied) is removal justified

**Example**:
```
Test: test_evidence_generated_at_build_start

Wrong approach:
- Search architecture for "EvidenceGenerator" → Not found → Remove test ❌

Correct approach:
- Test validates: Evidence is generated when build starts
- Architecture requires: "Evidence at key events" (FM_ARCHITECTURE_SPEC Section 7.3)
- Traceability: VALID - Test validates specified requirement ✅
```

---

## Why It Happened

### Root Causes

1. **No Test Removal Governance Gate**
   - No policy requiring traceability analysis before test removal
   - No approval process for bulk test removal
   - No documentation requirements for test removal decisions
   - Burden of proof not explicitly on remover

2. **No Traceability Methodology Standard**
   - No documented "correct" methodology for test-to-architecture mapping
   - Abstraction level confusion between requirements and implementation
   - No training on implied requirements and component-functional necessities
   - No decision tree for traceability edge cases

3. **Misunderstanding of Test Purpose**
   - Tests seen as validating existing code (reactive)
   - Tests NOT understood as driving implementation (proactive)
   - "Feature not implemented" incorrectly treated as justification for test removal
   - RED tests seen as "noise" rather than work queue

4. **No Cross-Check Mechanism**
   - Traceability analysis not peer-reviewed for methodology correctness
   - No requirement to prove test lacks architectural basis
   - No governance review for high-volume test removals

---

## Impact

### Coverage Loss Risk

Without intervention, 60 tests would have been removed, eliminating QA coverage for:
- Evidence generation and validation
- Governance enforcement mechanisms
- Escalation workflows
- Decision tracking and determinism
- Liveness/heartbeat infrastructure
- Multiple architectural requirements across Wave 0 components

### Process Risk

This incident revealed:
- Tests could be removed without rigorous justification
- Wrong methodology could lead to wrong conclusions
- Architecture could be incorrectly deemed "unspecified"
- High-volume changes could bypass governance review

### Trust Impact

- Raised questions about architecture completeness (later proven false)
- Created uncertainty about test validity (later proven unfounded)
- Required full re-analysis and documentation effort
- Delayed execution while governance gap was addressed

---

## How We Prevent This (Forever)

### Governance Policies Created

#### 1. TEST_REMOVAL_GOVERNANCE_GATE.md

**Location**: `governance/policy/TEST_REMOVAL_GOVERNANCE_GATE.md`

**Purpose**: Mandatory governance gate for all test removal

**Key Requirements**:
- Traceability analysis required for every test
- Burden of proof on remover (must prove test lacks architectural basis)
- Approval thresholds:
  - 1-5 tests: FM approval
  - 6-10 tests: FM + Governance Administrator review  
  - 11+ tests: CS2 approval
- Documentation in TEST_REMOVAL_LOG.md
- Impact analysis required (what coverage is lost?)

**Prohibited Justifications**:
- ❌ "Tests are speculative" (without traceability proof)
- ❌ "Features not implemented" (tests drive implementation)
- ❌ "Class names not in architecture" (wrong abstraction level)
- ❌ "Tests are noisy" (not valid reason)
- ❌ "Too many RED tests" (implement features, don't remove tests)

#### 2. ARCHITECTURE_TEST_TRACEABILITY_METHODOLOGY.md

**Location**: `governance/policy/ARCHITECTURE_TEST_TRACEABILITY_METHODOLOGY.md`

**Purpose**: Define CORRECT vs INCORRECT traceability methodology

**Key Principles**:
- Map tests to requirements, not implementation details
- Understand abstraction levels: Architecture (WHAT) → Tests (THAT) → Implementation (HOW)
- Recognize implied requirements and component-functional necessities
- Use decision tree for edge cases
- Review methodology correctness, not just conclusions

**Training Examples**: Policy includes worked examples showing correct vs incorrect analysis

### Agent Contract Updates (Layer-Down Required)

**Target Repository**: office-app (MaturionISMS/maturion-foreman-office-app)

**Files to Update**:
- `.github/agents/ForemanApp-agent.md`
- `.github/agents/ui-builder.md`
- `.github/agents/api-builder.md`
- `.github/agents/schema-builder.md`
- `.github/agents/integration-builder.md`
- `.github/agents/qa-builder.md`

**Required Section**:
```markdown
## Test Removal Authorization (MANDATORY)

Agents SHALL NOT remove tests without:
1. Traceability analysis proving test doesn't map to architecture
2. CS2 approval if removing >10 tests
3. Documentation in TEST_REMOVAL_LOG.md

Violation = Test Dodging = Work Stoppage

**Required Reading**:
- governance/policy/TEST_REMOVAL_GOVERNANCE_GATE.md
- governance/policy/ARCHITECTURE_TEST_TRACEABILITY_METHODOLOGY.md
```

### Bootstrap Learning Recorded

**Canonical Entry**: `governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md` → BL-021

**Standalone Document**: This document (`docs/bootstrap-learning/LESSON_60_TESTS_INCORRECT_REMOVAL.md`)

---

## Forward-Binding Expectations

### Non-Negotiable Rules (Permanent)

1. **All test removal requires traceability analysis** using correct methodology
2. **High-volume test removal (>10 tests) requires CS2 approval**
3. **Burden of proof is on remover**, not reviewer
4. **Tests drive implementation** - unimplemented features are valid test targets
5. **Architecture specifies requirements** - not implementation details
6. **Implied requirements are real requirements**

### Violation Response

If tests are removed without following this process:

1. **Immediate Work Stoppage**: All related work halts
2. **Immediate Restoration**: Tests restored via revert or re-creation
3. **Incident Report**: Formal RCA with root cause analysis
4. **Agent Contract Review**: Check if agent needs clarification
5. **Bootstrap Learning**: Capture if systemic gap revealed

### Repeat Violation Classification

- **First occurrence** (this incident): CATASTROPHIC - governance gap
- **Second occurrence**: EMERGENCY - indicates:
  - Agent training failure
  - Agent contract ambiguity
  - Governance communication failure
  - Deliberate bypass (most severe)

---

## Key Lessons for Future

### For Test Removal Decisions

✅ **DO**:
- Map test behavior to architectural requirement
- Follow correct traceability methodology
- Document analysis with evidence
- Get appropriate approval level
- Record removal decision in TEST_REMOVAL_LOG.md

❌ **DON'T**:
- Search for class names in architecture
- Assume unimplemented = ungrounded
- Bypass governance gate
- Use "noisy" or "slowing development" as justification
- Remove tests just because they're RED

### For Traceability Analysis

✅ **DO**:
- Start with: "What behavior does this test validate?"
- Map behavior to requirement
- Consider implied requirements
- Consider component-functional necessities
- Use decision tree for edge cases

❌ **DON'T**:
- Look for implementation details in architecture
- Expect architecture to specify HOW (only WHAT)
- Miss implication chains
- Confuse abstraction levels

### For Architecture Understanding

✅ **DO**:
- Architecture specifies WHAT system must do
- Requirements may be explicit or implied
- Quality attributes are universally required
- Component existence implies functional requirements

❌ **DON'T**:
- Expect architecture to specify class names
- Expect architecture to specify implementation details
- Miss implied requirements
- Treat absence of explicit statement as absence of requirement

---

## Training Materials

### Required Reading

1. **TEST_REMOVAL_GOVERNANCE_GATE.md** - Complete policy
2. **ARCHITECTURE_TEST_TRACEABILITY_METHODOLOGY.md** - Methodology with examples
3. **This document** - Lesson learned and prevention measures

### Decision Tree Reference

See `ARCHITECTURE_TEST_TRACEABILITY_METHODOLOGY.md` Section 7 for complete decision tree covering:
- Explicit requirements
- Implied requirements
- Component-functional requirements
- Quality attributes
- Edge cases requiring CS2 review

### Common Scenarios

See `ARCHITECTURE_TEST_TRACEABILITY_METHODOLOGY.md` Section 8 for worked examples:
- Evidence tests traceability
- Governance enforcement tests traceability
- Liveness/heartbeat tests traceability
- Decision determinism tests traceability

---

## Cross-References

### Canonical Governance Policies

- **TEST_REMOVAL_GOVERNANCE_GATE.md** - Test removal policy (governance/policy/)
- **ARCHITECTURE_TEST_TRACEABILITY_METHODOLOGY.md** - Traceability methodology (governance/policy/)
- **QA_POLICY_MASTER.md** - Overall QA doctrine (governance/policy/)
- **BOOTSTRAP_EXECUTION_LEARNINGS.md** - BL-021 canonical entry (governance/canon/)

### Incident Documentation

- **INCIDENT-2026-01-08-INCORRECT-TEST-REMOVAL** - Full incident report
- **PR #477** - RCA and analysis
- **PR #470** - Original test removal proposal (if applicable)

### Layer-Down Targets

- **office-app agent contracts** - Need updates per Section "Agent Contract Updates" above
- **TEST_REMOVAL_LOG.md** - Should be created in office-app if doesn't exist

---

## Status

**Recorded**: 2026-01-08  
**Status**: Complete and Canonized  
**Applies To**: All repositories with architectural QA requirements  
**Platform-Wide**: Yes  
**Non-Retroactive**: Yes  
**Authority**: CS2 (Johan Ras)

**Governance Policies**: Established and canonical  
**Layer-Down**: Required to office-app repo (agent contracts)  
**Training**: Required before test removal authorization  
**Enforcement**: Active - violations trigger immediate work stoppage

---

## Acceptance Criteria

This lesson is considered fully implemented when:

- ✅ TEST_REMOVAL_GOVERNANCE_GATE.md policy exists and is canonical
- ✅ ARCHITECTURE_TEST_TRACEABILITY_METHODOLOGY.md policy exists and is canonical
- ✅ BL-021 recorded in BOOTSTRAP_EXECUTION_LEARNINGS.md
- ✅ This standalone lesson document created
- [ ] All agent contracts in office-app updated with test removal requirements
- [ ] TEST_REMOVAL_LOG.md created in office-app (if doesn't exist)
- [ ] All agents trained on traceability methodology
- [ ] No test removal proposals using incorrect methodology approved

---

**This lesson represents a permanent, forward-binding governance ratchet. The system has learned and will not repeat this failure.**

---

**END OF LESSON**
