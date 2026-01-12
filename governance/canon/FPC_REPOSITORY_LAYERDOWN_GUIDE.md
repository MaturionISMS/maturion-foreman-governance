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
| **AGENT_FILE_SCHEMA.md** | Defines repository `.agent` file structure and requirements |
| **AGENT_FILE_BINDING_REQUIREMENTS.md** | Defines mandatory and optional bindings for `.agent` files |
| **AGENT_FILE_VALIDATION.md** | Defines validation process for `.agent` files |
| **AGENT_FILE_MAINTENANCE.md** | Defines maintenance protocol for `.agent` files |

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

#### Execution Bootstrap Protocol (MANDATORY)

Before declaring Phase 1 complete:

1. ✅ **Create Actual Artifacts** — Execute mkdir commands, do not just document intent
2. ✅ **Execute/Verify Locally** — Run `ls -la` or `tree` to verify all directories exist
3. ✅ **Capture Output** — Save terminal output showing directory creation success
4. ✅ **Validate Preflight** — Check all gates triggered by directory structure changes
5. ✅ **Attach PREHANDOVER_PROOF** — Include in PR description (see template)
6. ✅ **Declare Complete** — ONLY after execution GREEN locally

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`  
**Template**: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`

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

#### Execution Bootstrap Protocol (MANDATORY)

Before declaring Phase 2 complete:

1. ✅ **Create Actual Artifacts** — Create GOVERNANCE_ALIGNMENT.md and INITIALIZATION_EVIDENCE.md files
2. ✅ **Execute/Verify Locally** — Run `cat` or `ls -la` to verify files exist and contain required content
3. ✅ **Capture Output** — Save terminal output showing file creation and content validation
4. ✅ **Validate Preflight** — Check all gates triggered by governance file creation
5. ✅ **Attach PREHANDOVER_PROOF** — Include in PR description (see template)
6. ✅ **Declare Complete** — ONLY after execution GREEN locally

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`  
**Template**: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`

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

#### Execution Bootstrap Protocol (MANDATORY)

Before declaring Phase 3 complete:

1. ✅ **Create Actual Artifacts** — Copy workflow files to `.github/workflows/`, do not just plan to copy
2. ✅ **Execute/Verify Locally** — Run `yamllint` on all workflow files to validate syntax
3. ✅ **Capture Output** — Save yamllint output showing all workflows are syntactically valid
4. ✅ **Validate Preflight** — Check all gates triggered by workflow file changes
5. ✅ **Attach PREHANDOVER_PROOF** — Include in PR description (see template)
6. ✅ **Declare Complete** — ONLY after execution GREEN locally

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`  
**Template**: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`

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

**Schema**: See `governance/schemas/AGENT_FILE_SCHEMA.md` in canonical governance for complete specification.

**Binding Requirements**: See `governance/canon/AGENT_FILE_BINDING_REQUIREMENTS.md` for mandatory bindings based on repository type.

**Template**: See `maturion-foreman-governance/.agent` as reference.

**Must Include** (per AGENT_FILE_SCHEMA.md):
- `id`: Repository identifier
- `description`: Repository purpose
- `governance`: Canonical governance binding with all mandatory bindings for repository type
- `agents` or `agent`: Agent roster declaration
- `scope`: Repository boundaries (allowed/restricted/escalation-required paths)
- `capabilities`: What capabilities exist in repository
- `constraints`: Mandatory constraints (governance_interpretation: forbidden, etc.)
- `enforcement`: Enforcement model (halt_and_escalate)

**Mandatory Bindings** (consult AGENT_FILE_BINDING_REQUIREMENTS.md):

**Tier-0 (ALL repositories)**:
- `governance-purpose-scope`: GOVERNANCE_PURPOSE_AND_SCOPE.md
- `agent-recruitment`: AGENT_RECRUITMENT.md
- `governance-ripple-model`: GOVERNANCE_RIPPLE_MODEL.md

**Application repositories** (additional):
- `fm-authority-model`: FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md
- `builder-bindings`: BUILDER_CONTRACT_BINDING_CHECKLIST.md
- `execution-bootstrap-protocol`: EXECUTION_BOOTSTRAP_PROTOCOL.md

**Governance repositories** (additional):
- `cross-repo-layer-down`: CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md
- `mandatory-progress-recording`: MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md
- `bootstrap-learnings`: BOOTSTRAP_EXECUTION_LEARNINGS.md

**Action**: Create `.agent` file with repository-specific configuration and all mandatory bindings per repository type.

#### 4.3 Validate .agent File (MANDATORY)

**Validation Authority**: `governance/runbooks/AGENT_FILE_VALIDATION.md`

Before proceeding, validate the `.agent` file:

**Level 1: Syntax Validation**
```bash
# Verify file exists and YAML is parseable
ls -la .agent
yq eval '.id' .agent
```

**Level 2: Schema Compliance**
```bash
# Verify all required fields present
yq eval '.id' .agent
yq eval '.description' .agent
yq eval '.governance.canon.repository' .agent
yq eval '.scope.repository' .agent
yq eval '.capabilities' .agent
yq eval '.constraints' .agent
yq eval '.enforcement' .agent

# Verify exactly one of agent/agents present
HAS_AGENT=$(yq eval 'has("agent")' .agent)
HAS_AGENTS=$(yq eval 'has("agents")' .agent)
# Exactly one must be true (mutual exclusivity)
if [ "$HAS_AGENT" = "true" ] && [ "$HAS_AGENTS" = "false" ]; then
  echo "Valid: Single agent declared"
elif [ "$HAS_AGENT" = "false" ] && [ "$HAS_AGENTS" = "true" ]; then
  echo "Valid: Agent roster declared"
else
  echo "ERROR: Must have exactly one of 'agent' or 'agents'"
fi

# Verify mandatory constraints
yq eval '.constraints.governance_interpretation' .agent  # Must be "forbidden"
yq eval '.constraints.scope_expansion' .agent  # Must be "forbidden"
yq eval '.constraints.build_to_green_only' .agent  # Must be true
```

**Level 3: Semantic Validation**
```bash
# Verify canonical reference accessible
CANON_REPO=$(yq eval '.governance.canon.repository' .agent)
CANON_REF=$(yq eval '.governance.canon.reference' .agent)
git ls-remote "https://github.com/$CANON_REPO" "$CANON_REF"

# Verify all binding paths exist (manual check recommended)
yq eval '.governance.bindings[].path' .agent

# Verify all mandatory bindings present for repository type
# Consult AGENT_FILE_BINDING_REQUIREMENTS.md Section 2-4
yq eval '.governance.bindings[].id' .agent
```

**Level 4: Governance Alignment** (Manual)
- Review `.agent` file for content duplication
- Verify bindings are relevant to repository
- Check consistency with agent contracts

**Validation Outcome**: MUST be PASS before proceeding to next phase.

**Documentation**: Record validation results in `INITIALIZATION_EVIDENCE.md`:
```markdown
## .agent File Validation

**Validation Date**: [DATE]  
**Validation Levels**: 1-4 ALL PASS  
**Schema Version**: 1.0.0  
**Mandatory Bindings**: All present per AGENT_FILE_BINDING_REQUIREMENTS.md  
**Validator**: [NAME]
```

#### Execution Bootstrap Protocol (MANDATORY)

Before declaring Phase 4 complete:

1. ✅ **Create Actual Artifacts** — Create agent contract files and `.agent` file in repository root
2. ✅ **Execute/Verify Locally** — Validate `.agent` file per AGENT_FILE_VALIDATION.md (Levels 1-4 PASS)
3. ✅ **Capture Output** — Save validation output showing all levels pass
4. ✅ **Validate Preflight** — Check all gates triggered by agent contract changes
5. ✅ **Attach PREHANDOVER_PROOF** — Include in PR description with validation evidence
6. ✅ **Declare Complete** — ONLY after execution GREEN locally AND validation PASS

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`  
**Template**: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`  
**Validation**: `governance/runbooks/AGENT_FILE_VALIDATION.md`

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

#### Execution Bootstrap Protocol (MANDATORY)

Before declaring Phase 5 complete:

1. ✅ **Create Actual Artifacts** — Create CANONICAL_SCHEMAS.md and any repository-specific policy files
2. ✅ **Execute/Verify Locally** — Verify schema references are accurate and accessible
3. ✅ **Capture Output** — Save verification showing schema documents exist at referenced locations
4. ✅ **Validate Preflight** — Check all gates triggered by governance policy/schema changes
5. ✅ **Attach PREHANDOVER_PROOF** — Include in PR description (see template)
6. ✅ **Declare Complete** — ONLY after execution GREEN locally

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`  
**Template**: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`

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

#### Execution Bootstrap Protocol (MANDATORY)

Before declaring Phase 6 complete:

1. ✅ **Create Actual Artifacts** — Update INITIALIZATION_EVIDENCE.md with learnings section
2. ✅ **Execute/Verify Locally** — Review BOOTSTRAP_EXECUTION_LEARNINGS.md and recent incidents
3. ✅ **Capture Output** — Document which learnings were reviewed and how applied
4. ✅ **Validate Preflight** — Check all gates triggered by initialization evidence updates
5. ✅ **Attach PREHANDOVER_PROOF** — Include in PR description (see template)
6. ✅ **Declare Complete** — ONLY after execution GREEN locally

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`  
**Template**: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`

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

#### Execution Bootstrap Protocol (MANDATORY)

Before declaring Phase 7 complete:

1. ✅ **Create Actual Artifacts** — Create GOVERNANCE_GATE_MAPPING.md and/or architecture stubs
2. ✅ **Execute/Verify Locally** — Verify mapping document references valid workflow and module paths
3. ✅ **Capture Output** — Save verification showing referenced files exist
4. ✅ **Validate Preflight** — Check all gates triggered by mapping/documentation changes
5. ✅ **Attach PREHANDOVER_PROOF** — Include in PR description (see template)
6. ✅ **Declare Complete** — ONLY after execution GREEN locally

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`  
**Template**: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`

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

#### Execution Bootstrap Protocol (MANDATORY)

Before declaring Phase 8 complete:

1. ✅ **Create Actual Artifacts** — Configure branch protection, create COMMISSIONING_READINESS.md
2. ✅ **Execute/Verify Locally** — Simulate gate validation or create draft test PR to confirm gates execute
3. ✅ **Capture Output** — Save validation results showing all gates would execute correctly
4. ✅ **Validate Preflight** — Confirm all gates enumerated and validation complete
5. ✅ **Attach PREHANDOVER_PROOF** — Include in PR description (see template)
6. ✅ **Declare Complete** — ONLY after execution GREEN locally

**Note**: Phase 8 validation can be done via local simulation (checking gate trigger paths) or a separate draft test PR (not the bootstrap PR itself). The goal is to verify gates will execute correctly before the bootstrap PR is merged.

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`  
**Template**: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`

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

- [ ] `.agent` contract present at repository root
- [ ] `.agent` file validated per AGENT_FILE_VALIDATION.md (Levels 1-4 PASS)
- [ ] All mandatory bindings present per AGENT_FILE_BINDING_REQUIREMENTS.md
- [ ] `.agent` file conforms to AGENT_FILE_SCHEMA.md
- [ ] Agent contracts seeded for applicable roles in `.github/agents/`
- [ ] No contradictions between repository `.agent` and agent contracts
- [ ] Validation results documented in INITIALIZATION_EVIDENCE.md

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

### Issue: .agent file validation fails

**Cause**: Missing required fields, incorrect bindings, or schema violations

**Solution**:
1. Review AGENT_FILE_SCHEMA.md for complete schema specification
2. Run validation per AGENT_FILE_VALIDATION.md (Levels 1-4)
3. Check AGENT_FILE_BINDING_REQUIREMENTS.md for mandatory bindings
4. Fix validation errors per error messages
5. Re-run validation until all levels pass
6. Document validation results in INITIALIZATION_EVIDENCE.md

### Issue: Unclear which bindings are mandatory

**Cause**: Repository type or agent roster unclear

**Solution**:
1. Consult AGENT_FILE_BINDING_REQUIREMENTS.md Section 2 for Tier-0 (ALL repos)
2. Check Section 3 for repository type-specific bindings
3. Check Section 4 for agent role-specific bindings
4. Use decision tree in Section 7 of AGENT_FILE_BINDING_REQUIREMENTS.md
5. When in doubt, include binding (over-specification better than under)

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
5. Seed FM and builder contracts from templates (Phase 4.1)
6. Create `.agent` contract for repository with application-specific bindings (Phase 4.2)
7. Validate `.agent` file per AGENT_FILE_VALIDATION.md (Phase 4.3)
8. Create CANONICAL_SCHEMAS.md referencing governance schemas (Phase 5.1)
9. Review BOOTSTRAP_EXECUTION_LEARNINGS.md and apply (Phase 6)
10. Create GOVERNANCE_GATE_MAPPING.md (Phase 7.1)
11. Configure branch protection (Phase 8.1)
12. Create COMMISSIONING_READINESS.md (Phase 8.2)
13. Validate with test PR (Phase 8.2)

### Example 2: New Governance Repository

**Repository**: `maturion-governance-experimental`  
**Type**: Governance  
**Agents**: Governance Administrator only

**Layer-Down Steps**:
1. Create directory structure (Phase 1)
2. Create GOVERNANCE_ALIGNMENT.md (Phase 2.1)
3. Create INITIALIZATION_EVIDENCE.md (Phase 2.2)
4. Install `governance-gate.yml` and `governance-scope-to-diff-gate.yml` (Phase 3)
5. Seed governance-repo-administrator.agent.md (Phase 4.1)
6. Create `.agent` contract with governance-specific bindings (Phase 4.2)
7. Validate `.agent` file per AGENT_FILE_VALIDATION.md (Phase 4.3)
8. Reference schemas from canonical governance (Phase 5.1)
9. Review learnings (Phase 6)
10. Skip governance gate mapping (not applicable) (Phase 7)
11. Configure branch protection (Phase 8.1)
12. Create COMMISSIONING_READINESS.md (Phase 8.2)
13. Validate with test governance PR (Phase 8.2)

---

## 10. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-11 | Initial FPC guide created as part of governance repository restructuring |
| 1.1.0 | 2026-01-12 | Added .agent file governance artifacts: schema, binding requirements, validation, maintenance protocol |

---

## 11. Related Documents

- `governance/canon/GOVERNANCE_LAYERDOWN_CONTRACT.md` - Artifact inventory
- `governance/canon/CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md` - Version synchronization protocol
- `governance/canon/REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md` - Initialization phases
- `governance/canon/GOVERNANCE_CANON_MANIFEST.md` - Canonical file index
- `governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md` - Latest learnings
- `governance/canon/AGENT_RECRUITMENT.md` - Agent appointment process
- `governance/schemas/AGENT_FILE_SCHEMA.md` - Repository `.agent` file specification
- `governance/canon/AGENT_FILE_BINDING_REQUIREMENTS.md` - Mandatory and optional bindings for `.agent` files
- `governance/runbooks/AGENT_FILE_VALIDATION.md` - Validation process for `.agent` files
- `governance/runbooks/AGENT_FILE_MAINTENANCE.md` - Maintenance protocol for `.agent` files
- `apps/foreman-office-app/mappings/GOVERNANCE_GATE_MAPPING.md` - Example mapping document

---

**This is the single, authoritative entry point for governance layer-down.**

**Command**: "Layer down governance, FPC"

**Result**: New repository fully governed, aligned with latest canonical governance, ready for commissioning.
