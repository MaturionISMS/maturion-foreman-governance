# Foreman Memory Scope

**Purpose**: Foreman's operational memory and learning system

**Scope**: `foreman`

**Storage**: `memory.json`

## What to Store Here

### Wave Completions
Track outcomes of build waves:
- Tasks completed
- Duration and performance
- Builders used
- QA outcomes
- Learnings and improvements

### Builder Performance
Monitor and learn from builder behavior:
- Task completion rates
- Common failure patterns
- Performance metrics
- Capability utilization

### QA Validation Patterns
Learn from quality assurance:
- Common QA failures
- False positives/negatives
- QA-of-QA insights
- Quality trends

### Orchestration Learnings
Improve orchestration over time:
- Effective builder combinations
- Task routing strategies
- Error recovery patterns
- Optimization opportunities

### Error Patterns
Track and learn from errors:
- Recurring error types
- Escalation triggers
- Resolution strategies
- Prevention measures

## Examples

### Wave Completion
```json
{
  "id": "foreman_wave_6_completion_1733487600000",
  "scope": "foreman",
  "key": "wave_completion_wave6",
  "value": {
    "type": "wave_completion",
    "description": "Completed Wave 6: Memory Fabric Implementation",
    "data": {
      "wave": "6",
      "tasksCompleted": 15,
      "duration": "90 minutes",
      "buildersUsed": ["ui", "api", "schema", "qa"],
      "qaOutcome": "passed",
      "prUrl": "https://github.com/org/repo/pull/456"
    }
  },
  "metadata": {
    "createdAt": "2024-12-06T12:00:00.000Z",
    "updatedAt": "2024-12-06T12:00:00.000Z",
    "createdBy": "foreman",
    "version": 1
  },
  "tags": ["wave_completion", "wave6", "memory_fabric"]
}
```

### QA Failure
```json
{
  "id": "foreman_qa_failure_users_1733488000000",
  "scope": "foreman",
  "key": "qa_failure_users_module",
  "value": {
    "type": "qa_failure",
    "description": "QA validation failed for users module",
    "data": {
      "module": "users",
      "error": "Type mismatch in API response",
      "builder": "api",
      "resolution": "Fixed type definitions",
      "prevention": "Add type validation to API builder"
    }
  },
  "metadata": {
    "createdAt": "2024-12-06T12:30:00.000Z",
    "updatedAt": "2024-12-06T12:30:00.000Z",
    "createdBy": "qa-builder",
    "version": 1
  },
  "tags": ["qa_failure", "users", "api", "types"]
}
```

### Builder Task Completion
```json
{
  "id": "foreman_builder_task_ui_1733488500000",
  "scope": "foreman",
  "key": "builder_task_dashboard_component",
  "value": {
    "type": "builder_task_completion",
    "description": "UI builder created dashboard component",
    "data": {
      "builder": "ui",
      "module": "dashboard",
      "taskType": "create_component",
      "filesChanged": 5,
      "duration": "15 minutes",
      "qaOutcome": "passed"
    }
  },
  "metadata": {
    "createdAt": "2024-12-06T12:45:00.000Z",
    "updatedAt": "2024-12-06T12:45:00.000Z",
    "createdBy": "ui-builder",
    "version": 1
  },
  "tags": ["builder_task", "ui", "dashboard", "component"]
}
```

## Usage

### Write Foreman Memory
```typescript
import { 
  recordWaveCompletion,
  recordQAFailure,
  writeMemoryEntry
} from '@/lib/foreman/memory'

// After wave completion
await recordWaveCompletion('Wave 6', {
  tasksCompleted: 15,
  duration: '90 minutes',
  buildersUsed: ['ui', 'api', 'qa']
})

// After QA failure
await recordQAFailure('API validation failed', {
  module: 'users',
  error: 'Type mismatch',
  resolution: 'Fixed type definitions'
})

// Custom builder task memory
await writeMemoryEntry('foreman', 'builder_task_custom', {
  type: 'builder_task_completion',
  builder: 'schema',
  outcome: 'success'
}, {
  createdBy: 'schema-builder',
  tags: ['builder_task', 'schema']
})
```

### Read Foreman Memory
```typescript
import { loadMemoryBeforeAction } from '@/lib/foreman/memory'

// Load wave completion history
const waveHistory = await loadMemoryBeforeAction('foreman', {
  tags: ['wave_completion']
})

// Load QA failures for learning
const qaFailures = await loadMemoryBeforeAction('foreman', {
  tags: ['qa_failure']
})

console.log(`Loaded ${waveHistory.total} wave completions`)
console.log(`Loaded ${qaFailures.total} QA failures`)
```

## Integration Points

### Chat Executor
Before processing chat commands:
```typescript
const memory = await loadMemoryBeforeAction('foreman', {
  tags: ['wave_completion', 'orchestration']
})
// Use memory to inform responses
```

### Build Wave Execution
Before starting a wave:
```typescript
const previousWaves = await loadMemoryBeforeAction('foreman', {
  tags: ['wave_completion']
})
// Learn from previous wave patterns
```

After completing a wave:
```typescript
await recordWaveCompletion('Wave 7', {
  tasksCompleted: 20,
  duration: '120 minutes'
})
```

### Error Recovery
When handling errors:
```typescript
const errorPatterns = await loadMemoryBeforeAction('foreman', {
  tags: ['error_escalation', 'qa_failure']
})
// Use patterns to inform recovery strategy
```

## Best Practices

1. **Record All Waves**: Every build wave should be recorded
2. **Learn from Failures**: Record QA failures and resolutions
3. **Track Performance**: Monitor builder task completion metrics
4. **Use Consistent Tags**: Maintain consistent tagging for queries
5. **Include Context**: Provide enough detail for future learning

## File Structure

```
/memory/foreman/
  memory.json         ← All foreman scope entries
  README.md          ← This file
```

## Metrics to Track

The Foreman memory should capture:
- **Wave Velocity**: Average time per wave
- **QA Pass Rate**: Percentage of tasks passing QA
- **Builder Utilization**: Which builders are used most
- **Error Frequency**: Common error patterns
- **Recovery Time**: Time to resolve issues

## Governance

Per `foreman/governance/memory-rules.md`:
- ✅ Record memory before and after major actions
- ✅ No secrets or credentials stored
- ✅ Version-controlled via git
- ✅ Use for continuous learning and improvement

---

**Scope**: Foreman  
**Status**: Active  
**Last Updated**: 2024-12-06
