# Governance Incidents Directory

## Purpose

This directory contains formal incident reports for governance violations, test dodging, and other catastrophic governance failures discovered during execution.

Governance incidents are distinct from execution incidents (documented in `docs/autonomy/incidents/`) and represent constitutional violations that threaten the integrity of the Maturion governance model.

---

## What Qualifies as a Governance Incident

Per **GOVERNANCE_INCIDENT_RESPONSE_DOCTRINE.md**, a governance incident occurs when any governance, merge, or authority-enforcing control fails, including:

- **Test dodging or skipped validations**
- "99% build" submissions or missing attestations
- Phase mismatches (e.g. BUILD_TO_GREEN enforced during RED_QA)
- Builder modification of governance-owned files
- Agent mentality drift (.agent misalignment)
- Invalid or missing governance attestations
- Any form of self-governance
- **Configuration changes that suppress quality signals without authorization**

All governance incidents are classified as **Governance RED**.

---

## Incident Severity Classifications

- **CATASTROPHIC**: First-time governance violation, structural failure, or test dodging
- **EMERGENCY**: Second-time occurrence of a known pattern (triggers TARP)
- **CRITICAL**: Governance bypass without authorization
- **HIGH**: Authority boundary violation
- **MEDIUM**: Process deviation requiring correction

---

## Incident File Structure

Each incident file follows this structure:

```markdown
# INCIDENT: [Brief Title]

**Incident ID**: INCIDENT-YYYY-MM-DD-[SHORT-NAME]
**Date Discovered**: YYYY-MM-DD
**Severity**: [CATASTROPHIC|EMERGENCY|CRITICAL|HIGH|MEDIUM]
**Category**: [Test Dodging|Governance Violation|Authority Bypass|etc]
**Status**: [ACTIVE INVESTIGATION|UNDER REMEDIATION|RESOLVED|CLOSED]
**Discovered By**: [Name/Role]

---

## Executive Summary
[Brief description of the violation]

## What Happened
[Timeline and sequence of events]

## The Evidence
[Concrete evidence of the violation]

## Why This Is [Severity]
[Analysis of impact and constitutional violations]

## Root Cause Analysis
[Investigation into why this occurred]

## Impact Assessment
[Immediate and long-term consequences]

## Corrective Actions Required
[Remediation plan with timeline]

## Governance Implications
[Constitutional principles violated, policy updates needed]

## Bootstrap Learning Candidate
[Proposed learning entry if applicable]

## Next Steps
[Action items with ownership]

## Evidence Trail
[Supporting documentation and references]

## References
[Links to related governance documents]

## Approval Required
[CS2+ sign-off requirements]

## Status Updates
[Chronological log of progress]
```

---

## Incident Lifecycle

1. **Discovery**: Governance violation detected (by human or automated system)
2. **Documentation**: Formal incident file created in this directory
3. **Investigation**: Root cause analysis performed
4. **Classification**: Severity and category assigned
5. **Corrective Action**: Remediation plan created and executed
6. **Learning Capture**: Bootstrap Learning entry created if applicable
7. **Resolution**: All corrective actions completed
8. **Closure**: CS2+ approval and final status update

---

## Integration with Bootstrap Learnings

Governance incidents often result in **Bootstrap Learning (BL)** entries in:
- `governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md`

When an incident reveals a structural pattern that should be permanently prevented, a BL entry is created to:
- Capture the pattern
- Define forward-binding expectations
- Specify ripple implications
- Prevent second-time occurrences

---

## Authority and Responsibility

### Detection
- **Builders**: Must report any governance violations discovered during work
- **FM**: Must detect and escalate governance incidents automatically
- **Human (CS2)**: Manual oversight and incident discovery

### Response
- **FM**: First-line responder for behavioral compliance issues
- **Governance Admin Agent**: Documents incidents, creates RCA reports, proposes governance updates
- **Codex**: Executes governance mutations after CS2 approval
- **Human (CS2)**: Ultimate authority for incident classification and resolution approval

### Enforcement
- Incident discovery triggers **immediate HALT** of affected work
- No work proceeds until corrective actions completed
- Second-time failures trigger **TARP activation** (Trigger Action Response Plan)
- Third-time failures must be impossible by design

---

## Relationship to Other Governance Artifacts

### Governance Canon
- `governance/philosophy/GOVERNANCE_INCIDENT_RESPONSE_DOCTRINE.md` - Incident response policy
- `governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md` - Pattern capture and prevention
- `governance/policy/QA_POLICY_MASTER.md` - Test dodging definitions
- `BUILD_PHILOSOPHY.md` - Constitutional principles

### Escalation
- `governance/escalation/ESCALATION_POLICY.md` - When to escalate incidents

### Learning Models
- `governance/canon/LEARNING_INTAKE_AND_PROMOTION_MODEL.md` - How incidents become learnings

### Reports
- `governance/reports/` - RCA reports, gap analyses, and corrective action plans

---

## Incident Visibility Requirements

All governance incidents must be:
- **Visible**: Documented in this directory with full context
- **Tracked**: End-to-end lifecycle monitoring
- **Auditable**: Complete evidence trail
- **Learning-Enabled**: Forward-scan for similar patterns
- **Repeat-Prevented**: BL entries for systemic patterns

Per governance doctrine: **Untracked incidents are governance failures.**

---

## Current Incidents

### Active Investigations
- `INCIDENT-2026-01-08-TEST-DODGING-WARNING-SUPPRESSION.md` - Test dodging via pytest warning suppression

### Resolved Incidents
_(None yet)_

---

## Metrics and Reporting

Incident metrics tracked:
- Incident count by severity
- Time to detection
- Time to resolution
- Repeat occurrence rate (should be zero after BL creation)
- Pattern emergence (new vs known patterns)

These metrics inform governance effectiveness and identify systemic weaknesses.

---

## Constitutional Requirements

Per **GOVERNANCE_INCIDENT_RESPONSE_DOCTRINE.md**:

- Governance failures are never ignored
- Builders never fix governance
- FM never mutates constitutions
- Codex never acts without approval
- Humans are always informed
- **Silent recovery is forbidden**

---

## Success Criteria

This incident system is successful when:
- Governance incidents become rare
- Detection is automatic and immediate
- Response is systematic and complete
- Learning prevents recurrence
- Authority boundaries remain intact
- Speed and control coexist

---

**Last Updated**: 2026-01-08  
**Maintained By**: Governance Administrator Agent  
**Authority**: Constitutional - Governance RED
