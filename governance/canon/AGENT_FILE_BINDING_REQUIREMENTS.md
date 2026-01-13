# .agent File Binding Requirements

## Status
**Type**: Canonical Governance Requirements  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-01-12  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Purpose**: Define mandatory and optional bindings for `.agent` files

---

## 1. Purpose

This document defines **which canonical governance documents** repository `.agent` files MUST or SHOULD bind to, establishing the **minimum governance foundation** for all repositories.

**Key Concepts**:
- **Binding** = Explicit reference to a canonical governance document in `.agent` file's `governance.bindings` section
- **Mandatory Binding** = MUST be present for repository to be governance-compliant
- **Optional Binding** = SHOULD be present when applicable to repository type
- **Bindings are references only** = No duplication of content, only declaration of dependency

**Related Documents**:
- **AGENT_FILE_SCHEMA.md** (in `governance/schemas/`) - Defines `.agent` file structure
- **GOVERNANCE_CANON_MANIFEST.md** - Lists all canonical documents and their API status

---

## 2. Tier-0 Mandatory Bindings (ALL Repositories)

These bindings MUST be present in ALL governed repositories, regardless of type, size, or agent roster.

### 2.1 GOVERNANCE_PURPOSE_AND_SCOPE.md

**Binding ID**: `governance-purpose-scope`  
**Path**: `governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md`  
**Role**: `supreme-authority-and-scope`

**Why Mandatory**: Defines the ultimate authority and boundaries of governance itself. All agents must understand what governance is and what it governs.

**Example**:
```yaml
governance:
  bindings:
    - id: governance-purpose-scope
      path: governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md
      role: supreme-authority-and-scope
```

### 2.2 AGENT_RECRUITMENT.md

**Binding ID**: `agent-recruitment`  
**Path**: `governance/canon/AGENT_RECRUITMENT.md`  
**Role**: `agent-legitimacy-and-authority`

**Why Mandatory**: Defines how agents become legitimate and under what authority they operate. Critical for understanding which agents are authorized.

**Example**:
```yaml
    - id: agent-recruitment
      path: governance/canon/AGENT_RECRUITMENT.md
      role: agent-legitimacy-and-authority
```

### 2.3 GOVERNANCE_RIPPLE_MODEL.md

**Binding ID**: `governance-ripple-model`  
**Path**: `governance/canon/GOVERNANCE_RIPPLE_MODEL.md`  
**Role**: `ripple-propagation-protocol`

**Why Mandatory**: Defines how governance changes propagate across repositories. All repositories must understand ripple obligations.

**Example**:
```yaml
    - id: governance-ripple-model
      path: governance/canon/GOVERNANCE_RIPPLE_MODEL.md
      role: ripple-propagation-protocol
```

---

## 3. Repository Type-Specific Mandatory Bindings

### 3.1 Application Repositories (with FM + Builders)

In addition to Tier-0, application repositories MUST bind to:

#### FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md

**Binding ID**: `fm-authority-model`  
**Path**: `governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md`  
**Role**: `fm-execution-authority`

**Why Mandatory**: FM is the execution authority. Application repos must understand FM's scope and responsibilities.

**Example**:
```yaml
    - id: fm-authority-model
      path: governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md
      role: fm-execution-authority
```

#### BUILDER_CONTRACT_BINDING_CHECKLIST.md

**Binding ID**: `builder-bindings`  
**Path**: `governance/canon/BUILDER_CONTRACT_BINDING_CHECKLIST.md`  
**Role**: `builder-requirements`

**Why Mandatory**: Defines what builders must comply with. Application repos with builders must understand builder obligations.

**Example**:
```yaml
    - id: builder-bindings
      path: governance/canon/BUILDER_CONTRACT_BINDING_CHECKLIST.md
      role: builder-requirements
```

#### EXECUTION_BOOTSTRAP_PROTOCOL.md

**Binding ID**: `execution-bootstrap-protocol`  
**Path**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`  
**Role**: `execution-discipline`

**Why Mandatory**: Defines execution discipline (build-to-green, prehandover proof, etc.). All execution repos must comply.

**Example**:
```yaml
    - id: execution-bootstrap-protocol
      path: governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md
      role: execution-discipline
```

#### AGENT_TEST_EXECUTION_PROTOCOL.md

**Binding ID**: `agent-test-execution-protocol`  
**Path**: `governance/runbooks/AGENT_TEST_EXECUTION_PROTOCOL.md`  
**Role**: `test-execution-before-handover`

**Why Mandatory**: Enforces CI-Confirmatory-Not-Diagnostic by requiring test execution in agent environment before PR creation. Prevents merge gate failures post-handover due to test failures.

**Applicability**: All application repositories with automated test suites.

**Example**:
```yaml
    - id: agent-test-execution-protocol
      path: governance/runbooks/AGENT_TEST_EXECUTION_PROTOCOL.md
      role: test-execution-before-handover
```

### 3.2 Governance Repositories

In addition to Tier-0, governance repositories MUST bind to:

#### CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md

**Binding ID**: `cross-repo-layer-down`  
**Path**: `governance/canon/CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md`  
**Role**: `cross-repo-governance-propagation`

**Why Mandatory**: Governance repos must understand how to propagate governance to other repos.

**Example**:
```yaml
    - id: cross-repo-layer-down
      path: governance/canon/CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md
      role: cross-repo-governance-propagation
```

#### MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md

**Binding ID**: `mandatory-progress-recording`  
**Path**: `governance/canon/MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md`  
**Role**: `progress-recording-standards`

**Why Mandatory**: Governance repos track progress and certify completion. Must understand recording standards.

**Example**:
```yaml
    - id: mandatory-progress-recording
      path: governance/canon/MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md
      role: progress-recording-standards
```

#### BOOTSTRAP_EXECUTION_LEARNINGS.md

**Binding ID**: `bootstrap-learnings`  
**Path**: `governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md`  
**Role**: `execution-learnings-capture`

**Why Mandatory**: Governance repos must capture and promote learnings from execution.

**Example**:
```yaml
    - id: bootstrap-learnings
      path: governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md
      role: execution-learnings-capture
```

### 3.3 Library/Utility Repositories

Library repositories (no FM, no builders, passive artifacts) require only **Tier-0 bindings**.

**Rationale**: Libraries don't execute builds or have autonomous agents. They follow conventional software practices with basic governance oversight.

---

## 4. Agent Role-Specific Bindings

### 4.1 Repositories with Foreman (FM) Agent

If repository has FM agent (class: `overseer`, FM-specific), MUST bind to:

- `FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md` (see Section 3.1)
- `FM_BUILDER_APPOINTMENT_PROTOCOL.md`
- `FM_GOVERNANCE_LOADING_PROTOCOL.md`
- `FM_RUNTIME_ENFORCEMENT_AND_AWARENESS_MODEL.md`

**Example Addition**:
```yaml
    - id: fm-builder-appointment
      path: governance/canon/FM_BUILDER_APPOINTMENT_PROTOCOL.md
      role: builder-appointment-authority
    
    - id: fm-governance-loading
      path: governance/canon/FM_GOVERNANCE_LOADING_PROTOCOL.md
      role: governance-loading-protocol
    
    - id: fm-runtime-enforcement
      path: governance/canon/FM_RUNTIME_ENFORCEMENT_AND_AWARENESS_MODEL.md
      role: fm-runtime-enforcement
```

### 4.2 Repositories with Builder Agents

If repository has builder agents (class: `builder`), MUST bind to:

- `BUILDER_CONTRACT_BINDING_CHECKLIST.md` (see Section 3.1)
- `BUILD_TREE_EXECUTION_MODEL.md` (if using build trees)
- `DEFECT_RESOLUTION_MAINTENANCE_CANON.md` (if doing maintenance work)

**Example Addition**:
```yaml
    - id: build-tree-model
      path: governance/canon/BUILD_TREE_EXECUTION_MODEL.md
      role: build-tree-execution
    
    - id: defect-resolution
      path: governance/canon/DEFECT_RESOLUTION_MAINTENANCE_CANON.md
      role: maintenance-protocol
```

### 4.3 Repositories with Governance Liaison

If repository appoints a Governance Liaison agent, SHOULD bind to:

- `GOVERNANCE_LIAISON_MINIMUM_APPOINTMENT_REQUIREMENTS.md`
- `GOVERNANCE_LIAISON_TRAINING_PROTOCOL.md`

**Example Addition**:
```yaml
    - id: gl-requirements
      path: governance/canon/GOVERNANCE_LIAISON_MINIMUM_APPOINTMENT_REQUIREMENTS.md
      role: liaison-appointment
    
    - id: gl-training
      path: governance/canon/GOVERNANCE_LIAISON_TRAINING_PROTOCOL.md
      role: liaison-training
```

### 4.4 Repositories with Watchdog Agent

If repository has Watchdog agent (monitoring/oversight), MUST bind to:

- `WATCHDOG_AUTHORITY_AND_SCOPE.md`
- `WATCHDOG_COGNITIVE_OBSERVATION_PROTOCOL.md`

**Example Addition**:
```yaml
    - id: watchdog-authority
      path: governance/canon/WATCHDOG_AUTHORITY_AND_SCOPE.md
      role: watchdog-authority
    
    - id: watchdog-observation
      path: governance/canon/WATCHDOG_COGNITIVE_OBSERVATION_PROTOCOL.md
      role: cognitive-observation
```

---

## 5. Optional Bindings (Recommended When Applicable)

These bindings are NOT mandatory but SHOULD be included when the canonical document is relevant to repository operations.

### 5.1 Architecture and Design

**When Applicable**: Repository contains significant application architecture

**Bindings**:
```yaml
    - id: architecture-completeness
      path: governance/canon/ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md
      role: architecture-standards
```

### 5.2 Memory and Learning

**When Applicable**: Repository uses agent memory or learning systems

**Bindings**:
```yaml
    - id: memory-lifecycle
      path: governance/canon/MEMORY_LIFECYCLE_STATE_MACHINE_CONTRACT.md
      role: memory-management
    
    - id: learning-promotion
      path: governance/canon/LEARNING_INTAKE_AND_PROMOTION_MODEL.md
      role: learning-standards
```

### 5.3 CI and Branch Protection

**When Applicable**: Repository has CI workflows and branch protection

**Bindings**:
```yaml
    - id: branch-protection
      path: governance/canon/BRANCH_PROTECTION_ENFORCEMENT.md
      role: branch-protection-requirements
    
    - id: pr-gate-protocol
      path: governance/canon/PR_GATE_EVALUATION_AND_ROLE_PROTOCOL.md
      role: pr-gate-enforcement
```

### 5.4 Commissioning and Initialization

**When Applicable**: Repository is being initialized or commissioned

**Bindings**:
```yaml
    - id: repository-initialization
      path: governance/canon/REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md
      role: initialization-protocol
    
    - id: system-commissioning
      path: governance/canon/SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md
      role: commissioning-standards
```

### 5.5 Agent Onboarding and Migration

**When Applicable**: Repository has multiple agents or undergoes contract migration

**Bindings**:
```yaml
    - id: agent-onboarding
      path: governance/canon/AGENT_ONBOARDING_QUICKSTART.md
      role: unified-agent-onboarding
    
    - id: agent-contract-migration
      path: governance/canon/AGENT_CONTRACT_MIGRATION_GUIDE.md
      role: contract-minimalism-and-migration
```

---

## 6. Binding Documentation Requirements

### 6.1 Required Metadata

Each binding MUST include:
- **id**: Unique identifier within repository (kebab-case)
- **path**: Exact path to canonical document (relative to governance repo root)
- **role**: Brief description of binding's purpose (1-3 words, hyphen-separated)

### 6.2 Role Naming Conventions

Roles SHOULD use one of these patterns:
- **Authority**: `<domain>-authority` (e.g., `fm-execution-authority`)
- **Protocol**: `<domain>-protocol` (e.g., `ripple-propagation-protocol`)
- **Standards**: `<domain>-standards` (e.g., `architecture-standards`)
- **Requirements**: `<domain>-requirements` (e.g., `builder-requirements`)
- **Model**: `<domain>-model` (e.g., `build-tree-execution`)

### 6.3 Binding Order

Bindings SHOULD be ordered by:
1. Authority and scope (Tier-0)
2. Agent-specific requirements
3. Execution and operational protocols
4. Optional/contextual bindings

**Rationale**: Supreme authority first, agent specifics next, operational details last.

---

## 7. Applicability Decision Tree

Use this decision tree to determine which bindings are mandatory:

```
START
  |
  +--> ALL REPOS: Tier-0 bindings (Section 2)
  |
  +--> Is this an application repo?
         YES --> Add Application bindings (Section 3.1)
         NO  --> Continue
  |
  +--> Is this a governance repo?
         YES --> Add Governance bindings (Section 3.2)
         NO  --> Continue (Library repo, Tier-0 only)
  |
  +--> Does repo have FM agent?
         YES --> Add FM bindings (Section 4.1)
         NO  --> Continue
  |
  +--> Does repo have builder agents?
         YES --> Add Builder bindings (Section 4.2)
         NO  --> Continue
  |
  +--> Does repo have governance liaison?
         YES --> Add Liaison bindings (Section 4.3) [OPTIONAL]
         NO  --> Continue
  |
  +--> Does repo have watchdog?
         YES --> Add Watchdog bindings (Section 4.4)
         NO  --> Continue
  |
  +--> Review optional bindings (Section 5)
         Add those applicable to repo operations
  |
END
```

---

## 8. Validation

### 8.1 Mandatory Binding Validation

A repository `.agent` file is **invalid** if:
- Any mandatory binding for its type is missing
- Any mandatory binding for its agent roster is missing
- Binding paths do not exist in canonical governance repository
- Binding IDs are not unique within repository

### 8.2 Optional Binding Validation

A repository `.agent` file should warn (but not fail) if:
- Optional bindings that appear applicable are missing
- Bindings reference deprecated canonical documents
- Binding order does not follow conventions (Section 6.3)

### 8.3 Manual Review Triggers

Manual review REQUIRED if:
- Repository has more than 20 bindings (may indicate over-specification)
- Repository has zero optional bindings (may indicate under-specification)
- Bindings conflict with canonical precedence hierarchy

---

## 9. Binding Maintenance

### 9.1 When to Add New Bindings

Add new bindings when:
- New canonical documents are published and apply to repository
- Repository adopts new agent roles or capabilities
- Governance ripple signals new binding requirement
- Repository type changes (e.g., library → application)

### 9.2 When to Remove Bindings

Remove bindings when:
- Canonical document is deprecated and replacement is in place
- Agent role is removed from repository
- Binding is superseded by more general binding

### 9.3 Binding Deprecation Process

When a canonical document is deprecated:
1. Governance ripple signal issued to all repositories
2. Grace period of 90 days minimum
3. Repositories update bindings to replacement document
4. Old binding removed after confirmation

**Authority**: `AGENT_FILE_MAINTENANCE.md` in `governance/runbooks/`

---

## 10. Common Patterns

### 10.1 Minimal Governance Repository

```yaml
governance:
  bindings:
    # Tier-0 (mandatory for ALL repos)
    - id: governance-purpose-scope
      path: governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md
      role: supreme-authority-and-scope
    
    - id: agent-recruitment
      path: governance/canon/AGENT_RECRUITMENT.md
      role: agent-legitimacy-and-authority
    
    - id: governance-ripple-model
      path: governance/canon/GOVERNANCE_RIPPLE_MODEL.md
      role: ripple-propagation-protocol
    
    # Governance-specific (Section 3.2)
    - id: cross-repo-layer-down
      path: governance/canon/CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md
      role: cross-repo-governance-propagation
    
    - id: mandatory-progress-recording
      path: governance/canon/MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md
      role: progress-recording-standards
    
    - id: bootstrap-learnings
      path: governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md
      role: execution-learnings-capture
```

### 10.2 Full Application Repository (FM + Builders)

```yaml
governance:
  bindings:
    # Tier-0 (mandatory for ALL repos)
    - id: governance-purpose-scope
      path: governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md
      role: supreme-authority-and-scope
    
    - id: agent-recruitment
      path: governance/canon/AGENT_RECRUITMENT.md
      role: agent-legitimacy-and-authority
    
    - id: governance-ripple-model
      path: governance/canon/GOVERNANCE_RIPPLE_MODEL.md
      role: ripple-propagation-protocol
    
    # Application-specific (Section 3.1)
    - id: fm-authority-model
      path: governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md
      role: fm-execution-authority
    
    - id: builder-bindings
      path: governance/canon/BUILDER_CONTRACT_BINDING_CHECKLIST.md
      role: builder-requirements
    
    - id: execution-bootstrap-protocol
      path: governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md
      role: execution-discipline
    
    # FM-specific (Section 4.1)
    - id: fm-builder-appointment
      path: governance/canon/FM_BUILDER_APPOINTMENT_PROTOCOL.md
      role: builder-appointment-authority
    
    - id: fm-governance-loading
      path: governance/canon/FM_GOVERNANCE_LOADING_PROTOCOL.md
      role: governance-loading-protocol
    
    # Builder-specific (Section 4.2)
    - id: build-tree-model
      path: governance/canon/BUILD_TREE_EXECUTION_MODEL.md
      role: build-tree-execution
    
    # Optional but recommended (Section 5)
    - id: architecture-completeness
      path: governance/canon/ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md
      role: architecture-standards
    
    - id: branch-protection
      path: governance/canon/BRANCH_PROTECTION_ENFORCEMENT.md
      role: branch-protection-requirements
```

### 10.3 Library Repository (Minimal)

```yaml
governance:
  bindings:
    # Tier-0 only (mandatory for ALL repos)
    - id: governance-purpose-scope
      path: governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md
      role: supreme-authority-and-scope
    
    - id: agent-recruitment
      path: governance/canon/AGENT_RECRUITMENT.md
      role: agent-legitimacy-and-authority
    
    - id: governance-ripple-model
      path: governance/canon/GOVERNANCE_RIPPLE_MODEL.md
      role: ripple-propagation-protocol
```

---

## 11. Troubleshooting

### Issue: Too Many Bindings

**Symptom**: Repository has 15+ bindings  
**Diagnosis**: May be over-specifying or including tangential documents  
**Solution**: Review for redundancy; keep only documents agents directly depend on

### Issue: Missing Expected Binding

**Symptom**: Validation reports missing mandatory binding  
**Diagnosis**: Repository type or agent roster requires binding  
**Solution**: Consult Sections 2-4 for mandatory bindings, add missing binding

### Issue: Binding Path Not Found

**Symptom**: Canonical document path cannot be resolved  
**Diagnosis**: Document moved, renamed, or typo in path  
**Solution**: Check canonical governance repository, update path or reference

### Issue: Unclear If Binding Is Mandatory

**Symptom**: Unsure if binding applies to repository  
**Diagnosis**: Ambiguous applicability  
**Solution**: Consult decision tree (Section 7) or escalate to Governance Liaison

---

## 12. Related Documents

| Document | Purpose |
|----------|---------|
| **governance/schemas/AGENT_FILE_SCHEMA.md** | `.agent` file structure and format |
| **governance/canon/GOVERNANCE_CANON_MANIFEST.md** | Index of all canonical documents |
| **governance/canon/GOVERNANCE_RIPPLE_MODEL.md** | How governance changes propagate |
| **governance/runbooks/AGENT_FILE_VALIDATION.md** | Validation procedure for `.agent` files |
| **governance/runbooks/AGENT_FILE_MAINTENANCE.md** | Maintenance protocol for `.agent` files |

---

## 13. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-12 | Initial binding requirements consolidation |

---

## 14. Authority and Precedence

**Authority**: This document is canonical for determining which bindings are mandatory vs. optional.

**Canonical Precedence**:
- If this document conflicts with `.agent` files, this document prevails
- If this document conflicts with canonical governance manifests, escalate to Maturion
- Individual agent contracts must honor bindings declared in repository `.agent`

**Enforcement**:
- FPC layer-down process MUST use this document to seed bindings
- `.agent` validation MUST check mandatory bindings against this document
- Governance ripples MUST reference this document when signaling new binding requirements

---

**This is the single, authoritative source for `.agent` file binding requirements.**

**Version**: 1.0.0  
**Last Updated**: 2026-01-12  
**Next Review**: 2026-07-12 (6 months)
