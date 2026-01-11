# FPC (First Point of Contact) Repository Layer-Down Guide

## Status
**Type**: Canonical Governance Process — Entry Point  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-01-11  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Purpose**: Single entry point for layering governance into new repositories

---

## 1. Purpose

This is the **First Point of Contact (FPC)** document for governance layer-down.

When creating a new repository that must operate under Maturion governance, use this command:

> **"Layer down governance, FPC"**

This document defines the **complete, repeatable procedure** for establishing governance in a new repository, ensuring:
- All canonical governance requirements are met
- Latest learnings are incorporated
- Governance version alignment is tracked
- Repository is ready for commissioning

---

## 2. Authority & Related Documents

This FPC integrates and orchestrates requirements from:

| Canonical Document | Role in Layer-Down |
|-------------------|-------------------|
| **GOVERNANCE_LAYERDOWN_CONTRACT.md** | Defines mandatory artifacts, directory structure, and baseline files |
| **CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md** | Defines version synchronization, liaison responsibilities, and cross-repo boundaries |
| **REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md** | Defines initialization phases and seeding process |
| **GOVERNANCE_CANON_MANIFEST.md** | Authoritative index of canonical files with PUBLIC_API/INTERNAL/OPTIONAL status |
| **SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md** | Defines commissioning phases and evidence requirements |
| **AGENT_RECRUITMENT.md** | Defines agent appointment process |
| **BOOTSTRAP_EXECUTION_LEARNINGS.md** | Contains latest learnings to be incorporated |

**This document does NOT create new requirements.** It orchestrates existing canonical requirements into a single, executable protocol.

---

## 3. Prerequisites

Before beginning layer-down, confirm:

### 3.1 Repository Exists
- Repository created in GitHub under appropriate organization
- Initial README.md exists (can be placeholder)
- Default branch established (typically `main`)
- Branch protection NOT yet enabled (will be configured during layer-down)

### 3.2 Repository Classification Known
- Repository type identified: Application, Library, Governance, Infrastructure
- Agent roles determined: FM, Builders, Governance Liaison, etc.
- Governance applicability scope defined

### 3.3 Layer-Down Authority Granted
- Maturion or FM has authorized governance layer-down
- Repository owner identified
- Governance version to be layered down specified (typically "latest")

---

## 4. Layer-Down Procedure

### Phase 1: Directory Structure Setup

Create the mandatory directory structure as defined in **GOVERNANCE_LAYERDOWN_CONTRACT.md** Section 4.1:

```bash
mkdir -p .github/workflows
mkdir -p .github/agents
mkdir -p governance/alignment
mkdir -p governance/evidence/initialization
mkdir -p governance/evidence/commissioning
mkdir -p governance/policies
mkdir -p governance/schemas
mkdir -p governance/memory
```

**Verification**: All directories exist and are empty (except as populated in subsequent phases).

---

### Phase 2: Core Governance Files

#### 2.1 Create GOVERNANCE_ALIGNMENT.md

**Location**: `governance/alignment/GOVERNANCE_ALIGNMENT.md`

**Purpose**: Track governance version synchronization with canonical source.

**Template**:

```markdown
# Governance Alignment

## Current Governance Version

**Governance Repository Version**: [VERSION_TAG or COMMIT_SHA]  
**Layer-Down Date**: [DATE]  
**Layer-Down Authority**: [NAME]  
**Status**: [Aligned | Drift Detected | Update In Progress]

## Canonical Source

**Repository**: `maturion-foreman-governance`  
**Branch**: `main`  
**Location**: `https://github.com/APGI-cmy/maturion-foreman-governance`

## Layer-Down History

| Date | Governance Version | Changes Applied | Authority |
|------|-------------------|-----------------|-----------|
| [DATE] | [VERSION] | Initial layer-down | [NAME] |

## Drift Detection

**Last Check**: [DATE]  
**Status**: [No drift detected | Drift detected - see details below]  
**Next Scheduled Check**: [DATE]

---

**Governance Liaison Agent**: [AGENT_NAME or "Not yet appointed"]
```

**Action**: Create file with current date, governance version from `maturion-foreman-governance` repository, and your authority.

#### 2.2 Create INITIALIZATION_EVIDENCE.md

**Location**: `governance/evidence/initialization/INITIALIZATION_EVIDENCE.md`

**Purpose**: Document repository initialization and readiness for commissioning.

**Template**:

```markdown
# Repository Initialization Evidence

## Initialization Metadata

**Repository**: [REPO_NAME]  
**Initialization Date**: [DATE]  
**Initialized By**: [AGENT or PERSON]  
**Initialization Authority**: [FM or Maturion]

## Layer-Down Checklist

- [ ] Directory structure created
- [ ] GOVERNANCE_ALIGNMENT.md created
- [ ] PR gate workflows installed
- [ ] Agent contracts seeded (if applicable)
- [ ] Governance schemas referenced or copied
- [ ] Repository .agent contract created
- [ ] Branch protection configured
- [ ] Commissioning evidence structure created

## Governance Version

**Governance Repository Version**: [VERSION]  
**Canonical Source**: maturion-foreman-governance @ [COMMIT_SHA]

## Applicability Scope

**Repository Type**: [Application | Library | Governance | Infrastructure]  
**Agent Roles**: [FM, Builders, Governance Liaison, etc.]  
**Gate Applicability**: See AGENT_ROLE_GATE_APPLICABILITY.md in governance canon

---

**Status**: [Initialization Complete | In Progress]  
**Next Step**: [Commissioning | Further Configuration Required]
```

**Action**: Create file and begin checking off items as you complete them.

---

### Phase 3: PR Gate Workflows

Install mandatory PR gate workflows in `.github/workflows/`:

#### 3.1 Determine Applicable Gates

Based on **AGENT_ROLE_GATE_APPLICABILITY.md** in canonical governance:

- **Builder-authored PRs**: Require Build-to-Green, QA, Architecture gates
- **Governance Administrator PRs**: Require governance-scope gates only
- **FM PRs**: Require FM-scope gates (learning promotion, failure promotion)

#### 3.2 Install Workflow Files

Copy from `maturion-foreman-governance/.github/workflows/`:

**For Application Repositories (Builder + FM)**:
- `governance-gate.yml` - Main governance gate (adapt for role-based applicability)
- Add application-specific gates as defined in canonical governance

**For Governance Repositories**:
- `governance-gate.yml` - Scoped for governance administrator
- `governance-scope-to-diff-gate.yml` - Enforce scope discipline

**For All Repositories**:
- Configure branch protection to require gates before merge

**Action**: Copy applicable workflows, customize repository references, validate syntax.

---

### Phase 4: Agent Contracts

#### 4.1 Seed Agent Contracts

Based on repository type, seed agent contracts in `.github/agents/`:

**Application Repository**:
- `ForemanApp-agent.md` (FM contract)
- `[ComponentName]-builder.md` contracts for each builder
- `governance-liaison.agent.md` (if governance liaison required)

**Governance Repository**:
- `governance-repo-administrator.agent.md`

**Action**: Copy templates from `maturion-foreman-governance/governance/templates/`, customize for repository context.

#### 4.2 Create Repository .agent Contract

**Location**: `.agent` (root of repository)

**Purpose**: Define repository-level bindings and constraints.

**Template**: See `maturion-foreman-governance/.agent` as reference.

**Must Include**:
- Repository purpose and scope
- Agent roster (which agents operate in this repo)
- Governance version binding
- Key constitutional references

**Action**: Create `.agent` file with repository-specific bindings.

---

### Phase 5: Governance Policies & Schemas

#### 5.1 Reference or Copy Schemas

**Option A (Recommended)**: Reference schemas from canonical governance repository
- Add reference document in `governance/schemas/CANONICAL_SCHEMAS.md`
- List all applicable schemas with their canonical locations
- Do NOT copy schema files (prevents drift)

**Option B**: Copy schemas (only if required for offline operation)
- Copy applicable schemas from `maturion-foreman-governance/governance/schemas/`
- Document in GOVERNANCE_ALIGNMENT.md that schemas are copied (requires manual sync)

#### 5.2 Repository-Specific Policies

Create `governance/policies/` as needed for repository-specific policies that do NOT conflict with canonical governance.

**Action**: Create CANONICAL_SCHEMAS.md with references to governance repository schemas.

---

### Phase 6: Latest Learnings Integration

#### 6.1 Review Bootstrap Learnings

Read **BOOTSTRAP_EXECUTION_LEARNINGS.md** in `maturion-foreman-governance/governance/canon/`.

**Extract**:
- Learnings applicable to this repository type
- Common failure patterns to avoid
- Governance enforcement lessons
- Agent behavior corrections

#### 6.2 Review Recent Incidents

Check `maturion-foreman-governance/governance/incidents/` for recent RCAs.

**Extract**:
- Patterns relevant to new repository setup
- Configuration errors to avoid
- Gate implementation pitfalls

#### 6.3 Document Learnings Applied

In `INITIALIZATION_EVIDENCE.md`, add section:

```markdown
## Latest Learnings Applied

**Learnings Review Date**: [DATE]  
**Bootstrap Learnings Version**: [VERSION or DATE]

### Learnings Incorporated:

1. [Learning #1 - Brief description and how it was applied]
2. [Learning #2 - Brief description and how it was applied]
...

**Incidents Reviewed**: [List incident IDs reviewed]
```

**Action**: Review learnings, apply to configuration, document in initialization evidence.

---

### Phase 7: Repository-Specific Mapping

#### 7.1 Create Governance Gate Mapping (if applicable)

If repository implements Governance Gate:

**Location**: `governance/mappings/GOVERNANCE_GATE_MAPPING.md`

**Purpose**: Map canonical Governance Gate to repository-specific implementation.

**Template**: See `apps/foreman-office-app/mappings/GOVERNANCE_GATE_MAPPING.md` in governance repository.

**Must Include**:
- Workflow file location
- Validator module paths
- Configuration file location
- Evidence location mappings

#### 7.2 Create Architecture Documentation

Create `docs/architecture/` with repository-specific architecture documents as needed.

**Note**: Architecture docs are repo-specific, not canonical governance.

**Action**: Create governance gate mapping if applicable, stub architecture docs.

---

### Phase 8: Branch Protection & Activation

#### 8.1 Configure Branch Protection

Configure branch protection on default branch:

**Required Settings**:
- Require PR before merge
- Require status checks to pass (all applicable gates)
- Require branches to be up to date before merge
- Do not allow bypassing the above settings
- Restrict who can push to matching branches (limit to service accounts)

**Action**: Configure via GitHub UI or API, document in INITIALIZATION_EVIDENCE.md.

#### 8.2 Create Initial Commissioning Evidence

**Location**: `governance/evidence/commissioning/COMMISSIONING_READINESS.md`

**Purpose**: Document repository readiness for progressive commissioning.

**Template**:

```markdown
# Commissioning Readiness

## Repository Status

**Repository**: [REPO_NAME]  
**Initialization Complete**: [DATE]  
**Commissioning Phase**: [Not Started | Phase 1 | Phase 2 | Complete]

## Commissioning Checklist

### Phase 1: Infrastructure Readiness
- [ ] Branch protection active
- [ ] PR gates installed and operational
- [ ] Agent contracts in place
- [ ] Governance alignment tracked

### Phase 2: Operational Validation
- [ ] Test PR created and validated through gates
- [ ] Agent recruitment completed (if applicable)
- [ ] First build executed successfully (if applicable)
- [ ] Evidence trail validated

### Phase 3: Production Readiness
- [ ] All commissioning evidence complete
- [ ] Audit trail established
- [ ] Governance liaison appointed (if required)
- [ ] Repository declared production-ready

---

**Current Status**: [Brief status description]  
**Next Milestone**: [What needs to happen next]
```

**Action**: Create commissioning readiness document, begin Phase 1 validation.

---

## 5. Validation Checklist

Before declaring layer-down complete, verify:

### 5.1 Structural Completeness

- [ ] All mandatory directories exist
- [ ] All mandatory files created and populated
- [ ] No placeholder content remaining (except for evidence to be generated during commissioning)

### 5.2 Governance Alignment

- [ ] GOVERNANCE_ALIGNMENT.md accurately reflects governance version
- [ ] Canonical schemas referenced (or copied with sync plan)
- [ ] Latest learnings reviewed and applied

### 5.3 Gate Functionality

- [ ] PR gate workflows syntactically valid
- [ ] Test PR can be created
- [ ] Gates execute (pass or fail is OK; execution failure is NOT OK)

### 5.4 Agent Contracts

- [ ] `.agent` contract present and complete
- [ ] Agent contracts seeded for applicable roles
- [ ] No contradictions between repository .agent and agent contracts

### 5.5 Evidence Trail

- [ ] INITIALIZATION_EVIDENCE.md complete
- [ ] Commissioning evidence structure created
- [ ] Audit trail started

---

## 6. Post Layer-Down: Commissioning

After layer-down is complete, repository enters **commissioning phase**:

**See**: **SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md** in canonical governance for commissioning procedure.

**Key Steps**:
1. Create test PR to validate gates
2. Execute initial builds (if applicable)
3. Validate evidence generation
4. Appoint agents (if not already done)
5. Declare production-ready when all commissioning evidence complete

---

## 7. Governance Liaison Responsibilities

After layer-down, a **Governance Liaison** agent (or FM in bootstrap mode) is responsible for:

- Monitoring governance version drift
- Initiating governance updates when canonical governance evolves
- Maintaining GOVERNANCE_ALIGNMENT.md
- Ensuring repository remains aligned with canonical governance

**See**: **CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md** Section 5 for governance liaison responsibilities.

---

## 8. Troubleshooting

### Issue: Gate workflows fail to execute

**Cause**: Syntax errors, missing secrets, incorrect repository references

**Solution**:
1. Validate workflow YAML syntax
2. Check that required secrets exist in repository settings
3. Verify repository-specific references are correct
4. Test workflows with minimal PR

### Issue: Governance version drift detected immediately after layer-down

**Cause**: Layered down from outdated governance version

**Solution**:
1. Confirm governance version in GOVERNANCE_ALIGNMENT.md matches latest in canonical repo
2. If outdated, re-run layer-down from latest governance version
3. Document version in initialization evidence

### Issue: Agent contracts conflict with repository .agent

**Cause**: Duplication of doctrine or bindings

**Solution**:
1. Review agent contracts and .agent for duplicate content
2. Doctrine should be in canonical governance, not contracts
3. Contracts reference doctrine, do not restate it
4. See AGENT_CONTRACT_MIGRATION_GUIDE.md in canonical governance

---

## 9. Examples

### Example 1: New Application Repository

**Repository**: `maturion-new-app`  
**Type**: Application (Next.js)  
**Agents**: FM + UI Builder + API Builder + QA Builder

**Layer-Down Steps**:
1. Create directory structure (Phase 1)
2. Create GOVERNANCE_ALIGNMENT.md pointing to governance v2.3.0 (Phase 2.1)
3. Create INITIALIZATION_EVIDENCE.md (Phase 2.2)
4. Install `governance-gate.yml` workflow (Phase 3)
5. Seed FM and builder contracts from templates (Phase 4)
6. Create `.agent` contract for repository (Phase 4.2)
7. Create CANONICAL_SCHEMAS.md referencing governance schemas (Phase 5.1)
8. Review BOOTSTRAP_EXECUTION_LEARNINGS.md and apply (Phase 6)
9. Create GOVERNANCE_GATE_MAPPING.md (Phase 7.1)
10. Configure branch protection (Phase 8.1)
11. Create COMMISSIONING_READINESS.md (Phase 8.2)
12. Validate with test PR (Phase 8.2)

### Example 2: New Governance Repository

**Repository**: `maturion-governance-experimental`  
**Type**: Governance  
**Agents**: Governance Administrator only

**Layer-Down Steps**:
1. Create directory structure (Phase 1)
2. Create GOVERNANCE_ALIGNMENT.md (Phase 2.1)
3. Create INITIALIZATION_EVIDENCE.md (Phase 2.2)
4. Install `governance-gate.yml` and `governance-scope-to-diff-gate.yml` (Phase 3)
5. Seed governance-repo-administrator.agent.md (Phase 4)
6. Create `.agent` contract (Phase 4.2)
7. Reference schemas from canonical governance (Phase 5.1)
8. Review learnings (Phase 6)
9. Skip governance gate mapping (not applicable) (Phase 7)
10. Configure branch protection (Phase 8.1)
11. Create COMMISSIONING_READINESS.md (Phase 8.2)
12. Validate with test governance PR (Phase 8.2)

---

## 10. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-11 | Initial FPC guide created as part of governance repository restructuring |

---

## 11. Related Documents

- `governance/canon/GOVERNANCE_LAYERDOWN_CONTRACT.md` - Artifact inventory
- `governance/canon/CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md` - Version synchronization protocol
- `governance/canon/REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md` - Initialization phases
- `governance/canon/GOVERNANCE_CANON_MANIFEST.md` - Canonical file index
- `governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md` - Latest learnings
- `governance/canon/AGENT_RECRUITMENT.md` - Agent appointment process
- `apps/foreman-office-app/mappings/GOVERNANCE_GATE_MAPPING.md` - Example mapping document

---

**This is the single, authoritative entry point for governance layer-down.**

**Command**: "Layer down governance, FPC"

**Result**: New repository fully governed, aligned with latest canonical governance, ready for commissioning.
