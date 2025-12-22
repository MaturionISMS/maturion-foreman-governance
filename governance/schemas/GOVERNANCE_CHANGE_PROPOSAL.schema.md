# GOVERNANCE CHANGE PROPOSAL SCHEMA

## Status
Canonical Governance Specification  
Version: v1.0  
Authority: Governance Administrator  
Required By: GOVERNANCE_RIPPLE_MODEL.md

---

## 1. Purpose

This document defines the normative schema for **Governance Change Proposals** - structured documents used to propose changes to canonical governance based on upward ripple from repositories.

Governance Change Proposals serve as:
- **Upward ripple mechanism** from repositories to governance
- **Learning promotion pathway** for systematic issues
- **Governance evolution documentation** for audit trail
- **Impact analysis framework** for governance changes

A Governance Change Proposal is valid only if it conforms to this schema.

---

## 2. Core Principles

### 2.1 Structured Evolution

Governance evolution must be:
- Explicit and documented
- Justified by evidence
- Analyzed for impact
- Approved by appropriate authority
- Tracked through lifecycle

### 2.2 Evidence-Based Change

All governance changes must be:
- Triggered by real repository experience
- Supported by failure/learning records
- Justified by pattern analysis
- Validated against constitutional principles

### 2.3 Bidirectional Traceability

Change proposals must be traceable:
- From repository failures to governance updates
- From governance updates to repository adoption
- From lessons learned to canonical changes
- From changes to effectiveness validation

---

## 3. Proposal Location and Naming

### 3.1 Canonical Location

Governance Change Proposals MUST be stored at:

```
governance/proposals/PROPOSAL_<YYYY-MM-DD>_<SHORT_DESCRIPTION>.md
```

**Example**:
```
governance/proposals/PROPOSAL_2025-12-22_GPCA_MISPREDICTION_HANDLING.md
governance/proposals/PROPOSAL_2025-12-22_SCHEMA_OPTIONAL_FIELD.md
```

### 3.2 Proposal States

Proposals transition through states:
```
DRAFT → REVIEW → APPROVED → IMPLEMENTED → VALIDATED → CLOSED
                      ↓
                  REJECTED → CLOSED
```

**State Tracking**: In proposal front matter

---

## 4. Required Proposal Structure

### 4.1 Required Sections

```markdown
# Governance Change Proposal: <Title>

## 1. Proposal Metadata
## 2. Change Summary
## 3. Trigger and Evidence
## 4. Current State Analysis
## 5. Proposed Change
## 6. Impact Analysis
## 7. Migration Plan (if breaking)
## 8. Approval Requirements
## 9. Implementation Plan
## 10. Validation Criteria
## 11. References
```

---

## 5. Required Fields (Normative)

### 5.1 Proposal Metadata Section

```markdown
## 1. Proposal Metadata

- **PROPOSAL_SCHEMA_VERSION**: v1.0
- **Proposal ID**: PROPOSAL_<YYYY-MM-DD>_<SHORT_ID>
- **Proposal Date**: <YYYY-MM-DD>
- **Proposer**: <Foreman|GovernanceAdministrator|Builder|Johan>
- **Proposer Identity**: <agent-id or name>
- **Proposal State**: <DRAFT|REVIEW|APPROVED|REJECTED|IMPLEMENTED|VALIDATED|CLOSED>
- **Change Classification**: <CLARIFICATION|NON_BREAKING_ENHANCEMENT|BREAKING_CHANGE|EMERGENCY_FIX>
- **Affected Governance Artifacts**: <list of files>
- **Affected Repositories**: <list of repos or ALL>
- **Priority**: <HIGH|MEDIUM|LOW>
- **Target Completion Date**: <YYYY-MM-DD>
```

**Required Fields**:
- `PROPOSAL_SCHEMA_VERSION`: Must be v1.0
- `Proposal ID`: Unique identifier with date
- `Proposal Date`: Date proposal created
- `Proposer`: Who is proposing the change
- `Proposal State`: Current state in lifecycle
- `Change Classification`: Type of change
- `Affected Governance Artifacts`: Files to be changed
- `Priority`: Urgency of change

**Change Classification Semantics**:
- **CLARIFICATION**: Documentation improvement, no functional change (fast-track)
- **NON_BREAKING_ENHANCEMENT**: Additive change, backward compatible (governance admin approval)
- **BREAKING_CHANGE**: Incompatible change, requires migration (Johan approval)
- **EMERGENCY_FIX**: Critical fix, fast-track with retrospective approval

---

### 5.2 Change Summary Section

```markdown
## 2. Change Summary

### 2.1 Executive Summary

<1-2 paragraph summary of what is being changed and why>

### 2.2 Change Scope

**Governance Areas Affected**:
- [ ] Canon (constitutional)
- [ ] Policy (procedural)
- [ ] Schema (structural)
- [ ] Template (artifact)
- [ ] Agent Contract (behavioral)
- [ ] Gate Definition (enforcement)

**Change Type**:
- [ ] New governance rule
- [ ] Updated governance rule
- [ ] Deprecated governance rule
- [ ] New schema
- [ ] Updated schema
- [ ] New policy
- [ ] Updated policy
- [ ] Clarification only

### 2.3 Expected Benefit

**Primary Benefit**: <benefit description>

**Secondary Benefits**:
- <benefit 1>
- <benefit 2>
- ...

**Success Metrics**: <how success will be measured>
```

**Required Content**:
- Executive summary (natural language)
- Checklist of affected governance areas
- Type of change
- Expected benefits
- Success metrics

---

### 5.3 Trigger and Evidence Section

```markdown
## 3. Trigger and Evidence

### 3.1 Trigger Type

**Trigger**: <FAILURE_PATTERN|GPCA_MISPREDICTION|LEARNING_PROMOTION|GOVERNANCE_GAP|CONSTITUTIONAL_VIOLATION|EXTERNAL_REQUIREMENT|OTHER>

**Trigger Description**: <detailed description of what triggered this proposal>

### 3.2 Evidence

**Primary Evidence**:
- Repository: <org/repo>
- PR Number: <number> (if applicable)
- Issue Number: <number> (if applicable)
- Failure Record: <path to failure record>
- Learning Record: <path to learning record>
- GPCA Report: <path to GPCA report>

**Supporting Evidence**:
1. <evidence item 1 with reference>
2. <evidence item 2 with reference>
3. ...

### 3.3 Pattern Analysis (if applicable)

**Occurrence Count**: <number of times observed>

**Affected Repositories**: <list of repos or COUNT>

**Time Period**: <date range of occurrences>

**Pattern Description**: <description of repeated pattern>

**Pattern Severity**: <S1|S2|S3|S4>
- S1: Blocks releases, breaks invariants
- S2: Blocks merge gates, breaks core workflows
- S3: Reduces quality, partial function
- S4: Minor, informational

### 3.4 Root Cause Analysis

**Root Cause Summary**: <2-3 sentences describing root cause>

**Why This Was Not Prevented**: <explanation of governance gap>

**Classification**: <ARCHITECTURE_GAP|GOVERNANCE_GAP|SCHEMA_INCOMPLETENESS|POLICY_AMBIGUITY|ENFORCEMENT_INCONSISTENCY|OTHER>
```

**Required Content**:
- Trigger type and description
- Primary evidence with references
- Supporting evidence (if available)
- Pattern analysis (if pattern-triggered)
- Root cause analysis

**Evidence Requirements**:
- All evidence must be traceable
- All references must be valid paths or URLs
- Pattern analysis required if ≥3 occurrences

---

### 5.4 Current State Analysis Section

```markdown
## 4. Current State Analysis

### 4.1 Current Governance State

**Relevant Governance Artifacts**:
- `<path>` (version X.Y) - <description>
- `<path>` (version X.Y) - <description>
- ...

**Current Rules/Requirements**:
1. <current rule 1>
2. <current rule 2>
3. ...

**Gaps/Issues Identified**:
1. <gap/issue 1>
2. <gap/issue 2>
3. ...

### 4.2 Current Repository Behavior

**How Repositories Currently Handle This**:
<description of current repository practices>

**Workarounds in Use**:
<description of any workarounds being used>

**Pain Points**:
1. <pain point 1>
2. <pain point 2>
3. ...

### 4.3 Compliance Impact

**Current Compliance Status**: <COMPLIANT|NON_COMPLIANT|AMBIGUOUS>

**Risk of Current State**: <risk description>

**Cost of Inaction**: <what happens if we don't change>
```

**Required Content**:
- List of relevant current governance
- Current rules and requirements
- Identified gaps or issues
- Current repository behavior
- Compliance impact assessment

---

### 5.5 Proposed Change Section

```markdown
## 5. Proposed Change

### 5.1 Change Description

**What Will Change**:
<detailed description of proposed change>

**Why This Change**:
<justification for this specific approach>

**Alternative Approaches Considered**:
1. <alternative 1> - Rejected because: <reason>
2. <alternative 2> - Rejected because: <reason>
3. ...

### 5.2 Specific Governance Updates

**Files to Create**:
- `<path>` - <purpose>
- ...

**Files to Modify**:
- `<path>` - <specific changes>
- ...

**Files to Deprecate** (if any):
- `<path>` - <deprecation plan>
- ...

**Files to Delete** (if any):
- `<path>` - <justification>
- ...

### 5.3 New/Updated Content

**Key Changes**:
1. <change 1 with rationale>
2. <change 2 with rationale>
3. ...

**New Rules/Requirements** (if applicable):
```
<code block with actual new governance content>
```

**Updated Rules/Requirements** (if applicable):
```diff
- Old text
+ New text
```
```

**Required Content**:
- Detailed change description
- Justification for approach
- Alternative approaches considered and rejected
- Specific file changes
- Actual proposed governance content

**Best Practice**: Include draft governance content inline

---

### 5.6 Impact Analysis Section

```markdown
## 6. Impact Analysis

### 6.1 Repository Impact

**Total Repositories Affected**: <number or ALL>

**Repositories Requiring Changes**: <list or COUNT>

**Impact Level per Repository**:
- **HIGH** (breaking, requires code changes): <list or count>
- **MEDIUM** (non-breaking, requires updates): <list or count>
- **LOW** (informational only): <list or count>

**Estimated Total Effort**: <person-hours or story points>

### 6.2 Agent Impact

**Agents Requiring Updates**:
- [ ] Foreman (FM)
- [ ] Builder Agents
- [ ] Governance Administrator
- [ ] Other: <specify>

**Agent Contract Changes Required**: <YES|NO>

**Agent Behavior Changes**: <description>

### 6.3 Gate Impact

**PR Gates Requiring Updates**: <YES|NO>

**Gate Logic Changes**: <description if YES>

**New Gate Checks**: <list if any>

**Removed Gate Checks**: <list if any>

### 6.4 Schema Impact

**Schema Changes**:
- [ ] New required field (BREAKING)
- [ ] New optional field (NON-BREAKING)
- [ ] Field type change (BREAKING)
- [ ] Field removal (BREAKING)
- [ ] Field deprecation (NON-BREAKING)

**Schema Version Impact**: <major|minor|patch>

**Backward Compatibility**: <YES|NO|PARTIAL>

### 6.5 Constitutional Impact

**Affects Constitutional Canon**: <YES|NO>

**Constitutional Principles Affected**: <list if YES>

**Requires Johan Approval**: <YES|NO>

**Precedence Conflicts**: <list any conflicts with higher authority>

### 6.6 Risk Assessment

**Risks of Implementation**:
1. <risk 1> - Mitigation: <mitigation>
2. <risk 2> - Mitigation: <mitigation>
3. ...

**Risks of Not Implementing**:
1. <risk 1> - Severity: <HIGH|MEDIUM|LOW>
2. <risk 2> - Severity: <HIGH|MEDIUM|LOW>
3. ...
```

**Required Content**:
- Repository impact assessment
- Agent impact assessment
- Gate impact assessment
- Schema impact (if applicable)
- Constitutional impact assessment
- Risk analysis (both implementation and inaction)

---

### 5.7 Migration Plan Section (Conditional)

```markdown
## 7. Migration Plan

**Required for Breaking Changes Only**

### 7.1 Migration Strategy

**Migration Approach**: <BIG_BANG|GRADUAL|PHASED|PARALLEL>

**Migration Duration**: <time period>

**Transition Period**: <time period during which both old and new valid>

**Cutover Date**: <YYYY-MM-DD>

### 7.2 Migration Steps

**Phase 1: Preparation** (Target: <date>)
1. <step>
2. <step>
3. ...

**Phase 2: Transition** (Target: <date>)
1. <step>
2. <step>
3. ...

**Phase 3: Completion** (Target: <date>)
1. <step>
2. <step>
3. ...

### 7.3 Repository Migration

**Migration Per Repository**:
1. <step 1>
2. <step 2>
3. ...

**Automated Migration**: <YES|NO|PARTIAL>

**Migration Tooling**: <description if available>

**Migration Validation**: <how to verify successful migration>

### 7.4 Deprecation Plan (if applicable)

**Deprecated Artifacts**: <list>

**Deprecation Period**: <duration>

**Removal Date**: <YYYY-MM-DD>

**Communication Plan**: <how deprecation will be communicated>

### 7.5 Rollback Plan

**Rollback Trigger**: <conditions that require rollback>

**Rollback Steps**:
1. <step>
2. <step>
3. ...

**Rollback Risk**: <assessment>
```

**Required**: ONLY for BREAKING_CHANGE classification

**Required Content**:
- Migration strategy
- Phased migration steps
- Repository-specific migration guidance
- Deprecation plan (if applicable)
- Rollback plan

---

### 5.8 Approval Requirements Section

```markdown
## 8. Approval Requirements

### 8.1 Required Approvals

**Based on Change Classification**: <classification>

**Approval Authority Required**:
- [ ] Governance Administrator (for CLARIFICATION, NON_BREAKING_ENHANCEMENT)
- [ ] Johan (for BREAKING_CHANGE, EMERGENCY_FIX retrospective)

**Approval Criteria**:
1. <criterion 1>
2. <criterion 2>
3. ...

### 8.2 Review Process

**Reviewer 1**: <role> - <focus area>
**Reviewer 2**: <role> - <focus area>
(additional reviewers as needed)

**Review Checklist**:
- [ ] Constitutional compliance verified
- [ ] Impact analysis complete
- [ ] Evidence sufficient
- [ ] Migration plan adequate (if breaking)
- [ ] No unintended consequences identified
- [ ] Audit trail complete

### 8.3 Approval Status

**Governance Administrator Review**: <PENDING|APPROVED|CHANGES_REQUESTED|REJECTED>
- Date: <YYYY-MM-DD>
- Comments: <comments>

**Johan Review** (if required): <PENDING|APPROVED|CHANGES_REQUESTED|REJECTED>
- Date: <YYYY-MM-DD>
- Comments: <comments>

**Final Approval**: <PENDING|APPROVED|REJECTED>
- Date: <YYYY-MM-DD>
```

**Required Content**:
- Approval authority based on classification
- Approval criteria
- Review process
- Approval status tracking

---

### 5.9 Implementation Plan Section

```markdown
## 9. Implementation Plan

### 9.1 Implementation Timeline

**Start Date**: <YYYY-MM-DD>
**Target Completion Date**: <YYYY-MM-DD>
**Effective Date**: <YYYY-MM-DD> (when change becomes mandatory)

### 9.2 Implementation Steps

**Step 1**: <description> (Owner: <owner>, Due: <date>)
**Step 2**: <description> (Owner: <owner>, Due: <date>)
**Step 3**: <description> (Owner: <owner>, Due: <date>)
...

### 9.3 Implementation Responsibilities

**Governance Administrator**:
- <responsibility 1>
- <responsibility 2>
- ...

**Foreman (FM)**:
- <responsibility 1>
- <responsibility 2>
- ...

**Builder Agents**:
- <responsibility 1>
- <responsibility 2>
- ...

### 9.4 Communication Plan

**Who Needs to Be Informed**: <stakeholders>

**Communication Method**: <method>

**Communication Timeline**:
- <date>: <communication event>
- <date>: <communication event>
- ...

**Communication Content**: <what will be communicated>

### 9.5 Propagation Plan

**Downward Propagation**:
- Governance repo updated: <date>
- Builder contracts updated: <date>
- Repository PRs created: <date>
- Repository updates complete: <date>

**Propagation Tracking**: <how propagation will be tracked>
```

**Required Content**:
- Implementation timeline with dates
- Step-by-step implementation plan
- Responsibility assignments
- Communication plan
- Propagation plan

---

### 5.10 Validation Criteria Section

```markdown
## 10. Validation Criteria

### 10.1 Success Criteria

**Primary Success Criteria**:
1. <criterion 1 - measurable>
2. <criterion 2 - measurable>
3. ...

**Secondary Success Criteria**:
1. <criterion 1 - measurable>
2. <criterion 2 - measurable>
3. ...

### 10.2 Validation Methods

**How Success Will Be Measured**:
1. <method 1>
2. <method 2>
3. ...

**Validation Timeline**:
- <date>: Initial validation
- <date>: Follow-up validation
- <date>: Final validation

### 10.3 Metrics

**Metrics to Track**:
- <metric 1>: Baseline: <value>, Target: <value>
- <metric 2>: Baseline: <value>, Target: <value>
- ...

**Metric Collection Method**: <how metrics will be collected>

**Reporting Cadence**: <how often metrics will be reported>

### 10.4 Acceptance Criteria

**Change is considered successful if**:
1. <acceptance criterion 1>
2. <acceptance criterion 2>
3. ...

**Change should be rolled back if**:
1. <rollback criterion 1>
2. <rollback criterion 2>
3. ...
```

**Required Content**:
- Measurable success criteria
- Validation methods
- Metrics with baselines and targets
- Acceptance criteria
- Rollback criteria

---

### 5.11 References Section

```markdown
## 11. References

### 11.1 Evidence References

**Failure Records**:
- `<path or URL>` - <description>
- ...

**Learning Records**:
- `<path or URL>` - <description>
- ...

**GPCA Reports**:
- `<path or URL>` - <description>
- ...

**PR/Issue References**:
- <org/repo>#<number> - <description>
- ...

### 11.2 Governance References

**Constitutional References**:
- `<path>` - <section> - <relevant principle>
- ...

**Policy References**:
- `<path>` - <section> - <relevant rule>
- ...

**Schema References**:
- `<path>` - <version> - <relevant requirement>
- ...

### 11.3 Related Proposals

**Related/Dependent Proposals**:
- `<proposal-id>` - <relationship>
- ...

**Historical Proposals**:
- `<proposal-id>` - <relevance>
- ...
```

**Required Content**:
- All evidence references
- All governance references
- Related proposals (if any)

---

## 6. Validity Rules

A Governance Change Proposal is INVALID if:
- ❌ Schema version missing or not v1.0
- ❌ Proposal ID missing or malformed
- ❌ Missing required sections
- ❌ Change classification not specified
- ❌ No evidence provided
- ❌ Impact analysis missing
- ❌ BREAKING_CHANGE without migration plan
- ❌ Required approvals not identified
- ❌ Implementation plan missing
- ❌ Validation criteria missing
- ❌ References incomplete or invalid

---

## 7. Proposal Lifecycle

### 7.1 State Transitions

**DRAFT → REVIEW**
- Trigger: Proposer completes proposal
- Action: Submit for review

**REVIEW → APPROVED**
- Trigger: All required approvals obtained
- Action: Proceed to implementation

**REVIEW → CHANGES_REQUESTED**
- Trigger: Reviewer requests changes
- Action: Update proposal, resubmit

**REVIEW → REJECTED**
- Trigger: Proposal does not meet criteria
- Action: Close proposal, document rationale

**APPROVED → IMPLEMENTED**
- Trigger: Implementation complete
- Action: Validate and close

**IMPLEMENTED → VALIDATED**
- Trigger: Validation criteria met
- Action: Monitor and close

**VALIDATED → CLOSED**
- Trigger: Success confirmed
- Action: Archive proposal

---

## 8. Integration with Governance

This schema implements:
- **GOVERNANCE_RIPPLE_MODEL.md** - Upward ripple mechanism
- **LEARNING_INTAKE_AND_PROMOTION_MODEL.md** - Learning promotion
- **FAILURE_PROMOTION_RULE.md** - Failure pattern handling
- **VERSIONING_AND_EVOLUTION_GOVERNANCE.md** - Versioning and evolution

---

## 9. Canonical Precedence

This schema is canonical.

If a conflict exists between this schema and any Governance Change Proposal,
this schema prevails.

---

**End of GOVERNANCE CHANGE PROPOSAL SCHEMA**

---

**Document Metadata**:
- Schema ID: GOVERNANCE_CHANGE_PROPOSAL_SCHEMA_V1
- Authority: Canonical Governance Specification
- Effective Date: 2025-12-22
- Required By: GOVERNANCE_RIPPLE_MODEL.md
- Integration: LEARNING_SCHEMA.schema.md, FAILURE_SCHEMA.schema.md
