# Memory Lifecycle Governance

**Status**: Active  
**Version**: 1.0.0  
**Last Updated**: 2025-12-06  
**Enforcement**: Strict

## Purpose

Define the lifecycle states and governance rules for Unified Memory Fabric entries, ensuring:

- Sustainable long-term memory growth
- High signal-to-noise ratio in active reasoning
- Full auditability and reversibility
- Compliance with A1 governance requirements

## Lifecycle States

### 1. Active Memory

**Definition**: Memory entries actively used by the reasoning engine.

**Criteria**:
- Created within staleness thresholds
- Relevant to current architecture, build waves, or decisions
- Not contradicted by governance or newer knowledge
- Not superseded by consolidated knowledge

**Used By**:
- Reasoning engine (MARE)
- Builder memory injector
- Drift monitor
- Consolidation engine

**Retention**: Indefinite, until retirement criteria are met

---

### 2. Consolidated Knowledge

**Definition**: Evergreen knowledge extracted from memory entries via consolidation (Issue #9).

**Criteria**:
- High confidence score (≥ 0.8)
- Validated against governance
- Represents recurring patterns or critical lessons
- Linked to governance documents

**Used By**:
- Reasoning engine (always prioritized)
- Builder memory injector (mandatory context)
- Architecture validation
- Governance alignment checks

**Retention**: Permanent (rarely retired, only if governance changes)

---

### 3. Archival Memory

**Definition**: Historically important memory no longer used in active reasoning.

**Criteria**:
- Exceeds staleness threshold
- Low significance score
- Superseded by better knowledge
- Still valuable for audit/forensics

**Location**: `/memory/archive/{scope}/{year}/{month}/`

**Used By**:
- Manual review processes
- Audit trails
- Historical analysis
- Restoration requests

**Retention**: Minimum 3 years, then eligible for permanent archival

---

### 4. Deprecated Memory

**Definition**: Memory contradicted by governance or superseded by better knowledge.

**Criteria**:
- Contradicts governance rules
- Conflicts with consolidated knowledge
- References obsolete modules/features
- Flagged by drift monitor

**Location**: `/memory/archive/deprecated/{scope}/`

**Used By**:
- Manual review only
- Conflict resolution
- Root cause analysis

**Retention**: Minimum 1 year, then eligible for deletion (with approval)

---

## Retirement Rules

### Rule 1: Staleness-Based Retirement

**Trigger**: Memory entry exceeds age threshold

**Thresholds**:
- Reasoning Patterns: 180 days (6 months)
- Architecture Lessons: 365 days (1 year)
- Historical Issues: 90 days (3 months)
- Project Memory: 30 days (1 month)
- General Memory: 180 days (6 months)

**Action**:
- Low severity: Automatic archival
- Medium severity: Flag for review
- High/Critical: Require manual approval

**Exception**: Consolidated knowledge is exempt from staleness retirement

---

### Rule 2: Supersession-Based Retirement

**Trigger**: Memory superseded by consolidated knowledge or governance

**Criteria**:
- Consolidated knowledge block replaces memory
- Governance file supersedes obsolete decision
- Architecture change invalidates old rationale

**Action**:
- Retire original entry
- Add supersession marker pointing to new knowledge
- Update consolidated knowledge references
- Log supersession event

**Guarantee**: All superseded memory remains in archive with full traceability

---

### Rule 3: Obsolescence-Based Retirement

**Trigger**: Memory references removed/deprecated components

**Criteria**:
- References deprecated modules
- References removed features
- References replaced systems
- Uses obsolete naming conventions

**Action**:
- Mark as deprecated
- Move to deprecated archive
- Flag for manual review if high severity
- Update dependency graphs

**Validation**: Cross-reference with current codebase and architecture

---

### Rule 4: Conflict-Based Retirement

**Trigger**: Drift Monitor detects contradictions

**Criteria**:
- Direct contradictions between entries
- Inconsistent decision chains
- Competing lessons
- Duplicate patterns

**Action**:
- Identify oldest conflicting entry
- Retire older entry (unless critical)
- Keep newest or highest-confidence entry
- Log conflict resolution

**Manual Review**: Required if both entries are high-confidence or critical

---

## Immutability Guarantee

**Core Principle**: Retirement never deletes data.

### Requirements

1. **Full Archival**: All retired entries stored in `/memory/archive/`
2. **Version Control**: All archives tracked in Git
3. **Restoration**: Any entry can be restored to active state
4. **Audit Trail**: Complete history of retirements logged
5. **Traceability**: Markers point to archive locations

### Archival Structure

```
/memory/archive/
  ├── global/
  │   ├── 2025/
  │   │   ├── 12/
  │   │   │   ├── retired-entries.json
  │   │   │   └── retirement-log.json
  ├── foreman/
  │   ├── 2025/12/...
  ├── projects/
  │   ├── {projectId}/
  │   │   ├── 2025/12/...
  └── deprecated/
      ├── global/...
      ├── foreman/...
      └── projects/...
```

---

## Integration Requirements

### With Consolidation Engine

- **Before Consolidation**: Identify candidates for retirement
- **During Consolidation**: Mark superseded entries
- **After Consolidation**: Archive superseded memory
- **Logging**: Record all consolidation-driven retirements

### With Drift Monitor

- **Before Drift Check**: Load active memory only (exclude archived)
- **During Drift Check**: Identify conflicts for retirement
- **After Drift Check**: Retire conflicting entries
- **Resolution**: Update drift report with retirement actions

### With Reasoning Engine

- **Memory Loading**: Exclude archived/deprecated entries
- **Knowledge Injection**: Prioritize consolidated knowledge
- **Validation**: Check retirement markers before use
- **Logging**: Track which memory influenced decisions

### With Builder Memory Injector

- **Context Compilation**: Never inject archived/deprecated memory
- **Consolidated Priority**: Always include high-confidence blocks
- **Size Optimization**: Use retirement to reduce context size
- **Validation**: Verify no retired entries in builder context

### With Project Lifecycle

- **Phase Transitions**: Trigger retirement review
- **Milestone Completion**: Archive obsolete project memory
- **Project Completion**: Move all project memory to archive
- **Project Archival**: Deprecate all project-specific entries

---

## Event Logging

### Required Events

All retirement actions must log events to:
```
/memory/governance-events.json
```

### Event Schema

```json
{
  "type": "memory_retirement",
  "timestamp": "2025-12-06T18:00:00Z",
  "actor": "retirement-engine",
  "scope": "global",
  "action": "archived",
  "details": {
    "entryId": "entry_12345",
    "reason": "staleness",
    "lifecycle": "archival",
    "ageInDays": 200,
    "archiveLocation": "/memory/archive/global/2025/12/retired-entries.json",
    "supersededBy": null,
    "manualReviewRequired": false
  }
}
```

---

## Manual Review Process

### When Required

- High or critical severity retirements
- Deprecated entries referencing governance
- Conflicts between high-confidence entries
- Restoration requests

### Review Workflow

1. **Flagging**: Retirement engine flags entry
2. **Notification**: Alert human reviewer (dashboard/email)
3. **Review**: Human examines entry and context
4. **Decision**: Approve, reject, or modify retirement
5. **Logging**: Record review decision with rationale

### Review SLA

- Critical: 24 hours
- High: 7 days
- Medium: 30 days

---

## Restoration Protocol

### Restoration Criteria

- Governance change revalidates old decision
- Architecture rollback requires old patterns
- Audit/forensic investigation
- Error correction

### Restoration Process

1. **Request**: Submit restoration request with reason
2. **Validation**: Verify archive integrity
3. **Conflict Check**: Ensure no contradictions with active memory
4. **Restoration**: Move entry back to active
5. **Logging**: Record restoration event

### Post-Restoration

- Update version number
- Add restoration metadata
- Run drift check
- Notify reasoning engine

---

## Performance Guarantees

### Active Memory Size

- **Target**: ≤ 1000 active entries per scope
- **Maximum**: 2000 entries before forced retirement
- **Optimization**: Continuous consolidation and archival

### Reasoning Performance

- **Target**: Memory load time ≤ 500ms
- **Maximum**: 2 seconds (triggers optimization)
- **Guarantee**: No performance degradation as memory grows

### Storage Efficiency

- **Compression**: Archived memory compressed
- **Deduplication**: Identical entries merged
- **Cleanup**: Permanent deletion after retention period (with approval)

---

## Compliance Requirements

### A1 Governance Alignment

- ✅ No data deletion (archived, not deleted)
- ✅ Full auditability (event logging)
- ✅ Version control (Git tracking)
- ✅ Human oversight (manual review for high severity)
- ✅ Reversibility (restoration protocol)

### Security Requirements

- ✅ No secrets in archived memory
- ✅ Access control for deprecated entries
- ✅ Encryption for sensitive archived data
- ✅ Audit trails for all retirement actions

---

## Monitoring & Alerting

### Key Metrics

- Active memory size (entries and bytes)
- Retirement rate (entries/day)
- Archival growth rate (bytes/day)
- Manual review backlog
- Restoration requests

### Alerts

- **Warning**: Active memory > 1500 entries
- **Critical**: Active memory > 2000 entries
- **Warning**: Manual review backlog > 10
- **Critical**: Manual review backlog > 50

---

## Automation Rules

### Automatic Retirement (No Review)

- Staleness (low severity) > threshold
- Supersession by high-confidence consolidated knowledge
- Obsolescence (removed modules)
- Duplicates (exact matches)

### Automatic Archival

- Project completion
- Milestone completion
- Phase transitions
- Low-significance entries

### Require Manual Review

- High/critical severity
- Governance-related memory
- Architectural decisions
- High-confidence conflicts

---

## Version History

### v1.0.0 (2025-12-06)

- Initial lifecycle governance model
- Four lifecycle states defined
- Retirement rules established
- Integration requirements specified
- Event logging requirements added
- Immutability guarantee codified
