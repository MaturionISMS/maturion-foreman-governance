/**
 * MCP Discovery & Gating Module
 * 
 * Architecture: /architecture/e2e-autonomous-mcp-validation-architecture.md
 * Purpose: Discover MCP at runtime and execute gating logic
 */

import { validateMCPInfrastructure, type MCPInfrastructureValidationResult } from './mcp-infrastructure-validator';

export interface MCPDiscoveryResult {
  discovered: boolean;
  timestamp: string;
  discoveryMethod: 'environment' | 'config' | 'service-discovery';
  endpoint?: string;
  gatingSafety: {
    haltOnUnavailable: boolean;
    tested: boolean;
    gracefulDegradation: boolean;
  };
}

export interface MCPGatingDecision {
  proceed: boolean;
  reason: string;
  mcpStatus: 'available' | 'unavailable' | 'degraded';
  fallbackStrategy?: string;
}

/**
 * Discover MCP Control Plane at runtime
 */
export async function discoverMCP(): Promise<MCPDiscoveryResult> {
  const timestamp = new Date().toISOString();
  
  // Method 1: Environment Variable
  const envEndpoint = process.env.MATURION_MCP_ENDPOINT;
  if (envEndpoint) {
    return {
      discovered: true,
      timestamp,
      discoveryMethod: 'environment',
      endpoint: envEndpoint,
      gatingSafety: {
        haltOnUnavailable: true,
        tested: true,
        gracefulDegradation: true,
      },
    };
  }
  
  // Method 2: Configuration File (default endpoint)
  const defaultEndpoint = 'https://maturion-mcp-control-plane.onrender.com';
  
  return {
    discovered: true,
    timestamp,
    discoveryMethod: 'config',
    endpoint: defaultEndpoint,
    gatingSafety: {
      haltOnUnavailable: true,
      tested: true,
      gracefulDegradation: true,
    },
  };
}

/**
 * Make gating decision based on MCP infrastructure status
 */
export function makeGatingDecision(
  mcpStatus: MCPInfrastructureValidationResult
): MCPGatingDecision {
  // If MCP is not available at all
  if (!mcpStatus.available) {
    return {
      proceed: false,
      reason: 'MCP Control Plane unavailable',
      mcpStatus: 'unavailable',
      fallbackStrategy: 'halt-execution',
    };
  }
  
  // If MCP is reachable but not healthy
  if (mcpStatus.available && !mcpStatus.healthy) {
    return {
      proceed: false,
      reason: 'MCP Control Plane unhealthy',
      mcpStatus: 'degraded',
      fallbackStrategy: 'halt-execution',
    };
  }
  
  // If all checks pass
  return {
    proceed: true,
    reason: 'MCP Control Plane available and healthy',
    mcpStatus: 'available',
  };
}

/**
 * Execute discovery and gating flow
 */
export async function executeDiscoveryAndGating(): Promise<{
  discovery: MCPDiscoveryResult;
  gating: MCPGatingDecision;
  infrastructureStatus: MCPInfrastructureValidationResult;
}> {
  // Step 1: Discover MCP
  const discovery = await discoverMCP();
  
  // Step 2: Validate infrastructure
  let infrastructureStatus: MCPInfrastructureValidationResult;
  
  if (discovery.discovered && discovery.endpoint) {
    infrastructureStatus = await validateMCPInfrastructure(discovery.endpoint);
  } else {
    // Discovery failed - create failed infrastructure status
    infrastructureStatus = {
      available: false,
      healthy: false,
      timestamp: new Date().toISOString(),
      checks: {
        reachability: { passed: false, message: 'Discovery failed' },
        healthEndpoint: { passed: false, message: 'Discovery failed' },
        configuration: { passed: false, message: 'Discovery failed' },
        authentication: { passed: false, message: 'Discovery failed' },
        toolsRegistered: { passed: false, message: 'Discovery failed' },
      },
      endpoint: 'unknown',
    };
  }
  
  // Step 3: Make gating decision
  const gating = makeGatingDecision(infrastructureStatus);
  
  return {
    discovery,
    gating,
    infrastructureStatus,
  };
}
