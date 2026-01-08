# AGENT_RECRUITMENT

## Status
Canonical Governance Document  
Version: v1  
Authority: Foreman (FM)

---

## 1. Purpose

This document defines the only legitimate process by which software agents may be introduced (“recruited”) into the governance system administered by the Foreman.

No agent—human-assisted or autonomous—may act on any repository, workflow, or artifact unless it has been explicitly recruited under this policy.

Agent recruitment is a governance act, not a technical convenience.

---

## 2. Definition: Recruiting an Agent

Recruitment is the act of granting an agent legitimacy within the governance system.

Recruitment is NOT:
- Installing a tool
- Enabling a GitHub App
- Granting repository permissions
- Running an automated workflow

Recruitment IS:
- Binding an agent to the governance canon
- Assigning a recognized role
- Declaring scope and constraints
- Making the agent subject to enforcement

Any agent not recruited according to this document is considered out of governance, regardless of intent or outcome.

---

## 3. Recruiting Authority

The Foreman (FM) is the sole authority empowered to recruit agents.

Humans may request recruitment.
Tools may assist recruitment.
Only the Foreman may legitimize an agent.

No repository, workflow, or application may self-recruit an agent.

---

## 4. Recognized Agent Classes

Only the following agent classes are recognized:

- Builder  
  Executes explicitly scoped changes. Does not interpret governance.

- Reviewer  
  Reviews changes for correctness and alignment. Does not execute changes.

- Auditor  
  Inspects state, history, and compliance. Does not propose or apply changes.

- Overseer  
  Interprets governance, diagnoses root causes, and proposes remediation.
  Overseer agents do not apply changes unless separately recruited as builders.

No other agent class may operate unless added to this document by the Foreman.

---

## 5. Recruitment Preconditions

Before any agent may act, all of the following must exist:

1. A canonical governance reference located under `/governance/canon`
2. A governance profile corresponding to the agent’s class
3. A compliant `.agent` contract declaring:
   - Agent role
   - Governance profile
   - Canonical governance reference
4. Explicit scope definition, including:
   - Allowed paths
   - Restricted paths
   - Escalation requirements

If any precondition is missing, the agent is not recruited.

---

## 6. Canonical Binding

## 6.1 Agent Contract Minimalism Principle

Recruited agents MUST reference canonical governance exactly once via the
`governance.canon` binding in their `.agent` contract.

`.agent` contracts MUST NOT enumerate individual doctrines, laws, or
philosophy files beyond reference-only bindings in `governance.bindings`.

**Reference-Based Approach**: Agents should include a `governance.bindings`
section listing canonical documents that define their authority, protocols,
and constraints. These are **references only** - not duplications of content.

Resolution of specific doctrines and their application is the responsibility
of the canonical governance source, not the `.agent` contract.

Any `.agent` file that duplicates governance doctrine (beyond YAML reference
bindings) is considered over-specified and at risk of drift; canonical
governance prevails in all such cases.

**Recommended Onboarding**: All agents should reference
`AGENT_ONBOARDING_QUICKSTART.md` as their starting point, which provides a
streamlined path to understanding governance without duplication.

### 6.2 Canonical Governance Reference

Every recruited agent must be bound to a single canonical governance source defined by:
- Repository
- Path
- Reference (branch, tag, or commit)

Agents may not infer, duplicate, or reinterpret governance locally.

If the canonical source cannot be resolved, the agent must halt.

---

## 7. Scope and Capability Binding

Recruitment binds an agent to a strict scope of action.

Scope includes:
- Read permissions
- Write permissions
- File path boundaries
- Operational domains

Agents must not act outside declared scope.

Any action outside scope requires explicit escalation to the Foreman.

---

## 8. Role-Specific Constraints

### 8.1 Builder Agents

Builder agents:
- Execute explicitly authorized changes
- Do not reinterpret governance
- Do not expand scope implicitly
- Halt and escalate when encountering:
  - Governance-critical files
  - Missing authorization
  - Conflicting constraints

Builders are executors, not decision-makers.

---

### 8.2 Overseer Agents

Overseer agents:
- May read across repositories
- May analyze architecture, CI, and failures
- May propose fixes and scopes
- May not apply changes unless separately recruited as builders

---

## 9. Temporary and Scoped Authorization

The Foreman may grant temporary, scoped authorizations as part of recruitment.

Such authorizations must be:
- Explicit
- Narrowly scoped
- Task- or time-bounded

Temporary authorization does not alter the underlying governance profile.

---

## 10. Revocation

The Foreman may revoke an agent at any time by:
- Invalidating its governance profile
- Invalidating its `.agent` contract
- Declaring its actions out of governance

Revocation is immediate and does not require agent cooperation.

All actions taken after revocation are invalid.

---

## 11. Enforcement Principle

Governance compliance is determined by adherence to process, not outcomes.

A passing build does not legitimize an unrecruited agent.
A correct fix does not excuse a governance violation.

Foreman enforcement supersedes all other signals.

---

## 12. Canonical Precedence

This document is canonical.

If a conflict exists between this document and any other artifact, this document prevails.

---

End of AGENT_RECRUITMENT
