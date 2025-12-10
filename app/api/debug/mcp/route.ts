/**
 * MCP Diagnostic Endpoint
 * Provides diagnostic information about MCP (Model Context Protocol) configuration
 */

import { NextResponse } from "next/server";

export async function GET() {
  const mcpToken = process.env.GITHUB_MCP_TOKEN;
  const githubToken = process.env.GITHUB_TOKEN;
  
  // Check if MCP token exists
  const mcpTokenPresent = !!mcpToken;
  const githubTokenPresent = !!githubToken;
  
  // Check if tokens are different (they should be)
  const tokensAreDifferent = mcpToken !== githubToken;
  
  // Determine MCP initialization status
  let mcpInitialized = false;
  let mcpStatus = 'NOT_CONFIGURED';
  const errors: string[] = [];
  
  if (!mcpTokenPresent) {
    mcpStatus = 'MISSING_TOKEN';
    errors.push('GITHUB_MCP_TOKEN environment variable is not set');
  } else if (!tokensAreDifferent && githubTokenPresent) {
    mcpStatus = 'WARN_SAME_TOKEN';
    errors.push('GITHUB_MCP_TOKEN is the same as GITHUB_TOKEN (should use dedicated token)');
    mcpInitialized = true; // Still functional but not ideal
  } else {
    mcpStatus = 'READY';
    mcpInitialized = true;
  }
  
  // Determine autonomy impact
  const autonomyEnabled = process.env.FOREMAN_AUTONOMY_ENABLED === 'true';
  const mcpBlockingAutonomy = !mcpInitialized && autonomyEnabled;
  
  return NextResponse.json({
    mcpInitialized,
    mcpStatus,
    tokenPresent: mcpTokenPresent,
    githubTokenPresent,
    tokensAreDifferent,
    autonomyEnabled,
    mcpBlockingAutonomy,
    errors: errors.length > 0 ? errors : undefined,
    message: mcpInitialized 
      ? 'MCP is configured and ready'
      : 'MCP is not properly configured - autonomy may be disabled',
    timestamp: new Date().toISOString()
  });
}
