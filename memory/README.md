# Canonical Memory Structure

**Status**: Governance Definition Only — No Execution  
**Version**: 1.0.0  
**Authority**: Governance Repository Administrator  
**Canon Reference**: Wave M1 Memory Scaffolding

---

## Purpose

This directory defines the **canonical memory structure** for the Maturion ecosystem under governance control.

**This is structure-only. No runtime activation. No automation. No learning ingestion.**

---

## Governance Principles

1. **Memory is identity-level, not embodiment-level**
   - One AI identity across multiple embodiments
   - Memory is shared governance asset, not per-agent state

2. **All memory writes are proposals**
   - No agent may auto-write memory
   - All memory changes require governance review

3. **Explicit permission model**
   - GLOBAL memory is PERMITTED
   - TENANT memory is EXPLICITLY DISABLED (until activated by governance)

4. **Auditability is mandatory**
   - All memory operations are logged
   - All changes are traceable
   - Emergency kill-switch exists

---

## Directory Structure

```
memory/
├── README.md                          (this file)
├── GLOBAL/                            (PERMITTED - Global Experience Memory)
│   ├── experience/                    
│   │   ├── lessons/                   (Lessons learned across ecosystem)
│   │   ├── patterns/                  (Successful patterns)
│   │   └── anti-patterns/             (Patterns to avoid)
│   └── governance/
│       ├── escalation-history/        (Escalation decisions and outcomes)
│       └── enforcement-decisions/     (Enforcement action history)
├── TENANT/                            (DISABLED - Awaiting governance activation)
│   ├── README.md                      
│   ├── _SCHEMA/                       (Schema definitions)
│   ├── _SIMULATED/                    (Simulated tenant memory for testing)
│   └── _PRODUCTION_DISABLED/          (Production tenant memory - NOT ACTIVE)
├── AUTHORITY/                         (Memory authority policies)
│   ├── MEMORY_WRITE_POLICY.md
│   ├── MEMORY_READ_POLICY.md
│   └── MEMORY_FORGET_POLICY.md
└── AUDIT/                             (Memory operation audit logs)
    ├── memory-write-log.md
    └── memory-access-log.md
```

---

## Memory Scopes

### GLOBAL Memory (PERMITTED)

**Status**: ✅ Permitted for use

**Purpose**: Cross-ecosystem learning and governance tracking

**What to store**:
- Lessons learned from incidents and patterns
- Successful architectural patterns
- Anti-patterns to avoid
- Escalation history and decisions
- Enforcement decisions and outcomes

**Authority**: See `AUTHORITY/MEMORY_WRITE_POLICY.md`

### TENANT Memory (DISABLED)

**Status**: ❌ Explicitly disabled - NOT ACTIVE

**Purpose**: (Future) Tenant-specific ISMS context and state

**Activation Required**: This memory scope is FORBIDDEN until explicitly activated by governance authority

**Why Disabled**:
- ISMS runtime not yet active
- No tenant data exists
- Requires explicit governance approval to activate
- Safety measure to prevent premature tenant data ingestion

---

## Authority and Policies

Memory operations are governed by three policies in `AUTHORITY/`:

1. **MEMORY_WRITE_POLICY.md** - Who may propose writes, under what conditions
2. **MEMORY_READ_POLICY.md** - Who may read memory, access control
3. **MEMORY_FORGET_POLICY.md** - Who may request memory deletion, retention rules

All memory operations must comply with these policies.

---

## Audit Trail

All memory operations are logged in `AUDIT/`:
- `memory-write-log.md` - Log of all write proposals and approvals
- `memory-access-log.md` - Log of all read operations

---

## Important Notes

### This is NOT Runtime Activation

- ✅ Directory structure exists
- ✅ Governance policies defined
- ❌ No runtime code to read/write memory
- ❌ No automation enabled
- ❌ No learning ingestion active

### Legacy Memory

Legacy memory from pre-canonical structure is archived in `_LEGACY_ARCHIVED/`.

This legacy content:
- Was from the old Foreman application runtime
- Is not part of the canonical governance memory model
- Is preserved for reference only
- Should NOT be used by new implementations

---

## Wave M1 Compliance

This structure implements:
- **Issue #1**: Memory Scaffolding (structure and governance definitions)
- **Issue #2**: Memory Authority Policies (read/write/forget governance)

Compliance with:
- One-Time Build Law
- QA-as-Proof doctrine
- Separation of duties
- Audit-first approach

---

**Governance Definition Only — No Execution**
