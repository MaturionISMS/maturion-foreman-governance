# GPCA PREDICTION REPORT SCHEMA

## Status
Canonical Governance Specification  
Version: v1.0  
Authority: Governance Administrator  
Required By: GATE_PREDICTIVE_COMPLIANCE_ANALYSIS.md

---

## 1. Purpose

This document defines the normative schema for **GPCA Prediction Reports** - structured reports generated when Gate-Predictive Compliance Analysis (GPCA) is executed.

GPCA Prediction Reports serve as:
- **Pre-submission compliance predictions** for builders
- **Governance validation evidence** for governance audits
- **Gate consistency verification** for governance quality
- **Audit trail** for prediction accuracy

A GPCA Prediction Report is valid only if it conforms to this schema.

---

## 2. Core Principles

### 2.1 GPCA Reports Are Optional

GPCA reports are **optional artifacts**:
- Builders MAY generate GPCA reports before handover
- Governance Administrator MAY generate GPCA reports for validation
- GPCA reports are NOT required for gate evaluation
- GPCA reports provide advisory value only

### 2.2 GPCA Reports Are Non-Authoritative

GPCA reports are **predictions, not enforcement**:
- PR Gates make authoritative decisions
- GPCA reports provide early feedback
- GPCA predictions may be overridden by gate reality
- Mispredictions trigger governance improvement

### 2.3 GPCA Reports Are Auditable

GPCA reports must:
- Be versioned and timestamped
- Include complete evaluation rationale
- Reference evaluated governance artifacts
- Be traceable to gate outcomes

---

## 3. Report Location and Naming

### 3.1 Canonical Location

GPCA Prediction Reports SHOULD be stored at:

```
.qa/gpca/PREDICTION_REPORT.md
```

Alternative locations (for multiple predictions):
```
.qa/gpca/PREDICTION_REPORT_<TIMESTAMP>.md
```

**Note**: GPCA reports are optional and MAY be omitted entirely.

### 3.2 File Naming Conventions

- Primary report: `PREDICTION_REPORT.md`
- Timestamped reports: `PREDICTION_REPORT_YYYY-MM-DDTHH-MM-SS.md`
- All timestamps use ISO 8601 format (UTC)

---

## 4. Report Structure (Human-Readable Markdown)

### 4.1 Required Sections

A valid GPCA Prediction Report MUST contain these sections:

```markdown
# GPCA Prediction Report

## 1. Metadata
## 2. Prediction Summary
## 3. Governance Requirements Evaluated
## 4. Evidence Artifacts Analyzed
## 5. Compliance Assessment
## 6. Prediction Outcome
## 7. Confidence Assessment
## 8. Recommendations (if applicable)
## 9. Gate Comparison (if available)
```

---

## 5. Required Fields (Normative)

### 5.1 Metadata Section

```markdown
## 1. Metadata

- **GPCA_SCHEMA_VERSION**: v1.0
- **Prediction Timestamp**: <ISO 8601 UTC>
- **Executor**: <Builder|GovernanceAdministrator|Foreman>
- **Executor Identity**: <agent-id>
- **Repository**: <org/repo>
- **Branch**: <branch-name>
- **PR Number**: <number> (if applicable)
- **Issue Number**: <number> (if applicable)
- **Commit SHA**: <sha>
```

**Required Fields**:
- `GPCA_SCHEMA_VERSION`: Must be `v1.0`
- `Prediction Timestamp`: ISO 8601 UTC timestamp
- `Executor`: One of: Builder, GovernanceAdministrator, Foreman
- `Repository`: Organization/repository name
- `Branch`: Git branch name
- `Commit SHA`: Full commit SHA

**Optional Fields**:
- `Executor Identity`: Specific agent instance identifier
- `PR Number`: PR number if prediction for specific PR
- `Issue Number`: Issue number if prediction for specific issue

---

### 5.2 Prediction Summary Section

```markdown
## 2. Prediction Summary

**Prediction Outcome**: <PREDICT_PASS|PREDICT_FAIL>

**Summary**: <1-2 sentence summary of prediction>

**Confidence Level**: <HIGH|MEDIUM|LOW>

**Execution Time**: <duration in seconds>
```

**Required Fields**:
- `Prediction Outcome`: Exactly one of: PREDICT_PASS, PREDICT_FAIL
- `Summary`: Brief natural language summary
- `Confidence Level`: One of: HIGH, MEDIUM, LOW

**Optional Fields**:
- `Execution Time`: GPCA execution duration

**Confidence Level Semantics**:
- **HIGH**: All required checks performed, clear outcome, no ambiguity
- **MEDIUM**: Some checks uncertain, edge cases present, partial information
- **LOW**: Missing information, governance ambiguity, unreliable prediction

---

### 5.3 Governance Requirements Evaluated Section

```markdown
## 3. Governance Requirements Evaluated

### 3.1 PR Gate Requirements

- [ ] Builder QA Report presence
- [ ] Builder QA Report schema conformance
- [ ] READY status declaration
- [ ] Evidence completeness
- [ ] Governance compliance assertion
- [ ] Architecture conformance
- [ ] (additional gate-specific requirements)

**Governance References**:
- `governance/canon/PR_GATE_PRECONDITION_RULE.md`
- `governance/policy/BUILDER_QA_HANDOVER_POLICY.md`
- `governance/schemas/BUILDER_QA_REPORT.schema.md`
- (additional references)

### 3.2 Schema Requirements

**Evaluated Schemas**:
- `BUILDER_QA_REPORT.schema.md` (v1.0)
- `GOVERNANCE_COMPLIANCE_REPORT.schema.md` (v1.0)
- (additional schemas)

### 3.3 Policy Requirements

**Evaluated Policies**:
- Builder QA Handover Policy (v1.0)
- PR Gate Precondition Rule (v1)
- (additional policies)
```

**Required Content**:
- List of all gate requirements evaluated (checkbox format)
- Governance artifact references (specific files)
- Schema versions evaluated
- Policy versions evaluated

**Validation**: All referenced governance artifacts must exist and be current

---

### 5.4 Evidence Artifacts Analyzed Section

```markdown
## 4. Evidence Artifacts Analyzed

### 4.1 Required Artifacts

| Artifact | Path | Present | Valid | Notes |
|----------|------|---------|-------|-------|
| Builder QA Summary | `.qa/builder/SUMMARY.md` | ✅/❌ | ✅/❌ | ... |
| Build QA Report | `.qa/builder/BUILD_QA_REPORT.json` | ✅/❌ | ✅/❌ | ... |
| Governance Compliance Report | `.qa/builder/GOVERNANCE_COMPLIANCE_REPORT.json` | ✅/❌ | ✅/❌ | ... |
| (additional artifacts) | ... | ... | ... | ... |

### 4.2 Evidence Metadata

- **Total Artifacts Required**: <number>
- **Artifacts Present**: <number>
- **Artifacts Valid**: <number>
- **Missing Artifacts**: <list or NONE>
- **Invalid Artifacts**: <list or NONE>
```

**Required Content**:
- Table of all required artifacts
- Presence check (file exists)
- Validity check (schema conformance, metadata only)
- Summary counts
- Lists of missing/invalid artifacts

**GPCA Limitation**: GPCA checks file presence and basic structure, NOT content correctness

---

### 5.5 Compliance Assessment Section

```markdown
## 5. Compliance Assessment

### 5.1 Build Philosophy Compliance

- [ ] One-Time Build Law (based on declared status)
- [ ] Build-to-Green (based on declared status)
- [ ] Zero Test Debt (based on declared status)
- [ ] Requirements-First (evidence of architecture reference)

**Assessment**: <COMPLIANT|NON_COMPLIANT|UNCERTAIN>

**Notes**: <details>

### 5.2 QA Policy Compliance

- [ ] 10-domain QA coverage (based on declared coverage)
- [ ] Gate-Eligible Green (based on declared status)
- [ ] Evidence bundle completeness
- [ ] QA report schema conformance

**Assessment**: <COMPLIANT|NON_COMPLIANT|UNCERTAIN>

**Notes**: <details>

### 5.3 Handover Policy Compliance

- [ ] All pre-conditions met (based on declarations)
- [ ] Handover decision declared
- [ ] Builder attestation present
- [ ] Evidence artifacts referenced

**Assessment**: <COMPLIANT|NON_COMPLIANT|UNCERTAIN>

**Notes**: <details>

### 5.4 Overall Compliance

**Overall Assessment**: <COMPLIANT|NON_COMPLIANT|UNCERTAIN>

**Blocking Issues**: <list or NONE>
```

**Required Content**:
- Build Philosophy compliance checks
- QA Policy compliance checks
- Handover Policy compliance checks
- Overall compliance assessment
- List of blocking issues (if any)

**Assessment Semantics**:
- **COMPLIANT**: All checks pass based on declared evidence
- **NON_COMPLIANT**: One or more checks fail
- **UNCERTAIN**: Insufficient information or governance ambiguity

**Note**: GPCA validates **declared compliance**, not actual correctness

---

### 5.6 Prediction Outcome Section

```markdown
## 6. Prediction Outcome

### 6.1 Final Prediction

**Prediction**: <PREDICT_PASS|PREDICT_FAIL>

**Rationale**: <detailed explanation of prediction basis>

### 6.2 Failure Reasons (if PREDICT_FAIL)

**Failure Classifications**:
1. **MISSING_ARTIFACT**: <list of missing artifacts>
2. **SCHEMA_VIOLATION**: <list of schema violations>
3. **EVIDENCE_INCOMPLETE**: <list of evidence gaps>
4. **CONTENT_INCONSISTENCY**: <list of inconsistencies>
5. **NOT_READY_DECLARED**: <details if NOT_READY status>
6. **GOVERNANCE_VIOLATION**: <list of violated rules>

**Governance References**: <specific rules violated>

**Remediation Guidance**: <actionable steps to resolve>

### 6.3 Pass Conditions (if PREDICT_PASS)

**Pass Rationale**: <explanation of why pass predicted>

**Validated Conditions**:
- ✅ All required artifacts present
- ✅ All artifacts schema-compliant
- ✅ All compliance checks pass
- ✅ READY status declared
- ✅ No blocking issues detected

**Confidence Notes**: <any uncertainties or edge cases>
```

**Required for PREDICT_FAIL**:
- List of failure reasons by classification
- Specific governance rule violations
- Actionable remediation guidance

**Required for PREDICT_PASS**:
- Pass rationale
- List of validated conditions
- Confidence notes

---

### 5.7 Confidence Assessment Section

```markdown
## 7. Confidence Assessment

**Confidence Level**: <HIGH|MEDIUM|LOW>

**Confidence Factors**:

### High Confidence Factors
- ✅/❌ All governance requirements explicit and unambiguous
- ✅/❌ All required artifacts present and valid
- ✅/❌ All schemas current and complete
- ✅/❌ No edge cases or uncertainties
- ✅/❌ Historical GPCA accuracy high for similar cases

### Low Confidence Factors
- ✅/❌ Governance ambiguity present
- ✅/❌ Missing information
- ✅/❌ Edge cases or unusual patterns
- ✅/❌ Schema incompleteness
- ✅/❌ Historical GPCA mispredictions for similar cases

**Confidence Notes**: <detailed explanation>

**Recommendation**: <proceed with submission | resolve uncertainties | escalate>
```

**Required Content**:
- Overall confidence level
- List of confidence factors (positive and negative)
- Confidence explanation
- Recommendation based on confidence

---

### 5.8 Recommendations Section

```markdown
## 8. Recommendations

### 8.1 For Builder (if applicable)

**Recommended Actions**:
1. <action>
2. <action>
3. ...

**Before Handover**:
- <checklist item>
- <checklist item>
- ...

### 8.2 For Governance Administrator (if applicable)

**Governance Improvements**:
- <suggested improvement>
- <suggested improvement>
- ...

**Ambiguities Detected**:
- <ambiguity description>
- <ambiguity description>
- ...
```

**Optional Section**: Include if GPCA identifies actionable recommendations

---

### 5.9 Gate Comparison Section (Post-Gate Only)

```markdown
## 9. Gate Comparison

**Gate Execution Timestamp**: <ISO 8601 UTC>

**Gate Outcome**: <PASS|FAIL>

**Prediction Accuracy**: <CORRECT|FALSE_POSITIVE|FALSE_NEGATIVE|REASON_MISMATCH>

### 9.1 Comparison Analysis

**GPCA Predicted**: <outcome>
**Gate Decided**: <outcome>
**Match**: <YES|NO>

**Misprediction Analysis** (if mismatch):
- **Root Cause**: <analysis>
- **Governance Gap**: <identified gap>
- **Recommended Fix**: <governance update>
- **Incident ID**: <governance incident identifier>

### 9.2 Lessons Learned

**Learnings**:
- <lesson>
- <lesson>
- ...

**Governance Update Required**: <YES|NO>

**Promoted to Governance**: <YES|NO|PENDING>
```

**Optional Section**: Only included if comparing GPCA prediction to actual gate outcome

**Required for Mispredictions**:
- Root cause analysis
- Identified governance gap
- Recommended governance fix
- Incident tracking

---

## 6. Machine-Readable Format (Optional)

### 6.1 JSON Schema (Optional)

GPCA reports MAY also be generated in JSON format for automated processing:

**Location**: `.qa/gpca/PREDICTION_REPORT.json`

**Schema**:
```json
{
  "schema_version": "v1.0",
  "metadata": {
    "prediction_timestamp": "ISO 8601 UTC",
    "executor": "Builder|GovernanceAdministrator|Foreman",
    "executor_identity": "string",
    "repository": "org/repo",
    "branch": "string",
    "pr_number": 123,
    "issue_number": 456,
    "commit_sha": "string"
  },
  "prediction_summary": {
    "outcome": "PREDICT_PASS|PREDICT_FAIL",
    "summary": "string",
    "confidence_level": "HIGH|MEDIUM|LOW",
    "execution_time_seconds": 1.23
  },
  "governance_evaluated": {
    "gate_requirements": ["requirement1", "requirement2"],
    "schemas": ["schema1@v1.0", "schema2@v1.0"],
    "policies": ["policy1@v1.0", "policy2@v1.0"],
    "references": ["path1", "path2"]
  },
  "evidence_analyzed": {
    "required_artifacts": [
      {
        "name": "string",
        "path": "string",
        "present": true,
        "valid": true,
        "notes": "string"
      }
    ],
    "total_required": 3,
    "artifacts_present": 3,
    "artifacts_valid": 3,
    "missing_artifacts": [],
    "invalid_artifacts": []
  },
  "compliance_assessment": {
    "build_philosophy": {
      "assessment": "COMPLIANT|NON_COMPLIANT|UNCERTAIN",
      "checks": {}
    },
    "qa_policy": {
      "assessment": "COMPLIANT|NON_COMPLIANT|UNCERTAIN",
      "checks": {}
    },
    "handover_policy": {
      "assessment": "COMPLIANT|NON_COMPLIANT|UNCERTAIN",
      "checks": {}
    },
    "overall": "COMPLIANT|NON_COMPLIANT|UNCERTAIN",
    "blocking_issues": []
  },
  "prediction_outcome": {
    "prediction": "PREDICT_PASS|PREDICT_FAIL",
    "rationale": "string",
    "failure_reasons": {
      "MISSING_ARTIFACT": [],
      "SCHEMA_VIOLATION": [],
      "EVIDENCE_INCOMPLETE": [],
      "CONTENT_INCONSISTENCY": [],
      "NOT_READY_DECLARED": [],
      "GOVERNANCE_VIOLATION": []
    },
    "remediation_guidance": "string"
  },
  "confidence_assessment": {
    "level": "HIGH|MEDIUM|LOW",
    "high_confidence_factors": [],
    "low_confidence_factors": [],
    "notes": "string",
    "recommendation": "string"
  },
  "gate_comparison": {
    "gate_timestamp": "ISO 8601 UTC",
    "gate_outcome": "PASS|FAIL",
    "prediction_accuracy": "CORRECT|FALSE_POSITIVE|FALSE_NEGATIVE|REASON_MISMATCH",
    "misprediction_analysis": {},
    "lessons_learned": []
  }
}
```

---

## 7. Validity Rules

A GPCA Prediction Report is INVALID if:
- ❌ Schema version missing or not v1.0
- ❌ Required metadata fields missing
- ❌ Prediction outcome not PREDICT_PASS or PREDICT_FAIL
- ❌ Confidence level not HIGH, MEDIUM, or LOW
- ❌ Missing required sections
- ❌ PREDICT_FAIL without failure reasons
- ❌ Governance references missing or invalid
- ❌ Evidence table incomplete

---

## 8. Usage Guidelines

### 8.1 When to Generate GPCA Reports

**Recommended**:
- Before Builder handover submission (pre-flight check)
- During governance validation audits
- When testing gate rule changes
- When investigating mispredictions

**Not Recommended**:
- During active development
- After gate failure (too late for prediction value)
- As substitute for Builder QA

### 8.2 How to Use GPCA Reports

**Builders**:
- Run GPCA before handover submission
- Review prediction outcome
- Remediate PREDICT_FAIL issues before submission
- Use confidence assessment to gauge risk

**Governance Administrator**:
- Use GPCA for governance validation
- Compare predictions to gate outcomes
- Investigate mispredictions
- Update governance based on insights

**Foreman (FM)**:
- Use GPCA for orchestration decisions
- Identify systematic issues
- Optimize workflow based on predictions

---

## 9. Integration with GPCA Policy

This schema implements:
- **GATE_PREDICTIVE_COMPLIANCE_ANALYSIS.md** - GPCA model
- **PR_GATE_FAILURE_HANDLING_PROTOCOL.md** - Failure classifications
- **GOVERNANCE_RIPPLE_MODEL.md** - Learning promotion

---

## 10. Audit and Compliance

### 10.1 Audit Trail

GPCA reports contribute to audit trail:
- Predictions recorded and timestamped
- Comparisons to gate outcomes tracked
- Mispredictions analyzed and resolved
- Governance improvements documented

### 10.2 Compliance Verification

GPCA reports support:
- Governance completeness validation
- Gate transparency verification
- Predictability validation
- Continuous improvement evidence

---

## 11. Canonical Precedence

This schema is canonical.

If a conflict exists between this schema and any GPCA Prediction Report,
this schema prevails.

---

**End of GPCA PREDICTION REPORT SCHEMA**

---

**Document Metadata**:
- Schema ID: GPCA_PREDICTION_REPORT_SCHEMA_V1
- Authority: Canonical Governance Specification
- Effective Date: 2025-12-22
- Required By: GATE_PREDICTIVE_COMPLIANCE_ANALYSIS.md
- Integration: BUILDER_QA_REPORT.schema.md, PR_GATE_FAILURE_HANDLING_PROTOCOL.md
