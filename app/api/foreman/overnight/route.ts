/**
 * Overnight Execution API Endpoint
 * 
 * Allows manual triggering of the overnight execution cycle.
 * In production, this would be triggered by a cron job or scheduled task.
 */

import { NextRequest, NextResponse } from 'next/server';
import { runOvernightExecution, getOvernightExecutionConfig } from '@/lib/foreman/overnight-execution';
import { getQuotaUsage } from '@/lib/foreman/model-escalation';
import { checkLocalBuilderHealth } from '@/lib/foreman/desktop-sync';
import { getGovernanceStats } from '@/lib/foreman/memory/governance-memory';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { owner, repo, config } = body;

    if (!owner || !repo) {
      return NextResponse.json(
        { error: 'Missing required parameters: owner, repo' },
        { status: 400 }
      );
    }

    console.log(`Starting overnight execution for ${owner}/${repo}...`);

    // Run the overnight execution
    const result = await runOvernightExecution(owner, repo, config);

    return NextResponse.json({
      success: true,
      run: result,
    });
  } catch (error) {
    console.error('Overnight execution error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Return status and configuration
    const config = getOvernightExecutionConfig();
    const quotaUsage = getQuotaUsage();
    const localBuilderHealth = await checkLocalBuilderHealth();
    const governanceStats = getGovernanceStats();

    return NextResponse.json({
      success: true,
      config,
      status: {
        quotaUsage,
        localBuilderHealth,
        governanceStats,
      },
    });
  } catch (error) {
    console.error('Failed to get overnight execution status:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
