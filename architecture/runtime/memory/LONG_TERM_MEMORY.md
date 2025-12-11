# Long-Term Tenant Memory (LTM) Architecture

**Version**: 1.0  
**Status**: Constitutional (CS2 Approved Architecture)  
**Owner**: Foreman Orchestration System  
**Last Updated**: 2025-12-11  
**Tier**: Tier 5 Memory

---

## 1. PURPOSE

Long-Term Tenant Memory (LTM) stores **tenant-specific knowledge** for ISMS operations. It enables personalized intelligence and contextual awareness for each organization using the Maturion ISMS platform.

**Key Characteristics**:
- 🏢 **Tenant-Specific**: Isolated per organization
- 🔒 **MUST NEVER LEAK**: Absolute tenant isolation enforced
- ⏳ **Permanent**: Retained indefinitely
- 🚫 **No Cross-Tenant**: Cannot be used to train global models
- ✅ **ISMS Runtime Only**: Only ISMS Runtime AI can write LTM

---

## 2. ABSOLUTE RULES

### 2.1 The Three Immutable Laws of LTM

#### **Law 1: Tenant Isolation is Absolute**
```
LTM for Organization A MUST NEVER be visible to Organization B.
NO EXCEPTIONS. EVER.
```

**Enforcement**:
- Database row-level security
- API-level filtering
- Query-time validation
- Embodiment privilege checks

**Violation Response**:
- Immediate alert to Johan
- IWMS Security Incident (severity: CRITICAL)
- Temporary memory write freeze
- Full audit of breach

#### **Law 2: No Global Contamination**
```
Tenant-specific data MUST NEVER enter Semantic Memory, Episodic Memory,
or any global knowledge base.
```

**Enforcement**:
- Pre-write validation checks for LTM → SM/EM writes
- Watchdog Guardian monitors all cross-tier writes
- ARC review required for any SM updates

**Violation Response**:
- Write blocked immediately
- Governance alert
- Incident investigation

#### **Law 3: ISMS Runtime Exclusive**
```
Only ISMS Runtime AI may write to LTM.
Foreman, Local Builder, and other embodiments have READ-ONLY access
(and only to their authorized tenant).
```

**Embodiment Privileges**:
| Embodiment | Read LTM | Write LTM |
|------------|----------|-----------|
| **ISMS Runtime AI** | ✅ (own tenant only) | ✅ (own tenant only) |
| **Foreman** | ❌ | ❌ |
| **Local Builder** | ❌ | ❌ |
| **Marketing-Maturion** | ❌ | ❌ |
| **Command-Maturion** | ❌ | ❌ |

---

## 3. USE CASES

### 3.1 Tenant-Specific Threat Intelligence

**Example**: Organization X has experienced phishing attempts targeting their finance department.

**LTM Entry**:
```typescript
{
  tier: 'LTM',
  tenantId: 'org_x',
  category: 'threat_history',
  content: {
    threatType: 'phishing',
    targetDepartment: 'finance',
    frequency: 'monthly',
    lastOccurrence: '2025-11-15',
    mitigationApplied: 'MFA + security awareness training'
  }
}
```

**Usage**: When ISMS Runtime analyzes new threats for Org X, it recalls this LTM to provide contextual risk scoring.

### 3.2 Control Implementation Status

**Example**: Organization Y has implemented ISO 27001 controls but not NIST CSF.

**LTM Entry**:
```typescript
{
  tier: 'LTM',
  tenantId: 'org_y',
  category: 'control_status',
  content: {
    frameworksImplemented: ['ISO27001'],
    controlsActive: ['A.5.1', 'A.8.2', 'A.12.6'],
    maturityLevel: 3,
    lastAudit: '2025-10-01'
  }
}
```

**Usage**: ISMS Runtime provides control recommendations based on Org Y's current posture.

### 3.3 Organizational Structure

**Example**: Organization Z has 5 departments with different risk profiles.

**LTM Entry**:
```typescript
{
  tier: 'LTM',
  tenantId: 'org_z',
  category: 'org_structure',
  content: {
    departments: [
      { name: 'Finance', riskLevel: 'high', headcount: 50 },
      { name: 'IT', riskLevel: 'critical', headcount: 30 },
      { name: 'HR', riskLevel: 'medium', headcount: 20 },
      { name: 'Operations', riskLevel: 'low', headcount: 100 },
      { name: 'Marketing', riskLevel: 'low', headcount: 25 }
    ]
  }
}
```

**Usage**: ISMS Runtime tailors risk assessments to each department's profile.

### 3.4 Historical Incidents

**Example**: Organization A had a ransomware incident in 2024.

**LTM Entry**:
```typescript
{
  tier: 'LTM',
  tenantId: 'org_a',
  category: 'incident_history',
  content: {
    incidentType: 'ransomware',
    date: '2024-06-15',
    impact: 'high',
    recovery: '3 days downtime',
    lessonsLearned: ['Improved backup strategy', 'Enhanced endpoint protection']
  }
}
```

**Usage**: ISMS Runtime references this when evaluating ransomware risks for Org A.

### 3.5 Decision Patterns

**Example**: Organization B consistently prioritizes compliance over cost optimization.

**LTM Entry**:
```typescript
{
  tier: 'LTM',
  tenantId: 'org_b',
  category: 'decision_patterns',
  content: {
    priorities: ['compliance', 'risk_reduction', 'cost_optimization'],
    decisionHistory: [
      { decision: 'Implement SOC 2', rationale: 'Client requirement', date: '2025-01-10' },
      { decision: 'Upgrade firewalls', rationale: 'Regulatory compliance', date: '2025-03-05' }
    ]
  }
}
```

**Usage**: ISMS Runtime suggests solutions aligned with Org B's priorities.

---

## 4. DATA MODEL

### 4.1 LTM Entry Schema

```typescript
interface LongTermMemoryEntry {
  id: string                      // UUID
  tier: 'LTM'
  category: LTMCategory           // See below
  tenantId: string                // Organization identifier (REQUIRED)
  organisationId: string          // Same as tenantId (for compatibility)
  actor: ActorType                // Always 'isms_runtime'
  embodiment: 'isms_runtime'      // Only ISMS Runtime writes LTM
  content: LTMContent             // See below
  metadata: {
    createdAt: Date
    updatedAt: Date
    version: number               // Versioned for audit
    encrypted: boolean            // Encryption status
    isolationBoundary: 'tenant'   // Always 'tenant'
    retentionPolicy: string       // Retention rules (e.g., 'indefinite', 'GDPR-compliant')
    accessLog: AccessLogEntry[]   // Who accessed this LTM
  }
  tags?: string[]
}

type LTMCategory =
  | 'threat_history'              // Past threats experienced
  | 'vulnerability_history'       // Known vulnerabilities
  | 'control_status'              // Implemented controls
  | 'org_structure'               // Organizational details
  | 'incident_history'            // Past incidents
  | 'decision_patterns'           // Historical decisions
  | 'maturity_level'              // Organizational maturity
  | 'regulatory_context'          // Applicable regulations
  | 'industry_profile'            // Industry-specific risks
  | 'asset_inventory'             // Key assets and their risks

interface LTMContent {
  type: string                    // Specific content type
  data: any                       // Content payload (JSON)
  context?: Record<string, any>   // Additional context
  sensitivity: 'low' | 'medium' | 'high' | 'critical'
}

interface AccessLogEntry {
  accessedAt: Date
  accessedBy: string              // Embodiment or user ID
  accessType: 'read' | 'write' | 'query'
  purpose: string                 // Why was it accessed
  tenantVerified: boolean         // Tenant isolation check passed
}
```

### 4.2 LTM Categories (Detailed)

#### **Threat History**
Past threats experienced by the tenant.

**Example**:
```typescript
{
  category: 'threat_history',
  content: {
    type: 'phishing_campaign',
    data: {
      campaignId: 'phishing_q3_2025',
      targetsAffected: 25,
      successRate: 0.12,
      mitigationApplied: true
    },
    sensitivity: 'high'
  }
}
```

#### **Vulnerability History**
Known vulnerabilities in tenant's systems.

**Example**:
```typescript
{
  category: 'vulnerability_history',
  content: {
    type: 'software_vulnerability',
    data: {
      cve: 'CVE-2025-12345',
      affectedSystems: ['web_server_01', 'api_gateway'],
      patchedDate: '2025-11-20',
      residualRisk: 'low'
    },
    sensitivity: 'high'
  }
}
```

#### **Control Status**
Current state of implemented controls.

**Example**:
```typescript
{
  category: 'control_status',
  content: {
    type: 'iso27001_controls',
    data: {
      controlsImplemented: 45,
      controlsPlanned: 12,
      complianceScore: 0.78,
      lastAudit: '2025-10-01'
    },
    sensitivity: 'medium'
  }
}
```

---

## 5. LIFECYCLE

### 5.1 Creation

**Who Creates LTM**: Only ISMS Runtime AI

**When**:
- After risk assessment completed
- After incident resolution
- After control implementation
- After organizational audit
- After decision recorded

**Creation Flow**:
```
ISMS Runtime Analysis → Tenant Context Identified → LTM Entry Created → Encrypted & Stored
```

**API Call**:
```typescript
await storeMemory({
  tier: 'LTM',
  category: 'threat_history',
  tenantId: currentTenantId,
  actor: 'isms_runtime',
  embodiment: 'isms_runtime',
  content: {
    type: 'threat_event',
    data: threatDetails,
    sensitivity: 'high'
  },
  metadata: {
    encrypted: true,
    isolationBoundary: 'tenant',
    retentionPolicy: 'indefinite'
  }
})
```

### 5.2 Retrieval

**Who Retrieves LTM**: ISMS Runtime AI only (for its authorized tenant)

**When**:
- During risk analysis
- During threat correlation
- During control recommendations
- During compliance reporting

**Retrieval Flow**:
```
Query Request → Tenant Verification → Privilege Check → Retrieve LTM → Return Filtered Results
```

**API Call**:
```typescript
const ltmEntries = await recallMemory({
  tier: 'LTM',
  tenantId: currentTenantId,
  categories: ['threat_history', 'vulnerability_history'],
  embodiment: 'isms_runtime'  // Enforced
})
```

### 5.3 Update

**Rule**: LTM entries are versioned. Updates create new versions, old versions archived.

**Update Flow**:
```
Update Request → Version Increment → Archive Previous Version → Store New Version → Log Update
```

**Example**:
```typescript
await updateMemory({
  tier: 'LTM',
  entryId: 'ltm_uuid',
  tenantId: currentTenantId,
  newContent: updatedData,
  updateReason: 'Revised threat assessment'
})
// Previous version stored as ltm_uuid_v1, new version is ltm_uuid_v2
```

### 5.4 Deletion (Rare)

**When LTM is Deleted**:
1. **Tenant Request**: Organization requests data deletion
2. **Regulatory Requirement**: GDPR right to erasure
3. **ARC-Approved Governance Action**: Approved redaction

**Deletion Flow**:
```
Deletion Request → ARC Review → Johan Approval → Archive to Governance Log → Delete LTM
```

**Retention**: Deletion events logged in Governance Memory (immutable audit trail).

---

## 6. TENANT ISOLATION (CRITICAL)

### 6.1 Database-Level Isolation

**Row-Level Security (RLS)** when using Supabase:
```sql
CREATE POLICY "Tenant isolation for LTM"
ON long_term_memory
FOR SELECT
USING (
  tenant_id = current_setting('app.current_tenant_id')
  AND embodiment = 'isms_runtime'
);
```

**File-Based Isolation** (current):
```
/memory/ltm/{tenantId}/memory.json
```

### 6.2 API-Level Isolation

**Enforcement**:
```typescript
async function recallLTM(query: LTMQuery) {
  // 1. Verify tenant ID from authenticated session
  const sessionTenantId = getAuthenticatedTenantId()
  
  // 2. Verify embodiment is ISMS Runtime
  if (query.embodiment !== 'isms_runtime') {
    throw new ForbiddenError('Only ISMS Runtime can access LTM')
  }
  
  // 3. Enforce tenant match
  if (query.tenantId !== sessionTenantId) {
    throw new ForbiddenError('Tenant ID mismatch')
  }
  
  // 4. Log access for audit
  await logLTMAccess(query.tenantId, 'read', query.embodiment)
  
  // 5. Query with tenant filter
  return await queryLTM({ ...query, tenantId: sessionTenantId })
}
```

### 6.3 Query-Time Validation

**Every LTM Query**:
1. ✅ Tenant ID verified
2. ✅ Embodiment verified
3. ✅ Privilege checked
4. ✅ Access logged
5. ✅ Results filtered

**Violation Detection**:
- Attempted cross-tenant query → **BLOCKED + ALERT**
- Unauthorized embodiment access → **BLOCKED + ALERT**
- Missing tenant ID → **BLOCKED + ERROR**

---

## 7. ENCRYPTION & SECURITY

### 7.1 Encryption at Rest

**Rule**: All LTM is encrypted at rest.

**Implementation**:
- AES-256 encryption
- Encryption keys managed via secrets management (AWS KMS, Azure Key Vault, etc.)
- Keys rotated periodically

**Key Management**:
```
Master Key (per tenant) → Derived Encryption Key → Encrypt LTM
```

### 7.2 Encryption in Transit

**Rule**: All LTM API calls use HTTPS/TLS 1.3.

**Enforcement**:
- No plain HTTP for LTM endpoints
- Certificate verification required
- HSTS headers enforced

### 7.3 Access Logging

**Rule**: Every LTM access is logged.

**Log Entry**:
```typescript
{
  timestamp: '2025-12-11T10:00:00Z',
  tenantId: 'org_x',
  embodiment: 'isms_runtime',
  accessType: 'read',
  category: 'threat_history',
  purpose: 'Risk analysis',
  userAuthenticated: true
}
```

**Retention**: Access logs retained for 1 year (compliance).

---

## 8. INTEGRATION POINTS

### 8.1 ISMS Runtime AI

**When**: ISMS Runtime performs risk analysis for a tenant

**LTM Usage**:
1. Authenticate tenant
2. Load tenant-specific threat history
3. Load vulnerability history
4. Load control status
5. Perform risk analysis with context
6. Store analysis results in LTM

**Code Example**:
```typescript
// In ISMS Runtime risk analysis engine
const tenantContext = await recallMemory({
  tier: 'LTM',
  tenantId: currentTenantId,
  categories: ['threat_history', 'vulnerability_history', 'control_status']
})

// Perform contextualized risk analysis
const riskScore = calculateRisk({
  newThreat: incomingThreat,
  context: tenantContext
})

// Store result in LTM
await storeMemory({
  tier: 'LTM',
  tenantId: currentTenantId,
  category: 'threat_history',
  content: { threat: incomingThreat, riskScore, analysisDate: new Date() }
})
```

### 8.2 Foreman (Read-Only, Authorized Cases)

**When**: Foreman needs organizational context (rare, requires authorization)

**LTM Usage**:
- Foreman CANNOT write LTM
- Foreman CAN read LTM if authorized by tenant admin
- Used for ISMS-related build tasks only

**Example**: Building ISMS dashboard showing tenant-specific data

**Authorization Flow**:
```
Tenant Admin Grants Permission → Foreman Requests LTM Access → Token Issued (scoped) → Read LTM
```

### 8.3 No Other Embodiments

**Rule**: Local Builder, Marketing-Maturion, Command-Maturion have NO access to LTM.

---

## 9. VERSIONING & AUDIT

### 9.1 Immutable Audit Trail

**Rule**: All LTM changes are versioned and auditable.

**Version History**:
```typescript
{
  entryId: 'ltm_uuid',
  versions: [
    { version: 1, createdAt: '2025-01-01', content: {...}, author: 'isms_runtime' },
    { version: 2, createdAt: '2025-06-15', content: {...}, author: 'isms_runtime' },
    { version: 3, createdAt: '2025-12-11', content: {...}, author: 'isms_runtime' }
  ],
  currentVersion: 3
}
```

**Access to Old Versions**:
- Tenant admins can view version history
- Useful for compliance audits
- Cannot be deleted (only current version can be marked deleted)

### 9.2 Governance Memory Integration

**Rule**: All LTM writes are logged to Governance Memory.

**Governance Log Entry**:
```typescript
{
  tier: 'Governance Memory',
  event: 'ltm_write',
  tenantId: 'org_x',
  category: 'threat_history',
  timestamp: '2025-12-11T10:00:00Z',
  actor: 'isms_runtime',
  action: 'created',
  entryId: 'ltm_uuid'
}
```

---

## 10. TESTING STRATEGY

### 10.1 Tenant Isolation Tests (CRITICAL)

**Test Cases**:
- ✅ Tenant A cannot read Tenant B's LTM
- ✅ Tenant A cannot write to Tenant B's LTM
- ✅ Tenant A cannot query across tenants
- ✅ Cross-tenant queries are blocked and logged

### 10.2 Embodiment Privilege Tests

**Test Cases**:
- ✅ ISMS Runtime can write LTM
- ✅ Foreman CANNOT write LTM
- ✅ Local Builder CANNOT read LTM
- ✅ Marketing-Maturion CANNOT access LTM

### 10.3 Encryption Tests

**Test Cases**:
- ✅ LTM is encrypted at rest
- ✅ Encryption keys are rotated
- ✅ Decryption requires valid keys
- ✅ Access logs are created

### 10.4 Compliance Tests

**Test Cases**:
- ✅ GDPR deletion requests honored
- ✅ Access logs retained for 1 year
- ✅ Version history maintained
- ✅ Audit trail immutable

---

## 11. OPERATIONAL METRICS

### 11.1 Key Metrics

- **LTM Entry Count per Tenant**: Total LTM entries
- **LTM Growth Rate**: Entries added per month
- **Access Frequency**: Queries per tenant per day
- **Tenant Isolation Violations**: Count (should be ZERO)

### 11.2 Health Indicators

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| **Isolation Violations** | 0 | 0 | > 0 (IMMEDIATE ALERT) |
| **Encryption Failures** | 0 | > 0 | > 5 |
| **Unauthorized Access Attempts** | < 5/day | 5-20/day | > 20/day |
| **Query Latency** | < 50ms | 50-200ms | > 200ms |

---

## 12. FUTURE ENHANCEMENTS

### 12.1 Advanced Tenant Analytics

**Benefit**: Provide tenant-specific insights without cross-pollination

**Implementation**:
- Per-tenant dashboards
- Maturity trends
- Risk evolution graphs

### 12.2 Federated LTM

**Benefit**: Multi-region LTM storage for global organizations

**Implementation**:
- LTM replicated across regions
- Tenant data sovereignty compliance
- Regional encryption keys

### 12.3 LTM Recommendations Engine

**Benefit**: AI-powered recommendations based on LTM

**Implementation**:
- Analyze tenant's LTM
- Suggest controls, improvements
- Learn from tenant patterns (within tenant boundary only)

---

## 13. REFERENCES

**Parent Architecture**:
- `/architecture/runtime/memory/UML_OVERVIEW.md`

**Related Documents**:
- `/maturion/maturion-memory-architecture.md` (Tier 5 definition)
- `/maturion/maturion-tenant-isolation-standard.md` (Isolation rules)
- `/foreman/governance/memory-rules.md` (LTM operational rules)

**Constitutional References**:
- CS1: Immutability (LTM is versioned and auditable)
- CS5: Security (Tenant isolation is absolute)
- CS6: Quality (Comprehensive isolation testing required)

---

**Status**: ✅ Architecture Complete  
**Version**: 1.0  
**Next Step**: Implement `/lib/db/memory.ts` with LTM tenant isolation
