/**
 * MCP Server Unit Tests
 * 
 * Tests the MCP server implementation for GitHub autonomous control plane.
 * All tests should be RED initially (failing) because implementation doesn't exist yet.
 * 
 * Test Coverage:
 * - Server initialization
 * - Tool registration
 * - Tool execution
 * - Input validation
 * - Error handling
 * - Audit logging
 */

import { describe, it, expect, beforeEach, jest } from '@jest/globals'

describe('MCP Server', () => {
  describe('Server Initialization', () => {
    it('should initialize MCP server with config', async () => {
      const { initializeMCPServer } = await import('@/lib/mcp/server')
      
      const server = await initializeMCPServer({
        enabled: true,
        githubToken: 'test-token',
        safetyChecks: {
          requireCIGreen: true,
          respectBranchProtection: true,
          requireQAApproval: true,
          requireComplianceApproval: true
        },
        auditLogging: {
          logAllActions: true,
          logToGovernanceMemory: true
        }
      })
      
      expect(server).toBeDefined()
      expect(server.initialized).toBe(true)
    })

    it('should fail initialization without GitHub token', async () => {
      const { initializeMCPServer } = await import('@/lib/mcp/server')
      
      await expect(initializeMCPServer({
        enabled: true,
        githubToken: '',
        safetyChecks: {
          requireCIGreen: true,
          respectBranchProtection: true,
          requireQAApproval: true,
          requireComplianceApproval: true
        },
        auditLogging: {
          logAllActions: true,
          logToGovernanceMemory: true
        }
      })).rejects.toThrow('GitHub token is required')
    })

    it('should register all required MCP tools', async () => {
      const { initializeMCPServer, listTools } = await import('@/lib/mcp/server')
      
      await initializeMCPServer({
        enabled: true,
        githubToken: 'test-token',
        safetyChecks: {
          requireCIGreen: true,
          respectBranchProtection: true,
          requireQAApproval: true,
          requireComplianceApproval: true
        },
        auditLogging: {
          logAllActions: true,
          logToGovernanceMemory: true
        }
      })
      
      const tools = listTools()
      
      expect(tools).toContain('mcp_github_merge_pr')
      expect(tools).toContain('mcp_github_enable_auto_merge')
      expect(tools).toContain('mcp_github_close_issue')
      expect(tools).toContain('mcp_github_add_labels')
      expect(tools).toContain('mcp_github_remove_labels')
      expect(tools).toContain('mcp_github_comment')
    })
  })

  describe('MCP Tool: mcp_github_merge_pr', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should validate required parameters', async () => {
      const { executeTool } = await import('@/lib/mcp/server')
      
      await expect(executeTool('mcp_github_merge_pr', {})).rejects.toThrow('Missing required parameter')
    })

    it('should validate parameter types', async () => {
      const { executeTool } = await import('@/lib/mcp/server')
      
      await expect(executeTool('mcp_github_merge_pr', {
        owner: 'MaturionISMS',
        repo: 'test-repo',
        prNumber: 'not-a-number', // Invalid type
        mergeMethod: 'squash'
      })).rejects.toThrow('prNumber must be a number')
    })
  })

  describe('MCP Tool: mcp_github_close_issue', () => {
    it('should validate required parameters', async () => {
      const { executeTool } = await import('@/lib/mcp/server')
      
      await expect(executeTool('mcp_github_close_issue', {
        owner: 'MaturionISMS',
        repo: 'test-repo'
      })).rejects.toThrow('Missing required parameter')
    })

    it('should require closure reason', async () => {
      const { executeTool } = await import('@/lib/mcp/server')
      
      await expect(executeTool('mcp_github_close_issue', {
        owner: 'MaturionISMS',
        repo: 'test-repo',
        issueNumber: 456,
        reason: '' // Empty reason
      })).rejects.toThrow('Closure reason is required')
    })
  })

  describe('MCP Tool: mcp_github_add_labels', () => {
    it('should validate labels parameter', async () => {
      const { executeTool } = await import('@/lib/mcp/server')
      
      await expect(executeTool('mcp_github_add_labels', {
        owner: 'MaturionISMS',
        repo: 'test-repo',
        issueNumber: 123,
        labels: [] // Empty array
      })).rejects.toThrow('At least one label is required')
    })
  })

  describe('MCP Tool: mcp_github_comment', () => {
    it('should validate comment body', async () => {
      const { executeTool } = await import('@/lib/mcp/server')
      
      await expect(executeTool('mcp_github_comment', {
        owner: 'MaturionISMS',
        repo: 'test-repo',
        issueNumber: 123,
        body: '' // Empty body
      })).rejects.toThrow('Comment body cannot be empty')
    })

    it('should detect secrets in comment body', async () => {
      const { executeTool } = await import('@/lib/mcp/server')
      
      await expect(executeTool('mcp_github_comment', {
        owner: 'MaturionISMS',
        repo: 'test-repo',
        issueNumber: 123,
        body: 'Here is my API key: sk-1234567890abcdef'
      })).rejects.toThrow('Secrets detected')
    })
  })
})
