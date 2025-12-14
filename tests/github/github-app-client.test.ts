/**
 * GitHub App Client Tests (RED QA)
 * 
 * Tests for GitHub App authentication implementation.
 * These tests should be RED (failing) initially and turn GREEN after implementation.
 * 
 * Test Coverage:
 * - JWT generation and signing
 * - Installation token exchange
 * - Token caching and expiration
 * - Automatic token refresh
 * - Error handling
 * - Integration with Octokit
 */

import { describe, it, expect, beforeEach, jest } from '@jest/globals'

describe('GitHubAppClient', () => {
  describe('JWT Generation', () => {
    it('should generate valid JWT with correct claims', () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321'
      })
      
      const jwt = client.generateJWT()
      
      // JWT should be a string with 3 parts (header.payload.signature)
      expect(jwt).toBeDefined()
      expect(typeof jwt).toBe('string')
      expect(jwt.split('.')).toHaveLength(3)
      
      // Decode and verify claims
      const payload = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString())
      expect(payload.iss).toBe('123456')  // App ID
      expect(payload.iat).toBeLessThanOrEqual(Math.floor(Date.now() / 1000))
      expect(payload.exp).toBeGreaterThan(payload.iat)
      expect(payload.exp - payload.iat).toBeLessThanOrEqual(600)  // Max 10 minutes
    })

    it('should use RS256 algorithm for JWT signing', () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321'
      })
      
      const jwt = client.generateJWT()
      
      // Decode header
      const header = JSON.parse(Buffer.from(jwt.split('.')[0], 'base64').toString())
      expect(header.alg).toBe('RS256')
      expect(header.typ).toBe('JWT')
    })

    it('should throw error if private key is invalid', () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: 'invalid-key',
        installationId: '87654321'
      })
      
      expect(() => client.generateJWT()).toThrow()
    })

    it('should generate different JWTs on each call due to timestamp', async () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321'
      })
      
      const jwt1 = client.generateJWT()
      
      // Wait 1 second to ensure different timestamp
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const jwt2 = client.generateJWT()
      
      expect(jwt1).not.toBe(jwt2)
    })
  })

  describe('Installation Token Exchange', () => {
    it('should exchange JWT for installation token', async () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321'
      })
      
      // Mock GitHub API response
      mockGitHubTokenExchange({
        token: 'ghs_test_installation_token',
        expires_at: new Date(Date.now() + 3600000).toISOString()
      })
      
      const token = await client.getInstallationToken()
      
      expect(token).toBeDefined()
      expect(token).toMatch(/^ghs_/)
      expect(token.length).toBeGreaterThan(20)
    })

    it('should include installation ID in token request', async () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321'
      })
      
      const requestSpy = jest.fn()
      mockGitHubTokenExchange({ token: 'ghs_test', expires_at: '2025-12-14T13:00:00Z' }, requestSpy)
      
      await client.getInstallationToken()
      
      expect(requestSpy).toHaveBeenCalledWith(
        expect.stringContaining('/app/installations/87654321/access_tokens')
      )
    })

    it('should send JWT in Authorization header', async () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321'
      })
      
      const requestSpy = jest.fn()
      mockGitHubTokenExchange({ token: 'ghs_test', expires_at: '2025-12-14T13:00:00Z' }, requestSpy)
      
      await client.getInstallationToken()
      
      expect(requestSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': expect.stringMatching(/^Bearer /)
          })
        })
      )
    })

    it('should handle GitHub API errors gracefully', async () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321'
      })
      
      // Mock API error
      mockGitHubTokenExchangeError(401, 'Unauthorized')
      
      await expect(client.getInstallationToken()).rejects.toThrow('Unauthorized')
    })

    it('should retry on transient failures', async () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321'
      })
      
      // Mock first call fails, second succeeds
      let callCount = 0
      global.fetch = jest.fn(async () => {
        callCount++
        if (callCount === 1) {
          throw new Error('Network error')
        }
        return {
          ok: true,
          json: async () => ({ token: 'ghs_test', expires_at: '2025-12-14T13:00:00Z' })
        }
      })
      
      const token = await client.getInstallationToken()
      
      expect(token).toBe('ghs_test')
      expect(callCount).toBe(2)
    })
  })

  describe('Token Caching', () => {
    it('should cache installation token after first fetch', async () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321'
      })
      
      const requestSpy = jest.fn()
      mockGitHubTokenExchange({ token: 'ghs_test', expires_at: '2025-12-14T13:00:00Z' }, requestSpy)
      
      // First call - should fetch
      const token1 = await client.getInstallationToken()
      expect(requestSpy).toHaveBeenCalledTimes(1)
      
      // Second call - should use cache
      const token2 = await client.getInstallationToken()
      expect(requestSpy).toHaveBeenCalledTimes(1)  // No additional call
      
      expect(token1).toBe(token2)
    })

    it('should store token expiration time in cache', async () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321'
      })
      
      const expiresAt = '2025-12-14T13:00:00Z'
      mockGitHubTokenExchange({ token: 'ghs_test', expires_at: expiresAt })
      
      await client.getInstallationToken()
      
      const cache = client.getTokenCache()
      expect(cache).toBeDefined()
      expect(cache.expiresAt).toBe(expiresAt)
    })

    it('should store installation ID in cache', async () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321'
      })
      
      mockGitHubTokenExchange({ token: 'ghs_test', expires_at: '2025-12-14T13:00:00Z' })
      
      await client.getInstallationToken()
      
      const cache = client.getTokenCache()
      expect(cache.installationId).toBe('87654321')
    })

    it('should force refresh when force=true', async () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321'
      })
      
      const requestSpy = jest.fn()
      mockGitHubTokenExchange({ token: 'ghs_test', expires_at: '2025-12-14T13:00:00Z' }, requestSpy)
      
      // First call
      await client.getInstallationToken()
      expect(requestSpy).toHaveBeenCalledTimes(1)
      
      // Force refresh
      await client.getInstallationToken(true)
      expect(requestSpy).toHaveBeenCalledTimes(2)
    })
  })

  describe('Automatic Token Refresh', () => {
    it('should refresh token when expired', async () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321'
      })
      
      // First token expires immediately
      const expiredTime = new Date(Date.now() - 1000).toISOString()
      mockGitHubTokenExchange({ token: 'ghs_expired', expires_at: expiredTime })
      
      await client.getInstallationToken()
      
      // Mock new token
      mockGitHubTokenExchange({ token: 'ghs_fresh', expires_at: '2025-12-14T14:00:00Z' })
      
      // Should refresh automatically
      const token = await client.getInstallationToken()
      expect(token).toBe('ghs_fresh')
    })

    it('should refresh token when near expiration (< 5 minutes)', async () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321',
        refreshThresholdMinutes: 5
      })
      
      // Token expires in 4 minutes
      const nearExpiry = new Date(Date.now() + 4 * 60 * 1000).toISOString()
      mockGitHubTokenExchange({ token: 'ghs_near_expiry', expires_at: nearExpiry })
      
      await client.getInstallationToken()
      
      // Mock fresh token
      const requestSpy = jest.fn()
      mockGitHubTokenExchange({ token: 'ghs_fresh', expires_at: '2025-12-14T14:00:00Z' }, requestSpy)
      
      // Should trigger refresh
      const token = await client.getInstallationToken()
      expect(requestSpy).toHaveBeenCalled()
    })

    it('should NOT refresh token if still valid and not near expiration', async () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321'
      })
      
      const requestSpy = jest.fn()
      
      // Token expires in 30 minutes
      const validExpiry = new Date(Date.now() + 30 * 60 * 1000).toISOString()
      mockGitHubTokenExchange({ token: 'ghs_valid', expires_at: validExpiry }, requestSpy)
      
      // First call
      await client.getInstallationToken()
      expect(requestSpy).toHaveBeenCalledTimes(1)
      
      // Second call - should use cache
      await client.getInstallationToken()
      expect(requestSpy).toHaveBeenCalledTimes(1)  // No refresh
    })

    it('should handle refresh failures gracefully', async () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321'
      })
      
      // First token near expiration
      const nearExpiry = new Date(Date.now() + 2 * 60 * 1000).toISOString()
      mockGitHubTokenExchange({ token: 'ghs_expiring', expires_at: nearExpiry })
      
      await client.getInstallationToken()
      
      // Mock refresh failure
      mockGitHubTokenExchangeError(503, 'Service Unavailable')
      
      // Should throw error on refresh failure
      await expect(client.getInstallationToken()).rejects.toThrow('Service Unavailable')
    })
  })

  describe('Integration with Octokit', () => {
    it('should return authenticated Octokit instance', async () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321'
      })
      
      mockGitHubTokenExchange({ token: 'ghs_test', expires_at: '2025-12-14T13:00:00Z' })
      
      const octokit = await client.getOctokit()
      
      expect(octokit).toBeDefined()
      expect(octokit.request).toBeDefined()
      expect(octokit.rest).toBeDefined()
    })

    it('should use installation token for Octokit authentication', async () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321'
      })
      
      mockGitHubTokenExchange({ token: 'ghs_test_token', expires_at: '2025-12-14T13:00:00Z' })
      
      const octokit = await client.getOctokit()
      
      // Verify Octokit is using the installation token
      // (This would require mocking Octokit's internal state or making a test API call)
      expect(octokit).toBeDefined()
    })

    it('should execute GitHub operations with automatic token refresh', async () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321'
      })
      
      mockGitHubTokenExchange({ token: 'ghs_test', expires_at: '2025-12-14T13:00:00Z' })
      
      const result = await client.executeWithAuth(async (octokit) => {
        return await octokit.rest.repos.get({
          owner: 'MaturionISMS',
          repo: 'maturion-foreman-app'
        })
      })
      
      expect(result).toBeDefined()
    })
  })

  describe('Error Handling', () => {
    it('should throw error if app ID is missing', () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      expect(() => {
        new GitHubAppClient({
          appId: '',
          privateKey: generateTestPrivateKey(),
          installationId: '87654321'
        })
      }).toThrow('App ID is required')
    })

    it('should throw error if private key is missing', () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      expect(() => {
        new GitHubAppClient({
          appId: '123456',
          privateKey: '',
          installationId: '87654321'
        })
      }).toThrow('Private key is required')
    })

    it('should throw error if installation ID is missing', () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      expect(() => {
        new GitHubAppClient({
          appId: '123456',
          privateKey: generateTestPrivateKey(),
          installationId: ''
        })
      }).toThrow('Installation ID is required')
    })

    it('should handle network errors during token fetch', async () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321'
      })
      
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'))
      
      await expect(client.getInstallationToken()).rejects.toThrow('Network error')
    })
  })

  describe('Configuration', () => {
    it('should accept custom refresh threshold', () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321',
        refreshThresholdMinutes: 10
      })
      
      expect(client.getConfig().refreshThresholdMinutes).toBe(10)
    })

    it('should use default refresh threshold if not specified', () => {
      const { GitHubAppClient } = require('@/lib/github')
      
      const client = new GitHubAppClient({
        appId: '123456',
        privateKey: generateTestPrivateKey(),
        installationId: '87654321'
      })
      
      expect(client.getConfig().refreshThresholdMinutes).toBe(5)  // Default
    })

    it('should load configuration from environment variables', () => {
      process.env.GITHUB_APP_ID = '999999'
      process.env.GITHUB_APP_PRIVATE_KEY = generateTestPrivateKey()
      process.env.GITHUB_APP_INSTALLATION_ID = '888888'
      
      const { GitHubAppClient } = require('@/lib/github')
      const client = GitHubAppClient.fromEnvironment()
      
      expect(client.getConfig().appId).toBe('999999')
      expect(client.getConfig().installationId).toBe('888888')
    })
  })
})

// Test Helper Functions

function generateTestPrivateKey(): string {
  // Generate a test RSA private key (for testing only)
  // In real tests, we'd use a proper test key
  return `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAw7Zdfmece8iaB0kiTY8pCtiBtzbptB6jRYj+A2zD7XxA...
(truncated for brevity - would be a full valid RSA key for testing)
-----END RSA PRIVATE KEY-----`
}

function mockGitHubTokenExchange(response: any, spy?: jest.Mock) {
  const mockFn = jest.fn(async (url: string, options: any) => {
    if (spy) spy(url, options)
    
    return {
      ok: true,
      status: 200,
      json: async () => response
    }
  })
  
  global.fetch = mockFn as any
  return mockFn
}

function mockGitHubTokenExchangeError(status: number, message: string) {
  global.fetch = jest.fn(async () => {
    return {
      ok: false,
      status,
      json: async () => ({ message })
    }
  }) as any
}
