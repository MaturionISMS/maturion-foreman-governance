# TARP: Second-Time Failure Response Plan Template

## Document Type
**Trigger Action Response Plan (TARP)**  
**Classification**: EMERGENCY  
**Status**: TEMPLATE - Use for all second-time failure emergencies

---

## Purpose

This template provides a structured response framework for second-time failures (repeated occurrences of the same failure pattern after the first occurrence was documented and corrected).

**Key Principle**: First-time failures are CATASTROPHIC but expected learning opportunities. Second-time failures are EMERGENCIES requiring immediate, structured response.

---

## TARP Activation Criteria

TARP is activated when:
- The same failure class occurs after a Bootstrap Learning (BL) or FL/CI entry was created
- The same failure class occurs after structural prevention was implemented
- The failure pattern is identical or substantially similar to a previously documented failure

**Authority**: Any of the following may activate TARP:
- Foreman (FM)
- Governance Administrator
- Owner (Johan)
- Builder (when detecting second-time pattern)

---

## TARP Response Structure

### Phase 1: IMMEDIATE STOP (0-2 hours)

**Actions**:
1. ✅ **Halt ALL related execution immediately**
   - Stop all work items exhibiting the failure pattern
   - Block all authorizations for related work
   - Prevent any new instances from starting

2. ✅ **Declare EMERGENCY status**
   - Create EMERGENCY FL/CI registry entry
   - Tag as "SECOND-TIME FAILURE"
   - Reference original BL/FL/CI entry

3. ✅ **Notify stakeholders**
   - Owner (Johan)
   - Foreman (FM)
   - Affected builders
   - Governance Administrator

**Evidence Required**:
- STOP confirmation timestamp
- EMERGENCY declaration document
- Stakeholder notification records

---

### Phase 2: EMERGENCY ASSESSMENT (2-8 hours)

**Questions to Answer**:

1. **What is the failure pattern?**
   - Describe the second-time failure
   - Reference the original (first-time) failure
   - Identify all affected work items/artifacts

2. **Why did the first prevention fail?**
   - Was the original BL/FL/CI entry complete?
   - Was forward-scan performed after first occurrence?
   - Were structural changes implemented?
   - Were structural changes adequate?
   - Was automation/gating implemented?
   - Did automation/gating execute?
   - Why didn't prevention mechanisms catch this?

3. **What is the scope of impact?**
   - How many work items are affected?
   - Is this isolated or widespread?
   - What is the timeline of occurrences?
   - Are there additional instances not yet discovered?

**Evidence Required**:
- Root cause analysis document
- Original BL/FL/CI entry review
- Prevention mechanism audit
- Impact assessment report

---

### Phase 3: RAPID CORRECTIVE ACTIONS (8-24 hours)

**Mandatory Actions**:

1. ✅ **Comprehensive Forward-Scan**
   - Scan ALL in-scope work (not just affected items)
   - Use automated tools if available
   - Document all instances requiring correction
   - Prioritize corrections by impact

2. ✅ **Structural Fixes**
   - Fix ALL identified instances
   - Do NOT proceed with partial corrections
   - Verify each fix individually
   - Document evidence of each fix

3. ✅ **Automation Implementation/Strengthening**
   - If automation exists: Identify why it failed, fix automation
   - If automation missing: Implement automated validation/gating
   - Test automation against known failure cases
   - Verify automation blocks second-time pattern

4. ✅ **Governance Canon Update**
   - Update relevant governance documents
   - Strengthen prevention requirements
   - Add explicit prohibitions
   - Document TARP as example

**Evidence Required**:
- Forward-scan results (complete list)
- Fix verification for each instance
- Automation implementation/fix evidence
- Governance canon update records

---

### Phase 4: SYSTEM-LEVEL CHANGE VERIFICATION (24-48 hours)

**Verification Requirements**:

1. ✅ **Structural Prevention Verified**
   - Can the same failure class be **automatically prevented**?
   - Is prevention mechanism **tested and proven**?
   - Is prevention mechanism **mandatory (not optional)**?

2. ✅ **Forward-Scan Completeness Verified**
   - Were ALL in-scope items scanned?
   - Were ALL instances corrected?
   - Is there evidence of complete coverage?

3. ✅ **Automation Verified**
   - Does automated validation/gating exist?
   - Has automation been tested?
   - Does automation block the failure pattern?
   - Is automation mandatory (cannot be bypassed)?

4. ✅ **Governance Canon Updated**
   - Are new/strengthened requirements documented?
   - Are prohibitions explicit?
   - Is TARP execution documented as example?

**Evidence Required**:
- Prevention mechanism test results
- Forward-scan completeness proof
- Automation test results
- Governance canon version update

---

### Phase 5: RESUMPTION APPROVAL (48+ hours)

**Approval Criteria**:

ALL of the following must be TRUE:
- ✅ Phase 1 complete (STOP executed)
- ✅ Phase 2 complete (Emergency assessment done)
- ✅ Phase 3 complete (Corrective actions done)
- ✅ Phase 4 complete (System-level change verified)
- ✅ TARP completion report created
- ✅ Evidence bundle archived
- ✅ Owner approval obtained (if applicable)

**Approval Authority**:
- Foreman (FM) — if technical/process change
- Owner (Johan) — if governance/constitutional change

**Resumption Actions**:
1. Document TARP completion
2. Archive all evidence
3. Update FL/CI registry (EMERGENCY → RESOLVED)
4. Authorize resumption of affected work
5. Monitor for third occurrence (should be impossible)

**Evidence Required**:
- TARP completion report
- Evidence bundle archive
- Approval signature
- Resumption authorization

---

## TARP Completion Report Format

### 1. Executive Summary
- **Failure Pattern**: [Description]
- **First Occurrence**: [BL/FL/CI reference]
- **Second Occurrence**: [Date, scope, impact]
- **TARP Activation**: [Date, authority]
- **TARP Duration**: [Start → completion time]
- **Resumption Status**: [APPROVED / PENDING]

### 2. Root Cause Analysis
- **Why did first prevention fail?**: [Analysis]
- **What was missing?**: [Gap identification]
- **Why wasn't it caught?**: [Enforcement gap]

### 3. Corrective Actions Taken
- **Forward-Scan**: [Results, scope, corrections]
- **Structural Fixes**: [List of fixes with evidence]
- **Automation**: [Implementation/strengthening]
- **Governance Canon**: [Updates made]

### 4. System-Level Changes
- **Structural Prevention**: [What prevents third occurrence]
- **Automation**: [How automation blocks pattern]
- **Governance Updates**: [New/strengthened requirements]

### 5. Evidence Archive
- **Forward-Scan Results**: [Location]
- **Fix Verification**: [Location]
- **Automation Tests**: [Location]
- **Governance Updates**: [Version/commit]

### 6. Resumption Approval
- **Approved By**: [Name, role]
- **Approval Date**: [Date]
- **Conditions**: [Any conditions for resumption]

---

## Example: BL-019 TARP (FM App Wave 2)

### Phase 1: IMMEDIATE STOP
- **Date**: 2026-01-05
- **Action**: Wave 2 execution SUSPENDED
- **Affected**: Subwaves 2.3 to 2.14 (all pending subwaves)
- **Authority**: api-builder rejection + FM confirmation

### Phase 2: EMERGENCY ASSESSMENT
- **Failure Pattern**: QA Catalog semantic misalignment (same as BL-018)
- **First Occurrence**: BL-018 (Subwave 2.2, same day)
- **Second Occurrence**: Subwave 2.3 (same day)
- **Root Cause**: FM failed to perform forward-scan after BL-018
- **Scope**: 9 of 14 Wave 2 subwaves affected (64%)

### Phase 3: RAPID CORRECTIVE ACTIONS
- **Forward-Scan**: All 14 Wave 2 subwaves analyzed
- **Fixes**: 9 subwaves requiring QA Catalog extension and spec regeneration
- **Automation**: Created `validate-wave2-qa-alignment.py` (tested, working, exit 1 = blocking)
- **Governance**: BL-019 FL/CI entry created, ratchet established

### Phase 4: SYSTEM-LEVEL CHANGE VERIFICATION
- **Structural Prevention**: QA-CATALOG-ALIGNMENT-GATE mandatory before ANY authorization
- **Automation**: Validation script blocks misalignments (exit 1)
- **Governance Canon**: 
  - ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md updated (§3.14)
  - LEARNING_INTAKE_AND_PROMOTION_MODEL.md updated (§6.3 forward-scan obligation)
  - BUILD_PHILOSOPHY.md updated (second-time failure prohibition)
  - QA_CATALOG_ALIGNMENT_GATE_CANON.md created

### Phase 5: RESUMPTION APPROVAL
- **Status**: PENDING completion of 9 subwave corrections
- **Timeline**: 8-12 days for full correction
- **Approval Authority**: FM (after corrections) → Owner (after governance canonization)

---

## Integration with Governance Canon

**This template is referenced by**:
- `BUILD_PHILOSOPHY.md` — Second-Time Failure Prohibition
- `LEARNING_INTAKE_AND_PROMOTION_MODEL.md` § 6.1 — TARP activation for repeated failures
- `QA_CATALOG_ALIGNMENT_GATE_CANON.md` — TARP activation for second-time QA misalignments

**This template applies to**:
- All second-time failures (any failure class)
- All emergency-level governance violations
- Any situation where first prevention failed

---

## Key Principles

1. **Speed Matters**: TARP is structured for rapid response (0-48 hours for most actions)
2. **Completeness Matters**: Forward-scan must be comprehensive, not reactive
3. **Evidence Matters**: All phases require documented evidence
4. **System-Level Change Matters**: Fixes must be structural, not cosmetic
5. **Prevention Matters**: Third occurrence must be impossible by design

**TARP exists to convert emergencies into permanent system improvements.**

---

**Template Version**: 1.0  
**Date**: 2026-01-05  
**Status**: Canonical Template  
**Authority**: Maturion Engineering Leadership (Johan)  
**Next Review**: After first non-BL-019 TARP activation

---

**Document Metadata**:
- Template ID: TARP_SECOND_TIME_FAILURE_V1.0
- Authority: Canonical Governance Template
- Required By: BUILD_PHILOSOPHY.md, LEARNING_INTAKE_AND_PROMOTION_MODEL.md
- Usage: All second-time failure emergencies
- Integration: FL/CI registry, governance canon updates, wave execution protocols
