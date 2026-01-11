# Foreman App Architecture

## Document Purpose

This document defines the complete architecture of the **Maturion Foreman App** - the Next.js runtime application that executes Foreman orchestration, governance, and QA validation.

**Status**: Architecture documentation for Build Philosophy compliance verification

**Last Updated**: 2025-12-10

---

## System Overview

### What is the Foreman App?

The Foreman App is a Next.js 14 application that serves as the runtime execution environment for the Foreman orchestration system. It receives GitHub webhooks, interprets governance rules, orchestrates builder agents, enforces QA standards, and provides a chat interface for human interaction.

### Core Responsibilities

1. **Webhook Processing**: Receive and process GitHub events (issues, PRs, pushes)
2. **Governance Interpretation**: Load and enforce governance rules from constitutional documents
3. **Builder Orchestration**: Coordinate UI, API, Schema, Integration, and QA builders
4. **QA Enforcement**: Ensure 100% QA passing before any code handover (GSR - Governance Supremacy Rule)
5. **Quality Integrity**: Implement QIC (Quality Integrity Contract) and QIEL (Quality Integrity Enforcement Layer)
6. **Chat Interface**: Provide conversational interface for architecture, builds, and QA discussions
7. **Autonomous Operation**: Execute builds autonomously within strict QA boundaries (A1 autonomy class)

---

## 1. Application Architecture

### Technology Stack

- **Framework**: Next.js 14.2.x (App Router)
- **Runtime**: Node.js 18+
- **Language**: TypeScript 5.x
- **UI**: React 18.3.x
- **Styling**: Tailwind CSS 3.4.x
- **Testing**: Node.js native test runner (`tsx --test`)
- **Package Manager**: npm

### Directory Structure

```
maturion-foreman-app/
├── app/                      # Next.js app directory (App Router)
│   ├── page.tsx             # Dashboard (root page)
│   ├── layout.tsx           # Root layout
│   ├── foreman/page.tsx    # Foreman Chat UI
│   └── api/                 # API routes
│       ├── admin/           # Admin endpoints
│       ├── analytics/       # Analytics endpoints
│       ├── builder/         # Builder agent endpoints
│       ├── foreman/         # Foreman core endpoints
│       └── github/webhook/  # GitHub webhook handler
├── components/              # React components
├── lib/                     # Core libraries
│   ├── foreman/            # Foreman orchestration logic
│   ├── builder/            # Builder agent logic
│   ├── github.ts           # GitHub API client
│   └── openai.ts           # OpenAI integration
├── types/                   # TypeScript type definitions
├── tests/                   # Test suites
├── foreman/                 # Foreman constitutional documents
│   ├── identity/           # Foreman identity and authority
│   ├── behaviours/         # Operational behaviors
│   ├── builder-specs/      # Builder specifications
│   ├── governance/         # Governance rules
│   └── qa/                 # QA enforcement rules
├── docs/                    # Documentation
└── scripts/                 # Utility scripts
```

---

## 2. UI Architecture

### Pages and Routes

#### Root Dashboard (`/`)
- **Purpose**: Main dashboard showing Foreman status and system health
- **Components**: ForemanStatus, LayoutShell
- **Data**: Initialization status, configuration, health checks
- **State**: Server-side rendered (SSR)
- **Accessibility**: Semantic HTML, ARIA labels

#### Foreman Chat UI (`/foreman`)
- **Purpose**: Conversational interface for Foreman interaction
- **Components**: Chat interface, message bubbles, action proposals, build timeline
- **Data**: Chat messages, proposed actions, build status, telemetry
- **State**: Client-side with API integration
- **Features**:
  - Markdown rendering with code highlighting
  - Streaming status updates
  - Action proposals with metadata
  - Build timeline visualization
  - Mobile responsive with collapsible sidebar
- **Theme**: "Foreman Office" - Dark industrial UI with electric blue (#0074ff) and construction yellow (#ffd500)
- **Accessibility**: Keyboard navigation, screen reader support, ARIA labels

### Component Architecture

#### ForemanStatus Component
- **Props**: None (fetches from `/api/foreman/status`)
- **State**: Status data, loading, error
- **Displays**:
  - Autonomous mode status
  - QA gate requirements
  - Safeguards active
  - Git SHA and version
  - Initialization checks (6 components)
- **Error Handling**: Displays error message if fetch fails
- **Loading State**: Shows loading indicator

#### LayoutShell Component
- **Props**: children (React nodes)
- **Purpose**: Provides consistent layout wrapper
- **Features**: Navigation, header, footer (if applicable)

### Styling Approach

- **Framework**: Tailwind CSS
- **Theme**: Custom Foreman Office theme with extended colors
- **Responsive**: Mobile-first design
- **Typography**: Inter font family (Next.js optimized)
- **Components**: Utility-first with component classes

---

## 3. API Architecture

### API Routes

#### POST /api/github/webhook
**Purpose**: Receive GitHub webhook events

**Authentication**: HMAC signature verification with `GITHUB_WEBHOOK_SECRET`

**Request Headers**:
- `x-github-event`: Event type (issues, pull_request, push, etc.)
- `x-hub-signature-256`: HMAC-SHA256 signature
- `content-type`: application/json

**Request Body**: GitHub webhook payload (varies by event)

**Response**: `{ received: true }` (200 OK)

**Processing**:
1. Verify signature
2. Parse event type
3. Route to appropriate handler
4. Trigger Foreman tasks if applicable

**Error Handling**:
- 401: Invalid signature
- 400: Missing headers or malformed payload
- 500: Internal processing error

---

#### POST /api/foreman/chat
**Purpose**: Chat with Foreman about architecture, builds, QA

**Authentication**: Organization ID required

**Request**:
```json
{
  "message": "string (required)",
  "organisationId": "string (required)",
  "conversationId": "string (optional)",
  "contextFlags": "string[] (optional)"
}
```

**Response**:
```json
{
  "success": true,
  "conversationId": "string",
  "response": {
    "replyText": "string",
    "proposedActions": "ForemanAction[]",
    "telemetry": "object",
    "metadata": "object"
  },
  "timestamp": "ISO8601 string"
}
```

**Processing**:
1. Load behavior files and chat profile
2. Call GPT-4 with chat context
3. Parse response for actions
4. Check autonomy mode
5. Return response with actions

**Error Handling**:
- 400: Missing required fields
- 500: GPT-4 API error or behavior loading error

---

#### GET /api/foreman/status
**Purpose**: Get Foreman operational status and configuration

**Authentication**: None (public status endpoint)

**Response**:
```json
{
  "autonomousMode": boolean,
  "qaGateRequired": boolean,
  "qaOfQaGateRequired": boolean,
  "complianceGateRequired": boolean,
  "testGateRequired": boolean,
  "safeguards": string[],
  "gitSha": string,
  "currentWave": string,
  "version": string,
  "environment": string,
  "uptime": number,
  "timestamp": string,
  "initialization": {
    "initialized": boolean,
    "readyForOperation": boolean,
    "checks": InitCheck[],
    "summary": {
      "total": number,
      "ready": number,
      "warnings": number,
      "errors": number,
      "notConfigured": number
    }
  }
}
```

**Initialization Checks**:
1. GitHub App Configuration
2. OpenAI API Configuration
3. GitHub Token Configuration
4. Behavior Files
5. Autonomous Mode
6. Organization ID

**Error Handling**: Returns partial status if some checks fail

---

#### POST /api/foreman/run-build
**Purpose**: Execute complete build sequence (Architecture → Builder → QA → PR)

**Authentication**: Organization ID required

**Request**:
```json
{
  "organisationId": "string (required)",
  "triggerSource": "string",
  "autonomousBuildEnabled": boolean,
  "createPR": boolean,
  "owner": "string",
  "repo": "string",
  "branch": "string",
  "baseBranch": "string"
}
```

**Response**:
```json
{
  "success": true,
  "sequenceId": "string",
  "status": "string",
  "prUrl": "string (if PR created)",
  "message": "string"
}
```

**Build Sequence Workflow**:
1. Architecture Analysis
2. Task Generation
3. Builder Dispatch
4. Approval (if not autonomous)
5. Execution
6. QA Cycle
7. PR Assembly
8. Completion

**Error Handling**:
- 400: Invalid request parameters
- 500: Build sequence execution error

---

#### POST /api/foreman/run
**Purpose**: Manually trigger specific Foreman tasks

**Request**:
```json
{
  "taskName": "string (required)",
  "params": "object"
}
```

**Available Tasks**:
- `interpret-governance`
- `run-build-wave`
- `run-self-test`
- `apply-file-changes`

**Response**:
```json
{
  "ok": true,
  "result": "any"
}
```

---

#### Builder Endpoints

**POST /api/builder/ui** - UI Builder
**POST /api/builder/api** - API Builder
**POST /api/builder/schema** - Schema Builder
**POST /api/builder/integration** - Integration Builder
**POST /api/builder/qa** - QA Builder

**Common Request Format**:
```json
{
  "module": "string",
  "taskDescription": "string",
  "organisationId": "string",
  "context": "object"
}
```

**Common Response**:
```json
{
  "success": true,
  "taskId": "string",
  "status": "pending_approval",
  "message": "string"
}
```

**Governance**: All builder tasks require admin approval before execution (unless autonomous mode enabled)

---

#### POST /api/admin/approve
**Purpose**: Approve or reject builder tasks

**Request**:
```json
{
  "taskId": "string (required)",
  "action": "approve | reject",
  "adminId": "string",
  "executeImmediately": boolean
}
```

**Response**:
```json
{
  "success": true,
  "taskId": "string",
  "status": "string",
  "message": "string"
}
```

---

## 4. Data Architecture

### Data Models

#### ForemanStatus
```typescript
interface ForemanStatus {
  autonomousMode: boolean
  qaGateRequired: boolean
  qaOfQaGateRequired: boolean
  complianceGateRequired: boolean
  testGateRequired: boolean
  safeguards: string[]
  gitSha: string
  currentWave: string
  version: string
  environment: string
  uptime: number
  timestamp: string
  initialization: InitializationStatus
}
```

#### InitializationStatus
```typescript
interface InitializationStatus {
  initialized: boolean
  readyForOperation: boolean
  checks: InitCheck[]
  timestamp: string
  summary: {
    total: number
    ready: number
    warnings: number
    errors: number
    notConfigured: number
  }
  initializationSummary: string
}
```

#### ChatMessage
```typescript
interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  metadata?: {
    proposedActions?: ForemanAction[]
    telemetry?: Telemetry
    tags?: string[]
  }
}
```

#### ForemanAction
```typescript
interface ForemanAction {
  type: string
  builder?: string
  module?: string
  description: string
  risks?: string[]
  qaRequirements?: string[]
  estimatedComplexity?: 'low' | 'medium' | 'high'
  autonomyIntent?: 'propose' | 'execute'
}
```

### Data Storage

**Storage Backend**: JSON file-based storage (for development/testing)

**Future**: Database integration (PostgreSQL or similar)

**Memory Storage**: Governance memory, QI incidents, build history

---

## 5. State Management Architecture

### Server State
- **Next.js API Routes**: Server-side data fetching
- **SSR**: Server-side rendering for dashboard
- **API Integration**: REST API calls from client

### Client State
- **React useState**: Component-level state
- **React useEffect**: Side effects and data fetching
- **No global state library**: Simple state management sufficient for current needs

### State Synchronization
- **Polling**: Client polls `/api/foreman/status` for updates (if needed)
- **Future**: WebSocket/SSE for real-time updates

---

## 6. Integration Architecture

### GitHub Integration

**Purpose**: GitHub App for webhook handling and API operations

**Authentication**: GitHub App with private key

**Permissions**:
- Repository: Contents (Read & Write)
- Repository: Issues (Read & Write)
- Repository: Pull Requests (Read & Write)

**Webhook Events**:
- issues
- pull_request
- push

**API Client**: Octokit (@octokit/rest)

---

### OpenAI Integration

**Purpose**: GPT-4 for chat, orchestration, reasoning

**Authentication**: API key

**Models Used**:
- gpt-4 (default)
- gpt-4-turbo (for complex tasks)
- gpt-o1-preview (for advanced reasoning)

**API Client**: OpenAI SDK (openai npm package)

---

## 7. Security Architecture

### Authentication

#### GitHub Webhook
- HMAC-SHA256 signature verification
- Secret stored in `GITHUB_WEBHOOK_SECRET`
- Signature validation before processing

#### GitHub API
- GitHub App private key authentication
- Installation token management
- Automatic token refresh

#### OpenAI API
- API key authentication
- Key stored in `OPENAI_API_KEY`
- Never exposed in client-side code

### Authorization

#### Admin Approval
- Admin ID required for builder task approval
- Future: Role-based access control (RBAC)

#### Organization ID
- All actions must include `organisationId`
- Scopes actions to specific organizations

### Data Protection

#### Secrets Management
- Environment variables only
- Never hardcoded in code
- Secret detection in QA layer
- Secrets redacted in logs

#### Input Sanitization
- Webhook signature validation
- Input validation on all API endpoints
- Type checking with TypeScript

---

## 8. Error Handling Architecture

### Error Types

1. **Validation Errors** (400)
   - Missing required fields
   - Invalid parameter values
   - Type mismatches

2. **Authentication Errors** (401)
   - Invalid webhook signature
   - Missing credentials

3. **Not Found Errors** (404)
   - Invalid route
   - Resource not found

4. **Server Errors** (500)
   - GitHub API failures
   - OpenAI API failures
   - Build process errors
   - Behavior file loading errors

### Error Handling Strategy

#### Client-Side
- Display user-friendly error messages
- Log detailed errors to console
- Retry on transient failures

#### Server-Side
- Structured error responses
- Error logging to Vercel logs
- Graceful degradation
- Detailed error messages in development

### Error Recovery

#### Webhook Processing
- Log errors but don't fail request
- Return 200 OK to prevent GitHub retries
- Process errors logged for investigation

#### Build Sequences
- Rollback on QA failures
- Detailed failure reports
- Allow manual retry

---

## 9. Performance Architecture

### Performance Requirements

- **API Response Time**: < 2 seconds for status endpoints
- **Webhook Processing**: < 5 seconds for event handling
- **Chat Response**: < 10 seconds for GPT-4 responses
- **Build Sequences**: Depends on complexity (minutes to hours)

### Optimization Strategies

#### Caching
- Next.js page caching
- API route caching where appropriate
- Static asset caching via Vercel CDN

#### Code Splitting
- Next.js automatic code splitting
- Dynamic imports for large components

#### Lazy Loading
- Images with Next.js Image component
- Heavy dependencies loaded on demand

### Performance Monitoring

- Vercel Analytics (built-in)
- Console logs for development
- Future: Dedicated monitoring service

---

## 10. Testing Architecture

### Test Strategy

**Philosophy**: QA-First, Build Philosophy compliant

**Test Categories**:
1. **Unit Tests**: Component and function-level tests
2. **Integration Tests**: API endpoint and data flow tests
3. **E2E Tests**: User journey tests (future)
4. **QA Structural Tests**: Build Philosophy compliance tests

### Test Coverage

**Current Test Suites**:
- Dashboard tests (87 tests)
- QA structural tests
- QIC tests (architecture integrity, guardrails, etc.)
- QIEL tests (env diff, constitution integrity, wiring integrity)
- Governance tests
- Drift detection tests
- Builder memory tests
- Many more (30+ test directories)

### Test Infrastructure

**Test Framework**: Node.js native test runner
**Test Execution**: `tsx --test`
**Test Location**: `/tests/**/*.test.ts`

### Test Execution

```bash
npm test                    # Dashboard tests
npm run test:all           # All tests
npm run test:structural    # QA structural tests
npm run test:qic           # QIC tests
npm run test:governance    # Governance tests
```

### CI/CD Integration

**Current**: Manual test execution
**Future**: GitHub Actions workflow for automated testing

---

## 11. Deployment Architecture

### Build Configuration

**Build Command**: `npm run build`
**Build Output**: `.next/` directory
**Environment**: Production

**Environment Variables Required**:
- `GITHUB_APP_ID`
- `GITHUB_APP_PRIVATE_KEY`
- `GITHUB_APP_INSTALLATION_ID`
- `GITHUB_WEBHOOK_SECRET`
- `OPENAI_API_KEY`
- `MATURION_ORG_ID`
- `MATURION_AUTONOMOUS_MODE`

### Deployment Strategy

**Platform**: Vercel
**Deployment Method**: Git integration (auto-deploy on push)
**Environments**:
- **Development**: Local (`npm run dev`)
- **Production**: Vercel deployment

### Rollout Strategy

- **All-at-once**: Deploy to all users simultaneously
- **Rollback**: Vercel instant rollback to previous deployment

### Post-Deployment

**Health Checks**: `/api/foreman/status` endpoint
**Smoke Tests**: Manual verification of key features
**Monitoring**: Vercel logs and analytics

---

## 12. Documentation Architecture

### Code Documentation

- **TypeScript**: Type definitions serve as inline documentation
- **Comments**: JSDoc comments for complex logic
- **README**: Comprehensive setup and usage guide

### User Documentation

- **README.md**: Main entry point
- **docs/**: Additional documentation
  - Architecture documents
  - QA specifications
  - Governance rules

### Developer Documentation

- **Setup Guide**: In README
- **API Documentation**: In README (API endpoints section)
- **Behavior Files**: In `foreman/` directory
- **Build Philosophy**: In `BUILD_PHILOSOPHY.md`

---

## Architecture Validation Against Checklist

This architecture addresses the following categories from `/foreman/architecture-design-checklist.md`:

✅ **UI Architecture**: Pages, components, styling, accessibility defined
✅ **API Architecture**: All endpoints documented with request/response schemas
✅ **Data Architecture**: Models, storage, validation defined
✅ **State Management**: Client and server state approach documented
✅ **Integration Architecture**: GitHub and OpenAI integrations specified
✅ **Security Architecture**: Auth, authorization, secrets, input sanitization
✅ **Error Handling**: Error types, handling, recovery documented
✅ **Performance Architecture**: Requirements, optimization, monitoring defined
✅ **Testing Architecture**: Test strategy, coverage, infrastructure documented
✅ **Deployment Architecture**: Build, deployment, rollout, post-deployment specified
✅ **Documentation Architecture**: Code, user, developer docs described

---

## Conclusion

This architecture document provides a comprehensive specification of the Foreman App. It serves as the foundation for:

1. **QA Creation**: Comprehensive test suite to validate all architectural components
2. **Build Validation**: Ensuring all components are implemented as specified
3. **Build Philosophy Compliance**: Following Architecture → Red QA → Build to Green

**Next Steps**:
1. Create comprehensive Red QA suite based on this architecture
2. Run QA to verify current implementation (expect some failures)
3. Build to Green to fix any gaps
4. Achieve 100% QA passing for full Build Philosophy compliance

---

**Version**: 1.0
**Status**: Initial architecture documentation
**Authority**: Build Philosophy
**Last Updated**: 2025-12-10
