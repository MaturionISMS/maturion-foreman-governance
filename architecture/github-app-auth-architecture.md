# GitHub App Authentication Architecture for MCP Control Plane

## Overview

This architecture defines how the MCP Control Plane uses GitHub App authentication as the primary credential source for all GitHub operations, replacing simple token-based authentication.

## Architecture Principles

### 1. GitHub App as Identity Anchor
- GitHub App serves as the primary identity for all MCP operations
- Provides scoped permissions per repository installation
- Enables revocable, auditable access
- Supports organization-wide deployment

### 2. Token Security and Management
- Secrets stored in environment variables (MCP runtime, not Foreman)
- Installation tokens obtained via JWT exchange
- Tokens cached with expiration tracking
- Automatic token refresh before expiry
- No token exposure in logs or responses

### 3. Auditability and Traceability
- All operations include GitHub App installation ID
- Repository context included in audit trail
- Installation-level permission tracking
- Complete operation lineage

## Components

### 1. GitHub App Configuration

**Environment Variables**:
```bash
# GitHub App Credentials (Required)
GITHUB_APP_ID=123456                    # GitHub App ID
GITHUB_APP_PRIVATE_KEY=-----BEGIN...   # Private key for JWT signing
GITHUB_APP_INSTALLATION_ID=87654321    # Installation ID for the organization

# Legacy Token (Optional - for fallback/testing)
GITHUB_MCP_TOKEN=ghp_...               # Personal Access Token (deprecated)
```

**Configuration Structure**:
```typescript
interface GitHubAppConfig {
  appId: string
  privateKey: string
  installationId: string
  
  // Token management
  tokenCache?: {
    token: string
    expiresAt: string
  }
  
  // Behavior
  autoRefresh: boolean
  refreshThresholdMinutes: number  // Refresh when X minutes remain
}
```

### 2. Authentication Flow

#### Step 1: JWT Generation
```typescript
/**
 * Generate JWT for GitHub App authentication
 * 
 * The JWT is signed with the app's private key and includes:
 * - Issuer (iss): GitHub App ID
 * - Issued at (iat): Current timestamp
 * - Expiration (exp): 10 minutes from now (GitHub maximum)
 */
function generateJWT(appId: string, privateKey: string): string
```

**JWT Claims**:
- `iss`: GitHub App ID
- `iat`: Current Unix timestamp
- `exp`: Current timestamp + 10 minutes (GitHub max: 10 min)
- `alg`: RS256 (RSA signature with SHA-256)

#### Step 2: Installation Token Exchange
```typescript
/**
 * Exchange JWT for installation access token
 * 
 * Makes POST request to GitHub API:
 * POST /app/installations/{installation_id}/access_tokens
 * Authorization: Bearer <JWT>
 * 
 * Returns installation token with permissions and expiration
 */
async function getInstallationToken(
  jwt: string,
  installationId: string
): Promise<InstallationToken>
```

**Installation Token Response**:
```typescript
interface InstallationToken {
  token: string              // The access token (ghs_...)
  expires_at: string         // ISO 8601 timestamp
  permissions: {
    contents: string         // e.g., "read"
    issues: string           // e.g., "write"
    pull_requests: string    // e.g., "write"
  }
  repository_selection: string  // "all" or "selected"
}
```

#### Step 3: Token Caching
```typescript
/**
 * Cache installation token with expiration tracking
 * 
 * Cache structure:
 * - token: The installation token
 * - expiresAt: ISO 8601 expiration timestamp
 * - fetchedAt: When token was obtained
 * - installationId: Which installation this token is for
 */
interface TokenCache {
  token: string
  expiresAt: string
  fetchedAt: string
  installationId: string
}
```

**Cache Invalidation Rules**:
- Token expires (based on `expires_at` from GitHub)
- Token within refresh threshold (default: 5 minutes before expiry)
- Installation ID changes
- Manual invalidation (for security)

#### Step 4: Automatic Token Refresh
```typescript
/**
 * Refresh token if expired or near expiration
 * 
 * Refresh triggers:
 * - Token expired
 * - Token expires in < 5 minutes (configurable)
 * - Cache miss
 * 
 * Refresh process:
 * 1. Generate new JWT
 * 2. Exchange for new installation token
 * 3. Update cache
 * 4. Return fresh token
 */
async function ensureFreshToken(): Promise<string>
```

### 3. Integration with MCP Server

**Updated MCP Configuration** (`lib/mcp/config.ts`):
```typescript
export interface MCPConfig {
  enabled: boolean
  
  // GitHub App Authentication (Preferred)
  githubApp?: {
    appId: string
    privateKey: string
    installationId: string
  }
  
  // Legacy Token Authentication (Deprecated)
  githubToken?: string
  
  // Safety checks and audit (unchanged)
  safetyChecks: { ... }
  auditLogging: { ... }
}
```

**Authentication Priority**:
1. **GitHub App**: If `githubApp` config present, use app-based auth
2. **Legacy Token**: If only `githubToken` present, use token (log deprecation warning)
3. **Error**: If neither present, throw configuration error

**Updated Server Initialization** (`lib/mcp/server.ts`):
```typescript
async function initializeMCPServer(config: MCPConfig) {
  // Validate authentication config
  if (config.githubApp) {
    // Initialize GitHub App client
    const client = new GitHubAppClient(config.githubApp)
    
    // Test authentication (fetch installation token)
    await client.getInstallationToken()
    
    console.log('[MCP Server] Initialized with GitHub App authentication')
  } else if (config.githubToken) {
    console.warn('[MCP Server] Using legacy token auth (deprecated)')
  } else {
    throw new Error('No GitHub authentication configured')
  }
  
  // ... rest of initialization
}
```

### 4. Updated GitHub Client (`lib/github.ts`)

**Complete Implementation**:
```typescript
export class GitHubAppClient {
  private appId: string
  private privateKey: string
  private installationId: string
  private tokenCache?: TokenCache
  private octokit?: Octokit
  
  constructor(config: GitHubAppConfig) { ... }
  
  /**
   * Generate JWT for GitHub App
   */
  private generateJWT(): string { ... }
  
  /**
   * Exchange JWT for installation token
   */
  async getInstallationToken(force?: boolean): Promise<string> { ... }
  
  /**
   * Check if token needs refresh
   */
  private needsRefresh(): boolean { ... }
  
  /**
   * Get authenticated Octokit instance
   */
  async getOctokit(): Promise<Octokit> { ... }
  
  /**
   * Execute GitHub API call with automatic token refresh
   */
  async executeWithAuth<T>(operation: (octokit: Octokit) => Promise<T>): Promise<T> { ... }
}
```

**Token Refresh Logic**:
```typescript
async getInstallationToken(force = false): Promise<string> {
  // Return cached token if valid and not near expiration
  if (!force && this.tokenCache && !this.needsRefresh()) {
    return this.tokenCache.token
  }
  
  // Generate JWT
  const jwt = this.generateJWT()
  
  // Exchange for installation token
  const response = await fetch(
    `https://api.github.com/app/installations/${this.installationId}/access_tokens`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Accept': 'application/vnd.github+json'
      }
    }
  )
  
  const data = await response.json()
  
  // Cache token
  this.tokenCache = {
    token: data.token,
    expiresAt: data.expires_at,
    fetchedAt: new Date().toISOString(),
    installationId: this.installationId
  }
  
  return data.token
}
```

### 5. Integration with GitHub Mutations

**Updated `lib/github/mutations.ts`**:
```typescript
import { GitHubAppClient } from '@/lib/github'

async function getGitHubClient(): Promise<Octokit> {
  // Prefer GitHub App authentication
  if (process.env.GITHUB_APP_ID && process.env.GITHUB_APP_PRIVATE_KEY) {
    const client = new GitHubAppClient({
      appId: process.env.GITHUB_APP_ID,
      privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
      installationId: process.env.GITHUB_APP_INSTALLATION_ID
    })
    
    return await client.getOctokit()
  }
  
  // Fallback to legacy token (with warning)
  const token = process.env.GITHUB_MCP_TOKEN || process.env.GITHUB_APP_INSTALLATION_TOKEN
  if (token) {
    console.warn('[GitHub Mutations] Using legacy token authentication (deprecated)')
    return new Octokit({ auth: token })
  }
  
  throw new Error('GitHub authentication not configured')
}
```

### 6. Enhanced Audit Logging

**Updated Audit Log Entry**:
```typescript
interface AuditLogEntry {
  operation: string
  actor: string
  
  // Enhanced with GitHub App context
  githubApp?: {
    appId: string
    installationId: string
  }
  
  target: {
    owner: string
    repo: string
    number: number
  }
  
  timestamp: string
  result: 'success' | 'failure'
  safetyChecks?: SafetyCheckResult
  errorDetails?: string
}
```

**Example Audit Log**:
```json
{
  "operation": "merge_pr",
  "actor": "foreman",
  "githubApp": {
    "appId": "123456",
    "installationId": "87654321"
  },
  "target": {
    "owner": "MaturionISMS",
    "repo": "maturion-foreman-app",
    "number": 42
  },
  "timestamp": "2025-12-14T12:00:00.000Z",
  "result": "success",
  "safetyChecks": {
    "passed": true,
    "checks": [
      { "name": "ci_green", "passed": true },
      { "name": "qa_approved", "passed": true }
    ]
  }
}
```

## Security Considerations

### 1. Private Key Protection
- **Storage**: Private key stored in environment variable only
- **Format**: PEM format with newlines preserved
- **Access**: Never logged, never returned in responses
- **Rotation**: Support key rotation without downtime

### 2. Token Lifetime Management
- **JWT Lifetime**: 10 minutes (GitHub maximum)
- **Installation Token Lifetime**: ~1 hour (GitHub default)
- **Cache Refresh**: 5 minutes before expiration
- **Error Handling**: Automatic retry on token expiration

### 3. Permission Scoping
- **Minimum Permissions**: Only request needed permissions
- **Per-Repository**: Tokens scoped to specific installation
- **Revocable**: Can revoke app installation anytime
- **Audit Trail**: All operations logged with installation context

### 4. Secrets Management
**Current Implementation** (Environment Variables):
```bash
GITHUB_APP_PRIVATE_KEY=-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA...
-----END RSA PRIVATE KEY-----
```

**Future Enhancement** (Secrets Manager):
- AWS Secrets Manager
- Azure Key Vault
- HashiCorp Vault
- GitHub Encrypted Secrets

## Migration Strategy

### Phase 1: Implement GitHub App Auth (Parallel with Token)
1. Implement `GitHubAppClient` in `lib/github.ts`
2. Update MCP config to support both auth methods
3. Update mutations to prefer GitHub App
4. Add comprehensive tests

### Phase 2: Update Documentation
1. Document GitHub App setup process
2. Update `.env.example` with GitHub App variables
3. Add migration guide for existing deployments
4. Document token refresh behavior

### Phase 3: Deprecate Legacy Token (Warnings)
1. Log deprecation warnings when using token auth
2. Update architecture docs to mark token as deprecated
3. Provide 30-day migration period
4. Monitor adoption metrics

### Phase 4: Remove Legacy Token Support (Optional)
1. Remove token-based auth code
2. Require GitHub App for all deployments
3. Update all tests to use GitHub App
4. Final documentation update

## Testing Strategy

### 1. Unit Tests (`tests/github/github-app-client.test.ts`)
- JWT generation and signing
- Installation token exchange
- Token caching logic
- Automatic refresh triggers
- Error handling

### 2. Integration Tests (`tests/mcp/github-app-integration.test.ts`)
- MCP server initialization with GitHub App
- All 6 MCP tools using app-based auth
- Token refresh during long operations
- Audit log enhancement validation

### 3. Security Tests (`tests/security/github-app-security.test.ts`)
- Private key protection (no exposure in logs)
- Token expiration handling
- Permission scoping validation
- Rate limit compliance

### 4. Migration Tests (`tests/migration/auth-migration.test.ts`)
- Both auth methods work in parallel
- Graceful fallback to token if app not configured
- Deprecation warnings logged correctly

## Acceptance Criteria

1. ✅ **GitHub App Authentication Working**
   - JWT generation implemented
   - Installation token exchange working
   - Token caching and refresh functional

2. ✅ **All 6 MCP Tools Use App Auth**
   - `mcp_github_merge_pr` ✓
   - `mcp_github_enable_auto_merge` ✓
   - `mcp_github_close_issue` ✓
   - `mcp_github_add_labels` ✓
   - `mcp_github_remove_labels` ✓
   - `mcp_github_comment` ✓

3. ✅ **Token Refresh Works Automatically**
   - No manual intervention needed
   - Refresh before expiration
   - Graceful error handling

4. ✅ **Audit Trail Enhanced**
   - Installation ID included in logs
   - Repository context included
   - All operations traceable to GitHub App

5. ✅ **100% GREEN QA**
   - All tests passing
   - No warnings
   - No test debt

6. ✅ **Documentation Complete**
   - GitHub App setup guide
   - Configuration examples
   - Migration documentation

## Dependencies

### Required npm Packages
- `octokit` (already installed) - GitHub API client
- `jsonwebtoken` (new) - JWT generation and signing
- `@octokit/auth-app` (optional) - Official GitHub App auth helper

### GitHub Requirements
- GitHub App created in organization
- App installed on target repositories
- App permissions configured:
  - Contents: Read
  - Issues: Write
  - Pull requests: Write
  - Metadata: Read (automatic)

## References

- [GitHub Apps Documentation](https://docs.github.com/en/apps)
- [Authenticating as a GitHub App](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app)
- [GitHub App Installation Tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Octokit.js GitHub Apps Guide](https://github.com/octokit/octokit.js/#github-app-authentication)

## Version History

- **v1.0** (2025-12-14): Initial architecture design
- **Status**: Ready for Red QA creation
- **Approved by**: Foreman (autonomous)
- **Next**: Create Red QA tests for GitHub App authentication
