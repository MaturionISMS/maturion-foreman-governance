/**
 * @jest-environment node
 * 
 * E2E Autonomous MCP Validation - Infrastructure Tests
 * 
 * Architecture: /architecture/e2e-autonomous-mcp-validation-architecture.md
 * Phase: Red QA (Must FAIL initially)
 * 
 * Purpose: Validate MCP Control Plane infrastructure availability
 * Expected Status: RED (failing) - Implementation does not exist yet
 */

import { describe, it, expect } from '@jest/globals';
import {
  validateMCPInfrastructure,
  type MCPInfrastructureValidationResult
} from '@/lib/validation/mcp-infrastructure-validator';

describe('E2E Autonomous MCP Validation - Infrastructure', () => {
  const MCP_ENDPOINT = 'https://maturion-mcp-control-plane.onrender.com';

  it('should validate MCP Control Plane is reachable', async () => {
    const result = await validateMCPInfrastructure(MCP_ENDPOINT);
    
    expect(result).toBeDefined();
    expect(result.checks.reachability.passed).toBe(true);
    expect(result.checks.reachability.message).toContain('reachable');
  });

  it('should validate MCP health endpoint returns 200 OK', async () => {
    const result = await validateMCPInfrastructure(MCP_ENDPOINT);
    
    expect(result.checks.healthEndpoint.passed).toBe(true);
    expect(result.checks.healthEndpoint.details).toHaveProperty('ok', true);
    expect(result.checks.healthEndpoint.details).toHaveProperty('service');
  });

  it('should validate MCP configuration is loaded', async () => {
    const result = await validateMCPInfrastructure(MCP_ENDPOINT);
    
    expect(result.checks.configuration.passed).toBe(true);
    expect(result.checks.configuration.details).toHaveProperty('configured', true);
  });

  it('should validate MCP authentication is initialized', async () => {
    const result = await validateMCPInfrastructure(MCP_ENDPOINT);
    
    expect(result.checks.authentication.passed).toBe(true);
    expect(result.checks.authentication.details).toHaveProperty('tokenPresent', true);
    expect(result.checks.authentication.details).toHaveProperty('initialized', true);
  });

  it('should validate MCP tools are registered', async () => {
    const result = await validateMCPInfrastructure(MCP_ENDPOINT);
    
    expect(result.checks.toolsRegistered.passed).toBe(true);
    expect(result.checks.toolsRegistered.message).toContain('available');
  });

  it('should report MCP as available when all checks pass', async () => {
    const result = await validateMCPInfrastructure(MCP_ENDPOINT);
    
    expect(result.available).toBe(true);
    expect(result.healthy).toBe(true);
    expect(result.timestamp).toBeDefined();
    expect(result.endpoint).toBe(MCP_ENDPOINT);
  });

  it('should report MCP as unavailable when endpoint is wrong', async () => {
    const wrongEndpoint = 'https://invalid-mcp-endpoint.example.com';
    const result = await validateMCPInfrastructure(wrongEndpoint);
    
    expect(result.available).toBe(false);
    expect(result.checks.reachability.passed).toBe(false);
  });

  it('should include error details when validation fails', async () => {
    const wrongEndpoint = 'https://invalid-mcp-endpoint.example.com';
    const result = await validateMCPInfrastructure(wrongEndpoint);
    
    expect(result.checks.reachability.error).toBeDefined();
    expect(result.checks.reachability.message).toContain('Failed');
  });
});
