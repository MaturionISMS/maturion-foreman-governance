# Global Memory Scope

**Purpose**: System-wide architectural and governance decisions

**Scope**: `global`

**Storage**: `memory.json`

## What to Store Here

### Architecture Decisions
Record major architectural decisions that affect the entire system:
- Design pattern selections (microservices, event-driven, etc.)
- Technology stack choices
- System-wide refactoring decisions
- Infrastructure changes

### Governance Changes
Track changes to governance rules and policies:
- Autonomy rule updates
- QA policy changes
- Compliance requirement updates
- Security policy changes

### System-Wide Configuration
Major configuration changes affecting all projects:
- Environment setup changes
- CI/CD pipeline updates
- Deployment strategy changes

### Critical Incidents
Record and learn from major system incidents:
- Outages and their resolutions
- Security breaches and responses
- Data loss events and recovery

## Examples

### Architecture Decision
```json
{
  "id": "global_arch_microservices_1733487600000",
  "scope": "global",
  "key": "architecture_decision_microservices",
  "value": {
    "type": "architecture_decision",
    "description": "Adopted microservices architecture for improved scalability",
    "data": {
      "pattern": "microservices",
      "rationale": "Need independent scaling of services",
      "tradeoffs": "Increased complexity, better scalability",
      "alternatives_considered": ["monolith", "modular-monolith"]
    }
  },
  "metadata": {
    "createdAt": "2024-12-06T10:00:00.000Z",
    "updatedAt": "2024-12-06T10:00:00.000Z",
    "createdBy": "foreman",
    "version": 1
  },
  "tags": ["architecture", "decision", "microservices"]
}
```

### Governance Change
```json
{
  "id": "global_governance_qa_update_1733488000000",
  "scope": "global",
  "key": "governance_change_qa_policy",
  "value": {
    "type": "governance_change",
    "description": "Updated QA policy to require QA-of-QA for all code changes",
    "data": {
      "policy": "qa-enforcement",
      "change": "Added mandatory QA-of-QA meta-review",
      "effective_date": "2024-12-06"
    }
  },
  "metadata": {
    "createdAt": "2024-12-06T11:00:00.000Z",
    "updatedAt": "2024-12-06T11:00:00.000Z",
    "createdBy": "foreman",
    "version": 1
  },
  "tags": ["governance", "qa", "policy"]
}
```

## Usage

### Write Global Memory
```typescript
import { recordArchitectureDecision } from '@/lib/foreman/memory'

await recordArchitectureDecision(
  'Adopted event-driven architecture for async processing',
  {
    pattern: 'event-driven',
    benefits: ['decoupling', 'scalability', 'reliability'],
    implementation: 'Using message queues and event bus'
  }
)
```

### Read Global Memory
```typescript
import { loadMemoryBeforeAction } from '@/lib/foreman/memory'

const globalMemory = await loadMemoryBeforeAction('global', {
  tags: ['architecture', 'decision']
})

console.log(`Loaded ${globalMemory.total} architecture decisions`)
```

## Best Practices

1. **Be Specific**: Clearly describe the decision and its context
2. **Include Rationale**: Always explain why the decision was made
3. **Tag Appropriately**: Use consistent tags for easy retrieval
4. **Version Thoughtfully**: Update existing entries when decisions evolve
5. **Reference Others**: Link related architecture decisions

## File Structure

```
/memory/global/
  memory.json         ← All global scope entries
  README.md          ← This file
```

## Governance

Per `foreman/governance/memory-rules.md`:
- ✅ All global decisions must be recorded
- ✅ No secrets or credentials stored
- ✅ Version-controlled via git
- ✅ Full audit trail maintained

---

**Scope**: Global  
**Status**: Active  
**Last Updated**: 2024-12-06
