# Foreman App Vercel Deployment Architecture

## Purpose

This document defines the complete architecture for the Maturion Foreman App as deployed on Vercel. It serves as the architectural specification that must be validated through comprehensive QA before deployment.

## System Overview

The Foreman App is a Next.js 14+ application that serves as the runtime orchestration engine for the Maturion ecosystem. It hosts:
- Foreman chat interface
- Builder agent coordination
- GitHub webhook processing
- Governance memory management
- Quality integrity enforcement (QIC/QIEL)
- Analytics and reporting dashboards

```
┌─────────────────────────────────────────────────────────────┐
│                  Foreman App (Vercel)                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Next.js    │───▶│  API Routes  │───▶│   Foreman    │  │
│  │  Frontend    │    │  (Webhooks)  │    │ Orchestrator │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│         │                    │                    │          │
│         │                    │                    │          │
│         ▼                    ▼                    ▼          │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │     UI       │    │   Builders   │    │  Governance  │  │
│  │  Dashboard   │    │   (API/UI/   │    │    Memory    │  │
│  │              │    │  Schema/QA)  │    │   (QIC/QIEL) │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
    ┌──────────┐      ┌──────────────┐    ┌──────────────┐
    │  GitHub  │      │    OpenAI    │    │   Vercel     │
    │   API    │      │   GPT-4/5    │    │  Functions   │
    └──────────┘      └──────────────┘    └──────────────┘
```

## Core Components

### 1. Frontend UI Layer

**Location**: `/app` directory

**Components**:
- **Main Dashboard** (`/app/page.tsx`): Landing page and status overview
- **Foreman Chat** (`/app/foreman/page.tsx`): Conversational interface with Foreman
- **Analytics Dashboard** (`/app/foreman/analytics/page.tsx`): Build and governance analytics
- **Parking Station** (`/app/foreman/parking-station/page.tsx`): Improvement repository
- **Incidents Dashboard** (`/app/foreman/incidents/page.tsx`): QI incident tracking
- **Architecture Alerts** (`/app/foreman/architecture/alerts/page.tsx`): Architecture drift monitoring

**Layout**: `/app/layout.tsx` provides the root layout with:
- Tailwind CSS styling
- Typography plugin
- Consistent navigation
- Responsive design

### 2. API Routes Layer

**Location**: `/app/api` directory

**Key Endpoints**:

#### GitHub Integration
- `POST /api/github/webhook`: Receives GitHub webhook events (issues, PRs, pushes)

#### Foreman Orchestration
- `POST /api/foreman/chat`: Chat interface with Foreman
- `POST /api/foreman/run`: Manual task execution
- `POST /api/foreman/run-build`: Execute build sequences
- `GET /api/foreman/status`: System status and initialization checks

#### Builder Agents
- `POST /api/builder/ui`: UI component generation
- `POST /api/builder/api`: API endpoint generation
- `POST /api/builder/schema`: Type and schema generation
- `POST /api/builder/qa`: Test generation and validation
- `POST /api/builder/integration`: External service integrations

#### Governance
- `POST /api/admin/approve`: Admin approval for builder tasks
- `POST /api/foreman/incidents/create`: Create QI incidents
- `GET /api/foreman/incidents`: List QI incidents

#### Analytics
- `GET /api/foreman/analytics/*`: Various analytics endpoints for metrics

### 3. Foreman Orchestration Engine

**Location**: `/lib/foreman` directory

**Core Modules**:

- **Orchestrator** (`orchestrator.ts`): Core orchestration logic
- **Dispatcher** (`dispatch.ts`): Builder task routing and execution
- **Chat Profile** (`chat-profile.ts`): Chat-specific system prompts
- **Initialization** (`initialization.ts`): System startup checks
- **GitHub Client** (`github-client.ts`): GitHub API integration

**Subsystems**:
- `/lib/foreman/qa`: QA enforcement (QIC/QIEL)
- `/lib/foreman/governance`: Governance rules and compliance
- `/lib/foreman/memory`: Governance memory management
- `/lib/foreman/guardrails`: Constitutional guardrails (CS1)
- `/lib/foreman/incidents`: QI incident management
- `/lib/foreman/parking-station`: Improvement repository
- `/lib/foreman/analytics`: Metrics and reporting

### 4. Builder System

**Location**: `/lib/builder` directory

**Components**:
- `capabilities.ts`: Builder capability registry
- Builder-specific logic for each builder type

**Builder Types**:
1. **UI Builder**: Generates React/Next.js components
2. **API Builder**: Creates API routes and endpoints
3. **Schema Builder**: Defines TypeScript types and schemas
4. **Integration Builder**: External service integrations
5. **QA Builder**: Test generation and validation

### 5. Quality Integrity System (QIC/QIEL)

**Location**: `/lib/foreman/qa` directory

**Components**:
- **QIC Loader** (`qic-loader.ts`): Loads Quality Integrity Contract
- **QIEL Engine**: Quality Integrity Enforcement Layer
  - Build log parsing
  - Lint validation
  - Runtime integrity checks
  - Deployment simulation
  - Silent failure detection

**Purpose**: Ensures no false positives in QA; all quality checks are absolute

### 6. Governance Memory

**Location**: `/memory/foreman` directory

**Storage**:
- QI Incidents
- Build sequences
- Architecture decisions
- Parking station entries
- Drift detection logs

**Protection**: Write-protected, only Foreman can write

## Configuration & Environment

### Required Environment Variables

#### GitHub Integration
- `GITHUB_APP_ID`: GitHub App identifier
- `GITHUB_APP_PRIVATE_KEY`: GitHub App private key
- `GITHUB_APP_INSTALLATION_ID`: Installation ID for MaturionISMS org
- `GITHUB_WEBHOOK_SECRET`: Webhook signature verification
- `GITHUB_MCP_TOKEN`: GitHub token for MCP operations (NOT `GITHUB_TOKEN`)

#### OpenAI Integration
- `OPENAI_API_KEY`: For GPT-4/5 orchestration and reasoning

#### Foreman Configuration
- `FOREMAN_BEHAVIOUR_REPO_OWNER`: MaturionISMS (default)
- `FOREMAN_BEHAVIOUR_REPO_NAME`: maturion-ai-foreman (default)
- `FOREMAN_BEHAVIOUR_DIR`: foreman (default)

#### Autonomy Configuration
- `MATURION_AUTONOMOUS_MODE`: true/false (default: true)
- `MATURION_AUTONOMOUS_GUARDS`: qa,compliance,tests
- `MATURION_ORG_ID`: Organization identifier

### File and Folder Alignment Requirements

#### Directory Structure
```
maturion-foreman-app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── foreman/           # Foreman UI pages
│   └── layout.tsx         # Root layout
├── lib/                   # Core libraries
│   ├── foreman/           # Foreman engine
│   ├── builder/           # Builder system
│   ├── github/            # GitHub integration
│   └── logging/           # Logging utilities
├── components/            # React components
├── types/                 # TypeScript definitions
├── foreman/               # Foreman behavior files (fallback)
├── memory/                # Governance memory storage
├── scripts/               # Utility scripts
├── tests/                 # Test suites
├── docs/                  # Documentation
│   ├── architecture/      # Architecture docs
│   └── governance/        # Governance docs
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── next.config.mjs        # Next.js config
└── tailwind.config.ts     # Tailwind config
```

#### Protected Paths (Immutable via CS1 Guardrails)
- `.github/workflows/`: CI/CD workflows
- `.github/foreman/agent-contract.md`: Constitutional contract
- `foreman/constitution/`: Constitutional files
- `docs/governance/`: Governance documentation
- `BUILD_PHILOSOPHY.md`: Build philosophy document

### Vercel Deployment Configuration

#### Build Settings
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

#### Node.js Version
- **Version**: 20.x or higher (as specified in package.json engines)

#### Environment Variables in Vercel
All variables from `.env.example` must be configured in Vercel:
- Production environment
- Preview environment
- Development environment (optional)

#### Serverless Functions
- **Region**: Auto (closest to user)
- **Timeout**: 10 seconds (default), configurable per function
- **Memory**: 1024 MB (default)

#### Edge Configuration
- No edge functions currently used
- All API routes are serverless functions

## Security Architecture

### Authentication & Authorization

**GitHub App Authentication**:
- Private key-based authentication
- Installation-specific tokens
- Webhook signature verification

**Admin Approval System**:
- All builder tasks require admin approval (unless autonomous mode enabled)
- Approval tracked in governance memory
- Audit trail for all actions

### Secrets Management

**Zero-Trust Model**:
- Secrets never in code
- Environment-based secrets only
- Secret detection patterns in `github-governance.ts`
- Automatic redaction in logs

**Protected Secrets**:
- `GITHUB_MCP_TOKEN`
- `GITHUB_APP_PRIVATE_KEY`
- `GITHUB_WEBHOOK_SECRET`
- `OPENAI_API_KEY`

### Data Protection

**Governance Memory**:
- Write-protected storage
- Only Foreman has write access
- Builders have no access
- Drift detection monitoring

**Input Validation**:
- All API inputs validated
- Type-safe with TypeScript
- XSS/injection prevention
- CSRF protection (Next.js default)

## Performance Architecture

### Caching Strategy

**Build-time**:
- Static pages cached at CDN edge
- API routes are serverless (not cached)

**Runtime**:
- React Query for client-side caching (where implemented)
- No server-side caching currently

### Optimization

**Code Splitting**:
- Automatic with Next.js app directory
- Route-based splitting
- Dynamic imports where needed

**Asset Optimization**:
- Tailwind CSS purging in production
- Next.js automatic image optimization
- Font optimization

## Testing Architecture

### Test Structure
```
tests/
├── dashboard/          # Dashboard API tests (87 tests)
├── qa/                 # QA system tests
├── qic/                # QIC/QIEL tests
├── governance/         # Governance tests
├── overnight-execution/# Build sequence tests
└── wiring-integrity/   # Wiring tests
```

### Test Types

**Unit Tests**:
- Component logic
- Utility functions
- Data transformations

**Integration Tests**:
- API endpoint behavior
- Builder coordination
- Database operations

**System Tests**:
- Full build sequences
- End-to-end workflows
- QIC/QIEL validation

### Test Execution
- `npm test`: Run all tests
- `npm run test:dashboard`: Dashboard tests
- `npm run test:qa`: QA tests
- `npm run test:qic`: QIC tests
- `npm run test:all`: Complete test suite

## Deployment Architecture

### Build Process

1. **Install Dependencies**: `npm install`
2. **Type Check**: `tsc --noEmit`
3. **Lint**: `npm run lint` (must pass with zero errors/warnings)
4. **Build**: `npm run build` (must succeed)
5. **Tests**: Run test suite (must be 100% green)

### Deployment Workflow

1. **Code Push**: Developer pushes to branch
2. **PR Creation**: Pull request created
3. **CI Checks**: GitHub Actions run (if configured)
4. **Vercel Preview**: Automatic preview deployment
5. **Merge to Main**: Triggers production deployment
6. **Vercel Production**: Deploys to production URL

### Health Checks

**Initialization Checks** (via `/api/foreman/status`):
1. GitHub App Configuration
2. OpenAI API Configuration
3. GitHub Token Configuration
4. Behavior Files Loaded
5. Autonomous Mode Status
6. Organization ID Configured

**Runtime Checks**:
- API endpoint availability
- Database connectivity (if applicable)
- External service integrations

## Error Handling Architecture

### Error Types

**User Errors**:
- Invalid input validation
- Missing required fields
- User-facing error messages

**System Errors**:
- API failures
- Network errors
- External service unavailability

**Governance Errors**:
- Constitutional violations
- QA failures
- Compliance issues

### Error Recovery

**Retry Logic**:
- Exponential backoff for transient failures
- Circuit breaker for repeated failures
- Fallback behaviors

**Logging**:
- All errors logged to console
- Vercel runtime logs
- Governance memory for critical errors

**User Communication**:
- Clear error messages
- Action steps for resolution
- Error codes for support

## Compliance & Governance

### Constitutional Guardrails (CS1)

**Immutable Files**:
- Cannot modify constitutional files
- Cannot modify workflows
- Cannot add QA suppressions without approval

**Validation**:
- SHA-256 hash verification
- Runtime integrity checks
- Governance memory logging

### Quality Integrity Contract (QIC)

**Requirements**:
1. Build integrity (zero errors in logs)
2. Lint integrity (zero warnings)
3. Runtime integrity (no silent failures)
4. Deployment simulation success
5. Silent failure prevention
6. QI incident recording
7. Universal enforcement

### Governance Supremacy Rule (GSR)

**Principles**:
- Governance rules override user requests
- 100% QA passing is absolute
- No partial passes accepted
- Architecture rules override implementation

## Monitoring & Observability

### Logging

**Log Levels**:
- Info: Normal operations
- Warn: Non-critical issues
- Error: Critical failures

**Log Destinations**:
- Console (development)
- Vercel runtime logs (production)
- Governance memory (governance events)

### Metrics

**System Metrics**:
- API response times
- Error rates
- Build success rates

**Business Metrics**:
- Build sequences executed
- QI incidents created
- Parking station entries

### Alerting

**Critical Alerts**:
- System degraded mode
- Repeated builder failures (5+ in 24h)
- QA/compliance failures (3+ consecutive)

**Escalation**:
- Escalate to Johan for strategic issues
- Log all escalations in governance memory

## Version History

- **v1.0.0** (2025-12-10): Initial architecture specification for Vercel deployment
  - Complete component breakdown
  - Environment variable requirements (GITHUB_MCP_TOKEN)
  - File/folder alignment requirements
  - Deployment configuration
  - Security architecture
  - Testing and QA architecture

---

**This architecture serves as the specification for QA validation. All components must be implemented and verified before production deployment.**
