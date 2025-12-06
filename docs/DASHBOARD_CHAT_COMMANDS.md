# Dashboard Chat Commands - Usage Guide

## Overview

The Foreman chat interface now supports comprehensive dashboard commands that enable natural language queries for project lifecycle data. These commands provide access to:

- Project status and progress tracking
- Blocker analysis and management
- S-curve progress visualization
- Deployment readiness reports
- Phase and milestone analytics
- Memory context (when available)

All dashboard data is presented in both human-readable format (via chat) and structured JSON (via metadata) for maximum flexibility.

## Available Commands

### 1. High-Level Dashboard Overview

Get an overview of all active projects with summary statistics.

**Command Patterns:**
```
Show me the project dashboard
Show dashboard
List all active projects
What projects are active?
Project overview
```

**Response Includes:**
- Total project count
- Active projects count
- Overall progress percentage
- Projects grouped by phase
- Projects grouped by status
- Active projects list with progress
- Blocked projects (if any)
- Recent milestone completions

**Example:**
```
User: Show me the project dashboard

Foreman: 📊 Project Dashboard Overview

## Summary
- Total Projects: 3
- Active Projects: 3
- Overall Progress: 45%
- Blocked Projects: 1

## Projects by Phase
- Concept: 1 project(s)
- Build: 2 project(s)

## Active Projects
- 🟢 User Dashboard (build) - 67% complete
- 🟢 Authentication System (build) - 45% complete
- 🟢 Warranty PDF Builder (concept) - 10% complete

## 🚫 Blocked Projects
- User Dashboard - 2 active blocker(s)
```

---

### 2. Project-Specific Dashboard (Drill-Down)

Get detailed dashboard information for a specific project.

**Command Patterns:**
```
Show dashboard for [project name]
Show me [project name] dashboard
Drill down into [project name]
Open the dashboard for [project name]
Project detail for [project name]
```

**Response Includes:**
- Project status with governance-compliant status calculation
- Overall and phase-specific progress
- Milestone breakdown (completed, in progress, pending, blocked)
- Active blockers with severity and required actions
- Phase timeline with drift analysis
- S-curve progress summary
- Deployment readiness assessment
- Memory snapshots (when available)

**Example:**
```
User: Show dashboard for User Dashboard

Foreman: 📊 Dashboard: User Dashboard

## Status
**⚠️ At Risk**
_2 high-severity blocker(s) detected_

## Overall Progress
**67%** complete

### By Phase
- Concept: [██████████] 100%
- Architecture: [██████████] 100%
- Build: [████████░░] 80%

## Milestones
**Completed**: 12 | **In Progress**: 2 | **Pending**: 4 | **Blocked**: 0

### 🔄 In Progress
- **Code Review Automated** (Build)
- **QA Validation Passed** (Build)

## 🚫 Active Blockers
### 🟠 High Priority Blockers
- **Database schema migration pending**
  - Action: Review and resolve within 24 hours
  - Owner: johan

...
```

---

### 3. Blocker Summary

Query active blockers for a specific project.

**Command Patterns:**
```
Show blockers for [project name]
What's blocking [project name]?
List blockers
Show critical blockers for [project name]
What are the active blockers?
```

**Response Includes:**
- Active blocker count by severity
- Blocker descriptions
- Required actions
- Ownership assignments
- Resolution status

**Example:**
```
User: What's blocking User Dashboard?

Foreman: ## 🚫 Blockers Summary

**Active**: 2 | **Resolved**: 3

### 🟠 High Priority Blockers
- **Database schema migration pending**
  - Action: Review and resolve within 24 hours
  - Owner: johan

- **API rate limit exceeded**
  - Action: Review and resolve within 24 hours
```

---

### 4. S-Curve Progress Summary

View planned vs. actual progress over time.

**Command Patterns:**
```
Show S-curve for [project name]
Show progress timeline for [project name]
How is [project name] tracking against plan?
Show planned vs actual progress
```

**Response Includes:**
- Current actual vs. planned progress
- Variance analysis (ahead/behind/on track)
- Historical data points
- Timeline coverage

**Example:**
```
User: Show S-curve for User Dashboard

Foreman: ## S-Curve Progress

**Current**: 67% (Planned: 70%)
**Status**: ⏰ Behind plan by 3%

_Showing 15 data points from 2024-12-01 to 2024-12-06_
```

---

### 5. Deployment Readiness Report

Check if a project is ready for deployment.

**Command Patterns:**
```
Is [project name] ready to deploy?
Check deployment readiness for [project name]
Show deployment status for [project name]
Can we deploy [project name]?
Deployment readiness report for [project name]
```

**Response Includes:**
- Overall readiness status
- QA validation status
- Security compliance status
- Environment configuration status
- Last deployment information
- Blocking issues (if any)

**Example:**
```
User: Is User Dashboard ready to deploy?

Foreman: ## Deployment Readiness
**🚫 Not Ready**
_Critical checks failed - deployment blocked_

### Checks
- **QA**: ⏳ pending
  - QA validation in progress
- **Security**: ✅ passed
  - Compliance verified - no secrets detected
- **Environment**: ➖ not_applicable
  - Environment check not required for current phase
```

---

### 6. Phase and Milestone Analytics

Analyze milestone completion and phase progress.

**Command Patterns:**
```
Show milestones for [project name]
What phase is [project name] in?
Show phase progress for [project name]
List completed milestones for [project name]
What's the next milestone for [project name]?
```

**Response Includes:**
- Current phase
- Phase-specific progress
- Milestone counts by status
- In-progress milestones
- Blocked milestones
- Phase timeline with drift

**Example:**
```
User: What's the next milestone for User Dashboard?

Foreman: 📊 User Dashboard

## 🎯 Next Milestone
**QA Validation Passed** (Build)
- Criteria: All QA checks must pass
- Dependencies: Code Review Automated

## Phase Timeline
- ✅ Concept: Completed
  - Started: 12/1/2024
  - Completed: 12/1/2024
- ✅ Architecture: Completed
  - Started: 12/2/2024
  - Completed: 12/3/2024
- 🔄 Build: In Progress
  - Started: 12/3/2024
  - ⏰ Drift: +5%
```

---

### 7. Status Explanation

Get context on why a project has a specific status.

**Command Patterns:**
```
Why is [project name] at risk?
Explain the status of [project name]
Why is [project name] blocked?
What does 'at_risk' mean for [project name]?
Status explanation for [project name]
```

**Response Includes:**
- Status classification (on_track, at_risk, blocked, critical)
- Governance rule that determined the status
- Contributing factors
- Project details

**Example:**
```
User: Why is User Dashboard at risk?

Foreman: ## Status
**⚠️ At Risk**
_2 high-severity blocker(s) detected_

The project is classified as 'at_risk' because:
- Multiple high-severity blockers are present
- Timeline drift is within acceptable range (5%)
- No critical blockers are blocking progress

According to governance rules, a project is 'at_risk' when:
- 1+ medium/high severity blockers present
- Timeline drift < 20%
- Recoverable delays
```

---

### 8. Memory Context (Phase 1 - Stub)

Query project memory and context (when Memory Fabric is fully integrated).

**Command Patterns:**
```
Show memory for [project name]
What does the memory say about [project name]?
Retrieve project context for [project name]
Show recent memory entries for [project name]
```

**Current Status:**
Memory integration is in Phase 1 (stub implementation). The dashboard will return empty memory snapshots until the Unified Memory Fabric is fully integrated.

**Example:**
```
User: Show memory for User Dashboard

Foreman: ## 🧠 Memory Snapshots

_No memory snapshots available (Memory Fabric Phase 1)_

Note: Memory integration is planned for future implementation. 
Once available, this will show relevant project context, decisions, 
and historical patterns.
```

---

## Status Codes and Meanings

### Dashboard Status

| Status | Icon | Meaning | Governance Rule |
|--------|------|---------|----------------|
| `on_track` | ✅ | Milestones ≥ planned, no critical blockers | Default healthy state |
| `at_risk` | ⚠️ | 1+ medium/high blockers, drift < 20% | Requires attention |
| `blocked` | 🚫 | Any critical blocker or drift ≥ 20% | Cannot proceed |
| `critical` | 🔴 | Phase duration exceeded by > 40%, multiple milestone failures, or failed QA | Escalation required |

### Deployment Readiness

| Status | Icon | Meaning |
|--------|------|---------|
| `ready` | ✅ | All checks passed, ready to deploy |
| `not_ready` | 🚫 | Critical checks failed, deployment blocked |
| `warning` | ⚠️ | Some warnings present, review before deploying |
| `unknown` | ❓ | Status cannot be determined |

### Milestone Status

| Status | Meaning |
|--------|---------|
| `completed` | Milestone finished |
| `in_progress` | Currently being worked on |
| `pending` | Not yet started |
| `blocked` | Cannot proceed due to blockers or dependencies |

---

## Integration with Autonomy

Dashboard commands operate under **Autonomy Class A1** with `autonomyIntent: execute`:

- ✅ Dashboard queries are always safe to execute
- ✅ No approval required for read-only operations
- ✅ Data is sourced from persistent project storage
- ✅ All responses are governance-compliant
- ✅ Audit trail maintained for all queries

Dashboard commands do NOT modify project state - they only retrieve and format data.

---

## Response Format

Dashboard commands return data in two formats:

### 1. Human-Readable (Chat)

Formatted markdown with:
- Headers and sections
- Icons for visual clarity
- Progress bars
- Severity indicators
- Timestamps

### 2. Structured JSON (Metadata)

Complete dashboard data structure available in `statusUpdates[].metadata`:

```typescript
{
  projectId: string
  view: 'overview' | 'detail'
  detail?: ProjectDetailView
  dashboard?: ProjectDashboardData
  dashboardResponse?: DashboardResponse
}
```

This dual format enables:
- Natural conversation in chat
- Programmatic access for UI/automation
- Full context preservation

---

## Examples in Context

### Scenario: Check Project Health Before Deployment

```
User: Is User Dashboard ready to deploy?

Foreman: [Deployment readiness report showing QA pending]

User: What's blocking the QA?

Foreman: [Blocker summary showing database migration blocker]

User: Show me the full dashboard

Foreman: [Complete dashboard with all sections]
```

### Scenario: Monitor Overall Portfolio

```
User: Show me the project dashboard

Foreman: [Overview showing 3 active projects, 1 blocked]

User: Why is User Dashboard at risk?

Foreman: [Status explanation with blocker details]

User: Show blockers for User Dashboard

Foreman: [Detailed blocker list with severity and actions]
```

---

## Technical Notes

### Data Sources

Dashboard data is aggregated from:
- Project Registry (persistent JSON storage)
- Lifecycle State Machine
- Milestone tracking system
- Build history
- Deployment records
- Blocker database
- Memory Fabric (Phase 1 stub)

### Performance

- Dashboard generation: < 50ms for typical project
- Caching: Project registry maintains in-memory cache
- API endpoints: Available at `/api/foreman/projects/[id]/dashboard`

### Extensibility

The dashboard system is designed to be extended with:
- Custom metrics
- Additional visualizations
- Integration with external monitoring
- Real-time updates
- Memory-driven insights (when Memory Fabric is fully integrated)

---

## See Also

- [Dashboard API Specification](../docs/DASHBOARD_SPEC.md)
- [Project Lifecycle Rules](../foreman/governance/project-lifecycle-rules.md)
- [Chat Commands Grammar](../foreman/behaviours/chat-commands.md)
- [Autonomy Rules](../foreman/autonomy-rules.md)

---

**Last Updated:** 2024-12-06  
**Version:** 1.0  
**Status:** ✅ Implemented and Tested
