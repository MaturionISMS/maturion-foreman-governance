/**
 * Test: Foreman READ-ONLY Mode (Graceful Degradation without GitHub Credentials)
 * 
 * Architecture: Foreman App must start and operate without GitHub credentials
 * Date: 2025-12-14
 * 
 * Validates:
 * - Foreman can initialize without GITHUB_APP_ID/PRIVATE_KEY/INSTALLATION_ID
 * - Foreman can initialize without GITHUB_MCP_TOKEN
 * - Initialization checks degrade gracefully (warnings, not errors)
 * - System reports READ-ONLY mode clearly
 * - All required checks remain 'ready' or 'warning' (not 'error' or 'not_configured')
 */

import { checkInitializationStatus } from '@/lib/foreman/initialization'

describe('Foreman READ-ONLY Mode (Graceful Degradation)', () => {
  const originalEnv = process.env

  beforeEach(() => {
    // Isolate environment for each test
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv
  })

  describe('GitHub App Configuration', () => {
    it('should degrade gracefully when GitHub App not configured', () => {
      // Remove GitHub App credentials
      delete process.env.GITHUB_APP_ID
      delete process.env.GITHUB_APP_PRIVATE_KEY
      delete process.env.GITHUB_APP_INSTALLATION_ID
      delete process.env.GITHUB_WEBHOOK_SECRET

      const status = checkInitializationStatus()

      // Find GitHub App check
      const githubAppCheck = status.checks.find(c => c.name === 'GitHub App Configuration')

      expect(githubAppCheck).toBeDefined()
      expect(githubAppCheck?.status).toBe('warning') // NOT 'error' or 'not_configured'
      expect(githubAppCheck?.required).toBe(false) // NOT required for startup
      expect(githubAppCheck?.message).toContain('READ-ONLY mode')
    })

    it('should indicate legacy mode when GitHub App IS configured', () => {
      // Set GitHub App credentials
      process.env.GITHUB_APP_ID = '12345'
      process.env.GITHUB_APP_PRIVATE_KEY = '-----BEGIN RSA PRIVATE KEY-----\ntest\n-----END RSA PRIVATE KEY-----'
      process.env.GITHUB_APP_INSTALLATION_ID = '67890'
      process.env.GITHUB_WEBHOOK_SECRET = 'test-secret'

      const status = checkInitializationStatus()

      // Find GitHub App check
      const githubAppCheck = status.checks.find(c => c.name === 'GitHub App Configuration')

      expect(githubAppCheck).toBeDefined()
      expect(githubAppCheck?.status).toBe('ready')
      expect(githubAppCheck?.message).toContain('legacy mode')
      expect(githubAppCheck?.message).toContain('migrate to MCP')
    })
  })

  describe('MCP Configuration', () => {
    it('should degrade gracefully when MCP not configured', () => {
      // Remove MCP credentials
      delete process.env.GITHUB_MCP_TOKEN
      delete process.env.MCP_SERVER_URL
      delete process.env.MCP_CONTROL_PLANE_URL

      const status = checkInitializationStatus()

      // Find MCP check
      const mcpCheck = status.checks.find(c => c.name === 'MCP Configuration')

      expect(mcpCheck).toBeDefined()
      expect(mcpCheck?.status).toBe('warning') // NOT 'error'
      expect(mcpCheck?.required).toBe(false) // NOT required for startup
      expect(mcpCheck?.message).toContain('READ-ONLY mode')
    })

    it('should prefer MCP Control Plane URL over token', () => {
      // Set both MCP Control Plane URL and token
      process.env.MCP_SERVER_URL = 'http://localhost:3001'
      process.env.GITHUB_MCP_TOKEN = 'github_pat_test123'

      const status = checkInitializationStatus()

      // Find MCP check
      const mcpCheck = status.checks.find(c => c.name === 'MCP Configuration')

      expect(mcpCheck).toBeDefined()
      expect(mcpCheck?.status).toBe('ready')
      expect(mcpCheck?.message).toContain('MCP Control Plane configured')
      expect(mcpCheck?.message).toContain('http://localhost:3001')
    })

    it('should warn about legacy mode when only token configured', () => {
      // Set only token (no Control Plane URL)
      delete process.env.MCP_SERVER_URL
      delete process.env.MCP_CONTROL_PLANE_URL
      process.env.GITHUB_MCP_TOKEN = 'github_pat_test123'

      const status = checkInitializationStatus()

      // Find MCP check
      const mcpCheck = status.checks.find(c => c.name === 'MCP Configuration')

      expect(mcpCheck).toBeDefined()
      expect(mcpCheck?.status).toBe('warning')
      expect(mcpCheck?.message).toContain('legacy mode')
      expect(mcpCheck?.message).toContain('migrate to MCP Control Plane')
    })
  })

  describe('GitHub Token Configuration', () => {
    it('should degrade gracefully when external repo configured but token missing', () => {
      // Configure external repo but no token
      process.env.FOREMAN_BEHAVIOUR_REPO_OWNER = 'MaturionISMS'
      process.env.FOREMAN_BEHAVIOUR_REPO_NAME = 'foreman-behaviors'
      delete process.env.GITHUB_MCP_TOKEN

      const status = checkInitializationStatus()

      // Find GitHub Token check
      const tokenCheck = status.checks.find(c => c.name === 'GitHub Token Configuration')

      expect(tokenCheck).toBeDefined()
      expect(tokenCheck?.status).toBe('warning') // NOT 'error'
      expect(tokenCheck?.required).toBe(false) // NOT required
      expect(tokenCheck?.message).toContain('Falling back to local behavior files')
    })
  })

  describe('System Readiness', () => {
    it('should be ready for operation even without ANY GitHub credentials', () => {
      // Remove ALL GitHub credentials
      delete process.env.GITHUB_APP_ID
      delete process.env.GITHUB_APP_PRIVATE_KEY
      delete process.env.GITHUB_APP_INSTALLATION_ID
      delete process.env.GITHUB_WEBHOOK_SECRET
      delete process.env.GITHUB_MCP_TOKEN
      delete process.env.MCP_SERVER_URL
      delete process.env.MCP_CONTROL_PLANE_URL

      const status = checkInitializationStatus()

      // System should still be initialized (no critical errors)
      expect(status.initialized).toBe(true)

      // No required checks should be in error state
      const requiredChecks = status.checks.filter(c => c.required)
      const requiredErrors = requiredChecks.filter(
        c => c.status === 'error' || c.status === 'not_configured'
      )

      expect(requiredErrors).toHaveLength(0)

      // Summary should show no errors
      expect(status.summary.errors).toBe(0)
      expect(status.summary.notConfigured).toBe(0)
    })

    it('should clearly communicate READ-ONLY mode to operators', () => {
      // Remove ALL GitHub credentials
      delete process.env.GITHUB_APP_ID
      delete process.env.GITHUB_APP_PRIVATE_KEY
      delete process.env.GITHUB_APP_INSTALLATION_ID
      delete process.env.GITHUB_WEBHOOK_SECRET
      delete process.env.GITHUB_MCP_TOKEN
      delete process.env.MCP_SERVER_URL

      const status = checkInitializationStatus()

      // Find checks that mention READ-ONLY mode
      const readOnlyChecks = status.checks.filter(c =>
        c.message.includes('READ-ONLY')
      )

      // At least GitHub App and MCP should mention READ-ONLY
      expect(readOnlyChecks.length).toBeGreaterThanOrEqual(2)

      // All READ-ONLY checks should be warnings, not errors
      readOnlyChecks.forEach(check => {
        expect(check.status).toBe('warning')
        expect(check.required).toBe(false)
      })
    })
  })

  describe('Architectural Compliance', () => {
    it('should document separation of concerns in check messages', () => {
      delete process.env.GITHUB_APP_ID
      delete process.env.GITHUB_MCP_TOKEN
      delete process.env.MCP_SERVER_URL

      const status = checkInitializationStatus()

      // GitHub App check should mention MCP Control Plane
      const githubAppCheck = status.checks.find(c => c.name === 'GitHub App Configuration')
      expect(githubAppCheck?.message).toContain('MCP Control Plane')

      // MCP check should explain READ-ONLY mode implications
      const mcpCheck = status.checks.find(c => c.name === 'MCP Configuration')
      expect(mcpCheck?.message).toContain('GitHub mutations unavailable')
    })

    it('should mark GitHub-related checks as non-required', () => {
      const status = checkInitializationStatus()

      // GitHub App Configuration should be non-required
      const githubAppCheck = status.checks.find(c => c.name === 'GitHub App Configuration')
      expect(githubAppCheck?.required).toBe(false)

      // MCP Configuration should be non-required
      const mcpCheck = status.checks.find(c => c.name === 'MCP Configuration')
      expect(mcpCheck?.required).toBe(false)

      // GitHub Token Configuration should be non-required
      const tokenCheck = status.checks.find(c => c.name === 'GitHub Token Configuration')
      expect(tokenCheck?.required).toBe(false)
    })
  })
})
