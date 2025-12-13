/**
 * MCP Configuration Module
 * 
 * Manages configuration for the MCP (Model Context Protocol) Control Plane.
 * Provides configuration for safety checks and audit logging.
 */

export interface MCPConfig {
  enabled: boolean
  githubToken: string
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
  return {
    enabled: process.env.MCP_ENABLED !== 'false',
    githubToken: process.env.GITHUB_MCP_TOKEN || '',
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
}

/**
 * Validate MCP configuration
 */
export function validateMCPConfig(config: MCPConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!config.githubToken || config.githubToken.trim() === '') {
    errors.push('GitHub token is required')
  }

  if (config.enabled && errors.length > 0) {
    return { valid: false, errors }
  }

  return { valid: true, errors: [] }
}
