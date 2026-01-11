# Protocol Violation Incident — [Brief Title]

## Incident Metadata

**Incident ID**: PV-[YYYY-MM-DD]-[REPO]-[PR-NUMBER]  
**Date Detected**: [YYYY-MM-DD]  
**Repository**: [Repository name]  
**PR Number**: [#XXX] — [Link to PR]  
**Agent**: [Agent name/type]  
**Agent Type**: [FM / Builder / Other]  
**Severity**: [CRITICAL / HIGH / MEDIUM / LOW]  
**Status**: [OPEN / RESOLVED / ESCALATED]

---

## Violation Details

### Violation Type

Select all that apply:

- [ ] PR merged without required PREHANDOVER_PROOF
- [ ] Incomplete PREHANDOVER_PROOF (specify missing sections below)
- [ ] False execution claims (evidence does not support claims)
- [ ] Gate enumeration incomplete
- [ ] Exit codes missing
- [ ] Timestamps missing
- [ ] Execution validation not performed
- [ ] Artifacts not created before handover
- [ ] Reviewer approved without verification
- [ ] Other: [Description]

### Missing PREHANDOVER_PROOF Sections (if applicable)

- [ ] Artifacts Created section
- [ ] Execution Validation section
- [ ] Preflight Gate Status section
- [ ] Exit Codes
- [ ] Execution Timestamp section
- [ ] Handover Guarantee section

### Detailed Description

[Provide detailed description of what was missing, incorrect, or violated]

**What should have been done**:
[Description]

**What was actually done**:
[Description]

---

## Impact Assessment

### CI Status
**CI Build Result**: [PASS / FAIL]  
**CI Failure Details**: [If failed, describe failure or "N/A"]

### Production Impact
**Production Affected**: [YES / NO]  
**Impact Description**: [If YES, describe impact or "N/A"]  
**Severity of Production Impact**: [CRITICAL / HIGH / MEDIUM / LOW / NONE]

### Remediation Effort
**Additional PRs Required**: [YES / NO]  
**Number of Follow-up PRs**: [X or 0]  
**Hours Spent Remediating**: [X hours]  
**Team Members Involved**: [Names/roles]

### Business Impact
**Customer-Facing Issue**: [YES / NO]  
**Deployment Delayed**: [YES / NO]  
**Trust Impact**: [Description if applicable or "None"]

---

## Root Cause Analysis

### Immediate Cause
[What directly caused this violation? E.g., "Agent did not read PR checklist", "Agent misunderstood scope of protocol", "CI gate failed but agent assumed optional"]

### Contributing Factors
[What factors contributed? E.g., "Protocol ambiguity in Step 5", "Template not linked in agent contract", "Time pressure", "Inadequate training"]

### Root Cause
[Fundamental reason why this occurred. E.g., "Agent contract does not explicitly require PREHANDOVER_PROOF", "No training provided on protocol", "Governance defect: unclear when protocol applies"]

### Root Cause Category
- [ ] Agent misunderstanding / lack of knowledge
- [ ] Agent contract incomplete or unclear
- [ ] Protocol ambiguity or defect
- [ ] Reviewer oversight
- [ ] Technical blocker (could not execute locally)
- [ ] Time pressure / resource constraint
- [ ] Other: [Description]

---

## Evidence

### PR Links
- **PR Link**: [URL]
- **PR Description**: [Link to specific section or "Missing"]
- **CI Run**: [Link to failing/passing CI run]

### Agent Contract Review
- **Contract Link**: [Link to agent contract file]
- **Contract References Protocol**: [YES / NO]
- **Contract Version**: [Version if applicable]

### Communication Records
- **Agent Notified**: [Date and method]
- **Agent Response**: [Summary or "Pending"]
- **Escalation Created**: [Link to escalation issue or "N/A"]

---

## Immediate Remediation

### Actions Taken
1. [Action 1 - e.g., "Notified agent via PR comment"]
2. [Action 2 - e.g., "Created follow-up PR to fix issue"]
3. [Action 3 - e.g., "Updated agent contract to clarify requirement"]

### Remediation Status
- [ ] Agent notified
- [ ] Violation recorded in tracking system
- [ ] Follow-up PR created (if needed)
- [ ] CI failures addressed
- [ ] Production impact mitigated (if applicable)

### Remediation Complete Date
**Date**: [YYYY-MM-DD] or "In Progress"

---

## Long-Term Prevention

### Agent-Level Prevention
**Actions Required**:
- [ ] Agent training on Execution Bootstrap Protocol
- [ ] Agent contract updated with explicit PREHANDOVER_PROOF obligation
- [ ] Agent provided with protocol reference materials
- [ ] Agent acknowledgment of protocol requirements
- [ ] Monitor next 3 PRs from agent for compliance

**Responsible**: [FM / Governance Liaison / Governance Administrator]  
**Target Date**: [YYYY-MM-DD]

### Repository-Level Prevention
**Actions Required**:
- [ ] Update PR template to remind agents
- [ ] Add PREHANDOVER_PROOF validation to CI (if not present)
- [ ] Update agent onboarding materials
- [ ] Review all agent contracts for protocol references
- [ ] Establish weekly PR review process (if not present)

**Responsible**: [Governance Liaison / Repository Admin]  
**Target Date**: [YYYY-MM-DD]

### Governance-Level Prevention
**Actions Required** (if governance defect):
- [ ] Protocol clarification issued
- [ ] Protocol amendment proposed
- [ ] Template updated
- [ ] Ripple signal sent to all repositories
- [ ] All agents notified of clarification

**Responsible**: [Governance Administrator]  
**Target Date**: [YYYY-MM-DD]

---

## Governance Defect Analysis

**Governance Defect Detected**: [YES / NO]

If YES, describe:

**Defect Type**:
- [ ] Protocol ambiguity (unclear when/how to apply)
- [ ] Template incomplete or confusing
- [ ] Reference implementation insufficient
- [ ] Escalation process unclear
- [ ] Contract language too weak
- [ ] Other: [Description]

**Defect Description**: [What is unclear or defective in governance?]

**Proposed Fix**: [How should governance be amended?]

**Escalation Status**: [ESCALATED TO GOVERNANCE ADMINISTRATOR / ESCALATED TO MATURION / RESOLVED]

---

## Lessons Learned

### What Worked Well
- [Positive aspect 1]
- [Positive aspect 2]

### What Didn't Work
- [Problem 1]
- [Problem 2]

### Key Learnings
1. **[Learning 1]**: [Description and why it matters]
2. **[Learning 2]**: [Description and why it matters]
3. **[Learning 3]**: [Description and why it matters]

### Recommended for Promotion
**Promote to Governance Canon**: [YES / NO]

If YES:
- **Target Document**: `governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md` or [other]
- **Learning Statement**: [Concise learning statement]
- **Status**: [DRAFTED / SUBMITTED / PROMOTED]

---

## Resolution

### Resolution Summary
[Brief summary of how this violation was resolved]

### Prevention Measures Implemented
- [Measure 1]
- [Measure 2]
- [Measure 3]

### Follow-Up Actions
- [ ] Monitor agent's next PR for compliance
- [ ] Verify training effectiveness after 2 weeks
- [ ] Update quarterly tracking metrics
- [ ] Review pattern if same violation occurs again

### Resolution Checklist
- [ ] Violation acknowledged by agent
- [ ] Agent notified with resources
- [ ] Immediate remediation complete
- [ ] Long-term prevention measures implemented
- [ ] Governance defect escalated (if applicable)
- [ ] Lessons learned documented
- [ ] Incident closed in tracking system

### Resolution Date
**Date**: [YYYY-MM-DD] or "Open"

### Resolved By
**Name**: [Person/Agent who resolved]  
**Role**: [FM / Governance Liaison / Governance Administrator]

---

## Escalation

**Escalated**: [YES / NO]

If YES:

**Escalation Date**: [YYYY-MM-DD]  
**Escalated To**: [Governance Administrator / Maturion / Other]  
**Escalation Issue**: [Link to GitHub Issue or "Email sent"]  
**Escalation Reason**: [Why escalated - e.g., "CRITICAL severity", "Governance defect", "Repeated pattern"]  
**Escalation Status**: [OPEN / RESOLVED]  
**Resolution Date**: [YYYY-MM-DD or "Pending"]

---

## Tracking and Reporting

### Violation Recorded In
- [x] Repository tracking: `governance/incidents/protocol-violations/TRACKING.md`
- [ ] Quarterly monitoring report: Q[X] [YEAR]
- [ ] Governance repository aggregate tracking (if HIGH/CRITICAL)

### Related Incidents
- [Link to related violation or "None"]
- [Link to related violation or "None"]

### Pattern Analysis
**Part of Pattern**: [YES / NO]  
**Pattern Description**: [If YES, describe pattern or "N/A"]  
**Pattern ID**: [If tracked, provide ID or "N/A"]

---

## Sign-Off

**Incident Created By**: [Name]  
**Date**: [YYYY-MM-DD]

**Reviewed By**: [Governance Liaison / FM / Governance Administrator]  
**Date**: [YYYY-MM-DD]

**Approved for Closure By**: [Name and role]  
**Date**: [YYYY-MM-DD or "Pending"]

---

**Incident Status**: [OPEN / RESOLVED / ESCALATED]  
**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL_MONITORING_AND_ENFORCEMENT.md`  
**Template Version**: 1.0.0

---

*End of Protocol Violation Incident Report*
