# Memory Rules and Unified Memory Fabric

## Overview

The Unified Memory Fabric is Foreman's persistent context storage system. It enables Foreman to maintain context across sessions, learn from past events, and make informed decisions based on historical data.

**Status**: ✅ IMPLEMENTED  
**Version**: 1.0  
**Location**: `/memory` directory (version-controlled JSON)

## Core Principles

### 1. Memory Before Action

**Rule**: Load relevant memory context before orchestrating builders or making decisions.

**Implementation**: Use `loadMemoryBeforeAction()` before major orchestration tasks.

**Example**:
```typescript
// Before orchestrating a build wave
const memory = await loadMemoryBeforeAction('foreman', {
  tags: ['wave_completion', 'qa_failure']
})
```

### 2. Memory After Action

**Rule**: Write memory after major events to preserve context for future sessions.

**Implementation**: Use `writeMemoryAfterAction()` after significant events.

**Example**:
```typescript
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

### 3. Version-Controlled Memory

**Rule**: All memory is stored as version-controlled JSON files in the repository.

**Purpose**: Enables auditing, rollback, and transparency.

**Location**: `/memory` directory

## Memory Scopes

### Global Scope

**Purpose**: System-wide memory (architecture decisions, governance changes)

**Storage**: `/memory/global/memory.json`

**What to Store**:
- Architecture decisions affecting the entire system
- Governance rule changes
- System-wide configuration changes
- Critical incidents and resolutions

**Example Entry**:
```json
{
  "id": "global_architecture_decision_001_1733487600000",
  "scope": "global",
  "key": "architecture_decision_001",
  "value": {
    "type": "architecture_decision",
    "description": "Adopted microservices pattern",
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

### Foreman Scope

**Purpose**: Foreman-specific operational memory

**Storage**: `/memory/foreman/memory.json`

**What to Store**:
- Wave completions and outcomes
- Builder performance metrics
- QA validation patterns
- Orchestration learnings
- Error patterns and recoveries

**Example Entry**:
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

### Project Scope

**Purpose**: Project-specific lifecycle memory

**Storage**: `/memory/projects/{projectId}.json`

**What to Store**:
- Project metadata and status
- Milestone completions
- Deployment history
- Project-specific errors and resolutions
- Build artifacts and PR references

**Example Entry**:
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

## Memory Event Types

### Architecture Decision

**When**: After making or recording architectural decisions

**Scope**: `global` or `project`

**Helper**: `recordArchitectureDecision()`

### Wave Completion

**When**: After successfully completing a build wave

**Scope**: `foreman`

**Helper**: `recordWaveCompletion()`

### Deployment

**When**: After deploying to any environment

**Scope**: `project` or `foreman`

**Helper**: `recordDeployment()`

### QA Failure

**When**: After QA validation fails

**Scope**: `foreman`

**Helper**: `recordQAFailure()`

**Purpose**: Learn from failures to avoid repeating mistakes

### Builder Task Completion

**When**: After a builder completes a significant task

**Scope**: `foreman`

**Use**: Direct API (`writeMemoryEntry()`)

### Governance Change

**When**: After governance files are updated

**Scope**: `global`

**Use**: Direct API (`writeMemoryEntry()`)

### Error Escalation

**When**: After escalating an error to admin

**Scope**: `foreman`

**Use**: Direct API (`writeMemoryEntry()`)

### Milestone Completion

**When**: After completing a project milestone

**Scope**: `project`

**Helper**: `recordMilestoneCompletion()`

### Project State Transition

**When**: When project moves between lifecycle phases

**Scope**: `project`

**Use**: Direct API (`writeMemoryEntry()`)

## API Reference

### Core Functions

#### loadMemoryBeforeAction()

```typescript
loadMemoryBeforeAction(
  scope: MemoryScope,
  context?: {
    tags?: string[]
    projectId?: string
    organisationId?: string
  }
): Promise<MemoryQueryResult>
```

**Purpose**: Load memory context before major actions

**Returns**: Memory entries matching the scope and filters

#### writeMemoryAfterAction()

```typescript
writeMemoryAfterAction(
  event: MemoryEvent,
  context?: {
    projectId?: string
    organisationId?: string
  }
): Promise<MemoryEntry>
```

**Purpose**: Write memory after significant events

**Returns**: The created/updated memory entry

### Helper Functions

All helpers follow the same pattern: `record{EventType}(description, data, options)`

- `recordArchitectureDecision()` - Record architecture decisions
- `recordWaveCompletion()` - Record wave completions
- `recordDeployment()` - Record deployments
- `recordQAFailure()` - Record QA failures
- `recordMilestoneCompletion()` - Record milestone completions

### Direct Access Functions

For cases not covered by helpers:

- `writeMemoryEntry()` - Write custom memory entry
- `readMemoryEntry()` - Read specific entry by key
- `queryMemoryByTags()` - Query entries by tags
- `deleteMemoryEntry()` - Delete an entry
- `clearMemoryScope()` - Clear all entries in a scope

## Integration Points

### Chat Execution

**Where**: `lib/foreman/chat-executor.ts`

**When**: Before processing chat commands

**Action**: Load relevant Foreman memory to inform responses

### Build Wave Execution

**Where**: `lib/foreman/run-build-wave.ts`

**When**: 
- Before: Load memory about previous wave outcomes
- After: Record wave completion

### Architecture Analysis

**Where**: During architecture gap analysis

**When**: After identifying architecture decisions

**Action**: Record decisions for future reference

### Deployment

**Where**: During deployment orchestration

**When**: After successful deployment

**Action**: Record deployment event

### Error Handling

**Where**: Error recovery modules

**When**: After error escalation

**Action**: Record error pattern for learning

## Storage Format

### File Structure

```
/memory
  /global
    memory.json          # Global scope entries
  /foreman
    memory.json          # Foreman scope entries
  /projects
    {projectId}.json     # Project-specific entries
    README.md
```

### Entry Schema

```typescript
interface MemoryEntry {
  id: string              // Unique identifier
  scope: MemoryScope      // 'global' | 'foreman' | 'project'
  key: string             // Unique key within scope
  value: any              // Memory content (JSON-serializable)
  metadata: {
    createdAt: string     // ISO 8601 timestamp
    updatedAt: string     // ISO 8601 timestamp
    createdBy: string     // Agent identifier
    version: number       // Version number
  }
  tags?: string[]         // Optional categorization tags
}
```

## Operational Rules

### When to Read Memory

1. **Before Orchestration**: Load foreman memory before coordinating builders
2. **Before Architecture Analysis**: Load architecture decisions
3. **Before Project Actions**: Load project memory for context
4. **On Error**: Load error patterns to inform recovery

### When to Write Memory

1. **After Wave Completion**: Record outcomes and learnings
2. **After Architecture Decisions**: Record for future reference
3. **After Deployments**: Track deployment history
4. **After QA Failures**: Learn from failures
5. **After Milestone Completion**: Track project progress
6. **After Error Escalation**: Record for pattern analysis

### Memory Retention

**Policy**: Indefinite retention (version-controlled)

**Rationale**: All memory is valuable for learning and auditing

**Cleanup**: Manual cleanup only, with governance approval

### Error Handling

**Read Failures**: Return empty result, log error, continue operation

**Write Failures**: 
- Retry 3 times with exponential backoff
- Log error with full context
- Escalate to admin if all retries fail
- Preserve in-memory state temporarily

## Security and Privacy

### No Secrets in Memory

**Rule**: Never store secrets, API keys, or sensitive credentials in memory

**Enforcement**: Memory system does not encrypt data; secrets must use dedicated secrets management

### Access Control

**Current**: File-system based (relies on repository permissions)

**Future**: When migrating to Supabase, implement row-level security

### Audit Trail

**Mechanism**: Git version control provides complete audit trail

**Information**: Who, what, when, why for every memory change

## Future Enhancements

### Planned (Not Yet Implemented)

1. **Supabase Backend**: Migrate from JSON to Supabase for production
2. **Memory Search**: Full-text search across all memory entries
3. **Memory Analytics**: Insights dashboard for memory patterns
4. **Memory Compression**: Archive old entries to reduce file size
5. **Memory Sync**: Real-time sync across distributed instances

### Not Planned

1. **Memory Encryption**: Use secrets management for sensitive data
2. **Memory Expiration**: All memory is retained indefinitely

## Testing Memory System

### Manual Test

```typescript
import { writeMemoryEntry, readMemoryEntry } from '@/lib/foreman/memory'

// Write a test entry
await writeMemoryEntry('foreman', 'test_key', 
  { message: 'Hello Memory!' },
  { createdBy: 'test', tags: ['test'] }
)

// Read it back
const entry = await readMemoryEntry('foreman', 'test_key')
console.log(entry?.value) // { message: 'Hello Memory!' }
```

### Verify Files

```bash
cat memory/foreman/memory.json
```

## Compliance

**Governance**: This memory system is mandatory per `autonomy-rules.md`

**Architecture**: Aligns with True North principle of systematic decision-making

**QA**: Memory operations are logged and auditable

**Transparency**: All memory is version-controlled and visible in repository

---

**Status**: ✅ Implemented  
**Version**: 1.0  
**Last Updated**: 2024-12-06  
**Owner**: Foreman Orchestration System
