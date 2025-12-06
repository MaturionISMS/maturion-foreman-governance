# Project Lifecycle Rules

## Overview

The Project Lifecycle system enables Foreman to track, orchestrate, and report on complete project journeys from initial concept through deployment. This fourth layer transforms Foreman from a build orchestrator into a comprehensive project supervisor.

## Project Lifecycle Phases

Every project in the Maturion system progresses through four mandatory phases:

### 1. Concept Phase

**Definition**: Initial project ideation and requirements gathering

**Activities**:
- Project proposal creation
- Stakeholder identification
- High-level scope definition
- Feasibility assessment
- Initial risk identification

**Entry Criteria**:
- Project name and description defined
- Business justification documented
- Initial stakeholder approval obtained

**Exit Criteria**:
- Concept approved by project owner
- Project registered in registry
- Architecture phase initiated

**Foreman Actions**:
- Create project record in registry
- Initialize project metadata
- Set initial status to "concept"
- Create project memory context

### 2. Architecture Phase

**Definition**: System design and technical planning

**Activities**:
- Architecture analysis and gap detection
- Technical specification creation
- Module decomposition
- Dependency mapping
- QA strategy definition

**Entry Criteria**:
- Concept phase completed
- Project requirements clear
- Technical constraints identified

**Exit Criteria**:
- Architecture documentation complete
- Module breakdown defined
- Build tasks identified and planned
- QA requirements specified

**Foreman Actions**:
- Run architecture analysis
- Generate module specifications
- Create builder task plan
- Document dependencies
- Update project status to "architecture_complete"

### 3. Build Phase

**Definition**: Code implementation and quality validation

**Activities**:
- Builder task execution
- Code generation and modification
- QA validation (QA + QA-of-QA)
- Compliance verification
- Test coverage validation

**Entry Criteria**:
- Architecture phase completed
- Builder tasks defined
- QA requirements established

**Exit Criteria**:
- All builder tasks completed successfully
- QA validation passed
- Compliance checks passed
- Test coverage meets thresholds
- PR created and reviewed

**Foreman Actions**:
- Dispatch builder tasks
- Monitor task execution
- Run QA validation cycles
- Enforce compliance gates
- Assemble and create PR
- Update project status to "build_complete"

### 4. Deployment Phase

**Definition**: Production release and monitoring

**Activities**:
- Deployment preparation
- Production release
- Post-deployment validation
- Monitoring setup
- Documentation finalization

**Entry Criteria**:
- Build phase completed
- PR merged to main
- Deployment checklist complete
- Stakeholder approval obtained

**Exit Criteria**:
- Deployed to production environment
- Post-deployment tests passed
- Monitoring active
- Project documentation complete
- Project closed successfully

**Foreman Actions**:
- Validate deployment readiness
- Record deployment metadata
- Monitor deployment status
- Update project status to "deployed"
- Generate project completion report

## Lifecycle State Machine

```
CONCEPT → ARCHITECTURE → BUILD → DEPLOYMENT → COMPLETED
   ↓          ↓            ↓          ↓            ↓
 PAUSED    PAUSED      PAUSED    PAUSED      ARCHIVED
   ↓          ↓            ↓          ↓
CANCELLED  CANCELLED  CANCELLED  CANCELLED
```

### Valid States

- `concept` - Initial project ideation
- `architecture` - System design in progress
- `build` - Code implementation in progress
- `deployment` - Production release in progress
- `completed` - Project successfully delivered
- `paused` - Temporarily halted (any phase)
- `cancelled` - Project abandoned (any phase)
- `archived` - Historical record (post-completion)

### State Transitions

**Concept → Architecture**:
- Requires: Concept approval
- Action: Initialize architecture analysis

**Architecture → Build**:
- Requires: Architecture documentation complete
- Action: Create and dispatch builder tasks

**Build → Deployment**:
- Requires: All QA gates passed, PR merged
- Action: Prepare deployment artifacts

**Deployment → Completed**:
- Requires: Production deployment verified
- Action: Generate completion report

**Any Phase → Paused**:
- Requires: Admin command or system escalation
- Action: Halt current activities, preserve state

**Any Phase → Cancelled**:
- Requires: Admin approval or critical failure
- Action: Mark as cancelled, archive state

**Completed → Archived**:
- Requires: Retention period elapsed
- Action: Move to historical archive

## Mandatory Behaviors

### 1. Project Registration Required

**Rule**: All projects MUST be registered before work begins

**Enforcement**:
- Chat commands validate project exists
- Builder tasks reject unregistered projects
- Architecture analysis requires project context

**Exception**: Pilot builds and self-tests do not require project registration

### 2. Phase Progression Sequential

**Rule**: Projects MUST progress through phases in order (concept → architecture → build → deployment)

**Enforcement**:
- Cannot skip phases
- Cannot regress to earlier phase (except via pause/resume)
- State transitions validated by registry

**Exception**: Admin can force state transition in emergency

### 3. Milestone Tracking Mandatory

**Rule**: Projects MUST define milestones and track progress

**Enforcement**:
- Each phase has default milestones
- Custom milestones can be added
- Progress percentage calculated from milestones
- Dashboard displays milestone status

**Minimum Milestones**:
- Concept: "Concept Approved"
- Architecture: "Architecture Complete", "Module Plan Created"
- Build: "Tasks Created", "QA Passed", "PR Merged"
- Deployment: "Deployed to Production", "Post-Deploy Verified"

### 4. Status Persistence Required

**Rule**: Project status MUST be persisted and recoverable

**Enforcement**:
- All state changes written to storage
- Storage backend (JSON or Supabase) validated at startup
- State recoverable after Foreman restart
- Audit trail maintained for all transitions

**Storage Requirements**:
- Write durability guaranteed
- Read consistency guaranteed
- Concurrent access handled safely
- Backup and recovery supported

### 5. QA Constraints Apply

**Rule**: All lifecycle transitions subject to QA validation

**Enforcement**:
- Architecture → Build: Architecture must pass validation
- Build → Deployment: QA gates must pass
- Deployment → Completed: Post-deploy tests must pass

**QA Checks**:
- Architecture phase: Completeness, consistency, feasibility
- Build phase: Code quality, test coverage, security
- Deployment phase: Smoke tests, monitoring, rollback plan

### 6. Deployment Governance Enforced

**Rule**: Deployments require explicit approval and validation

**Enforcement**:
- Deployment checklist must be completed
- Deployment plan must exist
- Rollback strategy must be defined
- Monitoring must be active

**Approval Required**:
- Production deployments require admin approval
- Staging deployments auto-approved (if QA passes)
- Development deployments auto-approved

## Memory Writing Rules

### Project Context Storage

**Rule**: Foreman maintains project memory across sessions

**What Gets Stored**:
- Project metadata (name, description, owner)
- Current phase and status
- Milestone completion status
- Build artifacts and PR references
- Deployment history
- Error logs and escalations

**Where It's Stored**:
- Primary: Storage backend (JSON or Supabase)
- Secondary: In-memory cache (ephemeral)
- Tertiary: Build reports (filesystem)

**When It's Updated**:
- On state transitions
- On milestone completion
- On build task completion
- On deployment events
- On error occurrences

### Storage Format (JSON)

```json
{
  "projectId": "proj_abc123",
  "name": "User Dashboard",
  "description": "Implement user dashboard with analytics",
  "owner": "johan",
  "organisationId": "maturion_isms",
  "phase": "build",
  "status": "active",
  "milestones": [
    {
      "id": "m1",
      "name": "Architecture Complete",
      "phase": "architecture",
      "completed": true,
      "completedAt": "2024-01-15T10:00:00Z"
    },
    {
      "id": "m2",
      "name": "QA Passed",
      "phase": "build",
      "completed": false,
      "completedAt": null
    }
  ],
  "progressPercentage": 35,
  "builds": [
    {
      "sequenceId": "seq_123",
      "status": "completed",
      "prUrl": "https://github.com/org/repo/pull/42"
    }
  ],
  "deployments": [],
  "createdAt": "2024-01-10T09:00:00Z",
  "updatedAt": "2024-01-15T10:30:00Z",
  "metadata": {
    "tags": ["dashboard", "analytics"],
    "priority": "high",
    "estimatedCompletion": "2024-02-01"
  }
}
```

### Storage Backend Selection

**JSON Storage** (Default):
- Simple, file-based persistence
- Stored in `data/projects/` directory
- One JSON file per project
- Fast reads, reliable writes
- Version controlled (optional)

**Supabase Storage** (Optional):
- Database-backed persistence
- Real-time updates
- Multi-user access
- Query capabilities
- Requires `SUPABASE_URL` and `SUPABASE_KEY`

**Selection Logic**:
```typescript
if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
  // Use Supabase
} else {
  // Use JSON files
}
```

## Dashboard Requirements

### Real-Time Project Tracking

**Rule**: Dashboard MUST display current project status

**Required Views**:
- Active projects list with phase and progress
- Per-project detail view with milestones
- Lifecycle timeline visualization
- Build history and PR links
- Deployment status and history

**Update Frequency**:
- Real-time for active builds
- Polling for passive projects (30s interval)
- Manual refresh available

### Progress Visualization

**Rule**: Progress MUST be calculated and displayed accurately

**Calculation**:
```
Progress % = (Completed Milestones / Total Milestones) × 100
```

**Display**:
- Progress bar with percentage
- Phase indicator (concept/architecture/build/deployment)
- Next milestone name and ETA
- Blockers or paused status

### Reporting

**Rule**: Projects MUST generate completion reports

**Report Contents**:
- Project summary (name, owner, dates)
- Phase timeline (start/end dates per phase)
- Milestone achievements
- Build statistics (tasks, QA results)
- Deployment history
- Lessons learned (optional)

**Report Format**: Markdown, stored in `reports/` directory

## Integration with Existing Systems

### Chat Commands Integration

Project lifecycle commands integrate with existing chat command system:

- `create project [name]` → Create new project in concept phase
- `list projects` → Show all active projects
- `project status [name]` → Show project details
- `set milestone [name] [milestone]` → Mark milestone complete
- `deploy project [name]` → Initiate deployment phase

See `chat-commands.md` for complete grammar.

### Build Sequence Integration

Build sequences link to projects:

- Build sequences update project status
- Build artifacts recorded in project history
- QA results update milestone progress
- PR creation marks build milestones complete

### Governance Integration

Project lifecycle respects all governance rules:

- QA gates enforced at phase transitions
- Compliance checks required for deployments
- Approval rules apply to state transitions
- Audit logging for all lifecycle events

## Error Handling

### Invalid State Transitions

**Error**: Attempt to transition to invalid state

**Response**:
- Reject transition with error message
- Log invalid transition attempt
- Maintain current state
- Suggest valid next states

### Missing Prerequisites

**Error**: Phase transition without prerequisites met

**Response**:
- Block transition
- List missing prerequisites
- Provide remediation steps
- Update project status to "blocked"

### Storage Failures

**Error**: Cannot persist project state

**Response**:
- Retry write (3 attempts)
- Log error with full context
- Escalate to admin if retries fail
- Preserve in-memory state temporarily

## Philosophy

The Project Lifecycle system embodies Foreman's evolution:

1. **From Task Executor to Project Supervisor**: Foreman now tracks entire project journeys
2. **From Build Orchestrator to Strategic Partner**: Foreman guides projects from concept to deployment
3. **From Reactive to Proactive**: Foreman anticipates needs and suggests next steps
4. **From Siloed to Integrated**: All systems (chat, build, QA, deployment) work together under project context

**Goal**: Enable Johan to ask "What's the status of the User Dashboard project?" and get a complete, accurate answer instantly.

---

*This document defines the rules, behaviors, and constraints for Foreman's Project Lifecycle Orchestration system.*
