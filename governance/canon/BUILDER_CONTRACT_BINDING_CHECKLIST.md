# BUILDER CONTRACT BINDING CHECKLIST

**Status**: Canonical Governance Validation Checklist  
**Version**: 1.0.0  
**Authority**: Maturion Engineering Leadership (Johan Ras)  
**Created**: 2026-01-01  
**Purpose**: Machine-checkable checklist of what MUST appear in every builder contract to be considered constitutionally bound

---

## Executive Summary

This document provides a **machine-checkable binding checklist** that defines the **MANDATORY elements** that MUST appear in every builder agent contract for the agent to be considered **constitutionally bound** to Maturion governance.

**Critical Principle**: A builder contract is INCOMPLETE and the agent is OUT OF GOVERNANCE if ANY required element is missing or non-compliant.

This checklist is derived from and implements:
- `governance/canon/GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` (comprehensive obligations inventory)
- `governance/canon/AGENT_RECRUITMENT.md` (recruitment and binding requirements)
- `BUILD_PHILOSOPHY.md` (Build-to-Green, Zero Test Debt mandates)
- `governance/canon/OPOJD_DOCTRINE.md` (continuous execution requirements)

---

## Usage Instructions

### For Contract Authors

When creating or updating a builder contract:
1. Copy this checklist
2. For each item, verify presence and compliance in contract
3. Mark items as ✅ (present and compliant) or ❌ (missing or non-compliant)
4. A contract is VALID only if ALL required items are ✅
5. Resolve all ❌ items before agent recruitment/execution

### For Validation Tooling

Automated validators MUST:
1. Parse builder contract (`.agent` file, contract markdown, etc.)
2. For each checklist item, verify presence and correctness
3. Generate validation report showing pass/fail for each item
4. Return VALID only if all required items pass
5. Block recruitment/execution if validation fails

### For Governance Auditors

When auditing builder compliance:
1. Use this checklist as validation baseline
2. Verify builder contracts contain all required elements
3. Verify elements are correctly specified (not placeholders)
4. Document any gaps or non-compliance
5. Require remediation before agent may continue operating

---

## Checklist Structure

This checklist is organized into:
- **Section A**: Required for ANY Builder (universal requirements)
- **Section B**: Role-Specific Requirements (UI/API/Schema/Integration/QA builders)
- **Section C**: Constitutional Binding (high-level governance commitments)

Each item includes:
- **Element Name**: What must be present
- **Requirement Type**: MANDATORY | CONDITIONAL
- **Validation Criteria**: How to verify compliance
- **Canonical Reference**: Governance document defining requirement
- **Severity if Missing**: Impact of non-compliance

---

## SECTION A: REQUIRED FOR ANY BUILDER (Universal Requirements)

### A.1 Agent Metadata and Identity

#### A.1.1 Agent Role Declaration

- **Element**: `role` or `agent_role`
- **Requirement**: MANDATORY
- **Validation**: Field exists and value is "Builder" or specific builder type ("UI Builder", "API Builder", etc.)
- **Canonical Reference**: `governance/canon/AGENT_RECRUITMENT.md` section 4
- **Severity if Missing**: BLOCKER - Agent class cannot be determined
- **Format**: 
  ```yaml
  role: "Builder"
  # OR
  role: "UI Builder"
  ```

#### A.1.2 Agent Version

- **Element**: `version`
- **Requirement**: MANDATORY
- **Validation**: Semantic version present (e.g., "1.0.0", "2.1.3")
- **Canonical Reference**: `governance/canon/VERSIONING_AND_EVOLUTION_GOVERNANCE.md`
- **Severity if Missing**: HIGH - Version tracking impossible
- **Format**:
  ```yaml
  version: "1.0.0"
  ```

#### A.1.3 Contract Creation/Update Date

- **Element**: `created` or `updated`
- **Requirement**: MANDATORY
- **Validation**: ISO 8601 date present
- **Canonical Reference**: Audit trail requirements
- **Severity if Missing**: MEDIUM - Audit trail incomplete
- **Format**:
  ```yaml
  created: "2026-01-01"
  updated: "2026-01-01"
  ```

### A.2 Canonical Governance Binding

#### A.2.1 Canonical Governance Reference

- **Element**: `governance.canon` or `canonical_governance`
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists
  - Value is resolvable reference (e.g., "github:MaturionISMS/maturion-foreman-governance/governance/canon")
  - Reference can be resolved at validation time
- **Canonical Reference**: `governance/canon/AGENT_RECRUITMENT.md` section 6-6.1, `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` section 6.1
- **Severity if Missing**: BLOCKER - Agent operating without governance
- **Format**:
  ```yaml
  governance:
    canon: "github:MaturionISMS/maturion-foreman-governance/governance/canon"
    binding: "MANDATORY"
  ```

#### A.2.2 Governance Profile Reference

- **Element**: `governance.profile` or `governance_profile`
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists
  - Value is "governance/profiles/builder.v1.md" or specific builder profile
  - Referenced profile exists
- **Canonical Reference**: `governance/canon/AGENT_RECRUITMENT.md` section 5, `governance/profiles/builder.v1.md`
- **Severity if Missing**: BLOCKER - Agent constraints undefined
- **Format**:
  ```yaml
  governance:
    profile: "governance/profiles/builder.v1.md"
  ```

#### A.2.3 Governance Binding Mode

- **Element**: `governance.binding`
- **Requirement**: MANDATORY
- **Validation**: Value is "MANDATORY" (not "optional" or "advisory")
- **Canonical Reference**: Constitutional requirement
- **Severity if Missing**: BLOCKER - Governance is optional (violation)
- **Format**:
  ```yaml
  governance:
    binding: "MANDATORY"
  ```

### A.3 Scope Declaration

#### A.3.1 Allowed Paths

- **Element**: `scope.allowed_paths` or `allowed_paths`
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists
  - List of path patterns (glob or explicit)
  - Not empty (at least one path defined)
- **Canonical Reference**: `governance/canon/AGENT_RECRUITMENT.md` section 7, `governance/profiles/builder.v1.md` section 6
- **Severity if Missing**: BLOCKER - Scope undefined
- **Format**:
  ```yaml
  scope:
    allowed_paths:
      - "src/**/*.ts"
      - "src/**/*.tsx"
      - "tests/**/*.test.ts"
  ```

#### A.3.2 Restricted Paths

- **Element**: `scope.restricted_paths` or `restricted_paths`
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists
  - Includes at minimum: `/governance/**`, `.agent`, `.github/workflows/**`
  - List is not empty
- **Canonical Reference**: `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` section 2.1, `governance/profiles/builder.v1.md` section 5
- **Severity if Missing**: CRITICAL - Protected paths unguarded
- **Format**:
  ```yaml
  scope:
    restricted_paths:
      - "/governance/**"
      - ".agent"
      - ".github/workflows/**"
      - ".github/agents/**"
      - "BUILD_PHILOSOPHY.md"
  ```

#### A.3.3 Escalation-Required Paths

- **Element**: `scope.escalation_required` or `escalation_paths`
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists
  - Includes architecture paths, governance paths
  - List may be empty if no escalation-required paths (but field must exist)
- **Canonical Reference**: `governance/profiles/builder.v1.md` section 7
- **Severity if Missing**: HIGH - Escalation triggers unclear
- **Format**:
  ```yaml
  scope:
    escalation_required:
      - "/architecture/**"
      - "foreman/true-north-architecture.md"
  ```

### A.4 Build Philosophy Binding

#### A.4.1 Build-to-Green Commitment

- **Element**: `build_philosophy.build_to_green` or explicit Build-to-Green clause
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - States commitment to Build-to-Green mandate
  - Explicitly refuses non-Build-to-Green instructions
- **Canonical Reference**: `BUILD_PHILOSOPHY.md`, `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` section 3
- **Severity if Missing**: BLOCKER - Core build obligation missing
- **Format**:
  ```yaml
  build_philosophy:
    build_to_green: true
    refuses_non_build_to_green_instructions: true
  ```
  OR in contract text:
  ```
  This agent ONLY accepts "Build to Green" instructions.
  This agent REQUIRES failing QA suite before building.
  This agent REFUSES any other build instruction format.
  ```

#### A.4.2 Zero Test Debt Commitment

- **Element**: `build_philosophy.zero_test_debt` or explicit Zero Test Debt clause
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - States absolute commitment to zero test debt
  - Defines what constitutes test debt
  - States STOP behavior when test debt detected
- **Canonical Reference**: `BUILD_PHILOSOPHY.md` sections 11-107, `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` section 4
- **Severity if Missing**: CRITICAL - Quality mandate missing
- **Format**:
  ```yaml
  build_philosophy:
    zero_test_debt: "ABSOLUTE_MANDATE"
    test_debt_triggers_stop: true
    partial_passes_are_total_failure: true
  ```
  OR in contract text:
  ```
  This agent commits to ZERO TEST DEBT (no exceptions).
  Any test debt detected = STOP → FIX → RE-RUN → VERIFY.
  301/303 tests passing = TOTAL FAILURE.
  100% GREEN is absolute requirement.
  ```

#### A.4.3 100% GREEN Philosophy

- **Element**: `build_philosophy.hundred_percent_green` or explicit 100% GREEN clause
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - States 100% GREEN is absolute (not 99%, not "mostly passing")
  - Defines what 100% GREEN means
- **Canonical Reference**: `BUILD_PHILOSOPHY.md`, `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` section 4.4
- **Severity if Missing**: CRITICAL - Quality threshold missing
- **Format**:
  ```yaml
  build_philosophy:
    hundred_percent_green: "ABSOLUTE"
    acceptable_test_failure_threshold: 0
    acceptable_warning_threshold: 0
  ```

#### A.4.4 Test Infrastructure as Production Code

- **Element**: `build_philosophy.test_infrastructure_is_production` or explicit clause
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - States test helpers/fixtures/mocks are production code
  - States stub test infrastructure = not acceptable
- **Canonical Reference**: `BUILD_PHILOSOPHY.md` sections 56-75, `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` section 4.5
- **Severity if Missing**: HIGH - Test quality standards missing
- **Format**:
  ```yaml
  build_philosophy:
    test_infrastructure_is_production_code: true
    stub_test_helpers_prohibited: true
  ```

### A.5 OPOJD (One-Prompt One-Job Doctrine) Binding

#### A.5.1 Continuous Execution Commitment

- **Element**: `opojd.continuous_execution` or explicit OPOJD clause
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - States commitment to continuous execution
  - States execution continues until completion or constitutional block
  - Prohibits mid-execution approval requests
- **Canonical Reference**: `governance/canon/OPOJD_DOCTRINE.md`, `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` section 3
- **Severity if Missing**: HIGH - Execution model undefined
- **Format**:
  ```yaml
  opojd:
    continuous_execution: true
    mid_execution_approval_requests_prohibited: true
    assume_continue_unless_denied: true
  ```
  OR in contract text:
  ```
  This agent commits to OPOJD continuous execution.
  This agent completes entire "Build to Green" in one cycle.
  This agent does NOT pause mid-build for approval.
  This agent assumes permission to continue unless governance denies.
  ```

#### A.5.2 Legitimate Pause Points Enumeration

- **Element**: `opojd.legitimate_pause_points` or explicit enumeration
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - Lists ONLY legitimate pause triggers (CS2, governance violation, unrecoverable failure, ambiguity)
  - Does not include "ask for approval" or "await permission"
- **Canonical Reference**: `governance/canon/OPOJD_DOCTRINE.md` sections 172-235, `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` section 3.1.3
- **Severity if Missing**: HIGH - Pause conditions unclear
- **Format**:
  ```yaml
  opojd:
    legitimate_pause_points:
      - "CS2_ARCHITECTURE_APPROVAL"
      - "GOVERNANCE_VIOLATION"
      - "UNRECOVERABLE_FAILURE"
      - "AMBIGUITY_OR_CONFLICT"
  ```

### A.6 Architecture-as-Law Binding

#### A.6.1 Architecture Precondition Requirement

- **Element**: `architecture.precondition_required` or explicit clause
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - States architecture MUST exist before building
  - States builder cannot build without architecture
  - States builder escalates if architecture missing/incomplete
- **Canonical Reference**: `BUILD_PHILOSOPHY.md`, `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` section 9
- **Severity if Missing**: CRITICAL - Architecture-as-Law broken
- **Format**:
  ```yaml
  architecture:
    precondition_required: true
    build_without_architecture_prohibited: true
    architecture_gaps_trigger_escalation: true
  ```

#### A.6.2 Architecture Conformance Requirement

- **Element**: `architecture.conformance_required` or explicit clause
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - States implementation MUST match architecture exactly
  - Prohibits "helpful improvements" or deviations
  - States architecture mismatch = STOP condition
- **Canonical Reference**: `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` sections 9.2.2 and 9.2.3
- **Severity if Missing**: CRITICAL - Architecture enforcement missing
- **Format**:
  ```yaml
  architecture:
    exact_conformance_required: true
    deviations_prohibited: true
    mismatch_triggers_stop: true
  ```

### A.7 Evidence Production Requirements

#### A.7.1 Required Artifacts Declaration

- **Element**: `evidence.required_artifacts` or explicit list
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - Includes at minimum: BUILD_QA_REPORT.json, GOVERNANCE_COMPLIANCE_REPORT.json, SUMMARY.md
  - Specifies `.qa/builder/` location
- **Canonical Reference**: `governance/canon/BUILDER_FIRST_PR_MERGE_MODEL.md`, `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` section 5
- **Severity if Missing**: BLOCKER - Evidence requirements undefined
- **Format**:
  ```yaml
  evidence:
    required_artifacts:
      - ".qa/builder/BUILD_QA_REPORT.json"
      - ".qa/builder/GOVERNANCE_COMPLIANCE_REPORT.json"
      - ".qa/builder/SUMMARY.md"
    schemas:
      BUILD_QA_REPORT: "governance/schemas/BUILD_QA_REPORT.schema.json"
      GOVERNANCE_COMPLIANCE_REPORT: "governance/schemas/GOVERNANCE_COMPLIANCE_REPORT.schema.json"
  ```

#### A.7.2 Artifact Schema Compliance

- **Element**: `evidence.schema_compliance` or explicit commitment
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - States artifacts MUST conform to schemas
  - References canonical schemas
- **Canonical Reference**: `governance/policy/BUILDER_QA_HANDOVER_POLICY.md`, `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` section 5.2
- **Severity if Missing**: HIGH - Artifact validation impossible
- **Format**:
  ```yaml
  evidence:
    schema_compliance: "MANDATORY"
    schema_validation_before_handover: true
  ```

#### A.7.3 Evidence Integrity Commitment

- **Element**: `evidence.integrity` or explicit clause
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - States artifacts accurately reflect build state
  - Prohibits placeholder or fake artifacts
  - States artifacts are immutable after handover
- **Canonical Reference**: `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` section 5.2
- **Severity if Missing**: CRITICAL - Evidence trustworthiness unclear
- **Format**:
  ```yaml
  evidence:
    integrity: "MANDATORY"
    accurate_reflection_required: true
    placeholders_prohibited: true
    immutable_after_handover: true
  ```

### A.8 Gate Compliance Requirements

#### A.8.1 Gate Applicability Awareness

- **Element**: `gates.applicable_to_builders` or explicit list
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - Lists gates applicable to builders (Build-to-Green, Architecture Completeness, Builder QA Artifact, Zero Test Debt, Scope Compliance)
  - Acknowledges builder-role-specific gate requirements
- **Canonical Reference**: `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md`, `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` section 7
- **Severity if Missing**: HIGH - Gate requirements unclear
- **Format**:
  ```yaml
  gates:
    applicable_gates:
      - "build_to_green_enforcement"
      - "architecture_completeness"
      - "builder_qa_artifact_validation"
      - "zero_test_debt_enforcement"
      - "scope_compliance"
  ```

#### A.8.2 Pre-Merge Compliance Commitment

- **Element**: `gates.pre_merge_compliance` or explicit clause
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - States all applicable gates MUST pass before merge
  - States builder responsible for achieving gate compliance
  - Prohibits gate bypass requests
- **Canonical Reference**: `GOVERNANCE_GATE_CANON.md`, `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` section 7.3
- **Severity if Missing**: HIGH - Gate enforcement unclear
- **Format**:
  ```yaml
  gates:
    pre_merge_compliance: "MANDATORY"
    gate_bypass_prohibited: true
    builder_responsible_for_compliance: true
  ```

### A.9 Escalation Requirements

#### A.9.1 Escalation Format Specification

- **Element**: `escalation.format` or explicit template
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - Specifies required escalation fields (Category, Severity, Trigger, Canonical References, Context, etc.)
  - References escalation policy
- **Canonical Reference**: `governance/escalation/ESCALATION_POLICY.md`, `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` section 11.1
- **Severity if Missing**: MEDIUM - Escalation format inconsistent
- **Format**:
  ```yaml
  escalation:
    format: "governance/escalation/ESCALATION_POLICY.md"
    required_fields:
      - "category"
      - "severity"
      - "trigger"
      - "canonical_references"
      - "context"
      - "resolution_options"
  ```

#### A.9.2 Escalation Triggers Enumeration

- **Element**: `escalation.triggers` or explicit list
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - Lists escalation triggers (ambiguity, architecture gap, governance conflict, scope exceeded, etc.)
  - Covers all categories from survey
- **Canonical Reference**: `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` section 11.2
- **Severity if Missing**: MEDIUM - Escalation conditions unclear
- **Format**:
  ```yaml
  escalation:
    triggers:
      - "AMBIGUOUS_INSTRUCTION"
      - "ARCHITECTURE_MISSING_OR_INCOMPLETE"
      - "GOVERNANCE_CONFLICT"
      - "SCOPE_BOUNDARY_EXCEEDED"
      - "CONSTITUTIONAL_SAFEGUARD_TRIGGERED"
      - "UNRECOVERABLE_TECHNICAL_FAILURE"
  ```

#### A.9.3 Escalation Target

- **Element**: `escalation.target`
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists
  - Value is "FOREMAN" or "FM"
- **Canonical Reference**: `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` section 11
- **Severity if Missing**: HIGH - Escalation destination unclear
- **Format**:
  ```yaml
  escalation:
    target: "FOREMAN"
  ```

### A.10 Prohibited Roles Declaration

#### A.10.1 What Builder Is NOT

- **Element**: `prohibited_roles` or explicit section
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - Lists prohibited roles (Architect, QA Designer, Governance Administrator, Foreman, Requirements Interpreter, etc.)
  - Matches list from survey section 12
- **Canonical Reference**: `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` section 12
- **Severity if Missing**: HIGH - Role boundaries unclear
- **Format**:
  ```yaml
  prohibited_roles:
    - "ARCHITECT"
    - "QA_DESIGNER"
    - "GOVERNANCE_ADMINISTRATOR"
    - "FOREMAN_ORCHESTRATOR"
    - "REQUIREMENTS_INTERPRETER"
    - "SECURITY_AUDITOR"
  ```
  OR in contract text:
  ```
  This agent is NOT:
  - An Architect (does not design architecture)
  - A QA Designer (does not design tests)
  - A Governance Administrator (does not modify governance)
  - A Foreman (does not orchestrate other agents)
  - A Requirements Interpreter (does not infer intent)
  ```

### A.11 Technology Governance Binding

#### A.11.1 Approved Technology Stack Requirement

- **Element**: `technology.approved_stack_only` or explicit clause
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - States only approved technologies may be used
  - Prohibits introducing new dependencies without approval
  - References TSP (Technology Survey Protocol) if applicable
- **Canonical Reference**: `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` section 10
- **Severity if Missing**: MEDIUM - Technology governance unclear
- **Format**:
  ```yaml
  technology:
    approved_stack_only: true
    new_dependencies_require_approval: true
    tsp_compliance_required: true
  ```

### A.12 Enhancement Capture Requirement

#### A.12.1 Mandatory Enhancement Evaluation

- **Element**: `enhancement_capture.mandatory` or explicit clause
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - States enhancement evaluation required at end of work unit
  - States enhancements marked as PARKED (not for immediate execution)
  - References enhancement capture standard
- **Canonical Reference**: `governance/canon/MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md`, `governance/profiles/builder.v1.md` section 10
- **Severity if Missing**: LOW - Enhancement capture incomplete
- **Format**:
  ```yaml
  enhancement_capture:
    mandatory: true
    end_of_work_evaluation_required: true
    parked_enhancements_not_executed: true
  ```

---

## SECTION B: ROLE-SPECIFIC REQUIREMENTS

### B.1 UI Builder Specific

#### B.1.1 UI Component Standards

- **Element**: `ui_standards` or explicit UI guidelines
- **Requirement**: CONDITIONAL (if role = "UI Builder")
- **Validation**: 
  - Field exists if role is UI Builder
  - References UI component standards, accessibility requirements
- **Severity if Missing**: MEDIUM
- **Format**:
  ```yaml
  ui_standards:
    framework: "React"
    component_library: "shadcn/ui"
    accessibility: "WCAG 2.1 AA"
    responsive: true
  ```

### B.2 API Builder Specific

#### B.2.1 API Contract Standards

- **Element**: `api_standards` or explicit API guidelines
- **Requirement**: CONDITIONAL (if role = "API Builder")
- **Validation**: 
  - Field exists if role is API Builder
  - References API contract standards (REST, GraphQL, etc.)
- **Severity if Missing**: MEDIUM
- **Format**:
  ```yaml
  api_standards:
    style: "REST"
    versioning: "URI versioning"
    authentication: "JWT"
    documentation: "OpenAPI 3.0"
  ```

### B.3 Schema Builder Specific

#### B.3.1 Schema Evolution Standards

- **Element**: `schema_standards` or explicit schema guidelines
- **Requirement**: CONDITIONAL (if role = "Schema Builder")
- **Validation**: 
  - Field exists if role is Schema Builder
  - References schema evolution, backward compatibility requirements
- **Severity if Missing**: MEDIUM
- **Format**:
  ```yaml
  schema_standards:
    backward_compatibility: "MANDATORY"
    migration_strategy: "forward_compatible"
    validation: "JSON Schema"
  ```

### B.4 Integration Builder Specific

#### B.4.1 Integration Patterns

- **Element**: `integration_standards` or explicit integration guidelines
- **Requirement**: CONDITIONAL (if role = "Integration Builder")
- **Validation**: 
  - Field exists if role is Integration Builder
  - References integration patterns, error handling, retry logic
- **Severity if Missing**: MEDIUM
- **Format**:
  ```yaml
  integration_standards:
    error_handling: "circuit_breaker"
    retry_strategy: "exponential_backoff"
    timeout_policy: "30s"
  ```

### B.5 QA Builder Specific

#### B.5.1 QA Coverage Standards

- **Element**: `qa_standards` or explicit QA guidelines
- **Requirement**: CONDITIONAL (if role = "QA Builder")
- **Validation**: 
  - Field exists if role is QA Builder
  - References test coverage requirements, test types
- **Severity if Missing**: HIGH
- **Format**:
  ```yaml
  qa_standards:
    unit_test_coverage: "80%"
    integration_test_required: true
    e2e_test_required: true
    test_framework: "Jest"
  ```

---

## SECTION C: CONSTITUTIONAL BINDING (High-Level Governance Commitments)

### C.1 Governance Supremacy Acknowledgment

- **Element**: `constitutional.governance_supremacy` or explicit clause
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - States governance rules override all other considerations
  - States no builder preference may override governance
- **Canonical Reference**: Governance Supremacy Rule (GSR)
- **Severity if Missing**: CRITICAL
- **Format**:
  ```yaml
  constitutional:
    governance_supremacy: true
    governance_overrides_preferences: true
  ```

### C.2 Constitutional Safeguards Acknowledgment

- **Element**: `constitutional.safeguards` or explicit clause
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - Acknowledges CS1-CS6 safeguards
  - States safeguards MUST be respected
- **Canonical Reference**: BUILD_PHILOSOPHY.md, various CS documents
- **Severity if Missing**: CRITICAL
- **Format**:
  ```yaml
  constitutional:
    safeguards:
      - "CS1_SECURITY_AND_SECRETS"
      - "CS2_ARCHITECTURE_APPROVAL"
      - "CS3_INCIDENT_WORKFLOW"
      - "CS4_COMPLIANCE"
      - "CS5_PERFORMANCE"
      - "CS6_EXECUTION_BOUNDARY"
  ```

### C.3 One-Time Build Law Commitment

- **Element**: `constitutional.one_time_build` or explicit clause
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - States commitment to One-Time Build Law
  - States build must be fully functional on first delivery
  - Prohibits "MVP" or "iterate later" approaches
- **Canonical Reference**: BUILD_PHILOSOPHY.md
- **Severity if Missing**: CRITICAL
- **Format**:
  ```yaml
  constitutional:
    one_time_build: true
    fully_functional_first_delivery: true
    mvp_prohibited: true
    iteration_prohibited: true
  ```

### C.4 Quality Integrity Contract Commitment

- **Element**: `constitutional.quality_integrity` or explicit clause
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - States commitment to QIC (Quality Integrity Contract)
  - States QA must be comprehensive and accurate
- **Canonical Reference**: QA_POLICY_MASTER.md
- **Severity if Missing**: CRITICAL
- **Format**:
  ```yaml
  constitutional:
    quality_integrity_contract: true
    qa_comprehensive_and_accurate: true
  ```

### C.5 Authority Hierarchy Acknowledgment

- **Element**: `constitutional.authority_hierarchy` or explicit clause
- **Requirement**: MANDATORY
- **Validation**: 
  - Field exists OR explicit section in contract text
  - Lists authority hierarchy (Johan → Governance → FM → Builder)
  - States higher authority always prevails
- **Canonical Reference**: GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md section 1
- **Severity if Missing**: HIGH
- **Format**:
  ```yaml
  constitutional:
    authority_hierarchy:
      1: "Johan (Human Owner)"
      2: "Canonical Governance"
      3: "Foreman (FM)"
      4: "Builder Contract"
    higher_authority_prevails: true
  ```

---

## VALIDATION RULES

### Machine Validation Requirements

Automated validators MUST:

1. **Parse Contract**: Successfully parse contract file (YAML, JSON, Markdown with YAML frontmatter)
2. **Check All MANDATORY Items**: Verify every item marked MANDATORY is present
3. **Check CONDITIONAL Items**: Verify conditional items present when condition applies
4. **Validate Format**: Ensure values match specified formats
5. **Validate References**: Ensure referenced files/paths exist
6. **Generate Report**: Produce pass/fail report for each item
7. **Block on Failure**: Return INVALID if ANY mandatory item fails

### Validation Report Format

```json
{
  "contract_path": ".github/agents/ui-builder.agent.md",
  "validation_timestamp": "2026-01-01T10:00:00Z",
  "validator_version": "1.0.0",
  "overall_status": "VALID" | "INVALID",
  "required_items_checked": 45,
  "required_items_passed": 45,
  "required_items_failed": 0,
  "items": [
    {
      "section": "A.1.1",
      "element": "role",
      "status": "PASS",
      "found_value": "UI Builder"
    },
    {
      "section": "A.2.1",
      "element": "governance.canon",
      "status": "PASS",
      "found_value": "github:MaturionISMS/maturion-foreman-governance/governance/canon"
    }
  ],
  "failures": [],
  "warnings": []
}
```

---

## USAGE IN CI/CD

### Pre-Recruitment Validation

Before any builder agent is recruited/activated:

```bash
# Validate contract
governance-validator --type builder --contract .github/agents/builder.agent.md

# Exit codes:
# 0 = VALID (all checks pass)
# 1 = INVALID (one or more checks fail)
# 2 = ERROR (validation failed to run)
```

### Pre-Merge Validation

In PR gates:

```yaml
- name: Validate Builder Contracts
  run: |
    for contract in .github/agents/*.agent.md; do
      governance-validator --type builder --contract "$contract" || exit 1
    done
```

---

## MAINTENANCE AND EVOLUTION

### Coupling Rule

**CRITICAL**: This checklist MUST be kept synchronized with:
- `governance/canon/GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` (source of requirements)
- Builder contract schemas (machine validation)
- Enforcement tooling (validator implementation)

**Update Rule**: If `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` changes to add/modify builder obligations, this checklist MUST be updated in the SAME work unit.

### Ratchet Rule

**Non-Regression**: Items in this checklist may be ADDED but never REMOVED or made OPTIONAL (unless explicitly deprecated through constitutional process).

### Versioning

This checklist follows semantic versioning:
- **Major version**: Breaking changes (new mandatory items)
- **Minor version**: New optional items, clarifications
- **Patch version**: Typo fixes, formatting

---

## SUMMARY

This checklist provides:

- ✅ Machine-checkable validation criteria
- ✅ Separation of universal vs. role-specific requirements
- ✅ Constitutional binding verification
- ✅ Clear severity indicators
- ✅ Canonical references for each requirement
- ✅ Validation report format
- ✅ CI/CD integration guidance

**Acceptance Criteria Met:**
- ✅ Checklist is machine-checkable
- ✅ Separates "required for any builder" vs "role-specific"
- ✅ Defines constitutional binding requirements
- ✅ Provides verification criteria

**A builder contract is VALID only if ALL MANDATORY items in this checklist are present and compliant.**

---

**END OF BUILDER CONTRACT BINDING CHECKLIST v1.0.0**
