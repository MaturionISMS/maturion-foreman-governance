# Wave Implementation Progress Schema

**Version**: 1.0.0  
**Authority**: MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md  
**Purpose**: Define validation requirements for canonical wave progress artifacts  
**Applies To**: All `WAVE_<n>_IMPLEMENTATION_PROGRESS.md` artifacts

---

## 1. Schema Purpose

This schema defines the **required structure and content** for canonical wave progress artifacts, enabling:
- Automated completeness validation
- Consistency across all wave executions
- Evidence-based wave closure certification
- Auditability and compliance verification

---

## 2. Required Document Metadata

### 2.1 Header Block

**Required Fields**:
```markdown
**Wave Number**: [Integer]
**Wave Name**: [String]
**Project**: [String]
**Status**: [Enum: NOT_STARTED | IN_PROGRESS | COMPLETE | BLOCKED]
**Start Date**: [YYYY-MM-DD]
**Last Updated**: [YYYY-MM-DD]
**Foreman**: [String]
```

**Validation Rules**:
- `Wave Number`: Must be non-negative integer
- `Wave Name`: Must be non-empty string
- `Project`: Must be non-empty string
- `Status`: Must be one of the enumerated values
- `Start Date`: Must be valid ISO 8601 date (YYYY-MM-DD)
- `Last Updated`: Must be valid ISO 8601 date ≥ Start Date
- `Foreman`: Must be non-empty string

---

## 3. Required Sections

### 3.1 Section 1: Wave Scope Definition

**Required Subsections**:
- `1.1 Wave Purpose`
- `1.2 Issues in Scope`
- `1.3 Dependencies`
- `1.4 Success Criteria`

**Validation Rules**:

#### 1.1 Wave Purpose
- Must contain at least 1 sentence describing wave objectives
- Must be non-empty

#### 1.2 Issues in Scope
- Must contain table with columns: `Issue #`, `Title`, `Priority`, `Status`
- Must have at least 1 issue listed
- `Issue #`: Must be valid issue reference (e.g., #123)
- `Priority`: Must be `HIGH`, `MED`, or `LOW`
- `Status`: Must be `NOT_STARTED`, `IN_PROGRESS`, `COMPLETE`, or `BLOCKED`
- Summary counts (`Total Issues`, `Complete`, `In Progress`, `Blocked`) must sum correctly

#### 1.3 Dependencies
- Must list prerequisites with MET/NOT_MET status
- May have 0 dependencies (but section must exist)
- Each dependency must have status indicator

#### 1.4 Success Criteria
- Must contain checklist with at least 5 items (minimum governance-required criteria)
- Required criteria:
  - [ ] All issues in scope merged to target branch
  - [ ] All instructed artifacts created and indexed
  - [ ] Cumulative QA passes (this wave + all previous waves = 100% GREEN)
  - [ ] Zero test debt
  - [ ] All governance gates passed
  - [ ] Evidence trail complete
  - [ ] Wave closure certified based on evidence

---

### 3.2 Section 2: Phase-by-Phase Status

**Required Content**:
- Must have one subsection per issue listed in Section 1.2
- Each issue subsection must contain:
  - Status indicator
  - Priority
  - Phase status table
  - Key artifacts table
  - Blockers (if applicable)

**Phase Status Table Validation**:
- Must have 5 phases: Architecture, QA Creation (Red QA), Build to Green, Validation, Merge
- Each phase must have: `Status`, `Date`, `Notes` columns
- `Status`: Must be `NOT_STARTED`, `IN_PROGRESS`, `COMPLETE`, or `BLOCKED`
- `Date`: Must be valid ISO 8601 date or empty (if not started)

**Key Artifacts Table Validation**:
- Must have columns: `Artifact`, `Path`, `Status`
- May have 0 artifacts initially, but must be populated when artifacts are created
- `Status`: Must be `COMPLETE`, `IN_PROGRESS`, `MISSING`, or `BLOCKED`

---

### 3.3 Section 3: Artifact Index

**Required Subsections**:
- `3.1 Code Artifacts`
- `3.2 Documentation Artifacts`
- `3.3 Governance/QA Artifacts`

**Validation Rules**:

#### Common Table Structure
Each subsection must contain:
- Table with columns: `Artifact Name`, `Artifact Path`, `Status`, `Related Issue`, `Related PR`, `Notes`
- Summary counts: `Total [Type] Artifacts`, `Complete`, `In Progress`, `Missing`

#### Artifact Path Validation
- `Artifact Path`: Must be valid relative path (e.g., `src/component.ts`)
- Path format: Must use forward slashes `/`
- Path must not start with `/` (relative, not absolute)

#### Status Validation
- `Status`: Must be `COMPLETE`, `IN_PROGRESS`, `MISSING`, or `BLOCKED`
- For wave closure certification: All artifacts must be `COMPLETE`, none can be `MISSING`

#### Related Issue/PR Validation
- Must reference valid issue/PR numbers (e.g., #123)
- May be empty if not applicable

---

### 3.4 Section 4: Execution Timeline

**Required Content**:
- Table with columns: `Date`, `Event`, `Details`
- Must have at least one entry (wave start event)
- Must be in chronological order (earliest to latest)

**Validation Rules**:
- `Date`: Must be valid ISO 8601 date (YYYY-MM-DD)
- `Event`: Must be non-empty string
- Timeline must span from wave start to latest update
- Key events must be present:
  - Wave Started
  - [For each completed issue] Architecture Complete, Red QA Complete, Build to Green Complete, Merged

---

### 3.5 Section 5: QA and Compliance Status

**Required Subsections**:
- `5.1 Wave QA Summary`
- `5.2 Test Debt Status`
- `5.3 Governance Gate Status`

**Validation Rules**:

#### 5.1 Wave QA Summary
- Must report: `Total Tests Created`, `Tests Passing`, `Tests Failing`, `Test Coverage`, `Status`
- Must report cumulative QA: `Total Tests`, `Tests Passing`, `Tests Failing`, `Status`
- `Status`: Must be `ALL_GREEN`, `SOME_RED`, `ALL_RED`, or `NOT_RUN`
- For wave closure: Both wave and cumulative QA must be `ALL_GREEN`

#### 5.2 Test Debt Status
- Must contain checklist:
  - [ ] Zero test debt confirmed
  - [ ] No skipped tests
  - [ ] No stubbed tests
  - [ ] No incomplete test infrastructure
- `Test Debt Count`: Must be `0` for wave closure certification
- `Status`: Must be `COMPLIANT` or `NON_COMPLIANT`
- For wave closure: Must be `COMPLIANT`

#### 5.3 Governance Gate Status
- Must contain table with columns: `Gate`, `Status`, `Notes`
- Required gates:
  - Architecture Approved
  - QA-to-Red Validated
  - Build-to-Green Achieved
  - Cumulative QA GREEN
  - Zero Test Debt
  - Governance Compliance
- `Status`: Must be `PASS`, `FAIL`, or `NOT_RUN`
- `All Gates Pass`: Must be `YES` or `NO`
- For wave closure: All gates must be `PASS`, `All Gates Pass` must be `YES`

---

### 3.6 Section 6: Corrections and Root Cause Analysis

**Required Subsections**:
- `6.1 Progress Recording Gaps`
- `6.2 Execution Context Degradation`
- `6.3 Artifact Location Changes`

**Validation Rules**:
- Sections may be empty (no gaps/degradation/changes) but must exist
- If gaps exist: Must contain table with `Date`, `Gap Description`, `Root Cause`, `Corrective Action`, `Status`
- If context degradation exists: Must document events and resolutions
- If artifact relocations exist: Must contain table with `Original Path`, `New Path`, `Reason`, `Date`

---

### 3.7 Section 7: Blockers and Escalations

**Required Subsections**:
- `7.1 Current Blockers`
- `7.2 Escalations`

**Validation Rules**:
- Sections may be empty (no blockers/escalations) but must exist
- If blockers exist: Must contain table with `Blocker ID`, `Description`, `Impact`, `Owner`, `Resolution Plan`, `Status`
- If escalations exist: Must contain table with `Date`, `Issue`, `Escalated To`, `Resolution`, `Status`

---

### 3.8 Section 8: Wave Completion Certification (CRITICAL)

**Required Subsections**:
- `8.1 Certification Checklist`
- `8.2 Certification Verdict`

**Validation Rules**:

#### 8.1 Certification Checklist
- Must contain 4 verification categories:
  - Artifact Index Verification (5+ items)
  - Phase Status Verification (3+ items)
  - QA and Compliance Verification (4+ items)
  - Evidence Verification (4+ items)
- All items must be checkboxes
- For wave closure: All items must be checked

#### 8.2 Certification Verdict
- **Status**: Must be `COMPLETE`, `IN_PROGRESS`, or `BLOCKED`
- **Evidence-Based Verdict**: Must be non-empty paragraph providing explicit determination
- **Certification Statement**: Must be present if Status is `COMPLETE`
- Certification Statement format: 
  > Wave [N] closure certified on [YYYY-MM-DD] based on evidence review. [Evidence summary].

**Evidence Summary Requirements**:
The evidence summary MUST include at minimum:
- Artifact completeness statement (e.g., "All 25 artifacts indexed")
- QA status (e.g., "QA 100% GREEN with 150 tests passing")
- Test debt confirmation (e.g., "zero test debt confirmed")
- Governance gate status (e.g., "all governance requirements met")

**Example Adequate Evidence Summary**:
"All 25 artifacts indexed and verified complete, cumulative QA is 100% GREEN (150 tests passing, 0 failures), zero test debt confirmed, all 6 governance gates passed."
- **Certified By**: Must be non-empty string
- **Certification Date**: Must be valid ISO 8601 date
- **Supporting Evidence**: Must list or link to evidence sources

**For Wave Closure Certification**:
- Status MUST be `COMPLETE`
- Certification Statement MUST be present
- Certification Date MUST be within reasonable time of Last Updated date
- All certification checklist items MUST be checked

---

### 3.9 Section 9: Post-Wave Learnings

**Required Subsections**:
- `9.1 What Worked Well`
- `9.2 What Could Be Improved`
- `9.3 Recommendations for Future Waves`

**Validation Rules**:
- Each subsection must have at least 1 item OR explicit statement "None identified"
- Items should be actionable and specific

---

### 3.10 Section 10: References

**Required Content**:
- Must list governance canon references
- Must link to related artifacts
- Must include template version and authority

**Validation Rules**:
- Governance canon references: At least 3 documents listed
- Related artifacts: May be empty if no artifacts yet
- Template version: Must match current template version (1.0.0)
- Template authority: Must reference correct governance canon

---

## 4. Validation Levels

### 4.1 Level 1: Structural Completeness

**Validates**:
- All required sections present
- All required subsections present
- Section numbering correct

**Result**: `COMPLETE` | `INCOMPLETE`

---

### 4.2 Level 2: Content Completeness

**Validates**:
- All required fields populated (non-empty)
- All required tables present with correct columns
- All required checklists present

**Result**: `COMPLETE` | `INCOMPLETE`

---

### 4.3 Level 3: Data Validity

**Validates**:
- Dates are valid ISO 8601 format
- Status values are valid enums
- Counts and summaries are mathematically correct
- References are valid (issue numbers, PR numbers, paths)

**Result**: `VALID` | `INVALID`

---

### 4.4 Level 4: Wave Closure Certification

**Validates**:
- All artifacts indexed and `COMPLETE`
- All phases `COMPLETE` for all issues
- Cumulative QA is `ALL_GREEN`
- Test debt is `0` and `COMPLIANT`
- All governance gates `PASS`
- Certification checklist all checked
- Certification verdict is `COMPLETE`
- Certification statement present

**Result**: `CERTIFIED` | `NOT_CERTIFIED`

**Usage**: This level MUST pass before wave gate merge is allowed.

---

## 5. Validation Automation

### 5.1 Automated Validation Support

This schema is designed to support automated validation via:
- Markdown linters
- Custom validation scripts
- PR gate checks
- CI/CD pipeline validation

**Recommended Validation Points**:
- On progress artifact creation (Level 1, 2)
- On progress artifact updates (Level 1, 2, 3)
- On wave gate merge request (ALL LEVELS including Level 4)

---

### 5.2 Manual Validation Fallback

If automated validation is not available:
- FM MUST manually verify all validation levels
- FM MUST document manual validation in certification section
- Governance Administrator MAY spot-check for compliance

---

## 6. Schema Evolution

### 6.1 Versioning

- Schema version follows template version
- Schema changes require governance canon update
- Breaking changes require major version increment
- Non-breaking additions require minor version increment

**Current Version**: 1.0.0

---

### 6.2 Backward Compatibility

- New validation rules apply only to new progress artifacts
- Existing progress artifacts retain their original schema version
- Validation scripts MUST check schema version before applying rules

---

## 7. Compliance and Enforcement

### 7.1 Required Compliance

**FM MUST**:
- Create progress artifacts using current template version
- Validate progress artifacts against current schema
- Block wave gate merge if Level 4 validation fails

**Governance Administrator MAY**:
- Audit progress artifacts for schema compliance
- Report schema violations to FM
- Propose schema improvements based on observed gaps

**Watchdog MAY**:
- Observe schema compliance during wave execution
- Escalate systematic schema violations

---

### 7.2 Non-Compliance Consequences

**If progress artifact does not meet schema**:
- FM MUST correct artifact before wave closure
- Wave gate merge BLOCKED until compliance achieved
- Non-compliance recorded in Section 6 (Corrections and RCA)

**Systemic non-compliance**:
- Escalate to Governance Administrator
- May trigger governance canon review
- May indicate tooling/automation gaps

---

## 8. Schema Validation Checklist

Use this checklist to validate a progress artifact:

### Structural Completeness
- [ ] Header block present with all required fields
- [ ] Section 1 (Wave Scope Definition) present with all subsections
- [ ] Section 2 (Phase-by-Phase Status) present with subsection per issue
- [ ] Section 3 (Artifact Index) present with all 3 subsections
- [ ] Section 4 (Execution Timeline) present
- [ ] Section 5 (QA and Compliance Status) present with all subsections
- [ ] Section 6 (Corrections and RCA) present with all subsections
- [ ] Section 7 (Blockers and Escalations) present with both subsections
- [ ] Section 8 (Wave Completion Certification) present with both subsections
- [ ] Section 9 (Post-Wave Learnings) present with all subsections
- [ ] Section 10 (References) present

### Content Completeness
- [ ] All required fields populated (non-empty where required)
- [ ] All required tables present with correct column headers
- [ ] All required checklists present
- [ ] Issue count matches number of issue subsections

### Data Validity
- [ ] All dates in valid ISO 8601 format (YYYY-MM-DD)
- [ ] All status enums use valid values
- [ ] Summary counts mathematically correct
- [ ] Issue/PR references valid format
- [ ] Artifact paths valid relative paths

### Wave Closure Certification (if claiming COMPLETE)
- [ ] All artifacts indexed and status is `COMPLETE`
- [ ] All issue phases status is `COMPLETE`
- [ ] Wave QA status is `ALL_GREEN`
- [ ] Cumulative QA status is `ALL_GREEN`
- [ ] Test debt count is `0`, status is `COMPLIANT`
- [ ] All governance gates status is `PASS`
- [ ] Certification checklist all items checked
- [ ] Certification verdict status is `COMPLETE`
- [ ] Certification statement present with date

---

## 9. References

**Governance Canon**:
- MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md (Authority)
- WAVE_MODEL.md
- FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md
- FM_ROLE_CANON.md

**Related Templates**:
- governance/templates/WAVE_IMPLEMENTATION_PROGRESS.template.md

**Version**: 1.0.0  
**Created**: 2026-01-04  
**Authority**: governance/canon/MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md
