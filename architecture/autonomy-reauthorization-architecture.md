# Post-Program Autonomy Re-Authorization Architecture

**Status:** ACTIVE  
**Version:** 1.0  
**Last Updated:** 2025-12-14  
**Constitutional Authority:** CS6 (Execution Boundary)

---

## Purpose

This architecture implements the **Post-Program Autonomy Re-Authorization** gate, a constitutional requirement that ensures autonomy is never implicitly restored after a halt-inducing program (e.g., Test Debt Elimination, Infra Remediation).

**Core Principle:** Autonomy is NEVER implicitly restored. It must always be **explicitly re-authorized by the Owner**.

---

## Architecture Components

### 1. Autonomy State Model

**Location:** `lib/foreman/autonomy/state-model.ts`

**Execution Modes:**
```typescript
export type ExecutionMode = 
  | 'FORWARD_EXECUTION'    // Normal autonomous operation
  | 'CORRECTION_MODE';     // Remediation/halt mode

export type AutonomyAuthorizationStatus =
  | 'AUTHORIZED'           // Owner approved forward execution
  | 'AWAITING_AUTHORIZATION' // Waiting for Owner decision
  | 'DENIED';              // Owner denied forward execution

export interface AutonomyState {
  executionMode: ExecutionMode;
  authorizationStatus: AutonomyAuthorizationStatus;
  lastTransition: Date;
  lastTransitionReason: string;
  transitionHistory: StateTransition[];
  ownerApproval?: OwnerApproval;
}

export interface StateTransition {
  id: string;
  timestamp: Date;
  fromMode: ExecutionMode;
  toMode: ExecutionMode;
  reason: string;
  triggeredBy: 'SYSTEM' | 'OWNER' | 'PROGRAM';
  programId?: string; // e.g., 'test-debt-elimination'
}

export interface OwnerApproval {
  decision: 'APPROVE' | 'DENY';
  timestamp: Date;
  ownerId: string;
  reason?: string;
  systemState: SystemStateSnapshot;
}

export interface SystemStateSnapshot {
  timestamp: Date;
  testsPassing: boolean;
  zeroTestDebt: boolean;
  ciStable: boolean;
  incidentsResolved: boolean;
  buildGreen: boolean;
  lintClean: boolean;
}
```

**Required Functions:**
- `getCurrentState()`: Returns current autonomy state
- `transitionToCorrectionMode(reason, programId?)`: Halt forward execution
- `requestReauthorization()`: Request Owner approval to restore forward execution
- `recordOwnerDecision(decision, ownerId, reason?)`: Record Owner approval/denial
- `transitionToForwardExecution()`: Restore forward execution (after approval)
- `isExecutionBlocked()`: Check if execution is currently blocked
- `getTransitionHistory()`: Return full state transition log

---

### 2. System State Validator

**Location:** `lib/foreman/autonomy/system-validator.ts`

**Purpose:** Validates system cleanliness before re-authorization

**Required Checks:**
```typescript
export interface SystemValidationResult {
  isClean: boolean;
  checks: {
    testsPassing: ValidationCheck;
    zeroTestDebt: ValidationCheck;
    ciStable: ValidationCheck;
    incidentsResolved: ValidationCheck;
    buildGreen: ValidationCheck;
    lintClean: ValidationCheck;
    programComplete: ValidationCheck;
  };
  violations: string[];
  timestamp: Date;
}

export interface ValidationCheck {
  passed: boolean;
  message: string;
  details?: any;
}
```

**Required Functions:**
- `validateSystemState()`: Run all validation checks
- `checkTestStatus()`: Verify 100% tests passing
- `checkTestDebt()`: Verify zero test debt
- `checkCIStability()`: Verify CI passing
- `checkIncidentStatus()`: Verify all incidents resolved
- `checkBuildStatus()`: Verify build green
- `checkLintStatus()`: Verify lint clean
- `checkProgramCompletion(programId)`: Verify triggering program complete

**Validation Rules:**
- ALL checks must pass for system to be considered clean
- ANY violation blocks re-authorization request
- Validation must be re-run if state changes before Owner decision

---

### 3. Re-Authorization Engine

**Location:** `lib/foreman/autonomy/reauthorization-engine.ts`

**Purpose:** Orchestrates the re-authorization workflow

**Required Functions:**

**`requestReauthorization(programId: string)`**
- Validates system state
- If not clean: Returns validation failures (blocks request)
- If clean: Transitions to AWAITING_AUTHORIZATION
- Notifies Owner with state snapshot
- Returns re-authorization request ID

**`processOwnerDecision(requestId, decision, ownerId, reason?)`**
- Validates request is in AWAITING_AUTHORIZATION state
- Records Owner decision
- If APPROVE: Transitions to FORWARD_EXECUTION
- If DENY: Remains in CORRECTION_MODE
- Logs decision to governance memory
- Returns updated autonomy state

**`getReauthorizationStatus(requestId?)`**
- Returns current re-authorization status
- If requestId provided: Returns specific request details
- If not: Returns current system autonomy state

**`cancelReauthorizationRequest(requestId, reason)`**
- Cancels pending request (e.g., if system state changes)
- Remains in CORRECTION_MODE
- Logs cancellation reason

---

### 4. State Persistence

**Location:** `lib/foreman/autonomy/state-persistence.ts`

**Storage Location:** `memory/governance/autonomy/state.json`

**Required Functions:**
- `saveState(state: AutonomyState)`: Persist state to disk
- `loadState()`: Load current state from disk
- `saveTransition(transition: StateTransition)`: Append to transition log
- `loadTransitionHistory()`: Load full transition history
- `saveReauthorizationRequest(request)`: Persist re-auth request
- `loadReauthorizationRequests()`: Load pending requests

**Storage Schema:**
```json
{
  "currentState": {
    "executionMode": "CORRECTION_MODE",
    "authorizationStatus": "AWAITING_AUTHORIZATION",
    "lastTransition": "2025-12-14T08:00:00Z",
    "lastTransitionReason": "Test Debt Elimination Program completed"
  },
  "transitionHistory": [...],
  "reauthorizationRequests": [...]
}
```

---

### 5. Owner Notification System

**Location:** `lib/foreman/autonomy/owner-notification.ts`

**Purpose:** Notify Owner when approval is required

**Required Functions:**
- `notifyReauthorizationRequired(requestId, systemState)`: Send notification
- `notifyDecisionProcessed(requestId, decision)`: Confirm decision recorded
- `notifyExecutionBlocked(reason)`: Alert that execution is blocked

**Notification Channels:**
- Console output (development)
- GitHub issue comment (production)
- API status endpoint (monitoring)

---

### 6. API Endpoints

**Location:** `app/api/autonomy/`

**Required Endpoints:**

**POST `/api/autonomy/request-reauthorization`**
- Request Owner approval to restore forward execution
- Body: `{ programId: string }`
- Returns: `{ requestId: string, systemState: SystemStateSnapshot }`
- Status: 200 (request created), 400 (validation failed), 403 (already authorized)

**POST `/api/autonomy/approve`**
- Owner approves forward execution restoration
- Body: `{ requestId: string, ownerId: string, reason?: string }`
- Returns: `{ state: AutonomyState }`
- Status: 200 (approved), 400 (invalid request), 403 (unauthorized)

**POST `/api/autonomy/deny`**
- Owner denies forward execution restoration
- Body: `{ requestId: string, ownerId: string, reason: string }`
- Returns: `{ state: AutonomyState }`
- Status: 200 (denied), 400 (invalid request), 403 (unauthorized)

**GET `/api/autonomy/status`**
- Get current autonomy state
- Returns: `{ state: AutonomyState, blocked: boolean }`
- Status: 200

**GET `/api/autonomy/validation`**
- Get current system validation state
- Returns: `{ validation: SystemValidationResult }`
- Status: 200

---

### 7. Execution Guard

**Location:** `lib/foreman/autonomy/execution-guard.ts`

**Purpose:** Enforce execution blocking when in CORRECTION_MODE

**Required Functions:**
- `checkExecutionAllowed()`: Returns boolean if execution can proceed
- `blockExecution(reason)`: Block execution with reason
- `unblockExecution()`: Unblock execution (after approval)

**Integration Points:**
- Chat executor: Check before processing commands
- Build sequence: Check before starting builds
- Wave execution: Check before starting waves
- Task scheduler: Check before executing tasks

---

## Workflow

### Entering Correction Mode

1. Program (e.g., Test Debt Elimination) completes
2. System calls `transitionToCorrectionMode(reason, programId)`
3. State transitions from FORWARD_EXECUTION → CORRECTION_MODE
4. Authorization status set to AWAITING_AUTHORIZATION
5. Execution blocked for all forward operations
6. Transition logged to governance memory

### Re-Authorization Request

1. Foreman calls `requestReauthorization(programId)`
2. System validator runs all checks
3. If validation fails: Return errors, remain blocked
4. If validation passes:
   - Create re-authorization request
   - Capture system state snapshot
   - Transition to AWAITING_AUTHORIZATION
   - Notify Owner with request details

### Owner Decision

1. Owner reviews system state snapshot
2. Owner makes explicit decision (APPROVE/DENY)
3. Decision sent to `/api/autonomy/approve` or `/api/autonomy/deny`
4. System records decision with timestamp and reason
5. If APPROVE:
   - Transition to FORWARD_EXECUTION
   - Authorization status: AUTHORIZED
   - Unblock execution
6. If DENY:
   - Remain in CORRECTION_MODE
   - Record denial reason
   - Execution remains blocked

### Resuming Forward Execution

1. After approval recorded
2. `transitionToForwardExecution()` called
3. State transitions CORRECTION_MODE → FORWARD_EXECUTION
4. Execution guard unblocked
5. System resumes normal autonomous operation
6. Transition logged to governance memory

---

## Governance Integration

### CS6 Enforcement

This architecture enforces CS6 (Execution Boundary) by:
- Defining clear execution modes (CORRECTION vs FORWARD)
- Requiring explicit Owner approval to cross boundary
- Blocking execution when in CORRECTION_MODE
- Maintaining complete audit trail of all state transitions

### Zero Test Debt Integration

Before re-authorization can be granted:
- System MUST validate zero test debt
- ALL tests MUST be passing
- Build MUST be 100% green
- This enforces constitutional Zero Test Debt requirement

### Memory & Evidence

All state transitions recorded in:
- `memory/governance/autonomy/state.json` (current state)
- `memory/governance/autonomy/transitions/*.json` (transition log)
- `memory/governance/autonomy/reauthorization-requests/*.json` (requests)

---

## Safety & Correctness

### Idempotency
- All state operations are idempotent
- Multiple approval requests return same result
- State transitions are atomic

### Validation
- System state validated before any transition
- Owner decision validated before recording
- All inputs validated before processing

### Error Handling
- Invalid transitions throw clear errors
- Failed validations return detailed failures
- System remains in safe state on any error

### Audit Trail
- Every state transition logged
- Every Owner decision recorded
- Complete history maintained for governance review

---

## Testing Requirements

### Unit Tests
- State model transitions
- Validation logic
- Persistence operations
- API endpoint handlers

### Integration Tests
- Full re-authorization workflow
- State persistence and recovery
- Execution blocking enforcement
- Owner decision processing

### Governance Tests
- CS6 compliance verification
- Zero test debt enforcement
- Audit trail completeness
- State transition validity

---

## Success Criteria

This architecture is successful if:

1. ✅ Autonomy is never implicitly restored
2. ✅ Owner must explicitly approve forward execution
3. ✅ System validates 100% clean state before allowing approval
4. ✅ All state transitions are logged and auditable
5. ✅ Execution is blocked in CORRECTION_MODE
6. ✅ Forward execution resumes only after approval
7. ✅ Complete audit trail maintained for governance
8. ✅ Integration with existing autonomy runtime works correctly

---

## Migration & Integration

### Existing Autonomy Runtime
- Integrate with `lib/runtime/autonomy/autonomy-runtime.ts`
- Extend AutonomyState to include execution mode
- Add execution guard checks to state machine

### Existing State Management
- Integrate with `lib/runtime-readiness/state-manager.ts`
- Use existing state persistence patterns
- Extend with autonomy-specific state

### Existing Governance
- Record events to governance memory
- Integrate with incident workflow (CS3)
- Enforce Zero Test Debt constitutional rule

---

## Acceptance Criteria

- [x] Architecture complete and validated
- [ ] State model implemented
- [ ] System validator implemented
- [ ] Re-authorization engine implemented
- [ ] State persistence implemented
- [ ] API endpoints implemented
- [ ] Execution guard implemented
- [ ] Tests passing (Red → Green)
- [ ] Integration with existing autonomy runtime
- [ ] Documentation complete
- [ ] Evidence trail recorded
