# RIPPLE SCAN REPORT SCHEMA

## Status
**Type**: Canonical Governance Specification  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-01-02  
**Owner**: Governance Administrator  
**Required By**: ASSISTED_RIPPLE_SCAN_SCOPE.md  
**Part of**: Ripple-Wave 2.1 — Assisted Local Repository Ripple Scan

---

## 1. Purpose

This document defines the normative schema for **Ripple Scan Reports** - structured documents that surface the propagating impact of governance-class changes within a single repository.

Ripple Scan Reports serve as:
- **Pre-merge impact awareness** for governance changes
- **Ripple Intelligence documentation** for Plane 1 (Proactive Downward Ripple)
- **Human review artifacts** for informed decision-making
- **Audit trail** for governance change impact analysis

A Ripple Scan Report is valid only if it conforms to this schema.

---

## 2. Core Principles

### 2.1 Informational, Not Enforcement

Ripple Scan Reports are **informational artifacts**:
- Provide awareness of potential impact
- Support human decision-making
- Document ripple analysis
- Enable informed consent for changes

**NOT**:
- ❌ Enforcement mechanisms
- ❌ Blocking artifacts
- ❌ Gate requirements
- ❌ Mandatory remediation triggers

### 2.2 Repository-Local Scope (Wave 2.1)

Ripple Scan Reports in Wave 2.1:
- Analyze impact within single repository only
- Do not cross repository boundaries
- Do not signal to other repositories
- Provide foundation for future cross-repo intelligence

### 2.3 Confidence and Uncertainty

Ripple Scan Reports must:
- Explicitly state confidence levels
- Document uncertainties and limitations
- Acknowledge what cannot be determined
- Recommend follow-up when uncertain

**Honest uncertainty is preferred over false confidence.**

---

## 3. Report Location and Naming

### 3.1 Canonical Location

Ripple Scan Reports SHOULD be stored at:

```
.qa/ripple/RIPPLE_SCAN_REPORT.md
```

Alternative locations (for multiple scans):
```
.qa/ripple/RIPPLE_SCAN_REPORT_<TIMESTAMP>.md
```

### 3.2 File Naming Conventions

- Primary report: `RIPPLE_SCAN_REPORT.md`
- Timestamped reports: `RIPPLE_SCAN_REPORT_YYYY-MM-DDTHH-MM-SS.md`
- All timestamps use ISO 8601 format (UTC)

**Note**: Ripple Scan Reports are **optional** and may be omitted if ripple analysis is performed inline (e.g., in PR description).

---

## 4. Report Structure (Human-Readable Markdown)

### 4.1 Required Sections

A valid Ripple Scan Report MUST contain these sections:

```markdown
# Ripple Scan Report

## 1. Metadata
## 2. Scan Summary
## 3. Change Origin Analysis
## 4. Direct Impact Analysis (Referencing Files)
## 5. Dependency Impact Analysis (Referenced Files)
## 6. Structural Impact Analysis
## 7. Governance Connection Analysis
## 8. Impact Classification
## 9. Confidence and Uncertainty Assessment
## 10. Recommendations for Review
## 11. References
```

---

## 5. Required Fields (Normative)

### 5.1 Metadata Section

```markdown
## 1. Metadata

- **RIPPLE_SCAN_SCHEMA_VERSION**: v1.0
- **Scan Timestamp**: <ISO 8601 UTC>
- **Scan Executor**: <GovernanceAdministrator|Foreman|Builder>
- **Executor Identity**: <agent-id>
- **Repository**: <org/repo>
- **Branch**: <branch-name>
- **PR Number**: <number> (if applicable)
- **Issue Number**: <number> (if applicable)
- **Commit SHA**: <sha>
- **Scan Type**: <GOVERNANCE_CHANGE|SCHEMA_CHANGE|POLICY_CHANGE|TEMPLATE_CHANGE|AGENT_CONTRACT_CHANGE|OTHER>
```

**Required Fields**:
- `RIPPLE_SCAN_SCHEMA_VERSION`: Must be `v1.0`
- `Scan Timestamp`: ISO 8601 UTC timestamp
- `Scan Executor`: One of: GovernanceAdministrator, Foreman, Builder
- `Repository`: Organization/repository name
- `Branch`: Git branch name
- `Commit SHA`: Full commit SHA at scan time
- `Scan Type`: Classification of change type

**Optional Fields**:
- `Executor Identity`: Specific agent instance identifier
- `PR Number`: PR number if scan for specific PR
- `Issue Number`: Issue number if scan for specific issue

---

### 5.2 Scan Summary Section

```markdown
## 2. Scan Summary

### 2.1 Executive Summary

<1-3 paragraph summary of ripple analysis findings>

### 2.2 High-Level Impact

**Total Files Changed**: <number>

**Direct Impact** (Referencing Files): <number of files>

**Indirect Impact** (Referenced Files): <number of files>

**Structural Impact**: <number of schema/template/canon relationships>

**Governance Connections**: <number of authority/enforcement relationships>

### 2.3 Impact Criticality

**Overall Criticality**: <HIGH|MEDIUM|LOW>

**Breaking Change**: <YES|NO|UNCERTAIN>

**Coordination Required**: <YES|NO|UNCERTAIN>

### 2.4 Confidence Level

**Overall Confidence**: <HIGH|MEDIUM|LOW>

**Analysis Completeness**: <COMPLETE|PARTIAL|LIMITED>
```

**Required Fields**:
- Executive summary (natural language)
- Impact counts across all analysis layers
- Overall criticality assessment
- Breaking change classification
- Coordination requirement
- Overall confidence level
- Analysis completeness

**Criticality Semantics**:
- **HIGH**: Affects multiple governance areas, breaking changes, ecosystem-wide impact
- **MEDIUM**: Affects single governance area, non-breaking but significant
- **LOW**: Minor clarifications, documentation updates, isolated changes

**Confidence Semantics**:
- **HIGH**: All relationships identified, clear impact, no ambiguity
- **MEDIUM**: Most relationships identified, some uncertainty, partial analysis
- **LOW**: Limited relationship identification, high uncertainty, incomplete analysis

---

### 5.3 Change Origin Analysis Section

```markdown
## 3. Change Origin Analysis

### 3.1 Changed Files

| File Path | Change Type | Category | Lines Changed | Semantic Weight |
|-----------|-------------|----------|---------------|-----------------|
| `path/to/file1.md` | MODIFIED | Canon | +50/-10 | HIGH |
| `path/to/file2.md` | ADDED | Schema | +200/0 | HIGH |
| `path/to/file3.md` | DELETED | Policy | 0/-150 | MEDIUM |
| ... | ... | ... | ... | ... |

### 3.2 Change Classification

**Governance Areas Affected**:
- [ ] Canon (constitutional rules)
- [ ] Schema (structural requirements)
- [ ] Policy (procedural rules)
- [ ] Template (artifact patterns)
- [ ] Agent Contract (behavioral rules)
- [ ] Enforcement (gates, validators)
- [ ] Documentation (guidance only)

**Change Nature**:
- [ ] New governance artifact
- [ ] Updated governance artifact
- [ ] Deprecated governance artifact
- [ ] Deleted governance artifact
- [ ] Moved/renamed governance artifact

### 3.3 Change Magnitude

**Overall Change Magnitude**: <MAJOR|MODERATE|MINOR>

**Rationale**: <explanation of magnitude assessment>
```

**Required Content**:
- Table of all changed files with metadata
- Checklist of affected governance areas
- Change nature classification
- Change magnitude assessment with rationale

**Change Type Values**:
- `ADDED`: New file created
- `MODIFIED`: Existing file changed
- `DELETED`: File removed
- `RENAMED`: File moved/renamed (includes MODIFIED if content changed)

**Category Values**:
- `Canon`: Constitutional governance (`governance/canon/**`)
- `Schema`: Structural definitions (`governance/schemas/**`)
- `Policy`: Procedural rules (`governance/policy/**`)
- `Template`: Artifact patterns (`governance/templates/**`)
- `Agent Contract`: Behavioral rules (`governance/agents/**`, `.github/agents/**`)
- `Enforcement`: Gates/validators (`.github/workflows/**`)
- `Documentation`: Guidance only (docs, READMEs)
- `Other`: Not governance-class

**Semantic Weight Values**:
- `HIGH`: Structural change, breaking change, authority change
- `MEDIUM`: Significant non-breaking change, clarification with implications
- `LOW`: Minor clarification, formatting, documentation

---

### 5.4 Direct Impact Analysis Section

```markdown
## 4. Direct Impact Analysis (Referencing Files)

### 4.1 Files That Reference Changed Files

| Referencing File | Changed File | Reference Type | Context | Impact Assessment |
|------------------|--------------|----------------|---------|-------------------|
| `path/referencer1.md` | `path/changed1.md` | Authority Citation | Section 3 | HIGH: Authority relationship |
| `path/referencer2.md` | `path/changed2.md` | Markdown Link | Section 5.2 | MEDIUM: Documentation link |
| ... | ... | ... | ... | ... |

### 4.2 Impact Summary

**Total Referencing Files**: <number>

**Impact by Category**:
- Canon files referencing changes: <number>
- Schema files referencing changes: <number>
- Policy files referencing changes: <number>
- Template files referencing changes: <number>
- Agent contracts referencing changes: <number>
- Enforcement files referencing changes: <number>
- Documentation files referencing changes: <number>

**Breaking References**: <number> (references that will break if change is breaking)

### 4.3 Notable Direct Impacts

**High-Impact References**:
1. `<file>` - <reason for high impact>
2. `<file>` - <reason for high impact>
3. ...

**Breaking Reference Details** (if applicable):
- `<file>` - <why this reference will break>
- `<file>` - <why this reference will break>
- ...
```

**Required Content**:
- Table of all files that reference changed files
- Impact summary by category
- Breaking reference identification
- Notable high-impact references with explanations

**Reference Type Values**:
- `Authority Citation`: "Required by:", "Subordinate to:", "Derives authority from:"
- `Markdown Link`: `[text](path.md)` or `[text](#section)`
- `Import/Include`: Direct file inclusion or import
- `Path Reference`: Explicit file path mention
- `Schema Conformance`: File conforms to schema
- `Template Instance`: File generated from template
- `Enforcement Target`: Gate validates against file

**Impact Assessment Values**:
- `HIGH`: Authority relationship, enforcement dependency, breaking reference
- `MEDIUM`: Significant integration, non-breaking dependency
- `LOW`: Documentation link, informational reference

---

### 5.5 Dependency Impact Analysis Section

```markdown
## 5. Dependency Impact Analysis (Referenced Files)

### 5.1 Files Referenced by Changed Files

| Changed File | Referenced File | Dependency Type | Purpose | Constraint Implication |
|--------------|-----------------|-----------------|---------|------------------------|
| `path/changed1.md` | `path/canon1.md` | Authority | Constitutional basis | Cannot violate canon |
| `path/changed2.md` | `path/schema1.md` | Validation | Structure requirement | Must conform to schema |
| ... | ... | ... | ... | ... |

### 5.2 Dependency Summary

**Total Referenced Files**: <number>

**Dependencies by Type**:
- Canon dependencies: <number>
- Schema dependencies: <number>
- Policy dependencies: <number>
- Template dependencies: <number>
- Enforcement dependencies: <number>

### 5.3 Constraint Analysis

**Upstream Constraints**:
1. `<file>` - <constraint imposed on changes>
2. `<file>` - <constraint imposed on changes>
3. ...

**Compatibility Requirements**:
- <requirement 1>
- <requirement 2>
- ...

**Conflict Risk**: <HIGH|MEDIUM|LOW|NONE>

**Conflict Details** (if risk present):
<description of potential conflicts with dependencies>
```

**Required Content**:
- Table of all files referenced by changed files
- Dependency summary by type
- Constraint analysis (what limits the changes)
- Compatibility requirements
- Conflict risk assessment

**Dependency Type Values**:
- `Authority`: Constitutional canon, higher precedence governance
- `Validation`: Schema, structural requirements
- `Policy`: Procedural rules, compliance requirements
- `Template`: Pattern definitions
- `Enforcement`: Gate definitions, validators
- `Integration`: Related governance models

**Purpose Values**: Natural language description of why dependency exists

**Constraint Implication**: How the dependency constrains or validates the change

---

### 5.6 Structural Impact Analysis Section

```markdown
## 6. Structural Impact Analysis

### 6.1 Schema-Instance Relationships

| Schema Changed | Instance Files | Impact | Breaking | Migration Required |
|----------------|----------------|--------|----------|-------------------|
| `schemas/SCHEMA1.schema.md` | 15 files | New required field | YES | YES |
| `schemas/SCHEMA2.schema.md` | 3 files | Optional field added | NO | NO |
| ... | ... | ... | ... | ... |

**Total Schema-Instance Relationships**: <number>

**Breaking Schema Changes**: <number>

### 6.2 Template-Artifact Relationships

| Template Changed | Artifact Files | Impact | Migration Required |
|------------------|----------------|--------|-------------------|
| `templates/TEMPLATE1.md` | 8 files | Structure changed | YES |
| `templates/TEMPLATE2.md` | 2 files | Example added | NO |
| ... | ... | ... | ... |

**Total Template-Artifact Relationships**: <number>

**Template Changes Requiring Updates**: <number>

### 6.3 Canon-Implementation Chains

| Canon Changed | Implementing Policies | Implementing Schemas | Affected Enforcement |
|---------------|----------------------|---------------------|----------------------|
| `canon/CANON1.md` | 3 policies | 2 schemas | 1 gate |
| `canon/CANON2.md` | 1 policy | 0 schemas | 0 gates |
| ... | ... | ... | ... |

**Total Canon-Implementation Chains**: <number>

**Constitutional Changes**: <number>

### 6.4 Structural Impact Summary

**Breaking Structural Changes**: <YES|NO|UNCERTAIN>

**Total Artifacts Requiring Updates**: <number>

**Migration Effort Estimate**: <HIGH|MEDIUM|LOW>

**Migration Notes**:
<description of migration considerations>
```

**Required Content**:
- Schema-instance relationship analysis
- Template-artifact relationship analysis
- Canon-implementation chain analysis
- Breaking structural change identification
- Migration effort assessment

**Impact Values**: Description of what changes in instances/artifacts

**Breaking Values**:
- `YES`: Existing artifacts will fail validation or become incompatible
- `NO`: Backward compatible, existing artifacts remain valid
- `UNCERTAIN`: Unclear if breaking, requires investigation

---

### 5.7 Governance Connection Analysis Section

```markdown
## 7. Governance Connection Analysis

### 7.1 Authority Relationships

| Changed File | Authority Relationship | Affected Files | Implication |
|--------------|----------------------|----------------|-------------|
| `canon/CANON1.md` | Subordinate policies | 3 policies | Policies must align with canon |
| `policy/POLICY1.md` | Implementing schemas | 2 schemas | Schemas must enforce policy |
| ... | ... | ... | ... |

**Total Authority Relationships**: <number>

**Constitutional Authority Changes**: <number>

### 7.2 Enforcement Relationships

| Changed File | Enforcement Mechanism | Validation Logic | Update Required |
|--------------|----------------------|------------------|-----------------|
| `schemas/SCHEMA1.md` | Gate: Contract Validation | Field presence check | YES |
| `policy/POLICY1.md` | Gate: QA Handover | READY status validation | NO |
| ... | ... | ... | ... |

**Total Enforcement Relationships**: <number>

**Enforcement Updates Required**: <number>

### 7.3 Learning and Promotion Pathways

| Changed File | Learning Pathway | Affected Feedback Loop | Implication |
|--------------|------------------|------------------------|-------------|
| `canon/FAILURE_PROMOTION_RULE.md` | Failure promotion | Upward learning ripple | Promotion criteria change |
| `schemas/LEARNING_SCHEMA.md` | Learning capture | Learning documentation | Capture structure change |
| ... | ... | ... | ... |

**Total Learning Pathways**: <number>

**Feedback Loop Changes**: <number>

### 7.4 Integration Relationships

| Changed File | Integrated Models | Integration Type | Compatibility |
|--------------|-------------------|------------------|---------------|
| `canon/RIPPLE_INTELLIGENCE_LAYER.md` | 3 models | Conceptual foundation | Must remain compatible |
| `canon/FM_RUNTIME_ENFORCEMENT.md` | 2 models | Enforcement implementation | Must align |
| ... | ... | ... | ... |

**Total Integration Relationships**: <number>

**Integration Compatibility**: <MAINTAINED|AT_RISK|BROKEN>

### 7.5 Governance Connection Summary

**Governance Ecosystem Impact**: <ECOSYSTEM_WIDE|MULTI_DOMAIN|SINGLE_DOMAIN|ISOLATED>

**Cross-Domain Ripples**: <number of governance domains affected>

**Authority Hierarchy Implications**: <description>
```

**Required Content**:
- Authority relationship analysis
- Enforcement relationship analysis
- Learning pathway analysis
- Integration relationship analysis
- Ecosystem impact summary

**Relationship Type Values**:
- `Authority`: Constitutional precedence, subordination
- `Enforcement`: Validation, gate logic
- `Learning`: Failure promotion, learning capture
- `Integration`: Model complementarity, conceptual alignment

**Governance Ecosystem Impact Values**:
- `ECOSYSTEM_WIDE`: Affects multiple governance domains across repositories (in future)
- `MULTI_DOMAIN`: Affects multiple governance domains (canon, policy, schema, enforcement)
- `SINGLE_DOMAIN`: Affects single governance domain only
- `ISOLATED`: Minimal governance connection impact

---

### 5.8 Impact Classification Section

```markdown
## 8. Impact Classification

### 8.1 Scope Classification

**Ripple Scope**: <REPOSITORY_LOCAL> (Wave 2.1 constraint)

**Future Cross-Repo Impact** (if known): <description of potential cross-repo ripples>

### 8.2 Criticality Classification

**Overall Criticality**: <HIGH|MEDIUM|LOW>

**Criticality Rationale**: <explanation>

**Criticality Factors**:
- Affected artifact count: <number>
- Breaking nature: <YES|NO|UNCERTAIN>
- Authority hierarchy level: <CONSTITUTIONAL|CANONICAL|POLICY|OPERATIONAL>
- Enforcement impact: <YES|NO>
- Agent coordination required: <YES|NO>

### 8.3 Breaking Nature Classification

**Breaking Change**: <YES|NO|UNCERTAIN>

**Breaking Change Details** (if YES or UNCERTAIN):
- Schema breaking changes: <list>
- Template breaking changes: <list>
- Authority breaking changes: <list>
- Enforcement breaking changes: <list>

**Migration Required**: <YES|NO|UNCERTAIN>

**Migration Complexity**: <HIGH|MEDIUM|LOW|N/A>

### 8.4 Agent Impact Classification

**Affected Agent Classes**:
- [ ] Governance Administrator
- [ ] Foreman (FM)
- [ ] Builder Agents
- [ ] Governance Liaison (if applicable)
- [ ] Other: <specify>

**Agent Coordination Required**: <YES|NO|UNCERTAIN>

**Coordination Scope**: <description if YES>

### 8.5 Enforcement Impact Classification

**Enforcement Mechanisms Affected**: <YES|NO>

**Affected Enforcement Types**:
- [ ] PR Gates
- [ ] Schema Validators
- [ ] Policy Checkers
- [ ] Contract Validators
- [ ] Runtime Enforcement

**Enforcement Updates Required**: <list if applicable>

### 8.6 Timing and Urgency

**Change Urgency**: <EMERGENCY|HIGH|MEDIUM|LOW>

**Recommended Timeline**: <description>

**Transition Period Required**: <YES|NO>

**Transition Duration** (if required): <duration>
```

**Required Content**:
- Scope classification (repository-local in Wave 2.1)
- Overall criticality with rationale
- Breaking nature classification
- Agent impact classification
- Enforcement impact classification
- Timing and urgency assessment

**Urgency Values**:
- `EMERGENCY`: Security vulnerability, critical governance defect
- `HIGH`: Blocks progress, affects active work
- `MEDIUM`: Important but not blocking
- `LOW`: Improvement, clarification, non-urgent

---

### 5.9 Confidence and Uncertainty Assessment Section

```markdown
## 9. Confidence and Uncertainty Assessment

### 9.1 Overall Confidence

**Confidence Level**: <HIGH|MEDIUM|LOW>

**Analysis Completeness**: <COMPLETE|PARTIAL|LIMITED>

**Confidence Rationale**: <explanation>

### 9.2 Confidence Factors

**High Confidence Factors**:
- ✅/❌ All changed files identified
- ✅/❌ All referencing files found
- ✅/❌ All dependencies mapped
- ✅/❌ Structural relationships clear
- ✅/❌ Governance connections explicit
- ✅/❌ No ambiguity in governance
- ✅/❌ Historical precedent available

**Low Confidence Factors**:
- ✅/❌ Governance ambiguity present
- ✅/❌ Missing structural information
- ✅/❌ Unclear reference relationships
- ✅/❌ Edge cases or unusual patterns
- ✅/❌ Limited historical data
- ✅/❌ Complex multi-domain ripples
- ✅/❌ Uncertain breaking nature

### 9.3 Uncertainty Notes

**Known Uncertainties**:
1. <uncertainty 1>
2. <uncertainty 2>
3. ...

**Cannot Be Determined**:
1. <limitation 1>
2. <limitation 2>
3. ...

**Assumptions Made**:
1. <assumption 1>
2. <assumption 2>
3. ...

### 9.4 Analysis Limitations

**Methodological Limitations**:
- <limitation 1>
- <limitation 2>
- ...

**Tool Limitations** (if applicable):
- <limitation 1>
- <limitation 2>
- ...

**Scope Limitations**:
- <limitation 1> (e.g., "Repository-local only, cross-repo impact not analyzed")
- <limitation 2>
- ...

### 9.5 Recommended Follow-Up

**To Increase Confidence**:
1. <action 1>
2. <action 2>
3. ...

**To Resolve Uncertainties**:
1. <action 1>
2. <action 2>
3. ...

**Escalation Recommended**: <YES|NO>

**Escalation Reason** (if YES): <description>
```

**Required Content**:
- Overall confidence level and rationale
- List of confidence factors (positive and negative)
- Known uncertainties
- Analysis limitations
- Recommended follow-up actions
- Escalation recommendation if warranted

---

### 5.10 Recommendations for Review Section

```markdown
## 10. Recommendations for Review

### 10.1 Review Recommendations

**Recommended Reviewers**:
- **Primary Reviewer**: <role> - <focus area>
- **Additional Reviewers**: <roles> - <focus areas>

**Review Focus Areas**:
1. <area 1> - <specific concern>
2. <area 2> - <specific concern>
3. ...

### 10.2 Review Checklist

**Critical Review Items**:
- [ ] Constitutional compliance verified
- [ ] Breaking nature confirmed/rejected
- [ ] Migration plan adequate (if breaking)
- [ ] Affected artifacts identified
- [ ] Coordination plan in place (if needed)
- [ ] Enforcement updates identified
- [ ] Agent impact communicated
- [ ] Timing appropriate

**Secondary Review Items**:
- [ ] Documentation updated
- [ ] Learning captured
- [ ] Precedent consulted
- [ ] Alternative approaches considered

### 10.3 Decision Points

**Key Decisions Required**:
1. <decision 1> - <options>
2. <decision 2> - <options>
3. ...

**Decision Authority**: <GovernanceAdministrator|Johan|FM|Consensus>

### 10.4 Proceed/Hold/Escalate Recommendation

**Overall Recommendation**: <PROCEED|HOLD_FOR_REVIEW|ESCALATE>

**Recommendation Rationale**: <explanation>

**Proceed Conditions** (if HOLD):
1. <condition 1>
2. <condition 2>
3. ...

**Escalation Triggers** (if ESCALATE):
- <trigger 1>
- <trigger 2>
- ...
```

**Required Content**:
- Recommended reviewers and focus areas
- Review checklist (critical and secondary items)
- Key decision points
- Proceed/Hold/Escalate recommendation with rationale

**Recommendation Values**:
- `PROCEED`: Low risk, clear impact, well-understood change
- `HOLD_FOR_REVIEW`: Medium risk, requires human review before proceeding
- `ESCALATE`: High risk, breaking change, constitutional impact, requires authority approval

---

### 5.11 References Section

```markdown
## 11. References

### 11.1 Changed Files (Full List)

**Added Files**:
- `<path>` - <description>
- ...

**Modified Files**:
- `<path>` - <description>
- ...

**Deleted Files**:
- `<path>` - <description>
- ...

**Renamed Files**:
- `<old-path>` → `<new-path>` - <description>
- ...

### 11.2 Affected Files (Full List)

**Referencing Files** (Direct Impact):
- `<path>` - <reference type>
- ...

**Referenced Files** (Dependencies):
- `<path>` - <dependency type>
- ...

**Structural Relationships**:
- `<path>` - <relationship type>
- ...

### 11.3 Governance References

**Constitutional Canon**:
- `<path>` - <section> - <relevant principle>
- ...

**Canonical Policies**:
- `<path>` - <section> - <relevant rule>
- ...

**Schemas**:
- `<path>` - <version> - <relevant requirement>
- ...

**Related Ripple Intelligence**:
- `RIPPLE_INTELLIGENCE_LAYER.md` - Plane 1 (Proactive Downward Ripple)
- `AGENT_RIPPLE_AWARENESS_OBLIGATION.md` - Agent obligation framework
- `ASSISTED_RIPPLE_SCAN_SCOPE.md` - Scan methodology
- ...

### 11.4 Related Work

**Related PRs** (if applicable):
- <org/repo>#<number> - <description>
- ...

**Related Issues** (if applicable):
- <org/repo>#<number> - <description>
- ...

**Related Ripple Scans** (if applicable):
- `<path-to-previous-scan>` - <date> - <relationship>
- ...
```

**Required Content**:
- Complete list of all changed files
- Complete list of all affected files
- All governance references used in analysis
- Related work references

---

## 6. Validity Rules

A Ripple Scan Report is INVALID if:
- ❌ Schema version missing or not v1.0
- ❌ Required metadata fields missing
- ❌ Missing required sections (1-11)
- ❌ Impact classification not specified
- ❌ Confidence assessment missing
- ❌ Changed files list incomplete
- ❌ No recommendation provided
- ❌ Governance references missing or invalid

---

## 7. Usage Guidelines

### 7.1 When to Generate Ripple Scan Reports

**Mandatory** (Per Agent Ripple Awareness Obligation):
- Governance Administrator making canon changes
- Governance Administrator making schema changes
- Governance Administrator making policy changes
- Any governance-class change with HIGH criticality

**Recommended**:
- Template changes
- Agent contract updates
- Enforcement mechanism changes
- Multi-domain governance changes

**Optional**:
- Documentation-only changes
- Minor clarifications
- Low-impact changes
- Changes with clear, well-understood impact

**Alternative to Standalone Report**:
- Ripple analysis may be included in PR description if comprehensive
- Must still conform to this schema's informational requirements

### 7.2 How to Use Ripple Scan Reports

**For Governance Administrator**:
- Generate report before submitting governance PR
- Review report for completeness and accuracy
- Use report to inform PR description
- Share report with reviewers

**For Foreman (FM)**:
- Review report when governance changes affect supervised builders
- Use report to plan coordination
- Use report to assess timing and transition needs

**For Human Governance Authority (Johan)**:
- Review report for high-criticality changes
- Use report to inform approval decisions
- Use report to assess ecosystem impact
- Use report to guide governance evolution

---

## 8. Integration with Governance

This schema implements:
- **RIPPLE_INTELLIGENCE_LAYER.md** — Plane 1 (Proactive Downward Ripple) reporting
- **AGENT_RIPPLE_AWARENESS_OBLIGATION.md** — Documentation of ripple awareness
- **ASSISTED_RIPPLE_SCAN_SCOPE.md** — Scan methodology and analysis layers
- **GOVERNANCE_RIPPLE_MODEL.md** — Pre-merge awareness for downward ripple

---

## 9. Report Lifecycle

### 9.1 Report Generation

1. Assisted ripple scan executed (manually or tool-assisted)
2. Analysis conducted across five layers per ASSISTED_RIPPLE_SCAN_SCOPE.md
3. Report generated conforming to this schema
4. Report committed to repository (`.qa/ripple/`)

### 9.2 Report Review

1. Report reviewed by Governance Administrator (self-review or peer)
2. Report reviewed by FM (if affects builders)
3. Report reviewed by Johan (if high-criticality or constitutional)
4. Uncertainties resolved or escalated

### 9.3 Report Integration

1. Report information integrated into PR description
2. Report referenced in handover documentation
3. Report archived for audit trail
4. Report insights promoted to governance learnings (if applicable)

---

## 10. Canonical Precedence

This schema is canonical.

If a conflict exists between this schema and any Ripple Scan Report, this schema prevails.

---

## 11. Success Criteria

This schema is successful when:

- ✅ All ripple scan reports conform to structure
- ✅ Reports provide actionable awareness
- ✅ Reports enable informed decision-making
- ✅ Reports document ripple analysis comprehensively
- ✅ Reports maintain appropriate confidence/uncertainty balance
- ✅ Reports integrate with governance review process
- ✅ Reports support audit trail requirements

---

## 12. Evolution and Review

### 12.1 Version History

- **v1.0.0** (2026-01-02) — Initial schema definition (Ripple-Wave 2.1.2)

### 12.2 Review Triggers

This schema MUST be reviewed when:
- Ripple-Wave 2.2 (cross-repo awareness) expands scope
- Agent feedback identifies missing sections or fields
- Governance evolution requires additional analysis dimensions
- Schema proves insufficient for high-impact changes

### 12.3 Evolution Governance

Changes to this schema:
- **Minor Updates** (clarifications, examples) — Governance Administrator authority
- **Major Changes** (new sections, required fields) — Human authority approval required
- **Breaking Changes** (incompatible with v1.0) — Requires schema versioning and migration

---

## 13. Closing Principle

**Ripple Scan Reports make the invisible visible.**

They exist to answer:
- **What changes?**
- **What is affected?**
- **How significant is the impact?**
- **How confident are we?**

Before ripple scanning:
> "I changed governance. The ripples are unknown until discovered."

After ripple scanning:
> "I changed governance. Here is what is affected, at what confidence level."

**Transparency enables informed decisions. Ripple reports provide transparency.**

---

**End of RIPPLE SCAN REPORT SCHEMA v1.0.0**

---

**Document Metadata**:
- Schema ID: RIPPLE_SCAN_REPORT_SCHEMA_V1
- Authority: Canonical Governance Specification
- Effective Date: 2026-01-02
- Required By: ASSISTED_RIPPLE_SCAN_SCOPE.md
- Integration: RIPPLE_INTELLIGENCE_LAYER.md, AGENT_RIPPLE_AWARENESS_OBLIGATION.md, GOVERNANCE_RIPPLE_MODEL.md
