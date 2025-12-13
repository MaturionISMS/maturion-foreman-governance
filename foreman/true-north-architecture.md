# Maturion True North Architecture

## Purpose

This document defines the architectural principles, quality standards, and governance rules that guide all Maturion systems. It serves as the "True North" - the unwavering reference point for all architectural decisions, implementations, and quality assessments.

**All Maturion applications, modules, and subsystems must align with True North principles.**

---

## Core Principles

### 1. Quality is Enforced by Systems, Not Humans

- **QA is the final authority** on code quality, not human review
- Automated validation replaces subjective human judgment
- Architecture and QA frameworks define correctness
- Humans define strategy; systems enforce quality

### 2. Governance Through Contracts

- Quality standards are formalized as contracts
- Contracts are enforced automatically at every stage
- Violations block progress - no exceptions
- Governance Memory tracks all quality events

### 3. Architecture Evolves Through Memory

- Quality failures feed architectural improvement
- Patterns emerge from governance memory analysis
- Architecture adapts based on system learning
- Continuous evolution toward higher quality

### 4. Autonomy Within Boundaries

- Systems operate autonomously within defined rules
- Quality gates are non-negotiable
- Escalation to humans only for strategic decisions
- Speed through systematic validation, not shortcuts

### 5. Governance Supremacy Rule (GSR)

- **Architecture and Governance rules override all other instructions**
- Foreman must ensure that no code, build, or behavior is accepted unless it fully complies with architecture and passes 100% of QA
- This prevents:
  - Partial passes (301/303 = TOTAL FAILURE)
  - Inherited failures
  - Conflicting behaviors
  - Regressions
  - Legacy creep
  - Test debt accumulation
- **Foreman must always defer to governance first, intent second**

### 6. Zero Test Debt Invariant

- **Test debt is NEVER acceptable**
- Any test debt triggers immediate STOP → FIX → RE-RUN → VERIFY cycle
- Test debt includes:
  - Failing tests
  - Skipped tests (.skip(), .todo())
  - Incomplete tests (stubs, no assertions)
  - Incomplete test infrastructure (stub helpers, incomplete fixtures)
  - Test configuration issues
  - Hidden test debt (warnings, excluded tests, suppressed errors)
- **No forward motion permitted with ANY test debt**
- **See**: `/foreman/governance/zero-test-debt-constitutional-rule.md`

### 7. One Build = One Complete Lifecycle

- **Each build is COMPLETE or BLOCKED**
- No carry-over debt between builds
- No "known issues" lists tolerated
- No temporary exceptions or deferrals
- Each build follows: Architecture → Red QA → Build to Green → Validation → Merge
- **One-time fully functional builds on first deployment**
- **See**: `/BUILD_PHILOSOPHY.md`

---

## Quality Integrity Contract (QIC)

**The Quality Integrity Contract is the cornerstone of Maturion's quality architecture.**

### Overview

The QIC defines non-negotiable quality standards that prevent false positives in QA systems. It ensures that QA cannot report "all checks passed" when actual failures exist.

**QIC Reference Document**: [`/foreman/qa/quality-integrity-contract.md`](/foreman/qa/quality-integrity-contract.md)

### QIC Anchor Points

All Maturion systems must implement these QIC requirements:

#### QIC-1: Build Integrity
- Build logs must be parsed for error patterns
- Exit codes alone are insufficient
- Error patterns (ERR, ERROR, TypeError, etc.) → QA FAIL
- **No builds pass with errors**

#### QIC-2: Lint Integrity
- Lint runs in strict mode
- Zero errors required
- Zero warnings (unless explicitly whitelisted)
- **No code passes with lint violations**

#### QIC-3: Runtime Integrity
- Runtime failures detected and blocked:
  - Route failures
  - API execution errors
  - Page rendering failures
  - Engine initialization errors
  - Memory system failures
  - Governance hook failures
- **No deployments with runtime errors**

#### QIC-4: Deployment Simulation
- Preview build must succeed
- Production build must succeed
- Both must have zero warnings
- **No deployments without successful simulation**

#### QIC-5: Silent Failure Prevention
- Detect failures that don't produce explicit errors:
  - Missing exports
  - Deprecated APIs
  - Unused variables
  - Schema mismatches
  - Engine interface drift
  - Memory inconsistencies
  - Unreachable code
  - Incorrect TypeScript narrowing
- **Silent failures cause QA FAIL**

#### QIC-6: Test Debt Detection
- Automated test debt scanning before every QA validation
- Detect all forms of test debt:
  - Failing tests (FAIL, ERROR, TIMEOUT)
  - Skipped tests (.skip(), .todo(), commented out)
  - Incomplete tests (stubs, no assertions, TODO comments)
  - Incomplete test infrastructure (stub helpers, incomplete fixtures, broken mocks)
  - Test configuration issues
  - Hidden test debt (warnings, excluded tests, suppressed errors)
- **Any test debt triggers QA FAIL and STOPS execution**
- **See**: `/foreman/governance/zero-test-debt-constitutional-rule.md`

#### QIC-7: Governance Memory Integration
- All quality failures recorded as QI Incidents
- Incidents stored in Governance Memory
- Incident types:
  - Build errors
  - Lint errors
  - Runtime errors
  - Silent failures
  - Schema mismatches
  - Test debt violations
  - Deployment failures
- **Every failure creates a memory entry**

#### QIC-8: Auto-Propagation
- QIC applies to ALL Maturion apps (current and future)
- All multi-agent subsystems
- All Foreman modules
- All Builder modules
- All CI pipelines
- All deployment workflows
- **Universal enforcement across ecosystem**

### QIC Enforcement

```typescript
// All systems must initialize QIC at startup
import { initializeQualityFramework } from '@/lib/foreman/governance/qic-loader'

const qicConfig = await initializeQualityFramework()

// QIC is now enforced for this system
```

---

## Architecture Layers

### Layer 1: True North (This Document)
- Defines architectural principles
- Establishes quality contracts
- Sets governance rules
- Provides system-wide direction

### Layer 2: Quality Integrity Contract (QIC)
- Implements True North quality principles
- Defines specific quality requirements
- Establishes failure detection rules
- Enforces governance memory integration

### Layer 3: QA Philosophy & Enforcement
- References: 
  - `/foreman/qa/qa-philosophy.md`
  - `/foreman/qa/qa-enforcement.md`
- Implements QIC in QA builders
- Defines QA validation pipeline
- Establishes QA as final authority

### Layer 4: Governance Model
- Reference: `/foreman/governance/governance-model.md`
- Implements autonomy-first governance
- Defines approval workflows
- Establishes governance boundaries

### Layer 5: Module-Specific Rules
- Builder specifications
- Project lifecycle rules
- Memory lifecycle governance
- Deployment governance

---

## Governance Memory Schema

### QI Incident Schema

All quality failures are recorded as Quality Integrity Incidents:

```typescript
interface QualityIntegrityIncident {
  id: string
  timestamp: string
  incidentType: 'build_error' | 'lint_error' | 'runtime_error' | 
                'silent_failure' | 'schema_mismatch' | 
                'deployment_failure' | 'test_failure' | 'security_violation'
  severity: 'critical' | 'high' | 'medium' | 'low'
  source: string
  description: string
  details: any
  resolution?: string
  resolvedAt?: string
  metadata: {
    buildId?: string
    sequenceId?: string
    commitSha?: string
    branch?: string
    environment?: string
  }
}
```

### Memory Scopes

- **Global Memory**: Architecture decisions, governance changes
- **Foreman Memory**: QI Incidents, orchestration patterns, builder performance
- **Project Memory**: Project lifecycle, milestones, deployments

---

## Integration Requirements

### For All Modules

Every module that performs quality checks must:

1. **Load QIC rules at initialization**
   ```typescript
   import { loadQICRules } from '@/lib/foreman/governance/qic-loader'
   const qicConfig = await loadQICRules()
   ```

2. **Validate QIC compliance**
   ```typescript
   import { validateQICCompliance } from '@/lib/foreman/governance/qic-loader'
   validateQICCompliance(qicConfig)
   ```

3. **Record QI Incidents on failures**
   ```typescript
   import { recordQIIncident } from '@/lib/foreman/governance/qic-loader'
   await recordQIIncident(checkResult, metadata)
   ```

### For QA Builders

QA Builders must implement all QIC checks:

- ✅ QIC-1: Parse build logs for errors
- ✅ QIC-2: Run lint in strict mode
- ✅ QIC-3: Validate runtime integrity
- ✅ QIC-4: Simulate deployments
- ✅ QIC-5: Detect silent failures
- ✅ QIC-6: Record QI Incidents
- ✅ QIC-7: Apply to all apps

### For Builder Modules

All builders must respect QA decisions:

- Never bypass QA failures
- Never create PRs when QA fails
- Always record quality metrics
- Always surface QA results

---

## Architectural Evolution

### Learning from Incidents

The system learns from QI Incidents to improve:

1. **Architecture Changes**: Patterns in incidents reveal architectural weaknesses
2. **QA Improvements**: Missed failures lead to new detection rules
3. **Engine Constraints**: Runtime failures inform engine safeguards
4. **Regression Tests**: Quality incidents become test cases

### Continuous Improvement Cycle

```
QI Incidents → Analysis → Pattern Detection → Architecture Updates → 
New Rules → Enhanced QA → Fewer Incidents → Higher Quality
```

---

## Compatibility with Existing Architecture

### QA Philosophy Alignment

QIC reinforces existing QA philosophy:
- ✅ QA is the final authority
- ✅ No human code review required
- ✅ Automated validation is superior
- ✅ Architecture + QA = Review System

### Governance Model Alignment

QIC enables autonomy-first governance:
- ✅ Systematic validation replaces human review
- ✅ Quality gates enable autonomous operation
- ✅ Governance memory tracks all events
- ✅ Escalation only for strategic decisions

### Builder Integration

QIC integrates with existing builder architecture:
- ✅ Builders dispatch to QA builders
- ✅ QA builders enforce QIC
- ✅ Failed QA blocks PR creation
- ✅ QI Incidents inform future builds

---

## Templates and Inheritance

### Global App Template

All new Maturion apps inherit QIC automatically:

```typescript
// In app template
export const APP_CONFIG = {
  qualityFramework: {
    qicVersion: 'latest',
    inheritGlobalQIC: true,
    enforceQIC: true,
    blockOnQIFail: true,
    recordIncidents: true,
  }
}
```

### Module Templates

All modules that perform quality checks inherit QIC:

```typescript
// In module template
import { initializeQualityFramework } from '@/lib/foreman/governance/qic-loader'

export async function initModule() {
  const qicConfig = await initializeQualityFramework()
  // QIC now enforced for this module
}
```

---

## Exit Criteria for Architecture Updates

When updating True North architecture:

1. **Document Updates**
   - ✅ True North updated with new principles
   - ✅ QIC contract formalized
   - ✅ Integration requirements specified

2. **Schema Updates**
   - ✅ TypeScript types updated
   - ✅ Memory schema includes QI Incidents
   - ✅ Governance memory supports new event types

3. **Implementation**
   - ✅ QIC loader module created
   - ✅ All systems can load QIC rules
   - ✅ Incident recording functional

4. **Validation**
   - ✅ Compatibility verified with existing architecture
   - ✅ Templates inherit QIC automatically
   - ✅ No breaking changes introduced

---

## References

### Core Documents
- [`/foreman/qa/quality-integrity-contract.md`](/foreman/qa/quality-integrity-contract.md) - Complete QIC specification
- [`/foreman/qa/qa-philosophy.md`](/foreman/qa/qa-philosophy.md) - QA as final authority
- [`/foreman/qa/qa-enforcement.md`](/foreman/qa/qa-enforcement.md) - QA enforcement rules
- [`/foreman/governance/governance-model.md`](/foreman/governance/governance-model.md) - Autonomy-first governance

### Implementation
- `/lib/foreman/governance/qic-loader.ts` - QIC loader and enforcement
- `/types/memory.ts` - QI Incident types and schemas

### Governance Rules
- `/foreman/autonomy-rules.md` - Autonomous operation rules
- `/foreman/governance/*.md` - All governance specifications

---

## Version History

- **v1.0.0** (Current) - Initial True North with Quality Integrity Contract
  - Established QIC as architecture cornerstone
  - Defined 7 QIC requirements
  - Integrated with Governance Memory
  - Universal enforcement across all apps

---

**This is True North. All systems must align with these principles. No exceptions.**
