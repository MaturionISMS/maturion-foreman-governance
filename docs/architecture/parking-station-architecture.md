# Parking Station Architecture

## Purpose

The **Foreman Upgrade Parking Station** is a centralized dashboard that automatically discovers, stores, and organizes ALL proposed improvements from across the Foreman ecosystem. It serves as the roadmap planning station for continuous improvement.

## Overview

The Parking Station operates as a permanent, write-protected, governance-monitored repository of proposed enhancements. It continuously scans feedback files, governance reports, implementation summaries, and other system outputs to extract improvement suggestions.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Parking Station System                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Discovery  │───▶│   Storage    │───▶│      UI      │  │
│  │    Engine    │    │   Service    │    │   Dashboard  │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│         │                    │                    │          │
│         │                    │                    │          │
│         ▼                    ▼                    ▼          │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Scanner    │    │  Governance  │    │   Filters    │  │
│  │   Patterns   │    │    Memory    │    │   & Search   │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│         │                    │                    │          │
│         └────────────────────┴────────────────────┘          │
│                              │                               │
│                              ▼                               │
│                   ┌──────────────────┐                      │
│                   │ Drift Detector   │                      │
│                   │   Monitoring     │                      │
│                   └──────────────────┘                      │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Discovery Engine

**Location**: `/lib/foreman/parking-station/discovery-engine.ts`

**Purpose**: Automatically scans source files to discover improvement proposals.

**Capabilities**:
- Scans `.md` feedback files
- Parses implementation summaries
- Analyzes governance and drift logs
- Extracts improvements from PR descriptions
- Parses issue summaries
- Pattern-based extraction using regex and keywords

**Patterns Detected**:
- "TODO:", "FUTURE:", "ENHANCEMENT:"
- "Proposed improvement", "Feature suggestion"
- "Future enhancement", "Consider adding"
- "Architectural upgrade needed"
- "UI improvement", "Model suggestion"
- "Governance refinement"

**Output**: `ScanResult` containing discovered entries

### 2. Storage Service

**Location**: `/lib/foreman/parking-station/storage.ts`

**Purpose**: Manages persistence and retrieval of parking station entries.

**Storage Location**: `/memory/foreman/parking-station.json`

**Operations**:
- `addEntry(entry: ParkingStationEntry): Promise<void>`
- `updateEntry(id: string, updates: Partial<ParkingStationEntry>): Promise<void>`
- `deleteEntry(id: string): Promise<void>`
- `getEntry(id: string): Promise<ParkingStationEntry | null>`
- `getAllEntries(filter?: ParkingStationFilter): Promise<ParkingStationEntry[]>`
- `getStats(): Promise<ParkingStationStats>`

**Write Protection**:
- Only Foreman has write permission
- All writes logged to Governance Memory
- Builders cannot read or write
- Drift Detector monitors for unauthorized modifications

### 3. Priority Computation

**Algorithm**:
```typescript
priority = baseScore 
  + (complexityFactor * 10)
  + (impactFactor * 20)
  + (dependencyFactor * 5)
  + (sourceFactor * 10)
  + (waveFactor * 15)
```

**Factors**:
- **Complexity**: Lower complexity = higher priority
- **Impact**: Higher impact = higher priority
- **Dependencies**: Fewer dependencies = higher priority
- **Source**: Certain sources weighted higher (e.g., Drift Detector)
- **Wave**: Earlier waves = higher priority

### 4. UI Dashboard

**Location**: `/app/foreman/parking-station/page.tsx`

**Features**:
- View all parked upgrades
- Filter by category, status, source, wave
- Search by name, summary, tags
- Sort by priority, date, category
- Mark items for promotion
- Generate GitHub issues from selected entries
- View statistics and trends

**Navigation**: Added to Foreman sidebar under "🅿️ Parking Station"

### 5. Governance Integration

**Governance Memory Events**:
- Entry created: `parking_station_entry_created`
- Entry updated: `parking_station_entry_updated`
- Entry promoted: `parking_station_entry_promoted`
- Entry rejected: `parking_station_entry_rejected`
- Issue created: `parking_station_issue_created`
- Unauthorized access: `parking_station_unauthorized_access`

**Drift Monitoring**:
- File: `/memory/foreman/parking-station.json`
- Monitors: Unauthorized modifications
- Action: Alert and restore from backup if needed

### 6. Issue Creation Workflow

**Process**:
1. User selects entry in UI
2. UI calls `/api/foreman/parking-station/create-issue`
3. API validates entry and permissions
4. GitHub issue created with:
   - Title: Entry name
   - Body: Full description with context
   - Labels: Category, wave, priority
   - Assigned to: Foreman
5. Entry status updated to "Promoted"
6. Issue URL linked in entry
7. Governance Memory logs action

## Data Structure

### Entry Storage Schema

```json
{
  "version": "1.0.0",
  "lastUpdated": "2024-12-09T08:00:00.000Z",
  "totalEntries": 42,
  "entries": [
    {
      "id": "ps_1733734800000_abc123",
      "name": "Enhanced UI Filtering",
      "category": "UI",
      "source": "Feedback File",
      "sourceLocation": "/FEEDBACK_LOOP_IMPLEMENTATION.md",
      "summary": "Add advanced filtering to dashboard",
      "suggestedWave": "Wave 2",
      "priority": 75,
      "status": "Parked",
      "tags": ["ui", "dashboard", "filtering"],
      "createdAt": "2024-12-09T08:00:00.000Z",
      "updatedAt": "2024-12-09T08:00:00.000Z",
      "createdBy": "foreman-discovery-engine",
      "metadata": {
        "complexity": "Medium",
        "impact": "High"
      }
    }
  ]
}
```

## Security & Governance

### Access Control

**Foreman Only**:
- Full read and write access
- Can create, update, delete entries
- Can promote entries to issues
- Can scan and populate retroactively

**Builders**: 
- NO read access
- NO write access
- Cannot view Parking Station UI
- Cannot access storage files

**Drift Detector**:
- Read-only monitoring access
- Alerts on unauthorized modifications
- Does not modify entries

### Audit Trail

All actions logged to Governance Memory:
- Who performed the action
- What was changed
- When it occurred
- Why (if provided)

### Validation

All entries validated before storage:
- Required fields present
- Valid enum values
- Priority in range [0-100]
- Source location exists (if file path)
- Timestamps valid ISO 8601

## File Scanning Targets

### Retroactive Scan Sources

1. **Feedback Files** (`.md` in root):
   - `FEEDBACK_LOOP_IMPLEMENTATION.md`
   - `BUILDER_NETWORK_INTEGRATION_VALIDATION.md`
   - All `*_SUMMARY.md` files

2. **Governance Logs**:
   - `/foreman/governance/*.md`
   - `/memory/foreman/memory.json`

3. **Drift Reports**:
   - `/lib/foreman/memory/drift-monitor.ts` comments
   - Drift detection outputs

4. **Implementation Summaries**:
   - All `IMPLEMENTATION_*.md` files
   - All `*_COMPLETE.md` files

5. **Issue Responses**:
   - `/docs/*.md`
   - Issue comments (via GitHub API)

6. **PR Reviews**:
   - PR descriptions
   - Review comments
   - PR feedback

## API Endpoints

### GET `/api/foreman/parking-station`
Get all entries with optional filtering

**Query Params**:
- `category`: Filter by category
- `status`: Filter by status
- `source`: Filter by source
- `search`: Search query
- `minPriority`: Minimum priority
- `maxPriority`: Maximum priority

**Response**:
```json
{
  "success": true,
  "entries": [...],
  "stats": {...},
  "total": 42
}
```

### POST `/api/foreman/parking-station/scan`
Trigger a new scan of source files

**Response**:
```json
{
  "success": true,
  "scanResult": {
    "filesScanned": 50,
    "upgradesFound": 12,
    "duration": 1500,
    "timestamp": "..."
  }
}
```

### POST `/api/foreman/parking-station/create-issue`
Create GitHub issue from entry

**Body**:
```json
{
  "entryId": "ps_...",
  "additionalContext": "...",
  "labels": ["enhancement"],
  "assignees": ["foreman"]
}
```

**Response**:
```json
{
  "success": true,
  "issueUrl": "https://github.com/org/repo/issues/123",
  "issueNumber": 123
}
```

### PATCH `/api/foreman/parking-station/:id`
Update entry status or properties

**Body**:
```json
{
  "status": "Promoted",
  "relatedIssue": "https://github.com/org/repo/issues/123"
}
```

## Testing

### Unit Tests
- Storage operations
- Priority computation
- Pattern matching
- Entry validation

### Integration Tests
- Discovery engine scanning
- Issue creation workflow
- Governance memory logging
- Drift detection

### UI Tests
- Filtering and search
- Entry display
- Issue creation flow
- Statistics display

## Future Enhancements

### Planned for Later Waves

1. **AI-Powered Prioritization**
   - Use ML to improve priority scores
   - Learn from implemented vs rejected entries
   - Predict effort and impact

2. **Automated Issue Creation**
   - Auto-promote high-priority items
   - Schedule issues based on wave
   - Batch issue creation

3. **Trend Analysis**
   - Identify recurring themes
   - Track category distributions over time
   - Predict roadmap needs

4. **Integration with Project Lifecycle**
   - Link to project registry
   - Update project milestones
   - Track implementation progress

5. **Enhanced Discovery**
   - Analyze code comments
   - Parse test failure messages
   - Extract from CI/CD logs

## Deployment

### Initial Setup

1. Create storage directory structure
2. Initialize empty parking station file
3. Add UI route and navigation
4. Configure governance monitoring
5. Run initial retroactive scan

### Ongoing Operations

- Automated scans: Daily at 2 AM
- Manual scans: Via UI button or API
- Backup: Included in git commits
- Monitoring: Drift Detector active 24/7

## Success Metrics

- **Coverage**: % of feedback sources scanned
- **Discovery Rate**: Upgrades found per scan
- **Promotion Rate**: % of parked items promoted
- **Implementation Rate**: % of promoted items implemented
- **Time to Promotion**: Days from parked to promoted
- **Time to Implementation**: Days from promoted to implemented

---

**Version**: 1.0.0  
**Status**: Active  
**Owner**: Foreman  
**Last Updated**: 2024-12-09
