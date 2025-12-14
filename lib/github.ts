/**
 * GitHub API utilities
 * Handles GitHub App authentication and API interactions
 */

import { sign } from 'jsonwebtoken'
import { Octokit } from 'octokit'

export interface GitHubAppConfig {
  appId: string
  privateKey: string
  installationId: string
  refreshThresholdMinutes?: number
}

export interface TokenCache {
  token: string
  expiresAt: string
  fetchedAt: string
  installationId: string
}

export interface InstallationToken {
  token: string
  expires_at: string
  permissions?: Record<string, string>
  repository_selection?: string
}

export class GitHubAppClient {
  private appId: string
  private privateKey: string
  private installationId: string
  private refreshThresholdMinutes: number
  private tokenCache?: TokenCache
  private octokit?: Octokit

  constructor(config: GitHubAppConfig) {
    // Validate required fields
    if (!config.appId || config.appId.trim() === '') {
      throw new Error('App ID is required')
    }
    if (!config.privateKey || config.privateKey.trim() === '') {
      throw new Error('Private key is required')
    }
    if (!config.installationId || config.installationId.trim() === '') {
      throw new Error('Installation ID is required')
    }

    this.appId = config.appId
    this.privateKey = config.privateKey
    this.installationId = config.installationId
    this.refreshThresholdMinutes = config.refreshThresholdMinutes || 5
  }

  /**
   * Create instance from environment variables
   */
  static fromEnvironment(): GitHubAppClient {
    return new GitHubAppClient({
      appId: process.env.GITHUB_APP_ID || '',
      privateKey: process.env.GITHUB_APP_PRIVATE_KEY || '',
      installationId: process.env.GITHUB_APP_INSTALLATION_ID || ''
    })
  }

  /**
   * Get configuration
   */
  getConfig(): GitHubAppConfig & { refreshThresholdMinutes: number } {
    return {
      appId: this.appId,
      privateKey: this.privateKey,
      installationId: this.installationId,
      refreshThresholdMinutes: this.refreshThresholdMinutes
    }
  }

  /**
   * Get token cache
   */
  getTokenCache(): TokenCache | undefined {
    return this.tokenCache
  }

  /**
   * Generate JWT for GitHub App authentication
   */
  generateJWT(): string {
    const now = Math.floor(Date.now() / 1000)
    const payload = {
      iss: this.appId,
      iat: now,
      exp: now + 600  // 10 minutes (GitHub maximum)
    }

    try {
      return sign(payload, this.privateKey, { algorithm: 'RS256' })
    } catch (error: any) {
      throw new Error(`Failed to generate JWT: ${error.message}`)
    }
  }

  /**
   * Check if token needs refresh
   */
  private needsRefresh(): boolean {
    if (!this.tokenCache) {
      return true
    }

    const expiresAt = new Date(this.tokenCache.expiresAt)
    const now = new Date()
    const minutesUntilExpiry = (expiresAt.getTime() - now.getTime()) / 1000 / 60

    // Refresh if expired or within threshold
    return minutesUntilExpiry <= this.refreshThresholdMinutes
  }

  /**
   * Get installation token (with caching and automatic refresh)
   */
  async getInstallationToken(force = false): Promise<string> {
    // Return cached token if valid and not near expiration
    if (!force && this.tokenCache && !this.needsRefresh()) {
      return this.tokenCache.token
    }

    // Generate JWT
    const jwt = this.generateJWT()

    // Exchange for installation token with retry logic
    let lastError: Error | undefined
    const maxRetries = 2

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const response = await fetch(
          `https://api.github.com/app/installations/${this.installationId}/access_tokens`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${jwt}`,
              'Accept': 'application/vnd.github+json',
              'X-GitHub-Api-Version': '2022-11-28'
            }
          }
        )

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || `GitHub API error: ${response.status}`)
        }

        const data: InstallationToken = await response.json()

        // Cache the token
        this.tokenCache = {
          token: data.token,
          expiresAt: data.expires_at,
          fetchedAt: new Date().toISOString(),
          installationId: this.installationId
        }

        // Clear Octokit instance to force re-creation with new token
        this.octokit = undefined

        return data.token
      } catch (error: any) {
        lastError = error
        
        // Only retry on network errors, not auth errors
        if (attempt < maxRetries - 1 && !error.message.includes('Unauthorized')) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)))
          continue
        }
        
        throw error
      }
    }

    throw lastError || new Error('Failed to get installation token')
  }

  /**
   * Get authenticated Octokit instance
   */
  async getOctokit(): Promise<Octokit> {
    // Return cached instance if exists and token still valid
    if (this.octokit && !this.needsRefresh()) {
      return this.octokit
    }

    // Get fresh token
    const token = await this.getInstallationToken()

    // Create new Octokit instance
    this.octokit = new Octokit({ auth: token })

    return this.octokit
  }

  /**
   * Execute GitHub operation with automatic token refresh
   */
  async executeWithAuth<T>(operation: (octokit: Octokit) => Promise<T>): Promise<T> {
    const octokit = await this.getOctokit()
    
    try {
      return await operation(octokit)
    } catch (error: any) {
      // If token expired (401 Unauthorized), refresh and retry once
      if (error.status === 401) {
        console.log('[GitHubAppClient] Token expired, refreshing...')
        const freshOctokit = await this.getOctokit()
        return await operation(freshOctokit)
      }
      
      throw error
    }
  }
}

// Legacy client for backward compatibility
export interface GitHubConfig {
  appId?: string
  privateKey?: string
  installationId?: string
  webhookSecret?: string
}

export class GitHubClient {
  private appId: string
  private privateKey: string
  private installationId: string
  private webhookSecret: string

  constructor(config: GitHubConfig = {}) {
    this.appId = config.appId || process.env.GITHUB_APP_ID || ''
    this.privateKey = config.privateKey || process.env.GITHUB_APP_PRIVATE_KEY || ''
    this.installationId = config.installationId || process.env.GITHUB_APP_INSTALLATION_ID || ''
    this.webhookSecret = config.webhookSecret || process.env.GITHUB_WEBHOOK_SECRET || ''
  }

  /**
   * Get installation token for GitHub App authentication
   * @returns Installation token
   */
  async getInstallationToken(): Promise<string> {
    // Use GitHubAppClient for actual implementation
    if (this.appId && this.privateKey && this.installationId) {
      const client = new GitHubAppClient({
        appId: this.appId,
        privateKey: this.privateKey,
        installationId: this.installationId
      })
      return await client.getInstallationToken()
    }
    
    console.log('Getting installation token...')
    return ''
  }

  /**
   * Verify webhook signature
   * @param payload - Webhook payload
   * @param signature - Signature from webhook headers
   * @returns True if signature is valid
   */
  async verifyWebhookSignature(payload: string, signature: string): Promise<boolean> {
    // TODO: Implement HMAC signature verification
    console.log('Verifying webhook signature...')
    return true
  }

  /**
   * Get repository information
   * @param owner - Repository owner
   * @param repo - Repository name
   * @returns Repository data
   */
  async getRepository(owner: string, repo: string): Promise<any> {
    // TODO: Implement GitHub API call
    console.log(`Fetching repository: ${owner}/${repo}`)
    return { owner, repo }
  }

  /**
   * Create a comment on an issue or PR
   * @param owner - Repository owner
   * @param repo - Repository name
   * @param issueNumber - Issue or PR number
   * @param body - Comment body
   * @returns Created comment
   */
  async createComment(owner: string, repo: string, issueNumber: number, body: string): Promise<any> {
    // TODO: Implement GitHub API call using installation token
    console.log(`Creating comment on ${owner}/${repo}#${issueNumber}`)
    return { body }
  }

  /**
   * Get file contents from repository
   * @param owner - Repository owner
   * @param repo - Repository name
   * @param path - File path
   * @param ref - Git reference (branch, tag, or commit)
   * @returns File contents
   */
  async getFileContents(owner: string, repo: string, path: string, ref?: string): Promise<any> {
    // TODO: Implement GitHub API call
    console.log(`Getting file ${path} from ${owner}/${repo}`)
    return { content: '', encoding: 'base64' }
  }
}

export const githubClient = new GitHubClient()
