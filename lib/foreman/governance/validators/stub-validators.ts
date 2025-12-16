/**
 * Stub validators for CS2-CS6 and GSR
 * 
 * These are placeholder implementations that are FAIL-CLOSED.
 * Per GOVERNANCE_GATE_CANON.md: Validators must be fail-closed.
 * Incomplete infrastructure = FAIL, not PASS.
 * 
 * Full implementations to be completed in future iterations.
 */

export interface ValidationContext {
  prNumber: number;
  commitSha: string;
  evidenceDir?: string;
  logsDir?: string;
  workspaceRoot?: string;
  changedFiles?: string[];
}

export interface ControlResult {
  controlName: string;
  status: 'PASS' | 'FAIL';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  evidence: any[];
  violations?: any[];
  message: string;
  timestamp: string;
}

export async function validateCS2(context: ValidationContext): Promise<ControlResult> {
  return {
    controlName: 'CS2',
    status: 'FAIL',
    severity: 'CRITICAL',
    evidence: [],
    violations: [{
      code: 'CS2_NOT_IMPLEMENTED',
      message: 'CS2 (Architecture Approval) validation not yet implemented - fail-closed',
      severity: 'CRITICAL'
    }],
    message: 'CS2 (Architecture Approval) validation not yet implemented - fail-closed until complete',
    timestamp: new Date().toISOString()
  };
}

export async function validateCS3(context: ValidationContext): Promise<ControlResult> {
  return {
    controlName: 'CS3',
    status: 'FAIL',
    severity: 'HIGH',
    evidence: [],
    violations: [{
      code: 'CS3_NOT_IMPLEMENTED',
      message: 'CS3 (Incident Feedback) validation not yet implemented - fail-closed',
      severity: 'HIGH'
    }],
    message: 'CS3 (Incident Feedback) validation not yet implemented - fail-closed until complete',
    timestamp: new Date().toISOString()
  };
}

export async function validateCS4(context: ValidationContext): Promise<ControlResult> {
  return {
    controlName: 'CS4',
    status: 'FAIL',
    severity: 'HIGH',
    evidence: [],
    violations: [{
      code: 'CS4_NOT_IMPLEMENTED',
      message: 'CS4 (Compliance Monitoring) validation not yet implemented - fail-closed',
      severity: 'HIGH'
    }],
    message: 'CS4 (Compliance Monitoring) validation not yet implemented - fail-closed until complete',
    timestamp: new Date().toISOString()
  };
}

export async function validateCS5(context: ValidationContext): Promise<ControlResult> {
  return {
    controlName: 'CS5',
    status: 'FAIL',
    severity: 'MEDIUM',
    evidence: [],
    violations: [{
      code: 'CS5_NOT_IMPLEMENTED',
      message: 'CS5 (Performance Enforcement) validation not yet implemented - fail-closed',
      severity: 'MEDIUM'
    }],
    message: 'CS5 (Performance Enforcement) validation not yet implemented - fail-closed until complete',
    timestamp: new Date().toISOString()
  };
}

export async function validateCS6(context: ValidationContext): Promise<ControlResult> {
  return {
    controlName: 'CS6',
    status: 'FAIL',
    severity: 'MEDIUM',
    evidence: [],
    violations: [{
      code: 'CS6_NOT_IMPLEMENTED',
      message: 'CS6 (Execution Boundary) validation not yet implemented - fail-closed',
      severity: 'MEDIUM'
    }],
    message: 'CS6 (Execution Boundary) validation not yet implemented - fail-closed until complete',
    timestamp: new Date().toISOString()
  };
}

export async function validateGSR(context: ValidationContext): Promise<ControlResult> {
  return {
    controlName: 'GSR',
    status: 'FAIL',
    severity: 'CRITICAL',
    evidence: [],
    violations: [{
      code: 'GSR_NOT_IMPLEMENTED',
      message: 'GSR (Governance Supremacy Rule) validation not yet implemented - fail-closed',
      severity: 'CRITICAL'
    }],
    message: 'GSR (Governance Supremacy Rule) validation not yet implemented - fail-closed until complete',
    timestamp: new Date().toISOString()
  };
}
