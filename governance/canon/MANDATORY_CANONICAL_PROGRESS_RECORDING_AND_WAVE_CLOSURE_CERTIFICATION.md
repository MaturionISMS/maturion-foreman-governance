# MANDATORY CANONICAL PROGRESS RECORDING AND WAVE CLOSURE CERTIFICATION

## Status
**Type**: Canonical Governance Definition  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-01-04  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Precedence**: Subordinate to GOVERNANCE_PURPOSE_AND_SCOPE.md and BUILD_PHILOSOPHY.md  
**Applies To**: All Foreman Instances, All Wave Executions, All Application Repositories  
**Source Learning**: BOOTSTRAP_EXECUTION_LEARNINGS.md — BL-017

---

## 1. Purpose

This document formally establishes the constitutional requirement for **systematic, canonical progress recording during wave execution** and **evidence-based wave closure certification** within the Maturion ecosystem.

This governance exists to ensure that:
- Execution progress is always auditable
- Wave completion is certifiable from evidence, not assumption
- Artifact location and status are explicit and traceable
- Future waves can learn from clearly documented past execution
- One-Time Build integrity extends to execution transparency

This document establishes:
- What canonical progress recording is and why it is mandatory
- The canonical progress artifact requirement
- FM's non-delegable responsibility to maintain progress records
- Wave closure certification protocol based on evidence
- Artifact indexing requirements
- Reconstruction obligations when execution context degrades

---

## 2. Constitutional Mandate

This policy derives authority from and implements:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** — Governance as canonical memory, evidence-driven execution
- **BUILD_PHILOSOPHY.md** — One-Time Build Law, QA-as-Proof, Zero Test Debt
- **WAVE_MODEL.md** — Wave execution structure, completion criteria, quality guarantees
- **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md** — FM managerial authority, Control responsibilities
- **FM_ROLE_CANON.md** — FM role definition, evidence trail maintenance
- **AUDIT_READINESS_MODEL.md** — Audit trail completeness and evidence requirements
- **BOOTSTRAP_EXECUTION_LEARNINGS.md — BL-017** — Learning captured from Wave 1 execution

---

## 3. Core Principle: Progress is Evidence, Not Memory

### 3.1 Definition

**Canonical progress recording** means maintaining a single, authoritative, systematically updated artifact that documents:
- What work is in scope for the wave
- What phases have been completed (architecture, QA, build, validation)
- What artifacts have been created (name, path, status)
- What issues or corrections occurred during execution
- What the evidence-based wave completion verdict is

**Not canonical progress recording**:
- Progress discussions in chat/comments (ephemeral, not authoritative)
- Progress implied by PR history (fragmented, ambiguous)
- Progress held in agent memory (non-durable, inaccessible)
- Progress assumed from "looks done" (subjective, non-auditable)

---

### 3.2 Distinction from Other Evidence

| Evidence Type | Purpose | Authority | Scope |
|---------------|---------|-----------|-------|
| **Canonical Progress Record** | Document wave execution progress and certify completion | Authoritative | Entire wave |
| Architecture Documentation | Define system design before building | Authoritative | Per issue/feature |
| QA Test Suites | Prove correctness through evidence | Authoritative | Per issue/feature |
| PR Descriptions | Explain individual code changes | Supplementary | Per PR |
| Commit Messages | Describe atomic changes | Supplementary | Per commit |
| Issue Discussions | Clarify requirements and decisions | Contextual | Per issue |

**Canonical Progress Record is authoritative for wave-level execution state.**

---

### 3.3 Why This Matters

**Without canonical progress recording**:
- Wave completion assessment is subjective ("I think we're done")
- Artifact locations become ambiguous over time
- Progress reconstruction is manual, error-prone, and time-consuming
- Auditability degrades (cannot prove what was done when)
- Repeatability is impossible (future waves cannot learn from unclear history)

**With canonical progress recording**:
- Wave completion is certifiable ("Evidence shows all artifacts complete")
- Artifact locations are explicit (name → path → status index)
- Progress is always current and accessible
- Auditability is continuous (complete timeline and state record)
- Repeatability is possible (clear documentation for future waves)

**Canonical progress recording converts wave execution from implicit to explicit.**

---

## 4. Mandatory Canonical Progress Artifact

### 4.1 Canonical Rule

> **FM MUST maintain a canonical progress artifact for each wave execution.**

**Artifact Naming Convention**:
- Per-wave format: `WAVE_<n>_IMPLEMENTATION_PROGRESS.md`
- Example: `WAVE_1_IMPLEMENTATION_PROGRESS.md`, `WAVE_2_IMPLEMENTATION_PROGRESS.md`
- Alternative (multi-project): `<PROJECT>_WAVE_<n>_IMPLEMENTATION_PROGRESS.md`
  - PROJECT formatting: lowercase with hyphens (e.g., `fm-app`, `slot-master`)
  - Example: `fm-app_WAVE_1_IMPLEMENTATION_PROGRESS.md`, `slot-master_WAVE_2_IMPLEMENTATION_PROGRESS.md`

**Artifact Location**:
- Application repository root OR
- Application repository `/docs/` directory OR
- Application repository `/execution-progress/` directory
- Location MUST be consistent within a repository

**Artifact Authority**:
- The progress artifact is **authoritative** over all other progress sources
- In case of conflict: progress artifact > memory > PR history > chat context

---

### 4.2 Minimum Required Contents

The canonical progress artifact MUST contain:

#### 4.2.1 Wave Scope Definition
- Wave number and name
- Wave purpose (what this wave achieves)
- List of issues/features in scope
- Dependencies (what must exist before this wave)
- Success criteria (objective definition of "done")

#### 4.2.2 Phase-by-Phase Status
For each issue/feature in the wave:
- Phase status: `NOT_STARTED` | `IN_PROGRESS` | `COMPLETE` | `BLOCKED`
- Phases tracked:
  - Architecture (design complete, validated)
  - QA Creation (Red QA complete, failing as expected)
  - Build to Green (implementation complete, QA passes)
  - Validation (final checks, compliance verification)
  - Merge (PR merged to target branch)

#### 4.2.3 Artifact Index
Explicit tracking of all instructed artifacts:
- Artifact name (e.g., "User Authentication Component")
- Artifact path (e.g., `src/auth/authentication.ts`)
- Artifact status: `COMPLETE` | `IN_PROGRESS` | `MISSING` | `BLOCKED`
- Related PR (if applicable)
- Notes (any relevant context)

#### 4.2.4 Corrections and RCAs
Documentation of any deviations from expected execution:
- If progress was not properly recorded initially
- If artifacts were misplaced or renamed
- If execution context degraded (multiple PRs, time gaps)
- Root cause analysis for recording failures
- Corrective actions taken

#### 4.2.5 Explicit Wave Completion Verdict
Evidence-based determination of wave completion:
- **COMPLETE**: All issues merged, all artifacts indexed, cumulative QA passes, zero test debt
- **IN_PROGRESS**: Some work remaining, specific blockers identified
- **BLOCKED**: Cannot proceed, escalation required
- Supporting evidence for verdict (QA pass rates, merge status, artifact completeness)

---

### 4.3 Update Frequency

The progress artifact MUST be updated:
- **At phase transitions**: When any issue moves between phases
- **At artifact creation**: When any new artifact is created or delivered
- **At issue completion**: When any issue in the wave is fully merged
- **At correction events**: When progress recording gaps are discovered
- **At wave closure**: Final update with completion verdict and certification

**Minimum**: Updated at least once per issue phase transition.

**Prohibited**: Retroactive-only updates (updating only at wave end, not during execution).

---

## 5. Wave Closure Certification Protocol

### 5.1 Certification Requirement

> **Wave closure (gate merge) is BLOCKED until FM provides evidence-based wave completion certification.**

**Certification Means**:
- FM has reviewed the canonical progress artifact
- FM has verified all issues in scope are merged
- FM has verified all instructed artifacts exist at documented paths
- FM has verified cumulative QA passes (this wave + all previous waves = 100% GREEN)
- FM has verified zero test debt
- FM has produced an explicit completion verdict based on evidence

**Certification Output**:
- Updated progress artifact with `COMPLETE` verdict
- Supporting evidence (QA results, artifact index, merge status)
- Explicit statement: "Wave N closure certified based on evidence review"

---

### 5.2 Certification Process

**Step 1: Artifact Index Verification**
- Review all artifacts listed in progress artifact
- Verify each artifact exists at documented path
- Verify each artifact status is `COMPLETE`
- Identify any `MISSING` or `BLOCKED` artifacts
- **Outcome**: All artifacts accounted for OR blockers identified

**Step 2: Phase Status Verification**
- Review all issues in wave scope
- Verify each issue phase status is `COMPLETE` for all phases
- Identify any issues still `IN_PROGRESS` or `BLOCKED`
- **Outcome**: All issues complete OR blockers identified

**Step 3: QA and Compliance Verification**
- Run cumulative QA (this wave + all previous waves)
- Verify 100% pass rate (zero failures, zero warnings)
- Verify zero test debt (no skipped/stubbed/incomplete tests)
- Verify all governance gates passed
- **Outcome**: QA GREEN and compliant OR failures identified

**Step 4: Evidence-Based Verdict**
- If all verifications pass: Verdict = `COMPLETE`
- If any verification fails: Verdict = `IN_PROGRESS` or `BLOCKED`
- Document supporting evidence in progress artifact
- **Outcome**: Explicit verdict with evidence

**Step 5: Certification Statement**
- Update progress artifact with final verdict
- Add certification statement with timestamp
- Example: "Wave 1 closure certified on 2026-01-04 based on evidence review. All artifacts indexed, all QA GREEN, zero test debt."
- **Outcome**: Authoritative certification record

---

### 5.3 Blocking Authority

**Wave gate merge is BLOCKED when**:
- No canonical progress artifact exists
- Progress artifact missing required sections
- Artifact index incomplete (missing artifacts)
- Phase status shows incomplete work
- Cumulative QA not 100% GREEN
- Test debt exists
- Verdict is not `COMPLETE`

**FM MUST NOT proceed with gate merge until certification complete.**

Human authority (Johan) may override blocking, but override must be explicit and documented in progress artifact as follows:

**Override Documentation Requirements**:
- Override recorded in Section 8.2 (Certification Verdict) of progress artifact
- Must include:
  - **Override Authority**: Name of human authority granting override (e.g., "Johan Ras")
  - **Override Date**: Timestamp of override decision (ISO 8601 format: YYYY-MM-DD HH:MM)
  - **Override Reason**: Explicit justification for overriding certification requirements
  - **Override Scope**: What specific certification requirements are being waived
  - **Override Risk Acknowledgment**: Explicit acknowledgment of risks accepted
  - **Override Approval Signature**: Explicit approval statement (e.g., "Override approved by Johan Ras on 2026-01-04")

**Example Override Documentation**:
```
**Override Applied**:
- Override Authority: Johan Ras
- Override Date: 2026-01-04 14:30
- Override Reason: Critical production issue requires immediate deployment despite incomplete artifact index
- Override Scope: Artifact index completeness requirement waived for this wave only
- Override Risk Acknowledgment: Risk of incomplete documentation accepted; reconstruction required in next wave
- Override Approval: Override approved by Johan Ras on 2026-01-04
```

---

## 6. FM Progress Recording Responsibilities (Non-Delegable)

### 6.1 Core Obligation

**FM is the sole owner of canonical progress recording.**

FM MUST:
- Create canonical progress artifact at wave start
- Update progress artifact at all required intervals
- Maintain artifact index (name → path → status)
- Document corrections when progress recording gaps occur
- Certify wave closure based on evidence review
- Block wave gate merge if certification fails

FM MUST NOT:
- Delegate progress recording to builders
- Rely on memory or PR history as authoritative progress source
- Skip progress updates to save time
- Certify wave closure without evidence review
- Allow implicit wave completion

---

### 6.2 Reconstruction Obligation

**When execution context degrades** (multiple PRs, time gaps, unstable execution), **FM MUST reconstruct canonical progress from all available sources:**

**Reconstruction Process**:
1. **Gather Sources**: Review all PRs, issues, commits, chat/comments
2. **Extract Artifacts**: Identify all artifacts created during execution
3. **Build Index**: Map artifact name → path → status
4. **Document Phases**: Reconstruct phase status for all issues
5. **Identify Gaps**: Document what progress was not properly recorded
6. **Root Cause**: Analyze why progress recording degraded
7. **Correct**: Update canonical progress artifact with reconstructed state
8. **Certify**: Perform wave closure certification from corrected artifact

**Reconstruction is required before wave closure can be certified.**

**Reconstruction is not retroactive governance compliance (not a violation).** It is corrective action when execution context exceeds normal bounds.

---

### 6.3 Escalation Triggers

FM MUST escalate to human authority when:
- Cannot reconstruct progress from available sources
- Artifact index cannot be completed (artifacts missing/unlocatable)
- Cumulative QA fails and root cause unclear
- Governance conflict prevents certification
- Reconstruction reveals systemic execution process failure

---

## 7. Artifact Indexing Requirements

### 7.1 What Must Be Indexed

All artifacts **instructed by FM or created during wave execution** MUST be indexed:

**Code Artifacts**:
- Source files (components, modules, services, utilities)
- Test files (unit, integration, E2E, etc.)
- Configuration files (created or modified for wave features)
- Schema files (database, API, data structures)

**Documentation Artifacts**:
- Architecture documents (created for wave issues)
- API documentation (created for wave features)
- User documentation (created for wave features)

**Governance Artifacts** (if created during wave):
- QA test suites (Red QA for wave issues)
- Evidence documents (validation reports, compliance checks)

**Exclusions** (not indexed):
- Build artifacts (compiled output, dist folders)
- Node modules / dependencies (managed by package managers)
- Temporary files (logs, caches)

---

### 7.2 Index Format

**Minimum Index Columns**:
| Artifact Name | Artifact Path | Status | Related PR | Notes |
|---------------|---------------|--------|------------|-------|
| User Auth Component | `src/auth/authentication.ts` | COMPLETE | #123 | Initial implementation |
| Auth Unit Tests | `tests/unit/auth.test.ts` | COMPLETE | #123 | 15 tests, all GREEN |
| API Documentation | `docs/api/authentication.md` | COMPLETE | #124 | Reviewed and approved |

**Status Values**:
- `COMPLETE`: Artifact exists at path, validated, merged
- `IN_PROGRESS`: Artifact exists but not yet finalized
- `MISSING`: Artifact instructed but not yet created
- `BLOCKED`: Artifact cannot be completed due to blocker

---

### 7.3 Index Maintenance

**FM MUST**:
- Add artifact to index when instructed or created
- Update artifact status at phase transitions
- Verify artifact paths remain correct (handle renames/moves)
- Remove duplicates (if artifact path changed)
- Maintain index accuracy throughout wave execution

**Index accuracy is required for wave closure certification.**

---

## 8. Integration with Existing Governance

### 8.1 Wave Model Integration

This canon **extends** WAVE_MODEL.md by:
- Adding explicit progress recording requirement to wave lifecycle
- Adding wave closure certification as completion criterion
- Clarifying that "wave complete" requires evidence-based certification

**WAVE_MODEL.md Wave Completion Criteria** (updated implicitly by this canon):
1. All Issues Merged ✓
2. Cumulative QA Passes ✓
3. Zero Test Debt ✓
4. Governance Compliance ✓
5. Evidence Complete ✓
6. **Canonical Progress Recorded** ✓ (NEW)
7. **Wave Closure Certified** ✓ (NEW)

---

### 8.2 FM Authority Integration

This canon **extends** FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md by:
- Adding progress recording to Control (C) phase responsibilities (§4.4)
- Adding wave closure certification to Control validation
- Establishing reconstruction obligation as non-delegable FM responsibility

**Control Phase Responsibilities** (§4.4 extended):
- Quality Validation ✓
- Governance Enforcement ✓
- Evidence Trail Maintenance ✓
- **Canonical Progress Recording** ✓ (NEW)
- **Wave Closure Certification** ✓ (NEW)
- Performance Monitoring ✓
- Corrective Action ✓

---

### 8.3 FM Role Canon Integration

This canon **extends** FM_ROLE_CANON.md by:
- Adding progress recording as Core Responsibility (§6 Evidence Trail Maintenance)
- Adding wave closure certification as Core Responsibility
- Clarifying that progress artifact is authoritative over memory

**Evidence Trail Maintenance** (§6 extended):
- Document all architecture decisions ✓
- Document all QA creation ✓
- Document all build instructions ✓
- Document all validation results ✓
- **Maintain canonical progress artifact per wave** ✓ (NEW)
- **Certify wave closure based on evidence** ✓ (NEW)
- Provide evidence for audit and governance validation ✓

---

### 8.4 Audit Readiness Integration

This canon **aligns with** AUDIT_READINESS_MODEL.md by:
- Ensuring wave execution is fully auditable
- Providing explicit artifact index for audit trail
- Enabling evidence-based verification of wave completion
- Maintaining continuous documentation (not retroactive)

---

## 9. Template and Schema Requirements

### 9.1 Mandatory Template

A canonical template MUST be provided to ensure consistency:

**Template Location**: `governance/templates/WAVE_IMPLEMENTATION_PROGRESS.template.md`

**Template Purpose**:
- Define standard structure for progress artifacts
- Ensure all required sections present
- Provide guidance for FM on progress recording
- Enable automated validation of progress artifacts

---

### 9.2 Mandatory Schema

A validation schema MUST be provided to ensure completeness:

**Schema Location**: `governance/schemas/WAVE_IMPLEMENTATION_PROGRESS.schema.md`

**Schema Purpose**:
- Define required fields and structure
- Enable automated completeness checks
- Validate artifact index format
- Verify certification evidence present

---

## 10. Prohibited Behaviors

FM MUST NOT:

### 10.1 Progress Recording Violations
- Skip progress artifact creation at wave start
- Update progress artifact only at wave end (retroactive-only)
- Rely on memory or PR history as authoritative progress
- Delegate progress recording to builders or other agents
- Use placeholder or incomplete artifact indexes

### 10.2 Certification Violations
- Certify wave closure without evidence review
- Certify wave closure with incomplete artifact index
- Certify wave closure with failing QA or test debt
- Proceed with gate merge without certification
- Bypass certification requirements to meet deadlines

### 10.3 Reconstruction Violations
- Refuse to reconstruct progress when context degrades
- Declare wave complete without reconstruction when needed
- Skip root cause analysis for progress recording gaps
- Allow silent recurrence of progress recording failures

---

## 11. Enforcement and Validation

### 11.1 PR Gate Integration

PR gates for wave gate merges MUST validate:
- Canonical progress artifact exists
- Progress artifact contains all required sections
- Artifact index is complete (no `MISSING` artifacts)
- Wave completion verdict is `COMPLETE`
- Certification statement present with timestamp

**Gate blocks merge when**: Any validation fails.

---

### 11.2 Governance Administrator Validation

Governance Administrator MAY review:
- Progress artifact completeness
- Artifact index accuracy
- Certification evidence quality
- Compliance with template/schema

**Review is advisory, not blocking** (FM certification is authoritative).

---

### 11.3 Watchdog Observation

Watchdog MAY observe:
- Progress recording frequency
- Certification process followed
- Reconstruction quality when needed

**Watchdog escalates governance violations, does not substitute for FM certification.**

---

## 12. Lessons Learned and Rationale

### 12.1 Why This Governance Is Necessary

**Historical Context** (BL-017):
During Wave 1 execution, wave closure certification could not be completed because:
- Progress was distributed across multiple PRs
- Artifact locations were ambiguous
- Completion assessment relied on memory
- No single authoritative progress record existed

This revealed a governance gap: **Progress recording was implicit, not constitutionally mandated.**

---

### 12.2 What This Prevents

**Future Failures Prevented**:
- Wave closure declared without evidence (subjective completion)
- Artifact index gaps (cannot locate instructed artifacts)
- Progress reconstruction failures (execution context too degraded)
- Auditability gaps (cannot prove what was done when)
- Repeatability failures (future waves cannot learn from unclear history)

---

### 12.3 What This Enables

**Governance Improvements Enabled**:
- Evidence-based wave closure certification
- Continuous auditability (not retroactive)
- Explicit artifact indexing (name → path → status)
- Systematic progress recording (per phase, per artifact)
- Clear FM responsibility (progress recording is non-delegable)

**One-Time Build Integrity Extended**: Not just "build correctly once," but "document execution continuously."

---

## 13. Evolution and Continuous Improvement

### 13.1 Learning Feedback Loop

If progress recording failures occur despite this governance:
1. FM records failure in wave progress artifact
2. FM performs root cause analysis
3. FM escalates to Governance Administrator if governance gap found
4. Governance Administrator proposes canon update
5. Human authority approves governance change
6. Updated canon version-controlled and synchronized

---

### 13.2 Prohibited Evolution

FM MUST NOT:
- Modify this canon directly
- Weaken progress recording requirements to save time
- Skip certification to meet deadlines
- Self-approve changes to progress recording obligations

**Canonical Control**: All governance evolution is controlled and versioned.

---

## 14. Precedence and Final Authority

This document has canonical authority over wave progress recording and closure certification.

If any FM behavior, execution process, or wave completion assessment conflicts with this document, this document prevails.

This canon is subordinate to:
1. Johan Ras (human final authority)
2. GOVERNANCE_PURPOSE_AND_SCOPE.md (supreme governance authority)
3. BUILD_PHILOSOPHY.md (quality and build standards)

This canon is superior to:
- All execution processes (wave execution must comply)
- All FM implementation decisions (progress recording is mandatory)
- All non-canonical progress tracking methods

---

## 15. Authority Hierarchy (Canonical Precedence)

If conflict exists, higher authority prevails:

1. **Johan Ras (Human Owner / Final Authority)** — Supreme
2. **GOVERNANCE_PURPOSE_AND_SCOPE.md** — Constitutional foundation
3. **BUILD_PHILOSOPHY.md** — One-Time Build Law and quality standards
4. **This Document** — Progress recording and certification requirements
5. **WAVE_MODEL.md** — Wave execution structure and completion criteria
6. **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md** — FM managerial authority
7. **FM Execution Decisions** — Operational decisions within delegated authority

**Resolution Principle**: If FM skips progress recording, this canon requires correction. If wave closure attempted without certification, this canon blocks gate merge.

---

**End of MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md**
