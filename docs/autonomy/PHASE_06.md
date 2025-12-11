# 📘 PHASE_06.md — ML Issue Complexity & Safety Predictor

**Status:** ✅ Implemented  
**Wave:** 2  
**Layer:** Predictive Governance Engine  
**Last Updated:** 2025-12-11

---

## Purpose

Enable Foreman to autonomously select safe, low-risk issues for execution using ML-based complexity and safety forecasting.

**Key Capabilities:**
- Predict issue complexity (0-100 score)
- Forecast execution risk
- Recommend safe issues for autonomous waves
- Reject high-risk or governance-sensitive issues
- Build internal safety profile of the repository

This enables **smart autonomous execution** rather than random or unsafe issue selection.

---

## Implementation

### 1. Complexity Model

**Module:** `lib/foreman/analysis/issue-complexity.ts`

#### Complexity Score (0-100)

Weighted scoring across 9 factors:

1. **Code Surface Touched** (0-20 points)
   - Breadth of code modifications
   - Refactoring scope, rewrite indicators

2. **Architectural Depth** (0-15 points)
   - Architectural impact
   - Core system changes, framework modifications

3. **Files Modified** (0-15 points)
   - Estimated file count
   - Issue type and scope indicators

4. **Builder Difficulty** (0-10 points)
   - Difficulty for builder execution
   - Complexity keywords, integration requirements

5. **Dependency Impact** (0-10 points)
   - Impact on dependencies
   - Breaking changes, API modifications

6. **Security Sensitivity** (0-10 points)
   - Security implications
   - Authentication, credentials, security labels

7. **Governance Sensitivity** (0-10 points)
   - Governance implications
   - Workflow changes, policy modifications

8. **Historical Incidents** (0-5 points)
   - Past incident patterns
   - Bug labels, critical indicators

9. **Drift-Prone Area** (0-5 points)
   - Known drift areas
   - QIEL config, drift monitor, workflows

#### Safety Score (0-100, higher = safer)

Starts at 100, deductions applied:

1. **Governance Boundaries** (0-25 deducted)
   - Governance or constitutional labels

2. **Workflow Modification Risk** (0-20 deducted)
   - Workflow or CI/CD changes

3. **File Protection Level** (0-20 deducted)
   - CS1-protected files

4. **Mutation Radius** (0-15 deducted)
   - System-wide or global changes

5. **Regression Likelihood** (0-10 deducted)
   - Bug fixes, hotfixes, refactors

6. **Builder Reliability** (0-10 deducted)
   - Builder performance history

---

### 2. Machine Learning Heuristics

**Approach:** Domain-specific heuristic model (not heavy ML)

**Components:**
- ✅ Weighted scoring algorithm
- ✅ Repository metric extraction
- ✅ Label-based analysis
- ✅ Historical pattern recognition
- ✅ Governance memory integration

**No External Dependencies:** Pure local logic, no external ML services.

---

### 3. Risk Classification

Issues are classified into three categories:

#### SAFE → Allowed for Autonomous Execution
- Complexity Score: < 70
- Safety Score: ≥ 70
- No governance-protected paths
- ✅ Approved for autonomous waves

#### CONDITIONAL → Requires Human Approval
- Complexity Score: 70-100, OR
- Safety Score: 50-70
- Moderate risk
- ⚠️ Requires human approval

#### UNSAFE → Forbidden, Must Escalate to Johan
- Touches governance-protected paths, OR
- Safety Score: < 50
- High risk of violations
- 🚨 Must escalate to Johan

**Unsafe Examples:**
- Modifying workflows (`.github/workflows/`)
- Editing architecture files (`BUILD_PHILOSOPHY.md`)
- Editing governance documents (`foreman/constitution/`)
- Touching critical modules (guardrails, QIC, QIEL)

---

### 4. Governance-Protected Paths

Automatic UNSAFE classification for:
- `.github/workflows/`
- `foreman/constitution/`
- `docs/governance/`
- `.github/foreman/agent-contract.md`
- `BUILD_PHILOSOPHY.md`
- `foreman/architecture-design-checklist.md`

---

### 5. Logging

All predictions logged to:

1. **AUTONOMY_PILOT_LOG.md**
   - Decision (allowed/denied/escalated)
   - Timestamp
   - Issue details
   - Outcome

2. **docs/autonomy/analysis/ISSUE_COMPLEXITY_REPORT.md**
   - Full scoring breakdown
   - Complexity factors
   - Safety factors
   - Reasoning
   - Recommendation

---

## API Reference

### Calculate Complexity Score

```typescript
import { calculateComplexityScore } from '@/lib/foreman/analysis/issue-complexity'

const complexity = calculateComplexityScore(issue)
console.log('Score:', complexity.score) // 0-100
console.log('Factors:', complexity.factors)
console.log('Breakdown:', complexity.breakdown)
```

### Calculate Safety Score

```typescript
import { calculateSafetyScore } from '@/lib/foreman/analysis/issue-complexity'

const safety = calculateSafetyScore(issue)
console.log('Score:', safety.score) // 0-100, higher = safer
console.log('Factors:', safety.factors)
console.log('Breakdown:', safety.breakdown)
```

### Classify Risk

```typescript
import { classifyRisk } from '@/lib/foreman/analysis/issue-complexity'

const classification = classifyRisk(issue)
console.log('Level:', classification.level) // SAFE | CONDITIONAL | UNSAFE
console.log('Allow Autonomous:', classification.allowAutonomousExecution)
console.log('Requires Approval:', classification.requiresHumanApproval)
console.log('Escalate:', classification.escalateToJohan)
console.log('Recommendation:', classification.recommendation)
console.log('Reasoning:', classification.reasoning)
```

### Log Analysis

```typescript
import { logComplexityAnalysis } from '@/lib/foreman/analysis/issue-complexity'

logComplexityAnalysis(issue, classification)
// Logs to AUTONOMY_PILOT_LOG.md
// Appends to ISSUE_COMPLEXITY_REPORT.md
```

---

## Usage Example

```typescript
import { classifyRisk, logComplexityAnalysis } from '@/lib/foreman/analysis/issue-complexity'

// Analyze issue
const classification = classifyRisk(issue)

// Check if safe for autonomous execution
if (classification.allowAutonomousExecution) {
  console.log('✅ Safe for autonomous execution')
  // Add to wave
} else if (classification.requiresHumanApproval) {
  console.log('⚠️ Requires human approval')
  // Request approval
} else if (classification.escalateToJohan) {
  console.log('🚨 Must escalate to Johan')
  // Escalate
}

// Log analysis
logComplexityAnalysis(issue, classification)
```

---

## Acceptance Criteria

- ✅ Predictions are deterministic (same input = same output)
- ✅ Unsafe issues blocked automatically
- ✅ Complex issues escalated
- ✅ Safe issues selected for Wave 2
- ✅ Logs show full scoring breakdown
- ✅ Dashboard can display complexity data
- ✅ No external ML services (pure local logic)

---

## Security Requirements

- ✅ No model may override governance blocks
- ✅ Predictions are explainable (reasoning included)
- ✅ All decisions logged
- ✅ No external calls (pure local logic)
- ✅ Governance-protected paths automatically flagged

---

## Integration Points

- **CS1 Guardrails**: Validates against protected paths
- **CS7 Autonomy Log**: Records all decisions
- **Wave Orchestrator**: Uses scores for issue selection
- **Builder Router**: Considers complexity in routing
- **Dashboard**: Displays complexity metrics

---

## Performance

- **Analysis Time**: < 10ms per issue
- **Memory Usage**: Minimal (stateless analysis)
- **No Network Calls**: Pure local computation
- **Deterministic**: Same input always produces same output

---

## Future Enhancements

- Integration with actual PR history for better accuracy
- Machine learning model training on historical data
- Dynamic threshold adjustment based on success rates
- Repository-specific complexity calibration
- Real-time drift detection integration

---

*This phase implements Predictive Governance Engine and is protected under CS1 Guardrails. Modifications require CS2 Architecture Change Approval.*
