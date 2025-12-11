/**
 * Long-Term Tenant Memory (LTM) Tests
 * 
 * RED QA: These tests MUST FAIL initially because LTM implementation is incomplete.
 * 
 * Test Coverage:
 * - LTM creation with tenant isolation
 * - LTM retrieval with tenant verification
 * - LTM tenant isolation enforcement (CRITICAL)
 * - LTM embodiment privilege enforcement
 * - LTM encryption at rest
 * - LTM versioning
 * - LTM access logging
 */

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals'

// These imports will fail initially (RED QA)
import {
  storeLTM,
  recallLTM,
  updateLTM,
  deleteLTM,
  getLTMVersion,
  getLTMAccessLog
} from '@/lib/memory/ltm'

describe('Long-Term Tenant Memory (LTM)', () => {
  const tenantA = 'tenant_a'
  const tenantB = 'tenant_b'
  const ismsRuntime = 'isms_runtime'
  const foreman = 'foreman'

  beforeEach(async () => {
    // Clean up before each test (test data only)
    await deleteLTM({ tenantId: tenantA, testData: true })
    await deleteLTM({ tenantId: tenantB, testData: true })
  })

  afterEach(async () => {
    // Clean up after each test
    await deleteLTM({ tenantId: tenantA, testData: true })
    await deleteLTM({ tenantId: tenantB, testData: true })
  })

  describe('LTM Creation', () => {
    test('should store LTM with tenant ID', async () => {
      const entry = await storeLTM({
        tenantId: tenantA,
        category: 'threat_history',
        actor: ismsRuntime,
        embodiment: ismsRuntime,
        content: {
          type: 'phishing_campaign',
          data: {
            campaignId: 'phishing_q4_2025',
            targetsAffected: 25
          },
          sensitivity: 'high'
        }
      })

      expect(entry).toBeDefined()
      expect(entry.id).toBeDefined()
      expect(entry.tier).toBe('LTM')
      expect(entry.tenantId).toBe(tenantA)
      expect(entry.organisationId).toBe(tenantA)
      expect(entry.category).toBe('threat_history')
      expect(entry.metadata.encrypted).toBe(true)
      expect(entry.metadata.isolationBoundary).toBe('tenant')
    })

    test('should require tenantId for LTM', async () => {
      await expect(
        storeLTM({
          category: 'threat_history',
          actor: ismsRuntime,
          embodiment: ismsRuntime,
          content: { type: 'test', data: {}, sensitivity: 'low' }
          // Missing tenantId
        })
      ).rejects.toThrow('Tenant ID required for LTM')
    })

    test('should only allow ISMS Runtime to write LTM', async () => {
      await expect(
        storeLTM({
          tenantId: tenantA,
          category: 'threat_history',
          actor: foreman,
          embodiment: foreman, // Foreman cannot write LTM
          content: { type: 'test', data: {}, sensitivity: 'low' }
        })
      ).rejects.toThrow('Only ISMS Runtime can write LTM')
    })

    test('should auto-encrypt LTM at rest', async () => {
      const entry = await storeLTM({
        tenantId: tenantA,
        category: 'control_status',
        actor: ismsRuntime,
        embodiment: ismsRuntime,
        content: {
          type: 'iso27001_controls',
          data: { controlsImplemented: 45 },
          sensitivity: 'medium'
        }
      })

      expect(entry.metadata.encrypted).toBe(true)
    })
  })

  describe('Tenant Isolation (CRITICAL)', () => {
    test('should NOT retrieve Tenant B LTM when querying for Tenant A', async () => {
      // Store LTM for Tenant A
      await storeLTM({
        tenantId: tenantA,
        category: 'threat_history',
        actor: ismsRuntime,
        embodiment: ismsRuntime,
        content: {
          type: 'threat_a',
          data: { threat: 'specific to tenant A' },
          sensitivity: 'high'
        }
      })

      // Store LTM for Tenant B
      await storeLTM({
        tenantId: tenantB,
        category: 'threat_history',
        actor: ismsRuntime,
        embodiment: ismsRuntime,
        content: {
          type: 'threat_b',
          data: { threat: 'specific to tenant B' },
          sensitivity: 'high'
        }
      })

      // Query for Tenant A
      const tenantAEntries = await recallLTM({
        tenantId: tenantA,
        embodiment: ismsRuntime,
        authenticatedTenantId: tenantA
      })

      // Should only get Tenant A's data
      expect(tenantAEntries).toHaveLength(1)
      expect(tenantAEntries[0].tenantId).toBe(tenantA)
      expect(tenantAEntries[0].content.type).toBe('threat_a')
    })

    test('should BLOCK cross-tenant query attempt', async () => {
      await storeLTM({
        tenantId: tenantA,
        category: 'threat_history',
        actor: ismsRuntime,
        embodiment: ismsRuntime,
        content: { type: 'test', data: {}, sensitivity: 'low' }
      })

      // Attempt to query Tenant A's data while authenticated as Tenant B
      await expect(
        recallLTM({
          tenantId: tenantA,
          embodiment: ismsRuntime,
          authenticatedTenantId: tenantB // MISMATCH
        })
      ).rejects.toThrow('Tenant ID mismatch')
    })

    test('should log tenant isolation violation attempt', async () => {
      await storeLTM({
        tenantId: tenantA,
        category: 'threat_history',
        actor: ismsRuntime,
        embodiment: ismsRuntime,
        content: { type: 'test', data: {}, sensitivity: 'low' }
      })

      try {
        await recallLTM({
          tenantId: tenantA,
          embodiment: ismsRuntime,
          authenticatedTenantId: tenantB
        })
      } catch (error) {
        // Should be logged to Governance Memory
        const governanceLogs = await import('@/lib/memory/governance-memory')
        const violations = await governanceLogs.queryGovernanceMemory({
          category: 'security_event',
          type: 'tenant_isolation_violation_attempt'
        })

        expect(violations.length).toBeGreaterThan(0)
      }
    })

    test('should enforce tenant boundary at database level', async () => {
      // This test verifies row-level security (when using Supabase)
      await storeLTM({
        tenantId: tenantA,
        category: 'threat_history',
        actor: ismsRuntime,
        embodiment: ismsRuntime,
        content: { type: 'test_a', data: {}, sensitivity: 'low' }
      })

      await storeLTM({
        tenantId: tenantB,
        category: 'threat_history',
        actor: ismsRuntime,
        embodiment: ismsRuntime,
        content: { type: 'test_b', data: {}, sensitivity: 'low' }
      })

      // Raw database query with tenant filter should return only tenant A
      const entries = await recallLTM({
        tenantId: tenantA,
        embodiment: ismsRuntime,
        authenticatedTenantId: tenantA
      })

      expect(entries).toHaveLength(1)
      expect(entries.every(e => e.tenantId === tenantA)).toBe(true)
    })
  })

  describe('Embodiment Privilege Enforcement', () => {
    test('should allow ISMS Runtime to read LTM for its tenant', async () => {
      await storeLTM({
        tenantId: tenantA,
        category: 'threat_history',
        actor: ismsRuntime,
        embodiment: ismsRuntime,
        content: { type: 'test', data: {}, sensitivity: 'low' }
      })

      const entries = await recallLTM({
        tenantId: tenantA,
        embodiment: ismsRuntime,
        authenticatedTenantId: tenantA
      })

      expect(entries).toHaveLength(1)
    })

    test('should BLOCK Foreman from reading LTM', async () => {
      await storeLTM({
        tenantId: tenantA,
        category: 'threat_history',
        actor: ismsRuntime,
        embodiment: ismsRuntime,
        content: { type: 'test', data: {}, sensitivity: 'low' }
      })

      await expect(
        recallLTM({
          tenantId: tenantA,
          embodiment: foreman, // Foreman has no LTM access
          authenticatedTenantId: tenantA
        })
      ).rejects.toThrow('Only ISMS Runtime can access LTM')
    })

    test('should BLOCK Local Builder from reading LTM', async () => {
      await storeLTM({
        tenantId: tenantA,
        category: 'threat_history',
        actor: ismsRuntime,
        embodiment: ismsRuntime,
        content: { type: 'test', data: {}, sensitivity: 'low' }
      })

      await expect(
        recallLTM({
          tenantId: tenantA,
          embodiment: 'local_builder',
          authenticatedTenantId: tenantA
        })
      ).rejects.toThrow('Only ISMS Runtime can access LTM')
    })
  })

  describe('LTM Versioning', () => {
    test('should version LTM entries on update', async () => {
      const entry = await storeLTM({
        tenantId: tenantA,
        category: 'control_status',
        actor: ismsRuntime,
        embodiment: ismsRuntime,
        content: {
          type: 'controls',
          data: { controlsImplemented: 45 },
          sensitivity: 'medium'
        }
      })

      // Update the entry
      const updated = await updateLTM({
        entryId: entry.id,
        tenantId: tenantA,
        newContent: {
          type: 'controls',
          data: { controlsImplemented: 50 },
          sensitivity: 'medium'
        },
        updateReason: 'Added 5 new controls'
      })

      expect(updated.metadata.version).toBe(2)
      expect(updated.metadata.version).toBeGreaterThan(entry.metadata.version)
    })

    test('should archive previous versions', async () => {
      const entry = await storeLTM({
        tenantId: tenantA,
        category: 'control_status',
        actor: ismsRuntime,
        embodiment: ismsRuntime,
        content: { type: 'test', data: { version: 1 }, sensitivity: 'low' }
      })

      await updateLTM({
        entryId: entry.id,
        tenantId: tenantA,
        newContent: { type: 'test', data: { version: 2 }, sensitivity: 'low' },
        updateReason: 'Update to version 2'
      })

      const versions = await getLTMVersion({
        entryId: entry.id,
        tenantId: tenantA
      })

      expect(versions).toHaveLength(2)
      expect(versions[0].metadata.version).toBe(1)
      expect(versions[1].metadata.version).toBe(2)
    })
  })

  describe('LTM Encryption', () => {
    test('should encrypt LTM content at rest', async () => {
      const entry = await storeLTM({
        tenantId: tenantA,
        category: 'vulnerability_history',
        actor: ismsRuntime,
        embodiment: ismsRuntime,
        content: {
          type: 'cve',
          data: { cve: 'CVE-2025-12345', systems: ['web_server'] },
          sensitivity: 'critical'
        }
      })

      expect(entry.metadata.encrypted).toBe(true)
    })

    test('should reject LTM write without encryption', async () => {
      await expect(
        storeLTM({
          tenantId: tenantA,
          category: 'threat_history',
          actor: ismsRuntime,
          embodiment: ismsRuntime,
          content: { type: 'test', data: {}, sensitivity: 'high' },
          metadata: { encrypted: false } // Explicitly disable encryption
        })
      ).rejects.toThrow('LTM must be encrypted at rest')
    })
  })

  describe('LTM Access Logging', () => {
    test('should log all LTM access', async () => {
      const entry = await storeLTM({
        tenantId: tenantA,
        category: 'threat_history',
        actor: ismsRuntime,
        embodiment: ismsRuntime,
        content: { type: 'test', data: {}, sensitivity: 'low' }
      })

      await recallLTM({
        tenantId: tenantA,
        embodiment: ismsRuntime,
        authenticatedTenantId: tenantA
      })

      const accessLog = await getLTMAccessLog({
        entryId: entry.id,
        tenantId: tenantA
      })

      expect(accessLog).toBeDefined()
      expect(accessLog.length).toBeGreaterThan(0)
      expect(accessLog[0].accessType).toBe('read')
      expect(accessLog[0].accessedBy).toBe(ismsRuntime)
      expect(accessLog[0].tenantVerified).toBe(true)
    })

    test('should log failed access attempts', async () => {
      await storeLTM({
        tenantId: tenantA,
        category: 'threat_history',
        actor: ismsRuntime,
        embodiment: ismsRuntime,
        content: { type: 'test', data: {}, sensitivity: 'low' }
      })

      try {
        await recallLTM({
          tenantId: tenantA,
          embodiment: foreman, // No privilege
          authenticatedTenantId: tenantA
        })
      } catch (error) {
        // Should be logged
        const governanceLogs = await import('@/lib/memory/governance-memory')
        const violations = await governanceLogs.queryGovernanceMemory({
          category: 'security_event',
          type: 'unauthorized_ltm_access_attempt'
        })

        expect(violations.length).toBeGreaterThan(0)
      }
    })
  })

  describe('LTM Deletion (GDPR Compliance)', () => {
    test('should allow ARC-approved deletion', async () => {
      const entry = await storeLTM({
        tenantId: tenantA,
        category: 'threat_history',
        actor: ismsRuntime,
        embodiment: ismsRuntime,
        content: { type: 'test', data: {}, sensitivity: 'low' }
      })

      // Delete with ARC approval
      await deleteLTM({
        entryId: entry.id,
        tenantId: tenantA,
        reason: 'GDPR right to erasure',
        arcApproved: true,
        approver: 'Johan'
      })

      const entries = await recallLTM({
        tenantId: tenantA,
        embodiment: ismsRuntime,
        authenticatedTenantId: tenantA
      })

      expect(entries.find(e => e.id === entry.id)).toBeUndefined()
    })

    test('should BLOCK deletion without ARC approval', async () => {
      const entry = await storeLTM({
        tenantId: tenantA,
        category: 'threat_history',
        actor: ismsRuntime,
        embodiment: ismsRuntime,
        content: { type: 'test', data: {}, sensitivity: 'low' }
      })

      await expect(
        deleteLTM({
          entryId: entry.id,
          tenantId: tenantA,
          reason: 'Want to delete',
          arcApproved: false // No approval
        })
      ).rejects.toThrow('LTM deletion requires ARC approval')
    })

    test('should log deletion to Governance Memory', async () => {
      const entry = await storeLTM({
        tenantId: tenantA,
        category: 'threat_history',
        actor: ismsRuntime,
        embodiment: ismsRuntime,
        content: { type: 'test', data: {}, sensitivity: 'low' }
      })

      await deleteLTM({
        entryId: entry.id,
        tenantId: tenantA,
        reason: 'GDPR compliance',
        arcApproved: true,
        approver: 'Johan'
      })

      const governanceLogs = await import('@/lib/memory/governance-memory')
      const deletions = await governanceLogs.queryGovernanceMemory({
        category: 'arc_decision',
        type: 'ltm_deletion_approved'
      })

      expect(deletions.length).toBeGreaterThan(0)
    })
  })
})
