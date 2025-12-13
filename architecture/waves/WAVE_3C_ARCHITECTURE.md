# Wave 3C — Architecture Constraint Enforcement Hooks
## Architecture Design Document

**Version**: 1.0  
**Status**: Architecture Design  
**Owner**: Foreman  
**Date**: 2025-12-13  
**Depends On**: Wave 3B (Constraint Violation Detection & Classification)

---

## 1. Purpose

Wave 3C introduces **controlled enforcement hooks** for architecture constraints based on the detection and classification system established in Wave 3B.

This wave implements **enforcement hooks with governance awareness**, not aggressive blocking or auto-remediation. Enforcement is:
- **Controlled**: Configurable by severity and context
- **Explainable**: All actions have clear reasons
- **Governance-Aware**: Respects CS1-CS6 boundaries and protected domains
- **Safe**: Never silently blocks, always provides escape hatches

**Success Metrics**:
- Enforcement hooks active at key execution points
- All enforcement actions explainable and logged
- Governance boundaries respected (CS2 approval for protected changes)
- Safe failure modes (never silent failures)
- Zero side effects on valid operations

---

## 2. System Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│         Architecture Constraint Enforcement Hook System               │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────┐      ┌─────────────────────┐                  │
│  │   Wave 3B        │      │   Enforcement       │                  │
│  │   Detection      │─────▶│   Hook Registry     │                  │
│  │                  │      │                     │                  │
│  │  - Violations    │      │  - Pre-merge hook   │                  │
│  │  - Classification│      │  - Pre-build hook   │                  │
│  │  - Telemetry     │      │  - Runtime hook     │                  │
│  └──────────────────┘      └─────────┬───────────┘                  │
│                                       │                              │
│                                       ▼                              │
│                          ┌─────────────────────────┐                 │
│                          │  Governance-Aware       │                 │
│                          │  Enforcement Engine     │                 │
│                          │                         │                 │
│                          │  - CS1-CS6 checks       │                 │
│                          │  - Protected domain     │                 │
│                          │  - Severity filtering   │                 │
│                          │  - Escape hatches       │                 │
│                          └──────────┬──────────────┘                 │
│                                     │                                │
│                                     ▼                                │
│                        ┌─────────────────────────┐                   │
│                        │  Enforcement Action     │                   │
│                        │  Executor               │                   │
│                        │                         │                   │
│                        │  - Warning              │                   │
│                        │  - Blocking             │                   │
│                        │  - Escalation           │                   │
│                        │  - Approval required    │                   │
│                        └──────────┬──────────────┘                   │
│                                   │                                  │
│                                   ▼                                  │
│                        ┌─────────────────────────┐                   │
│                        │  Enforcement Telemetry  │                   │
│                        │  & Explainability       │                   │
│                        │                         │                   │
│                        │  - Action logging       │                   │
│                        │  - Reason generation    │                   │
│                        │  - FL/CI integration    │                   │
│                        │  - Governance memory    │                   │
│                        └─────────────────────────┘                   │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

**Data Flow**:
1. Violation Detection (Wave 3B) → Classified Violations
2. Enforcement Hook Triggered → Governance Engine → Determine Action
3. Action Executor → Execute (Warn/Block/Escalate)
4. Telemetry Engine → Log action + reason → Memory Fabric/FL/CI

---

## 3. Core Components

### 3.1 Enforcement Hook Registry

**Location**: `/lib/foreman/constraints/enforcement/hook-registry.ts`

**Purpose**: Register and manage enforcement hooks at key execution points.

**Hook Points**:

#### 3.1.1 Pre-Merge Hook
- **Trigger**: Before PR merge to protected branch
- **Action**: Run violation detection → Enforce critical violations
- **Governance**: Respect CS2 (Architecture Approval) for protected files
- **Configurable**: By severity, category, nature

**Hook Signature**:
```typescript
export interface PreMergeHook {
  name: 'pre-merge';
  enabled: boolean;
  config: {
    blockOnSeverity: ViolationSeverity[]; // ['critical', 'high']
    blockOnNature: ViolationNature[];      // ['governance']
    allowOverride: boolean;                 // Can Johan override?
    requireApproval: boolean;              // Require CS2 approval?
  };
}
```

#### 3.1.2 Pre-Build Hook
- **Trigger**: Before build execution starts
- **Action**: Run violation detection → Warn on violations
- **Governance**: Never block builds, only warn
- **Configurable**: Warning severity levels

**Hook Signature**:
```typescript
export interface PreBuildHook {
  name: 'pre-build';
  enabled: boolean;
  config: {
    warnOnSeverity: ViolationSeverity[];  // ['critical', 'high', 'medium']
    failOnSeverity: ViolationSeverity[];  // [] (empty - no blocking in Wave 3C)
    logToConsole: boolean;
    logToMemory: boolean;
  };
}
```

#### 3.1.3 Runtime Validation Hook
- **Trigger**: During runtime at key governance checkpoints
- **Action**: Validate architecture constraints still hold
- **Governance**: Monitor for drift, report but don't block
- **Configurable**: Validation frequency, scope

**Hook Signature**:
```typescript
export interface RuntimeValidationHook {
  name: 'runtime-validation';
  enabled: boolean;
  config: {
    validationInterval: number;            // Milliseconds
    scope: ConstraintScope[];              // Which scopes to validate
    reportOnly: boolean;                   // true - never block
    alertOnSeverity: ViolationSeverity[]; // ['critical']
  };
}
```

**API**:
```typescript
/**
 * Register an enforcement hook
 */
export function registerHook(hook: EnforcementHook): void

/**
 * Unregister an enforcement hook
 */
export function unregisterHook(hookName: string): void

/**
 * Get registered hook by name
 */
export function getHook(hookName: string): EnforcementHook | undefined

/**
 * List all registered hooks
 */
export function listHooks(): EnforcementHook[]

/**
 * Update hook configuration
 */
export function updateHookConfig(hookName: string, config: Partial<HookConfig>): void
```

---

### 3.2 Governance-Aware Enforcement Engine

**Location**: `/lib/foreman/constraints/enforcement/governance-engine.ts`

**Purpose**: Determine enforcement actions while respecting governance boundaries (CS1-CS6, protected domains).

**Enforcement Decision Logic**:

```typescript
/**
 * Determine enforcement action for a violation
 * 
 * Considers:
 * - Violation severity and nature
 * - Governance context (CS boundaries, protected paths)
 * - Hook configuration
 * - Override permissions
 */
export async function determineEnforcementAction(
  violation: ClassifiedViolation,
  hook: EnforcementHook,
  context: EnforcementContext
): Promise<EnforcementAction>
```

**Enforcement Action Types**:

```typescript
export type EnforcementActionType = 
  | 'allow'          // No enforcement, pass through
  | 'warn'           // Log warning, continue execution
  | 'block'          // Block operation, require fix
  | 'escalate'       // Escalate to Johan for decision
  | 'require_approval' // Trigger CS2 architecture approval

export interface EnforcementAction {
  type: EnforcementActionType;
  violation: ClassifiedViolation;
  reason: string;                  // Human-readable explanation
  governanceContext: {
    csBoundary?: string;           // Which CS (CS1-CS6) triggered
    protectedDomain?: string;      // Protected path/domain
    requiresApproval: boolean;     // CS2 approval required
    overrideAllowed: boolean;      // Can be overridden by Johan
  };
  metadata: {
    hookName: string;
    timestamp: string;
    decisionPath: string[];        // Logic path taken
  };
}
```

**Governance Decision Rules**:

1. **Protected Path Modifications** (CS2):
   - Action: `require_approval`
   - Reason: "Modification to protected file requires CS2 architecture approval"
   - Override: Johan can approve via CS2 workflow

2. **Critical Governance Violations**:
   - Action: `escalate`
   - Reason: "Critical governance boundary violation requires owner review"
   - Override: Owner decision required

3. **Critical Structural Violations**:
   - Action: `block` or `warn` (configurable)
   - Reason: "Critical structural violation detected, fix required"
   - Override: Can be suppressed with justification

4. **High/Medium Violations**:
   - Action: `warn`
   - Reason: "Violation detected, review recommended"
   - Override: Always allowed

5. **Low/Info Violations**:
   - Action: `allow`
   - Reason: "Minor violation logged for awareness"
   - Override: N/A

**Governance Boundary Checks**:

```typescript
/**
 * Check if violation crosses CS1-CS6 boundaries
 */
export function checkCSBoundaries(
  violation: ClassifiedViolation,
  context: EnforcementContext
): CSBoundaryCheck

/**
 * Check if protected domain is affected
 */
export function checkProtectedDomain(
  violation: ClassifiedViolation
): ProtectedDomainCheck

/**
 * Check if explicit approval is required
 */
export function requiresExplicitApproval(
  violation: ClassifiedViolation,
  action: EnforcementAction
): boolean
```

---

### 3.3 Enforcement Action Executor

**Location**: `/lib/foreman/constraints/enforcement/action-executor.ts`

**Purpose**: Execute enforcement actions (warn, block, escalate) safely and explainably.

**Execution Strategies**:

#### 3.3.1 Warning Execution
```typescript
/**
 * Execute warning action
 * - Log to console
 * - Log to governance memory
 * - Continue execution
 */
export async function executeWarning(
  action: EnforcementAction
): Promise<ExecutionResult>
```

**Behavior**:
- Logs warning to console with formatting
- Stores warning in governance memory
- Emits telemetry event
- **Never blocks execution**
- Returns success result

#### 3.3.2 Blocking Execution
```typescript
/**
 * Execute blocking action
 * - Log reason clearly
 * - Throw BlockingError
 * - Provide remediation steps
 * - Allow escape hatch (override)
 */
export async function executeBlocking(
  action: EnforcementAction
): Promise<ExecutionResult>
```

**Behavior**:
- Logs blocking reason to console (clear, formatted)
- Stores blocking event in governance memory
- Emits telemetry event
- **Throws BlockingError** with:
  - Clear error message
  - Remediation steps
  - Override instructions (if allowed)
- Provides escape hatch if `overrideAllowed: true`

**Escape Hatch Mechanism**:
```typescript
// Environment variable override
export const ENFORCEMENT_OVERRIDE = process.env.FOREMAN_ENFORCEMENT_OVERRIDE === 'true'

// Or explicit override in code
export function executeBlockingWithOverride(
  action: EnforcementAction,
  override: { reason: string; authorizedBy: string }
): Promise<ExecutionResult>
```

#### 3.3.3 Escalation Execution
```typescript
/**
 * Execute escalation action
 * - Log escalation request
 * - Notify owner (Johan)
 * - Wait for decision
 * - Execute decided action
 */
export async function executeEscalation(
  action: EnforcementAction
): Promise<ExecutionResult>
```

**Behavior**:
- Logs escalation request
- Sends notification to owner (console + governance memory)
- **Does not block immediately** - continues with warning
- Records escalation for future review
- Awaits owner decision (asynchronous)

#### 3.3.4 Approval Requirement Execution
```typescript
/**
 * Execute approval requirement action (CS2)
 * - Trigger CS2 architecture approval workflow
 * - Block until approval granted/denied
 * - Execute based on approval outcome
 */
export async function executeApprovalRequirement(
  action: EnforcementAction
): Promise<ExecutionResult>
```

**Behavior**:
- Triggers CS2 architecture approval workflow
- Logs approval requirement
- **Blocks operation until approval**
- If approved: continues with allow
- If denied: executes block
- Records approval flow in governance memory

**API**:
```typescript
/**
 * Execute enforcement action
 */
export async function executeEnforcementAction(
  action: EnforcementAction
): Promise<ExecutionResult>

export interface ExecutionResult {
  success: boolean;
  actionType: EnforcementActionType;
  blocked: boolean;
  escalated: boolean;
  approvalRequired: boolean;
  message: string;
  remediationSteps?: string[];
  overrideInstructions?: string;
}
```

---

### 3.4 Enforcement Telemetry & Explainability

**Location**: `/lib/foreman/constraints/enforcement/telemetry.ts`

**Purpose**: Log all enforcement actions with complete reasoning for audit and learning.

**Telemetry Operations**:

#### 3.4.1 Enforcement Event Emission
```typescript
/**
 * Emit enforcement event
 */
export async function emitEnforcementEvent(
  action: EnforcementAction,
  result: ExecutionResult
): Promise<void>
```

**Event Structure**:
```typescript
interface EnforcementEvent {
  eventId: string;
  timestamp: string;
  version: string;
  enforcement: {
    hookName: string;
    actionType: EnforcementActionType;
    violation: ClassifiedViolation;
    reason: string;
    governanceContext: {
      csBoundary?: string;
      protectedDomain?: string;
      requiresApproval: boolean;
    };
  };
  result: {
    blocked: boolean;
    escalated: boolean;
    approvalRequired: boolean;
    success: boolean;
  };
  explainability: {
    decisionPath: string[];        // Logic steps taken
    rules: string[];               // Rules that applied
    overridden: boolean;           // Was it overridden?
    overrideReason?: string;
  };
}
```

#### 3.4.2 Reason Generation
```typescript
/**
 * Generate human-readable explanation for enforcement action
 */
export function generateEnforcementReason(
  violation: ClassifiedViolation,
  action: EnforcementAction,
  context: EnforcementContext
): string
```

**Reason Template Examples**:
- **Protected Path Modification**:
  ```
  "Enforcement Action: REQUIRE_APPROVAL
  
  Reason: File 'BUILD_PHILOSOPHY.md' is a protected constitutional document.
  
  Governance Rule: CS2 Architecture Approval Workflow (Constitutional Safeguard)
  
  Required Action:
  1. Submit architecture change proposal via CS2 workflow
  2. Await Johan's approval
  3. After approval, changes can proceed
  
  Why This Matters:
  Protected files define system governance. Changes require explicit review to
  maintain constitutional integrity.
  
  Override: Not permitted (Constitutional protection)"
  ```

- **Critical Structural Violation**:
  ```
  "Enforcement Action: BLOCK
  
  Reason: Circular dependency detected between 'moduleA' and 'moduleB'.
  
  Constraint Violated: structural.no-circular-deps (severity: critical)
  
  Required Action:
  1. Identify dependency cycle: moduleA → moduleB → moduleA
  2. Refactor to remove circular dependency
  3. Run detection again to verify fix
  
  Why This Matters:
  Circular dependencies make code unmaintainable and prevent proper testing.
  
  Override: Set FOREMAN_ENFORCEMENT_OVERRIDE=true with justification"
  ```

#### 3.4.3 FL/CI Integration
```typescript
/**
 * Classify enforcement action for FL/CI learning
 */
export function classifyEnforcementForFLCI(
  action: EnforcementAction,
  result: ExecutionResult
): FLCIEnforcementClassification
```

**Learning Classification**:
```typescript
interface FLCIEnforcementClassification {
  enforcementId: string;
  flCategory: 'enforcement_success' | 'enforcement_blocked' | 'enforcement_escalated' | 'enforcement_overridden';
  ciAction: 'strengthen_rule' | 'refine_detection' | 'update_severity' | 'add_escape_hatch';
  learningSuggestion: string;
}
```

#### 3.4.4 Governance Memory Integration
```typescript
/**
 * Store enforcement action in governance memory
 */
export async function storeEnforcementInMemory(
  action: EnforcementAction,
  result: ExecutionResult
): Promise<void>

/**
 * Query enforcement actions from memory
 */
export async function queryEnforcementsFromMemory(
  filters: EnforcementQueryFilters
): Promise<EnforcementEvent[]>
```

---

## 4. Data Models

**Location**: `/types/enforcement.ts`

```typescript
/**
 * Enforcement Hook Definition
 */
export type EnforcementHookName = 'pre-merge' | 'pre-build' | 'runtime-validation';

export interface EnforcementHook {
  name: EnforcementHookName;
  enabled: boolean;
  config: HookConfig;
}

export interface HookConfig {
  // Severity-based configuration
  blockOnSeverity?: ViolationSeverity[];
  warnOnSeverity?: ViolationSeverity[];
  alertOnSeverity?: ViolationSeverity[];
  
  // Nature-based configuration
  blockOnNature?: ViolationNature[];
  warnOnNature?: ViolationNature[];
  
  // Override and approval
  allowOverride: boolean;
  requireApproval: boolean;
  
  // Reporting
  logToConsole: boolean;
  logToMemory: boolean;
  
  // Runtime-specific
  validationInterval?: number;
  reportOnly?: boolean;
}

/**
 * Enforcement Context
 */
export interface EnforcementContext {
  operation: string;               // What operation triggered enforcement
  user?: string;                   // Who initiated operation
  branch?: string;                 // Git branch
  commit?: string;                 // Git commit
  prNumber?: number;               // PR number (if pre-merge)
  buildId?: string;                // Build ID (if pre-build)
  environment: 'development' | 'staging' | 'production';
}

/**
 * Enforcement Action
 */
export type EnforcementActionType = 
  | 'allow'
  | 'warn'
  | 'block'
  | 'escalate'
  | 'require_approval';

export interface EnforcementAction {
  type: EnforcementActionType;
  violation: ClassifiedViolation;
  reason: string;
  governanceContext: {
    csBoundary?: string;
    protectedDomain?: string;
    requiresApproval: boolean;
    overrideAllowed: boolean;
  };
  metadata: {
    hookName: string;
    timestamp: string;
    decisionPath: string[];
  };
}

/**
 * Execution Result
 */
export interface ExecutionResult {
  success: boolean;
  actionType: EnforcementActionType;
  blocked: boolean;
  escalated: boolean;
  approvalRequired: boolean;
  message: string;
  remediationSteps?: string[];
  overrideInstructions?: string;
}

/**
 * CS Boundary Check
 */
export interface CSBoundaryCheck {
  violated: boolean;
  csBoundary?: 'CS1' | 'CS2' | 'CS3' | 'CS4' | 'CS5' | 'CS6';
  description: string;
  requiresApproval: boolean;
}

/**
 * Protected Domain Check
 */
export interface ProtectedDomainCheck {
  isProtected: boolean;
  domain?: string;
  paths: string[];
  requiresApproval: boolean;
}

/**
 * Enforcement Event (Telemetry)
 */
export interface EnforcementEvent {
  eventId: string;
  timestamp: string;
  version: string;
  enforcement: {
    hookName: string;
    actionType: EnforcementActionType;
    violation: ClassifiedViolation;
    reason: string;
    governanceContext: {
      csBoundary?: string;
      protectedDomain?: string;
      requiresApproval: boolean;
    };
  };
  result: {
    blocked: boolean;
    escalated: boolean;
    approvalRequired: boolean;
    success: boolean;
  };
  explainability: {
    decisionPath: string[];
    rules: string[];
    overridden: boolean;
    overrideReason?: string;
  };
}

/**
 * FL/CI Enforcement Classification
 */
export interface FLCIEnforcementClassification {
  enforcementId: string;
  flCategory: 'enforcement_success' | 'enforcement_blocked' | 'enforcement_escalated' | 'enforcement_overridden';
  ciAction: 'strengthen_rule' | 'refine_detection' | 'update_severity' | 'add_escape_hatch';
  learningSuggestion: string;
}

/**
 * Enforcement Query Filters
 */
export interface EnforcementQueryFilters {
  hookName?: EnforcementHookName;
  actionType?: EnforcementActionType;
  blocked?: boolean;
  escalated?: boolean;
  since?: string;
  until?: string;
}
```

---

## 5. File Structure

```
/lib/foreman/constraints/enforcement/
  ├── hook-registry.ts              # Hook registration and management
  ├── governance-engine.ts          # Governance-aware enforcement logic
  ├── action-executor.ts            # Execute enforcement actions
  ├── telemetry.ts                  # Enforcement telemetry and explainability
  ├── reason-generator.ts           # Human-readable reason generation
  ├── cs-boundary-checker.ts        # CS1-CS6 boundary validation
  ├── protected-domain-checker.ts   # Protected path/domain checks
  └── index.ts                      # Public API exports

/types/
  └── enforcement.ts                # Enforcement type definitions

/tests/constraints/
  ├── wave3c.test.ts                # Red QA for Wave 3C
  ├── hook-registry.test.ts         # Hook registration tests
  ├── governance-engine.test.ts     # Governance engine tests
  ├── action-executor.test.ts       # Action execution tests
  └── telemetry.test.ts             # Telemetry tests

/foreman/constraints/enforcement/
  ├── README.md                     # Enforcement documentation
  ├── hook-config.json              # Default hook configurations
  └── governance-rules.json         # Governance enforcement rules
```

---

## 6. API Specifications

### 6.1 Hook Registry API

**registerHook()**
```typescript
/**
 * Register enforcement hook
 */
export function registerHook(hook: EnforcementHook): void
```

**triggerHook()**
```typescript
/**
 * Trigger enforcement hook
 * 
 * @returns Enforcement results (warnings, blocks, escalations)
 */
export async function triggerHook(
  hookName: EnforcementHookName,
  context: EnforcementContext
): Promise<HookTriggerResult>

export interface HookTriggerResult {
  hookName: string;
  triggered: boolean;
  actions: EnforcementAction[];
  results: ExecutionResult[];
  summary: {
    allowed: number;
    warned: number;
    blocked: number;
    escalated: number;
    approvalRequired: number;
  };
}
```

### 6.2 Governance Engine API

**determineEnforcementAction()**
```typescript
/**
 * Determine enforcement action for violation
 */
export async function determineEnforcementAction(
  violation: ClassifiedViolation,
  hook: EnforcementHook,
  context: EnforcementContext
): Promise<EnforcementAction>
```

**checkCSBoundaries()**
```typescript
/**
 * Check CS1-CS6 boundaries
 */
export function checkCSBoundaries(
  violation: ClassifiedViolation,
  context: EnforcementContext
): CSBoundaryCheck
```

### 6.3 Action Executor API

**executeEnforcementAction()**
```typescript
/**
 * Execute enforcement action
 */
export async function executeEnforcementAction(
  action: EnforcementAction
): Promise<ExecutionResult>
```

**executeWarning()**
```typescript
/**
 * Execute warning (non-blocking)
 */
export async function executeWarning(
  action: EnforcementAction
): Promise<ExecutionResult>
```

**executeBlocking()**
```typescript
/**
 * Execute blocking action (throws BlockingError)
 */
export async function executeBlocking(
  action: EnforcementAction
): Promise<ExecutionResult>
```

### 6.4 Telemetry API

**emitEnforcementEvent()**
```typescript
/**
 * Emit enforcement event (non-blocking)
 */
export async function emitEnforcementEvent(
  action: EnforcementAction,
  result: ExecutionResult
): Promise<void>
```

**generateEnforcementReason()**
```typescript
/**
 * Generate human-readable reason
 */
export function generateEnforcementReason(
  violation: ClassifiedViolation,
  action: EnforcementAction,
  context: EnforcementContext
): string
```

---

## 7. Governance Integration

### 7.1 CS1-CS6 Boundary Enforcement

**CS1 (Immutable Guardrails)**:
- Enforcement Action: `block` (no override)
- Protected paths enforcement
- Governance file protection

**CS2 (Architecture Approval Workflow)**:
- Enforcement Action: `require_approval`
- Triggered for protected file modifications
- Requires explicit Johan approval

**CS3 (Incident Workflow)**:
- Enforcement Action: `escalate`
- Critical violations create incidents
- Tracked in governance memory

**CS4 (Security Enforcement)**:
- Enforcement Action: `block`
- Security violations always enforced
- No override allowed

**CS5 (Performance Enforcement)**:
- Enforcement Action: `warn`
- Performance violations logged
- Not blocking in Wave 3C

**CS6 (Execution Boundary)**:
- Enforcement Action: `allow` with logging
- Continuous execution maintained
- Violations logged for review

### 7.2 Protected Domain Enforcement

**Protected Domains**:
- `.github/workflows/` → CS1 protection
- `BUILD_PHILOSOPHY.md` → CS2 approval required
- `foreman/constitution/` → CS2 approval required
- `foreman/governance/` → CS2 approval required

**Enforcement Logic**:
```typescript
if (isProtectedDomain(violation)) {
  if (isMutableWithApproval(violation)) {
    return 'require_approval' // CS2
  } else {
    return 'block' // CS1
  }
}
```

### 7.3 Memory Fabric Integration

**Storage**:
- Collection: `enforcement_actions`
- Retention: 365 days for all enforcement actions
- Indexing: By hookName, actionType, blocked, timestamp

**Queries**:
- Recent blocks: Last 7 days of blocking actions
- Escalations: All escalated violations
- Overrides: All overridden enforcements

---

## 8. Error Handling

### 8.1 Hook Execution Errors

**Error Handling Strategy**:
```typescript
try {
  const result = await triggerHook('pre-merge', context);
} catch (error) {
  // Log error but don't fail silently
  console.error('[Enforcement] Hook execution failed:', error);
  
  // Log to governance memory
  await logGovernanceError({
    type: 'enforcement_error',
    hookName: 'pre-merge',
    error: error.message,
  });
  
  // In Wave 3C: Continue with warning (graceful degradation)
  // Future waves: May block on critical hooks
  return {
    triggered: true,
    actions: [],
    results: [],
    summary: { allowed: 0, warned: 1, blocked: 0, escalated: 0, approvalRequired: 0 }
  };
}
```

### 8.2 Blocking Errors

**BlockingError**:
```typescript
export class BlockingError extends Error {
  constructor(
    public action: EnforcementAction,
    public remediation: string[],
    public overrideInstructions?: string
  ) {
    super(action.reason);
    this.name = 'BlockingError';
  }
}
```

**Handling**:
- Caught at operation level
- User sees clear error message
- Remediation steps provided
- Override instructions (if allowed)

### 8.3 Telemetry Errors

**Non-Blocking Requirement**:
- All telemetry operations wrapped in try-catch
- Errors logged but never thrown
- Graceful degradation if Memory Fabric unavailable

---

## 9. Performance Considerations

### 9.1 Hook Execution Performance

**Requirements**:
- Pre-merge hook: < 30 seconds
- Pre-build hook: < 10 seconds
- Runtime hook: < 1 second per validation

**Optimization**:
- Parallel violation detection (from Wave 3B)
- Cached hook configurations
- Lazy loading of governance rules

### 9.2 Enforcement Decision Performance

**Requirements**:
- Enforcement decision: < 100ms per violation
- CS boundary check: < 50ms
- Protected domain check: < 50ms

**Optimization**:
- Pre-computed protected path patterns
- Cached CS boundary rules
- Efficient rule matching

---

## 10. Testing Architecture

### 10.1 Test Coverage Requirements

**Unit Tests**:
- Hook registration: 100%
- Governance engine: 100%
- Action executor: 100%
- Telemetry: 100%
- Reason generation: 100%

**Integration Tests**:
- End-to-end hook triggering
- CS2 approval flow
- Blocking with override
- Escalation workflow

**Red QA Test Categories**:
1. **Hook Activation Tests**
   - Pre-merge hook triggers correctly
   - Pre-build hook triggers correctly
   - Runtime hook triggers correctly

2. **Governance Boundary Tests**
   - CS1-CS6 boundaries respected
   - Protected domains enforced
   - Approval requirements honored

3. **Enforcement Action Tests**
   - Warnings execute correctly
   - Blocking works with clear errors
   - Escalations notify correctly
   - Approval flow works end-to-end

4. **Explainability Tests**
   - All actions have clear reasons
   - Remediation steps provided
   - Override instructions clear
   - Decision path traceable

5. **Safe Failure Tests**
   - No silent blocking
   - Errors are explainable
   - Graceful degradation
   - Escape hatches work

---

## 11. Security Considerations

### 11.1 Override Security

**Override Mechanism**:
- Environment variable: `FOREMAN_ENFORCEMENT_OVERRIDE=true`
- Requires explicit reason in logs
- Logged to governance memory
- Auditable trail

**Security Requirements**:
- Override requires justification
- Override logged with user identity
- Override subject to review
- Override cannot bypass CS1 (immutable guardrails)

### 11.2 Approval Security

**CS2 Approval Requirements**:
- Protected file changes require approval
- Approval request logged
- Approval decision logged
- Approval flow auditable

---

## 12. Deployment Considerations

### 12.1 Deployment Strategy

**Phase 1** (Wave 3C):
- Deploy hook registry
- Deploy governance engine
- Deploy action executor (warnings only at first)
- Deploy telemetry
- **Do not enable blocking initially** (observe only)

**Phase 2** (Post-validation):
- Enable warnings for all severity levels
- Monitor for false positives
- Refine detection rules

**Phase 3** (Future):
- Enable blocking for critical violations
- Enable escalation workflow
- Enable approval requirements

### 12.2 Rollback Strategy

**Rollback Triggers**:
- Enforcement blocks valid operations
- False positive rate > 10%
- Hook execution takes > 60 seconds
- Silent failures detected

**Rollback Procedure**:
```typescript
// Disable all enforcement hooks
export const ENFORCEMENT_ENABLED = false;

// Or disable specific hook
export function disableHook(hookName: EnforcementHookName): void {
  const hook = getHook(hookName);
  if (hook) {
    hook.enabled = false;
  }
}
```

---

## 13. Architecture Checklist Validation

### User Interface (UI) Architecture
- [ ] N/A - No UI components in Wave 3C

### API Architecture
- [x] **Endpoint Definition**: TypeScript function signatures defined
- [x] **Request Specification**: Parameters typed and documented
- [x] **Response Specification**: Return types fully specified
- [x] **Authentication & Authorization**: Internal governance checks
- [x] **Data Validation**: Input validation specified
- [x] **Error Handling**: All error scenarios documented
- [x] **Performance Considerations**: Performance requirements specified

### Data Architecture
- [x] **Schema Definition**: All types fully defined in `/types/enforcement.ts`
- [x] **Relationships**: Enforcement → Violation → Constraint → Action
- [x] **Data Storage**: Enforcement actions stored in Memory Fabric
- [x] **Data Lifecycle**: Creation, execution, storage, retention specified
- [x] **Data Validation**: Validation functions specified
- [x] **Type Definition Completeness**: All types fully defined
- [x] **Data Migrations**: N/A - First version

### State Management Architecture
- [x] **State Location**: Hook registry (in-memory), enforcement events (Memory Fabric)
- [x] **State Shape**: All data structures fully typed
- [x] **State Operations**: Register, trigger, execute, log
- [x] **State Synchronization**: N/A - No client-server sync

### Integration Architecture
- [x] **Service Identification**: Wave 3B detection, Memory Fabric, FL/CI
- [x] **Integration Points**: Detection → Enforcement → Telemetry → Memory
- [x] **Error Handling**: Non-blocking, graceful degradation
- [x] **Configuration**: Hook configs, governance rules

### Security Architecture
- [x] **Authentication**: N/A - Internal library
- [x] **Authorization**: CS1-CS6 boundary checks
- [x] **Data Protection**: No sensitive data in enforcement events
- [x] **Input Sanitization**: All inputs validated
- [x] **Secrets Management**: No secrets in enforcement data

### Error Handling Architecture
- [x] **Error Types**: All error categories documented
- [x] **Error Detection**: Validation at all entry points
- [x] **Error Communication**: Clear error messages with remediation
- [x] **Error Recovery**: Recovery strategies specified
- [x] **Error Logging**: Governance memory logging specified

### Performance Architecture
- [x] **Performance Requirements**: All timing requirements specified
- [x] **Optimization Strategies**: Parallel execution, caching, lazy loading
- [x] **Performance Monitoring**: N/A - No metrics in Wave 3C

### Testing Architecture
- [x] **Test Coverage Strategy**: 100% coverage requirement specified
- [x] **Test Data**: Fixtures and mocks specified
- [x] **Test Scenarios**: Unit, integration, Red QA tests specified
- [x] **Test Infrastructure**: Jest, existing test infrastructure

### Deployment Architecture
- [x] **Build Configuration**: No special build requirements
- [x] **Deployment Strategy**: Phased deployment specified
- [x] **Environment Configuration**: Hook configs, governance rules
- [x] **Post-Deployment**: Rollback strategy specified

### Documentation Architecture
- [x] **Code Documentation**: JSDoc/TSDoc required for all public APIs
- [x] **User Documentation**: Enforcement guide specified
- [x] **Developer Documentation**: Architecture diagrams included

**Result**: ✅ **ARCHITECTURE COMPLETE**

All relevant checklist items addressed. Architecture is comprehensive and ready for Red QA creation.

---

## 14. Acceptance Criteria

Wave 3C is complete when:

1. ✅ **Enforcement Hook System Implemented**
   - Pre-merge hook functional
   - Pre-build hook functional
   - Runtime validation hook functional
   - Hook registry operational

2. ✅ **Governance-Aware Enforcement Implemented**
   - CS1-CS6 boundary checks working
   - Protected domain checks working
   - Approval requirements honored
   - Override mechanism functional

3. ✅ **Enforcement Actions Implemented**
   - Warning execution functional
   - Blocking execution functional (with escape hatches)
   - Escalation execution functional
   - Approval requirement execution functional

4. ✅ **Explainability Implemented**
   - All actions have clear reasons
   - Remediation steps provided
   - Override instructions clear
   - Decision paths traceable

5. ✅ **Telemetry Implemented**
   - Enforcement events emitted
   - Memory Fabric integration working
   - FL/CI integration functional
   - Reason generation working

6. ✅ **Red QA → Green QA**
   - All tests initially RED (failing)
   - Implementation makes tests GREEN
   - 100% test pass rate
   - Zero errors, zero warnings

7. ✅ **Evidence Trail Complete**
   - Architecture documented
   - Checklist validated
   - Red QA evidence recorded
   - Green QA evidence recorded

8. ✅ **Safety Verified**
   - No silent blocking
   - All errors explainable
   - Escape hatches work
   - Graceful degradation verified

---

## 15. Explicit Non-Scope (Wave 3C)

**NOT Implemented in Wave 3C**:
- ❌ Auto-remediation of violations
- ❌ Refactoring engines
- ❌ Cross-wave optimization
- ❌ Manual violation suppression (future wave)
- ❌ Violation trending dashboards (future wave)
- ❌ Email/Slack notifications (future wave)

---

## 16. Future Extensions (Out of Scope for Wave 3C)

**Wave 3D** (Auto-Remediation):
- Automatic violation fixes
- Safe refactoring suggestions
- Guided remediation workflows

**Wave 3E** (Advanced Enforcement):
- Graduated enforcement (warn → block over time)
- Violation trends and predictions
- Custom enforcement rules per project

---

*This architecture is complete and ready for Red QA creation.*

**Version**: 1.0  
**Status**: Architecture Complete ✅  
**Next Phase**: Red QA Creation  
**Date**: 2025-12-13
