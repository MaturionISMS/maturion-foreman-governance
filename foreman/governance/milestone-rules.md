# Milestone Rules

## Overview

Milestones are the checkpoints that measure project progress through the lifecycle. They provide concrete, measurable markers of completion and enable accurate progress tracking.

## Milestone Philosophy

**Milestones are the heartbeat of project tracking.**

- They provide visibility into progress
- They enable predictable delivery
- They identify blockers early
- They celebrate achievements
- They guide decision-making

## Core Principles

### 1. Milestones Must Be Measurable

**Rule**: Every milestone MUST have clear completion criteria

**Good Milestones**:
- ✅ "Architecture documentation complete and reviewed"
- ✅ "All QA tests passing"
- ✅ "PR merged to main branch"
- ✅ "Deployed to production and verified"

**Bad Milestones**:
- ❌ "Making good progress"
- ❌ "Almost done"
- ❌ "Working on it"
- ❌ "Getting close"

**Enforcement**: Milestones without clear completion criteria are rejected

### 2. Milestones Must Be Phase-Aligned

**Rule**: Milestones MUST belong to a specific lifecycle phase

**Phase Assignment**:
- Concept phase milestones
- Architecture phase milestones
- Build phase milestones
- Deployment phase milestones

**Validation**: Cannot mark milestone complete if not in correct phase

### 3. Milestones Must Be Sequential Within Phase

**Rule**: Some milestones depend on others and must complete in order

**Example**:
```
Build Phase:
1. "Builder tasks created" → Must complete before #2
2. "Builder tasks executed" → Must complete before #3
3. "QA validation passed" → Must complete before #4
4. "PR created" → Must complete before #5
5. "PR merged"
```

**Enforcement**: Cannot skip dependent milestones

### 4. Progress Calculation Must Be Accurate

**Rule**: Progress percentage calculated from milestone completion status

**Formula**:
```
Progress % = (Completed Milestones / Total Milestones) × 100
```

**Weighted Progress** (Optional):
```
Progress % = Σ(Milestone Weight × Completion) / Σ(Milestone Weight)
```

**Rounding**: Always round down to nearest integer

## Default Milestones by Phase

### Concept Phase Milestones

**M1: Project Registered**
- Criteria: Project exists in registry with unique ID
- Weight: 10%
- Auto-completed: Yes (on project creation)

**M2: Requirements Defined**
- Criteria: Project description and scope documented
- Weight: 20%
- Auto-completed: No (requires manual confirmation)

**M3: Concept Approved**
- Criteria: Stakeholder approval recorded
- Weight: 70%
- Auto-completed: No (requires admin approval)

**Total Concept Phase**: 3 milestones, 100% weight

### Architecture Phase Milestones

**M4: Architecture Analysis Complete**
- Criteria: Architecture gaps identified and documented
- Weight: 30%
- Auto-completed: Yes (when architecture analysis finishes)

**M5: Module Breakdown Defined**
- Criteria: Modules and components specified
- Weight: 30%
- Auto-completed: Yes (when module plan created)

**M6: Build Tasks Planned**
- Criteria: Builder tasks generated and approved
- Weight: 30%
- Auto-completed: Yes (when tasks dispatched)

**M7: QA Strategy Defined**
- Criteria: QA requirements and test plan documented
- Weight: 10%
- Auto-completed: Yes (when QA plan generated)

**Total Architecture Phase**: 4 milestones, 100% weight

### Build Phase Milestones

**M8: Builder Tasks Created**
- Criteria: All tasks dispatched to builders
- Weight: 10%
- Auto-completed: Yes (when tasks sent)

**M9: Builder Tasks Executed**
- Criteria: All builder tasks completed successfully
- Weight: 30%
- Auto-completed: Yes (when all tasks finish)

**M10: QA Validation Passed**
- Criteria: QA and QA-of-QA checks pass
- Weight: 30%
- Auto-completed: Yes (when QA gates pass)

**M11: Compliance Verified**
- Criteria: No secrets, audit logs complete, org ID present
- Weight: 10%
- Auto-completed: Yes (when compliance checks pass)

**M12: PR Created**
- Criteria: Pull request created with all artifacts
- Weight: 10%
- Auto-completed: Yes (when PR opened)

**M13: PR Reviewed and Merged**
- Criteria: PR approved and merged to main branch
- Weight: 10%
- Auto-completed: No (GitHub merge event triggers)

**Total Build Phase**: 6 milestones, 100% weight

### Deployment Phase Milestones

**M14: Deployment Plan Created**
- Criteria: Deployment checklist and plan documented
- Weight: 20%
- Auto-completed: No (requires manual creation)

**M15: Deployment Approved**
- Criteria: Admin approves deployment to production
- Weight: 20%
- Auto-completed: No (requires admin approval)

**M16: Deployed to Production**
- Criteria: Code deployed and services running
- Weight: 30%
- Auto-completed: No (deployment event triggers)

**M17: Post-Deploy Tests Passed**
- Criteria: Smoke tests and health checks pass
- Weight: 20%
- Auto-completed: Yes (when tests complete)

**M18: Monitoring Active**
- Criteria: Application monitoring and alerts configured
- Weight: 10%
- Auto-completed: No (requires manual verification)

**Total Deployment Phase**: 5 milestones, 100% weight

## Custom Milestones

### Adding Custom Milestones

**Rule**: Projects can add custom milestones beyond defaults

**Requirements**:
- Must have clear name
- Must specify phase
- Must define completion criteria
- Must assign weight (or use default 10%)
- Must not conflict with default milestones

**Example**:
```json
{
  "id": "custom_1",
  "name": "User Acceptance Testing Complete",
  "phase": "deployment",
  "completionCriteria": "UAT sign-off received from stakeholders",
  "weight": 15,
  "completed": false,
  "custom": true
}
```

**Limits**:
- Maximum 20 custom milestones per project
- Total weight per phase must not exceed 200%

### Removing Default Milestones

**Rule**: Default milestones can be marked "not applicable"

**Conditions**:
- Only if milestone genuinely not needed
- Must provide justification
- Cannot remove critical milestones

**Critical Milestones** (Cannot Remove):
- "Project Registered"
- "Builder Tasks Executed"
- "QA Validation Passed"
- "Deployed to Production"

## Milestone Completion

### Auto-Completion

**Rule**: System automatically marks milestones complete when criteria met

**Auto-Completed Milestones**:
- Architecture analysis complete → M4
- Build tasks executed → M9
- QA passed → M10
- PR created → M12

**Implementation**:
```typescript
function markMilestoneComplete(projectId: string, milestoneId: string) {
  const project = getProject(projectId)
  const milestone = project.milestones.find(m => m.id === milestoneId)
  
  if (milestone && !milestone.completed) {
    milestone.completed = true
    milestone.completedAt = new Date().toISOString()
    updateProjectProgress(project)
    saveProject(project)
    logMilestoneCompletion(project, milestone)
  }
}
```

### Manual Completion

**Rule**: Some milestones require explicit admin action to mark complete

**Manual Milestones**:
- Concept approved → M3
- Requirements defined → M2
- Deployment plan created → M14
- Deployment approved → M15

**Chat Command**:
```
set milestone "User Dashboard" "Concept Approved"
```

**API Call**:
```json
POST /api/foreman/projects/milestone
{
  "projectId": "proj_abc123",
  "milestoneId": "m3",
  "completed": true,
  "completedBy": "admin_johan"
}
```

### Validation on Completion

**Rule**: Milestone completion must be validated before marking complete

**Validation Checks**:
1. Milestone exists in project
2. Project is in correct phase for milestone
3. Prerequisite milestones are complete (if any)
4. Completion criteria truly met
5. User has authority to mark complete

**Failure Handling**: Rejection with clear error message

## Progress Calculation

### Simple Progress (Default)

```typescript
function calculateProgress(project: Project): number {
  const total = project.milestones.length
  const completed = project.milestones.filter(m => m.completed).length
  return Math.floor((completed / total) * 100)
}
```

### Weighted Progress (Advanced)

```typescript
function calculateWeightedProgress(project: Project): number {
  const totalWeight = project.milestones.reduce((sum, m) => sum + (m.weight || 10), 0)
  const completedWeight = project.milestones
    .filter(m => m.completed)
    .reduce((sum, m) => sum + (m.weight || 10), 0)
  return Math.floor((completedWeight / totalWeight) * 100)
}
```

### Phase Progress

```typescript
function calculatePhaseProgress(project: Project, phase: string): number {
  const phaseMilestones = project.milestones.filter(m => m.phase === phase)
  const completed = phaseMilestones.filter(m => m.completed).length
  return Math.floor((completed / phaseMilestones.length) * 100)
}
```

## Milestone Reporting

### Dashboard Display

**Required Information**:
- Milestone name
- Phase
- Completion status (✅ / ⏳)
- Completion date (if complete)
- Completion criteria
- Weight (if weighted progress)

**Example Display**:
```
Build Phase Progress: 67% (4/6 milestones)

✅ Builder Tasks Created (Completed: 2024-01-15 10:00)
✅ Builder Tasks Executed (Completed: 2024-01-15 14:30)
✅ QA Validation Passed (Completed: 2024-01-15 15:00)
✅ Compliance Verified (Completed: 2024-01-15 15:05)
⏳ PR Created (In progress)
⏳ PR Reviewed and Merged (Blocked: waiting for PR)
```

### Milestone History

**Rule**: All milestone completions logged with timestamp and actor

**Log Entry**:
```json
{
  "event": "milestone_completed",
  "projectId": "proj_abc123",
  "milestoneId": "m10",
  "milestoneName": "QA Validation Passed",
  "completedAt": "2024-01-15T15:00:00Z",
  "completedBy": "system_auto",
  "phase": "build"
}
```

**Retention**: Permanent (stored in project history)

## Milestone Notifications

### Completion Notifications

**Rule**: Notify stakeholders when key milestones complete

**Notification Triggers**:
- Phase completion (all milestones in phase done)
- Critical milestone completion
- Custom milestone completion (if configured)

**Notification Channels**:
- Dashboard UI (in-app notification)
- Email (if configured)
- Slack/Teams (if integrated)

**Example**:
```
🎉 Milestone Complete: "QA Validation Passed"
Project: User Dashboard
Phase: Build (67% complete)
Next: Create PR
```

### Overdue Notifications

**Rule**: Warn if milestone significantly delayed

**Threshold**: Milestone > 7 days overdue from estimated completion

**Warning Message**:
```
⚠️ Milestone Overdue: "PR Reviewed and Merged"
Project: User Dashboard
Estimated: 2024-01-15
Current: 2024-01-23 (8 days overdue)
Action: Review blockers and escalate if needed
```

## Milestone Best Practices

### 1. Keep Milestones Granular

**Guideline**: Each milestone should represent 1-2 days of work

**Rationale**: Frequent completions maintain momentum and provide visibility

**Anti-pattern**: "Implement entire dashboard" (too broad)

**Better**: "Dashboard UI component created", "Dashboard API integrated", "Dashboard tests passing"

### 2. Celebrate Completions

**Guideline**: Acknowledge and celebrate milestone achievements

**Actions**:
- Dashboard notification
- Progress bar update
- Team notification (if configured)

**Rationale**: Positive reinforcement maintains motivation

### 3. Review Blocked Milestones Daily

**Guideline**: Identify and resolve blockers quickly

**Process**:
- Daily automated scan for stalled milestones
- Escalate blockers > 3 days old
- Admin review and remediation

**Outcome**: Maintain project velocity

### 4. Adjust Estimates Based on Reality

**Guideline**: Update milestone estimates as project progresses

**When**: Mid-project and at phase transitions

**Method**: Compare actual vs. estimated completion times, adjust remaining milestones

**Rationale**: Improve predictability and manage expectations

## Integration with Other Systems

### Build Sequence Integration

**Rule**: Build milestones auto-update from build sequence events

**Events → Milestones**:
- `build_sequence_started` → "Builder Tasks Created" complete
- `build_sequence_completed` → "Builder Tasks Executed" complete
- `qa_validation_passed` → "QA Validation Passed" complete
- `pr_created` → "PR Created" complete
- `pr_merged` → "PR Reviewed and Merged" complete

### Chat Command Integration

**Commands**:
- `project status [name]` → Display milestones
- `set milestone [project] [milestone]` → Mark complete
- `list milestones [project]` → Show all milestones
- `add milestone [project] [name] [phase]` → Create custom milestone

### Dashboard Integration

**Requirements**:
- Display milestone progress on project detail page
- Show phase progress bars
- Highlight next milestone
- Show overdue milestones in red

## Error Handling

### Invalid Milestone Completion

**Error**: Attempt to complete milestone out of order

**Response**:
```
❌ Cannot complete milestone "QA Validation Passed"
Prerequisite milestone "Builder Tasks Executed" is not yet complete.
Current Progress: 2/6 milestones
Next Milestone: "Builder Tasks Executed"
```

### Missing Milestone Data

**Error**: Milestone definition incomplete

**Response**:
- Log warning
- Use default values (name, 10% weight, no dependencies)
- Continue with degraded functionality
- Notify admin to fix milestone definition

## Philosophy

**Milestones are promises—to stakeholders, to the team, and to ourselves.**

They provide:
1. **Clarity**: Everyone knows what "done" means
2. **Accountability**: Commitments are explicit and tracked
3. **Momentum**: Frequent wins maintain energy
4. **Predictability**: Progress enables forecasting
5. **Transparency**: Status is always visible and honest

**Goal**: Enable anyone to ask "How's the project going?" and get a truthful, data-driven answer in seconds.

---

*This document defines the rules, behaviors, and constraints for milestone tracking in Foreman's Project Lifecycle system.*
