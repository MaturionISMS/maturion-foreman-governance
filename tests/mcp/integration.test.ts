/**
 * MCP Integration Tests
 * 
 * Tests the integration between MCP server, Foreman dispatch, and GitHub mutations.
 * All tests should be RED initially (failing) because implementation doesn't exist yet.
 * 
 * Test Coverage:
 * - Foreman → MCP → GitHub flow
 * - Governance Memory integration
 * - Audit trail completeness
 * - End-to-end autonomous lifecycle
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals'

describe('MCP Integration Tests', () => {
  describe('Foreman Dispatch Integration', () => {
    it('should check MCP availability before autonomous operations', async () => {
      const { isAutonomousModeEnabled } = await import('@/lib/foreman/dispatch')
      
      // MCP not configured
      process.env.GITHUB_MCP_TOKEN = ''
      
      const autonomyEnabled = await isAutonomousModeEnabled()
      
      expect(autonomyEnabled).toBe(false)
    })

    it('should enable autonomy when MCP is configured', async () => {
      const { isAutonomousModeEnabled } = await import('@/lib/foreman/dispatch')
      
      // MCP configured
      process.env.GITHUB_MCP_TOKEN = 'test-token'
      process.env.MATURION_AUTONOMOUS_MODE = 'true'
      
      const autonomyEnabled = await isAutonomousModeEnabled()
      
      expect(autonomyEnabled).toBe(true)
    })
  })

  describe('Complete Autonomous Lifecycle', () => {
    it('should complete full lifecycle without human intervention', async () => {
      // Setup
      process.env.GITHUB_MCP_TOKEN = 'test-token'
      process.env.MATURION_AUTONOMOUS_MODE = 'true'
      
      const { executeAutonomousLifecycle } = await import('@/lib/foreman/execution/autonomous-lifecycle')
      
      const result = await executeAutonomousLifecycle({
        issueNumber: 123,
        owner: 'MaturionISMS',
        repo: 'test-repo'
      })
      
      // Verify lifecycle steps completed
      expect(result.steps).toContain('architecture_designed')
      expect(result.steps).toContain('red_qa_created')
      expect(result.steps).toContain('build_to_green_executed')
      expect(result.steps).toContain('qa_validated')
      expect(result.steps).toContain('pr_created')
      expect(result.steps).toContain('pr_merged') // MCP tool used
      expect(result.steps).toContain('issue_closed') // MCP tool used
      
      expect(result.humanInterventionRequired).toBe(false)
      expect(result.success).toBe(true)
    })

    it('should escalate to human when safety checks fail', async () => {
      process.env.GITHUB_MCP_TOKEN = 'test-token'
      process.env.MATURION_AUTONOMOUS_MODE = 'true'
      
      const { executeAutonomousLifecycle } = await import('@/lib/foreman/execution/autonomous-lifecycle')
      
      // Mock failing safety checks
      jest.mock('@/lib/mcp/safety', () => ({
        validateMergeSafety: jest.fn().mockResolvedValue({
          passed: false,
          checks: {},
          blockingReasons: ['CI failed']
        })
      }))
      
      const result = await executeAutonomousLifecycle({
        issueNumber: 123,
        owner: 'MaturionISMS',
        repo: 'test-repo'
      })
      
      expect(result.humanInterventionRequired).toBe(true)
      expect(result.escalationReason).toContain('Safety checks failed')
    })
  })

  describe('Governance Memory Integration', () => {
    it('should log all MCP operations to Governance Memory', async () => {
      const { executeTool } = await import('@/lib/mcp/server')
      const { getGovernanceEvents } = await import('@/lib/foreman/memory/governance-memory')
      
      const beforeEvents = await getGovernanceEvents()
      
      await executeTool('mcp_github_merge_pr', {
        owner: 'MaturionISMS',
        repo: 'test-repo',
        prNumber: 123,
        mergeMethod: 'squash'
      })
      
      const afterEvents = await getGovernanceEvents()
      
      expect(afterEvents.length).toBeGreaterThan(beforeEvents.length)
      
      const mcpEvent = afterEvents.find(e => 
        e.type === 'mcp_operation' && 
        e.metadata?.operation === 'merge_pr'
      )
      
      expect(mcpEvent).toBeDefined()
      expect(mcpEvent?.actor).toBe('foreman')
      expect(mcpEvent?.metadata?.prNumber).toBe(123)
    })

    it('should maintain complete audit trail for lifecycle', async () => {
      const { executeAutonomousLifecycle } = await import('@/lib/foreman/execution/autonomous-lifecycle')
      const { getGovernanceEvents } = await import('@/lib/foreman/memory/governance-memory')
      
      await executeAutonomousLifecycle({
        issueNumber: 456,
        owner: 'MaturionISMS',
        repo: 'test-repo'
      })
      
      const events = await getGovernanceEvents()
      
      // Verify audit trail includes all lifecycle steps
      const architectureEvent = events.find(e => e.type === 'architecture_created')
      const redQAEvent = events.find(e => e.type === 'red_qa_created')
      const buildEvent = events.find(e => e.type === 'build_to_green')
      const prEvent = events.find(e => e.type === 'pr_created')
      const mergeEvent = events.find(e => e.type === 'mcp_operation' && e.metadata?.operation === 'merge_pr')
      const closeEvent = events.find(e => e.type === 'mcp_operation' && e.metadata?.operation === 'close_issue')
      
      expect(architectureEvent).toBeDefined()
      expect(redQAEvent).toBeDefined()
      expect(buildEvent).toBeDefined()
      expect(prEvent).toBeDefined()
      expect(mergeEvent).toBeDefined()
      expect(closeEvent).toBeDefined()
    })
  })

  describe('Safety Enforcement in Lifecycle', () => {
    it('should not merge PR if QA is not 100% green', async () => {
      const { executeAutonomousLifecycle } = await import('@/lib/foreman/execution/autonomous-lifecycle')
      
      // Mock QA with failures
      jest.mock('@/lib/foreman/qa/qiel-runner', () => ({
        runQIEL: jest.fn().mockResolvedValue({
          passed: false,
          checks: {
            buildLogsPassed: false,
            lintLogsPassed: true,
            testLogsPassed: true,
            zeroWarningPassed: true,
            deploymentSimulationPassed: true
          }
        })
      }))
      
      const result = await executeAutonomousLifecycle({
        issueNumber: 789,
        owner: 'MaturionISMS',
        repo: 'test-repo'
      })
      
      expect(result.steps).not.toContain('pr_merged')
      expect(result.humanInterventionRequired).toBe(true)
      expect(result.escalationReason).toContain('QA not 100% green')
    })

    it('should not merge PR if compliance is blocked', async () => {
      const { executeAutonomousLifecycle } = await import('@/lib/foreman/execution/autonomous-lifecycle')
      
      // Mock PR with compliance-blocked label
      jest.mock('@/lib/github/client', () => ({
        github: {
          rest: {
            pulls: {
              get: jest.fn().mockResolvedValue({
                data: {
                  labels: [
                    { name: 'compliance-blocked' }
                  ]
                }
              })
            }
          }
        }
      }))
      
      const result = await executeAutonomousLifecycle({
        issueNumber: 101,
        owner: 'MaturionISMS',
        repo: 'test-repo'
      })
      
      expect(result.steps).not.toContain('pr_merged')
      expect(result.humanInterventionRequired).toBe(true)
      expect(result.escalationReason).toContain('Compliance blocked')
    })
  })

  describe('Error Recovery', () => {
    it('should retry transient GitHub API errors', async () => {
      const { executeTool } = await import('@/lib/mcp/server')
      
      let attempts = 0
      jest.mock('@/lib/github/mutations', () => ({
        mergePR: jest.fn().mockImplementation(() => {
          attempts++
          if (attempts < 3) {
            const error: any = new Error('Network timeout')
            error.status = 503
            throw error
          }
          return Promise.resolve()
        })
      }))
      
      const result = await executeTool('mcp_github_merge_pr', {
        owner: 'MaturionISMS',
        repo: 'test-repo',
        prNumber: 202,
        mergeMethod: 'squash'
      })
      
      expect(attempts).toBe(3)
      expect(result.success).toBe(true)
    })

    it('should not retry permanent errors', async () => {
      const { executeTool } = await import('@/lib/mcp/server')
      
      let attempts = 0
      jest.mock('@/lib/github/mutations', () => ({
        mergePR: jest.fn().mockImplementation(() => {
          attempts++
          const error: any = new Error('Not Found')
          error.status = 404
          throw error
        })
      }))
      
      const result = await executeTool('mcp_github_merge_pr', {
        owner: 'MaturionISMS',
        repo: 'nonexistent-repo',
        prNumber: 303,
        mergeMethod: 'squash'
      })
      
      expect(attempts).toBe(1) // No retries for 404
      expect(result.success).toBe(false)
      expect(result.error).toBe('GITHUB_API_ERROR')
    })
  })

  describe('MCP Server Availability', () => {
    it('should report MCP as available when configured', async () => {
      const { getMCPStatus } = await import('@/lib/mcp/server')
      
      process.env.GITHUB_MCP_TOKEN = 'test-token'
      
      const status = await getMCPStatus()
      
      expect(status.available).toBe(true)
      expect(status.configured).toBe(true)
      expect(status.tokenPresent).toBe(true)
    })

    it('should report MCP as unavailable when not configured', async () => {
      const { getMCPStatus } = await import('@/lib/mcp/server')
      
      process.env.GITHUB_MCP_TOKEN = ''
      
      const status = await getMCPStatus()
      
      expect(status.available).toBe(false)
      expect(status.configured).toBe(false)
      expect(status.tokenPresent).toBe(false)
    })

    it('should surface MCP unavailability to Foreman', async () => {
      const { checkInitializationStatus } = await import('@/lib/foreman/initialization')
      
      process.env.GITHUB_MCP_TOKEN = ''
      
      const initStatus = await checkInitializationStatus()
      
      const mcpCheck = initStatus.checks.find(c => c.name === 'MCP Configuration')
      
      expect(mcpCheck).toBeDefined()
      expect(mcpCheck?.status).toBe('error')
      expect(mcpCheck?.message).toContain('GITHUB_MCP_TOKEN not set')
    })
  })
})
