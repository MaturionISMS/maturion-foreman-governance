# REPOSITORY SEEDING AND ENFORCEMENT ROLE SEPARATION

## Status
Canonical Governance Standard  
Version: v1.0  
Authority: Johan Ras  
Applies To: All New Application Repositories, All Repository Seeding Agents, All Governance Enforcement Agents  
Related To: REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md, INITIALIZATION_COMPLETENESS_GATE.md, AGENT_RECRUITMENT.md, AGENT_ROLE_GATE_APPLICABILITY.md

---

## 1. Purpose

This document provides **explicit, canonical separation** between:
1. **Repository Seeding Authority** — agents authorized to create canonical repository structure
2. **Governance Enforcement Authority** — agents authorized to observe and enforce governance rules

The objective is to prevent incomplete or malformed repository initialization by ensuring:
- Only authorized agents perform repository seeding
- Governance enforcement agents do not perform seeding activities
- Role boundaries are explicit and non-overlapping
- Incorrect role substitution is prevented by canonical definition

This separation addresses a root cause identified during early trial runs where governance enforcement agents were incorrectly used for repository seeding, resulting in structurally incomplete repositories.

**Foundational Principle**: Repository seeding is a **specialized administrative function** distinct from governance observation and enforcement.

---

## 2. Core Definitions

### 2.1 Repository Seeding

**Repository Seeding** is the administrative act of establishing the mandatory canonical directory structure, baseline configuration files, and governance reference artifacts in a new application repository.

Repository seeding includes:
- Creating mandatory directory structure
- Creating mandatory baseline files
- Establishing governance versioning references
- Recording initialization evidence
- Configuring baseline CI/CD workflow placeholders

Repository seeding is **NOT**:
- Governance rule enforcement
- Governance compliance observation
- Architecture design or specification
- Feature planning or implementation
- Code implementation or testing
- Builder recruitment or assignment
- Application configuration or customization

### 2.2 Governance Enforcement

**Governance Enforcement** is the act of observing repository state, validating compliance with governance requirements, and raising violations through commentary, reviews, and escalation.

Governance enforcement includes:
- Observing repository structure and artifacts
- Validating compliance with governance schemas
- Validating compliance with governance policies
- Raising governance violations
- Blocking non-compliant changes
- Escalating to human authority when needed

Governance enforcement is **NOT**:
- Creating repository structure
- Creating baseline files or artifacts
- Performing repository initialization
- Acting as FM or orchestrator
- Acting as builder or implementer
- Modifying canonical governance structure

### 2.3 Critical Distinction

**Repository Seeding** is a **creative, structural, one-time administrative activity** that establishes the foundation for governance.

**Governance Enforcement** is a **continuous, observational, compliance activity** that operates on existing structure.

These are **distinct, non-overlapping roles** that must not be combined or substituted.

---

## 3. Agent Role Definitions

### 3.1 Repository Seeding / Admin Liaison Agent

#### 3.1.1 Identity and Classification

**Agent Class**: Administrator (per AGENT_RECRUITMENT.md)  
**Role**: Repository Seeding / Admin Liaison  
**Primary Responsibility**: Execute repository initialization protocol

#### 3.1.2 Authorized Activities

Repository Seeding / Admin Liaison Agents are **AUTHORIZED** to:

1. **Create Mandatory Directory Structure**
   - `.github/workflows/` — CI/CD workflow definitions
   - `.github/agents/` — Agent recruitment definitions
   - `.architecture/` — Architecture artifacts (empty initially)
   - `.qa/` — QA evidence artifacts (empty initially)
   - `governance/` — Governance references and policies
   - `memory/` — Memory scaffolding with subdirectories (GLOBAL/, AUDIT/, AUTHORITY/)
   - `docs/` — Documentation

2. **Create Mandatory Root Files**
   - `README.md` — Repository purpose and governance references
   - `.gitignore` — Prevent committing secrets, build artifacts
   - `.env.example` — Environment variable template (may be minimal initially)
   - `governance/GOVERNANCE_VERSION.md` — Governance version tracking

3. **Seed Governance Reference Artifacts**
   - Copy or reference governance schemas
   - Copy or reference governance policies
   - Copy or reference agent contracts (where applicable)
   - Establish governance versioning

4. **Create Repository Initialization Evidence**
   - `.architecture/REPOSITORY_INITIALIZATION_EVIDENCE.md`
   - Document initialization timestamp
   - Document governance version
   - Document human authorization
   - Document initialization checklist completion

5. **Configure Baseline CI/CD Workflow Placeholders**
   - Create placeholder workflow files for future gates
   - Configure baseline governance compliance workflows
   - Establish workflow structure (dormant until architecture phase)

6. **Record Audit Trail**
   - Document all initialization activities
   - Record decisions and authorizations
   - Maintain complete initialization evidence

#### 3.1.3 Prohibited Activities

Repository Seeding / Admin Liaison Agents are **EXPLICITLY PROHIBITED** from:

1. **Architecture Activities**
   - ❌ Designing application architecture
   - ❌ Creating architecture documents
   - ❌ Defining deployment targets
   - ❌ Specifying environment variables (beyond baseline template)
   - ❌ Creating commissioning plans
   - ❌ Making product or design decisions

2. **Builder Activities**
   - ❌ Recruiting builder agents
   - ❌ Assigning build tasks
   - ❌ Implementing application code
   - ❌ Creating application features
   - ❌ Writing tests (application tests)
   - ❌ Building or compiling code
   - ❌ Running QA or generating QA reports

3. **Enforcement Activities**
   - ❌ Making merge gate enforcement decisions
   - ❌ Evaluating code quality or test results
   - ❌ Blocking or approving PRs based on compliance
   - ❌ Acting as governance enforcement agent

4. **Execution Activities**
   - ❌ Running application code
   - ❌ Deploying to environments
   - ❌ Activating services
   - ❌ Processing workloads
   - ❌ Testing runtime behavior

5. **Governance Evolution Activities**
   - ❌ Modifying canonical governance
   - ❌ Creating new governance policies
   - ❌ Changing governance schemas
   - ❌ Reinterpreting governance requirements

#### 3.1.4 Behavioral Constraints

Repository Seeding / Admin Liaison Agents **MUST**:
- Execute initialization protocol exactly as specified
- Follow REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md precisely
- Request human authorization at required checkpoints
- Document all activities in initialization evidence
- Halt and escalate when encountering ambiguity or conflict

Repository Seeding / Admin Liaison Agents **MUST NOT**:
- Interpret or customize initialization requirements
- Skip or modify initialization steps
- Make architectural or product decisions
- Proceed without required human authorization
- Act outside repository initialization scope

#### 3.1.5 Success Criteria

A Repository Seeding / Admin Liaison Agent succeeds when:
- ✅ Repository structure matches canonical specification exactly
- ✅ All mandatory directories exist
- ✅ All mandatory files exist and are correct
- ✅ Governance version is recorded
- ✅ Initialization evidence is complete
- ✅ Human authorization is received and documented
- ✅ Repository state is REPOSITORY_INITIALIZED

---

### 3.2 Local Governance Enforcement Agent

#### 3.2.1 Identity and Classification

**Agent Class**: Auditor / Overseer (per AGENT_RECRUITMENT.md)  
**Role**: Governance Enforcement  
**Primary Responsibility**: Observe and enforce governance compliance

#### 3.2.2 Authorized Activities

Local Governance Enforcement Agents are **AUTHORIZED** to:

1. **Observe Repository State**
   - Read repository structure and artifacts
   - Inspect file contents for compliance
   - Monitor repository changes and evolution
   - Track governance version and references

2. **Validate Governance Compliance**
   - Validate governance schemas are followed
   - Validate governance policies are satisfied
   - Validate canonical requirements are met
   - Validate initialization evidence exists and is complete

3. **Enforce Governance Rules via Commentary**
   - Comment on PRs with governance violations
   - Request corrections for non-compliant changes
   - Provide guidance on governance requirements
   - Reference canonical governance documents

4. **Raise Violations and Escalate**
   - Identify and document governance violations
   - Block non-compliant PRs (via gate failures)
   - Escalate to human authority when needed
   - Create incident reports for governance failures

5. **Maintain Governance Audit Trail**
   - Track compliance history
   - Document enforcement actions
   - Record escalations and resolutions
   - Support compliance reporting

#### 3.2.3 Prohibited Activities

Local Governance Enforcement Agents are **EXPLICITLY PROHIBITED** from:

1. **Repository Seeding Activities**
   - ❌ Creating mandatory directory structure
   - ❌ Creating baseline files
   - ❌ Performing repository initialization
   - ❌ Seeding governance artifacts
   - ❌ Creating initialization evidence

2. **Structural Modification Activities**
   - ❌ Creating or modifying repository structure
   - ❌ Adding or removing directories
   - ❌ Creating mandatory files
   - ❌ Modifying canonical directory layout

3. **FM / Orchestrator Activities**
   - ❌ Coordinating initialization
   - ❌ Authorizing architecture work
   - ❌ Recruiting builder agents
   - ❌ Managing build workflows
   - ❌ Acting as Foreman

4. **Builder Activities**
   - ❌ Implementing application code
   - ❌ Creating features
   - ❌ Writing tests
   - ❌ Building or compiling code
   - ❌ Running QA

5. **Authorization Activities**
   - ❌ Authorizing repository initialization completion
   - ❌ Authorizing architecture work to begin
   - ❌ Authorizing builder recruitment
   - ❌ Making final approval decisions (human authority only)

#### 3.2.4 Behavioral Constraints

Local Governance Enforcement Agents **MUST**:
- Observe and report on repository state
- Enforce governance rules through commentary and review
- Reference canonical governance documents
- Escalate to human authority when needed
- Operate as independent observers (not creators)

Local Governance Enforcement Agents **MUST NOT**:
- Create or modify repository structure
- Perform initialization activities
- Act as repository administrators
- Substitute for Repository Seeding agents
- Override human authorization decisions

#### 3.2.5 Success Criteria

A Local Governance Enforcement Agent succeeds when:
- ✅ All governance violations are identified and reported
- ✅ Compliant changes are allowed to proceed
- ✅ Non-compliant changes are blocked
- ✅ Escalations are performed when needed
- ✅ Audit trail is complete and accurate
- ✅ Governance rules are enforced consistently

---

## 4. Role Separation Enforcement

### 4.1 Non-Substitutable Roles

**Invariant**: Repository Seeding and Governance Enforcement roles are **non-substitutable**.

- A Repository Seeding agent **MUST NOT** act as a Governance Enforcement agent
- A Governance Enforcement agent **MUST NOT** act as a Repository Seeding agent
- No agent may perform both roles simultaneously
- No agent may switch roles without explicit re-recruitment

**Enforcement**: Agent contracts MUST declare exactly one role. Attempting to perform activities outside declared role is a governance violation.

### 4.2 Role Assignment Authority

**Authority Hierarchy**:
1. **Johan (Human Authority)** — Authorizes repository creation and agent recruitment
2. **Foreman (FM)** — Recruits agents per AGENT_RECRUITMENT.md
3. **Agent Contracts** — Declare agent role and scope

**Process**:
1. Johan authorizes repository creation and initialization
2. FM recruits Repository Seeding agent per AGENT_RECRUITMENT.md
3. Repository Seeding agent executes initialization
4. Human authority confirms initialization completion
5. FM may recruit Governance Enforcement agent (if needed) for ongoing compliance
6. Governance Enforcement agent observes and enforces (but does not seed)

### 4.3 Violation Consequences

**Violations**:
- Repository Seeding agent acts as Governance Enforcement agent
- Governance Enforcement agent performs repository seeding
- Agent attempts to perform activities outside declared role
- Agent switches roles without re-recruitment

**Consequences**:
- Immediate stop of work
- Agent action invalidated
- Remediation required
- Root cause analysis
- Agent re-recruitment (if applicable)
- Governance incident documentation

### 4.4 Enforcement Mechanisms

**Agent Contract Enforcement**:
- Agent contracts MUST declare role explicitly
- Agent contracts MUST reference this document
- Agent contracts MUST list prohibited activities
- Agents MUST halt when encountering prohibited activity

**Governance Gate Enforcement**:
- Gates validate initialization evidence exists (enforcement role)
- Gates do NOT create initialization evidence (seeding role)
- Gates validate compliance with canonical requirements
- Gates escalate when initialization incomplete

**Human Review Enforcement**:
- Johan reviews agent recruitment
- Johan confirms initialization completion
- Johan may reject incorrect role assignment
- Johan may require agent re-recruitment

---

## 5. Integration with Repository Initialization Protocol

This role separation integrates with REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md:

### 5.1 Phase 1: REPOSITORY_CREATED

**Active Role**: None (awaiting human authorization)

**Human Authority**: Johan authorizes repository creation and initialization

### 5.2 Phase 2: GOVERNANCE_SEEDING

**Active Role**: Repository Seeding / Admin Liaison Agent

**Responsibilities**:
- Execute all initialization activities per protocol Section 2 (Phase 2)
- Create mandatory directory structure
- Seed baseline governance artifacts
- Create mandatory configuration files
- Create initialization evidence
- Configure baseline CI/CD workflows

**Inactive Roles**:
- Governance Enforcement Agent (not yet needed)
- Builder Agents (not yet recruited)
- FM (may coordinate but does not execute seeding)

### 5.3 Phase 3: REPOSITORY_INITIALIZED

**Active Role**: Governance Enforcement Agent (if recruited)

**Responsibilities**:
- Observe repository state
- Validate initialization completeness
- Enforce governance compliance going forward
- Block non-compliant changes

**Inactive Roles**:
- Repository Seeding Agent (initialization complete)

**Human Authority**: Johan confirms initialization and authorizes architecture work

---

## 6. Agent Recruitment Requirements

### 6.1 Repository Seeding Agent Recruitment

To recruit a Repository Seeding / Admin Liaison Agent:

1. **Preconditions** (per AGENT_RECRUITMENT.md):
   - Repository exists (REPOSITORY_CREATED state)
   - Human authorization received (Johan)
   - Canonical governance accessible

2. **Required Agent Contract Elements**:
   - `AGENT_ROLE: repository-seeding`
   - `AGENT_CLASS: administrator`
   - Reference to this document (REPOSITORY_SEEDING_AND_ENFORCEMENT_ROLE_SEPARATION.md)
   - Reference to REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md
   - Explicit scope: repository initialization only
   - Explicit prohibition: architecture, build, enforcement activities

3. **Recruitment Authority**: Foreman (FM) per AGENT_RECRUITMENT.md

4. **Recruitment Duration**: Temporary, task-bounded (initialization phase only)

5. **Revocation**: Automatic upon initialization completion

### 6.2 Governance Enforcement Agent Recruitment

To recruit a Local Governance Enforcement Agent:

1. **Preconditions** (per AGENT_RECRUITMENT.md):
   - Repository initialized (REPOSITORY_INITIALIZED state)
   - Governance enforcement needed
   - Canonical governance accessible

2. **Required Agent Contract Elements**:
   - `AGENT_ROLE: governance-enforcement`
   - `AGENT_CLASS: auditor` or `overseer`
   - Reference to this document (REPOSITORY_SEEDING_AND_ENFORCEMENT_ROLE_SEPARATION.md)
   - Reference to GOVERNANCE_PURPOSE_AND_SCOPE.md
   - Explicit scope: observation and enforcement only
   - Explicit prohibition: repository seeding, structural modification

3. **Recruitment Authority**: Foreman (FM) per AGENT_RECRUITMENT.md

4. **Recruitment Duration**: Persistent (ongoing governance enforcement)

5. **Revocation**: By FM or Johan when no longer needed

---

## 7. Relationship to Other Governance Artifacts

### 7.1 REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md

This document **separates the roles** described in the initialization protocol:
- Section 5.2 (Admin / Governance Liaison Agent) → Repository Seeding role
- Section 9.4 (Governance Administrator) → Governance Enforcement role

The REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md defines **what must be done**.  
This document defines **who is authorized to do it**.

### 7.2 AGENT_RECRUITMENT.md

This document **specializes the agent classes** defined in recruitment:
- Administrator class → Repository Seeding role
- Auditor/Overseer class → Governance Enforcement role

Repository Seeding and Governance Enforcement are **distinct roles** within their respective agent classes.

### 7.3 AGENT_ROLE_GATE_APPLICABILITY.md

This document **extends gate applicability** with new agent role:
- Repository Seeding agents → Subject to initialization completeness validation only
- Governance Enforcement agents → Subject to governance compliance validation only

Neither role is subject to builder-specific gates.

### 7.4 GOVERNANCE_PURPOSE_AND_SCOPE.md

This document **implements the separation of duties** principle:
- Repository creation (structural) vs. governance enforcement (observational)
- Creative (one-time seeding) vs. continuous (enforcement)
- Administrative (setup) vs. compliance (validation)

---

## 8. Special Cases and Edge Conditions

### 8.1 Scenario: Governance Enforcement Agent Asked to Seed Repository

**Situation**: Human or FM mistakenly requests Governance Enforcement agent to perform repository initialization.

**Response**:
1. Governance Enforcement agent MUST refuse
2. Agent MUST reference this document (prohibited activity)
3. Agent MUST request recruitment of Repository Seeding agent
4. Agent MUST escalate to FM or Johan

**Outcome**: Correct agent recruited for initialization.

### 8.2 Scenario: Repository Seeding Agent Asked to Enforce Compliance

**Situation**: After initialization, Repository Seeding agent is asked to validate compliance or block non-compliant PR.

**Response**:
1. Repository Seeding agent MUST refuse
2. Agent MUST reference this document (prohibited activity)
3. Agent MUST request recruitment of Governance Enforcement agent
4. Agent MUST escalate to FM or Johan

**Outcome**: Correct agent recruited for enforcement.

### 8.3 Scenario: Single Agent for Both Roles

**Situation**: Attempt to recruit single agent for both repository seeding and governance enforcement.

**Response**:
1. Recruitment MUST fail
2. FM MUST recruit two separate agents
3. Each agent MUST have distinct role and contract

**Outcome**: Role separation maintained.

### 8.4 Scenario: Re-Initialization Required

**Situation**: Repository initialization was incomplete or incorrect, requiring re-initialization.

**Response**:
1. Governance Enforcement agent identifies initialization failure
2. Escalate to Johan (human authority)
3. Johan authorizes re-initialization
4. FM recruits Repository Seeding agent (temporary)
5. Repository Seeding agent performs remediation
6. Human authority confirms completion
7. Repository Seeding agent revoked

**Outcome**: Roles remain separated even during remediation.

---

## 9. Success Criteria

This role separation succeeds when:

✅ **All repository initialization performed by Repository Seeding agents only**  
✅ **All governance enforcement performed by Governance Enforcement agents only**  
✅ **No agent performs activities outside declared role**  
✅ **No incorrect role substitution occurs**  
✅ **All agents recruited with explicit role declaration**  
✅ **All role violations identified and corrected**  
✅ **Structurally incomplete repositories prevented**

---

## 10. Enforcement and Consequences

### 10.1 Monitoring and Detection

**Governance Administrator** (repository-level) monitors for:
- Agent activities outside declared role
- Missing role declarations in agent contracts
- Incorrect agent recruitment
- Role substitution attempts

**Detection Methods**:
- Audit agent contracts for role declarations
- Review repository initialization evidence for agent identity
- Monitor PR activity for role violations
- Review escalations for role confusion

### 10.2 Violation Response

**When Role Violation Detected**:
1. Identify violation (agent performed prohibited activity)
2. Classify as governance incident
3. Halt affected work
4. Invalidate agent actions (if applicable)
5. Recruit correct agent
6. Remediate effects of violation
7. Document in governance evolution log
8. Update agent recruitment or contracts if needed

### 10.3 Prevention Mechanisms

**Agent Contract Requirements**:
- MUST declare role explicitly
- MUST list authorized activities
- MUST list prohibited activities
- MUST reference this document

**Agent Behavioral Requirements**:
- MUST halt when encountering prohibited activity
- MUST escalate to FM or Johan
- MUST not attempt role substitution

**FM Responsibilities**:
- Recruit agents with correct roles
- Validate agent contracts before approval
- Monitor for role violations
- Revoke agents performing out-of-role activities

---

## 11. Changelog

### Version 1.0 (2025-12-24)

**Status**: Initial Release  
**Authority**: Johan Ras  
**Trigger**: Issue G-C11 — Repository Seeding Agent Role Separation & Initialization Completeness Gate

**Summary**: Created canonical role separation between Repository Seeding / Admin Liaison agents and Governance Enforcement agents.

**Key Requirements Established**:
- Explicit separation of repository seeding and governance enforcement roles
- Repository Seeding / Admin Liaison Agent role definition and constraints
- Local Governance Enforcement Agent role definition and constraints
- Non-substitutable role enforcement
- Agent recruitment requirements for each role
- Integration with repository initialization protocol
- Violation consequences and enforcement mechanisms

**Effect**: Repository seeding and governance enforcement are now explicitly separated roles with distinct authorities, responsibilities, and prohibitions. Incorrect role substitution is prevented by canonical definition.

---

**End of REPOSITORY SEEDING AND ENFORCEMENT ROLE SEPARATION**

---

**Document Metadata**:
- Document ID: REPOSITORY_SEEDING_AND_ENFORCEMENT_ROLE_SEPARATION_V1.0
- Authority: Canonical Governance Standard
- Integrates With: REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md, INITIALIZATION_COMPLETENESS_GATE.md, AGENT_RECRUITMENT.md, AGENT_ROLE_GATE_APPLICABILITY.md, GOVERNANCE_PURPOSE_AND_SCOPE.md
- Enforcement: Agent Contracts + FM Recruitment Authority + Governance Administrator + Human Authority
