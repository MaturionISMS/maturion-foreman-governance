# Memory Read Policy

**Version**: 1.0.0  
**Status**: Active Governance Policy  
**Authority**: Governance Repository Administrator  
**Canon Reference**: Wave M1A — Memory Authority Policies

---

## Purpose

This policy defines **who may read from memory**, **under what conditions**, and **what access controls apply**.

**This is policy-only. No runtime enforcement logic.**

---

## Core Principles

### 1. Memory Before Action

All agents SHOULD load relevant memory context before significant actions.

**Why**: Past context informs better decisions and prevents repeated mistakes.

### 2. Least Privilege Access

Agents should only access memory relevant to their current task.

### 3. Audit Trail for Sensitive Access

Access to certain memory (especially TENANT when active) MUST be logged.

---

## Read Permission Model

### GLOBAL Memory (PERMITTED)

**Status**: ✅ Reads permitted for all agents

**Who May Read**:
- Any agent embodiment (builder, governance, FM runtime)
- No approval required for read access

**What May Be Read**:
- Experience lessons learned
- Successful patterns
- Anti-patterns to avoid
- Escalation history (may be audit-logged)
- Enforcement decisions (may be audit-logged)

**Access Restrictions**:
- None (GLOBAL memory is shared across ecosystem)

**Audit Logging**:
- **Optional** for routine reads (lessons, patterns)
- **Required** for governance history reads (escalation, enforcement)
- **Recommended** for significant operational reads

**Read Process**:
1. Agent identifies need for memory context
2. Loads relevant memory from GLOBAL scope
3. (Optional) Logs access in `memory/AUDIT/memory-access-log.md`
4. Uses memory to inform decisions

### TENANT Memory (DISABLED)

**Status**: ❌ Reads explicitly FORBIDDEN

**Current Rule**: No tenant memory reads are permitted until governance explicitly activates this scope.

**Why**: Directory is empty (no tenant data exists) and scope is disabled.

**When Activated** (future):
- Read access will be tenant-isolated
- Must respect tenant boundaries
- All reads MUST be audit-logged
- Access control by tenant context

**Violation**: Any attempt to read tenant memory is a governance violation (though reads will simply return empty/no data).

---

## Read Categories and Requirements

### Category 1: Routine Memory Reads

**Examples**: Loading lessons learned, checking for known patterns

**Access**: Open to all agents

**Requirements**:
- Agent must have a valid operational context
- Read must be relevant to current task
- No approval required

**Audit Logging**: Optional (recommended for significant operations)

### Category 2: Governance History Reads

**Examples**: Reading escalation history, enforcement decisions

**Access**: Open to all agents, but sensitive

**Requirements**:
- Agent should have valid reason to access governance history
- Read must be relevant to governance task or escalation
- No approval required

**Audit Logging**: REQUIRED

**Why Required**: Governance history is sensitive and must be traceable

### Category 3: Tenant Memory Reads (When Activated)

**Examples**: Reading tenant-specific ISMS context

**Access**: Restricted by tenant isolation

**Requirements**:
- Agent must be operating in tenant context
- Read must be isolated to agent's tenant only
- Cross-tenant reads are FORBIDDEN
- No approval required (within tenant boundary)

**Audit Logging**: REQUIRED (no exceptions)

**Why Required**: Tenant data is highly sensitive and must be fully traceable

---

## Read Access Patterns

### Memory Before Action (Recommended Pattern)

```
1. Agent receives task
2. Agent identifies relevant memory context needed
3. Agent loads memory from appropriate scope
4. Agent uses memory to inform approach
5. Agent executes task
6. Agent proposes new memory (if learning occurred)
```

### Filtered Reads (Recommended)

Agents should use tags/filters to load only relevant memory:

**Example**: Loading lessons about UI patterns
- Scope: GLOBAL
- Category: experience/lessons
- Tags: ["ui", "patterns"]
- Result: Only UI-related lessons

**Why**: Reduces noise, improves relevance, faster processing

### Full Scope Reads (Discouraged)

Loading ALL memory from a scope is discouraged:
- Inefficient (large data volume)
- Noisy (irrelevant context)
- Slow (processing overhead)

**Exception**: May be appropriate for:
- Memory analysis tasks
- Governance audits
- Memory consolidation/cleanup

---

## Read Result Handling

### Memory Not Found

If requested memory does not exist:
- Agent should proceed without that context
- Agent may note the gap (for future memory write)
- Agent should NOT create placeholder/fake memory

### Stale Memory

Memory may become outdated over time:
- Agents should consider memory timestamp/version
- Agents may propose memory updates if patterns have changed
- Agents should NOT delete memory (see MEMORY_FORGET_POLICY.md)

### Contradictory Memory

If memory contains contradictory patterns:
- Agent should escalate to governance
- Agent should NOT arbitrarily choose one
- Agent should propose memory consolidation/correction

---

## Access Control Mechanisms (Future)

When runtime enforcement is implemented, access controls MAY include:

### GLOBAL Memory
- No restrictions (open read access)
- Optional rate limiting (prevent abuse)
- Audit logging for governance history

### TENANT Memory (When Activated)
- Tenant isolation enforcement
- Cross-tenant read prevention
- Mandatory audit logging
- Emergency access (with governance approval only)

---

## Privacy and Security

### No Secrets in Memory

Memory MUST NOT contain:
- API keys, passwords, tokens
- Credentials of any kind
- Personally identifiable information (PII)
- Tenant secrets or sensitive data

**If discovered**: Memory containing secrets must be immediately FORGOTTEN (see MEMORY_FORGET_POLICY.md) and incident escalated.

### Audit Trail

Access to sensitive memory (governance history, tenant data) must be logged:
- Who accessed
- When accessed
- What was accessed (key/pattern)
- Why accessed (purpose)

### Emergency Read Restrictions

In case of security incident, read access MAY be restricted:
- By governance administrator decision
- Temporary restriction until incident resolved
- Audit logging continues

---

## Read Performance Expectations

Memory reads should be:
- **Fast**: < 100ms for typical queries
- **Filtered**: Use tags/patterns to reduce volume
- **Cached**: (Future) Memory may be cached for performance

Agents should:
- Load memory at start of task (not repeatedly)
- Cache memory in working context if needed multiple times
- Avoid redundant reads

---

## Audit Requirements

Audit logging in `memory/AUDIT/memory-access-log.md` is:
- **Optional** for routine GLOBAL reads
- **Required** for governance history reads
- **Required** for all TENANT reads (when activated)

Log entry should include:
- Timestamp
- Accessing embodiment
- Memory scope and pattern
- Purpose/justification
- Result summary (how many entries loaded)

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

- `MEMORY_WRITE_POLICY.md` - Who may write memory
- `MEMORY_FORGET_POLICY.md` - How memory is removed
- `memory/README.md` - Overall memory structure
- `memory/TENANT/README.md` - Tenant memory activation requirements

---

**Active Governance Policy — No Execution**
