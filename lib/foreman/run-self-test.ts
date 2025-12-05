/**
 * Run Self Test
 * Performs self-diagnostics on the Foreman system
 */

import OpenAI from 'openai'
import { github } from '../github/client'

export interface SelfTestResult {
  success: boolean
  message: string
  checks: SelfTestCheck[]
  timestamp: Date
}

export interface SelfTestCheck {
  name: string
  status: 'passed' | 'failed' | 'warning'
  message?: string
}

/**
 * Run complete self-test suite
 * @returns Self-test results
 */
export async function runSelfTest(): Promise<SelfTestResult> {
  console.log('Running Foreman self-test...')
  
  const checks: SelfTestCheck[] = []
  
  // Check 1: Environment Variables
  checks.push(await checkEnvironmentVariables())
  
  // Check 2: GitHub API Connection
  checks.push(await checkGitHubAPI())
  
  // Check 3: OpenAI API Connection
  checks.push(await checkOpenAIAPI())
  
  // Check 4: System Configuration
  checks.push(await checkSystemConfiguration())
  
  // Determine overall success
  const allPassed = checks.every(check => check.status === 'passed')
  const anyFailed = checks.some(check => check.status === 'failed')
  const hasWarnings = checks.some(check => check.status === 'warning')
  
  let message = ''
  if (allPassed) {
    message = 'Self-test OK - all checks passed ✅'
  } else if (anyFailed) {
    message = 'Self-test FAILED - one or more checks failed ❌'
  } else if (hasWarnings) {
    message = 'Self-test OK with warnings ⚠️'
  }
  
  return {
    success: !anyFailed,
    message,
    checks,
    timestamp: new Date()
  }
}

/**
 * Check environment variables
 */
async function checkEnvironmentVariables(): Promise<SelfTestCheck> {
  const requiredVars = [
    'OPENAI_API_KEY',
    'GITHUB_TOKEN'
  ]
  
  const optionalVars = [
    'GITHUB_APP_ID',
    'GITHUB_APP_PRIVATE_KEY',
    'GITHUB_APP_INSTALLATION_ID',
    'GITHUB_WEBHOOK_SECRET',
    'MATURION_ORG_ID',
    'MATURION_AUTONOMOUS_MODE'
  ]
  
  const missing: string[] = []
  const optional_missing: string[] = []
  
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName)
    }
  }
  
  for (const varName of optionalVars) {
    if (!process.env[varName]) {
      optional_missing.push(varName)
    }
  }
  
  if (missing.length > 0) {
    return {
      name: 'Environment Variables',
      status: 'failed',
      message: `Missing required environment variables: ${missing.join(', ')}`
    }
  } else if (optional_missing.length > 0) {
    return {
      name: 'Environment Variables',
      status: 'warning',
      message: `Optional environment variables not set: ${optional_missing.join(', ')}`
    }
  } else {
    return {
      name: 'Environment Variables',
      status: 'passed',
      message: 'All required environment variables are set'
    }
  }
}

/**
 * Check GitHub API connection
 */
async function checkGitHubAPI(): Promise<SelfTestCheck> {
  try {
    // The GitHub client uses GITHUB_TOKEN
    if (!process.env.GITHUB_TOKEN) {
      // Check if GitHub App credentials are available as alternative
      const hasAppCreds = process.env.GITHUB_APP_ID && process.env.GITHUB_APP_PRIVATE_KEY
      
      if (hasAppCreds) {
        return {
          name: 'GitHub API Connection',
          status: 'warning',
          message: 'GitHub App credentials configured but GITHUB_TOKEN not set (client requires GITHUB_TOKEN)'
        }
      }
      
      return {
        name: 'GitHub API Connection',
        status: 'failed',
        message: 'GITHUB_TOKEN not configured'
      }
    }
    
    // Simple API call to verify connection
    const { data: user } = await github.rest.users.getAuthenticated()
    
    return {
      name: 'GitHub API Connection',
      status: 'passed',
      message: `Connected to GitHub as: ${user.login}`
    }
  } catch (error) {
    return {
      name: 'GitHub API Connection',
      status: 'failed',
      message: `GitHub API connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

/**
 * Check OpenAI API connection
 */
async function checkOpenAIAPI(): Promise<SelfTestCheck> {
  try {
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      return {
        name: 'OpenAI API Connection',
        status: 'failed',
        message: 'OpenAI API key not configured'
      }
    }
    
    // Create OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
    
    // Simple API call to verify connection (list models)
    const models = await openai.models.list()
    
    return {
      name: 'OpenAI API Connection',
      status: 'passed',
      message: `Connected to OpenAI API (${models.data.length} models available)`
    }
  } catch (error) {
    return {
      name: 'OpenAI API Connection',
      status: 'failed',
      message: `OpenAI API connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

/**
 * Check system configuration
 */
async function checkSystemConfiguration(): Promise<SelfTestCheck> {
  const warnings: string[] = []
  
  // Check autonomous mode setting
  const autonomousMode = process.env.MATURION_AUTONOMOUS_MODE === 'true'
  if (!autonomousMode) {
    warnings.push('Autonomous mode is disabled')
  }
  
  // Check organization ID
  if (!process.env.MATURION_ORG_ID) {
    warnings.push('Organization ID not set')
  }
  
  // Check webhook secret
  if (!process.env.GITHUB_WEBHOOK_SECRET) {
    warnings.push('GitHub webhook secret not configured')
  }
  
  if (warnings.length > 0) {
    return {
      name: 'System Configuration',
      status: 'warning',
      message: warnings.join(', ')
    }
  }
  
  return {
    name: 'System Configuration',
    status: 'passed',
    message: `System configured correctly (Autonomous mode: ${autonomousMode ? 'ON' : 'OFF'})`
  }
}

/**
 * Run a specific self-test check
 * @param checkName - Name of the check to run
 * @returns Check result
 */
export async function runSelfTestCheck(checkName: string): Promise<SelfTestCheck> {
  // TODO: Implement individual check execution
  console.log('Running self-test check:', checkName)
  
  return {
    name: checkName,
    status: 'passed',
    message: 'Check passed (placeholder)'
  }
}

/**
 * Validate system configuration
 * @returns Validation result
 */
export function validateSystemConfig(): {
  valid: boolean
  errors: string[]
} {
  // TODO: Implement system configuration validation
  console.log('Validating system configuration')
  
  return {
    valid: true,
    errors: []
  }
}
