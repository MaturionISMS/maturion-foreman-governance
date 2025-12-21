# ESCALATION AND TEMPORARY OVERRIDE PROTOCOL

## Status
Canonical Governance Protocol  
Authority: Johan Ras  
Applies To: ALL agents (Governance Administrator, Foreman, Builders)  
Precedence: Subordinate to GOVERNANCE_PURPOSE_AND_SCOPE.md and AGENT_NON_STALLING_AND_ESCALATION_POLICY.md

---

## 1. Purpose

This protocol defines the **formal process** for requesting and executing temporary overrides
when governance enforcement blocks legitimate agent work.

Temporary overrides are **explicit governance flexing** — not violations.

This protocol ensures:
- Overrides are traceable
- Scope is bounded
- Governance resumes immediately after
- Learning is captured

---

## 2. When to Use This Protocol

Use this protocol when:

- An agent encounters a governance gate or enforcement rule that blocks valid work
- The blockage is due to missing initialization, permissions, or artifacts
- Bypassing the rule temporarily is necessary to complete the task
- Normal escalation per AGENT_NON_STALLING_AND_ESCALATION_POLICY has occurred

Do NOT use this protocol for:
- Bypassing QA failures (fix the code instead)
- Avoiding scope discipline (reduce scope instead)
- Skipping required artifacts (create them instead)
- Permanent governance changes (use normal governance change process)

---

## 3. Temporary Override Request Format

When requesting a temporary override, the agent MUST provide:

### 3.1 Request Header
```
TEMPORARY OVERRIDE REQUEST

Requesting Agent: [Governance Administrator / Foreman / Builder]
Date: [ISO 8601 timestamp]
Build/Task ID: [identifier]
```

### 3.2 Blocking Condition
- **Gate/Rule Blocked:** [exact gate name or rule reference]
- **Error/Output:** [exact error message or gate output]
- **Governance Reference:** [link to governance file and section]

### 3.3 Impact Analysis
- **Work Blocked:** [what cannot proceed]
- **Downstream Effects:** [what else is affected]
- **Risk of Not Overriding:** [consequences of remaining blocked]

### 3.4 Proposed Override (REQUIRED)
- **Scope:** [exact files, permissions, or rules to temporarily disable]
- **Duration:** [time-bound OR condition-bound, e.g., "until initialization PR merges"]
- **Justification:** [why this does not weaken governance]
- **Rollback Plan:** [how enforcement resumes]

### 3.5 Alternative Considered
- **Why normal path won't work:** [explanation]
- **Remediation Path:** [what will fix this permanently]

---

## 4. Authorization Authority

Only **Johan** may authorize temporary overrides.

Foreman may NOT self-authorize.  
Builders may NOT self-authorize.  
Governance Administrator may NOT self-authorize.

Authorization must be explicit, written, and scoped.

---

## 5. Authorization Response Format

When Johan authorizes an override, the response MUST include:

```
TEMPORARY OVERRIDE AUTHORIZED

Override ID: [unique identifier]
Authorized By: Johan Ras
Date: [ISO 8601 timestamp]

Approved Scope: [exact scope from request, potentially narrowed]
Approved Duration: [time or condition]
Conditions: [any additional constraints]

Incident Registration Required: YES
Follow-up PR Required: [YES/NO and timeline if yes]
```

---

## 6. Execution Rules

Once authorized, the agent:

1. **MUST** create an incident record (see Section 8)
2. **MAY** proceed ONLY within the approved scope
3. **MUST** complete work within the approved duration
4. **MUST NOT** expand scope or make unrelated changes
5. **MUST** restore normal enforcement immediately after
6. **MUST** create follow-up PR if required

---

## 7. Incident Registration (Mandatory)

Every authorized override MUST be registered as an incident.

### 7.1 Incident Record Location

Incidents MUST be stored at:

```
governance/incidents/override-[YYYYMMDD]-[sequence].md
```

Example: `governance/incidents/override-20251221-001.md`

### 7.2 Incident Record Schema

```markdown
# TEMPORARY OVERRIDE INCIDENT

**Incident ID:** override-[YYYYMMDD]-[sequence]
**Created:** [ISO 8601 timestamp]
**Resolved:** [ISO 8601 timestamp or "IN PROGRESS"]
**Status:** [AUTHORIZED / EXECUTED / RESOLVED]

## Override Request

[Full request from Section 3]

## Authorization

[Full authorization from Section 5]

## Execution Log

**Started:** [timestamp]
**Completed:** [timestamp]
**Scope Adhered To:** [YES/NO with explanation]
**Changes Made:** [list of files/permissions modified]
**Evidence:** [links to PRs, commits, logs]

## Resolution

**Enforcement Restored:** [YES/NO]
**Follow-up PR:** [link or "NOT REQUIRED"]
**Permanent Fix:** [description or "PENDING"]
**Lessons Learned:** [what this incident teaches us]

## Analytics

**Incident Category:** [Permission Gap / Missing Artifact / Bootstrap / Other]
**Affected Component:** [domain or system]
**Recurrence:** [FIRST / SECOND / THIRD+]
**Governance Improvement Needed:** [YES/NO with details]
```

---

## 8. Incident Analytics & Learning

All override incidents MUST be:

1. **Tracked:** Incident ID assigned and recorded
2. **Categorized:** By type and root cause
3. **Analyzed:** For patterns and recurrence
4. **Promoted:** To governance improvements if recurring

### 8.1 Recurrence Thresholds

- **First Occurrence:** Acceptable, record and learn
- **Second Occurrence (same type):** Warning signal, requires analysis
- **Third Occurrence (same type):** Governance defect, MUST promote fix to canon

### 8.2 Learning Promotion

If override incidents reveal:
- Missing permissions model
- Insufficient bootstrap guidance
- Ambiguous enforcement rules
- Gaps in governance completeness

These MUST be promoted to canonical governance fixes via normal governance PR process.

---

## 9. Bootstrap Overrides (Special Case)

When new governance introduces requirements that FM has not yet operationalized:

1. Governance PR MUST declare "BOOTSTRAP OVERRIDE REQUIRED"
2. Override scope MUST be limited to initialization phase
3. Follow-up PR MUST be specified with timeline
4. See GOVERNANCE_FM_TRANSITION_POLICY.md for full bootstrap protocol

Bootstrap overrides are time-bound and MUST resolve within one iteration.

---

## 10. Audit Trail

All temporary overrides are **auditable governance events**.

Audit trail MUST include:
- Request timestamp
- Authorization timestamp
- Execution timestamps
- Scope adherence verification
- Resolution confirmation
- Learning capture

Incomplete audit trails indicate governance failure.

---

## 11. Prohibited Actions

Agents MUST NEVER:

- Execute overrides without authorization
- Extend scope beyond approved boundaries
- Treat temporary overrides as permanent solutions
- Hide override execution from incident system
- Skip incident registration
- Bypass this protocol

Violations invalidate the work and trigger governance incident response.

---

## 12. Success Metrics

This protocol is successful when:

- Override requests are clear and well-scoped
- Authorization is fast and confident
- Execution stays within boundaries
- Enforcement resumes cleanly
- Recurrence decreases over time
- Governance improves from learning

---

## 13. Principle

Temporary overrides are not governance failures —  
they are **explicit, traceable, time-bound governance flexing**.

The protocol makes the implicit explicit,  
the hidden visible,  
and the temporary truly temporary.

---

End of ESCALATION AND TEMPORARY OVERRIDE PROTOCOL
