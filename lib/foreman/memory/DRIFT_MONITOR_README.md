# Memory Drift Monitor

**Status**: ✅ IMPLEMENTED  
**Version**: 1.0  
**Epic**: Memory Wave M6 — Integrity, Consistency, and Long-Term Reliability

## Overview

The Memory Drift Monitor is a critical component of the Unified Memory Fabric Stability System. It continuously checks memory for integrity issues and prevents execution when critical drift is detected.

## What is Memory Drift?

Memory drift occurs when the memory fabric becomes:
- **Inconsistent** - Contradictory entries exist
- **Incomplete** - Missing required fields or data
- **Outdated** - Stale entries that are no longer relevant
- **Corrupt** - Schema violations or version mismatches
- **Divergent** - Cross-agent memory synchronization issues
- **Non-compliant** - Violations of governance rules

## Drift Types

### 1. Schema Drift
Memory entries that don't conform to their defined JSON schemas.

**Example**: Historical issue missing `resolution` field

**Severity**: Error

**Detection**: Validates against schemas in `/memory/schemas/`

### 2. Version Drift
Memory entries with invalid or missing version information.

**Example**: Entry with version < 1 or missing metadata

**Severity**: Warning to Error

**Detection**: Checks `metadata.version` field

### 3. Contradiction Drift
Conflicting memory entries that make contradictory claims.

**Example**: 
- Decision A: "Require module X"
- Decision B: "Remove module X"

**Severity**: Critical to Warning

**Detection**: Analyzes architecture decisions for conflicts

### 4. Staleness Drift
Memory entries that are too old to be reliable.

**Thresholds**:
- Reasoning patterns: 180 days
- Architecture lessons: 365 days
- Issues: 90 days
- Project memory: 30 days

**Severity**: Info to Warning

**Detection**: Calculates age from `metadata.createdAt`

### 5. Cross-Agent Drift
Memory divergence across different Foreman agents.

**Example**: Foreman App memory ≠ GitHub Foreman memory

**Severity**: Error

**Detection**: Compares memory states across agents

### 6. Project Drift
Project memory missing required lifecycle data.

**Example**: Project with no milestone entries

**Severity**: Warning

**Detection**: Validates project memory completeness

### 7. Pattern Drift
Reasoning patterns that don't follow expected structure.

**Example**: Pattern missing `approach` field

**Severity**: Error

**Detection**: Validates reasoning pattern fields

### 8. Governance Drift
Memory that contradicts governance rules.

**Examples**:
- Secrets stored in memory (critical violation)
- Unauthorized enforcement claims
- Memory Before Action violations

**Severity**: Critical

**Detection**: Validates against governance rules

## Usage

### Basic Usage

```typescript
import { runDriftMonitoring } from '@/lib/foreman/memory'

// Run complete drift check
const report = await runDriftMonitoring()

if (report.executionBlocked) {
  console.error('CRITICAL: Memory drift detected')
  console.error(report.summary)
  // Execution is blocked - must fix drift before proceeding
  throw new Error('Memory drift detected')
}

console.log(`Drift status: ${report.overallStatus}`)
console.log(`Issues found: ${report.totalIssues}`)
```

### Integration with Reasoning Engine

Drift monitoring is automatically integrated into the reasoning engine:

```typescript
import { reason } from '@/lib/foreman/reasoning'

// Automatically runs drift check before loading memory
const result = await reason({
  subsystem: 'architecture',
  phase: 'planning',
  riskLevel: 'high'
})
// Throws error if critical drift detected
```

### Skip Drift Check (Use Sparingly)

```typescript
// Only use when you need to bypass drift checks (e.g., debugging)
const result = await reason(context, { skipDriftCheck: true })
```

### Individual Drift Checks

```typescript
import {
  detectSchemaDrift,
  detectVersionDrift,
  detectContradictionDrift,
  detectStalenessDrift
} from '@/lib/foreman/memory'

const allMemory = await getAllMemory()
const allEntries = [
  ...allMemory.global,
  ...allMemory.foreman,
  ...Object.values(allMemory.projects).flat()
]

// Run specific checks
const schemaResult = await detectSchemaDrift(allEntries)
const versionResult = await detectVersionDrift(allEntries)
const contradictionResult = await detectContradictionDrift(allEntries)
const stalenessResult = await detectStalenessDrift(allEntries)
```

### Custom Configuration

```typescript
const customConfig: DriftMonitorConfig = {
  enabledChecks: [
    'schema_drift',
    'version_drift',
    'governance_drift'
  ],
  stalenessThresholds: {
    reasoningPatterns: 90,  // More strict
    architectureLessons: 365,
    issues: 90,
    projectMemory: 30
  },
  blockOnCritical: true,
  blockOnMultipleErrors: true,
  errorThreshold: 3
}

const report = await runDriftMonitoring(customConfig)
```

## Drift Report Structure

```typescript
interface DriftReport {
  overallStatus: 'healthy' | 'warning' | 'error' | 'critical'
  totalIssues: number
  criticalCount: number
  errorCount: number
  warningCount: number
  infoCount: number
  checks: DriftCheckResult[]
  executionBlocked: boolean
  recommendations: string[]
  summary: string
  generatedAt: string
  memoryVersion: string
  scopes: MemoryScope[]
}
```

## When Drift Monitoring Runs

1. **Before Reasoning**: Automatically runs when `reason()` is called
2. **After Memory Writes**: Should be run periodically after significant memory updates
3. **At Build-Wave Boundaries**: Should be integrated into wave completion
4. **At Project Lifecycle Transitions**: When projects move between phases
5. **Scheduled Heartbeat**: Should run on a schedule (e.g., hourly)

## Execution Blocking Logic

Execution is blocked when:

1. **Critical drift exists** AND `blockOnCritical: true`
2. **Multiple errors exist** (≥ errorThreshold) AND `blockOnMultipleErrors: true`

When blocked, the reasoning engine will throw an error and prevent autonomous execution.

## Handling Drift Issues

### Schema Drift
✅ **Fix**: Update memory entry to match schema
```bash
# Update the entry to include all required fields
await writeMemoryEntry(scope, key, updatedValue, options)
```

### Contradiction Drift
✅ **Fix**: Resolve or deprecate one of the conflicting entries
```bash
# Option 1: Delete the outdated decision
await deleteMemoryEntry(scope, key)

# Option 2: Update the newer decision to reference the old one
await writeMemoryEntry(scope, key, {
  ...value,
  supersedes: oldDecisionId
}, options)
```

### Staleness Drift
✅ **Fix**: Review and update or archive stale entries
```bash
# Archive by moving to historical scope or deleting
await deleteMemoryEntry(scope, key)
```

### Governance Drift
✅ **Fix**: Remove policy violations immediately
```bash
# Never store secrets in memory - use secrets management
# Remove the offending entry
await deleteMemoryEntry(scope, key)
```

## Best Practices

1. **Run drift checks regularly** - Don't wait for execution to block
2. **Monitor drift trends** - Track `totalIssues` over time
3. **Address warnings early** - Don't wait for them to become errors
4. **Review stale memory** - Archive or update old entries
5. **Never bypass drift checks in production** - Only skip in development/debugging
6. **Fix critical drift immediately** - Don't let secrets or governance violations persist

## Memory Schemas

Schemas are located in `/memory/schemas/`:

- `historical-issues-schema.json` - For QA failures, errors, incidents
- `knowledge-base-schema.json` - For architecture lessons
- `reasoning-patterns-schema.json` - For reasoning patterns
- `project-memory-schema.json` - For project-scoped memory

## Testing

Run drift monitoring tests:

```bash
npm run test:drift
```

All tests:
```bash
npm run test:all
```

## Telemetry & Monitoring

Drift reports can be logged for monitoring:

```typescript
const report = await runDriftMonitoring()

// Log to monitoring system
console.log(JSON.stringify({
  timestamp: report.generatedAt,
  status: report.overallStatus,
  critical: report.criticalCount,
  errors: report.errorCount,
  warnings: report.warningCount,
  blocked: report.executionBlocked
}))
```

## Governance Compliance

This system enforces:
- **Memory Before Action** - Validated before reasoning
- **No Secrets in Memory** - Critical drift if secrets detected
- **Autonomy Class A1** - Memory integrity required for autonomous operation
- **Architecture Standardization** - Schema compliance required

## Future Enhancements

- **Automated Drift Repair** - Self-healing for common drift types
- **Drift Trend Analysis** - Historical drift metrics
- **Cross-Repository Drift** - Detect drift across multiple projects
- **Memory Conflict Resolution UI** - Visual tool for resolving contradictions

---

**Status**: ✅ Implemented  
**Version**: 1.0  
**Last Updated**: 2024-12-06  
**Owner**: Foreman Orchestration System
