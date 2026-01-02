# ASSISTED RIPPLE SCAN SCOPE

## Status
**Type**: Canonical Governance Specification  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-01-02  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Precedence**: Subordinate to RIPPLE_INTELLIGENCE_LAYER.md  
**Part of**: Ripple-Wave 2.1 — Assisted Local Repository Ripple Scan

---

## 1. Purpose

This document defines the **canonical scope** of assisted ripple scanning within a single repository.

Assisted ripple scanning is the **AI-assisted identification** of ripple impact within repository boundaries, providing **visibility without enforcement** for governance-class changes.

This document establishes:
- What must be analyzed during an assisted ripple scan
- What boundaries and dependencies are evaluated
- What is explicitly out of scope
- What information must be surfaced in ripple reports

**This is observational capability only** - no automation, enforcement, or blocking behavior.

---

## 2. Constitutional Authority

This model derives authority from and complements:
- **RIPPLE_INTELLIGENCE_LAYER.md** — Conceptual foundation for ripple awareness (Plane 1)
- **AGENT_RIPPLE_AWARENESS_OBLIGATION.md** — Agent obligation to surface ripples
- **GOVERNANCE_RIPPLE_MODEL.md** — Bidirectional governance evolution framework
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** — Governance as canonical memory

---

## 3. Scope Definition

### 3.1 What is an Assisted Ripple Scan?

**Assisted Ripple Scan** is:
- **AI-powered analysis** of changes introduced in a PR or work unit
- **Repository-local** impact identification (no cross-repo analysis in Wave 2.1)
- **Governance-class focused** (governance canon, schemas, policies, templates, agent contracts)
- **Human-readable reporting** (informational output for review)
- **Pre-merge awareness** (operates before changes are merged)

**Assisted Ripple Scan is NOT**:
- ❌ Automated enforcement
- ❌ CI/CD blocking
- ❌ Cross-repository propagation
- ❌ Runtime validation
- ❌ Mandatory for all PRs
- ❌ Authoritative decision-making

---

### 3.2 When Should Assisted Ripple Scanning Be Used?

**Recommended Use Cases**:
- Governance Administrator making canon changes
- Governance Administrator making schema updates
- Governance Administrator making policy changes
- Governance Administrator making template modifications
- Agent contract updates (when authorized)
- Any governance-class change with potential downstream impact

**Optional Use Cases**:
- Documentation changes
- Non-governance changes that reference governance artifacts
- Learning capture before promoting to governance

**Not Applicable**:
- Application code changes (builder domain)
- Runtime execution changes
- Infrastructure changes

---

## 4. Scan Analysis Layers

Assisted ripple scanning analyzes changes across **five analysis layers**:

### 4.1 Layer 1: Changed Files (Change Origin)

**What is analyzed**:
- Files modified in the PR or work unit
- Files added in the PR or work unit
- Files deleted in the PR or work unit
- File renames or moves

**Information captured**:
- Full path of each changed file
- Type of change (added, modified, deleted, renamed)
- File category (canon, schema, policy, template, agent contract, other)
- Change magnitude (lines added/removed, semantic weight)

**Purpose**: Establish the origin point of ripple propagation

---

### 4.2 Layer 2: Referencing Files (Direct Impact)

**What is analyzed**:
- Files that explicitly reference changed files
- Files that import/include changed files
- Files that link to changed files (markdown links)
- Files that cite changed files as authority

**Search methods**:
- Text search for file paths
- Import/include statement analysis
- Markdown link detection
- Cross-reference pattern matching

**Information captured**:
- Full path of each referencing file
- Type of reference (import, link, citation, mention)
- Reference context (section, line number if available)
- Reference purpose (what the referring file does with the reference)

**Purpose**: Identify files directly affected by changes (first-order ripple)

---

### 4.3 Layer 3: Referenced Files (Dependency Impact)

**What is analyzed**:
- Files referenced by changed files
- Dependencies declared by changed files
- Governance artifacts cited by changed files
- Schema/policy/canon dependencies

**Information captured**:
- Full path of each referenced file
- Type of dependency (schema, policy, canon, template)
- Dependency purpose (validation, authority, guidance)
- Version information (if versioned)

**Purpose**: Identify upstream dependencies that may be affected by changes or may constrain changes

---

### 4.4 Layer 4: Structural Dependencies (Folder/Schema/Template Impact)

**What is analyzed**:
- Folder structure changes
- Schema definition changes and their consumers
- Template changes and their instances
- Enforcement mechanism dependencies

**Structural patterns evaluated**:
- Schema changes → artifacts that conform to schema
- Template changes → files generated from template
- Canon changes → policies/schemas that implement canon
- Policy changes → enforcement mechanisms that validate policy
- Folder moves/renames → references to folder paths

**Information captured**:
- Structural relationship type (schema-instance, template-artifact, canon-implementation)
- Affected artifact paths
- Breaking vs non-breaking classification
- Migration impact (if structural change is breaking)

**Purpose**: Identify structural ripples that propagate through schema/template relationships

---

### 4.5 Layer 5: Cross-Boundary Links (Explicit Governance Connections)

**What is analyzed**:
- Explicit authority relationships (policy cites canon)
- Explicit requirement relationships (schema requires policy compliance)
- Explicit enforcement relationships (gate validates against schema)
- Explicit integration relationships (models reference each other)

**Governance patterns evaluated**:
- Canon → Policy → Schema → Template chains
- Agent contract → Canon/Policy dependencies
- Gate definition → Schema/Policy dependencies
- Learning/Failure promotion paths

**Information captured**:
- Governance relationship type
- Authority hierarchy implications
- Enforcement chain implications
- Learning feedback loop implications

**Purpose**: Identify governance ecosystem ripples that propagate across conceptual boundaries

---

## 5. Scan Boundaries and Exclusions

### 5.1 Repository-Local Only (Wave 2.1 Constraint)

**In Scope**:
- ✅ Files within the scanned repository
- ✅ References within the scanned repository
- ✅ Dependencies within the scanned repository
- ✅ Structural relationships within the scanned repository

**Out of Scope** (Deferred to Future Waves):
- ❌ Cross-repository dependencies
- ❌ Cross-repository reference scanning
- ❌ Multi-repo impact aggregation
- ❌ Ecosystem-wide propagation analysis

**Rationale**: Wave 2.1 provides **single-repository visibility** as foundation for future cross-repo intelligence.

---

### 5.2 Governance-Class Focused

**Primary Focus**:
- ✅ `governance/canon/**`
- ✅ `governance/schemas/**`
- ✅ `governance/policy/**`
- ✅ `governance/templates/**`
- ✅ `governance/agents/**`
- ✅ `.github/agents/**`
- ✅ `.github/workflows/**` (when governance-related)

**Secondary Analysis** (context-dependent):
- Files that reference governance artifacts
- Documentation that describes governance
- Evidence artifacts that conform to governance schemas

**Out of Scope**:
- ❌ Application code (unless it directly references governance)
- ❌ Runtime execution logic
- ❌ Infrastructure configuration (unless governance-related)
- ❌ Test code (unless it validates governance)

---

### 5.3 Pre-Merge Analysis Only

**Timing Constraint**:
- ✅ Analysis occurs **before merge**
- ✅ Analysis operates on **proposed changes** (PR diff)
- ✅ Analysis provides **proactive awareness**

**Not Applicable**:
- ❌ Post-merge analysis (that's GOVERNANCE_RIPPLE_MODEL.md propagation)
- ❌ Runtime enforcement (that's FM_RUNTIME_ENFORCEMENT_AND_AWARENESS_MODEL.md)
- ❌ Historical change analysis (different use case)

---

## 6. Information Surfaced in Ripple Reports

Assisted ripple scans must surface the following information in ripple reports:

### 6.1 Change Origin Section

**Required Information**:
- List of changed files (added, modified, deleted, renamed)
- File categories (canon, schema, policy, template, contract, other)
- Change magnitude per file (lines changed, semantic weight)
- Change classification (governance area affected)

---

### 6.2 Direct Impact Section (Referencing Files)

**Required Information**:
- Files that reference changed files
- Type of reference (import, link, citation, mention)
- Context of reference (why the reference exists)
- Impact assessment (how change affects referencing file)

---

### 6.3 Dependency Impact Section (Referenced Files)

**Required Information**:
- Files referenced by changed files
- Type of dependency (schema, policy, canon, authority)
- Dependency purpose
- Constraint implications (how dependencies may limit changes)

---

### 6.4 Structural Impact Section

**Required Information**:
- Schema-instance relationships affected
- Template-artifact relationships affected
- Canon-implementation chains affected
- Breaking vs non-breaking classification
- Migration considerations (if breaking)

---

### 6.5 Governance Connection Section

**Required Information**:
- Authority relationships affected
- Enforcement relationships affected
- Learning/promotion pathways affected
- Integration relationships affected

---

### 6.6 Impact Classification

**Required Information**:
- **Scope**: Repository-local only (Wave 2.1)
- **Criticality**: HIGH / MEDIUM / LOW based on affected artifacts
- **Breaking Nature**: Breaking / Non-Breaking / Uncertain
- **Agent Impact**: Which agent classes are affected (Builder, FM, Governance Admin)
- **Enforcement Impact**: Whether enforcement mechanisms are affected

---

### 6.7 Confidence and Uncertainty

**Required Information**:
- **Confidence Level**: HIGH / MEDIUM / LOW
- **Uncertainty Notes**: What is unclear or ambiguous
- **Analysis Limitations**: What could not be determined
- **Recommended Follow-Up**: Actions to resolve uncertainty

---

## 7. Analysis Methodology (Conceptual)

This section provides **conceptual guidance** for how assisted ripple scanning operates. This is **not implementation** but **semantic description** for shared understanding.

### 7.1 Static Analysis Approach

Assisted ripple scanning uses **static analysis** techniques:
- File system traversal
- Text pattern matching (grep/search)
- Markdown link extraction
- Import/reference statement parsing
- Path reference detection
- Schema-instance relationship inference

**No runtime analysis** is performed.

---

### 7.2 Heuristic Pattern Matching

Assisted ripple scanning uses **heuristic patterns** to identify relationships:

**File Reference Patterns**:
- Direct path mentions: `governance/canon/FILE.md`
- Relative path references: `../schemas/SCHEMA.md`
- Markdown links: `[text](path/to/file.md)`
- Authority citations: "Required by: FILE.md"

**Structural Relationship Patterns**:
- Schema conformance: files in expected locations matching schema patterns
- Template instances: files generated from template patterns
- Canon implementation: policies/schemas that cite canon as authority
- Enforcement chains: gates that validate against schemas

**Governance Connection Patterns**:
- Authority hierarchy: "Subordinate to: FILE.md"
- Precedence relationships: "Precedence: Higher/Lower than FILE.md"
- Integration relationships: "Complements: FILE.md"
- Enforcement relationships: "Required by: GATE"

---

### 7.3 Confidence Assessment Factors

**HIGH Confidence**:
- Explicit file path references found
- Direct import/link statements
- Clear structural relationships
- Well-defined governance connections
- No ambiguity in analysis

**MEDIUM Confidence**:
- Indirect references inferred
- Pattern-based relationship detection
- Some ambiguity present
- Partial information available

**LOW Confidence**:
- Weak evidence of relationship
- High uncertainty
- Missing information
- Governance ambiguity prevents clear analysis

---

## 8. Non-Goals and Explicit Exclusions

### 8.1 What Assisted Ripple Scanning Does NOT Do

**No Enforcement**:
- ❌ Does not block PRs
- ❌ Does not fail CI/CD
- ❌ Does not mandate remediation
- ❌ Does not prevent merge

**No Automation**:
- ❌ Does not automatically update affected files
- ❌ Does not propagate changes
- ❌ Does not trigger workflows
- ❌ Does not create follow-up PRs

**No Cross-Repository Analysis** (Wave 2.1):
- ❌ Does not scan other repositories
- ❌ Does not track cross-repo dependencies
- ❌ Does not signal to other repositories
- ❌ Does not aggregate multi-repo impact

**No Runtime Validation**:
- ❌ Does not execute code
- ❌ Does not validate runtime behavior
- ❌ Does not test enforcement mechanisms
- ❌ Does not simulate gate execution

**No Authoritative Decision-Making**:
- ❌ Does not determine if changes are allowed
- ❌ Does not approve or reject changes
- ❌ Does not override human judgment
- ❌ Does not enforce governance rules

---

### 8.2 What Ripple Reports Are NOT

Ripple reports are **informational artifacts**, not:
- ❌ Blocking artifacts (like gate failures)
- ❌ Enforcement artifacts (like validation reports)
- ❌ Evidence artifacts (like QA reports)
- ❌ Decision artifacts (like approval records)

**Ripple reports provide awareness. Humans make decisions.**

---

## 9. Integration with Ripple Intelligence Layer

### 9.1 Relationship to RIL Plane 1 (Proactive Downward Ripple)

Assisted ripple scanning **implements** RIL Plane 1 at the repository-local level:
- RIL Plane 1 defines **conceptual framework** for proactive ripple intelligence
- Assisted ripple scanning provides **practical implementation** of that framework
- Scan scope defines **what to analyze** to achieve proactive awareness

---

### 9.2 Relationship to Agent Ripple Awareness Obligation

Assisted ripple scanning **assists agents** in fulfilling their ripple awareness obligation:
- AGENT_RIPPLE_AWARENESS_OBLIGATION.md mandates that agents surface ripples
- Assisted ripple scanning provides **tooling assistance** for that obligation
- Ripple reports document **ripple awareness** required by the obligation

**Agent obligation remains mandatory even without assisted scanning.**

---

### 9.3 Relationship to Governance Ripple Model

Assisted ripple scanning operates **before** GOVERNANCE_RIPPLE_MODEL.md propagation:
- Assisted scanning: **Pre-merge awareness** (what ripples will occur)
- Governance Ripple Model: **Post-merge propagation** (how governance is distributed)
- Both operate in Plane 1 (Proactive Downward Ripple) but at different stages

---

## 10. Success Criteria

Assisted ripple scan scope definition is successful when:

- ✅ Five analysis layers are clearly defined
- ✅ Scan boundaries are explicit and unambiguous
- ✅ Information requirements are complete
- ✅ Repository-local constraint is honored
- ✅ Governance-class focus is maintained
- ✅ Non-goals and exclusions are clear
- ✅ Integration with RIL is explicit
- ✅ Agents understand what assisted scanning provides

---

## 11. Evolution and Review

### 11.1 Version History

- **v1.0.0** (2026-01-02) — Initial canonical definition (Ripple-Wave 2.1.1)

### 11.2 Review Triggers

This model MUST be reviewed when:
- Ripple-Wave 2.2 (cross-repo awareness) begins
- Assisted scanning implementation reveals scope gaps
- Agent feedback identifies missing analysis layers
- Governance evolution requires additional scan patterns

### 11.3 Evolution Governance

Changes to this model:
- **Minor Updates** (clarifications, examples) — Governance Administrator authority
- **Major Changes** (new analysis layers, scope expansion) — Human authority approval required
- **Breaking Changes** (incompatible with existing scanning) — Requires governance correction cycle

---

## 12. Closing Principle

**Assisted ripple scanning provides visibility, not control.**

It exists to answer:
- **What files are affected?**
- **What dependencies exist?**
- **What structural relationships are impacted?**
- **What governance connections are involved?**

Before assisted scanning:
> "I changed governance. I must manually discover all ripples."

After assisted scanning:
> "I changed governance. Assisted scanning surfaced potential ripples for my review."

**Scanning assists. Agents remain responsible. Humans decide.**

---

**End of ASSISTED RIPPLE SCAN SCOPE v1.0.0**

---

**Document Metadata**:
- Policy ID: ASSISTED_RIPPLE_SCAN_SCOPE_V1
- Authority: Canonical Governance Specification
- Effective Date: 2026-01-02
- Complements: RIPPLE_INTELLIGENCE_LAYER.md, AGENT_RIPPLE_AWARENESS_OBLIGATION.md
- Part of: Ripple-Wave 2.1 — Assisted Local Repository Ripple Scan (Reporting Only)
