# Post-Program Autonomy Re-Authorization - Usage Guide

**Version:** 1.0  
**Status:** ACTIVE  
**Last Updated:** 2025-12-14

---

## Overview

The Post-Program Autonomy Re-Authorization system implements a mandatory governance gate that prevents forward execution from resuming after halt-inducing programs (e.g., Test Debt Elimination, Infrastructure Remediation) without explicit Owner approval.

**Core Principle:** Autonomy is NEVER implicitly restored. It must always be **explicitly re-authorized by the Owner**.

---

## When This System Activates

The system transitions to CORRECTION_MODE when:
- Test Debt Elimination Program completes
- Infrastructure Remediation Program completes
- Constitutional Fix Program completes
- Any other halt-inducing governance program completes

Once in CORRECTION_MODE, **all forward autonomous execution is blocked** until Owner approval is granted.

---

## Workflow

### 1. Program Completion → CORRECTION_MODE

When a halt-inducing program completes:

```typescript
import { stateModel } from '@/lib/foreman/autonomy/state-model';

// Program completes, transition to CORRECTION_MODE
stateModel.transitionToCorrectionMode(
  'Test Debt Elimination Program completed',
  'test-debt-elimination'
);
```

**Result:**
- Execution mode: `CORRECTION_MODE`
- Authorization status: `AWAITING_AUTHORIZATION`
- All forward execution blocked
- System awaits reauthorization request

---

### 2. Request Reauthorization

Foreman (or system) requests Owner approval to restore forward execution:

**API Call:**
```bash
POST /api/autonomy/request-reauthorization
Content-Type: application/json

{
  "programId": "test-debt-elimination"
}
```

**Programmatic:**
```typescript
import { reauthorizationEngine } from '@/lib/foreman/autonomy/reauthorization-engine';

const result = await reauthorizationEngine.requestReauthorization('test-debt-elimination');

if (result.error) {
  console.log('System validation failed:');
  console.log(result.validationFailures);
  // Fix violations before retrying
} else {
  console.log('Reauthorization requested:', result.requestId);
  console.log('System state snapshot:', result.systemState);
}
```

**What Happens:**
1. System validates state (tests passing, zero debt, CI stable, incidents resolved, build green, lint clean)
2. If validation fails: Request blocked, violations returned
3. If validation passes: Request created, awaiting Owner decision

---

### 3. System Validation

Before reauthorization can be granted, the system validates:

✅ **All tests passing** - No test failures  
✅ **Zero test debt** - No skipped, incomplete, or stub tests  
✅ **CI stable** - No CI failures  
✅ **Incidents resolved** - All incidents closed  
✅ **Build green** - No build errors  
✅ **Lint clean** - No lint errors or warnings  
✅ **Program complete** - Triggering program finished

**Check Validation Status:**
```bash
GET /api/autonomy/validation
```

**Response:**
```json
{
  "validation": {
    "isClean": true,
    "checks": {
      "testsPassing": { "passed": true, "message": "All tests passing" },
      "zeroTestDebt": { "passed": true, "message": "Zero test debt confirmed" },
      "ciStable": { "passed": true, "message": "CI is stable" },
      "incidentsResolved": { "passed": true, "message": "All incidents resolved" },
      "buildGreen": { "passed": true, "message": "Build is green" },
      "lintClean": { "passed": true, "message": "Lint is clean" },
      "programComplete": { "passed": true, "message": "Program complete" }
    },
    "violations": [],
    "timestamp": "2025-12-14T10:30:00Z"
  }
}
```

---

### 4. Owner Decision

The Owner (Johan) reviews the system state and makes an explicit decision.

#### Option A: Approve

**API Call:**
```bash
POST /api/autonomy/approve
Content-Type: application/json

{
  "requestId": "reauth_1702548000_abc123",
  "ownerId": "johan",
  "reason": "System validated as 100% clean. Forward execution approved."
}
```

**Programmatic:**
```typescript
await reauthorizationEngine.processOwnerDecision(
  requestId,
  'APPROVE',
  'johan',
  'System validated as 100% clean'
);
```

**Result:**
- Execution mode: `FORWARD_EXECUTION`
- Authorization status: `AUTHORIZED`
- Forward execution unblocked
- System resumes normal autonomous operation

#### Option B: Deny

**API Call:**
```bash
POST /api/autonomy/deny
Content-Type: application/json

{
  "requestId": "reauth_1702548000_abc123",
  "ownerId": "johan",
  "reason": "Need additional verification of incident resolution."
}
```

**Programmatic:**
```typescript
await reauthorizationEngine.processOwnerDecision(
  requestId,
  'DENY',
  'johan',
  'Need additional verification'
);
```

**Result:**
- Execution mode: `CORRECTION_MODE`
- Authorization status: `DENIED`
- Execution remains blocked
- System waits for issues to be resolved and new request

---

### 5. Check Current Status

**API Call:**
```bash
GET /api/autonomy/status
```

**Response:**
```json
{
  "state": {
    "executionMode": "FORWARD_EXECUTION",
    "authorizationStatus": "AUTHORIZED",
    "lastTransition": "2025-12-14T10:35:00Z",
    "lastTransitionReason": "Owner approved reauthorization",
    "transitionHistory": [...]
  },
  "blocked": false,
  "executionAllowed": true
}
```

**Programmatic:**
```typescript
import { stateModel } from '@/lib/foreman/autonomy/state-model';
import { executionGuard } from '@/lib/foreman/autonomy/execution-guard';

const state = stateModel.getCurrentState();
const blocked = executionGuard.getBlockStatus();

console.log('Execution mode:', state.executionMode);
console.log('Authorization:', state.authorizationStatus);
console.log('Execution allowed:', !blocked.blocked);
```

---

## Execution Guard Integration

The execution guard automatically enforces blocking in CORRECTION_MODE.

### Check Before Execution

```typescript
import { executionGuard } from '@/lib/foreman/autonomy/execution-guard';

// Check if execution is allowed
if (!executionGuard.checkExecutionAllowed()) {
  const status = executionGuard.getBlockStatus();
  console.log('Execution blocked:', status.reason);
  return;
}

// Proceed with execution
executeTask();
```

### Assert Execution Allowed

```typescript
// Throws error if execution is blocked
executionGuard.assertExecutionAllowed('Build Sequence Wave 5');
```

### Integration Points

The execution guard is automatically checked at:
- Chat command execution
- Build sequence execution
- Wave execution
- Task scheduler execution

---

## Example: Complete Workflow

```typescript
// 1. Program completes, transition to CORRECTION_MODE
stateModel.transitionToCorrectionMode(
  'Test Debt Elimination completed',
  'test-debt-elimination'
);

// 2. Request reauthorization
const request = await reauthorizationEngine.requestReauthorization('test-debt-elimination');

if (request.error) {
  console.log('Validation failed. Fix these issues:');
  request.validationFailures.forEach(v => console.log('  -', v));
  // Fix issues and retry
  return;
}

console.log('Reauthorization requested:', request.requestId);
console.log('System state:', request.systemState);

// 3. Owner reviews and approves
await reauthorizationEngine.processOwnerDecision(
  request.requestId,
  'APPROVE',
  'johan',
  'System is 100% clean. Approved.'
);

// 4. Verify execution is unblocked
const state = stateModel.getCurrentState();
console.log('Execution mode:', state.executionMode); // FORWARD_EXECUTION
console.log('Authorized:', state.authorizationStatus); // AUTHORIZED

// 5. Resume forward execution
const allowed = executionGuard.checkExecutionAllowed();
console.log('Execution allowed:', allowed); // true
```

---

## State Persistence

All autonomy state is persisted to disk for recovery:

**Location:** `memory/governance/autonomy/`
- `state.json` - Current autonomy state
- `transitions/*.json` - Full transition history
- `reauthorization-requests/*.json` - All reauthorization requests

**Recovery:**
```typescript
import { stateModel } from '@/lib/foreman/autonomy/state-model';

// Load persisted state on startup
await stateModel.loadState();

const state = stateModel.getCurrentState();
console.log('Recovered state:', state.executionMode);
```

---

## Governance Compliance

### CS6 (Execution Boundary)

This system enforces CS6 by:
- Defining clear execution modes (CORRECTION vs FORWARD)
- Requiring explicit Owner approval to cross boundary
- Blocking execution when in CORRECTION_MODE
- Maintaining complete audit trail

### Zero Test Debt

Before reauthorization:
- System validates zero test debt
- All tests must be passing
- Build must be 100% green
- Enforces constitutional Zero Test Debt requirement

### Audit Trail

Every state transition is logged:
- Transition ID, timestamp, reason
- From/To execution modes
- Triggered by (SYSTEM, OWNER, PROGRAM)
- Owner approval details
- System state snapshot

---

## Troubleshooting

### Reauthorization Request Blocked

**Issue:** Request fails with validation errors

**Solution:**
1. Check validation status: `GET /api/autonomy/validation`
2. Fix each violation listed
3. Re-run validation to confirm fixes
4. Retry reauthorization request

### Execution Still Blocked After Approval

**Issue:** Execution blocked despite APPROVE decision

**Solution:**
1. Check current state: `GET /api/autonomy/status`
2. Verify `executionMode` is `FORWARD_EXECUTION`
3. Verify `authorizationStatus` is `AUTHORIZED`
4. If not, check transition history for errors
5. May need to manually transition or reset state

### State Desynchronization

**Issue:** State persisted on disk doesn't match runtime state

**Solution:**
```typescript
// Reload state from disk
await stateModel.loadState();

// Or reset to default (development only)
stateModel.resetState();
```

---

## API Reference

### POST /api/autonomy/request-reauthorization
Request Owner approval to restore forward execution.

**Request:**
```json
{ "programId": "string" }
```

**Response (Success):**
```json
{
  "requestId": "string",
  "systemState": { ... },
  "validationResult": { ... },
  "message": "Reauthorization request created."
}
```

**Response (Failure):**
```json
{
  "error": "System validation failed",
  "validationFailures": ["string"],
  "validationResult": { ... }
}
```

### POST /api/autonomy/approve
Owner approves forward execution restoration.

**Request:**
```json
{
  "requestId": "string",
  "ownerId": "string",
  "reason": "string (optional)"
}
```

**Response:**
```json
{
  "state": { ... },
  "decision": "APPROVE",
  "timestamp": "ISO-8601",
  "message": "Forward execution restored."
}
```

### POST /api/autonomy/deny
Owner denies forward execution restoration.

**Request:**
```json
{
  "requestId": "string",
  "ownerId": "string",
  "reason": "string (required)"
}
```

**Response:**
```json
{
  "state": { ... },
  "decision": "DENY",
  "timestamp": "ISO-8601",
  "message": "Reauthorization denied."
}
```

### GET /api/autonomy/status
Get current autonomy state and execution status.

**Response:**
```json
{
  "state": { ... },
  "blocked": boolean,
  "blockReason": "string (optional)",
  "blockMode": "string (optional)",
  "executionAllowed": boolean
}
```

### GET /api/autonomy/validation
Get current system validation state.

**Response:**
```json
{
  "validation": { ... },
  "isClean": boolean,
  "violations": ["string"],
  "timestamp": "ISO-8601"
}
```

---

## Security Considerations

1. **Owner-Only Operations:** Only the Owner (Johan) can approve/deny reauthorization
2. **Validation Required:** System must be 100% clean before approval
3. **Audit Trail:** All state transitions logged for governance review
4. **State Integrity:** State persisted to disk for recovery
5. **Execution Blocking:** Automatic enforcement in CORRECTION_MODE

---

## Next Steps

After implementation:
1. Monitor first halt-inducing program completion
2. Test reauthorization workflow end-to-end
3. Verify execution blocking enforcement
4. Validate audit trail completeness
5. Document any issues or improvements needed

---

**For Questions or Issues:**
- Check architecture: `/architecture/autonomy-reauthorization-architecture.md`
- Check tests: `/tests/autonomy/autonomy-reauthorization.test.ts`
- Escalate to Johan if constitutional questions arise
