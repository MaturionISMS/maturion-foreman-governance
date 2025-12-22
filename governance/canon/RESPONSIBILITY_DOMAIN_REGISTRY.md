# RESPONSIBILITY DOMAIN REGISTRY

## Status
Canonical Governance Registry  
Version: v1  
Authority: Governance  
Applies To: All PRs, All Builders, All Repositories

---

## 1. Purpose

This registry defines the **only valid responsibility domains**
that may be declared in a Scope Declaration.

Responsibility domains are governance-controlled.
Builders may not invent, rename, combine, or reinterpret domains.

If a responsibility domain is not present in this registry,
it does not exist.

---

## 2. Core Invariants

1. Every PR MUST declare exactly one responsibility domain.
2. The declared domain MUST exist in this registry.
3. Each domain defines an explicit file-system scope.
4. Files outside the declared domain scope MUST NOT be modified.
5. Ambiguity results in PR invalidation, not interpretation.

---

## 3. Domain Definition Structure (Normative)

Each responsibility domain entry MUST define:

- Domain name (canonical)
- Description
- Allowed paths
- Explicitly forbidden paths
- Typical failure signatures
- Example valid PR names

---

## 4. Canonical Responsibility Domains (v1)

---

### DOMAIN: Database Lifecycle

**Description**  
Schema design, migrations, connection pooling, lifecycle guarantees.

**Allowed Paths**
- `prisma/**`
- `migrations/**`
- `db/**`
- `schema/**`

**Forbidden Paths**
- `.github/**`
- `email/**`
- `logging/**`
- `tests/**` (unless tests are the declared domain)

**Typical Failure Signatures**
- Missing migration
- Schema mismatch
- Connection exhaustion
- Pool misconfiguration

**Valid PR Names**
- “Prisma Connection Pool Stabilization”
- “Database Migration Consistency Fix”

---

### DOMAIN: Email Delivery

**Description**  
Transactional and system email delivery logic and configuration.

**Allowed Paths**
- `email/**`
- `mail/**`
- `templates/email/**`

**Forbidden Paths**
- `prisma/**`
- `db/**`
- `.github/**`
- `logging/**`

**Typical Failure Signatures**
- SMTP configuration incomplete
- Email not sent
- Template rendering failure

**Valid PR Names**
- “Transactional Email Reliability”
- “SMTP Configuration Hardening”

---

### DOMAIN: CI Infrastructure

**Description**  
CI workflows, gates, and automation logic.

**Allowed Paths**
- `.github/workflows/**`

**Forbidden Paths**
- `src/**`
- `app/**`
- `prisma/**`
- `email/**`

**Typical Failure Signatures**
- CI gate misfire
- Workflow ordering failure
- Missing environment setup

**Valid PR Names**
- “QA Enforcement Gate Refinement”
- “CI Migration Deployment Ordering”

---

### DOMAIN: Logging and Audit

**Description**  
Logging pipelines, audit trails, and observability controls.

**Allowed Paths**
- `logging/**`
- `audit/**`
- `observability/**`

**Forbidden Paths**
- `email/**`
- `prisma/**`
- `.github/**`

**Typical Failure Signatures**
- Missing audit record
- Silent logging failure
- Incomplete traceability

**Valid PR Names**
- “Audit Logging Completeness”
- “Structured Logging Enforcement”

---

### DOMAIN: Test Infrastructure

**Description**  
Test harnesses, fixtures, and test-only utilities.

**Allowed Paths**
- `tests/**`
- `__tests__/**`
- `test/**`

**Forbidden Paths**
- `src/**`
- `app/**`
- `prisma/**`
- `.github/**` (unless CI is the domain)

**Typical Failure Signatures**
- Missing coverage
- Broken test harness
- Non-deterministic tests

**Valid PR Names**
- “Test Harness Stabilization”
- “Deterministic Test Execution Fix”

---

### DOMAIN: Governance Canon

**Description**  
Governance policies, agent contracts, canonical schemas, and governance enforcement rules.

**Allowed Paths**
- `governance/**`

**Forbidden Paths**
- `src/**`
- `app/**`
- `prisma/**`
- `email/**`
- `logging/**`
- `implementation/**` (execution artifacts)

**Typical Failure Signatures**
- Missing policy artifact
- Schema non-compliance
- Agent contract incompleteness
- Governance drift

**Valid PR Names**
- "Agent Non-Stalling Policy Definition"
- "Governance Scope Declaration Schema"
- "Escalation Protocol Canon"

---

## 5. Adding a New Responsibility Domain

New domains may only be added via governance change management.

Process:
1. Propose a new domain using the canonical template
2. Submit governance PR
3. Governance approval required
4. Registry version incremented

Builders may not use new domains until approved.

---

## 6. Precedence

This registry has canonical precedence over:
- Scope declarations
- CI workflows
- Builder intent
- PR descriptions

---

**Lifecycle State**
- STATE: ACTIVE
- INTRODUCED: YYYY-MM-DD
- LAST_REVIEWED: YYYY-MM-DD
- REPLACES: NONE
- REPLACED_BY: NONE

**Ownership**
- DOMAIN_OWNER: Governance / Architecture
- REVIEW_AUTHORITY: Foreman
- ACCOUNTABILITY_SCOPE: <short description>

**Effectiveness**
- DOMAIN_EFFECTIVENESS: 100
- TOTAL_FAILURES: 0
- DISTINCT_FAILURE_SIGNATURES: 0
- LAST_REVIEWED: YYYY-MM-DD

End of RESPONSIBILITY DOMAIN REGISTRY
