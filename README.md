# Maturion Foreman App

The Maturion Foreman App is a Next.js application that serves as the runtime orchestration engine for the Foreman system. It receives GitHub webhooks, orchestrates builder agents, applies governance rules, and executes build waves.

## Overview

The Foreman App is designed to:

- **Receive GitHub Webhooks**: Process events from GitHub repositories (issues, pull requests, pushes, etc.)
- **Orchestrate Builder Agents**: Coordinate AI-powered agents to handle code changes and automation
- **Apply Governance Rules**: Interpret and enforce repository governance policies
- **Execute Build Waves**: Run coordinated build and deployment workflows

## Architecture

### Key Components

- **API Routes** (`/app/api/`)
  - `github/webhook/route.ts` - Webhook endpoint for GitHub events
  - `foreman/run/route.ts` - Manual task execution endpoint
  - `admin/approve/route.ts` - Admin approval for builder tasks
  - `builder/*` - Builder agent endpoints (UI, API, Schema, Integration, QA)

- **Foreman Logic** (`/lib/foreman/`)
  - `orchestrator.ts` - Core orchestration engine
  - `dispatch.ts` - Builder task dispatch and governance
  - `behaviours.ts` - Behaviour compilation
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

- **Components** (`/components/`)
  - `ForemanStatus.tsx` - Dashboard status display
  - `LayoutShell.tsx` - Main application layout

- **Type Definitions** (`/types/`)
  - `github.ts` - GitHub API types
  - `foreman.ts` - Foreman system and action types
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

# GitHub Token (required for loading behavior files)
GITHUB_TOKEN=your_personal_access_token

# Foreman Behavior Configuration (required for full functionality)
FOREMAN_BEHAVIOUR_REPO_OWNER=your_org_or_username
FOREMAN_BEHAVIOUR_REPO_NAME=your_behavior_repo
FOREMAN_BEHAVIOUR_DIR=path/to/behavior/files

# Organization ID (optional)
MATURION_ORG_ID=your_org_id

# Autonomous Builds (optional, default: false)
# When set to 'true', builder tasks are auto-approved and executed
# When 'false', all tasks require manual approval via /api/admin/approve
MATURION_ALLOW_AUTONOMOUS_BUILDS=false
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

## License

Proprietary - Maturion ISMS

## Support

For questions or issues, please contact the Maturion team.
