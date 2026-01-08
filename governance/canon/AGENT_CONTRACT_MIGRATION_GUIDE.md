# Agent Contract Migration Guide

**Version**: 1.0.0  
**Authority**: Governance Administrator  
**Purpose**: Guide for migrating existing agent contracts to minimal, reference-based format  
**Target**: Wave 2+ implementation (not immediate bootstrap requirement)

---

## Overview

This guide explains how to migrate existing agent contracts from the verbose, doctrine-duplicating format to the new minimal, reference-based format.

**Migration Status**: PLANNED (not required immediately)

Existing agent contracts remain valid. This migration will be performed systematically in a future wave when:
- FM and Governance Agent have bandwidth
- Cross-repo coordination is feasible
- Ripple propagation infrastructure is validated

---

## Why Migrate?

### Problems with Verbose Contracts
- **Cognitive overload**: 300-700 line contracts are hard to read and maintain
- **Governance drift**: Duplicated doctrine can become inconsistent with canon
- **Update overhead**: Changes to governance require updating multiple contracts
- **Reduced clarity**: Important operational details buried in philosophical recitations

### Benefits of Minimal Contracts
- **Clarity**: Core mission, allowed/forbidden actions, escalation - all visible at a glance
- **Single source of truth**: Governance lives only in canon, referenced not duplicated
- **Easier onboarding**: Agents read AGENT_ONBOARDING_QUICKSTART.md once, not repeated in every contract
- **Lower maintenance**: Canon updates don't require contract updates (unless authority changes)

---

## Migration Checklist

For each agent contract to be migrated:

### 1. Extract Core Elements
- [ ] Agent identity (id, class, profile)
- [ ] Scope (allowed/restricted/escalation paths)
- [ ] Capabilities (what's technically possible)
- [ ] Constraints (what's prohibited)
- [ ] Enforcement (what happens on violation)

### 2. Identify Canonical Bindings
- [ ] List governance documents that define this agent's authority
- [ ] List governance documents that define operational protocols
- [ ] List governance documents that define escalation rules
- [ ] Create `governance.bindings` section with references (not duplication)

### 3. Condense Operational Guidance
- [ ] Extract 1-2 sentence mission statement
- [ ] Create concise "Allowed Actions" bulleted list (5-10 items max)
- [ ] Create concise "Forbidden Actions" bulleted list (5-10 items max)
- [ ] Add "Escalation Protocol" with when/who/how
- [ ] Add "3-Step Operational Protocol" summary

### 4. Remove Duplicated Doctrine
- [ ] Remove constitutional principles (reference canon instead)
- [ ] Remove authority diagrams (reference authority model instead)
- [ ] Remove detailed workflow descriptions (reference protocol documents)
- [ ] Remove governance philosophy (reference BUILD_PHILOSOPHY.md, etc.)
- [ ] Remove bootstrap context (keep minimal context if essential)

### 5. Add Onboarding Reference
- [ ] Add "Quick Onboarding" section pointing to AGENT_ONBOARDING_QUICKSTART.md
- [ ] List key canonical documents for this role
- [ ] Add quick reference card (optional but helpful)

### 6. Validate Against Schema
- [ ] Ensure all required sections present (agent, governance, scope, capabilities, constraints, enforcement)
- [ ] Ensure canonical binding is correct
- [ ] Ensure no prohibited duplication
- [ ] Ensure line count under 300 (target: 150-250)

### 7. Test with CI
- [ ] Run `agent-governance-check.yml` validation
- [ ] Ensure no forbidden patterns detected
- [ ] Ensure size limit respected
- [ ] Ensure governance bindings validated

---

## Migration Examples

### Before: Verbose Contract (392 lines)

```markdown
# AGENT CONTRACT

[Long YAML with cross-references, contracts, doctrines...]

## 1. Agent Identity
[5 paragraphs explaining agent identity...]

## 2. Mission
[3 paragraphs on mission...]

## 3. Canonical Governance Binding
[5 paragraphs on governance binding with doctrine enumeration...]

## 4. Scope and Access Boundaries
[10 paragraphs on scope...]

## 5. Capabilities
[8 paragraphs on capabilities...]

## 6. Operational Doctrine
### Core Principles
[15 principles listed with explanations...]

## 7. Explicit Prohibitions
[25 prohibited actions listed...]

## 8. Authority Model
[Authority diagram and 8 paragraphs...]

[... 20 more sections with duplicated doctrine ...]
```

### After: Minimal Contract (~200 lines)

```markdown
# AGENT CONTRACT

---
```yaml
agent:
  id: example-agent
  class: reviewer
  profile: reviewer.v1.md

governance:
  canon:
    repository: MaturionISMS/maturion-foreman-governance
    path: /governance/canon
    reference: main
  
  bindings:
    - id: agent-recruitment
      path: governance/canon/AGENT_RECRUITMENT.md
      role: agent-legitimacy
    - id: builder-first-pr
      path: governance/canon/BUILDER_FIRST_PR_MERGE_MODEL.md
      role: qa-truth-model
    [... 3-5 more bindings ...]

scope:
  [... concise scope definition ...]

capabilities:
  [... concise capabilities ...]

constraints:
  [... standard constraints ...]

enforcement:
  [... standard enforcement ...]
```
---

## Mission
[1-2 sentence core mission]

## Allowed Actions
- [Action 1]
- [Action 2]
[... 5-10 items total]

## Forbidden Actions
- [Prohibition 1]
- [Prohibition 2]
[... 5-10 items total]

## Escalation Protocol
**When to Escalate**: [3-5 scenarios]
**Escalate To**: [Target]

## 3-Step Operational Protocol
### 1. Check Scope
[1-2 sentences]
### 2. Execute
[1-2 sentences]
### 3. Report
[1-2 sentences]

## Quick Onboarding
**New to this role?** Read:
1. AGENT_ONBOARDING_QUICKSTART.md
2. [Key binding 1]
3. [Key binding 2]

---
End of Contract
```

**Reduction**: 392 lines → ~200 lines (49% reduction)

---

## Step-by-Step Migration Process

### Step 1: Prepare
1. Read existing contract thoroughly
2. Read AGENT_ONBOARDING_QUICKSTART.md
3. Read governance/templates/AGENT_CONTRACT.template.md
4. Identify governance documents referenced in old contract

### Step 2: Create YAML Header
1. Copy from template
2. Fill in agent identity
3. List governance bindings (references only, no duplication)
4. Define scope precisely
5. Set capabilities and constraints

### Step 3: Write Human-Readable Section
1. Write 1-2 sentence mission
2. List 5-10 allowed actions (concise bullets)
3. List 5-10 forbidden actions (concise bullets)
4. Write escalation protocol (when, who, emphasis on success not failure)
5. Write 3-step operational protocol (brief summary)

### Step 4: Add Onboarding Section
1. Point to AGENT_ONBOARDING_QUICKSTART.md
2. List 3-5 essential canonical documents
3. Add quick reference card (optional)

### Step 5: Remove Duplication
1. Delete all constitutional principles sections
2. Delete all authority diagrams
3. Delete all workflow descriptions (replace with references)
4. Delete all governance philosophy recitations
5. Keep only operational essentials

### Step 6: Validate
1. Check line count (target: 150-250, max: 300)
2. Run CI validation
3. Verify no forbidden patterns
4. Verify canonical bindings correct
5. Have FM or Governance Agent review

### Step 7: Deploy
1. Create PR with migrated contract
2. Document migration in PR description
3. Get approval from contract owner (FM for builders, Maturion for Gov/FM agents)
4. Merge after approval

---

## Migration Priority

### High Priority (Wave 2)
Migrate contracts that are:
- Extremely verbose (>400 lines)
- Frequently updated (high drift risk)
- Used by multiple builders
- Referenced by other contracts

### Medium Priority (Wave 3)
Migrate contracts that are:
- Moderately verbose (250-400 lines)
- Infrequently updated
- Single-purpose builders
- Less frequently referenced

### Low Priority (Wave 4+)
Migrate contracts that are:
- Already relatively concise (<250 lines)
- Rarely updated
- Temporary or experimental
- Scheduled for decommissioning

---

## Common Pitfalls to Avoid

### ❌ Over-Condensing
Don't reduce so much that essential operational guidance is lost.
Keep enough detail for agent to operate confidently.

### ❌ Wrong References
Don't reference governance documents that don't exist or are wrong role.
Verify each binding is correct and necessary.

### ❌ Removing Non-Duplicated Content
Don't remove operational details that are specific to this agent's role.
Only remove duplicated governance doctrine.

### ❌ Breaking Compatibility
Don't change agent behavior during migration - only format.
If behavior changes needed, do that separately.

### ❌ Skipping Validation
Don't merge without CI validation and authority review.
Schema violations can invalidate the agent.

---

## Migration Tracking

Track migrations in a dedicated issue or project board:

```
- [ ] Agent 1: governance-repo-administrator (COMPLETE)
- [ ] Agent 2: CodexAdvisor (IN PROGRESS)
- [ ] Agent 3: ui-builder (PLANNED)
- [ ] Agent 4: api-builder (PLANNED)
- [ ] Agent 5: governance-liaison (PLANNED)
[... track all agents ...]
```

---

## Post-Migration Validation

After migrating all contracts:

- [ ] All contracts pass CI validation
- [ ] All contracts reference AGENT_ONBOARDING_QUICKSTART.md
- [ ] All contracts under 300 lines (target: 150-250)
- [ ] No governance duplication detected
- [ ] All canonical bindings validated
- [ ] Agent onboarding time reduced
- [ ] Governance update overhead reduced
- [ ] No behavioral regressions

---

## Questions?

**For migration process questions**: Escalate to Governance Agent
**For agent-specific questions**: Escalate to agent's authority (FM for builders, Maturion for Gov/FM)
**For canonical reference questions**: Read AGENT_ONBOARDING_QUICKSTART.md first

---

**This migration guide is advisory. Actual migration will be sequenced by FM/Governance in future waves.**

---

End of Agent Contract Migration Guide v1.0.0
