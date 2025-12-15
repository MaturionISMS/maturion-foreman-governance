# Repository Structure Guide for Builders

## Purpose

This document defines the standard repository structure that builders must understand and navigate when executing "Build to Green" tasks.

## Overview

The Maturion Foreman App repository is organized into these key areas:

```
maturion-foreman-app/
├── .github/                    # GitHub configuration and agent definitions
├── BUILD_PHILOSOPHY.md         # Supreme authority for building
├── foreman/                    # Foreman's operational files
├── app/                        # Next.js application code
├── components/                 # React components
├── lib/                        # Shared libraries and utilities
├── tests/                      # Test suites
├── architecture/               # Architecture documents
├── evidence/                   # Evidence and reports
└── [other directories]
```

---

## Constitutional and Governance Files

### Location: Root and `.github/`

These files are **IMMUTABLE** and **PROTECTED**. Builders MUST NEVER modify these paths:

```
.github/workflows/                           # CI/CD workflows
.github/foreman/agent-contract.md            # Foreman constitution
.github/agents/foreman.agent.md              # Foreman agent definition
.github/agents/builder-agent.md              # Canonical builder contract
BUILD_PHILOSOPHY.md                          # Build Philosophy
```

### Location: `foreman/`

These files define Foreman's operations and governance:

```
foreman/
├── constitution/                            # Constitutional documents (PROTECTED)
├── governance/                              # Governance rules (PROTECTED)
│   ├── governance-supremacy-rule.md
│   ├── zero-test-debt-constitutional-rule.md
│   └── ...
├── architecture-design-checklist.md         # Architecture checklist (PROTECTED)
├── builder-specs/                           # Builder specifications (PROTECTED)
│   ├── build-to-green-rule.md
│   └── ...
└── qa/                                      # QA specifications (PROTECTED)
    ├── quality-integrity-contract.md
    └── ...
```

**If your task requires modifying ANY of these → STOP and escalate to Foreman with CS2 requirement.**

---

## Architecture Documents

### Location: `foreman/architecture/` and `architecture/`

Architecture documents define what needs to be built:

```
foreman/architecture/
└── <feature-name>-architecture.md           # Architecture specification

architecture/
├── <feature-name>-architecture.md           # Legacy location
└── <feature-name>-checklist-validation.md   # Checklist validation
```

**As a builder, you:**
- ✅ READ architecture documents to understand requirements
- ✅ FOLLOW architecture exactly
- ❌ DO NOT modify architecture documents
- ❌ DO NOT question architecture decisions

**If architecture is unclear or insufficient → Escalate to Foreman**

---

## QA and Test Suites

### Location: `tests/qa/` and `tests/`

QA test suites define acceptance criteria:

```
tests/
├── qa/                                      # QA test suites (Red QA)
│   └── <feature-name>/
│       ├── <test-file-1>.test.ts
│       ├── <test-file-2>.test.ts
│       └── ...
├── unit/                                    # Unit tests
├── integration/                             # Integration tests
└── e2e/                                     # End-to-end tests
```

**As a builder, you:**
- ✅ READ test suites to understand what to build
- ✅ RUN tests frequently during building
- ✅ MAKE tests pass by implementing code
- ❌ DO NOT modify tests (unless explicitly part of task)
- ❌ DO NOT skip tests
- ❌ DO NOT comment out failing tests

**If tests appear mis-specified → Escalate to Foreman**

---

## Source Code Locations

### Application Code: `app/`, `components/`, `lib/`

This is where you write implementation code:

```
app/                                         # Next.js app directory
├── (routes)/                                # Route groups
│   └── <route-name>/
│       ├── page.tsx
│       └── layout.tsx
└── api/                                     # API routes
    └── <endpoint>/
        └── route.ts

components/                                  # React components
├── <ComponentName>/
│   ├── <ComponentName>.tsx
│   ├── <ComponentName>.test.tsx
│   ├── index.ts
│   └── styles.module.css (if needed)
└── ui/                                      # Shared UI components

lib/                                         # Shared libraries
├── <library-name>/
│   ├── index.ts
│   ├── <module>.ts
│   └── <module>.test.ts
└── utils/                                   # Utility functions
```

**As a builder, you:**
- ✅ CREATE new files in appropriate locations
- ✅ MODIFY existing files to make tests pass
- ✅ FOLLOW existing patterns and conventions
- ✅ ORGANIZE code logically
- ❌ DO NOT create files in random locations
- ❌ DO NOT violate existing patterns

---

## Evidence Output

### Location: `foreman/evidence/builds/<task-id>/`

Store all build evidence here:

```
foreman/evidence/builds/<task-id>/
├── build-initiation.json                    # Task initiation evidence
├── validation-results.json                  # Pre-build validation
├── iterations/                              # Iteration evidence
│   ├── iteration-001.json
│   ├── iteration-002.json
│   └── ...
├── final-validation.json                    # Final validation
├── qa-results.json                          # Complete QA results
└── completion-report.md                     # Completion report
```

**Templates available at**: `foreman/evidence/templates/`

**As a builder, you:**
- ✅ CREATE evidence directory for your task
- ✅ USE provided templates
- ✅ DOCUMENT all iterations
- ✅ CAPTURE all validation results
- ✅ GENERATE completion report
- ❌ DO NOT skip evidence generation
- ❌ DO NOT create incomplete evidence

---

## Configuration Files

### Location: Root

These files configure the project:

```
package.json                                 # Node.js dependencies
tsconfig.json                                # TypeScript configuration
.eslintrc.json                               # ESLint configuration
next.config.mjs                              # Next.js configuration
tailwind.config.ts                           # Tailwind CSS configuration
jest.config.js                               # Jest test configuration
```

**As a builder, you:**
- ✅ READ configuration to understand project setup
- ⚠️ MODIFY with extreme caution (only if explicitly required)
- ❌ DO NOT break existing configuration
- ❌ DO NOT add dependencies without approval

**If configuration change is needed → Escalate to Foreman**

---

## Dependency Management

### Location: `package.json` and `node_modules/`

```
package.json                                 # Dependency manifest
package-lock.json                            # Locked dependency versions
node_modules/                                # Installed dependencies (gitignored)
```

**As a builder, you:**
- ✅ USE existing dependencies
- ⚠️ ADD new dependencies ONLY if architecture specifies them
- ⚠️ CHECK for vulnerabilities before adding (use gh-advisory-database tool)
- ❌ DO NOT add dependencies without architecture approval
- ❌ DO NOT update dependency versions without approval

**Dependency additions require**:
1. Architecture explicitly lists the dependency
2. Security check via `gh-advisory-database` tool passes
3. No governance violations

---

## Build and Output Directories

### Location: `.next/`, `dist/`, etc.

```
.next/                                       # Next.js build output (gitignored)
dist/                                        # Distribution build (gitignored)
coverage/                                    # Test coverage reports (gitignored)
.turbo/                                      # Turbo cache (gitignored)
```

**As a builder, you:**
- ✅ IGNORE these directories (they're auto-generated)
- ❌ DO NOT commit build artifacts
- ❌ DO NOT manually modify build output

---

## Navigation Patterns

### Finding Architecture for a Feature

1. Check `foreman/architecture/<feature-name>-architecture.md`
2. If not found, check `architecture/<feature-name>-architecture.md`
3. If still not found, check build instruction for explicit path

### Finding QA for a Feature

1. Check `tests/qa/<feature-name>/`
2. Check test file names mentioned in architecture
3. Check build instruction for explicit path

### Finding Component Location

Follow these conventions:

**For React components**:
```
components/<ComponentName>/<ComponentName>.tsx
```

**For pages**:
```
app/(routes)/<route-name>/page.tsx
```

**For API routes**:
```
app/api/<endpoint-name>/route.ts
```

**For utilities**:
```
lib/utils/<utility-name>.ts
```

**For services**:
```
lib/<service-name>/index.ts
```

---

## File Organization Patterns

### Component Organization

```
components/Dashboard/
├── Dashboard.tsx              # Main component
├── Dashboard.test.tsx         # Component tests
├── Dashboard.stories.tsx      # Storybook stories (if applicable)
├── index.ts                   # Exports
├── types.ts                   # Component-specific types
└── hooks/                     # Component-specific hooks
    ├── useDashboardData.ts
    └── useDashboardData.test.ts
```

### Library Organization

```
lib/user-service/
├── index.ts                   # Main exports
├── UserService.ts             # Service implementation
├── UserService.test.ts        # Service tests
├── types.ts                   # Type definitions
├── errors.ts                  # Error classes
└── utils/                     # Service utilities
    ├── validation.ts
    └── validation.test.ts
```

---

## Common Paths Reference

### Quick Reference Table

| Category | Path | Purpose |
|----------|------|---------|
| **Constitutional** | `BUILD_PHILOSOPHY.md` | Build Philosophy |
| **Constitutional** | `.github/foreman/agent-contract.md` | Foreman contract |
| **Constitutional** | `.github/agents/builder-agent.md` | Builder contract |
| **Governance** | `foreman/governance/` | Governance rules |
| **Architecture** | `foreman/architecture/` | Architecture docs |
| **Checklist** | `foreman/architecture-design-checklist.md` | Architecture checklist |
| **Builder Specs** | `foreman/builder-specs/` | Builder specifications |
| **QA Specs** | `foreman/qa/` | QA specifications |
| **Test Suites** | `tests/qa/` | QA test suites |
| **Components** | `components/` | React components |
| **Pages** | `app/(routes)/` | Next.js pages |
| **API Routes** | `app/api/` | API endpoints |
| **Libraries** | `lib/` | Shared libraries |
| **Evidence** | `foreman/evidence/builds/` | Build evidence |
| **Templates** | `foreman/evidence/templates/` | Evidence templates |

---

## .gitignore Patterns

These paths are typically ignored by git:

```
node_modules/
.next/
dist/
coverage/
.turbo/
.env.local
*.log
.DS_Store
```

**As a builder, you:**
- ✅ DO NOT commit files matching these patterns
- ✅ CHECK `.gitignore` before committing
- ❌ DO NOT force-add ignored files

---

## Path Validation

Before creating files, validate:

1. **Path is appropriate**
   - Components go in `components/`
   - Pages go in `app/(routes)/`
   - Tests go in `tests/`
   - Evidence goes in `foreman/evidence/builds/`

2. **Path is not protected**
   - Not in `.github/workflows/`
   - Not in `foreman/constitution/`
   - Not in `foreman/governance/`
   - Not constitutional files

3. **Path follows conventions**
   - CamelCase for components
   - kebab-case for routes
   - lowercase for utilities
   - Descriptive names

---

## Troubleshooting Path Issues

### "Cannot find module"

**Cause**: Import path is incorrect

**Solution**:
1. Check if file exists at expected location
2. Verify import path syntax
3. Check for typos in path
4. Verify file is exported correctly

### "File not found"

**Cause**: Trying to access non-existent file

**Solution**:
1. Verify path in build instruction
2. Check if architecture specifies correct location
3. Verify file was created in previous iteration

### "Permission denied"

**Cause**: Trying to modify protected path

**Solution**:
1. STOP immediately
2. Check if path is in protected list
3. Return GovernanceViolation error
4. Escalate to Foreman

---

## Summary for Builders

**What you need to know:**

1. ✅ **Read Only**: Constitutional and governance files
2. ✅ **Read for Requirements**: Architecture and QA files
3. ✅ **Write Implementation**: Source code in `app/`, `components/`, `lib/`
4. ✅ **Write Evidence**: Evidence in `foreman/evidence/builds/<task-id>/`
5. ❌ **Never Touch**: Protected paths
6. ❌ **Never Skip**: Evidence generation

**When in doubt:**
- Check this guide
- Check canonical builder contract
- Escalate to Foreman

---

**Version**: 1.0.0  
**Last Updated**: 2025-12-15  
**Maintained By**: Foreman

---

*END OF REPOSITORY STRUCTURE GUIDE*
