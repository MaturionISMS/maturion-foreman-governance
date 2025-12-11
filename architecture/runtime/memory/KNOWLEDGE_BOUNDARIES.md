# Knowledge Boundaries Architecture

**Version**: 1.0  
**Status**: Constitutional (CS2 Approved Architecture)  
**Owner**: Foreman Orchestration System  
**Last Updated**: 2025-12-11  
**Security-Critical Component**

---

## 1. PURPOSE

Knowledge Boundaries define the **hard limits and safety constraints** that prevent memory leakage, cross-contamination, and unauthorized access across the Unified Memory Layer.

**Key Characteristics**:
- 🛡️ **Absolute**: Cannot be bypassed or overridden
- 🔒 **Multi-Layered**: Enforced at database, API, and query levels
- 🚨 **Monitored**: All boundary violations logged and alerted
- ⚖️ **Constitutional**: Defined by governance, not configurable

---

## 2. THE FOUR FUNDAMENTAL BOUNDARIES

### 2.1 Tenant Isolation Boundary

**Rule**: Tenant A's data MUST NEVER be visible to Tenant B.

**Applies To**: Long-Term Tenant Memory (LTM) only

**Enforcement Points**:
1. Database row-level security
2. API query filtering
3. Embodiment authentication
4. Real-time monitoring

**Violation Consequence**: CRITICAL security incident, immediate alert to Johan, memory write freeze.

---

### 2.2 Embodiment Privilege Boundary

**Rule**: Each embodiment has specific memory tier access rights.

**Privilege Matrix**:

| Embodiment | STM | WM | EM | SM | LTM |
|------------|-----|----|----|----|----- |
| **Foreman (Builder)** | ✅ R/W | ✅ R/W | ✅ R/W | ✅ R | ❌ |
| **Foreman App** | ✅ R/W | ✅ R/W | ✅ R/W | ✅ R | ❌ |
| **Local Builder** | ✅ R/W | ✅ R/W | ✅ R/W | ✅ R | ❌ |
| **ISMS Runtime AI** | ✅ R/W | ✅ R/W | ✅ R/W | ✅ R | ✅ R/W* |
| **Marketing-Maturion** | ❌ | ❌ | ❌ | ✅ R | ❌ |
| **Command-Maturion** | ✅ R | ❌ | ✅ R | ✅ R | ❌ |

*ISMS Runtime can only access LTM for its authenticated tenant.

**Enforcement**:
- API-level privilege checks before every operation
- Embodiment authentication via API keys
- Logged attempts to access unauthorized tiers

**Violation Consequence**: 403 Forbidden response, governance alert.

---

### 2.3 Guardrail Boundary

**Rule**: Memory operations MUST respect constitutional guardrails.

**Guardrail Constraints**:
- ❌ Memory cannot modify constitutional files
- ❌ Memory cannot override governance rules
- ❌ Memory cannot bypass safety checks
- ❌ Memory cannot self-modify its boundaries

**Watchdog Enforcement**:
- **Guardian**: Validates all memory writes against guardrails
- **Sentinel**: Detects drift and boundary violations
- **Arbiter**: Ensures memory integrity and constitutional compliance

**Violation Consequence**: Write blocked, IWMS incident created, Watchdog alert.

---

### 2.4 Safety Boundary

**Rule**: Memory system MUST prevent data exfiltration, corruption, and misuse.

**Safety Constraints**:
- ❌ No secrets in memory (use secrets management)
- ❌ No unencrypted sensitive data (encrypt at rest)
- ❌ No cross-embodiment STM sharing
- ❌ No tenant data in global memory (SM, EM)
- ❌ No unbounded memory growth (pruning required)

**Enforcement**:
- Pre-write validation scans for secrets
- Encryption checks for LTM
- Size limits for STM and WM
- Automatic pruning for expired memory

**Violation Consequence**: Write rejected, content redacted, governance log entry.

---

## 3. BOUNDARY ENFORCEMENT ARCHITECTURE

### 3.1 Multi-Layer Enforcement Model

```
┌─────────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Pre-Request Validation                                  │ │
│  │ • Embodiment authentication                             │ │
│  │ • Tenant verification                                   │ │
│  │ • Query parameter validation                            │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────────────────────────┐
│                   API LAYER                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Boundary Enforcement Engine                             │ │
│  │ • Privilege checks                                      │ │
│  │ • Tenant isolation validation                           │ │
│  │ • Guardrail compliance checks                           │ │
│  │ • Safety filters                                        │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE LAYER                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Row-Level Security (RLS)                                │ │
│  │ • Tenant isolation at DB level                          │ │
│  │ • Query filters enforced by database                    │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────────────────────────┐
│                   MONITORING LAYER                           │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Watchdog System                                         │ │
│  │ • Guardian: Output validation                           │ │
│  │ • Sentinel: Drift detection                             │ │
│  │ • Arbiter: Memory integrity                             │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Boundary Enforcement Flow

**For Every Memory Operation**:

```typescript
async function enforceKnowledgeBoundaries(
  operation: MemoryOperation,
  context: OperationContext
): Promise<BoundaryEnforcementResult> {
  
  // 1. Embodiment Privilege Check
  if (!hasEmbodimentPrivilege(context.embodiment, operation.tier)) {
    return {
      allowed: false,
      reason: 'Embodiment privilege violation',
      severity: 'high',
      action: 'block_and_log'
    }
  }
  
  // 2. Tenant Isolation Check (for LTM)
  if (operation.tier === 'LTM') {
    if (!verifyTenantIsolation(operation.tenantId, context.authenticatedTenantId)) {
      return {
        allowed: false,
        reason: 'Tenant isolation violation',
        severity: 'critical',
        action: 'block_alert_freeze'
      }
    }
  }
  
  // 3. Guardrail Compliance Check
  if (!isGuardrailCompliant(operation)) {
    return {
      allowed: false,
      reason: 'Guardrail violation',
      severity: 'critical',
      action: 'block_alert_incident'
    }
  }
  
  // 4. Safety Boundary Check
  const safetyCheck = await validateSafetyBoundary(operation)
  if (!safetyCheck.passed) {
    return {
      allowed: false,
      reason: safetyCheck.reason,
      severity: 'medium',
      action: 'reject_and_log'
    }
  }
  
  // 5. All checks passed
  return {
    allowed: true,
    checksPerformed: [
      'embodiment_privilege',
      'tenant_isolation',
      'guardrail_compliance',
      'safety_boundary'
    ]
  }
}
```

---

## 4. TENANT ISOLATION ENFORCEMENT

### 4.1 Database-Level Isolation (Supabase RLS)

**Row-Level Security Policy**:
```sql
-- LTM Table Policy
CREATE POLICY "Tenant isolation for LTM"
ON long_term_memory
FOR ALL
USING (
  -- User must be authenticated
  auth.uid() IS NOT NULL
  AND
  -- Tenant ID must match authenticated user's tenant
  tenant_id = current_setting('app.current_tenant_id')
  AND
  -- Only ISMS Runtime can write
  (
    pg_has_role(current_user, 'isms_runtime_role', 'member')
    OR operation = 'SELECT'
  )
);
```

### 4.2 API-Level Isolation

**Tenant Verification Middleware**:
```typescript
async function verifyTenantIsolation(
  requestedTenantId: string,
  authenticatedTenantId: string
): Promise<boolean> {
  
  // 1. Verify tenant IDs match
  if (requestedTenantId !== authenticatedTenantId) {
    await logSecurityViolation({
      type: 'tenant_isolation_breach_attempt',
      requestedTenantId,
      authenticatedTenantId,
      timestamp: new Date(),
      severity: 'critical'
    })
    
    await alertJohan({
      incident: 'Tenant isolation breach attempt',
      details: { requestedTenantId, authenticatedTenantId }
    })
    
    return false
  }
  
  // 2. Log successful verification
  await logTenantAccess({
    tenantId: authenticatedTenantId,
    timestamp: new Date(),
    action: 'tenant_verified'
  })
  
  return true
}
```

### 4.3 Query-Time Isolation

**Query Rewriting**:
```typescript
function rewriteQueryForTenantIsolation(
  query: MemoryQuery,
  authenticatedTenantId: string
): MemoryQuery {
  
  // For LTM queries, always inject tenant filter
  if (query.tier === 'LTM') {
    return {
      ...query,
      filters: {
        ...query.filters,
        tenantId: authenticatedTenantId  // Force tenant filter
      }
    }
  }
  
  return query
}
```

---

## 5. EMBODIMENT PRIVILEGE ENFORCEMENT

### 5.1 Privilege Verification

```typescript
interface EmbodimentPrivileges {
  read: MemoryTier[]
  write: MemoryTier[]
}

const EMBODIMENT_PRIVILEGES: Record<EmbodimentType, EmbodimentPrivileges> = {
  'foreman': {
    read: ['STM', 'WM', 'EM', 'SM'],
    write: ['STM', 'WM', 'EM']
  },
  'isms_runtime': {
    read: ['STM', 'WM', 'EM', 'SM', 'LTM'],
    write: ['STM', 'WM', 'EM', 'LTM']
  },
  'marketing_maturion': {
    read: ['SM'],
    write: []
  },
  // ... other embodiments
}

function hasEmbodimentPrivilege(
  embodiment: EmbodimentType,
  tier: MemoryTier,
  operation: 'read' | 'write'
): boolean {
  
  const privileges = EMBODIMENT_PRIVILEGES[embodiment]
  
  if (!privileges) {
    return false
  }
  
  const allowedTiers = operation === 'read' ? privileges.read : privileges.write
  
  return allowedTiers.includes(tier)
}
```

### 5.2 API Authentication

```typescript
async function authenticateEmbodiment(
  apiKey: string
): Promise<EmbodimentContext | null> {
  
  // Verify API key
  const embodiment = await verifyApiKey(apiKey)
  
  if (!embodiment) {
    return null
  }
  
  // Return embodiment context
  return {
    embodimentType: embodiment.type,
    tenantId: embodiment.tenantId,  // For ISMS Runtime only
    privileges: EMBODIMENT_PRIVILEGES[embodiment.type]
  }
}
```

---

## 6. GUARDRAIL BOUNDARY ENFORCEMENT

### 6.1 Constitutional File Protection

**Rule**: Memory system CANNOT modify constitutional files.

**Protected Paths**:
- `.github/workflows/`
- `.github/foreman/agent-contract.md`
- `/BUILD_PHILOSOPHY.md`
- `/maturion-philosophy-tree.md`
- `/foreman/constitution/`
- `/docs/governance/`

**Enforcement**:
```typescript
function isGuardrailCompliant(operation: MemoryOperation): boolean {
  
  // Check if operation attempts to modify constitutional files
  if (operation.type === 'write' && operation.target) {
    const protectedPaths = loadProtectedPaths()
    
    for (const path of protectedPaths) {
      if (operation.target.startsWith(path)) {
        logGuardrailViolation({
          operation,
          violationType: 'constitutional_file_modification',
          severity: 'critical'
        })
        
        return false
      }
    }
  }
  
  // Check if operation attempts to modify memory boundaries
  if (operation.type === 'modify_boundary') {
    logGuardrailViolation({
      operation,
      violationType: 'boundary_modification_attempt',
      severity: 'critical'
    })
    
    return false
  }
  
  return true
}
```

### 6.2 Watchdog Integration

**Guardian Validation**:
```typescript
async function guardianValidateMemoryWrite(
  operation: MemoryWriteOperation
): Promise<GuardianResult> {
  
  // 1. Check for guardrail violations
  if (!isGuardrailCompliant(operation)) {
    return {
      approved: false,
      reason: 'Guardrail violation detected',
      action: 'block_and_alert'
    }
  }
  
  // 2. Check for prohibited content
  const contentCheck = await scanForProhibitedContent(operation.content)
  if (!contentCheck.clean) {
    return {
      approved: false,
      reason: `Prohibited content: ${contentCheck.issues.join(', ')}`,
      action: 'reject_and_redact'
    }
  }
  
  // 3. Approve write
  return {
    approved: true,
    validationsPassed: ['guardrail_compliance', 'content_scan']
  }
}
```

---

## 7. SAFETY BOUNDARY ENFORCEMENT

### 7.1 Secrets Detection

**Rule**: Memory MUST NOT contain secrets.

**Detection**:
```typescript
async function scanForSecrets(content: any): Promise<SecretScanResult> {
  
  const secretPatterns = [
    /api[_-]?key[s]?[\s:='"]+[a-zA-Z0-9_\-]{20,}/gi,
    /password[\s:='"]+[^\s'"]{8,}/gi,
    /token[\s:='"]+[a-zA-Z0-9_\-\.]{20,}/gi,
    /secret[\s:='"]+[a-zA-Z0-9_\-]{16,}/gi,
    /ghp_[a-zA-Z0-9]{36}/gi,  // GitHub tokens
    /sk-[a-zA-Z0-9]{48}/gi     // OpenAI keys
  ]
  
  const contentStr = JSON.stringify(content)
  const detectedSecrets: string[] = []
  
  for (const pattern of secretPatterns) {
    const matches = contentStr.match(pattern)
    if (matches) {
      detectedSecrets.push(...matches)
    }
  }
  
  if (detectedSecrets.length > 0) {
    return {
      clean: false,
      secretsDetected: detectedSecrets.length,
      action: 'reject_write'
    }
  }
  
  return { clean: true }
}
```

### 7.2 Encryption Enforcement (LTM)

**Rule**: LTM MUST be encrypted at rest.

**Verification**:
```typescript
async function enforceEncryption(
  operation: MemoryWriteOperation
): Promise<EncryptionResult> {
  
  if (operation.tier === 'LTM') {
    // Verify encryption is enabled
    if (!operation.metadata?.encrypted) {
      return {
        valid: false,
        reason: 'LTM must be encrypted at rest',
        action: 'encrypt_before_write'
      }
    }
    
    // Verify encryption key is valid
    const keyValid = await verifyEncryptionKey(operation.tenantId)
    if (!keyValid) {
      return {
        valid: false,
        reason: 'Invalid or missing encryption key',
        action: 'block_write'
      }
    }
  }
  
  return { valid: true }
}
```

### 7.3 Size Limits

**Rule**: Prevent unbounded memory growth.

**Limits**:
- **STM**: 1000 entries per session (auto-prune low priority)
- **WM**: 10,000 entries per embodiment (auto-expire after TTL)
- **EM**: Unlimited (immutable, never deleted)
- **SM**: Unlimited (curated)
- **LTM**: 100,000 entries per tenant (archive old entries)

**Enforcement**:
```typescript
async function enforceSizeLimits(
  tier: MemoryTier,
  currentSize: number
): Promise<SizeLimitResult> {
  
  const limits = {
    'STM': 1000,
    'WM': 10000,
    'LTM': 100000
  }
  
  const limit = limits[tier]
  
  if (limit && currentSize >= limit) {
    // Trigger pruning
    await triggerMemoryPruning(tier)
    
    return {
      withinLimit: false,
      action: 'pruning_triggered',
      currentSize,
      limit
    }
  }
  
  return { withinLimit: true }
}
```

---

## 8. VIOLATION MONITORING & RESPONSE

### 8.1 Violation Types & Severity

| Violation Type | Severity | Response |
|----------------|----------|----------|
| **Tenant Isolation Breach** | CRITICAL | Block + Alert Johan + Freeze writes |
| **Embodiment Privilege Violation** | HIGH | Block + Log + Governance alert |
| **Guardrail Violation** | CRITICAL | Block + IWMS incident + Watchdog alert |
| **Secret Detection** | HIGH | Reject + Redact + Log |
| **Size Limit Exceeded** | MEDIUM | Auto-prune + Log |
| **Encryption Missing (LTM)** | HIGH | Block + Encrypt first + Log |

### 8.2 Violation Logging

```typescript
interface BoundaryViolation {
  id: string
  type: ViolationType
  severity: 'low' | 'medium' | 'high' | 'critical'
  timestamp: Date
  embodiment: EmbodimentType
  operation: MemoryOperation
  reason: string
  blocked: boolean
  actionTaken: string
  alertSent: boolean
}

async function logBoundaryViolation(violation: BoundaryViolation) {
  
  // 1. Write to Governance Memory (immutable audit trail)
  await storeMemory({
    tier: 'Governance Memory',
    category: 'boundary_violation',
    content: violation,
    metadata: {
      immutable: true,
      constitutionalEvent: true
    }
  })
  
  // 2. Alert based on severity
  if (violation.severity === 'critical') {
    await alertJohan(violation)
    await createIWMSIncident(violation)
    await triggerWatchdogElevation()
  }
  
  // 3. Log to external monitoring
  await logToMonitoring(violation)
}
```

### 8.3 Incident Response

**For Critical Violations**:
1. **Immediate**: Block operation
2. **Within 1 minute**: Alert Johan via priority channel
3. **Within 5 minutes**: Create IWMS Security Incident
4. **Within 10 minutes**: Initiate memory write freeze (if tenant isolation breach)
5. **Within 1 hour**: Root cause analysis
6. **Within 24 hours**: Remediation plan + constitutional review

---

## 9. TESTING STRATEGY

### 9.1 Boundary Violation Tests (CRITICAL)

**Test Cases**:
- ✅ Tenant A cannot read Tenant B's LTM (MUST FAIL)
- ✅ Foreman cannot write to LTM (MUST FAIL)
- ✅ Marketing-Maturion cannot access STM (MUST FAIL)
- ✅ Memory system cannot modify constitutional files (MUST FAIL)
- ✅ Secrets are detected and rejected (MUST BLOCK)
- ✅ LTM without encryption is rejected (MUST BLOCK)
- ✅ All violations are logged to Governance Memory
- ✅ Critical violations trigger alerts

### 9.2 Integration Tests

**Test Cases**:
- ✅ Valid operations succeed
- ✅ Invalid operations blocked
- ✅ Watchdog integration works
- ✅ Multi-layer enforcement consistent

### 9.3 Penetration Tests

**Test Cases**:
- ✅ Attempt cross-tenant query injection
- ✅ Attempt embodiment privilege escalation
- ✅ Attempt guardrail bypass
- ✅ Attempt secret injection
- ✅ All attacks detected and blocked

---

## 10. OPERATIONAL METRICS

### 10.1 Key Metrics

- **Boundary Violation Count**: Total violations per day (target: 0)
- **Violation Severity Distribution**: Critical/High/Medium/Low
- **Response Time**: Time from violation to alert (target: < 1 minute for critical)
- **False Positive Rate**: Valid operations incorrectly blocked (target: < 0.1%)

### 10.2 Health Indicators

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| **Tenant Isolation Violations** | 0 | 0 | > 0 (IMMEDIATE ESCALATION) |
| **Guardrail Violations** | 0 | 0 | > 0 (IMMEDIATE ESCALATION) |
| **Privilege Violations** | < 5/day | 5-20/day | > 20/day |
| **Secret Detections** | 0 | 0-5/week | > 5/week |

---

## 11. REFERENCES

**Parent Architecture**:
- `/architecture/runtime/memory/UML_OVERVIEW.md`

**Related Documents**:
- `/maturion/maturion-memory-architecture.md` (Memory boundaries definition)
- `/maturion/maturion-tenant-isolation-standard.md` (Tenant isolation rules)
- `/maturion/guardrails-and-safety-charter.md` (Guardrail definitions)
- `/foreman/governance/memory-rules.md` (Knowledge boundary rules)

**Constitutional References**:
- CS1: Immutability (Governance memory for violations)
- CS5: Security (Tenant isolation, encryption, secrets management)
- CS6: Quality (Comprehensive boundary testing)
- GSR: Governance Supremacy (Boundaries override all operations)

---

**Status**: ✅ Architecture Complete  
**Version**: 1.0  
**Next Step**: Implement boundary enforcement in `/lib/memory/boundaries.ts`
