# QIEL Workflow - Governance Enforcement

This directory contains the GitHub Actions workflow for QIEL (Quality Integrity Enforcement Layer).

## Governance Supremacy Rule (GSR)

**CRITICAL**: Per Maturion governance doctrine, **Foreman MUST run QIEL on itself**.

### Why Foreman Validates Itself

1. **GSR (Governance Supremacy Rule)**: No system is exempt from rules it imposes
2. **One Build**: Foreman follows the same rules as all projects
3. **True North**: Quality enforcement applies universally
4. **Zero Legacy**: No grandfather clauses or exceptions
5. **QA Must Be 100% Green**: Foreman demonstrates this by example

**This is NOT a circular dependency** - it is governance enforcement applied recursively and correctly.

## Active Workflow

The file `qiel.yml` is the **active workflow** that runs QIEL on every PR to this repository.

### Required Permissions

The workflow requires these GitHub permissions:

```yaml
permissions:
  contents: read
  issues: write      # Required for creating QI Incident issues
  pull-requests: write  # Required for PR comments
```

## Workflow Triggers

QIEL runs on:
- All pull requests to `main` or `develop` branches
- All pushes to `main`, `develop`, or `feature/**` branches

## What QIEL Validates

1. **Build Logs** (`typecheck`) - Zero TypeScript errors
2. **Lint Logs** (`lint`) - Zero ESLint errors/warnings
3. **Test Logs** (`test:all`) - All tests passing
4. **Schema Cohesion** - All engine schemas match
5. **Engine Loading** - All cognitive engines initialize
6. **Deployment Simulation** - Production builds succeed

## Exit Criteria

A PR can only merge when:
- ✅ QIEL runs successfully
- ✅ All checks pass
- ✅ Zero errors or warnings
- ✅ QIC (Quality Integrity Contract) satisfied
- ✅ GSR enforced

## Integration with QIW

- **QIW (Quality Integrity Watchdog)** - Monitors logs in real-time
- **QIEL** - Comprehensive enforcement layer with incident tracking
- Both systems work together to ensure quality integrity

## For Downstream Projects

Projects that use Foreman should copy `qiel-template.yml.example` to their own `.github/workflows/qiel.yml` and customize as needed.

## Governance Documentation

- See `foreman/governance/quality-integrity-contract.md` for QIC details
- See `docs/QIEL_README.md` for full QIEL documentation
- See `lib/foreman/watchdog/README.md` for QIW documentation
