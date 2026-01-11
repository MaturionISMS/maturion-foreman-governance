# Repository-Specific Governance

## Purpose

This directory contains **repository-specific governance artifacts** that map canonical governance to individual application repositories.

**Key Principle**: Generic, cross-repository governance canon lives in `governance/**`. Repo-specific implementations, mappings, architecture docs, and diagnostics live here in `apps/**`.

---

## Directory Structure

Each repository has its own subdirectory with the following structure:

```
apps/
├── <repo-name>/
│   ├── docs/              # Architecture, behavioral docs, repo-specific guides
│   ├── mappings/          # Mappings from canonical governance to repo-specific implementations
│   └── reports/           # Diagnostics and governance scans specific to this repo
```

---

## Repository Index

| Repository Key | Full Name | Purpose |
|----------------|-----------|---------|
| `foreman-office-app` | maturion-foreman-office-app | Next.js Foreman orchestration app (Vercel-hosted) |
| `ai-foreman` | maturion-ai-foreman | Python-based Foreman implementation |
| `isms` | maturion-isms | Main monorepo for ISMS |
| `codex-control` | maturion-codex-control | Codex control system |
| `copilot-builders` | maturion-copilot-builders | Builder agents repository |
| `partpulse` | PartPulse | Part distribution application |
| `slotmaster` | SlotMaster | Slot management system |
| `local-builder` | maturion-local-builder | Maturion local desktop app |
| `test` | Test | Test repository |

---

## Usage

### For Governance Administrators

When creating repo-specific content:

1. **Architecture docs**: Place in `apps/<repo>/docs/`
2. **Governance mappings**: Place in `apps/<repo>/mappings/`
3. **Diagnostic reports**: Place in `apps/<repo>/reports/`

### For Repository Maintainers

When implementing canonical governance in your repo:

1. Consult `governance/canon/**` for universal requirements
2. Check `apps/<your-repo>/mappings/**` for repo-specific implementation guidance
3. Reference `apps/<your-repo>/docs/**` for architectural context

---

## Canonical Reference

This structure is defined by the governance repository restructuring completed in 2026-01 to support **10+ active repositories** with clean separation between generic governance canon and repo-specific implementations.

**See**: `governance/canon/FPC_REPOSITORY_LAYERDOWN_GUIDE.md` for how this structure integrates with governance layer-down protocol.

---

**Version**: 1.0.0  
**Authority**: Governance Repository Administrator  
**Date**: 2026-01-11
