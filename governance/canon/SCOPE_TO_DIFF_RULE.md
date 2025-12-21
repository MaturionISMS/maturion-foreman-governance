# SCOPE TO DIFF GOVERNANCE RULE

## Status
Canonical Governance Rule  
Version: v1  
Authority: Governance  
Applies To: All PRs, All Repositories

---

## 1. Purpose

This rule enforces alignment between a PR’s declared scope
and the files actually modified in the PR.

Scope declarations without enforcement are informational only.
This rule makes scope binding enforceable.

---

## 2. Core Rule

A PR MUST NOT modify files outside the declared responsibility domain.

If a file is modified that is not reasonably attributable
to the declared responsibility domain, the PR is invalid.

---

## 3. Responsibility → File Mapping Principle

Each responsibility domain implicitly constrains
which directories and file types may be touched.

Examples:

- Database lifecycle → schema, migrations, db config
- Email delivery → mailers, templates, SMTP config
- CI infrastructure → `.github/workflows/**`
- Logging / audit → logging modules only

Cross-domain changes are forbidden.

---

## 4. Enforcement Standard

Enforcement is intentionally conservative.

If a file’s inclusion is ambiguous:
- The PR is invalid
- The Builder must narrow scope or split the PR

---

## 5. Precedence

This rule supersedes:
- Builder intent
- PR descriptions
- Commit messages

Only declared scope and actual diff are authoritative.

---

 - name: Enforce domain lifecycle state
        run: |
          DOMAIN=$(grep "RESPONSIBILITY_DOMAIN:" governance/scope-declaration.md | cut -d':' -f2 | xargs)

          REGISTRY="governance/canon/RESPONSIBILITY_DOMAIN_REGISTRY.md"

          STATE=$(awk "/### DOMAIN: $DOMAIN/{flag=1} flag && /STATE:/{print \$2; exit}" "$REGISTRY")

          if [ "$STATE" != "ACTIVE" ]; then
            echo "❌ GOVERNANCE BLOCK: Domain '$DOMAIN' is in state '$STATE'. Only ACTIVE domains may be used."
            exit 1
          fi

          echo "✅ Domain lifecycle state ACTIVE"

End of SCOPE TO DIFF GOVERNANCE RULE
