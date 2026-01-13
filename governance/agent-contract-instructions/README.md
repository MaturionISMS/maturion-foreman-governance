# Agent Contract Instructions System

## Purpose

This directory contains the **instruction system** for modifying agent contracts (`.agent` files) across the Maturion ecosystem.

**Authority**: `governance/canon/AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md`

---

## Overview

All modifications to `.agent` files MUST go through this instruction system. Only the **Agent Contract Administrator** (`.github/agents/agent-contract-administrator.md`) may write to `.agent` files, and ONLY when operating under an approved instruction.

**Hard Rule**: No agent, FM, builder, or human (except CS2) may bypass this system.

---

## Directory Structure

```
governance/agent-contract-instructions/
├── README.md                    # This file
├── TEMPLATE.yml                 # Instruction template
├── pending/                     # Instructions awaiting CS2 approval
├── approved/                    # Instructions approved by CS2, ready for application
├── applied/                     # Instructions successfully applied (archived)
├── rejected/                    # Instructions rejected by CS2 (for audit trail)
└── changelog/                   # Version history and change summaries
```

---

## Instruction Lifecycle

### 1. Draft → Pending (`pending/`)

**Who Creates**: Governance-repo-administrator, FM, CS2, or (in rare cases) builders via escalation

**Process**:
1. Copy `TEMPLATE.yml` to `pending/<instruction-id>.yml`
2. Fill in all required fields (id, title, authority, targets, changes)
3. Set `status: pending`
4. Commit to governance repo
5. Create PR or issue requesting CS2 review

**State**: Awaiting CS2 approval, NOT executable

### 2. Pending → Approved (`approved/`)

**Who Approves**: CS2 (Johan Ras in bootstrap mode, Maturion in production)

**Process**:
1. CS2 reviews instruction for governance compliance
2. CS2 verifies authority source and rationale
3. CS2 checks for scope expansion or privilege escalation
4. CS2 moves file from `pending/` to `approved/`
5. CS2 updates instruction with approval date and approver name
6. CS2 commits and merges

**State**: Approved by CS2, ready for Agent Contract Administrator to execute

### 3. Approved → Applied (`applied/`)

**Who Applies**: Agent Contract Administrator (ONLY)

**Process**:
1. Agent Contract Administrator reads instruction from `approved/`
2. Performs pre-application validation (schema, governance, gaps, diff)
3. Applies exact changes to specified `.agent` file(s)
4. Increments contract version
5. Updates contract changelog
6. Commits changes to target repository
7. Moves instruction to `applied/` with application date
8. Updates instruction with `status: applied`
9. Creates changelog entry in `changelog/`

**State**: Successfully applied, archived for audit trail

### 4. Pending → Rejected (`rejected/`)

**Who Rejects**: CS2

**Process**:
1. CS2 reviews instruction and determines it should not be applied
2. CS2 moves file from `pending/` to `rejected/`
3. CS2 updates instruction with rejection reason
4. CS2 commits and documents decision

**State**: Rejected, archived for learning, NOT applied

---

## Instruction Format

All instructions are YAML files following this structure:

```yaml
---
id: INST-YYYY-MM-DD-NNN          # Unique identifier
title: <short-description>        # e.g., "Add prohibition to FM contract"
status: <lifecycle-state>         # draft | pending | approved | applied | rejected
created_date: YYYY-MM-DD
created_by: <agent-id-or-cs2>
approved_date: YYYY-MM-DD         # Set when CS2 approves
approved_by: <cs2-name>           # "Johan Ras" or "Maturion"
applied_date: YYYY-MM-DD          # Set when administrator applies
applied_by: agent-contract-administrator

authority:
  source: <governance-canon-doc>  # Which canon doc requires this change?
  reason: <justification>         # Why is this change necessary?
  ripple_triggered: <true|false>  # Is this from a canon change ripple?

targets:
  - repository: <org/repo>
    path: <path-to-.agent-file>
    current_version: <version>    # e.g., "2.1.0"
    target_version: <version>     # e.g., "2.2.0"
    
changes:
  - type: <add|update|remove>
    section: <section-identifier> # e.g., "governance.bindings"
    content: |
      <exact-content-to-add>
    old_content: |                 # For 'update' type only
      <exact-content-to-replace>
    rationale: <why-this-change>

validation:
  schema_compliance: required
  governance_canon_check: required
  gap_detection: required
  diff_inspection: required

rollback:
  supported: true
  instructions: <how-to-rollback>
---

# Context

<Detailed context about why this change is needed>

# Changes Summary

<High-level summary of what will change>

# Approval Evidence

<Link to CS2 approval, issue number, or PR number>

# Application Notes

<Special considerations for Agent Contract Administrator>
```

**See `TEMPLATE.yml` for a complete template.**

---

## CS2 Approval Requirements

**Every instruction MUST have explicit CS2 approval before application.**

Approval methods:
- ✅ CS2 moves instruction from `pending/` to `approved/` (explicit action)
- ✅ CS2 comments "APPROVED: INST-YYYY-MM-DD-NNN" on PR or issue
- ✅ CS2 directly commits instruction to `approved/` (bootstrap mode)
- ✅ Explicit authorization in canonical governance document

**No instruction may be applied without verifiable CS2 approval evidence.**

CS2 reviews for:
- [ ] Governance canon alignment
- [ ] Valid authority source
- [ ] Minimal and precise changes
- [ ] No privilege escalation
- [ ] Appropriate versioning
- [ ] Rollback plan exists
- [ ] No self-modification of administrator (except by CS2)

---

## Validation Requirements

### Pre-Application (Agent Contract Administrator)

Before applying any instruction:
1. **Schema Compliance**: Verify contract conforms to `.agent.schema.md`
2. **Governance Canon Check**: Verify authority source and alignment
3. **Gap Detection**: Identify missing bindings or incomplete propagation
4. **Diff Inspection**: Review exact changes, ensure no unintended effects

**If ANY validation fails**: HALT and escalate to CS2.

### Post-Application (Agent Contract Administrator)

After applying changes:
1. Re-run schema validation
2. Confirm version increment
3. Check git diff (only intended changes)
4. Move instruction to `applied/`
5. Create changelog entry

---

## Versioning

All contract changes MUST increment the version field in the `.agent` file:

```yaml
version: <MAJOR>.<MINOR>.<PATCH>
```

- **MAJOR**: Breaking changes, authority shifts, scope expansion
- **MINOR**: Non-breaking additions (new bindings, sections)
- **PATCH**: Clarifications, typo fixes, formatting

**ALL version increments require CS2 approval.**

---

## Rollback

All instructions MUST include rollback instructions. In case of issues:
1. Agent Contract Administrator reverts the commit
2. Moves instruction back to `approved/` (or creates reverse instruction)
3. Decrements version with rollback annotation
4. Documents rollback reason in changelog

---

## Creating a New Instruction

### Step 1: Copy Template

```bash
cp governance/agent-contract-instructions/TEMPLATE.yml \
   governance/agent-contract-instructions/pending/INST-2026-01-13-001.yml
```

### Step 2: Fill in Fields

- Assign unique ID (format: `INST-YYYY-MM-DD-NNN`)
- Write clear title and rationale
- Specify target repository and contract file
- Define exact changes (be surgical, minimal)
- Set `status: pending`
- Reference authority source from governance canon

### Step 3: Submit for CS2 Approval

- Create PR to governance repo with instruction file
- Tag CS2 (Johan Ras in bootstrap mode)
- Explain context and urgency
- Wait for CS2 approval

### Step 4: CS2 Approves

- CS2 reviews and moves to `approved/`
- CS2 records approval date and name

### Step 5: Agent Contract Administrator Applies

- Reads instruction from `approved/`
- Validates and applies changes
- Moves to `applied/`
- Creates changelog entry

---

## Example Instruction IDs

- `INST-2026-01-13-001`: Add standing prohibition to governance-repo-administrator
- `INST-2026-01-13-002`: Add standing prohibition to CodexAdvisor
- `INST-2026-01-13-003`: Add standing prohibition to repository .agent
- `INST-2026-01-13-004`: Update FM contract with new ripple awareness binding

IDs are sequential per day. Use leading zeros for sorting (001, 002, ...).

---

## Changelog

The `changelog/` directory contains summaries of applied instructions by month:

```
changelog/
├── 2026-01.md              # January 2026 changes
├── 2026-02.md              # February 2026 changes
└── ...
```

Each changelog entry includes:
- Instruction ID
- Target contract and version change
- Summary of changes
- Application date
- Link to instruction file

---

## Violation Response

If an agent writes to a `.agent` file outside this system:
1. **HALT** the agent immediately
2. **ROLLBACK** the unauthorized change
3. **ESCALATE** to CS2 with incident report
4. **QUARANTINE** work done under the modified contract
5. **INVESTIGATE** root cause (bug, misunderstanding, governance gap)

Use incident template: `governance/incidents/INCIDENT-<YYYY-MM-DD>-CONTRACT-MODIFICATION-VIOLATION-<ID>.md`

---

## Authority and Precedence

**This instruction system is governed by**:
- `governance/canon/AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md` (supreme authority)
- `.agent.schema.md` (schema validation requirements)
- `AGENT_RECRUITMENT_AND_CONTRACT_AUTHORITY_MODEL.md` (authority hierarchy)

If any conflict arises, the canonical protocol prevails.

---

## Contact and Escalation

For questions or issues with the instruction system:
- **Governance questions**: Escalate to governance-repo-administrator
- **Approval questions**: Escalate to CS2 (Johan Ras / Maturion)
- **Application issues**: Escalate to agent-contract-administrator (if operational) or CS2

---

**Version**: 1.0.0  
**Authority**: CS2 (Johan Ras in bootstrap mode, Maturion in production)  
**Last Updated**: 2026-01-13
