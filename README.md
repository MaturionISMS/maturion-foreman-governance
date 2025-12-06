# Maturion Foreman App

The Maturion Foreman App is a Next.js application that serves as the runtime orchestration engine for the Foreman system. It receives GitHub webhooks, orchestrates builder agents, applies governance rules, and executes build waves.

## Overview

The Foreman App is designed to:

- **Receive GitHub Webhooks**: Process events from GitHub repositories (issues, pull requests, pushes, etc.)
- **Orchestrate Builder Agents**: Coordinate AI-powered agents to handle code changes and automation
- **Apply Governance Rules**: Interpret and enforce repository governance policies
- **Execute Build Waves**: Run coordinated build and deployment workflows
- **Foreman Chat Interface**: Direct conversational interface with Foreman for architecture, QA, and build planning

## Autonomy Model

The Maturion Foreman operates under an **autonomy-first governance model** where systematic QA validation replaces traditional human code review. This approach enables machine-speed development while maintaining superior quality standards.

### Core Philosophy

**"I do not review code; architecture + QA are the judges. Foreman must move fast and be fully autonomous, as long as QA passes."** — Johan's Philosophy

This philosophy is operationalized through:

1. **QA-Governed Autonomy**: Foreman operates autonomously by default, subject to absolute QA, compliance, and test gates
2. **Architecture is Supreme**: System architecture defines correctness, not human opinion
3. **No Human Code Review**: Quality assurance validation replaces manual code review
4. **Human Focus on Strategy**: Johan and technical leads focus on architecture and governance rules, not code details

### Autonomy Class: A1

Foreman operates at **Autonomy Class A1** — QA-Gated Autonomous Orchestration:

- **Full operational autonomy** for build sequences within authorized repositories
- **Zero human bottlenecks** in standard development workflows
- **Systematic validation** (QA, QA-of-QA, Compliance) replaces subjective review
- **Hard gates** prevent quality or security issues regardless of autonomy level

### Default Operational State

**Foreman is autonomous by default** (`MATURION_AUTONOMOUS_MODE=true`). This means:

- ✅ Builder tasks are auto-approved
- ✅ Build sequences execute end-to-end without pausing
- ✅ PRs are created automatically when builds complete successfully
- ✅ QA gates remain absolute and cannot be bypassed

Human approval is **optional, not required**. Admins can override autonomy if needed for specific environments.

### The Three Pillars of Quality

Instead of human code review, Maturion uses a three-pillar system:

1. **Architecture Review** (Johan/Technical Leads)
   - Define system design and architectural patterns
   - Set governance rules and True North principles
   - Make strategic technology choices

2. **QA Review** (Automated)
   - Validate implementation meets quality standards
   - Check type safety, code quality, test coverage, security
   - Perform QA-of-QA meta-review for QA validity

3. **Compliance Review** (Automated)
   - Ensure no secrets in code
   - Verify governance rule compliance
   - Maintain audit trails

**Result**: Faster development + higher consistency + better quality than manual review.

### Builder Selection

Foreman has discretion to choose the optimal builder for each task:

- **GitHub Copilot Builder**: Small, incremental changes; low-risk tasks
- **Local Builder Agent**: Large refactors; multi-file operations; deep architectural changes

Selection logic optimizes for speed, cost, and reliability while maintaining QA standards.

### When Foreman Escalates to Humans

Foreman escalates to Johan when:

- QA or compliance fails 3+ times on the same module
- Repeated builder failures (5+ in 24 hours)
- Critical system errors (auth failures, degraded mode)
- Johan explicitly pauses builds via chat

Otherwise, Foreman operates independently under QA governance.

### For More Details

See the `foreman/` directory for complete behavior specifications:
- `identity/foreman-identity.md` - Foreman's authority and responsibilities
- `autonomy-rules.md` - Autonomous operation principles and escalation rules
- `qa/qa-philosophy.md` - Why QA is the final authority, not human review
- `governance/governance-model.md` - Autonomy class A1 and governance rules
- `behaviours/behaviour-overview.md` - Operational behaviors and chat commands

## Autonomous Mode

The Foreman App supports two operational modes: **Autonomous Mode** and **Manual Approval Mode**. This allows organizations to balance velocity with oversight based on their risk tolerance and governance requirements.

### What is Autonomous Mode?

Autonomous Mode enables Foreman to execute complete build cycles without human intervention. When enabled:

- ✅ Builder tasks are **auto-approved** by the system
- ✅ Build sequences run **end-to-end** without manual clicks
- ✅ **QA gates** are still enforced (QA + QA-of-QA)
- ✅ **Compliance checks** remain mandatory
- ✅ All actions are **logged** for audit trails
- ✅ PR creation happens automatically (if configured)

**Critical:** Autonomous mode does NOT bypass quality gates. QA validation, QA-of-QA meta-reviews, and compliance checks are always enforced.

### Configuration

Autonomous mode is **enabled by default** for the Maturion organization:

```env
MATURION_AUTONOMOUS_MODE=true  # Default recommended - QA controls risk
```

To disable autonomy and require manual approval:

```env
MATURION_AUTONOMOUS_MODE=false
```

Configure safeguards (always enforced, even in autonomous mode):

```env
MATURION_AUTONOMOUS_GUARDS=qa,compliance,tests
```

Available safeguards:
- `qa` - QA validation required (always enforced)
- `compliance` - Compliance checks required (secrets detection, etc.)
- `tests` - Test artifacts required for code changes

### Governance in Autonomous Mode

Autonomous mode maintains strict governance:

1. **QA Gate**: All code-writing tasks must pass QA validation
2. **QA-of-QA Gate**: Meta-review ensures QA itself is functioning correctly
3. **Compliance Gate**: No secrets in code, audit logging, organization ID required
4. **Test Gate**: Code changes must include test artifacts (when enabled)

**If any gate fails**, the action is aborted and logged as a failure.

### Manual Approval Mode (Override)

When autonomous mode is disabled (for initial rollout or highly regulated environments):

```env
MATURION_AUTONOMOUS_MODE=false
```

Behavior:
- Builder tasks pause at `pending_approval` state
- Admin must explicitly approve via `/api/admin/approve`
- Each task is reviewed individually before execution
- Build sequences wait for approval at task creation

**Note**: This is an override mode. The intended operational state is autonomous mode with QA governance.

### When to Use Each Mode

**Use Autonomous Mode (Default) when:**
- You have established QA frameworks with high confidence (✅ Maturion)
- Your organization trusts its governance rules (✅ Maturion)
- You want maximum development velocity (✅ Maturion)
- You practice continuous delivery
- QA and compliance gates are comprehensive

**Use Manual Approval Mode when:**
- You're in the initial system rollout/learning phase
- Your environment is highly regulated
- You're making changes to critical infrastructure
- You have new or unproven governance rules
- You want human oversight for every code change

### Checking Foreman Status

Query the status endpoint to see current configuration:

```bash
curl http://localhost:3000/api/foreman/status
```

Response:
```json
{
  "autonomousMode": true,
  "qaGateRequired": true,
  "qaOfQaGateRequired": true,
  "complianceGateRequired": true,
  "testGateRequired": true,
  "safeguards": ["qa", "compliance", "tests"],
  "gitSha": "abc123",
  "currentWave": "main",
  "version": "0.1.0",
  "environment": "production",
  "uptime": 12345,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "initialization": {
    "initialized": true,
    "readyForOperation": true,
    "checks": [
      {
        "name": "GitHub App Configuration",
        "status": "ready",
        "message": "GitHub App credentials configured",
        "required": true
      },
      {
        "name": "OpenAI API Configuration",
        "status": "ready",
        "message": "OpenAI API key configured",
        "required": false
      },
      {
        "name": "GitHub Token Configuration",
        "status": "ready",
        "message": "Using local behavior files (token not required)",
        "required": false
      },
      {
        "name": "Behavior Files",
        "status": "ready",
        "message": "13 behavior files found in local directory",
        "required": true
      },
      {
        "name": "Autonomous Mode",
        "status": "ready",
        "message": "Autonomous mode ENABLED with safeguards: qa, compliance, tests",
        "required": false
      },
      {
        "name": "Organization ID",
        "status": "ready",
        "message": "Organization ID configured: org_matu...",
        "required": false
      }
    ],
    "timestamp": "2024-01-01T00:00:00.000Z",
    "summary": {
      "total": 6,
      "ready": 6,
      "warnings": 0,
      "errors": 0,
      "notConfigured": 0
    }
  },
  "initializationSummary": "✅ Foreman is fully initialized and ready for operation (6/6 checks passed)"
}
```

#### Initialization Status

The status endpoint includes detailed initialization checks to verify Foreman's readiness:

**Status Values:**
- `ready` ✅ - Component is properly configured and operational
- `warning` ⚠️ - Component is configured but may have issues (non-critical)
- `error` ❌ - Critical component is not working (blocks operation)
- `not_configured` 🔧 - Required component is not configured

**Initialization Checks:**

1. **GitHub App Configuration** (required)
   - Validates: `GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY`, `GITHUB_APP_INSTALLATION_ID`, `GITHUB_WEBHOOK_SECRET`
   - Required for webhook handling and GitHub API operations

2. **OpenAI API Configuration** (optional)
   - Validates: `OPENAI_API_KEY`
   - Required for AI-powered features (chat, orchestration)

3. **GitHub Token Configuration** (conditional)
   - Validates: `GITHUB_TOKEN` when using external behavior repository
   - Not required when using local behavior files

4. **Behavior Files** (required)
   - Validates presence of behavior files in `foreman/` directory
   - Checks for critical files: `autonomy-rules.md`, `identity/foreman-identity.md`, `behaviours/orchestration.md`

5. **Autonomous Mode** (optional)
   - Reports current configuration of `MATURION_AUTONOMOUS_MODE` and safeguards
   - Shows enabled/disabled state and active safeguards

6. **Organization ID** (optional)
   - Validates: `MATURION_ORG_ID`
   - Some features may require organization context

**Overall Status:**
- `initialized: true` - All required checks pass (may have warnings)
- `readyForOperation: true` - All required checks are in `ready` state (fully operational)
- `initializationSummary` - Human-readable status summary

### Audit Logging

All autonomous actions are logged with:
- **Timestamp**: When the action occurred
- **Organisation ID**: Which organization triggered the action
- **Builder**: Which builder executed the task
- **Task ID**: Unique identifier for the task
- **Wave**: Git branch/wave (if available)
- **Result**: `success` or `fail`
- **Reason**: Error message (if failed)

Logs are available in:
- Console output (development)
- Vercel runtime logs (production)
- Future: Dedicated audit database

### ⚠️ Important Warnings

1. **For Maturion**: Autonomous mode is the default and recommended setting. QA governance provides comprehensive safety.

2. **For Other Organizations**: Consider starting in manual mode (`MATURION_AUTONOMOUS_MODE=false`) to observe system behavior before enabling full autonomy.

3. **QA is Mandatory**: Autonomous mode does NOT bypass QA. Never disable QA validation. QA is your safety net.

4. **Governance is Absolute**: Foreman cannot override governance rules, even in autonomous mode. Architecture and compliance are supreme.

5. **No Code Review ≠ No Review**: Autonomous mode replaces human code review with systematic QA validation. This is by design—QA is more consistent than human review.

6. **Monitor Initially**: When first enabling autonomous mode, monitor the audit logs closely to ensure the system behaves as expected.

7. **Git SHA Tracking**: All autonomous actions are associated with a git SHA for traceability. Ensure your deployment includes git metadata.

### Philosophy: QA-Governed Autonomy

The Maturion system embraces a philosophy of **QA-governed autonomy**:

- **Architecture is Supreme**: The system architecture defines correctness, not human opinion
- **QA is the Gatekeeper**: Quality checks are deterministic and consistent
- **No Human Bottlenecks**: Humans are slow, inconsistent, and prone to fatigue
- **Systematic Validation**: Automated checks provide superior validation to ad-hoc review
- **Trust but Verify**: Enable autonomy, but maintain comprehensive audit trails

This approach allows teams to move at machine speed while maintaining higher quality standards than traditional manual review processes.

## Johan's Foreman Office UI

**Wave 5.1** transforms the Foreman Chat UI into a polished, themed "Foreman Office" environment - the main cockpit where Johan runs ISMS builds.

### UI Screenshots

**Desktop View - Empty State:**

![Foreman Office Desktop](https://github.com/user-attachments/assets/562fb248-8bd7-47f8-99b0-2458264694eb)

**Desktop View - With Message:**

![Foreman Office With Message](https://github.com/user-attachments/assets/b024a694-a6f2-49fd-827f-e98a299dcdf8)

**Mobile View:**

![Foreman Office Mobile](https://github.com/user-attachments/assets/1fc551ee-4326-4e57-afad-1038a93249f1)

### UI Features

Johan's Foreman Office includes:

- **Two-Panel Layout**: Chat on the left, build telemetry and actions on the right
- **Themed Design**: Dark industrial UI with electric blue accents and construction yellow highlights
- **Sidebar Navigation**: Quick access to Chat, Build History, Tasks, Logs, Settings, and Pilot Wave Report
- **Rich Chat Bubbles**: Markdown support, code formatting, metadata tags, and proposed actions display
- **Build Timeline**: Animated progress tracking with real-time status updates
- **Status Events**: Visual indicators for planning, builder selection, execution, QA, and PR creation
- **Header with Status**: Foreman avatar, online/idle/executing indicator, and quick pilot build button
- **Document Upload Placeholder**: UI foundation for future document upload feature
- **Quick Actions Panel**: Fast access to build history, task queue, and report generation
- **Mobile Responsive**: Fully functional on mobile devices with collapsible sidebar

### Theme Colors

The Foreman Office theme uses:

```typescript
foremanOffice: {
  primary: '#0074ff',      // Electric blue for primary actions
  accent: '#ffd500',       // Construction yellow for highlights
  background: '#111418',   // Deep slate background
  panel: '#1c1f24',        // Slightly lighter panels
  border: '#2a2d33',       // Subtle borders
  text: '#e3e3e3',         // Light text for readability
}
```

### Foreman Chat UI

The Foreman Chat UI provides a direct conversational interface for interacting with the Foreman orchestration engine. This is the primary interface where admins can communicate with Foreman about architecture, builds, QA, and compliance without going through GitHub issues or webhooks.

### Live Build Execution via Chat

**Wave 4** introduces the Chat Live Build Execution Layer, turning the Foreman Chat UI into the command bridge of the Maturion ISMS platform. Foreman can now execute real builds directly from chat using autonomous reasoning, architecture analysis, and QA-governed decision-making.

#### How It Works

1. **User sends command** via chat (e.g., "Foreman, run Wave 3")
2. **Foreman interprets** the message using GPT-4 and behavior rules
3. **Actions are proposed** with structured ForemanAction[] types
4. **Autonomy check**: If autonomy=ON and actions are executable → execute; else → propose only
5. **Execution pipeline**:
   - Convert actions to build tasks
   - Select builder (Copilot or Local Builder)
   - Run build cycle with QA and compliance gates
   - Generate PRs
   - Stream updates back to chat UI
6. **Results displayed** in chat with status bubbles and result cards

#### Supported Commands

**Build Wave Execution**:
```
Foreman, run Wave 3
Execute Wave 4
Continue the build
```

**Feature Creation**:
```
Implement the warranty PDF builder
Create a user dashboard component
Build the authentication system
```

**Architecture Analysis**:
```
Generate architecture for Runtime Maturion
Analyze the authentication module architecture
Show me architecture gaps in the dashboard
```

**Bug Fixes**:
```
Fix the schema mismatch
Resolve the type error in users module
```

**QA and Testing**:
```
Run QA on the authentication module
Run self-test
Test the new API endpoints
```

**Direct Builder Tasks**:
```
Ask the UI builder to create a dashboard
Schema builder, define user types
QA builder, validate the authentication flow
```

See [foreman/behaviours/chat-commands.md](foreman/behaviours/chat-commands.md) for complete command patterns.

#### Streaming Status Updates

The chat UI displays real-time status updates during build execution:

- 📋 **Planning build...** - Analyzing requirements and planning
- 🔍 **Selecting builder...** - Choosing optimal builder
- ⚙️ **Local Builder is active** - Builder executing
- ✅ **Running QA phase...** - Quality validation in progress
- 📤 **Opening PR...** - Creating pull request
- 🎉 **Build complete** - Execution finished

#### Result Cards

When builds complete, the chat displays rich result cards showing:
- **Files changed**: Number of files modified
- **Builder used**: Which builder executed the task
- **PR link**: Direct link to created pull request
- **QA summary**: Quality validation results
- **Compliance summary**: Compliance check results

#### Autonomy Modes

**Autonomous Mode (ON)**:
- Actions with `autonomyIntent = "execute"` run automatically
- QA, compliance, and test gates still enforced
- PRs created automatically on success
- No human approval required for safe operations

**Manual Mode (OFF)**:
- All actions show "Waiting for admin approval"
- Tasks created in `pending_approval` state
- Admin must approve via `/api/admin/approve`
- Full human oversight for every action

Configure via environment variable:
```env
MATURION_AUTONOMOUS_MODE=true  # Enable autonomous execution
```

#### Error Handling

If execution fails:
- ❌ Error status bubble displayed
- Clear error message shown
- Logs written to console and Vercel
- Execution stops at failure point
- User can retry or modify command

#### Telemetry & Logging

All chat executions are logged with:
- **Chat command**: Original user message
- **Parsed actions**: ForemanAction[] generated
- **Builder selection**: Which builder chosen and why
- **Execution phases**: Each step of the pipeline
- **QA results**: Quality validation outcomes
- **PR outcomes**: Success or failure with URLs
- **Errors**: Any failures with stack traces
- **Degraded mode events**: System health issues

Logs available in:
- Console output (development)
- Vercel runtime logs (production)
- Future: Centralized logging service

See [lib/logging/foremanLogger.ts](lib/logging/foremanLogger.ts) for logging API.

#### Example Conversation

**User**: "Foreman, run Wave 3"

**Foreman**:
```
I'll execute Wave 3 build sequence now.

📋 Planning build...
🔍 Selecting builders...
⚙️ Local Builder is active
✅ Running QA phase...
📤 Opening PR...
🎉 Build complete

✅ Execution Complete

PR created: https://github.com/MaturionISMS/repo/pull/42
Sequence ID: seq_1234567890_abc
Tasks executed: 3
```

**Result Card**:
- **Files changed**: 12
- **Builder used**: Local Builder
- **PR link**: https://github.com/MaturionISMS/repo/pull/42
- **QA summary**: All checks passed
- **Compliance summary**: No secrets detected

#### Safety & Governance

Live build execution maintains strict governance:

1. **QA Gates**: All code changes validated
2. **Compliance Gates**: Secrets detection, audit logging
3. **Test Gates**: Code changes include tests
4. **Autonomy Rules**: Only safe operations auto-execute
5. **Approval Gates**: Risky operations require review
6. **Audit Trail**: All actions logged immutably

**No human code review ≠ no quality control**. QA validation is more consistent and comprehensive than manual review.

#### Architecture

The live build execution pipeline consists of:

1. **Chat Route** (`app/api/foreman/chat/route.ts`):
   - Receives user messages
   - Calls GPT-4 with chat profile and behavior rules
   - Parses JSON responses to extract actions
   - Checks autonomy mode and intent
   - Delegates to chat executor

2. **Chat Executor** (`lib/foreman/chat-executor.ts`):
   - Receives ForemanAction[]
   - Converts actions to build tasks
   - Routes via dispatch layer
   - Monitors task status
   - Produces streaming status updates

3. **Dispatch Layer** (`lib/foreman/dispatch.ts`):
   - Routes tasks to builders
   - Enforces governance rules
   - Handles autonomy/approval modes
   - Executes approved tasks

4. **Build Sequence Engine** (`lib/foreman/build-sequence.ts`):
   - Orchestrates full build sequences
   - Architecture → Builder → QA → PR pipeline
   - Supports chat-triggered builds

5. **Chat UI** (`app/foreman/page.tsx`):
   - Displays streaming status bubbles
   - Shows result cards
   - Renders proposed actions
   - Handles execution state

#### Future Enhancements

Planned improvements:
- Real-time streaming (WebSocket/SSE)
- Multi-step conversation memory
- Interactive approval buttons
- Build progress visualization
- Rollback commands
- Builder preference selection
- Custom command aliases

### How to Use the Foreman Office UI

1. **Navigate to the Interface**: Access at `/foreman` (e.g., `http://localhost:3000/foreman`)

2. **Sidebar Navigation**: Use the left sidebar to switch between:
   - **Chat**: Main conversation interface
   - **Build History**: View past builds (coming soon)
   - **Tasks**: Check task queue (coming soon)
   - **Logs**: View execution logs (coming soon)
   - **Settings**: Configure preferences (coming soon)
   - **Pilot Wave Report**: Access build reports

3. **Start a Conversation**: Type your question or command in the input box at the bottom of the chat panel

4. **Monitor Build Progress**: Watch the right panel for:
   - **Build Timeline**: Real-time progress through planning, builder selection, execution, QA, and PR creation
   - **Status Events**: Animated indicators showing current activity
   - **Build Telemetry**: Files changed, builder used, and PR links when builds complete

5. **Quick Actions**: Use the buttons in the right panel for common tasks

6. **Mobile**: On mobile devices, tap the floating menu button (☰) to show/hide the sidebar

### Overview

Access the chat interface at `/foreman` in your deployed application (e.g., `http://localhost:3000/foreman` in development).

### Key Features

- **Conversational Interface**: Chat naturally with Foreman about your development workflow
- **Architecture Consultation**: Ask about architecture gaps, improvements, and design decisions
- **Build Planning**: Get help planning multi-builder sequences and deployment strategies
- **QA Guidance**: Discuss testing strategies, compliance requirements, and quality gates
- **Proposed Actions**: Foreman responds with actionable builder tasks, not just discussion
- **Metadata Tags**: Messages are tagged with wave, module, action type, and builder information
- **Action Proposals**: See proposed builder tasks with risks, QA requirements, and complexity estimates
- **Logging**: All interactions are logged with secret redaction for audit trails
- **Rich Chat Bubbles**: Markdown rendering, code blocks, and syntax highlighting
- **Streaming Animations**: Visual feedback during build execution
- **Build Timeline Visualization**: Track progress through each phase of the build

### What You Can Ask Foreman

The chat interface supports questions about:

- **Architecture Analysis**: "What architecture gaps do we have in the dashboard module?"
- **Build Waves**: "Plan a build wave for implementing user authentication"
- **Self-Tests**: "Run a self-test and show me the results"
- **Integration Tests**: "What integration tests should we run before deploying?"
- **Governance**: "Explain the QA enforcement rules"
- **Builder Coordination**: "How do builders work together in a sequence?"
- **Risk Assessment**: "What are the risks of this proposed change?"

### Chat Response Format

Foreman responds in a structured format with:

1. **Reply Text**: Conversational response to your question
2. **Proposed Actions**: List of actionable builder tasks (if applicable)
3. **Telemetry**: Subsystems involved and behavior rules referenced
4. **Metadata**: Tags for wave, module, action type, builder, complexity

Example response structure:

```json
{
  "replyText": "I can help you build a dashboard component...",
  "proposedActions": [
    {
      "type": "TRIGGER_BUILDER_TASK",
      "builder": "ui",
      "module": "dashboard",
      "description": "Create dashboard component with charts",
      "risks": ["May require schema updates"],
      "qaRequirements": ["Component tests", "Integration tests"],
      "estimatedComplexity": "medium"
    }
  ],
  "telemetry": {
    "subSystemsInvolved": ["orchestrator", "behaviour-loader"],
    "behaviourRulesReferenced": ["qa-enforcement"]
  }
}
```

### Chat API Endpoint

The chat interface is powered by `/api/foreman/chat`:

**POST /api/foreman/chat**

Request:
```json
{
  "message": "What are the QA requirements for a new API endpoint?",
  "organisationId": "org_123",
  "conversationId": "conv_abc123",
  "contextFlags": ["qa", "api"]
}
```

Response:
```json
{
  "success": true,
  "conversationId": "conv_abc123",
  "response": {
    "replyText": "For new API endpoints...",
    "proposedActions": [...],
    "telemetry": {...},
    "metadata": {...}
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Foreman's Chat Identity

When chatting, Foreman operates under specific principles:

1. **Orchestrator, Not Builder**: Foreman coordinates builders but never writes code directly
2. **QA-First**: All proposals include QA validation requirements
3. **Governance-Bound**: Responses reference and respect governance rules
4. **Action-Oriented**: Provides concrete action plans, not just advice
5. **Risk-Aware**: Highlights risks, dependencies, and trade-offs
6. **No Code Review**: Johan doesn't review code; Architecture + QA are the judges

### Security & Logging

All chat interactions are logged with:

- **Timestamp**: When the interaction occurred
- **Organisation ID**: Which organization is using the chat
- **Conversation ID**: Session grouping for multi-turn conversations
- **User Message**: The question or command (with secrets redacted)
- **Foreman Response**: The reply (with secrets redacted)
- **Proposed Actions**: Any builder tasks suggested
- **Metadata**: Tags and context information

**Secret Redaction**: The chat API automatically redacts potential secrets from logs:
- API keys and tokens
- Passwords and credentials
- JWT tokens
- Private keys

### Configuration

The chat interface uses the same configuration as other Foreman endpoints:

```env
# Required for chat functionality
OPENAI_API_KEY=your_openai_key
MATURION_ORG_ID=your_org_id

# Foreman Governance Repository (REQUIRED)
# Foreman governance lives at: maturion-ai-foreman/foreman/
# The Foreman App is only the supervisor, not the governance source
# These defaults point to the governance repository:
FOREMAN_BEHAVIOUR_REPO_OWNER=MaturionISMS
FOREMAN_BEHAVIOUR_REPO_NAME=maturion-ai-foreman
FOREMAN_BEHAVIOUR_DIR=foreman
```

### Limitations

- **No Automatic Execution**: Chat proposes actions but doesn't execute builders automatically (use manual approval or autonomous mode for execution)
- **No Chat History**: Currently stateless; conversation history is not persisted between sessions (future enhancement)
- **Single-Turn Context**: Each message is independent; Foreman doesn't remember previous turns in the conversation yet

### Future Enhancements

Planned improvements for the chat interface:

- **Conversation History**: Persist and retrieve chat history from database
- **Multi-Turn Context**: Maintain conversation context across multiple messages
- **Streaming Responses**: Real-time streaming for longer responses
- **Rich Media**: Support for charts, diagrams, and visualizations
- **Direct Execution**: Execute approved actions directly from chat interface
- **Conversation Templates**: Pre-built conversation flows for common tasks



## Architecture

### Key Components

- **API Routes** (`/app/api/`)
  - `github/webhook/route.ts` - Webhook endpoint for GitHub events
  - `foreman/run/route.ts` - Manual task execution endpoint
  - `foreman/chat/route.ts` - Chat interface endpoint
  - `admin/approve/route.ts` - Admin approval for builder tasks
  - `builder/*` - Builder agent endpoints (UI, API, Schema, Integration, QA)

- **Foreman Logic** (`/lib/foreman/`)
  - `orchestrator.ts` - Core orchestration engine
  - `dispatch.ts` - Builder task dispatch and governance
  - `behaviours.ts` - Behaviour compilation
  - `chat-profile.ts` - Chat-specific system prompt and context
  - `executor.ts` - Task executor
  - `interpret-governance.ts` - Loads and interprets governance rules
  - `run-build-wave.ts` - Orchestrates build wave execution
  - `run-self-test.ts` - System diagnostics and health checks
  - `apply-file-changes.ts` - File operations via GitHub API

- **Builder Logic** (`/lib/builder/`)
  - `capabilities.ts` - Builder capability manifest and registry

- **Integrations** (`/lib/`)
  - `github.ts` - GitHub App authentication and API client
  - `openai.ts` - OpenAI/GPT-4 integration for AI features

- **Pages** (`/app/`)
  - `page.tsx` - Main dashboard page
  - `foreman/page.tsx` - Foreman chat interface

- **Components** (`/components/`)
  - `ForemanStatus.tsx` - Dashboard status display
  - `LayoutShell.tsx` - Main application layout

- **Type Definitions** (`/types/`)
  - `github.ts` - GitHub API types
  - `foreman.ts` - Foreman system and action types (includes chat types)
  - `builder.ts` - Builder agent types
  - `build.ts` - Build wave types

## How Webhooks Work

1. **GitHub sends a webhook** when an event occurs (e.g., issue created, PR opened)
2. **Webhook endpoint** (`/api/github/webhook`) receives the event
3. **Signature verification** ensures the request is from GitHub
4. **Event processing** determines what actions to take
5. **Foreman tasks** are triggered based on governance rules
6. **Response** is sent back to GitHub

### Webhook Configuration

To set up webhooks in your GitHub repository:

1. Go to repository Settings → Webhooks
2. Add webhook URL: `https://your-app.vercel.app/api/github/webhook`
3. Set content type to `application/json`
4. Add your webhook secret (matches `GITHUB_WEBHOOK_SECRET`)
5. Select events to trigger (issues, pull requests, pushes, etc.)

## Running Locally

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- GitHub App credentials (see below)
- OpenAI API key (optional for AI features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MaturionISMS/maturion-foreman-app.git
cd maturion-foreman-app
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` from the example:
```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:
```env
# GitHub App Credentials (required for full functionality)
GITHUB_APP_ID=your_app_id
GITHUB_APP_PRIVATE_KEY=your_private_key
GITHUB_APP_INSTALLATION_ID=your_installation_id
GITHUB_WEBHOOK_SECRET=your_webhook_secret

# OpenAI API Key (required for AI-powered orchestration)
OPENAI_API_KEY=your_openai_key

# GitHub Token (required for loading behavior files from external repo)
GITHUB_TOKEN=your_personal_access_token

# Foreman Governance Repository (REQUIRED for production)
# Foreman governance lives at: maturion-ai-foreman/foreman/
# The Foreman App is only the supervisor, not the governance source
# Default values (can be overridden for testing):
FOREMAN_BEHAVIOUR_REPO_OWNER=MaturionISMS
FOREMAN_BEHAVIOUR_REPO_NAME=maturion-ai-foreman
FOREMAN_BEHAVIOUR_DIR=foreman
# Note: Local foreman/ directory is used as fallback for development/testing only

# Organization ID (optional)
MATURION_ORG_ID=your_org_id

# Autonomous Mode Configuration
# When set to 'true', Foreman runs without manual approval (default for Maturion)
# When 'false', all tasks require manual approval via /api/admin/approve
# For Maturion organization, true is recommended - QA controls risk
MATURION_AUTONOMOUS_MODE=true

# Autonomous Mode Safeguards (comma-separated: qa,compliance,tests)
# These gates are ALWAYS enforced, even in autonomous mode
MATURION_AUTONOMOUS_GUARDS=qa,compliance,tests

# Legacy variable name (deprecated, use MATURION_AUTONOMOUS_GUARDS instead)
# MATURION_AUTONOMOUS_SAFE_GUARDS=qa,compliance,tests

# Legacy (deprecated, use MATURION_AUTONOMOUS_MODE instead)
MATURION_ALLOW_AUTONOMOUS_BUILDS=true
```

**Note:** For basic webhook endpoint testing, you can start with an empty `.env.local` file. The application will return clear error messages about missing configuration when needed.

5. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Testing Locally

#### Comprehensive Webhook Testing

The repository includes a comprehensive test suite for the webhook endpoint. To run it:

1. Start the development server:
```bash
npm run dev
```

2. In a separate terminal, run the test suite:
```bash
npx tsx scripts/test-webhook.ts
```

This will test:
- GET endpoint (health check)
- Issue events
- Issue comment events (including @foreman mentions)
- Pull request events
- Event filtering (e.g., push events are ignored)

The test suite will show which tests pass or fail, along with detailed error messages.

#### Test Individual Webhook Events

Use the provided script to send test webhooks:

```bash
npx tsx scripts/local-test-webhook.ts issues
```

Or test different event types:
```bash
npx tsx scripts/local-test-webhook.ts pull_request
npx tsx scripts/local-test-webhook.ts push
```

#### Test Foreman Tasks

Run individual Foreman tasks:

```bash
# Run self-test
npx tsx scripts/run-foreman-task.ts run-self-test

# Test governance interpretation
npx tsx scripts/run-foreman-task.ts interpret-governance '{"owner":"test","repo":"test-repo"}'

# Test build wave
npx tsx scripts/run-foreman-task.ts run-build-wave '{}'
```

**Note:** Most Foreman tasks require proper environment variables to be set. See `.env.example` for the complete list of required configuration.

## GitHub App Setup

To create a GitHub App for this application:

1. Go to GitHub Settings → Developer settings → GitHub Apps
2. Click "New GitHub App"
3. Configure:
   - **Name**: Maturion Foreman (or your preferred name)
   - **Homepage URL**: Your app URL
   - **Webhook URL**: `https://your-app.vercel.app/api/github/webhook`
   - **Webhook Secret**: Generate a secure random string
   - **Permissions**: 
     - Repository permissions: Contents (Read & Write), Issues (Read & Write), Pull requests (Read & Write)
     - Subscribe to events: Issues, Pull requests, Push
4. Generate a private key (download and save securely)
5. Install the app on your repositories
6. Note the App ID and Installation ID

Add these credentials to your `.env.local` file.

## Deploying to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MaturionISMS/maturion-foreman-app)

### Manual Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Add all variables from `.env.example`
   - Redeploy for changes to take effect

### Environment Variables in Vercel

Add these in the Vercel dashboard under Settings → Environment Variables:

- `GITHUB_APP_ID`
- `GITHUB_APP_PRIVATE_KEY`
- `GITHUB_APP_INSTALLATION_ID`
- `GITHUB_WEBHOOK_SECRET`
- `OPENAI_API_KEY`

## API Endpoints

### POST /api/github/webhook

Receives GitHub webhook events.

**Response:**
```json
{
  "received": true
}
```

### POST /api/foreman/run

Manually trigger Foreman tasks.

**Request:**
```json
{
  "taskName": "run-self-test",
  "params": {}
}
```

**Response:**
```json
{
  "ok": true,
  "result": { ... }
}
```

**Available Tasks:**
- `interpret-governance` - Load and interpret governance rules
- `run-build-wave` - Execute a build wave
- `run-self-test` - Run system diagnostics
- `apply-file-changes` - Apply file changes via GitHub API

### POST /api/foreman/chat

Chat with Foreman about architecture, builds, QA, and compliance.

**Request:**
```json
{
  "message": "What are the QA requirements for a new API endpoint?",
  "organisationId": "org_123",
  "conversationId": "conv_abc123",
  "contextFlags": ["qa", "api"]
}
```

**Response:**
```json
{
  "success": true,
  "conversationId": "conv_abc123",
  "response": {
    "replyText": "For new API endpoints, you need...",
    "proposedActions": [
      {
        "type": "TRIGGER_BUILDER_TASK",
        "builder": "qa",
        "description": "Create API endpoint tests"
      }
    ],
    "telemetry": {
      "subSystemsInvolved": ["chat", "orchestrator"],
      "behaviourRulesReferenced": ["qa-enforcement"]
    },
    "metadata": {
      "tags": ["qa", "api"]
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Use Cases:**
- Ask about architecture gaps and improvements
- Plan build waves and deployment strategies
- Get help with QA and compliance requirements
- Propose and discuss builder tasks
- Run diagnostics and self-tests via chat

### GET /api/foreman/status

Get Foreman operational status, configuration, and initialization details.

**Response:**
```json
{
  "autonomousMode": true,
  "qaGateRequired": true,
  "qaOfQaGateRequired": true,
  "complianceGateRequired": true,
  "testGateRequired": true,
  "safeguards": ["qa", "compliance", "tests"],
  "gitSha": "abc123",
  "currentWave": "main",
  "version": "0.1.0",
  "environment": "production",
  "uptime": 12345,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "initialization": {
    "initialized": true,
    "readyForOperation": true,
    "checks": [...],
    "timestamp": "2024-01-01T00:00:00.000Z",
    "summary": {
      "total": 6,
      "ready": 6,
      "warnings": 0,
      "errors": 0,
      "notConfigured": 0
    }
  },
  "initializationSummary": "✅ Foreman is fully initialized and ready for operation (6/6 checks passed)"
}
```

**Use Cases:**
- Check if autonomous mode is enabled
- Verify which safeguards are active
- Monitor system health and uptime
- Track current git SHA and wave/branch
- Validate configuration before triggering builds
- **Verify initialization status and system readiness**
- **Diagnose configuration issues and missing environment variables**
- **Check which components are properly configured**

### POST /api/foreman/run-build

Execute a complete build sequence: Architecture → Builder → QA → PR Pipeline.

**Request:**
```json
{
  "organisationId": "org_123",
  "triggerSource": "issue_command",
  "triggerContext": {},
  "autonomousBuildEnabled": false,
  "skipArchitectureAnalysis": false,
  "createPR": true,
  "owner": "MaturionISMS",
  "repo": "example-repo",
  "branch": "feature/build-sequence",
  "baseBranch": "main"
}
```

**Response:**
```json
{
  "success": true,
  "sequenceId": "seq_1234567890_abc123",
  "status": "completed",
  "prUrl": "https://github.com/owner/repo/pull/42",
  "message": "Build sequence completed successfully."
}
```

**Query Parameters (GET):**
- `sequenceId` - Get specific build sequence details
- `organisationId` - Filter sequences by organisation
- `status` - Filter sequences by status

**Build Sequence Workflow:**
1. **Architecture Analysis** - Detect gaps and implementation needs
2. **Task Generation** - Create builder tasks from architecture analysis
3. **Builder Dispatch** - Send tasks to appropriate builders
4. **Approval** - Tasks await approval (unless autonomous builds enabled)
5. **Execution** - Execute approved builder tasks
6. **QA Cycle** - Validate builder outputs with QA and QA-of-QA
7. **PR Assembly** - Create pull request with results
8. **Completion** - Mark sequence as completed

**Autonomous Builds:**

When `MATURION_ALLOW_AUTONOMOUS_BUILDS=true`, the build sequence:
- Auto-approves all builder tasks
- Executes tasks without manual intervention
- Completes end-to-end without human approval

When `false` (default):
- Tasks pause at `pending_approval` state
- Admin must approve via `/api/admin/approve`
- Provides human oversight for all code generation

### Pilot Build Waves

Pilot builds are controlled, small-scale build waves designed to validate the Foreman system and establish patterns for larger builds.

**Trigger via GitHub Issue:**
```
@foreman execute Pilot Build Wave 1
```

**Trigger via API:**
```json
{
  "organisationId": "maturion_isms",
  "pilotWave": true,
  "waveNumber": 1,
  "feature": "foreman-status-dashboard",
  "autonomousBuildEnabled": true,
  "createPR": true,
  "generateReport": true,
  "owner": "MaturionISMS",
  "repo": "maturion-foreman-app",
  "branch": "foreman/pilot-wave-1",
  "baseBranch": "main"
}
```

**Pilot Build Constraints:**
- Single module or component scope
- No breaking changes allowed
- Full QA coverage required
- Must generate build report
- Deterministic and re-runnable

**Build Reports:**
Reports are automatically generated in `reports/` directory:
- `FOREMAN_PILOT_BUILD_REPORT.md` for pilot builds
- `FOREMAN_BUILD_REPORT_{sequence_id}.md` for regular builds

Reports include:
- Tasks executed with status
- Builders used and artifacts
- QA validation results
- Compliance verification
- Execution timeline
- Pass/fail status

See [docs/pilot-build-wave-1.md](docs/pilot-build-wave-1.md) for detailed pilot build documentation.

## Pilot Build Wave (Wave 5)

The Pilot Build Wave is a controlled, small-scale build that validates the complete Foreman pipeline from chat to PR creation.

### What It Does

The Pilot Build Wave executes a simple, safe build in the sandbox directory to prove that:

1. **Chat Command Recognition**: Foreman recognizes pilot build commands from chat
2. **Builder Routing**: Tasks are routed to the correct builder (Copilot or Local Builder)
3. **File Modifications**: Real file changes are made in the repository
4. **QA Execution**: Quality validation runs and must pass
5. **Status Streaming**: Build status updates appear in the Chat UI
6. **Logging**: Complete audit trail is captured

### How to Trigger

From the Foreman Chat UI (`/foreman`), use any of these commands:

- "Foreman, run the pilot build"
- "Run pilot build"
- "Execute pilot wave"
- "Run pilot build wave"

Or click the **🚀 Run Pilot Build** button in the chat UI header.

### What Gets Built

The pilot build:

- Targets the **foreman_app_sandbox** repository (this repo's sandbox directory)
- Modifies `sandbox/PILOT_BUILD_NOTES.md` with build metadata
- Runs QA checks to validate the sandbox state
- Updates the file with timestamp, builder used, and QA results

### QA Validation

The pilot build runs these QA checks:

1. **File Exists**: Verifies `sandbox/PILOT_BUILD_NOTES.md` exists
2. **Required Sections**: Checks for proper markdown structure
3. **Foreman Timestamp**: Confirms the file was updated by Foreman

QA must pass before the build is considered successful.

### What You'll See

In the Chat UI, you'll see real-time status updates:

- 📋 **Pilot build started...** - Initial planning
- 🔍 **Dispatching to builder...** - Builder selection
- ⚙️ **copilot builder is active** - Builder execution
- ✅ **Running QA...** - Quality validation
- 🎉 **Pilot build complete ✅** - Success

### Logs

All pilot build events are logged with:

- `pilot_build_started` - Build initiation
- `pilot_build_builder_selected` - Builder choice (local vs copilot)
- `pilot_build_qa_result` - QA pass/fail
- `pilot_build_completed` / `pilot_build_failed` - Final status

Check console logs or Vercel runtime logs for complete audit trail.

### Repository Registry

The pilot build uses the **Repository Registry** (`lib/config/repoRegistry.ts`) which defines:

```typescript
{
  id: "foreman_app_sandbox",
  name: "Foreman App Sandbox",
  description: "Safe sandbox area for pilot builds",
  gitUrl: "https://github.com/MaturionISMS/maturion-foreman-app.git",
  defaultBranch: "main",
  localPathEnvVar: "LOCAL_FOREMAN_APP_PATH"
}
```

This registry enables Foreman to route tasks to the correct repository and builder.

### Local Builder Configuration

If using the Local Builder for pilot builds, set the environment variable:

```env
LOCAL_FOREMAN_APP_PATH=/Users/johan/.../maturion-foreman-app
```

See `.env.example` for all local path configurations.

### Safety & Isolation

The pilot build is designed to be:

- **Safe**: Only touches the `sandbox/` directory
- **Reversible**: Changes are minimal and can be reverted
- **Isolated**: No impact on production code or other modules
- **QA-Gated**: Cannot complete without passing quality checks

### Next Steps

Once the pilot build validates the pipeline, Foreman can execute:

- Full ISMS module builds
- Multi-repository builds
- Complex build sequences with multiple builders
- Production deployments with PR creation

The pilot build proves the foundation works before scaling to larger builds.

## Builder Agents

The Foreman App orchestrates five specialized Builder Agents that handle different aspects of code generation and quality assurance. All builder tasks require explicit admin approval before execution.

### Available Builders

#### 1. UI Builder (`/api/builder/ui`)
Generates and modifies user interface components and pages.

**POST Request:**
```json
{
  "module": "dashboard",
  "taskDescription": "Create a new dashboard component with charts",
  "organisationId": "org_123",
  "context": {
    "features": ["charts", "filters", "export"]
  }
}
```

**Supported Task Types:**
- `create_component` - Generate new UI components
- `update_component` - Modify existing components
- `create_page` - Create new pages
- `update_page` - Update existing pages
- `create_layout` - Generate layout components
- `update_styles` - Modify styles and themes

#### 2. API Builder (`/api/builder/api`)
Creates and maintains API endpoints and backend services.

**POST Request:**
```json
{
  "module": "users",
  "taskDescription": "Create REST API endpoints for user management",
  "organisationId": "org_123",
  "context": {
    "endpoints": ["GET /api/users", "POST /api/users", "GET /api/users/:id"]
  }
}
```

**Supported Task Types:**
- `create_endpoint` - Generate new API endpoints
- `update_endpoint` - Modify existing endpoints
- `create_service` - Create backend services
- `update_service` - Update service logic
- `create_middleware` - Generate middleware
- `update_middleware` - Modify middleware

#### 3. Schema Builder (`/api/builder/schema`)
Manages database schemas, type definitions, and data models.

**POST Request:**
```json
{
  "module": "users",
  "taskDescription": "Create TypeScript types for user entity",
  "organisationId": "org_123",
  "context": {
    "fields": ["id", "name", "email", "role", "createdAt"]
  }
}
```

**Supported Task Types:**
- `create_type` - Generate TypeScript types
- `update_type` - Modify type definitions
- `create_schema` - Create database schemas
- `update_schema` - Update schema definitions
- `create_migration` - Generate migrations
- `validate_schema` - Validate schema integrity

#### 4. Integration Builder (`/api/builder/integration`)
Builds integrations with external services and APIs.

**POST Request:**
```json
{
  "module": "stripe",
  "taskDescription": "Create Stripe payment integration",
  "organisationId": "org_123",
  "context": {
    "service": "stripe",
    "features": ["payments", "subscriptions", "webhooks"]
  }
}
```

**Supported Task Types:**
- `create_integration` - Build new integrations
- `update_integration` - Modify integrations
- `create_client` - Generate API clients
- `update_client` - Update client code
- `create_webhook` - Create webhook handlers
- `update_webhook` - Modify webhook logic

#### 5. QA Builder (`/api/builder/qa`)
Creates tests and validates builder outputs.

**POST Request:**
```json
{
  "module": "users",
  "taskDescription": "Create unit tests for user service",
  "organisationId": "org_123",
  "context": {
    "testTypes": ["unit", "integration"],
    "coverage": 80
  }
}
```

**Supported Task Types:**
- `create_test` - Generate test files
- `update_test` - Modify existing tests
- `run_tests` - Execute test suites
- `validate_output` - Validate builder artifacts
- `qa_review` - Perform quality review
- `qa_of_qa_review` - Meta-review of QA results

### Admin Approval System

All builder tasks require explicit admin approval before execution.

#### POST /api/admin/approve

Approve or reject builder tasks.

**Request:**
```json
{
  "taskId": "task_123456",
  "action": "approve",
  "adminId": "admin_user_id",
  "executeImmediately": true
}
```

**Response:**
```json
{
  "success": true,
  "taskId": "task_123456",
  "status": "completed",
  "message": "Task approved and executed by admin_user_id"
}
```

#### GET /api/admin/approve

List pending approval tasks.

**Query Parameters:**
- `taskId` - Get specific task details
- `status` - Filter by task status
- `pending=true` - Show only pending approval tasks

**Response:**
```json
{
  "success": true,
  "count": 3,
  "tasks": [
    {
      "id": "task_123",
      "builder": "ui",
      "module": "dashboard",
      "taskDescription": "Create dashboard component",
      "status": "pending_approval",
      "approved": false,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Governance Requirements

The Foreman App enforces strict governance rules:

1. **No Code Without Approval** - Foreman NEVER writes code directly; only builders write code after admin approval
2. **Organisation ID Required** - All actions must include `organisationId`
3. **Admin Approval Mandatory** - No builder executes without explicit admin approval
4. **QA Enforcement** - All builder outputs must pass QA validation
5. **Action Logging** - All actions logged in Vercel runtime logs
6. **Permission Validation** - GitHub App permissions validated before execution

### Builder Workflow

1. **Propose Task**: Foreman proposes a builder task based on governance rules
2. **Create Task**: Builder endpoint receives request and creates task in `pending_approval` state
3. **Admin Review**: Admin reviews task via `/api/admin/approve?pending=true`
4. **Approve/Reject**: Admin approves or rejects task via `POST /api/admin/approve`
5. **Execute**: If approved, task executes and generates artifacts
6. **QA Review**: QA Builder validates output
7. **QA-of-QA**: Meta-review ensures quality standards met
8. **Complete**: Task marked as completed with results

## Development

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Type Check

```bash
npx tsc --noEmit
```

### Testing

The repository includes comprehensive test scripts for all major components:

#### Automated Dashboard API Tests

Run the complete dashboard API test suite:

```bash
npm test
```

This runs 87 automated tests covering:
- Dashboard aggregation logic
- Milestone progress calculations  
- Blocker escalation and severity
- Phase timeline tracking
- S-curve generation
- Deployment readiness evaluation
- Memory snapshot integration (stub)
- Status calculation and transitions

See [tests/dashboard/README.md](tests/dashboard/README.md) for detailed test documentation.

#### Test Build Sequence Orchestration
```bash
npx tsx scripts/test-build-sequence.ts
```

#### Test PR Builder Utility
```bash
npx tsx scripts/test-pr-builder.ts
```

#### Test Autonomous Builds
```bash
npx tsx scripts/test-autonomous-builds.ts
```

#### Test API Endpoint (requires dev server running)
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run API tests
npx tsx scripts/test-run-build-api.ts
```

#### Run Complete Workflow Example
```bash
npx tsx scripts/example-complete-workflow.ts
```

This demonstrates all build sequence scenarios including manual approval, autonomous builds, and PR assembly.

## Usage Examples

### Example 1: Trigger a Manual Build Sequence

```bash
curl -X POST http://localhost:3000/api/foreman/run-build \
  -H "Content-Type: application/json" \
  -d '{
    "organisationId": "org_123",
    "triggerSource": "issue_command",
    "triggerContext": {
      "issue": "Implement user dashboard",
      "issueNumber": 42
    }
  }'
```

Response:
```json
{
  "success": true,
  "sequenceId": "seq_1234567890_abc123",
  "status": "awaiting_approval",
  "message": "Build sequence created. Tasks await manual approval."
}
```

### Example 2: Autonomous Build with PR Creation

```bash
curl -X POST http://localhost:3000/api/foreman/run-build \
  -H "Content-Type: application/json" \
  -d '{
    "organisationId": "org_123",
    "triggerSource": "scheduled",
    "autonomousBuildEnabled": true,
    "createPR": true,
    "owner": "MaturionISMS",
    "repo": "example-repo",
    "branch": "feature/automated-build",
    "baseBranch": "main"
  }'
```

Response:
```json
{
  "success": true,
  "sequenceId": "seq_1234567890_xyz789",
  "status": "completed",
  "prUrl": "https://github.com/MaturionISMS/example-repo/pull/123",
  "message": "Build sequence completed successfully."
}
```

### Example 3: Check Build Sequence Status

```bash
curl http://localhost:3000/api/foreman/run-build?sequenceId=seq_1234567890_abc123
```

### Example 4: List All Build Sequences

```bash
curl http://localhost:3000/api/foreman/run-build?organisationId=org_123
```

## Project Structure

```
maturion-foreman-app/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Dashboard page
│   ├── layout.tsx           # Root layout
│   └── api/                 # API routes
│       ├── admin/           # Admin endpoints
│       │   └── approve/     # Builder task approval
│       ├── builder/         # Builder agent endpoints
│       │   ├── ui/          # UI Builder endpoint
│       │   ├── api/         # API Builder endpoint
│       │   ├── schema/      # Schema Builder endpoint
│       │   ├── integration/ # Integration Builder endpoint
│       │   └── qa/          # QA Builder endpoint
│       ├── github/webhook/  # GitHub webhook handler
│       └── foreman/run/     # Foreman task executor
├── foreman/                 # Foreman behavior files
│   ├── autonomy-rules.md   # Autonomous operation philosophy
│   ├── behaviours/         # Orchestration behaviors
│   │   └── orchestration.md
│   ├── identity/           # Foreman identity and authority
│   │   └── foreman-identity.md
│   ├── builder-specs/      # Builder capability specifications
│   │   └── builder-capabilities.md
│   ├── governance/         # Governance and compliance rules
│   │   ├── approval-rules.md
│   │   ├── secrets-management.md
│   │   └── error-recovery.md
│   └── qa/                 # QA enforcement rules
│       └── qa-enforcement.md
├── lib/                     # Core libraries
│   ├── github.ts           # GitHub API client
│   ├── openai.ts           # OpenAI integration
│   ├── builder/            # Builder agent logic
│   │   └── capabilities.ts # Builder capability manifest
│   └── foreman/            # Foreman orchestration logic
│       ├── behaviours.ts   # Behaviour compilation
│       ├── dispatch.ts     # Builder task dispatch
│       ├── executor.ts     # Task executor
│       ├── orchestrator.ts # Core orchestrator
│       ├── interpret-governance.ts
│       ├── run-build-wave.ts
│       ├── run-self-test.ts
│       └── apply-file-changes.ts
├── components/              # React components
│   ├── ForemanStatus.tsx   # Status display
│   └── LayoutShell.tsx     # Layout wrapper
├── types/                   # TypeScript type definitions
│   ├── github.ts           # GitHub types
│   ├── foreman.ts          # Foreman types
│   ├── builder.ts          # Builder types
│   └── build.ts            # Build types
├── scripts/                 # Utility scripts
│   ├── local-test-webhook.ts
│   └── run-foreman-task.ts
└── .env.example            # Environment variables template
```

## Foreman Behavior Files

### Governance Repository Architecture

**IMPORTANT**: Foreman governance files are stored in the `maturion-ai-foreman` repository, NOT in the Foreman App repository.

**Correct architecture:**
- **Governance Repository**: `maturion-ai-foreman/foreman/`
- **Foreman App**: Supervisor that loads governance from external repository
- **Local `foreman/` directory**: Development/testing fallback only

**Required governance files** (from `maturion-ai-foreman/foreman/`):
- `identity.md` - Foreman's identity and role definition
- `roles-and-duties.md` - Operational responsibilities and authority
- `privacy-guardrails.md` - Privacy and security constraints
- `memory-model.md` - Context and state management
- `command-grammar.md` - Command interpretation rules
- `runtime-maturion-profile.md` - Runtime configuration and profiles
- `runtime-memory-ingestion.md` - Memory loading and processing

The Foreman App automatically loads these files from the governance repository using the GitHub API. Configuration is set via environment variables with sensible defaults pointing to `MaturionISMS/maturion-ai-foreman/foreman`.

### Behavior Files Overview

The behavior files loaded from the governance repository define how Foreman operates:

### Autonomy Rules (`autonomy-rules.md`)

Defines Foreman's autonomous operation philosophy:
- QA-governed autonomy principles
- Hard governance constraints
- QA enforcement guarantee
- Secret cycling rules
- Error recovery protocols
- No human code review paradigm

### Identity (`identity/foreman-identity.md`)

Defines Foreman's operational authority and responsibilities:
- Operational authority and constraints
- Responsibility hierarchy
- Permission model
- Context persistence
- Communication protocols

### Orchestration (`behaviours/orchestration.md`)

Defines how Foreman coordinates builders:
- Builder communication rules
- Task dispatch and routing
- PR assembly rules
- Error recovery in orchestration
- Autonomous vs. manual approval workflows

### Builder Specifications (`builder-specs/builder-capabilities.md`)

Documents all builder capabilities:
- UI, API, Schema, Integration, and QA builders
- Supported task types for each builder
- Input/output formats
- Permissions and scopes

### Governance Rules (`governance/`)

#### Approval Rules (`approval-rules.md`)
- Autonomous vs. manual approval modes
- Approval workflow and authority
- Governance checkpoints
- Approval best practices

#### Secrets Management (`secrets-management.md`)
- Zero-trust secrets model
- Environment-based secrets
- Secret detection patterns
- Rotation schedules

#### Error Recovery (`error-recovery.md`)
- Error categories and handling strategies
- Retry logic and circuit breakers
- Escalation rules
- Rollback strategies

### QA Enforcement (`qa/qa-enforcement.md`)

Defines quality assurance as the ultimate code reviewer:
- QA-first philosophy
- QA validation pipeline
- Quality checks catalog
- Compliance enforcement


## License

Proprietary - Maturion ISMS

## Support

For questions or issues, please contact the Maturion team.
