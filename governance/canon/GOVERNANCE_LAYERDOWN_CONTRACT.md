# GOVERNANCE LAYERDOWN CONTRACT

## Status
**Type**: Canonical Governance Standard  
**Authority**: Supreme - Johan Ras  
**Version**: 1.1.0  
**Effective Date**: 2026-01-05 (Updated)  
**Applies To**: All Application Repositories (FM, SlotMaster, Future Apps)  
**Purpose**: Define authoritative requirements for layering governance into application repositories  
**Companion Protocol**: CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md (cross-repo coordination)

---

## 1. Purpose

This contract defines the **single, authoritative specification** for what governance artifacts MUST be layered down from the governance repository (`maturion-foreman-governance`) into any application repository.

This contract exists to:
- **Prevent governance drift** across application repositories
- **Enable consistent enforcement** of governance requirements
- **Ensure commissioning readiness** from repository inception
- **Provide explicit checklist** for repository initialization and validation
- **Eliminate ambiguity** about what "properly governed repository" means

**Foundational Principle**: Every application repository is a governance-governed entity from creation. Governance is layered down, not discovered or inferred.

---

## 2. Constitutional Authority

This contract derives authority from and synthesizes requirements from:

| Canonical Document | Authority Relationship |
|-------------------|----------------------|
| **GOVERNANCE_PURPOSE_AND_SCOPE.md** | Establishes governance as canonical memory |
| **REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md** | Defines mandatory directory structure and initialization phases |
| **SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md** | Defines commissioning phases and audit trail requirements |
| **AGENT_ROLE_GATE_APPLICABILITY.md** | Defines which gates apply to which agent roles |
| **PR_GATE_EVALUATION_AND_ROLE_PROTOCOL.md** | Defines gate evaluation process |
| **INITIALIZATION_COMPLETENESS_GATE.md** | Defines repository initialization validation |
| **APP_STARTUP_REQUIREMENTS_DECLARATION.md** | Defines application-specific commissioning requirements |
| **COMMISSIONING_EVIDENCE_MODEL.md** | Defines evidence requirements for commissioning |
| **BUILD_PHILOSOPHY.md** | Defines Build-to-Green and One-Time Build Law |
| **GOVERNANCE_COMPLETENESS_MODEL.md** | Defines governance enforcement semantics |
| **MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md** | Defines continuous improvement capture requirements |
| **CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md** | Defines explicit cross-repo governance propagation protocol (v1.0.0, 2026-01-05) |
| **GOVERNANCE_CANON_MANIFEST.md** | Authoritative index of canonical files with layer-down status (v1.0.0, 2026-01-05) |

This contract is a **synthesis document** that extracts layer-down requirements from these canonical sources. It does NOT create new requirements.

**IMPORTANT UPDATE (2026-01-05)**: This contract now works in conjunction with **CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md**, which defines explicit version synchronization, governance liaison responsibilities, and cross-repo reading boundaries. See that protocol for governance propagation process details.

---

## 3. Scope

### 3.1 In Scope

✅ **What MUST be layered down** into application repositories:
- Mandatory directory structure
- Required baseline files
- Governance version tracking
- PR gate workflows
- Agent recruitment definitions
- Schemas and policies (referenced or copied)
- Repository initialization evidence
- Commissioning evidence structure

✅ **How layer-down is validated**:
- Initialization Completeness Gate requirements
- Repository alignment checklist
- Gap identification for existing repositories

✅ **Application-specific mappings**:
- FM app (maturion-foreman-app) requirements
- SlotMaster requirements
- Generic application repository template

### 3.2 Out of Scope (Absolute)

❌ **NOT in scope**:
- Implementation of layer-down (Repository Seeding agent's role)
- Activation of gates (enforcement agent's role)
- Architecture design (FM's role)
- Build activities (Builder's role)
- Runtime orchestration (FM runtime's role)
- New governance requirements beyond extracting existing canon

---

## 4. Layer-Down Artifact Inventory

### 4.1 Mandatory Directory Structure

**Source**: `REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md` Section 4

All application repositories MUST contain the following directory structure:

```text
<repository-root>/
├── .github/
│   ├── workflows/          # CI/CD workflow definitions (PR gates)
│   └── agents/             # Agent recruitment definitions (custom agent contracts)
├── .architecture/          # Architecture artifacts + initialization evidence
│   ├── commissioning/      # Commissioning evidence (created during commissioning)
│   └── parking-station/    # Enhancement & improvement parking area (MANDATORY)
├── .qa/                    # QA evidence artifacts (created during build)
│   ├── builder/            # Builder QA reports (per BUILDER_FIRST_PR_MERGE_MODEL)
│   ├── gpca/               # Gate-Predictive Compliance Analysis reports (optional)
│   └── evidence/           # Additional QA evidence (test logs, coverage)
├── governance/             # Governance references and policies
│   ├── schemas/            # Governance schemas (references to governance repo)
│   ├── policies/           # Governance policies (references to governance repo)
│   └── GOVERNANCE_VERSION.md  # Governance version tracking (MANDATORY)
├── docs/                   # Documentation
├── .gitignore              # Git ignore patterns (MANDATORY)
├── .env.example            # Environment variable template (MANDATORY)
├── README.md               # Repository purpose and governance (MANDATORY)
└── LICENSE                 # License file (if required by policy)
```

**Rationale**: This structure ensures:
- Governance artifacts have canonical locations
- Evidence can be collected and audited
- PR gates know where to look for compliance artifacts
- No ambiguity about "where does this go?"

---

### 4.2 Mandatory Root Files

**Source**: `REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md` Section 4.2

#### `.gitignore`

**Purpose**: Prevent committing secrets, build artifacts, local configuration

**Mandatory Entries** (Minimum):
```
# Environment variables
.env
.env.local
.env.*.local

# Build artifacts
dist/
build/
.next/
out/

# Dependencies
node_modules/
__pycache__/
*.pyc

# IDE files
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Secrets (additional safety)
secrets/
*.key
*.pem
```

**Extension**: Application-specific entries MAY be added during architecture/build phases.

**Authority**: `REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md` Section 4.2.1

---

#### `.env.example`

**Purpose**: Template for environment variables required by application

**Initial State**: May be minimal during initialization, populated during architecture phase

**Mandatory Format** (After Architecture Phase):
```
# Application Environment Variables
# Copy this file to .env and fill in actual values

# Required Variables
VARIABLE_NAME=example_value  # Purpose: Description of what this controls

# Optional Variables (with defaults)
OPTIONAL_VARIABLE=default_value  # Purpose: Description

# Platform-Specific Variables
PLATFORM_VAR=  # Purpose: Provider-specific setting

# Secrets (NEVER commit actual values)
API_SECRET=your_secret_here  # Purpose: Authentication secret
```

**Validation**: `ENVIRONMENT_PROVISIONING_PROCESS.md` (referenced in repository initialization protocol)

**Authority**: `REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md` Section 4.2.2

---

#### `README.md`

**Purpose**: Repository purpose, governance references, getting started guide

**Mandatory Sections** (Minimum):
```markdown
# [Repository Name]

## Purpose
[One paragraph describing what this application does]

## Governance
This repository follows canonical governance from the Maturion Governance Centre.

- Governance Version: [version number]
- See `governance/GOVERNANCE_VERSION.md` for details

## Status
[Current lifecycle status: Initialized / Architecture Phase / Build Phase / Commissioned / Activated]

## Getting Started
[Instructions for local development — populated during build phase]

## Architecture
[Reference to architecture documents in `.architecture/` — populated during architecture phase]

## License
[License information — if applicable]
```

**Authority**: `REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md` Section 4.2.3

---

#### `governance/GOVERNANCE_VERSION.md`

**Purpose**: Track governance version in use by this repository

**Mandatory Content**:
```markdown
# Governance Version

**Version**: v1.0  
**Governance Repository**: https://github.com/MaturionISMS/maturion-foreman-governance  
**Last Updated**: [ISO 8601 timestamp]  
**Authority**: Johan Ras

## Canonical Governance Documents

This repository follows canonical governance from the Maturion Governance Centre.

Required canonical references:
- GOVERNANCE_PURPOSE_AND_SCOPE.md
- COMPLIANCE_AND_STANDARDS_GOVERNANCE.md
- BUILD_PHILOSOPHY.md
- ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md
- SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md
- REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md
- BUILDER_FIRST_PR_MERGE_MODEL.md (for builder-driven repos)
- AGENT_ROLE_GATE_APPLICABILITY.md
- PR_GATE_EVALUATION_AND_ROLE_PROTOCOL.md
- MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md

## Application-Specific Governance

[List any application-specific governance extensions here — typically none at initialization]
```

**Authority**: `REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md` Section 4.1.4

---

### 4.3 Mandatory Initialization Evidence

**Source**: `REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md` Section 7.2

**Location**: `.architecture/REPOSITORY_INITIALIZATION_EVIDENCE.md`

**Purpose**: Auditable record that repository initialization was completed correctly

**Mandatory Content**:
```markdown
# Repository Initialization Evidence

## Repository Information
- **Name**: [Repository Name]
- **URL**: [Repository URL]
- **Purpose**: [One sentence describing repository purpose]
- **Creation Date**: [ISO 8601 timestamp]

## Initialization Details
- **Initialization Timestamp**: [ISO 8601 timestamp]
- **Governance Version**: [version number]
- **Governance Repository**: https://github.com/MaturionISMS/maturion-foreman-governance
- **Initialization Protocol Version**: v1.0

## Human Authorization
- **Authorized By**: Johan Ras
- **Authorization Date**: [ISO 8601 timestamp]
- **Authorization Method**: [PR review / Issue comment / Direct communication]

## Initialization Checklist

### Directory Structure
- [x] `.github/workflows/` created
- [x] `.github/agents/` created
- [x] `.architecture/` created
- [x] `.qa/` created
- [x] `governance/` created
- [x] `docs/` created

### Baseline Files
- [x] `.gitignore` created
- [x] `.env.example` created
- [x] `README.md` created
- [x] `LICENSE` created (if required)
- [x] `governance/GOVERNANCE_VERSION.md` created

### Governance Seeding
- [x] Governance schemas referenced/copied
- [x] Governance policies referenced/copied
- [x] CI gates configured
- [x] Agent contracts prepared (if applicable)

### Evidence and Audit
- [x] This evidence file created
- [x] Initialization timestamp recorded
- [x] Governance version recorded
- [x] Human authorization received

## Completion Confirmation
- **Repository State**: REPOSITORY_INITIALIZED
- **Ready for Architecture Phase**: YES
- **Confirmed By**: Johan Ras
- **Confirmation Date**: [ISO 8601 timestamp]

## Notes
[Any additional notes or context about initialization]
```

**Validation**: `INITIALIZATION_COMPLETENESS_GATE.md`

**Authority**: `REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md` Section 7.2

---

### 4.4 Optional Components (Future)

**Not required for initial repository initialization**, but part of complete governance layer-down model:

#### Commissioning Evidence (Post-Build)
- `.architecture/commissioning/COMMISSIONING_EVIDENCE.md`
- Source: `COMMISSIONING_EVIDENCE_MODEL.md`
- Created: During commissioning phase (after build complete)

#### Application Startup Requirements (Post-Architecture)
- `APP_STARTUP_REQUIREMENTS.md` (root or `.architecture/`)
- Source: `APP_STARTUP_REQUIREMENTS_DECLARATION.md`
- Created: During architecture phase (before build)

#### Builder QA Artifacts (Post-Build)
- `.qa/builder/BUILD_QA_REPORT.json`
- `.qa/builder/GOVERNANCE_COMPLIANCE_REPORT.json`
- `.qa/builder/SUMMARY.md`
- Source: `BUILDER_FIRST_PR_MERGE_MODEL.md`, `BUILD_PHILOSOPHY.md`
- Created: During build phase (per Builder handover)

#### Parking Station (Initialization)
- `.architecture/parking-station/README.md`
- Source: `governance/templates/APPLICATION_PARKING_STATION_README.template.md`
- Created: During repository initialization
- Purpose: Enhancement and improvement capture per `MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md`

---

## 5. PR Gate & Merge Control Requirements

### 5.1 Gate Philosophy

**Source**: `PR_GATE_EVALUATION_AND_ROLE_PROTOCOL.md`, `AGENT_ROLE_GATE_APPLICABILITY.md`

**Core Principle**: Gates are **enforcement mechanisms**, not discovery tools. Gates verify compliance was achieved before handover, not discover problems during merge.

**Agent Role is Authoritative**: Gate applicability is determined by **agent role** submitting the PR, not by file paths, workflow triggers, or heuristics.

---

### 5.2 Required PR Gate Workflows

**Source**: `AGENT_ROLE_GATE_APPLICABILITY.md` Section 5, `.github/workflows/README.md`

All application repositories MUST include the following PR gate workflows in `.github/workflows/`:

#### 5.2.1 Governance Compliance Gate

**File**: `.github/workflows/governance-gate.yml`

**Purpose**: Validate governance repository structure integrity

**Validates**:
- Critical governance directories exist
- `governance/GOVERNANCE_VERSION.md` present and valid
- No governance contradictions introduced

**Applies To**: All PRs (all agent roles)

**Source Template**: Governance repo `.github/workflows/governance-gate.yml`

**Authority**: `GOVERNANCE_GATE_CANON.md`

---

#### 5.2.2 Initialization Completeness Gate

**File**: `.github/workflows/initialization-gate.yml`

**Purpose**: Verify repository initialization completeness before architecture/build work begins

**Validates**:
- All mandatory directories exist (per Section 4.1)
- All mandatory files exist (per Section 4.2)
- `.architecture/REPOSITORY_INITIALIZATION_EVIDENCE.md` present and complete
- Human authorization documented in evidence
- Repository state is REPOSITORY_INITIALIZED

**Blocks**: Architecture, build, and execution PRs if RED

**Applies To**: All PRs until initialization complete

**Authority**: `INITIALIZATION_COMPLETENESS_GATE.md`

---

#### 5.2.3 Builder QA Enforcement Gate (Application Repos Only)

**File**: `.github/workflows/builder-qa-enforcement-gate.yml`

**Purpose**: Enforce Builder-First PR Merge Model for builder-submitted PRs

**Validates** (when agent role is `builder`):
- `.qa/builder/BUILD_QA_REPORT.json` present and valid
- `.qa/builder/GOVERNANCE_COMPLIANCE_REPORT.json` present and valid
- `.qa/builder/SUMMARY.md` present
- `build_status == "PASS"`
- `merge_readiness.ready == true`
- `compliance_status == "COMPLIANT"`

**Does NOT Apply To**:
- Governance Administrator PRs (governance work only)
- FM PRs (unless FM acting as builder)
- Repository Seeding PRs (initialization only)

**Source Template**: `governance/templates/workflows/builder-qa-enforcement-gate.yml.template`

**Authority**: `BUILDER_FIRST_PR_MERGE_MODEL.md`, `AGENT_ROLE_GATE_APPLICABILITY.md`

**Note**: Governance repository itself does NOT use this gate (no application code).

---

#### 5.2.4 PR Scope Control Gate

**File**: `.github/workflows/pr-scope-control-gate.yml`

**Purpose**: Enforce PR scope discipline (prevent large, unfocused PRs)

**Validates**:
- PR has clear, focused scope
- Scope aligns with changed files
- No causality collapse (too many unrelated changes)

**Applies To**: All PRs (all agent roles)

**Authority**: `PR_SCOPE_CONTROL_POLICY.md`, `SCOPE_TO_DIFF_RULE.md`

---

### 5.3 Gate Applicability by Agent Role

**Source**: `AGENT_ROLE_GATE_APPLICABILITY.md` Section 5

**Critical Rule**: Gate applicability is determined by **agent role**, not by file paths or workflow triggers.

#### Builder Agent Gate Requirements

**Identity**: Agents executing build-to-green for application code changes

**Applicable Gates**:
- ✅ Governance Compliance Gate
- ✅ Initialization Completeness Gate (if repository not yet initialized)
- ✅ Builder QA Enforcement Gate
- ✅ PR Scope Control Gate
- ✅ Build-to-Green enforcement (100% GREEN QA, QIEL)
- ✅ Architecture completeness validation
- ✅ All Constitutional Safeguards (CS1-CS6)

**Authority**: `AGENT_ROLE_GATE_APPLICABILITY.md` Section 5.1

---

#### Governance Administrator Agent Gate Requirements

**Identity**: Agents maintaining governance artifacts, schemas, policies

**Applicable Gates**:
- ✅ Governance Compliance Gate
- ✅ PR Scope Control Gate
- ✅ Governance artifact compliance (schemas, policies valid)
- ✅ Governance enforcement alignment (no weakening)
- ✅ Constitutional Safeguards (CS1 for governance files only)

**NOT Applicable**:
- ❌ Builder QA Enforcement Gate
- ❌ Build-to-Green enforcement
- ❌ Architecture artifacts
- ❌ 100% GREEN QA (no code to test)

**Authority**: `AGENT_ROLE_GATE_APPLICABILITY.md` Section 5.2

---

#### FM Agent Gate Requirements

**Identity**: Agents orchestrating builds, managing workflows, enforcing governance

**Applicable Gates**:
- ✅ Governance Compliance Gate
- ✅ PR Scope Control Gate
- ✅ FM orchestration contracts
- ✅ Learning promotion rules
- ✅ Failure promotion rules
- ✅ Constitutional Safeguards (CS1 for FM files, CS3-CS6)

**Conditionally Applicable**:
- ✅ Builder gates IF FM is acting as builder (producing application code)

**Authority**: `AGENT_ROLE_GATE_APPLICABILITY.md` Section 5.3

---

#### Repository Seeding Agent Gate Requirements

**Identity**: Agents performing repository initialization and structure creation

**Applicable Gates**:
- ✅ Initialization Completeness Gate (validation after seeding)
- ✅ Initialization evidence validation
- ✅ Governance version tracking validation

**NOT Applicable**:
- ❌ Builder QA Enforcement Gate
- ❌ Build-to-Green enforcement
- ❌ Architecture artifacts
- ❌ FM-specific gates

**Authority**: `AGENT_ROLE_GATE_APPLICABILITY.md` Section 5.4

---

### 5.4 Gate Evaluation Process

**Source**: `PR_GATE_EVALUATION_AND_ROLE_PROTOCOL.md` Section 6

**Step-by-step gate evaluation**:

1. **Agent Role Detection** (Section 6.1)
   - Explicit agent declaration: `AGENT_ROLE: builder` in PR description
   - Agent contract reference: Agent references `.agent` contract file
   - Repository context: Governance repo infers role from changed files
   - Error if role cannot be determined

2. **Applicable Gate Selection** (Section 6.2)
   - Load agent role gate mapping from `AGENT_ROLE_GATE_APPLICABILITY.md`
   - Select gates applicable to detected role
   - Exclude inapplicable gates

3. **Gate Evaluation** (Section 6.3)
   - For each applicable gate: evaluate requirements
   - Record PASS/FAIL/ERROR with details

4. **Overall Status Determination** (Section 6.4)
   - PASS: All applicable gates passed
   - FAIL: One or more gates failed (agent must correct)
   - ERROR: Gate evaluation encountered error (governance defect, escalate)

5. **Result Communication** (Section 6.5)
   - Clear message indicating agent role, gates evaluated, next steps

**Authority**: `PR_GATE_EVALUATION_AND_ROLE_PROTOCOL.md`

---

### 5.5 Stuck PR Handling

**Source**: `PR_GATE_EVALUATION_AND_ROLE_PROTOCOL.md` Section 9

**Stuck PR Definition**: PR is stuck when gate enforcement contradicts canonical governance, or agent cannot satisfy requirements despite complying with canon.

**Stuck PR is NOT**: Builder QA failures due to implementation defects, test failures, lint errors, or build errors.

**Response Protocol** (when stuck):
1. HALT execution immediately
2. Classify stuck reason: governance defect vs. implementation defect
3. Escalate to Governance Administrator with complete information
4. AWAIT governance resolution

**Prohibited When Stuck**:
- ❌ Enter indefinite retry/rebuild loops
- ❌ Disable gates to force merge
- ❌ Create placeholder artifacts to satisfy gates
- ❌ Modify governance to weaken enforcement

**Authority**: `PR_GATE_EVALUATION_AND_ROLE_PROTOCOL.md` Section 9

---

## 6. Post-Build Startup & Commissioning Model

### 6.1 Commissioning Phases

**Source**: `SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md` Section 3

**Universal Commissioning Phases** (apply to all applications):

```
[BUILD COMPLETE] 
    ↓
[INSTALLED] — Application deployed to target environment
    ↓ (Human Checkpoint: Johan authorizes validation)
[VALIDATED] — Technical, security, operational, compliance validation complete
    ↓ (Human Checkpoint: Johan authorizes commissioning)
[COMMISSIONED] — Ready for activation, awaiting authorization
    ↓ (Human Checkpoint: Johan authorizes activation)
[ACTIVATED] — Application authorized to process production workloads
```

**Key Distinction**: 
- **Activation** = State transition (one-time human authorization)
- **Execution** = Continuous operation (ongoing runtime behavior)

**Authority**: `SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md`

---

### 6.2 Mandatory Validation Before Each Phase

**Source**: `SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md` Section 6

#### Pre-Validation (Before VALIDATED Phase)

**Required Checks**:
- [ ] Application artifacts deployed to target environment
- [ ] Infrastructure provisioned and accessible
- [ ] Configuration files present and syntactically valid
- [ ] Dependencies available (libraries, services, databases)
- [ ] Environment variables set (per `ENVIRONMENT_PROVISIONING_PROCESS.md`)
- [ ] No blocking deployment errors

**Evidence Required**: Deployment logs, infrastructure status, configuration checksums, dependency verification

---

#### Pre-Commissioning (Before COMMISSIONED Phase)

**Required Checks**:
- [ ] All technical validation activities passed
- [ ] All security validation activities passed
- [ ] All operational validation activities passed
- [ ] All compliance validation activities passed
- [ ] No unresolved failures or warnings
- [ ] All validation evidence documented

**Evidence Required**: Validation reports per category (technical, security, operational, compliance)

---

#### Pre-Activation (Before ACTIVATED Phase)

**Required Checks**:
- [ ] Application is in COMMISSIONED state
- [ ] All pre-activation checks passed
- [ ] Human authorization received (Johan)
- [ ] No blocking operational concerns
- [ ] Activation conditions satisfied

**Evidence Required**: Commissioning evidence, pre-activation checklist, human authorization record

**Authority**: `SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md` Section 6

---

### 6.3 Application-Specific Startup Requirements

**Source**: `APP_STARTUP_REQUIREMENTS_DECLARATION.md`

Each application MUST declare its specific commissioning requirements in:

**Location**: `APP_STARTUP_REQUIREMENTS.md` (root or `.architecture/`)

**Purpose**: Define application-specific validation checks, human confirmations, evidence requirements

**Mandatory Sections**:
- Application information (name, ID, type, deployment target, risk profile)
- Purpose
- Commissioning phase requirements (per universal phases)
- Human authorization checkpoints
- Validation criteria per phase
- Evidence requirements
- Success/failure criteria

**Authority**: `APP_STARTUP_REQUIREMENTS_DECLARATION.md`

---

### 6.4 UI-Governed Activation Checkpoints

**Source**: `SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md` Section 5

**Human Authority Checkpoints** (UI-driven):

1. **Installation → Validation**: "Is installation complete and ready for validation?"
2. **Validation → Commissioning**: "Is validation successful and application ready for commissioning?"
3. **Commissioning → Activation**: "Is application authorized to activate and execute production workloads?" (MOST CRITICAL)
4. **Activation → Deactivation**: "Should application be deactivated?"

**Checkpoint Requirements**:
- Explicit human (Johan) authorization required
- Authorization method documented (UI click, API call, command)
- Authorization timestamp recorded
- No auto-activation permitted

**Authority**: `SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md` Section 5.2

---

### 6.5 Prohibition of Auto-Activation

**Source**: `SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md` Section 8

**Critical Rule**: Applications MUST NOT self-activate without explicit human authorization.

**Prohibited Auto-Activation Patterns**:
- ❌ Application self-activates upon deployment
- ❌ CI/CD pipeline activates application after successful build
- ❌ Platform automatically activates application upon scaling
- ❌ Time-based activation without human approval
- ❌ Event-triggered activation without human-in-the-loop

**Required**: Application must implement activation gate mechanism (configuration flag, activation endpoint, external service check)

**Validation**: Architecture must document activation gate; validation phase must verify no auto-activation

**Authority**: `SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md` Section 8

---

### 6.6 Memory Release Controls (Progressive Activation)

**Source**: `SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md`, `ACTIVATION_STATE_MODEL.md`

**Progressive Activation Model**: Applications transition through explicit states with human authorization gates.

**Memory Release**: Application capabilities/features remain INACTIVE until evidence is recorded and human authorization provided.

**Key Principle**: Deployment ≠ Activation. Code presence ≠ Operational status. Configuration ≠ Commissioned status.

**Enforcement**: Activation gates check for evidence presence. Missing evidence blocks state transitions.

**Authority**: `COMMISSIONING_EVIDENCE_MODEL.md` Section 3.2

---

### 6.7 Evidence/Audit Expectations

**Source**: `COMMISSIONING_EVIDENCE_MODEL.md`, `SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md` Section 7

**Audit Trail Requirements** (Per Phase):

#### INSTALLED Phase Evidence
- Deployment timestamp (ISO 8601)
- Deployment target identifier
- Deployment method
- Deployed artifact identifier (commit SHA, version, build ID)
- Human confirmation of installation completion

#### VALIDATED Phase Evidence
- Validation start/completion timestamps
- Technical, security, operational, compliance validation results
- Overall validation status (PASS/FAIL)
- Human acceptance of validation

#### COMMISSIONED Phase Evidence
- Commissioning timestamp
- Pre-activation checklist (completed)
- Operational readiness declaration
- Human authorization for activation (pending)

#### ACTIVATED Phase Evidence
- Activation timestamp
- Human authorization record (Johan's explicit approval)
- Activation method
- Initial execution status
- Activation confirmation

**Evidence Location**: `.architecture/commissioning/` directory

**Authority**: `SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md` Section 7, `COMMISSIONING_EVIDENCE_MODEL.md`

---

## 7. Repo Alignment Checklist

### 7.1 Purpose

This checklist provides a **step-by-step process** for applying governance layer-down requirements to an application repository.

Use this checklist to:
- Initialize a new repository
- Audit an existing repository for governance compliance
- Remediate gaps in governance structure

---

### 7.2 Initialization Checklist (New Repositories)

**Source**: `REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md` Section 7.1

#### Phase 1: Repository Created
- [ ] Repository exists in GitHub
- [ ] Repository name follows Maturion naming conventions
- [ ] Initial branch created (`main`)
- [ ] Human authorization received (Johan) to begin initialization

#### Phase 2: Governance Seeding
- [ ] Create mandatory directory structure (Section 4.1)
- [ ] Create `.gitignore` with mandatory entries (Section 4.2)
- [ ] Create `.env.example` (minimal initially)
- [ ] Create `README.md` with mandatory sections (Section 4.2)
- [ ] Create `LICENSE` (if required)
- [ ] Create `governance/GOVERNANCE_VERSION.md` (Section 4.2)
- [ ] Create `.architecture/REPOSITORY_INITIALIZATION_EVIDENCE.md` (Section 4.3)
- [ ] Configure baseline CI/CD workflows (Section 5.2)
- [ ] Copy agent contracts to `.github/agents/` (if applicable)
- [ ] Record initialization timestamp
- [ ] Record governance version used
- [ ] Document human authorization in evidence

#### Phase 3: Repository Initialized
- [ ] All mandatory directories exist
- [ ] All mandatory files created
- [ ] Initialization evidence complete
- [ ] Human authorization received (Johan) confirming initialization
- [ ] Repository ready for architecture phase

**Validation**: `INITIALIZATION_COMPLETENESS_GATE.md` validates this checklist

---

### 7.3 Audit Checklist (Existing Repositories)

Use this checklist to audit an existing repository for governance compliance:

#### Directory Structure Audit
- [ ] `.github/workflows/` exists
- [ ] `.github/agents/` exists
- [ ] `.architecture/` exists
- [ ] `.qa/` exists (with subdirectories: `builder/`, `gpca/`, `evidence/`)
- [ ] `governance/` exists (with subdirectories: `schemas/`, `policies/`)
- [ ] `docs/` exists

#### Root Files Audit
- [ ] `.gitignore` exists and contains mandatory entries
- [ ] `.env.example` exists
- [ ] `README.md` exists with mandatory sections
- [ ] `LICENSE` exists (if required)
- [ ] `governance/GOVERNANCE_VERSION.md` exists

#### Initialization Evidence Audit
- [ ] `.architecture/REPOSITORY_INITIALIZATION_EVIDENCE.md` exists
- [ ] Evidence file is complete (all sections filled)
- [ ] Human authorization is documented
- [ ] Governance version is recorded

#### PR Gate Workflow Audit
- [ ] `governance-gate.yml` exists
- [ ] `initialization-gate.yml` exists
- [ ] `builder-qa-enforcement-gate.yml` exists (if application repo)
- [ ] `pr-scope-control-gate.yml` exists
- [ ] Gates implement agent-role-aware evaluation

#### Commissioning Structure Audit (If Post-Build)
- [ ] `.architecture/commissioning/` directory exists
- [ ] `APP_STARTUP_REQUIREMENTS.md` exists
- [ ] Commissioning evidence documented (if commissioned)

---

### 7.4 Remediation Checklist (Gap Closure)

If audit reveals gaps, use this checklist to remediate:

#### Missing Directory Structure
- [ ] Create missing directories
- [ ] Update `.gitignore` to exclude build artifacts from new directories
- [ ] Document remediation in `.architecture/REPOSITORY_INITIALIZATION_EVIDENCE.md` (append notes)

#### Missing Root Files
- [ ] Create missing files following templates in Section 4.2
- [ ] Populate with required content
- [ ] Commit and request review

#### Missing PR Gates
- [ ] Copy gate templates from `governance/templates/workflows/`
- [ ] Configure gate for repository-specific context
- [ ] Test gate evaluation on sample PR
- [ ] Deploy gate workflow

#### Missing Initialization Evidence
- [ ] Create `.architecture/REPOSITORY_INITIALIZATION_EVIDENCE.md` retroactively
- [ ] Mark as "Retroactive Initialization" in notes
- [ ] Document actual initialization date (estimate if unknown)
- [ ] Request human authorization (Johan) for retroactive initialization

#### Post-Remediation
- [ ] Validate repository with Initialization Completeness Gate
- [ ] Document gaps identified and closed
- [ ] Update governance changelog
- [ ] Request human confirmation of remediation completion

---

## 8. FM + SlotMaster Mapping

### 8.1 FM App (maturion-foreman-app)

**Repository**: `maturion-foreman-app`

**Purpose**: Foreman orchestration application for managing builds, workflows, and governance enforcement

**Status**: To be assessed against this contract

#### Current State Assessment (Placeholder)

**Structure Alignment**:
- Directory structure: [TO BE ASSESSED]
- Root files: [TO BE ASSESSED]
- Initialization evidence: [TO BE ASSESSED]
- PR gates: [TO BE ASSESSED]

#### Gaps Identified (Placeholder)

**Missing Components**:
- [Gap 1: Description of missing component]
- [Gap 2: Description of missing component]
- [Gap 3: Description of missing component]

**Remediation Required**:
- [ ] [Action item 1]
- [ ] [Action item 2]
- [ ] [Action item 3]

**Follow-Up Issues**:
- [Issue ID]: [Issue title for gap closure]
- [Issue ID]: [Issue title for gap closure]

**Note**: Detailed assessment to be performed by Governance Administrator agent post-contract approval.

---

### 8.2 SlotMaster

**Repository**: `slotmaster` (assumed name)

**Purpose**: [To be defined based on SlotMaster purpose]

**Status**: To be assessed against this contract

#### Current State Assessment (Placeholder)

**Structure Alignment**:
- Directory structure: [TO BE ASSESSED]
- Root files: [TO BE ASSESSED]
- Initialization evidence: [TO BE ASSESSED]
- PR gates: [TO BE ASSESSED]

#### Gaps Identified (Placeholder)

**Missing Components**:
- [Gap 1: Description of missing component]
- [Gap 2: Description of missing component]
- [Gap 3: Description of missing component]

**Remediation Required**:
- [ ] [Action item 1]
- [ ] [Action item 2]
- [ ] [Action item 3]

**Follow-Up Issues**:
- [Issue ID]: [Issue title for gap closure]
- [Issue ID]: [Issue title for gap closure]

**Note**: Detailed assessment to be performed by Governance Administrator agent post-contract approval.

---

### 8.3 Assessment Methodology

**Process for assessing existing repositories**:

1. **Scan Repository Structure**
   - Clone repository
   - List all top-level directories
   - Compare against Section 4.1 (Mandatory Directory Structure)
   - Record missing directories

2. **Scan Root Files**
   - List all root-level files
   - Compare against Section 4.2 (Mandatory Root Files)
   - Validate content of present files against templates
   - Record missing or incomplete files

3. **Scan PR Workflows**
   - List all `.github/workflows/*.yml` files
   - Compare against Section 5.2 (Required PR Gate Workflows)
   - Validate workflow logic implements agent-role-aware evaluation
   - Record missing or non-compliant gates

4. **Scan Initialization Evidence**
   - Check for `.architecture/REPOSITORY_INITIALIZATION_EVIDENCE.md`
   - Validate evidence completeness against Section 4.3
   - Check for human authorization documentation
   - Record gaps

5. **Scan Commissioning Structure** (if post-build)
   - Check for `.architecture/commissioning/` directory
   - Check for `APP_STARTUP_REQUIREMENTS.md`
   - Validate commissioning evidence if present
   - Record gaps

6. **Generate Gap Report**
   - Summarize findings per category
   - Prioritize gaps by criticality
   - Recommend remediation actions
   - Create follow-up issues

---

## 9. Compliance and Audit

### 9.1 Compliance Validation

**Repository is compliant with this contract when**:

- ✅ All mandatory directories exist (Section 4.1)
- ✅ All mandatory root files exist and are complete (Section 4.2)
- ✅ Initialization evidence is complete and authorized (Section 4.3)
- ✅ All required PR gates are configured (Section 5.2)
- ✅ Gates implement agent-role-aware evaluation (Section 5.3)
- ✅ Commissioning structure is present (if post-build) (Section 6)
- ✅ Audit trail is complete and accessible (Section 6.7)

**Validation Method**: Run Initialization Completeness Gate (Section 5.2.2)

**Validation Frequency**:
- New repositories: Before architecture phase begins
- Existing repositories: Quarterly audit
- On-demand: When governance changes or issues identified

---

### 9.2 Standards Alignment

This layer-down contract aligns with:

| Standard | Requirement | Alignment |
|----------|-------------|-----------|
| **ISO 27001** (Information Security Management) | A.12.1.1 (Documented operating procedures) | Repository initialization is documented procedure |
| **ISO 27001** | A.12.1.2 (Change management) | Initialization is first step in lifecycle change control |
| **ISO 27001** | A.14.2.1 (Secure development policy) | Governance seeding establishes secure development foundation |
| **NIST CSF** | ID.AM-1 (Asset inventory) | Repository registry provides asset inventory |
| **NIST CSF** | ID.GV-1 (Information security policy established) | Governance seeding establishes policy |
| **NIST CSF** | PR.IP-1 (Baseline configuration maintained) | Repository structure is baseline configuration |
| **NIST CSF** | PR.IP-2 (System development lifecycle managed) | Initialization is first phase of SDLC |

**Authority**: `COMPLIANCE_AND_STANDARDS_GOVERNANCE.md`

---

## 10. Success Criteria

This contract succeeds when:

- ✅ **Single authoritative specification exists** for governance layer-down
- ✅ **FM and SlotMaster have clear alignment delta** (current state vs. requirements)
- ✅ **No ambiguity** about what "properly governed repository" means
- ✅ **Initialization checklist is explicit and actionable**
- ✅ **PR gate requirements are clear and role-specific**
- ✅ **Commissioning model is documented and auditable**
- ✅ **Follow-up issues identified** for implementation (but not implemented in this contract)
- ✅ **No implementation has occurred** (planning and assurance only)

---

## 11. Integration with Other Governance Artifacts

This contract integrates with and references:

| Document | Integration Point |
|----------|------------------|
| **REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md** | Mandatory directory structure, initialization phases, evidence requirements |
| **SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md** | Commissioning phases, human checkpoints, audit trail requirements |
| **INITIALIZATION_COMPLETENESS_GATE.md** | Validation of repository initialization completeness |
| **AGENT_ROLE_GATE_APPLICABILITY.md** | Gate applicability by agent role |
| **PR_GATE_EVALUATION_AND_ROLE_PROTOCOL.md** | Gate evaluation process, stuck PR handling |
| **APP_STARTUP_REQUIREMENTS_DECLARATION.md** | Application-specific commissioning requirements |
| **COMMISSIONING_EVIDENCE_MODEL.md** | Evidence requirements and audit trail |
| **BUILD_PHILOSOPHY.md** | Build-to-Green, One-Time Build Law |
| **BUILDER_FIRST_PR_MERGE_MODEL.md** | Builder QA enforcement |
| **GOVERNANCE_COMPLETENESS_MODEL.md** | Governance enforcement semantics |

---

## 12. Changelog

### v1.0.0 (2025-12-29)

**Status**: Initial Release  
**Authority**: Johan Ras  
**Trigger**: Issue GOV-LAYERDOWN-01

**Summary**: Created single canonical layer-down contract synthesizing requirements from all relevant canonical governance documents.

**Key Components Defined**:
- Mandatory directory structure (Section 4.1)
- Mandatory root files (Section 4.2)
- Initialization evidence requirements (Section 4.3)
- PR gate requirements and role applicability (Section 5)
- Commissioning and activation model (Section 6)
- Repository alignment checklist (Section 7)
- FM + SlotMaster mapping placeholders (Section 8)

**Effect**: Governance layer-down requirements are now explicit, unambiguous, and auditable. Application repositories have clear specification for governance compliance.

---

**End of GOVERNANCE LAYERDOWN CONTRACT**

---

**Document Metadata**:
- Document ID: GOVERNANCE_LAYERDOWN_CONTRACT_V1.0
- Authority: Canonical Governance Standard
- Synthesizes Requirements From: 10+ canonical governance documents (see Section 2)
- Enforcement: Initialization Completeness Gate + Governance Administrator + Human Authority
- Next Steps: Assess FM app and SlotMaster against this contract, create remediation issues
