# Ripple Signal

## 1. Signal Metadata

- **RIPPLE_SIGNAL_SCHEMA_VERSION**: v1.0
- **Signal Timestamp**: [YYYY-MM-DDTHH:MM:SSZ]
- **Signal ID**: [org-repo-timestamp]
- **Origin Repository**: [org/repo]
- **Origin Branch**: [branch-name]
- **Origin PR Number**: [number] (if applicable)
- **Origin Commit SHA**: [full-sha]
- **Signal Emitter**: [GovernanceAdministrator|Foreman|Builder]
- **Signal Type**: [GOVERNANCE_CANON|SCHEMA|POLICY|TEMPLATE|AGENT_CONTRACT|ENFORCEMENT|OTHER]
- **Signal Criticality**: [HIGH|MEDIUM|LOW]
- **Breaking Change**: [YES|NO|UNCERTAIN]

---

## 2. Change Origin

### 2.1 Changed Artifacts

**Primary Changes**:
- `[path/to/file1]` - [Brief description of change]
- `[path/to/file2]` - [Brief description of change]
- [Add more as needed]

**Change Summary**: [1-2 sentence summary of what changed overall]

**Change Rationale**: [Why this change was made - the business/governance reason]

### 2.2 Governance Classification

**Governance Areas Affected**:
- [ ] Canon (constitutional rules)
- [ ] Schema (structural requirements)
- [ ] Policy (procedural rules)
- [ ] Template (artifact patterns)
- [ ] Agent Contract (behavioral rules)
- [ ] Enforcement (gates, validators)
- [ ] Documentation (guidance only)

### 2.3 Local Ripple Analysis Reference

**Local Ripple Scan Report**: `[path/to/RIPPLE_SCAN_REPORT.md]` (if available)

**Local Impact Summary**: [Brief 1-2 sentence summary of repository-local impact]

---

## 3. Ripple Classification

### 3.1 Ripple Scope

**Repository-Local Impact**: [Describe impact within the origin repository]

**Cross-Repository Impact Potential**: [HIGH|MEDIUM|LOW|UNKNOWN]

**Cross-Repository Impact Description**: [Why this might affect other repositories - be specific about what types of repos or what they might depend on]

### 3.2 Ripple Plane (RIL Model)

**Primary Ripple Plane**: [Plane 1|Plane 2|Plane 3]

**Ripple Plane Description**:
- **Plane 1** (Proactive Downward Ripple): Change introduction, governance propagation
- **Plane 2** (Reactive Runtime Ripple): Enforcement and violation detection
- **Plane 3** (Upward Learning Ripple): Feedback and governance evolution

**Why This Plane**: [Explain which plane this signal represents and why]

### 3.3 Propagation Characteristics

**Expected Propagation Direction**:
- [ ] Downstream (governance → execution repositories)
- [ ] Upstream (execution → governance repositories)
- [ ] Lateral (execution repo → execution repo)

**Propagation Mechanism**: [How this change might propagate - e.g., "via contract updates", "via schema enforcement", "via policy adoption"]

**Propagation Timeline**: [Immediate | Gradual | On-demand | Unknown]

---

## 4. Affected Domains

### 4.1 Technology Domains

**Affected Technology Stacks** (if applicable):
- [ ] Node.js / JavaScript
- [ ] Python
- [ ] Go
- [ ] .NET / C#
- [ ] Java
- [ ] Other: [specify]

**Technology-Specific Impact**: [Description if technology-specific, otherwise "N/A - Technology-agnostic"]

### 4.2 Governance Domains

**Affected Governance Areas**:
- [ ] Builder contracts and obligations
- [ ] FM supervision and coordination
- [ ] Agent recruitment and authorization
- [ ] Quality gates and enforcement
- [ ] Evidence and audit trail requirements
- [ ] Learning and failure promotion
- [ ] Schema compliance and validation
- [ ] Authority hierarchy and precedence
- [ ] Other: [specify]

### 4.3 Agent Role Domains

**Affected Agent Roles**:
- [ ] Governance Administrator
- [ ] Governance Liaison
- [ ] Foreman (FM)
- [ ] Builder Agents
- [ ] Security Reviewer (if applicable)
- [ ] Other: [specify]

**Role-Specific Impact**: [How each checked role is affected]

### 4.4 Repository Type Domains

**Affected Repository Types**:
- [ ] Governance repositories (canonical governance)
- [ ] Execution repositories (application/service repos)
- [ ] Infrastructure repositories
- [ ] Documentation repositories
- [ ] Other: [specify]

**Repository-Specific Impact**: [Impact by repository type]

---

## 5. Impact Summary

### 5.1 Executive Summary

[2-3 paragraph summary of:
- What changed
- Why it changed
- What the cross-repository implications are
- What receiving repositories should know]

### 5.2 What Changed and Why

**What**: [Clear description of the actual change made]

**Why**: [Rationale and context - why was this change necessary or beneficial]

**When**: [When the change occurred, when it takes effect, any transition periods]

### 5.3 Downstream Implications

**For Receiving Repositories**:
1. [Implication 1 - what might this mean for repos that depend on this]
2. [Implication 2]
3. [Add more as needed]

**Potential Actions** (Optional, Not Required):
- [Suggested action 1 - e.g., "Consider updating local schema to match"]
- [Suggested action 2 - e.g., "Review builder contracts for compatibility"]
- [These are suggestions only, not requirements]

**Coordination Needed**: [YES|NO|OPTIONAL]

**Coordination Description** (if applicable): [What coordination might be helpful, who to contact]

### 5.4 Breaking Nature Assessment

**Breaking Change**: [YES|NO|UNCERTAIN]

**Breaking Change Details** (if YES or UNCERTAIN):
- **What Breaks**: [Specifically what will break in receiving repositories]
- **Why It Breaks**: [Technical explanation of the breakage]
- **Migration Path**: [Guidance for how to migrate, if available]
- **Backward Compatibility**: [Assessment of whether old and new can coexist]

**Non-Breaking Rationale** (if NO):
[Explain why this change is backward compatible]

### 5.5 Confidence and Uncertainty

**Impact Confidence**: [HIGH|MEDIUM|LOW]

**Confidence Rationale**: [Why this confidence level - what is well-understood vs uncertain]

**Known Uncertainties**:
- [Uncertainty 1 - what is unclear or ambiguous]
- [Uncertainty 2]
- [Add more as needed]

**What Cannot Be Determined**:
- [Limitation 1 - what could not be analyzed or predicted]
- [Limitation 2]
- [Add more as needed]

---

## 6. Related Artifacts

### 6.1 Origin Repository Artifacts

**Local Ripple Scan Report**: `[path/to/RIPPLE_SCAN_REPORT.md]` (if available)

**Changed Governance Artifacts**:
- `[path]` - [description]
- `[path]` - [description]
- [Add more as needed]

**PR/Issue References**:
- PR #[number]: [title/description]
- Issue #[number]: [title/description]
- [Add more as needed]

**Commit References**:
- `[sha]` - [commit message]
- `[sha]` - [commit message]
- [Add more as needed]

### 6.2 Governance Canon References

**Relevant Canonical Governance**:
- `governance/canon/[FILE].md` - [section] - [principle]
- `governance/schemas/[FILE].schema.md` - [version]
- `governance/policy/[FILE].md` - [section]
- [Add more as needed]

**Authority Chain**:
[Description of how this change relates to governance authority hierarchy]

### 6.3 Related Ripple Intelligence

**RIL Documentation**:
- `RIPPLE_INTELLIGENCE_LAYER.md` - [relevant section]
- `AGENT_RIPPLE_AWARENESS_OBLIGATION.md` - [relevant section]
- `GOVERNANCE_RIPPLE_MODEL.md` - [relevant section]
- [Add more as needed]

**Previous Ripple Signals** (if applicable):
- `RIPPLE_SIGNAL_[timestamp].md` - [relationship to this signal]
- [Add more as needed]

### 6.4 External References

**Related Work in Other Repositories** (if known):
- `[org]/[repo]#[PR]` - [description]
- `[org]/[repo]#[issue]` - [description]
- [Add more as needed]

**Coordination Status**: [IN_PROGRESS|PENDING|COMPLETE|NOT_APPLICABLE]

---

## 7. Reception Instructions

### 7.1 For Receiving Repositories

**This signal is INFORMATIONAL ONLY.**

Receiving repositories:
- ✅ MAY acknowledge this signal
- ✅ MAY record awareness in local context
- ✅ MAY annotate with repository-specific notes
- ✅ MAY use signal to inform local planning
- ❌ Are NOT required to act on this signal
- ❌ Are NOT blocked if this signal is ignored

**Response is optional, not mandatory.**

### 7.2 Awareness Recording (Optional)

If a receiving repository chooses to acknowledge this signal, suggested format:

**Location**: `.ripple/signals/incoming/RIPPLE_SIGNAL_<source_repo>_<timestamp>.md`

**Minimal Acknowledgment**:
```markdown
# Ripple Signal Reception

**Source Signal**: [path to this signal or signal ID]
**Received By**: [your repository]
**Received Date**: [date]
**Acknowledged By**: [agent role]
**Local Relevance**: [HIGH|MEDIUM|LOW|NONE]
**Local Action Planned**: [YES|NO|TBD]
**Notes**: [optional repository-specific context]
```

**Note**: Reception recording is **guidance only**, not schema requirement.

### 7.3 Escalation and Questions

**For Questions or Coordination**:
- Contact origin repository maintainers: [contact method or reference]
- Reference this signal ID in communications: [signal ID]
- Use standard governance escalation paths

**For High-Impact Signals**:
- Consider escalation to FM or human governance authority
- Coordinate response if breaking changes affect your repository
- Document coordination status in your repository

### 7.4 No Response Required

**If this signal does not apply to your repository**:
- No action required
- No acknowledgment required
- No documentation required

**Silence is acceptable if signal is not relevant.**

---

**Template Usage Notes**:
- Replace all `[bracketed]` placeholders with actual values
- Check all `[ ]` checkboxes that apply
- Remove sections that are not applicable (mark as "N/A" if section is required)
- Keep all section headers even if content is "N/A"
- Ensure signal conforms to RIPPLE_SIGNAL.schema.md v1.0

**Schema Reference**: `governance/schemas/RIPPLE_SIGNAL.schema.md`

---

**End of Template**
