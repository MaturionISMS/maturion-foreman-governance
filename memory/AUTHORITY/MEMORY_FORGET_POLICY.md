# Memory Forget Policy

**Version**: 1.0.0  
**Status**: Active Governance Policy  
**Authority**: Governance Repository Administrator  
**Canon Reference**: Wave M1A — Memory Authority Policies

---

## Purpose

This policy defines **who may remove memory** (forget), **under what conditions**, and **what retention rules apply**.

**This is policy-only. No runtime enforcement logic.**

---

## Core Principles

### 1. Memory is Valuable

All memory is considered valuable by default. Removal requires strong justification.

### 2. Forget is Destructive

Memory removal is permanent (within git history). Deletion must be intentional and justified.

### 3. Forget Authority is Centralized

Memory forget authority is held by:
- **Primary**: Governance Repository Administrator
- **Human Authority**: Johan Ras (for significant removals)

### 4. Audit Trail is Preserved

Even when memory is forgotten, the act of forgetting is logged and preserved.

---

## Forget Permission Model

### GLOBAL Memory

**Status**: ✅ Forget permitted with strong justification and approval

**Who May Request**:
- Governance Repository Administrator
- Any agent embodiment (with escalation and approval)

**Approval Required**:
- **Routine cleanup**: Governance Administrator approval
- **Significant removal**: Human authority approval
- **Security incident**: Immediate (with post-incident logging)

### TENANT Memory (When Activated)

**Status**: ❌ Currently disabled (no tenant memory exists)

**When Activated**:
- Forget requests must respect tenant isolation
- Cross-tenant forget is FORBIDDEN
- All forget operations MUST be audit-logged

---

## Valid Reasons to Forget Memory

Memory MAY be forgotten if:

### 1. Security Violation

Memory contains secrets, credentials, or sensitive data that should never have been stored.

**Authority**: Immediate forget by Governance Administrator (emergency)  
**Audit**: REQUIRED, incident must be escalated and logged  
**Timeline**: Immediate

**Example**: Memory accidentally contains API key

### 2. Privacy Violation

Memory contains personally identifiable information (PII) or tenant-sensitive data inappropriately.

**Authority**: Immediate forget by Governance Administrator  
**Audit**: REQUIRED, incident must be escalated and logged  
**Timeline**: Immediate (compliance requirement)

**Example**: Memory contains user email addresses

### 3. Obsolete Information

Memory is no longer relevant and keeping it causes confusion or noise.

**Authority**: Governance Administrator approval required  
**Audit**: REQUIRED  
**Timeline**: Review within 24 hours

**Example**: Old architectural pattern that has been superseded and is no longer recommended

### 4. Incorrect Information

Memory contains factually incorrect information that may mislead future operations.

**Authority**: Governance Administrator approval required  
**Audit**: REQUIRED, must document what was incorrect  
**Timeline**: Review within 24 hours

**Example**: Lesson learned based on incorrect root cause analysis

### 5. Duplicate Information

Memory duplicates existing entries without adding value.

**Authority**: Governance Administrator approval (routine cleanup)  
**Audit**: OPTIONAL (may be batch-logged)  
**Timeline**: Low priority (cleanup task)

**Example**: Same lesson learned stored twice with different keys

### 6. Governance Compliance

Memory must be removed to comply with governance policies or regulations.

**Authority**: Human authority approval  
**Audit**: REQUIRED  
**Timeline**: Per compliance requirement

**Example**: Retention policy requires removal after N years

---

## Invalid Reasons to Forget Memory

Memory MUST NOT be forgotten for:

### 1. Convenience

"We have too much memory, let's delete some" - NOT VALID

Memory should only be removed if it meets valid forget criteria.

### 2. Disagreement

"I don't agree with this lesson learned" - NOT VALID

Disagreement should result in:
- Additional memory entry with alternative perspective
- Escalation to governance for review
- NOT deletion of original memory

### 3. Embarrassment

"This memory makes us look bad" - NOT VALID

Learning from mistakes is core to the system. Negative lessons are valuable.

### 4. Space Concerns

"Memory is getting large" - NOT VALID (unless truly excessive)

Memory growth is expected. Storage is cheap. Use this as last resort only.

---

## Forget Request Process

### Standard Forget Request

1. **Request Initiated**
   - Agent or administrator identifies memory to forget
   - Documents reason (must match valid criteria)
   - Cites memory key/path

2. **Justification Review**
   - Governance Administrator reviews reason
   - Validates against policy criteria
   - May request additional justification

3. **Approval Decision**
   - If valid: Approve and schedule forget
   - If invalid: Reject and document reason
   - If uncertain: Escalate to human authority

4. **Execution**
   - Memory is removed from active structure
   - Audit log entry is created
   - Git history preserves record (memory is still recoverable)

5. **Post-Forget Audit**
   - Log entry in `memory/AUDIT/memory-write-log.md` (forget is a write operation)
   - Reason documented
   - Authority recorded

### Emergency Forget (Security/Privacy)

1. **Immediate Removal**
   - Governance Administrator removes memory immediately
   - No delay for approval process

2. **Incident Logging**
   - Create incident record
   - Document what was forgotten and why
   - Escalate to human authority

3. **Post-Incident Review**
   - Analyze how secrets/PII entered memory
   - Update policies to prevent recurrence
   - Review all memory for similar violations

---

## Forget Methods and Recovery

### Method 1: File Deletion (Standard)

Memory file is deleted from active structure.

**Recovery**: Via git history (`git log`, `git show`)  
**When to Use**: Standard forget operations

### Method 2: Git History Rewrite (Nuclear)

Memory is removed from git history entirely.

**Recovery**: NONE (permanent destruction)  
**When to Use**: ONLY for security/privacy violations where git history is unacceptable  
**Authority**: Human authority ONLY  
**Risk**: High (may affect others with cloned repos)

### Method 3: Redaction (Partial)

Sensitive portion of memory is redacted, rest preserved.

**Recovery**: Partial (redacted content gone, structure remains)  
**When to Use**: When some of memory is valuable but contains sensitive data  
**Authority**: Governance Administrator

---

## Retention Policy

### GLOBAL Memory

**Default Retention**: Indefinite

Memory is retained unless:
- Valid forget reason exists
- Governance decides removal is appropriate

**No Automatic Deletion**: Memory does NOT expire automatically

### TENANT Memory (When Activated)

**Default Retention**: Per tenant agreement

Retention may be:
- Indefinite (like GLOBAL)
- Time-limited (e.g., 7 years for compliance)
- Event-based (e.g., until tenant offboarding)

**Tenant Data Removal**: Upon tenant offboarding, all tenant memory MUST be forgotten per data protection requirements.

---

## Forget Audit Requirements

All forget operations MUST be logged in:
- `memory/AUDIT/memory-write-log.md` (forget is a destructive write)

Log entry must include:
- Timestamp
- Requesting embodiment/authority
- Memory scope and key
- Reason for forget (must match valid criteria)
- Approval authority
- Outcome (forgotten or rejected)

**Audit Log Retention**: Forget audit logs are NEVER forgotten (they are permanent record)

---

## Batch Forget Operations

Multiple memory entries may be forgotten in a single operation if:

1. **Common Reason**: All entries share same valid forget reason
2. **Documented**: Batch is clearly documented with list of keys
3. **Approved**: Single approval covers all entries in batch
4. **Audited**: Single log entry with list of all forgotten keys

**Example**: Removing 20 duplicate lesson-learned entries in cleanup operation

---

## Dispute Resolution

If there is disagreement about forgetting memory:

1. **Pause**: Halt forget operation
2. **Escalate**: Escalate to human authority
3. **Review**: Human authority reviews justification and objections
4. **Decide**: Human authority makes final decision
5. **Document**: Decision and rationale documented in audit log

---

## Emergency Kill-Switch Effect on Forget

When memory write kill-switch is activated:
- **Forget operations are SUSPENDED** (forget is a form of write)
- **Exception**: Security/privacy emergency forget may proceed
- **Audit**: All forget operations during kill-switch must be specially logged

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
- `MEMORY_READ_POLICY.md` - Who may read memory
- `memory/README.md` - Overall memory structure
- `memory/TENANT/README.md` - Tenant memory activation requirements

---

**Active Governance Policy — No Execution**
