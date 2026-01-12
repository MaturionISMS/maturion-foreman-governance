# .agent File Schema and Specification

## Status
**Type**: Canonical Governance Schema — Repository-Level Contract  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-01-12  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Purpose**: Comprehensive specification for repository `.agent` files

---

## 1. Purpose

This document defines the **comprehensive schema and specification** for repository-level `.agent` files.

The `.agent` file is the **constitutional contract** at repository level that:
- Defines the repository's relationship to governance
- Declares agent roster and authority
- Establishes scope boundaries and constraints
- Provides the foundation for all agent legitimacy in the repository

This specification ensures:
- All `.agent` files have consistent structure
- Governance bindings are traceable and verifiable
- Repository authority boundaries are mechanically enforceable
- Cross-repository governance relationships are explicit

**Related Document**: `governance/canon/.agent.schema.md` defines individual agent contract schemas. This document defines the **repository-level** `.agent` file schema.

---

## 2. Scope

This schema applies to:
- The `.agent` file at the root of ALL governed repositories
- Repository-level governance bindings
- Agent roster declarations
- Repository-level scope and authority boundaries

This schema does NOT apply to:
- Individual agent contracts in `.github/agents/` (see `.agent.schema.md` in canon)
- Application-specific configuration files
- Build or deployment configuration

---

## 3. File Location and Format

### 3.1 Location
**REQUIRED**: `.agent` file MUST be at repository root

**Path**: `<repository-root>/.agent`

### 3.2 Format
**REQUIRED**: YAML front matter followed by optional Markdown content

**Structure**:
```yaml
---
# YAML front matter (REQUIRED)
id: <repository-identifier>
description: >
  Repository description
...
---

# Optional Markdown Content
Additional repository-level documentation
```

### 3.3 Encoding
- **UTF-8** encoding required
- **Unix line endings** (LF) preferred
- **No trailing whitespace** on lines (recommended)

---

## 4. Required Top-Level YAML Fields

### 4.1 Identification (`id`)

**Type**: String  
**Required**: YES  
**Format**: Lowercase with hyphens, no spaces  
**Purpose**: Human-readable repository identifier

**Example**:
```yaml
id: maturion-foreman-office-app
```

**Constraints**:
- MUST match repository name or abbreviation
- MUST be unique across organization
- MUST NOT contain special characters except hyphens

### 4.2 Description (`description`)

**Type**: String (multi-line supported with `>`)  
**Required**: YES  
**Purpose**: Brief description of repository purpose and role

**Example**:
```yaml
description: >
  Foreman execution surface for governed application builds.
  Houses FM agent and builder contracts.
```

**Constraints**:
- MUST be 1-3 sentences
- MUST describe repository's role in governance ecosystem
- SHOULD reference key agents or functions

### 4.3 Agent Section (`agent`)

**Type**: Object  
**Required**: NO (only if repository has single primary agent)  
**Purpose**: Declare primary agent for single-agent repositories

**Fields**:
```yaml
agent:
  id: <agent-id>           # String, informational
  class: <agent-class>     # Enum: builder, reviewer, auditor, overseer
  profile: <profile-file>  # String, must reference governance/profiles/
```

**When to use**:
- Governance repositories with single administrator agent
- Specialized repositories with single-purpose agent

**When NOT to use**:
- Application repositories with multiple agents (use `agents` roster instead)
- Repositories with FM + builders (use `agents` roster)

### 4.4 Agents Roster (`agents`)

**Type**: Array of objects  
**Required**: NO (but MUST have either `agent` or `agents`, not both)  
**Purpose**: Declare all agents operating in repository

**Structure**:
```yaml
agents:
  - id: foreman-app
    class: overseer
    contract: .github/agents/ForemanApp-agent.md
    role: execution-authority
  
  - id: ui-builder
    class: builder
    contract: .github/agents/ui-builder.md
    role: ui-implementation
```

**Fields per agent**:
- `id`: Agent identifier (string)
- `class`: Agent class (enum: builder, reviewer, auditor, overseer)
- `contract`: Path to agent contract file (relative to repository root)
- `role`: Brief role description (string)

**Constraints**:
- MUST NOT have both `agent` and `agents` sections
- MUST have at least one agent declared
- All contract paths MUST exist
- All contracts MUST conform to `.agent.schema.md` in canon

### 4.5 Governance Section (`governance`)

**Type**: Object  
**Required**: YES  
**Purpose**: Bind repository to canonical governance source

**Structure**:
```yaml
governance:
  canon:
    repository: <org/repo>    # Canonical governance repo
    path: /governance/canon   # Path to canon within repo
    reference: <branch|tag>   # Git reference (branch, tag, or commit)
  
  bindings:                   # Optional but recommended
    - id: <binding-id>
      path: governance/canon/<document>.md
      role: <binding-role>
```

**Required Sub-fields**:
- `canon.repository`: Source of canonical governance (format: `org/repo`)
- `canon.path`: Path to canon directory in governance repository
- `canon.reference`: Git reference (branch name, tag, or commit SHA)

**Optional Sub-fields**:
- `bindings`: Array of canonical documents this repository explicitly binds to
  - `id`: Binding identifier (string)
  - `path`: Path to canonical document (relative to governance repo root)
  - `role`: Role of binding (e.g., "supreme-authority-and-scope")

**Example**:
```yaml
governance:
  canon:
    repository: MaturionISMS/maturion-foreman-governance
    path: /governance/canon
    reference: main
  
  bindings:
    - id: governance-purpose-scope
      path: governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md
      role: supreme-authority-and-scope
    - id: agent-recruitment
      path: governance/canon/AGENT_RECRUITMENT.md
      role: agent-legitimacy-and-authority
```

**Constraints**:
- Canonical governance repository MUST be accessible
- All binding paths MUST exist in canonical governance repository
- Bindings MUST NOT duplicate content, only reference
- Repository MUST track governance version in `governance/alignment/GOVERNANCE_ALIGNMENT.md`

### 4.6 Cross-References Section (`cross_references`)

**Type**: Object  
**Required**: NO (recommended for multi-repo awareness)  
**Purpose**: Declare cross-repository relationships for read-only awareness

**Structure**:
```yaml
cross_references:
  repos:
    - id: <repo-id>
      repository: <org/repo>
      role: <relationship-role>
  
  agents:
    - id: <agent-id>
      repository: <org/repo>
      path: <path-to-agent-contract>
      role: <agent-relationship-role>
```

**Use Cases**:
- Governance repository referencing application repositories
- Application repositories referencing governance repository
- FM agent referencing builder agents in other repositories

**Constraints**:
- Cross-references are **read-only awareness only**
- MUST NOT grant write authority to other repositories
- MUST NOT enable remote agent execution
- Used for governance ripple awareness and documentation

### 4.7 Scope Section (`scope`)

**Type**: Object  
**Required**: YES  
**Purpose**: Define repository boundaries and path restrictions

**Structure**:
```yaml
scope:
  repository: <org/repo>              # This repository
  
  allowed_paths:                      # Paths agents MAY modify
    - "path/to/allowed/**"
    - "another/path/**"
  
  restricted_paths:                   # Paths requiring escalation or forbidden
    - ".agent"
    - ".github/agents/**"
  
  escalation_required_paths:          # Paths requiring explicit authority
    - ".github/workflows/**"
    - "governance/CONSTITUTION.md"
```

**Required Sub-fields**:
- `repository`: This repository's identifier (format: `org/repo`)
- `allowed_paths`: Glob patterns for paths agents may modify
- `restricted_paths`: Glob patterns for protected paths
- `escalation_required_paths`: Glob patterns requiring escalation

**Mandatory Restricted Paths**:
- `.agent` MUST always be in `restricted_paths`
- `.github/agents/**` MUST always be in `restricted_paths` OR `escalation_required_paths`
- `governance/**` SHOULD be in `restricted_paths` for non-governance repos

**Constraints**:
- Paths use glob patterns (e.g., `**` for recursive, `*` for single level)
- Overlapping paths are permitted if escalation rules are stricter
- Agents MUST halt and escalate on restricted path violations
- CI gates SHOULD enforce scope violations

### 4.8 Capabilities Section (`capabilities`)

**Type**: Object  
**Required**: YES  
**Purpose**: Declare what capabilities exist in repository (not permissions)

**Structure**:
```yaml
capabilities:
  execute_changes: <boolean>           # Can agents make code changes
  modify_tests: <boolean>              # Can agents modify test files
  modify_migrations: <boolean>         # Can agents modify DB migrations
  mechanical_fixes: <boolean>          # Can agents make mechanical fixes
  read_only: <boolean>                 # Repository is read-only
  advisory_only: <boolean>             # Agents provide advice only
```

**Common Patterns**:

**Application Repository (FM + Builders)**:
```yaml
capabilities:
  execute_changes: true
  modify_tests: true
  modify_migrations: false
  mechanical_fixes: true
  read_only: false
  advisory_only: false
```

**Governance Repository**:
```yaml
capabilities:
  execute_changes: true
  modify_tests: false
  modify_migrations: false
  mechanical_fixes: true
  read_only: false
  advisory_only: false
```

**Read-Only Reference Repository**:
```yaml
capabilities:
  execute_changes: false
  modify_tests: false
  modify_migrations: false
  mechanical_fixes: false
  read_only: true
  advisory_only: true
```

**Constraints**:
- Capabilities declare **possibility**, not **permission**
- Actual permission determined by scope + agent contract + canonical governance
- `read_only: true` MUST be paired with empty `allowed_paths`
- `modify_migrations: true` MUST be paired with migration paths in `escalation_required_paths`

### 4.9 Constraints Section (`constraints`)

**Type**: Object  
**Required**: YES  
**Purpose**: Declare repository-level constraints all agents must honor

**Structure**:
```yaml
constraints:
  governance_interpretation: forbidden           # Can agents interpret governance
  scope_expansion: forbidden                     # Can agents expand their scope
  zero_test_debt: required                       # Must agents maintain test coverage
  build_to_green_only: true                      # Must builds pass before handover
  architecture_immutable_during_build: true      # Can agents change architecture during build
  secrets_and_env_config: forbidden              # Can agents modify secrets/env config
```

**Required Constraints**:
- `governance_interpretation`: MUST be `forbidden` (agents reference canon, not interpret)
- `scope_expansion`: MUST be `forbidden` (agents cannot self-authorize beyond scope)
- `zero_test_debt`: MUST be `required` (test coverage maintained)
- `build_to_green_only`: MUST be `true` (no handover on failing builds)
- `architecture_immutable_during_build`: MUST be `true` (architecture changes require explicit approval)
- `secrets_and_env_config`: MUST be `forbidden` (secrets managed externally)

**Rationale**: These constraints enforce core build discipline and prevent agents from self-expanding authority.

### 4.10 Enforcement Section (`enforcement`)

**Type**: Object  
**Required**: YES  
**Purpose**: Define enforcement model for violations

**Structure**:
```yaml
enforcement:
  on_scope_violation: halt_and_escalate       # Action on scope violation
  on_governance_resolution_failure: halt       # Action on governance lookup failure
  escalation_target: <Foreman|Maturion>       # Who to escalate to
```

**Required Sub-fields**:
- `on_scope_violation`: MUST be `halt_and_escalate` or `halt`
- `on_governance_resolution_failure`: MUST be `halt` or `escalate`
- `escalation_target`: MUST be `Foreman` or `Maturion`

**Enforcement Philosophy**:
- **Halt-first**: Agents stop on violations, not attempt recovery
- **Escalation-driven**: Humans or higher authority resolve violations
- **No silent failures**: All violations must be visible and traceable

---

## 5. Optional Sections

### 5.1 Doctrines Section (`doctrines`)

**Type**: Object  
**Required**: NO  
**Purpose**: Declare alignment with doctrines (reference only, not duplication)

**Structure**:
```yaml
doctrines:
  build_philosophy_aligned: true
  constitutional_sandbox_aligned: true
```

**Valid Format**:
- Boolean flags indicating alignment
- MUST NOT enumerate doctrine file paths
- MUST NOT duplicate doctrine content

**Invalid Format**:
```yaml
# WRONG - Do not enumerate files
doctrines:
  build_philosophy: /BUILD_PHILOSOPHY.md
  
# WRONG - Do not duplicate content
doctrines:
  build_to_green: "All builds must pass before handover"
```

**Rationale**: Doctrine resolution is canonical governance's responsibility, not repository contracts.

### 5.2 Temporary Authorization Section (`temporary_authorization`)

**Type**: Object  
**Required**: NO  
**Purpose**: Grant time-limited or task-limited authority expansions

**Structure**:
```yaml
temporary_authorization:
  allowed: true
  granularity: task                # Enum: task, session, time
  authority: Foreman               # Who granted authorization
  expires: 2026-12-31              # Optional expiry date
  scope_expansion: []              # List of additional paths allowed
  rationale: "Emergency fix"       # Why authorization granted
```

**Use Cases**:
- Emergency fixes requiring elevated permissions
- Bootstrapping phases requiring temporary scope expansion
- Experimental features requiring controlled rule relaxation

**Constraints**:
- MUST NOT become permanent (require review and removal)
- MUST document rationale and authority
- MUST be time-bounded or task-bounded
- MUST be removed when no longer needed

---

## 6. YAML Front Matter Validation Rules

### 6.1 Required Field Validation

A `.agent` file is **invalid** if:
- YAML front matter is missing or malformed
- Any required field is missing (`id`, `description`, `governance`, `scope`, `capabilities`, `constraints`, `enforcement`)
- Either `agent` or `agents` is missing (MUST have exactly one)

### 6.2 Type Validation

All fields MUST match declared types:
- Strings cannot be empty (except optional fields)
- Booleans must be `true` or `false` (not `yes`/`no` or `1`/`0`)
- Arrays must be properly formatted YAML arrays
- Objects must be properly formatted YAML objects

### 6.3 Cross-Field Validation

The following cross-field rules MUST hold:
- If `read_only: true`, then `allowed_paths` MUST be empty
- If `modify_migrations: true`, then migration paths MUST appear in `escalation_required_paths`
- `.agent` MUST appear in `restricted_paths` or `escalation_required_paths`
- Cannot have both `agent` and `agents` sections simultaneously

### 6.4 Canonical Reference Validation

All canonical references MUST be valid:
- `governance.canon.repository` must exist and be accessible
- All `governance.bindings[].path` must exist in canonical repository
- All `cross_references.repos[].repository` must exist
- All `cross_references.agents[].path` must exist in referenced repository

---

## 7. Markdown Content Specification (Optional)

After YAML front matter, repository `.agent` files MAY include Markdown content.

**Recommended Sections**:

### 7.1 Repository Purpose
Brief description of repository purpose and role in ecosystem.

### 7.2 Agent Roster Description
Detailed description of agents, their roles, and interactions.

### 7.3 Governance Relationship
Explanation of how this repository relates to canonical governance.

### 7.4 Cross-Repository Relationships
Explanation of read-only relationships with other repositories.

### 7.5 Quick Onboarding
Links to key documentation for new agents or contributors.

**Constraints**:
- Markdown content MUST NOT duplicate YAML front matter
- Markdown content MUST NOT restate canonical governance
- Markdown content SHOULD focus on repository-specific context

---

## 8. Common Patterns

### 8.1 Single-Agent Governance Repository

```yaml
---
id: maturion-foreman-governance
description: >
  Central governance repository. Single source of truth for
  constitutional authority and execution law.

agent:
  id: governance-repo-administrator
  class: overseer
  profile: overseer.v1.md

governance:
  canon:
    repository: MaturionISMS/maturion-foreman-governance
    path: /governance/canon
    reference: main
  
  bindings:
    - id: governance-purpose-scope
      path: governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md
      role: supreme-authority-and-scope

scope:
  repository: MaturionISMS/maturion-foreman-governance
  
  allowed_paths:
    - "governance/canon/**"
    - "governance/schemas/**"
  
  restricted_paths:
    - ".agent"
    - ".github/agents/**"

capabilities:
  execute_changes: true
  modify_tests: false
  modify_migrations: false
  mechanical_fixes: true
  read_only: false
  advisory_only: false

constraints:
  governance_interpretation: forbidden
  scope_expansion: forbidden
  zero_test_debt: required
  build_to_green_only: true
  architecture_immutable_during_build: true
  secrets_and_env_config: forbidden

enforcement:
  on_scope_violation: halt_and_escalate
  on_governance_resolution_failure: halt
  escalation_target: Maturion
---
```

### 8.2 Multi-Agent Application Repository

```yaml
---
id: maturion-app-example
description: >
  Example application repository with FM and multiple builders.

agents:
  - id: foreman-app
    class: overseer
    contract: .github/agents/ForemanApp-agent.md
    role: execution-authority
  
  - id: ui-builder
    class: builder
    contract: .github/agents/ui-builder.md
    role: ui-implementation
  
  - id: api-builder
    class: builder
    contract: .github/agents/api-builder.md
    role: api-implementation

governance:
  canon:
    repository: MaturionISMS/maturion-foreman-governance
    path: /governance/canon
    reference: main
  
  bindings:
    - id: fm-authority
      path: governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md
      role: fm-execution-authority
    - id: builder-bindings
      path: governance/canon/BUILDER_CONTRACT_BINDING_CHECKLIST.md
      role: builder-requirements

cross_references:
  repos:
    - id: maturion-foreman-governance
      repository: MaturionISMS/maturion-foreman-governance
      role: canonical-governance

scope:
  repository: MaturionISMS/maturion-app-example
  
  allowed_paths:
    - "src/**"
    - "tests/**"
    - "docs/**"
  
  restricted_paths:
    - ".agent"
    - ".github/agents/**"
    - "governance/**"
  
  escalation_required_paths:
    - ".github/workflows/**"
    - "package.json"

capabilities:
  execute_changes: true
  modify_tests: true
  modify_migrations: false
  mechanical_fixes: true
  read_only: false
  advisory_only: false

constraints:
  governance_interpretation: forbidden
  scope_expansion: forbidden
  zero_test_debt: required
  build_to_green_only: true
  architecture_immutable_during_build: true
  secrets_and_env_config: forbidden

enforcement:
  on_scope_violation: halt_and_escalate
  on_governance_resolution_failure: halt
  escalation_target: Foreman
---
```

---

## 9. Validation Procedure

See **AGENT_FILE_VALIDATION.md** in `governance/runbooks/` for complete validation procedure.

**Quick Validation Checklist**:
1. ✅ File exists at repository root as `.agent`
2. ✅ YAML front matter present and parseable
3. ✅ All required fields present
4. ✅ All field types correct
5. ✅ Cross-field validation rules satisfied
6. ✅ Canonical references valid and accessible
7. ✅ Scope paths do not conflict
8. ✅ Exactly one of `agent` or `agents` present
9. ✅ All agent contract paths exist
10. ✅ No duplication of canonical governance

---

## 10. Common Errors and Solutions

### Error: YAML front matter missing
**Symptom**: `.agent` file has no `---` delimiters  
**Solution**: Add YAML front matter with `---` at start and end

### Error: Both `agent` and `agents` present
**Symptom**: Validation fails with "conflicting agent declarations"  
**Solution**: Choose one: `agent` for single-agent repos, `agents` for multi-agent repos

### Error: `.agent` not in restricted paths
**Symptom**: Validation warns ".agent file unprotected"  
**Solution**: Add `.agent` to `restricted_paths` or `escalation_required_paths`

### Error: Canonical reference inaccessible
**Symptom**: Cannot resolve `governance.canon.repository`  
**Solution**: Verify repository exists, reference is correct, and access permissions granted

### Error: Agent contract path does not exist
**Symptom**: `agents[].contract` path not found  
**Solution**: Verify contract file exists, path is relative to repository root, spelling correct

### Error: Invalid constraint value
**Symptom**: Constraint set to value other than required  
**Solution**: Review Section 4.9 for required constraint values (most must be `forbidden` or `true`)

---

## 11. Maintenance and Evolution

### 11.1 Schema Versioning

This schema is versioned. Current version: **1.0.0**

**Schema Changes Require**:
- Canonical governance approval (Maturion authority)
- Ripple plan to all repositories
- Validation script updates
- FPC layer-down guide updates

### 11.2 Deprecation Policy

When schema fields are deprecated:
1. Mark as DEPRECATED in this document with replacement guidance
2. Grace period of 90 days minimum
3. Validation warns but does not fail during grace period
4. After grace period, validation fails on deprecated fields

### 11.3 Repository Updates

When this schema changes, ALL repositories MUST:
1. Update `.agent` file to conform to new schema
2. Update `governance/alignment/GOVERNANCE_ALIGNMENT.md` with schema version
3. Validate `.agent` file against new schema
4. Document changes in initialization or commissioning evidence

**See**: `AGENT_FILE_MAINTENANCE.md` in `governance/runbooks/` for maintenance protocol.

---

## 12. Related Documents

| Document | Purpose |
|----------|---------|
| **governance/canon/.agent.schema.md** | Individual agent contract schema |
| **governance/canon/AGENT_FILE_BINDING_REQUIREMENTS.md** | Mandatory and optional bindings |
| **governance/runbooks/AGENT_FILE_VALIDATION.md** | Validation procedure and checklist |
| **governance/runbooks/AGENT_FILE_MAINTENANCE.md** | Maintenance protocol and update triggers |
| **governance/canon/FPC_REPOSITORY_LAYERDOWN_GUIDE.md** | Layer-down procedure including .agent creation |

---

## 13. Authority and Precedence

**Authority**: This schema is canonical and supreme for repository-level `.agent` files.

**Canonical Precedence**:
- If this schema conflicts with any `.agent` file, this schema prevails
- If this schema conflicts with canonical governance elsewhere, escalate to Maturion
- Individual agent contracts (in `.github/agents/`) follow `.agent.schema.md` in canon, not this document

**Enforcement**:
- CI gates SHOULD validate `.agent` files against this schema
- Manual validation MUST occur during repository initialization
- Governance liaison MUST monitor schema compliance during drift checks

---

**This is the single, authoritative specification for repository `.agent` files.**

**Version**: 1.0.0  
**Last Updated**: 2026-01-12  
**Next Review**: 2026-07-12 (6 months)
