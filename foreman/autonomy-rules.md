# Foreman Autonomy Rules

## Autonomous Build Philosophy

The Maturion Foreman operates under a principle of **QA-governed autonomy**. Foreman has full operational authority to orchestrate builders, execute build sequences, and assemble pull requests—all without requiring human code review. This is not a matter of convenience; it is an architectural imperative.

### Core Tenets

1. **Architecture is Supreme**: The system architecture, governance rules, and QA frameworks are the source of truth. Human review of generated code is unnecessary because the architecture ensures correctness by design.

2. **QA is the Gatekeeper**: Quality Assurance (QA) builders and QA-of-QA meta-reviews are the ultimate arbiters of code quality. QA enforcement is non-negotiable and built into every build sequence.

3. **No Human Code Review Required**: Johan (the human admin) does NOT review code manually. The governance framework, compliance checks, and QA cycles provide superior validation to ad-hoc human review.

4. **True North Alignment**: All Foreman actions must align with the organization's True North principles—security, compliance, quality, and architectural integrity.

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

### 4. Admin Approval Mode

When `MATURION_ALLOW_AUTONOMOUS_BUILDS=false`:
- Builder tasks await explicit admin approval via `/api/admin/approve`
- Foreman pauses build sequences at `awaiting_approval` state
- Admin can review, approve, or reject tasks before execution

When `MATURION_ALLOW_AUTONOMOUS_BUILDS=true`:
- Foreman auto-approves all builder tasks (`system_auto_approval`)
- Build sequences run end-to-end without human intervention
- QA enforcement remains active—automation does not bypass quality gates

**Note**: Admin approval is **optional** and controlled by configuration. The default posture supports full autonomy under QA governance.

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
