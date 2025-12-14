/**
 * MCP Standalone Server
 * 
 * Provides REST API for MCP (Model Context Protocol) operations.
 * 
 * Endpoints:
 * - GET /health - Service health and dependency checks
 * - GET /tools - Tool discovery and schemas
 * - POST /execute - Execute MCP tool
 * 
 * Authentication: Bearer token via Authorization header
 * Audit: All operations logged to Governance Memory
 */

import { createServer, IncomingMessage, ServerResponse } from 'http'
import { parse } from 'url'
import { getMCPConfig, validateMCPConfig, MCPConfig } from './config'
import { initializeMCPServer, executeTool, listTools, getMCPStatus, AuditLogEntry } from './server'

// Get version from package.json
const version = '0.1.0'

/**
 * Service configuration
 */
export interface MCPServiceConfig {
  port: number
  host: string
  apiKey: string
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
 * Service state
 */
let serviceState: {
  startTime: number
  config: MCPServiceConfig | null
  initialized: boolean
} = {
  startTime: 0,
  config: null,
  initialized: false
}

/**
 * Load configuration from environment
 */
function loadServiceConfig(): MCPServiceConfig {
  const apiKey = process.env.MCP_API_KEY
  const githubToken = process.env.GITHUB_MCP_TOKEN

  if (!apiKey) {
    throw new Error('Missing required environment variable: MCP_API_KEY')
  }

  if (!githubToken) {
    throw new Error('Missing required environment variable: GITHUB_MCP_TOKEN')
  }

  return {
    port: parseInt(process.env.MCP_PORT || '3100'),
    host: process.env.MCP_HOST || '0.0.0.0',
    apiKey,
    githubToken,
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
 * Authenticate request using API key
 */
function authenticateRequest(req: IncomingMessage): boolean {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return false
  }

  const [scheme, token] = authHeader.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return false
  }

  if (!serviceState.config) {
    return false
  }

  // Constant-time comparison to prevent timing attacks
  const expectedKey = serviceState.config.apiKey
  if (token.length !== expectedKey.length) {
    return false
  }

  let match = true
  for (let i = 0; i < token.length; i++) {
    if (token[i] !== expectedKey[i]) {
      match = false
    }
  }

  return match
}

/**
 * Send JSON response
 */
function sendJSON(res: ServerResponse, status: number, body: any) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(body, null, 2))
}

/**
 * Parse JSON body from request
 */
async function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch (error) {
        reject(new Error('Invalid JSON'))
      }
    })

    req.on('error', reject)
  })
}

/**
 * Check GitHub API connectivity
 */
async function checkGitHubHealth(): Promise<{ status: 'ok' | 'error', authenticated: boolean, rateLimitRemaining?: number }> {
  try {
    const { Octokit } = await import('octokit')
    const octokit = new Octokit({ auth: serviceState.config?.githubToken })
    
    const { data: user } = await octokit.rest.users.getAuthenticated()
    const { data: rateLimit } = await octokit.rest.rateLimit.get()
    
    return {
      status: 'ok',
      authenticated: true,
      rateLimitRemaining: rateLimit.rate.remaining
    }
  } catch (error: any) {
    return {
      status: 'error',
      authenticated: false
    }
  }
}

/**
 * Check Governance Memory writability
 */
async function checkGovernanceMemoryHealth(): Promise<{ status: 'ok' | 'error', writable: boolean }> {
  try {
    // Test if we can import and use governance memory
    const { logGovernanceEvent } = await import('../foreman/memory/governance-memory')
    return {
      status: 'ok',
      writable: true
    }
  } catch (error) {
    return {
      status: 'error',
      writable: false
    }
  }
}

/**
 * Handle GET /health
 */
async function handleHealth(req: IncomingMessage, res: ServerResponse) {
  const uptime = Math.floor((Date.now() - serviceState.startTime) / 1000)
  
  // Check dependencies
  const [github, governanceMemory] = await Promise.all([
    checkGitHubHealth(),
    checkGovernanceMemoryHealth()
  ])

  const allHealthy = github.status === 'ok' && governanceMemory.status === 'ok'
  const someUnhealthy = github.status === 'error' || governanceMemory.status === 'error'

  const status = allHealthy ? 'ok' : (someUnhealthy ? 'degraded' : 'error')
  const httpStatus = status === 'ok' ? 200 : 503

  sendJSON(res, httpStatus, {
    status,
    uptime,
    timestamp: new Date().toISOString(),
    dependencies: {
      github,
      governanceMemory
    },
    version: version,
    config: {
      safetyChecksEnabled: serviceState.config?.safetyChecks.requireCIGreen ?? true,
      auditLoggingEnabled: serviceState.config?.auditLogging.logToGovernanceMemory ?? true
    }
  })
}

/**
 * Handle GET /tools
 */
async function handleTools(req: IncomingMessage, res: ServerResponse) {
  // Require authentication
  if (!authenticateRequest(req)) {
    sendJSON(res, 401, {
      error: 'UNAUTHORIZED',
      message: 'Missing or invalid API key'
    })
    return
  }

  const url = parse(req.url || '', true)
  const format = url.query.format as string || 'summary'

  const tools = listTools()
  const timestamp = new Date().toISOString()

  if (format === 'detailed') {
    // Return detailed tool information with schemas
    const detailedTools = tools.map(name => {
      switch (name) {
        case 'mcp_github_merge_pr':
          return {
            name,
            description: 'Merge a pull request with safety validation',
            parameters: {
              owner: { type: 'string', required: true, description: 'Repository owner' },
              repo: { type: 'string', required: true, description: 'Repository name' },
              prNumber: { type: 'number', required: true, description: 'PR number' },
              mergeMethod: { type: 'string', required: true, description: 'Merge method (merge|squash|rebase)' }
            },
            safetyChecks: ['CI green', 'Branch protection', 'QA approval', 'Compliance approval', 'No conflicts']
          }
        case 'mcp_github_close_issue':
          return {
            name,
            description: 'Close an issue with documentation',
            parameters: {
              owner: { type: 'string', required: true, description: 'Repository owner' },
              repo: { type: 'string', required: true, description: 'Repository name' },
              issueNumber: { type: 'number', required: true, description: 'Issue number' },
              reason: { type: 'string', required: true, description: 'Closure reason' },
              linkedPRs: { type: 'array', required: false, description: 'Linked PR numbers' }
            },
            safetyChecks: ['Linked PRs merged', 'Resolution documented']
          }
        case 'mcp_github_add_labels':
          return {
            name,
            description: 'Add labels to issue or PR',
            parameters: {
              owner: { type: 'string', required: true, description: 'Repository owner' },
              repo: { type: 'string', required: true, description: 'Repository name' },
              issueNumber: { type: 'number', required: true, description: 'Issue/PR number' },
              labels: { type: 'array', required: true, description: 'Labels to add' }
            },
            safetyChecks: []
          }
        case 'mcp_github_comment':
          return {
            name,
            description: 'Post comment on issue or PR',
            parameters: {
              owner: { type: 'string', required: true, description: 'Repository owner' },
              repo: { type: 'string', required: true, description: 'Repository name' },
              issueNumber: { type: 'number', required: true, description: 'Issue/PR number' },
              body: { type: 'string', required: true, description: 'Comment body' }
            },
            safetyChecks: ['No secrets in body']
          }
        default:
          return {
            name,
            description: 'MCP tool',
            parameters: {},
            safetyChecks: []
          }
      }
    })

    sendJSON(res, 200, {
      tools: detailedTools,
      count: detailedTools.length,
      timestamp
    })
  } else {
    // Return summary format (just tool names)
    sendJSON(res, 200, {
      tools,
      count: tools.length,
      timestamp
    })
  }
}

/**
 * Handle POST /execute
 */
async function handleExecute(req: IncomingMessage, res: ServerResponse) {
  // Require authentication
  if (!authenticateRequest(req)) {
    sendJSON(res, 401, {
      error: 'UNAUTHORIZED',
      message: 'Missing or invalid API key'
    })
    return
  }

  try {
    // Parse request body
    const body = await parseBody(req)
    const { tool, parameters } = body

    // Validate tool parameter
    if (!tool) {
      sendJSON(res, 400, {
        error: 'INVALID_TOOL',
        reason: 'Missing required parameter: tool'
      })
      return
    }

    // Validate tool exists
    const availableTools = listTools()
    if (!availableTools.includes(tool)) {
      sendJSON(res, 400, {
        error: 'INVALID_TOOL',
        reason: `Unknown tool: ${tool}. Available tools: ${availableTools.join(', ')}`
      })
      return
    }

    // Validate parameters
    if (!parameters) {
      sendJSON(res, 400, {
        error: 'INVALID_PARAMETERS',
        reason: 'Missing required parameter: parameters'
      })
      return
    }

    // Execute tool
    const startTime = Date.now()
    const result = await executeTool(tool, parameters)
    const executionTimeMs = Date.now() - startTime

    // Add execution time to audit (extend the audit object)
    const resultWithTime = {
      ...result,
      audit: {
        ...result.audit,
        executionTimeMs
      }
    }

    // Return result
    sendJSON(res, 200, resultWithTime)

  } catch (error: any) {
    // Handle validation errors
    if (error.message.includes('Missing required parameter')) {
      sendJSON(res, 400, {
        error: 'INVALID_PARAMETERS',
        reason: error.message
      })
    } else if (error.message.includes('prNumber must be a number')) {
      sendJSON(res, 400, {
        error: 'INVALID_PARAMETERS',
        reason: 'Invalid parameter type: prNumber must be a number'
      })
    } else {
      // Server error
      sendJSON(res, 500, {
        error: 'SYSTEM_ERROR',
        reason: error.message
      })
    }
  }
}

/**
 * Request handler
 */
async function handleRequest(req: IncomingMessage, res: ServerResponse) {
  const url = parse(req.url || '', true)
  const method = req.method || 'GET'
  const path = url.pathname || '/'

  // Log request if enabled
  if (serviceState.config?.auditLogging.logAllActions) {
    console.log(`[${new Date().toISOString()}] ${method} ${path}`)
  }

  try {
    // Route requests
    if (method === 'GET' && path === '/health') {
      await handleHealth(req, res)
    } else if (method === 'GET' && path === '/tools') {
      await handleTools(req, res)
    } else if (method === 'POST' && path === '/execute') {
      await handleExecute(req, res)
    } else {
      sendJSON(res, 404, {
        error: 'NOT_FOUND',
        message: `Endpoint not found: ${method} ${path}`,
        availableEndpoints: [
          'GET /health',
          'GET /tools',
          'POST /execute'
        ]
      })
    }
  } catch (error: any) {
    console.error(`[ERROR] ${method} ${path}:`, error)
    sendJSON(res, 500, {
      error: 'SYSTEM_ERROR',
      message: 'Internal server error',
      details: error.message
    })
  }
}

/**
 * Start MCP standalone server
 */
export async function startMCPServer(): Promise<any> {
  try {
    // Load configuration
    const config = loadServiceConfig()
    serviceState.config = config
    serviceState.startTime = Date.now()

    // Initialize MCP server
    const mcpConfig: MCPConfig = {
      enabled: true,
      githubToken: config.githubToken,
      safetyChecks: config.safetyChecks,
      auditLogging: config.auditLogging
    }

    await initializeMCPServer(mcpConfig)
    serviceState.initialized = true

    // Create HTTP server
    const server = createServer(handleRequest)

    // Start listening
    await new Promise<void>((resolve, reject) => {
      server.listen(config.port, config.host, () => {
        console.log(`\n🚀 MCP Service Started`)
        console.log(`   Port: ${config.port}`)
        console.log(`   Host: ${config.host}`)
        console.log(`   Endpoints:`)
        console.log(`     GET  http://${config.host}:${config.port}/health`)
        console.log(`     GET  http://${config.host}:${config.port}/tools`)
        console.log(`     POST http://${config.host}:${config.port}/execute`)
        console.log(`   Auth: Bearer token required (except /health)`)
        console.log(`   Safety Checks: ${config.safetyChecks.requireCIGreen ? 'Enabled' : 'Disabled'}`)
        console.log(`   Audit Logging: ${config.auditLogging.logToGovernanceMemory ? 'Enabled' : 'Disabled'}`)
        console.log()
        resolve()
      })

      server.on('error', reject)
    })

    // Handle graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('\n⏸️  SIGTERM received, shutting down gracefully...')
      await stopMCPServer(server)
    })

    process.on('SIGINT', async () => {
      console.log('\n⏸️  SIGINT received, shutting down gracefully...')
      await stopMCPServer(server)
    })

    return server

  } catch (error: any) {
    console.error('❌ Failed to start MCP server:', error.message)
    throw error
  }
}

/**
 * Stop MCP standalone server
 */
export async function stopMCPServer(server: any): Promise<void> {
  return new Promise((resolve) => {
    console.log('🔄 Closing server...')
    
    server.close(() => {
      console.log('✅ Server closed')
      resolve()
    })

    // Force close after 30 seconds
    setTimeout(() => {
      console.log('⏱️  Force closing server after timeout')
      server.closeAllConnections?.()
      resolve()
    }, 30000)
  })
}

/**
 * CLI entrypoint
 */
if (require.main === module) {
  startMCPServer().catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
}
