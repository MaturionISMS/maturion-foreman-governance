/**
 * Foreman Initialization Status Module
 * Checks system readiness and configuration status
 */

import { existsSync, readdirSync } from 'fs'
import { join } from 'path'

export interface InitializationCheckResult {
  name: string
  status: 'ready' | 'warning' | 'error' | 'not_configured'
  message: string
  required: boolean
}

export interface InitializationStatus {
  initialized: boolean
  readyForOperation: boolean
  checks: InitializationCheckResult[]
  timestamp: string
  summary: {
    total: number
    ready: number
    warnings: number
    errors: number
    notConfigured: number
  }
}

/**
 * Check if GitHub App is properly configured
 * 
 * ARCHITECTURAL PRINCIPLE (2025-12-14):
 * - Foreman App must start in READ-ONLY mode without GitHub credentials
 * - GitHub mutation authority belongs EXCLUSIVELY to MCP Control Plane
 * - This check is informational only - NOT required for startup
 */
function checkGitHubConfiguration(): InitializationCheckResult {
  const appId = process.env.GITHUB_APP_ID
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY
  const installationId = process.env.GITHUB_APP_INSTALLATION_ID
  const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET

  if (!appId || !privateKey || !installationId || !webhookSecret) {
    const missing = []
    if (!appId) missing.push('GITHUB_APP_ID')
    if (!privateKey) missing.push('GITHUB_APP_PRIVATE_KEY')
    if (!installationId) missing.push('GITHUB_APP_INSTALLATION_ID')
    if (!webhookSecret) missing.push('GITHUB_WEBHOOK_SECRET')

    return {
      name: 'GitHub App Configuration',
      status: 'warning',
      message: `GitHub App not configured (READ-ONLY mode). Missing: ${missing.join(', ')}. All GitHub mutations will route through MCP Control Plane.`,
      required: false
    }
  }

  return {
    name: 'GitHub App Configuration',
    status: 'ready',
    message: 'GitHub App credentials configured (legacy mode - should migrate to MCP-only)',
    required: false
  }
}

/**
 * Check if OpenAI API is configured
 */
function checkOpenAIConfiguration(): InitializationCheckResult {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return {
      name: 'OpenAI API Configuration',
      status: 'warning',
      message: 'OPENAI_API_KEY not set - AI features will not work',
      required: false
    }
  }

  return {
    name: 'OpenAI API Configuration',
    status: 'ready',
    message: 'OpenAI API key configured',
    required: false
  }
}

/**
 * Check if GitHub Token is configured (for loading behavior files)
 * 
 * ARCHITECTURAL PRINCIPLE (2025-12-14):
 * - Foreman should prefer LOCAL behavior files
 * - External repo loading is optional, not required
 * - Graceful degradation: use local files if token absent
 */
function checkGitHubTokenConfiguration(): InitializationCheckResult {
  const token = process.env.GITHUB_MCP_TOKEN
  const repoOwner = process.env.FOREMAN_BEHAVIOUR_REPO_OWNER
  const repoName = process.env.FOREMAN_BEHAVIOUR_REPO_NAME
  const behaviorDir = process.env.FOREMAN_BEHAVIOUR_DIR

  // If using external behavior repo, token is required
  if (repoOwner || repoName || behaviorDir) {
    if (!token) {
      return {
        name: 'GitHub Token Configuration',
        status: 'warning',
        message: 'External behavior repo configured but GITHUB_MCP_TOKEN missing. Falling back to local behavior files.',
        required: false
      }
    }
    return {
      name: 'GitHub Token Configuration',
      status: 'ready',
      message: 'GitHub token configured for external behavior files',
      required: false
    }
  }

  // Using local behavior files, token not required
  return {
    name: 'GitHub Token Configuration',
    status: 'ready',
    message: 'Using local behavior files (token not required)',
    required: false
  }
}

/**
 * Check if behavior files are available
 */
function checkBehaviorFiles(): InitializationCheckResult {
  const behaviorPath = join(process.cwd(), 'foreman')

  try {
    if (!existsSync(behaviorPath)) {
      return {
        name: 'Behavior Files',
        status: 'error',
        message: 'Behavior files directory not found',
        required: true
      }
    }

    // Check for key behavior files including memory-rules.md
    const requiredFiles = [
      'autonomy-rules.md',
      'identity/foreman-identity.md',
      'behaviours/orchestration.md',
      'governance/memory-rules.md'
    ]

    const missingFiles = requiredFiles.filter(file => {
      const filePath = join(behaviorPath, file)
      return !existsSync(filePath)
    })

    if (missingFiles.length > 0) {
      return {
        name: 'Behavior Files',
        status: 'warning',
        message: `Some behavior files missing: ${missingFiles.join(', ')}`,
        required: true
      }
    }

    // Count all behavior files
    const countFiles = (dir: string, depth = 0, maxDepth = 5): number => {
      let count = 0
      // Prevent stack overflow on deep directories
      if (depth > maxDepth) {
        return count
      }
      try {
        const entries = readdirSync(dir, { withFileTypes: true })
        for (const entry of entries) {
          if (entry.isFile() && entry.name.endsWith('.md')) {
            count++
          } else if (entry.isDirectory()) {
            count += countFiles(join(dir, entry.name), depth + 1, maxDepth)
          }
        }
      } catch {
        // Ignore errors in subdirectories
      }
      return count
    }

    const fileCount = countFiles(behaviorPath)

    return {
      name: 'Behavior Files',
      status: 'ready',
      message: `${fileCount} behavior files found in local directory`,
      required: true
    }
  } catch (error) {
    return {
      name: 'Behavior Files',
      status: 'error',
      message: `Error checking behavior files: ${error instanceof Error ? error.message : 'Unknown error'}`,
      required: true
    }
  }
}

/**
 * Check autonomous mode configuration
 */
function checkAutonomousMode(): InitializationCheckResult {
  const autonomousMode = process.env.MATURION_AUTONOMOUS_MODE || process.env.MATURION_ALLOW_AUTONOMOUS_BUILDS
  const safeguards = process.env.MATURION_AUTONOMOUS_GUARDS || process.env.MATURION_AUTONOMOUS_SAFE_GUARDS

  if (!autonomousMode) {
    return {
      name: 'Autonomous Mode',
      status: 'ready',
      message: 'Autonomous mode not explicitly configured (defaults to false)',
      required: false
    }
  }

  const enabled = autonomousMode === 'true'
  const guards = safeguards ? safeguards.split(',').map(s => s.trim()) : ['qa', 'compliance', 'tests']

  return {
    name: 'Autonomous Mode',
    status: 'ready',
    message: enabled 
      ? `Autonomous mode ENABLED with safeguards: ${guards.join(', ')}`
      : 'Autonomous mode DISABLED - manual approval required',
    required: false
  }
}

/**
 * Check organization ID configuration
 */
function checkOrganizationId(): InitializationCheckResult {
  const orgId = process.env.MATURION_ORG_ID

  if (!orgId) {
    return {
      name: 'Organization ID',
      status: 'warning',
      message: 'MATURION_ORG_ID not set - some features may require this',
      required: false
    }
  }

  // Mask the organization ID for security (show only first 8 characters)
  const maskedOrgId = orgId.length > 8 ? `${orgId.substring(0, 8)}...` : '***'

  return {
    name: 'Organization ID',
    status: 'ready',
    message: `Organization ID configured: ${maskedOrgId}`,
    required: false
  }
}

/**
 * Check if Unified Memory Fabric is properly initialized
 */
function checkMemorySystem(): InitializationCheckResult {
  const memoryPath = join(process.cwd(), 'memory')

  try {
    // Check if memory directory exists
    if (!existsSync(memoryPath)) {
      return {
        name: 'Unified Memory Fabric',
        status: 'error',
        message: 'Memory directory not found - Unified Memory Fabric not initialized',
        required: true
      }
    }

    // Check for required memory scope directories
    const requiredDirs = ['global', 'foreman', 'projects']
    const missingDirs = requiredDirs.filter(dir => {
      const dirPath = join(memoryPath, dir)
      return !existsSync(dirPath)
    })

    if (missingDirs.length > 0) {
      return {
        name: 'Unified Memory Fabric',
        status: 'warning',
        message: `Memory directories missing: ${missingDirs.join(', ')}`,
        required: true
      }
    }

    // Check for memory files in global and foreman scopes
    const globalMemory = join(memoryPath, 'global', 'memory.json')
    const foremanMemory = join(memoryPath, 'foreman', 'memory.json')

    if (!existsSync(globalMemory) || !existsSync(foremanMemory)) {
      return {
        name: 'Unified Memory Fabric',
        status: 'warning',
        message: 'Memory storage files not initialized',
        required: true
      }
    }

    return {
      name: 'Unified Memory Fabric',
      status: 'ready',
      message: 'Memory system initialized with global, foreman, and project scopes',
      required: true
    }
  } catch (error) {
    return {
      name: 'Unified Memory Fabric',
      status: 'error',
      message: `Error checking memory system: ${error instanceof Error ? error.message : 'Unknown error'}`,
      required: true
    }
  }
}

/**
 * Check if MCP (Model Context Protocol) is configured
 * 
 * ARCHITECTURAL PRINCIPLE (2025-12-14):
 * - MCP Control Plane holds ALL GitHub mutation authority
 * - Foreman App queries MCP status but does NOT require direct GitHub access
 * - MCP credentials belong to MCP Control Plane, not Foreman App
 * - Foreman can operate in READ-ONLY mode without MCP (degraded but functional)
 */
function checkMCPConfiguration(): InitializationCheckResult {
  const mcpServerUrl = process.env.MCP_SERVER_URL || process.env.MCP_CONTROL_PLANE_URL
  const mcpToken = process.env.GITHUB_MCP_TOKEN

  // Check if MCP Control Plane is configured (preferred architecture)
  if (mcpServerUrl) {
    return {
      name: 'MCP Configuration',
      status: 'ready',
      message: `MCP Control Plane configured at ${mcpServerUrl}. All GitHub mutations will route through MCP.`,
      required: false
    }
  }

  // Fallback: legacy direct token (deprecated architecture)
  if (mcpToken) {
    return {
      name: 'MCP Configuration',
      status: 'warning',
      message: 'GITHUB_MCP_TOKEN configured (legacy mode). Should migrate to MCP Control Plane for separation of concerns.',
      required: false
    }
  }

  // No MCP configuration - READ-ONLY mode
  return {
    name: 'MCP Configuration',
    status: 'warning',
    message: 'MCP not configured. Foreman operating in READ-ONLY mode. GitHub mutations unavailable.',
    required: false
  }
}

/**
 * Perform comprehensive initialization check
 */
export function checkInitializationStatus(): InitializationStatus {
  const checks: InitializationCheckResult[] = [
    checkGitHubConfiguration(),
    checkOpenAIConfiguration(),
    checkGitHubTokenConfiguration(),
    checkBehaviorFiles(),
    checkMemorySystem(),
    checkMCPConfiguration(),
    checkAutonomousMode(),
    checkOrganizationId()
  ]

  // Calculate summary
  const summary = {
    total: checks.length,
    ready: checks.filter(c => c.status === 'ready').length,
    warnings: checks.filter(c => c.status === 'warning').length,
    errors: checks.filter(c => c.status === 'error').length,
    notConfigured: checks.filter(c => c.status === 'not_configured').length
  }

  // Determine if system is ready for operation
  // System is ready if all required checks are ready
  const requiredChecks = checks.filter(c => c.required)
  const requiredReady = requiredChecks.every(c => c.status === 'ready')

  // System is initialized if no errors in required checks
  const hasRequiredErrors = requiredChecks.some(c => c.status === 'error' || c.status === 'not_configured')
  const initialized = !hasRequiredErrors

  return {
    initialized,
    readyForOperation: requiredReady,
    checks,
    timestamp: new Date().toISOString(),
    summary
  }
}

/**
 * Get a human-readable initialization status summary
 */
export function getInitializationSummary(status: InitializationStatus): string {
  if (status.readyForOperation) {
    return `✅ Foreman is fully initialized and ready for operation (${status.summary.ready}/${status.summary.total} checks passed)`
  }

  if (status.initialized) {
    return `⚠️ Foreman is initialized with ${status.summary.warnings} warning(s) (${status.summary.ready}/${status.summary.total} checks passed)`
  }

  return `❌ Foreman initialization incomplete: ${status.summary.errors + status.summary.notConfigured} error(s), ${status.summary.warnings} warning(s)`
}
