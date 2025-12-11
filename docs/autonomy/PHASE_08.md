# PHASE_08: Constitutional Supervision Graph

**Wave:** 3  
**Layer:** Deep Constitutional Runtime  
**Status:** Implemented  
**Version:** 1.0.0

## Purpose

The Constitutional Supervision Graph is the **brainstem of constitutional AI** for the Maturion Foreman ecosystem. It provides a formal graph connecting ALL constitutional layers, ensuring every autonomous action is supervised by every relevant governance system.

## Architecture

### Supervision Graph Structure

The supervision graph consists of 12 constitutional nodes, each representing a critical governance layer:

1. **Guardrails** (Priority: 100) - Immutable path protection, constitutional file integrity
2. **QIC** (Priority: 95) - Quality Integrity Contract enforcement
3. **QIEL** (Priority: 90) - Quality Integrity Enforcement Layer runtime checks
4. **Governance Memory** (Priority: 85) - Historical decision tracking
5. **Architecture Approval** (Priority: 80) - True North alignment validation
6. **Incident Loop** (Priority: 75) - Past incident learning
7. **Performance Engine** (Priority: 70) - Resource and performance constraints
8. **Drift Detector** (Priority: 65) - Architectural and governance drift detection
9. **Mutation Governor** (Priority: 60) - State mutation safety
10. **Model Escalation Governor** (Priority: 55) - Cognitive budgeting and model selection
11. **Builder Protocol Kernel** (Priority: 50) - Build-to-Green protocol enforcement
12. **Robotics Law Layer** (Priority: 45) - Fundamental safety laws

### Flow Types

The graph defines three types of flows between nodes:

- **Allowed**: Direct approval - action can proceed
- **Forbidden**: Explicitly blocked - action cannot proceed
- **Conditional**: Requires approval or specific conditions to be met

## Implementation

### Files Created

```
types/supervision.ts                          # Type definitions
lib/foreman/constitution/supervision-graph.ts  # Graph definition
lib/foreman/constitution/supervision-runtime.ts # Runtime enforcement
```

### Key Functions

#### Graph Operations

```typescript
getSupervisionGraph(): SupervisionGraphConfig
getNode(nodeId): SupervisionNode
getEdgesFrom(nodeId): SupervisionEdge[]
isFlowAllowed(from, to): { allowed, flowType, condition }
validateGraphIntegrity(): { valid, errors }
```

#### Runtime Enforcement

```typescript
initializeSupervisionRuntime(): Promise<{ initialized, errors }>
validateAction(action): Promise<SupervisionValidationResult>
getSupervisionLog(limit?): SupervisionLogEntry[]
getSupervisionStats(): Statistics
```

## Usage

### Initializing the Supervision Runtime

```typescript
import { initializeSupervisionRuntime } from '@/lib/foreman/constitution/supervision-runtime';

const { initialized, errors } = await initializeSupervisionRuntime();

if (!initialized) {
  console.error('Supervision runtime failed:', errors);
  process.exit(1);
}
```

### Validating an Autonomous Action

```typescript
import { validateAction } from '@/lib/foreman/constitution/supervision-runtime';

const action = {
  id: 'action_123',
  type: 'architecture_change',
  description: 'Update True North architecture',
  context: {
    isArchitectureChange: true,
    affectsConstitution: false,
    requiresModelEscalation: false,
  },
};

const result = await validateAction(action);

if (!result.executionAllowed) {
  console.error('Action blocked:', result.blockingNodes);
  // Handle blocking
  return;
}

if (result.escalationRequired) {
  console.warn('Action requires escalation:', result.escalationReason);
  // Handle escalation
}

// Proceed with action
console.log('Action approved, proceeding...');
```

## Validation Process

Every action goes through these steps:

1. **Submission**: Action is submitted with full context
2. **Node Evaluation**: Each enabled node evaluates the action in priority order
3. **Status Determination**: 
   - If any node blocks → STOP (execution forbidden)
   - If any node warns → Escalate (human review required)
   - If all nodes pass → Execute (proceed with action)
4. **Logging**: All decisions logged to governance memory
5. **Result**: Return validation result with execution permission

## Integration with Existing Systems

The supervision graph integrates with:

- **Guardrails**: Calls `runGuardrailChecks()` for immutable path validation
- **QIC**: Calls `checkQICCompliance()` for quality contract enforcement
- **Drift Detector**: Calls `detectDrift()` for architectural drift detection
- **Governance Memory**: Logs all events via `logGovernanceEvent()`

## Constitutional Guarantees

The supervision graph enforces:

- **Immutability**: Protected paths and constitutional files cannot be modified
- **Governance Supremacy**: Quality failures block execution (GSR)
- **PR Gatekeeper**: Build-to-Green protocol is mandatory
- **QIC/QIEL Validation**: Zero-error, zero-warning builds enforced
- **Drift Detection**: Architectural changes tracked and validated
- **Incident Loop**: Past failures inform future decisions
- **Performance Enforcement**: Resource constraints respected
- **Mutation Governance**: State changes controlled
- **Builder Protocol**: Only Build-to-Green instructions accepted
- **Model Escalation**: Cognitive budgeting enforced
- **Safety Laws**: Harmful actions blocked

## Deterministic and Versioned

The supervision graph is:

- **Deterministic**: Same action always produces same result
- **Versioned**: Graph version tracked (currently 1.0.0)
- **Logged**: All validations recorded
- **Immutable**: Graph cannot be modified at runtime

## Acceptance Criteria

- [x] Graph validates every action before execution
- [x] Any failure blocks execution
- [x] All decisions logged to governance memory
- [x] Foreman rejects unsafe actions automatically
- [ ] Dashboard displays supervision tree (pending UI implementation)

## Future Enhancements

1. **Dashboard Visualization**: Real-time supervision tree display
2. **AUTONOMY_PILOT_LOG.md Integration**: Persistent logging to markdown
3. **Advanced Drift Detection**: ML-based pattern recognition
4. **Dynamic Priority Adjustment**: Node priorities adapt based on incident history
5. **Cross-Agent Supervision**: Extend to builder network validation

## Constitutional Authority

This implementation follows:

- **BUILD_PHILOSOPHY.md**: Supreme architectural authority
- **.github/foreman/agent-contract.md**: Constitutional contract
- **Governance Supremacy Rule (GSR)**: QA absoluteness
- **Quality Integrity Contract (QIC)**: Zero-error enforcement

## Version History

- **1.0.0** (2025-12-11): Initial implementation
  - 12 constitutional nodes
  - 13 flow edges
  - Integration with existing governance systems
  - Runtime validation engine

## References

- Types: `types/supervision.ts`
- Graph: `lib/foreman/constitution/supervision-graph.ts`
- Runtime: `lib/foreman/constitution/supervision-runtime.ts`
- Build Philosophy: `BUILD_PHILOSOPHY.md`
- Agent Contract: `.github/foreman/agent-contract.md`
