# AGENT NON-STALLING & ESCALATION POLICY

## Status
Canonical Governance Policy  
Authority: Johan Ras  
Applies To: ALL agents (Governance Administrator, Foreman, Builders)  
Precedence: Subordinate only to GOVERNANCE_PURPOSE_AND_SCOPE.md

---

## 1. Purpose

This policy ensures that **no agent may halt silently** due to missing permissions,
tools, authority, or constraints.

Agents exist to complete work, not to wait passively.
When blocked, agents must escalate with clarity, context, and proposed resolution.

This policy enables automation without governance erosion.

---

## 2. Absolute Rule (Non-Negotiable)

> **An agent MUST NEVER stop work silently.**

If an agent cannot proceed, it MUST escalate.

"No spade" is not an acceptable terminal state.

---

## 3. Mandatory Escalation Triggers

An agent MUST escalate if ANY of the following are true:

- A required PR / QA / governance gate fails
- A resource is inaccessible (e.g. permissions, API access)
- A required artifact, domain, or capability is missing
- Enforcement logic blocks progress
- Proceeding would require:
  - bypassing governance
  - inventing authority
  - weakening enforcement

At this point, halting is forbidden.

---

## 3.1 PR Gate Failure Rule (Mandatory)

**An agent MUST treat any failing applicable PR gate as an incomplete task.**

When a PR gate fails, the agent MUST follow the procedure defined in:
**`governance/policy/PR_GATE_FAILURE_HANDLING_PROTOCOL.md`**

This protocol is **mandatory and binding**, not advisory.

### 3.1.1 Core Requirements

The agent MUST:

1. **Fix the failure** if within scope and capability, OR
2. **Escalate immediately** with:
   - **Gate name** (exact identifier)
   - **Failure reason** (specific error or condition)
   - **Proposed solution** (concrete remediation path)

**Submitting a PR with failing gates without escalation is PROHIBITED.**

### 3.1.2 Applicability

This rule applies to all gates that are applicable to the agent's work:
- Governance gates (completeness, coherence, scope)
- Quality gates (linting, testing, security)
- Enforcement gates (policy compliance, artifact validation)

### 3.1.3 Prohibited Behaviors

Agents may not:
- Ignore gate failures
- Mark work as complete while gates fail
- Wait silently for gates to pass
- Assume gates are "not their responsibility"
- Bypass the mandatory procedure in PR_GATE_FAILURE_HANDLING_PROTOCOL.md

### 3.1.4 Enforcement

If a gate failure is not fixable by the agent, escalation per the protocol is mandatory.

The 5-step procedure documented in PR_GATE_FAILURE_HANDLING_PROTOCOL.md is the **canonical method** for handling PR gate failures and MUST be followed.

### 3.1.5 Gate Status Observation (Mandatory)

**Agents MUST determine gate status using Gate Debug Reports.**

Per `PR_GATE_DEBUG_REPORTS_POLICY.md` Section 3 (Normative Requirements):

- **Gate Debug Reports are AUTHORITATIVE** for determining gate pass/fail status
- Reports are located in `.github/gate-reports/` and conform to `GATE_DEBUG_REPORT_SCHEMA.json`
- Agents MUST read the gate report file and parse the `status` field from the JSON summary block

**Prohibited observation methods:**
- CI logs or GitHub Actions output
- PR comments or GitHub UI state
- Assumptions based on workflow file inspection

**Rationale:** Gate Debug Reports are repository-visible, machine-readable, and accessible to all agents regardless of GitHub API credentials. They are the authoritative interface between gates and agents.

**Enforcement:** If a gate runs but does not emit a report, the gate MUST be considered FAILED per PR_GATE_DEBUG_REPORTS_POLICY.md Section 3.3.

---

## 4. Escalation Content Requirements (Problem + Solution)

When escalating to Johan, the agent MUST provide:

### 4.1 Problem Statement
- What is blocking progress
- Exact gate / file / rule involved
- Evidence (logs, error codes, outputs)

### 4.2 Impact
- Why work cannot proceed
- What remains incomplete

### 4.3 Proposed Resolution (MANDATORY)
The agent MUST propose **one concrete, minimal solution**, such as:
- Required permission change
- Temporary override
- Artifact creation
- Registry update
- Workflow correction

Escalations that present only problems are invalid.

---

## 5. Temporary Override Request

If resolution requires a governance exception, the agent MUST:

- Explicitly request a **temporary override**
- Specify:
  - Scope (exact files / permissions)
  - Duration or condition
  - Why this does not weaken governance
- Reference the `ESCALATION_AND_TEMPORARY_OVERRIDE_PROTOCOL.md`

The agent MUST NOT self-authorize.

---

## 6. Authorization & Execution

If Johan authorizes the override:

- The agent MAY proceed ONLY within the approved scope
- No additional changes are permitted
- Normal enforcement resumes immediately after execution

---

## 7. Mandatory Incident Registration

Every authorized override MUST be registered as an INCIDENT.

Incident records MUST include:
- Blocking condition
- Proposed solution
- Authorized action
- Affected components
- Authorizing authority (Johan)
- Remediation path

Incidents are governance data, not failures.

---

## 8. Analytics & Learning

Incident data MUST be:
- Retained
- Aggregated
- Used to identify:
  - recurring bottlenecks
  - permission gaps
  - governance friction
  - automation maturity

Repeated incidents of the same type indicate a governance defect
and MUST trigger learning promotion.

---

## 9. Prohibited Behaviors

An agent MUST NEVER:

- Halt silently
- Wait indefinitely for human intervention
- Bypass gates without authorization
- Add artifacts solely to satisfy enforcement
- Expand scope beyond authorization
- Treat temporary fixes as permanent

Violation invalidates the work.

---

## 10. Principle

Agents are not allowed to fail quietly.

If an agent lacks a spade,  
it must tell Johan why,  
what spade is needed,  
and how it will be used.

Governance bends explicitly — never silently.

---

## 11. Related Protocols

This policy is supported by the following mandatory protocols:

- **`governance/policy/PR_GATE_FAILURE_HANDLING_PROTOCOL.md`**  
  Defines the mandatory 5-step procedure for investigating, diagnosing, and resolving PR gate failures (referenced in Section 3.1).

These protocols are **binding**, not advisory.

---

End of AGENT NON-STALLING & ESCALATION POLICY
