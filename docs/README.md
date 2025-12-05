# Documentation Index

This directory contains documentation for the Maturion Foreman system, including pilot build waves, repository structure, and system documentation.

## Available Documentation

### [Repository Tree Breakdown](./REPOSITORY_TREE_BREAKDOWN.md) 🆕

Complete tree structure breakdown for all 6 MaturionISMS repositories:
- Visual directory trees with inline comments
- Repository metadata and statistics
- Automated fetching script
- Multiple methods for generating trees

### [Pilot Build Wave 1](./pilot-build-wave-1.md)

The first pilot build wave that validates the Foreman → Builder → QA pipeline end-to-end. This pilot:
- Targets the Foreman Status Dashboard feature
- Uses the maturion-foreman-app repository itself
- Demonstrates full autonomous build capability
- Generates comprehensive build reports

## Quick Start

### Trigger a Pilot Build

#### Via GitHub Issue Comment

Post a comment in any GitHub issue:
```
@foreman execute Pilot Build Wave 1
```

#### Via API

```bash
curl -X POST https://your-app.vercel.app/api/foreman/run-build \
  -H "Content-Type: application/json" \
  -d '{
    "organisationId": "maturion_isms",
    "pilotWave": true,
    "waveNumber": 1,
    "feature": "foreman-status-dashboard",
    "autonomousBuildEnabled": true,
    "createPR": true,
    "owner": "MaturionISMS",
    "repo": "maturion-foreman-app",
    "branch": "foreman/pilot-wave-1",
    "baseBranch": "main"
  }'
```

### Run Examples

Test the pilot build workflow locally:

```bash
# Run the complete pilot build example
npx tsx scripts/example-pilot-build-wave-1.ts

# Test pilot build API (requires dev server)
npm run dev
# In another terminal:
npx tsx scripts/test-pilot-build.ts
```

## Build Reports

Build reports are automatically generated in the `reports/` directory with the following information:
- Build sequence metadata
- Tasks executed and their status
- Builders used and artifacts generated
- QA validation results
- Compliance verification
- Execution timeline

Reports are named:
- Pilot builds: `FOREMAN_PILOT_BUILD_REPORT.md`
- Regular builds: `FOREMAN_BUILD_REPORT_{sequence_id}.md`

## Architecture

### Pilot Build Flow

```
GitHub Issue/API Trigger
         ↓
Detect Pilot Build Command
         ↓
Create Build Sequence
         ↓
Architecture Analysis
         ↓
Generate Builder Tasks
         ↓
Dispatch to Builders
         ↓
Auto-Approve (Autonomous Mode)
         ↓
Execute Builder Tasks
         ↓
QA Validation
         ↓
QA-of-QA Meta-Review
         ↓
Assemble PR (if enabled)
         ↓
Generate Build Report
         ↓
Complete
```

### Components

- **Orchestrator** (`lib/foreman/orchestrator.ts`) - Detects pilot build commands
- **Build Sequence** (`lib/foreman/build-sequence.ts`) - Manages build execution
- **Build Report** (`lib/foreman/build-report.ts`) - Generates reports
- **PR Builder** (`lib/github/pr-builder.ts`) - Assembles PRs with governance context
- **Webhook Handler** (`app/api/github/webhook/route.ts`) - Processes GitHub events
- **Run Build API** (`app/api/foreman/run-build/route.ts`) - Executes build sequences

## Governance

All pilot builds operate under strict governance:
- ✅ QA validation mandatory
- ✅ QA-of-QA meta-review required
- ✅ Organisation ID validated
- ✅ No secrets in code
- ✅ Complete audit trail
- ✅ No breaking changes

See [Autonomy Rules](../foreman/autonomy-rules.md) for complete governance framework.

## Future Waves

- **Wave 2**: Multi-module features with cross-component dependencies
- **Wave 3**: Cross-repository builds
- **Wave 4**: Infrastructure and deployment changes
- **Wave 5**: External system integrations

Each wave increases in complexity, building on lessons learned from previous waves.
