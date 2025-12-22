# BUILDER QA REPORT SCHEMA

## Status
Canonical Governance Specification  
Version: v1.0  
Authority: Governance Administrator  
Required By: Post-Transition Governance Model, GOVERNANCE_COMPLETENESS_MODEL.md

---

## 1. Purpose

This document defines the normative schema for **Builder QA Reports** - the canonical source of truth for PR merge readiness in the post-transition governance model.

Builder QA Reports serve as:
- **Primary evidence** for PR merge gate decisions
- **Handover contract** from Builder to Governance Gate
- **QA execution proof** demonstrating Gate-Eligible Green status
- **Compliance verification** for Build Philosophy and governance requirements

A Builder QA Report is valid only if it conforms to this schema.

---

## 2. Core Principles (Constitutional)

### 2.1 Builder QA Report as Source of Truth
Per the post-transition model:
- Builder QA Reports are the **PRIMARY source of truth** for merge readiness
- Governance Gate **validates** report presence and correctness (enforcement-only)
- Governance Gate does **NOT discover** CI status or infer readiness
- Report structure and completeness are **mandatory pre-conditions** for gate evaluation

### 2.2 QA-First, Enforcement-Only Gate Model
- Builders execute QA and generate reports
- Reports prove Build-to-Green and Gate-Eligible Green achieved
- Gates validate reports exist and conform to schema
- Gates enforce governance compliance based on report content

### 2.3 Evidence Immutability
- Builder QA Reports are **immutable** once generated
- Reports serve as audit trail and evidence
- Corrections require new report version with change history
- Original reports retained for traceability

---

## 3. Builder QA Report Structure

Builder QA Reports consist of two mandatory components:

### 3.1 Human-Readable Summary
**Location**: `.qa/builder/SUMMARY.md`  
**Purpose**: Human-readable QA summary and merge readiness declaration  
**Format**: Markdown conforming to Section 5 of this schema

### 3.2 Machine-Readable Report
**Location**: `.qa/builder/BUILD_QA_REPORT.json`  
**Purpose**: Machine-readable QA data for automated gate validation  
**Format**: JSON conforming to Section 6 of this schema

### 3.3 Governance Compliance Report
**Location**: `.qa/builder/GOVERNANCE_COMPLIANCE_REPORT.json`  
**Purpose**: Detailed governance compliance verification  
**Format**: JSON conforming to Section 7 of this schema

---

## 4. Report Location and Naming

### 4.1 Canonical Locations
All Builder QA Reports MUST be stored in the `.qa/builder/` directory at the repository root:

```
.qa/
└── builder/
    ├── SUMMARY.md                          # Human-readable summary (REQUIRED)
    ├── BUILD_QA_REPORT.json                # Machine-readable report (REQUIRED)
    ├── GOVERNANCE_COMPLIANCE_REPORT.json   # Compliance details (REQUIRED)
    └── evidence/                           # Supporting evidence (OPTIONAL)
        ├── test-results/
        ├── coverage/
        └── logs/
```

### 4.2 File Naming Conventions
- Primary files use UPPERCASE naming: `SUMMARY.md`, `BUILD_QA_REPORT.json`
- Supporting evidence uses lowercase with hyphens: `test-results.log`
- All timestamps use ISO 8601 format
- All paths are relative to repository root

---

## 5. SUMMARY.md Schema (Human-Readable)

### 5.1 Required Structure

```markdown
# Builder QA Summary

**Issue**: #[ISSUE_NUMBER]  
**Builder**: [BUILDER_ID]  
**Timestamp**: [ISO_8601_TIMESTAMP]  
**Status**: [READY | NOT_READY | INCOMPLETE]

## Executive Summary

[2-3 sentence summary of build status and merge readiness]

**Merge Readiness**: [READY | NOT_READY | REQUIRES_REVIEW]  
**Handover Decision**: [READY_FOR_MERGE | NOT_READY_FOR_MERGE]

## Build Status

- **Build-to-Green**: [✅ Achieved | ❌ Not Achieved]
- **Pre-Build QA**: [RED | FAIL | NOT_RUN]
- **Post-Build QA**: [GREEN | PASS | RED | FAIL]
- **Test Results**: [PASSED]/[TOTAL] tests passing ([PERCENTAGE]%)
- **Test Debt**: [✅ Zero | ❌ [COUNT] instances detected]

## Governance Compliance

- **Build Philosophy**: [✅ Compliant | ❌ Non-Compliant]
- **Zero Test Debt**: [✅ Compliant | ❌ Non-Compliant]
- **Scope Isolation**: [✅ Compliant | ❌ Non-Compliant]
- **Evidence Trail**: [✅ Complete | ❌ Incomplete]
- **QA Coverage**: [✅ Complete | ❌ Incomplete]

**Overall Compliance**: [COMPLIANT | NON_COMPLIANT | REQUIRES_REVIEW]

## Test Execution Details

### Test Suite Results
- Total Tests: [NUMBER]
- Passed: [NUMBER]
- Failed: [NUMBER]
- Skipped: [NUMBER]
- Coverage: [PERCENTAGE]%

### QA Domains Covered
- [✅|❌] Architecture Conformance
- [✅|❌] Integration & Wiring
- [✅|❌] Functional Behavior
- [✅|❌] UX / Human Interaction
- [✅|❌] Security & Compliance
- [✅|❌] Regression Prevention
- [✅|❌] Performance & Resilience
- [✅|❌] Edge Cases & Error Handling
- [✅|❌] Build & Deployment
- [✅|❌] Documentation

[Detailed test execution narrative]

## Blocking Issues

[This section REQUIRED if Status = NOT_READY or REQUIRES_REVIEW]

### [CATEGORY]: [ISSUE_TITLE]
**Severity**: [CRITICAL | HIGH | MEDIUM | LOW]  
**Impact**: [Description]  
**Remediation**: [Steps to resolve]

---

## Architecture Compliance

**Architecture Document**: [PATH_OR_REFERENCE]  
**Compliance Verified**: [✅ Yes | ❌ No]  
**Deviations**: [None | List with justifications]

## Evidence Artifacts

- `.qa/builder/BUILD_QA_REPORT.json` - Machine-readable QA report
- `.qa/builder/GOVERNANCE_COMPLIANCE_REPORT.json` - Compliance details
- [Additional evidence paths]

## Builder Attestation

**Builder Declaration**: I attest that this report accurately reflects the QA execution results and that the implementation has been verified against all governance requirements and acceptance criteria.

**Builder ID**: [BUILDER_ID]  
**Completion Timestamp**: [ISO_8601_TIMESTAMP]

---

**Report Generated**: [ISO_8601_TIMESTAMP]  
**Schema Version**: 1.0  
**Canonical Authority**: This report represents Builder QA truth for PR merge readiness
```

### 5.2 Required Sections
1. **Header** - Issue, Builder, Timestamp, Status (REQUIRED)
2. **Executive Summary** - Summary, Merge Readiness, Handover Decision (REQUIRED)
3. **Build Status** - Build-to-Green, QA results, Test debt (REQUIRED)
4. **Governance Compliance** - Philosophy, Test Debt, Scope, Evidence, QA Coverage (REQUIRED)
5. **Test Execution Details** - Test results, QA domains (REQUIRED)
6. **Blocking Issues** - REQUIRED if NOT_READY or REQUIRES_REVIEW
7. **Architecture Compliance** - REQUIRED
8. **Evidence Artifacts** - REQUIRED
9. **Builder Attestation** - REQUIRED
10. **Footer** - Timestamp, schema version, authority statement (REQUIRED)

### 5.3 Status Values (NORMATIVE)

#### 5.3.1 Primary Status
- **READY**: Build successful, all tests passing, fully compliant, ready for merge
- **NOT_READY**: Build has blocking issues preventing merge
- **INCOMPLETE**: Build process incomplete or interrupted (invalid for handover)

#### 5.3.2 Merge Readiness
- **READY**: PR meets all merge requirements
- **NOT_READY**: PR has blocking issues
- **REQUIRES_REVIEW**: Borderline case requiring human judgment

#### 5.3.3 Handover Decision (NORMATIVE)
- **READY_FOR_MERGE**: Builder declares PR ready for merge (authorizes gate evaluation)
- **NOT_READY_FOR_MERGE**: Builder declares PR not ready (gate must block)

**Invariant**: Status = READY ⟺ Handover Decision = READY_FOR_MERGE

### 5.4 Validation Rules

#### 5.4.1 Structural Validation
- All REQUIRED sections MUST be present
- All REQUIRED fields MUST have values (no empty placeholders)
- Blocking Issues section REQUIRED if Status ≠ READY
- Builder Attestation MUST be present

#### 5.4.2 Consistency Validation
- Status MUST align with Merge Readiness
- Test Debt compliance MUST match test debt count
- Zero Test Debt = Compliant ⟹ Skipped = 0
- Build-to-Green Achieved ⟹ Post-Build QA = GREEN
- Overall Compliance = COMPLIANT ⟹ All governance checks = Compliant

#### 5.4.3 Completeness Validation
- All 10 QA domains MUST be addressed (checked or explicitly not applicable)
- Evidence artifacts MUST be referenced and exist
- Architecture document MUST be referenced
- Timestamps MUST be valid ISO 8601

---

## 6. BUILD_QA_REPORT.json Schema (Machine-Readable)

### 6.1 JSON Schema Definition

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Builder QA Report",
  "type": "object",
  "required": [
    "schema_version",
    "report_metadata",
    "build_status",
    "governance_compliance",
    "test_execution",
    "qa_domains",
    "handover_decision"
  ],
  "properties": {
    "schema_version": {
      "type": "string",
      "const": "1.0",
      "description": "Schema version for this report format"
    },
    "report_metadata": {
      "type": "object",
      "required": ["issue_number", "builder_id", "timestamp", "repository"],
      "properties": {
        "issue_number": {"type": "integer", "minimum": 1},
        "builder_id": {"type": "string", "minLength": 1},
        "timestamp": {"type": "string", "format": "date-time"},
        "repository": {"type": "string", "minLength": 1},
        "branch": {"type": "string"},
        "commit_sha": {"type": "string", "pattern": "^[0-9a-f]{40}$"}
      }
    },
    "build_status": {
      "type": "object",
      "required": ["build_to_green", "pre_build_qa", "post_build_qa", "test_results"],
      "properties": {
        "build_to_green": {"type": "boolean"},
        "pre_build_qa": {"type": "string", "enum": ["RED", "FAIL", "NOT_RUN"]},
        "post_build_qa": {"type": "string", "enum": ["GREEN", "PASS", "RED", "FAIL"]},
        "test_results": {
          "type": "object",
          "required": ["total", "passed", "failed", "skipped", "coverage_percentage"],
          "properties": {
            "total": {"type": "integer", "minimum": 0},
            "passed": {"type": "integer", "minimum": 0},
            "failed": {"type": "integer", "minimum": 0},
            "skipped": {"type": "integer", "minimum": 0},
            "coverage_percentage": {"type": "number", "minimum": 0, "maximum": 100}
          }
        },
        "test_debt_count": {"type": "integer", "minimum": 0}
      }
    },
    "governance_compliance": {
      "type": "object",
      "required": [
        "build_philosophy_compliant",
        "zero_test_debt_compliant",
        "scope_isolation_compliant",
        "evidence_trail_complete",
        "qa_coverage_complete",
        "overall_compliance"
      ],
      "properties": {
        "build_philosophy_compliant": {"type": "boolean"},
        "zero_test_debt_compliant": {"type": "boolean"},
        "scope_isolation_compliant": {"type": "boolean"},
        "evidence_trail_complete": {"type": "boolean"},
        "qa_coverage_complete": {"type": "boolean"},
        "overall_compliance": {
          "type": "string",
          "enum": ["COMPLIANT", "NON_COMPLIANT", "REQUIRES_REVIEW"]
        }
      }
    },
    "test_execution": {
      "type": "object",
      "properties": {
        "test_suites": {"type": "array", "items": {"type": "object"}},
        "execution_time_seconds": {"type": "number", "minimum": 0},
        "test_framework": {"type": "string"}
      }
    },
    "qa_domains": {
      "type": "object",
      "required": [
        "architecture_conformance",
        "integration_wiring",
        "functional_behavior",
        "ux_interaction",
        "security_compliance",
        "regression_prevention",
        "performance_resilience",
        "edge_cases_errors",
        "build_deployment",
        "documentation"
      ],
      "properties": {
        "architecture_conformance": {"type": "boolean"},
        "integration_wiring": {"type": "boolean"},
        "functional_behavior": {"type": "boolean"},
        "ux_interaction": {"type": "boolean"},
        "security_compliance": {"type": "boolean"},
        "regression_prevention": {"type": "boolean"},
        "performance_resilience": {"type": "boolean"},
        "edge_cases_errors": {"type": "boolean"},
        "build_deployment": {"type": "boolean"},
        "documentation": {"type": "boolean"}
      }
    },
    "blocking_issues": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["category", "title", "severity", "description"],
        "properties": {
          "category": {"type": "string"},
          "title": {"type": "string"},
          "severity": {"type": "string", "enum": ["CRITICAL", "HIGH", "MEDIUM", "LOW"]},
          "description": {"type": "string"},
          "remediation": {"type": "string"}
        }
      }
    },
    "architecture_compliance": {
      "type": "object",
      "required": ["architecture_document", "compliance_verified"],
      "properties": {
        "architecture_document": {"type": "string"},
        "compliance_verified": {"type": "boolean"},
        "deviations": {"type": "array", "items": {"type": "string"}}
      }
    },
    "handover_decision": {
      "type": "object",
      "required": ["status", "merge_ready", "attestation"],
      "properties": {
        "status": {"type": "string", "enum": ["READY", "NOT_READY", "INCOMPLETE"]},
        "merge_ready": {"type": "boolean"},
        "attestation": {
          "type": "object",
          "required": ["builder_id", "timestamp"],
          "properties": {
            "builder_id": {"type": "string"},
            "timestamp": {"type": "string", "format": "date-time"}
          }
        }
      }
    }
  }
}
```

### 6.2 Validation Rules for JSON Report
- JSON MUST be valid per schema
- All required fields MUST be present
- All timestamps MUST be valid ISO 8601
- test_results.passed + failed + skipped MUST equal test_results.total
- merge_ready MUST be true if status = "READY"
- blocking_issues MUST be non-empty if status = "NOT_READY"

---

## 7. GOVERNANCE_COMPLIANCE_REPORT.json Schema

### 7.1 Purpose
Detailed governance compliance verification including evidence trails and rule-by-rule compliance checks.

### 7.2 JSON Structure

```json
{
  "schema_version": "1.0",
  "compliance_timestamp": "[ISO 8601]",
  "builder_id": "[Builder ID]",
  "issue_number": 0,
  
  "build_philosophy": {
    "one_time_build_law": {
      "compliant": true,
      "evidence": "[Path to evidence]",
      "notes": "[Compliance notes]"
    },
    "requirements_first": {
      "compliant": true,
      "requirements_document": "[Path]",
      "evidence": "[Path]"
    },
    "architecture_before_code": {
      "compliant": true,
      "architecture_document": "[Path]",
      "evidence": "[Path]"
    }
  },
  
  "qa_policy_compliance": {
    "gate_eligible_green": {
      "achieved": true,
      "evidence": "[Test results path]"
    },
    "ten_domain_coverage": {
      "compliant": true,
      "domains_covered": 10,
      "domains_total": 10,
      "coverage_evidence": "[Path]"
    },
    "zero_test_debt": {
      "compliant": true,
      "test_debt_count": 0,
      "skipped_tests": 0,
      "evidence": "[Path]"
    }
  },
  
  "scope_control": {
    "scope_declaration_present": true,
    "scope_to_diff_aligned": true,
    "scope_document": "[Path]",
    "evidence": "[Path]"
  },
  
  "evidence_trail": {
    "complete": true,
    "artifacts": [
      {
        "type": "[Type]",
        "location": "[Path]",
        "verified": true
      }
    ]
  },
  
  "overall_assessment": {
    "compliant": true,
    "compliance_percentage": 100,
    "non_compliant_items": [],
    "review_required_items": []
  }
}
```

---

## 8. Gate Integration

### 8.1 Gate Validation Sequence
1. **Presence Check**: Verify all required report files exist
2. **Schema Validation**: Validate reports against schemas
3. **Content Validation**: Verify report content consistency
4. **Compliance Check**: Evaluate governance compliance
5. **Decision**: PASS/FAIL based on handover_decision.merge_ready

### 8.2 Gate Pass Conditions
Gate PASSES if and only if:
- ✅ All required reports exist at canonical locations
- ✅ All reports conform to schemas
- ✅ SUMMARY.md: Handover Decision = READY_FOR_MERGE
- ✅ BUILD_QA_REPORT.json: handover_decision.merge_ready = true
- ✅ GOVERNANCE_COMPLIANCE_REPORT.json: overall_assessment.compliant = true
- ✅ All consistency validations pass
- ✅ No critical violations detected

### 8.3 Gate Fail Conditions
Gate FAILS if any of:
- ❌ Any required report missing
- ❌ Any report fails schema validation
- ❌ Handover Decision = NOT_READY_FOR_MERGE
- ❌ merge_ready = false
- ❌ Consistency validation failures
- ❌ Critical governance violations

---

## 9. Relationship to Other Governance Artifacts

This schema integrates with:
- **QA_POLICY_MASTER.md**: Implements QA coverage and Gate-Eligible Green requirements
- **BUILD_PHILOSOPHY.md**: Enforces One-Time Build Law and Build-to-Green
- **GOVERNANCE_GATE_CANON.md**: Defines what gates validate
- **BUILDER_QA_HANDOVER_POLICY.md**: Defines handover contract
- **GOVERNANCE_COMPLETENESS_MODEL.md**: Satisfies Builder QA canonicalization requirement

---

## 10. Enforcement

### 10.1 Pre-Merge Requirements
- Builder QA Report MUST exist before PR can be merged
- All three report components MUST be present and valid
- Handover Decision MUST be explicit
- Builder Attestation MUST be present

### 10.2 Immutability Requirements
- Reports MUST NOT be modified after initial generation
- Corrections require new report version with change history
- Original reports MUST be retained for audit trail

### 10.3 Audit Requirements
- Reports serve as compliance evidence
- Reports MUST be accessible for audit
- Report integrity MUST be verifiable (checksums, signatures)

---

## 11. Non-Compliance Consequences

Failure to provide Builder QA Reports conforming to this schema constitutes:
- PR merge gate FAILURE (automatic block)
- Governance violation (Builder handover contract breach)
- Audit evidence gap
- Build Philosophy violation
- Governance completeness RED state

---

**End of BUILDER_QA_REPORT Schema**

---

**Document Metadata**:
- Schema ID: BUILDER_QA_REPORT_SCHEMA_V1
- Authority: Canonical Governance Specification
- Required By: Post-Transition Governance Model
- Enforcement: Governance Gate (mandatory)
- Integration: QA_POLICY_MASTER.md, GOVERNANCE_GATE_CANON.md
