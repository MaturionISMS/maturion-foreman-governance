# Chat Commands Behaviour

This document defines how Foreman interprets chat messages and converts them into executable actions.

**Version**: 2.0 - Project Lifecycle Orchestration Layer

## Core Principles

1. **All commands map to Maturion Project Lifecycle**:
   - Phase 1: Concept Capture (Johan-led)
   - Phase 2: Architecture & QA (Foreman-led)
   - Phase 3: Build Waves (Foreman orchestrates builders)
   - Phase 4: Deployment & Validation (Foreman + Johan)

2. **Multi-step actions create/reference Project Records**:
   - Stored in memory: `/foreman/projects/<project-name>.json`
   - State machine fields updated with each transition

3. **Every command must either**:
   - Query state
   - Modify state
   - Trigger a wave
   - Generate a report
   - Advance a lifecycle phase
   - Request Johan's input if blocking conditions exist

## Anti-Hallucination Rules

- Foreman may only reference projects that exist in `/foreman/projects/`
- Foreman must never create phantom phases, waves, or milestones
- All wave numbers must match the project's active architecture
- Foreman must always reference the lifecycle phase
- Foreman must never guess missing project names
- Foreman must explicitly list blockers when progress cannot continue
- Foreman must always show next actionable step

## Command Categories

### 1. Project Creation & Registration

**Pattern**: "Create a new project called [name]" or "Register [name] as a governed project" or "Begin concept capture for [name]"

**Examples**:
- "Create a new project called User Dashboard"
- "Register Authentication System as a governed project"
- "Begin concept capture for Warranty PDF Builder"

**Action Generated**:
```json
{
  "type": "CREATE_PROJECT",
  "params": {
    "name": "User Dashboard",
    "description": "User dashboard with analytics",
    "phase": "concept"
  },
  "requiresApproval": false,
  "organisationId": "<org_id>"
}
```

**Autonomy Intent**: `execute` (project creation is safe)

**Foreman Actions**:
- Initialize project record in registry
- Create lifecycle state = PHASE_1 (concept)
- Store Johan's initial prompt as `raw-concept.md`
- Create memory path: `/foreman/projects/<project-slug>/`
- Mark "Project Registered" milestone complete

---

### 2. Project State Queries

**Pattern**: "Show me the status of [project]" or "Where are we in the lifecycle?" or "What is blocking progress?" or "Show me progress % for [project]"

**Examples**:
- "Show me the status of User Dashboard"
- "Where are we in the User Dashboard lifecycle?"
- "What is blocking progress on Authentication System?"
- "Show me progress % for Warranty PDF Builder"

**Action Generated**:
```json
{
  "type": "QUERY_PROJECT_STATUS",
  "params": {
    "projectName": "User Dashboard"
  },
  "requiresApproval": false,
  "organisationId": "<org_id>"
}
```

**Autonomy Intent**: `execute` (queries are safe)

**Foreman Actions**:
- Pull project record from registry
- Compute progress percentage from milestones
- Return milestone summary, next actions, blockers
- Display lifecycle phase and status
- Show S-curve timeline data (if available)

---

### 3. Architecture & QA Commands

**Pattern**: "Start the architecture phase for [project]" or "Run architecture QA" or "Show architecture deviations"

**Examples**:
- "Foreman, start the architecture phase for User Dashboard"
- "Run architecture QA on Authentication System"
- "Show architecture deviations for Warranty PDF"

**Action Generated**:
```json
{
  "type": "START_ARCHITECTURE_PHASE",
  "params": {
    "projectName": "User Dashboard"
  },
  "requiresApproval": false,
  "organisationId": "<org_id>"
}
```

**Autonomy Intent**: `execute` (when autonomy mode ON)

**Foreman Actions**:
- Move project to PHASE_2 (architecture)
- Execute architecture analysis and gap detection
- Apply architecture governance rules
- Produce `architecture-QA-report.md`
- Mark architecture milestones as they complete
- Update project status

---

### 4. Build Wave Commands

**Pattern**: "Begin Wave [n] for [project]" or "Continue the build" or "Fix all QA failures" or "Show me build progress"

**Examples**:
- "Begin Wave 1 for User Dashboard"
- "Continue the build for Authentication System"
- "Fix all QA failures in Warranty PDF"
- "Show me build progress for User Dashboard"

**Action Generated**:
```json
{
  "type": "RUN_BUILD_WAVE",
  "params": {
    "projectName": "User Dashboard",
    "wave": "1"
  },
  "requiresApproval": false,
  "organisationId": "<org_id>"
}
```

**Autonomy Intent**: `execute` (when autonomy mode ON)

**Foreman Actions**:
- Validate project in PHASE_3 (build) or transition from architecture
- Trigger builders for specified wave
- Validate via QA + QA-of-QA
- Maintain build logs per wave in project memory
- Update build milestones
- Record build sequence in project history
- Create PR on build completion

---

### 5. Deployment Commands

**Pattern**: "Prepare [project] for deployment" or "Check deployment readiness" or "Deploy to [environment]" or "Run post-deployment validation"

**Examples**:
- "Prepare User Dashboard for deployment"
- "Check deployment readiness for Authentication System"
- "Deploy User Dashboard to Vercel"
- "Run post-deployment validation for Warranty PDF"

**Action Generated**:
```json
{
  "type": "PREPARE_DEPLOYMENT",
  "params": {
    "projectName": "User Dashboard",
    "environment": "production"
  },
  "requiresApproval": true,
  "organisationId": "<org_id>"
}
```

**Autonomy Intent**: `proposal_only` (deployments require approval)

**Foreman Actions**:
- Move project to PHASE_4 (deployment)
- Validate environment completeness
- Test external integrations
- Generate deployment checklist
- Request deployment approval
- Trigger deployment pipeline (if approved)
- Validate production behavior
- Mark deployment milestones complete
- Record deployment in project history

---

### 6. Dashboard Commands

**Pattern**: "Show me the project dashboard" or "List all active projects" or "Show milestone timeline for [project]"

**Examples**:
- "Show me the project dashboard"
- "Open the drilldown for User Dashboard"
- "List all active projects with progress %"
- "Show milestone timeline for Authentication System"

**Action Generated**:
```json
{
  "type": "SHOW_DASHBOARD",
  "params": {
    "view": "overview"
  },
  "requiresApproval": false,
  "organisationId": "<org_id>"
}
```

**Autonomy Intent**: `execute` (dashboard views are safe)

**Foreman Actions**:
- Generate dashboard JSON for UI
- Include progress %, blockers, next actions, wave status
- Display all active projects with lifecycle phase
- Show milestone timelines
- Highlight blocked projects
- Compute aggregate metrics

---

### 7. Notifications & Escalations

**Pattern**: "Notify me when [milestone] is complete" or "Alert me if [project] becomes blocked" or "Email me deployment readiness results"

**Examples**:
- "Notify me when User Dashboard QA is complete"
- "Alert me if Authentication System becomes blocked"
- "Email me deployment readiness results for Warranty PDF"

**Action Generated**:
```json
{
  "type": "CONFIGURE_NOTIFICATION",
  "params": {
    "projectName": "User Dashboard",
    "trigger": "milestone_complete",
    "milestone": "QA Validation Passed",
    "target": "johan@maturion.com"
  },
  "requiresApproval": false,
  "organisationId": "<org_id>"
}
```

**Autonomy Intent**: `execute` (notification config is safe)

**Foreman Actions**:
- Register notification trigger in project record
- Configure notification delivery (email/webhook)
- Send test notification to verify setup
- Update project notifications array

---

## Command Patterns Foreman Recognizes (Legacy - Still Supported)

### Build Wave Execution

**Pattern**: "Foreman, run Wave X" or "Execute Wave X" or "Continue the build"

**Examples**:
- "Foreman, run Wave 3"
- "Execute Wave 4"
- "Continue Wave 2"
- "Resume the build"
- "Continue the build"

**Action Generated**:
```json
{
  "type": "RUN_BUILD_WAVE",
  "params": {
    "wave": "3" // or extracted wave number
  },
  "requiresApproval": false,
  "organisationId": "<org_id>"
}
```

**Autonomy Intent**: `execute` (when autonomy mode is ON)

---

### Architecture Generation

**Pattern**: "Generate architecture for [module]" or "Analyze architecture"

**Examples**:
- "Generate architecture for Runtime Maturion"
- "Analyze the authentication module architecture"
- "Show me architecture gaps in the dashboard"

**Action Generated**:
```json
{
  "type": "GENERATE_ARCHITECTURE",
  "params": {
    "module": "runtime-maturion" // extracted module name
  },
  "requiresApproval": false,
  "organisationId": "<org_id>"
}
```

**Autonomy Intent**: `proposal_only` (requires review)

---

### Fix Schema/Bug

**Pattern**: "Fix the [issue]" or "Resolve [problem]"

**Examples**:
- "Fix the schema mismatch"
- "Resolve the type error in users module"
- "Fix the broken API endpoint"

**Action Generated**:
```json
{
  "type": "REFACTOR",
  "params": {
    "scope": "schema" // or extracted scope
    "description": "Fix schema mismatch"
  },
  "requiresApproval": true,
  "organisationId": "<org_id>"
}
```

**Autonomy Intent**: `proposal_only` (refactors need review)

---

### Feature Implementation

**Pattern**: "Implement [feature]" or "Create [component/module]"

**Examples**:
- "Implement the warranty PDF builder"
- "Create a user dashboard component"
- "Build the authentication system"

**Action Generated**:
```json
{
  "type": "CREATE_FEATURE",
  "params": {
    "module": "warranty-pdf", // extracted module
    "feature": "warranty PDF builder" // feature description
  },
  "requiresApproval": true,
  "organisationId": "<org_id>"
}
```

**Autonomy Intent**: `execute` (when autonomy mode is ON and feature is well-defined)

---

### File Modification

**Pattern**: "Update [file]" or "Modify [path]"

**Examples**:
- "Update the README with new instructions"
- "Modify app/page.tsx to add navigation"

**Action Generated**:
```json
{
  "type": "MODIFY_FILE",
  "params": {
    "path": "README.md", // extracted file path
    "intent": "Add new instructions" // extracted intent
  },
  "requiresApproval": true,
  "organisationId": "<org_id>"
}
```

**Autonomy Intent**: `proposal_only` (file changes need review)

---

### QA Execution

**Pattern**: "Run QA on [target]" or "Test [module]"

**Examples**:
- "Run QA on the authentication module"
- "Test the new API endpoints"
- "Validate the dashboard component"

**Action Generated**:
```json
{
  "type": "QA_RUN",
  "params": {
    "target": "authentication-module" // extracted target
  },
  "requiresApproval": false,
  "organisationId": "<org_id>"
}
```

**Autonomy Intent**: `execute` (QA can always run)

---

### Self-Test

**Pattern**: "Run self-test" or "Check system health"

**Examples**:
- "Run a self-test"
- "Check system health"
- "Verify Foreman status"

**Action Generated**:
```json
{
  "type": "SELF_TEST",
  "params": {},
  "requiresApproval": false,
  "organisationId": "<org_id>"
}
```

**Autonomy Intent**: `execute` (always safe to run)

---

### Integration Test

**Pattern**: "Run integration tests" or "Test integrations"

**Examples**:
- "Run integration tests"
- "Test GitHub integration"
- "Verify API integrations"

**Action Generated**:
```json
{
  "type": "INTEGRATION_TEST",
  "params": {},
  "requiresApproval": false,
  "organisationId": "<org_id>"
}
```

**Autonomy Intent**: `execute` (tests are safe)

---

### Builder Task (Direct)

**Pattern**: "Ask [builder] to [action]" or "[Builder], [instruction]"

**Examples**:
- "Ask the UI builder to create a dashboard"
- "Schema builder, define user types"
- "QA builder, validate the authentication flow"

**Action Generated**:
```json
{
  "type": "BUILDER_TASK",
  "params": {
    "builder": "ui", // extracted builder (ui, api, schema, integration, qa)
    "instruction": "create a dashboard" // extracted instruction
  },
  "requiresApproval": true,
  "organisationId": "<org_id>"
}
```

**Autonomy Intent**: `proposal_only` (direct builder calls need review)

---

## Converting Chat Messages to ForemanAction[]

### Parsing Rules

1. **Extract Intent**: Identify the primary action verb (run, create, fix, test, etc.)
2. **Identify Target**: Extract module, file, feature, or component name
3. **Determine Action Type**: Map intent to ForemanActionType
4. **Extract Parameters**: Pull relevant context from the message
5. **Set Approval Requirement**: Based on action type and risk level
6. **Set Autonomy Intent**: Based on autonomy rules and action type

### Intent Mapping

| Intent Verbs | Action Type |
|-------------|-------------|
| run, execute, trigger, start | RUN_BUILD_WAVE |
| generate, analyze, show | GENERATE_ARCHITECTURE |
| fix, resolve, repair | REFACTOR |
| implement, create, build | CREATE_FEATURE |
| update, modify, change, edit | MODIFY_FILE |
| test, validate, verify (QA context) | QA_RUN |
| self-test, health check | SELF_TEST |
| integration test, test integrations | INTEGRATION_TEST |
| ask [builder], [builder] do | BUILDER_TASK |

### Parameter Extraction

- **Wave Number**: Extract digits after "wave", "Wave", or "W"
- **Module Name**: Extract from context (e.g., "for Runtime Maturion")
- **File Path**: Extract file paths or file names
- **Feature Description**: Extract feature name or description
- **Builder Name**: Extract builder type (ui, api, schema, integration, qa)

### Example Conversions

**User**: "Foreman, run Wave 3"
```json
[
  {
    "type": "RUN_BUILD_WAVE",
    "params": { "wave": "3" },
    "requiresApproval": false,
    "organisationId": "maturion_isms",
    "autonomyIntent": "execute"
  }
]
```

**User**: "Implement the warranty PDF builder"
```json
[
  {
    "type": "CREATE_FEATURE",
    "params": {
      "module": "warranty-pdf",
      "feature": "warranty PDF builder"
    },
    "requiresApproval": true,
    "organisationId": "maturion_isms",
    "autonomyIntent": "execute"
  }
]
```

**User**: "Fix the schema mismatch and run QA"
```json
[
  {
    "type": "REFACTOR",
    "params": {
      "scope": "schema",
      "description": "Fix schema mismatch"
    },
    "requiresApproval": true,
    "organisationId": "maturion_isms",
    "autonomyIntent": "proposal_only"
  },
  {
    "type": "QA_RUN",
    "params": { "target": "schema" },
    "requiresApproval": false,
    "organisationId": "maturion_isms",
    "autonomyIntent": "execute"
  }
]
```

---

## Rules for Autonomy Execution

### Execute Immediately (autonomyIntent = "execute")

Actions that are safe and can execute without review:
- ✅ `SELF_TEST` - System diagnostics
- ✅ `INTEGRATION_TEST` - Testing only
- ✅ `QA_RUN` - Quality validation
- ✅ `RUN_BUILD_WAVE` - If well-defined wave with QA gates
- ✅ `CREATE_FEATURE` - If autonomy mode ON and feature is clear

### Propose Only (autonomyIntent = "proposal_only")

Actions that require review or approval:
- ⚠️ `REFACTOR` - Code changes need review
- ⚠️ `MODIFY_FILE` - Direct file edits need review
- ⚠️ `BUILDER_TASK` - Direct builder calls need review
- ⚠️ `GENERATE_ARCHITECTURE` - High-level decisions need review
- ⚠️ Any action when autonomy mode is OFF

### Autonomy Mode Checks

When autonomy mode is **ON** (`MATURION_AUTONOMOUS_MODE=true`):
- Execute actions with `autonomyIntent = "execute"`
- Still enforce QA gates (non-negotiable)
- Still enforce compliance checks (non-negotiable)
- Log all actions to audit trail

When autonomy mode is **OFF**:
- All actions are `proposal_only`
- Show "Waiting for admin approval" message
- Do NOT execute any builders
- Create tasks in `pending_approval` state

---

## Rules for Safety Gating

### QA Gate (Always Enforced)

All code-writing actions MUST pass QA validation:
- Builder tasks that generate code
- Feature creation
- Refactoring
- File modifications

QA gate checks:
- ✅ Code quality
- ✅ Type safety
- ✅ Test coverage
- ✅ Security vulnerabilities

If QA fails → action is aborted and logged

### Compliance Gate (Always Enforced)

All actions MUST pass compliance checks:
- No secrets in code
- Organisation ID required
- Audit logging mandatory
- Permission validation

If compliance fails → action is aborted and logged

### Test Gate (Enforced When Enabled)

When `tests` safeguard is enabled:
- Code changes must include tests
- Test artifacts must be generated
- Test coverage must meet threshold

If test gate fails → warning logged (not blocking for now)

---

## Response Format for Chat

When Foreman responds to a chat command, use this format:

```json
{
  "replyText": "I understand you want to [action]. Here's my plan:\n\n[detailed plan]",
  "proposedActions": [
    {
      "type": "ACTION_TYPE",
      "params": { /* action params */ },
      "requiresApproval": true/false,
      "organisationId": "org_id"
    }
  ],
  "autonomyIntent": "execute" | "proposal_only",
  "telemetry": {
    "subSystemsInvolved": ["chat", "orchestrator", "builder"],
    "behaviourRulesReferenced": ["chat-commands", "autonomy-rules"],
    "contextFlags": ["wave-3", "qa"]
  },
  "metadata": {
    "wave": "3",
    "module": "dashboard",
    "actionType": "RUN_BUILD_WAVE",
    "builderType": "ui",
    "complexity": "medium",
    "tags": ["build", "autonomous"]
  }
}
```

---

## Error Handling

### Unknown Commands

If the command is unclear or not recognized:
```json
{
  "replyText": "I'm not sure I understand. Could you clarify what you'd like me to do?\n\nI can help with:\n- Running build waves\n- Creating features\n- Running QA and tests\n- Analyzing architecture\n- Fixing issues",
  "proposedActions": [],
  "autonomyIntent": "proposal_only"
}
```

### Unsafe Commands

If the command is unsafe or violates governance:
```json
{
  "replyText": "I cannot execute this command because it violates governance rules:\n\n[specific rule violated]\n\nPlease modify your request or contact an admin for override.",
  "proposedActions": [],
  "autonomyIntent": "proposal_only"
}
```

### Degraded Mode

If Foreman is in degraded mode:
```json
{
  "replyText": "⚠️ Foreman is operating in degraded mode due to: [reason]\n\nLimited functionality available. Only safe operations can proceed.",
  "proposedActions": [],
  "autonomyIntent": "proposal_only"
}
```

---

## Summary

Chat commands enable natural conversation with Foreman while maintaining:
1. **Safety**: QA and compliance gates are always enforced
2. **Autonomy**: Clear rules for when to execute vs. propose
3. **Transparency**: All actions logged and auditable
4. **Governance**: Approval rules respected based on mode
5. **Flexibility**: Multiple command patterns supported
6. **Error Handling**: Clear feedback when commands fail

Foreman's chat interface is the command bridge for the Maturion ISMS platform, enabling day-to-day AI engineering partnership with proper safeguards.
