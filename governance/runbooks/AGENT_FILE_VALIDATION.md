# .agent File Validation Process

## Status
**Type**: Governance Runbook — Validation Procedure  
**Authority**: Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-01-12  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Purpose**: Define validation process for repository `.agent` files

---

## 1. Purpose

This runbook defines the **complete validation process** for repository `.agent` files, ensuring:
- Structural correctness against schema
- Mandatory bindings are present
- Canonical references are valid
- No governance duplication or conflicts

**Use this runbook**:
- During repository initialization (FPC layer-down)
- When modifying `.agent` files
- During governance drift checks
- As part of CI validation (if implemented)

**Authority**: This process is mandatory for all governed repositories.

---

## 2. Scope

This validation process applies to:
- Repository-level `.agent` file at repository root
- All repositories under Maturion governance
- Manual and automated validation scenarios

This validation does NOT apply to:
- Individual agent contracts in `.github/agents/` (see `.agent.schema.md` validation)
- Application configuration files
- Build or deployment configuration

---

## 3. Prerequisites

Before validating `.agent` file:

### 3.1 Required Tools
- **YAML parser** (e.g., `yamllint`, `yq`, or Python `pyyaml`)
- **Git** (to verify canonical references)
- **Internet access** (to reach canonical governance repository)

### 3.2 Required Knowledge
- **AGENT_FILE_SCHEMA.md** (in `governance/schemas/`)
- **AGENT_FILE_BINDING_REQUIREMENTS.md** (in `governance/canon/`)
- Repository type and agent roster

### 3.3 Required Access
- Read access to canonical governance repository
- Read access to repository being validated

---

## 4. Validation Levels

### Level 1: Syntax Validation
**Goal**: Verify file is parseable and structurally correct  
**Time**: ~30 seconds  
**Automation**: Fully automatable

### Level 2: Schema Compliance
**Goal**: Verify all required fields present and types correct  
**Time**: ~2 minutes  
**Automation**: Fully automatable

### Level 3: Semantic Validation
**Goal**: Verify bindings, references, and cross-field rules  
**Time**: ~5-10 minutes  
**Automation**: Partially automatable (requires network access)

### Level 4: Governance Alignment
**Goal**: Verify no duplication, conflicts, or drift from canon  
**Time**: ~10-15 minutes  
**Automation**: Requires human judgment

**Recommendation**: Always perform all 4 levels during initialization. For routine checks, Levels 1-3 sufficient.

---

## 5. Level 1: Syntax Validation

### 5.1 File Existence Check

**Command**:
```bash
ls -la .agent
```

**Expected Output**: File exists at repository root

**Failure**: If file missing, HALT and create `.agent` file per FPC guide.

---

### 5.2 YAML Front Matter Check

**Command**:
```bash
head -n 1 .agent
```

**Expected Output**: First line is `---`

**Command**:
```bash
grep -n "^---$" .agent | head -n 2
```

**Expected Output**: Two lines with `---` (YAML front matter delimiters)

**Failure**: If delimiters missing or malformed, HALT and fix YAML front matter.

---

### 5.3 YAML Parseability Check

**Command** (using `yq`):
```bash
yq eval '.id' .agent
```

**Expected Output**: Repository ID printed (not error)

**Alternative** (using Python for robust YAML parsing):
```bash
python3 -c "
import yaml
with open('.agent', 'r') as f:
    content = f.read()
    # Split on --- delimiters and get YAML section
    parts = content.split('---')
    if len(parts) >= 3:
        yaml_content = parts[1]
        data = yaml.safe_load(yaml_content)
        print(data)
" || echo "ERROR: YAML parsing failed"
```

**Expected Output**: No syntax errors

**Failure**: If YAML unparseable, review syntax errors and fix.

---

### 5.4 Level 1 Checklist

- [ ] `.agent` file exists at repository root
- [ ] YAML front matter present (delimited by `---`)
- [ ] YAML is parseable without syntax errors
- [ ] No trailing whitespace errors (optional but recommended)

**Exit Code**: 
- **0 (PASS)**: All checks pass, proceed to Level 2
- **1 (FAIL)**: Syntax errors present, HALT and remediate

---

## 6. Level 2: Schema Compliance

### 6.1 Required Fields Check

**Check**: All required top-level fields present

**Required Fields** (from AGENT_FILE_SCHEMA.md Section 4):
- `id`
- `description`
- `governance` (with sub-fields: `canon.repository`, `canon.path`, `canon.reference`)
- `scope` (with sub-fields: `repository`, `allowed_paths`, `restricted_paths`, `escalation_required_paths`)
- `capabilities`
- `constraints`
- `enforcement`
- Exactly ONE of: `agent` OR `agents`

**Command** (using `yq`):
```bash
yq eval '.id' .agent
yq eval '.description' .agent
yq eval '.governance.canon.repository' .agent
yq eval '.governance.canon.path' .agent
yq eval '.governance.canon.reference' .agent
yq eval '.scope.repository' .agent
yq eval '.scope.allowed_paths' .agent
yq eval '.scope.restricted_paths' .agent
yq eval '.scope.escalation_required_paths' .agent
yq eval '.capabilities' .agent
yq eval '.constraints' .agent
yq eval '.enforcement' .agent
```

**Expected Output**: All fields return values (not `null`)

**Command** (check agent/agents mutually exclusive):
```bash
yq eval 'has("agent")' .agent
yq eval 'has("agents")' .agent
```

**Expected Output**: Exactly one returns `true`

**Failure**: If any required field missing, HALT and add missing fields per schema.

---

### 6.2 Type Validation

**Check**: All fields have correct types

**Type Requirements**:
- `id`: String
- `description`: String
- `governance.canon.*`: Strings
- `scope.*`: Strings or Arrays of Strings
- `capabilities.*`: Booleans
- `constraints.*`: Booleans or Enums
- `enforcement.*`: Strings (enums)
- `agent`: Object or null
- `agents`: Array or null

**Command** (example for booleans):
```bash
yq eval '.capabilities.execute_changes' .agent
```

**Expected Output**: `true` or `false` (not `yes`, `no`, `1`, `0`)

**Failure**: If types incorrect, HALT and fix field types.

---

### 6.3 Mandatory Constraint Values

**Check**: Required constraints have mandatory values

**Required Constraints** (from AGENT_FILE_SCHEMA.md Section 4.9):
- `governance_interpretation`: MUST be `forbidden`
- `scope_expansion`: MUST be `forbidden`
- `zero_test_debt`: MUST be `required` or `true`
- `build_to_green_only`: MUST be `true`
- `architecture_immutable_during_build`: MUST be `true`
- `secrets_and_env_config`: MUST be `forbidden`

**Command**:
```bash
yq eval '.constraints.governance_interpretation' .agent  # Must be "forbidden"
yq eval '.constraints.scope_expansion' .agent           # Must be "forbidden"
yq eval '.constraints.zero_test_debt' .agent            # Must be "required" or true
yq eval '.constraints.build_to_green_only' .agent       # Must be true
yq eval '.constraints.architecture_immutable_during_build' .agent  # Must be true
yq eval '.constraints.secrets_and_env_config' .agent    # Must be "forbidden"
```

**Expected Output**: All return mandatory values

**Failure**: If any constraint has incorrect value, HALT and fix per schema requirements.

---

### 6.4 Scope Protection Rules

**Check**: `.agent` file itself is protected

**Required**:
- `.agent` MUST appear in `restricted_paths` or `escalation_required_paths`
- `.github/agents/**` MUST appear in `restricted_paths` or `escalation_required_paths`

**Command**:
```bash
yq eval '.scope.restricted_paths[] | select(. == ".agent")' .agent
# OR
yq eval '.scope.escalation_required_paths[] | select(. == ".agent")' .agent
```

**Expected Output**: `.agent` found in one of the lists

**Failure**: If `.agent` not protected, HALT and add to `restricted_paths`.

---

### 6.5 Level 2 Checklist

- [ ] All required fields present
- [ ] All fields have correct types
- [ ] Mandatory constraint values are correct
- [ ] `.agent` file is in restricted or escalation-required paths
- [ ] `.github/agents/**` is protected
- [ ] Exactly one of `agent` or `agents` present

**Exit Code**:
- **0 (PASS)**: All checks pass, proceed to Level 3
- **1 (FAIL)**: Schema violations present, HALT and remediate

---

## 7. Level 3: Semantic Validation

### 7.1 Canonical Governance Reference Validation

**Check**: Canonical governance repository is accessible and reference valid

**Command**:
```bash
CANON_REPO=$(yq eval '.governance.canon.repository' .agent)
CANON_REF=$(yq eval '.governance.canon.reference' .agent)

# Verify repository exists (requires git)
git ls-remote "https://github.com/$CANON_REPO" "$CANON_REF" >/dev/null
```

**Expected Output**: Exit code 0 (reference exists)

**Failure**: If repository inaccessible or reference invalid, HALT and verify:
- Repository name correct
- Branch/tag exists
- Access permissions granted

---

### 7.2 Bindings Path Validation

**Check**: All binding paths exist in canonical governance repository

**Command** (for each binding):
```bash
CANON_REPO=$(yq eval '.governance.canon.repository' .agent)
CANON_REF=$(yq eval '.governance.canon.reference' .agent)

# Clone canonical repo (or use existing local copy)
git clone --depth 1 --branch "$CANON_REF" "https://github.com/$CANON_REPO" /tmp/canon-validation

# Check each binding path exists
yq eval '.governance.bindings[].path' .agent | while read -r BINDING_PATH; do
  if [ ! -f "/tmp/canon-validation/$BINDING_PATH" ]; then
    echo "ERROR: Binding path not found: $BINDING_PATH"
    exit 1
  fi
done
```

**Expected Output**: All binding paths exist

**Failure**: If any binding path missing, HALT and verify:
- Path correct (no typos)
- Canonical document still exists (not deprecated/moved)
- Reference is up-to-date

---

### 7.3 Mandatory Bindings Check

**Check**: Repository has all mandatory bindings for its type

**Procedure**:
1. Determine repository type (application, governance, library)
2. Identify agent roster (FM, builders, liaison, watchdog)
3. Consult **AGENT_FILE_BINDING_REQUIREMENTS.md** Section 2-4
4. Verify all mandatory bindings present

**Example** (for application repo with FM + builders):

**Required Bindings**:
- Tier-0 (Section 2): `governance-purpose-scope`, `agent-recruitment`, `governance-ripple-model`
- Application (Section 3.1): `fm-authority-model`, `builder-bindings`, `execution-bootstrap-protocol`
- FM (Section 4.1): `fm-builder-appointment`, `fm-governance-loading`, `fm-runtime-enforcement`
- Builders (Section 4.2): `build-tree-model` (if applicable)

**Command**:
```bash
yq eval '.governance.bindings[].id' .agent
```

**Expected Output**: All mandatory binding IDs present in list

**Failure**: If mandatory binding missing, HALT and add per AGENT_FILE_BINDING_REQUIREMENTS.md.

---

### 7.4 Agent Contract Path Validation

**Check**: All agent contract paths exist in repository

**Command** (if using `agents` roster):
```bash
yq eval '.agents[].contract' .agent | while read -r CONTRACT_PATH; do
  if [ ! -f "$CONTRACT_PATH" ]; then
    echo "ERROR: Agent contract not found: $CONTRACT_PATH"
    exit 1
  fi
done
```

**Expected Output**: All contract files exist

**Failure**: If contract missing, HALT and create agent contracts per templates.

---

### 7.5 Cross-Field Validation

**Check**: Cross-field rules are satisfied

**Rule 1**: If `read_only: true`, then `allowed_paths` must be empty

**Command**:
```bash
READ_ONLY=$(yq eval '.capabilities.read_only' .agent)
ALLOWED_COUNT=$(yq eval '.scope.allowed_paths | length' .agent)

if [ "$READ_ONLY" = "true" ] && [ "$ALLOWED_COUNT" -gt 0 ]; then
  echo "ERROR: read_only=true but allowed_paths is not empty"
  exit 1
fi
```

**Rule 2**: If `modify_migrations: true`, migration paths must be in `escalation_required_paths`

**Command**:
```bash
MODIFY_MIGRATIONS=$(yq eval '.capabilities.modify_migrations' .agent)

if [ "$MODIFY_MIGRATIONS" = "true" ]; then
  # Check for migration-related paths in escalation_required_paths
  yq eval '.scope.escalation_required_paths[]' .agent | grep -i "migration"
  if [ $? -ne 0 ]; then
    echo "WARNING: modify_migrations=true but no migration paths in escalation_required_paths"
  fi
fi
```

**Failure**: If cross-field rules violated, HALT and fix configuration.

---

### 7.6 Level 3 Checklist

- [ ] Canonical governance repository accessible
- [ ] Canonical reference (branch/tag) exists
- [ ] All binding paths exist in canonical repo
- [ ] All mandatory bindings present for repository type
- [ ] All agent contract paths exist
- [ ] Cross-field validation rules satisfied

**Exit Code**:
- **0 (PASS)**: All checks pass, proceed to Level 4
- **1 (FAIL)**: Semantic errors present, HALT and remediate

---

## 8. Level 4: Governance Alignment

### 8.1 Duplication Check

**Check**: No duplication of canonical governance content

**Manual Review**:
1. Open `.agent` file
2. Look for Markdown content after YAML front matter
3. Verify Markdown does NOT duplicate:
   - Lists of doctrine files
   - Content from canonical documents
   - Extended authority diagrams
   - Constitutional principles
   - Detailed workflow descriptions

**Rationale**: `.agent` file references governance, does not restate it.

**Failure**: If duplication found, HALT and remove duplicated content. Replace with references.

---

### 8.2 Binding Relevance Check

**Check**: All bindings are relevant to repository

**Manual Review**:
1. Read each binding's purpose from canonical document
2. Verify binding applies to repository's agents or operations
3. Remove bindings that are tangential or not directly used

**Example**: If repository has no builders, remove builder-specific bindings.

**Failure**: If irrelevant bindings found, WARN (not fail). Consider removing for clarity.

---

### 8.3 Consistency with Agent Contracts

**Check**: Repository `.agent` file consistent with individual agent contracts

**Manual Review**:
1. Read each agent contract in `.github/agents/`
2. Verify agent contract scopes align with repository scope
3. Verify agent contract bindings are subset of repository bindings
4. Verify no contradictions in authority or constraints

**Failure**: If contradictions found, HALT and resolve conflicts. Agent contracts must align with repository `.agent`.

---

### 8.4 Governance Version Alignment

**Check**: Repository tracks governance version correctly

**Procedure**:
1. Check `governance/alignment/GOVERNANCE_ALIGNMENT.md` exists
2. Verify governance version matches `.agent` file's `governance.canon.reference`
3. Verify no drift detected in alignment document

**Command**:
```bash
CANON_REF=$(yq eval '.governance.canon.reference' .agent)
ALIGNMENT_VERSION=$(grep "Governance Repository Version" governance/alignment/GOVERNANCE_ALIGNMENT.md | head -1)

echo "Canon Reference: $CANON_REF"
echo "Alignment Doc: $ALIGNMENT_VERSION"
```

**Expected Output**: Versions match

**Failure**: If versions mismatch, HALT and update alignment document or canonical reference.

---

### 8.5 Level 4 Checklist

- [ ] No duplication of canonical governance content
- [ ] All bindings are relevant to repository operations
- [ ] Repository `.agent` consistent with agent contracts
- [ ] Governance version tracked in alignment document
- [ ] No contradictions with canonical governance

**Exit Code**:
- **0 (PASS)**: All checks pass, `.agent` file is valid
- **1 (FAIL)**: Governance alignment issues present, HALT and remediate

---

## 9. Validation Outcomes

### Outcome: PASS (All Levels)

**Status**: `.agent` file is **valid and governance-compliant**

**Next Steps**:
- Document validation in initialization or commissioning evidence
- Proceed with repository operations
- Schedule next drift check (recommend: quarterly)

### Outcome: FAIL (Any Level)

**Status**: `.agent` file is **invalid**

**Next Steps**:
- HALT all agent operations in repository
- Remediate issues identified in validation
- Re-run validation from Level 1
- Do NOT proceed until validation passes

### Outcome: WARN (Level 4 Only)

**Status**: `.agent` file is **technically valid but has quality issues**

**Next Steps**:
- Consider remediation (optional but recommended)
- Document warnings in validation report
- Proceed with operations but schedule review

---

## 10. Validation Automation

### 10.1 Automatable Checks

The following checks can be fully automated:
- **Level 1**: All syntax checks
- **Level 2**: All schema compliance checks
- **Level 3**: Canonical reference validation, binding path validation, mandatory bindings check

**Recommended Automation**:
- CI workflow that runs Levels 1-3 on `.agent` file changes
- Pre-commit hook for Level 1 (syntax)
- Scheduled job for Level 3 (drift detection)

### 10.2 Validation Script Guidance

**Script Structure**:
```bash
#!/bin/bash
# .agent File Validation Script

set -e

echo "=== Level 1: Syntax Validation ==="
# Run Level 1 checks...

echo "=== Level 2: Schema Compliance ==="
# Run Level 2 checks...

echo "=== Level 3: Semantic Validation ==="
# Run Level 3 checks...

echo "=== Validation PASSED ==="
exit 0
```

**Tool Recommendations**:
- **YAML parsing**: `yq` (Go-based, fast, widely available)
- **Git operations**: Standard `git` CLI
- **CI integration**: GitHub Actions, GitLab CI, or any CI platform

**Script Location**: `governance/scripts/validate-agent-file.sh` (if created)

### 10.3 Manual Review Requirements

The following checks REQUIRE human judgment:
- **Level 4**: All governance alignment checks
- Duplication detection (requires understanding of governance content)
- Binding relevance (requires repository context)
- Contradiction detection (requires governance expertise)

**Recommendation**: Automate Levels 1-3, require human review for Level 4 during initialization and major changes.

---

## 11. Common Errors and Remediation

### Error: YAML Syntax Error

**Symptom**: `yq` or YAML parser fails with syntax error  
**Cause**: Malformed YAML (missing colon, incorrect indentation, etc.)  
**Remediation**:
1. Run `yq eval . .agent` to see exact error
2. Fix YAML syntax per error message
3. Validate with `yamllint .agent`
4. Re-run validation

### Error: Missing Required Field

**Symptom**: Field returns `null` when expected value  
**Cause**: Required field not present in YAML front matter  
**Remediation**:
1. Consult AGENT_FILE_SCHEMA.md Section 4 for required fields
2. Add missing field with appropriate value
3. Re-run validation

### Error: Mandatory Constraint Incorrect

**Symptom**: Constraint has non-canonical value  
**Cause**: Constraint set to value not required by schema  
**Remediation**:
1. Consult AGENT_FILE_SCHEMA.md Section 4.9 for required values
2. Update constraint to mandatory value
3. Re-run validation

### Error: Binding Path Not Found

**Symptom**: Binding path does not exist in canonical repo  
**Cause**: Typo, moved document, or outdated reference  
**Remediation**:
1. Check path spelling in `.agent` file
2. Verify document exists in canonical repo at that reference
3. If moved, update path; if deprecated, replace with new binding
4. Re-run validation

### Error: Missing Mandatory Binding

**Symptom**: Required binding not present for repository type  
**Cause**: Incomplete layer-down or binding requirements not followed  
**Remediation**:
1. Consult AGENT_FILE_BINDING_REQUIREMENTS.md for repository type
2. Add missing mandatory bindings
3. Re-run validation

### Error: Agent Contract Not Found

**Symptom**: Contract path does not exist  
**Cause**: Contract file missing or path incorrect  
**Remediation**:
1. Verify contract path spelling
2. Create agent contract if missing (use templates)
3. Update path if incorrect
4. Re-run validation

### Error: Cross-Field Rule Violation

**Symptom**: Conflicting field values (e.g., `read_only=true` with non-empty `allowed_paths`)  
**Cause**: Inconsistent capability and scope configuration  
**Remediation**:
1. Review cross-field rules in AGENT_FILE_SCHEMA.md Section 6
2. Fix conflicting fields
3. Re-run validation

---

## 12. Validation Frequency

### During Repository Initialization
**Frequency**: Every commit during FPC layer-down  
**Levels**: All (1-4)  
**Rationale**: Ensure correct initialization before commissioning

### During Active Development
**Frequency**: On every `.agent` file change  
**Levels**: 1-3 (automated via CI)  
**Rationale**: Catch errors immediately

### During Governance Drift Checks
**Frequency**: Quarterly or when governance ripple received  
**Levels**: 3-4 (focus on bindings and alignment)  
**Rationale**: Detect drift from canonical governance

### During Agent Contract Migrations
**Frequency**: Before and after migration  
**Levels**: All (1-4)  
**Rationale**: Ensure migration did not break `.agent` file

---

## 13. Validation Report Template

When documenting validation results, use this template:

```markdown
# .agent File Validation Report

**Repository**: [REPO_NAME]  
**Validation Date**: [DATE]  
**Validator**: [NAME or AGENT]  
**Validation Version**: 1.0.0 (this runbook)

## Validation Results

### Level 1: Syntax Validation
- [ ] File exists at repository root
- [ ] YAML front matter present
- [ ] YAML parseable
- **Result**: PASS / FAIL

### Level 2: Schema Compliance
- [ ] All required fields present
- [ ] All field types correct
- [ ] Mandatory constraints correct
- [ ] Scope protection rules satisfied
- **Result**: PASS / FAIL

### Level 3: Semantic Validation
- [ ] Canonical governance reference valid
- [ ] All binding paths exist
- [ ] All mandatory bindings present
- [ ] All agent contracts exist
- [ ] Cross-field rules satisfied
- **Result**: PASS / FAIL

### Level 4: Governance Alignment
- [ ] No content duplication
- [ ] All bindings relevant
- [ ] Consistent with agent contracts
- [ ] Governance version aligned
- **Result**: PASS / FAIL / WARN

## Issues Found

[List issues, remediation, and resolution]

## Overall Verdict

**Status**: VALID / INVALID  
**Validation Complete**: [DATE]  
**Next Validation Due**: [DATE + 90 days]
```

---

## 14. Related Documents

| Document | Purpose |
|----------|---------|
| **governance/schemas/AGENT_FILE_SCHEMA.md** | Schema specification for `.agent` files |
| **governance/canon/AGENT_FILE_BINDING_REQUIREMENTS.md** | Mandatory and optional bindings |
| **governance/runbooks/AGENT_FILE_MAINTENANCE.md** | Maintenance protocol for `.agent` files |
| **governance/canon/FPC_REPOSITORY_LAYERDOWN_GUIDE.md** | Layer-down procedure including `.agent` creation |

---

## 15. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-12 | Initial validation process definition |

---

## 16. Authority and Precedence

**Authority**: This validation process is canonical and mandatory for all governed repositories.

**Precedence**:
- Validation MUST be performed during repository initialization
- Validation SHOULD be performed on every `.agent` file change
- Validation MUST be performed during governance drift checks
- Failed validation MUST halt agent operations until remediated

**Enforcement**:
- CI gates SHOULD automate Levels 1-3
- FPC layer-down MUST include manual Level 4 validation
- Governance liaison MUST schedule periodic validation

---

**This is the single, authoritative validation process for repository `.agent` files.**

**Version**: 1.0.0  
**Last Updated**: 2026-01-12  
**Next Review**: 2026-07-12 (6 months)
