# 📘 PHASE_05.md — Multi-Issue Wave Orchestrator

**Status:** ✅ Implemented  
**Wave:** 2  
**Constitutional Layer:** Autonomous Wave Engine  
**Last Updated:** 2025-12-11

---

## Purpose

Enable Foreman to execute multiple issues autonomously in a safe, controlled wave.

**Key Principle:** Bounded parallel execution with full governance oversight.

---

## Requirements

### 1. Wave Engine Module

**Implementation:** `lib/foreman/execution/wave-orchestrator.ts`

**Capabilities:**

✅ **Select Issues**
```typescript
interface IssueSelection {
  issueNumber: number
  priority: number
  complexity: number
  dependencies: number[]
  safeScope: boolean
  estimatedDuration: number
}

function selectIssuesForWave(
  availableIssues: Issue[],
  waveConfig: WaveConfig
): IssueSelection[]
```

**Selection Criteria:**
- Priority score
- Complexity assessment
- Dependency analysis
- Safe scope validation
- Builder availability
- Resource constraints

✅ **Determine Safe Builder**
```typescript
interface BuilderRecommendation {
  builder: 'github-copilot' | 'local-builder'
  confidence: number
  reason: string
  fallbackBuilder?: string
}

function recommendBuilder(issue: Issue): BuilderRecommendation
```

**Builder Selection Logic:**
- Complexity score
- File count estimate
- Architectural scope
- Builder health status
- Historical success rate
- Current builder load

✅ **Sequence Tasks**
```typescript
interface TaskSequence {
  tasks: Task[]
  parallelGroups: Task[][]
  dependencies: Map<string, string[]>
  criticalPath: string[]
}

function sequenceTasks(issues: Issue[]): TaskSequence
```

**Sequencing Rules:**
- Respect dependencies
- Maximize parallelism
- Minimize critical path
- Balance builder load
- Honor governance constraints

✅ **Pause/Resume Waves**
```typescript
async function pauseWave(waveId: string): Promise<void>
async function resumeWave(waveId: string): Promise<void>
async function getWaveStatus(waveId: string): Promise<WaveStatus>
```

**Pause Triggers:**
- Manual user command
- Governance violation detected
- Critical failure rate exceeded
- Resource constraints
- Scheduled maintenance

✅ **Abort on Governance Violations**
```typescript
interface GovernanceViolation {
  type: 'guardrail' | 'qiel' | 'drift' | 'security'
  severity: 'low' | 'medium' | 'high' | 'critical'
  action: 'warn' | 'block' | 'abort'
}

async function handleGovernanceViolation(
  waveId: string,
  violation: GovernanceViolation
): Promise<WaveAction>
```

**Abort Conditions:**
- Critical guardrail violation
- Architectural drift detected
- Security regression found
- Multiple consecutive failures
- Manual abort command

✅ **Collect Wave Metrics**
```typescript
interface WaveMetrics {
  totalIssues: number
  completedIssues: number
  failedIssues: number
  averageCompletionTime: number
  successRate: number
  builderDistribution: Record<string, number>
  governanceInterventions: number
  totalDuration: number
  resourceUtilization: number
}

async function collectWaveMetrics(waveId: string): Promise<WaveMetrics>
```

---

### 2. Wave Rules

**Foreman must:**

#### ✅ Execute Max 3 Issues at Once

```typescript
const WAVE_CONFIG = {
  maxParallelIssues: 3,
  maxWaveSize: 10,
  issueTimeoutMs: 30 * 60 * 1000, // 30 minutes
  continueOnFailure: false
}
```

**Rationale:**
- Prevent resource exhaustion
- Enable focused monitoring
- Reduce blast radius of failures
- Maintain quality oversight

#### ✅ Always Respect Architectural Boundaries

```typescript
interface ArchitecturalBoundary {
  module: string
  allowedFiles: string[]
  immutablePaths: string[]
  dependencies: string[]
}

function validateArchitecturalBoundaries(
  changes: FileChange[]
): ValidationResult
```

**Boundaries:**
- Module isolation
- Component separation
- API contract preservation
- Database schema protection
- Configuration stability

#### ✅ Stop Wave If Violations Detected

**Stop Conditions:**

1. **QIC Fails**
   ```typescript
   if (qicResult.errors.length > 0) {
     await stopWave(waveId, 'QIC_FAILURE')
     await createIncident('qic-failure', qicResult.errors)
   }
   ```

2. **QIEL Fails**
   ```typescript
   if (qielResult.violations.length > 0) {
     await stopWave(waveId, 'QIEL_VIOLATION')
     await createIncident('qiel-violation', qielResult.violations)
   }
   ```

3. **Drift Detected**
   ```typescript
   if (driftResult.detected) {
     await stopWave(waveId, 'DRIFT_DETECTED')
     await createIncident('drift-detected', driftResult.details)
   }
   ```

4. **Builder Fails Twice**
   ```typescript
   if (builderFailureCount >= 2) {
     await stopWave(waveId, 'BUILDER_FAILURE')
     await createIncident('builder-failure', builderErrors)
   }
   ```

---

### 3. Logging

**Every wave must produce:**

#### Wave Summary Document

**Location:** `docs/autonomy/waves/WAVE_[N]_SUMMARY.md`

**Format:**
```markdown
# Wave [N] Summary

**Wave ID**: wave-[N]-[timestamp]
**Status**: [complete|failed|aborted]
**Start Time**: [ISO timestamp]
**End Time**: [ISO timestamp]
**Duration**: [minutes]

## Wave Configuration

- Max Parallel Issues: 3
- Wave Size: [N] issues
- Continue on Failure: false
- Timeout: 30 minutes

## Issues Executed

### Issue #123 - Add User Profile
- **Status**: ✅ Complete
- **Builder**: github-copilot
- **Duration**: 12 minutes
- **QA Status**: Green
- **PR**: #456

### Issue #124 - Fix Navigation
- **Status**: ❌ Failed
- **Builder**: local-builder
- **Duration**: 8 minutes
- **Error**: QIC lint failure
- **Incident**: CS3-2025-12-11-001

## Wave Metrics

- Total Issues: 10
- Completed: 8
- Failed: 2
- Success Rate: 80%
- Average Duration: 15 minutes
- Builder Distribution:
  - github-copilot: 6
  - local-builder: 4

## Governance Events

- Guardrail Hits: 2
- QIEL Violations: 0
- Drift Alerts: 1
- Manual Interventions: 0

## Lessons Learned

- [Key insights from wave execution]
- [Areas for improvement]
- [Pattern observations]
```

---

## Acceptance Criteria

- ✅ Foreman executes 2–3 issues in parallel
- ✅ Wave logs generated
- ✅ Dashboard displays wave progress
- ✅ Governance prevents unsafe waves
- ✅ Wave can be paused and resumed
- ✅ Failed waves create incidents
- ✅ Metrics accurately collected
- ✅ Dependency sequencing works
- ✅ Builder selection optimized
- ✅ Resource constraints respected

---

## Implementation Status

### Completed Components

- ✅ `lib/foreman/execution/wave-orchestrator.ts` - Core orchestrator
- ✅ `lib/foreman/wave2-execution.ts` - Wave 2 implementation
- ✅ `lib/foreman/pilot-waves.ts` - Pilot wave logic
- ✅ Issue selection algorithm
- ✅ Builder recommendation system
- ✅ Task sequencing engine
- ✅ Pause/resume functionality
- ✅ Metrics collection
- ✅ Wave summary generation

### Integration Points

- **CS1 Guardrails**: Pre-wave validation
- **CS3 Incident System**: Failed issue handling
- **CS4 Governance Alerts**: Real-time violations
- **CS7 Autonomy Log**: Wave action logging
- **Builder Executor**: Individual task execution
- **PR Auto-Merge**: Post-build merging
- **Dashboard**: Wave visualization

---

## Usage Example

```typescript
import { executeWave, getWaveStatus } from '@/lib/foreman/execution/wave-orchestrator'

// Define wave configuration
const waveConfig = {
  maxParallelIssues: 3,
  maxWaveSize: 10,
  continueOnFailure: false,
  issueTimeoutMs: 30 * 60 * 1000
}

// Select issues for wave
const issues = await selectIssuesForWave(availableIssues, waveConfig)

// Execute wave
const waveResult = await executeWave(issues, waveConfig)

console.log('Wave Status:', waveResult.status)
console.log('Completed:', waveResult.completedIssues)
console.log('Failed:', waveResult.failedIssues)
console.log('Success Rate:', 
  (waveResult.completedIssues / waveResult.totalIssues) * 100)

// Monitor wave progress
const status = await getWaveStatus(waveResult.waveId)
console.log('Current Progress:', status.progress)
console.log('Remaining Issues:', status.remainingIssues)
```

---

## Wave Execution Flow

```
Wave Start
├─ Load Wave Config
├─ Select Issues (priority, complexity, dependencies)
├─ Validate Safe Scope
├─ Recommend Builders
├─ Sequence Tasks
└─ Begin Execution

Parallel Execution (Max 3)
├─ Issue 1 → Builder A → QA → Merge
├─ Issue 2 → Builder B → QA → Merge
└─ Issue 3 → Builder A → QA → Merge

Monitor & Control
├─ Check QIC/QIEL continuously
├─ Detect drift
├─ Track failures
├─ Pause if needed
└─ Abort on critical violations

Wave Complete
├─ Collect metrics
├─ Generate summary
├─ Update dashboard
├─ Create incidents for failures
└─ Log to AUTONOMY_PILOT_LOG
```

---

## Wave Complexity Scoring

```typescript
interface ComplexityFactors {
  fileCount: number              // +1 per file
  linesOfCodeEstimate: number    // +0.1 per 100 lines
  dependencyCount: number        // +2 per dependency
  isArchitecturalChange: boolean // +5 if true
  requiresSchemaChanges: boolean // +3 if true
}

function calculateComplexity(issue: Issue): number {
  let score = 0
  score += issue.fileCount
  score += (issue.linesOfCodeEstimate / 100) * 0.1
  score += issue.dependencyCount * 2
  if (issue.isArchitecturalChange) score += 5
  if (issue.requiresSchemaChanges) score += 3
  return score
}

// Complexity Levels
// 0-3:  Low (any builder)
// 4-7:  Medium (prefer GitHub Copilot)
// 8-12: High (GitHub Copilot required)
// 13+:  Very High (manual review required)
```

---

## Security Considerations

1. **Wave Isolation**: Each wave runs in isolated context
2. **Resource Limits**: CPU/memory/time constraints enforced
3. **Blast Radius**: Failures contained to wave scope
4. **Rollback**: Failed waves can be rolled back atomically
5. **Audit Trail**: Complete wave execution history
6. **Access Control**: Wave execution requires authorization

---

## Dependencies

- **Requires:** PHASE_01 (Autonomous Mode Pilot)
- **Requires:** PHASE_02 (Builder Execution Engine)
- **Requires:** PHASE_03 (PR Auto-Merge Engine)
- **Integrates with:** PHASE_04 (Autonomy Dashboard UI)

---

## Performance Optimization

1. **Builder Pool**: Maintain pool of ready builders
2. **Task Cache**: Cache dependency analysis
3. **Parallel I/O**: Concurrent file operations
4. **Incremental Builds**: Reuse previous build artifacts
5. **Smart Scheduling**: Optimize task ordering

---

## Future Enhancements

- **Adaptive Parallelism**: Dynamically adjust parallel count
- **Predictive Failure**: ML-based failure prediction
- **Auto-Recovery**: Automatic retry with corrected context
- **Cross-Wave Learning**: Share insights between waves
- **Multi-Repository Waves**: Coordinate across repos

---

*This phase implements Autonomous Wave Engine and is protected under CS1 Guardrails. Modifications require CS2 Architecture Change Approval.*
