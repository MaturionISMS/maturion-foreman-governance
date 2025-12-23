# Project Memory Scope

**Purpose**: Project-specific lifecycle tracking and context

**Scope**: `project`

**Storage**: `{projectId}.json` (one file per project)

## What to Store Here

### Project Metadata
Core project information:
- Project identification
- Status and lifecycle phase
- Repository information
- Team assignments

### Milestone Completions
Track project milestones:
- Milestone achievements
- Completion dates
- Deliverables
- Blockers resolved

### Deployment History
Record all deployments:
- Environment deployments
- Version information
- Success/failure status
- Rollback events

### Build Artifacts
Track build outputs:
- PR references
- Build sequence outcomes
- QA validation results
- Deployment readiness

### Project-Specific Issues
Record and resolve issues:
- Blockers and resolutions
- Technical debt
- Performance issues
- Security vulnerabilities

## Examples

### Milestone Completion
```json
{
  "id": "project_milestone_alpha_1733487600000",
  "scope": "project",
  "key": "milestone_alpha_release",
  "value": {
    "type": "milestone_completion",
    "description": "Completed Alpha Release milestone",
    "data": {
      "milestone": "alpha_release",
      "completedAt": "2024-12-06T10:30:00.000Z",
      "deliverables": [
        "Core authentication",
        "User dashboard",
        "API v1"
      ],
      "prUrl": "https://github.com/org/repo/pull/123"
    }
  },
  "metadata": {
    "createdAt": "2024-12-06T10:30:00.000Z",
    "updatedAt": "2024-12-06T10:30:00.000Z",
    "createdBy": "foreman",
    "version": 1
  },
  "tags": ["milestone", "alpha_release", "completed"]
}
```

### Deployment
```json
{
  "id": "project_deployment_prod_1733488000000",
  "scope": "project",
  "key": "deployment_production_v1.2.0",
  "value": {
    "type": "deployment",
    "description": "Deployment to production environment",
    "data": {
      "environment": "production",
      "version": "1.2.0",
      "commitSha": "abc123def456",
      "status": "success",
      "deployedAt": "2024-12-06T11:00:00.000Z"
    }
  },
  "metadata": {
    "createdAt": "2024-12-06T11:00:00.000Z",
    "updatedAt": "2024-12-06T11:00:00.000Z",
    "createdBy": "foreman",
    "version": 1
  },
  "tags": ["deployment", "production", "v1.2.0"]
}
```

### Project State Transition
```json
{
  "id": "project_state_transition_1733488500000",
  "scope": "project",
  "key": "state_transition_alpha_to_beta",
  "value": {
    "type": "project_state_transition",
    "description": "Transitioned from Alpha to Beta phase",
    "data": {
      "fromPhase": "alpha",
      "toPhase": "beta",
      "transitionDate": "2024-12-06T12:00:00.000Z",
      "criteria_met": [
        "All alpha features complete",
        "QA passed",
        "Security audit complete"
      ]
    }
  },
  "metadata": {
    "createdAt": "2024-12-06T12:00:00.000Z",
    "updatedAt": "2024-12-06T12:00:00.000Z",
    "createdBy": "foreman",
    "version": 1
  },
  "tags": ["state_transition", "alpha", "beta"]
}
```

## Usage

### Write Project Memory
```typescript
import { 
  recordMilestoneCompletion,
  recordDeployment,
  writeMemoryEntry
} from '@/lib/foreman/memory'

const projectId = 'isms_platform'

// Record milestone completion
await recordMilestoneCompletion(
  'Beta Release',
  {
    completedAt: new Date().toISOString(),
    deliverables: ['Feature A', 'Feature B']
  },
  { projectId }
)

// Record deployment
await recordDeployment(
  'production',
  {
    version: '1.2.0',
    commitSha: 'abc123',
    status: 'success'
  },
  { projectId }
)

// Record custom project event
await writeMemoryEntry('project', 'custom_event', {
  type: 'project_state_transition',
  fromPhase: 'alpha',
  toPhase: 'beta'
}, {
  createdBy: 'foreman',
  projectId,
  tags: ['state_transition']
})
```

### Read Project Memory
```typescript
import { loadMemoryBeforeAction } from '@/lib/foreman/memory'

const projectId = 'isms_platform'

// Load project milestones
const milestones = await loadMemoryBeforeAction('project', {
  tags: ['milestone'],
  projectId
})

// Load deployment history
const deployments = await loadMemoryBeforeAction('project', {
  tags: ['deployment'],
  projectId
})

console.log(`Project ${projectId}: ${milestones.total} milestones, ${deployments.total} deployments`)
```

## Multi-Project Support

Each project gets its own memory file:

```
/memory/projects/
  isms_platform.json          ← ISMS Platform project
  warranty_system.json        ← Warranty System project
  foreman_app_sandbox.json    ← Foreman App sandbox
  README.md                   ← This file
```

Projects are completely isolated, but can be queried together for cross-project insights.

## Integration Points

### Project Lifecycle Management
When project transitions between phases:
```typescript
const projectMemory = await loadMemoryBeforeAction('project', {
  projectId: 'isms_platform'
})
// Use memory to inform transition readiness
```

### Dashboard Generation
When generating project dashboard:
```typescript
const memorySnapshots = await loadMemoryBeforeAction('project', {
  projectId: 'isms_platform',
  tags: ['milestone', 'deployment']
})
// Include relevant memory in dashboard
```

### Build Planning
Before planning a build:
```typescript
const buildHistory = await loadMemoryBeforeAction('project', {
  projectId: 'isms_platform',
  tags: ['builder_task_completion']
})
// Learn from previous build patterns
```

## Best Practices

1. **Use Project ID Consistently**: Always include projectId when writing
2. **Tag Appropriately**: Use consistent tags across projects
3. **Record Major Events**: Milestones, deployments, state transitions
4. **Include Context**: Enough detail to understand the event later
5. **Link Related Events**: Reference related memory entries

## File Naming

Project memory files use the project ID:
- `isms_platform.json` for project ID `isms_platform`
- `warranty_system.json` for project ID `warranty_system`
- Use underscores, lowercase, alphanumeric characters only

## Metrics to Track

For each project, track:
- **Milestone Velocity**: Time between milestones
- **Deployment Frequency**: Deployments per week/month
- **Build Success Rate**: Percentage of successful builds
- **Blocker Resolution Time**: Average time to resolve blockers
- **Phase Duration**: Time spent in each lifecycle phase

## Governance

Per `foreman/governance/memory-rules.md`:
- ✅ Each project must have its own memory file
- ✅ No secrets or credentials stored
- ✅ Version-controlled via git
- ✅ Full project audit trail maintained

## Cross-Project Queries

To analyze across all projects:

```typescript
import { getAllMemory } from '@/lib/foreman/memory'

const allMemory = await getAllMemory()

// Analyze deployment frequency across all projects
const totalDeployments = Object.values(allMemory.projects)
  .flatMap(entries => entries.filter(e => e.tags?.includes('deployment')))
  .length

console.log(`Total deployments across all projects: ${totalDeployments}`)
```

---

**Scope**: Project  
**Status**: Active  
**Last Updated**: 2024-12-06
