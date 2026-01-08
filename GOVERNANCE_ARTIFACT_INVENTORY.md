# Governance Artifact Inventory

**Purpose**: Complete inventory of all governance artifacts in the maturion-foreman-governance repository  
**Created**: 2025-12-31  
**Authority**: Phase 1.1 — Platform Readiness Reset & Build Initiation Plan  
**Scope**: Inventory only — no interpretation, correction, or gap analysis

---

## Classification Categories

Artifacts are classified into four categories:

1. **Readiness** — Defines or validates platform/build/execution readiness
2. **PR-gates** — Defines or implements PR merge gate enforcement
3. **Feedback/learning** — Governs learning intake, promotion, or feedback loops
4. **Layer-down** — Governs propagation of governance to downstream repositories

---

## Root-Level Governance Files

| File | Purpose | Categories |
|------|---------|------------|
| `BUILD_PHILOSOPHY.md` | Defines Build-to-Green, One-Time Build Law, and core build governance philosophy | Readiness, PR-gates |
| `GOVERNANCE_GATE_CANON.md` | Canonical definition of PR gate evaluation, enforcement semantics, and gate applicability | PR-gates, Readiness |
| `IMPLEMENTATION_COMPLETE.md` | Records completion status of governance implementation phases | Readiness |
| `README.md` | Repository entry point and orientation | (documentation) |
| `START_HERE.md` | Human orientation guide for repository structure | (documentation) |
| `WAVE_A_HUMAN_REVIEW_GUIDE.md` | Guide for human review of Wave A execution | Readiness |
| `WAVE_A_STATUS.md` | Status tracking for Wave A execution | Readiness |
| `maturion-philosophy-tree.md` | Philosophical foundation and vision alignment | (philosophy) |

---

## Governance Canon (governance/canon/)

Canon files define constitutional governance rules, models, and protocols.

| File | Purpose | Categories |
|------|---------|------------|
| `.agent.schema.md` | Schema definition for agent contracts | PR-gates |
| `ACTIVATION_STATE_MODEL.md` | Defines agent/system activation lifecycle states | Readiness |
| `AGENT_CANONICAL_CONTEXT_SYNCHRONISATION_PROTOCOL.md` | Protocol for keeping agent context synchronized with canon | Layer-down |
| `AGENT_RECRUITMENT.md` | Defines rules for recruiting and activating agents | Readiness |
| `AGENT_ROLE_GATE_APPLICABILITY.md` | Maps which PR gates apply to which agent roles | PR-gates |
| `APP_STARTUP_REQUIREMENTS_DECLARATION.md` | Defines application commissioning and startup requirements | Readiness, Layer-down |
| `ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md` | Defines architecture artifact completeness criteria | Readiness, PR-gates |
| `AUDIT_READINESS_MODEL.md` | Defines audit trail and evidence requirements | Readiness |
| `BOOTSTRAP_EXECUTION_LEARNINGS.md` | Records structural learnings from bootstrap execution | Feedback/learning |
| `BRANCH_PROTECTION_ENFORCEMENT.md` | Defines branch protection requirements | PR-gates |
| `BUILDER_FIRST_PR_MERGE_MODEL.md` | Defines rules for first builder PR merge | PR-gates, Readiness |
| `BUILD_EFFECTIVENESS_STANDARD.md` | Defines build effectiveness measurement criteria | Readiness |
| `BUILD_INTERVENTION_AND_ALERT_MODEL.md` | Defines when/how to intervene in builds | Feedback/learning |
| `BUILD_NODE_INSPECTION_MODEL.md` | Defines build node health and inspection protocol | Readiness |
| `BUILD_TREE_EXECUTION_MODEL.md` | Defines build dependency tree execution rules | Readiness |
| `CASCADING_FAILURE_CIRCUIT_BREAKER.md` | Defines circuit breaker rules for cascading failures | Feedback/learning |
| `CI_CONFIRMATORY_NOT_DIAGNOSTIC.md` | Establishes CI as enforcement, not discovery | PR-gates |
| `COGNITIVE_CAPABILITY_ORCHESTRATION_MODEL.md` | Defines model tier selection and cognitive load management | Readiness |
| `COGNITIVE_HYGIENE_AUTHORITY_MODEL.md` | Defines cognitive hygiene boundaries and authority | Readiness |
| `COGNITIVE_HYGIENE_MEMORY_INTEGRATION_MODEL.md` | Defines memory access and hygiene integration | Readiness |
| `COMMISSIONING_EVIDENCE_MODEL.md` | Defines commissioning evidence requirements | Readiness |
| `COMPLIANCE_AND_STANDARDS_GOVERNANCE.md` | Defines compliance framework (ISO/NIST) alignment | Readiness |
| `DELEGATION_INSTRUCTION_AND_AUDIT_MODEL.md` | Defines delegation instruction format and audit requirements | Readiness |
| `DOMAIN_EVOLUTION_RULES.md` | Defines how responsibility domains evolve | Readiness |
| `DOMAIN_OWNERSHIP_ACCOUNTABILITY.md` | Defines domain ownership and accountability rules | Readiness |
| `DOMAIN_STATE_ENFORCEMENT_RULE.md` | Defines enforcement of domain state requirements | Readiness |
| `ENVIRONMENT_PROVISIONING_PROCESS.md` | Defines environment setup and provisioning | Readiness |
| `FAILURE_PROMOTION_RULE.md` | Defines when failures must be escalated/promoted | Feedback/learning |
| `FM_GOVERNANCE_LOADING_PROTOCOL.md` | Protocol for loading governance into FM context | Layer-down, Readiness |
| `FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md` | Defines FM authority boundaries and supervision rules | Readiness |
| `GATE_PREDICTIVE_COMPLIANCE_ANALYSIS.md` | Defines predictive compliance analysis for PR gates | PR-gates, Feedback/learning |
| `GOVERNANCE_COMPLETENESS_MODEL.md` | Defines what constitutes complete governance | Readiness |
| `GOVERNANCE_ENFORCEMENT_TRANSITION.md` | Defines transition from advisory to enforcement mode | PR-gates, Readiness |
| `GOVERNANCE_LAYERDOWN_CONTRACT.md` | Authoritative definition of governance layer-down requirements | Layer-down |
| `GOVERNANCE_PURPOSE_AND_SCOPE.md` | Constitutional definition of governance purpose and authority | Readiness |
| `GOVERNANCE_RIPPLE_MODEL.md` | Defines governance change ripple effects and impact analysis | Layer-down |
| `GOVERNANCE_VERSIONING_AND_SYNC_PROTOCOL.md` | Defines governance versioning and synchronization | Layer-down |
| `AGENT_RIPPLE_AWARENESS_OBLIGATION.md` | Defines agent obligation to recognize and surface ripple effects (Wave 1.2) | Layer-down, Feedback/learning |
| `ASSISTED_RIPPLE_SCAN_SCOPE.md` | Defines scope of assisted ripple scanning within single repository (Wave 2.1) | Layer-down, Feedback/learning |
| `ASSISTED_RIPPLE_SCAN_HUMAN_REVIEW_SEMANTICS.md` | Defines human review semantics for ripple scan reports (Wave 2.1) | Layer-down, Feedback/learning |
| `CROSS_REPOSITORY_RIPPLE_AWARENESS_MODEL.md` | Defines passive cross-repository ripple signaling (Wave 2.2) | Layer-down, Feedback/learning |
| `RIPPLE_INTELLIGENCE_LAYER.md` | Defines Ripple Intelligence concept and three ripple planes | Layer-down, Readiness, Feedback/learning |
| `INITIALIZATION_COMPLETENESS_GATE.md` | Defines repository initialization validation gate | PR-gates, Readiness, Layer-down |
| `LEARNING_INTAKE_AND_PROMOTION_MODEL.md` | Defines learning capture and promotion to canon | Feedback/learning |
| `LEARNING_PROMOTION_RULE.md` | Defines rules for promoting learnings to governance | Feedback/learning |
| `MATURION_CONCEPTUAL_DOCTRINE.md` | Defines Maturion philosophical foundations | (philosophy) |
| `MATURION_RUNTIME_EXECUTION_MONITOR_SPEC.md` | Specification for runtime execution monitoring | Readiness |
| `MEMORY_INTEGRITY_AND_CORRUPTION_MODEL.md` | Defines memory integrity requirements | Readiness |
| `MEMORY_LIFECYCLE_STATE_MACHINE_CONTRACT.md` | Defines memory lifecycle state transitions | Readiness |
| `MEMORY_OBSERVABILITY_QUERY_CONTRACT.md` | Defines memory query interface contract | Readiness |
| `PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md` | Defines platform authority boundaries | Readiness |
| `PLATFORM_READINESS_FOR_GOVERNED_BUILD_EXECUTION.md` | Canonical definition of platform readiness | Readiness |
| `PR_GATE_EVALUATION_AND_ROLE_PROTOCOL.md` | Defines PR gate evaluation process | PR-gates |
| `PR_GATE_PRECONDITION_RULE.md` | Defines preconditions for PR gate applicability | PR-gates |
| `PR_SCOPE_CONTROL_POLICY.md` | Defines PR scope boundaries and enforcement | PR-gates |
| `REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md` | Defines repository initialization process | Layer-down, Readiness |
| `REPOSITORY_SEEDING_AND_ENFORCEMENT_ROLE_SEPARATION.md` | Defines separation between seeding and enforcement agents | Layer-down |
| `REQUIREMENT_SPECIFICATION_GOVERNANCE.md` | Defines requirement specification standards | Readiness |
| `RESPONSIBILITY_DOMAIN_ENTRY.template.md` | Template for defining responsibility domains | (template) |
| `RESPONSIBILITY_DOMAIN_REGISTRY.md` | Registry of all responsibility domains | Readiness |
| `SCOPE_DECLARATION_SCHEMA.md` | Schema for scope declarations | PR-gates |
| `SCOPE_TO_DIFF_RULE.md` | Defines scope-to-diff validation rule | PR-gates |
| `SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md` | Defines system commissioning phases | Readiness |
| `VERSIONING_AND_EVOLUTION_GOVERNANCE.md` | Defines governance versioning rules | Layer-down |
| `VISION_ALIGNMENT_AND_DRIFT_MODEL.md` | Defines vision drift detection and correction | Feedback/learning |
| `WATCHDOG_AUTHORITY_AND_SCOPE.md` | Defines Watchdog agent authority and scope | Readiness |
| `WATCHDOG_COGNITIVE_OBSERVATION_PROTOCOL.md` | Defines Watchdog cognitive observation protocol | Readiness |
| `effectiveness.template.md` | Template for effectiveness reporting | (template) |
| `failure.template.md` | Template for failure reporting | Feedback/learning |
| `scope-declaration.template.md` | Template for scope declarations | (template) |

---

## Governance Policy (governance/policy/)

Policy files define operational governance requirements and protocols.

| File | Purpose | Categories |
|------|---------|------------|
| `APP_DESCRIPTION_REQUIREMENT_POLICY.md` | Defines application description requirements | Readiness, Layer-down |
| `BUILDER_QA_HANDOVER_POLICY.md` | Defines builder QA requirements before handover | PR-gates, Readiness |
| `FM_MATURION_DELEGATED_ACTION_POLICY.md` | Defines FM delegated action authority and requirements | Readiness |
| `PR_GATE_FAILURE_HANDLING_PROTOCOL.md` | Defines protocol for handling PR gate failures | PR-gates, Feedback/learning |
| `QA_POLICY_MASTER.md` | Master QA policy document | PR-gates, Readiness |

---

## Governance Schemas (governance/schemas/)

Schema files define data structures for governance artifacts.

| File | Purpose | Categories |
|------|---------|------------|
| `BRANCH_PROTECTION_EVIDENCE.schema.md` | Schema for branch protection evidence | PR-gates |
| `BUILDER_QA_REPORT.schema.md` | Schema for builder QA reports | PR-gates, Readiness |
| `BUILDER_QA_SUMMARY.structure.md` | Structure for builder QA summaries | PR-gates, Readiness |
| `BUILD_QA_REPORT.schema.json` | JSON schema for build QA reports | PR-gates, Readiness |
| `CONTROL_MAPPING.schema.md` | Schema for control mapping | Readiness |
| `DELEGATED_ACTION_AUDIT.schema.md` | Schema for delegated action audit records | Readiness |
| `DELEGATED_ACTION_INSTRUCTION.schema.md` | Schema for delegated action instructions | Readiness |
| `DELEGATION_INSTRUCTION.schema.md` | Schema for delegation instructions | Readiness |
| `DELEGATION_RESPONSE.schema.md` | Schema for delegation responses | Readiness |
| `EVIDENCE_CATALOG.schema.md` | Schema for evidence catalog | Readiness |
| `FAILURE_SCHEMA.schema.md` | Schema for failure records | Feedback/learning |
| `GOVERNANCE_CHANGE_PROPOSAL.schema.md` | Schema for governance change proposals | Feedback/learning |
| `GOVERNANCE_COMPLIANCE_REPORT.schema.json` | JSON schema for compliance reports | Readiness |
| `GPCA_PREDICTION_REPORT.schema.md` | Schema for Gate Predictive Compliance Analysis reports | PR-gates, Feedback/learning |
| `LEARNING_SCHEMA.schema.md` | Schema for learning records | Feedback/learning |
| `PLATFORM_ACTION_AUDIT_ENTRY.schema.md` | Schema for platform action audit entries | Readiness |
| `PLATFORM_READINESS_EVIDENCE.schema.md` | Schema for platform readiness evidence | Readiness |
| `REPOSITORY_INITIALIZATION_EVIDENCE.schema.md` | Schema for repository initialization evidence | Layer-down, Readiness |
| `REQUIREMENT_SPECIFICATION.schema.md` | Schema for requirement specifications | Readiness |
| `RIPPLE_SCAN_REPORT.schema.md` | Schema for ripple scan reports (Wave 2.1) | Feedback/learning, Layer-down |
| `RIPPLE_SIGNAL.schema.md` | Schema for cross-repository ripple signals (Wave 2.2) | Feedback/learning, Layer-down |

---

## Governance Templates (governance/templates/)

Template files provide reusable structures for governance artifacts.

| File | Purpose | Categories |
|------|---------|------------|
| `BUILDER_TASK_TEMPLATE.md` | Template for builder task definitions | Readiness |
| `PLATFORM_READINESS_CHECKLIST.template.md` | Template for platform readiness checklists | Readiness |
| `PR_GATE_RELEASE_CHECKLISTS_README.md` | Documentation for PR gate release checklists | PR-gates |
| `PR_GATE_RELEASE_CHECKLIST_BUILDER.md` | Builder-specific PR gate release checklist | PR-gates |
| `PR_GATE_RELEASE_CHECKLIST_FM.md` | FM-specific PR gate release checklist | PR-gates |
| `PR_GATE_RELEASE_CHECKLIST_GOVERNANCE_ADMIN.md` | Governance Admin-specific PR gate release checklist | PR-gates |
| `RIPPLE_SCAN_REPORT.template.md` | Template for ripple scan reports (Wave 2.1) | Feedback/learning, Layer-down |
| `RIPPLE_SIGNAL.template.md` | Template for cross-repository ripple signals (Wave 2.2) | Feedback/learning, Layer-down |
| `minimum-architecture-template.md` | Template for minimum architecture artifacts | Readiness, Layer-down |
| `workflows/README.md` | Documentation for workflow templates | (documentation) |

---

## Governance Contracts (governance/contracts/)

Contract files define formal agreements and authorization gates.

| File | Purpose | Categories |
|------|---------|------------|
| `ARCHITECTURE_COMPILATION_CONTRACT.md` | Defines architecture compilation requirements | Readiness |
| `BUILD_AUTHORIZATION_GATE.md` | Defines build authorization gate requirements | PR-gates, Readiness |
| `app-description-frs-alignment-checklist.md` | Checklist for app description and FRS alignment | Readiness |

---

## Governance Agents (governance/agents/ and .github/agents/)

Agent contract files define agent roles, authority, and responsibilities.

| File | Purpose | Categories |
|------|---------|------------|
| `governance/agents/governance-administrator.agent.md` | Governance Administrator agent contract | Readiness |
| `.github/agents/governance-repo-administrator.agent.md` | Repository-scoped Governance Administrator agent contract | Readiness |

---

## Governance Philosophy (governance/philosophy/)

Philosophy files define foundational principles and doctrines.

| File | Purpose | Categories |
|------|---------|------------|
| `BYG_DOCTRINE.md` | Build-Your-Governance doctrine | Readiness |
| `GOVERNANCE_INCIDENT_RESPONSE_DOCTRINE.md` | Incident response doctrine for governance failures | Feedback/learning |
| `GOVERNANCE_SOURCE.md` | Defines authoritative source of governance | Readiness |

---

## Governance OPOJD (governance/opojd/)

OPOJD (One Point of Job Definition) governance files.

| File | Purpose | Categories |
|------|---------|------------|
| `CS2_OPOJD_EXTENSION.md` | CS2 OPOJD extension | Readiness |
| `CS5_ANTI_INTERRUPTION_RULE.md` | Anti-interruption rule for execution | Readiness |
| `CS6_EXECUTION_MANDATE.md` | CS6 execution mandate | Readiness |
| `OPOJD_ARCHITECTURE.md` | OPOJD architecture definition | Readiness |
| `OPOJD_COMPLETION_REPORT.md` | OPOJD completion report | Readiness |
| `OPOJD_COMPLETION_REPORT_TEMPLATE.md` | Template for OPOJD completion reports | (template) |
| `OPOJD_DOCTRINE.md` | OPOJD doctrine and principles | Readiness |

---

## Governance Execution (governance/execution/)

Execution-related governance files.

| File | Purpose | Categories |
|------|---------|------------|
| `BUILDER_CONSTITUTIONAL_SYSTEMS.md` | Builder constitutional requirements | Readiness |
| `CANONICAL_BACKLOG_SEQUENCE.md` | Canonical sequencing of backlog work | Readiness |
| `EXECUTION_INVARIANTS.md` | Execution invariants and rules | Readiness |
| `WAVE_MODEL.md` | Wave-based execution model | Readiness |

---

## Governance Maturion (governance/maturion/)

Maturion-specific governance definitions.

| File | Purpose | Categories |
|------|---------|------------|
| `EXECUTION_PHILOSOPHY.md` | Maturion execution philosophy | (philosophy) |
| `FM_ROLE_CANON.md` | Canonical definition of FM role | Readiness |
| `HISTORY.md` | Historical context for governance evolution | (documentation) |
| `PRINCIPLES.md` | Core Maturion principles | (philosophy) |
| `VISION.md` | Maturion vision statement | (philosophy) |

---

## Governance Memory (governance/memory/)

Memory and learning governance files.

| File | Purpose | Categories |
|------|---------|------------|
| `canonical-lessons/gate_misalignment_lessons.md` | Lessons learned from gate misalignment | Feedback/learning |
| `canonical-lessons/mcp_failure_postmortem.md` | MCP failure postmortem analysis | Feedback/learning |
| `canonical-lessons/regression_prevention_lessons.md` | Lessons for regression prevention | Feedback/learning |
| `governance_evolution_log.md` | Log of governance evolution changes | Feedback/learning |

---

## Governance Reports (governance/reports/)

Governance analysis and assessment reports.

| File | Purpose | Categories |
|------|---------|------------|
| `PHASE_2_CANONIZATION_SUMMARY.md` | Phase 2 canonization summary | Readiness |
| `POST_TRANSITION_GOVERNANCE_SCAN.md` | Post-transition governance scan report | Readiness |
| `POST_TRANSITION_GOVERNANCE_SCAN_IMPLEMENTATION_SUMMARY.md` | Implementation summary from post-transition scan | Readiness |

---

## Governance Runbooks (governance/runbooks/)

Operational runbooks for governance processes.

| File | Purpose | Categories |
|------|---------|------------|
| `FOREMAN_GOVERNANCE_RUNBOOK.md` | Operational runbook for FM governance processes | Readiness |

---

## Governance Escalation (governance/escalation/)

Escalation policies and protocols.

| File | Purpose | Categories |
|------|---------|------------|
| `ESCALATION_POLICY.md` | Escalation policy for governance issues | Feedback/learning |

---

## Governance Incidents (governance/incidents/)

Formal incident reports for governance violations, test dodging, and catastrophic governance failures.

| File | Purpose | Categories |
|------|---------|------------|
| `README.md` | Incident directory documentation and structure | Feedback/learning |
| `INCIDENT-2026-01-08-TEST-DODGING-WARNING-SUPPRESSION.md` | Test dodging incident via pytest warning suppression | Feedback/learning |

---

## Governance Evidence (governance/evidence/)

Evidence files documenting governance compliance and readiness.

| File | Purpose | Categories |
|------|---------|------------|
| `PLATFORM_READINESS_EVIDENCE_2025-12-30.md` | Platform readiness evidence snapshot | Readiness |

---

## Governance Status Documents (governance/)

Status and completion tracking documents in governance root.

| File | Purpose | Categories |
|------|---------|------------|
| `CHANGELOG.md` | Changelog for governance repository | (documentation) |
| `COMPLETE_BUILD_PHILOSOPHY_COMPLIANCE.md` | Build philosophy compliance completion report | Readiness |
| `CONSTITUTION.md` | Governance constitution | Readiness |
| `CRITICAL_BUG_PROMPT_COMPRESSION.md` | Critical bug documentation | Feedback/learning |
| `CS1_IMPLEMENTATION_COMPLETE.md` | CS1 implementation completion report | Readiness |
| `CS2_IMPLEMENTATION_SUMMARY.md` | CS2 implementation summary | Readiness |
| `CS4_COMPLETE.md` | CS4 completion report | Readiness |
| `CS5_IMPLEMENTATION_COMPLETE.md` | CS5 implementation completion report | Readiness |
| `CS6_IMPLEMENTATION_COMPLETE.md` | CS6 implementation completion report | Readiness |
| `GITHUB_MODEL_SCALING_SECURITY.md` | GitHub model scaling security documentation | Readiness |
| `GOVERNANCE_TRANSITION_LEGACY_GATES_DECOMMISSIONING.md` | Legacy gate decommissioning documentation | PR-gates |
| `QA_PLATFORM_ENHANCEMENT.md` | QA platform enhancement documentation | Readiness |
| `QIEL_ENV_ALIGNMENT.md` | QIEL environment alignment documentation | Readiness |
| `QIW_THRESHOLD_UNIFICATION.md` | QIW threshold unification documentation | Readiness |
| `SECURITY_SUMMARY_CS5.md` | CS5 security summary | Readiness |
| `SECURITY_SUMMARY_CS6.md` | CS6 security summary | Readiness |
| `SECURITY_SUMMARY_PHASE_11_14.md` | Phase 11-14 security summary | Readiness |
| `SECURITY_SUMMARY_PHASE_2.md` | Phase 2 security summary | Readiness |
| `SECURITY_SUMMARY_WAVE_ZERO.md` | Wave Zero security summary | Readiness |
| `STRICT_MODE_COMPLIANCE_PROJECT.md` | Strict mode compliance project documentation | Readiness |
| `TRUE_NORTH_ALIGNMENT_CS3.md` | CS3 True North alignment documentation | Readiness |

---

## Governance Autonomy (governance/autonomy/)

Autonomy-related governance completion reports.

| File | Purpose | Categories |
|------|---------|------------|
| `AUTO_01_COMPLETION_REPORT.md` | AUTO_01 completion report | Readiness |
| `AUTO_02_COMPLETION_REPORT.md` | AUTO_02 completion report | Readiness |
| `AUTO_03_COMPLETION_REPORT.md` | AUTO_03 completion report | Readiness |
| `AUTO_04_COMPLETION_REPORT.md` | AUTO_04 completion report | Readiness |
| `AUTO_05_COMPLETION_REPORT.md` | AUTO_05 completion report | Readiness |
| `COMPLETE_IMPLEMENTATION_REPORT.md` | Complete autonomy implementation report | Readiness |
| `EXECUTION_STATUS.md` | Autonomy execution status | Readiness |
| `OVERNIGHT_EXECUTION_FINAL_REPORT.md` | Overnight execution final report | Readiness |

---

## Governance Parking Station (governance/parking-station/)

Parking station governance files.

| File | Purpose | Categories |
|------|---------|------------|
| `GPCA_AND_GOVERNANCE_RIPPLE_MODEL.md` | GPCA and governance ripple model integration | PR-gates, Feedback/learning |
| `README.md` | Parking station documentation | (documentation) |

---

## Governance Proposals (governance/proposals/)

Governance change proposal tracking.

| File | Purpose | Categories |
|------|---------|------------|
| `README.md` | Governance proposals documentation | (documentation) |

---

## Governance Profiles (governance/profiles/)

Agent and role profiles.

| File | Purpose | Categories |
|------|---------|------------|
| `builder.v1.md` | Builder profile version 1 | Readiness |

---

## Governance Tech Surveys (governance/tech-surveys/)

Technical surveys for governance technology decisions.

| File | Purpose | Categories |
|------|---------|------------|
| `TSP_01_INITIAL_SURVEY.md` | Initial technical survey | (documentation) |

---

## Governance Waves (governance/waves/)

Wave execution governance.

| File | Purpose | Categories |
|------|---------|------------|
| `MODERNIZATION_WAVE_ALPHA.md` | Wave Alpha modernization documentation | Readiness |

---

## GitHub Workflows (.github/workflows/)

PR gate enforcement workflows.

| File | Purpose | Categories |
|------|---------|------------|
| `README.md` | Workflow documentation | (documentation) |
| `agent-governance-check.yml` | Agent governance check workflow | PR-gates |
| `fm-effectiveness-validation-gate.yml` | FM effectiveness validation gate | PR-gates, Feedback/learning |
| `fm-failure-enforcement-gate.yml` | FM failure enforcement gate | PR-gates, Feedback/learning |
| `fm-failure-promotion-gate.yml` | FM failure promotion gate | PR-gates, Feedback/learning |
| `fm-learning-promotion-gate.yml` | FM learning promotion gate | PR-gates, Feedback/learning |
| `foreman-governance.yml` | Foreman governance workflow | PR-gates |
| `governance-gate.yml` | Primary governance gate workflow | PR-gates |
| `governance-scope-to-diff-gate.yml` | Governance scope-to-diff validation gate | PR-gates |

---

## Docs/Governance (docs/governance/)

Documentation and guidance for governance processes.

| File | Purpose | Categories |
|------|---------|------------|
| `ALIGNMENT_SUMMARY_2025-12-16.md` | Alignment summary report | Readiness |
| `ALIGNMENT_VERIFICATION_2025-12-16.md` | Alignment verification report | Readiness |
| `ARCHITECTURE_APPROVAL_HISTORY.md` | History of architecture approvals | (documentation) |
| `ARCHITECTURE_CHANGE_APPROVAL.md` | Architecture change approval process | Readiness |
| `AUTONOMY_PIPELINE.md` | Autonomy pipeline documentation | Readiness |
| `BRANCH_PROTECTION_SETUP.md` | Branch protection setup guide | PR-gates |
| `CONSTITUTIONAL_QA.md` | Constitutional QA documentation | PR-gates, Readiness |
| `DRIFT_DETECTION_GUIDE.md` | Drift detection guide | Feedback/learning |
| `GUARDRAILS.md` | Guardrails documentation | PR-gates, Readiness |
| `GUARDRAIL_RUNTIME_ENGINE.md` | Guardrail runtime engine specification | PR-gates, Readiness |
| `GUARDRAIL_SANDBOX.md` | Guardrail sandbox documentation | Readiness |
| `ONE_TIME_BUILD_LAW.md` | One-Time Build Law documentation | Readiness, PR-gates |
| `PRE_HANDOVER_QA_CHECKLIST.md` | Pre-handover QA checklist | PR-gates, Readiness |
| `QIC_RULES.md` | QIC (Quality Integrity Continuity) rules | PR-gates, Readiness |
| `agent-md-alignment-sweep-2025-12-16.md` | Agent markdown alignment sweep report | Readiness |
| `github-model-scaling-policy.md` | GitHub model scaling policy | Readiness |
| `model-tier-matrix.md` | Model tier selection matrix | Readiness |

---

## Architecture (architecture/)

Architecture governance files.

| File | Purpose | Categories |
|------|---------|------------|
| `learning.template.md` | Learning template for architecture | Feedback/learning |
| `runtime-readiness-check-architecture.md` | Runtime readiness check architecture | Readiness |
| `runtime-readiness-check-checklist-validation.md` | Runtime readiness check validation | Readiness |

---

## Docs/Architecture (docs/architecture/)

Architecture documentation with governance implications.

| File | Purpose | Categories |
|------|---------|------------|
| `cs4-governance-alerts-architecture.md` | CS4 governance alerts architecture | Feedback/learning |

---

## Docs/QA (docs/)

QA templates and documentation.

| File | Purpose | Categories |
|------|---------|------------|
| `qa-template-for-new-projects.md` | QA template for new projects | Readiness, Layer-down |

---

## Maturion Canon (maturion/canon/)

Maturion canonical specifications.

| File | Purpose | Categories |
|------|---------|------------|
| `BOOTSTRAP_CANON.md` | Bootstrap canonical requirements | Readiness |

---

## Maturion Governance Specifications (maturion/)

Maturion platform governance specifications.

| File | Purpose | Categories |
|------|---------|------------|
| `audit-compliance-framework-spec.md` | Audit and compliance framework specification | Readiness |
| `autonomous-expansion-protocol-spec.md` | Autonomous expansion protocol specification | Readiness |
| `cognitive-hygiene-protocol-spec.md` | Cognitive hygiene protocol specification | Readiness |
| `constitutional-integrity-verification-spec.md` | Constitutional integrity verification specification | Readiness |
| `control-effectiveness-engine-spec.md` | Control effectiveness engine specification | Readiness |
| `crisis-management-executive-decision-protocol-spec.md` | Crisis management protocol specification | Feedback/learning |
| `cross-embodiment-interaction-protocol-spec.md` | Cross-embodiment interaction protocol | Readiness |
| `cross-tenant-intelligence-safety-layer-spec.md` | Cross-tenant intelligence safety specification | Readiness |
| `embodiment-calibration-engine-spec.md` | Embodiment calibration engine specification | Readiness |
| `governance-evidence-engine-spec.md` | Governance evidence engine specification | Readiness |
| `guardrails-and-safety-charter.md` | Guardrails and safety charter | PR-gates, Readiness |
| `knowledge-boundary-reinforcement-spec.md` | Knowledge boundary reinforcement specification | Readiness |
| `maturion-cost-optimization-policy.md` | Cost optimization policy | Readiness |
| `maturion-governance-api-spec.md` | Governance API specification | Readiness |
| `maturion-identity.md` | Maturion identity specification | (philosophy) |
| `maturion-incident-taxonomy.md` | Incident taxonomy | Feedback/learning |
| `maturion-marketing-charter.md` | Marketing charter | (documentation) |
| `maturion-memory-architecture.md` | Memory architecture specification | Readiness |
| `maturion-role-behaviour-matrix.md` | Role behavior matrix | Readiness |
| `maturion-runtime-spec.md` | Runtime specification | Readiness |
| `maturion-self-learning-governance.md` | Self-learning governance specification | Feedback/learning |
| `maturion-tenant-isolation-standard.md` | Tenant isolation standard | Readiness |
| `maturion-threat-intelligence-framework.md` | Threat intelligence framework | Readiness |
| `maturion-true-north.md` | True North alignment specification | (philosophy) |
| `maturion-world-model.md` | World model specification | (philosophy) |
| `module-architecture-governance-template.md` | Module architecture governance template | Readiness, Layer-down |
| `multi-embodiment-deployment-charter.md` | Multi-embodiment deployment charter | Readiness |
| `multi-level-threat-containment-protocol-spec.md` | Multi-level threat containment specification | Readiness |
| `operational-resilience-engine-spec.md` | Operational resilience engine specification | Readiness |
| `oversight-system.md` | Oversight system specification | Readiness |
| `platform-change-management-protocol-spec.md` | Platform change management protocol | Feedback/learning |
| `platform-tree-api-spec.md` | Platform Tree API specification | Readiness |
| `platform-tree-architecture.md` | Platform Tree architecture specification | Readiness |
| `platform-tree-autonomy-integration-spec.md` | Platform Tree autonomy integration specification | Readiness |
| `platform-tree-global-risk-overlay-spec.md` | Platform Tree global risk overlay specification | Readiness |
| `platform-tree-governance.md` | Platform Tree governance specification | Readiness |
| `platform-tree-incident-overlay-spec.md` | Platform Tree incident overlay specification | Feedback/learning |
| `platform-tree-metrics-engine-spec.md` | Platform Tree metrics engine specification | Readiness |
| `platform-tree-phase-1-implementation-blueprint.md` | Platform Tree Phase 1 blueprint | Readiness |
| `platform-tree-phase-2-implementation-blueprint.md` | Platform Tree Phase 2 blueprint | Readiness |
| `platform-tree-phase-3-implementation-blueprint.md` | Platform Tree Phase 3 blueprint | Readiness |
| `platform-tree-phase-4-implementation-blueprint.md` | Platform Tree Phase 4 blueprint | Readiness |
| `platform-tree-predictive-health-engine-spec.md` | Platform Tree predictive health engine specification | Readiness |
| `platform-tree-security-isolation-overlay-spec.md` | Platform Tree security isolation overlay specification | Readiness |
| `platform-tree-visualization-spec.md` | Platform Tree visualization specification | Readiness |
| `platform-tree-watchdog-visualisation-spec.md` | Platform Tree watchdog visualization specification | Readiness |
| `proactive-governance-engine-spec.md` | Proactive governance engine specification | PR-gates, Feedback/learning |
| `sandbox-observability-telemetry-spec.md` | Sandbox observability telemetry specification | Readiness |
| `TECHNOLOGY_EVOLUTION_DOCTRINE.md` | Technology evolution doctrine | (philosophy) |
| `true-north-compliance-dashboard-spec.md` | True North compliance dashboard specification | Readiness |

---

## Maturion Philosophy (maturion/philosophy/)

Maturion philosophical foundations.

| File | Purpose | Categories |
|------|---------|------------|
| `maturion-governance-constitution.md` | Maturion governance constitution | Readiness |
| `technology-evolution-doctrine.md` | Technology evolution doctrine | (philosophy) |

---

## Maturion Process (maturion/process/)

Maturion process governance.

| File | Purpose | Categories |
|------|---------|------------|
| `LESSONS_TO_CANON_WORKFLOW.md` | Workflow for promoting lessons to canon | Feedback/learning |
| `VALIDATOR_CONVERGENCE_CHECKLIST.md` | Validator convergence checklist | PR-gates, Readiness |
| `communication/GOVERNANCE_GATE_STANDARD_RESPONSE.md` | Standard response template for governance gate failures | PR-gates, Feedback/learning |

---

## Memory Authority (memory/AUTHORITY/)

Memory governance authority files.

| File | Purpose | Categories |
|------|---------|------------|
| `MEMORY_FORGET_POLICY.md` | Memory forget/deletion policy | Readiness |
| `MEMORY_READ_POLICY.md` | Memory read access policy | Readiness |
| `MEMORY_WRITE_POLICY.md` | Memory write access policy | Readiness |

---

## Memory Audit (memory/AUDIT/)

Memory audit logs.

| File | Purpose | Categories |
|------|---------|------------|
| `memory-access-log.md` | Memory access audit log | Readiness |
| `memory-write-log.md` | Memory write audit log | Readiness |

---

## Memory Tenant Schema (memory/TENANT/_SCHEMA/)

Memory tenant schemas.

| File | Purpose | Categories |
|------|---------|------------|
| `tenant-memory.schema.json` | Tenant memory JSON schema | Readiness |

---

## Reports (reports/)

Governance analysis and audit reports.

| File | Purpose | Categories |
|------|---------|------------|
| `ARCHITECTURE_READINESS_ALIGNMENT_REPORT.md` | Architecture readiness alignment report | Readiness |
| `COGNITIVE_ORCHESTRATION_GOVERNANCE_IMPACT.md` | Cognitive orchestration governance impact analysis | Readiness |
| `FOREMAN_GOVERNANCE_DIAGNOSTIC_REPORT.md` | Foreman governance diagnostic report | Readiness |
| `FOREMAN_MEMORY_RESPONSIBILITY_GAP_ANALYSIS.md` | Foreman memory responsibility gap analysis | Readiness |
| `GOVERNANCE_DEPENDENCY_AND_ACTIVATION_SCAN.md` | Governance dependency and activation scan | Readiness |
| `MEMORY_AUTHORITY_BOUNDARY_AUDIT.md` | Memory authority boundary audit | Readiness |
| `MEMORY_EXISTENCE_GOVERNANCE_AUDIT.md` | Memory existence governance audit | Readiness |
| `MEMORY_GOVERNANCE_TRIAGE_REPORT.md` | Memory governance triage report | Readiness |
| `PR_SUBMISSION_INVARIANT_VERIFICATION_REPORT.md` | PR submission invariant verification report | PR-gates |
| `README_WAVE_A.md` | Wave A reports documentation | (documentation) |
| `WATCHDOG_OBSERVABILITY_READINESS_REPORT.md` | Watchdog observability readiness report | Readiness |
| `WAVE_A_COMPLETION_REPORT.md` | Wave A completion report | Readiness |
| `WAVE_A_EXECUTION_PLAN.md` | Wave A execution plan | Readiness |
| `WAVE_A_FEEDBACK_REPORT.md` | Wave A feedback report | Feedback/learning |
| `WAVE_A_SUMMARY_REPORT.md` | Wave A summary report | Readiness |

---

## Evidence (evidence-new/)

Execution evidence and summaries.

| File | Purpose | Categories |
|------|---------|------------|
| `FINAL_COMPLIANCE_REPORT.md` | Final compliance report | Readiness |
| `GOVERNANCE_HARDENING_SUMMARY.md` | Governance hardening summary | Readiness |
| `README.md` | Evidence documentation | (documentation) |
| `STRUCTURAL_CLEANUP_REPORT.md` | Structural cleanup report | Readiness |
| `autonomy-reauthorization-implementation-evidence.md` | Autonomy reauthorization evidence | Readiness |
| `cs1-validator-fix-summary.md` | CS1 validator fix summary | Readiness |
| `e2e-autonomous-mcp-validation-final-summary.md` | E2E autonomous MCP validation summary | Readiness |
| `governance-gate-dry-run-execution.md` | Governance gate dry run execution evidence | PR-gates |
| `red-qa-report-e2e-autonomous-mcp-validation.md` | Red QA report for E2E validation | PR-gates, Readiness |
| `surveys/PR_MERGE_GATE_FAILURE_SURVEY_2024-12-16.md` | PR merge gate failure survey | PR-gates, Feedback/learning |
| `wave-execution/WAVE_2_IMPLEMENTATION_SUMMARY.md` | Wave 2 implementation summary | Readiness |
| `wave-execution/WAVE_3.2_SUMMARY.md` | Wave 3.2 summary | Readiness |
| `wave-execution/WAVE_3.3_SUMMARY.md` | Wave 3.3 summary | Readiness |
| `wave-execution/WAVE_3C_FINAL_DELIVERY.md` | Wave 3C final delivery | Readiness |
| `wave-execution/WAVE_4_SUMMARY.md` | Wave 4 summary | Readiness |
| `wave-execution/WAVE_5.1_SUMMARY.md` | Wave 5.1 summary | Readiness |
| `wave-execution/WAVE_5_SUMMARY.md` | Wave 5 summary | Readiness |
| `wave-execution/WAVE_ZERO_INTEGRATION_COMPLETE.md` | Wave Zero integration complete | Readiness |

---

## Execution Halt (execution-halt/)

Execution halt documentation.

| File | Purpose | Categories |
|------|---------|------------|
| `ANNEX_1_EXECUTION_HALT_REPORT.md` | Execution halt report | Feedback/learning |
| `ANNEX_1_INFRASTRUCTURE_GAP_REPORT.md` | Infrastructure gap report | Readiness |

---

## Execution Progress (execution-progress/)

Execution progress tracking.

| File | Purpose | Categories |
|------|---------|------------|
| `wave0-issue240-build-to-green-status.md` | Wave 0 issue 240 build-to-green status | Readiness |

---

## Classification (classification/)

Content classification reports.

| File | Purpose | Categories |
|------|---------|------------|
| `PHASE_1_MATURION_CONTENT_CLASSIFICATION_REPORT.md` | Phase 1 content classification report | (documentation) |

---

## Implementation (implementation/)

Implementation completion reports (not canonical governance, but records implementation status).

| File | Purpose | Categories |
|------|---------|------------|
| Multiple implementation completion reports | Various implementation completion documentation | (implementation status) |

---

## Summary

**Total Governance Artifacts Inventoried**: 281+

**Category Distribution**:
- **Readiness**: Primary category for platform, build, and execution readiness governance
- **PR-gates**: PR gate enforcement, validation, and evaluation governance
- **Feedback/learning**: Learning intake, promotion, failure handling, incident tracking, and improvement governance
- **Layer-down**: Governance propagation to downstream repositories

**Notes**:
- Some artifacts are uncategorized (marked as documentation, philosophy, templates, or implementation status)
- Many artifacts serve multiple categories simultaneously
- No interpretation, correction, or gap analysis has been applied
- This inventory was last updated 2026-01-08 to include governance/incidents/ directory

---

**Completion Status**: CURRENT  
**Last Updated**: 2026-01-08
**Next Phase**: Gap analysis (Phase 1.2 - requires separate authorization)
