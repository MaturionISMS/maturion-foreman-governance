# Project Lifecycle Orchestration

This module implements Foreman's fourth layer: **Project Lifecycle Orchestration**.

It transforms Foreman from a build orchestrator into a full project supervisor that tracks projects from concept through deployment, exposing dashboards, maintaining milestones, and supporting real-time reporting.

## Architecture

The project lifecycle system consists of four main modules:

### 1. Registry (`registry.ts`)

The central API for project CRUD operations and queries.

**Key Functions:**
- `createProject()` - Create new projects
- `getProject()` - Retrieve project by ID
- `updateProject()` - Update project metadata
- `listProjects()` - Query projects with filters
- `getDashboardData()` - Aggregate dashboard metrics

**Example:**
```typescript
import { projectRegistry } from '@/lib/foreman/projects'

// Create a project
const result = await projectRegistry.create({
  name: 'User Dashboard',
  description: 'Build user dashboard with analytics',
  owner: 'johan',
  organisationId: 'maturion_isms'
})

// List active projects
const { projects } = await projectRegistry.list({ status: 'active' })
```

### 2. Lifecycle (`lifecycle.ts`)

Manages phase transitions and project status.

**Phases:**
1. **Concept** - Initial ideation and requirements
2. **Architecture** - System design and technical planning
3. **Build** - Code implementation and QA
4. **Deployment** - Production release and validation
5. **Completed** - Successfully delivered
6. **Archived** - Historical record

**Key Functions:**
- `transitionToPhase()` - Move project to new phase
- `canTransitionToPhase()` - Validate phase transitions
- `pauseProject()` / `resumeProject()` - Pause/resume work
- `blockProject()` / `unblockProject()` - Manage blockers

**Example:**
```typescript
import { transitionToPhase } from '@/lib/foreman/projects'

// Transition to architecture phase
const result = transitionToPhase(project, 'architecture', 'johan')
if (result.success) {
  console.log(`Transitioned: ${result.previousPhase} → ${result.newPhase}`)
}
```

### 3. Milestones (`milestones.ts`)

Tracks progress through predefined and custom milestones.

**Default Milestones:**
- Concept: Project Registered, Requirements Defined, Concept Approved (3 milestones)
- Architecture: Analysis Complete, Modules Defined, Tasks Planned, QA Strategy (4 milestones)
- Build: Tasks Created, Tasks Executed, QA Passed, Compliance, PR Created, PR Merged (6 milestones)
- Deployment: Plan Created, Approved, Deployed, Tests Passed, Monitoring Active (5 milestones)

**Key Functions:**
- `markMilestoneComplete()` - Mark milestone complete
- `calculateWeightedProgress()` - Calculate progress %
- `getNextMilestone()` - Get next incomplete milestone
- `addCustomMilestone()` - Add custom milestones

**Example:**
```typescript
import { markMilestoneComplete, calculateWeightedProgress } from '@/lib/foreman/projects'

// Complete a milestone
markMilestoneComplete(project, 'm3', 'johan') // Concept Approved

// Calculate progress
const progress = calculateWeightedProgress(project)
console.log(`Overall: ${progress.overall}%`)
console.log(`Build phase: ${progress.byPhase.build}%`)
```

### 4. Storage (`storage.ts`)

Handles persistence to JSON files or Supabase.

**Storage Backends:**
- **JSON Files** (default): `data/projects/<project-id>.json`
- **Supabase** (optional): Requires `SUPABASE_URL` and `SUPABASE_KEY`

**Key Functions:**
- `saveProject()` - Persist project to storage
- `loadProject()` - Load project from storage
- `loadAllProjects()` - Load all projects
- `projectExists()` - Check if project exists

**Example:**
```typescript
import { saveProject, loadProject } from '@/lib/foreman/projects'

// Save project
await saveProject(project)

// Load project
const project = await loadProject('proj_123')
```

## Data Model

See `types/project.ts` for complete type definitions.

**Core Types:**
- `Project` - Main project record
- `Milestone` - Progress checkpoint
- `BuildRecord` - Build sequence history
- `DeploymentRecord` - Deployment history
- `Blocker` - Blocker/issue tracking

## Governance

The project lifecycle system is governed by:

- `foreman/governance/project-lifecycle-rules.md` - Lifecycle rules and behaviors
- `foreman/governance/milestone-rules.md` - Milestone tracking rules
- `foreman/governance/deployment-governance.md` - Deployment rules
- `foreman/governance/project-registry-model.md` - Data model specification

## Chat Commands

Projects are created and managed via chat commands:

```
# Create project
"Create a new project called User Dashboard"

# Query status
"Show me the status of User Dashboard"
"What is blocking progress?"

# Phase transitions
"Start the architecture phase for User Dashboard"
"Begin Wave 1 for User Dashboard"

# Deployment
"Prepare User Dashboard for deployment"
"Deploy User Dashboard to production"

# Dashboard
"Show me the project dashboard"
"List all active projects with progress %"
```

See `foreman/behaviours/chat-commands.md` for complete command grammar.

## Testing

Run the test suite:

```bash
npx tsx scripts/test-project-registry.ts
```

This validates:
- ✓ Registry initialization
- ✓ Project creation with metadata
- ✓ Milestone completion and progress calculation
- ✓ Phase transitions with validation
- ✓ Project queries (list, find by name)
- ✓ Custom milestones
- ✓ Dashboard data aggregation
- ✓ Project detail views
- ✓ Project archival

## Memory Storage

Each project maintains memory files in:

```
/foreman/projects/<project-slug>/
  ├── raw-concept.md           # Original concept from Johan
  ├── architecture-report.md   # Architecture analysis
  ├── build-logs/              # Build wave logs
  ├── qa-reports/              # QA validation reports
  └── deployment-logs/         # Deployment records
```

## Integration

The project lifecycle integrates with:

- **Chat Executor** - Commands create/update projects
- **Build Sequences** - Builds update project milestones
- **QA System** - QA results mark milestones complete
- **Dashboard UI** - Real-time project status display

## Philosophy

> "Foreman evolves from task executor to project supervisor—tracking every project's journey from concept to deployment with complete transparency."

The project lifecycle system enables:
1. **Visibility** - Real-time project status for all stakeholders
2. **Predictability** - Progress tracking enables accurate forecasting
3. **Accountability** - Clear milestones and phase gates
4. **Traceability** - Complete audit trail from concept to deployment
5. **Scalability** - Manage dozens of concurrent projects

## Future Enhancements

Planned improvements:
- Real-time WebSocket updates for dashboard
- Email/Slack notifications for milestone completions
- S-curve timeline visualizations
- Gantt chart generation
- Resource allocation tracking
- Cross-project dependency management
- Supabase storage backend implementation
