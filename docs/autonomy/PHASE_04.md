# 📘 PHASE_04.md — Autonomy Dashboard UI

**Status:** ✅ Implemented  
**Wave:** 1  
**Constitutional Layer:** Human Visibility & Verification Layer  
**Last Updated:** 2025-12-11

---

## Purpose

Give Johan (and authorized stakeholders) a single-screen live interface to monitor Foreman's autonomous activity.

**Key Principle:** Transparency through real-time visibility into autonomous operations.

---

## Requirements

### Create Dashboard Application

**Location:** `app/foreman/autonomy-dashboard/`

**Route:** `/foreman/autonomy-dashboard`

### Dashboard Includes:

---

### 1. Execution Status Panel

**Purpose:** Real-time view of current autonomous operations

**Display Elements:**

✅ **Running Tasks**
```typescript
interface RunningTask {
  taskId: string
  issueNumber: number
  title: string
  status: 'queued' | 'building' | 'validating' | 'merging' | 'complete'
  startTime: string
  elapsedTime: string
  builderUsed: 'github-copilot' | 'local-builder'
  progress: number // 0-100
}
```

✅ **Builder Routing Decisions**
- Which builder was selected
- Reason for selection (complexity, availability, etc.)
- Builder health status
- Fallback triggers

✅ **Failure and Retries**
- Current retry count
- Maximum retries allowed
- Failure reason
- Next retry time
- Escalation status

✅ **Reasoning Chains**
- Decision tree visualization
- Constitutional system checkpoints
- Validation gate results
- Approval flows

**Visual Components:**
- Task list with status indicators
- Progress bars for active tasks
- Timeline visualization
- Builder selection flowchart

---

### 2. Governance Status Panel

**Purpose:** Monitor constitutional system health and interventions

**Display Elements:**

✅ **Guardrail Hits**
```typescript
interface GuardrailHit {
  timestamp: string
  rule: string
  action: string
  blocked: boolean
  reason: string
  severity: 'info' | 'warning' | 'critical'
}
```

✅ **QIC/QIEL Status**
- Current QA status (red/green)
- Lint results
- Type-check results
- Build status
- QIEL validation results
- Governance rule violations

✅ **Drift Detection Alerts**
```typescript
interface DriftAlert {
  timestamp: string
  type: 'architectural' | 'governance' | 'quality'
  severity: 'low' | 'medium' | 'high'
  description: string
  affectedFiles: string[]
  action: 'blocked' | 'escalated' | 'monitoring'
}
```

✅ **Model Escalation Path**
- Current model in use
- Escalation triggers
- Escalation history
- Cost tracking

**Visual Components:**
- Status badges (green/yellow/red)
- Alert timeline
- Drift visualization
- Model usage graph

---

### 3. Pilot Log Viewer

**Purpose:** Display complete audit trail of autonomous operations

**Display Elements:**

✅ **Render Content of AUTONOMY_PILOT_LOG.md**
```typescript
interface LogEntry {
  timestamp: string
  actionType: string
  decision: 'allowed' | 'denied' | 'escalated'
  constitutionalLayer: string
  details: string
  outcome: string
  linkedIssue?: number
  linkedPR?: number
  linkedIncident?: string
}
```

✅ **Log Features**
- Real-time updates (auto-refresh)
- Search and filter
- Date range selection
- Export to CSV/JSON
- Permalink to specific entries

✅ **Log Statistics**
- Total actions
- Approval rate
- Denial rate
- Escalation rate
- Most active constitutional layer

**Visual Components:**
- Log timeline
- Filter controls
- Search bar
- Statistics dashboard
- Export buttons

---

### 4. Wave Execution Panel

**Purpose:** Track multi-issue wave progress

**Display Elements:**

✅ **Wave Overview**
```typescript
interface WaveStatus {
  waveId: string
  waveNumber: number
  totalIssues: number
  completedIssues: number
  failedIssues: number
  inProgressIssues: number
  status: 'queued' | 'executing' | 'paused' | 'complete' | 'failed'
  startTime: string
  estimatedCompletion: string
}
```

✅ **Real-time Updates During Wave 1 & 2**
- Issue completion status
- Current active issues
- Parallel execution visualization
- Dependency graph
- Critical path highlighting

✅ **Wave Metrics**
- Average completion time per issue
- Success rate
- Failure patterns
- Builder distribution
- Governance intervention rate

**Visual Components:**
- Wave progress bar
- Issue grid with status
- Gantt chart for timeline
- Dependency graph visualization
- Metrics dashboard

---

## Acceptance Criteria

- ✅ Dashboard loads without errors
- ✅ Refresh rate < 2 seconds
- ✅ Links to logs work
- ✅ Foreman displays reasoning, alerts, incidents
- ✅ Real-time updates functional
- ✅ All panels display correctly
- ✅ No performance degradation
- ✅ Mobile responsive (optional)

---

## Implementation Status

### Completed Components

- ✅ `app/foreman/autonomy-dashboard/page.tsx` - Main dashboard page
- ✅ Dashboard API endpoints
- ✅ Real-time update system
- ✅ Log viewer component
- ✅ Status panels
- ✅ Wave execution tracker

### API Endpoints

```typescript
// Dashboard data endpoints
GET /api/autonomy/dashboard/status          // Current execution status
GET /api/autonomy/dashboard/governance      // Governance status
GET /api/autonomy/dashboard/logs            // Pilot log entries
GET /api/autonomy/dashboard/waves           // Wave execution data
GET /api/autonomy/dashboard/metrics         // Performance metrics

// Real-time updates
WebSocket /api/autonomy/dashboard/stream    // Live updates
```

### Integration Points

- **CS7 Autonomy Log**: Primary data source
- **CS1 Guardrails**: Guardrail hit display
- **CS3 Incident System**: Incident correlation
- **CS4 Governance Alerts**: Alert display
- **Wave Orchestrator**: Wave status data
- **Builder Executor**: Task execution data

---

## Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│ Foreman Autonomy Dashboard                              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ┌─────────────────────┐  ┌─────────────────────┐      │
│ │ Execution Status    │  │ Governance Status   │      │
│ │                     │  │                     │      │
│ │ Running Tasks: 2    │  │ QIC: ✅ PASS       │      │
│ │ Queued: 3          │  │ QIEL: ✅ PASS      │      │
│ │ Completed: 15      │  │ Guardrails: ✅     │      │
│ │                     │  │ Drift: ⚠️  Medium  │      │
│ └─────────────────────┘  └─────────────────────┘      │
│                                                         │
│ ┌─────────────────────────────────────────────────┐   │
│ │ Wave Execution Panel                             │   │
│ │                                                  │   │
│ │ Wave 1: █████████░ 90% (9/10 issues)           │   │
│ │ Wave 2: ███░░░░░░░ 30% (3/10 issues)           │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ ┌─────────────────────────────────────────────────┐   │
│ │ Pilot Log Viewer                                 │   │
│ │ [Search] [Filter] [Date Range] [Export]         │   │
│ │                                                  │   │
│ │ 2025-12-11 06:30:00 - Build Execution          │   │
│ │ 2025-12-11 06:28:15 - PR Merge Attempt         │   │
│ │ 2025-12-11 06:25:00 - Governance Check         │   │
│ │ ... (scrollable)                                 │   │
│ └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Usage Example

**Accessing the Dashboard:**

1. Navigate to `/foreman/autonomy-dashboard`
2. Dashboard loads with current status
3. Auto-refreshes every 2 seconds
4. Click on any task/wave for details
5. Use filters to narrow log view
6. Export logs for analysis

**API Usage:**

```typescript
// Fetch current dashboard status
const response = await fetch('/api/autonomy/dashboard/status')
const data = await response.json()

console.log('Running Tasks:', data.runningTasks)
console.log('QIC Status:', data.governance.qic)
console.log('Active Waves:', data.waves)
```

---

## Performance Considerations

1. **Caching**: Dashboard data cached for 1-2 seconds
2. **Pagination**: Log viewer uses pagination (50 entries per page)
3. **Lazy Loading**: Wave details loaded on demand
4. **WebSocket**: Real-time updates via WebSocket (not polling)
5. **Throttling**: Updates throttled to prevent UI flicker

---

## Security Considerations

1. **Authentication**: Dashboard requires authentication
2. **Authorization**: Only authorized roles can view
3. **Data Sanitization**: All log data sanitized for display
4. **No Secrets**: Sensitive data redacted from logs
5. **Rate Limiting**: API endpoints rate-limited

---

## Dependencies

- **Requires:** PHASE_01 (Autonomous Mode Pilot)
- **Requires:** PHASE_02 (Builder Execution Engine)
- **Requires:** PHASE_03 (PR Auto-Merge Engine)
- **Integrates with:** PHASE_05 (Multi-Issue Wave Orchestrator)

---

## Next Phase

Proceed to [PHASE_05.md](./PHASE_05.md) - Multi-Issue Wave Orchestrator

---

## Technical Stack

- **Framework**: Next.js 14
- **UI Components**: React + Tailwind CSS
- **State Management**: React hooks + Context
- **Real-time**: WebSocket or Server-Sent Events
- **Data Fetching**: SWR or React Query
- **Charts**: Recharts or Chart.js
- **Styling**: Tailwind CSS + shadcn/ui components

---

*This phase implements Human Visibility & Verification Layer and is protected under CS1 Guardrails. Modifications require CS2 Architecture Change Approval.*
