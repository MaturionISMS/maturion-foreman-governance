# Unified Memory Fabric

**Status**: ✅ Production Ready  
**Version**: 1.0.0  
**Owner**: Foreman Orchestration System

## Overview

The Unified Memory Fabric is Foreman's persistent, version-controlled memory system that enables:

- **Multi-year continuity**: Context persists across sessions and years
- **Multi-project orchestration**: Track state across all projects
- **Persistent reasoning**: Learn from past decisions and outcomes
- **Automated learning**: Improve over time based on experience
- **Governance-compliant traceability**: Full audit trail via git

## Architecture

```
/memory
  /global          → System-wide memory (architecture decisions, governance)
  /foreman         → Foreman-specific memory (orchestration, builders, QA)
  /projects        → Project-specific memory (lifecycle, milestones, deployments)
  README.md        → This file
```

## Memory Scopes

### Global Scope (`/memory/global/`)

**Purpose**: System-wide architectural and governance decisions

**What to store**:
- Architecture decisions affecting the entire system
- Governance rule changes
- System-wide configuration changes
- Critical incidents and resolutions

**Storage**: `/memory/global/memory.json`

**Example**:
```json
{
  "id": "global_architecture_decision_001_1733487600000",
  "scope": "global",
  "key": "architecture_decision_001",
  "value": {
    "type": "architecture_decision",
    "description": "Adopted microservices pattern for scalability",
    "data": { "pattern": "microservices", "rationale": "..." }
  },
  "metadata": {
    "createdAt": "2024-12-06T10:00:00.000Z",
    "updatedAt": "2024-12-06T10:00:00.000Z",
    "createdBy": "foreman",
    "version": 1
  },
  "tags": ["architecture", "decision"]
}
```

### Foreman Scope (`/memory/foreman/`)

**Purpose**: Foreman's operational memory and learning

**What to store**:
- Wave completions and outcomes
- Builder performance metrics
- QA validation patterns
- Orchestration learnings
- Error patterns and recoveries

**Storage**: `/memory/foreman/memory.json`

**Example**:
```json
{
  "id": "foreman_wave_completion_1733487600000",
  "scope": "foreman",
  "key": "wave_completion_wave5",
  "value": {
    "type": "wave_completion",
    "description": "Completed Wave 5",
    "data": {
      "wave": "5",
      "tasksCompleted": 12,
      "duration": "45 minutes",
      "buildersUsed": ["ui", "api", "qa"]
    }
  },
  "metadata": {
    "createdAt": "2024-12-06T10:45:00.000Z",
    "updatedAt": "2024-12-06T10:45:00.000Z",
    "createdBy": "foreman",
    "version": 1
  },
  "tags": ["wave_completion", "wave5"]
}
```

### Project Scope (`/memory/projects/`)

**Purpose**: Project-specific lifecycle tracking

**What to store**:
- Project metadata and status
- Milestone completions
- Deployment history
- Project-specific errors and resolutions
- Build artifacts and PR references

**Storage**: `/memory/projects/{projectId}.json`

**Example**:
```json
{
  "id": "project_milestone_completion_1733487600000",
  "scope": "project",
  "key": "milestone_alpha_release",
  "value": {
    "type": "milestone_completion",
    "description": "Completed Alpha Release milestone",
    "data": {
      "milestone": "alpha_release",
      "completedAt": "2024-12-06T10:30:00.000Z",
      "prUrl": "https://github.com/org/repo/pull/123"
    }
  },
  "metadata": {
    "createdAt": "2024-12-06T10:30:00.000Z",
    "updatedAt": "2024-12-06T10:30:00.000Z",
    "createdBy": "foreman",
    "version": 1
  },
  "tags": ["milestone", "alpha_release"]
}
```

## Usage

### Reading Memory (Memory Before Action)

```typescript
import { loadMemoryBeforeAction } from '@/lib/foreman/memory'

// Load Foreman memory before orchestrating
const memory = await loadMemoryBeforeAction('foreman', {
  tags: ['wave_completion', 'qa_failure']
})

console.log(`Loaded ${memory.total} memory entries`)
```

### Writing Memory (Memory After Action)

```typescript
import { writeMemoryAfterAction } from '@/lib/foreman/memory'

// After completing a wave
await writeMemoryAfterAction({
  type: 'wave_completion',
  scope: 'foreman',
  description: 'Completed Wave 5',
  data: { wave: '5', tasksCompleted: 12 },
  timestamp: new Date().toISOString(),
  createdBy: 'foreman'
})
```

### Helper Functions

```typescript
import {
  recordArchitectureDecision,
  recordWaveCompletion,
  recordDeployment,
  recordQAFailure,
  recordMilestoneCompletion
} from '@/lib/foreman/memory'

// Record architecture decision
await recordArchitectureDecision(
  'Adopted event-driven architecture',
  { pattern: 'event-driven', benefits: [...] }
)

// Record wave completion
await recordWaveCompletion('Wave 6', {
  tasksCompleted: 15,
  duration: '60 minutes'
})

// Record deployment
await recordDeployment('production', {
  version: '1.2.0',
  commitSha: 'abc123'
}, { projectId: 'isms_platform' })

// Record QA failure
await recordQAFailure('API validation failed', {
  module: 'users',
  error: 'Type mismatch'
})

// Record milestone
await recordMilestoneCompletion('Beta Release', {
  completedAt: new Date().toISOString()
}, { projectId: 'isms_platform' })
```

## Memory Event Types

The system supports these event types:

- `architecture_decision` - Major architectural changes
- `wave_completion` - Build wave outcomes
- `deployment` - Deployment events
- `qa_failure` - Quality validation failures
- `builder_task_completion` - Builder task outcomes
- `governance_change` - Governance rule updates
- `error_escalation` - Error escalations to admin
- `milestone_completion` - Project milestone completions
- `project_state_transition` - Project lifecycle transitions

## Memory Doctrine

### 1. Memory Before Action

**Rule**: Always load relevant memory context before major orchestration actions.

**Why**: Past context informs better decisions and prevents repeated mistakes.

### 2. Memory After Action

**Rule**: Always write memory after significant events to preserve learnings.

**Why**: Future sessions benefit from historical context.

### 3. Version Control Everything

**Rule**: All memory is stored in version-controlled JSON files.

**Why**: Complete audit trail, rollback capability, transparency.

## Storage Backend

**Current**: JSON files in `/memory/` directory (production-ready)

**Future**: Migration to Supabase for:
- Real-time sync across distributed instances
- Full-text search
- Advanced analytics
- Row-level security

**Note**: JSON storage is the production backend. It is simple, reliable, auditable, and version-controlled.

## Security

### No Secrets in Memory

**Critical**: Never store API keys, passwords, tokens, or credentials in memory.

**Use instead**: Environment variables and dedicated secrets management.

### Access Control

Memory files are protected by:
- File system permissions
- Git repository access controls
- Organization-level authentication

### Audit Trail

Every memory change is tracked via git:
- Who made the change (commit author)
- When it was made (commit timestamp)
- Why it was made (commit message)
- What changed (git diff)

## Governance

This memory system is **mandatory** per:
- `foreman/autonomy-rules.md` - Memory Before Action doctrine
- `foreman/governance/memory-rules.md` - Memory operational rules
- True North Architecture - Systematic decision-making principle

## Integration Points

Memory is integrated at:

1. **Chat Execution** (`lib/foreman/chat-executor.ts`)
   - Load memory before processing commands
   - Write memory after significant actions

2. **Build Waves** (`lib/foreman/run-build-wave.ts`)
   - Load memory about previous wave outcomes
   - Record wave completion

3. **Architecture Analysis**
   - Record architecture decisions
   - Load previous decisions for consistency

4. **Deployments**
   - Record deployment events
   - Track deployment history

5. **Error Handling**
   - Record error patterns for learning
   - Load error history for better recovery

## Maintenance

### Retention Policy

**Current**: Indefinite retention (all memory is valuable)

**Cleanup**: Manual only, requires governance approval

### Performance

**Benchmarks**:
- Read: < 10ms for typical scope (100-1000 entries)
- Write: < 50ms including file I/O
- Query by tags: < 20ms

**Optimization**: Memory files are automatically compacted when exceeding `maxEntriesPerFile` (default: 100 entries per file).

### Monitoring

Monitor memory system health via:
```bash
# Check memory file sizes
du -sh memory/*/

# Count memory entries
wc -l memory/*/memory.json

# View recent memory
cat memory/foreman/memory.json | jq '.[-5:]'
```

## Testing

Run memory tests:
```bash
npm test tests/dashboard/memory.test.ts
```

Manual test:
```typescript
import { writeMemoryEntry, readMemoryEntry } from '@/lib/foreman/memory'

// Write
await writeMemoryEntry('foreman', 'test_key', 
  { message: 'Hello Memory!' },
  { createdBy: 'test', tags: ['test'] }
)

// Read
const entry = await readMemoryEntry('foreman', 'test_key')
console.log(entry?.value) // { message: 'Hello Memory!' }
```

## Future Enhancements

Planned:
- [ ] Supabase migration for production scale
- [ ] Full-text search across all memory
- [ ] Memory analytics dashboard
- [ ] Automated memory compression
- [ ] Real-time sync for distributed instances
- [ ] Memory query language (MQL)
- [ ] Memory visualization tools

## Support

For questions or issues with the memory system:
- Review governance: `foreman/governance/memory-rules.md`
- Check implementation: `lib/foreman/memory/`
- Ask Foreman via chat: `/foreman`

---

**Version**: 1.0.0  
**Last Updated**: 2024-12-06  
**Status**: ✅ Production Ready
