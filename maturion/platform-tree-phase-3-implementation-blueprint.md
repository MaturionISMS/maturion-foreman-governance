# PLATFORM TREE — PHASE 3 IMPLEMENTATION BLUEPRINT  
Version: 1.0  
Status: Build Orchestration Specification (Diagnostics & Autonomy)  
Owner: Johan  
Last Updated: YYYY-MM-DD  

--------------------------------------------------------------------------------
# 1. PURPOSE OF PHASE 3

Phase 3 turns the Platform Tree from a **live monitoring dashboard** into an  
**interactive diagnostic and control surface**, tightly integrated with Maturion.

Phase 3 introduces:

- Node-level diagnostics driven by Maturion  
- Root-cause analysis and recommended remediation steps  
- Ability to create issues / incidents directly from the tree  
- Controlled autonomy actions (within governance limits)  
- Tight integration with the Governance API  
- Context-aware “Ask Maturion” capabilities per node  

The goal is:

> From the tree, Johan can click any node and:  
> understand what’s wrong, why it’s wrong, how big the risk is,  
> and what Maturion recommends doing about it – then trigger those steps.

--------------------------------------------------------------------------------
# 2. OBJECTIVES OF PHASE 3

By the end of Phase 3, the Platform Tree must:

1. Allow Johan (and authorised users) to invoke **Maturion diagnostics** on any node.  
2. Display Maturion’s analysis:
   - summary  
   - root cause  
   - recommendations  
   - suggested actions  
   - confidence level  
3. Allow Johan to:
   - create incidents  
   - create issues  
   - (optionally) trigger remediation actions (within autonomy limits)  
4. Use the Governance API for:
   - checking if an action is allowed  
   - verifying autonomy level  
   - logging governance decisions  
5. Maintain strict alignment with:
   - Guardrails  
   - Oversight System  
   - Tenant Isolation Standard  
   - Self-Learning Governance  

--------------------------------------------------------------------------------
# 3. SCOPE OF PHASE 3 (STRICT)

### IN SCOPE

- “Ask Maturion” diagnostics per node  
- Diagnostics result rendering in NodeDetailsPanel  
- Action buttons based on recommendations:
  - “Create Issue”  
  - “Create IWMS Incident”  
  - “Schedule Follow-Up”  
- Controlled “Execute Remediation” (only if Governance API approves)  
- Governance API integration for:
  - autonomy checks  
  - action permissions  
  - logging decisions  
- Optional: store last diagnostics per node for quick view  

### OUT OF SCOPE (LATER PHASES)

- Full auto-remediation without Johan confirmation  
- Cross-tenant diagnostic trees  
- Time-series analytics & trends at tree level  
- Predictive failure modelling visualisations  
- Fully autonomous issue → PR → merge loop initiated from tree  

--------------------------------------------------------------------------------
# 4. TECHNICAL DELIVERABLES

### 4.1 Diagnostics Service Implementation

File:  
`/src/features/platformTree/services/diagnosticsService.ts`

Functions:

```ts
diagnoseNode(nodeId: string, userId: string): Promise<DiagnosticsResult>;

executeSuggestedAction(
  nodeId: string,
  actionId: string,
  userId: string
): Promise<ExecuteActionResult>;

createIssueFromDiagnostics(
  nodeId: string,
  diagnostics: DiagnosticsResult,
  userId: string
): Promise<CreateIssueResult>;

createIncidentFromDiagnostics(
  nodeId: string,
  diagnostics: DiagnosticsResult,
  userId: string
): Promise<CreateIncidentResult>;
DiagnosticsResult (as defined previously):

ts
Copy code
export interface DiagnosticsResult {
  summary: string;
  rootCause: string;
  recommendations: string[];
  suggestedActions: SuggestedAction[];
  confidence: number;
}

export interface SuggestedAction {
  id: string;
  label: string;
  type:
    | "CREATE_ISSUE"
    | "CREATE_INCIDENT"
    | "RUN_CHECK"
    | "TRIGGER_REBUILD"
    | "ADJUST_AUTONOMY"
    | "OTHER";
  requiresConfirmation: boolean;
}
4.2 Governance API Client
File:
/src/features/platformTree/services/governanceService.ts

Functions:

ts
Copy code
checkActionPermission(
  nodeId: string,
  actionType: string,
  userId: string
): Promise<GovernanceDecision>;

logGovernanceDecision(payload: GovernanceLogEntry): Promise<void>;
GovernanceDecision:

ts
Copy code
export interface GovernanceDecision {
  allowed: boolean;
  reason?: string;
  requiredAutonomyLevel?: number;
  currentAutonomyLevel?: number;
}
5. UI CHANGES REQUIRED
5.1 NodeDetailsPanel — Diagnostics Section
Enhance NodeDetailsPanel.tsx with:

“Ask Maturion” button

Diagnostics result area

Suggested actions list

Action buttons (conditionally enabled)

Layout:

Diagnostics Header

Summary (short)

Root Cause (short)

Recommendations (bulleted list)

Confidence indicator (e.g. 0–100%)

Suggested Actions (clickable)

5.2 Diagnostic Invocation Flow
User presses “Ask Maturion” on a node.

UI shows loading state.

Frontend calls diagnoseNode(nodeId, userId).

Maturion returns DiagnosticsResult.

UI stores last diagnostics result for node in memory (and optionally cache).

Panel updates with results.

5.3 Suggested Actions UI
For each SuggestedAction:

Render as a button with:

label

type indicator (e.g. icon)

If requiresConfirmation = true → show confirmation modal before execution.

Disabled if checkActionPermission returns allowed = false.

5.4 Autonomy Guardrail UX
If governance decision denies action:

Show inline message:

“Action not allowed: <reason>”

Optionally suggest:

“Discuss with Johan”

“Create Issue Instead”

6. BACKEND INTEGRATION (CONCEPTUAL)
Phase 3 expects the following backend behaviours:

6.1 Diagnostics Endpoint
Underlying implementation (conceptual):

Use Governance API to:

fetch node context

fetch status, incidents, watchdog signals

Feed context into Maturion diagnostic agent

Return structured DiagnosticsResult

6.2 Action Execution
For executeSuggestedAction:

Validate with Governance API:

ensure action allowed

ensure autonomy level sufficient

Execute:

create issue (Foreman repo or specific repo)

create IWMS incident

trigger check / rebuild

Log to audit trail

Update node status via /tree/node/{id}/update

7. GOVERNANCE CHECKPOINTS (NON-NEGOTIABLE)
Every action triggered from the tree MUST:

Use checkActionPermission()

Respect autonomy rules (Role Behaviour Matrix)

Honour:

Tenant Isolation Standard

Guardrails & Safety Charter

Oversight System

Self-Learning Governance

Emit an audit log entry via Governance API

Forbidden actions:

Actions that modify constitutional documents

Actions that change world model core

Actions that affect tenant data outside scope

Unapproved autonomy escalation

8. INTERACTION FLOW EXAMPLES
8.1 Example — Broken Module QA
Node: ISMS → Controls Module → Effectiveness Engine

Status: 🔴 Red

User: Johan clicks node → Details Panel opens

User clicks “Ask Maturion”

Diagnostics result (example):

Summary: “Control effectiveness scoring returning inconsistent results.”

Root Cause: “Mismatch between current control taxonomy version and ARC-approved model.”

Recommendations:

Re-sync control taxonomy

Re-run control mapping tests

Suggested Actions:

CREATE_ISSUE (“Create build issue in Foreman for Controls taxonomy sync”)

RUN_CHECK (“Run control-mapping validation suite”)

Johan clicks “Run control-mapping validation suite”:

Governance check: allowed

Runtime triggers test suite

Node status updates via events

8.2 Example — Behaviour Drift in Risk-Maturion
Node: Embodiments → Risk-Maturion

Status: 🟡 Amber

Sentinal: behaviour drift warning

Johan clicks “Ask Maturion”

Diagnostics:

Root Cause: “Increased ambiguity in risk-explanation responses over last 24h.”

Recommendation:

Trigger calibration

Review last N episodes

Suggested Actions:

RUN_CHECK (“Run behaviour calibration checks”)

CREATE_INCIDENT (“Create IWMS incident for drift review”)

9. TESTING REQUIREMENTS
9.1 Diagnostics Invocation
Tests must verify:

“Ask Maturion” triggers diagnosticsService

Diagnostics result is rendered correctly

Errors show user-friendly fallback messages

9.2 Governance Integration
Tests must:

mock governanceService responses

ensure disallowed actions:

show correct message

do not call execution endpoints

9.3 Suggested Actions
Tests must:

verify buttons map to correct action types

verify confirmation modals appear when required

verify node status updates after action success (via mocked events)

9.4 Edge Cases
diagnostics timeout

partial response

unsupported action types (defensive handling)

WebSocket disconnects during remediation

10. ACCEPTANCE CRITERIA
Phase 3 is complete when:

10.1 Diagnostics Working End-to-End
“Ask Maturion” works on any node

Reasonable diagnostics appear (summary, root cause, recommendations)

10.2 Suggested Actions Functional
Actions are listed

Governance checks run

Allowed actions execute

Disallowed actions show explanation

10.3 Tree Reflects Post-Action State
Status colours update

Incident badges update

Metrics change where expected

10.4 Safety Assured
No action bypasses Governance API

No action violates autonomy rules

No cross-tenant data displayed or acted upon

11. TRANSITION TO PHASE 4
Phase 4 will introduce:

deeper automation flows

history/timeline visualisations

trend analytics

cross-node correlation insights

predictive health scoring

Phase 3 MUST be fully functional and stable before Phase 4 begins.

