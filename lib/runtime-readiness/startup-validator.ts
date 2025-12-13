/**
 * Startup Validation Module
 * 
 * Architecture: /architecture/runtime-readiness-check-architecture.md
 * Purpose: Validate clean startup with no manual intervention
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import type {
  StartupValidationResult,
  CheckResult,
  InfrastructureGap,
  CheckStatus,
} from '../../types/runtime-readiness';

const STATE_DIR = path.join(process.cwd(), 'memory', 'governance', 'runtime-readiness', 'state');

// Configuration constants
const MIN_GITHUB_TOKEN_LENGTH = 20; // Minimum valid GitHub token length

/**
 * Validate all required environment variables
 */
function checkEnvironmentVariables(): CheckResult {
  // Check for critical environment variables
  const requiredVars: string[] = [];
  const optionalVars = ['GITHUB_TOKEN', 'OPENAI_API_KEY', 'MCP_SERVER_URL'];
  
  const missingRequired = requiredVars.filter(v => !process.env[v]);
  const presentOptional = optionalVars.filter(v => process.env[v]);
  
  if (missingRequired.length > 0) {
    return {
      passed: false,
      message: `Missing required environment variables: ${missingRequired.join(', ')}`,
      gapType: 'CONFIG_GAP',
      details: {
        missing: missingRequired,
        present: presentOptional,
      },
    };
  }
  
  return {
    passed: true,
    message: `Environment variables validated. ${presentOptional.length} optional variables present.`,
    details: {
      optionalPresent: presentOptional,
    },
  };
}

/**
 * Check MCP server connectivity (optional)
 */
async function checkMCPConnectivity(): Promise<CheckResult> {
  const mcpServerUrl = process.env.MCP_SERVER_URL;
  
  if (!mcpServerUrl) {
    return {
      passed: true,
      message: 'MCP server not configured (optional)',
      details: {
        configured: false,
      },
    };
  }
  
  try {
    // In a real implementation, this would attempt to connect to MCP
    // For now, we'll just check if the URL is valid
    new URL(mcpServerUrl);
    
    return {
      passed: true,
      message: 'MCP server URL is valid',
      details: {
        configured: true,
        url: mcpServerUrl.replace(/\/\/.*@/, '//*****@'), // Sanitize credentials
      },
    };
  } catch (error) {
    return {
      passed: false,
      message: `MCP server URL invalid: ${error instanceof Error ? error.message : 'Unknown error'}`,
      gapType: 'CONFIG_GAP',
      details: {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}

/**
 * Validate GitHub authentication (optional)
 */
async function checkGitHubAuth(): Promise<CheckResult> {
  const githubToken = process.env.GITHUB_TOKEN;
  
  if (!githubToken) {
    return {
      passed: true,
      message: 'GitHub token not configured (optional for some operations)',
      details: {
        configured: false,
      },
    };
  }
  
  // Basic token format validation
  if (githubToken.length < MIN_GITHUB_TOKEN_LENGTH) {
    return {
      passed: false,
      message: 'GitHub token appears invalid (too short)',
      gapType: 'PERMISSION_GAP',
      details: {
        tokenLength: githubToken.length,
        minimumRequired: MIN_GITHUB_TOKEN_LENGTH,
      },
    };
  }
  
  return {
    passed: true,
    message: 'GitHub token present and appears valid',
    details: {
      configured: true,
      tokenLength: githubToken.length,
    },
  };
}

/**
 * Check CI orchestration availability
 */
async function checkCIOrchestration(): Promise<CheckResult> {
  // Check if running in CI environment
  const isCI = !!process.env.CI || !!process.env.GITHUB_ACTIONS;
  
  return {
    passed: true,
    message: isCI ? 'Running in CI environment' : 'Not in CI environment (local execution)',
    details: {
      isCI,
      ciEnvironment: process.env.CI || process.env.GITHUB_ACTIONS || 'none',
    },
  };
}

/**
 * Verify file system permissions
 */
async function checkFileSystemPermissions(): Promise<CheckResult> {
  try {
    // Ensure state directory exists and is writable
    await fs.mkdir(STATE_DIR, { recursive: true });
    
    // Try to write a test file
    const testFile = path.join(STATE_DIR, '.test-write');
    await fs.writeFile(testFile, 'test');
    await fs.rm(testFile);
    
    return {
      passed: true,
      message: 'State directory is writable',
      details: {
        stateDir: STATE_DIR,
      },
    };
  } catch (error) {
    return {
      passed: false,
      message: `File system permission error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      gapType: 'PERMISSION_GAP',
      details: {
        stateDir: STATE_DIR,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}

/**
 * Validate configuration integrity
 */
async function checkConfigurationIntegrity(): Promise<CheckResult> {
  try {
    // Check for package.json
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    await fs.access(packageJsonPath);
    
    // Check for critical directories
    const criticalDirs = ['lib', 'tests', 'memory'];
    const missingDirs: string[] = [];
    
    for (const dir of criticalDirs) {
      const dirPath = path.join(process.cwd(), dir);
      try {
        await fs.access(dirPath);
      } catch {
        missingDirs.push(dir);
      }
    }
    
    if (missingDirs.length > 0) {
      return {
        passed: false,
        message: `Missing critical directories: ${missingDirs.join(', ')}`,
        gapType: 'CONFIG_GAP',
        details: {
          missingDirs,
        },
      };
    }
    
    return {
      passed: true,
      message: 'Configuration integrity validated',
      details: {
        packageJson: 'present',
        criticalDirs: 'all present',
      },
    };
  } catch (error) {
    return {
      passed: false,
      message: `Configuration integrity check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      gapType: 'CONFIG_GAP',
      details: {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}

/**
 * Classify gaps from check results
 */
function classifyGaps(checks: Record<string, CheckResult>): InfrastructureGap[] {
  const gaps: InfrastructureGap[] = [];
  
  for (const [checkName, result] of Object.entries(checks)) {
    if (!result.passed && result.gapType) {
      gaps.push({
        type: result.gapType,
        component: checkName,
        description: result.message,
        severity: result.gapType === 'PERMISSION_GAP' ? 'HIGH' : 'MEDIUM',
        remediation: getRemediation(checkName, result),
      });
    }
  }
  
  return gaps;
}

/**
 * Get remediation advice for a failed check
 */
function getRemediation(checkName: string, result: CheckResult): string {
  switch (checkName) {
    case 'environmentVariables':
      return 'Set missing environment variables in .env file or system environment';
    case 'mcpConnectivity':
      return 'Verify MCP_SERVER_URL is set and points to a valid MCP server';
    case 'githubAuth':
      return 'Set GITHUB_TOKEN with a valid personal access token or fine-grained token';
    case 'fileSystemPermissions':
      return 'Ensure the application has write permissions to the memory directory';
    case 'configurationIntegrity':
      return 'Verify all required directories and configuration files are present';
    default:
      return 'Review error details and consult documentation';
  }
}

/**
 * Main startup validation function
 */
export async function validateStartup(): Promise<StartupValidationResult> {
  const timestamp = new Date().toISOString();
  
  // Run all checks
  const checks = {
    environmentVariables: checkEnvironmentVariables(),
    mcpConnectivity: await checkMCPConnectivity(),
    githubAuth: await checkGitHubAuth(),
    ciOrchestration: await checkCIOrchestration(),
    fileSystemPermissions: await checkFileSystemPermissions(),
    configurationIntegrity: await checkConfigurationIntegrity(),
  };
  
  // Classify gaps
  const gaps = classifyGaps(checks);
  
  // Determine overall status
  // Only fail if there are actual failures that would block execution
  const criticalFailures = Object.values(checks).filter(
    check => !check.passed && check.gapType === 'CONFIG_GAP'
  );
  
  const status: CheckStatus = criticalFailures.length === 0 ? 'PASS' : 'FAIL';
  
  return {
    status,
    timestamp,
    checks,
    gaps,
  };
}
