# EVIDENCE CATALOG SCHEMA

## Status
Canonical Governance Specification  
Version: v1  
Authority: Governance Administrator  
Required By: GOVERNANCE_COMPLETENESS_MODEL.md Section 5.8

---

## 1. Purpose

This document defines the normative schema for **Evidence Catalog** artifacts required for ISO 27001, ISO 31000, and NIST CSF compliance.

The Evidence Catalog is the centralized registry of all compliance evidence, audit artifacts, and verification records. It enables:
- Continuous audit readiness
- Evidence traceability
- Compliance verification
- Audit trail maintenance

An evidence catalog artifact is valid only if it conforms to this schema.

---

## 2. Evidence Catalog Location

Evidence catalogs MUST be stored in application repositories at:

```
compliance/evidence/EVIDENCE_CATALOG.md
```

Individual evidence artifacts are stored in:

```
compliance/evidence/<category>/<evidence-id>.md
```

Example structure:
```
compliance/
├── evidence/
│   ├── EVIDENCE_CATALOG.md          # Master catalog (this schema)
│   ├── architecture/                # Architecture evidence
│   ├── testing/                     # Test results and QA evidence
│   ├── security/                    # Security assessments
│   ├── policies/                    # Policy documentation
│   └── audits/                      # Audit reports and findings
```

---

## 3. Core Invariants

1. **All compliance evidence MUST be cataloged** - No uncataloged evidence
2. **Evidence MUST be immutable** - Once created, evidence cannot be modified (only superseded)
3. **Evidence MUST have unique identifiers** - No duplicate evidence IDs
4. **Evidence MUST be traceable to controls** - Every evidence entry links to control mappings
5. **Evidence MUST include verification metadata** - Who, when, how was evidence verified

---

## 4. Required Schema Structure

### 4.1 Catalog Header (REQUIRED)

```markdown
# Evidence Catalog

**Repository**: [Repository name]  
**Catalog Version**: [Version number]  
**Last Updated**: [ISO 8601 timestamp]  
**Maintained By**: [Role/Agent responsible]  
**Audit Status**: [READY | NOT_READY | IN_PROGRESS]
```

### 4.2 Evidence Summary (REQUIRED)

```markdown
## Evidence Summary

**Total Evidence Items**: [Count]  
**Evidence Categories**: [Count]  
**Verified Evidence**: [Count]  
**Pending Verification**: [Count]  
**Oldest Evidence**: [Date]  
**Newest Evidence**: [Date]

**Completeness Status**: [COMPLETE | INCOMPLETE]
**Audit Readiness**: [GREEN | AMBER | RED]
```

### 4.3 Evidence Registry (REQUIRED)

```markdown
## Evidence Registry

| Evidence ID | Category | Type | Related Controls | Created Date | Verified Date | Status | Location |
|------------|----------|------|------------------|--------------|---------------|--------|----------|
| [EVD-YYYY-NNN] | [Category] | [Type] | [Control IDs] | [ISO 8601] | [ISO 8601] | [Status] | [Path] |
```

**Required Fields**:
- **Evidence ID**: Unique identifier (format: EVD-YYYY-NNNN where YYYY is year, NNNN is sequence)
- **Category**: Evidence category (see Section 4.4)
- **Type**: Evidence type (see Section 4.5)
- **Related Controls**: Comma-separated control IDs this evidence supports
- **Created Date**: When evidence was generated (ISO 8601)
- **Verified Date**: When evidence was last verified (ISO 8601)
- **Status**: Current status (see Section 4.6)
- **Location**: Relative path to evidence artifact

---

### 4.4 Evidence Categories (NORMATIVE)

```markdown
## Evidence Categories

**Mandatory Categories**:
1. **Architecture** - Architecture decisions, design documents, diagrams
2. **Testing** - Test results, QA reports, coverage reports
3. **Security** - Security assessments, vulnerability scans, penetration tests
4. **Policies** - Policy documents, procedures, standards
5. **Audits** - Audit reports, findings, remediation evidence
6. **Access Control** - Access logs, authentication records, authorization policies
7. **Change Management** - Change records, approval evidence, deployment logs
8. **Incident Response** - Incident reports, response actions, lessons learned
9. **Training** - Training records, competency assessments
10. **Monitoring** - System logs, monitoring data, alerting evidence
```

### 4.5 Evidence Types (NORMATIVE)

```markdown
## Evidence Types

**Technical Evidence**:
- Source Code
- Configuration Files
- Test Results
- Log Files
- System Outputs
- Scan Results

**Documentary Evidence**:
- Architecture Documents
- Design Specifications
- Policy Documents
- Procedure Documents
- Risk Assessments
- Audit Reports

**Procedural Evidence**:
- Meeting Minutes
- Decision Records
- Approval Records
- Review Records
- Training Records
- Incident Reports
```

### 4.6 Evidence Status Values (NORMATIVE)

```markdown
## Evidence Status Values

- **VERIFIED**: Evidence has been verified and is current
- **UNVERIFIED**: Evidence exists but not yet verified
- **PENDING**: Evidence collection in progress
- **EXPIRED**: Evidence is outdated and needs renewal
- **SUPERSEDED**: Evidence replaced by newer evidence
- **ARCHIVED**: Evidence retained for historical purposes only
```

---

## 5. Individual Evidence Artifact Schema

Each evidence artifact referenced in the catalog MUST conform to this structure:

### 5.1 Evidence Artifact Template

```markdown
# Evidence: [Evidence ID] - [Brief Title]

## Metadata

**Evidence ID**: [EVD-YYYY-NNNN]  
**Category**: [Category from Section 4.4]  
**Type**: [Type from Section 4.5]  
**Created Date**: [ISO 8601 timestamp]  
**Created By**: [Person/Agent/System]  
**Verified Date**: [ISO 8601 timestamp]  
**Verified By**: [Person/Agent]  
**Status**: [Status from Section 4.6]

## Related Controls

| Control Framework | Control ID | Control Name | Relationship |
|------------------|------------|--------------|--------------|
| [Framework] | [ID] | [Name] | [Primary | Supporting | Related] |

**Control Mapping References**: [Links to CONTROL_MAPPING artifacts]

## Evidence Description

[Clear description of what this evidence demonstrates]

**Purpose**: [Why this evidence is collected]  
**Scope**: [What is covered by this evidence]  
**Limitations**: [What this evidence does NOT prove]

## Evidence Content

[The actual evidence - may be embedded or referenced]

**Format**: [Markdown | JSON | Log | Screenshot | Document]  
**Source**: [Where evidence originated]  
**Collection Method**: [How evidence was collected]

## Verification

**Verification Method**: [How to verify this evidence]  
**Verification Result**: [PASS | FAIL | INCONCLUSIVE]  
**Verifier**: [Who/what verified]  
**Verification Notes**: [Any relevant notes]

## Validity Period

**Valid From**: [ISO 8601 timestamp]  
**Valid Until**: [ISO 8601 timestamp or "Indefinite"]  
**Renewal Required**: [YES | NO]  
**Renewal Frequency**: [Quarterly | Annually | etc.]

## Audit Trail

| Date | Action | Performed By | Notes |
|------|--------|--------------|-------|
| [ISO 8601] | [Action] | [Person/Agent] | [Notes] |

## Cross-References

**Related Evidence**: [Links to related evidence artifacts]  
**Dependencies**: [Evidence this depends on]  
**Supersedes**: [Previous evidence ID, if any]  
**Superseded By**: [Newer evidence ID, if any]
```

---

## 6. Validation Rules

### 6.1 Catalog Validation
- Evidence Catalog MUST exist at canonical location
- All evidence in registry MUST have unique IDs
- All evidence IDs MUST follow format: EVD-YYYY-NNNN
- All evidence paths MUST be resolvable
- Summary counts MUST match registry entries

### 6.2 Evidence Artifact Validation
- All REQUIRED sections MUST be present
- Evidence ID MUST match catalog entry
- Related controls MUST reference valid control mappings
- Verification metadata MUST be complete for VERIFIED status
- Expired evidence MUST have renewal plan or be superseded

### 6.3 Traceability Validation
- Every evidence artifact MUST be referenced in catalog
- Every control mapping MUST reference supporting evidence
- Evidence chains MUST be complete (no broken references)

### 6.4 Temporal Validation
- Created dates MUST not be in the future
- Verified dates MUST not precede created dates
- Validity periods MUST be logical (start before end)
- Expired evidence MUST be renewed or archived

---

## 7. Evidence Lifecycle Management

### 7.1 Evidence Creation
1. Generate evidence artifact
2. Assign unique Evidence ID
3. Complete all required metadata
4. Add to Evidence Catalog registry
5. Link to relevant control mappings
6. Commit to version control

### 7.2 Evidence Verification
1. Review evidence content
2. Validate against control requirements
3. Record verification result
4. Update verification metadata
5. Update catalog status

### 7.3 Evidence Renewal
1. Check validity period
2. Generate new evidence if expired
3. Link to previous evidence (Supersedes)
4. Update previous evidence (Superseded By)
5. Update catalog with new entry

### 7.4 Evidence Archival
1. Mark status as ARCHIVED
2. Record archival reason
3. Retain for audit trail
4. Remove from active compliance verification

---

## 8. Integration with Control Mappings

Evidence Catalog entries MUST integrate with Control Mappings:

**Control Mapping → Evidence Catalog**:
- Control mappings reference evidence IDs
- Evidence catalog provides evidence artifacts
- Bidirectional traceability maintained

**Evidence Validation Flow**:
1. Control requires evidence
2. Control mapping references evidence ID
3. Evidence catalog locates evidence artifact
4. Evidence artifact provides verification proof
5. Control compliance verified

---

## 9. Audit Support

The Evidence Catalog directly supports audit activities:

### 9.1 Audit Preparation
- Evidence Catalog provides complete evidence inventory
- All evidence organized by category and control
- Verification status clearly indicated
- Evidence readily accessible

### 9.2 Audit Execution
- Auditors reference Evidence Catalog for evidence location
- Evidence artifacts contain all verification metadata
- Audit trail built into evidence structure
- Evidence immutability ensures integrity

### 9.3 Audit Follow-Up
- Findings recorded in evidence catalog
- Remediation evidence added to catalog
- Evidence supersession tracks corrections
- Continuous improvement documented

---

## 10. Relationship to Other Governance Artifacts

This schema supports:
- **CONTROL_MAPPING.schema.md**: Provides evidence for controls
- **COMPLIANCE_AND_STANDARDS_GOVERNANCE.md**: Implements evidence requirements
- **AUDIT_READINESS_MODEL.md**: Enables audit readiness
- **GOVERNANCE_COMPLETENESS_MODEL.md**: Satisfies compliance structural readiness
- **QA_POLICY_MASTER.md**: Provides QA evidence artifacts

---

## 11. Enforcement

### 11.1 Pre-Merge Requirements
- Evidence Catalog MUST exist for repositories requiring compliance
- New compliance-relevant changes MUST generate evidence artifacts
- Evidence artifacts MUST be cataloged before merge
- Evidence MUST reference correct control mappings

### 11.2 Continuous Requirements
- Evidence Catalog MUST be maintained as canonical memory
- Expired evidence MUST be renewed or superseded
- Evidence verification MUST occur per defined frequency
- Catalog completeness MUST remain GREEN

---

## 12. Non-Compliance Consequences

Failure to maintain Evidence Catalog in accordance with this schema constitutes:
- Compliance framework violation
- Audit readiness failure (RED status)
- Governance completeness RED state
- Potential regulatory non-compliance
- Failed audit likelihood

---

**End of EVIDENCE_CATALOG Schema**

---

**Document Metadata**:
- Schema ID: EVIDENCE_CATALOG_SCHEMA_V1
- Required By: GOVERNANCE_COMPLETENESS_MODEL.md Section 5.8
- Authority: Canonical Governance Specification
- Enforcement: Governance Gate + Governance Administrator
- Integration: CONTROL_MAPPING.schema.md, AUDIT_READINESS_MODEL.md
