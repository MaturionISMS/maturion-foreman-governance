# Memory Write Policy

**Version**: 1.0.0  
**Status**: Active Governance Policy  
**Authority**: Governance Repository Administrator  
**Canon Reference**: Wave M1A — Memory Authority Policies

---

## Purpose

This policy defines **who may write to memory**, **under what conditions**, and **what approval is required**.

**This is policy-only. No runtime enforcement logic.**

---

## Core Principles

### 1. Memory is Identity-Level, Not Embodiment-Level

Memory belongs to **one AI identity** that has **multiple embodiments** (agents, builders, runtime instances).

- Embodiments may **REQUEST** memory operations
- Memory authority **DECIDES** whether to approve
- Embodiments do **NOT** write directly

### 2. All Memory Writes Are Proposals

No embodiment may write memory autonomously. All writes are proposals subject to governance approval.

### 3. Write Authority is Centralized

Memory write authority is held by:
- **Primary**: Governance Repository Administrator
- **Delegated**: (None currently - may be delegated in future)

---

## Write Permission Model

### GLOBAL Memory (PERMITTED)

**Status**: ✅ Writes permitted with approval

**Who May Propose**:
- Any agent embodiment (builder, governance, FM runtime)
- Must provide justification and context

**What May Be Written**:
- Experience lessons learned
- Successful patterns
- Anti-patterns to avoid
- Escalation history
- Enforcement decisions

**Approval Required**:
- Routine lessons/patterns: Governance Administrator review and approval
- Governance history: Automatic (logged for audit only)
- Significant architectural decisions: Human escalation required

**Proposal Process**:
1. Agent proposes memory write with:
   - Scope: GLOBAL
   - Memory key (e.g., `experience/lessons/lesson-001`)
   - Content (the memory to write)
   - Justification (why this should be remembered)
2. Create log entry in `memory/AUDIT/memory-write-log.md`
3. Await governance approval
4. Upon approval, write is executed and logged

### TENANT Memory (DISABLED)

**Status**: ❌ Writes explicitly FORBIDDEN

**Current Rule**: No tenant memory writes are permitted until governance explicitly activates this scope.

**Activation Requirements**:
- See `memory/TENANT/README.md` for full activation requirements
- Requires governance authority approval
- Requires this policy to be updated to permit tenant writes

**Violation**: Any attempt to write tenant memory is a governance violation requiring immediate escalation.

---

## Write Categories and Approval Levels

### Category 1: Routine Experience Memory

**Examples**: Lessons learned, successful patterns, anti-patterns

**Approval Authority**: Governance Administrator (automated review possible)

**Requirements**:
- Must be relevant across ecosystem (not embodiment-specific)
- Must be actionable for future work
- Must not contain secrets or sensitive data
- Must follow memory schema

**Timeline**: Review within 1 hour (target)

### Category 2: Governance History

**Examples**: Escalation outcomes, enforcement decisions

**Approval Authority**: Governance Administrator (may be automatic for governance-generated events)

**Requirements**:
- Must be accurate and complete
- Must reference source events/decisions
- Must be audit-ready

**Timeline**: Immediate (for governance-generated) or within 1 hour

### Category 3: Critical Architectural Decisions

**Examples**: Major pattern changes, ecosystem-wide decisions

**Approval Authority**: Requires human escalation and approval

**Requirements**:
- Must have significant ecosystem impact
- Must be well-justified and documented
- Must include rationale and alternatives considered
- Must cite governance canon alignment

**Timeline**: Review within 24 hours, may require discussion

---

## Write Rejection Criteria

A memory write proposal MUST be rejected if:

1. **Violates scope permissions** (e.g., attempting tenant write while disabled)
2. **Contains secrets or credentials** (never permitted)
3. **Is embodiment-specific** (not identity-level learning)
4. **Lacks justification** (why should this be remembered?)
5. **Duplicates existing memory** (already captured)
6. **Is too granular** (noise, not signal)
7. **Violates audit requirements** (no proper logging)

Rejection should include:
- Reason for rejection
- Guidance on how to correct (if applicable)
- Alternative approach (if applicable)

---

## Write Schema Requirements

All memory writes must conform to:

**GLOBAL Memory**:
- Key structure: `{category}/{subcategory}/{unique-id}`
- Must include metadata (timestamp, author, version)
- Must include tags for filtering
- Must be markdown or JSON format

**TENANT Memory** (when activated):
- Must conform to `memory/TENANT/_SCHEMA/tenant-memory.schema.json`
- Must include tenant isolation flag
- Must respect tenant boundaries

---

## Emergency Kill-Switch

### Definition

An emergency kill-switch exists to immediately HALT all memory write operations.

### Activation Triggers

The kill-switch MUST be activated if:
- Unauthorized memory writes are detected
- Memory corruption is suspected
- Security breach is detected
- Governance violation occurs

### Kill-Switch Effect

When activated:
- ❌ ALL memory writes are rejected
- ❌ ALL write proposals are suspended
- ✅ Memory reads remain available
- ✅ Audit logging continues
- ⚠️ Human escalation is REQUIRED

### Activation Authority

Kill-switch may be activated by:
- Governance Repository Administrator
- Human authority (Johan Ras)
- Automated security controls (if implemented)

### Deactivation

Kill-switch may only be deactivated by:
- Human authority (Johan Ras)
- After root cause analysis is complete
- After corrective measures are in place

---

## Audit Requirements

All memory write operations (proposed, approved, rejected) MUST be logged in:
- `memory/AUDIT/memory-write-log.md`

Log entry must include:
- Timestamp
- Proposing embodiment
- Memory scope and key
- Proposal justification
- Approval decision and authority
- Outcome

---

## Policy Evolution

This policy may be updated by:
- Governance Repository Administrator (minor clarifications)
- Human authority (significant changes)

Changes must:
- Be version controlled
- Include rationale for change
- Maintain audit trail
- Not weaken governance controls

---

## Related Policies

- `MEMORY_READ_POLICY.md` - Who may read memory
- `MEMORY_FORGET_POLICY.md` - How memory is removed
- `memory/README.md` - Overall memory structure
- `memory/TENANT/README.md` - Tenant memory activation requirements

---

**Active Governance Policy — No Execution**
