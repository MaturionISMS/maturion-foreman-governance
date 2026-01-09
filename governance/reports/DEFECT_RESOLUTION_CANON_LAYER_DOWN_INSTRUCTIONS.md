# Defect Resolution & Maintenance Canon - Layer-Down Instructions

**Type**: Layer-Down Notification and Implementation Guide  
**Date**: 2026-01-09  
**Authority**: Governance Administrator  
**Target Repositories**: PartPulse (Phase 1), FM Office App, SlotMaster, All Future Applications  
**Canonical Reference**: `governance/canon/DEFECT_RESOLUTION_MAINTENANCE_CANON.md` v1.0.0

---

## 1. Purpose

This document provides **implementation instructions** for downstream application repositories to adopt the new **Defect Resolution and Maintenance Canon**.

This canon extends the One-Time Build Law, Zero Test Debt discipline, and QA-to-Red governance to **post-production maintenance cycles**, ensuring published systems receive the same quality governance as new builds.

---

## 2. What Changed

### 2.1 New Canonical Governance

**Created**: `DEFECT_RESOLUTION_MAINTENANCE_CANON.md` (PUBLIC_API)

**Scope**: Complete lifecycle governance for:
- Defect discovery and triage
- Fix planning and authorization
- Maintenance implementation
- Quality validation for fixes
- Production deployment and rollback
- Audit trail and learning promotion

### 2.2 Core Principles

1. **Maintenance is not exempt from governance**
   - Same 100% GREEN requirement
   - Same zero test debt mandate
   - Same architecture-first discipline
   - Same governance gate compliance

2. **One-Time Fix Law**
   - Fixes must work correctly first time
   - No "fix the fix" iteration
   - No regression acceptable

3. **Production Safety First**
   - Rollback plans required
   - Impact analysis mandatory
   - Additional validation for production changes

4. **Defect Learning Promotion**
   - Every defect improves governance
   - Patterns promoted to prevent recurrence
   - Cross-repo ripple for common issues

---

## 3. Implementation Timeline

### Phase 1: PartPulse (Weeks 1-2)
**Purpose**: Validate protocol with first application

**Week 1: Foundation**
- Review canon with team
- Classify existing defects
- Set up defect triage process
- Create evidence storage structure

**Week 2: Process**
- Implement fix authorization gate
- Create fix PR templates
- Configure governance gates
- Document rollback procedures

**Week 3: Validation**
- Execute first fix using protocol
- Validate all steps
- Gather lessons learned
- Report to governance repo

### Phase 2: FM Office App (Weeks 3-4)
**Purpose**: Extend to primary execution repository

**Actions**:
- Adapt protocol to office-app context
- Update FM contract with fix planning requirements
- Implement defect classification system
- Create fix-specific PR templates
- Configure CI gates for fix PRs

### Phase 3: SlotMaster & Future Apps (Weeks 5-6)
**Purpose**: Ripple to remaining repositories

**Actions**:
- Governance liaison receives ripple signal
- Liaison adapts to local context
- Liaison implements changes
- Liaison reports completion
- Governance Administrator verifies

---

## 4. Required Changes by Repository

### 4.1 All Repositories (MANDATORY)

#### A. Process Documentation

**Create/Update**:
- `/docs/defect-resolution-process.md` - Repository-specific defect handling process
- `/docs/fix-pr-template.md` - Template for defect fix PRs
- `/docs/rollback-procedures.md` - Current production version rollback steps

**Required Elements**:
- Defect classification labels (BUG, FEATURE, TECH_DEBT)
- Triage process and ownership
- Fix authorization checklist
- Evidence requirements
- Deployment procedures

#### B. Issue Tracker Configuration

**Labels to Create**:
- `defect-bug` - Functional defects
- `defect-feature` - Missing capabilities
- `defect-tech-debt` - Quality/architecture issues
- `severity-critical` - Production down, data loss, security
- `severity-high` - Major functionality broken
- `severity-medium` - Degraded functionality
- `severity-low` - Minor issues
- `fix-in-progress` - Fix work underway
- `fix-deployed` - Fix in production
- `fix-verified` - Defect confirmed resolved

**Issue Templates**:
- Defect report template (reproduction steps, impact, severity)
- Fix authorization template (architecture, safety checks)
- Fix verification template (validation evidence)

#### C. Evidence Storage

**Create Directory Structure**:
```
/evidence/
  fixes/
    {issue-number}/
      discovery/           # Initial defect report, screenshots, logs
      triage/              # Classification, RCA, priority assessment
      architecture/        # Fix design, impact analysis
      implementation/      # PR links, code review evidence
      validation/          # Test results, CI logs
      deployment/          # Deployment logs, verification
      closure/             # Final evidence, lessons learned
```

#### D. PR Templates

**Create**: `.github/PULL_REQUEST_TEMPLATE/fix_pr_template.md`

**Required Sections**:
- Defect Issue Reference
- Root Cause Analysis Summary
- Fix Architecture Summary
- Changes Made
- Test Evidence (Red → Green)
- Rollback Procedure
- Production Impact Assessment
- Verification Checklist

#### E. CI/CD Configuration

**Update Workflows**:
- Add fix branch patterns (`fix/*`, `hotfix/*`, `tech-debt/*`)
- Ensure all governance gates apply to fix PRs
- Add regression test validation
- Add breaking change detection
- Add version increment validation

**New Gates** (recommended):
- Defect reproduction test validation
- Rollback procedure presence check
- Evidence completeness validation
- Version tagging enforcement

### 4.2 PartPulse-Specific (Phase 1)

**Additional Requirements**:

1. **Current State Documentation**
   - Document current production version
   - Identify existing defect backlog
   - Classify all open issues per new taxonomy
   - Assess production deployment process

2. **Team Onboarding**
   - Share canon with team
   - Walk through fix playbooks (Section 13)
   - Practice triage process
   - Conduct rollback drill

3. **First Fix Execution**
   - Select HIGH or MEDIUM defect from backlog
   - Execute complete fix lifecycle using canon
   - Document every step taken
   - Gather learnings and pain points
   - Report to governance repo

4. **Feedback to Governance**
   - What worked well
   - What was unclear
   - What was missing
   - Recommended improvements
   - Adaptation requirements

### 4.3 FM Office App-Specific (Phase 2)

**Additional Requirements**:

1. **FM Contract Updates**
   - Add defect triage responsibility (Section 4.2)
   - Add fix authorization gate (Section 5.3)
   - Add fix architecture requirement (Section 5.2)
   - Add defect learning promotion obligation (Section 3.4)

2. **Builder Contract Updates**
   - Add fix scope constraint language
   - Add production safety binding
   - Add minimal change principle
   - Add backward compatibility requirements

3. **QA Infrastructure**
   - Ensure defect reproduction tests feasible
   - Validate regression test capability
   - Confirm integration test coverage
   - Verify production-like test environment

### 4.4 Governance Liaison Responsibilities

**All Repos with Governance Liaison**:

1. **Receive Ripple Signal**
   - Monitor governance repo for ripple notifications
   - Acknowledge receipt within 48 hours
   - Assess local implementation requirements

2. **Local Adaptation**
   - Review canon applicability to local context
   - Identify repository-specific adaptations needed
   - Preserve absolute requirements (no weakening)
   - Document adaptations and rationale

3. **Implementation**
   - Execute required changes per Section 4.1
   - Create local process documentation
   - Update agent contracts as needed
   - Configure CI/CD for fix PRs

4. **Verification**
   - Execute test fix using protocol
   - Validate all steps functional
   - Gather evidence of compliance
   - Report completion to governance repo

5. **Ongoing Compliance**
   - Monitor fix PR compliance with canon
   - Escalate governance violations
   - Promote learnings to governance
   - Maintain alignment with canon updates

---

## 5. Absolute Requirements (Non-Adaptable)

The following MUST be implemented exactly as specified. **NO local weakening permitted.**

### 5.1 Quality Standards

✅ **MANDATORY**:
- 100% GREEN for all fix PRs (zero errors, warnings, failures)
- Zero test debt for fixes (no skipped/incomplete tests)
- All existing tests must continue passing (zero regression)
- Architecture-first for every fix (no "quick fix" shortcuts)
- Complete audit trail (discovery → closure)

❌ **FORBIDDEN**:
- "It's just a small fix" (minimizing language)
- Bypassing architecture review for urgency
- Skipping tests because "obviously correct"
- Direct production edits without PR/gates
- "Will test later" or deferred validation

### 5.2 Fix Lifecycle

✅ **MANDATORY STEPS**:
1. Defect verified and classified
2. Root cause analysis completed
3. Fix architecture designed
4. Rollback procedure defined
5. FM authorizes fix
6. Builder appointed with constraints
7. Red QA created (defect reproduction)
8. Implementation to Green
9. All governance gates pass
10. FM validates 100% GREEN
11. Deployment with verification
12. Post-deployment learning capture

**Cannot skip or reorder steps.**

### 5.3 Governance Gate Compliance

✅ **MANDATORY**:
- Fix PRs pass through SAME gates as new build PRs
- No gate exemptions for "production urgency"
- Breaking change detection enforced
- Security scanning required
- Test coverage validation required
- Code quality standards enforced

### 5.4 Evidence and Audit Trail

✅ **MANDATORY**:
- Who discovered defect
- Who triaged and classified
- Who designed fix
- Who implemented fix
- Who validated fix
- Who approved deployment
- Who verified in production
- When each step occurred
- Why decisions were made

**Complete traceability required.**

### 5.5 Learning Promotion

✅ **MANDATORY TRIGGERS**:
- Defect found in production (QA missed it)
- Defect caused user impact or data loss
- Defect pattern repeats across apps
- Defect reveals architecture failure
- Defect reveals test coverage gap

**Must promote to governance.**

---

## 6. Flexible Implementation Areas

The following MAY be adapted to local repository context:

### 6.1 Process Mechanics

**Adaptable**:
- Defect classification label names (align with existing)
- Communication channels (use existing team tools)
- Evidence storage locations (align with existing structure)
- Deployment automation (integrate with existing pipelines)
- Notification mechanisms (email, Slack, etc.)

**Constraint**: Must achieve same governance outcomes.

### 6.2 Documentation Format

**Adaptable**:
- Process document format and structure
- PR template layout and sections
- Evidence document organization
- Rollback procedure format

**Constraint**: Must contain all required information.

### 6.3 Timeline

**Adaptable**:
- Implementation timeline (faster or slower than suggested)
- Phasing approach (can batch changes differently)
- Team onboarding pace

**Constraint**: Must implement before next production fix.

---

## 7. Verification and Reporting

### 7.1 Implementation Verification

**Each repository must demonstrate**:

1. ✅ Process documentation created and reviewed
2. ✅ Issue tracker configured with labels/templates
3. ✅ Evidence storage structure established
4. ✅ PR templates created for fix work
5. ✅ CI/CD configured for fix branches
6. ✅ Agent contracts updated (if applicable)
7. ✅ Rollback procedures documented
8. ✅ Test fix executed successfully using protocol

### 7.2 Reporting Requirements

**Create**: `DEFECT_RESOLUTION_CANON_IMPLEMENTATION_REPORT.md` in each repo

**Required Sections**:
- Implementation Date
- Changes Made (checklist from Section 4)
- Local Adaptations (with rationale)
- Test Fix Evidence (issue link, PR link, outcome)
- Lessons Learned
- Recommended Canon Improvements
- Compliance Certification (agent signature)

**Submit to**: Create issue in maturion-foreman-governance repo with:
- Title: "[LAYER-DOWN COMPLETE] {Repo Name} - Defect Resolution Canon"
- Body: Link to implementation report
- Label: `layer-down-complete`

### 7.3 Continuous Compliance

**Ongoing Requirements**:
- All fix PRs follow canonical process
- Defects classified and traced
- Learning promoted to governance
- Ripple signals received and acted upon
- Governance liaison monitors compliance

**Quarterly Review**:
- Assess protocol effectiveness
- Identify pain points
- Propose canon improvements
- Report to governance repo

---

## 8. Support and Escalation

### 8.1 Questions and Clarifications

**For implementation questions**:
1. Review DEFECT_RESOLUTION_MAINTENANCE_CANON.md thoroughly
2. Check this layer-down guide for specific instructions
3. Review related canon (BUILD_PHILOSOPHY.md, OPOJD_DOCTRINE.md, etc.)
4. Create issue in governance repo with `question` label
5. Governance Administrator will respond within 48 hours

### 8.2 Adaptation Requests

**If local context requires deviation**:
1. Document specific constraint preventing canonical implementation
2. Propose alternative approach achieving same outcome
3. Justify why alternative preserves governance intent
4. Create issue in governance repo with `adaptation-request` label
5. Wait for Governance Administrator approval before implementing

**Cannot deviate without approval.**

### 8.3 Escalation

**Escalate to Human Owner (Johan) when**:
- Canonical requirement fundamentally incompatible with repository
- Implementation blocked by platform/tooling constraints
- Governance conflict discovered
- Emergency fix needed before implementation complete

**Escalation = Success, not failure.**

---

## 9. Success Criteria

### 9.1 Implementation Complete When

✅ All required changes from Section 4 implemented  
✅ Test fix executed successfully using protocol  
✅ Implementation report submitted to governance repo  
✅ No absolute requirements weakened or skipped  
✅ Team trained and ready to use protocol  
✅ Evidence shows 100% GREEN fix with complete audit trail  

### 9.2 Operational Success When

✅ Defects resolved using canonical process consistently  
✅ Zero test debt maintained through maintenance cycles  
✅ Production fixes deployed safely with rollback capability  
✅ Defect learnings promoted to governance regularly  
✅ Ripple awareness active across repositories  
✅ Fix quality matches new build quality  

---

## 10. References

**Canonical Documents**:
- `governance/canon/DEFECT_RESOLUTION_MAINTENANCE_CANON.md` - Primary canon (MUST READ)
- `governance/canon/BUILD_PHILOSOPHY.md` - One-Time Build Law foundation
- `governance/canon/OPOJD_DOCTRINE.md` - Continuous execution model
- `governance/policy/QA_POLICY_MASTER.md` - Zero test debt, failure handling
- `governance/canon/FM_BUILDER_APPOINTMENT_PROTOCOL.md` - Builder appointment for fixes
- `governance/canon/VERSIONING_AND_EVOLUTION_GOVERNANCE.md` - Version control for fixes
- `governance/canon/LEARNING_INTAKE_AND_PROMOTION_MODEL.md` - Defect learning promotion
- `governance/canon/GOVERNANCE_RIPPLE_MODEL.md` - Cross-repo awareness
- `governance/canon/CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md` - Layer-down process

**Related Documents**:
- `governance/CHANGELOG.md` - Change history entry
- `governance/canon/GOVERNANCE_CANON_MANIFEST.md` - Canon inventory (Section 3.2)

**Playbooks** (in canon Section 13):
- Critical Production Defect Playbook
- Standard Defect Fix Playbook
- Tech Debt Remediation Playbook
- Security Vulnerability Fix Playbook

---

## 11. Timeline Summary

| Phase | Repositories | Timeline | Key Milestone |
|-------|-------------|----------|---------------|
| Phase 1 | PartPulse | Weeks 1-3 | First fix using protocol |
| Phase 2 | FM Office App | Weeks 3-4 | FM/builder contracts updated |
| Phase 3 | SlotMaster + Future | Weeks 5-6 | All repos compliant |
| Ongoing | All Repos | Continuous | Compliance and improvement |

**Start Date**: 2026-01-09 (canon publication)  
**Phase 1 Complete Target**: 2026-01-30  
**Full Rollout Complete Target**: 2026-02-20

---

## 12. Contact and Ownership

**Governance Authority**: Governance Administrator (in governance repo)  
**Layer-Down Coordination**: Governance Liaisons (in each app repo)  
**Escalation Authority**: Maturion Engineering Leadership (Johan Ras)  
**Questions**: Create issue in maturion-foreman-governance repo

---

**END OF LAYER-DOWN INSTRUCTIONS**
