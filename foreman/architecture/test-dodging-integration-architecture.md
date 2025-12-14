# Test Dodging Integration Architecture

**Version:** 1.0  
**Date:** 2025-12-14  
**Status:** Active  
**Authority:** Constitutional Enforcement  

---

## 1. Purpose and Scope

### 1.1 Purpose

Implement autonomous Test Dodging detection, prevention, and elimination across the Maturion Engineering Ecosystem to ensure QA truthfulness and prevent test weakening, bypassing, or neutralization.

### 1.2 Scope

- **Detection:** Identify Test Dodging patterns automatically
- **Prevention:** Block execution when Test Dodging detected
- **Incident Logging:** Register all Test Dodging occurrences
- **Historical Audit:** Scan repository for existing Test Dodging patterns
- **Remediation:** Correct tests and implementations to restore QA truth
- **Enforcement:** Embed detection into Builder and Foreman behavior

### 1.3 Constitutional Alignment

This architecture implements:
- `/foreman/governance/test-dodging-constitutional-rule.md`
- `/foreman/governance/zero-test-debt-constitutional-rule.md`
- `/BUILD_PHILOSOPHY.md` (Zero Test Debt enforcement)
- Governance Supremacy Rule (GSR)

---

## 2. Test Dodging Signal Detection

### 2.1 Signal Categories

#### Group A — Sudden or Suspicious GREEN
**Signals:**
- Tests go from failing → passing without corresponding implementation change
- Large failures disappear after "test refactor"
- CI turns GREEN faster than realistic debugging would allow

**Detection Method:**
- Git diff analysis: test changes vs implementation changes
- Timeline analysis: time between failure and resolution
- Change size analysis: test change size vs implementation change size
- Pattern: `testChanges > implChanges && timeToGreen < expectedTime`

#### Group B — Assertion Weakening
**Signals:**
- Assertions replaced with type/structure checks only
- Removal of behavioral assertions
- Tests that assert "exists" instead of "behaves"

**Detection Method:**
- AST analysis of test files
- Pattern matching for weak assertions:
  - `expect(x).toBeDefined()` replacing `expect(x).toBe(expectedValue)`
  - `expect(typeof x).toBe('object')` replacing behavior checks
  - Removal of `.toEqual()`, `.toMatch()`, `.toContain()` assertions
- Assertion count reduction without feature removal

#### Group C — Empty or Hollow Tests
**Signals:**
- Test suites with no assertions
- Placeholder tests added to silence failures
- Tests that only assert `true === true`

**Detection Method:**
- Static analysis for:
  - Test blocks with zero assertions
  - Tests with only trivial assertions (`expect(true).toBe(true)`)
  - Test files with `it.todo()` or empty `it()` blocks
  - Comment patterns: `// TODO: implement test`

#### Group D — Scope Reclassification
**Signals:**
- Behavior tests reclassified as "non-critical"
- "Integration noise" used as justification
- "Helper-only failure" language appears

**Detection Method:**
- Commit message analysis for justification patterns
- Test file categorization changes (e.g., moving from `critical/` to `optional/`)
- `.skip()` introduction with comments containing reclassification language

#### Group E — Process Language Smell
**Signals:**
- "Temporary"
- "Minor"
- "Non-blocking"
- "Follow-up issue"
- "Out of scope for now"

**Detection Method:**
- Code comment scanning
- Commit message scanning
- PR description scanning
- Pattern matching for language that minimizes QA

### 2.2 Detection Thresholds

**High Confidence (Halt Immediately):**
- Any Group C signal (empty/hollow tests)
- Group B with > 50% assertion reduction
- Group E language in test-related commits

**Medium Confidence (Flag for Review):**
- Group A with suspicious timing
- Group B with < 50% assertion reduction
- Group D patterns

**Low Confidence (Log and Monitor):**
- Potential Group A patterns (needs context)
- Single instance of Group E language

---

## 3. System Architecture

### 3.1 Component Overview

```
┌─────────────────────────────────────────────────────────────┐
│                  Test Dodging Detection System               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Detector   │  │  Analyzer    │  │   Auditor    │     │
│  │   Engine     │  │              │  │              │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │             │
│         │                  │                  │             │
│         └────────┬─────────┴──────────────────┘             │
│                  │                                          │
│         ┌────────▼──────────┐                               │
│         │   Incident Log    │                               │
│         └────────┬──────────┘                               │
│                  │                                          │
│    ┌─────────────▼─────────────┐                           │
│    │  Governance Memory        │                           │
│    └───────────────────────────┘                           │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Detector Engine

**File:** `/lib/foreman/qa/test-dodging-detector.ts`

**Responsibilities:**
- Run signal detection on test files
- Analyze git history for dodging patterns
- Compare test changes to implementation changes
- Detect assertion weakening
- Identify empty/hollow tests
- Scan for process language smells

**API:**
```typescript
interface TestDodgingDetector {
  // Scan current codebase for test dodging
  scanRepository(): Promise<TestDodgingReport>;
  
  // Analyze a specific commit/PR for test dodging
  analyzeChanges(diff: GitDiff): Promise<TestDodgingSignal[]>;
  
  // Check a test file for dodging patterns
  checkTestFile(filePath: string): Promise<TestDodgingSignal[]>;
  
  // Verify test suite integrity
  verifyTestSuiteIntegrity(): Promise<boolean>;
}

interface TestDodgingSignal {
  type: 'sudden_green' | 'assertion_weakening' | 'empty_test' | 
        'scope_reclassification' | 'language_smell';
  confidence: 'high' | 'medium' | 'low';
  location: {
    file: string;
    line?: number;
    commit?: string;
  };
  evidence: string;
  recommendation: string;
}

interface TestDodgingReport {
  hasViolations: boolean;
  signals: TestDodgingSignal[];
  summary: {
    high: number;
    medium: number;
    low: number;
  };
  timestamp: string;
}
```

### 3.3 Analyzer Module

**File:** `/lib/foreman/qa/test-dodging-analyzer.ts`

**Responsibilities:**
- Perform deep analysis of flagged patterns
- Compare before/after test behavior
- Calculate risk scores
- Generate remediation recommendations

**API:**
```typescript
interface TestDodgingAnalyzer {
  // Analyze a signal for detailed risk assessment
  analyzeSignal(signal: TestDodgingSignal): Promise<TestDodgingAnalysis>;
  
  // Calculate risk score for a test file
  calculateRiskScore(filePath: string): Promise<number>;
  
  // Generate remediation plan
  generateRemediationPlan(analysis: TestDodgingAnalysis): Promise<RemediationPlan>;
}

interface TestDodgingAnalysis {
  signal: TestDodgingSignal;
  riskScore: number; // 0-100
  impact: 'critical' | 'high' | 'medium' | 'low';
  affectedTests: string[];
  rootCause: string;
  remediationRequired: boolean;
}

interface RemediationPlan {
  actions: RemediationAction[];
  estimatedEffort: string;
  blocksExecution: boolean;
}

interface RemediationAction {
  type: 'restore_assertion' | 'implement_test' | 'fix_implementation' | 
        'revert_change' | 'add_coverage';
  description: string;
  file: string;
  priority: 'immediate' | 'high' | 'medium';
}
```

### 3.4 Historical Auditor

**File:** `/lib/foreman/qa/test-dodging-auditor.ts`

**Responsibilities:**
- Scan entire git history for test dodging patterns
- Identify historical weakening trends
- Generate audit reports
- Flag structural test dodging

**API:**
```typescript
interface TestDodgingAuditor {
  // Audit entire repository history
  auditHistory(options?: AuditOptions): Promise<AuditReport>;
  
  // Audit specific time range
  auditDateRange(startDate: Date, endDate: Date): Promise<AuditReport>;
  
  // Audit specific file history
  auditFileHistory(filePath: string): Promise<FileAuditReport>;
}

interface AuditOptions {
  depth?: number; // How many commits to scan (default: all)
  filePattern?: string; // Limit to specific files
  skipMerges?: boolean;
}

interface AuditReport {
  scannedCommits: number;
  violations: TestDodgingViolation[];
  trends: TrendAnalysis;
  recommendations: string[];
  timestamp: string;
}

interface TestDodgingViolation {
  commit: string;
  author: string;
  date: string;
  files: string[];
  signals: TestDodgingSignal[];
  severity: 'critical' | 'high' | 'medium' | 'low';
}

interface TrendAnalysis {
  testCoverageOverTime: Array<{ date: string; coverage: number }>;
  assertionDensityOverTime: Array<{ date: string; density: number }>;
  dodgingIncidentsOverTime: Array<{ date: string; count: number }>;
}
```

### 3.5 Incident Registration

**File:** `/lib/foreman/incidents/test-dodging-incidents.ts`

**Responsibilities:**
- Create Test Dodging incidents
- Link to existing incident system
- Track resolution
- Update governance memory

**API:**
```typescript
interface TestDodgingIncidentSystem {
  // Register a test dodging incident
  registerIncident(signal: TestDodgingSignal, analysis: TestDodgingAnalysis): Promise<Incident>;
  
  // Link multiple signals to single incident
  consolidateIncidents(signals: TestDodgingSignal[]): Promise<Incident>;
  
  // Mark incident as resolved
  resolveIncident(incidentId: string, resolution: Resolution): Promise<void>;
}

interface Resolution {
  type: 'tests_corrected' | 'implementation_fixed' | 'false_positive';
  details: string;
  qaPassed: boolean;
  timestamp: string;
}
```

---

## 4. Integration Points

### 4.1 Builder Integration

**Location:** Builder constraint enforcement

**Behavior:**
- Builders MUST run Test Dodging detector before accepting tasks
- Builders MUST halt if high-confidence signals detected
- Builders MUST register incidents immediately
- Builders MUST escalate to Foreman

**Implementation:**
```typescript
// In builder task acceptance
async function acceptBuildTask(task: BuildTask): Promise<void> {
  // Run Test Dodging detection
  const detector = new TestDodgingDetector();
  const signals = await detector.analyzeChanges(task.diff);
  
  const highConfidenceSignals = signals.filter(s => s.confidence === 'high');
  
  if (highConfidenceSignals.length > 0) {
    // HALT: Test Dodging detected
    await registerTestDodgingIncident(highConfidenceSignals);
    throw new TestDodgingViolation(
      'Test Dodging detected. Cannot proceed with build.',
      highConfidenceSignals
    );
  }
  
  // Continue with build
}
```

### 4.2 Foreman Integration

**Location:** QA validation pipeline

**Behavior:**
- Foreman MUST run Test Dodging detector during QA validation
- Foreman MUST block PR merge if violations detected
- Foreman MUST coordinate remediation
- Foreman MUST verify resolution

**Implementation:**
```typescript
// In QA validation
async function validateQA(prId: string): Promise<QAResult> {
  // ... existing QA checks ...
  
  // Run Test Dodging detection
  const detector = new TestDodgingDetector();
  const report = await detector.scanRepository();
  
  if (report.hasViolations) {
    // Log to governance memory
    await logGovernanceEvent({
      type: 'test_dodging_detected',
      severity: 'critical',
      description: `Test Dodging detected: ${report.summary.high} high-confidence violations`,
      metadata: { report },
    });
    
    // Block QA
    return {
      passed: false,
      reason: 'Test Dodging violations detected',
      violations: report.signals,
    };
  }
  
  // QA passed
  return { passed: true };
}
```

### 4.3 QIC/QIEL Integration

**Location:** Quality Integrity Contract enforcement

**New QIC Anchor:**

#### QIC-6: Test Dodging Prevention
- Test Dodging detector runs on every QA validation
- High-confidence signals → QA FAIL (immediate)
- Medium-confidence signals → Manual review required
- Low-confidence signals → Logged and monitored
- **No builds pass with Test Dodging violations**

**QIEL Configuration Update:**
```typescript
// Add Test Dodging check to QIEL
{
  check: 'test_dodging_detection',
  severity: 'critical',
  blocking: true,
  detector: TestDodgingDetector,
}
```

### 4.4 CI/CD Integration

**Location:** GitHub Actions workflow

**Behavior:**
- Run Test Dodging detector on every PR
- Report findings as PR comments
- Block merge if violations detected
- Generate audit reports

---

## 5. Data Flow

### 5.1 Detection Flow

```
Code Commit
    │
    ▼
Test Dodging Detector
    │
    ├─► High Confidence Signal
    │       │
    │       ▼
    │   Register Incident
    │       │
    │       ▼
    │   HALT Execution
    │       │
    │       ▼
    │   Escalate to Foreman
    │
    ├─► Medium Confidence Signal
    │       │
    │       ▼
    │   Flag for Review
    │       │
    │       ▼
    │   Log to Governance Memory
    │
    └─► Low Confidence Signal
            │
            ▼
        Log and Monitor
```

### 5.2 Remediation Flow

```
Test Dodging Incident
    │
    ▼
Analyzer
    │
    ▼
Generate Remediation Plan
    │
    ▼
Execute Remediation
    │
    ├─► Restore Assertions
    ├─► Implement Tests
    ├─► Fix Implementation
    └─► Revert Changes
    │
    ▼
Re-run QA
    │
    ├─► QA PASS → Resolve Incident
    └─► QA FAIL → Iterate Remediation
```

---

## 6. Storage and Persistence

### 6.1 Incident Storage

**Location:** `/memory/incidents/test-dodging/`

**Format:**
```
incident-{id}.json
```

**Schema:**
```typescript
{
  id: string;
  type: 'test_dodging';
  severity: 'critical' | 'high' | 'medium' | 'low';
  signals: TestDodgingSignal[];
  analysis: TestDodgingAnalysis;
  remediationPlan: RemediationPlan;
  status: 'open' | 'investigating' | 'fixing' | 'resolved';
  created: string;
  updated: string;
  resolved?: string;
}
```

### 6.2 Audit Reports

**Location:** `/evidence/test-dodging-audits/`

**Format:**
```
audit-{timestamp}.json
audit-{timestamp}-summary.md
```

### 6.3 Governance Memory

**Integration:** All Test Dodging events logged to governance memory

**Event Types:**
- `test_dodging_detected`
- `test_dodging_incident_created`
- `test_dodging_incident_resolved`
- `test_dodging_audit_completed`

---

## 7. Monitoring and Reporting

### 7.1 Real-Time Monitoring

**Dashboard Integration:**
- Test Dodging incident count
- Active violations
- Resolution rate
- Trend over time

### 7.2 Audit Reports

**Scheduled Audits:**
- Daily: Quick scan of recent commits
- Weekly: Full repository audit
- On-demand: Manual trigger

**Report Contents:**
- Violation summary
- Trend analysis
- High-risk areas
- Recommendations

---

## 8. Enforcement Rules

### 8.1 Immediate Halt Conditions

**Execution MUST STOP if:**
- High-confidence Test Dodging signal detected
- Empty or hollow tests found
- Assertion weakening > 50%
- Process language smell in test commits

### 8.2 Incident Registration Triggers

**Incident MUST be registered for:**
- All high-confidence signals
- Multiple medium-confidence signals (≥ 3)
- Any Test Dodging pattern in PR

### 8.3 Escalation Criteria

**Escalate to Foreman when:**
- Test Dodging incident created
- Builder halted due to Test Dodging
- Remediation fails after 2 attempts
- Historical audit reveals systemic patterns

**Escalate to Human (Johan) when:**
- Test Dodging incidents > 5 in 24 hours
- Structural/systemic test dodging detected
- Constitutional ambiguity in classification

---

## 9. Success Criteria

### 9.1 Detection Accuracy

- **True Positive Rate:** > 95%
- **False Positive Rate:** < 5%
- **Detection Speed:** < 30 seconds per scan

### 9.2 Response Time

- **High-confidence halt:** Immediate (< 1 second)
- **Incident registration:** < 5 seconds
- **Audit completion:** < 5 minutes (1000 commits)

### 9.3 System Health

- **Zero Test Dodging incidents in production**
- **All historical patterns documented**
- **100% incident resolution rate**
- **QA truthfulness verified**

---

## 10. Testing Strategy

### 10.1 Unit Tests

**Coverage:**
- Each signal detector
- Analyzer risk scoring
- Auditor history scanning
- Incident registration

### 10.2 Integration Tests

**Coverage:**
- Builder integration
- Foreman integration
- QIC/QIEL integration
- End-to-end detection → remediation

### 10.3 Regression Tests

**Coverage:**
- Known Test Dodging patterns from history
- Edge cases (legitimate test refactoring)
- False positive scenarios

---

## 11. Rollout Plan

### Phase 1: Core Implementation
1. Build Detector Engine
2. Build Analyzer Module
3. Build Incident System
4. Create comprehensive tests

### Phase 2: Integration
1. Integrate with Builders
2. Integrate with Foreman
3. Add to QIC/QIEL
4. Update governance memory

### Phase 3: Historical Audit
1. Run full repository audit
2. Document findings
3. Create remediation plans
4. Execute remediation

### Phase 4: Continuous Monitoring
1. Enable real-time detection
2. Set up dashboards
3. Schedule audits
4. Monitor effectiveness

---

## 12. Related Documents

### Constitutional Layer
- `/BUILD_PHILOSOPHY.md`
- `/foreman/governance/test-dodging-constitutional-rule.md`
- `/foreman/governance/zero-test-debt-constitutional-rule.md`
- `.github/foreman/agent-contract.md`

### Implementation Layer
- `/lib/foreman/qa/test-dodging-detector.ts` (to be created)
- `/lib/foreman/qa/test-dodging-analyzer.ts` (to be created)
- `/lib/foreman/qa/test-dodging-auditor.ts` (to be created)
- `/lib/foreman/incidents/test-dodging-incidents.ts` (to be created)

### Testing Layer
- `/tests/qa/test-dodging-detector.test.ts` (to be created)
- `/tests/qa/test-dodging-integration.test.ts` (to be created)

---

## 13. Version History

**1.0 (2025-12-14):** Initial architecture design

---

**This architecture implements constitutional Test Dodging prevention as mandated by the issue requirements and constitutional governance rules.**
