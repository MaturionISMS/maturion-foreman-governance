/**
 * MCP Configuration Module
 * 
 * Manages configuration for the MCP (Model Context Protocol) Control Plane.
 * Provides configuration for safety checks and audit logging.
 */

export interface GitHubAppConfig {
  appId: string
  privateKey: string
  installationId: string
}

export interface MCPConfig {
  enabled: boolean
  
  // GitHub App Authentication (Preferred)
  githubApp?: GitHubAppConfig
  
  // Legacy Token Authentication (Deprecated)
  githubToken?: string
  
  safetyChecks: {
    requireCIGreen: boolean
    respectBranchProtection: boolean
    requireQAApproval: boolean
    requireComplianceApproval: boolean
  }
  auditLogging: {
    logAllActions: boolean
    logToGovernanceMemory: boolean
  }
}

/**
 * Default MCP configuration
 */
export const DEFAULT_MCP_CONFIG: MCPConfig = {
  enabled: true,
  githubToken: process.env.GITHUB_MCP_TOKEN || '',
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
}

/**
 * Get MCP configuration from environment
 */
export function getMCPConfig(): MCPConfig {
  const config: MCPConfig = {
    enabled: process.env.MCP_ENABLED !== 'false',
    safetyChecks: {
      requireCIGreen: process.env.MCP_REQUIRE_CI_GREEN !== 'false',
      respectBranchProtection: process.env.MCP_RESPECT_BRANCH_PROTECTION !== 'false',
      requireQAApproval: process.env.MCP_REQUIRE_QA_APPROVAL !== 'false',
      requireComplianceApproval: process.env.MCP_REQUIRE_COMPLIANCE_APPROVAL !== 'false'
    },
    auditLogging: {
      logAllActions: process.env.MCP_LOG_ALL_ACTIONS !== 'false',
      logToGovernanceMemory: process.env.MCP_LOG_TO_GOVERNANCE_MEMORY !== 'false'
    }
  }

  // Check for GitHub App configuration (preferred)
  if (process.env.GITHUB_APP_ID && process.env.GITHUB_APP_PRIVATE_KEY && process.env.GITHUB_APP_INSTALLATION_ID) {
    config.githubApp = {
      appId: process.env.GITHUB_APP_ID,
      privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
      installationId: process.env.GITHUB_APP_INSTALLATION_ID
    }
  }

  // Fall back to legacy token if GitHub App not configured
  if (!config.githubApp && process.env.GITHUB_MCP_TOKEN) {
    config.githubToken = process.env.GITHUB_MCP_TOKEN
  }

  return config
}

/**
 * Validate MCP configuration
 * 
 * ARCHITECTURAL PRINCIPLE (2025-12-14):
 * - MCP can be enabled without GitHub credentials (READ-ONLY mode)
 * - Validation should warn, not fail, when credentials missing
 * - Allows Foreman to start and operate in degraded mode
 */
export function validateMCPConfig(config: MCPConfig): { valid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = []
  const warnings: string[] = []

  // Check for GitHub App authentication (preferred)
  if (config.githubApp) {
    if (!config.githubApp.appId || config.githubApp.appId.trim() === '') {
      warnings.push('GitHub App ID is missing - MCP will operate in READ-ONLY mode')
    }
    if (!config.githubApp.privateKey || config.githubApp.privateKey.trim() === '') {
      warnings.push('GitHub App private key is missing - MCP will operate in READ-ONLY mode')
    }
    if (!config.githubApp.installationId || config.githubApp.installationId.trim() === '') {
      warnings.push('GitHub App installation ID is missing - MCP will operate in READ-ONLY mode')
    }
  } else if (config.githubToken) {
    // Legacy token validation
    if (config.githubToken.trim() === '') {
      warnings.push('GitHub token is empty - MCP will operate in READ-ONLY mode')
    }
  } else {
    // No authentication configured - READ-ONLY mode
    warnings.push('No GitHub authentication configured - MCP will operate in READ-ONLY mode')
  }

  // MCP is valid even without credentials (degrades gracefully)
  return { valid: true, errors, warnings }
}
