# Governance Feedback Loop (FL/CI) Architecture

**Version**: 1.0  
**Status**: Architecture Design  
**Authority**: Build Philosophy, Governance Constitution  
**Date**: 2025-12-16  
**Issue**: A3 — FL/CI Feedback Loop (Governance Layer)

---

## Purpose

Ensure that **Governance Gate failures feed back into system learning**, not just merge blocking. Every governance failure must:

1. **Produce Evidence**: Structured failure artifact documenting what failed and why
2. **Be Classified**: Categorized by failure type (QIEL, CS1-CS6) and corrective domain
3. **Generate Feedback Signal**: Feed into FL/CI learning loop for continuous improvement
4. **Enable Learning**: Prevent recurrence through governance strengthening

**Core Principle**: Governance failures are learning signals, not dead ends.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Governance Gate Execution                         │
│                      (PR Merge Workflow)                             │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                 ┌─────────▼─────────┐
                 │  Control Checks   │
                 │  QIEL, CS1-CS6    │
                 └─────────┬─────────┘
                           │
          ┌────────────────┴────────────────┐
          │                                 │
     ✅ PASS                           ❌ FAIL
          │                                 │
          │                                 ▼
          │                   ┌──────────────────────────┐
          │                   │  Governance Failure      │
          │                   │  Artifact Creation       │
          │                   └──────────┬───────────────┘
          │                              │
          │                              ▼
          │                   ┌──────────────────────────┐
          │                   │  Failure Classification  │
          │                   │  - QIEL failure          │
          │                   │  - CS1-CS6 violation     │
          │                   │  - Corrective domain     │
          │                   └──────────┬───────────────┘
          │                              │
          │                              ▼
          │                   ┌──────────────────────────┐
          │                   │  Governance Memory       │
          │                   │  Storage                 │
          │                   └──────────┬───────────────┘
          │                              │
          │                              ▼
          │                   ┌──────────────────────────┐
          │                   │  FL/CI Learning Signal   │
          │                   │  - RCA category          │
          │                   │  - Improvement action    │
          │                   │  - Prevention strategy   │
          │                   └──────────┬───────────────┘
          │                              │
          ▼                              ▼
    ┌─────────────────────────────────────────┐
    │      Governance Strengthening           │
    │  - Update QA checks                     │
    │  - Refine control validators            │
    │  - Enhance detection rules              │
    │  - Document lessons learned             │
    └─────────────────────────────────────────┘
```

---

## Core Components

### 1. Governance Failure Artifact Model

**Purpose**: Structured representation of governance gate failures

**File**: `lib/foreman/governance/failure-artifact.ts`

**Type Definition**:

```typescript
/**
 * Governance Failure Type
 * Identifies which control/validation failed
 */
export type GovernanceFailureType =
  | 'QIEL'          // QA Integrity Enforcement Layer
  | 'CS1'           // Constitutional Integrity
  | 'CS2'           // Architecture Approval
  | 'CS3'           // Incident Feedback
  | 'CS4'           // Compliance Monitoring
  | 'CS5'           // Performance Enforcement
  | 'CS6'           // Execution Boundary
  | 'GSR'           // Governance Supremacy Rule
  | 'BUILD_PHILOSOPHY';  // Build Philosophy violation

/**
 * Corrective Domain
 * Identifies what needs to be fixed
 */
export type CorrectiveDomain =
  | 'QA'            // QA enhancement (tests, coverage, validation)
  | 'ARCHITECTURE'  // Architecture update (design, checklist)
  | 'POLICY'        // Policy clarification (rules, documentation)
  | 'IMPLEMENTATION'; // Code implementation fix

/**
 * Governance Failure Artifact
 * Complete structured representation of a governance failure
 */
export interface GovernanceFailureArtifact {
  // Identity
  id: string;
  timestamp: string;
  
  // Context
  prNumber: number;
  prTitle: string;
  branch: string;
  commit: string;
  author: string;
  
  // Failure Details
  failureType: GovernanceFailureType;
  failedControl: string;
  failureDescription: string;
  
  // Classification
  correctiveDomain: CorrectiveDomain;
  severity: 'critical' | 'high' | 'medium' | 'low';
  
  // Evidence
  evidence: {
    // Which control validation failed
    controlName: string;
    // Specific violation details
    violations: Array<{
      type: string;
      description: string;
      location?: string;
      context?: Record<string, any>;
    }>;
    // Evidence files
    evidenceFiles: string[];
    // Validator output
    validatorOutput?: string;
  };
  
  // Learning Signal
  learningSignal: {
    // Root cause category
    rcaCategory: 'architecture_gap' | 'qa_gap' | 'policy_gap' | 'implementation_gap';
    // Recommended improvement
    improvementAction: string;
    // Prevention strategy
    preventionStrategy: string;
    // Target for improvement
    improvementTarget: string; // File or component to update
  };
  
  // Resolution Tracking
  resolution?: {
    status: 'open' | 'in_progress' | 'resolved';
    resolvedAt?: string;
    resolvedBy?: string;
    resolutionCommit?: string;
    resolutionNotes?: string;
  };
  
  // FL/CI Integration
  flciEntry?: {
    entryId: string;
    trigger: 'GOVERNANCE_GATE_FAILURE';
    ciEnhancements: string[];
    learningLocked: boolean;
  };
}
```

**Functions**:
- `createGovernanceFailureArtifact()`: Create new failure artifact
- `classifyGovernanceFailure()`: Classify failure and determine corrective domain
- `generateLearningSignal()`: Generate FL/CI learning signal
- `storeFailureArtifact()`: Store in governance memory
- `updateFailureResolution()`: Update resolution status

---

### 2. Governance Failure Classifier

**Purpose**: Classify failures by type and determine corrective actions

**File**: `lib/foreman/governance/failure-classifier.ts`

**Classification Logic**:

```typescript
/**
 * Classification Rules
 */
const CLASSIFICATION_RULES: Record<GovernanceFailureType, ClassificationRule> = {
  QIEL: {
    correctiveDomain: 'QA',
    rcaCategory: 'qa_gap',
    improvementAction: 'Enhance QA validation (add missing checks)',
    preventionStrategy: 'Update QIEL validators to detect this class of failure',
  },
  
  CS1: {
    correctiveDomain: 'POLICY',
    rcaCategory: 'policy_gap',
    improvementAction: 'Strengthen constitutional protections',
    preventionStrategy: 'Update hash verification or path protection rules',
  },
  
  CS2: {
    correctiveDomain: 'ARCHITECTURE',
    rcaCategory: 'architecture_gap',
    improvementAction: 'Clarify architecture approval requirements',
    preventionStrategy: 'Update CS2 approval workflow or protected file list',
  },
  
  CS3: {
    correctiveDomain: 'POLICY',
    rcaCategory: 'policy_gap',
    improvementAction: 'Enhance incident feedback loop',
    preventionStrategy: 'Update incident verification workflow',
  },
  
  CS4: {
    correctiveDomain: 'POLICY',
    rcaCategory: 'policy_gap',
    improvementAction: 'Strengthen compliance monitoring',
    preventionStrategy: 'Update alert system or notification rules',
  },
  
  CS5: {
    correctiveDomain: 'IMPLEMENTATION',
    rcaCategory: 'implementation_gap',
    improvementAction: 'Fix performance anti-patterns',
    preventionStrategy: 'Update OPOJD validators or performance detection',
  },
  
  CS6: {
    correctiveDomain: 'POLICY',
    rcaCategory: 'policy_gap',
    improvementAction: 'Clarify execution boundaries',
    preventionStrategy: 'Update boundary checks or scope definitions',
  },
  
  GSR: {
    correctiveDomain: 'QA',
    rcaCategory: 'qa_gap',
    improvementAction: 'Ensure 100% QA passing enforcement',
    preventionStrategy: 'Update GSR validators or add missing checks',
  },
  
  BUILD_PHILOSOPHY: {
    correctiveDomain: 'ARCHITECTURE',
    rcaCategory: 'architecture_gap',
    improvementAction: 'Ensure Architecture → Red QA → Build to Green process',
    preventionStrategy: 'Update build philosophy validators or evidence checks',
  },
};
```

**Functions**:
- `classifyFailure()`: Main classification function
- `determineCorrectiveDomain()`: Map failure type to corrective domain
- `generateRCACategory()`: Determine root cause category
- `suggestImprovementAction()`: Generate improvement recommendation
- `suggestPreventionStrategy()`: Generate prevention strategy

---

### 3. Governance Gate Integration

**Purpose**: Integrate failure artifact creation into governance gate workflow

**File**: `.github/workflows/foreman-governance.yml` (update)

**Workflow Enhancement**:

```yaml
name: Governance Gate (with FL/CI Feedback)

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  governance-gate:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install Dependencies
        run: npm ci
      
      - name: Run Governance Gate
        id: gate
        run: npm run governance:gate
        continue-on-error: true
      
      - name: Create Failure Artifact (if failed)
        if: steps.gate.outcome == 'failure'
        run: |
          npm run governance:create-failure-artifact \
            --pr-number="${{ github.event.pull_request.number }}" \
            --commit="${{ github.sha }}" \
            --branch="${{ github.head_ref }}" \
            --author="${{ github.actor }}"
      
      - name: Generate Learning Signal (if failed)
        if: steps.gate.outcome == 'failure'
        run: npm run governance:generate-learning-signal
      
      - name: Post Failure Report (if failed)
        if: steps.gate.outcome == 'failure'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const artifact = JSON.parse(
              fs.readFileSync('.governance/failure-artifact.json', 'utf8')
            );
            
            const comment = `## ❌ Governance Gate Failure
            
            **Failure Type**: ${artifact.failureType}
            **Corrective Domain**: ${artifact.correctiveDomain}
            
            ### What Failed
            ${artifact.failureDescription}
            
            ### Learning Signal
            - **RCA Category**: ${artifact.learningSignal.rcaCategory}
            - **Improvement Action**: ${artifact.learningSignal.improvementAction}
            - **Prevention Strategy**: ${artifact.learningSignal.preventionStrategy}
            
            ### Next Steps
            This failure has been recorded in governance memory and will feed into the FL/CI learning system.
            
            **To resolve:**
            1. ${artifact.learningSignal.improvementAction}
            2. Verify all violations are addressed
            3. Re-run governance gate
            
            **Artifact ID**: ${artifact.id}`;
            
            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: comment
            });
      
      - name: Fail if Gate Failed
        if: steps.gate.outcome == 'failure'
        run: exit 1
```

---

### 4. FL/CI Learning Integration

**Purpose**: Extend FL/CI system to include governance failures

**File**: `/foreman/feedback-loop/FL_CI_SYSTEM.md` (update)

**New Trigger**:

```markdown
### 3. Governance Gate Failure
**Trigger**: PR fails governance gate (QIEL, CS1-CS6, GSR, Build Philosophy)  
**Implication**: Governance control detected violation that should not have occurred

**Examples**:
- QIEL detects test failures that weren't caught locally
- CS1 detects constitutional file modification
- CS2 detects unapproved architecture change
- CS5 detects OPOJD compliance violation
```

**FL Process Extension**:

```markdown
### Governance Failure FL Process

1. **FL Activation**: Governance gate creates failure artifact
2. **Classification**: Failure classified by type and corrective domain
3. **Root Cause Analysis**: 
   - QA Gap: Missing validation or test coverage
   - Architecture Gap: Incomplete or ambiguous design
   - Policy Gap: Unclear or insufficient governance rules
   - Implementation Gap: Code doesn't follow established patterns
4. **Corrective Action**: Based on RCA:
   - QA Gap → Enhance QIEL validators, add missing checks
   - Architecture Gap → Update architecture checklist
   - Policy Gap → Clarify governance documentation
   - Implementation Gap → Fix code and add regression test
5. **Lock In Learning**: 
   - Update relevant governance files
   - Add to lessons learned
   - Document in FL learning log
   - Prevent recurrence through automated checks
```

**Learning Log Schema Extension**:

```json
{
  "id": "FL-003",
  "trigger": "GOVERNANCE_GATE_FAILURE",
  "failureType": "QIEL",
  "correctiveDomain": "QA",
  "rootCause": {
    "category": "qa_gap",
    "description": "QIEL detected test failures not caught by local QA"
  },
  "resolution": {
    "ciEnhancements": [
      "Add pre-push git hook for QA validation",
      "Update QIEL to detect this class of failure earlier"
    ]
  }
}
```

---

### 5. Governance Memory Extension

**Purpose**: Store governance failure artifacts in governance memory

**File**: `lib/memory/governance-memory.ts` (update)

**New Event Type**:

```typescript
export type GovernanceEventType = 
  | 'incident_created'
  | 'incident_state_changed'
  | 'incident_user_feedback'
  | 'incident_fix_attempt'
  | 'incident_lesson_learned'
  | 'incident_requires_acr'
  | 'incident_resolved'
  | 'governance_gate_failure'  // NEW
  | 'governance_gate_success'  // NEW
  | 'governance_failure_resolved';  // NEW
```

**New Functions**:

```typescript
/**
 * Log governance gate failure
 */
export async function logGovernanceGateFailure(
  artifact: GovernanceFailureArtifact
): Promise<void> {
  await logGovernanceEvent({
    type: 'governance_gate_failure',
    severity: artifact.severity,
    description: `Governance gate failure: ${artifact.failureType} - ${artifact.failureDescription}`,
    metadata: {
      artifactId: artifact.id,
      failureType: artifact.failureType,
      correctiveDomain: artifact.correctiveDomain,
      prNumber: artifact.prNumber,
      rcaCategory: artifact.learningSignal.rcaCategory,
    },
  });
}

/**
 * Query governance failures
 */
export async function queryGovernanceFailures(
  filters: {
    failureType?: GovernanceFailureType;
    correctiveDomain?: CorrectiveDomain;
    since?: string;
    until?: string;
    resolved?: boolean;
  }
): Promise<GovernanceFailureArtifact[]> {
  // Query implementation
}

/**
 * Get failure statistics
 */
export async function getFailureStatistics(
  timeRange?: { since: string; until: string }
): Promise<{
  total: number;
  byType: Record<GovernanceFailureType, number>;
  byDomain: Record<CorrectiveDomain, number>;
  resolved: number;
  pending: number;
}> {
  // Statistics implementation
}
```

---

## Data Flow

### Governance Gate Failure Flow

```
1. PR Merge Attempted
   ↓
2. Governance Gate Executes
   ↓
3. Control Validation (QIEL, CS1-CS6, etc.)
   ↓
4. Failure Detected
   ↓
5. Create Failure Artifact
   - Capture failure details
   - Include evidence
   - Generate artifact ID
   ↓
6. Classify Failure
   - Determine failure type (QIEL, CS1, etc.)
   - Identify corrective domain (QA, Architecture, Policy)
   - Assign severity
   ↓
7. Generate Learning Signal
   - RCA category (qa_gap, architecture_gap, etc.)
   - Improvement action (what to do)
   - Prevention strategy (how to prevent)
   - Improvement target (where to apply)
   ↓
8. Store in Governance Memory
   - Log governance_gate_failure event
   - Store artifact with full details
   - Tag for FL/CI processing
   ↓
9. Create FL/CI Entry
   - Add to FL learning log
   - Link to governance failure
   - Mark for CI enhancement
   ↓
10. Post Failure Report
    - Comment on PR with details
    - Include learning signal
    - Provide remediation steps
    ↓
11. Block PR Merge
    - Set GitHub status check to failed
    - Prevent merge until resolved
    ↓
12. (After Resolution) Update Artifact
    - Mark as resolved
    - Record resolution details
    - Lock in learning
```

---

## Error Handling

### Artifact Creation Failure

**Scenario**: Failure artifact creation fails (e.g., memory unavailable)

**Handling**:
1. Log error to console
2. Create fallback artifact in `.governance/` directory
3. Continue with gate blocking (primary responsibility)
4. Emit degraded mode alert
5. Human review required for learning signal

### Classification Failure

**Scenario**: Failure type cannot be classified

**Handling**:
1. Default classification:
   - Failure Type: `QIEL` (most common)
   - Corrective Domain: `QA`
   - RCA Category: `qa_gap`
2. Flag for manual review
3. Store unclassified artifact
4. Generate generic learning signal

### Memory Storage Failure

**Scenario**: Governance memory unavailable

**Handling**:
1. Store artifact locally in `.governance/failures/`
2. Continue with gate blocking
3. Emit CS4 alert (compliance monitoring)
4. Retry storage on next run
5. Manual memory sync if persistent

---

## Testing Strategy

### Unit Tests

**File**: `tests/governance/failure-artifact.test.ts`

```typescript
describe('Governance Failure Artifact', () => {
  test('creates artifact from QIEL failure', async () => {
    const artifact = await createGovernanceFailureArtifact({
      failureType: 'QIEL',
      prNumber: 123,
      violations: [
        { type: 'test_failure', description: '3 tests failed' }
      ]
    });
    
    expect(artifact.failureType).toBe('QIEL');
    expect(artifact.correctiveDomain).toBe('QA');
  });
  
  test('classifies CS1 violation correctly', async () => {
    const classification = await classifyGovernanceFailure({
      failureType: 'CS1',
      violations: [/* ... */]
    });
    
    expect(classification.correctiveDomain).toBe('POLICY');
    expect(classification.rcaCategory).toBe('policy_gap');
  });
  
  test('generates learning signal', async () => {
    const signal = await generateLearningSignal({
      failureType: 'CS2',
      violations: [/* ... */]
    });
    
    expect(signal.improvementAction).toContain('architecture approval');
    expect(signal.preventionStrategy).toBeDefined();
  });
});
```

### Integration Tests

**File**: `tests/governance/failure-integration.test.ts`

```typescript
describe('Governance Gate Failure Integration', () => {
  test('end-to-end: failure to learning signal', async () => {
    // Simulate governance gate failure
    const gateResult = await runGovernanceGate(mockPR);
    expect(gateResult.passed).toBe(false);
    
    // Verify artifact created
    const artifact = await getLatestFailureArtifact();
    expect(artifact).toBeDefined();
    expect(artifact.failureType).toBeDefined();
    
    // Verify classified
    expect(artifact.correctiveDomain).toBeDefined();
    expect(artifact.learningSignal).toBeDefined();
    
    // Verify stored in memory
    const stored = await queryGovernanceFailures({ 
      artifactId: artifact.id 
    });
    expect(stored).toHaveLength(1);
    
    // Verify FL/CI entry created
    const flEntry = await getLatestFLEntry();
    expect(flEntry.trigger).toBe('GOVERNANCE_GATE_FAILURE');
  });
});
```

---

## Security Considerations

### Data Sensitivity

**Principle**: Failure artifacts may contain sensitive information

**Protections**:
1. **No Secrets**: Never include secrets in artifacts
2. **PII Redaction**: Redact email addresses, user IDs
3. **Path Sanitization**: Use relative paths, not absolute
4. **Context Limits**: Limit context to relevant information only

### Access Control

**Principle**: Failure artifacts are governance data

**Controls**:
1. **Read Access**: Governance team, repo admins only
2. **Write Access**: Automated systems only
3. **Audit Trail**: All access logged
4. **Retention**: 1 year minimum, compliant with policy

---

## Performance Considerations

### Artifact Creation Performance

**Target**: < 500ms to create and store artifact

**Optimizations**:
1. Async storage (don't block gate result)
2. Batch evidence file reads
3. Cache classification rules
4. Stream large evidence files

### Memory Query Performance

**Target**: < 1s to query failure artifacts

**Optimizations**:
1. Index by failure type and timestamp
2. Paginate large result sets
3. Cache frequent queries
4. Use memory fabric query optimization

---

## Deployment Strategy

### Rollout Phases

**Phase 1: Artifact Creation Only**
- Deploy artifact creation
- Store in memory
- No classification yet
- Validate data capture

**Phase 2: Classification**
- Deploy classifier
- Classify failures
- Validate corrective domains
- No FL/CI integration yet

**Phase 3: FL/CI Integration**
- Connect to FL/CI system
- Generate learning signals
- Update learning log
- Full end-to-end flow

**Phase 4: Continuous Improvement**
- Monitor failure patterns
- Refine classification rules
- Enhance prevention strategies
- Governance strengthening automation

---

## Monitoring and Alerting

### Metrics

**Tracked Metrics**:
1. Total governance failures (by type)
2. Classification accuracy
3. Artifact creation latency
4. Memory storage success rate
5. FL/CI entry creation rate
6. Resolution time by type

**Dashboards**:
- Governance failure trends
- Classification distribution
- Learning signal effectiveness
- Prevention strategy impact

### Alerts

**Critical Alerts**:
1. Artifact creation failure rate > 5%
2. Memory storage unavailable
3. Classification failure rate > 10%
4. FL/CI integration broken

**Warning Alerts**:
1. High failure rate in specific control
2. Increasing failure trend
3. Unresolved failures > 7 days
4. Learning signal not applied

---

## Documentation Updates

### Files to Update

1. **`/foreman/feedback-loop/FL_CI_SYSTEM.md`**
   - Add governance failure trigger
   - Document governance-specific RCA
   - Update learning log schema

2. **`/GOVERNANCE_GATE_CANON.md`**
   - Add failure artifact creation to workflow
   - Document learning integration
   - Update failure behavior section

3. **`/foreman/governance/README.md`**
   - Document failure artifact system
   - Explain classification logic
   - Provide query examples

4. **`/docs/governance/GOVERNANCE_LEARNING_GUIDE.md`** (new)
   - Guide for using failure artifacts
   - How to interpret learning signals
   - How to apply improvements

---

## Success Criteria (Acceptance Criteria)

✅ **Every governance failure produces:**
- Evidence (structured artifact with details)
- Classification (failure type and corrective domain)
- Feedback signal (learning signal for FL/CI)

✅ **No silent failures:**
- All gate failures create artifacts
- All artifacts stored in memory
- All artifacts generate learning signals

✅ **No lost context:**
- Full evidence captured
- Complete violation details
- Timestamps and references preserved

✅ **Learning integration:**
- Failures feed into FL/CI system
- Learning signals generated
- Improvements tracked and applied

---

## References

- `/BUILD_PHILOSOPHY.md` - FL/CI integration with build philosophy
- `/GOVERNANCE_GATE_CANON.md` - Canonical governance gate definition
- `/foreman/feedback-loop/FL_CI_SYSTEM.md` - FL/CI system documentation
- `/foreman/constitution/CS1-CS6` - Constitutional safeguard definitions
- `/lib/foreman/incidents/` - Existing incident model for reference
- `/types/violations.ts` - Existing violation classification types

---

**Architecture Complete**: 2025-12-16  
**Ready for**: Architecture Checklist Validation → Red QA Creation
