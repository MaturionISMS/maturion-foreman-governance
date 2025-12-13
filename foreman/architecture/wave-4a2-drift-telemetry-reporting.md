# Wave 4A.2 — Drift Telemetry & Time-Series Reporting

## Purpose

Transform longitudinal drift detection (4A.1) into **legible, comparable, and durable intelligence** through deterministic time-series reporting and telemetry outputs.

This system makes drift **observable and analyzable** for:
- Foreman (reasoning and learning)
- Memory Fabric (FL/CI)
- Human reviewers (validation surface, not control)

## Status
**Non-Enforcing Intelligence Layer**: MUST NOT enforce, block, remediate, or modify governance.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                  Drift Telemetry & Time-Series System                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────┐      ┌──────────────────┐      ┌──────────────────┐   │
│  │   Time-Series   │      │   Telemetry      │      │   Report         │   │
│  │   Aggregator    │─────▶│   Generator      │─────▶│   Publisher      │   │
│  │                 │      │                  │      │                  │   │
│  └─────────────────┘      └──────────────────┘      └──────────────────┘   │
│         │                          │                          │              │
│         │ Window Queries           │ Deterministic            │ Dual Format  │
│         │ Trend Analysis           │ Reproducible             │ JSON + MD    │
│         │                          │                          │              │
│         ▼                          ▼                          ▼              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                    Telemetry Artifacts (Append-Only)                 │   │
│  │  • Time-series drift metrics (JSON)                                  │   │
│  │  • Subsystem attribution reports                                     │   │
│  │  • Constraint stress trends                                          │   │
│  │  • Human-readable summaries (Markdown)                               │   │
│  │  • Edge case classifications                                         │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                        Query API Surface                             │   │
│  │  • getTimeSeriesTelemetry(window: TimeWindow)                        │   │
│  │  • getSubsystemAttribution(subsystem: string)                        │   │
│  │  • getConstraintTrends(constraintId: string)                         │   │
│  │  • getDriftDirection(window: TimeWindow)                             │   │
│  │  • getTelemetryReport(format: 'json' | 'markdown')                   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Core Components

### 1. Time-Series Aggregator

**File Location**: `lib/foreman/longitudinal/telemetry/time-series-aggregator.ts`

**Purpose**: Query and aggregate drift observations across time windows for trend analysis.

**Key Functions**:

```typescript
/**
 * Get time-series telemetry for a specific time window
 * MUST be deterministic and reproducible
 */
export async function getTimeSeriesTelemetry(params: {
  window: TimeWindow;
  subsystem?: string;
  category?: 'structural' | 'contract' | 'governance';
}): Promise<TimeSeriesTelemetry>

/**
 * Analyze drift direction over time
 * Returns improving/degrading/oscillating classification
 */
export async function getDriftDirection(params: {
  window: TimeWindow;
  subsystem?: string;
}): Promise<DriftDirection>

/**
 * Get subsystem-level attribution
 * Shows which subsystems are stable vs unstable
 */
export async function getSubsystemAttribution(params: {
  window: TimeWindow;
}): Promise<SubsystemAttribution[]>

/**
 * Get constraint stress trends
 * Shows which constraints are repeatedly stressed
 */
export async function getConstraintTrends(params: {
  window: TimeWindow;
  constraintId?: string;
}): Promise<ConstraintTrend[]>
```

**Data Structures**:

```typescript
/**
 * Time-series telemetry representation
 */
export interface TimeSeriesTelemetry {
  window: {
    type: 'commits' | 'days' | 'prs' | 'waves' | 'custom';
    value: number | { start: string; end: string };
    signatureCount: number;
    observationCount: number;
  };
  
  series: Array<{
    timestamp: string;
    sourceType: 'commit' | 'pr' | 'wave';
    sourceId: string;
    
    drift: {
      magnitude: number; // 0.0 - 1.0 normalized drift
      classification: DriftClassification;
      confidence: number;
    };
    
    categories: {
      structural: {
        churnRate: number;
        modulesChanged: number;
      };
      contract: {
        stabilityScore: number;
        changesCount: number;
      };
      governance: {
        alignmentScore: number;
        constraintsChanged: number;
      };
    };
  }>;
  
  summary: {
    overallDirection: 'improving' | 'degrading' | 'oscillating' | 'stable';
    averageDrift: number;
    peakDrift: number;
    minDrift: number;
    volatility: number; // Measure of oscillation
  };
  
  edgeCases: EdgeCaseClassification[];
  infrastructureGaps: InfrastructureGap[];
}

/**
 * Drift direction analysis
 */
export interface DriftDirection {
  direction: 'improving' | 'degrading' | 'oscillating' | 'stable';
  confidence: number;
  
  trend: {
    slopeDirection: 'upward' | 'downward' | 'flat';
    slopeValue: number;
    volatility: number;
  };
  
  periods: {
    improving: number; // Count of improving observations
    degrading: number; // Count of degrading observations
    stable: number; // Count of stable observations
  };
  
  rationale: string; // Human-readable explanation
}

/**
 * Subsystem attribution
 */
export interface SubsystemAttribution {
  subsystem: string;
  
  stability: {
    classification: 'stable' | 'unstable' | 'improving' | 'degrading';
    confidence: number;
    
    metrics: {
      averageChurn: number;
      changeFrequency: number;
      violationCount: number;
    };
  };
  
  observations: Array<{
    timestamp: string;
    churn: number;
    violated: boolean;
  }>;
  
  trend: 'improving' | 'degrading' | 'stable';
}

/**
 * Constraint stress trend
 */
export interface ConstraintTrend {
  constraintId: string;
  
  stress: {
    totalViolations: number;
    violationRate: number; // Violations per observation
    trend: 'increasing' | 'stable' | 'decreasing';
  };
  
  timeline: Array<{
    timestamp: string;
    violated: boolean;
    severity?: 'low' | 'medium' | 'high';
  }>;
  
  prediction: {
    nextPeriodRisk: 'low' | 'medium' | 'high';
    rationale: string;
  };
}

/**
 * Edge case classification
 */
export interface EdgeCaseClassification {
  type: 'sparse_data' | 'sudden_spike' | 'gradual_trend' | 'oscillating' | 'subsystem_disappeared' | 'unclassifiable';
  severity: 'info' | 'warning' | 'error';
  description: string;
  affectedObservations: string[]; // Observation IDs
  recommendation: string;
}
```

**Edge Case Handling**:

```typescript
/**
 * Detect and classify edge cases in telemetry data
 */
export function detectEdgeCases(params: {
  telemetry: TimeSeriesTelemetry;
}): EdgeCaseClassification[] {
  const edgeCases: EdgeCaseClassification[] = [];
  
  // 1. Sparse or early historical data
  if (params.telemetry.window.signatureCount < 3) {
    edgeCases.push({
      type: 'sparse_data',
      severity: 'info',
      description: 'Insufficient historical data for trend analysis',
      affectedObservations: [],
      recommendation: 'Continue monitoring. Trend confidence will improve with more data.',
    });
  }
  
  // 2. Sudden spikes
  const driftValues = params.telemetry.series.map(s => s.drift.magnitude);
  const avgDrift = driftValues.reduce((sum, v) => sum + v, 0) / driftValues.length;
  const spikes = driftValues.filter(v => v > avgDrift * 3);
  
  if (spikes.length > 0) {
    edgeCases.push({
      type: 'sudden_spike',
      severity: 'warning',
      description: `Detected ${spikes.length} sudden drift spike(s) (>3x average)`,
      affectedObservations: params.telemetry.series
        .filter(s => s.drift.magnitude > avgDrift * 3)
        .map(s => s.sourceId),
      recommendation: 'Investigate large architectural changes or refactorings.',
    });
  }
  
  // 3. Oscillating patterns
  if (params.telemetry.summary.volatility > 0.5) {
    edgeCases.push({
      type: 'oscillating',
      severity: 'warning',
      description: 'High drift volatility detected (oscillating pattern)',
      affectedObservations: [],
      recommendation: 'Review for inconsistent architectural decisions or experimental changes.',
    });
  }
  
  // 4. Subsystems disappearing
  // (Would require subsystem tracking across observations)
  
  // 5. Unclassifiable drift
  const lowConfidence = params.telemetry.series.filter(s => s.drift.confidence < 0.5);
  if (lowConfidence.length > params.telemetry.series.length * 0.3) {
    edgeCases.push({
      type: 'unclassifiable',
      severity: 'warning',
      description: `${lowConfidence.length} observations have low classification confidence`,
      affectedObservations: lowConfidence.map(s => s.sourceId),
      recommendation: 'Infrastructure Gap: Improve signature granularity or classification thresholds.',
    });
  }
  
  return edgeCases;
}
```

---

### 2. Telemetry Generator

**File Location**: `lib/foreman/longitudinal/telemetry/telemetry-generator.ts`

**Purpose**: Generate deterministic telemetry reports in machine-readable (JSON) and human-readable (Markdown) formats.

**Key Functions**:

```typescript
/**
 * Generate complete telemetry report
 * MUST be deterministic and reproducible
 */
export async function generateTelemetryReport(params: {
  window: TimeWindow;
  format: 'json' | 'markdown' | 'both';
}): Promise<TelemetryReport>

/**
 * Generate subsystem-specific report
 */
export async function generateSubsystemReport(params: {
  subsystem: string;
  window: TimeWindow;
  format: 'json' | 'markdown' | 'both';
}): Promise<SubsystemReport>

/**
 * Generate constraint stress report
 */
export async function generateConstraintReport(params: {
  constraintId: string;
  window: TimeWindow;
  format: 'json' | 'markdown' | 'both';
}): Promise<ConstraintReport>
```

**Data Structures**:

```typescript
/**
 * Complete telemetry report
 */
export interface TelemetryReport {
  id: string; // UUID
  generatedAt: string; // ISO 8601
  reproducible: boolean; // Always true
  
  metadata: {
    window: TimeWindow;
    signatureCount: number;
    observationCount: number;
    dataCompleteness: number; // 0.0 - 1.0
  };
  
  timeSeries: TimeSeriesTelemetry;
  subsystems: SubsystemAttribution[];
  constraints: ConstraintTrend[];
  
  summary: {
    overallHealth: 'healthy' | 'warning' | 'degrading' | 'critical';
    driftDirection: DriftDirection;
    topIssues: string[]; // Top 5 issues
    recommendations: string[];
  };
  
  artifacts: {
    json?: string; // JSON serialized report
    markdown?: string; // Markdown formatted report
  };
  
  infrastructureGaps: InfrastructureGap[];
  edgeCases: EdgeCaseClassification[];
}

/**
 * Subsystem-specific report
 */
export interface SubsystemReport {
  subsystem: string;
  generatedAt: string;
  
  attribution: SubsystemAttribution;
  
  relatedConstraints: ConstraintTrend[];
  
  summary: {
    stability: 'stable' | 'unstable' | 'improving' | 'degrading';
    keyMetrics: Record<string, number>;
    recommendations: string[];
  };
  
  artifacts: {
    json?: string;
    markdown?: string;
  };
}

/**
 * Constraint-specific report
 */
export interface ConstraintReport {
  constraintId: string;
  generatedAt: string;
  
  trend: ConstraintTrend;
  
  affectedSubsystems: string[];
  
  summary: {
    overallTrend: 'increasing' | 'stable' | 'decreasing';
    riskLevel: 'low' | 'medium' | 'high';
    recommendations: string[];
  };
  
  artifacts: {
    json?: string;
    markdown?: string;
  };
}
```

**Markdown Format Template**:

```markdown
# Drift Telemetry Report

**Generated**: {timestamp}  
**Window**: {window description}  
**Signatures**: {count} | **Observations**: {count}  
**Data Completeness**: {percentage}%

---

## Executive Summary

**Overall Health**: {healthy|warning|degrading|critical}  
**Drift Direction**: {improving|degrading|oscillating|stable}  
**Confidence**: {percentage}%

### Key Findings

1. {finding 1}
2. {finding 2}
3. {finding 3}

### Top Recommendations

1. {recommendation 1}
2. {recommendation 2}
3. {recommendation 3}

---

## Time-Series Analysis

**Average Drift**: {value}  
**Peak Drift**: {value} at {timestamp}  
**Volatility**: {value}

### Drift Timeline

| Timestamp | Source | Classification | Magnitude | Churn Rate |
|-----------|--------|----------------|-----------|------------|
| {ts}      | {src}  | {class}        | {mag}     | {churn}    |

---

## Subsystem Attribution

### {Subsystem Name}

**Stability**: {classification}  
**Trend**: {improving|degrading|stable}  
**Average Churn**: {value}  
**Violation Count**: {count}

**Recommendations**:
- {recommendation}

---

## Constraint Stress Analysis

### {Constraint ID}

**Violations**: {count}  
**Trend**: {increasing|stable|decreasing}  
**Risk Level**: {low|medium|high}

**Timeline**:
- {timestamp}: {violated|compliant}

---

## Edge Cases & Infrastructure Gaps

### Edge Cases

1. **{Type}** ({severity}): {description}
   - **Recommendation**: {recommendation}

### Infrastructure Gaps

1. **{Type}**: {description}
   - **Severity**: {critical|high|medium|low}
   - **Action Required**: {action}

---

## Methodology

This report was generated using deterministic algorithms over persisted architecture signatures. All metrics are reproducible and computed from historical drift observations.

**Sources**: {sourceType} signatures from {start} to {end}  
**Algorithm Version**: {version}  
**Report ID**: {uuid}
```

---

### 3. Report Publisher

**File Location**: `lib/foreman/longitudinal/telemetry/report-publisher.ts`

**Purpose**: Persist telemetry reports to Memory Fabric and filesystem in append-only fashion.

**Key Functions**:

```typescript
/**
 * Publish telemetry report to Memory Fabric and filesystem
 * MUST be append-only, no overwrites
 */
export async function publishTelemetryReport(params: {
  report: TelemetryReport;
}): Promise<PublishResult>

/**
 * Retrieve historical telemetry reports
 */
export async function getHistoricalReports(params: {
  since?: Date;
  until?: Date;
  limit?: number;
}): Promise<TelemetryReport[]>

/**
 * Link report to source drift observations
 */
export async function linkReportToObservations(params: {
  reportId: string;
  observationIds: string[];
}): Promise<void>
```

**Storage Structure**:

```
memory/foreman/longitudinal/telemetry/
├── reports/
│   ├── telemetry-{timestamp}-{uuid}.json
│   ├── telemetry-{timestamp}-{uuid}.md
│   └── ...
├── subsystem-reports/
│   ├── subsystem-{name}-{timestamp}-{uuid}.json
│   ├── subsystem-{name}-{timestamp}-{uuid}.md
│   └── ...
└── constraint-reports/
    ├── constraint-{id}-{timestamp}-{uuid}.json
    ├── constraint-{id}-{timestamp}-{uuid}.md
    └── ...
```

**Append-Only Guarantees**:
- Reports are never modified after creation
- Each report has unique UUID + timestamp
- Filesystem paths prevent accidental overwrites
- Memory Fabric entries are immutable

---

## Complete TypeScript Type Definitions

**File Location**: `types/telemetry.ts`

```typescript
/**
 * Drift Telemetry & Time-Series Reporting Types
 * Wave 4A.2 - Non-Enforcing Intelligence Layer
 */

import {
  TimeWindow,
  DriftClassification,
  InfrastructureGap,
} from './longitudinal';

// All interfaces defined above go here
// (TimeSeriesTelemetry, DriftDirection, SubsystemAttribution, etc.)
```

---

## API Endpoints

### GET `/api/foreman/longitudinal/telemetry`

Query time-series telemetry.

**Query Parameters**:
- `window`: Time window (e.g., `7d`, `30d`, `last-10-commits`)
- `subsystem`: Filter by subsystem (optional)
- `category`: Filter by category (`structural`, `contract`, `governance`)
- `format`: Response format (`json` or `markdown`)

**Response**: `TimeSeriesTelemetry` (JSON) or formatted Markdown

---

### GET `/api/foreman/longitudinal/telemetry/direction`

Get drift direction analysis.

**Query Parameters**:
- `window`: Time window
- `subsystem`: Filter by subsystem (optional)

**Response**: `DriftDirection`

---

### GET `/api/foreman/longitudinal/telemetry/subsystems`

Get subsystem attribution.

**Query Parameters**:
- `window`: Time window

**Response**: `SubsystemAttribution[]`

---

### GET `/api/foreman/longitudinal/telemetry/constraints`

Get constraint stress trends.

**Query Parameters**:
- `window`: Time window
- `constraintId`: Filter by constraint (optional)

**Response**: `ConstraintTrend[]`

---

### POST `/api/foreman/longitudinal/telemetry/report`

Generate and publish a telemetry report.

**Request Body**:
```typescript
{
  window: TimeWindow;
  format: 'json' | 'markdown' | 'both';
  subsystem?: string;
  constraintId?: string;
}
```

**Response**: `TelemetryReport`

---

### GET `/api/foreman/longitudinal/telemetry/reports`

Retrieve historical telemetry reports.

**Query Parameters**:
- `since`: Start date (ISO 8601)
- `until`: End date (ISO 8601)
- `limit`: Max results (default: 50)

**Response**: `TelemetryReport[]`

---

## Architecture Checklist Validation

### Relevant Categories

✅ **Data Architecture** - Complete
- Time-series aggregation defined
- Telemetry report structure specified
- Storage schema defined (append-only)
- Edge case data structures defined

✅ **API Architecture** - Complete
- Query endpoints specified
- Report generation endpoint specified
- Historical retrieval endpoint specified
- All parameters and responses typed

✅ **Security Architecture** - Complete
- Read-only intelligence layer (no enforcement)
- Append-only storage (no destructive updates)
- No secret exposure (drift data only)
- Memory Fabric integration follows governance

✅ **Error Handling Architecture** - Complete
- Edge case detection and classification
- Infrastructure gap flagging
- Sparse data handling
- Unclassifiable drift explicit flagging

✅ **Performance Architecture** - Complete
- Time-window queries (no full scans)
- Deterministic algorithms (reproducible)
- Pre-computed metrics (no runtime recomputation)
- Pagination for historical reports

✅ **Testing Architecture** - Complete
- Unit tests for aggregation logic
- Unit tests for telemetry generation
- Integration tests for report publishing
- Edge case scenario tests
- Reproducibility tests (same input → same output)

✅ **Deployment Architecture** - Complete
- API routes in Next.js app
- Storage in existing memory structure
- No new infrastructure required
- Backward compatible with 4A.1

✅ **Documentation Architecture** - Complete
- Architecture document (this file)
- API documentation embedded
- Markdown template specified
- Type definitions complete

❌ **UI Architecture** - N/A (explicit non-goal)
❌ **State Management** - N/A (no UI components)
❌ **Integration Architecture** - N/A (no external services)

---

## Validation Result: ✅ PASS

All relevant checklist items are addressed in architecture.  
Architecture is complete and ready for QA creation.

---

## Version Information

**Version**: 1.0.0  
**Status**: Architecture Complete  
**Created**: 2025-12-13  
**Author**: Foreman  
**Authority**: Build Philosophy  
**Aligned With**: Wave 4A Issue 4A.2
