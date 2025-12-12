# CS5: Performance Enforcement

## Overview

**CS5 (Performance Enforcement)** defines performance standards and anti-pattern enforcement for all agents and systems in the Maturion Engineering Ecosystem.

This constitutional document ensures:
- No lazy code patterns
- No execution deferrals without constitutional reason
- Continuous execution under OPOJD
- Performance violations are detected and prevented
- Autonomous agents operate at peak efficiency

---

## Core Principles

### Performance as Constitutional Requirement

Performance is not optional; it is a constitutional mandate:

1. **Code must be efficient by design**
2. **Lazy patterns are governance violations**
3. **Execution deferrals are blocked (except for CS1-CS6)**
4. **Agents must execute continuously without unnecessary pauses**
5. **Performance degradation is treated as a governance breach**

---

## Anti-Interruption Rule (OPOJD Enforcement)

Under the **One-Prompt One-Job Doctrine (OPOJD)**, any agent pausing, deferring execution, or requesting permission mid-task—without a valid CS1-CS6 trigger—constitutes a **CS5 performance violation**.

### Continuous Execution Mandate

**Agents MUST:**
- Execute the entire assigned task in one continuous operation
- Assume permission to continue at each phase transition
- Proceed automatically when dependencies are met
- Complete full lifecycle without interruption

**Agents MUST NOT:**
- Pause execution mid-task without constitutional reason
- Request approval between lifecycle phases
- Defer work to "later" without legitimate blocker
- Ask "Should I continue?" or "May I proceed?"
- Enter idle state when work is available

### Legitimate Pause Conditions

Execution **MAY** pause only for:

1. **Constitutional Boundary Breach (CS1-CS6)**
   - CS1: Constitutional integrity violation
   - CS2: Protected file modification requiring approval
   - CS3: Critical incident requiring human review
   - CS4: Compliance violation detected
   - CS5: Performance threshold exceeded (self-referential)
   - CS6: Execution boundary violation

2. **Irrecoverable Failure**
   - 3+ consecutive QA failures
   - Architecture mismatch (cannot proceed without redesign)
   - Critical system error (database unavailable, etc.)

3. **Dependency Blocker**
   - Required dependency failed
   - Required resource unavailable (network, database, external API)
   - Upstream task failed in wave execution

### Illegitimate Pauses (CS5 Violations)

**Examples of CS5 violations:**

❌ **Mid-Execution Approval Requests**
```
"Architecture complete. Should I create Red QA?"  → VIOLATION
"Red QA is ready. May I proceed to Build to Green?" → VIOLATION
"Build successful. Should I create the PR?" → VIOLATION
"All tests passing. Awaiting approval to merge." → VIOLATION
```

❌ **Unnecessary Waiting States**
```
State: WAITING_FOR_CONFIRMATION (without CS2 trigger) → VIOLATION
State: AWAITING_HUMAN_REVIEW (without escalation reason) → VIOLATION
State: PAUSED_FOR_DECISION (without governance blocker) → VIOLATION
```

❌ **Execution Deferrals**
```
"I'll implement this later" → VIOLATION
"Waiting for better time to proceed" → VIOLATION
"Pausing until next execution cycle" → VIOLATION
```

✅ **Legitimate Pauses**
```
State: WAITING_FOR_APPROVAL (CS2 triggered: protected file) → ALLOWED
State: ESCALATED (3 QA failures, unrecoverable) → ALLOWED
State: BLOCKED (dependency failed, cannot proceed) → ALLOWED
```

---

## Performance Standards

### Execution Continuity Metric

**Definition**: Percentage of execution time spent actively working vs. waiting/paused.

**Formula**:
```
Execution Continuity = (Active Time / Total Execution Time) × 100
```

**Requirements**:
- **Autonomous agents**: ≥ 95% continuity required
- **Builder agents**: ≥ 90% continuity required
- **Wave execution**: ≥ 95% continuity required

**Measurement**:
- Tracked automatically per task/wave/session
- Logged to evidence trail
- Violations reported to Owner

### Response Time Standards

**Agent Response Time** (from prompt to first action):
- **Foreman**: ≤ 5 seconds
- **Builders**: ≤ 10 seconds
- **Recovery Engine**: ≤ 3 seconds (critical)

**Task Initiation Time** (from dependency resolution to task start):
- **Wave tasks**: ≤ 1 second (immediate)
- **Build tasks**: ≤ 5 seconds
- **QA validation**: ≤ 10 seconds

**Violation threshold**: 2× standard = performance violation

### Lazy Code Patterns (Prohibited)

**CS5 prohibits the following patterns:**

❌ **Deferred Work Without Reason**
```typescript
// VIOLATION: Work deferred without legitimate blocker
async function processTask(task: Task) {
  if (task.priority === 'low') {
    await queueForLater(task); // ❌ CS5 violation
    return;
  }
  // Process task...
}
```

✅ **Immediate Execution**
```typescript
// CORRECT: Process all tasks immediately
async function processTask(task: Task) {
  await executeTask(task); // ✅ No deferral
}
```

❌ **Unnecessary Polling**
```typescript
// VIOLATION: Polling instead of event-driven
async function waitForCompletion() {
  while (true) {
    if (isComplete()) break;
    await sleep(1000); // ❌ CS5 violation: lazy waiting
  }
}
```

✅ **Event-Driven Completion**
```typescript
// CORRECT: Event-driven, no polling
async function waitForCompletion() {
  await completionEvent.wait(); // ✅ Efficient
}
```

❌ **Manual Approval Loops**
```typescript
// VIOLATION: Unnecessary approval in code
async function executePhase(phase: Phase) {
  console.log(`Phase ${phase} complete. Awaiting approval...`);
  await waitForApproval(); // ❌ CS5 violation (unless CS2)
  await nextPhase();
}
```

✅ **Automatic Progression**
```typescript
// CORRECT: Automatic phase progression
async function executePhase(phase: Phase) {
  await completePhase(phase);
  await nextPhase(); // ✅ Automatic, no approval
}
```

---

## OPOJD Integration

### Execution Continuity Requirements

**Per OPOJD, agents must:**

1. **Complete Entire Lifecycle in One Run**
   ```
   ARCHITECTURE → RED QA → BUILD-TO-GREEN → VALIDATION → MERGE → EVIDENCE → NOTIFY
   ```
   - No pauses between phases (unless CS1-CS6)
   - Each phase transitions immediately when complete
   - Evidence trail shows continuous execution

2. **Assume-Continue by Default**
   - Default state: PERMISSION_GRANTED
   - Check governance conditions at each transition
   - If no violations → Continue immediately
   - If violation → Pause and escalate

3. **Notify Only at Completion or Escalation**
   - Mid-execution: No notifications
   - Completion: Notify Owner with summary
   - Escalation: Notify Owner with error details

### Performance Monitoring

**CS5 tracks:**
- Execution continuity per task/wave
- Pause count and reasons
- Approval request count (should be 0 or 1 for CS2)
- Timeline integrity (are phases sequential and immediate?)
- Notification count (should be 1 at completion, or 1 at escalation)

**Violation Detection:**
```typescript
// CS5 Performance Monitor
interface ExecutionMetrics {
  taskId: string;
  startTime: number;
  endTime: number;
  activeTime: number;
  waitingTime: number;
  pauseCount: number;
  legitimatePauses: number; // CS2, CS6, dependency failures
  approvalRequests: number;
  executionContinuity: number; // percentage
}

function detectCS5Violation(metrics: ExecutionMetrics): boolean {
  // Violation if continuity < 95%
  if (metrics.executionContinuity < 0.95) return true;
  
  // Violation if unnecessary pauses
  if (metrics.pauseCount > metrics.legitimatePauses) return true;
  
  // Violation if approval requests without CS2
  if (metrics.approvalRequests > 0 && !cs2WasTriggered(metrics.taskId)) {
    return true;
  }
  
  return false;
}
```

---

## Performance Violation Consequences

### Detection

**Performance violations are detected by:**
1. **Execution Timeline Analysis** - Unnecessary pauses detected
2. **State Transition Monitoring** - Illegitimate state changes flagged
3. **Approval Request Tracking** - Approval requests without CS2 trigger
4. **Continuity Metrics** - Execution continuity below threshold

### Response

**Immediate Actions:**
1. Log CS5 violation with details
2. Notify Owner of violation
3. Block PR merge if violation occurred during task
4. Require explanation and remediation

**Escalation:**
If CS5 violations are repeated (3+ violations in 7 days):
1. Agent enters PERFORMANCE_REVIEW state
2. All tasks paused pending review
3. Owner must review and approve continued operation
4. Agent behavior may be updated to prevent recurrence

### Remediation

**To resolve CS5 violation:**
1. Identify root cause of pause/deferral
2. Determine if legitimate blocker exists
3. If no blocker: Update agent to continue automatically
4. If blocker exists: Update governance to recognize blocker
5. Rerun task with correct behavior
6. Verify execution continuity ≥ 95%

---

## Integration with Other Constitutional Safeguards

### CS2 Integration
- CS2 approval pauses are **LEGITIMATE** and **NOT** CS5 violations
- After CS2 approval, CS5 continuous execution resumes
- CS2 is the ONLY human approval pause allowed in normal flow

### CS6 Integration
- CS6 defines execution boundaries
- CS5 enforces performance within those boundaries
- Together: CS6 defines WHAT can execute, CS5 defines HOW it executes

### QIC Integration
- QIC requires 100% QA passing
- CS5 requires efficient execution
- Together: Quality at speed, no compromise

---

## Compliance

### How to Verify CS5 Compliance

```bash
# Run performance scan
npm run perf:scan

# Run strict performance enforcement
npm run perf:enforce

# Check CS5-specific tests
npm run test tests/qic/performance-integrity.test.ts

# View execution timeline for task
npm run timeline:view -- --task <task-id>
```

### CS5 Compliance Evidence

**Required evidence for CS5 compliance:**
1. Execution continuity ≥ 95%
2. Pause count = Legitimate pause count
3. Approval requests ≤ 1 (only for CS2 if triggered)
4. No lazy code patterns detected
5. Timeline shows immediate phase transitions

**Evidence location:**
- `runtime/evidence/execution-metrics/`
- `runtime/evidence/performance-scans/`
- PR metadata (execution continuity in PR description)

---

## Performance Optimization Guidance

### Best Practices

✅ **DO:**
- Execute immediately when work is available
- Use event-driven patterns for waiting
- Progress automatically between phases
- Check governance conditions automatically
- Escalate immediately when blocked

❌ **DON'T:**
- Poll for status updates
- Add artificial delays
- Request approval without CS2 trigger
- Defer work without blocker
- Enter idle state with pending work

### Code Review Checklist

**When reviewing code for CS5 compliance:**
- [ ] No unnecessary `await sleep()` calls
- [ ] No manual approval loops (except CS2)
- [ ] No work deferrals without legitimate blocker
- [ ] Event-driven, not polling-based
- [ ] Immediate execution when dependencies met
- [ ] No artificial pauses or delays
- [ ] Performance metrics tracked

---

## Summary

CS5 ensures agents:
- ✅ Execute continuously without unnecessary pauses
- ✅ Comply with OPOJD behavioral requirements
- ✅ Maintain ≥ 95% execution continuity
- ✅ Progress automatically between phases
- ✅ Only pause for CS1-CS6 or irrecoverable failures
- ✅ Detect and prevent lazy code patterns
- ✅ Maintain performance evidence trail

**CS5 is the performance guardian. No compromises. No lazy code. No deferrals.**

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
- `/foreman/constitution/CS2_ARCHITECTURE_APPROVAL_WORKFLOW.md` - Architecture approval (legitimate pause)
- `/foreman/constitution/CS6_EXECUTION_BOUNDARY.md` - Execution boundaries
- `/maturion/philosophy/maturion-governance-constitution.md` - OPOJD definition
- `.github/foreman/agent-contract.md` - Foreman's constitutional contract
- `/foreman/qa/quality-integrity-contract.md` - Quality standards (QIC)

