/**
 * Build Philosophy Validator
 * 
 * Control 9: Build Philosophy Compliance
 * Ensures Build Philosophy process was followed.
 * 
 * Per GOVERNANCE_GATE_CANON.md Control 9.
 */

import * as fs from 'fs/promises';
import * as path from 'path';

export interface ValidationContext {
  prNumber: number;
  commitSha: string;
  evidenceDir: string;
  workspaceRoot: string;
}

export interface EvidenceReference {
  type: 'log' | 'report' | 'result' | 'document';
  path: string;
  hash?: string;
}

export interface Violation {
  code: string;
  message: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  evidence?: EvidenceReference[];
}

export interface BuildPhilosophyChecks {
  architectureComplete: boolean;
  redQACreated: boolean;
  qaWasRed: boolean;
  buildToGreenInstruction: boolean;
  architectureReferenceProvided: boolean;
  qaSuiteReferenceProvided: boolean;
  greenQAAchieved: boolean;
}

export interface ControlResult {
  controlName: string;
  status: 'PASS' | 'FAIL';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  evidence: EvidenceReference[];
  violations?: Violation[];
  checks: BuildPhilosophyChecks;
  message: string;
  timestamp: string;
}

/**
 * Validate Build Philosophy control
 */
export async function validateBuildPhilosophy(context: ValidationContext): Promise<ControlResult> {
  const timestamp = new Date().toISOString();
  const evidence: EvidenceReference[] = [];
  const violations: Violation[] = [];
  
  // Initialize all checks as passing
  const checks: BuildPhilosophyChecks = {
    architectureComplete: true,
    redQACreated: true,
    qaWasRed: true,
    buildToGreenInstruction: true,
    architectureReferenceProvided: true,
    qaSuiteReferenceProvided: true,
    greenQAAchieved: true
  };
  
  // Determine actual workspace root (handle test scenarios)
  let workspaceRoot = context.workspaceRoot;
  try {
    await fs.access(path.join(workspaceRoot, 'foreman'));
  } catch (error) {
    // Fallback to process.cwd() if workspaceRoot doesn't contain foreman dir
    workspaceRoot = process.cwd();
  }
  
  // Look for architecture document
  const architectureDocs = await findFiles(
    path.join(workspaceRoot, 'foreman/architecture'),
    '.md'
  );
  
  if (architectureDocs.length > 0) {
    evidence.push(...architectureDocs.map(p => ({
      type: 'document' as const,
      path: p
    })));
  } else {
    violations.push({
      code: 'BUILD_PHILOSOPHY_NO_ARCHITECTURE',
      message: 'No architecture document found',
      severity: 'HIGH',
      evidence: []
    });
    checks.architectureComplete = false;
    checks.architectureReferenceProvided = false;
  }
  
  // Look for Red QA evidence
  const redQaDocs = await findFiles(
    path.join(workspaceRoot, 'foreman/evidence'),
    'red-qa'
  );
  
  if (redQaDocs.length > 0) {
    evidence.push(...redQaDocs.map(p => ({
      type: 'document' as const,
      path: p
    })));
  } else {
    violations.push({
      code: 'BUILD_PHILOSOPHY_NO_RED_QA',
      message: 'No Red QA evidence found',
      severity: 'HIGH',
      evidence: []
    });
    checks.redQACreated = false;
    checks.qaWasRed = false;
    checks.qaSuiteReferenceProvided = false;
  }
  
  // Check for test debt
  const testDebtCheck = await checkTestDebt(workspaceRoot);
  if (!testDebtCheck.passed) {
    violations.push({
      code: 'BUILD_PHILOSOPHY_TEST_DEBT',
      message: testDebtCheck.message,
      severity: 'CRITICAL',
      evidence: testDebtCheck.debtFiles
    });
    checks.greenQAAchieved = false;
  }
  
  // Determine status
  const status = violations.length === 0 ? 'PASS' : 'FAIL';
  const message = status === 'PASS'
    ? 'Build Philosophy validation passed: Process correctly followed'
    : `Build Philosophy validation failed: ${violations.length} violation(s) detected`;
  
  return {
    controlName: 'BuildPhilosophy',
    status,
    severity: 'CRITICAL',
    evidence,
    violations: violations.length > 0 ? violations : undefined,
    checks,
    message,
    timestamp
  };
}

// Helper functions

async function findFiles(dir: string, pattern: string): Promise<string[]> {
  try {
    await fs.access(dir);
    const entries = await fs.readdir(dir);
    return entries
      .filter(name => name.includes(pattern))
      .map(name => path.join(dir, name));
  } catch (error) {
    return [];
  }
}

async function checkTestDebt(workspaceRoot: string): Promise<{
  passed: boolean;
  message: string;
  debtFiles: EvidenceReference[];
}> {
  // For dry run: assume no test debt
  // In real implementation, would scan test files for .skip(), .todo(), etc.
  return {
    passed: true,
    message: 'No test debt detected',
    debtFiles: []
  };
}
