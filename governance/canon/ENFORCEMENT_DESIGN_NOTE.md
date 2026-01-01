# ENFORCEMENT DESIGN NOTE: Builder Contract Binding Automation

**Status**: Canonical Governance Design Specification  
**Version**: 1.0.0  
**Authority**: Maturion Engineering Leadership (Johan Ras)  
**Created**: 2026-01-01  
**Purpose**: Design for ensuring builder contract binding requirements cannot be missed again once FM is fully automated

---

## Executive Summary

This document specifies the **enforcement design** to ensure that:

1. **Builder contracts ALWAYS include all required governance submission aspects**
2. **Governance changes automatically trigger contract validation updates**
3. **Invalid or incomplete contracts CANNOT be recruited or executed**
4. **Drift between governance and contracts is detected and blocked**

**Critical Objective**: Once FM is fully automated, builder governance submission must be **impossible to miss**, **impossible to bypass**, and **automatically enforced at every stage**.

This design implements the principle: **If governance changes, contracts + validators MUST be updated in the same work unit.**

---

## Design Principles

### Principle 1: Single Source of Truth

**There is ONE authoritative source for builder obligations:**
- `governance/canon/GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` (comprehensive inventory)

All other artifacts (checklist, schemas, validators, gates) are DERIVED from this source.

### Principle 2: Governance-Contract Coupling

**Governance and contract enforcement are COUPLED:**
- Changes to governance survey → MUST update contract checklist
- Changes to contract checklist → MUST update contract schema
- Changes to contract schema → MUST update validator
- All updates happen in SAME work unit (not deferred)

### Principle 3: Fail-Closed Enforcement

**Default behavior is DENY:**
- Missing contract element → Recruitment BLOCKED
- Invalid contract → Execution BLOCKED
- Validation failure → PR merge BLOCKED
- Cannot resolve reference → Agent HALTED

### Principle 4: Machine-Enforceable, Human-Auditable

**Enforcement is automated but transparent:**
- Machines validate contracts before recruitment
- Machines enforce contracts at execution time
- Machines block non-compliant PRs at merge
- Humans can audit validation reports for transparency

---

## Architecture Components

The enforcement design consists of five interconnected components:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. CANONICAL GOVERNANCE SURVEY                              │
│    governance/canon/GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md │
│    (Single source of truth for builder obligations)        │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ derives
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. BUILDER CONTRACT BINDING CHECKLIST                       │
│    governance/canon/BUILDER_CONTRACT_BINDING_CHECKLIST.md   │
│    (Machine-checkable requirements)                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ informs
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. CONTRACT SCHEMA                                          │
│    governance/schemas/BUILDER_CONTRACT.schema.json          │
│    (JSON Schema for contract structure validation)         │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ implemented by
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. CONTRACT VALIDATOR                                        │
│    governance/tooling/validate-builder-contract.js          │
│    (Automated validation tooling)                           │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ enforced by
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. CI/CD ENFORCEMENT GATES                                  │
│    .github/workflows/builder-contract-validation-gate.yml   │
│    (Pre-merge gate blocking invalid contracts)             │
└─────────────────────────────────────────────────────────────┘
```

---

## Component 1: Canonical Governance Survey (ALREADY EXISTS)

**File**: `governance/canon/GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md`

**Purpose**: Comprehensive, categorized inventory of ALL builder obligations.

**Maintenance**:
- Updated when new governance requirements discovered
- Updated when constitutional amendments affect builders
- Updated when new failure classes identified
- ALWAYS kept as single source of truth

**Responsibility**: Governance Administrator (with FM oversight)

---

## Component 2: Builder Contract Binding Checklist (ALREADY EXISTS)

**File**: `governance/canon/BUILDER_CONTRACT_BINDING_CHECKLIST.md`

**Purpose**: Machine-checkable checklist derived from survey.

**Maintenance**:
- Updated when survey changes (SAME work unit)
- Validated against survey for completeness
- Used as specification for schema and validator

**Responsibility**: Governance Administrator (with FM oversight)

**Coupling Rule**: Survey changes → Checklist MUST update in same PR.

---

## Component 3: Contract Schema

### 3.1 Schema File

**File**: `governance/schemas/BUILDER_CONTRACT.schema.json` (TO BE CREATED)

**Purpose**: JSON Schema defining required structure of builder contracts.

**Format**: JSON Schema (Draft 7 or later)

**Structure**:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://maturion.com/schemas/builder-contract.schema.json",
  "title": "Builder Agent Contract Schema",
  "description": "Schema for validating builder agent contracts against governance requirements",
  "type": "object",
  "required": [
    "role",
    "version",
    "governance",
    "scope",
    "build_philosophy",
    "opojd",
    "architecture",
    "evidence",
    "gates",
    "escalation",
    "prohibited_roles",
    "technology",
    "constitutional"
  ],
  "properties": {
    "role": {
      "type": "string",
      "enum": ["Builder", "UI Builder", "API Builder", "Schema Builder", "Integration Builder", "QA Builder"],
      "description": "Agent role declaration"
    },
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$",
      "description": "Semantic version"
    },
    "governance": {
      "type": "object",
      "required": ["canon", "profile", "binding"],
      "properties": {
        "canon": {
          "type": "string",
          "description": "Canonical governance reference"
        },
        "profile": {
          "type": "string",
          "description": "Governance profile reference"
        },
        "binding": {
          "type": "string",
          "enum": ["MANDATORY"],
          "description": "Governance binding mode"
        }
      }
    },
    "scope": {
      "type": "object",
      "required": ["allowed_paths", "restricted_paths", "escalation_required"],
      "properties": {
        "allowed_paths": {
          "type": "array",
          "items": {"type": "string"},
          "minItems": 1
        },
        "restricted_paths": {
          "type": "array",
          "items": {"type": "string"},
          "minItems": 1
        },
        "escalation_required": {
          "type": "array",
          "items": {"type": "string"}
        }
      }
    },
    "build_philosophy": {
      "type": "object",
      "required": [
        "build_to_green",
        "zero_test_debt",
        "hundred_percent_green",
        "test_infrastructure_is_production_code"
      ],
      "properties": {
        "build_to_green": {"type": "boolean", "const": true},
        "zero_test_debt": {"type": "string", "enum": ["ABSOLUTE_MANDATE"]},
        "hundred_percent_green": {"type": "string", "enum": ["ABSOLUTE"]},
        "test_infrastructure_is_production_code": {"type": "boolean", "const": true}
      }
    },
    "opojd": {
      "type": "object",
      "required": ["continuous_execution", "legitimate_pause_points"],
      "properties": {
        "continuous_execution": {"type": "boolean", "const": true},
        "legitimate_pause_points": {
          "type": "array",
          "items": {"type": "string"},
          "minItems": 1
        }
      }
    },
    "architecture": {
      "type": "object",
      "required": ["precondition_required", "exact_conformance_required"],
      "properties": {
        "precondition_required": {"type": "boolean", "const": true},
        "exact_conformance_required": {"type": "boolean", "const": true}
      }
    },
    "evidence": {
      "type": "object",
      "required": ["required_artifacts", "schema_compliance", "integrity"],
      "properties": {
        "required_artifacts": {
          "type": "array",
          "items": {"type": "string"},
          "minItems": 3
        },
        "schema_compliance": {"type": "string", "enum": ["MANDATORY"]},
        "integrity": {"type": "string", "enum": ["MANDATORY"]}
      }
    },
    "gates": {
      "type": "object",
      "required": ["applicable_gates", "pre_merge_compliance"],
      "properties": {
        "applicable_gates": {
          "type": "array",
          "items": {"type": "string"},
          "minItems": 1
        },
        "pre_merge_compliance": {"type": "string", "enum": ["MANDATORY"]}
      }
    },
    "escalation": {
      "type": "object",
      "required": ["format", "triggers", "target"],
      "properties": {
        "format": {"type": "string"},
        "triggers": {
          "type": "array",
          "items": {"type": "string"},
          "minItems": 1
        },
        "target": {"type": "string", "enum": ["FOREMAN", "FM"]}
      }
    },
    "prohibited_roles": {
      "type": "array",
      "items": {"type": "string"},
      "minItems": 1
    },
    "technology": {
      "type": "object",
      "required": ["approved_stack_only"],
      "properties": {
        "approved_stack_only": {"type": "boolean", "const": true}
      }
    },
    "constitutional": {
      "type": "object",
      "required": [
        "governance_supremacy",
        "one_time_build",
        "quality_integrity_contract",
        "authority_hierarchy"
      ],
      "properties": {
        "governance_supremacy": {"type": "boolean", "const": true},
        "one_time_build": {"type": "boolean", "const": true},
        "quality_integrity_contract": {"type": "boolean", "const": true},
        "authority_hierarchy": {"type": "object"}
      }
    }
  }
}
```

### 3.2 Schema Maintenance

**Update Triggers**:
- Checklist adds new MANDATORY item → Schema adds required field
- Checklist modifies validation criteria → Schema updates constraints
- Checklist adds conditional requirement → Schema adds conditional logic

**Validation**:
- Schema MUST be valid JSON Schema
- Schema MUST cover all MANDATORY items from checklist
- Schema MUST be tested with valid and invalid contracts

**Responsibility**: Governance Administrator

---

## Component 4: Contract Validator

### 4.1 Validator Tool

**File**: `governance/tooling/validate-builder-contract.js` (TO BE CREATED)

**Purpose**: Automated tool to validate builder contracts against schema and checklist.

**Technology**: Node.js (for compatibility with GitHub Actions and FM runtime)

**Dependencies**:
- `ajv` (JSON Schema validation)
- `js-yaml` (YAML parsing for markdown frontmatter)
- `fs` (file system operations)

**Core Functions**:

```javascript
// validate-builder-contract.js

const Ajv = require('ajv');
const yaml = require('js-yaml');
const fs = require('fs');

class BuilderContractValidator {
  constructor(schemaPath) {
    this.schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    this.ajv = new Ajv({ allErrors: true, strict: true });
    this.validateFn = this.ajv.compile(this.schema);
  }

  /**
   * Validate a builder contract file
   * @param {string} contractPath - Path to contract file
   * @returns {object} Validation result
   */
  validate(contractPath) {
    try {
      // Parse contract (YAML frontmatter or JSON)
      const contract = this.parseContract(contractPath);
      
      // Schema validation
      const schemaValid = this.validateFn(contract);
      
      // Additional checks (beyond schema)
      const additionalChecks = this.performAdditionalChecks(contract);
      
      // Generate report
      return this.generateReport(contractPath, schemaValid, additionalChecks);
    } catch (error) {
      return {
        status: 'ERROR',
        error: error.message
      };
    }
  }

  parseContract(contractPath) {
    const content = fs.readFileSync(contractPath, 'utf8');
    
    // Try YAML frontmatter first
    if (content.startsWith('---')) {
      const match = content.match(/^---\n([\s\S]*?)\n---/);
      if (match) {
        return yaml.load(match[1]);
      }
    }
    
    // Try JSON
    try {
      return JSON.parse(content);
    } catch {
      throw new Error('Contract is not valid YAML frontmatter or JSON');
    }
  }

  performAdditionalChecks(contract) {
    const checks = [];
    
    // Check 1: Canonical governance reference is resolvable
    checks.push(this.checkGovernanceReference(contract));
    
    // Check 2: Protected paths are included in restricted_paths
    checks.push(this.checkProtectedPaths(contract));
    
    // Check 3: Escalation triggers match survey
    checks.push(this.checkEscalationTriggers(contract));
    
    // Check 4: Role-specific requirements (if applicable)
    checks.push(this.checkRoleSpecificRequirements(contract));
    
    return checks;
  }

  checkGovernanceReference(contract) {
    // TODO: Implement governance reference resolution check
    return { check: 'governance_reference', status: 'PASS' };
  }

  checkProtectedPaths(contract) {
    const requiredProtectedPaths = [
      '/governance/**',
      '.agent',
      '.github/workflows/**',
      'BUILD_PHILOSOPHY.md'
    ];
    
    const restricted = contract.scope?.restricted_paths || [];
    const missing = requiredProtectedPaths.filter(path => 
      !restricted.some(r => r.includes(path) || path.includes(r))
    );
    
    return {
      check: 'protected_paths',
      status: missing.length === 0 ? 'PASS' : 'FAIL',
      missing: missing
    };
  }

  checkEscalationTriggers(contract) {
    const requiredTriggers = [
      'AMBIGUOUS_INSTRUCTION',
      'ARCHITECTURE_MISSING_OR_INCOMPLETE',
      'GOVERNANCE_CONFLICT',
      'SCOPE_BOUNDARY_EXCEEDED'
    ];
    
    const triggers = contract.escalation?.triggers || [];
    const missing = requiredTriggers.filter(t => !triggers.includes(t));
    
    return {
      check: 'escalation_triggers',
      status: missing.length === 0 ? 'PASS' : 'FAIL',
      missing: missing
    };
  }

  checkRoleSpecificRequirements(contract) {
    // Check if role-specific requirements are present
    const role = contract.role;
    
    if (role === 'UI Builder' && !contract.ui_standards) {
      return { check: 'role_specific', status: 'FAIL', reason: 'UI standards missing' };
    }
    
    if (role === 'API Builder' && !contract.api_standards) {
      return { check: 'role_specific', status: 'FAIL', reason: 'API standards missing' };
    }
    
    return { check: 'role_specific', status: 'PASS' };
  }

  generateReport(contractPath, schemaValid, additionalChecks) {
    const allPassed = schemaValid && additionalChecks.every(c => c.status === 'PASS');
    
    return {
      contract_path: contractPath,
      validation_timestamp: new Date().toISOString(),
      validator_version: '1.0.0',
      overall_status: allPassed ? 'VALID' : 'INVALID',
      schema_validation: {
        status: schemaValid ? 'PASS' : 'FAIL',
        errors: schemaValid ? [] : this.validateFn.errors
      },
      additional_checks: additionalChecks,
      failures: additionalChecks.filter(c => c.status === 'FAIL')
    };
  }
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error('Usage: node validate-builder-contract.js <schema-path> <contract-path>');
    process.exit(2);
  }
  
  const [schemaPath, contractPath] = args;
  
  const validator = new BuilderContractValidator(schemaPath);
  const result = validator.validate(contractPath);
  
  console.log(JSON.stringify(result, null, 2));
  
  if (result.overall_status === 'VALID') {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

module.exports = BuilderContractValidator;
```

### 4.2 Validator Testing

**Test Cases**:
1. Valid contract (all requirements met) → PASS
2. Missing required field → FAIL
3. Invalid value (e.g., binding: "optional") → FAIL
4. Missing protected path → FAIL
5. Unresolvable governance reference → FAIL
6. Role-specific requirement missing → FAIL

**Test Location**: `governance/tooling/tests/validate-builder-contract.test.js`

### 4.3 Validator Maintenance

**Update Triggers**:
- Schema changes → Validator may need logic updates
- New additional checks identified → Add to `performAdditionalChecks`
- New role types → Add role-specific validation

**Responsibility**: Governance Administrator

---

## Component 5: CI/CD Enforcement Gates

### 5.1 Pre-Recruitment Gate

**Use Case**: Before builder agent is recruited into `.github/agents/`

**Gate**: Validate contract before allowing merge

**Workflow File**: `.github/workflows/builder-contract-validation-gate.yml` (TO BE CREATED)

```yaml
name: Builder Contract Validation Gate

on:
  pull_request:
    paths:
      - '.github/agents/*.agent.md'
      - '.agent'
      - '**/*.agent.md'

jobs:
  validate-builder-contracts:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install validator dependencies
        run: |
          cd governance/tooling
          npm install ajv js-yaml
      
      - name: Validate all builder contracts
        id: validate
        run: |
          schema="governance/schemas/BUILDER_CONTRACT.schema.json"
          exit_code=0
          
          for contract in .github/agents/*.agent.md .agent **/*.agent.md; do
            if [ -f "$contract" ]; then
              echo "Validating: $contract"
              
              if node governance/tooling/validate-builder-contract.js "$schema" "$contract"; then
                echo "✅ VALID: $contract"
              else
                echo "❌ INVALID: $contract"
                exit_code=1
              fi
            fi
          done
          
          exit $exit_code
      
      - name: Upload validation reports
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: validation-reports
          path: validation-reports/*.json
      
      - name: Block merge if validation fails
        if: steps.validate.outcome == 'failure'
        run: |
          echo "::error::Builder contract validation FAILED. Merge blocked."
          echo "One or more builder contracts are invalid or incomplete."
          echo "Review validation reports for details."
          exit 1
```

### 5.2 Governance Change Detection Gate

**Use Case**: When governance survey or checklist changes, ensure contract updates follow

**Gate**: Detect governance changes and require corresponding contract schema/validator updates

**Workflow File**: `.github/workflows/governance-contract-coupling-gate.yml` (TO BE CREATED)

```yaml
name: Governance-Contract Coupling Gate

on:
  pull_request:
    paths:
      - 'governance/canon/GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md'
      - 'governance/canon/BUILDER_CONTRACT_BINDING_CHECKLIST.md'

jobs:
  check-coupling:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 2  # Need previous commit for diff
      
      - name: Check if survey changed
        id: survey_changed
        run: |
          if git diff HEAD^ HEAD --name-only | grep -q "GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md"; then
            echo "changed=true" >> $GITHUB_OUTPUT
          else
            echo "changed=false" >> $GITHUB_OUTPUT
          fi
      
      - name: Check if checklist changed
        id: checklist_changed
        run: |
          if git diff HEAD^ HEAD --name-only | grep -q "BUILDER_CONTRACT_BINDING_CHECKLIST.md"; then
            echo "changed=true" >> $GITHUB_OUTPUT
          else
            echo "changed=false" >> $GITHUB_OUTPUT
          fi
      
      - name: Verify schema updated
        if: steps.survey_changed.outputs.changed == 'true' || steps.checklist_changed.outputs.changed == 'true'
        run: |
          if git diff HEAD^ HEAD --name-only | grep -q "BUILDER_CONTRACT.schema.json"; then
            echo "✅ Schema updated in same PR"
          else
            echo "::error::Governance changed but schema NOT updated"
            echo "::error::COUPLING VIOLATION: Schema must be updated in same work unit"
            exit 1
          fi
      
      - name: Verify validator updated or validated
        if: steps.survey_changed.outputs.changed == 'true' || steps.checklist_changed.outputs.changed == 'true'
        run: |
          if git diff HEAD^ HEAD --name-only | grep -q "validate-builder-contract.js"; then
            echo "✅ Validator updated in same PR"
          else
            echo "⚠️ Validator not updated - ensure no validator changes needed"
            # This is a warning, not a blocker (validator may not need changes)
          fi
```

### 5.3 Schema Validation Gate

**Use Case**: Ensure schema itself is valid JSON Schema

**Workflow File**: Integrated into `builder-contract-validation-gate.yml`

```yaml
      - name: Validate schema structure
        run: |
          node -e "
            const Ajv = require('ajv');
            const fs = require('fs');
            const schema = JSON.parse(fs.readFileSync('governance/schemas/BUILDER_CONTRACT.schema.json', 'utf8'));
            const ajv = new Ajv({ strict: true });
            const valid = ajv.validateSchema(schema);
            if (!valid) {
              console.error('Schema is invalid:', ajv.errors);
              process.exit(1);
            }
            console.log('✅ Schema structure is valid');
          "
```

---

## Drift Detection and Prevention

### Drift Type 1: Governance-Contract Drift

**Problem**: Governance survey updated but contracts not updated to match.

**Detection**:
- Manual: Governance Administrator reviews contracts against survey
- Automated: Governance-Contract Coupling Gate (above)

**Prevention**:
- Coupling rule enforced in CI
- PR fails if governance changes without schema/validator updates

### Drift Type 2: Contract-Implementation Drift

**Problem**: Builder contract promises compliance but implementation does not comply.

**Detection**:
- Runtime monitoring (FM observes builder behavior)
- Evidence trail analysis (builder artifacts vs contract promises)

**Prevention**:
- Continuous contract validation at execution time
- Builder accountability through evidence generation

### Drift Type 3: Schema-Validator Drift

**Problem**: Schema updated but validator not updated to match new constraints.

**Detection**:
- Validator test suite
- Schema validation reports showing missed checks

**Prevention**:
- Test-driven validator development
- Schema changes trigger validator tests

### Drift Type 4: Memory Corruption Drift

**Problem**: Builder's understanding of governance drifts from canonical source over time.

**Detection**:
- Builder must fetch latest governance before each task
- Builder validates governance reference is current

**Prevention**:
- Canonical governance binding with version/commit reference
- Builder MUST halt if governance cannot be fetched
- No caching of governance (always fetch latest)

---

## Deployment Roadmap

### Phase 1: Foundation (Current Work Unit)

**Deliverables**:
- ✅ `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` (COMPLETE)
- ✅ `BUILDER_CONTRACT_BINDING_CHECKLIST.md` (COMPLETE)
- ✅ `ENFORCEMENT_DESIGN_NOTE.md` (COMPLETE - this document)

**Actions**:
- Commit all three documents to governance repository
- Update governance artifact inventory

### Phase 2: Schema Creation (Next Work Unit)

**Deliverables**:
- `governance/schemas/BUILDER_CONTRACT.schema.json`

**Actions**:
- Implement JSON Schema based on checklist
- Validate schema structure
- Test schema with sample contracts (valid and invalid)

**Acceptance Criteria**:
- Schema validates all MANDATORY items from checklist
- Schema rejects contracts missing required items
- Schema tested with 10+ test cases

### Phase 3: Validator Implementation (Next Work Unit)

**Deliverables**:
- `governance/tooling/validate-builder-contract.js`
- `governance/tooling/tests/validate-builder-contract.test.js`
- `governance/tooling/package.json` (dependencies)

**Actions**:
- Implement validator tool (based on design above)
- Create test suite
- Test with real builder contracts
- Document usage

**Acceptance Criteria**:
- Validator validates contracts against schema
- Validator performs additional checks (governance reference, protected paths, etc.)
- Validator generates validation reports
- Validator has 90%+ test coverage

### Phase 4: CI Integration (Next Work Unit)

**Deliverables**:
- `.github/workflows/builder-contract-validation-gate.yml`
- `.github/workflows/governance-contract-coupling-gate.yml`

**Actions**:
- Implement pre-recruitment validation gate
- Implement governance-contract coupling gate
- Test gates with sample PRs
- Document gate behavior

**Acceptance Criteria**:
- Gate blocks PRs with invalid contracts
- Gate detects governance changes without schema updates
- Gate provides clear error messages
- Gate tested with valid and invalid scenarios

### Phase 5: Existing Contract Remediation (Next Work Unit)

**Deliverables**:
- Updated `.github/agents/*.agent.md` files (if any exist)
- Updated builder contracts across ecosystem

**Actions**:
- Run validator against all existing contracts
- Identify gaps
- Update contracts to comply with checklist
- Re-validate all contracts

**Acceptance Criteria**:
- All existing contracts pass validation
- No builder contracts remain invalid
- All contracts include full governance submission

### Phase 6: FM Integration (Future Work Unit)

**Deliverables**:
- FM recruitment logic uses validator before activating builders
- FM runtime monitors builder compliance
- FM generates compliance reports

**Actions**:
- Integrate validator into FM recruitment flow
- Add runtime compliance monitoring
- Implement automatic escalation on contract violations

**Acceptance Criteria**:
- FM cannot recruit builder with invalid contract
- FM detects and reports contract violations
- FM escalates non-compliant builder behavior

---

## Maintenance Protocol

### When Governance Survey Changes

**Trigger**: `GOVERNANCE_BUILDER_SUBMISSION_SURVEY.md` is modified

**Required Actions (SAME work unit)**:
1. Review changes and determine impact on checklist
2. Update `BUILDER_CONTRACT_BINDING_CHECKLIST.md` to reflect new requirements
3. Update `BUILDER_CONTRACT.schema.json` to enforce new requirements
4. Update validator if new checks needed
5. Test validator with updated schema
6. Update existing contracts if new mandatory items added
7. Document changes in CHANGELOG

**Validation**:
- Governance-Contract Coupling Gate enforces synchronization
- Manual review by Governance Administrator

### When Contract Schema Changes

**Trigger**: `BUILDER_CONTRACT.schema.json` is modified

**Required Actions**:
1. Validate schema structure (ensure valid JSON Schema)
2. Update validator if logic changes needed
3. Update validator tests to cover new schema constraints
4. Re-validate all existing contracts
5. Update contracts if any fail new validation

**Validation**:
- Schema validation gate enforces valid JSON Schema
- Validator tests must pass

### When Validator Changes

**Trigger**: `validate-builder-contract.js` is modified

**Required Actions**:
1. Update validator tests to cover new logic
2. Ensure all tests pass
3. Run validator against all contracts to detect regressions
4. Update documentation if usage changed

**Validation**:
- Validator test suite must pass (90%+ coverage)
- No existing valid contracts should fail validation

---

## Success Metrics

### Metric 1: Contract Completeness

**Target**: 100% of builder contracts contain all MANDATORY items from checklist

**Measurement**: Run validator against all contracts, count failures

**Threshold**: 0 failures allowed

### Metric 2: Governance-Contract Drift

**Target**: 0 instances of governance changes without corresponding contract updates

**Measurement**: Track governance change PRs, verify schema/validator updated in same PR

**Threshold**: 100% compliance with coupling rule

### Metric 3: Invalid Contract Blocking

**Target**: 0 invalid contracts recruited or executed

**Measurement**: Monitor FM recruitment attempts, count blocked vs allowed

**Threshold**: 0 invalid contracts allowed through

### Metric 4: Validation Response Time

**Target**: Contract validation completes in < 5 seconds

**Measurement**: Measure validator execution time

**Threshold**: 95% of validations complete in < 5 seconds

### Metric 5: False Positive Rate

**Target**: < 1% false positive rate (valid contracts incorrectly rejected)

**Measurement**: Track validator rejections, categorize as correct or false positive

**Threshold**: < 1% false positives

---

## Risk Mitigation

### Risk 1: Schema Too Strict (Blocks Valid Contracts)

**Mitigation**:
- Extensive testing with valid and invalid contracts
- Manual review of schema before deployment
- Gradual rollout (warning mode before blocking mode)

### Risk 2: Validator Bugs (Incorrect Validation)

**Mitigation**:
- Comprehensive test suite (90%+ coverage)
- Multiple test cases per requirement
- Manual validation of validator output

### Risk 3: Coupling Rule Not Enforced (Human Error)

**Mitigation**:
- Automated coupling gate in CI (enforces machine-checkable rule)
- Governance Administrator review as backup
- Audit trail of governance changes

### Risk 4: Existing Contracts Fail New Validation

**Mitigation**:
- Validation deployed in warning mode first
- Remediation phase before enforcement phase
- Clear documentation of required changes

### Risk 5: FM Integration Delays (Enforcement Not Automated)

**Mitigation**:
- CI gates provide interim enforcement
- Manual validation process during transition
- Phased rollout (CI first, then FM)

---

## Summary and Recommendations

### Summary

This design ensures that builder contract binding requirements **cannot be missed** through:

1. **Single Source of Truth**: Survey as authoritative source
2. **Derived Artifacts**: Checklist, schema, validator all derived from survey
3. **Coupling Rule**: Governance changes trigger contract enforcement updates in SAME work unit
4. **Machine Enforcement**: Automated validation at recruitment and merge time
5. **Drift Detection**: Automated detection of governance-contract drift
6. **Fail-Closed**: Invalid contracts blocked by default

### Recommendations

**Immediate Actions**:
1. ✅ Commit survey, checklist, and design note (current work unit)
2. Prioritize Phase 2 (schema creation) in next work unit
3. Allocate resources for validator implementation (Phase 3)

**Short-Term Actions**:
4. Deploy CI gates (Phase 4) as soon as validator ready
5. Remediate existing contracts (Phase 5)
6. Test enforcement with sample builder recruitments

**Long-Term Actions**:
7. Integrate validator into FM recruitment logic (Phase 6)
8. Establish ongoing maintenance protocol
9. Monitor success metrics quarterly

### Acceptance Criteria for Enforcement Design

Per issue requirements, this design:

- ✅ Proposes single-source-of-truth mechanism (survey → checklist → schema → validator → gates)
- ✅ Defines contract schema requirements (JSON Schema structure)
- ✅ Defines validation tooling (Node.js validator with comprehensive checks)
- ✅ Defines CI pre-merge gates (contract validation gate, coupling gate)
- ✅ Defines drift detection / ratchet rules (coupling enforcement, drift types)
- ✅ States: "If governance changes, contracts + validators MUST be updated in the same work unit" (coupling rule)

**This design is COMPLETE and READY for implementation.**

---

**END OF ENFORCEMENT DESIGN NOTE v1.0.0**
