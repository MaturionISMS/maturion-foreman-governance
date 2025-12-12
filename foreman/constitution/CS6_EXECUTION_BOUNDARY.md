# CS6: Execution Boundary

## Overview

**CS6 (Execution Boundary)** defines the boundaries within which agents may execute autonomously, and the conditions under which execution must halt.

This constitutional document ensures:
- Clear execution boundaries for all agents
- Autonomous execution within safe boundaries
- Automatic halting when boundaries are violated
- OPOJD continuous execution mandate
- Protection against unauthorized or unsafe operations

---

## Core Principles

### Execution Within Boundaries

**Agents may execute autonomously if and only if:**

1. **Within Authorized Scope**
   - Task is within agent's defined capabilities
   - Required permissions are granted
   - Resources are available and accessible

2. **Within Governance Constraints**
   - No CS1-CS6 violations detected
   - QA standards maintained (QIC, QIEL)
   - Architecture compliance verified

3. **Within Safety Limits**
   - No secrets exposed
   - No data leakage
   - No unauthorized external access
   - Tenant isolation maintained

4. **Within Performance Bounds**
   - Execution continuity ≥ 95% (CS5)
   - Response times within standards
   - Resource usage within limits

---

## Continuous Execution Mandate (OPOJD)

Under the **One-Prompt One-Job Doctrine (OPOJD)**, agents **MUST** assume permission to continue unless explicitly denied by governance.

### Assume-Continue Principle

**Default State**: `PERMISSION_GRANTED`

**Agents MUST:**
- Assume permission to continue at each phase transition
- Check governance conditions automatically
- Proceed immediately if no violations detected
- Escalate only when continuation would violate CS1-CS6

**Agents MUST NOT:**
- Pause execution unless boundary conditions are violated
- Request permission for normal operations
- Enter idle state when work is available
- Defer work without legitimate blocker

### Automatic Boundary Checks

At each phase transition, agents automatically check:

```typescript
// CS6 Boundary Check (Automatic)
interface BoundaryCheck {
  cs1: boolean; // Constitutional integrity OK?
  cs2: boolean; // Protected files OK?
  cs3: boolean; // No critical incidents?
  cs4: boolean; // Compliance OK?
  cs5: boolean; // Performance OK?
  cs6: boolean; // Within execution boundary?
  qaStatus: boolean; // QA passing?
  resourcesAvailable: boolean; // Dependencies OK?
}

function checkContinue(state: ExecutionState): ContinueDecision {
  const checks = performBoundaryChecks(state);
  
  // If ALL checks pass → Continue immediately
  if (allChecksPassed(checks)) {
    return { continue: true, reason: 'WITHIN_BOUNDARIES' };
  }
  
  // If ANY check fails → Pause and escalate
  return { 
    continue: false, 
    reason: identifyViolation(checks),
    escalate: true 
  };
}
```

**Result:**
- ✅ All checks pass → Continue automatically (no human approval)
- ❌ Any check fails → Pause and escalate

### Workflow Lifecycle Continuity

**OPOJD requires workflows to complete their entire lifecycle once initiated:**

```
ARCHITECTURE → RED QA → BUILD-TO-GREEN → VALIDATION → MERGE → EVIDENCE → NOTIFY
      ↓            ↓            ↓              ↓          ↓         ↓         ↓
  [CS6 Check]  [CS6 Check]  [CS6 Check]    [CS6 Check] [CS6 Check] [CS6 Check] [Complete]
      ↓            ↓            ↓              ↓          ↓         ↓
   Continue     Continue     Continue       Continue   Continue  Continue
```

**Each phase transition:**
1. Completes current phase
2. Performs automatic boundary check
3. If pass → Starts next phase immediately
4. If fail → Escalates with reason

**No manual approval gates** (except CS2 for protected files)

---

## Execution Boundaries by Agent Type

### Foreman (Autonomous Orchestrator)

**Authorized to:**
- Design architecture
- Create Red QA
- Issue "Build to Green" instructions
- Validate QA results
- Create PRs
- Coordinate builders
- Escalate issues
- Update evidence trail

**NOT authorized to:**
- Write production code
- Modify workflows (without CS2 approval)
- Modify constitutional files (without CS2 approval)
- Approve own PRs
- Bypass QA gates
- Expose secrets
- Execute external builders (CS6 violation)

**Boundary Check:**
```typescript
// Foreman boundary check
function foremanBoundaryCheck(action: Action): boolean {
  if (action.type === 'WRITE_CODE') return false; // ❌ Outside boundary
  if (action.type === 'MODIFY_WORKFLOW' && !cs2Approved()) return false; // ❌
  if (action.type === 'BYPASS_QA') return false; // ❌
  if (action.type === 'DESIGN_ARCHITECTURE') return true; // ✅ Within boundary
  if (action.type === 'CREATE_RED_QA') return true; // ✅
  if (action.type === 'ISSUE_BUILD_TO_GREEN') return true; // ✅
  return true; // Default: allowed
}
```

### Builder Agents (Code Implementers)

**Authorized to:**
- Implement code to pass Red QA
- Run tests locally
- Iterate until QA green
- Report completion status
- Request architecture clarification (if ambiguous)
- Attempt self-recovery for build errors

**NOT authorized to:**
- Build without Red QA
- Accept instructions other than "Build to Green"
- Modify architecture
- Skip tests
- Add features not in QA
- Expose secrets
- Modify protected files (without CS2 approval)

**Boundary Check:**
```typescript
// Builder boundary check
function builderBoundaryCheck(action: Action): boolean {
  if (action.type === 'BUILD' && !redQAExists()) return false; // ❌
  if (action.type === 'SKIP_TESTS') return false; // ❌
  if (action.type === 'ADD_UNSPECIFIED_FEATURE') return false; // ❌
  if (action.type === 'IMPLEMENT_TO_GREEN') return true; // ✅
  if (action.type === 'RUN_TESTS') return true; // ✅
  return true; // Default: allowed
}
```

### Maturion-Builder (Internal Builder)

**Authorized to:**
- All builder capabilities
- Access internal repository
- Modify non-protected files
- Create commits
- Push to branches

**NOT authorized to:**
- Merge PRs (requires validation)
- Modify protected files (without CS2 approval)
- Execute without Red QA
- Bypass governance gates

**Boundary Check:**
```typescript
// Maturion-Builder boundary check
function maturionBuilderBoundaryCheck(action: Action): boolean {
  if (action.type === 'MERGE_PR' && !validationPassed()) return false; // ❌
  if (action.type === 'MODIFY_PROTECTED_FILE' && !cs2Approved()) return false; // ❌
  if (action.type === 'BUILD_WITHOUT_QA') return false; // ❌
  if (action.type === 'IMPLEMENT_CODE') return true; // ✅
  if (action.type === 'CREATE_COMMIT') return true; // ✅
  return true; // Default: allowed
}
```

---

## Boundary Violation Response

### Detection

**Boundary violations are detected:**
1. **Pre-action validation** - Before executing action
2. **Runtime monitoring** - During execution
3. **Post-action validation** - After execution completes
4. **Audit trail analysis** - Retrospective review

### Immediate Response

**When boundary violation detected:**

1. **Halt Execution**
   - Stop current operation immediately
   - Rollback incomplete changes
   - Enter `BOUNDARY_VIOLATION` state

2. **Escalate**
   - Log violation with full context
   - Notify Owner immediately
   - Create incident report
   - Await human review

3. **Prevent Recurrence**
   - Update boundary checks if gap found
   - Add test to prevent same violation
   - Document in lessons learned

### Violation Severity

**Critical (Immediate halt, Owner review required):**
- Secret exposure attempted
- Protected file modification without CS2
- External builder execution
- Constitutional file bypass
- QA gate bypass

**High (Halt, automatic escalation):**
- Architecture violation
- Governance rule bypass
- Performance threshold exceeded
- Unauthorized scope expansion

**Medium (Log, continue with restriction):**
- Resource limit exceeded
- Response time violation
- Non-critical pattern violation

**Low (Log, continue):**
- Documentation gap
- Minor style violation
- Optimization opportunity

---

## OPOJD Integration

### State Machine Under OPOJD

**States:**
```
READY → EXECUTING_TASK → EXECUTING_WAVE → VALIDATING → COMPLETING
                ↓                                            ↓
         [Boundary Check]                              [Success]
                ↓                                            ↓
        WITHIN_BOUNDS                                    COMPLETE
                ↓
            Continue
                
                OR
                ↓
         BOUNDARY_VIOLATED
                ↓
            ESCALATE
```

**WAITING_FOR_APPROVAL removed from default flow**

`WAITING_FOR_APPROVAL` only entered when:
- CS2 explicitly triggered (protected file modification)
- No other reason allows entering this state

### Continuous Execution Rules

**Agents MUST execute continuously:**

1. **Wave Execution**
   - Tasks start immediately when dependencies met
   - No pause between task completion and next task start
   - Wave completes without interruption (unless CS1-CS6)

2. **Builder Execution**
   - Build starts immediately after Red QA validated
   - Implementation continues until QA green
   - No pause for approval during implementation

3. **Recovery Operations**
   - Recovery attempts start immediately on failure
   - No pause to "ask for permission to recover"
   - Escalate only if recovery impossible

4. **Autonomy Runtime**
   - Tasks queue and execute continuously
   - No artificial delays between tasks
   - Boundary checks automatic, not manual

---

## Autonomy Runtime Integration

### Runtime Configuration

```typescript
// CS6 Autonomy Runtime Configuration
interface AutonomyConfig {
  // OPOJD Settings
  assumeContinue: true; // Always assume permission
  autoProgressPhases: true; // Auto-transition between phases
  approvalGatesDisabled: true; // No approval gates (except CS2)
  
  // Boundary Settings
  boundaryChecks: 'AUTOMATIC'; // Check at every transition
  boundaryViolationAction: 'HALT_AND_ESCALATE';
  
  // Performance Settings (CS5)
  minExecutionContinuity: 0.95; // 95% minimum
  maxPauseCount: 0; // No unnecessary pauses
  
  // CS2 Integration
  cs2ApprovalRequired: true; // Protected files still require approval
  cs2AutoDetect: true; // Auto-detect protected file changes
}
```

### Runtime Behavior

**Default Transition:**
```
READY → EXECUTING_TASK → EXECUTING_WAVE → VALIDATING → COMPLETING → COMPLETE
```

**With CS2 Trigger:**
```
READY → EXECUTING_TASK → [CS2 Detected] → WAITING_FOR_APPROVAL → [Approved] → EXECUTING_TASK → ...
```

**With Boundary Violation:**
```
READY → EXECUTING_TASK → [Violation] → BOUNDARY_VIOLATED → ESCALATED
```

---

## Wave Engine Integration

### Wave Execution Rules

**A wave MUST NOT pause unless:**
1. A dependency fails (task in wave failed)
2. CS1-CS6 triggers (governance violation)
3. Critical test or validation barrier fails

**Otherwise, waves MUST execute continuously until completion.**

### Wave State Transitions

```typescript
// Wave Engine CS6 Integration
interface WaveState {
  status: 'EXECUTING' | 'PAUSED' | 'COMPLETED' | 'FAILED';
  pauseReason?: 'DEPENDENCY_FAILURE' | 'GOVERNANCE_VIOLATION' | 'CRITICAL_TEST_FAILURE';
  continueAutomatically: boolean; // true by default
}

function waveTransition(wave: Wave): WaveState {
  const checks = performBoundaryChecks(wave);
  
  if (checks.dependencyFailed) {
    return { status: 'PAUSED', pauseReason: 'DEPENDENCY_FAILURE', continueAutomatically: false };
  }
  
  if (checks.governanceViolation) {
    return { status: 'PAUSED', pauseReason: 'GOVERNANCE_VIOLATION', continueAutomatically: false };
  }
  
  if (checks.criticalTestFailure) {
    return { status: 'PAUSED', pauseReason: 'CRITICAL_TEST_FAILURE', continueAutomatically: false };
  }
  
  // No violations → Continue
  return { status: 'EXECUTING', continueAutomatically: true };
}
```

---

## Recovery Engine Integration

### Recovery Rules

**Recovery MUST always attempt auto-resolution before escalation.**

**Recovery Process:**
1. **Detect Failure** - Automatic detection
2. **Assess Recoverability** - Can this be auto-fixed?
3. **Attempt Recovery** - Execute recovery strategy
4. **Validate** - Did recovery succeed?
5. **Continue or Escalate** - Success → Continue, Failure → Escalate

**Agents MUST NOT:**
- Pause to ask for confirmation before recovering
- Defer recovery attempts
- Escalate before attempting recovery (unless unrecoverable)

```typescript
// Recovery Engine CS6 Integration
async function attemptRecovery(failure: Failure): Promise<RecoveryResult> {
  // Assess recoverability
  const recoverable = isRecoverable(failure);
  
  if (!recoverable) {
    // Cannot recover → Escalate immediately
    return { action: 'ESCALATE', reason: 'UNRECOVERABLE' };
  }
  
  // Attempt recovery automatically (no approval requested)
  const result = await executeRecovery(failure);
  
  if (result.success) {
    // Recovery succeeded → Continue execution
    return { action: 'CONTINUE', reason: 'RECOVERED' };
  }
  
  // Recovery failed → Escalate
  return { action: 'ESCALATE', reason: 'RECOVERY_FAILED' };
}
```

---

## Compliance

### How to Verify CS6 Compliance

```bash
# Check execution boundaries
npm run test tests/governance/opojd/

# Verify state machine behavior
npm run test tests/governance/opojd/state-machine.test.ts

# Check wave execution continuity
npm run test tests/governance/opojd/wave-execution.test.ts

# Verify recovery engine behavior
npm run test tests/governance/opojd/recovery-engine.test.ts
```

### CS6 Compliance Evidence

**Required evidence:**
1. State transitions follow OPOJD rules
2. `WAITING_FOR_APPROVAL` only for CS2
3. Automatic boundary checks at each transition
4. Execution continuity ≥ 95%
5. No unauthorized operations attempted
6. Recovery attempts before escalation

---

## Integration with Other Constitutional Safeguards

### CS1 Integration
- CS6 enforces boundaries
- CS1 enforces constitutional integrity
- Both halt execution on violation

### CS2 Integration
- CS2 defines protected file boundary
- CS6 enforces that boundary
- CS2 approval allows crossing boundary temporarily

### CS5 Integration
- CS5 enforces performance standards
- CS6 enforces execution boundaries
- Together: Fast execution within safe boundaries

---

## Summary

CS6 ensures:
- ✅ Clear execution boundaries for all agents
- ✅ Autonomous execution within boundaries
- ✅ OPOJD continuous execution mandate enforced
- ✅ Assume-Continue Principle applied
- ✅ Automatic boundary checks at transitions
- ✅ WAITING_FOR_APPROVAL only for CS2
- ✅ Wave execution continuity maintained
- ✅ Recovery attempts automatic before escalation

**CS6 is the execution guardian. Clear boundaries. Continuous execution. Safe autonomy.**

---

## Version and Authority

**Version**: 2.0 (OPOJD Integration)  
**Last Updated**: 2025-12-12  
**Authority**: Maturion Engineering Leadership (Johan)  
**Status**: Active and Enforced  
**Integration**: Part of Constitutional Framework (CS1-CS6)

---

## Related Documents

- `/BUILD_PHILOSOPHY.md` - Supreme authority for building
- `/foreman/constitution/CS2_ARCHITECTURE_APPROVAL_WORKFLOW.md` - Protected file approval
- `/foreman/constitution/CS5_PERFORMANCE_ENFORCEMENT.md` - Performance standards
- `/maturion/philosophy/maturion-governance-constitution.md` - OPOJD definition
- `.github/foreman/agent-contract.md` - Foreman's constitutional contract
- `/foreman/qa/quality-integrity-contract.md` - Quality standards (QIC)

