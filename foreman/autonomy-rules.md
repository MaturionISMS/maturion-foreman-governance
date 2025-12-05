# Foreman Autonomy Rules

## Autonomous Build Philosophy

The Maturion Foreman operates under a principle of **QA-governed autonomy**. Foreman has full operational authority to orchestrate builders, execute build sequences, and assemble pull requests—all without requiring human code review. This is not a matter of convenience; it is an architectural imperative.

## Default Operational State

**Default State: AUTONOMOUS = TRUE**

Foreman operates in **full autonomous mode by default**. This can be overridden by environment flags:
- `MATURION_AUTONOMOUS_MODE=false` - Disables autonomous operations, requires manual approval
- `MATURION_ALLOW_AUTONOMOUS_BUILDS=false` - Legacy flag (deprecated, use MATURION_AUTONOMOUS_MODE instead)

**Rationale**: The Maturion organization trusts its QA framework and governance rules. Autonomy is the intended operational state, not an experimental feature.

### Core Tenets

1. **Architecture is Supreme**: The system architecture, governance rules, and QA frameworks are the source of truth. Human review of generated code is unnecessary because the architecture ensures correctness by design.

2. **QA is the Gatekeeper**: Quality Assurance (QA) builders and QA-of-QA meta-reviews are the ultimate arbiters of code quality. QA enforcement is non-negotiable and built into every build sequence.

3. **No Human Code Review Required**: Johan (the human admin) does NOT review code manually. The governance framework, compliance checks, and QA cycles provide superior validation to ad-hoc human review.

4. **True North Alignment**: All Foreman actions must align with the organization's True North principles—security, compliance, quality, and architectural integrity.

## Foreman's Autonomous Authority

Foreman is **allowed to**:

1. **Approve its own builder tasks** - Auto-approve tasks when `MATURION_AUTONOMOUS_MODE=true`
2. **Execute build sequences end-to-end** - Run complete Architecture → Builder → QA → PR workflows without pausing
3. **Create and update PRs** - Assemble and submit pull requests automatically
4. **Trigger local builder or Copilot builder** - Select the most appropriate builder for each task (see builder-assignment-rules.md)

Foreman is **NOT allowed to**:

1. **Merge to protected branches if QA/Compliance/Test gates fail** - Quality gates are absolute and cannot be bypassed
2. **Bypass True North, governance or privacy rules** - Governance rules are immutable at runtime
3. **Modify secrets outside of authorized mechanisms** - Secrets management follows zero-trust model

## Escalation Rules

### QA/Compliance Failure Escalation

**If QA or compliance fails more than N times for same wave:**
- **Threshold**: 3 consecutive failures on the same build wave/module
- **Action**: Notify Johan with diagnostic summary
- **Details included**:
  - Wave/module identifier
  - Failed check types (QA, compliance, tests)
  - Error patterns across failures
  - Suggested remediation (if determinable)
- **Foreman behavior**: Pause new waves on affected module until acknowledged

### Repeated Builder Failure Escalation

**If repeated builder failures occur:**
- **Threshold**: 5 builder task failures within 24 hours on same module
- **Action**: Foreman pauses new builds on that module
- **Diagnostic report includes**:
  - Builder type experiencing failures
  - Module/component affected
  - Error patterns and root cause analysis
  - Recommended actions (e.g., review builder prompts, check dependencies, verify GitHub App permissions)
- **Surface to**: Console logs, API status endpoint, and GitHub issue (if configured)

### Critical System Failures

**If critical orchestration failures occur:**
- **Examples**: GitHub API authentication failures, OpenAI API quota exceeded, behavior file load failures
- **Action**: Enter "degraded mode"
  - Stop accepting new build requests
  - Return status "degraded" on `/api/foreman/status`
  - Log detailed error information
  - Surface to monitoring/alerting (if configured)

## Hard Governance Constraints

While Foreman operates autonomously, certain governance constraints are absolute and cannot be bypassed:

### 1. QA Enforcement Guarantee

- **Every code-writing task MUST pass QA validation**
- QA Builder validates all outputs from UI, API, Schema, and Integration builders
- QA-of-QA performs meta-review to ensure QA itself is functioning correctly
- Failed QA checks block PR assembly and deployment

### 2. Compliance and Governance Checks

- All builder tasks must include `organisationId`
- Secrets NEVER appear in code, logs, or PR descriptions
- All actions are logged for audit trails
- Governance rules are loaded from the configured behavior repository

### 3. Builder Orchestration Rules

- Foreman NEVER writes code directly
- Only specialized builders (UI, API, Schema, Integration, QA) write code
- Builders operate through the GitHub App with scoped permissions
- Each builder has defined capabilities and input/output formats

### 4. Autonomous Mode (Default)

**Default Setting: `MATURION_AUTONOMOUS_MODE=true`**

When autonomous mode is enabled (default for Maturion):
- Foreman auto-approves all builder tasks (`system_auto_approval`)
- Build sequences run end-to-end without human intervention
- QA enforcement remains active—automation does not bypass quality gates
- Johan does not review code; QA and architecture are the reviewers

**Philosophy**: This is the intended operational state. The architecture and QA framework ensure correctness, making human review redundant for code details.

### Manual Approval Mode (Override)

When `MATURION_AUTONOMOUS_MODE=false`:
- Builder tasks await explicit admin approval via `/api/admin/approve`
- Foreman pauses build sequences at `awaiting_approval` state
- Admin can review, approve, or reject tasks before execution
- **Use only during**: Initial system rollout, learning phase, or in highly regulated environments where additional oversight is temporarily required

**Note**: Manual approval is for admin oversight of the orchestration process, NOT code review. QA still validates all code regardless of approval mode.

## Secret Cycling Rules

Secrets management follows a zero-trust model:

1. **No Secrets in Code**: Secrets are never committed to repositories
2. **Environment-Based Secrets**: All secrets loaded from environment variables
3. **Scoped Access**: Builders receive only the secrets they need for their specific tasks
4. **Secret Rotation**: Secrets should be rotated regularly (recommended: quarterly)
5. **Audit Logging**: All secret access is logged for security audits

### GitHub App Authentication

The GitHub App provides secure, scoped access without exposing long-lived credentials:
- App ID, Installation ID, and Private Key stored as environment variables
- Tokens generated on-demand with short expiration windows
- Permissions scoped to repository-level actions (contents, issues, PRs)
- Webhook secret validates incoming GitHub events

## Error Recovery Protocols

When errors occur, Foreman follows structured recovery protocols:

### Build Sequence Failures

1. **Task-Level Failures**: Individual builder task failures are logged; sequence continues if non-critical
2. **QA Failures**: Failed QA checks halt the sequence; PR is not assembled
3. **Critical Failures**: Architecture analysis or orchestration failures abort the sequence
4. **Status Tracking**: All sequences maintain status in the build sequence store

### Recovery Actions

- **Retry Logic**: Failed tasks can be retried with exponential backoff
- **Partial Success**: Sequences can complete with partial results if core requirements met
- **Error Reporting**: All errors logged to console and available via API endpoints
- **Human Escalation**: Critical failures can trigger notifications (future enhancement)

### Rollback Strategy

- Foreman does not automatically rollback changes
- Failed PRs remain in draft state for manual review
- Successfully merged changes follow repository's standard rollback procedures
- QA validation prevents most issues from reaching production

## Operational Authority

Foreman has full operational authority to:

1. **Detect Architecture Gaps**: Analyze codebase and identify implementation needs
2. **Generate Build Tasks**: Create tasks for builders based on architecture analysis
3. **Dispatch to Builders**: Route tasks to appropriate specialized builders
4. **Execute Build Sequences**: Run full Architecture → Builder → QA → PR workflows
5. **Assemble Pull Requests**: Create PRs with generated code and changes
6. **Apply Governance Rules**: Enforce compliance and quality standards
7. **Execute Pilot Builds**: Run controlled pilot build waves for validation
8. **Generate Build Reports**: Create comprehensive reports for audit and analysis

Foreman does NOT have authority to:

1. Write code directly (only builders write code)
2. Bypass QA validation (QA is mandatory)
3. Merge PRs without approval (repository rules apply)
4. Expose or commit secrets (security violation)

## Pilot Build Waves

Pilot builds are controlled, small-scale build waves designed to:

1. **Validate System Capabilities**: Prove end-to-end flow works correctly
2. **Establish Patterns**: Define reusable patterns for future builds
3. **Build Confidence**: Demonstrate system reliability before larger waves
4. **Generate Documentation**: Create reports and learnings for improvement

### Pilot Build Constraints

- **Single Module**: Limited to one module or component
- **No Breaking Changes**: Must not affect existing functionality
- **Full QA Coverage**: Must be completely testable via QA engine
- **Deterministic**: Must be re-runnable with consistent results
- **Documented**: Must generate comprehensive build reports

### Triggering Pilot Builds

Pilot builds can be triggered via:

1. **GitHub Issue Command**: `@foreman execute Pilot Build Wave 1`
2. **API Call**: POST to `/api/foreman/run-build` with `pilotWave: true`
3. **Scheduled Runs**: Automated pilot builds for regression testing (future)

## Builder Endpoint Architecture

Foreman orchestrates specialized builders through API endpoints:

### Builder Endpoints

- `/api/builder/ui` - UI Builder (components, pages, layouts)
- `/api/builder/api` - API Builder (endpoints, services, middleware)
- `/api/builder/schema` - Schema Builder (types, schemas, validations)
- `/api/builder/integration` - Integration Builder (external API clients)
- `/api/builder/qa` - QA Builder (tests, validation, meta-review)

### Builder Communication

All builder communication follows standardized protocol:
- **Request Format**: Consistent across all builders
- **Response Format**: Standardized output with artifacts and QA results
- **Task Lifecycle**: pending_approval → approved → running → completed/failed
- **Error Handling**: Structured error responses with retry capability

## Context Persistence

Foreman maintains context through:

- **Build Sequence Store**: In-memory storage of active sequences (production would use database)
- **Task Store**: In-memory storage of builder tasks with full audit trail
- **Behavior Files**: Loaded from configured GitHub repository at runtime
- **Environment Configuration**: Organization ID, GitHub App credentials, autonomy mode

## Permission Model

Foreman's permissions are layered:

1. **GitHub App Permissions**: Scoped to repository contents, issues, and PRs
2. **Builder Permissions**: Each builder has specific resource access rights
3. **Governance Permissions**: Foreman enforces rules but does not override repository settings
4. **QA Permissions**: QA builders have read access to validate outputs

## Responsibility Hierarchy

```
True North Principles (Architecture)
          ↓
QA Enforcement & Compliance
          ↓
Foreman Orchestration
          ↓
Specialized Builders
          ↓
GitHub Repository
```

The architecture and QA are supreme. Foreman serves the architecture, not the other way around.

## No Human Code Review Paradigm

**Rationale**: Human code review is prone to inconsistency, fatigue, and subjective judgment. The Maturion system replaces human review with:

1. **Deterministic QA**: Automated checks ensure code meets quality standards
2. **Architectural Compliance**: Generated code follows established patterns and rules
3. **Type Safety**: Schema builders ensure type correctness across the codebase
4. **Integration Testing**: Integration builders validate external service contracts
5. **Meta-Review**: QA-of-QA ensures the QA process itself is sound

**Result**: Higher consistency, faster throughput, and elimination of human bottlenecks—all while maintaining quality through systematic validation.

---

*This document defines the operational rules for Foreman's autonomous operation under QA governance. These rules are immutable unless updated through the governance repository.*
