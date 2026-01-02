# Ripple Scan Report

> **Template Version**: v1.0  
> **Schema Reference**: `governance/schemas/RIPPLE_SCAN_REPORT.schema.md`  
> **Purpose**: Provide practical template for documenting ripple impact analysis

---

## 1. Metadata

- **RIPPLE_SCAN_SCHEMA_VERSION**: v1.0
- **Scan Timestamp**: _[ISO 8601 UTC timestamp, e.g., 2026-01-02T10:30:00Z]_
- **Scan Executor**: _[GovernanceAdministrator|Foreman|Builder]_
- **Executor Identity**: _[agent-id or name]_
- **Repository**: _[org/repo, e.g., MaturionISMS/maturion-foreman-governance]_
- **Branch**: _[branch-name, e.g., feature/add-new-canon]_
- **PR Number**: _[number, if applicable]_
- **Issue Number**: _[number, if applicable]_
- **Commit SHA**: _[full commit SHA at scan time]_
- **Scan Type**: _[GOVERNANCE_CHANGE|SCHEMA_CHANGE|POLICY_CHANGE|TEMPLATE_CHANGE|AGENT_CONTRACT_CHANGE|OTHER]_

---

## 2. Scan Summary

### 2.1 Executive Summary

_[Provide 1-3 paragraph summary of ripple analysis findings. Include:_
_- What was changed_
_- Why it was changed_
_- What the primary ripple effects are_
_- What the key concerns or considerations are]_

### 2.2 High-Level Impact

**Total Files Changed**: _[number]_

**Direct Impact** (Referencing Files): _[number of files]_

**Indirect Impact** (Referenced Files): _[number of files]_

**Structural Impact**: _[number of schema/template/canon relationships]_

**Governance Connections**: _[number of authority/enforcement relationships]_

### 2.3 Impact Criticality

**Overall Criticality**: _[HIGH|MEDIUM|LOW]_

**Breaking Change**: _[YES|NO|UNCERTAIN]_

**Coordination Required**: _[YES|NO|UNCERTAIN]_

### 2.4 Confidence Level

**Overall Confidence**: _[HIGH|MEDIUM|LOW]_

**Analysis Completeness**: _[COMPLETE|PARTIAL|LIMITED]_

---

## 3. Change Origin Analysis

### 3.1 Changed Files

| File Path | Change Type | Category | Lines Changed | Semantic Weight |
|-----------|-------------|----------|---------------|-----------------|
| _[path/to/file1.md]_ | _[MODIFIED]_ | _[Canon]_ | _[+50/-10]_ | _[HIGH]_ |
| _[path/to/file2.md]_ | _[ADDED]_ | _[Schema]_ | _[+200/0]_ | _[HIGH]_ |
| _[Add more rows as needed]_ | ... | ... | ... | ... |

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

**Overall Change Magnitude**: _[MAJOR|MODERATE|MINOR]_

**Rationale**: _[Explain why this magnitude was assessed. Consider scope, breaking nature, affected systems.]_

---

## 4. Direct Impact Analysis (Referencing Files)

### 4.1 Files That Reference Changed Files

| Referencing File | Changed File | Reference Type | Context | Impact Assessment |
|------------------|--------------|----------------|---------|-------------------|
| _[path/referencer1.md]_ | _[path/changed1.md]_ | _[Authority Citation]_ | _[Section 3]_ | _[HIGH: Authority relationship]_ |
| _[path/referencer2.md]_ | _[path/changed2.md]_ | _[Markdown Link]_ | _[Section 5.2]_ | _[MEDIUM: Documentation link]_ |
| _[Add more rows as needed]_ | ... | ... | ... | ... |

### 4.2 Impact Summary

**Total Referencing Files**: _[number]_

**Impact by Category**:
- Canon files referencing changes: _[number]_
- Schema files referencing changes: _[number]_
- Policy files referencing changes: _[number]_
- Template files referencing changes: _[number]_
- Agent contracts referencing changes: _[number]_
- Enforcement files referencing changes: _[number]_
- Documentation files referencing changes: _[number]_

**Breaking References**: _[number]_ (references that will break if change is breaking)

### 4.3 Notable Direct Impacts

**High-Impact References**:
1. _[file path]_ - _[reason for high impact]_
2. _[file path]_ - _[reason for high impact]_
3. _[Add more as needed]_

**Breaking Reference Details** (if applicable):
- _[file path]_ - _[why this reference will break]_
- _[file path]_ - _[why this reference will break]_
- _[Add more as needed or write "NONE" if not applicable]_

---

## 5. Dependency Impact Analysis (Referenced Files)

### 5.1 Files Referenced by Changed Files

| Changed File | Referenced File | Dependency Type | Purpose | Constraint Implication |
|--------------|-----------------|-----------------|---------|------------------------|
| _[path/changed1.md]_ | _[path/canon1.md]_ | _[Authority]_ | _[Constitutional basis]_ | _[Cannot violate canon]_ |
| _[path/changed2.md]_ | _[path/schema1.md]_ | _[Validation]_ | _[Structure requirement]_ | _[Must conform to schema]_ |
| _[Add more rows as needed]_ | ... | ... | ... | ... |

### 5.2 Dependency Summary

**Total Referenced Files**: _[number]_

**Dependencies by Type**:
- Canon dependencies: _[number]_
- Schema dependencies: _[number]_
- Policy dependencies: _[number]_
- Template dependencies: _[number]_
- Enforcement dependencies: _[number]_

### 5.3 Constraint Analysis

**Upstream Constraints**:
1. _[file path]_ - _[constraint imposed on changes]_
2. _[file path]_ - _[constraint imposed on changes]_
3. _[Add more as needed]_

**Compatibility Requirements**:
- _[requirement 1]_
- _[requirement 2]_
- _[Add more as needed]_

**Conflict Risk**: _[HIGH|MEDIUM|LOW|NONE]_

**Conflict Details** (if risk present):
_[Description of potential conflicts with dependencies. If NONE, state "No conflicts identified."]_

---

## 6. Structural Impact Analysis

### 6.1 Schema-Instance Relationships

| Schema Changed | Instance Files | Impact | Breaking | Migration Required |
|----------------|----------------|--------|----------|-------------------|
| _[schemas/SCHEMA1.schema.md]_ | _[15 files]_ | _[New required field]_ | _[YES]_ | _[YES]_ |
| _[schemas/SCHEMA2.schema.md]_ | _[3 files]_ | _[Optional field added]_ | _[NO]_ | _[NO]_ |
| _[Add more rows as needed or write "N/A" if no schema changes]_ | ... | ... | ... | ... |

**Total Schema-Instance Relationships**: _[number]_

**Breaking Schema Changes**: _[number]_

### 6.2 Template-Artifact Relationships

| Template Changed | Artifact Files | Impact | Migration Required |
|------------------|----------------|--------|-------------------|
| _[templates/TEMPLATE1.md]_ | _[8 files]_ | _[Structure changed]_ | _[YES]_ |
| _[templates/TEMPLATE2.md]_ | _[2 files]_ | _[Example added]_ | _[NO]_ |
| _[Add more rows as needed or write "N/A" if no template changes]_ | ... | ... | ... |

**Total Template-Artifact Relationships**: _[number]_

**Template Changes Requiring Updates**: _[number]_

### 6.3 Canon-Implementation Chains

| Canon Changed | Implementing Policies | Implementing Schemas | Affected Enforcement |
|---------------|----------------------|---------------------|----------------------|
| _[canon/CANON1.md]_ | _[3 policies]_ | _[2 schemas]_ | _[1 gate]_ |
| _[canon/CANON2.md]_ | _[1 policy]_ | _[0 schemas]_ | _[0 gates]_ |
| _[Add more rows as needed or write "N/A" if no canon changes]_ | ... | ... | ... |

**Total Canon-Implementation Chains**: _[number]_

**Constitutional Changes**: _[number]_

### 6.4 Structural Impact Summary

**Breaking Structural Changes**: _[YES|NO|UNCERTAIN]_

**Total Artifacts Requiring Updates**: _[number]_

**Migration Effort Estimate**: _[HIGH|MEDIUM|LOW]_

**Migration Notes**:
_[Describe migration considerations, or write "No migration required" if not applicable]_

---

## 7. Governance Connection Analysis

### 7.1 Authority Relationships

| Changed File | Authority Relationship | Affected Files | Implication |
|--------------|----------------------|----------------|-------------|
| _[canon/CANON1.md]_ | _[Subordinate policies]_ | _[3 policies]_ | _[Policies must align with canon]_ |
| _[policy/POLICY1.md]_ | _[Implementing schemas]_ | _[2 schemas]_ | _[Schemas must enforce policy]_ |
| _[Add more rows as needed or write "N/A" if no authority changes]_ | ... | ... | ... |

**Total Authority Relationships**: _[number]_

**Constitutional Authority Changes**: _[number]_

### 7.2 Enforcement Relationships

| Changed File | Enforcement Mechanism | Validation Logic | Update Required |
|--------------|----------------------|------------------|-----------------|
| _[schemas/SCHEMA1.md]_ | _[Gate: Contract Validation]_ | _[Field presence check]_ | _[YES]_ |
| _[policy/POLICY1.md]_ | _[Gate: QA Handover]_ | _[READY status validation]_ | _[NO]_ |
| _[Add more rows as needed or write "N/A" if no enforcement changes]_ | ... | ... | ... |

**Total Enforcement Relationships**: _[number]_

**Enforcement Updates Required**: _[number]_

### 7.3 Learning and Promotion Pathways

| Changed File | Learning Pathway | Affected Feedback Loop | Implication |
|--------------|------------------|------------------------|-------------|
| _[canon/FAILURE_PROMOTION_RULE.md]_ | _[Failure promotion]_ | _[Upward learning ripple]_ | _[Promotion criteria change]_ |
| _[schemas/LEARNING_SCHEMA.md]_ | _[Learning capture]_ | _[Learning documentation]_ | _[Capture structure change]_ |
| _[Add more rows as needed or write "N/A" if no learning pathway changes]_ | ... | ... | ... |

**Total Learning Pathways**: _[number]_

**Feedback Loop Changes**: _[number]_

### 7.4 Integration Relationships

| Changed File | Integrated Models | Integration Type | Compatibility |
|--------------|-------------------|------------------|---------------|
| _[canon/RIPPLE_INTELLIGENCE_LAYER.md]_ | _[3 models]_ | _[Conceptual foundation]_ | _[Must remain compatible]_ |
| _[canon/FM_RUNTIME_ENFORCEMENT.md]_ | _[2 models]_ | _[Enforcement implementation]_ | _[Must align]_ |
| _[Add more rows as needed or write "N/A" if no integration changes]_ | ... | ... | ... |

**Total Integration Relationships**: _[number]_

**Integration Compatibility**: _[MAINTAINED|AT_RISK|BROKEN]_

### 7.5 Governance Connection Summary

**Governance Ecosystem Impact**: _[ECOSYSTEM_WIDE|MULTI_DOMAIN|SINGLE_DOMAIN|ISOLATED]_

**Cross-Domain Ripples**: _[number of governance domains affected]_

**Authority Hierarchy Implications**: _[Describe implications or write "No authority hierarchy changes"]_

---

## 8. Impact Classification

### 8.1 Scope Classification

**Ripple Scope**: REPOSITORY_LOCAL _(Wave 2.1 constraint)_

**Future Cross-Repo Impact** (if known): _[Describe potential cross-repo ripples that may occur in future waves, or write "Not anticipated"]_

### 8.2 Criticality Classification

**Overall Criticality**: _[HIGH|MEDIUM|LOW]_

**Criticality Rationale**: _[Explain why this criticality level was assigned]_

**Criticality Factors**:
- Affected artifact count: _[number]_
- Breaking nature: _[YES|NO|UNCERTAIN]_
- Authority hierarchy level: _[CONSTITUTIONAL|CANONICAL|POLICY|OPERATIONAL]_
- Enforcement impact: _[YES|NO]_
- Agent coordination required: _[YES|NO]_

### 8.3 Breaking Nature Classification

**Breaking Change**: _[YES|NO|UNCERTAIN]_

**Breaking Change Details** (if YES or UNCERTAIN):
- Schema breaking changes: _[list or "NONE"]_
- Template breaking changes: _[list or "NONE"]_
- Authority breaking changes: _[list or "NONE"]_
- Enforcement breaking changes: _[list or "NONE"]_

**Migration Required**: _[YES|NO|UNCERTAIN]_

**Migration Complexity**: _[HIGH|MEDIUM|LOW|N/A]_

### 8.4 Agent Impact Classification

**Affected Agent Classes**:
- [ ] Governance Administrator
- [ ] Foreman (FM)
- [ ] Builder Agents
- [ ] Governance Liaison (if applicable)
- [ ] Other: _[specify]_

**Agent Coordination Required**: _[YES|NO|UNCERTAIN]_

**Coordination Scope**: _[Description if YES, or "Not required" if NO]_

### 8.5 Enforcement Impact Classification

**Enforcement Mechanisms Affected**: _[YES|NO]_

**Affected Enforcement Types**:
- [ ] PR Gates
- [ ] Schema Validators
- [ ] Policy Checkers
- [ ] Contract Validators
- [ ] Runtime Enforcement

**Enforcement Updates Required**: _[List if applicable, or "NONE"]_

### 8.6 Timing and Urgency

**Change Urgency**: _[EMERGENCY|HIGH|MEDIUM|LOW]_

**Recommended Timeline**: _[Describe recommended implementation timeline]_

**Transition Period Required**: _[YES|NO]_

**Transition Duration** (if required): _[duration, e.g., "2 weeks"]_

---

## 9. Confidence and Uncertainty Assessment

### 9.1 Overall Confidence

**Confidence Level**: _[HIGH|MEDIUM|LOW]_

**Analysis Completeness**: _[COMPLETE|PARTIAL|LIMITED]_

**Confidence Rationale**: _[Explain why this confidence level was assigned]_

### 9.2 Confidence Factors

**High Confidence Factors**:
- [ ] All changed files identified
- [ ] All referencing files found
- [ ] All dependencies mapped
- [ ] Structural relationships clear
- [ ] Governance connections explicit
- [ ] No ambiguity in governance
- [ ] Historical precedent available

**Low Confidence Factors**:
- [ ] Governance ambiguity present
- [ ] Missing structural information
- [ ] Unclear reference relationships
- [ ] Edge cases or unusual patterns
- [ ] Limited historical data
- [ ] Complex multi-domain ripples
- [ ] Uncertain breaking nature

### 9.3 Uncertainty Notes

**Known Uncertainties**:
1. _[uncertainty 1]_
2. _[uncertainty 2]_
3. _[Add more as needed or write "NONE"]_

**Cannot Be Determined**:
1. _[limitation 1]_
2. _[limitation 2]_
3. _[Add more as needed or write "NONE"]_

**Assumptions Made**:
1. _[assumption 1]_
2. _[assumption 2]_
3. _[Add more as needed or write "NONE"]_

### 9.4 Analysis Limitations

**Methodological Limitations**:
- _[limitation 1]_
- _[limitation 2]_
- _[Add more as needed]_

**Tool Limitations** (if applicable):
- _[limitation 1, e.g., "Manual search may miss indirect references"]_
- _[limitation 2]_
- _[Add more as needed or write "N/A"]_

**Scope Limitations**:
- Repository-local only (cross-repo impact not analyzed in Wave 2.1)
- _[limitation 2]_
- _[Add more as needed]_

### 9.5 Recommended Follow-Up

**To Increase Confidence**:
1. _[action 1]_
2. _[action 2]_
3. _[Add more as needed or write "No additional actions needed"]_

**To Resolve Uncertainties**:
1. _[action 1]_
2. _[action 2]_
3. _[Add more as needed or write "No unresolved uncertainties"]_

**Escalation Recommended**: _[YES|NO]_

**Escalation Reason** (if YES): _[Describe why escalation is recommended]_

---

## 10. Recommendations for Review

### 10.1 Review Recommendations

**Recommended Reviewers**:
- **Primary Reviewer**: _[role, e.g., Governance Administrator]_ - _[focus area, e.g., Constitutional compliance]_
- **Additional Reviewers**: _[roles]_ - _[focus areas]_

**Review Focus Areas**:
1. _[area 1]_ - _[specific concern]_
2. _[area 2]_ - _[specific concern]_
3. _[Add more as needed]_

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
1. _[decision 1]_ - _[options]_
2. _[decision 2]_ - _[options]_
3. _[Add more as needed or write "No key decisions pending"]_

**Decision Authority**: _[GovernanceAdministrator|Johan|FM|Consensus]_

### 10.4 Proceed/Hold/Escalate Recommendation

**Overall Recommendation**: _[PROCEED|HOLD_FOR_REVIEW|ESCALATE]_

**Recommendation Rationale**: _[Explain why this recommendation was made]_

**Proceed Conditions** (if HOLD):
1. _[condition 1]_
2. _[condition 2]_
3. _[Add more as needed or write "N/A"]_

**Escalation Triggers** (if ESCALATE):
- _[trigger 1]_
- _[trigger 2]_
- _[Add more as needed or write "N/A"]_

---

## 11. References

### 11.1 Changed Files (Full List)

**Added Files**:
- _[path]_ - _[description]_
- _[Add more as needed or write "NONE"]_

**Modified Files**:
- _[path]_ - _[description]_
- _[Add more as needed or write "NONE"]_

**Deleted Files**:
- _[path]_ - _[description]_
- _[Add more as needed or write "NONE"]_

**Renamed Files**:
- _[old-path]_ → _[new-path]_ - _[description]_
- _[Add more as needed or write "NONE"]_

### 11.2 Affected Files (Full List)

**Referencing Files** (Direct Impact):
- _[path]_ - _[reference type, e.g., Authority Citation]_
- _[Add more as needed or write "NONE"]_

**Referenced Files** (Dependencies):
- _[path]_ - _[dependency type, e.g., Authority]_
- _[Add more as needed or write "NONE"]_

**Structural Relationships**:
- _[path]_ - _[relationship type, e.g., Schema-Instance]_
- _[Add more as needed or write "NONE"]_

### 11.3 Governance References

**Constitutional Canon**:
- `governance/canon/RIPPLE_INTELLIGENCE_LAYER.md` - Section 5 - Ripple Plane 1
- `governance/canon/AGENT_RIPPLE_AWARENESS_OBLIGATION.md` - Section 5 - Agent obligation
- _[Add more as applicable]_

**Canonical Policies**:
- _[path]_ - _[section]_ - _[relevant rule]_
- _[Add more as applicable]_

**Schemas**:
- `governance/schemas/RIPPLE_SCAN_REPORT.schema.md` - v1.0 - This schema
- _[Add more as applicable]_

**Related Ripple Intelligence**:
- `governance/canon/RIPPLE_INTELLIGENCE_LAYER.md` - Plane 1 (Proactive Downward Ripple)
- `governance/canon/AGENT_RIPPLE_AWARENESS_OBLIGATION.md` - Agent obligation framework
- `governance/canon/ASSISTED_RIPPLE_SCAN_SCOPE.md` - Scan methodology
- `governance/canon/GOVERNANCE_RIPPLE_MODEL.md` - Bidirectional governance evolution

### 11.4 Related Work

**Related PRs** (if applicable):
- _[org/repo#number]_ - _[description]_
- _[Add more as needed or write "NONE"]_

**Related Issues** (if applicable):
- _[org/repo#number]_ - _[description]_
- _[Add more as needed or write "NONE"]_

**Related Ripple Scans** (if applicable):
- _[path-to-previous-scan]_ - _[date]_ - _[relationship]_
- _[Add more as needed or write "NONE"]_

---

**End of Ripple Scan Report**

---

**Template Usage Notes**:
1. Replace all italic placeholder text with actual values
2. Delete guidance text in square brackets after completing sections
3. Check all boxes that apply in checklists
4. Remove sections that are not applicable (e.g., if no schema changes, simplify Section 6.1)
5. Ensure all required sections are present even if marked "N/A" or "NONE"
6. Store completed report in `.qa/ripple/RIPPLE_SCAN_REPORT.md` or timestamped variant
7. Reference this report in PR description for governance-class changes
