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

- **Foreman Logic** (`/lib/foreman/`)
  - `interpret-governance.ts` - Loads and interprets governance rules
  - `run-build-wave.ts` - Orchestrates build wave execution
  - `run-self-test.ts` - System diagnostics and health checks
  - `apply-file-changes.ts` - File operations via GitHub API

- **Integrations** (`/lib/`)
  - `github.ts` - GitHub App authentication and API client
  - `openai.ts` - OpenAI/GPT-4 integration for AI features

- **Components** (`/components/`)
  - `ForemanStatus.tsx` - Dashboard status display
  - `LayoutShell.tsx` - Main application layout

- **Type Definitions** (`/types/`)
  - `github.ts` - GitHub API types
  - `foreman.ts` - Foreman system types
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

## Project Structure

```
maturion-foreman-app/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Dashboard page
│   ├── layout.tsx           # Root layout
│   └── api/                 # API routes
│       ├── github/webhook/  # GitHub webhook handler
│       └── foreman/run/     # Foreman task executor
├── lib/                     # Core libraries
│   ├── github.ts           # GitHub API client
│   ├── openai.ts           # OpenAI integration
│   └── foreman/            # Foreman orchestration logic
│       ├── interpret-governance.ts
│       ├── run-build-wave.ts
│       ├── run-self-test.ts
│       └── apply-file-changes.ts
├── components/              # React components
│   ├── ForemanStatus.tsx   # Status display
│   └── LayoutShell.tsx     # Layout wrapper
├── types/                   # TypeScript type definitions
│   ├── github.ts
│   ├── foreman.ts
│   └── build.ts
├── scripts/                 # Utility scripts
│   ├── local-test-webhook.ts
│   └── run-foreman-task.ts
└── .env.example            # Environment variables template
```

## License

Proprietary - Maturion ISMS

## Support

For questions or issues, please contact the Maturion team.
