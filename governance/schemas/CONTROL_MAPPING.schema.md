# CONTROL MAPPING SCHEMA

## Status
Canonical Governance Specification  
Version: v1  
Authority: Governance Administrator  
Required By: GOVERNANCE_COMPLETENESS_MODEL.md Section 5.8

---

## 1. Purpose

This document defines the normative schema for **Control Mapping** artifacts required for ISO 27001, ISO 31000, and NIST CSF compliance.

Control mapping establishes traceability between:
- Compliance framework requirements (ISO 27001 Annex A controls, NIST CSF functions)
- System architecture components
- Implementation evidence
- Verification artifacts

A control mapping artifact is valid only if it conforms to this schema.

---

## 2. Control Mapping Artifact Location

Control mapping artifacts MUST be stored in application repositories at:

```
compliance/control-mappings/<framework>-<domain>.md
```

Example paths:
- `compliance/control-mappings/ISO27001-A.8.md` (Asset Management)
- `compliance/control-mappings/NIST-CSF-IDENTIFY.md`
- `compliance/control-mappings/ISO31000-RISK.md`

---

## 3. Core Invariants

1. Every control referenced in compliance documentation MUST have a corresponding control mapping entry
2. Control mappings MUST include bidirectional traceability:
   - Control → Architecture Components
   - Architecture Components → Controls
3. Control mappings MUST reference verifiable evidence
4. Control mappings MUST be maintained as canonical memory (no ephemeral documentation)

---

## 4. Required Schema Structure

### 4.1 Document Header (REQUIRED)

```markdown
# Control Mapping: [FRAMEWORK] - [DOMAIN/CONTROL_ID]

**Framework**: [ISO 27001 | ISO 31000 | NIST CSF | Other]  
**Control ID**: [Control identifier from framework]  
**Control Name**: [Full control name]  
**Domain**: [Control domain/category]  
**Version**: [Mapping version]  
**Last Updated**: [ISO 8601 timestamp]  
**Status**: [IMPLEMENTED | PARTIALLY_IMPLEMENTED | NOT_IMPLEMENTED | NOT_APPLICABLE]
```

### 4.2 Control Description (REQUIRED)

```markdown
## Control Description

[Verbatim or paraphrased description of the control requirement from the framework]

**Framework Reference**: [Specific section/clause reference]
**Objective**: [What this control aims to achieve]
**Type**: [Technical | Procedural | Policy | Hybrid]
```

### 4.3 Implementation Mapping (REQUIRED)

```markdown
## Implementation Mapping

### Architecture Components

| Component | Path/Location | Implementation Status | Evidence |
|-----------|---------------|----------------------|----------|
| [Component Name] | [File path or system reference] | [COMPLETE | PARTIAL | PENDING] | [Link to evidence] |

### Implementation Details

[Detailed description of how this control is implemented in the system]

**Implementation Approach**: [Description of implementation strategy]
**Technical Controls**: [List of technical implementations]
**Procedural Controls**: [List of procedural implementations]
```

### 4.4 Evidence References (REQUIRED)

```markdown
## Evidence References

| Evidence Type | Location | Verification Method | Last Verified |
|--------------|----------|---------------------|---------------|
| [Architecture Doc | Test | Policy | Audit Log] | [Path or reference] | [How to verify] | [ISO 8601 timestamp] |

**Evidence Completeness**: [COMPLETE | INCOMPLETE]
**Verification Status**: [VERIFIED | UNVERIFIED | PENDING]
```

### 4.5 Risk Assessment (REQUIRED)

```markdown
## Risk Assessment

**Control Effectiveness**: [HIGH | MEDIUM | LOW]
**Residual Risk**: [HIGH | MEDIUM | LOW | NEGLIGIBLE]
**Risk Justification**: [Explanation of risk assessment]

**Identified Gaps**:
- [List any gaps in control implementation]

**Mitigation Plan**:
- [Plans to address gaps, if any]
```

### 4.6 Compliance Status (REQUIRED)

```markdown
## Compliance Status

**Overall Status**: [COMPLIANT | PARTIALLY_COMPLIANT | NON_COMPLIANT | NOT_APPLICABLE]
**Compliance Percentage**: [0-100%]
**Last Audit Date**: [ISO 8601 timestamp or N/A]
**Next Review Date**: [ISO 8601 timestamp]

**Audit Findings**: [Summary of any audit findings]
**Action Items**: [Any required remediation actions]
```

### 4.7 Dependencies and Related Controls (OPTIONAL but RECOMMENDED)

```markdown
## Dependencies and Related Controls

**Depends On**:
- [Control ID]: [Dependency description]

**Related Controls**:
- [Control ID]: [Relationship description]

**Cross-References**:
- [Links to related governance artifacts, policies, or documentation]
```

### 4.8 Change History (REQUIRED)

```markdown
## Change History

| Date | Version | Change Description | Changed By |
|------|---------|-------------------|------------|
| [ISO 8601] | [v1.0] | [Description] | [Person/Agent] |
```

---

## 5. Validation Rules

### 5.1 Structural Validation
- All REQUIRED sections MUST be present
- All REQUIRED fields MUST have non-empty values (cannot be placeholders or "TBD")
- Framework references MUST be specific and verifiable
- Evidence references MUST point to existing artifacts

### 5.2 Traceability Validation
- Every mapped architecture component MUST exist in the repository
- Every evidence reference MUST be resolvable
- Bidirectional links MUST be consistent

### 5.3 Consistency Validation
- Control status MUST align with implementation percentage
- Risk assessment MUST be consistent with implementation status
- Compliance status MUST reflect actual implementation state

### 5.4 Audit Readiness Validation
- Evidence MUST be complete for controls marked as IMPLEMENTED
- Verification status MUST be VERIFIED for controls in production
- Review dates MUST not be in the past for active controls

---

## 6. Integration with Evidence Catalog

Control mappings MUST reference entries in the Evidence Catalog (see `EVIDENCE_CATALOG.schema.md`).

The relationship is:
- Control Mapping → Declares what must be controlled
- Evidence Catalog → Records proof that control is effective

---

## 7. Enforcement

### 7.1 Pre-Merge Requirements
- Control mappings MUST exist for all security-relevant architecture changes
- Control mappings MUST be updated when architecture changes affect control implementation
- Evidence references MUST remain valid (no broken links)

### 7.2 Audit Requirements
- Control mappings MUST be reviewed quarterly (or per compliance framework requirement)
- Any control marked NON_COMPLIANT MUST have documented remediation plan
- Audit findings MUST be recorded in change history

---

## 8. Relationship to Other Governance Artifacts

This schema supports:
- **COMPLIANCE_AND_STANDARDS_GOVERNANCE.md**: Implements traceability requirements
- **EVIDENCE_CATALOG.schema.md**: Provides control context for evidence
- **AUDIT_READINESS_MODEL.md**: Enables continuous audit posture
- **GOVERNANCE_COMPLETENESS_MODEL.md**: Satisfies compliance structural readiness

---

## 9. Non-Compliance Consequences

Failure to maintain control mappings in accordance with this schema constitutes:
- Compliance framework violation
- Audit readiness failure
- Governance completeness RED state
- Potential regulatory non-compliance

---

**End of CONTROL_MAPPING Schema**

---

**Document Metadata**:
- Schema ID: CONTROL_MAPPING_SCHEMA_V1
- Required By: GOVERNANCE_COMPLETENESS_MODEL.md Section 5.8
- Authority: Canonical Governance Specification
- Enforcement: Governance Gate + Governance Administrator
