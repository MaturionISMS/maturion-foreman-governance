# ARCHITECTURE TEST TRACEABILITY METHODOLOGY

## Status
Canonical Governance Policy  
Version: v1.0  
Authority: Corporate Governance Canon  
Effective Date: 2026-01-08  
Triggered By: INCIDENT-2026-01-08-INCORRECT-TEST-REMOVAL  
Owner: Johan Ras (CS2)

---

## 1. Purpose

This policy defines the **CORRECT vs INCORRECT methodology** for tracing tests to architectural requirements.

The methodology prevents common errors where:
- Tests are incorrectly deemed "ungrounded" due to wrong analysis approach
- Architecture is incorrectly deemed "unspecified" due to abstraction level confusion
- Valid tests are removed based on flawed traceability analysis

This policy is **normative and mandatory** for all test-to-architecture traceability work.

---

## 2. Constitutional Authority

This policy derives authority from:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Governance as canonical source of truth
- **QA_POLICY_MASTER.md** - QA coverage and verification requirements
- **REQUIREMENT_SPECIFICATION_GOVERNANCE.md** - Requirements specification standards
- **TEST_REMOVAL_GOVERNANCE_GATE.md** - Test removal requirements

---

## 3. The Abstraction Level Problem

### 3.1 Three Distinct Levels

**Architecture Level**: Specifies WHAT system must do
- Requirements
- Behaviors
- Components
- Capabilities
- Constraints

**Test Level**: Validates THAT requirements are met
- Expected behaviors
- Acceptance criteria
- Validation rules
- Test cases

**Implementation Level**: Specifies HOW requirements are achieved
- Class names
- Method signatures
- Function implementations
- Data structures
- Algorithms

### 3.2 Common Error

**INCORRECT ASSUMPTION**: Architecture should specify implementation details.

**TRUTH**: Architecture specifies requirements at abstraction level above implementation.

**CONSEQUENCE**: Looking for implementation details in architecture yields false negatives.

---

## 4. CORRECT Methodology

### 4.1 Traceability Chain

```
Test Name
  ↓
What behavior does this test validate?
  ↓
Which architectural requirement specifies this behavior?
  ↓
In which architecture document and section?
  ↓
Status: VALID (requirement exists) or INVALID (requirement missing)
```

### 4.2 Example (CORRECT)

```markdown
Test: test_evidence_generated_at_build_start

Step 1: What behavior?
Answer: Evidence is generated when build starts

Step 2: Which requirement?
Answer: "Evidence generated at all key events"
        (FM_ARCHITECTURE_SPEC.md Section 7.3)

Step 3: Document location?
Answer: FM_ARCHITECTURE_SPEC.md, Section 7.3 "Evidence Generation"

Step 4: Status?
Answer: ✅ VALID - Test validates specified requirement
```

### 4.3 Key Principles

**Principle 1: Map to Requirements, Not Implementations**
- Architecture says: "Evidence at key events" ✅
- Architecture does NOT say: "EvidenceGenerator.generate() at key events" ❌

**Principle 2: Tests Validate Behaviors**
- Test validates: Evidence IS generated (behavior) ✅
- Test does NOT require: Specific class/method exists (implementation) ❌

**Principle 3: Implied Requirements Are Still Requirements**
- Explicit: "Evidence must be auditable"
- Implied: Evidence must have structure, validation, schema
- Tests validating schema ARE valid (they test implied requirement)

---

## 5. INCORRECT Methodology

### 5.1 Wrong Approach

```
Test Name
  ↓
Look for specific class name mentioned in test
  ↓
Search architecture for that class name
  ↓
Not found?
  ↓
Conclude: "Test has no architectural basis" ❌ WRONG
```

### 5.2 Example (INCORRECT)

```markdown
Test: test_evidence_generated_at_build_start

Step 1: What class does test reference?
Answer: EvidenceGenerator

Step 2: Search architecture for "EvidenceGenerator"
Answer: Not found

Step 3: Conclusion?
Answer: "Test lacks architectural basis" ❌ WRONG

Error: Architecture doesn't specify implementation details like class names.
       It specifies REQUIREMENTS ("evidence at key events").
       Test validates the REQUIREMENT, not a specific implementation.
```

### 5.3 Why This Fails

**Fundamental Misunderstanding**: Confuses specification levels.

- Architecture works at requirement level
- Implementation works at class/method level
- Tests bridge both by validating requirements through implementation

**Result**: Valid tests incorrectly classified as ungrounded.

---

## 6. Requirement Types and Traceability

### 6.1 Explicit Requirements

**Definition**: Requirements stated directly in architecture.

**Example**:
```
Architecture: "Evidence must be immutable"
Test: test_evidence_immutability
Traceability: ✅ Direct - explicitly stated
```

### 6.2 Implied Requirements

**Definition**: Requirements logically necessary for explicit requirements.

**Example**:
```
Architecture: "Evidence must be auditable"
Implies: Evidence must have structure (can't audit unstructured data)
Implies: Evidence must be validated (audit requires correctness)
Implies: Evidence must have schema (validation requires schema)
Test: test_evidence_schema_validation
Traceability: ✅ Implied - logically necessary
```

**Guideline**: If requirement A necessitates requirement B, then B is implicitly required.

### 6.3 Component-Implied Requirements

**Definition**: Requirements necessary for specified component to function.

**Example**:
```
Architecture: "ESC-03: Silence Detector - Detects no update within threshold"
Implies: System must generate heartbeat/updates (can't detect silence without signal)
Implies: System must track last update time (detection requires timing)
Test: test_heartbeat_generation
Traceability: ✅ Component-implied - necessary for component function
```

---

## 7. Decision Tree for Traceability

```
┌─ Test validates behavior X
│
├─ Does architecture specify X explicitly?
│  ├─ YES → ✅ Test is VALID
│  └─ NO → Continue...
│
├─ Does architecture specify requirement that IMPLIES X?
│  ├─ YES → ✅ Test is VALID (document implication chain)
│  └─ NO → Continue...
│
├─ Does architecture specify component that REQUIRES X to function?
│  ├─ YES → ✅ Test is VALID (document functional necessity)
│  └─ NO → Continue...
│
├─ Is X a general quality attribute (security, performance, reliability)?
│  ├─ YES → ✅ Test is VALID (quality attributes are universally required)
│  └─ NO → ❌ Test may lack architectural basis
│           → Requires CS2+ review before removal
│           → May indicate architecture gap requiring update
```

---

## 8. Common Scenarios

### 8.1 Scenario: Evidence Tests

**Architecture Says**: "Evidence at key events, immutable, auditable"

**Tests Validate**:
- Evidence generation ✅ Explicitly required
- Evidence immutability ✅ Explicitly required
- Evidence timestamps ✅ Required for "auditable"
- Evidence schema validation ✅ Required for "auditable" (structure implies validation)
- Evidence structure correctness ✅ Required for "auditable"

**Traceability**: All valid - explicit or implied by "auditable"

---

### 8.2 Scenario: Governance Enforcement Tests

**Architecture Says**: "GOV-03: Governance Supremacy Enforcer"

**Component Purpose**: Enforce governance rules without exception

**Tests Validate**:
- Architecture freeze enforcement ✅ Enforcement type
- QA bypass prevention ✅ Enforcement type
- 100% pass requirement ✅ Governance rule
- Test debt blocking ✅ Governance rule
- Policy violation detection ✅ Enforcement mechanism

**Traceability**: All valid - specific enforcement mechanisms implied by component purpose and governance requirements

---

### 8.3 Scenario: Liveness/Heartbeat Tests

**Architecture Says**: "ESC-03: Silence Detector - Detects no update within threshold"

**Component Function**: Detect when system stops producing updates

**Tests Validate**:
- Heartbeat generation ✅ Prerequisite for silence detection
- Update tracking ✅ Required to detect threshold breach
- Stall detection ✅ Core silence detection behavior
- Threshold configuration ✅ "within threshold" requires configuration
- Recovery workflow ✅ Escalation response to detection

**Traceability**: All valid - silence detection REQUIRES heartbeat infrastructure

---

### 8.4 Scenario: Decision Determinism Tests

**Architecture Says**: "Deterministic flows" + "Audit trail"

**Tests Validate**:
- Same input produces same output ✅ Definition of "deterministic"
- Decision logging ✅ Required for "audit trail"
- Decision replay capability ✅ Audit requires replay
- Decision state tracking ✅ Required for determinism verification

**Traceability**: All valid - determinism and auditability require these capabilities

---

## 9. Training Examples

### Exercise 1: Evidence Schema Validation

**Test**: `test_evidence_schema_validation`

**Student Attempts**:

1. ❌ **WRONG**: "Architecture doesn't mention 'EvidenceSchemaValidator' → Not specified"
   - **Error**: Looking for implementation class name, not requirement

2. ❌ **WRONG**: "Architecture doesn't explicitly say 'schema validation' → Not specified"
   - **Error**: Missing implication chain

3. ✅ **CORRECT**: "Architecture says 'auditable evidence' → Requires structure → Requires validation → Schema validation implied → Test VALID"
   - **Reasoning**: Auditable evidence logically requires validated structure

**Correct Answer**: #3

---

### Exercise 2: Decision Determinism

**Test**: `test_same_input_produces_same_output`

**Student Attempts**:

1. ❌ **WRONG**: "No 'DecisionTracker' class mentioned → Not specified"
   - **Error**: Looking for implementation detail

2. ✅ **CORRECT**: "Architecture requires 'deterministic flows' + 'audit trail' → Determinism required → Test VALID"
   - **Reasoning**: Direct requirement mapping

3. ❌ **WRONG**: "Sounds like nice-to-have feature → Not specified"
   - **Error**: Misreading architecture; determinism is explicit requirement

**Correct Answer**: #2

---

### Exercise 3: Heartbeat Infrastructure

**Test**: `test_heartbeat_sent_every_N_seconds`

**Student Attempts**:

1. ❌ **WRONG**: "Architecture specifies silence detection, not heartbeat generation → Not specified"
   - **Error**: Missing functional prerequisite

2. ✅ **CORRECT**: "Silence detection REQUIRES heartbeat/update signal → Heartbeat implied → Test VALID"
   - **Reasoning**: Can't detect absence without presence mechanism

3. ❌ **WRONG**: "Heartbeat is implementation detail → Not specified"
   - **Error**: Confusing mechanism with requirement; heartbeat is functional requirement

**Correct Answer**: #2

---

## 10. Anti-Patterns to Avoid

### 10.1 Class Name Matching

**Anti-Pattern**: Search architecture for class names from tests

**Why Wrong**: Architecture doesn't specify implementations

**Correct Approach**: Map test behavior to architectural requirement

---

### 10.2 Literal String Matching

**Anti-Pattern**: Search for exact test name or test description text in architecture

**Why Wrong**: Architecture uses different vocabulary (requirements language vs test language)

**Correct Approach**: Understand what test validates, then find that requirement (potentially using different words)

---

### 10.3 Absence = Not Required

**Anti-Pattern**: If requirement not explicit, assume not required

**Why Wrong**: Ignores implied and component-functional requirements

**Correct Approach**: Follow decision tree including implications and functional necessities

---

### 10.4 Implementation-First Thinking

**Anti-Pattern**: Expect architecture to look like code documentation

**Why Wrong**: Mixes abstraction levels

**Correct Approach**: Architecture specifies what, tests validate what, implementation provides how

---

## 11. Enforcement

### 11.1 When to Apply This Methodology

**MANDATORY** for:
- All test removal proposals
- All test traceability analysis
- All architecture coverage assessments
- All QA gap analyses

**RECOMMENDED** for:
- Test planning and design
- Architecture validation
- Coverage verification

### 11.2 Review Criteria

When reviewing traceability analysis, **ACCEPT**:
- ✅ Requirement-based mapping
- ✅ Implication chains with clear reasoning
- ✅ Component-functional necessity arguments
- ✅ Correct abstraction level understanding

When reviewing traceability analysis, **REJECT**:
- ❌ Class name matching
- ❌ Literal string searching
- ❌ Implementation-focused analysis
- ❌ Missing implication chains

### 11.3 Training Requirements

**All agents must be trained** on this methodology before authorization to:
- Propose test removal
- Review test removal proposals
- Conduct traceability analysis
- Assess architecture coverage

---

## 12. Relationship to Other Policies

### 12.1 TEST_REMOVAL_GOVERNANCE_GATE.md

This methodology defines **HOW** to perform traceability analysis required by Test Removal Governance Gate.

Test removal proposals using incorrect methodology will be **REJECTED**.

### 12.2 QA_POLICY_MASTER.md

This methodology supports QA coverage assessment and verification requirements.

### 12.3 REQUIREMENT_SPECIFICATION_GOVERNANCE.md

This methodology clarifies expected abstraction level in requirements specifications.

---

## 13. Bootstrap Learning

### Reference Incident

**INCIDENT-2026-01-08-INCORRECT-TEST-REMOVAL**

**Lesson**: 60 Wave 0 tests were incorrectly analyzed using class name matching methodology, leading to false conclusion that tests lacked architectural basis.

**Root Cause**: No documented standard for test-to-architecture traceability methodology.

**Impact**: Valid tests nearly removed, architecture incorrectly deemed incomplete.

**Prevention**: This policy establishes correct methodology preventing recurrence.

---

## 14. Examples Repository

### 14.1 Correct Traceability Examples

Location: `governance/examples/traceability/correct/`

Contains:
- Well-formed traceability analyses
- Proper implication chains
- Correct abstraction level mapping
- Reference examples for training

### 14.2 Incorrect Traceability Examples

Location: `governance/examples/traceability/incorrect/`

Contains:
- Anti-patterns with explanations
- Common errors with corrections
- Learning examples from incidents
- "What went wrong" analyses

**Note**: These directories should be created and populated as examples accumulate.

---

## 15. Review and Updates

**Policy Owner**: Johan Ras (CS2)  
**Review Cycle**: Annual  
**Next Review**: 2027-01-08  
**Update Authority**: CS2 or Governance Administrator with CS2 approval

Updates required when:
- New abstraction levels identified
- New requirement types discovered
- Methodology gaps found
- Training feedback indicates confusion

---

## 16. Acceptance Criteria

This policy is considered implemented when:

- ✅ All agents trained on methodology
- ✅ Test removal proposals use correct methodology
- ✅ Review feedback references this policy
- ✅ No test removal approved using incorrect methodology
- ✅ Training examples repository established (or planned)
- ✅ Policy included in canonical governance manifest

---

**END OF POLICY**
