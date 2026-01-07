# Zero-Warning/Test-Debt Policy - Governance Canon Gap Analysis

## Status
**Type**: Governance Gap Analysis Report  
**Authority**: Governance Administrator  
**Date**: 2026-01-07  
**Related Issue**: Align Governance Canon: Zero-Warning/Test-Debt Policy and Ripple Enforcement

---

## Executive Summary

This report documents the results of a comprehensive governance canon scan to identify gaps and ambiguities regarding the doctrine of **"Zero warnings and zero test debt – all must be immediately remedied before downstream work proceeds."**

### Key Findings

1. **Partial Coverage**: The zero-warning doctrine exists in QA_POLICY_MASTER.md but is not consistently referenced across enforcement documents
2. **Missing Blocker Protocol**: No explicit protocol exists for handling warnings/test-debt discovered from prior work/waves
3. **Agent Responsibility Gaps**: Agent contracts do not explicitly state obligations when discovering warnings from previous jobs
4. **Escalation Ambiguity**: ESCALATION_POLICY.md does not include warning discovery as an escalation trigger
5. **Handover Gap**: BUILDER_QA_HANDOVER_POLICY.md references zero warnings but lacks remediation protocol for prior-work warnings
6. **FM Pre-Auth Gap**: FM_PREAUTH_CHECKLIST_CANON.md lacks warning status validation

---

## 1. Current State Assessment

### 1.1 Documents WITH Warning/Test-Debt Coverage

#### QA_POLICY_MASTER.md (PRIMARY SOURCE)
**Location**: `governance/policy/QA_POLICY_MASTER.md`

**Current Coverage**:
- Line 104: "Zero warnings (unless explicitly whitelisted)" as part of Gate-Eligible Green
- Line 177: "Suppressing warnings without proper justification" as prohibited test dodging
- Lines 713-730: Section 3.2.2 "Warning Whitelisting (Governed)" - Explicit whitelist mechanism
- Line 826: "Zero errors and zero warnings (or whitelisted)" as evidence requirement

**Strengths**:
- Clear definition of zero-warning requirement
- Governed exception mechanism (warning whitelist)
- Explicit prohibition of warning suppression
- Integration with Gate-Eligible Green concept

**Gaps**:
- No protocol for warnings discovered from **prior work**
- No explicit agent responsibility when discovering warnings from previous jobs/waves/subwaves
- No blocker protocol requiring original agent re-assignment
- No escalation trigger for warning discovery
- No forward-scan requirement after warning discovery

---

#### BUILDER_QA_HANDOVER_POLICY.md
**Location**: `governance/policy/BUILDER_QA_HANDOVER_POLICY.md`

**Current Coverage**:
- Section 4.1: References "Zero test debt" in pre-conditions
- Section 5.1: References "test debt" in SUMMARY.md requirements
- Integration with QA_POLICY_MASTER.md zero-test-debt mandate

**Strengths**:
- Explicit handover pre-condition referencing zero test debt
- Integration with Gate-Eligible Green

**Gaps**:
- Does not address warnings specifically (only "test debt")
- No protocol for builder discovering warnings from prior work
- No escalation requirement when warnings discovered
- No blocker protocol for prior-agent re-assignment

---

### 1.2 Documents WITHOUT Explicit Warning Coverage

#### FM_PREAUTH_CHECKLIST_CANON.md
**Gap**: No checklist item for warning status validation before authorization

**Impact**: FM may authorize work even if previous jobs left warnings unresolved

**Required Addition**: Checklist item validating "Zero unresolved warnings from prior work"

---

#### ESCALATION_POLICY.md
**Gap**: Warning discovery not listed as escalation trigger

**Impact**: Agents may not escalate when discovering warnings from prior work

**Required Addition**: 
- Add "Warning/test-debt discovery from prior work" as reactive escalation trigger
- Require blocker report and original agent re-assignment

---

#### PR_GATE_FAILURE_HANDLING_PROTOCOL.md
**Gap**: No failure classification for "Unresolved warnings" or "Test debt from prior work"

**Impact**: Gate failures due to warnings lack structured handling

**Required Addition**: New failure classification "UNRESOLVED_WARNINGS" with responsibility assignment

---

#### FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md
**Gap**: No explicit FM responsibility to verify zero-warning status before proceeding

**Impact**: FM may proceed with downstream work despite unresolved warnings

**Required Addition**: Add to FM planning/authorization responsibilities

---

#### Agent Contracts (General)
**Gap**: No explicit obligation to report and escalate warning discoveries

**Impact**: Agents may silently observe warnings without triggering remediation

**Required Addition**: Standard agent contract language for warning discovery escalation

---

## 2. Identified Ambiguities

### 2.1 "Warnings from Prior Work" Definition

**Ambiguity**: What constitutes "prior work"?
- Prior subwave within same wave?
- Prior wave?
- Prior job by same builder?
- Prior job by different builder?

**Required Clarification**: Define scope explicitly in canon updates

---

### 2.2 "Immediately Remedied" Definition

**Ambiguity**: What does "immediately" mean?
- Before continuing current task?
- Before authorization of next task?
- Before wave closure?
- Within specific time window?

**Required Clarification**: Define temporal boundaries and blocker semantics

---

### 2.3 Agent Discovery vs CI Discovery

**Ambiguity**: Who is responsible when:
- CI catches warnings but agent doesn't?
- Agent catches warnings before CI runs?
- Warnings only appear in production?

**Required Clarification**: Define responsibility hierarchy and escalation paths

---

### 2.4 Whitelisted Warnings

**Ambiguity**: Can whitelisted warnings accumulate?
- Must whitelist be renewed per-wave?
- Can whitelist expire?
- Who maintains whitelist?

**Required Clarification**: Governance process for whitelist lifecycle

---

## 3. Missing Protocols

### 3.1 Warning Discovery Blocker Protocol

**What's Missing**: Explicit protocol when agent discovers warnings from prior work

**Required Protocol**:
1. Agent detecting warning MUST immediately generate warning discovery report
2. Agent MUST halt current work until blocker resolved
3. Agent MUST escalate to FM/Governance with:
   - Warning details (source, severity, origin)
   - Suspected responsible agent/job
   - Impact assessment on current work
4. FM/Governance MUST identify original responsible agent
5. Original agent MUST be re-assigned to remediate as BLOCKER
6. Original agent remediates and provides evidence
7. Discovering agent verifies remediation
8. Only then may downstream work proceed

**Integration Points**:
- FM_PREAUTH_CHECKLIST_CANON.md (pre-auth validation)
- ESCALATION_POLICY.md (escalation triggers)
- BUILDER_QA_HANDOVER_POLICY.md (handover blocking)
- Agent contracts (discovery obligations)

---

### 3.2 Forward-Scan for Warnings Protocol

**What's Missing**: Requirement to scan ALL pending work after warning discovery

**Required Protocol** (analogous to BL-019 forward-scan):
1. When warning discovered, identify failure pattern
2. Scan ALL in-scope pending work (not just current task)
3. Validate each pending item for same pattern
4. Correct ALL instances before any authorization
5. Document forward-scan evidence

**Integration**: LEARNING_INTAKE_AND_PROMOTION_MODEL.md (warning patterns as learnings)

---

### 3.3 Warning Remediation Evidence Standard

**What's Missing**: Schema/template for warning remediation evidence

**Required Artifacts**:
- Warning Discovery Report schema
- Warning Remediation Report schema
- Warning Verification Report schema
- Evidence trail linking discovery → remediation → verification

**Integration**: governance/schemas/ directory

---

## 4. Required Canon Updates

### 4.1 QA_POLICY_MASTER.md Updates

**Section 1.1.2 Gate-Eligible Green**
- ADD: Explicit statement: "Zero unresolved warnings from current OR prior work"
- ADD: Reference to Warning Discovery Blocker Protocol

**NEW Section 3.3: Warning Discovery from Prior Work**
- Define warning discovery blocker protocol
- Define agent discovery obligations
- Define escalation requirements
- Define original agent re-assignment process

**Section 5 FL/CI Enhancement**
- ADD: Warning discovery as failure classification
- ADD: Forward-scan requirement for warning patterns

---

### 4.2 BUILDER_QA_HANDOVER_POLICY.md Updates

**Section 4.1 QA Execution Complete**
- ADD: "Zero unresolved warnings (current and prior work)"

**NEW Section 8.4: Warning Discovery During Execution**
- Builder discovers warnings from prior work → MUST halt and escalate
- Builder MUST NOT hand over until warnings remediated
- Builder MUST provide warning discovery report if warnings found

---

### 4.3 FM_PREAUTH_CHECKLIST_CANON.md Updates

**NEW Section 2.7: Warning Status Validation**
- FM MUST verify zero unresolved warnings from prior waves/subwaves
- FM MUST verify warning whitelist current and justified
- FM MUST verify no warning accumulation

---

### 4.4 ESCALATION_POLICY.md Updates

**Section: Reactive Escalation (Failure-Based)**
- ADD: "Warning/test-debt discovery from prior work" as escalation trigger
- ADD: Agent obligation to escalate immediately upon discovery

---

### 4.5 PR_GATE_FAILURE_HANDLING_PROTOCOL.md Updates

**Section 5: Failure Classification**
- ADD: NEW classification "UNRESOLVED_WARNINGS" (GOVERNANCE)
- Define responsible party as original agent (with fallback to governance)
- Define remediation: Re-assign original agent to fix as blocker

---

### 4.6 FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md Updates

**Section: FM Responsibilities**
- ADD: "Verify zero unresolved warnings before authorization" to planning phase
- ADD: "Enforce warning discovery blocker protocol" to supervision responsibilities

---

### 4.7 Agent Contract Standard Language

**NEW canonical agent contract section**:
```markdown
## Warning and Test-Debt Discovery Obligations

When this agent discovers warnings or test debt from prior work:
1. MUST immediately halt current work
2. MUST generate warning discovery report
3. MUST escalate to [FM/Governance] with impact assessment
4. MUST NOT proceed until warnings remediated by responsible agent
5. MUST verify remediation before resuming work

Discovery of warnings from prior work is a BLOCKER requiring original agent re-assignment and remediation before downstream work may proceed.
```

---

## 5. Ripple Analysis

### 5.1 Downstream Repositories Affected

**FM Office App** (`maturion-foreman-office-app`):
- Update `.github/agents/ForemanApp-agent.md` with warning discovery obligations
- Update builder agent contracts with warning discovery protocols
- Update QA workflows with warning blocker checks

**ISMS Repository** (future):
- Apply same warning discovery protocols
- Ensure warning whitelist governance
- Apply agent contract standard language

---

### 5.2 Governance Artifacts Requiring Creation

**New Schemas**:
1. `governance/schemas/WARNING_DISCOVERY_REPORT.schema.md`
2. `governance/schemas/WARNING_REMEDIATION_REPORT.schema.md`
3. `governance/schemas/WARNING_VERIFICATION_REPORT.schema.md`

**New Templates**:
1. `governance/templates/WARNING_DISCOVERY_REPORT.template.md`
2. `governance/templates/WARNING_REMEDIATION_PLAN.template.md`

**New Canon**:
1. `governance/canon/WARNING_DISCOVERY_BLOCKER_PROTOCOL.md` (comprehensive protocol document)

---

## 6. Implementation Priority

### Priority 1 (CRITICAL - Immediate)
1. Update QA_POLICY_MASTER.md with prior-work warning protocol
2. Update FM_PREAUTH_CHECKLIST_CANON.md with warning validation
3. Update ESCALATION_POLICY.md with warning discovery trigger

### Priority 2 (HIGH - Before Next Wave Authorization)
1. Update BUILDER_QA_HANDOVER_POLICY.md with warning discovery handling
2. Update PR_GATE_FAILURE_HANDLING_PROTOCOL.md with warning classification
3. Create WARNING_DISCOVERY_BLOCKER_PROTOCOL.md canon

### Priority 3 (MEDIUM - Before Layer-Down)
1. Update FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md
2. Create agent contract standard language
3. Create warning discovery/remediation schemas

### Priority 4 (LOW - Documentation)
1. Create warning discovery/remediation templates
2. Update related governance docs with cross-references
3. Update GOVERNANCE_CANON_MANIFEST.md

---

## 7. Validation Criteria

Canon updates are complete when:
- [x] Gap analysis complete
- [ ] All Priority 1-3 updates completed
- [ ] No contradictions between updated documents
- [ ] All cross-references valid
- [ ] Ripple notification created
- [ ] Layer-down instructions created
- [ ] Completion report generated

---

## 8. Risk Assessment

**Risk if NOT implemented**:
- Warnings from prior work may accumulate silently
- Agents may not know to escalate warning discoveries
- FM may authorize work on unstable foundation
- Test debt may propagate across waves
- Governance enforcement becomes ambiguous

**Risk Mitigation**: This gap analysis and canon update addresses all identified risks proactively

---

## 9. Conclusion

The zero-warning/test-debt doctrine exists in QA_POLICY_MASTER.md but lacks:
1. Explicit blocker protocol for prior-work warnings
2. Agent discovery and escalation obligations
3. FM pre-authorization validation
4. Enforcement integration across governance documents

This gap analysis provides the foundation for comprehensive canon updates to make the zero-warning doctrine explicit, aligned, and non-optional across the entire governance framework.

---

**Next Steps**:
1. Proceed with Priority 1 canon updates
2. Create WARNING_DISCOVERY_BLOCKER_PROTOCOL.md
3. Update enforcement documents per Section 4
4. Generate ripple notification
5. Create layer-down handover instructions

---

**Document Authority**: Governance Administrator  
**Approval Required**: Johan (upon completion of canon updates)  
**Integration**: All updated documents will reference this gap analysis as rationale
