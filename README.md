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
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

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

## Foreman Chat UI

The Foreman Chat UI provides a direct conversational interface for interacting with the Foreman orchestration engine. This is the primary interface where admins can communicate with Foreman about architecture, builds, QA, and compliance without going through GitHub issues or webhooks.

### Overview

Access the chat interface at `/foreman` in your deployed application (e.g., `http://localhost:3000/foreman` in development).

![Foreman Chat Interface](https://github.com/user-attachments/assets/3d2fcc74-4bb7-4aed-b526-7396e7837100)

### Key Features

- **Conversational Interface**: Chat naturally with Foreman about your development workflow
- **Architecture Consultation**: Ask about architecture gaps, improvements, and design decisions
- **Build Planning**: Get help planning multi-builder sequences and deployment strategies
- **QA Guidance**: Discuss testing strategies, compliance requirements, and quality gates
- **Proposed Actions**: Foreman responds with actionable builder tasks, not just discussion
- **Metadata Tags**: Messages are tagged with wave, module, action type, and builder information
- **Action Proposals**: See proposed builder tasks with risks, QA requirements, and complexity estimates
- **Logging**: All interactions are logged with secret redaction for audit trails

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

# Optional: Load behavior files from external repo
FOREMAN_BEHAVIOUR_REPO_OWNER=your_org
FOREMAN_BEHAVIOUR_REPO_NAME=behavior_repo
FOREMAN_BEHAVIOUR_DIR=foreman/
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

# Foreman Behavior Configuration
# Option 1: Load from external GitHub repository
FOREMAN_BEHAVIOUR_REPO_OWNER=your_org_or_username
FOREMAN_BEHAVIOUR_REPO_NAME=your_behavior_repo
FOREMAN_BEHAVIOUR_DIR=path/to/behavior/files
# Option 2: Use local behavior files (included in this repo at foreman/)
# Leave the above three variables blank to use local files

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

Get Foreman operational status and configuration.

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
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Use Cases:**
- Check if autonomous mode is enabled
- Verify which safeguards are active
- Monitor system health and uptime
- Track current git SHA and wave/branch
- Validate configuration before triggering builds

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

The `foreman/` directory contains behavior files that define how Foreman operates:

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
