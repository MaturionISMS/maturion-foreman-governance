# QA CATALOG ALIGNMENT GATE CANON

## Status
**Type**: Canonical Gate Definition  
**Authority**: Supreme - Applies to ALL repositories with wave-based delivery  
**Version**: 1.0  
**Date**: 2026-01-05  
**Owner**: Maturion Engineering Leadership (Johan)  
**Derived From**: BL-018, BL-019 (FM App Wave 2)

---

## Purpose

This document defines the **QA-Catalog-Alignment Gate** that acts as a **mandatory pre-authorization checkpoint** for all wave and subwave planning in systems using QA-driven development.

This gate ensures that assigned QA ranges:
- Exist in the canonical QA Catalog
- Semantically match the intended feature scope
- Have QA-to-Red tests created and validated
- Are not conflicting with other allocations

**Failure to pass this gate blocks wave/subwave authorization absolutely.**

---

## Core Principles

### 1. Architecture-First Flow

The gate enforces the canonical flow:

```
Architecture → QA Catalog → QA-to-Red → Wave Planning → Authorization
```

No step may be skipped. No assumptions may be made.

### 2. Semantic Validation

The gate validates **semantic alignment**, not just QA ID existence:
- QA component descriptions must match feature intent
- QA categories must align with implementation type
- Misalignment is a blocking failure

### 3. Forward-Scan Integration

The gate is designed to be applied:
- To new wave/subwave plans (proactive)
- To existing pending plans after BL creation (retroactive forward-scan)
- Continuously during planning phases

### 4. Automation-First

Where possible, validation should be automated:
- Validation scripts with exit code semantics
- Machine-readable results (JSON)
- CI/CD integration for continuous enforcement

---

## Gate Inputs

### Input 1: Wave/Subwave Specification

**Source**: Wave planning documents (e.g., `SUBWAVE_X.Y_*.md`)

**Required Elements**:
- Assigned QA range (start ID, end ID)
- Feature descriptions
- Component names
- Builder role assignment

**Format**: Structured markdown or JSON

### Input 2: QA Catalog

**Source**: Canonical QA Catalog (e.g., `QA_CATALOG.md`)

**Required Elements**:
- QA component ID
- QA component description
- QA category (component/flow/state/failure)
- Architectural element reference
- Status (defined/undefined)

**Format**: Structured markdown or machine-readable catalog

### Input 3: QA-to-Red Test Status

**Source**: Test suite execution results

**Required Elements**:
- Test file locations
- Test execution status (RED/GREEN/MISSING)
- QA component coverage

**Format**: Test runner output or structured results

---

## Gate Validations

The QA-Catalog-Alignment Gate performs the following validations in order:

### Validation 1: QA Range Existence Check

**Purpose**: Verify all assigned QA IDs exist in QA Catalog

**Process**:
1. Extract assigned QA range from wave/subwave spec (e.g., QA-341 to QA-350)
2. For each QA ID in range:
   - Look up QA ID in QA Catalog
   - Verify entry exists
   - Verify entry is not marked as undefined/placeholder
3. Collect all missing or undefined QA IDs

**Pass Criteria**:
- ✅ All QA IDs in assigned range exist in QA Catalog
- ✅ No QA IDs are undefined or placeholder entries

**Fail Criteria**:
- ❌ Any QA ID in range is missing from QA Catalog
- ❌ Any QA ID in range is marked undefined/placeholder

**Evidence Required**:
- QA Catalog lookup results for each QA ID
- List of missing/undefined QA IDs (if any)

---

### Validation 2: Semantic Alignment Check

**Purpose**: Verify QA component descriptions match wave/subwave feature intent

**Process**:
1. Extract feature descriptions from wave/subwave spec
2. Extract QA component descriptions from QA Catalog for assigned range
3. Perform semantic comparison:
   - Do QA descriptions describe the claimed features?
   - Are QA categories appropriate for feature type?
   - Are there obvious semantic disconnects? (e.g., "parking features" vs "network failure modes")
4. Classify each QA ID as ALIGNED, MISALIGNED, or PARTIAL

**Pass Criteria**:
- ✅ All QA IDs semantically match feature intent
- ✅ QA categories match implementation type
- ✅ No obvious semantic disconnects

**Fail Criteria**:
- ❌ Any QA ID describes different features than claimed
- ❌ QA categories don't match implementation type (e.g., UI features vs failure modes)
- ❌ Semantic disconnect detected

**Evidence Required**:
- Feature descriptions (wave/subwave)
- QA component descriptions (catalog)
- Semantic alignment verdict for each QA ID
- List of misaligned QA IDs (if any)

**Examples of Semantic Misalignment**:

| Wave/Subwave Claim | QA Catalog Actual | Verdict |
|--------------------|-------------------|---------|
| "Parking Station Advanced" | "Network Failure Modes" | ❌ MISALIGNED |
| "System Optimizations" | "Analytics Failure Modes" | ❌ MISALIGNED |
| "Enhanced Dashboard" | "Database Failure Modes" | ❌ MISALIGNED |
| "Deep Integration" | "Message State Transitions" | ⚠️ PARTIAL (may be valid) |

---

### Validation 3: QA ID Collision Check

**Purpose**: Verify assigned QA ranges are not already allocated to other features

**Process**:
1. Extract assigned QA range from wave/subwave spec
2. Check if any QA IDs in range are referenced by other waves/subwaves
3. Check if any QA IDs in range are allocated to different features in architecture
4. Collect all collisions

**Pass Criteria**:
- ✅ No QA IDs in range are allocated to other features
- ✅ No conflicts with other wave/subwave plans

**Fail Criteria**:
- ❌ Any QA ID in range is already allocated elsewhere
- ❌ Conflict with other wave/subwave detected

**Evidence Required**:
- QA range allocation map (which features use which ranges)
- List of collisions (if any)

---

### Validation 4: Architecture Alignment Check

**Purpose**: Verify architecture sections exist for all claimed features

**Process**:
1. Extract feature names from wave/subwave spec
2. Check if architecture document contains sections for each feature
3. Verify architecture is frozen (not in draft state)
4. Verify architectural element references in QA Catalog match actual architecture

**Pass Criteria**:
- ✅ Architecture sections exist for all features
- ✅ Architecture is frozen
- ✅ QA Catalog references match architecture

**Fail Criteria**:
- ❌ Any feature missing from architecture
- ❌ Architecture not frozen
- ❌ QA Catalog references don't match architecture

**Evidence Required**:
- Architecture document references
- Feature-to-architecture mapping
- Architecture freeze status

---

### Validation 5: QA-to-Red Precondition Check

**Purpose**: Verify QA-to-Red tests exist and are RED for all assigned QA components

**Process**:
1. Extract assigned QA range from wave/subwave spec
2. For each QA ID in range:
   - Check if QA-to-Red test exists
   - Check test execution status
   - Verify test is RED (failing because implementation missing)
3. Collect all missing or non-RED tests

**Pass Criteria**:
- ✅ QA-to-Red tests exist for all QA IDs in range
- ✅ All tests are RED (failing)
- ✅ Tests fail with expected failure (NotImplementedError, missing implementation)

**Fail Criteria**:
- ❌ Any QA-to-Red test is missing
- ❌ Any test is GREEN (passing - indicates implementation already exists)
- ❌ Any test is not properly RED (wrong failure reason)

**Evidence Required**:
- Test file locations
- Test execution results
- Test failure reasons
- List of missing/non-RED tests (if any)

---

## Gate Outputs

### Output 1: Gate Verdict

**Format**: PASS / FAIL

**PASS Conditions**:
- All 5 validations passed
- No blocking issues detected
- Evidence complete

**FAIL Conditions**:
- Any validation failed
- Blocking issues detected
- Evidence incomplete

### Output 2: Validation Report

**Format**: Structured document (markdown or JSON)

**Required Sections**:
- Gate execution timestamp
- Wave/subwave identifier
- Validation results (per validation)
- Blocking issues (if FAIL)
- Evidence references
- Recommended actions (if FAIL)

**Example Report Structure**:

```markdown
# QA-Catalog-Alignment Gate Report

**Wave/Subwave**: Subwave 2.3 (System Optimizations Phase 1)
**QA Range**: QA-341 to QA-350
**Date**: 2026-01-05
**Verdict**: ❌ FAIL

## Validation Results

### Validation 1: QA Range Existence
✅ PASS - All QA IDs exist in catalog

### Validation 2: Semantic Alignment
❌ FAIL - Semantic misalignment detected

**Issues**:
- QA-341 to QA-345: Claimed "System Optimizations" but catalog shows "Analytics Failure Modes"
- QA-346 to QA-350: Claimed "Caching & Optimization" but catalog shows "Memory/Storage/Logging Failure Modes"

### Validation 3: QA ID Collision
✅ PASS - No collisions detected

### Validation 4: Architecture Alignment
✅ PASS - Architecture sections exist

### Validation 5: QA-to-Red Precondition
❌ FAIL - QA-to-Red tests do not exist for this range

**Issues**:
- No test file found for QA-341 to QA-350

## Recommended Actions

1. Extend QA Catalog with new QA components for "System Optimizations" (e.g., QA-426 to QA-435)
2. Create QA-to-Red test file: `test_system_optimizations_phase1.py`
3. Regenerate subwave specification with corrected QA range
4. Re-run gate validation
```

### Output 3: Evidence Bundle

**Format**: Collection of validation artifacts

**Required Artifacts**:
- QA Catalog snapshot (or reference)
- Wave/subwave specification (or reference)
- Test execution results (or reference)
- Architecture references
- Validation results (per validation)

---

## Gate Failure Behavior

When the QA-Catalog-Alignment Gate detects a failure:

### Immediate Actions

1. **Authorization Blocked**
   - Wave/subwave authorization prevented immediately
   - Builder appointment cannot proceed
   - Issue creation blocked (if automated)

2. **Failure Report Generated**
   - Detailed report with all validation results
   - Blocking issues highlighted
   - Recommended corrective actions included

3. **Notification Sent**
   - FM notified of gate failure
   - Planning authority notified
   - Governance administrator notified (if configured)

### Required Corrective Actions

Before re-attempting authorization, ALL blocking issues must be resolved:

1. **For QA Range Existence Failures**:
   - Extend QA Catalog with missing QA components
   - Define all QA component descriptions
   - Update catalog status to "defined"

2. **For Semantic Alignment Failures**:
   - Extend QA Catalog with new QA components matching feature intent
   - Assign new QA range to wave/subwave
   - Update wave/subwave specification

3. **For QA ID Collision Failures**:
   - Resolve collision (reassign conflicting allocations)
   - Or assign new non-conflicting QA range

4. **For Architecture Alignment Failures**:
   - Extend architecture with missing feature sections
   - Freeze architecture
   - Update QA Catalog references

5. **For QA-to-Red Precondition Failures**:
   - Create QA-to-Red tests for all assigned QA components
   - Verify tests are RED
   - Document test locations

### Re-Validation

After corrective actions:
1. Re-run gate validation
2. Verify all validations pass
3. Generate new gate report
4. If PASS → Authorization may proceed
5. If FAIL → Repeat corrective actions

---

## Automation and Tooling

### Validation Script Pattern

Application repositories SHOULD provide validation scripts implementing this gate.

**Script Requirements**:
- Implement all 5 validations
- Exit code semantics: 0 = PASS, 1 = FAIL, 2 = ERROR
- Structured output (JSON recommended)
- Machine-readable results
- Human-readable summary

**Example Script Invocation**:

```bash
python3 validate-qa-alignment.py --wave 2 --subwave 2.3
echo $?  # 0 = PASS, 1 = FAIL
```

**Example Output** (JSON):

```json
{
  "wave": "2",
  "subwave": "2.3",
  "qa_range": "QA-341 to QA-350",
  "verdict": "FAIL",
  "validations": {
    "existence": "PASS",
    "semantic": "FAIL",
    "collision": "PASS",
    "architecture": "PASS",
    "qa_to_red": "FAIL"
  },
  "blocking_issues": [
    "Semantic misalignment: QA-341 to QA-350 allocated to failure modes, not optimizations",
    "QA-to-Red tests missing for QA-341 to QA-350"
  ]
}
```

### CI/CD Integration

Validation scripts SHOULD be integrated into CI/CD pipelines:

**Pre-Authorization Workflow**:

```yaml
name: QA Catalog Alignment Gate

on:
  workflow_dispatch:
    inputs:
      wave:
        required: true
      subwave:
        required: true

jobs:
  validate-qa-alignment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run QA Alignment Validation
        run: |
          python3 validate-qa-alignment.py --wave ${{ inputs.wave }} --subwave ${{ inputs.subwave }}
      - name: Block on Failure
        if: failure()
        run: |
          echo "QA Catalog Alignment Gate FAILED"
          echo "Authorization BLOCKED"
          exit 1
```

---

## Repository Integration

### For Application Repositories

**Implementation Requirements**:
- Reference this document as canonical gate definition
- Implement validation logic per Section "Gate Validations"
- Provide validation scripts (recommended)
- Integrate with CI/CD (recommended)
- Document gate in repository governance alignment

**Validation Script Location**:
- Recommended: `scripts/validate-qa-alignment.py` or similar
- Must be executable and self-documented

**Configuration**:
- Catalog location (e.g., `QA_CATALOG.md`)
- Wave/subwave specification directory
- Test directory structure

### For Governance Repository

**Canonical Authority**:
- This document is the canonical definition
- Application repositories implement but do not redefine
- Consistency across ecosystem required

---

## Cross-Repository Traceability

### BL-018/BL-019 → This Gate

This gate exists because of validated bootstrap learnings:

**BL-018** (FM App, Wave 2.2):
- **Failure**: QA-376 to QA-385 claimed for parking station but allocated to network/resource failure modes
- **Root Cause**: Wave planning without QA Catalog validation
- **Learning**: Architecture → QA Catalog → QA-to-Red → Planning flow must be enforced
- **Gate Impact**: Validations 1, 2, 5 directly prevent BL-018 recurrence

**BL-019** (FM App, Wave 2.3+):
- **Failure**: Multiple subwaves (9 of 14) had same pattern after BL-018
- **Root Cause**: FM failed to forward-scan remaining Wave 2 after BL-018 discovery
- **Learning**: BL forward-scan is mandatory
- **Gate Impact**: Gate applied retroactively to all pending subwaves prevented third occurrence

### This Gate → Application Implementation

**FM App** (`maturion-foreman-office-app`):
- Implemented: `validate-wave2-qa-alignment.py`
- Tested: Successfully blocked Subwave 2.3 invalid appointment
- Evidence: `wave2-qa-alignment-validation-results.json`
- Outcome: Wave 2 forward-scan complete, all 9 misaligned subwaves identified

**Future Applications**:
- Must implement equivalent validation
- May use different tooling but must satisfy same gate definition
- Consistency across ecosystem required

---

## Enforcement Model

### Pre-Authorization Enforcement

**Mandatory Requirement**:
- This gate MUST be passed before ANY wave/subwave authorization
- No exceptions
- No manual overrides without governance escalation

**Enforcement Points**:
- FM planning process (manual check)
- Builder appointment (validation before issuing)
- CI/CD workflow (automated validation)
- Governance review (audit checkpoint)

### Post-BL Enforcement (Forward-Scan)

**Mandatory Requirement**:
- When ANY BL affecting wave planning is recorded
- This gate MUST be applied retroactively to ALL pending waves/subwaves
- All failures MUST be corrected before ANY authorization proceeds

**Enforcement Points**:
- BL recording process (trigger forward-scan)
- FM forward-scan obligation
- Governance audit (verify forward-scan complete)

---

## Failure Severity Classification

### Catastrophic Failures (First-Time)

**First-time QA misalignment** (BL-018 class):
- Severity: CATASTROPHIC
- Response: Create BL, perform forward-scan, implement gate
- Classification: Design gap (expected learning opportunity)

### Emergency Failures (Second-Time - TARP Activation)

**Second-time QA misalignment** (BL-019 class):
- Severity: EMERGENCY
- Response: **TARP (Trigger Action Response Plan) activation**:
  - Immediate STOP all related execution
  - Emergency assessment: Why did prevention fail?
  - Rapid corrective actions (forward-scan, structural fixes, automation)
  - Evidence of system-level change required
  - TARP completion before ANY resumption
  - Document as EMERGENCY with TARP report
- Classification: Governance enforcement failure

### Prohibited Failures (Third-Time)

**Third-time QA misalignment**:
- Severity: CONSTITUTIONALLY PROHIBITED
- Response: Must be prevented by gate automation
- Classification: System failure requiring authority review

---

## Audit and Compliance

### Audit Requirements

Every gate execution MUST be auditable:

**Audit Trail Elements**:
- Gate execution timestamp
- Wave/subwave identifier
- Input artifacts (references or snapshots)
- Validation results (all 5 validations)
- Gate verdict (PASS/FAIL)
- Evidence bundle (complete)
- Corrective actions (if FAIL)
- Re-validation results (if applicable)

**Audit Log Storage**:
- Recommended: `governance/evidence/qa-alignment-gates/`
- Format: Structured files (JSON or markdown)
- Retention: Permanent (part of wave evidence)

### Compliance Verification

**To verify gate compliance**:

```bash
# Check if gate was executed
ls governance/evidence/qa-alignment-gates/wave-2-subwave-2.3-*.json

# Verify gate verdict
cat governance/evidence/qa-alignment-gates/wave-2-subwave-2.3-*.json | jq '.verdict'
# Expected: "PASS"

# If FAIL, verify corrective actions taken
cat governance/evidence/qa-alignment-gates/wave-2-subwave-2.3-revalidation-*.json | jq '.verdict'
# Expected: "PASS" after corrections
```

---

## Related Documents

**Governance Canon**:
- `ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md` § 3.14 — QA Catalog Alignment (upstream requirement)
- `LEARNING_INTAKE_AND_PROMOTION_MODEL.md` § 6.3 — BL Forward-Scan Obligation (enforcement context)
- `BUILD_PHILOSOPHY.md` — Second-Time Failure Prohibition (philosophical foundation)
- `GOVERNANCE_GATE_CANON.md` — Canonical gate framework (gate model)
- `GOVERNANCE_COMPLETENESS_MODEL.md` — Governance completeness model (structural context)

**Bootstrap Learnings**:
- `BOOTSTRAP_EXECUTION_LEARNINGS.md` BL-018 — First-time QA misalignment (FM App Wave 2.2)
- `BOOTSTRAP_EXECUTION_LEARNINGS.md` BL-019 — Second-time QA misalignment (FM App Wave 2.3+)

**Application Implementations**:
- `maturion-foreman-office-app/validate-wave2-qa-alignment.py` — FM App validation script
- `maturion-foreman-office-app/WAVE_2_EXECUTION_RATCHET_QA_CATALOG_VERIFICATION.md` — FM App Wave 2 ratchet

---

## Summary

The QA-Catalog-Alignment Gate is:

✅ **Mandatory** - Must pass before ANY wave/subwave authorization  
✅ **Semantic** - Validates alignment, not just existence  
✅ **Automated** - Should be implemented as executable validation  
✅ **Evidence-Based** - Produces auditable validation reports  
✅ **Catastrophe-Preventing** - Blocks second-time failures  
✅ **Forward-Scan-Aware** - Applied retroactively after BL creation  
✅ **Cross-Repository** - Consistent definition, repository-specific implementation  

**This gate exists to prevent BL-018/BL-019 class failures from recurring. No exceptions.**

---

**Version**: 1.0  
**Date**: 2026-01-05  
**Status**: Canonical - Active and Enforced  
**Authority**: Supreme across ALL repositories with wave-based delivery  
**Next Review**: After first Wave 3+ execution using this gate

---

**Document Metadata**:
- Document ID: QA_CATALOG_ALIGNMENT_GATE_CANON_V1.0
- Authority: Canonical Gate Definition
- Derived From: BL-018, BL-019 (FM App Wave 2)
- Required By: ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md § 3.14
- Enforcement: FM Planning Process, Builder Appointment, CI/CD, Governance Audit
- Integration: All wave-based delivery systems
