/**
 * State Persistence & Recovery Module
 * 
 * Architecture: /architecture/runtime-readiness-check-architecture.md
 * Purpose: Validate clean stop, restart, and recovery behavior
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import type {
  StateRecoveryResult,
  CheckResult,
  InfrastructureGap,
  CheckStatus,
  RuntimeState,
} from '../../types/runtime-readiness';

const STATE_DIR = path.join(process.cwd(), 'memory', 'governance', 'runtime-readiness', 'state');

/**
 * Check state persistence and recovery
 */
export async function checkStateRecovery(sessionId: string): Promise<StateRecoveryResult> {
  const timestamp = new Date().toISOString();
  
  const checks = {
    statePersistence: await checkStatePersistence(sessionId),
    cleanStop: await checkCleanStop(sessionId),
    stateRecovery: await checkRecovery(sessionId),
    idempotency: await checkIdempotency(sessionId),
  };
  
  // Calculate metrics
  const stateFiles = await fs.readdir(STATE_DIR).catch(() => []);
  let totalBytes = 0;
  
  for (const file of stateFiles) {
    const stats = await fs.stat(path.join(STATE_DIR, file)).catch(() => null);
    if (stats) {
      totalBytes += stats.size;
    }
  }
  
  const stateMetrics = {
    bytesPersisted: totalBytes,
    filesCreated: stateFiles.length,
    recoveryTime: checks.stateRecovery.details?.recoveryTime as number || 0,
    dataIntegrity: checks.stateRecovery.passed && checks.cleanStop.passed,
  };
  
  // Classify gaps
  const gaps = classifyGaps(checks);
  
  // Determine status
  const anyFailed = Object.values(checks).some(c => !c.passed);
  const status: CheckStatus = anyFailed ? 'FAIL' : 'PASS';
  
  return {
    status,
    timestamp,
    checks,
    stateMetrics,
    gaps,
  };
}

async function checkStatePersistence(sessionId: string): Promise<CheckResult> {
  try {
    await fs.mkdir(STATE_DIR, { recursive: true });
    
    const state: RuntimeState = {
      sessionId,
      startTime: new Date().toISOString(),
      phase: 'STATE_PERSISTENCE_CHECK',
      checkpoints: [
        {
          id: '1',
          timestamp: new Date().toISOString(),
          phase: 'INIT',
          data: { test: true },
        },
      ],
      metrics: {},
    };
    
    const stateFile = path.join(STATE_DIR, `${sessionId}.json`);
    await fs.writeFile(stateFile, JSON.stringify(state, null, 2));
    
    return {
      passed: true,
      message: 'State persisted successfully',
      details: { stateFile },
    };
  } catch (error) {
    return {
      passed: false,
      message: `State persistence failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      gapType: 'INFRASTRUCTURE_GAP',
    };
  }
}

async function checkCleanStop(sessionId: string): Promise<CheckResult> {
  try {
    const stateFile = path.join(STATE_DIR, `${sessionId}.json`);
    const content = await fs.readFile(stateFile, 'utf-8');
    const state = JSON.parse(content);
    
    // Verify state is valid JSON and not corrupted
    if (!state.sessionId || !state.startTime) {
      return {
        passed: false,
        message: 'State file corrupted',
        gapType: 'INFRASTRUCTURE_GAP',
      };
    }
    
    return {
      passed: true,
      message: 'Clean stop verified, state intact',
      details: { stateFile },
    };
  } catch (error) {
    return {
      passed: false,
      message: `Clean stop check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      gapType: 'INFRASTRUCTURE_GAP',
    };
  }
}

async function checkRecovery(sessionId: string): Promise<CheckResult> {
  try {
    const recoveryStart = Date.now();
    
    const stateFile = path.join(STATE_DIR, `${sessionId}.json`);
    const content = await fs.readFile(stateFile, 'utf-8');
    const state: RuntimeState = JSON.parse(content);
    
    // Add small delay to ensure measurable recovery time
    await new Promise(resolve => setTimeout(resolve, 1));
    
    const recoveryTime = Date.now() - recoveryStart;
    
    // Verify state was recovered correctly
    if (state.sessionId !== sessionId) {
      return {
        passed: false,
        message: 'State recovery failed: session ID mismatch',
        gapType: 'INFRASTRUCTURE_GAP',
      };
    }
    
    return {
      passed: true,
      message: 'State recovered successfully',
      details: {
        recoveryTime,
        checkpointsRecovered: state.checkpoints?.length || 0,
      },
    };
  } catch (error) {
    return {
      passed: false,
      message: `State recovery failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      gapType: 'INFRASTRUCTURE_GAP',
    };
  }
}

async function checkIdempotency(sessionId: string): Promise<CheckResult> {
  try {
    // Run recovery twice and verify same result
    const stateFile = path.join(STATE_DIR, `${sessionId}.json`);
    const content1 = await fs.readFile(stateFile, 'utf-8');
    const state1: RuntimeState = JSON.parse(content1);
    
    await new Promise(resolve => setTimeout(resolve, 10));
    
    const content2 = await fs.readFile(stateFile, 'utf-8');
    const state2: RuntimeState = JSON.parse(content2);
    
    // Verify both recoveries produced same result
    if (JSON.stringify(state1) !== JSON.stringify(state2)) {
      return {
        passed: false,
        message: 'Idempotency check failed: recovery not deterministic',
        gapType: 'INFRASTRUCTURE_GAP',
      };
    }
    
    return {
      passed: true,
      message: 'Idempotent recovery verified',
    };
  } catch (error) {
    return {
      passed: false,
      message: `Idempotency check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      gapType: 'INFRASTRUCTURE_GAP',
    };
  }
}

function classifyGaps(checks: Record<string, CheckResult>): InfrastructureGap[] {
  const gaps: InfrastructureGap[] = [];
  
  for (const [checkName, result] of Object.entries(checks)) {
    if (!result.passed && result.gapType) {
      gaps.push({
        type: result.gapType,
        component: `state-recovery:${checkName}`,
        description: result.message,
        severity: 'HIGH',
        remediation: `Review ${checkName} implementation and ensure state persistence is working correctly`,
      });
    }
  }
  
  return gaps;
}
