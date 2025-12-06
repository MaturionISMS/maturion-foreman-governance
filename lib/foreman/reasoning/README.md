# Memory-Aware Reasoning Engine (MARE)

**Status**: ✅ Production Ready  
**Version**: 1.0.0  
**Autonomy Class**: A1  
**Owner**: Foreman Orchestration System

## Overview

The Memory-Aware Reasoning Engine (MARE) is Foreman's intelligence layer that transforms memory into operational cognition. It guides planning, architecture evaluation, builder selection, QA predictions, and corrective actions.

## Core Principles

### Autonomy Class A1 Compliance

MARE operates at Autonomy Class A1, ensuring:

1. ✅ **Uses memory inputs correctly** - Loads and applies memory deterministically
2. ✅ **Avoids hallucination** - Only reasons from memory, user input, and governance
3. ✅ **Behaves consistently** - Same inputs produce same outputs across all agents
4. ✅ **Produces interpretable outputs** - Structured JSON with clear reasoning chains

### Memory Before Action Doctrine

MARE follows the "Memory Before Action" doctrine:
- Always loads relevant memory context before making decisions
- Validates memory sufficiency before proceeding
- Tracks all memory references used in reasoning

## Architecture

```
/lib/foreman/reasoning/
  ├── engine.ts      → Main reasoning engine
  ├── router.ts      → Memory filtering and routing
  ├── patterns.ts    → Reasoning patterns library
  └── index.ts       → Public API exports

/types/
  └── reasoning.ts   → Type definitions

/tests/reasoning/
  └── engine.test.ts → Comprehensive test suite (24 tests)
```

## Components

### 1. Reasoning Engine (`engine.ts`)

The core intelligence layer with two main operations:

#### Load Memory Snapshot

5-step deterministic sequence:
```typescript
1. Load project memory
2. Load global memory  
3. Load governance memory
4. Select relevant memories using router
5. Produce MemorySnapshot
```

#### Execute Reasoning

Pattern-based reasoning that:
- Finds applicable patterns based on context
- Analyzes risks from memory
- Generates decisions aligned with governance
- Produces recommended actions
- Returns structured output with confidence scores

### 2. Memory Router (`router.ts`)

Deterministic filtering engine that routes memory based on:

- **Intent** - User commands (architecture_review, build_planning, qa_analysis, etc.)
- **Phase** - Lifecycle stage (concept, architecture, build, deployment, qa, planning)
- **Subsystem** - Area of concern (architecture, build, qa, deployment, orchestration)
- **Risk Level** - Operation criticality (low, medium, high, critical)
- **Tags** - Custom categorization

**Key Features:**
- 7 intent-based routing rules
- 6 phase-based routing rules
- 5 subsystem-based routing rules
- Risk-aware result limiting
- Memory context sufficiency checking

### 3. Reasoning Patterns (`patterns.ts`)

Pattern library with 6 built-in core patterns:

1. **Memory Before Action** - Load context before major actions
2. **Governance Alignment Check** - Verify governance compliance
3. **Progressive Validation** - Validate in stages
4. **Error Context Enrichment** - Add memory context to errors
5. **Confidence-Based Escalation** - Escalate when confidence is low
6. **Incremental Rollout** - Deploy changes gradually

Patterns can also be loaded from memory entries for custom reasoning approaches.

## Usage

### Basic Reasoning

```typescript
import { reason } from '@/lib/foreman/reasoning'

const result = await reason({
  subsystem: 'architecture',
  phase: 'planning',
  riskLevel: 'high',
  projectId: 'my_project'
})

console.log(result.reasoningSummary)
console.log(result.decisions)
console.log(result.risks)
console.log(result.recommendedActions)
```

### Advanced: Separate Loading and Execution

```typescript
import { loadMemorySnapshot, executeReasoning } from '@/lib/foreman/reasoning'

// Step 1: Load memory
const snapshot = await loadMemorySnapshot({
  intent: 'build_planning',
  phase: 'build',
  projectId: 'my_project',
  tags: ['qa', 'deployment']
})

console.log(`Loaded ${snapshot.reasoningPatterns.length} patterns`)
console.log(`Loaded ${snapshot.issues.length} historical issues`)

// Step 2: Execute reasoning
const result = await executeReasoning(snapshot, {
  subsystem: 'build',
  riskLevel: 'medium'
})

console.log(`Confidence: ${result.meta.confidenceScore * 100}%`)
```

### Memory Routing

```typescript
import { routeMemory, getRecommendedTags } from '@/lib/foreman/reasoning'

// Get recommended tags for context
const tags = getRecommendedTags({
  intent: 'qa_analysis',
  phase: 'qa'
})

// Route memory entries
const routed = routeMemory(allEntries, {
  intent: 'qa_analysis',
  phase: 'qa',
  riskLevel: 'high',
  tags: ['qa_failure', 'testing']
})

console.log(`Filtered to ${routed.total} relevant entries`)
console.log(`Reason: ${routed.filteringReason}`)
```

### Pattern Management

```typescript
import { 
  getBuiltInPatterns, 
  findApplicablePatterns,
  applyPattern 
} from '@/lib/foreman/reasoning'

// Get all built-in patterns
const patterns = getBuiltInPatterns()

// Find patterns for specific context
const applicable = findApplicablePatterns(patterns, {
  tags: ['governance', 'qa'],
  riskLevel: 'critical'
})

// Apply a pattern
const guidance = applyPattern(applicable[0], {
  projectId: 'my_project',
  phase: 'deployment'
})

console.log(guidance.guidance)
console.log(guidance.confidence) // 'low' | 'medium' | 'high'
```

## Output Format

### ReasoningResult

```typescript
{
  reasoningSummary: string,           // Human-readable summary
  memoryReferences: string[],         // IDs of memory entries used
  decisions: ReasoningDecision[],     // Decisions made
  risks: string[],                    // Risks identified
  recommendedActions: string[],       // Actions to take
  meta: {
    executedAt: string,               // ISO timestamp
    patternsApplied: string[],        // Pattern IDs applied
    confidenceScore: number           // 0-1 confidence level
  }
}
```

### ReasoningDecision

```typescript
{
  action: string,                     // What to do
  rationale: string,                  // Why
  confidence: 'low' | 'medium' | 'high',
  memorySupport: string[],            // Supporting memory IDs
  governanceAlignment: boolean,       // Complies with governance
  risks?: string[]                    // Potential risks
}
```

## Integration Points

MARE integrates with:

### 1. Chat Executor (`lib/foreman/chat-executor.ts`)
```typescript
// Load memory before processing command
const reasoning = await reason({
  intent: parseIntent(userMessage),
  phase: currentPhase,
  riskLevel: assessRisk(userMessage)
})

// Use reasoning to guide response
const response = buildResponse(reasoning.decisions)
```

### 2. Build Orchestration (`lib/foreman/run-build-wave.ts`)
```typescript
// Before starting wave
const reasoning = await reason({
  intent: 'build_planning',
  phase: 'build',
  projectId: project.id,
  riskLevel: 'medium'
})

// Check for blockers
if (reasoning.risks.length > 0) {
  console.warn('Risks identified:', reasoning.risks)
}
```

### 3. QA System (`lib/builder/qa/`)
```typescript
// Analyze QA failures
const reasoning = await reason({
  intent: 'qa_analysis',
  phase: 'qa',
  tags: ['qa_failure'],
  riskLevel: 'high'
})

// Get recommendations
const actions = reasoning.recommendedActions
```

### 4. Deployment Planning
```typescript
// Before deployment
const reasoning = await reason({
  intent: 'deployment_planning',
  phase: 'deployment',
  projectId: project.id,
  riskLevel: 'critical'
})

// Check governance alignment
const governanceOk = reasoning.decisions.every(d => d.governanceAlignment)
```

## Memory Context Requirements

MARE validates memory sufficiency based on risk level:

| Risk Level | Minimum Memory Entries Required |
|------------|--------------------------------|
| Low        | 1                              |
| Medium     | 5                              |
| High       | 10                             |
| Critical   | 20                             |

If insufficient memory is loaded, MARE logs a warning but continues execution.

## Testing

### Run Tests

```bash
# Reasoning engine tests only
npx tsx --test tests/reasoning/engine.test.ts

# All tests
npm test
```

### Test Coverage

- ✅ 24 tests, 100% pass rate
- ✅ Memory router filtering
- ✅ Pattern loading and matching
- ✅ Memory snapshot creation
- ✅ Reasoning execution
- ✅ End-to-end integration

## Performance

**Benchmarks** (typical usage):

- Memory loading: < 100ms
- Routing: < 20ms
- Pattern matching: < 10ms
- Reasoning execution: < 50ms
- **Total**: < 200ms end-to-end

**Scalability**:
- Handles 100+ memory entries efficiently
- Supports unlimited patterns
- O(n) complexity for most operations

## Best Practices

### 1. Always Specify Context

```typescript
// ✅ Good - provides full context
await reason({
  intent: 'build_planning',
  phase: 'build',
  subsystem: 'build',
  riskLevel: 'medium',
  projectId: 'project_123'
})

// ❌ Avoid - minimal context
await reason({})
```

### 2. Use Intent-Based Routing

```typescript
// ✅ Good - leverages intent routing
await reason({
  intent: 'architecture_review',
  phase: 'architecture'
})

// ⚠️ Less efficient - manual tag filtering
await reason({
  tags: ['architecture_decision', 'design_pattern']
})
```

### 3. Check Confidence Scores

```typescript
const result = await reason(context)

if (result.meta.confidenceScore < 0.5) {
  // Low confidence - escalate to human
  await escalateToHuman(result)
} else if (result.meta.confidenceScore >= 0.8) {
  // High confidence - proceed autonomously
  await executeDecisions(result.decisions)
}
```

### 4. Validate Governance Alignment

```typescript
const result = await reason(context)

const allAligned = result.decisions.every(d => d.governanceAlignment)
if (!allAligned) {
  console.warn('Some decisions violate governance rules')
}
```

## Extending MARE

### Adding Custom Patterns

Store patterns in memory:

```typescript
import { writeMemoryEntry } from '@/lib/foreman/memory'

await writeMemoryEntry(
  'foreman',
  'custom_pattern_001',
  {
    pattern: {
      name: 'Custom Review Pattern',
      description: 'Reviews code changes before deployment',
      context: 'Pre-deployment validation',
      approach: 'Load recent changes, check tests, validate docs',
      examples: ['Review PR before merge', 'Validate deployment checklist'],
      tags: ['deployment', 'validation'],
      successRate: 0.95,
      usageCount: 0
    }
  },
  {
    createdBy: 'foreman',
    tags: ['reasoning_pattern', 'custom']
  }
)
```

Patterns are automatically loaded on next reasoning execution.

### Custom Routing Rules

Extend router rules in `router.ts`:

```typescript
const INTENT_ROUTING_RULES = {
  // ... existing rules ...
  'custom_intent': {
    scopes: ['foreman', 'project'],
    tags: ['custom_tag', 'custom_category']
  }
}
```

## Governance Alignment

MARE enforces governance through:

1. **Governance Rules Loading** - Loads strict governance rules from memory
2. **Alignment Checking** - Validates all decisions against rules
3. **Risk Flagging** - Identifies violations and escalates
4. **Traceability** - Tracks which rules influenced each decision

## Security

### No Data Leakage

- MARE only uses memory from configured scopes
- No external API calls during reasoning
- All processing is local and deterministic

### Audit Trail

Every reasoning execution logs:
- Memory entries loaded
- Patterns applied
- Decisions made
- Confidence scores
- Timestamp

## Troubleshooting

### "Insufficient memory context" Warning

**Cause**: Not enough memory entries for the risk level  
**Solution**: 
- Add more memory entries to relevant scopes
- Lower risk level if appropriate
- Proceed with caution if warning persists

### Low Confidence Scores

**Cause**: Unclear or conflicting memory context  
**Solution**:
- Review memory entries for quality
- Add more specific tags
- Create custom patterns for this context

### No Applicable Patterns

**Cause**: Context doesn't match any pattern tags  
**Solution**:
- Add more specific tags to context
- Create custom patterns for this use case
- Review built-in patterns for applicability

## Roadmap

Planned enhancements:

- [ ] Pattern success rate tracking and learning
- [ ] LLM-assisted pattern discovery (optional)
- [ ] Multi-agent reasoning coordination
- [ ] Real-time reasoning caching
- [ ] Reasoning visualization dashboard
- [ ] Pattern recommendation engine
- [ ] A/B testing of reasoning approaches

## Support

For questions or issues:
- Review this documentation
- Check test cases in `tests/reasoning/`
- Review governance: `foreman/governance/`
- Ask Foreman via chat: `/foreman`

---

**Version**: 1.0.0  
**Last Updated**: 2024-12-06  
**Status**: ✅ Production Ready  
**Autonomy Class**: A1
