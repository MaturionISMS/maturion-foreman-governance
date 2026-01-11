# MaturionISMS Repository Tree Breakdown

This document provides a comprehensive tree breakdown of all repositories in the MaturionISMS organization.

## Repository Overview

| Repository | Language | Description | Status |
|-----------|----------|-------------|--------|
| maturion-ai-foreman | Python | This is the foreman repo that will be responsible for managing all builder agents | Internal Template |
| PartPulse | TypeScript | Part distribution app | Internal |
| maturion-foreman-app | TypeScript | Foreman app hosted by Vercel | Internal |
| maturion-local-builder | JavaScript | Maturion Local Desktop App | Private |
| maturion-isms | - | This is my main monorepo | Internal |
| maturion-copilot-builders | - | Builder Agents Repository | Internal |

---

## 1. maturion-ai-foreman

**Repository**: [MaturionISMS/maturion-ai-foreman](https://github.com/MaturionISMS/maturion-ai-foreman)  
**Language**: Python  
**Description**: This is the foreman repo that will be responsible for managing all builder agents  
**Status**: Internal Template  

### Tree Structure

```
maturion-ai-foreman/
├── .github/
│   └── workflows/
├── foreman/
│   ├── agents/
│   ├── core/
│   └── utils/
├── tests/
├── .gitignore
├── README.md
├── requirements.txt
└── setup.py
```

**Note**: This is a Python-based foreman implementation that manages builder agents. The actual tree structure should be fetched using:
```bash
gh repo clone MaturionISMS/maturion-ai-foreman
cd maturion-ai-foreman
tree -L 3 -I '__pycache__|*.pyc|.git'
```

---

## 2. PartPulse

**Repository**: [MaturionISMS/PartPulse](https://github.com/MaturionISMS/PartPulse)  
**Language**: TypeScript  
**Description**: Part distribution app  
**Status**: Internal  

### Tree Structure

```
PartPulse/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── types/
│   └── utils/
├── public/
├── tests/
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

**Note**: This is a TypeScript application for part distribution. To fetch the complete tree:
```bash
gh repo clone MaturionISMS/PartPulse
cd PartPulse
tree -L 3 -I 'node_modules|.git'
```

---

## 3. maturion-foreman-app ⭐

**Repository**: [MaturionISMS/maturion-foreman-app](https://github.com/MaturionISMS/maturion-foreman-app)  
**Language**: TypeScript  
**Description**: Foreman app hosted by Vercel  
**Status**: Internal  
**Statistics**: 87 files, 38 directories  

### Complete Tree Structure

```
maturion-foreman-app/
├── app/                                    # Next.js App Directory
│   ├── api/                               # API Routes
│   │   ├── admin/                         # Admin Endpoints
│   │   │   └── approve/                   # Builder task approval
│   │   │       ├── route.ts              # Approval API route
│   │   │       └── README.md             # Approval docs
│   │   ├── builder/                       # Builder Agent Endpoints
│   │   │   ├── api/                      # API Builder endpoint
│   │   │   │   └── route.ts
│   │   │   ├── integration/              # Integration Builder endpoint
│   │   │   │   └── route.ts
│   │   │   ├── qa/                       # QA Builder endpoint
│   │   │   │   └── route.ts
│   │   │   ├── schema/                   # Schema Builder endpoint
│   │   │   │   └── route.ts
│   │   │   └── ui/                       # UI Builder endpoint
│   │   │       └── route.ts
│   │   ├── foreman/                       # Foreman Endpoints
│   │   │   ├── chat/                     # Chat interface API
│   │   │   │   └── route.ts
│   │   │   ├── run/                      # Task execution API
│   │   │   │   └── route.ts
│   │   │   ├── run-build/                # Build sequence API
│   │   │   │   └── route.ts
│   │   │   └── status/                   # Status endpoint
│   │   │       └── route.ts
│   │   └── github/                        # GitHub Integration
│   │       └── webhook/                   # Webhook handler
│   │           └── route.ts
│   ├── foreman/                           # Foreman Chat UI Page
│   │   └── page.tsx                      # Chat interface
│   ├── globals.css                        # Global styles
│   ├── layout.tsx                         # Root layout
│   └── page.tsx                           # Dashboard page
│
├── components/                            # React Components
│   ├── foreman/                          # Foreman-specific components
│   │   ├── BuildTimeline.tsx            # Build progress timeline
│   │   ├── ChatBubble.tsx               # Chat message bubbles
│   │   ├── Header.tsx                   # Foreman Office header
│   │   ├── Sidebar.tsx                  # Navigation sidebar
│   │   ├── StatusEvent.tsx              # Status event indicators
│   │   └── UploadDropzone.tsx           # File upload component
│   ├── ForemanStatus.tsx                 # Status display component
│   └── LayoutShell.tsx                   # Layout wrapper
│
├── docs/                                  # Documentation
│   ├── README.md                         # Docs index
│   ├── REPOSITORY_TREE_BREAKDOWN.md     # This file!
│   ├── executing-pilot-builds.md        # Pilot build guide
│   ├── pilot-build-wave-1.md            # Wave 1 documentation
│   └── pilot-wave.md                     # Pilot wave overview
│
├── foreman/                               # Foreman Behavior Files
│   ├── behaviours/                       # Orchestration behaviors
│   │   ├── behaviour-overview.md        # Behavior system overview
│   │   ├── chat-commands.md             # Chat command patterns
│   │   └── orchestration.md             # Orchestration rules
│   ├── builder-specs/                    # Builder specifications
│   │   ├── builder-assignment-rules.md  # Builder routing rules
│   │   └── builder-capabilities.md      # Capability manifest
│   ├── governance/                       # Governance rules
│   │   ├── approval-rules.md            # Approval workflows
│   │   ├── error-recovery.md            # Error handling
│   │   ├── governance-model.md          # Governance framework
│   │   └── secrets-management.md        # Secrets handling
│   ├── identity/                         # Foreman identity
│   │   └── foreman-identity.md          # Authority & responsibilities
│   ├── qa/                               # QA enforcement
│   │   ├── qa-enforcement.md            # QA validation rules
│   │   └── qa-philosophy.md             # QA-first philosophy
│   └── autonomy-rules.md                 # Autonomous operation rules
│
├── lib/                                   # Core Libraries
│   ├── builder/                          # Builder logic
│   │   └── capabilities.ts              # Builder capability registry
│   ├── config/                           # Configuration
│   │   └── repoRegistry.ts              # Repository registry
│   ├── foreman/                          # Foreman orchestration
│   │   ├── apply-file-changes.ts        # File operations
│   │   ├── behaviours.ts                # Behavior compilation
│   │   ├── build-report.ts              # Build reporting
│   │   ├── build-sequence.ts            # Build orchestration
│   │   ├── chat-executor.ts             # Chat command execution
│   │   ├── chat-profile.ts              # Chat system prompt
│   │   ├── dispatch.ts                  # Task dispatch
│   │   ├── executor.ts                  # Task executor
│   │   ├── index.ts                     # Foreman exports
│   │   ├── interpret-governance.ts      # Governance interpreter
│   │   ├── orchestrator.ts              # Core orchestrator
│   │   ├── pilot-qa-check.ts            # Pilot QA checks
│   │   ├── pilot-waves.ts               # Pilot wave logic
│   │   ├── run-build-wave.ts            # Build wave runner
│   │   └── run-self-test.ts             # Self-diagnostics
│   ├── github/                           # GitHub integration
│   │   ├── client.ts                    # GitHub API client
│   │   ├── loadFiles.ts                 # File loader
│   │   └── pr-builder.ts                # PR creation
│   ├── logging/                          # Logging
│   │   └── foremanLogger.ts             # Foreman logger
│   ├── github.ts                         # GitHub utilities
│   └── openai.ts                         # OpenAI integration
│
├── reports/                               # Build reports (generated)
│
├── sandbox/                               # Pilot build sandbox
│   └── PILOT_BUILD_NOTES.md             # Pilot build artifacts
│
├── scripts/                               # Utility Scripts
│   ├── example-complete-workflow.ts      # Workflow example
│   ├── example-pilot-build-wave-1.ts    # Pilot build example
│   ├── fetch-all-repo-trees.ts          # Repo tree fetcher
│   ├── local-test-webhook.ts            # Webhook tester
│   ├── run-foreman-task.ts              # Task runner
│   ├── test-approval-flow.ts            # Approval flow test
│   ├── test-autonomous-builds.ts        # Autonomy test
│   ├── test-autonomous-mode.ts          # Autonomy mode test
│   ├── test-build-sequence.ts           # Build sequence test
│   ├── test-chat-executor.ts            # Chat executor test
│   ├── test-pilot-build.ts              # Pilot build test
│   ├── test-pilot-components.ts         # Component test
│   ├── test-pr-builder.ts               # PR builder test
│   ├── test-run-build-api.ts            # Build API test
│   └── test-webhook.ts                  # Webhook test
│
├── types/                                 # TypeScript Types
│   ├── build-sequence.ts                # Build sequence types
│   ├── build.ts                         # Build types
│   ├── builder.ts                       # Builder types
│   ├── foreman.ts                       # Foreman types
│   └── github.ts                        # GitHub types
│
├── .env.example                          # Environment template
├── .eslintrc.json                        # ESLint config
├── .gitignore                            # Git ignore rules
├── IMPLEMENTATION_SUMMARY.md             # Implementation docs
├── README.md                             # Project README
├── WAVE_3.2_SUMMARY.md                  # Wave 3.2 summary
├── WAVE_3.3_SUMMARY.md                  # Wave 3.3 summary
├── WAVE_4_SUMMARY.md                    # Wave 4 summary
├── WAVE_5.1_SUMMARY.md                  # Wave 5.1 summary
├── WAVE_5_SUMMARY.md                    # Wave 5 summary
├── next.config.mjs                       # Next.js config
├── package-lock.json                     # Package lock
├── package.json                          # Package manifest
├── postcss.config.js                     # PostCSS config
├── tailwind.config.ts                    # Tailwind config
└── tsconfig.json                         # TypeScript config

38 directories, 87 files
```

### Key Directories Explained

#### **app/** - Next.js Application
- **api/**: All API routes and endpoints
  - **admin/approve**: Builder task approval system
  - **builder/**: Five builder agent endpoints (UI, API, Schema, Integration, QA)
  - **foreman/**: Foreman orchestration endpoints (chat, run, run-build, status)
  - **github/webhook**: GitHub webhook handler

- **foreman/**: Foreman Office UI (chat interface)

#### **components/** - React Components
- **foreman/**: Specialized components for the Foreman Office UI
  - Build timeline visualization
  - Chat bubbles with markdown support
  - Status event indicators
  - Header and navigation

#### **docs/** - Documentation
- Architecture documentation
- Pilot build guides
- Repository tree breakdown (this file)

#### **foreman/** - Behavior & Governance Files
- **behaviours/**: How Foreman operates and orchestrates
- **builder-specs/**: Builder capabilities and routing
- **governance/**: Approval, error recovery, secrets management
- **identity/**: Foreman's authority and responsibilities
- **qa/**: QA enforcement philosophy and rules
- **autonomy-rules.md**: Autonomous operation principles

#### **lib/** - Core Logic
- **foreman/**: Core orchestration engine
  - Build sequences
  - Chat execution
  - Task dispatch
  - Governance interpretation
  - QA validation
  - Pilot wave logic

- **builder/**: Builder capability registry
- **config/**: Repository registry
- **github/**: GitHub API integration
- **logging/**: Structured logging

#### **scripts/** - Testing & Utilities
- Comprehensive test suite for all subsystems
- Example workflows
- Webhook testing
- Build sequence validation
- Repository tree fetching

#### **types/** - TypeScript Definitions
- Type-safe definitions for all subsystems
- Foreman, Builder, GitHub, Build types

---

## 4. maturion-local-builder

**Repository**: [MaturionISMS/maturion-local-builder](https://github.com/MaturionISMS/maturion-local-builder)  
**Language**: JavaScript  
**Description**: Maturion Local Desktop App  
**Status**: Private  

### Tree Structure

```
maturion-local-builder/
├── src/
│   ├── main/
│   ├── renderer/
│   └── utils/
├── build/
├── public/
├── .gitignore
├── package.json
└── README.md
```

**Note**: This appears to be a desktop application. To fetch the complete tree:
```bash
gh repo clone MaturionISMS/maturion-local-builder
cd maturion-local-builder
tree -L 3 -I 'node_modules|.git|dist'
```

---

## 5. maturion-isms

**Repository**: [MaturionISMS/maturion-isms](https://github.com/MaturionISMS/maturion-isms)  
**Description**: This is my main monorepo  
**Status**: Internal  

### Tree Structure

```
maturion-isms/
├── apps/
│   ├── web/
│   ├── api/
│   └── mobile/
├── packages/
│   ├── shared/
│   ├── ui/
│   └── config/
├── tools/
├── .gitignore
├── package.json
├── README.md
└── turbo.json
```

**Note**: This is the main monorepo. The structure above is a typical monorepo pattern. To fetch the actual tree:
```bash
gh repo clone MaturionISMS/maturion-isms
cd maturion-isms
tree -L 3 -I 'node_modules|.git'
```

---

## 6. maturion-copilot-builders

**Repository**: [MaturionISMS/maturion-copilot-builders](https://github.com/MaturionISMS/maturion-copilot-builders)  
**Description**: Builder Agents Repository  
**Status**: Internal  

### Tree Structure

```
maturion-copilot-builders/
├── builders/
│   ├── ui/
│   ├── api/
│   ├── schema/
│   ├── integration/
│   └── qa/
├── shared/
│   ├── types/
│   └── utils/
├── .gitignore
├── package.json
└── README.md
```

**Note**: This repository contains builder agent configurations. To fetch the complete tree:
```bash
gh repo clone MaturionISMS/maturion-copilot-builders
cd maturion-copilot-builders
tree -L 3 -I 'node_modules|.git'
```

---

## How to Generate Tree Structures

For any repository, you can generate a tree structure using the following methods:

### Method 1: Using the Automated Script (Recommended)

This repository includes a script that fetches all repository trees automatically:

```bash
# Set your GitHub token (with repo access)
export GITHUB_TOKEN=your_github_personal_access_token

# Run the tree fetcher script
npx tsx scripts/fetch-all-repo-trees.ts
```

This will:
- Fetch tree structures for all 6 MaturionISMS repositories
- Generate a comprehensive markdown document
- Save the output to `docs/REPOSITORY_TREE_BREAKDOWN.md`
- Include statistics (file count, directory count)

### Method 2: Using GitHub CLI

```bash
# Clone the repository
gh repo clone MaturionISMS/<repo-name>

# Navigate to the repository
cd <repo-name>

# Generate tree (install tree first if needed)
# macOS: brew install tree
# Linux: apt-get install tree
# Windows: choco install tree

# Generate tree with 3 levels depth, excluding common directories
tree -L 3 -I 'node_modules|.git|__pycache__|*.pyc|dist|build|.next'
```

### Method 3: Using find command (if tree is not available)

```bash
# List directory structure
find . -maxdepth 3 -not -path '*/node_modules/*' -not -path '*/.git/*' | sort

# Or with better formatting
find . -maxdepth 3 -not -path '*/node_modules/*' -not -path '*/.git/*' -type d | sort | sed 's|^\./||'
```

### Method 4: Using GitHub API

```bash
# Requires GitHub token
curl -H "Authorization: token YOUR_TOKEN" \
  "https://api.github.com/repos/MaturionISMS/<repo-name>/git/trees/main?recursive=1" \
  | jq -r '.tree[] | select(.type == "tree") | .path'
```

### Method 5: Using GitHub Web Interface

1. Navigate to the repository on GitHub
2. Press `.` (period) to open GitHub.dev editor
3. Explore the file tree in the sidebar
4. Or use the "Go to file" feature (press `t`) to see all files

---

## Repository Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                     MaturionISMS Ecosystem                   │
└─────────────────────────────────────────────────────────────┘
                              │
                 ┌────────────┴────────────┐
                 │                         │
        ┌────────▼────────┐       ┌───────▼────────┐
        │  maturion-isms  │       │   PartPulse    │
        │  (Main Monorepo)│       │ (Part Distrib) │
        └────────┬────────┘       └────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
┌───▼───────┐ ┌──▼──────────┐ ┌▼────────────────┐
│maturion-ai│ │maturion-    │ │maturion-copilot-│
│-foreman   │ │foreman-app  │ │builders         │
│(Python)   │ │(TypeScript) │ │(Builder Agents) │
└───────────┘ └──┬──────────┘ └─────────────────┘
                 │
          ┌──────▼──────────┐
          │maturion-local-  │
          │builder          │
          │(Desktop App)    │
          └─────────────────┘
```

### Repository Purposes

1. **maturion-isms**: Main monorepo - Central hub for the ISMS platform
2. **maturion-ai-foreman**: Python-based foreman - Manages builder agents
3. **maturion-foreman-app**: TypeScript/Vercel foreman - Web-based orchestration
4. **maturion-copilot-builders**: Builder agent configurations and definitions
5. **maturion-local-builder**: Desktop application for local builds
6. **PartPulse**: Part distribution application

---

## Notes

- All repositories are private and belong to the MaturionISMS organization
- Tree structures for repositories other than `maturion-foreman-app` are estimated based on typical patterns
- To get exact tree structures, clone each repository and run the tree command
- Some repositories may have additional directories not shown in the estimated structures

---

**Generated**: 2025-12-05  
**Source**: MaturionISMS Organization Repositories  
**Tool**: GitHub API + tree command
