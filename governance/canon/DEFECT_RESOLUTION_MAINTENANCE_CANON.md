# DEFECT RESOLUTION AND MAINTENANCE CANON

## Status
**Type**: Canonical Governance Protocol  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-01-09  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Layer-Down Status**: PUBLIC_API  
**Applies To**: All Foreman Instances, All Application Repositories, All Maintenance Cycles

---

## 1. Purpose

This canon establishes the **mandatory governance framework** for resolving defects, performing maintenance, and managing patches for already published builds and production systems.

It exists to ensure that:
- **Post-production fixes maintain the same quality standards as initial builds**
- **Defect resolution follows the One-Time Build Law** (fixes work correctly first time)
- **Test debt is never introduced through maintenance cycles**
- **Production changes are traceable, reversible, and auditable**
- **Maintenance work integrates with QA-to-Red, architecture discipline, and governance gates**
- **Published systems receive structured support without compromising governance**

**Critical Principle**: Published code is not exempt from governance. Defect fixes and maintenance must meet the SAME standards as new builds - 100% GREEN, zero test debt, full QA coverage, constitutional compliance.

---

## 2. Constitutional Authority

This canon derives authority from and extends:

- **BUILD_PHILOSOPHY.md** - One-Time Build Law, 100% GREEN philosophy, Zero Test Debt
- **OPOJD_DOCTRINE.md** - Continuous execution mandate applies to fix cycles
- **QA_POLICY_MASTER.md** - QA coverage, verification, and failure handling
- **FM_ROLE_CANON.md** - FM authority over architecture, QA, and build orchestration
- **FM_BUILDER_APPOINTMENT_PROTOCOL.md** - Builder appointment for fix work
- **VERSIONING_AND_EVOLUTION_GOVERNANCE.md** - Version control and semantic versioning
- **LEARNING_INTAKE_AND_PROMOTION_MODEL.md** - Defect pattern promotion to governance
- **FAILURE_PROMOTION_RULE.md** - Failures tolerated once, must be eliminated permanently
- **GOVERNANCE_RIPPLE_MODEL.md** - Bidirectional governance evolution

**Integration Principle**: This canon does NOT replace existing governance; it extends existing build lifecycle governance to cover post-production maintenance cycles.

---

## 3. Core Principles

### 3.1 Maintenance Is Not Exempt From Governance

**Principle**: Defect fixes, patches, and maintenance changes MUST meet identical quality standards as initial builds.

**Rationale**: 
- Production code touches real users and business value
- Rushed fixes create cascading technical debt
- "Quick fixes" bypass testing and create hidden failures
- Maintenance work compounds if not governed

**Requirements**:
- ✅ Same 100% GREEN requirement (zero errors, warnings, failures)
- ✅ Same zero test debt mandate (no skipped/incomplete tests)
- ✅ Same architecture-first approach (design before implementation)
- ✅ Same QA-to-Red discipline (tests define fix requirements)
- ✅ Same governance gate validation (all gates must pass)
- ✅ Same evidence and audit trail obligations

**Forbidden**:
- ❌ "It's just a small fix" (minimizing language - see POLICY-NO-ONLY-LANGUAGE)
- ❌ Bypassing architecture review because "production is down"
- ❌ Skipping tests because "it's obviously correct"
- ❌ Direct production edits without PR/gate validation
- ❌ "Will test later" or deferred quality validation

### 3.2 One-Time Fix Law

**Principle**: Like new builds, fixes must work correctly THE FIRST TIME. No iteration, no "fix the fix", no regression.

**Implication**:
- Fix must resolve the defect completely
- Fix must not introduce new defects
- Fix must not break existing functionality
- Fix must pass all tests (new and existing) on first merge
- Fix must be deployable immediately after merge

**Enforcement**: 
- Failed fixes trigger root cause analysis (same as failed builds)
- Repeated fix attempts for same defect are governance violations
- Fix regressions are escalated as critical governance failures

### 3.3 Production Safety First

**Principle**: Maintenance changes to published systems require ADDITIONAL safety validation beyond new builds.

**Additional Safety Requirements**:
- ✅ Rollback plan defined before deployment
- ✅ Production impact analysis completed
- ✅ Business continuity validation
- ✅ User communication plan (if applicable)
- ✅ Monitoring and alerting configured
- ✅ Emergency escalation contacts identified

**Critical Systems**: Systems with active users, business value, or regulatory requirements have ELEVATED maintenance governance.

### 3.4 Defect Learning Promotion

**Principle**: Every production defect represents a governance gap. Defect patterns MUST be promoted to prevent recurrence.

**Mandatory Promotion Triggers**:
- Defect found in production (QA did not catch it)
- Defect caused user impact or data loss
- Defect pattern repeats across applications
- Defect reveals architecture assumption failure
- Defect reveals test coverage gap

**Promotion Targets**:
- QA improvements (new test categories, coverage requirements)
- Architecture standards (design patterns, validation rules)
- Code review checklists (common error patterns)
- Governance canon updates (new requirements, constraints)

See: **LEARNING_INTAKE_AND_PROMOTION_MODEL.md**

---

## 4. Defect Classification and Triage

### 4.1 Defect Categories

Every issue must be classified into ONE primary category:

#### 4.1.1 BUG (Functional Defect)
**Definition**: Implemented behavior does not match specification or user expectation.

**Characteristics**:
- Existing feature produces incorrect results
- System behavior violates documented requirements
- Error handling fails or produces wrong errors
- Data corruption or loss occurs
- Security vulnerability exists

**Examples**:
- Form validation accepts invalid data
- Calculation produces wrong result
- API returns incorrect HTTP status code
- Authentication allows unauthorized access

**Priority Factors**:
- User impact (blocking, degraded, cosmetic)
- Data integrity risk
- Security implications
- Frequency of occurrence

#### 4.1.2 FEATURE (Missing Capability)
**Definition**: Required functionality does not exist but was specified or is reasonably expected.

**Characteristics**:
- Specification defined feature not implemented
- Critical workflow incomplete
- Integration missing or non-functional
- UI/UX element absent

**Examples**:
- Specified report not available
- Required API endpoint missing
- Export functionality not working
- Mobile responsiveness not implemented

**Distinction from Enhancement**: FEATUREs are part of original requirements; enhancements are new requests.

#### 4.1.3 TECH_DEBT (Architectural or Quality Issue)
**Definition**: Implementation works but violates quality standards, creates maintenance burden, or accumulates risk.

**Characteristics**:
- Code quality issues (complexity, duplication, poor structure)
- Performance degradation
- Incomplete error handling
- Test coverage gaps
- Documentation gaps
- Deprecated dependency usage
- Security vulnerability in dependencies

**Examples**:
- Hardcoded configuration values
- N+1 query performance issues
- Missing error logging
- Incomplete type definitions
- Skipped or inadequate tests

**Tech Debt Types**:
- **Deliberate**: Conscious tradeoff, documented
- **Accidental**: Oversight, should have been caught
- **Emergent**: Became debt as system evolved

#### 4.1.4 ENHANCEMENT (New Requirement)
**Definition**: New functionality not part of original specification.

**Note**: Enhancements follow NEW BUILD lifecycle (this canon does NOT govern enhancements - see BUILD_PHILOSOPHY.md). Only included for classification completeness.

### 4.2 Defect Triage Process

**Triage Ownership**: Foreman (FM) is responsible for defect triage in application repos.

**Triage Steps** (must be completed within 24 hours of defect discovery):

1. **Verify and Classify**
   - Reproduce defect in controlled environment
   - Classify into BUG, FEATURE, or TECH_DEBT
   - Determine root cause category (code, architecture, requirement gap, etc.)

2. **Assess Severity and Priority**
   - **CRITICAL**: Production down, data loss, security breach, blocking users
   - **HIGH**: Major functionality broken, significant user impact, workaround difficult
   - **MEDIUM**: Functionality degraded, moderate user impact, workaround available
   - **LOW**: Minor issue, cosmetic, limited impact, easy workaround

3. **Determine Impact Scope**
   - Affected user base (all users, specific cohort, admin only, etc.)
   - Affected functionality (core workflow, secondary feature, edge case)
   - Business impact (revenue, reputation, compliance)
   - Technical impact (system stability, performance, scalability)

4. **Create Defect Record**
   - Document in issue tracker with classification, severity, scope
   - Link to reproduction steps and evidence
   - Assign to appropriate fix cycle

### 4.3 Defect Traceability Requirements

**Every defect MUST have**:
- Unique identifier (issue number)
- Classification (BUG/FEATURE/TECH_DEBT)
- Severity (CRITICAL/HIGH/MEDIUM/LOW)
- Discovery date and discoverer
- Reproduction steps
- Expected vs. actual behavior
- Impact assessment
- Fix assignment and status
- Resolution verification evidence

**Traceability Chain**:
```
Defect Report → Triage Decision → Fix Architecture → Fix QA → Implementation → Validation → Deployment → Verification → Closure
```

All steps must be documented and linked.

---

## 5. FM Fix Planning and Authorization

### 5.1 Fix Cycle Initiation

**Initiation Authority**: FM or human owner (Johan in bootstrap mode)

**Initiation Triggers**:
- CRITICAL defect discovered (immediate response required)
- HIGH defect triaged and prioritized
- Scheduled maintenance window for accumulated MEDIUM/LOW defects
- Tech debt remediation sprint
- Security patch required

**Pre-Fix Safety Checks** (FM MUST complete before authorizing fix):

1. **Production State Verification**
   - Current production version identified
   - Deployment history reviewed
   - Current user activity assessed
   - Active business processes identified

2. **Impact Analysis**
   - Blast radius calculated (what could break)
   - Rollback requirements determined
   - Data migration needs assessed
   - User communication required (yes/no)

3. **Resource Validation**
   - Builder availability confirmed
   - Testing environment ready
   - Deployment window scheduled
   - Emergency contacts identified

4. **Governance Readiness**
   - All required governance canon available
   - PR gates operational
   - QA infrastructure functional
   - Evidence storage prepared

### 5.2 Fix Architecture (Mandatory)

**Principle**: Every defect fix requires architecture before implementation - same as new builds.

**Architecture Requirements**:

1. **Root Cause Analysis (RCA)**
   - Precise defect cause identified
   - Contributing factors documented
   - Assumption failures catalogued

2. **Fix Design**
   - Solution approach defined
   - Alternative approaches considered and rejected with rationale
   - Success criteria specified
   - Edge cases and error handling designed

3. **Impact Assessment**
   - Files and components affected
   - Breaking change risk evaluated
   - Dependency changes identified
   - Database migrations specified

4. **Test Strategy**
   - New tests required for defect coverage
   - Existing tests requiring updates
   - Regression test scope defined
   - Performance test requirements

5. **Deployment Strategy**
   - Deployment sequence specified
   - Configuration changes documented
   - Rollback procedure defined
   - Verification steps listed

**Architecture Approval**: 
- Standard fixes: FM self-approval permitted
- Protected file changes: CS2 Architecture Approval required (same as new builds)
- Critical production systems: Human owner approval required

**Documentation**: Architecture must be captured in issue comments or dedicated architecture document linked to defect.

### 5.3 Fix Authorization Gate

**Before builder appointment, FM MUST verify**:

✅ **Architecture Complete**
- Root cause analysis documented
- Fix design specified
- Impact assessment complete
- Test strategy defined
- Deployment strategy ready

✅ **Safety Validation**
- Rollback plan exists
- Production impact understood
- Resource availability confirmed
- Governance readiness verified

✅ **Priority and Sequencing**
- Fix priority justified
- Dependencies identified
- Sequencing conflicts resolved
- Concurrent fix risks assessed

**Authorization Evidence**: FM creates "Fix Authorization" comment on defect issue documenting gate completion.

---

## 6. Builder Appointment for Fix Cycles

### 6.1 Fix Builder Appointment

**Process**: Same as new builds - see **FM_BUILDER_APPOINTMENT_PROTOCOL.md**

**Fix-Specific Appointment Requirements**:

1. **Defect Context Transmission**
   - Defect report and classification
   - Root cause analysis
   - Fix architecture
   - Priority and urgency

2. **Production Safety Binding**
   - Rollback plan MUST be understood
   - Production constraints MUST be respected
   - Breaking change prohibition (unless approved)
   - Data integrity requirements

3. **Fix Scope Constraint**
   - Builder MUST fix ONLY the specified defect
   - Builder MUST NOT add new features during fix
   - Builder MUST NOT refactor unrelated code (unless tech debt fix)
   - Builder MUST NOT change behavior beyond fix requirements

**Appointment Documentation**: Fix builder appointment uses same protocol as new builds with additional fix-specific context.

### 6.2 Fix Builder Constraints

**Additional Constraints Beyond New Builds**:

1. **Minimal Change Principle**
   - Change only what's necessary to fix defect
   - Preserve existing behavior where possible
   - Avoid architectural refactoring unless required
   - Minimize production risk

2. **Backward Compatibility**
   - Breaking changes prohibited unless explicitly approved
   - API contracts must remain stable
   - Database migrations must be reversible
   - Configuration changes must be backward compatible

3. **Production Data Safety**
   - No destructive migrations without approval
   - Data backup verified before schema changes
   - User data integrity preserved
   - Audit trail maintained

---

## 7. Version Control and Release Management

### 7.1 Branching Strategy for Fixes

**Branch Types**:

1. **Hotfix Branches** (`hotfix/ISSUE-NUMBER-description`)
   - For CRITICAL production defects requiring immediate fix
   - Branch from production tag
   - Merge to both main and production branches
   - Deploy immediately after merge

2. **Fix Branches** (`fix/ISSUE-NUMBER-description`)
   - For HIGH/MEDIUM/LOW defects in normal fix cycle
   - Branch from main (or release branch if applicable)
   - Merge to main via standard PR process
   - Deploy in scheduled maintenance window

3. **Tech Debt Branches** (`tech-debt/ISSUE-NUMBER-description`)
   - For accumulated tech debt remediation
   - Branch from main
   - Merge via standard PR process
   - Deploy when convenient

**Branch Naming Convention**: 
```
{type}/{issue-number}-{short-description}

Examples:
- hotfix/ISSUE-1234-auth-bypass-vulnerability
- fix/ISSUE-5678-payment-calculation-error
- tech-debt/ISSUE-9012-remove-deprecated-api
```

### 7.2 Semantic Versioning for Fixes

**Version Increment Rules** (per VERSIONING_AND_EVOLUTION_GOVERNANCE.md):

- **PATCH version** (`x.y.Z`): Backward-compatible bug fixes
  - Defect fixes that don't change API
  - Internal implementation corrections
  - Performance improvements
  - Security patches (non-breaking)

- **MINOR version** (`x.Y.0`): Backward-compatible additions
  - New features added during fix cycle (rare, requires approval)
  - Deprecation notices
  - Internal API changes (still compatible)

- **MAJOR version** (`X.0.0`): Breaking changes
  - Breaking API changes (requires extraordinary approval)
  - Incompatible behavior changes
  - Removed deprecated functionality

**Standard Fix Cycle**: PATCH version increment

**Version Tagging**:
- Tag format: `vMAJOR.MINOR.PATCH`
- Tag creation: After merge, before deployment
- Tag message: Reference defect issue and brief description

### 7.3 Release Notes and Communication

**Release Note Requirements** (for each fix version):

1. **Version Identifier**: `vX.Y.Z` with release date
2. **Fixed Defects**: List of resolved issues with links
3. **Known Limitations**: Any remaining issues or workarounds
4. **Breaking Changes**: If any (should be rare)
5. **Upgrade Instructions**: Steps to deploy fix
6. **Rollback Instructions**: Steps to revert if needed

**Communication Channels**:
- Internal: Team notification, deployment log
- External: User-facing release notes (if applicable)
- Compliance: Audit trail, change log

**Mandatory Communication Triggers**:
- CRITICAL defect fix deployed
- User-facing functionality changed
- Security vulnerability patched
- Data migration performed
- API behavior modified

---

## 8. Quality Gates and Test Debt Prevention

### 8.1 Fix QA Requirements (Red-to-Green)

**Principle**: Fixes follow QA-to-Red → Build-to-Green same as new builds.

**Fix QA Creation** (FM responsibility):

1. **Defect Reproduction Test**
   - Test that reproduces defect (MUST FAIL before fix)
   - Demonstrates exact failure condition
   - Validates expected behavior after fix

2. **Regression Tests**
   - Existing tests MUST continue passing
   - Edge cases around defect area covered
   - Related functionality validated

3. **Integration Tests**
   - System integration preserved
   - Downstream dependencies not broken
   - API contracts maintained

4. **New Coverage Tests**
   - Gap that allowed defect is now covered
   - Similar defect patterns prevented
   - Architecture assumptions validated

**QA Validation**:
- FM creates Red QA demonstrating defect
- Builder implements fix to make tests green
- FM validates 100% GREEN before approval
- All existing tests MUST still pass (zero regression)

### 8.2 Zero Test Debt for Fixes

**Absolute Requirement**: Fix PRs MUST have ZERO test debt.

**Forbidden in Fix PRs**:
- ❌ Skipped tests (`.skip()`, `.todo()`, commented out)
- ❌ Incomplete tests (stubs, no assertions, TODO comments)
- ❌ Reduced test coverage (removing tests to "fix" failing tests)
- ❌ Test configuration changes that hide failures
- ❌ "Will test later" or deferred test creation

**Test Debt Discovery During Fix**:

If builder discovers existing test debt while fixing defect:

1. **Report Immediately**: Document as separate tech debt issue
2. **Do Not Expand Scope**: Fix original defect first
3. **Optional Tech Debt Fix**: If time permits and approved, fix in same PR; otherwise, separate issue
4. **Never Hide**: Test debt MUST be documented, never suppressed

**Enforcement**: PR gates validate zero test debt (same as new builds).

### 8.3 Fix Validation Requirements

**Before Merge Approval**:

1. **Local GREEN Validation**
   - All tests passing in development environment
   - No compilation/lint/type errors
   - No warnings (unless whitelisted)

2. **CI GREEN Validation**
   - All CI gates passing
   - All governance checks passing
   - Integration tests passing
   - Security scans clean

3. **Manual Verification** (FM responsibility)
   - Defect reproduction test now passes
   - Original defect symptoms resolved
   - No observable regression
   - Behavior matches fix architecture

4. **Production Readiness Check**
   - Deployment scripts tested
   - Rollback procedure verified
   - Monitoring configured
   - Communication prepared

**Handover Guarantee**: FM MUST verify ALL gates green before merge approval (per INCIDENT-2026-01-08-PR895-CATASTROPHIC-HANDOVER-FAILURE learnings).

---

## 9. Audit Trail and Evidence Requirements

### 9.1 Defect Lifecycle Evidence

**Required Evidence Documents**:

1. **Defect Discovery**
   - Initial defect report
   - Reproduction steps
   - Screenshots/logs demonstrating issue
   - User impact assessment

2. **Triage and Planning**
   - Classification decision and rationale
   - Severity assessment
   - Root cause analysis
   - Fix architecture document

3. **Implementation**
   - PR with fix code
   - QA showing defect reproduction (red) and resolution (green)
   - Code review comments
   - Builder handover statement

4. **Validation**
   - CI gate results (all green)
   - Manual verification evidence
   - Regression test results
   - Production readiness checklist

5. **Deployment**
   - Deployment log
   - Version tag
   - Release notes
   - Post-deployment verification

6. **Closure**
   - Defect verified fixed in production
   - User confirmation (if applicable)
   - Lessons learned captured
   - Governance promotion completed (if required)

### 9.2 Fix Evidence Storage

**Evidence Location**: 
- Primary: GitHub issue comments and PR description/comments
- Secondary: `/evidence/fixes/{issue-number}/` directory (for large artifacts)
- Audit: Version control history (git log, tags, branches)

**Evidence Retention**: Permanent (never delete fix evidence)

### 9.3 Audit Trail Requirements

**Every fix MUST have auditable**:
- Who discovered defect
- Who triaged and classified
- Who designed fix architecture
- Who implemented fix
- Who validated fix
- Who approved deployment
- Who verified in production
- When each step occurred
- Why decisions were made

**Auditability Principle**: An auditor with no prior knowledge should be able to reconstruct entire fix lifecycle from evidence.

---

## 10. Governance Gate Compliance for Fixes

### 10.1 PR Gates Apply to Fixes

**Principle**: Fix PRs pass through SAME governance gates as new build PRs.

**Applicable Gates** (all must pass):
- ✅ Governance compliance validation
- ✅ Agent role and contract validation
- ✅ Test coverage requirements
- ✅ Code quality standards
- ✅ Security vulnerability scanning
- ✅ Breaking change detection
- ✅ Architecture review (if CS2 triggered)

**No Gate Exemptions**: "It's a production fix" does NOT exempt from gates.

### 10.2 Fix-Specific Gate Considerations

**Additional Validations for Fix PRs**:

1. **Regression Detection**
   - Gate validates no existing tests broken
   - Gate validates test coverage not reduced
   - Gate validates no new warnings introduced

2. **Scope Constraint Validation**
   - Gate validates changes limited to fix scope
   - Gate validates no feature additions
   - Gate validates no unrelated refactoring

3. **Version Compliance**
   - Gate validates correct version increment
   - Gate validates version tag presence
   - Gate validates release notes present

4. **Rollback Readiness**
   - Gate validates rollback procedure documented
   - Gate validates breaking changes flagged (if any)
   - Gate validates deployment steps specified

**Gate Implementation**: See `.github/workflows/` for gate definitions.

### 10.3 Critical System Additional Gates

**For systems with active users or business impact**:

Additional human approval gates:
- Human owner approval required for CRITICAL defects
- Security review required for security defects
- Business owner approval for behavior changes
- Compliance review for regulated systems

**Definition of Critical System**: Any production system with:
- Active users (> 0 monthly active users)
- Business revenue dependency
- Regulatory compliance requirements
- Company-critical data
- Integration dependencies

---

## 11. Escalation and Rollback Procedures

### 11.1 Escalation Triggers

**Fix Cycle Must Escalate When**:

1. **Fix Attempt Fails**
   - Fix PR does not resolve defect
   - Fix PR introduces new defect
   - Fix PR fails governance gates repeatedly (3+ attempts)
   - Fix PR causes production incident

2. **Architecture Insufficient**
   - Root cause cannot be identified
   - Fix design complexity exceeds builder capability
   - Breaking changes required but not approved
   - Technical constraints prevent fix

3. **Governance Conflict**
   - Fix requires governance exemption
   - Fix scope conflicts with constitutional constraints
   - Fix timeline conflicts with quality requirements
   - Resource availability insufficient

4. **Production Risk Excessive**
   - Fix blast radius too large
   - Rollback not feasible
   - Data loss risk unmitigated
   - User impact exceeds acceptable threshold

**Escalation Target**: Human owner (Johan in bootstrap mode) or designated escalation authority.

**Escalation Evidence**: Document trigger, context, attempted solutions, and risk assessment.

### 11.2 Rollback Procedures

**Rollback Plan Required**: EVERY production fix MUST have defined rollback procedure before deployment.

**Rollback Procedure Components**:

1. **Trigger Conditions**
   - What conditions indicate rollback needed
   - Who has authority to trigger rollback
   - Response time requirements

2. **Rollback Steps**
   - Exact commands to revert deployment
   - Database migration reversal (if applicable)
   - Configuration restoration
   - Cache/state cleanup

3. **Verification Steps**
   - How to verify rollback successful
   - How to validate system stability
   - How to confirm user impact resolved

4. **Communication**
   - Who to notify of rollback
   - What information to communicate
   - Incident response protocol

**Rollback Testing**: Rollback procedure SHOULD be tested in staging before production deployment (for HIGH/CRITICAL defects).

### 11.3 Post-Rollback Protocol

**If Rollback Occurs**:

1. **Immediate**
   - Document rollback trigger and timing
   - Verify system stability after rollback
   - Communicate to stakeholders

2. **Within 24 Hours**
   - Root cause analysis of fix failure
   - Updated fix architecture
   - Revised deployment plan
   - Additional testing requirements identified

3. **Before Retry**
   - Original defect still exists (system back to defective state)
   - New fix attempt requires fresh FM authorization
   - Additional governance review may be required
   - Escalation may be necessary

**Rollback is NOT Failure**: Rollback is a safety mechanism. Failed fix is the failure.

---

## 12. Communication and Ripple Propagation

### 12.1 Defect Communication Requirements

**Internal Communication** (within team/org):

1. **Defect Discovery**
   - Notify team when CRITICAL/HIGH defect discovered
   - Document in team communication channel
   - Create issue with full context

2. **Fix Planning**
   - Notify team when fix authorized
   - Share fix architecture and timeline
   - Identify dependencies and coordination needs

3. **Fix Deployment**
   - Notify team before deployment
   - Share deployment window
   - Provide rollback contacts

4. **Fix Completion**
   - Notify team when fix deployed
   - Share release notes
   - Document lessons learned

**External Communication** (to users, if applicable):

- CRITICAL defects: Proactive notification recommended
- User-impacting fixes: Release notes published
- Security fixes: Communicate fix availability (without details)
- Breaking changes: Advance notice and migration guidance

### 12.2 Cross-Repository Ripple Awareness

**Defect Pattern Ripple**:

If defect discovered in one application may exist in others:

1. **Ripple Assessment** (FM responsibility)
   - Identify similar code/functionality in other repos
   - Assess likelihood of same defect
   - Determine ripple priority

2. **Ripple Notification**
   - Create issue in affected repos (or central tracking)
   - Document defect pattern and detection method
   - Provide fix approach for reference
   - Link to original defect and fix

3. **Ripple Verification**
   - Each affected repo validates presence/absence of defect
   - Each affected repo applies fix if needed
   - Each affected repo reports verification complete

**Governance Ripple**:

If defect reveals governance gap:

1. **Learning Promotion** (per LEARNING_INTAKE_AND_PROMOTION_MODEL.md)
   - Classify learning (governance gap identified)
   - Promote to governance canon update
   - Create governance change PR

2. **Layer-Down** (per CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md)
   - Updated governance propagates to all repos
   - Governance liaison agents implement changes
   - Verification of propagation completion

**Ripple Tracking**: Create "Ripple" label on issues to track cross-repo defect awareness.

### 12.3 Downstream Application Maintenance

**When Governance Repo Publishes Defect Fix**:

1. **Governance Administrator Creates Ripple Signal**
   - Documents governance defect and fix
   - Identifies affected downstream repos
   - Specifies layer-down requirements

2. **Downstream Repos Respond**
   - Governance liaison receives ripple signal
   - Liaison assesses local impact
   - Liaison creates fix issue if applicable
   - Liaison reports completion to governance repo

**When Application Repo Publishes Defect Fix**:

1. **FM Assesses Governance Impact**
   - Does defect reveal governance gap?
   - Does fix pattern apply to other repos?
   - Does learning warrant canonization?

2. **FM Reports to Governance** (if applicable)
   - Creates issue in governance repo
   - Documents defect pattern and learning
   - Proposes governance canon update
   - Links to application defect and fix

**Ripple Protocol Reference**: See GOVERNANCE_RIPPLE_MODEL.md and CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md

---

## 13. Step-by-Step Fix Playbooks

### 13.1 Critical Production Defect Playbook

**Scenario**: Production system down or severe user impact requiring immediate fix.

**Steps**:

1. **Immediate Response (0-15 minutes)**
   - ❶ Confirm defect existence and impact
   - ❷ Create CRITICAL defect issue
   - ❸ Assess production state and user impact
   - ❹ Determine if emergency workaround possible
   - ❺ Notify stakeholders (owner, team, users if needed)

2. **Triage and Planning (15-60 minutes)**
   - ❻ Perform quick root cause analysis
   - ❼ Design fix architecture (lightweight but complete)
   - ❽ Assess fix risk and rollback feasibility
   - ❾ Create rollback procedure
   - ❿ FM authorizes hotfix initiation

3. **Fix Implementation (1-4 hours)**
   - ⓫ FM appoints builder with URGENT priority
   - ⓬ FM creates Red QA demonstrating defect
   - ⓭ Builder implements fix to Green
   - ⓮ Builder creates hotfix PR
   - ⓯ FM validates 100% GREEN (all tests + manual)

4. **Deployment (30-60 minutes)**
   - ⓰ PR passes all governance gates
   - ⓱ FM approves merge
   - ⓲ Create version tag (PATCH increment)
   - ⓳ Deploy to production
   - ⓴ Verify fix in production
   - ㉑ Monitor for regression (1-24 hours)

5. **Post-Fix (24-72 hours)**
   - ㉒ Document lessons learned
   - ㉓ Perform full root cause analysis
   - ㉔ Promote learning to governance (if applicable)
   - ㉕ Create ripple notifications (if applicable)
   - ㉖ Update monitoring/alerting
   - ㉗ Close defect issue with full evidence

**Critical Constraints**:
- ⚠️ Do NOT skip architecture even under time pressure
- ⚠️ Do NOT bypass governance gates
- ⚠️ Do NOT accept test debt
- ⚠️ Do NOT deploy without rollback plan

### 13.2 Standard Defect Fix Playbook

**Scenario**: Non-critical bug requiring fix in normal development cycle.

**Steps**:

1. **Defect Triage (Within 24 hours of discovery)**
   - ❶ Verify and reproduce defect
   - ❷ Classify as BUG/FEATURE/TECH_DEBT
   - ❸ Assign severity (HIGH/MEDIUM/LOW)
   - ❹ Document in issue tracker
   - ❺ Prioritize against other work

2. **Fix Planning (When prioritized)**
   - ❻ Perform detailed root cause analysis
   - ❼ Design complete fix architecture
   - ❽ Define success criteria
   - ❾ Create test strategy
   - ❿ Assess production impact
   - ⓫ Create rollback procedure
   - ⓬ FM authorizes fix

3. **Fix Implementation (Per standard build timeline)**
   - ⓭ FM appoints builder per FM_BUILDER_APPOINTMENT_PROTOCOL.md
   - ⓮ FM creates comprehensive Red QA
   - ⓯ Builder implements fix to 100% GREEN
   - ⓰ Builder creates fix PR with full evidence
   - ⓱ FM validates all tests passing

4. **Review and Merge (Standard PR cycle)**
   - ⓲ PR passes all governance gates
   - ⓳ Code review completed
   - ⓴ FM approves merge
   - ㉑ Create version tag (PATCH increment)
   - ㉒ Prepare release notes

5. **Deployment (Scheduled maintenance window)**
   - ㉓ Deploy to staging first
   - ㉔ Verify in staging
   - ㉕ Deploy to production
   - ㉖ Verify fix in production
   - ㉗ Monitor for issues

6. **Closure (Within 48 hours of deployment)**
   - ㉘ Verify defect resolved
   - ㉙ Document evidence
   - ㉚ Promote learning (if applicable)
   - ㉛ Update documentation
   - ㉜ Close issue

### 13.3 Tech Debt Remediation Playbook

**Scenario**: Accumulated technical debt requiring cleanup.

**Steps**:

1. **Tech Debt Assessment (Quarterly or as needed)**
   - ❶ Review all open TECH_DEBT issues
   - ❷ Prioritize by risk and impact
   - ❸ Group related debt items
   - ❹ Create remediation sprint plan

2. **Remediation Planning (Per debt item)**
   - ❺ Define remediation scope
   - ❻ Design solution architecture
   - ❼ Assess breaking change risk
   - ❽ Plan migration path (if needed)
   - ❾ FM authorizes remediation

3. **Implementation (Standard process)**
   - ❿ FM appoints builder
   - ⓫ FM creates Red QA validating improvement
   - ⓬ Builder implements remediation
   - ⓭ Builder ensures 100% GREEN
   - ⓮ Builder creates tech-debt PR

4. **Review and Merge**
   - ⓯ PR passes governance gates
   - ⓰ Additional review for breaking changes
   - ⓱ FM approves
   - ⓲ Version increment (PATCH or MINOR depending on scope)
   - ⓳ Merge and tag

5. **Deployment and Verification**
   - ⓴ Deploy per standard process
   - ㉑ Verify improvement achieved
   - ㉒ Monitor for regression
   - ㉓ Close tech debt issue

### 13.4 Security Vulnerability Fix Playbook

**Scenario**: Security vulnerability discovered requiring patch.

**Steps**:

1. **Security Assessment (Immediate)**
   - ❶ Confirm vulnerability existence
   - ❷ Assess severity (CRITICAL/HIGH/MEDIUM/LOW)
   - ❸ Determine exploit risk and exposure
   - ❹ Assess if active exploitation occurring
   - ❺ Implement emergency mitigation (if possible)

2. **Security Planning (URGENT)**
   - ❻ Perform security-focused RCA
   - ❼ Design secure fix architecture
   - ❽ Assess breaking change requirements
   - ❾ Plan coordinated disclosure (if applicable)
   - ❿ Create rollback procedure
   - ⓫ FM authorizes security fix

3. **Secure Implementation (PRIORITY)**
   - ⓬ FM appoints builder (may require security expertise)
   - ⓭ FM creates security-focused Red QA
   - ⓮ Builder implements secure fix
   - ⓯ Security review of fix
   - ⓰ Builder ensures 100% GREEN
   - ⓱ Builder creates security fix PR

4. **Security Validation (Thorough)**
   - ⓲ PR passes all governance gates
   - ⓳ Additional security scanning
   - ⓴ Penetration testing (if warranted)
   - ㉑ Security expert review
   - ㉒ FM approves

5. **Secure Deployment (Controlled)**
   - ㉓ Create version tag (PATCH increment typically)
   - ㉔ Deploy to staging for verification
   - ㉕ Security verification in staging
   - ㉖ Deploy to production (may be urgent)
   - ㉗ Verify vulnerability eliminated
   - ㉘ Monitor for exploitation attempts

6. **Post-Security Fix (Critical)**
   - ㉙ Document vulnerability and fix (private initially)
   - ㉚ Notify users (after fix deployed)
   - ㉛ Coordinate disclosure (if external researcher)
   - ㉜ Promote security learning to governance
   - ㉝ Update security standards
   - ㉞ Close vulnerability issue

**Security Constraints**:
- ⚠️ Limit information sharing until fix deployed
- ⚠️ Do NOT disclose vulnerability details publicly before fix
- ⚠️ Do NOT commit vulnerability descriptions to public repos
- ⚠️ Prioritize security fix over feature work
- ⚠️ Follow responsible disclosure practices

---

## 14. Integration with Existing Governance

### 14.1 Build Philosophy Integration

**This canon extends BUILD_PHILOSOPHY.md to maintenance:**

- ✅ One-Time Build Law → One-Time Fix Law
- ✅ 100% GREEN philosophy → Applies to fix PRs
- ✅ Zero Test Debt → Applies to maintenance
- ✅ QA-to-Red discipline → Defect reproduction tests
- ✅ Architecture-first → Fix architecture required

**No Conflicts**: This canon does NOT weaken Build Philosophy; it applies it to post-production context.

### 14.2 OPOJD Integration

**One-Prompt One-Job Doctrine applies to fix cycles:**

FM executes fix lifecycle in single continuous run:
```
DEFECT_TRIAGE → FIX_ARCHITECTURE → RED_QA → BUILDER_APPOINT → BUILD_TO_GREEN → VALIDATE → MERGE → DEPLOY → VERIFY
```

FM MUST NOT pause for intermediate approval (except CS2 triggers or escalation).

**Execution Model**: Same autonomous continuous execution as new builds.

### 14.3 QA Policy Master Integration

**QA_POLICY_MASTER.md defect handling requirements met:**

- ✅ Defect discovery triggers QA gap analysis
- ✅ Fix QA prevents recurrence
- ✅ Regression prevention enforced
- ✅ Gate compliance maintained
- ✅ Learning promotion mandatory

**Failure Handling**: "Failures tolerated once" applies to defects - same defect recurring is governance violation.

### 14.4 Versioning and Evolution Integration

**VERSIONING_AND_EVOLUTION_GOVERNANCE.md requirements satisfied:**

- ✅ Semantic versioning enforced
- ✅ Version immutability maintained
- ✅ Version tagging required
- ✅ Release notes mandatory
- ✅ Audit trail preserved

### 14.5 Learning and Ripple Integration

**LEARNING_INTAKE_AND_PROMOTION_MODEL.md and GOVERNANCE_RIPPLE_MODEL.md:**

- ✅ Defect patterns promote to governance
- ✅ Lessons learned captured and distributed
- ✅ Cross-repo awareness maintained
- ✅ Governance evolves from defect insights

---

## 15. Enforcement and Compliance

### 15.1 Compliance Requirements

**All repositories MUST**:
- Implement defect triage process per Section 4
- Follow fix authorization gate per Section 5
- Enforce zero test debt for fixes per Section 8
- Maintain audit trail per Section 9
- Comply with governance gates per Section 10

**FM MUST**:
- Not authorize fixes without architecture
- Not approve PRs with test debt
- Not skip governance gates for fixes
- Not deploy without rollback plan

**Builders MUST**:
- Not implement fixes without FM authorization
- Not bypass Red QA discipline
- Not introduce test debt
- Not expand fix scope without approval

### 15.2 Violation Consequences

**Governance Violations**:
- Unapproved production change → Immediate escalation
- Test debt in fix PR → PR rejected
- Gate bypass → Incident investigation
- Repeat violation → Process review

**Learning Promotion**:
- Violations documented as governance failures
- Root cause analysis required
- Governance canon updated
- Enforcement improved

### 15.3 Continuous Improvement

**This canon evolves through**:
- Defect pattern learnings
- Fix cycle effectiveness data
- Incident root cause analyses
- Cross-repo collaboration
- Governance ripple feedback

**Canon Updates**: Versioned, layer-down propagated, auditable.

---

## 16. Downstream Implementation Guidance

### 16.1 First Application: PartPulse

**PartPulse Implementation Plan**:

1. **Phase 1: Foundation (Week 1)**
   - Review this canon with team
   - Identify current defects and classify
   - Create defect triage process
   - Set up evidence storage structure

2. **Phase 2: Process (Week 2)**
   - Implement fix authorization gate
   - Create fix PR templates
   - Configure governance gates for fixes
   - Document rollback procedures

3. **Phase 3: Validation (Week 3)**
   - Execute first fix using new protocol
   - Validate all steps functional
   - Gather lessons learned
   - Refine process

4. **Phase 4: Operation (Ongoing)**
   - Apply protocol to all defects
   - Track compliance metrics
   - Promote learnings to governance
   - Report effectiveness

**PartPulse-Specific Considerations**:
- Current production status
- Existing defect backlog size
- Team capacity for fix work
- User communication channels

### 16.2 Ripple to Other Repositories

**After PartPulse validation, ripple to**:
- FM office-app
- SlotMaster (if published)
- Future applications

**Ripple Process** (per CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md):
1. Governance Administrator creates ripple signal
2. Governance liaison in each repo receives signal
3. Liaison adapts protocol to local context
4. Liaison implements changes
5. Liaison reports completion
6. Governance Administrator verifies

**Layer-Down Timeline**: 2-4 weeks per repository

### 16.3 Repository-Specific Adaptation

**Each repository MAY adapt**:
- Defect classification labels (align with existing issue tracker)
- Communication channels (use existing team channels)
- Evidence storage locations (align with existing structure)
- Deployment processes (integrate with existing pipelines)

**Each repository MUST NOT adapt**:
- Zero test debt requirement (absolute)
- 100% GREEN requirement (absolute)
- Governance gate compliance (absolute)
- Architecture-first discipline (absolute)
- Audit trail requirements (absolute)

**Adaptation Principle**: Process mechanics flexible, quality standards absolute.

---

## 17. Acceptance Criteria

### 17.1 Canon Completeness

This canon is complete when it defines:
- ✅ Defect classification taxonomy
- ✅ Triage and traceability process
- ✅ FM planning and authorization gate
- ✅ Builder appointment for fixes
- ✅ Version control and branching strategy
- ✅ Quality gates and test debt prevention
- ✅ Audit trail requirements
- ✅ Communication and ripple protocols
- ✅ Approval, escalation, rollback procedures
- ✅ Step-by-step playbooks for all scenarios
- ✅ Integration with existing governance
- ✅ Downstream implementation guidance

**Status**: ✅ All requirements met

### 17.2 Governance Integration

This canon integrates with:
- ✅ BUILD_PHILOSOPHY.md
- ✅ OPOJD_DOCTRINE.md
- ✅ QA_POLICY_MASTER.md
- ✅ FM_ROLE_CANON.md
- ✅ FM_BUILDER_APPOINTMENT_PROTOCOL.md
- ✅ VERSIONING_AND_EVOLUTION_GOVERNANCE.md
- ✅ LEARNING_INTAKE_AND_PROMOTION_MODEL.md
- ✅ GOVERNANCE_RIPPLE_MODEL.md
- ✅ CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md

**Status**: ✅ Full integration achieved

### 17.3 Actionability

This canon provides:
- ✅ Clear defect classification method
- ✅ Explicit triage process
- ✅ Step-by-step fix playbooks
- ✅ Concrete safety checks
- ✅ Specific enforcement requirements
- ✅ Measurable compliance criteria

**Status**: ✅ Fully actionable

---

## 18. Version History

### Version 1.0.0 - 2026-01-09 (Initial Release)

**Created By**: Governance Administrator Agent  
**Approved By**: Maturion Engineering Leadership (Johan Ras)  
**Effective Date**: 2026-01-09

**Summary**: Initial canonical protocol for defect resolution and maintenance covering complete lifecycle from defect discovery through production deployment and closure.

**Scope**: All FM instances, all application repositories, all maintenance cycles

**Key Principles Established**:
- Maintenance is not exempt from governance
- One-Time Fix Law (fixes work first time)
- Production safety first
- Defect learning promotion mandatory
- Zero test debt for fixes (absolute)
- Architecture-first for all fixes
- Full audit trail required

**Integration Points**:
- Build Philosophy (One-Time Build Law extended)
- OPOJD (continuous execution for fix cycles)
- QA Policy Master (zero test debt, failure handling)
- FM Role Canon (FM authority over fix orchestration)
- Versioning Governance (semantic versioning, release management)
- Learning Promotion (defect pattern canonization)
- Governance Ripple (cross-repo defect awareness)

**Next Steps**:
1. Add to GOVERNANCE_CANON_MANIFEST.md
2. Create ripple signal for PartPulse
3. Layer down to all application repos
4. Monitor effectiveness and gather learnings
5. Promote learnings to governance as needed

---

## 19. Summary and Commitment

This canon establishes that **published systems are fully governed**.

**Core Commitments**:

1. **Quality**: Fixes meet same standards as new builds - 100% GREEN, zero test debt
2. **Safety**: Production changes are careful, reversible, auditable
3. **Learning**: Defects improve governance permanently
4. **Consistency**: All repos follow same defect resolution discipline
5. **Traceability**: Complete audit trail from discovery to closure

**Philosophical Alignment**:
- One-Time Fix Law (same as One-Time Build Law)
- Failures tolerated once (QA Policy Master)
- Continuous autonomous execution (OPOJD)
- Governance evolves stronger (Ripple Model)
- Architecture-first always (Build Philosophy)

**Governance Authority**: This canon has PUBLIC_API status - downstream repos MUST implement.

**Ripple Ready**: Protocol designed for immediate operationalization in PartPulse, then propagation to all sibling and downstream repos.

**Catastrophic Risk Mitigation**: Addresses owner feedback that unstructured defect fixes create catastrophic risk - this canon provides structure and safety.

---

**END OF CANON**
