# Dashboard API Specification

## Overview

The Dashboard API provides consolidated project lifecycle data in a structured, machine-readable format. It aggregates information from:

- Lifecycle state tracking
- Milestone progress
- Blockers and issues
- Deployment readiness
- Timeline drift analysis
- S-curve progress visualization
- Memory insights (when available)

This API serves as the data layer for:

- Foreman App UI
- Project management views
- Automated reporting
- Deployment readiness summaries

## Version

**v1.0** - Initial Implementation

## API Endpoints

### 1. GET /api/foreman/projects/[id]/dashboard

Returns complete dashboard data for a project.

**Parameters:**
- `id` (path) - Project ID (required)

**Response:**

```json
{
  "projectId": "proj_1234567890_abc123",
  "projectName": "User Dashboard",
  "overallProgress": 67,
  "phaseProgress": {
    "concept": 100,
    "architecture": 100,
    "build": 67,
    "deployment": 0,
    "completed": 0,
    "archived": 0
  },
  "status": "at_risk",
  "statusNote": "2 high-severity blocker(s) detected",
  "milestones": [
    {
      "id": "m1",
      "name": "Project Registered",
      "phase": "concept",
      "weight": 10,
      "status": "completed",
      "completedAt": "2024-12-01T10:00:00.000Z",
      "blockers": [],
      "evidence": null
    }
  ],
  "blockers": [
    {
      "id": "blocker_123",
      "description": "Database schema migration pending",
      "severity": "high",
      "owner": "johan",
      "requiredAction": "Review and resolve within 24 hours",
      "createdAt": "2024-12-05T14:30:00.000Z"
    }
  ],
  "phaseTimeline": [
    {
      "phase": "concept",
      "actualStart": "2024-12-01T10:00:00.000Z",
      "actualEnd": "2024-12-01T11:00:00.000Z",
      "status": "completed",
      "driftPercentage": 0
    },
    {
      "phase": "build",
      "actualStart": "2024-12-02T09:00:00.000Z",
      "status": "in_progress",
      "driftPercentage": 0
    }
  ],
  "sCurveData": [
    {
      "date": "2024-12-01",
      "plannedProgress": 10,
      "actualProgress": 15
    },
    {
      "date": "2024-12-02",
      "plannedProgress": 25,
      "actualProgress": 30
    }
  ],
  "deploymentReadiness": {
    "overall": "not_ready",
    "qaStatus": {
      "status": "pending",
      "details": "QA validation in progress"
    },
    "securityStatus": {
      "status": "pending",
      "details": "Security compliance pending verification"
    },
    "environmentStatus": {
      "status": "not_applicable",
      "details": "Environment check not required for current phase"
    },
    "note": "Critical checks failed - deployment blocked"
  },
  "memorySnapshots": [],
  "lastUpdated": "2024-12-06T12:00:00.000Z"
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid project ID
- `404` - Project not found
- `500` - Server error

---

### 2. GET /api/foreman/projects/[id]/s-curve

Returns S-curve time series data for UI graphing.

**Parameters:**
- `id` (path) - Project ID (required)

**Response:**

```json
{
  "projectId": "proj_1234567890_abc123",
  "projectName": "User Dashboard",
  "data": [
    {
      "date": "2024-12-01",
      "plannedProgress": 10,
      "actualProgress": 15
    },
    {
      "date": "2024-12-08",
      "plannedProgress": 35,
      "actualProgress": 40
    },
    {
      "date": "2024-12-15",
      "plannedProgress": 65,
      "actualProgress": 67
    }
  ]
}
```

**Usage:**

This endpoint is optimized for graphing libraries. The data includes both planned (ideal S-curve) and actual progress over time.

**Status Codes:**
- `200` - Success
- `400` - Invalid project ID
- `404` - Project not found
- `500` - Server error

---

### 3. GET /api/foreman/projects/[id]/blockers

Returns blocker list with severity indicators and summary statistics.

**Parameters:**
- `id` (path) - Project ID (required)

**Response:**

```json
{
  "projectId": "proj_1234567890_abc123",
  "projectName": "User Dashboard",
  "blockers": [
    {
      "id": "blocker_123",
      "description": "Database schema migration pending",
      "severity": "high",
      "owner": "johan",
      "requiredAction": "Review and resolve within 24 hours",
      "createdAt": "2024-12-05T14:30:00.000Z"
    },
    {
      "id": "blocker_456",
      "description": "API rate limit exceeded",
      "severity": "medium",
      "requiredAction": "Address in current sprint",
      "createdAt": "2024-12-05T16:00:00.000Z",
      "resolvedAt": "2024-12-06T10:00:00.000Z"
    }
  ],
  "summary": {
    "total": 2,
    "active": 1,
    "resolved": 1,
    "severityCounts": {
      "critical": 0,
      "high": 1,
      "medium": 0,
      "low": 0
    }
  }
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid project ID
- `404` - Project not found
- `500` - Server error

---

## Data Models

### DashboardStatus

Enum representing overall project health:

- `on_track` - Milestones ≥ planned, no critical blockers
- `at_risk` - 1+ medium/high blockers, drift < 20%
- `blocked` - Any critical blocker or drift ≥ 20%
- `critical` - Phase duration exceeded by > 40%, multiple milestone failures, or failed QA

### MilestoneStatus

```typescript
{
  id: string                    // Unique milestone ID
  name: string                  // Milestone name
  phase: ProjectPhase           // Phase this belongs to
  weight: number                // Weight for progress calculation
  status: 'completed' | 'in_progress' | 'pending' | 'blocked'
  completedAt?: string          // ISO 8601 timestamp
  blockers: string[]            // Related blocker IDs
  evidence?: string             // Evidence of completion (e.g., PR URL)
}
```

### DashboardBlocker

```typescript
{
  id: string                    // Unique blocker ID
  description: string           // What is blocking
  severity: 'critical' | 'high' | 'medium' | 'low'
  owner?: string                // Who is responsible
  requiredAction: string        // What needs to be done
  createdAt: string             // ISO 8601 timestamp
  resolvedAt?: string           // ISO 8601 timestamp
}
```

### PhaseTimeline

```typescript
{
  phase: ProjectPhase           // Phase identifier
  plannedStart?: string         // ISO 8601 date
  actualStart?: string          // ISO 8601 date
  plannedEnd?: string           // ISO 8601 date
  actualEnd?: string            // ISO 8601 date
  driftPercentage?: number      // % drift from plan
  status: 'not_started' | 'in_progress' | 'completed' | 'delayed'
}
```

### SCurvePoint

```typescript
{
  date: string                  // ISO 8601 date (YYYY-MM-DD)
  plannedProgress: number       // 0-100%
  actualProgress: number        // 0-100%
}
```

### DeploymentReadiness

```typescript
{
  overall: 'ready' | 'not_ready' | 'warning' | 'unknown'
  qaStatus: DeploymentCheckStatus
  securityStatus: DeploymentCheckStatus
  environmentStatus: DeploymentCheckStatus
  lastDeployment?: {
    environment: 'development' | 'staging' | 'production'
    deployedAt: string          // ISO 8601 timestamp
    status: DeploymentStatus
  }
  note?: string                 // Additional context
}
```

### DeploymentCheckStatus

```typescript
{
  status: 'passed' | 'failed' | 'warning' | 'pending' | 'not_applicable'
  details?: string              // Additional information
}
```

---

## Status Calculation Rules

The dashboard calculates project status using these rules:

### On Track (`on_track`)

Conditions:
- Milestones ≥ planned for current phase
- No critical blockers present
- Timeline drift < 10%

**Example:** Project with all current phase milestones completed, no blockers.

---

### At Risk (`at_risk`)

Conditions:
- 1+ medium or high severity blockers present
- Timeline drift between 10% and 20%
- Some milestone delays but recoverable

**Example:** Project with 2 high-severity blockers, 15% timeline drift.

---

### Blocked (`blocked`)

Conditions:
- Any critical blocker present
- Timeline drift ≥ 20% but < 40%
- Cannot proceed with current work

**Example:** Project with 1 critical blocker preventing deployment.

---

### Critical (`critical`)

Conditions:
- Phase duration exceeded by > 40%
- Multiple milestone failures (>50% of phase milestones failed)
- Last deployment QA failed

**Example:** Project stuck in build phase for 40%+ longer than planned.

---

## Error Conditions

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### Common Error Scenarios

1. **Project Not Found** (404)
   - Project ID doesn't exist in registry
   - Project was archived or deleted

2. **Invalid Project ID** (400)
   - Missing project ID parameter
   - Malformed project ID

3. **Server Error** (500)
   - Database/storage unavailable
   - Unexpected error during aggregation

---

## API Usage Examples

### Example 1: Fetch Dashboard for Project

```bash
curl -X GET http://localhost:3000/api/foreman/projects/proj_123/dashboard
```

### Example 2: Get S-Curve Data for Visualization

```typescript
const response = await fetch(`/api/foreman/projects/${projectId}/s-curve`)
const { data } = await response.json()

// Use with Chart.js or similar
const chartData = {
  labels: data.map(point => point.date),
  datasets: [
    {
      label: 'Planned Progress',
      data: data.map(point => point.plannedProgress),
      borderColor: 'blue'
    },
    {
      label: 'Actual Progress',
      data: data.map(point => point.actualProgress),
      borderColor: 'green'
    }
  ]
}
```

### Example 3: Monitor Active Blockers

```typescript
const response = await fetch(`/api/foreman/projects/${projectId}/blockers`)
const { blockers, summary } = await response.json()

// Check for critical blockers
if (summary.severityCounts.critical > 0) {
  console.warn('Critical blockers detected!')
  const criticalBlockers = blockers.filter(b => 
    b.severity === 'critical' && !b.resolvedAt
  )
  criticalBlockers.forEach(blocker => {
    console.log(`🚨 ${blocker.description}`)
    console.log(`   Action: ${blocker.requiredAction}`)
  })
}
```

---

## Governance Compliance

The Dashboard API enforces all governance rules defined in:

- `project-lifecycle-rules.md` - Phase transitions, state management
- `milestone-rules.md` - Milestone tracking and progress calculation
- `deployment-governance.md` - Deployment readiness checks
- `memory-rules.md` - Memory integration (stub for Phase 1)

### Key Compliance Features

1. **No Hallucinations** - All data sourced from persistent storage
2. **Deterministic Results** - Same inputs always produce same outputs
3. **Stateless Operations** - No side effects during reads
4. **Audit Trail** - All actions logged
5. **Regression-Safe** - Memory integration prepared for future implementation

---

## Memory Integration (Phase 1 Stub)

The current implementation includes a stub for memory integration:

```typescript
export async function getProjectMemorySnapshot(projectId: string): Promise<MemorySnapshot[]> {
  // TODO: Integrate with Unified Memory Fabric when available
  return []
}
```

**Future Integration:**

Once the Unified Memory Fabric is implemented, this function will:
- Load project-specific memory entries
- Filter by relevance to current phase
- Return top N most relevant memory snapshots
- Provide context for AI-driven decision making

**Current Behavior:**

Returns empty array, ensuring:
- No breaking changes when memory is added
- Dashboard still functions without memory
- Integration point clearly defined

---

## Performance Considerations

### Caching

The dashboard API leverages the project registry cache:
- Active projects cached in memory
- Cache invalidated on project updates
- Reduces storage reads

### Scalability

Dashboard generation is O(n) where n = number of milestones:
- Typical project: ~18 default milestones
- With custom milestones: up to 38 milestones
- Generation time: < 50ms for typical project

### Rate Limiting

No rate limiting implemented in v1. Consider adding for production:
- Per-IP rate limits
- Per-project rate limits
- Authentication/authorization

---

## Versioning

Current version: **v1.0**

Future versions will maintain backward compatibility:
- New fields added, never removed
- Deprecated fields marked with `_deprecated` suffix
- Breaking changes require new major version

---

## Support & Feedback

For issues, questions, or feature requests:
- GitHub Issues: [MaturionISMS/maturion-foreman-app](https://github.com/MaturionISMS/maturion-foreman-app/issues)
- Documentation: `/docs/DASHBOARD_SPEC.md`

---

**Last Updated:** 2024-12-06  
**Version:** 1.0  
**Status:** ✅ Implemented
