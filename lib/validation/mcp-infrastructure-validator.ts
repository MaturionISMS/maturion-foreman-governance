/**
 * MCP Infrastructure Validator
 * 
 * Architecture: /architecture/e2e-autonomous-mcp-validation-architecture.md
 * Purpose: Validate MCP Control Plane infrastructure availability
 */

export interface CheckResult {
  passed: boolean;
  message: string;
  details?: Record<string, unknown>;
  error?: string;
}

export interface MCPInfrastructureValidationResult {
  available: boolean;
  healthy: boolean;
  timestamp: string;
  checks: {
    reachability: CheckResult;
    healthEndpoint: CheckResult;
    configuration: CheckResult;
    authentication: CheckResult;
    toolsRegistered: CheckResult;
  };
  endpoint: string;
  version?: string;
}

/**
 * Validate MCP Control Plane infrastructure
 */
export async function validateMCPInfrastructure(
  endpoint: string
): Promise<MCPInfrastructureValidationResult> {
  const timestamp = new Date().toISOString();
  
  // Initialize all checks
  const checks = {
    reachability: await checkReachability(endpoint),
    healthEndpoint: await checkHealthEndpoint(endpoint),
    configuration: await checkConfiguration(endpoint),
    authentication: await checkAuthentication(endpoint),
    toolsRegistered: await checkToolsRegistered(endpoint),
  };
  
  // Determine overall availability and health
  const available = checks.reachability.passed;
  const healthy = available && 
                  checks.healthEndpoint.passed &&
                  checks.configuration.passed &&
                  checks.authentication.passed &&
                  checks.toolsRegistered.passed;
  
  // Extract version if available
  const version = checks.healthEndpoint.details?.version as string | undefined;
  
  return {
    available,
    healthy,
    timestamp,
    checks,
    endpoint,
    version,
  };
}

/**
 * Check if MCP endpoint is reachable
 */
async function checkReachability(endpoint: string): Promise<CheckResult> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    
    // Use GET on /health instead of HEAD on root to ensure better compatibility
    const healthUrl = `${endpoint}/health`;
    const response = await fetch(healthUrl, {
      method: 'GET',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      return {
        passed: true,
        message: `MCP endpoint ${endpoint} is reachable`,
        details: {
          status: response.status,
          statusText: response.statusText,
        },
      };
    } else {
      return {
        passed: false,
        message: `MCP endpoint returned ${response.status}`,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }
  } catch (error) {
    return {
      passed: false,
      message: `Failed to reach MCP endpoint ${endpoint}`,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Check MCP health endpoint
 */
async function checkHealthEndpoint(endpoint: string): Promise<CheckResult> {
  try {
    const healthUrl = `${endpoint}/health`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(healthUrl, {
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      return {
        passed: false,
        message: `Health endpoint returned ${response.status}`,
        error: `HTTP ${response.status}`,
      };
    }
    
    const data = await response.json();
    
    if (data.ok === true) {
      return {
        passed: true,
        message: 'MCP health endpoint is healthy',
        details: {
          ok: data.ok,
          service: data.service,
          timestamp: data.timestamp,
          version: data.version,
        },
      };
    } else {
      return {
        passed: false,
        message: 'MCP health endpoint reports unhealthy',
        details: data,
      };
    }
  } catch (error) {
    return {
      passed: false,
      message: 'Failed to check health endpoint',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Check MCP configuration
 */
async function checkConfiguration(endpoint: string): Promise<CheckResult> {
  try {
    const healthUrl = `${endpoint}/health`;
    const response = await fetch(healthUrl);
    
    if (!response.ok) {
      return {
        passed: false,
        message: 'Cannot verify configuration (health endpoint failed)',
      };
    }
    
    const data = await response.json();
    
    if (data.mcp?.configured === true) {
      return {
        passed: true,
        message: 'MCP configuration is loaded',
        details: {
          configured: data.mcp.configured,
        },
      };
    } else {
      return {
        passed: false,
        message: 'MCP configuration not loaded',
        details: data.mcp,
      };
    }
  } catch (error) {
    return {
      passed: false,
      message: 'Failed to check configuration',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Check MCP authentication
 */
async function checkAuthentication(endpoint: string): Promise<CheckResult> {
  try {
    const healthUrl = `${endpoint}/health`;
    const response = await fetch(healthUrl);
    
    if (!response.ok) {
      return {
        passed: false,
        message: 'Cannot verify authentication (health endpoint failed)',
      };
    }
    
    const data = await response.json();
    
    if (data.mcp?.tokenPresent === true && data.mcp?.initialized === true) {
      return {
        passed: true,
        message: 'MCP authentication is initialized',
        details: {
          tokenPresent: data.mcp.tokenPresent,
          initialized: data.mcp.initialized,
        },
      };
    } else {
      return {
        passed: false,
        message: 'MCP authentication not initialized',
        details: data.mcp,
      };
    }
  } catch (error) {
    return {
      passed: false,
      message: 'Failed to check authentication',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Check MCP tools registration
 */
async function checkToolsRegistered(endpoint: string): Promise<CheckResult> {
  try {
    const healthUrl = `${endpoint}/health`;
    const response = await fetch(healthUrl);
    
    if (!response.ok) {
      return {
        passed: false,
        message: 'Cannot verify tools (health endpoint failed)',
      };
    }
    
    const data = await response.json();
    
    // If MCP is available and initialized, tools should be registered
    if (data.mcp?.available === true) {
      return {
        passed: true,
        message: 'MCP tools are registered and available',
        details: {
          available: data.mcp.available,
        },
      };
    } else {
      return {
        passed: false,
        message: 'MCP tools not registered',
        details: data.mcp,
      };
    }
  } catch (error) {
    return {
      passed: false,
      message: 'Failed to check tools registration',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
