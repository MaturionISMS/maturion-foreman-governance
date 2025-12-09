# QIC Rules - Quality Integrity Contract

## Overview

The Quality Integrity Contract (QIC) is the enforcement layer for all code quality, architectural integrity, and governance compliance in the Maturion Foreman ecosystem.

**Core Principle**: NO PR may merge unless ALL QIC checks pass.

## QIC Categories

QIC enforces both traditional QA checks and constitutional governance requirements:

### 1. QIEL Full Validation (Core QA)

**Purpose**: Ensure code meets basic quality standards

**Checks**:
- ✅ Lint passes (zero errors, zero warnings)
- ✅ TypeScript type checking passes
- ✅ All tests pass
- ✅ Build succeeds
- ✅ Runtime initialization succeeds
- ✅ Deployment simulation succeeds

**Configuration**: `lib/foreman/qiel-config.ts`

**Enforcement**: Run via `npm run qiel:full`

---

### 2. WIE - Wiring Integrity Enforcement

**Purpose**: Ensure UI → API → Context Engine → Model flow is correctly wired

**Checks**:
- ✅ Chat UI calls `/api/foreman/chat` (not deprecated routes)
- ✅ API route invokes `prompt-compressor`
- ✅ API route invokes `file-processor`
- ✅ API route invokes `context-manager`
- ✅ API route invokes `model-escalation`
- ✅ No deprecated routes exist (`/api/chat`, `/api/agent`)
- ✅ No prompt bypasses context engine
- ✅ Large prompts are enabled
- ✅ Wiring checkpoints exist for observability

**Test File**: `tests/qic/ui-wiring.test.ts`

**Enforcement**: Run via `npm run test:ui-wiring`

---

### 3. CS1 - Guardrail Integrity Validation

**Purpose**: Ensure all immutable governance files exist and are protected

**Checks**:
- ✅ `.github/foreman/agent-contract.md` exists
- ✅ `.github/workflows/qic.yml` exists
- ✅ `.github/workflows/qiel.yml` exists
- ✅ `foreman/constitution/guardrails.json` exists
- ✅ `foreman/constitution/**` directory exists
- ✅ No workflow modifies governance files
- ✅ Guardrails define immutable paths
- ✅ Guardrails define required checks
- ✅ Guardrails protect critical files
- ✅ `.gitignore` does not exclude governance files

**Test File**: `tests/qic/guardrails.test.ts`

**Enforcement**: Run via `npm run test:guardrails`

---

### 4. CS2 - Architecture Change Approval Enforcement

**Purpose**: Ensure Foreman cannot modify architecture without approval

**Checks**:
- ✅ `docs/architecture` directory exists (if applicable)
- ✅ Architecture files are markdown
- ✅ Architecture changes require approval workflow
- ✅ No automatic architecture modification in workflows
- ✅ CODEOWNERS prevents automated approval (if applicable)
- ✅ PR template requires issue linkage
- ✅ Architecture files are tracked in git
- ✅ No automated merging of architecture changes
- ✅ Branch protection documentation exists

**Test File**: `tests/qic/architecture-integrity.test.ts`

**Enforcement**: Run via `npm run test:architecture`

**Note**: Some checks are informational if architecture directory doesn't exist yet. This test establishes the governance infrastructure for future architecture changes.

---

### 5. CS3 - Incident Feedback Loop Validation

**Purpose**: Ensure deployments trigger feedback and incidents are tracked

**Checks**:
- ✅ Memory fabric exists for incident tracking
- ✅ Incident schemas exist or are defined
- ✅ QI incident writer functionality exists
- ✅ Verification categories defined: "Not Visible", "Not Functional", "Incorrect Behavior", "Resolved"
- ✅ Incident severity levels defined
- ✅ Deployment check workflow exists
- ✅ Deployment triggers feedback collection
- ✅ Verification issue template exists
- ✅ Lessons learned can be generated
- ✅ Incidents cannot auto-close without confirmation
- ✅ Incident states are tracked
- ✅ Foreman can respond to incident states

**Test File**: `tests/qic/incident-feedback.test.ts`

**Enforcement**: Run via `npm run test:incident`

---

### 6. CS5 - Performance Fix Enforcement

**Purpose**: Enforce "No TODOs, No Lazy Fixes, No Obvious Inefficiencies"

**Checks**:
- ⚠️ No TODO comments (track in Parking Station)
- ⚠️ No FIXME comments (track in Parking Station)
- ⚠️ No "optimize later" comments (track in Parking Station)
- ⚠️ No temporary code blocks (refactor or track)
- ❌ No HACK comments (hard fail - must refactor)
- ⚠️ Parking Station exists for deferred work
- ⚠️ No unnecessary synchronous file operations
- ⚠️ No raw console.log in production code
- ⚠️ No commented-out code blocks

**Test File**: `tests/qic/performance-integrity.test.ts`

**Enforcement**: Run via `npm run test:performance`

**Note**: Most checks are warnings requiring Parking Station tracking. HACK comments are hard failures.

---

### 7. CS6 - Zero-Warning Policy Governance

**Purpose**: Ensure zero-warning policy is strictly enforced with governance-approved exceptions only

**Checks**:
- ✅ `foreman/qa/allowed-warnings.json` exists
- ✅ `foreman/qa/allowed-warnings-schema.json` exists and is valid
- ✅ Zero-warning policy loads and validates allowed warnings
- ✅ No warnings approved by Foreman (only Johan may approve)
- ✅ All allowed warnings have Parking Station IDs for tech-debt tracking
- ✅ All allowed warnings have target waves for elimination
- ✅ All allowed warnings have approval, reason, and source
- ✅ All warning patterns are valid regular expressions
- ✅ No blanket ignore patterns (patterns must be specific)
- ✅ No expired warnings in allowlist
- ✅ Zero-warning policy properly categorizes warnings as allowed/blocked
- ✅ No silent npm warning suppression in code

**Test File**: `tests/qic/zero-warning-governance.test.ts`

**Enforcement**: Run via `npm run test:zero-warning-governance`

**Governance Rules**:
1. **Foreman may NOT add warnings to allowlist autonomously**
2. **All warning exceptions must be approved by Johan**
3. **Each allowed warning must have a Parking Station tech-debt entry**
4. **Warnings not in allowlist MUST cause QA to fail**
5. **No blanket "ignore npm" or similar broad suppression rules**

**Allowed Warnings Structure**:
```json
{
  "version": "1.0.0",
  "lastUpdated": "YYYY-MM-DD",
  "warnings": [
    {
      "id": "unique-id",
      "pattern": "specific-regex-pattern",
      "source": "e.g., transitive dependency via next@14",
      "reason": "justification for allowing this warning",
      "target_wave": "the wave where we plan to eliminate it",
      "approved_by": "Johan (not Foreman)",
      "created_at": "ISO 8601 timestamp",
      "parking_station_id": "reference to parking station entry",
      "metadata": {
        "package_name": "package-name",
        "package_version": "1.0.0",
        "impact": "low|medium|high|critical",
        "upgrade_plan": "description of upgrade plan"
      }
    }
  ]
}
```

**Note**: This check ensures the Zero-Warning Policy remains a constitutional rule, not a convenience feature.

---

## QIC Workflow

QIC is enforced via GitHub Actions: `.github/workflows/qic.yml`

### Execution Steps

1. **Install dependencies**: `npm ci`
2. **Run QIEL**: `npm run qiel:full`
3. **Run Constitutional Tests**:
   - Wiring Integrity (WIE)
   - Guardrail Integrity (CS1)
   - Architecture Integrity (CS2)
   - Incident Feedback (CS3)
   - Performance Integrity (CS5)
4. **Generate Summary**: All checks must pass
5. **Comment on PR**: Results posted to PR

### Failure Handling

If ANY check fails:
- ❌ QIC workflow fails
- ❌ PR cannot merge
- ❌ Summary shows which checks failed
- ❌ PR comment identifies violations

**No exceptions. No bypasses. No "acceptable" failures.**

---

## TRUE NORTH Principles

### One QA, One Build, One Handover

- **Single Source of Truth**: `lib/foreman/qiel-config.ts`
- **Zero Drift**: Same config locally and in CI
- **Zero Duplication**: Don't re-run what passed locally
- **Forward Evolution**: No regression, only improvement

### Governance Supremacy

- **Governance overrides user requests**
- **QA failures override task completion**
- **Architecture rules override implementation**
- **100% passing is absolute, not contextual**

---

## Running QIC Locally

### Full QIC Validation

```bash
# Run complete QIC check (same as CI)
npm run qiel:full

# Run individual constitutional tests
npm run test:ui-wiring      # WIE
npm run test:guardrails     # CS1
npm run test:architecture   # CS2
npm run test:incident       # CS3
npm run test:performance    # CS5
```

### Quick Check

```bash
# Quick QIEL (skips deployment simulation)
npm run qiel:quick

# All QIC tests at once
npm run test:qic
```

---

## Extending QIC

### Adding New Constitutional Checks

1. Create test file in `tests/qic/`
2. Add npm script to `package.json`
3. Add step to `.github/workflows/qic.yml`
4. Update summary validation logic
5. Update PR comment to include new check
6. Document in this file

### Modifying Existing Checks

1. Update test file in `tests/qic/`
2. Document changes in this file
3. Verify tests pass locally
4. Submit PR with clear rationale

**NEVER weaken existing checks. Only add or strengthen.**

---

## Constitutional Minimum Standard

These checks represent the **constitutional minimum**:

- ✅ **Non-negotiable**: Cannot be disabled or bypassed
- ✅ **Immutable**: Changes require constitutional review
- ✅ **Absolute**: 100% passing required, no exceptions
- ✅ **Forward-only**: Can strengthen, cannot weaken

**Any attempt to bypass, disable, or weaken these checks is a constitutional violation.**

---

## Contact

For questions about QIC:
- Review: `.github/foreman/agent-contract.md`
- Documentation: `docs/governance/`
- Constitution: `foreman/constitution/`

**Remember**: QIC is not a suggestion. It is law.
