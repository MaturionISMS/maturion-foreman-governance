# 📘 PHASE_02.md — Builder Execution Engine

**Status:** ✅ Implemented  
**Wave:** 1  
**Constitutional Layer:** Execution Governance Engine  
**Last Updated:** 2025-12-11

---

## Purpose

Enable Foreman to execute real builds using:
- GitHub Copilot Builder
- Local Desktop Builder
- Future Builder Agents

This is the first phase where **real code building is allowed**, but with full constitutional protections.

---

## Requirements

### 1. Builder Task Dispatcher

**Implementation:** `lib/foreman/execution/builder-executor.ts`

**Capabilities:**

- ✅ Route tasks to correct builder
- ✅ Validate builder protocol v1.0
- ✅ Check governance compliance
- ✅ Enforce Build Philosophy v1.0
- ✅ Handle multi-step tasks
- ✅ Detect failures and restart

**Key Functions:**
```typescript
executeBuild(task, config)          // Execute with selected builder
executeBuildToGreen(task, config)   // Build-to-green enforcement
selectBuilder(task)                 // Intelligent builder selection
validateGovernanceCompliance(task)  // Governance checks
```

### 2. Build-to-Green Loop

**Process Flow:**

Foreman MUST:

1. **Run Builder**
   - Execute build task with selected builder
   - Monitor build progress
   - Capture build artifacts

2. **Perform QIC** (Quality Integrity Contract)
   - Run `npm run lint`
   - Run TypeScript type-check
   - Run `npm run build`
   - All must pass with zero errors/warnings

3. **Perform QIEL** (Quality Integrity Enforcement Layer)
   - Run governance validation
   - Check architectural compliance
   - Verify constitutional rules
   - Scan for guardrail violations

4. **Auto-Fix Using Builder if Red**
   - If QIC fails → Re-run builder with error context
   - If QIEL fails → Re-run builder with violation details
   - Provide specific guidance for fixes

5. **Repeat Until Green or STOP**
   - Maximum 3 cycles allowed
   - After 3 failures → Escalate to incident (CS3)
   - Success → Proceed to PR creation

### 3. Mutation Prevention Rules

**Builders:**

❌ **CANNOT** change architecture files:
- `foreman/architecture-design-checklist.md`
- `foreman/true-north-architecture.md`
- Any file in `foreman/architecture/`

❌ **CANNOT** modify governance files:
- `.github/foreman/agent-contract.md`
- `BUILD_PHILOSOPHY.md`
- `foreman/constitution/`
- `foreman/governance/`

❌ **CANNOT** alter workflows:
- `.github/workflows/`
- Any CI/CD configuration

✅ **MUST** pass all QA before handover:
- All tests green
- Lint passing
- Build successful
- QIEL validated

**Enforcement:**
```typescript
const IMMUTABLE_PATHS = [
  '.github/workflows/',
  'foreman/constitution/',
  'BUILD_PHILOSOPHY.md',
  '.github/foreman/agent-contract.md'
]

const SAFE_PATHS = [
  'app/',
  'components/',
  'lib/',
  'docs/',
  'tests/'
]
```

### 4. Logging

**All execution logged to:**

1. **Primary Log:**
   - `docs/autonomy/AUTONOMY_PILOT_LOG.md`
   - Append-only format
   - Constitutional tracking

2. **Dashboard Display:**
   - `/app/foreman/autonomy-dashboard/`
   - Real-time updates
   - Visual status indicators

**Log Entry Format:**
```markdown
### [TIMESTAMP] - Build Execution

**Action**: Execute build for issue #[N]
**Builder Used**: [github-copilot|local-builder]
**QA Status**: [red|green|failed]
**Governance**: [passed|violations]
**Outcome**: [success|failure|escalated]
**Details**: [execution details]
```

---

## Acceptance Criteria

- ✅ Foreman successfully runs a real build on a small issue
- ✅ QIC/QIEL fully enforced
- ✅ Rollback logic works
- ✅ Logs complete
- ✅ No governance violations
- ✅ Builder selection logic functional
- ✅ Auto-fix loop implemented
- ✅ Mutation prevention active

---

## Implementation Status

### Completed Components

- ✅ `lib/foreman/execution/builder-executor.ts` - Core execution engine
- ✅ `lib/foreman/local-builder.ts` - Local builder integration
- ✅ `lib/foreman/builder-detection.ts` - Builder discovery
- ✅ `lib/builder/integration-contract.ts` - Builder protocol
- ✅ Governance enforcement hooks
- ✅ QIC/QIEL integration
- ✅ Rollback mechanism
- ✅ Logging system

### Integration Points

- **CS1 Guardrails**: Validates immutable paths before build
- **CS3 Incident System**: Records build failures as incidents
- **CS5 Execution Gatekeeper**: Controls build authorization
- **CS6 Builder Protection**: Validates builder protocol compliance
- **CS7 Autonomy Log**: Records all build attempts

---

## Usage Example

```typescript
import { executeBuildToGreen } from '@/lib/foreman/execution/builder-executor'

const result = await executeBuildToGreen(
  {
    id: 'task-123',
    type: 'feature',
    title: 'Add user profile page',
    description: 'Build to Green: Implement user profile UI',
    architectureRef: 'docs/architecture/user-profile.md',
    redQAPath: 'tests/user-profile.qa.ts'
  },
  {
    owner: 'MaturionISMS',
    repo: 'maturion-foreman-app',
    issueNumber: 123,
    branch: 'autonomy/pilot-1/issue-123',
    autoRollback: true,
    governanceMode: 'strict'
  }
)

if (result.success && result.qaStatus === 'green') {
  console.log('✅ Build complete! All QA passing.')
  console.log('📦 Artifacts:', result.artifacts)
} else {
  console.error('❌ Build failed:', result.error)
  console.error('🚨 Violations:', result.governanceViolations)
}
```

---

## Dependencies

- **Requires:** PHASE_01 (Autonomous Mode Pilot)
- **Required by:** PHASE_03 (PR Auto-Merge Engine)

---

## Security Considerations

1. **Builder Isolation**: Each builder runs in isolated context
2. **Path Validation**: All file operations validated against safe paths
3. **Secret Protection**: No secrets in logs or artifacts
4. **Rollback Safety**: Failed builds automatically reverted
5. **Audit Trail**: Complete execution history maintained

---

## Next Phase

Proceed to [PHASE_03.md](./PHASE_03.md) - PR Auto-Merge Engine

---

*This phase implements CS5 Execution Gatekeeper and is protected under CS1 Guardrails. Modifications require CS2 Architecture Change Approval.*
