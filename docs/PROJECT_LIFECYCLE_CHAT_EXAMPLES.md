# Project Lifecycle Chat Commands - Examples and Flows

This document demonstrates how to use chat commands to manage projects through the Foreman Project Lifecycle Orchestration system.

## Overview

Foreman now supports managing complete project lifecycles through chat commands. These commands integrate with:
- **Project Registry**: Persistent storage of project state
- **Unified Memory Fabric**: Historical tracking of all lifecycle events
- **Governance Rules**: Automated enforcement of phase transitions and milestone dependencies

## Command Categories

### 1. Project Creation & Registration

#### Create a New Project
**User**: "Create a new project called User Dashboard"

**Foreman Response**: 
```
Project created successfully: User Dashboard
- Project ID: proj_1234567890_abc123
- Phase: Concept
- Progress: 7%
- Status: Active
```

**Memory Entry Created**:
```json
{
  "type": "project_state_transition",
  "scope": "project",
  "description": "Project created: User Dashboard",
  "projectId": "proj_1234567890_abc123",
  "timestamp": "2025-12-06T13:00:00Z"
}
```

**Registry Changes**:
- New project record created
- Milestone "m1: Project Registered" marked complete
- Memory path initialized: `/foreman/projects/user-dashboard/`

---

### 2. Project State Queries

#### Get Project Status
**User**: "Show me the status of User Dashboard"

**Foreman Response**:
```
Project Status: User Dashboard
- Phase: Concept (Phase 1)
- Status: Active
- Progress: 30%
- Next Milestone: Concept Approved
- Blockers: None
- Completed Milestones: 2/18
```

**Data Source**: 
- Retrieved from project registry
- No memory writes (read-only operation)

---

#### Get Project Dashboard
**User**: "Show me the project dashboard"

**Foreman Response**:
```
Project Dashboard Overview:
- Total Projects: 5
- Active Projects: 3
- Blocked Projects: 1

Projects by Phase:
  - Concept: 1
  - Architecture: 1
  - Build: 2
  - Deployment: 1
  
Overall Progress: 62%

Recent Completions:
  - User Dashboard: Requirements Defined (2025-12-06)
  - Auth System: Architecture Complete (2025-12-05)
```

**Data Source**:
- Aggregated from all projects in registry
- Recent activity from memory entries

---

### 3. Phase Transitions

#### Start Architecture Phase
**User**: "Start the architecture phase for User Dashboard"

**Foreman Response** (Success):
```
Phase transition: Concept → Architecture
- Prerequisites met ✓
- Updated milestones: m1, m2, m3
- New phase: Architecture
```

**Foreman Response** (Failure - Prerequisites Not Met):
```
❌ Phase transition failed: Concept → Architecture
Prerequisites not met:
  - Concept must be approved (milestone m3)
  
Current Progress: 30% (2/3 concept milestones)
```

**Memory Entry Created** (on success):
```json
{
  "type": "project_state_transition",
  "scope": "project",
  "description": "Phase transition: concept → architecture",
  "projectId": "proj_1234567890_abc123",
  "previousPhase": "concept",
  "newPhase": "architecture",
  "timestamp": "2025-12-06T14:00:00Z"
}
```

**Governance Rule Applied**:
- Phase transition validated against `project-lifecycle-rules.md`
- Prerequisite milestones checked
- Transition logged to audit trail

---

### 4. Milestone Management

#### Complete a Milestone
**User**: "Mark Requirements Defined complete for User Dashboard"

**Foreman Response**:
```
✓ Milestone completed: Requirements Defined
- Project: User Dashboard
- Phase: Concept
- Weight: 20
- Progress updated: 7% → 30%
```

**Memory Entry Created**:
```json
{
  "type": "milestone_completion",
  "scope": "project",
  "description": "Completed milestone: Requirements Defined",
  "projectId": "proj_1234567890_abc123",
  "milestoneId": "m2",
  "phase": "concept",
  "completedBy": "johan",
  "timestamp": "2025-12-06T15:00:00Z"
}
```

**Registry Changes**:
- Milestone `m2` marked complete
- `completedAt` timestamp recorded
- `completedBy` set to user
- Overall progress recalculated (weighted)

**Governance Checks**:
- Dependencies validated (per `milestone-rules.md`)
- Phase alignment verified

---

### 5. Blocker Management

#### Record a Blocker
**User**: "Record blocker: Waiting for API specification approval"

**Foreman Response**:
```
Blocker recorded: Waiting for API specification approval
- Severity: Medium
- Category: Approval
- Project status changed: Active → Blocked
```

**Memory Entry Created**:
```json
{
  "type": "error_escalation",
  "scope": "project",
  "description": "Blocker added: Waiting for API specification approval",
  "projectId": "proj_1234567890_abc123",
  "category": "approval",
  "severity": "medium",
  "timestamp": "2025-12-06T16:00:00Z"
}
```

**Registry Changes**:
- New blocker added to `project.blockers[]`
- Project status changed to "blocked"
- `updatedAt` timestamp updated

---

### 6. Build Wave Integration

#### Run Build Wave
**User**: "Begin Wave 1 for User Dashboard"

**Foreman Response**:
```
Build Wave 1 started
- Phase validated: Build ✓
- Builders dispatched: 3
- QA gate: Enabled
- Compliance checks: Enabled

Status: Running...
```

**Memory Entries Created**:
1. **Build Start**:
```json
{
  "type": "wave_completion",
  "scope": "foreman",
  "description": "Build wave started: Wave 1",
  "projectId": "proj_1234567890_abc123",
  "waveNumber": 1,
  "status": "started"
}
```

2. **Build Complete**:
```json
{
  "type": "wave_completion",
  "scope": "foreman",
  "description": "Build wave completed: Wave 1",
  "projectId": "proj_1234567890_abc123",
  "waveNumber": 1,
  "status": "completed",
  "prUrl": "https://github.com/org/repo/pull/123"
}
```

**Registry Changes**:
- Build record added to `project.builds[]`
- Milestones "m8", "m9" marked complete
- Phase auto-advanced if all build milestones done

---

### 7. Deployment Commands

#### Prepare for Deployment
**User**: "Prepare User Dashboard for deployment"

**Foreman Response**:
```
Deployment Readiness Check:
- QA Status: ✓ Passed
- Security Status: ✓ Passed
- Environment: ✓ Ready
- Prerequisites: ✓ All met

Awaiting deployment approval...
```

**Governance Check**:
- Validates against `deployment-governance.md`
- Ensures milestones m13 (PR Merged) is complete
- Checks all build phase milestones

---

#### Deploy to Production
**User**: "Deploy User Dashboard to production"

**Foreman Response**:
```
⚠️ Deployment requires approval
This is a high-risk operation.

Checklist:
- [✓] All tests passing
- [✓] Security scan clean
- [✓] Database migrations ready
- [✓] Rollback plan documented
- [ ] Admin approval required

Action: PROPOSAL_ONLY
```

**Memory Entry** (after approval):
```json
{
  "type": "deployment",
  "scope": "project",
  "description": "Deployment to production",
  "projectId": "proj_1234567890_abc123",
  "environment": "production",
  "deploymentId": "dep_1234567890",
  "status": "completed",
  "timestamp": "2025-12-06T18:00:00Z"
}
```

---

## Complete Lifecycle Flow Example

Here's a complete example of managing a project from concept to deployment:

### Step 1: Create Project
```
User: "Create a new project called Authentication System"
Foreman: ✓ Project created (proj_auth_001)
```

### Step 2: Define Requirements
```
User: "Mark Requirements Defined complete for Authentication System"
Foreman: ✓ Milestone completed (Progress: 30%)
```

### Step 3: Approve Concept
```
User: "Mark Concept Approved complete for Authentication System"
Foreman: ✓ Milestone completed (Progress: 100% for concept phase)
```

### Step 4: Transition to Architecture
```
User: "Start the architecture phase for Authentication System"
Foreman: ✓ Phase transition: Concept → Architecture
```

### Step 5: Complete Architecture
```
User: "Mark Architecture Analysis Complete for Authentication System"
Foreman: ✓ Milestone completed
User: "Mark Module Breakdown Defined complete"
Foreman: ✓ Milestone completed
User: "Mark Build Tasks Planned complete"
Foreman: ✓ Milestone completed
```

### Step 6: Transition to Build
```
User: "Start the build phase for Authentication System"
Foreman: ✓ Phase transition: Architecture → Build
```

### Step 7: Run Build Wave
```
User: "Begin Wave 1 for Authentication System"
Foreman: ✓ Build wave started
  ... (build executes) ...
Foreman: ✓ Build wave completed (PR: #123)
```

### Step 8: QA Validation
```
User: "Run QA on Authentication System"
Foreman: ✓ QA validation passed
Foreman: ✓ Milestones m10, m11 auto-completed
```

### Step 9: Merge PR
```
User: "Mark PR Reviewed and Merged complete"
Foreman: ✓ Milestone completed (Build phase 100%)
```

### Step 10: Transition to Deployment
```
User: "Start the deployment phase for Authentication System"
Foreman: ✓ Phase transition: Build → Deployment
```

### Step 11: Deploy
```
User: "Deploy Authentication System to production"
Foreman: ⚠️ Deployment requires approval
  ... (after approval) ...
Foreman: ✓ Deployed to production
Foreman: ✓ Post-deploy tests passed
Foreman: ✓ Monitoring active
```

### Step 12: Complete Project
```
User: "Mark Authentication System as completed"
Foreman: ✓ Phase transition: Deployment → Completed
Foreman: 🎉 Project delivered successfully!
```

---

## Memory Integration Details

### Memory Scopes

1. **Global Scope**: System-wide decisions
   - Architecture patterns
   - Governance changes
   
2. **Foreman Scope**: Orchestration events
   - Build wave completions
   - QA failures
   - Builder performance
   
3. **Project Scope**: Project-specific events
   - Phase transitions
   - Milestone completions
   - Blockers
   - Deployments

### Memory Query Examples

#### Find all phase transitions for a project
```typescript
const memories = await queryMemoryByTags(
  'project',
  ['project_state_transition'],
  { projectId: 'proj_1234567890_abc123' }
)
```

#### Find recent milestone completions
```typescript
const memories = await queryMemoryByTags(
  'project',
  ['milestone_completion'],
  { projectId: 'proj_1234567890_abc123' }
)
```

#### Find all blockers for a project
```typescript
const memories = await queryMemoryByTags(
  'project',
  ['error_escalation'],
  { projectId: 'proj_1234567890_abc123' }
)
```

---

## Governance Rules Enforcement

### Phase Transition Rules

Per `project-lifecycle-rules.md`:

- **Concept → Architecture**: Requires milestone m3 (Concept Approved)
- **Architecture → Build**: Requires milestones m4, m5, m6
- **Build → Deployment**: Requires milestones m10, m11, m13
- **Deployment → Completed**: Requires milestones m16, m17, m18

### Milestone Dependency Rules

Per `milestone-rules.md`:

- Milestone dependencies are validated before completion
- Example: m9 (Builder Tasks Executed) requires m8 (Builder Tasks Created)

### Deployment Governance

Per `deployment-governance.md`:

- Production deployments require admin approval
- All security checks must pass
- Post-deploy validation required

---

## Anti-Hallucination Features

Foreman **never** creates phantom data. All responses are derived from:

1. **Project Registry**: Persistent storage of project state
2. **Unified Memory**: Historical event log
3. **Governance Rules**: Defined transition logic

**Examples of what Foreman WON'T do**:
- ❌ Assume a phase transition without checking prerequisites
- ❌ Mark milestones complete without validation
- ❌ Generate fake progress percentages
- ❌ Invent blockers or deployment statuses
- ❌ Create projects that don't exist in registry

**What Foreman WILL do**:
- ✅ Explicitly list unmet prerequisites
- ✅ Show actual progress from milestone weights
- ✅ Reference memory entries for historical context
- ✅ Link to real PRs and deployment records
- ✅ Query registry for real-time status

---

## Integration with UI Dashboard

All data returned by chat commands is structured for dashboard visualization:

### Status Endpoint
```
GET /api/foreman/projects/{id}/status
```
Returns: ProjectDetailView with next milestone, blockers, recent activity

### Dashboard Endpoint
```
GET /api/foreman/projects/{id}/dashboard
```
Returns: DashboardResponse with S-curve data, deployment readiness, memory snapshots

### Example Dashboard Data
```json
{
  "projectId": "proj_1234567890_abc123",
  "projectName": "User Dashboard",
  "overallProgress": 62,
  "status": "on_track",
  "milestones": [...],
  "blockers": [...],
  "phaseTimeline": [...],
  "sCurveData": [...],
  "deploymentReadiness": {
    "overall": "ready",
    "qaStatus": "passed",
    "securityStatus": "passed",
    "environmentStatus": "ready"
  },
  "memorySnapshots": [...]
}
```

---

## Summary

The Project Lifecycle Orchestration system is now fully wired into:

✅ **Foreman Chat**: All lifecycle commands available via natural language
✅ **Unified Memory**: All major events logged with proper scoping
✅ **Governance Rules**: Automated enforcement of phase transitions and prerequisites
✅ **Dashboard Support**: Real-time status and historical data
✅ **No Hallucination**: All data sourced from registry + memory only

This creates a complete, auditable, and governed project management system within the Maturion ISMS platform.
