# DOMAIN STATE ENFORCEMENT RULE

## Status
Canonical Governance Rule  
Version: v1  
Authority: Governance

---

## Rule

A PR is INVALID if its Scope Declaration references a responsibility domain
whose lifecycle state is not ACTIVE.

---

## Enforcement

CI MUST block:
- PR merge
- Build-to-Green
- QA pass

If a deprecated or retired domain is used.

---

End of DOMAIN STATE ENFORCEMENT RULE
