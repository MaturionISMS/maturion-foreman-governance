# 📘 PHASE_07.md — Builder Capability & Performance Registry

**Status:** ✅ Implemented  
**Wave:** 2  
**Layer:** Builder Autonomy Engine  
**Last Updated:** 2025-12-11

---

## Purpose

Formalize a registry that tracks builders' capabilities, reliability, past performance, and suitability for tasks.

**Key Capabilities:**
- Choose the best builder for each issue
- Score builder reliability
- Track past failures
- Detect outages
- Understand builder strengths
- Implement smart fallback logic

Builders become **first-class governed entities**.

---

## Implementation

### 1. Capability Registry

**Module:** `lib/foreman/builders/capability-registry.ts`

#### Builder Capabilities

Each builder defines:

```typescript
interface BuilderCapability {
  builderType: 'github-copilot' | 'local-builder'
  
  supportedOperations: string[]
  // e.g., 'code-generation', 'refactoring', 'test-creation', 'documentation'
  
  fileTypes: string[]
  // e.g., '.ts', '.tsx', '.js', '.jsx', '.md'
  
  codeDomains: string[]
  // e.g., 'frontend', 'backend', 'api', 'ui', 'testing'
  
  performanceCharacteristics: {
    averageCompletionTimeMs: number
    maxComplexitySupported: number
    optimalFileCount: number
    parallelExecutionCapable: boolean
  }
  
  failureModes: string[]
  // e.g., 'token-limit-exceeded', 'complexity-too-high'
}
```

#### GitHub Copilot Capabilities

- **Supported Operations:** code-generation, refactoring, test-creation, documentation, bug-fixing, enhancement, integration
- **File Types:** .ts, .tsx, .js, .jsx, .md, .json, .yml, .yaml
- **Code Domains:** frontend, backend, api, ui, testing, documentation, configuration
- **Max Complexity:** 80/100
- **Optimal File Count:** 5 files
- **Parallel Execution:** Yes

#### Local Builder Capabilities

- **Supported Operations:** code-generation, simple-refactoring, documentation, bug-fixing, small-enhancement
- **File Types:** .ts, .tsx, .js, .jsx, .md, .json
- **Code Domains:** frontend, ui, documentation, testing
- **Max Complexity:** 50/100
- **Optimal File Count:** 3 files
- **Parallel Execution:** No

---

### 2. Performance Profile

**Storage:** `foreman/data/builder-profiles.json`

#### Metrics Tracked

```typescript
interface BuilderPerformanceProfile {
  builderType: BuilderType
  
  // Success Metrics
  totalBuilds: number
  successfulBuilds: number
  failedBuilds: number
  successRate: number
  
  // Iteration Metrics
  averageBuildIterations: number
  maxIterationsObserved: number
  
  // QA Metrics
  qicPassRate: number
  qielPassRate: number
  
  // Recovery Metrics
  averageRecoveryTimeMs: number
  recoverySuccessRate: number
  
  // Drift Metrics
  driftFrequency: number
  driftSeverity: 'low' | 'medium' | 'high'
  
  // Security Metrics
  securityIncidents: number
  lastSecurityIncident?: string
  
  // Latency Metrics
  averageLatencyMs: number
  p95LatencyMs: number
  p99LatencyMs: number
  
  // Recent Performance
  recentFailures: BuilderFailure[]
  recentSuccesses: BuilderSuccess[]
  
  // Status
  isHealthy: boolean
  lastHealthCheck: string
  availability: number // 0-100
}
```

#### Builder Health Assessment

Builder is **unhealthy** if:
- Success rate < 70%
- Recent failures > 5
- Drift severity is high
- Security incidents > 0

#### Availability Calculation

Starts at 100%, deductions:
- Success rate < 90%: deduct difference
- Recent failures: deduct 5 per failure
- Medium drift: deduct 10
- High drift: deduct 30
- Security incidents: deduct 20 per incident

---

### 3. Routing Engine

**Module:** `lib/foreman/execution/builder-router.ts`

#### Smart Builder Selection

Routes issues based on:

1. **Capability Match** (0-20 points)
   - Supported operations
   - File type compatibility
   - Code domain expertise

2. **Complexity Handling** (0-20 points)
   - Can handle issue complexity
   - Utilization ratio within optimal range

3. **Performance History** (0-20 points)
   - Success rate
   - QA pass rates
   - Drift frequency

4. **Availability** (0-15 points)
   - Current availability percentage
   - Health status

5. **Recent Reliability** (0-15 points)
   - Recent failures
   - Drift severity
   - Security incidents

6. **Safety Considerations** (0-10 points)
   - Safety score fit
   - Risk tolerance

#### Routing Rules

- **ALWAYS** choose safest builder
- **NEVER** choose builder with recent drift
- **ALWAYS** fallback on failure
- Check availability before routing
- Consider complexity constraints
- Prefer high-performing builders

#### Fallback Logic

If primary builder fails:
1. Check for healthy alternatives
2. Select next best-scoring builder
3. If no alternatives, escalate

---

### 4. API Reference

#### Initialize Profiles

```typescript
import { initializeBuilderProfiles } from '@/lib/foreman/builders/capability-registry'

initializeBuilderProfiles()
// Creates foreman/data/builder-profiles.json if not exists
```

#### Get Builder Capability

```typescript
import { getBuilderCapability } from '@/lib/foreman/builders/capability-registry'

const capability = getBuilderCapability('github-copilot')
console.log('Max Complexity:', capability.performanceCharacteristics.maxComplexitySupported)
console.log('Supported Operations:', capability.supportedOperations)
```

#### Get Builder Performance

```typescript
import { getBuilderPerformance } from '@/lib/foreman/builders/capability-registry'

const performance = getBuilderPerformance('github-copilot')
console.log('Success Rate:', performance.successRate)
console.log('Is Healthy:', performance.isHealthy)
console.log('Availability:', performance.availability)
```

#### Update Builder Performance

```typescript
import { updateBuilderPerformance } from '@/lib/foreman/builders/capability-registry'

updateBuilderPerformance(
  'github-copilot',
  true, // success
  120000, // durationMs
  2, // iterations
  true, // qaPassed
  123, // issueNumber
  undefined // error
)
```

#### Route to Builder

```typescript
import { routeToBuilder } from '@/lib/foreman/execution/builder-router'

const recommendation = routeToBuilder(issue)
console.log('Builder:', recommendation.builderType)
console.log('Confidence:', recommendation.confidence)
console.log('Reason:', recommendation.reason)
console.log('Fallback:', recommendation.fallbackBuilder)
console.log('Estimated Duration:', recommendation.estimatedDurationMs)
console.log('Risk Level:', recommendation.riskLevel)
```

#### Check Builder Availability

```typescript
import { isBuilderAvailable, getHealthyBuilders } from '@/lib/foreman/builders/capability-registry'

if (isBuilderAvailable('github-copilot')) {
  console.log('✅ GitHub Copilot is available')
}

const healthy = getHealthyBuilders()
console.log('Healthy builders:', healthy)
```

---

## Usage Example

```typescript
import { routeToBuilder, getFallbackBuilder } from '@/lib/foreman/execution/builder-router'
import { updateBuilderPerformance } from '@/lib/foreman/builders/capability-registry'

// Route issue to builder
const recommendation = routeToBuilder(issue)
console.log(`Routing to ${recommendation.builderType}`)
console.log(`Confidence: ${recommendation.confidence}%`)
console.log(`Estimated: ${(recommendation.estimatedDurationMs / 60000).toFixed(1)} min`)

// Execute with primary builder
try {
  const result = await executeWithBuilder(recommendation.builderType, issue)
  
  // Update performance on success
  updateBuilderPerformance(
    recommendation.builderType,
    true,
    result.durationMs,
    result.iterations,
    result.qaPassed,
    issue.number
  )
} catch (error) {
  // Update performance on failure
  updateBuilderPerformance(
    recommendation.builderType,
    false,
    0,
    0,
    false,
    issue.number,
    error.message
  )
  
  // Try fallback builder
  if (recommendation.fallbackBuilder) {
    console.log(`Falling back to ${recommendation.fallbackBuilder}`)
    await executeWithBuilder(recommendation.fallbackBuilder, issue)
  }
}
```

---

## Logging

All routing decisions logged to:

1. **AUTONOMY_PILOT_LOG.md**
   - Builder routing decisions
   - Performance updates
   - Fallback activations

2. **Builder Insights Panel** (Dashboard)
   - Real-time builder status
   - Performance metrics
   - Recent activities

---

## Acceptance Criteria

- ✅ Registry loads correctly
- ✅ Builders scored dynamically
- ✅ Routing decisions logged
- ✅ Outages handled automatically
- ✅ Foreman updates builder profiles after each build
- ✅ Fallback logic works correctly
- ✅ Health assessment accurate
- ✅ Availability calculated properly

---

## Integration Points

- **CS7 Autonomy Log**: Records all routing decisions
- **Wave Orchestrator**: Uses routing for issue distribution
- **Builder Executor**: Executes with selected builder
- **Complexity Analyzer**: Provides complexity scores for routing
- **Dashboard**: Displays builder metrics

---

## Security Considerations

1. **Profile Integrity**: Builder profiles stored securely
2. **No Tampering**: Profiles updated only by system
3. **Audit Trail**: All updates logged
4. **Governance Compliance**: Unhealthy builders blocked
5. **Drift Detection**: Immediate health downgrade on drift

---

## Performance

- **Routing Decision**: < 5ms per issue
- **Profile Update**: < 10ms per build
- **Profile Load**: < 5ms
- **Memory Usage**: Minimal (profiles cached)

---

## Future Enhancements

- Machine learning for builder selection optimization
- Real-time builder performance monitoring
- Auto-scaling builder pool
- Cross-repository builder performance sharing
- Predictive failure detection
- Dynamic capability discovery

---

*This phase implements Builder Autonomy Engine and is protected under CS1 Guardrails. Modifications require CS2 Architecture Change Approval.*
