# Enhancement Proposal: Automated Constitutional vs Procedural Classification Tool

**Status**: PARKED — NOT AUTHORIZED FOR EXECUTION  
**Source**: BL-024 Constitutional Sandbox Pattern Implementation  
**Date**: 2026-01-09  
**Category**: Governance Automation

---

## Plain Language Description

Create an automated tool that helps agents classify governance requirements as "constitutional" (Tier 1, mandatory) or "procedural" (Tier 2, flexible) by analyzing governance documents and providing clear classification with justification.

**Problem**: Agents may struggle to determine whether a specific requirement is constitutional (must follow exactly) or procedural (can optimize within bounds), especially when requirements are embedded in complex governance documents.

**Proposed Solution**: A governance document analyzer that:
- Scans governance canon, BUILD_PHILOSOPHY, and related documents
- Identifies requirements, rules, and guidance statements
- Classifies each as Tier 1 (constitutional) or Tier 2 (procedural) based on:
  - Language patterns ("MUST", "NEVER" → constitutional; "typically", "recommended" → procedural)
  - Source document (BUILD_PHILOSOPHY core rules → constitutional; process guides → procedural)
  - Governance tags/metadata if present
- Provides justification for classification with references
- Generates a queryable index of requirements with tiers

**Benefits**:
- Reduces ambiguity in agent decision-making
- Enables faster, more confident procedural adaptations
- Prevents constitutional violations due to misclassification
- Provides clear justification for tier assignments
- Supports onboarding of new agents/builders

**Example Use Case**: Builder receives task with multiple requirements. Tool analyzes each requirement, classifies tier, and explains:
- "Zero Test Debt" → Tier 1 (constitutional) — Source: BUILD_PHILOSOPHY.md § Zero Test Debt Constitutional Rule, uses "MUST", "NEVER", "mandatory"
- "Create separate PR for architecture" → Tier 2 (procedural) — Source: process guidance, uses "recommended", no constitutional reference

**Why Parked**: Enhancement requires tool development and governance integration design. Must not execute without explicit authorization. Parking enables future evaluation when governance automation capacity available.

---

**Route to**: `governance/parking-station/ENHANCEMENT_CONSTITUTIONAL_TIER_CLASSIFICATION_TOOL.md`  
**Review When**: Governance automation initiatives prioritized  
**Authority Required**: Maturion or FM

---

*This proposal is informational only and does NOT constitute authorization for execution.*
