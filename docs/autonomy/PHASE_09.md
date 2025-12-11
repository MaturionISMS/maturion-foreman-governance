# PHASE_09: Model Escalation Governor

**Wave:** 3  
**Layer:** Cognitive Safety Layer  
**Status:** Implemented (Types & Foundation)  
**Version:** 1.0.0

## Purpose

The Model Escalation Governor enforces a governance-safe policy for when Foreman can escalate between models. This prevents arbitrary model selection and ensures cognitive budgeting, safety conditions, and justification requirements are met.

## Model Hierarchy

```
GPT-4o-mini (Default)
    ↓
GPT-4o (Medium tasks)
    ↓
GPT-4.1 (Heavy tasks, large context)
    ↓
GPT-5.1 (Constitutional reasoning, governance, memory activation)
    ↓
Local Builder (Fallback)
```

## Escalation Policy Types

### 1. ALLOWED
Escalation is permitted if conditions are met:
- Budget available
- Justification provided (if required)
- Safety conditions satisfied

**Examples:**
- Large architecture reasoning → GPT-5.1
- Multi-file refactors → GPT-4.1
- Autonomy wave planning → GPT-5.1
- Deep constitutional checks → GPT-5.1
- Large context tasks → GPT-4.1

### 2. FORBIDDEN
Escalation is explicitly blocked:
- Safety conditions violated
- Task type inappropriate for escalation

**Examples:**
- Builder code generation (builders handle this)
- Runtime mutations
- Actions blocked by guardrails

### 3. MANDATORY
Escalation is required for correctness:
- Critical governance tasks
- Constitutional reasoning
- Memory activation

**Examples:**
- Memory activation → GPT-5.1 (mandatory)
- Constitutional reasoning → GPT-5.1 (mandatory)
- Drift root-cause analysis → GPT-5.1 (mandatory)

## Implementation

### Files Modified/Created

```
types/model-escalation.ts                      # Extended types for PHASE_09
lib/foreman/model-escalation.ts                # Existing escalation service
```

### Enhanced Types

```typescript
export type EscalationPolicyType = 'allowed' | 'forbidden' | 'mandatory';

export interface EscalationPolicy {
  reason: EscalationReason;
  policyType: EscalationPolicyType;
  targetModel: ModelTier;
  requiresJustification: boolean;
  bypassQuotaCheck: boolean;
  safetyConditions?: string[];
}

export interface CognitiveBudget {
  tokenBudget: number;
  tokenUsed: number;
  costBudget: number; // in USD
  costUsed: number;
  escalationsAllowed: number;
  escalationsUsed: number;
}

export interface ModelEscalationJustification {
  reason: EscalationReason;
  description: string;
  expectedBenefit: string;
  alternatives: string[];
  approvedBy?: string;
  timestamp: string;
}
```

## Cognitive Budgeting

### Default Budget

```typescript
{
  tokenBudget: 10_000_000,    // 10M tokens per day
  tokenUsed: 0,
  costBudget: 100,            // $100 per day
  costUsed: 0,
  escalationsAllowed: 50,     // 50 escalations per day
  escalationsUsed: 0,
}
```

### Model Costs (per 1M tokens)

| Model | Input | Output |
|-------|-------|--------|
| GPT-4o-mini | $0.15 | $0.60 |
| GPT-4o | $2.50 | $10.00 |
| GPT-4.1 | $3.00 | $12.00 |
| GPT-5.1 | $10.00 | $30.00 |
| Local Builder | $0 | $0 |

## Escalation Process

### 1. Policy Check
- Find escalation policy for reason
- Verify policy type (allowed/forbidden/mandatory)
- Check safety conditions

### 2. Budget Check
- Estimate token usage
- Calculate cost impact
- Verify quota remaining
- Can be bypassed for mandatory escalations

### 3. Safety Check
- Validate no constitutional violations
- Ensure no runtime mutations
- Verify guardrails not blocking

### 4. Justification Check
- Required for certain policies
- Must include description, expected benefit, alternatives
- Logged for audit trail

### 5. Approval/Denial
- All checks pass → Approve and update budget
- Any check fails → Deny with reason
- Mandatory and failed → Critical error

## Usage Example

```typescript
import { governModelEscalation } from '@/lib/foreman/cognition/model-escalation-governor';

// Request escalation
const result = await governModelEscalation(
  {
    taskType: 'architecture_reasoning',
    complexity: 'high',
    filesAffected: 5,
    isArchitectureTask: true,
    isGovernanceTask: false,
    isMilestoneNearing: false,
    existingEscalationsToday: 10,
    quotaRemaining: 40,
  },
  'architecture_impact',
  {
    reason: 'architecture_impact',
    description: 'Need to reason about complex multi-module architecture',
    expectedBenefit: 'Better architectural design with fewer gaps',
    alternatives: ['Use GPT-4.1', 'Break into smaller tasks'],
    timestamp: new Date().toISOString(),
  },
  150_000 // estimated tokens
);

if (!result.allowed) {
  console.log('Escalation denied:', result.governanceChecks);
  // Fall back to lower model
}

if (result.allowed) {
  console.log(`Escalation approved: ${result.selectedModel}`);
  console.log(`Budget impact: ${result.budgetImpact.tokens} tokens, $${result.budgetImpact.cost}`);
  // Proceed with escalated model
}
```

## Governance Checks

Every escalation request undergoes four checks:

1. **Policy Check**: Is this escalation allowed/forbidden/mandatory?
2. **Budget Check**: Is there sufficient cognitive budget?
3. **Safety Check**: Are all safety conditions met?
4. **Justification Check**: Is justification provided and valid (if required)?

Result:
```typescript
{
  checkType: 'policy' | 'budget' | 'safety' | 'justification',
  passed: boolean,
  message: string,
  blockers?: string[]
}
```

## Dashboard Integration

The Model Escalation Governor provides data for dashboard display:

### Current Model Indicator
- Show current model in use
- Display reason for escalation
- Show cognitive budget status
- Warning states for budget limits

### Budget Visualization
```
Tokens: [████████░░] 80% (8M / 10M)
Cost:   [███░░░░░░░] 30% ($30 / $100)
Quota:  [█████░░░░░] 50% (25 / 50)
```

### Policy Status
- Allowed policies: 5
- Forbidden policies: 1
- Mandatory policies: 3

## Logging

All escalation decisions are logged to governance memory:

```typescript
{
  type: 'model_escalation_approved' | 'model_escalation_denied' | 'escalation_forbidden',
  severity: 'info' | 'medium' | 'critical',
  description: string,
  metadata: {
    reason,
    policy,
    model,
    justification,
    budgetImpact,
    checks,
  }
}
```

## Safety Guarantees

The Model Escalation Governor ensures:

- **No Arbitrary Escalation**: Every escalation has a defined policy
- **Budget Enforcement**: Cognitive and cost budgets respected
- **Justification Trail**: All major escalations justified and logged
- **Safety First**: Forbidden escalations always blocked
- **Mandatory Compliance**: Critical tasks get required models

## Integration with Supervision Graph

The Model Escalation Governor is node #10 in the Constitutional Supervision Graph. It validates:

- Model escalation requests are policy-compliant
- Cognitive budget is available
- Safety conditions are met
- Justifications are provided when required

## Acceptance Criteria

- [x] Escalation policy types defined (allowed/forbidden/mandatory)
- [x] Type definitions created
- [ ] All escalations logged with justification
- [ ] Justification required for non-mandatory escalations
- [ ] Forbidden escalations blocked
- [ ] Foreman uses GPT-5.1 only when needed
- [ ] Dashboard indicator showing current model
- [ ] Budget visualization in dashboard

## Future Enhancements

1. **Dynamic Budget Adjustment**: Increase budget for critical periods
2. **Learning from Patterns**: Optimize escalation rules based on success patterns
3. **Multi-Day Budget Tracking**: Carry over unused budget
4. **Cost Forecasting**: Predict daily costs based on planned tasks
5. **Escalation Audit Reports**: Weekly summaries of escalation patterns

## Constitutional Authority

This implementation follows:

- **BUILD_PHILOSOPHY.md**: Model Escalation Policy section
- **Agent Instructions**: Model escalation restrictions
- **Governance Supremacy Rule (GSR)**: Cognitive safety priority
- **Quality Integrity Contract (QIC)**: Efficient resource usage

## Version History

- **1.0.0** (2025-12-11): Initial implementation
  - Extended type definitions
  - Policy framework defined
  - Cognitive budgeting specification
  - Justification requirements
  - Integration with supervision graph

## References

- Types: `types/model-escalation.ts`
- Escalation Service: `lib/foreman/model-escalation.ts`
- Supervision Graph: `lib/foreman/constitution/supervision-graph.ts`
- Build Philosophy: `BUILD_PHILOSOPHY.md`
- Agent Contract: `.github/foreman/agent-contract.md`
