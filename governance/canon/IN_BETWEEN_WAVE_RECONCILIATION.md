# IN-BETWEEN WAVE RECONCILIATION (IBWR)

## Status
**Type**: Canonical Governance Definition  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-01-04  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Precedence**: Subordinate to GOVERNANCE_PURPOSE_AND_SCOPE.md and BUILD_PHILOSOPHY.md  
**Applies To**: All Wave Executions, All Application Repositories  
**Related Canon**: MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md, WAVE_MODEL.md

---

## 1. Purpose

This document formally establishes **In-Between Wave Reconciliation (IBWR)** as a mandatory execution step that occurs **after a wave gate PASS and before authorization of the next wave**.

IBWR exists to ensure that:
- Execution failures do not propagate into subsequent waves
- Governance gaps revealed by execution are corrected before next execution
- Ripple effects are applied systematically across governance, FM, and builders
- Learning from execution is promoted to governance canon
- Each wave improves governance for the next wave

This document establishes:
- What IBWR is and when it occurs
- Required inputs and outputs for IBWR
- FM and Governance Administrator responsibilities
- Ripple propagation requirements
- Blocking authority (next wave cannot start without IBWR completion)

---

## 2. Constitutional Mandate

This policy derives authority from and implements:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** — Governance as canonical memory, continuous improvement
- **BUILD_PHILOSOPHY.md** — One-Time Build Law, learning without regression
- **WAVE_MODEL.md** — Wave execution structure, completion criteria, progression rules
- **MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md** — Wave closure certification
- **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md** — FM managerial authority, learning obligations
- **LEARNING_INTAKE_AND_PROMOTION_MODEL.md** — Learning promotion to governance canon
- **BOOTSTRAP_EXECUTION_LEARNINGS.md** — Bootstrap learnings model

---

## 3. Core Principle: Reconciliation Before Progression

### 3.1 Definition

**In-Between Wave Reconciliation (IBWR)** is a mandatory governance step that occurs in the transition period between wave completion and next-wave authorization.

**IBWR Purpose**:
- Reconcile what was planned vs. what actually happened
- Identify governance gaps, near-misses, and execution stress points
- Correct governance deficiencies before they affect next wave
- Propagate learnings systematically (governance → FM → builders)
- Ensure next wave starts with improved governance

**Not IBWR**:
- IBWR is not wave execution (execution happens during wave)
- IBWR is not wave closure certification (certification happens at wave end)
- IBWR is not retrospective fix-up (it's forward-looking governance improvement)

---

### 3.2 When IBWR Occurs

**Canonical Sequence**:
```
Wave N Execution → Wave N Validation → Wave N Closure Certification → Wave N Gate PASS
    ↓
In-Between Wave Reconciliation (IBWR) for Wave N
    ↓
Next-Wave Authorization (Wave N+1 may begin)
```

**Timing**:
- IBWR begins immediately after wave gate PASS
- IBWR must complete before Wave N+1 planning/execution begins
- IBWR duration: variable (depends on governance changes required)

**Blocking Authority**:
> **No wave may begin unless the previous wave's IBWR is complete and rippled.**

---

### 3.3 IBWR vs. Wave Closure Certification

| Aspect | Wave Closure Certification | IBWR |
|--------|---------------------------|------|
| **When** | Before wave gate merge | After wave gate PASS |
| **Purpose** | Certify wave completion based on evidence | Reconcile execution, improve governance |
| **Owner** | FM | FM + Governance Administrator |
| **Inputs** | Progress artifact, QA results, artifact index | Wave completion artifacts, learnings, FL/CI records |
| **Outputs** | Certification verdict | Reconciliation report, governance updates, ripple plan |
| **Blocking** | Blocks wave gate merge | Blocks next wave authorization |

**Complementary, Not Redundant**:
- Certification ensures **this wave is complete**
- IBWR ensures **next wave will be better governed**

---

## 4. Required Inputs (Authoritative)

IBWR SHALL consume the following inputs:

### 4.1 Wave Completion Artifacts
- Canonical progress artifact (`WAVE_<n>_IMPLEMENTATION_PROGRESS.md`)
- Wave closure certification verdict
- Final QA results (wave-specific and cumulative)
- Evidence trail (architecture docs, build instructions, validation results)

### 4.2 Bootstrap Learnings Generated During Wave
- New bootstrap learnings identified during wave execution
- Near-misses (problems almost occurred but were avoided)
- Execution stress points (where governance was stretched or ambiguous)
- Workarounds or manual interventions required

### 4.3 FL/CI Records (Failure/Continuous Improvement)
- Failures that occurred (QA failures, build failures, governance violations)
- Recoveries (how failures were resolved)
- Rework required (how many iterations to green)
- Patterns (recurring issues, systemic gaps)

### 4.4 Governance Deviations or Undocumented Assumptions
- Cases where governance was unclear or ambiguous
- Cases where FM or builders had to interpret governance
- Cases where governance conflicts occurred
- Cases where governance gaps required escalation

---

## 5. Required Outputs (MANDATORY)

IBWR MUST produce the following outputs:

### 5.1 Wave Reconciliation Report

**Required Structure**:

#### What Went Wrong
- Failures that occurred during wave execution
- Root causes (governance gaps, execution issues, tooling problems)
- Impact on wave timeline or quality
- Resolution actions taken

#### What Almost Went Wrong
- Near-misses (problems that were narrowly avoided)
- Stress points (where governance was stretched)
- Manual interventions required
- Workarounds implemented

#### What Worked by Luck vs. by Design
- Successes that relied on implicit knowledge (not documented governance)
- Successes that relied on manual intervention (not automated enforcement)
- Successes that worked only because of specific agent behavior (not guaranteed by governance)
- Successes that were guaranteed by governance (repeatable, reliable)

**Deliverable**: `WAVE_<n>_RECONCILIATION_REPORT.md` in application repository

---

### 5.2 Corrective Governance Actions

**Classification Decision**:

For each governance gap or learning identified, classify as:

1. **Tier-0 (Constitutional)**: Fundamental governance principle requiring canonical update
2. **Tier-1 (Policy/Procedure)**: Execution policy or procedure requiring update
3. **Bootstrap Learning (BL-XXX)**: Execution learning to be recorded in BOOTSTRAP_EXECUTION_LEARNINGS.md
4. **No Action**: Observation noted but no governance change required

**Governance Updates**:
- List of governance canon documents to be created or updated
- List of policy documents to be updated
- List of bootstrap learnings to be added
- Rationale for each classification decision

**Deliverable**: Governance change proposals and updates implemented in governance repository

---

### 5.3 Ripple Layer-Down Plan

**Ripple Propagation Requirements**:

IBWR must define how governance changes propagate:

1. **Governance → FM Contract**
   - What FM agent contract sections must be updated
   - What new FM responsibilities are established
   - What FM prohibitions are added

2. **FM Contract → Builder Contracts**
   - What builder contract sections must be updated
   - What new builder obligations are established
   - What builder prohibitions are added

3. **Builder Instruction Updates**
   - What "Build to Green" instruction templates must be updated
   - What new acceptance criteria are added
   - What new evidence requirements are established

**Ripple Verification**:
- Checklist of all documents updated
- Verification that updates are consistent
- Cross-references between governance layers

**Deliverable**: Ripple completion checklist with evidence of updates

---

### 5.4 Next-Wave Safeguards

**Explicit Improvements for Wave N+1**:

#### What Must Be Different in the Next Wave
- New governance requirements that apply starting Wave N+1
- New FM behaviors required
- New builder obligations

#### What Is Now Prohibited
- Behaviors that caused failures in Wave N
- Workarounds that were required but are now governed against
- Ambiguities that are now explicitly resolved

#### What Is Now Mandatory
- New evidence requirements
- New validation steps
- New escalation triggers

**Deliverable**: Next-wave safeguards checklist integrated into Wave N+1 planning

---

## 6. IBWR Completion Criteria

IBWR is **NOT COMPLETE** until:

### 6.1 All Outputs Produced
- [ ] Wave Reconciliation Report generated
- [ ] Corrective governance actions classified and documented
- [ ] Governance changes written (canon updates, policy updates, BL entries)
- [ ] Ripple layer-down plan created
- [ ] Next-wave safeguards documented

### 6.2 Governance Changes Implemented
- [ ] Governance canon updated (if Tier-0 changes)
- [ ] Policy/procedure documents updated (if Tier-1 changes)
- [ ] Bootstrap learnings added (if BL-XXX classifications)
- [ ] Changes committed and merged to governance repository

### 6.3 Ripple Propagation Verified
- [ ] FM agent contract updated (if impacted)
- [ ] Builder contracts/instructions updated (if impacted)
- [ ] Template updates completed (if impacted)
- [ ] Cross-references validated
- [ ] Ripple propagation checklist complete

### 6.4 Next-Wave Safeguards Integrated
- [ ] Wave N+1 planning incorporates safeguards
- [ ] Wave N+1 cannot violate new prohibitions
- [ ] Wave N+1 will satisfy new mandatory requirements

**Blocking Rule**:
> **Failure to ripple corrections SHALL block next-wave authorization.**

---

## 7. Roles and Responsibilities

### 7.1 FM Responsibilities

**FM Owns Execution Reconciliation**:
- Generate Wave Reconciliation Report
- Identify governance gaps and execution learnings
- Classify learnings (Tier-0, Tier-1, Bootstrap Learning)
- Document near-misses and stress points
- Propose corrective governance actions

**FM Executes Layer-Down**:
- Update FM-owned agent contracts
- Update builder instruction templates
- Verify ripple propagation to FM and builder contracts
- Integrate next-wave safeguards into Wave N+1 planning

**FM Cannot**:
- Approve governance canon changes (Governance Administrator and human authority do)
- Self-certify IBWR completion (human authority validates)
- Skip IBWR to accelerate next wave

---

### 7.2 Governance Administrator Responsibilities

**Governance Administrator Owns Governance Analysis**:
- Review FM's proposed corrective actions
- Validate classification decisions (Tier-0 vs. Tier-1 vs. BL)
- Draft governance canon updates (if required)
- Ensure governance changes are consistent with existing canon
- Maintain governance completeness and integrity

**Governance Administrator Validates Ripple**:
- Verify ripple layer-down plan is complete
- Validate that all impacted documents are updated
- Ensure cross-references are correct
- Confirm no governance conflicts introduced

**Governance Administrator Cannot**:
- Execute application-level layer-down (FM does)
- Approve own governance changes (human authority does)
- Skip governance updates to accelerate next wave

---

### 7.3 Human Authority (Johan) Responsibilities

**Bootstrap Mode (Current)**:
- Review and authorize IBWR completion
- Approve governance canon changes
- Verify ripple propagation is complete
- Authorize next-wave start

**Post-Bootstrap Mode (Future)**:
- IBWR becomes automated
- Human authority intervenes only for exceptions
- Governance workflows enforce IBWR automatically

---

### 7.4 Builder Responsibilities

**Builders Do NOT Participate Directly in IBWR**:
- IBWR is governance and FM-level reconciliation
- Builders receive updated contracts/instructions as output of IBWR
- Builders do not propose governance changes during IBWR
- Builders' execution learnings are captured by FM

---

## 8. IBWR Process Flow

### 8.1 Step-by-Step Process

**Step 1: Wave Gate PASS**
- Wave N closure certified
- Wave N gate merge approved
- Wave N officially complete

**Step 2: IBWR Initiation**
- FM initiates IBWR immediately after gate PASS
- FM gathers all required inputs (completion artifacts, learnings, FL/CI records)

**Step 3: Reconciliation Analysis**
- FM generates Wave Reconciliation Report
- FM identifies governance gaps and execution learnings
- FM classifies learnings (Tier-0, Tier-1, Bootstrap Learning)

**Step 4: Corrective Actions**
- FM proposes governance changes
- Governance Administrator reviews and drafts updates
- Human authority approves governance changes (bootstrap mode)
- Governance changes committed to governance repository

**Step 5: Ripple Layer-Down**
- FM updates FM agent contracts
- FM updates builder contracts/instructions
- Governance Administrator validates ripple completeness
- Ripple propagation checklist completed

**Step 6: Next-Wave Safeguards**
- FM documents safeguards for Wave N+1
- FM integrates safeguards into Wave N+1 planning
- Wave N+1 cannot proceed without safeguards

**Step 7: IBWR Completion Verification**
- Human authority (bootstrap mode) reviews IBWR outputs
- All completion criteria verified
- IBWR marked COMPLETE

**Step 8: Next-Wave Authorization**
- Wave N+1 authorized to begin
- Wave N+1 planning incorporates IBWR safeguards
- Wave N+1 execution starts with improved governance

---

### 8.2 IBWR Duration

**Typical Duration**:
- Minimum: 1 day (if no governance changes required)
- Typical: 2-3 days (if governance updates and ripple required)
- Maximum: 1 week (if major governance canon changes required)

**IBWR Is NOT a Bottleneck**:
- IBWR prevents governance debt accumulation
- IBWR prevents failure propagation
- IBWR improves next wave quality
- Time invested in IBWR reduces future rework

---

## 9. Bootstrap vs. Automated Mode

### 9.1 Bootstrap Mode (Current)

**Characteristics**:
- Human (Johan) intervenes to authorize and verify
- Governance agent performs analysis and drafting
- FM executes layer-down
- Manual verification of ripple completion
- IBWR completion requires explicit human approval

**Bootstrap Mode Duration**:
- Applies during Wave 0, Wave 1, Wave 2 (initial waves)
- Transitions to automated mode when governance is stable

---

### 9.2 Post-Bootstrap Mode (Future)

**Characteristics**:
- IBWR becomes automated workflow
- Ripple propagation enforced by governance automation
- Next wave cannot start without IBWR PASS (CI gate)
- Human authority intervenes only for exceptions

**Transition Criteria**:
- Governance canon is stable (few updates per wave)
- IBWR process is well-understood and repeatable
- Automated validation tools exist
- FM and Governance Administrator roles are established

---

## 10. Integration with Existing Governance

### 10.1 Wave Model Integration

This canon **extends** WAVE_MODEL.md by adding a new phase:

**Updated Wave Lifecycle**:
1. Wave Planning
2. Wave Execution
3. Wave Validation
4. Wave Completion
5. **In-Between Wave Reconciliation (IBWR)** ← NEW
6. Next-Wave Authorization

**Wave Progression Rule (Updated)**:
> Waves execute in order (0 → 1 → 2 → 3 → ...). Each wave must complete IBWR before the next wave begins.

---

### 10.2 Progress Recording Integration

This canon **complements** MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md:

- Progress recording ensures **this wave is documented**
- IBWR ensures **next wave is governed better**

**Inputs Flow**:
```
Progress Artifact (from Progress Recording) → IBWR Input
Wave Closure Certification → IBWR Input
IBWR Outputs → Next Wave Planning
```

---

### 10.3 Learning Promotion Integration

This canon **implements** LEARNING_INTAKE_AND_PROMOTION_MODEL.md:

- IBWR is the systematic mechanism for promoting execution learnings
- IBWR classifies learnings (Tier-0, Tier-1, Bootstrap Learning)
- IBWR ensures learnings are canonized, not lost

---

## 11. IBWR Deliverables Template

### 11.1 Wave Reconciliation Report

**Location**: Application repository root or `/docs/`  
**Naming**: `WAVE_<n>_RECONCILIATION_REPORT.md`

**Required Sections**:
1. Executive Summary
2. What Went Wrong (failures, root causes, resolutions)
3. What Almost Went Wrong (near-misses, stress points)
4. What Worked by Luck vs. by Design
5. Governance Gaps Identified
6. Corrective Actions Proposed
7. Classification Decisions (Tier-0, Tier-1, BL)
8. Ripple Layer-Down Plan
9. Next-Wave Safeguards
10. IBWR Completion Checklist

**Template**: `governance/templates/WAVE_RECONCILIATION_REPORT.template.md` (to be created)

---

### 11.2 Ripple Propagation Checklist

**Required Items**:
- [ ] Governance canon updated (list documents)
- [ ] Policy/procedure documents updated (list documents)
- [ ] Bootstrap learnings added (list BL-XXX entries)
- [ ] FM agent contract updated (list sections)
- [ ] Builder contracts updated (list contracts)
- [ ] Builder instruction templates updated (list templates)
- [ ] Cross-references validated
- [ ] All changes committed and merged

---

## 12. Prohibited Behaviors

### 12.1 FM MUST NOT
- Skip IBWR to accelerate next wave
- Self-certify IBWR completion without human authority (bootstrap mode)
- Classify governance changes incorrectly to avoid canon updates
- Skip ripple propagation to save time
- Proceed to Wave N+1 planning before IBWR complete

### 12.2 Governance Administrator MUST NOT
- Skip governance analysis to accelerate IBWR
- Approve governance changes without review
- Allow incomplete ripple propagation
- Weaken governance to enable faster IBWR

### 12.3 Human Authority MUST NOT
- Authorize next wave without IBWR completion (bootstrap mode)
- Skip IBWR verification to meet deadlines
- Override IBWR blocking without explicit risk acknowledgment

---

## 13. Escalation and Exceptions

### 13.1 When to Escalate During IBWR

FM MUST escalate to human authority when:
- Major governance canon changes required (Tier-0)
- Governance conflicts discovered during reconciliation
- Ripple propagation reveals systemic issues
- IBWR timeline exceeds expected duration
- Cannot complete IBWR due to missing information

---

### 13.2 IBWR Override (Emergency Only)

**Override Authority**: Johan (human authority) only

**Override Conditions**:
- Critical production issue requires immediate next wave
- IBWR delay unacceptable for business reasons
- Explicit risk acknowledgment documented

**Override Requirements**:
- Document override reason in Wave Reconciliation Report
- Document risks accepted
- Document deferred IBWR tasks
- Schedule makeup IBWR within 1 week
- Next wave proceeds at risk

**Override is NOT routine**. IBWR exists to prevent failure propagation. Overrides weaken governance.

---

## 14. Audit and Accountability

### 14.1 IBWR Evidence Requirements

**FM MUST Maintain**:
- Complete Wave Reconciliation Report
- List of governance changes proposed and implemented
- Ripple propagation checklist with evidence
- IBWR completion verification (human authority approval in bootstrap mode)

**Governance Administrator MUST Maintain**:
- Governance change proposals and reviews
- Classification decision rationale
- Ripple validation evidence

**Auditability**:
- IBWR artifacts must be traceable
- Governance changes must reference IBWR that triggered them
- Next-wave planning must reference IBWR safeguards

---

### 14.2 IBWR Success Metrics

**Target Metrics**:
- IBWR completion rate: 100% (no skipped IBWRs)
- IBWR duration: < 3 days average
- Governance changes per IBWR: 1-3 (indicates stable governance)
- Next-wave failure reduction: measurable improvement

**Failure Indicators**:
- IBWR skipped or incomplete
- Governance changes not rippled
- Same failure recurs in next wave (IBWR ineffective)
- IBWR duration exceeds 1 week consistently

---

## 15. Lessons Learned and Rationale

### 15.1 Why IBWR Is Necessary

**Historical Context**:
During Wave 1 execution, governance gaps were discovered but not systematically corrected before Wave 2 planning. This created risk of failure propagation.

**IBWR Prevents**:
- Silent governance gaps accumulating
- Failures recurring across waves
- Governance changes being ad-hoc or inconsistent
- Next wave starting with known governance weaknesses

**IBWR Enables**:
- Systematic governance improvement
- Evidence-based governance evolution
- Predictable governance stability
- Continuous learning without regression

---

### 15.2 IBWR vs. Retrospectives

**IBWR Is NOT a Retrospective**:
- Retrospectives are team reflections (social/process)
- IBWR is governance reconciliation (constitutional/technical)

**IBWR Is Constitutional**:
- IBWR is mandatory (retrospectives are optional)
- IBWR produces governance changes (retrospectives produce action items)
- IBWR blocks next wave (retrospectives do not)

---

## 16. Evolution and Continuous Improvement

### 16.1 IBWR Process Evolution

IBWR itself may evolve based on experience:
- IBWR template may be refined
- IBWR duration may be optimized
- IBWR automation may be introduced

**Meta-IBWR**:
After several waves, conduct meta-IBWR:
- Review IBWR effectiveness across multiple waves
- Identify IBWR process improvements
- Update IBWR canon based on learnings

---

### 16.2 Transition to Automated IBWR

**Future State**:
- Automated governance change proposals
- Automated ripple propagation validation
- Automated next-wave safeguard integration
- CI gates enforce IBWR completion

**Transition Path**:
- Bootstrap mode (manual, human-verified)
- Semi-automated mode (tooling assists, human approves)
- Fully automated mode (CI enforces, human oversees)

---

## 17. Precedence and Final Authority

This document has canonical authority over wave-to-wave transitions.

If any wave progression, next-wave authorization, or execution process conflicts with this document, this document prevails.

This canon is subordinate to:
1. Johan Ras (human final authority)
2. GOVERNANCE_PURPOSE_AND_SCOPE.md (supreme governance authority)
3. BUILD_PHILOSOPHY.md (quality and build standards)

This canon is superior to:
- All wave execution processes (must comply with IBWR)
- All FM decisions (IBWR is mandatory, not optional)
- All automation (IBWR cannot be skipped)

---

## 18. Authority Hierarchy (Canonical Precedence)

If conflict exists, higher authority prevails:

1. **Johan Ras (Human Owner / Final Authority)** — Supreme
2. **GOVERNANCE_PURPOSE_AND_SCOPE.md** — Constitutional foundation
3. **BUILD_PHILOSOPHY.md** — One-Time Build Law and quality standards
4. **This Document (IN_BETWEEN_WAVE_RECONCILIATION.md)** — Wave transition requirements
5. **WAVE_MODEL.md** — Wave execution structure (extended by this canon)
6. **MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md** — Complementary
7. **FM Execution Decisions** — Operational decisions within delegated authority

**Resolution Principle**: If FM attempts to skip IBWR, this canon blocks next-wave authorization. If IBWR outputs are incomplete, this canon blocks next-wave authorization.

---

**End of IN_BETWEEN_WAVE_RECONCILIATION.md**
