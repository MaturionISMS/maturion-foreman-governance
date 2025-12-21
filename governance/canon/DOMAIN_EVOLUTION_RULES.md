# DOMAIN EVOLUTION RULES

## Status
Canonical Governance Law  
Version: v1  
Authority: Governance  
Applies To: Responsibility Domain Registry

---

## 1. Purpose

These rules govern how responsibility domains evolve over time.

Domains are governance constructs, not permanent abstractions.
If domains do not evolve, they accumulate ambiguity and recreate scope explosion
at the registry level.

This document ensures:
- Domains remain causally tight
- Scope remains enforceable
- Registry complexity does not drift upward

---

## 2. Core Principles

1. Domains must preserve **single-responsibility semantics**
2. Domains must preserve **diagnostic clarity**
3. Domains must remain **mechanically enforceable**
4. Governance prefers **splitting** over expanding domains
5. Governance prefers **explicit deprecation** over silent drift

---

## 3. Domain Lifecycle States

Every responsibility domain MUST be in exactly one lifecycle state.

### Allowed States

- `ACTIVE`
- `SPLIT_REQUIRED`
- `DEPRECATED`
- `RETIRED`

Lifecycle state MUST be declared in the registry entry.

---

## 4. Triggers for Domain Review (Non-Negotiable)

A domain MUST be reviewed if any of the following occur:

### 4.1 Scope Pressure Trigger
- More than 3 PRs require exceptions or clarifications for the same domain

### 4.2 Failure Density Trigger
- Failures attributed to the domain exceed 3 distinct failure signatures
  across builds

### 4.3 Enforcement Ambiguity Trigger
- Scope-to-diff enforcement requires interpretation rather than mechanical rules

### 4.4 Domain Overload Trigger
- Domain requires more than 5 allowed top-level path prefixes

---

## 5. Domain Splitting Rules

If a trigger is met, governance MUST evaluate splitting the domain.

### Split Criteria

A domain MUST be split if:
- It contains more than one responsibility axis
- Different PRs touch disjoint subsystems under the same domain
- Failures attributed to the domain have unrelated root causes

### Split Outcome

- One existing domain is preserved
- One or more new domains are created
- Registry version is incremented
- Builders MUST migrate to new domains immediately

---

## 6. Domain Deprecation Rules

A domain MAY be deprecated if:
- Its responsibilities are absorbed into a more precise domain
- The underlying subsystem is no longer actively modified

### Deprecation Requirements

- Lifecycle state set to `DEPRECATED`
- Replacement domain(s) explicitly listed
- Deprecation date recorded
- Usage forbidden for new PRs

---

## 7. Domain Retirement Rules

A domain MUST be retired if:
- No valid PR has used the domain for 6 months
- Or the subsystem no longer exists

### Retirement Requirements

- Lifecycle state set to `RETIRED`
- Domain removed from active registry list
- Historical references preserved for audit only

---

## 8. Builder Impact (Non-Negotiable)

Builders:
- MUST NOT use deprecated or retired domains
- MUST migrate scope declarations when domains are split
- MUST halt if attempting to use an invalid domain state

CI MUST block PRs that reference:
- Unknown domains
- Deprecated domains
- Retired domains

---

## 9. Governance Change Process

All domain evolution requires:
- Governance PR
- Registry update
- Explicit lifecycle state transition
- Version increment

No silent changes permitted.

---

## 10. Precedence

These rules supersede:
- Builder intent
- Historical usage
- Convenience

Governance controls domain evolution.

---

End of DOMAIN EVOLUTION RULES
