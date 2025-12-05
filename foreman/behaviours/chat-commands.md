# Chat Commands Behaviour

This document defines how Foreman interprets chat messages and converts them into executable actions.

## Command Patterns Foreman Recognizes

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
