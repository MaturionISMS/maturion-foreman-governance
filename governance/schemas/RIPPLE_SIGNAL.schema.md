# RIPPLE SIGNAL SCHEMA

## Status
**Type**: Canonical Governance Specification  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-01-02  
**Owner**: Governance Administrator  
**Required By**: CROSS_REPOSITORY_RIPPLE_AWARENESS_MODEL.md  
**Part of**: Ripple-Wave 2.2 — Passive Cross-Repository Ripple Awareness Signal

---

## 1. Purpose

This document defines the normative schema for **Ripple Signal** artifacts - structured documents that communicate ripple-worthy changes from one repository to other repositories in the ecosystem.

Ripple Signals serve as:
- **Cross-repository awareness** for governance-class changes
- **Passive notification mechanism** (informational, not enforcement)
- **Situational context** for downstream repositories
- **Foundation for future Maturion-brokered correlation** (Ripple-Wave 3+)

A Ripple Signal is valid only if it conforms to this schema.

---

## 2. Core Principles

### 2.1 Passive and Informational Only

Ripple Signals are **passive awareness mechanisms**:
- Provide notification that a ripple-worthy change occurred
- Enable receiving repositories to become aware
- Support optional response and annotation
- Enable future aggregation and correlation

**NOT**:
- ❌ Enforcement mechanisms
- ❌ Blocking artifacts
- ❌ Mandatory response triggers
- ❌ Automated propagation
- ❌ CI/CD integration

### 2.2 Bootstrap-Compatible

Ripple Signals must be:
- Human-readable (Markdown format)
- Git-committable (plain text artifacts)
- Independently understandable (no runtime dependencies)
- Forward-compatible (extensible without breaking)

### 2.3 Optional Reception

Receiving repositories:
- MAY monitor for ripple signals
- MAY record awareness of signals
- MAY annotate signals with local context
- Are NOT required to act on signals
- Are NOT blocked if signals are ignored

**Receipt awareness is optional, not mandatory.**

### 2.4 Future-Proof Foundation

Ripple Signals in Wave 2.2:
- Establish signal format and semantics
- Enable manual/informal signal exchange
- Provide foundation for Wave 3+ (Maturion-brokered correlation)

**NOT**:
- Wave 2.2 does NOT define automation
- Wave 2.2 does NOT define aggregation
- Wave 2.2 does NOT define enforcement

---

## 3. Signal Location and Naming

### 3.1 Canonical Location (Sending Repository)

Ripple Signals SHOULD be emitted at:

```
.ripple/signals/outgoing/RIPPLE_SIGNAL_<TIMESTAMP>.md
```

**Rationale**:
- `.ripple/` - Ripple Intelligence Layer artifacts
- `signals/` - Cross-repository signals
- `outgoing/` - Signals emitted by this repository
- `RIPPLE_SIGNAL_<TIMESTAMP>.md` - Timestamped signal instances

### 3.2 Alternative Locations (Future Waves)

**Incoming Signals** (if received from other repos):
```
.ripple/signals/incoming/RIPPLE_SIGNAL_<SOURCE_REPO>_<TIMESTAMP>.md
```

**Signal Archive** (historical signals):
```
.ripple/signals/archive/<YEAR>/<MONTH>/RIPPLE_SIGNAL_<TIMESTAMP>.md
```

**Note**: Incoming signal reception is **out of scope for Wave 2.2**. Defined for future compatibility only.

### 3.3 File Naming Conventions

- Primary format: `RIPPLE_SIGNAL_YYYY-MM-DDTHH-MM-SSZ.md`
- Timestamp uses ISO 8601 format (UTC with 'Z' suffix)
- Example: `RIPPLE_SIGNAL_2026-01-02T14-30-00Z.md`

**Note**: Signal emission is **manual** in Wave 2.2. No automation generates signals.

---

## 4. Signal Structure (Human-Readable Markdown)

### 4.1 Required Sections

A valid Ripple Signal MUST contain these sections:

```markdown
# Ripple Signal

## 1. Signal Metadata
## 2. Change Origin
## 3. Ripple Classification
## 4. Affected Domains
## 5. Impact Summary
## 6. Related Artifacts
## 7. Reception Instructions
```

---

## 5. Required Fields (Normative)

### 5.1 Signal Metadata Section

```markdown
## 1. Signal Metadata

- **RIPPLE_SIGNAL_SCHEMA_VERSION**: v1.0
- **Signal Timestamp**: <ISO 8601 UTC>
- **Signal ID**: <unique identifier>
- **Origin Repository**: <org/repo>
- **Origin Branch**: <branch-name>
- **Origin PR Number**: <number> (if applicable)
- **Origin Commit SHA**: <sha>
- **Signal Emitter**: <GovernanceAdministrator|Foreman|Builder>
- **Signal Type**: <GOVERNANCE_CANON|SCHEMA|POLICY|TEMPLATE|AGENT_CONTRACT|ENFORCEMENT|OTHER>
- **Signal Criticality**: <HIGH|MEDIUM|LOW>
- **Breaking Change**: <YES|NO|UNCERTAIN>
```

**Required Fields**:
- `RIPPLE_SIGNAL_SCHEMA_VERSION`: Must be `v1.0`
- `Signal Timestamp`: ISO 8601 UTC timestamp of signal emission
- `Signal ID`: Unique identifier (can be derived from timestamp)
- `Origin Repository`: Organization/repository where change occurred
- `Origin Branch`: Git branch containing the change
- `Origin Commit SHA`: Full commit SHA at signal emission time
- `Signal Emitter`: Role that emitted the signal
- `Signal Type`: Classification of change that triggered signal
- `Signal Criticality`: Overall impact level
- `Breaking Change`: Whether change is breaking

**Optional Fields**:
- `Origin PR Number`: PR number if change is via PR

**Signal ID Format**: `<org>-<repo>-<timestamp>`  
Example: `MaturionISMS-maturion-foreman-governance-2026-01-02T14-30-00Z`

---

### 5.2 Change Origin Section

```markdown
## 2. Change Origin

### 2.1 Changed Artifacts

**Primary Changes**:
- `<path/to/file1>` - <description>
- `<path/to/file2>` - <description>
- ...

**Change Summary**: <1-2 sentence summary of what changed>

**Change Rationale**: <Why this change was made>

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

**Local Ripple Scan Report**: `<path to ripple scan report>` (if available)

**Local Impact Summary**: <Brief summary of repository-local impact>
```

**Required Content**:
- List of primary changed artifacts (paths and descriptions)
- Brief change summary (2-3 sentences maximum)
- Change rationale (why change was made)
- Governance classification (checklist format)

**Optional Content**:
- Reference to local ripple scan report (from Wave 2.1)
- Local impact summary

**Note**: This section references **origin repository context**. Receiving repositories interpret for their own context.

---

### 5.3 Ripple Classification Section

```markdown
## 3. Ripple Classification

### 3.1 Ripple Scope

**Repository-Local Impact**: <description>

**Cross-Repository Impact Potential**: <HIGH|MEDIUM|LOW|UNKNOWN>

**Cross-Repository Impact Description**: <Why this might affect other repositories>

### 3.2 Ripple Plane (RIL Model)

**Primary Ripple Plane**: <Plane 1|Plane 2|Plane 3>

**Ripple Plane Description**:
- **Plane 1** (Proactive Downward Ripple): Change introduction, governance propagation
- **Plane 2** (Reactive Runtime Ripple): Enforcement and violation detection
- **Plane 3** (Upward Learning Ripple): Feedback and governance evolution

**Why This Plane**: <Explanation of ripple plane classification>

### 3.3 Propagation Characteristics

**Expected Propagation Direction**:
- [ ] Downstream (governance → execution repositories)
- [ ] Upstream (execution → governance repositories)
- [ ] Lateral (execution repo → execution repo)

**Propagation Mechanism**: <How this change might propagate>

**Propagation Timeline**: <Immediate | Gradual | On-demand | Unknown>
```

**Required Content**:
- Repository-local impact description
- Cross-repository impact potential assessment
- Primary ripple plane classification (per RIPPLE_INTELLIGENCE_LAYER.md)
- Expected propagation direction and mechanism

**Ripple Plane Values**:
- **Plane 1**: Proactive downward ripple (change introduction, pre-merge)
- **Plane 2**: Reactive runtime ripple (enforcement, during execution)
- **Plane 3**: Upward learning ripple (feedback, continuous learning)

**Cross-Repository Impact Potential Values**:
- **HIGH**: Likely affects multiple repositories, breaking changes, ecosystem-wide
- **MEDIUM**: May affect some repositories, non-breaking but significant
- **LOW**: Unlikely to affect other repositories, isolated change
- **UNKNOWN**: Unclear if cross-repo impact exists

---

### 5.4 Affected Domains Section

```markdown
## 4. Affected Domains

### 4.1 Technology Domains

**Affected Technology Stacks** (if applicable):
- [ ] Node.js / JavaScript
- [ ] Python
- [ ] Go
- [ ] .NET / C#
- [ ] Java
- [ ] Other: <specify>

**Technology-Specific Impact**: <Description if technology-specific>

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
- [ ] Other: <specify>

### 4.3 Agent Role Domains

**Affected Agent Roles**:
- [ ] Governance Administrator
- [ ] Governance Liaison
- [ ] Foreman (FM)
- [ ] Builder Agents
- [ ] Security Reviewer (if applicable)
- [ ] Other: <specify>

**Role-Specific Impact**: <How each role is affected>

### 4.4 Repository Type Domains

**Affected Repository Types**:
- [ ] Governance repositories (canonical governance)
- [ ] Execution repositories (application/service repos)
- [ ] Infrastructure repositories
- [ ] Documentation repositories
- [ ] Other: <specify>

**Repository-Specific Impact**: <Impact by repository type>
```

**Required Content**:
- Affected governance areas (checklist)
- Affected agent roles (checklist)
- Affected repository types (checklist)

**Optional Content**:
- Technology domains (if change is technology-specific)
- Role-specific impact descriptions
- Repository-specific impact descriptions

**Rationale**: Domains help receiving repositories determine if signal is relevant to them.

---

### 5.5 Impact Summary Section

```markdown
## 5. Impact Summary

### 5.1 Executive Summary

<2-3 paragraph summary of the ripple-worthy change and its cross-repository implications>

### 5.2 What Changed and Why

**What**: <Clear description of the change>

**Why**: <Rationale and context for the change>

**When**: <Timeline - when change occurred, when it takes effect>

### 5.3 Downstream Implications

**For Receiving Repositories**:
1. <Implication 1>
2. <Implication 2>
3. ...

**Potential Actions** (Optional, Not Required):
- <Optional action 1>
- <Optional action 2>
- ...

**Coordination Needed**: <YES|NO|OPTIONAL>

**Coordination Description** (if applicable): <What coordination might be needed>

### 5.4 Breaking Nature Assessment

**Breaking Change**: <YES|NO|UNCERTAIN>

**Breaking Change Details** (if YES or UNCERTAIN):
- **What Breaks**: <Description>
- **Why It Breaks**: <Explanation>
- **Migration Path**: <Guidance if available>
- **Backward Compatibility**: <Assessment>

**Non-Breaking Rationale** (if NO):
<Why this change is non-breaking>

### 5.5 Confidence and Uncertainty

**Impact Confidence**: <HIGH|MEDIUM|LOW>

**Confidence Rationale**: <Why this confidence level>

**Known Uncertainties**:
- <Uncertainty 1>
- <Uncertainty 2>
- ...

**What Cannot Be Determined**:
- <Limitation 1>
- <Limitation 2>
- ...
```

**Required Content**:
- Executive summary (2-3 paragraphs)
- What/Why/When description
- Downstream implications for receiving repositories
- Breaking nature assessment
- Confidence and uncertainty assessment

**Optional Content**:
- Potential actions (guidance for receiving repos)
- Coordination description
- Migration path details

**Note**: "Potential Actions" are **suggestions only**, not requirements. Receiving repositories decide their response.

---

### 5.6 Related Artifacts Section

```markdown
## 6. Related Artifacts

### 6.1 Origin Repository Artifacts

**Local Ripple Scan Report**: `<path>` (if available)

**Changed Governance Artifacts**:
- `<path>` - <description>
- `<path>` - <description>
- ...

**PR/Issue References**:
- PR #<number>: <title/description>
- Issue #<number>: <title/description>

**Commit References**:
- `<sha>` - <commit message>
- `<sha>` - <commit message>

### 6.2 Governance Canon References

**Relevant Canonical Governance**:
- `governance/canon/<FILE>.md` - <section> - <principle>
- `governance/schemas/<FILE>.schema.md` - <version>
- `governance/policy/<FILE>.md` - <section>
- ...

**Authority Chain**:
<Description of governance authority relationships affected>

### 6.3 Related Ripple Intelligence

**RIL Documentation**:
- `RIPPLE_INTELLIGENCE_LAYER.md` - <relevant section>
- `AGENT_RIPPLE_AWARENESS_OBLIGATION.md` - <relevant section>
- `GOVERNANCE_RIPPLE_MODEL.md` - <relevant section>

**Previous Ripple Signals** (if applicable):
- `RIPPLE_SIGNAL_<timestamp>.md` - <relationship>
- ...

### 6.4 External References

**Related Work in Other Repositories** (if known):
- `<org>/<repo>#<PR>` - <description>
- `<org>/<repo>#<issue>` - <description>

**Coordination Status**: <IN_PROGRESS|PENDING|COMPLETE|NOT_APPLICABLE>
```

**Required Content**:
- Changed governance artifacts (paths and descriptions)
- PR/Issue/Commit references from origin repository
- Relevant canonical governance references

**Optional Content**:
- Local ripple scan report reference
- Previous ripple signal references
- External repository coordination status

**Note**: External references are optional. Wave 2.2 does NOT define cross-repo coordination protocol.

---

### 5.7 Reception Instructions Section

```markdown
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

**Source Signal**: <path to this signal or signal ID>
**Received By**: <repository>
**Received Date**: <date>
**Acknowledged By**: <agent role>
**Local Relevance**: <HIGH|MEDIUM|LOW|NONE>
**Local Action Planned**: <YES|NO|TBD>
**Notes**: <optional repository-specific context>
```

**Note**: Reception recording is **guidance only**, not schema requirement.

### 7.3 Escalation and Questions

**For Questions or Coordination**:
- Contact origin repository maintainers
- Reference this signal ID in communications
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
```

**Required Content**:
- Explicit statement that signal is informational only
- List of allowed and prohibited actions for receiving repositories
- Optional acknowledgment format (guidance)
- Escalation guidance

**Note**: Reception instructions are **normative** (define signal semantics) but **not enforcement** (receiving repos decide response).

---

## 6. Validity Rules

A Ripple Signal is INVALID if:
- ❌ Schema version missing or not v1.0
- ❌ Required metadata fields missing (timestamp, origin repo, signal type, criticality)
- ❌ Missing required sections (1-7)
- ❌ No change origin description
- ❌ No ripple classification
- ❌ No affected domains
- ❌ No impact summary
- ❌ No reception instructions

---

## 7. Signal Emission Guidelines

### 7.1 When to Emit Ripple Signals

**Recommended Emission Triggers** (per AGENT_RIPPLE_AWARENESS_OBLIGATION.md):
- Governance canon changes (constitutional rules)
- Schema changes affecting artifact structure
- Policy changes affecting agent obligations
- Template changes affecting artifact generation
- Agent contract requirement changes
- Enforcement mechanism changes (gates, validators)
- Authority hierarchy changes

**Optional Emission**:
- Documentation-only changes (low cross-repo impact)
- Minor clarifications (non-breaking)
- Repository-specific changes (no cross-repo relevance)

**Not Applicable**:
- Application code changes (not governance-class)
- Runtime-only changes (no governance impact)
- Infrastructure changes (no governance propagation)

### 7.2 Who Emits Signals

**Primary Signal Emitters**:
- **Governance Administrator**: Canon, schema, policy, template changes
- **Foreman (FM)**: Coordination-related changes (when authorized)
- **Governance Liaison**: Governance seeding and propagation changes

**Not Signal Emitters** (Wave 2.2):
- Builder agents (operate within bounded execution scope)
- Runtime enforcement mechanisms (no signal emission capability)

### 7.3 How to Emit Signals (Manual, Wave 2.2)

**Signal Emission Process**:
1. Agent identifies ripple-worthy change (per ripple awareness obligation)
2. Agent performs local ripple scan (Wave 2.1)
3. Agent generates ripple signal using template
4. Agent commits signal to `.ripple/signals/outgoing/`
5. Signal is merged with governance change (same PR or follow-up)

**Note**: Signal emission is **manual** in Wave 2.2. No automation exists.

---

## 8. Signal Reception Guidelines (Future Waves)

### 8.1 Reception is Out of Scope for Wave 2.2

**Wave 2.2 Scope**:
- ✅ Define signal format
- ✅ Define emission semantics
- ✅ Define reception instructions

**NOT in Wave 2.2**:
- ❌ Automated signal monitoring
- ❌ Signal aggregation across repositories
- ❌ Mandatory signal acknowledgment
- ❌ Signal-based enforcement

### 8.2 Future Reception Mechanisms (Wave 3+)

**Potential Future Reception Capabilities** (Parked, Not Authorized):
- Maturion-brokered signal aggregation
- Cross-repository signal correlation
- Automated signal monitoring and notification
- Signal-based impact analysis

**Governance Position**: Reception automation is **deferred to future waves** pending Wave 2.2 effectiveness validation.

---

## 9. Integration with Ripple Intelligence Layer

### 9.1 Relationship to RIL Planes

Ripple Signals operate primarily in **Plane 1 (Proactive Downward Ripple)**:
- Signals communicate **pre-merge or post-merge awareness**
- Signals enable **cross-repository proactive awareness**
- Signals support **informed decision-making** in receiving repositories

**Note**: Signals can reference Plane 2 (runtime enforcement) or Plane 3 (learning) changes, but signal mechanism is Plane 1.

### 9.2 Relationship to Assisted Ripple Scan (Wave 2.1)

**Integration**:
- Wave 2.1 provides **repository-local ripple analysis**
- Wave 2.2 provides **cross-repository ripple communication**
- Local ripple scan report referenced in ripple signal (if available)
- Signal extends local analysis to cross-repo awareness

**Sequence**:
1. Agent performs local ripple scan (Wave 2.1)
2. Agent identifies cross-repo impact potential
3. Agent generates ripple signal (Wave 2.2)
4. Signal communicates local analysis findings to other repositories

### 9.3 Relationship to Governance Ripple Model

**Integration**:
- GOVERNANCE_RIPPLE_MODEL.md defines **bidirectional governance evolution**
- Ripple Signals enable **downward ripple awareness** (governance → execution repos)
- Ripple Signals may trigger **upward learning** (execution experience → governance)

**Complementarity**:
- Governance Ripple Model: **post-merge propagation and learning**
- Ripple Signals: **awareness communication** (pre- or post-merge)

---

## 10. Non-Goals and Explicit Exclusions

### 10.1 What Ripple Signals Do NOT Do

**No Enforcement**:
- ❌ Do not block merges
- ❌ Do not fail CI/CD
- ❌ Do not mandate remediation
- ❌ Do not prevent repository operations

**No Automation** (Wave 2.2):
- ❌ Do not auto-generate (manual emission only)
- ❌ Do not auto-propagate across repositories
- ❌ Do not auto-aggregate or correlate
- ❌ Do not trigger automated workflows

**No Cross-Repository Coordination** (Wave 2.2):
- ❌ Do not define coordination protocol
- ❌ Do not mandate cross-repo PRs
- ❌ Do not synchronize repository states
- ❌ Do not enforce compatibility

**No Authoritative Decision-Making**:
- ❌ Do not determine if changes are allowed
- ❌ Do not approve or reject receiving repo actions
- ❌ Do not override human judgment
- ❌ Do not enforce governance rules

---

### 10.2 What Ripple Signals ARE

Ripple Signals are:
- ✅ Passive awareness mechanisms
- ✅ Human-readable notifications
- ✅ Informational artifacts
- ✅ Foundation for future correlation
- ✅ Bootstrap-compatible (Git-committable)
- ✅ Optional for receiving repositories

**Ripple signals provide awareness. Receiving repositories decide response.**

---

## 11. Success Criteria

This schema is successful when:

- ✅ Ripple signal format is clear and unambiguous
- ✅ Signals are human-readable and Git-committable
- ✅ Signals provide actionable cross-repo awareness
- ✅ Reception semantics are non-blocking
- ✅ Signals integrate with RIL and Wave 2.1
- ✅ Signals are forward-compatible with Wave 3+
- ✅ Agents understand when and how to emit signals
- ✅ Receiving repositories understand optional response

---

## 12. Evolution and Review

### 12.1 Version History

- **v1.0.0** (2026-01-02) — Initial schema definition (Ripple-Wave 2.2.1)

### 12.2 Review Triggers

This schema MUST be reviewed when:
- Ripple-Wave 3 (Maturion-brokered correlation) begins
- Agent feedback identifies missing signal fields
- Cross-repo coordination reveals schema gaps
- Signal format proves insufficient for ecosystem needs

### 12.3 Evolution Governance

Changes to this schema:
- **Minor Updates** (clarifications, examples) — Governance Administrator authority
- **Major Changes** (new sections, required fields) — Human authority approval required
- **Breaking Changes** (incompatible with v1.0) — Requires schema versioning and migration

---

## 13. Closing Principle

**Ripple Signals make cross-repository ripples visible.**

They exist to answer:
- **What changed in another repository?**
- **How might it affect my repository?**
- **What is the impact classification?**
- **What should I consider doing?**

Before ripple signals:
> "Governance changed upstream. I'll discover impact when something breaks."

After ripple signals:
> "Governance changed upstream. I received a signal. I can decide if/how to respond."

**Signals inform. Repositories decide. Coordination is optional.**

---

**End of RIPPLE SIGNAL SCHEMA v1.0.0**

---

**Document Metadata**:
- Schema ID: RIPPLE_SIGNAL_SCHEMA_V1
- Authority: Canonical Governance Specification
- Effective Date: 2026-01-02
- Required By: CROSS_REPOSITORY_RIPPLE_AWARENESS_MODEL.md
- Integration: RIPPLE_INTELLIGENCE_LAYER.md, ASSISTED_RIPPLE_SCAN_SCOPE.md, GOVERNANCE_RIPPLE_MODEL.md
- Part of: Ripple-Wave 2.2 — Passive Cross-Repository Ripple Awareness Signal
