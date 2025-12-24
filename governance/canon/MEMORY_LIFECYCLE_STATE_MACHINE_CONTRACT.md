# MEMORY LIFECYCLE STATE MACHINE CONTRACT

## Status
**Type**: Canonical Governance Definition  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2025-12-24  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Precedence**: Subordinate to GOVERNANCE_PURPOSE_AND_SCOPE.md  
**Applies To**: All FM Runtime Implementations, All Memory Systems, All Repositories

---

## 1. Purpose

This document formally defines the **Memory Lifecycle State Machine** required by Foreman (FM) runtime and cognitive hygiene integration.

Memory is not instantaneously available. It must be loaded, validated, and verified before use. Without a formal lifecycle model:
- Memory could be used before validation completes (integrity risk)
- Validation failures could be silently ignored (corruption risk)
- State transitions could lack audit trails (accountability gap)
- Observability could be absent (operational blindness)

This document establishes:
- **States**: The discrete phases memory transitions through from inactive to usable
- **Transitions**: The events that cause state changes and who owns them
- **Validation Behavior**: What happens when validation fails (hard stop vs degraded mode)
- **Audit Requirements**: What must be logged at each transition
- **Observability Requirements**: What must be visible externally for supervision and monitoring

**Problem Context**:
- FM runtime depends on governance memory to enforce rules
- Cognitive hygiene depends on memory to detect drift
- Memory loading/validation failures must be detectable and auditable
- Silent memory corruption must be prevented through explicit lifecycle management
- This document resolves G-MEM-ARCH-01 requirement for runtime memory lifecycle contract

---

## 2. Constitutional Mandate

This policy derives authority from and implements:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Governance as canonical memory and control system
- **MEMORY_INTEGRITY_AND_CORRUPTION_MODEL.md** - Memory integrity requirements and corruption detection
- **COGNITIVE_HYGIENE_MEMORY_INTEGRATION_MODEL.md** - CHP memory integration and validation requirements
- **FM_GOVERNANCE_LOADING_PROTOCOL.md** - FM governance loading process
- **AUDIT_READINESS_MODEL.md** - Evidence and audit trail requirements

---

## 3. Core Principles

### 3.1 Memory Must Be Validated Before Use

**Principle**: Memory cannot be used until it has been loaded and validated successfully.

**Requirements**:
- Memory starts in INACTIVE state (not usable)
- Memory transitions through LOADING → VALIDATING → LOADED before becoming USABLE
- Validation failure prevents USABLE state (hard stop or degraded mode)
- No operations may use memory in invalid states

**Rationale**:
- Using unvalidated memory risks corruption propagation
- Validation ensures memory integrity before trust is placed in it
- Explicit validation prevents silent corruption

---

### 3.2 State Transitions Are Auditable

**Principle**: Every state transition must be logged with timestamp, trigger, and outcome.

**Requirements**:
- All state transitions generate audit events
- Audit events include: previous state, new state, transition trigger, timestamp, owner
- Validation outcomes (pass/fail) are audited
- State transition failures are audited

**Rationale**:
- Audit trail enables root cause analysis of memory issues
- State history supports debugging and incident response
- Compliance requires evidence of memory lifecycle management

---

### 3.3 Validation Failures Are Explicit

**Principle**: Memory validation failures must be explicit and actionable, never silent.

**Requirements**:
- Validation failures trigger explicit state transitions (FAILED, DEGRADED, or INVALID)
- Validation failures generate alerts to appropriate authorities
- Validation failures prevent unsafe operations
- Validation failure reasons are logged and queryable

**Rationale**:
- Silent failures enable corruption propagation
- Explicit failures enable human intervention
- Clear failure states enable safe degradation strategies

---

### 3.4 Observability Is Required

**Principle**: Memory lifecycle state must be externally observable for supervision and monitoring.

**Requirements**:
- Current memory state must be queryable at runtime
- State transition history must be queryable
- Validation status must be observable
- Failure reasons must be observable (when applicable)

**Rationale**:
- FM supervision requires memory state visibility
- Watchdog monitoring requires memory state visibility
- Debugging requires state history visibility
- Operational oversight requires real-time state awareness

---

## 4. Memory Lifecycle States

### 4.1 State Definitions

The memory lifecycle consists of the following states:

#### 4.1.1 INACTIVE

**Definition**: Memory is not loaded and not available for use.

**Characteristics**:
- No memory artifacts are loaded into runtime
- No memory operations are possible
- This is the initial state on system startup
- This is a terminal state on graceful shutdown

**Permitted Operations**:
- ✅ Initiate memory loading (transition to LOADING)
- ✅ Query lifecycle state (returns INACTIVE)
- ❌ Read memory content (not available)
- ❌ Validate memory (nothing to validate)

**Exit Conditions**:
- Memory loading initiated → transition to LOADING
- System shutdown complete → remain INACTIVE (terminal)

---

#### 4.1.2 LOADING

**Definition**: Memory artifacts are being loaded from canonical sources into runtime.

**Characteristics**:
- Memory artifacts are being read from governance repository
- Memory structures are being populated
- Loading may take seconds to minutes depending on memory size
- Loading may fail due to I/O errors, missing files, or parsing errors

**Permitted Operations**:
- ✅ Continue loading memory artifacts
- ✅ Query lifecycle state (returns LOADING with progress %)
- ✅ Cancel loading (transition to INACTIVE or FAILED)
- ❌ Read memory content (not yet validated)
- ❌ Use memory for decision-making (not yet validated)

**Exit Conditions**:
- Loading completes successfully → transition to VALIDATING
- Loading fails (I/O error, missing files, parsing error) → transition to FAILED
- Loading cancelled → transition to INACTIVE or FAILED

**Owner**: FM Runtime (governance loading subsystem)

---

#### 4.1.3 VALIDATING

**Definition**: Loaded memory is being validated for integrity, completeness, and consistency.

**Characteristics**:
- All memory artifacts have been loaded
- Schema validation in progress
- Consistency validation in progress
- Completeness validation in progress
- Validation may detect corruption, missing artifacts, or inconsistencies

**Permitted Operations**:
- ✅ Continue validation checks
- ✅ Query lifecycle state (returns VALIDATING with progress %)
- ✅ Query validation findings (warnings, errors discovered so far)
- ❌ Read memory content (not yet confirmed valid)
- ❌ Use memory for decision-making (validation incomplete)

**Exit Conditions**:
- Validation passes all checks → transition to LOADED
- Validation fails with critical errors → transition to FAILED
- Validation passes with warnings (degraded integrity) → transition to DEGRADED
- Validation cancelled → transition to FAILED

**Owner**: FM Runtime (memory validation subsystem) + Watchdog (validation execution)

---

#### 4.1.4 LOADED

**Definition**: Memory has been loaded and validated successfully, ready to become usable.

**Characteristics**:
- All memory artifacts loaded
- All validation checks passed
- Memory integrity confirmed
- Memory ready for activation

**Permitted Operations**:
- ✅ Activate memory (transition to USABLE)
- ✅ Query lifecycle state (returns LOADED)
- ✅ Query memory content (read-only, informational)
- ❌ Use memory for decision-making (not yet activated)

**Exit Conditions**:
- Memory activated → transition to USABLE
- Memory reload triggered → transition to LOADING
- System shutdown → transition to INACTIVE

**Owner**: FM Runtime (memory activation subsystem)

---

#### 4.1.5 USABLE

**Definition**: Memory is loaded, validated, and activated for operational use.

**Characteristics**:
- Memory is available for all authorized operations
- Governance rules are enforceable
- CHP may read memory for drift detection
- Memory state is stable and trusted

**Permitted Operations**:
- ✅ Read memory content (governance rules, learning records, etc.)
- ✅ Query lifecycle state (returns USABLE)
- ✅ Use memory for decision-making (governance enforcement, pattern detection)
- ✅ Submit memory proposals (via proposal workflow)
- ✅ Trigger memory reload (transition to LOADING)
- ❌ Write memory directly (only via governance-approved workflow)

**Exit Conditions**:
- Memory reload triggered → transition to LOADING
- Memory corruption detected → transition to INVALID
- System shutdown → transition to INACTIVE

**Owner**: All authorized agents (FM, CHP, Watchdog, Governance Admin)

---

### 4.2 Failure States

In addition to the primary lifecycle states, the following failure states exist:

#### 4.2.1 FAILED

**Definition**: Memory loading or validation failed with critical errors preventing use.

**Characteristics**:
- Loading failed (I/O error, missing files, parsing errors)
- Validation failed with critical corruption
- Memory cannot be trusted or used
- Requires human intervention to resolve

**Permitted Operations**:
- ✅ Query lifecycle state (returns FAILED with error details)
- ✅ Query failure reasons (error messages, affected artifacts)
- ✅ Retry loading (transition to LOADING)
- ❌ Read memory content (corrupted or incomplete)
- ❌ Use memory for decision-making (unsafe)

**Exit Conditions**:
- Retry loading initiated → transition to LOADING
- System shutdown → transition to INACTIVE

**Escalation**: Hard stop - escalate to Governance Admin + Johan

**Owner**: Human authority (remediation) + Governance Admin (resolution)

---

#### 4.2.2 DEGRADED

**Definition**: Memory loaded and partially validated, but with non-critical warnings.

**Characteristics**:
- Loading completed successfully
- Validation passed with warnings (not critical errors)
- Memory usable but with reduced confidence
- Some functionality may be limited or disabled

**Permitted Operations**:
- ✅ Query lifecycle state (returns DEGRADED with warnings)
- ✅ Query warnings (non-critical issues discovered)
- ✅ Read memory content (with caution)
- ✅ Use memory for non-critical operations
- ⚠️ Use memory for critical operations (with explicit confirmation)
- ✅ Trigger memory reload (transition to LOADING)

**Exit Conditions**:
- Memory reload triggered → transition to LOADING
- Warnings resolved → transition to USABLE (after revalidation)
- Warnings escalate to critical → transition to INVALID

**Escalation**: Soft stop - alert to Governance Admin

**Owner**: Governance Admin (warning resolution) + FM Runtime (degraded mode operation)

---

#### 4.2.3 INVALID

**Definition**: Previously usable memory detected as corrupted during runtime.

**Characteristics**:
- Memory was in USABLE state
- Runtime corruption detected (via Watchdog or integrity checks)
- Memory no longer trustworthy
- Immediate transition to safe state required

**Permitted Operations**:
- ✅ Query lifecycle state (returns INVALID with corruption details)
- ✅ Query corruption findings
- ✅ Trigger memory reload (transition to LOADING)
- ❌ Read memory content (corrupted)
- ❌ Use memory for decision-making (unsafe)

**Exit Conditions**:
- Memory reload triggered → transition to LOADING
- System shutdown → transition to INACTIVE

**Escalation**: Hard stop - escalate to Watchdog + Governance Admin + Johan

**Owner**: Human authority (remediation) + Governance Admin (resolution)

---

## 5. State Transition Diagram

```
┌─────────────┐
│  INACTIVE   │ (Initial/Terminal State)
└──────┬──────┘
       │ Load initiated
       ▼
┌─────────────┐
│  LOADING    │ ◄──────────┐ Retry
└──────┬──────┘            │
       │ Load complete     │
       ▼                   │
┌─────────────┐            │
│ VALIDATING  │            │
└──────┬──────┘            │
       │                   │
       ├─────────► FAILED ─┘ (Critical errors)
       │                   
       ├─────────► DEGRADED (Warnings)
       │                   
       │ Validation pass   
       ▼                   
┌─────────────┐            
│   LOADED    │            
└──────┬──────┘            
       │ Activate          
       ▼                   
┌─────────────┐            
│   USABLE    │            
└──────┬──────┘            
       │ Corruption detected
       ▼                   
┌─────────────┐            
│  INVALID    │ ──────► Reload → LOADING
└─────────────┘            

Note: All states can transition to INACTIVE on graceful system shutdown.
      Failure states (FAILED, INVALID) may also transition via retry to LOADING.
```

---

## 6. State Transition Triggers and Owners

### 6.1 INACTIVE → LOADING

**Trigger**: FM runtime startup OR explicit memory reload command

**Trigger Owner**: 
- FM Runtime (automatic on startup)
- Governance Admin (manual reload command)
- Johan (manual reload command)

**Preconditions**:
- Memory source repository accessible
- FM runtime initialized
- No ongoing loading operation

**Actions**:
1. Initialize memory loading subsystem
2. Begin reading governance artifacts from canonical source
3. Populate internal memory structures
4. Track loading progress

**Audit Requirements**:
- Log transition timestamp
- Log trigger source (startup, manual reload, authority)
- Log memory source repository reference (commit SHA, branch)
- Log loading progress milestones (25%, 50%, 75%, 100%)

**Owner**: FM Runtime (governance loading subsystem)

---

### 6.2 LOADING → VALIDATING

**Trigger**: All memory artifacts loaded successfully

**Trigger Owner**: FM Runtime (loading subsystem completion)

**Preconditions**:
- All required memory artifacts loaded
- No I/O errors during loading
- Memory structures populated

**Actions**:
1. Begin schema validation
2. Begin consistency validation (cross-artifact)
3. Begin completeness validation (required artifacts exist)
4. Track validation progress

**Audit Requirements**:
- Log transition timestamp
- Log number of artifacts loaded
- Log total memory size (bytes)
- Log validation start

**Owner**: FM Runtime (memory validation subsystem)

---

### 6.3 VALIDATING → LOADED

**Trigger**: All validation checks passed

**Trigger Owner**: FM Runtime (validation subsystem completion) + Watchdog (validation execution)

**Preconditions**:
- Schema validation passed
- Consistency validation passed
- Completeness validation passed
- No critical errors detected

**Actions**:
1. Mark memory as validated
2. Prepare memory for activation
3. Notify monitoring systems

**Audit Requirements**:
- Log transition timestamp
- Log validation summary (checks passed, warnings if any)
- Log memory readiness confirmation

**Owner**: FM Runtime (memory activation subsystem)

---

### 6.4 LOADED → USABLE

**Trigger**: Explicit memory activation command

**Trigger Owner**:
- FM Runtime (automatic activation if no warnings)
- Governance Admin (manual activation if warnings present)
- Johan (manual activation override)

**Preconditions**:
- Memory in LOADED state
- Validation completed successfully
- No blocking conditions

**Actions**:
1. Activate memory for operational use
2. Enable memory-dependent operations (governance enforcement, pattern detection)
3. Notify all subsystems of memory availability

**Audit Requirements**:
- Log transition timestamp
- Log activation authority (automatic, Governance Admin, Johan)
- Log memory version/commit SHA
- Log activation confirmation

**Owner**: FM Runtime (memory activation subsystem) + Governance Admin (authorization)

---

### 6.5 LOADING → FAILED

**Trigger**: Critical loading error (I/O error, missing files, parsing error)

**Trigger Owner**: FM Runtime (loading subsystem error detection)

**Preconditions**: Loading operation in progress

**Actions**:
1. Halt loading operation
2. Log error details (error type, affected artifacts, stack trace)
3. Transition to FAILED state
4. Escalate to Governance Admin + Johan

**Audit Requirements**:
- Log transition timestamp
- Log error type and severity
- Log affected artifacts (missing files, corrupted files)
- Log error messages and stack traces
- Log escalation confirmation

**Owner**: FM Runtime (error handler) + Governance Admin (remediation)

---

### 6.6 VALIDATING → FAILED

**Trigger**: Critical validation error (corruption, missing required artifacts, critical inconsistencies)

**Trigger Owner**: FM Runtime (validation subsystem) + Watchdog (validation execution)

**Preconditions**: Validation operation in progress

**Actions**:
1. Halt validation operation
2. Log validation findings (corruption details, missing artifacts, inconsistencies)
3. Transition to FAILED state
4. Escalate to Governance Admin + Watchdog + Johan

**Audit Requirements**:
- Log transition timestamp
- Log validation findings (critical errors with details)
- Log affected artifacts and error reasons
- Log escalation confirmation

**Owner**: FM Runtime (error handler) + Watchdog (detection) + Governance Admin (remediation)

---

### 6.7 VALIDATING → DEGRADED

**Trigger**: Validation passed with non-critical warnings

**Trigger Owner**: FM Runtime (validation subsystem) + Watchdog (validation execution)

**Preconditions**: Validation operation completed with warnings

**Actions**:
1. Mark memory as degraded
2. Log warnings (non-critical issues)
3. Transition to DEGRADED state
4. Alert Governance Admin (soft stop)

**Audit Requirements**:
- Log transition timestamp
- Log warnings (non-critical issues with details)
- Log affected artifacts and warning reasons
- Log alert confirmation

**Owner**: FM Runtime (degraded mode controller) + Governance Admin (warning resolution)

---

### 6.8 USABLE → INVALID

**Trigger**: Runtime corruption detected

**Trigger Owner**: Watchdog (integrity monitoring) + FM Runtime (integrity checks)

**Preconditions**: Memory in USABLE state, corruption detected during runtime

**Actions**:
1. Immediately halt memory-dependent operations
2. Log corruption details (corruption type, affected artifacts)
3. Transition to INVALID state
4. Escalate to Watchdog + Governance Admin + Johan (hard stop)

**Audit Requirements**:
- Log transition timestamp
- Log corruption detection source (Watchdog, integrity check)
- Log corruption details (type, severity, affected artifacts)
- Log operations halted
- Log escalation confirmation

**Owner**: Watchdog (detection) + Governance Admin (remediation) + Johan (authorization)

---

### 6.9 Any State → INACTIVE

**Trigger**: System shutdown OR memory unload command

**Trigger Owner**:
- FM Runtime (graceful shutdown)
- Johan (manual shutdown)

**Preconditions**: System shutdown initiated

**Actions**:
1. Halt all memory operations
2. Unload memory artifacts from runtime
3. Transition to INACTIVE state
4. Log shutdown completion

**Audit Requirements**:
- Log transition timestamp
- Log shutdown trigger (graceful, manual, emergency)
- Log previous state (for restart context)
- Log shutdown confirmation

**Owner**: FM Runtime (shutdown subsystem)

---

## 7. Validation Failure Behavior

### 7.1 Hard Stop (Critical Failures)

**Conditions**:
- S1 corruption detected (per MEMORY_INTEGRITY_AND_CORRUPTION_MODEL.md)
- Critical schema violations
- Missing required canonical documents
- Critical consistency failures (constitutional contradictions)

**Behavior**:
- Memory transitions to FAILED state
- All memory-dependent operations halted
- Immediate escalation to Johan + Governance Admin
- Human authorization required to proceed

**Rationale**: Critical failures compromise governance integrity and must not be ignored.

---

### 7.2 Degraded Mode (Non-Critical Warnings)

**Conditions**:
- S2/S3 integrity issues (per MEMORY_INTEGRITY_AND_CORRUPTION_MODEL.md)
- Non-critical schema violations
- Optional artifact warnings
- Minor consistency warnings

**Behavior**:
- Memory transitions to DEGRADED state
- Memory usable for non-critical operations
- Critical operations require explicit confirmation
- Alert to Governance Admin (soft stop)
- Operations continue with reduced confidence

**Rationale**: Non-critical issues should not block all operations, but must be visible and tracked.

---

### 7.3 Automatic Retry

**Conditions**:
- Transient I/O errors during loading
- Network timeouts accessing memory source
- Temporary resource unavailability

**Behavior**:
- Automatic retry with exponential backoff (3 attempts maximum)
- If retries exhausted → transition to FAILED
- Retry attempts logged in audit trail

**Rationale**: Transient errors should be retried automatically before escalating to hard stop.

---

## 8. Audit Requirements Per Transition

### 8.1 Required Audit Fields

Every state transition MUST log the following fields:

**Core Fields**:
- `timestamp`: ISO 8601 timestamp of transition
- `previous_state`: State before transition
- `new_state`: State after transition
- `trigger`: Event or condition that caused transition
- `owner`: Authority responsible for transition
- `session_id`: FM runtime session identifier

**Context Fields**:
- `memory_source`: Repository reference (commit SHA, branch, tag)
- `memory_version`: Governance version loaded (if applicable)
- `operation_id`: Unique identifier for loading/validation operation

**Outcome Fields**:
- `success`: Boolean indicating successful transition
- `error_details`: Error messages, stack traces (if failure)
- `warnings`: Non-critical warnings (if applicable)
- `affected_artifacts`: List of artifacts involved in transition

---

### 8.2 Audit Trail Location

**Primary Audit Trail**: `memory/AUDIT/memory-lifecycle-log.md`

**Format**: Append-only, structured log entries

**Retention**: Permanent (governance record)

**Accessibility**: 
- Governance Admin: Full access
- Watchdog: Read-only access
- FM Runtime: Write-only access (cannot modify existing entries)
- Johan: Full access

---

### 8.3 Audit Queryability

The audit trail MUST be queryable by:
- **Time Range**: Retrieve transitions within date range
- **State**: Retrieve all transitions to/from specific state
- **Trigger**: Retrieve transitions caused by specific trigger
- **Owner**: Retrieve transitions by authority
- **Outcome**: Retrieve successful vs. failed transitions
- **Session**: Retrieve all transitions within FM runtime session

---

## 9. Observability Requirements

### 9.1 Runtime State Query

**Requirement**: Memory lifecycle state MUST be queryable at runtime.

**Query Interface**:
```
GET /memory/lifecycle/state
Response:
{
  "current_state": "USABLE",
  "timestamp": "2025-12-24T13:37:00Z",
  "memory_version": "v1.0.0",
  "memory_source": "commit:abc123",
  "last_transition": {
    "from": "LOADED",
    "to": "USABLE",
    "timestamp": "2025-12-24T13:30:00Z",
    "trigger": "automatic_activation"
  }
}
```

**Access Control**:
- Governance Admin: Full access
- Foreman: Read access
- Watchdog: Read access
- Builders: No access (not memory authorities)

---

### 9.2 State Transition History

**Requirement**: Memory state transition history MUST be queryable.

**Query Interface**:
```
GET /memory/lifecycle/history?since=2025-12-24T00:00:00Z
Response:
{
  "transitions": [
    {
      "timestamp": "2025-12-24T13:00:00Z",
      "from": "INACTIVE",
      "to": "LOADING",
      "trigger": "fm_startup",
      "owner": "fm_runtime"
    },
    {
      "timestamp": "2025-12-24T13:10:00Z",
      "from": "LOADING",
      "to": "VALIDATING",
      "trigger": "loading_complete",
      "owner": "fm_runtime"
    },
    ...
  ]
}
```

**Access Control**: Same as runtime state query

---

### 9.3 Validation Status

**Requirement**: Memory validation status MUST be queryable (when in VALIDATING, DEGRADED, FAILED, or INVALID states).

**Query Interface**:
```
GET /memory/lifecycle/validation
Response:
{
  "validation_status": "PASSED_WITH_WARNINGS",
  "critical_errors": [],
  "warnings": [
    {
      "severity": "S3",
      "artifact": "governance/canon/SOME_DOCUMENT.md",
      "reason": "Minor formatting inconsistency"
    }
  ],
  "checks_completed": 47,
  "checks_total": 50,
  "progress": "94%"
}
```

**Access Control**: Same as runtime state query

---

### 9.4 Observability Dashboard

**Requirement**: Memory lifecycle state MUST be visible in FM monitoring dashboard.

**Dashboard Elements**:
- Current memory state (visual indicator: green=USABLE, yellow=DEGRADED, red=FAILED/INVALID)
- Time in current state
- Last transition timestamp and trigger
- Validation status summary (if applicable)
- Quick action: Reload memory

**Access Control**:
- Governance Admin: Full dashboard access
- Johan: Full dashboard access
- Foreman: Read-only dashboard access
- Watchdog: Read-only dashboard access

---

## 10. Integration with Existing Governance

### 10.1 MEMORY_INTEGRITY_AND_CORRUPTION_MODEL.md

**Alignment**:
- Memory lifecycle validation implements integrity validation (Section 4)
- State machine failure states align with corruption severities (Section 5)
- Validation failure behavior aligns with escalation paths (Section 9)
- Audit requirements align with audit trail requirements (Section 8)

**Extensions**:
- This document specifies lifecycle states and transitions
- This document specifies validation behavior in lifecycle context
- This document specifies observability requirements for lifecycle

---

### 10.2 COGNITIVE_HYGIENE_MEMORY_INTEGRATION_MODEL.md

**Alignment**:
- Memory must be in USABLE state before CHP can read it (Section 4.2)
- Memory in INVALID state prevents CHP operations (Section 4.4)
- Memory lifecycle audit integrates with CHP memory read audit (Section 8)

**Extensions**:
- This document defines when memory is safe for CHP access (USABLE state)
- This document defines when memory access must be denied (INVALID, FAILED states)

---

### 10.3 FM_GOVERNANCE_LOADING_PROTOCOL.md

**Alignment**:
- FM governance loading implements INACTIVE → LOADING → VALIDATING → LOADED → USABLE flow
- Loading protocol validation aligns with VALIDATING state requirements
- Loading protocol audit aligns with state transition audit requirements

**Extensions**:
- This document formalizes lifecycle states for all memory (not just FM governance)
- This document defines failure states and degraded mode
- This document defines observability requirements

---

### 10.4 WATCHDOG_AUTHORITY_AND_SCOPE.md

**Alignment**:
- Watchdog validates memory during VALIDATING state (Section 5.2)
- Watchdog detects corruption triggering USABLE → INVALID transition (Section 10.2)
- Watchdog observes lifecycle state for monitoring (Section 9)

**Extensions**:
- This document defines Watchdog role in lifecycle transitions
- This document defines when Watchdog triggers hard stops (INVALID state)

---

## 11. Implementation Boundaries

### 11.1 What This Document Defines

- ✅ Memory lifecycle states (INACTIVE, LOADING, VALIDATING, LOADED, USABLE, FAILED, DEGRADED, INVALID)
- ✅ State transition triggers and owners
- ✅ Validation failure behavior (hard stop vs degraded mode)
- ✅ Audit requirements per transition
- ✅ Observability requirements (state query, history, validation status)
- ✅ Integration with existing memory governance

### 11.2 What This Document Does NOT Define

- ❌ FM runtime implementation architecture (how states are implemented)
- ❌ Memory storage mechanisms (database, file system, in-memory)
- ❌ Validation algorithms (how schema validation works)
- ❌ Dashboard UI design (visual appearance)
- ❌ Query API technical implementation (REST vs GraphQL vs other)

**Separation**: This is governance contract, not implementation specification.

---

## 12. Non-Negotiable Invariants

The following invariants are **absolute and non-negotiable**:

1. **Memory Cannot Be Used Before Validation**
   - Memory must transition through LOADING → VALIDATING → LOADED before USABLE
   - No shortcuts or bypass mechanisms permitted
   - Validation cannot be skipped or deferred

2. **State Transitions Are Auditable**
   - Every transition logged with required fields
   - Audit trail is append-only and immutable
   - No silent state changes permitted

3. **Validation Failures Are Explicit**
   - Critical failures → FAILED state (hard stop)
   - Non-critical warnings → DEGRADED state (soft stop)
   - No silent degradation or ignored errors

4. **Observability Is Mandatory**
   - Current state must be queryable
   - Transition history must be queryable
   - Validation status must be queryable
   - Dashboard visibility required

5. **Watchdog Observes, Never Repairs**
   - Watchdog validates memory during VALIDATING state
   - Watchdog detects corruption triggering INVALID state
   - Watchdog never modifies memory or state machine
   - Watchdog escalates, humans remediate

---

## 13. Metrics and Success Criteria

### 13.1 State Machine Health

**Metrics**:
- Time to USABLE state (from INACTIVE)
- Validation pass rate (% of validations passing)
- Degraded mode frequency (transitions to DEGRADED per month)
- Critical failure frequency (transitions to FAILED per month)
- Runtime corruption detection (transitions to INVALID per month)

**Targets**:
- Time to USABLE: < 60 seconds (normal operations)
- Validation pass rate: > 95%
- Degraded mode frequency: < 3 per month
- Critical failure frequency: 0 per quarter
- Runtime corruption detection: 0 per quarter

---

### 13.2 Audit Completeness

**Metrics**:
- Audit trail completeness (% of transitions logged)
- Audit field completeness (% of required fields present)
- Audit queryability availability (uptime)

**Targets**:
- Audit trail completeness: 100%
- Audit field completeness: 100%
- Audit queryability availability: 99.9%

---

### 13.3 Observability Effectiveness

**Metrics**:
- State query latency (response time)
- Dashboard availability (uptime)
- Observability coverage (% of required queries implemented)

**Targets**:
- State query latency: < 100ms
- Dashboard availability: 99.9%
- Observability coverage: 100%

---

## 14. Evolution and Review

### 14.1 Contract Review

**Frequency**: Annual or after significant FM runtime changes

**Review Scope**:
- Are lifecycle states still sufficient?
- Are validation behaviors still appropriate?
- Are audit requirements still adequate?
- Are observability requirements still sufficient?

**Authority**: Johan Ras approves all changes

---

### 14.2 Integration Review

**Frequency**: Quarterly

**Review Scope**:
- Is contract aligned with MEMORY_INTEGRITY_AND_CORRUPTION_MODEL.md?
- Is contract aligned with COGNITIVE_HYGIENE_MEMORY_INTEGRATION_MODEL.md?
- Is contract aligned with FM_GOVERNANCE_LOADING_PROTOCOL.md?
- Is contract aligned with WATCHDOG_AUTHORITY_AND_SCOPE.md?

**Output**: Recommendations for integration improvements

---

## 15. Precedence and Final Authority

This document has canonical authority over memory lifecycle state management.

If any FM runtime implementation, memory system, or integration conflicts with this document, this document prevails.

Memory lifecycle authority is subordinate to:
1. Johan Ras (human final authority)
2. GOVERNANCE_PURPOSE_AND_SCOPE.md (supreme governance authority)
3. MEMORY_INTEGRITY_AND_CORRUPTION_MODEL.md (memory integrity authority)

Memory lifecycle authority is superior to:
- FM runtime implementation decisions
- Memory system implementation decisions
- Observability implementation decisions

---

## 16. Conclusion

This model ensures:
- Memory lifecycle is explicit and state-based
- Memory cannot be used before validation
- Validation failures are explicit and actionable
- State transitions are auditable
- Memory lifecycle is observable for supervision and monitoring
- Integration with existing memory governance is clear

**Memory lifecycle is governance. State is observable. Validation is mandatory. Failures are explicit.**

The state machine ensures memory is trustworthy before trust is placed in it.

---

**End of MEMORY_LIFECYCLE_STATE_MACHINE_CONTRACT.md**

---

**Document Metadata**:
- Contract ID: MEMORY_LIFECYCLE_SM_V1
- Authority: Canonical Governance Definition
- Required By: G-MEM-ARCH-01 (Define Runtime Memory Lifecycle State Machine Contract)
- Integrates With: MEMORY_INTEGRITY_AND_CORRUPTION_MODEL.md, COGNITIVE_HYGIENE_MEMORY_INTEGRATION_MODEL.md, FM_GOVERNANCE_LOADING_PROTOCOL.md, WATCHDOG_AUTHORITY_AND_SCOPE.md
- Enforcement: FM Runtime (state machine) + Watchdog (validation) + Governance Admin (remediation)
