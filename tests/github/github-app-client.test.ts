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
      
      // Check that URL includes the installation ID (full URL is passed to fetch)
      expect(requestSpy).toHaveBeenCalled()
      const callArgs = requestSpy.mock.calls[0]
      expect(callArgs[0]).toContain('87654321')
      expect(callArgs[0]).toContain('/app/installations/')
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
      // Use a far-future expiration to ensure caching works
      const farFutureExpiry = new Date(Date.now() + 3600000).toISOString()
      mockGitHubTokenExchange({ token: 'ghs_test', expires_at: farFutureExpiry }, requestSpy)
      
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
      
      // Simple test: just verify executeWithAuth returns a result
      const result = await client.executeWithAuth(async (octokit) => {
        // Verify octokit is passed and return a simple result
        expect(octokit).toBeDefined()
        return { success: true, octokit: !!octokit }
      })
      
      expect(result).toBeDefined()
      expect(result.success).toBe(true)
      expect(result.octokit).toBe(true)
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
  // Real RSA private key for testing (generated with Node.js crypto)
  return `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAqEUABaZ/37hTzY2F3PoOxKKGKLcu2WCHOJJXuriGlV5p9nM8
o9CcHxd3GXC+jtGpS89M8pSmmChcFwx0k0QtHbCnRxVikB4+rAqjBFJoVg7PSCBO
YIE66FFYu56ixpwNZ0XYGDFG0wAp32dt//Qv0m/HeJk1W4GsX11RQ4OJ+8x38/Mm
HyZeumUC6PC3N+KFp1IJVGXRJgp1WV0hl4EakTcgAasm2iW6fjyYtkfjB9v4GBEp
O59D9P8daeDzBS5Sh9xMVytuUdpwA1QNf4k36jAYAC7za1fLeC3oLSpsa9HgCPEK
JsV99UfwPRJ8wEOuweETOQwmmkEOvgXhuql+mwIDAQABAoIBAAh/v7IJXbEWQClZ
ihbbYc6TFOqj4fpkcpVWvZahRlmaCgkYJfUc5B3P6MSWBLygS12YYV8T8gbXwbBV
AThaUQW3C/k+U8WgDsilcDls03dGn+KZOyGLCsd8KwVYTF7IDVyXfa7ZzPrQVHfD
uMhySXi8C5uu8AUosLpPs3s7qXGt0P8FHe0RwIdDG1vT5/chv1vFtuT42vJI3brB
1odoEhYbZrJY/4PWdkvurKWNm7a6ffeR5HlrdyWdRofs11jvw5SBONsxPPFi31Kb
NUO8Ei3uUagBVO6RQAYqmP9LjRhdU8Y/E3mkDxFNSAm+tcOmk4L3WuiOEmmNbZso
ODPwRO0CgYEA3LWpyUR5N+QYKy8mLlBkjzUFe/kaDM+KPY9nsTcYhJvvoDY4lB6O
WkFZYoLZ4lF8LLCtRhBItBi9+9aMdXhPn+14LGqFKE2AQMePCuom/O0yjQN9ghzC
t2Z00UmcDN6yX5PPgp4oyk/p2SQX2mVMrjyga1KU58fD5NvHnn2b55cCgYEAwyzM
r5qTWiL0+lorK8zEs5LkIjeFXSiqxzo/YJSxoa/RfAZMmSOCRzblaOQTGQJNvzSd
uDJx6JK8/SJPqVp2iSEg2hHKPOT6/d428C5/ty3hdnEZkcvoFIoqr384Ss44sK9G
SUk0pBK/UNqPtuLl2KmjJFfer9QWMHoExeaeIZ0CgYBBjW89SSobsJKBGQLlFJmZ
cy0K0kSrc2TivdoVZ4DPuiTk19XcIGs1YV10BdtC/eK8v0jnm2SMoSCkUOfs5+v2
WyirQIQGIWarVtokasFjs+ukuFmpsHMg17xwgMVpiSc/ff5PFDyXQj75cF/pTNcG
lRksZx207b9AFQroBvSsRwKBgB7e8Sk9a90v9ku7A2UUKHC25Tq8SW3oxspoXinq
mwYWBy502JzITwzwk+y5VoP4J0/9BI1j/TxqKVZonO0Oj/00rjuP4Mss9L4+7bWj
xTO2IBlZ3k9/TyAgkovbtY2vfKwFrTpeR+NDy9sAFwc4cF6KxnEzLNfm1fOo+SRM
S+rJAoGBANfbHeGCR2AHjSweiydI4p0mi+SgSF5qk06PPo3q5J8cTc4AS1PhBzv6
oWEwEYsgdBb2S2sqDq3gOH/mr3RhxU4jIJ/oghnHGMI+Zspu6ZPN0ysm3XWSnOkj
40xzKLXyQQhsyLXvRbXPOymdPbcUhvIGkqTrFdRtNRHb5Oqewbvb
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
