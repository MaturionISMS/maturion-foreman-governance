# Builder QA Summary Structure Definition

**Schema Version**: 1.0.0  
**Type**: Markdown Document Structure  
**Purpose**: Human-readable summary of Builder QA execution and results

---

## Document Purpose

The `SUMMARY.md` file provides a human-readable summary of the Builder's QA execution, results, and merge readiness assessment. This document complements the machine-readable JSON reports and serves as the primary human interface for understanding build status.

---

## Required Structure

### 1. Header Section (Required)

```markdown
# Builder QA Summary

**Issue**: #[ISSUE_NUMBER]  
**Builder**: [BUILDER_ID]  
**Timestamp**: [ISO_8601_TIMESTAMP]  
**Status**: [PASS | FAIL | INCOMPLETE]
```

### 2. Executive Summary (Required)

```markdown
## Executive Summary

[2-3 sentence summary of build status and merge readiness]

**Merge Readiness**: [READY | NOT_READY | REQUIRES_REVIEW]
```

### 3. Build Status (Required)

```markdown
## Build Status

- **Build-to-Green**: [✅ Achieved | ❌ Not Achieved]
- **Pre-Build QA**: [RED | FAIL | NOT_RUN]
- **Post-Build QA**: [GREEN | PASS | RED | FAIL]
- **Test Results**: [PASSED]/[TOTAL] tests passing
- **Test Debt**: [✅ Zero | ❌ [COUNT] instances detected]
```

### 4. Governance Compliance (Required)

```markdown
## Governance Compliance

- **Build Philosophy**: [✅ Compliant | ❌ Non-Compliant]
- **Zero Test Debt**: [✅ Compliant | ❌ Non-Compliant]
- **Scope Isolation**: [✅ Compliant | ❌ Non-Compliant]
- **Evidence Trail**: [✅ Complete | ❌ Incomplete]

**Overall Compliance**: [COMPLIANT | NON_COMPLIANT | REQUIRES_REVIEW]
```

### 5. Test Execution Details (Required)

```markdown
## Test Execution Details

### Test Suite Results
- Total Tests: [NUMBER]
- Passed: [NUMBER]
- Failed: [NUMBER]
- Skipped: [NUMBER]
- Coverage: [PERCENTAGE]%

### QA Domains Covered
- [ ] Architecture Conformance
- [ ] Integration & Wiring
- [ ] Functional Behavior
- [ ] UX / Human Interaction
- [ ] Security & Compliance
- [ ] Regression Prevention
- [ ] Performance & Resilience

[Additional details about test execution]
```

### 6. Blocking Issues (Conditional - Required if Status = FAIL or NOT_READY)

```markdown
## Blocking Issues

### [CATEGORY]: [ISSUE_TITLE]
**Severity**: [CRITICAL | HIGH | MEDIUM | LOW]

[Description of blocking issue]

**Remediation**: [Steps to resolve]

---
[Additional blocking issues as needed]
```

### 7. Architecture Compliance (Optional but Recommended)

```markdown
## Architecture Compliance

**Architecture Document**: [PATH_OR_REFERENCE]  
**Compliance Verified**: [Yes | No]

[Details of architecture compliance verification]

**Deviations**: [None | List of deviations]
```

### 8. Evidence Artifacts (Optional but Recommended)

```markdown
## Evidence Artifacts

- `.qa/builder/BUILD_QA_REPORT.json` - Machine-readable build QA report
- `.qa/builder/GOVERNANCE_COMPLIANCE_REPORT.json` - Governance compliance details
- [Additional artifact paths]
```

### 9. Builder Notes (Optional)

```markdown
## Builder Notes

[Any additional notes, context, or observations from the builder]
```

### 10. Footer (Required)

```markdown
---

**Report Generated**: [ISO_8601_TIMESTAMP]  
**Schema Version**: 1.0.0  
**Canonical Authority**: This report represents Builder QA truth for PR merge readiness
```

---

## Validation Rules

### Required Sections
1. Header Section with Issue #, Builder ID, Timestamp, and Status
2. Executive Summary with Merge Readiness
3. Build Status with Build-to-Green indicator
4. Governance Compliance with overall assessment
5. Test Execution Details with results breakdown
6. Blocking Issues (if status is not READY)
7. Footer with timestamp and schema version

### Status Values
- **PASS**: Build successful, all tests passing, merge ready
- **FAIL**: Build failed or tests failing, not merge ready
- **INCOMPLETE**: Build process incomplete or interrupted

### Merge Readiness Values
- **READY**: PR is ready to merge (equivalent to READY_FOR_MERGE)
- **NOT_READY**: PR has blocking issues preventing merge
- **REQUIRES_REVIEW**: PR may be ready but needs human review

### Consistency Requirements
- Status in header must match merge readiness assessment
- Test counts must be consistent with pass/fail status
- Zero Test Debt compliance must match test debt count
- Blocking issues section required if NOT_READY

---

## Example Minimal Valid Summary

```markdown
# Builder QA Summary

**Issue**: #123  
**Builder**: copilot-builder-01  
**Timestamp**: 2025-12-22T10:00:00Z  
**Status**: PASS

## Executive Summary

Build completed successfully with all tests passing. Implementation follows architecture and meets all governance requirements.

**Merge Readiness**: READY

## Build Status

- **Build-to-Green**: ✅ Achieved
- **Pre-Build QA**: RED
- **Post-Build QA**: GREEN
- **Test Results**: 42/42 tests passing
- **Test Debt**: ✅ Zero

## Governance Compliance

- **Build Philosophy**: ✅ Compliant
- **Zero Test Debt**: ✅ Compliant
- **Scope Isolation**: ✅ Compliant
- **Evidence Trail**: ✅ Complete

**Overall Compliance**: COMPLIANT

## Test Execution Details

### Test Suite Results
- Total Tests: 42
- Passed: 42
- Failed: 0
- Skipped: 0
- Coverage: 95%

All QA domains covered as required by architecture.

## Evidence Artifacts

- `.qa/builder/BUILD_QA_REPORT.json`
- `.qa/builder/GOVERNANCE_COMPLIANCE_REPORT.json`

---

**Report Generated**: 2025-12-22T10:00:00Z  
**Schema Version**: 1.0.0  
**Canonical Authority**: This report represents Builder QA truth for PR merge readiness
```

---

## Non-Compliance Examples

### Missing Required Section
❌ Missing "Governance Compliance" section - Invalid

### Inconsistent Status
❌ Header Status = PASS but Merge Readiness = NOT_READY - Invalid

### Missing Blocking Issues
❌ Merge Readiness = NOT_READY but no "Blocking Issues" section - Invalid

### Test Debt Mismatch
❌ Zero Test Debt = Compliant but Test Results shows Skipped: 5 - Invalid

---

## Schema Authority

**Status**: Canonical - Mandatory for Builder QA handover  
**Version**: 1.0.0  
**Authority**: Governance Administrator  
**Last Updated**: 2025-12-22

This structure definition is normative. All Builder QA summaries MUST conform to this structure for PR gate validation.
