# GitHub Model Scaling Policy

## Purpose

This policy governs the use of AI models for GitHub builders across all Maturion repositories. It ensures optimal cost efficiency while maintaining high success rates through intelligent model selection and escalation.

## Scope

This policy applies **ONLY** to GitHub AI builders. It does **NOT** affect:
- Maturion App model escalation (`lib/foreman/model-escalation.ts`)
- Local Builder Runtime model scaling

## Model Tier System

### Tier 1 (T1) - Lightweight Tasks
**Models**: `gpt-4o-mini`, `claude-haiku`  
**Cost Multiplier**: 1x (baseline)  
**Task Types**:
- Documentation updates
- Simple UI components
- Configuration changes

**When to Use**: Tasks with low complexity, minimal file changes, no architectural impact.

### Tier 2 (T2) - Standard Tasks
**Models**: `gpt-4o`, `claude-sonnet-lite`  
**Cost Multiplier**: 5x  
**Task Types**:
- CRUD operations
- API endpoint implementation
- React components
- Service integrations

**When to Use**: Medium complexity tasks requiring logic implementation, multiple file changes, standard patterns.

### Tier 3 (T3) - Complex Tasks
**Models**: `claude-3.5-sonnet`  
**Cost Multiplier**: 20x  
**Task Types**:
- Architecture design
- Red QA creation
- Large refactoring
- Multi-module changes

**When to Use**: High complexity tasks requiring deep reasoning, architectural decisions, governance tasks.

## Escalation Policy

### Automatic Escalation Triggers

The system automatically escalates to a higher tier when struggle signals are detected:

1. **Repeated Errors** (2+ failures): Model fails same task repeatedly
2. **Invalid Code Generation** (1 occurrence): Syntax errors, type errors
3. **Missing Imports** (2+ occurrences): Import statements not added
4. **Partial File Rewrites** (1 occurrence): Incomplete file modifications
5. **QIC Failures** (1 occurrence): Quality gate violations
6. **Token Overflow** (1 occurrence): Context window exceeded
7. **Excessive Ambiguity** (2+ occurrences): Model asks for clarification repeatedly
8. **Directive Not Followed** (2+ occurrences): Instructions ignored

### Escalation Sequence

**T1 → T2 → T3**

- Each tier allows **3 retry attempts** before escalating
- Escalation is automatic based on struggle detection
- No manual intervention required for escalation
- If T3 fails after 3 attempts, task is marked as exhausted

### De-escalation Policy

The system considers de-escalation when:
- **3 consecutive successful tasks** on current tier
- **All with 1 attempt** (no retries needed)
- **No struggle signals** detected

De-escalation moves back to lower tier for next similar task type.

## Cost Management

### Cost Estimation

Each routing decision includes estimated cost:
- T1: $0.01 per request (baseline)
- T2: $0.05 per request (5x)
- T3: $0.20 per request (20x)

### Budget Optimization

The system optimizes costs by:
1. **Starting at lowest viable tier** for each task type
2. **Escalating only when necessary** (struggle detected)
3. **De-escalating after success** (proven capability on lower tier)
4. **Caching tier decisions** for similar tasks

## Governance Integration

### Logging Requirements

All routing decisions are logged to governance memory:
- **Location**: `/logs/model-routing/YYYY-MM-DD/*.json`
- **Retention**: 90 days
- **Contents**: Task descriptor, routing decision, attempts, outcome

### Evidence Trail

Every routing decision includes:
- Justification for tier selection
- Struggle signals detected (if any)
- Escalation/de-escalation reasoning
- Final outcome and cost

### Audit Trail

Governance logs enable:
- Cost analysis and optimization
- Success rate tracking by tier
- Struggle pattern identification
- Policy refinement based on data

## Compliance

### Constitutional Requirements

This policy complies with:
- **CS1 Guardrails**: Central router is protected file
- **GSR (Governance Supremacy Rule)**: Quality gates absolute
- **QIC (Quality Integrity Contract)**: QA failures trigger escalation
- **Build Philosophy**: Architecture → Red QA → Build to Green

### Policy Updates

This policy can be updated by:
- Foreman (based on governance data)
- Johan (strategic decisions)
- Governance committee (constitutional changes)

Policy updates require:
- Evidence of need (data-driven)
- Impact analysis (cost, success rate)
- Validation period (pilot program)

## Repository Consistency

### Cross-Repository Enforcement

All 7 Maturion repositories must:
- Use same tier table (`config/model-tiers.json`)
- Follow same escalation rules
- Log to governance memory
- Report to central Foreman

### Repository-Level Customization

Repositories may customize:
- Task type classification (local context)
- Governance rule enforcement (additional checks)
- Logging format (extended metadata)

Repositories **MUST NOT** customize:
- Tier definitions (T1/T2/T3)
- Model selection within tiers
- Escalation triggers
- Cost multipliers

## Monitoring and Metrics

### Key Performance Indicators

Track and report:
- **Success rate by tier** (target: >90% T1, >95% T2, >98% T3)
- **Average cost per task** (optimize over time)
- **Escalation frequency** (should decrease over time)
- **De-escalation success** (proves lower tier capability)

### Alerts

Trigger alerts when:
- Success rate drops below target
- Cost exceeds budget
- Escalation frequency spikes
- Model API errors increase

## Security

### Model API Keys

- Stored securely in environment variables
- Never logged in governance memory
- Rotated regularly
- Access limited to Foreman

### Data Protection

- Task descriptors sanitized before logging
- No sensitive data in logs
- Logs encrypted at rest
- Access audited

## Support

### Troubleshooting

If routing fails:
1. Check tier table exists and is valid JSON
2. Verify central router is accessible
3. Check governance memory logging works
4. Fall back to T2 (safe default)

### Escalation to Humans

Escalate to Johan when:
- All tiers exhausted (task cannot be completed)
- Cost exceeds budget threshold
- Success rate below target for 24 hours
- Policy ambiguity or conflict detected

---

**Version**: 1.0  
**Authority**: Maturion Engineering Leadership (Johan)  
**Status**: Active and Enforced  
**Last Updated**: 2025-12-11
