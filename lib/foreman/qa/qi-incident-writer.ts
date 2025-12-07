/**
 * Quality Integrity Incident Writer (QIEL-7)
 * 
 * Records Quality Integrity (QI) Incidents in Governance Memory.
 * Upon any QA failure, the system must write a QI Incident with:
 * - Error class
 * - Affected subsystem
 * - Source logs
 * - Required architecture update
 * - Required QA update
 * 
 * Foreman uses this for self-evolution.
 * 
 * Per QIC-6: All quality failures must be recorded as QI Incidents
 */

import { writeMemory } from '../memory/storage';
import {
  QualityIntegrityIncident,
  QIIncidentType,
  QISeverity,
} from '@/types/memory';
import * as crypto from 'crypto';

export interface QIIncidentContext {
  incidentType: QIIncidentType;
  severity: QISeverity;
  source: string;
  description: string;
  details: any;
  errorClass?: string;
  affectedSubsystem?: string;
  sourceLogs?: string[];
  architectureUpdateNeeded?: string;
  qaUpdateNeeded?: string;
  buildId?: string;
  sequenceId?: string;
  commitSha?: string;
  branch?: string;
  environment?: string;
}

export interface QIIncidentWriteResult {
  success: boolean;
  incident?: QualityIntegrityIncident;
  error?: string;
}

/**
 * Generate a unique QI Incident ID
 */
function generateQIIncidentId(incidentType: QIIncidentType): string {
  const timestamp = Date.now();
  const hash = crypto.randomBytes(4).toString('hex');
  return `qi-${incidentType}-${timestamp}-${hash}`;
}

/**
 * Determine error class from incident details
 */
function determineErrorClass(incidentType: QIIncidentType, details: any): string {
  switch (incidentType) {
    case 'build_error':
      if (details?.message?.includes('TypeError')) return 'TypeError';
      if (details?.message?.includes('ReferenceError')) return 'ReferenceError';
      if (details?.message?.includes('SyntaxError')) return 'SyntaxError';
      if (details?.message?.includes('Failed to compile')) return 'CompilationError';
      return 'BuildError';
    
    case 'lint_error':
      return 'LintError';
    
    case 'runtime_error':
      if (details?.type) return details.type;
      return 'RuntimeError';
    
    case 'silent_failure':
      if (details?.type) return details.type;
      return 'SilentFailure';
    
    case 'schema_mismatch':
      return 'SchemaMismatch';
    
    case 'deployment_failure':
      return 'DeploymentError';
    
    case 'test_failure':
      return 'TestFailure';
    
    case 'security_violation':
      return 'SecurityViolation';
    
    default:
      return 'UnknownError';
  }
}

/**
 * Determine affected subsystem from source
 */
function determineAffectedSubsystem(source: string): string {
  // Extract subsystem from source path
  if (source.includes('lib/foreman/memory')) return 'memory-fabric';
  if (source.includes('lib/foreman/qa')) return 'qa-system';
  if (source.includes('lib/foreman/projects')) return 'project-lifecycle';
  if (source.includes('lib/foreman/feedback')) return 'feedback-loop';
  if (source.includes('lib/foreman/reasoning')) return 'reasoning-engine';
  if (source.includes('lib/foreman/analytics')) return 'analytics-engine';
  if (source.includes('lib/foreman/governance')) return 'governance';
  if (source.includes('lib/builder')) return 'builder-system';
  if (source.includes('lib/github')) return 'github-integration';
  if (source.includes('app/') || source.includes('components/')) return 'ui-layer';
  
  return 'unknown';
}

/**
 * Generate architecture update recommendation
 */
function generateArchitectureUpdate(
  incidentType: QIIncidentType,
  errorClass: string,
  subsystem: string
): string {
  const updates: string[] = [];

  // Common architecture updates based on incident type
  switch (incidentType) {
    case 'build_error':
      updates.push('Review build pipeline and error handling');
      updates.push('Add pre-build validation for common error patterns');
      break;
    
    case 'lint_error':
      updates.push('Update linting rules or whitelist');
      updates.push('Review code standards in architecture documentation');
      break;
    
    case 'runtime_error':
      updates.push('Add runtime error boundary for affected subsystem');
      updates.push('Implement defensive programming patterns');
      break;
    
    case 'silent_failure':
      updates.push('Add explicit error detection for this failure class');
      updates.push('Update QA checks to detect similar silent failures');
      break;
    
    case 'schema_mismatch':
      updates.push('Standardize schema definitions across engines');
      updates.push('Implement schema versioning and migration strategy');
      break;
    
    case 'deployment_failure':
      updates.push('Review deployment configuration and dependencies');
      updates.push('Add deployment pre-flight checks');
      break;
  }

  return updates.join('; ');
}

/**
 * Generate QA update recommendation
 */
function generateQAUpdate(
  incidentType: QIIncidentType,
  errorClass: string
): string {
  const updates: string[] = [];

  // QA updates based on incident type
  switch (incidentType) {
    case 'build_error':
      updates.push(`Add detection pattern for ${errorClass} in build log parser`);
      updates.push('Increase strictness of build validation');
      break;
    
    case 'lint_error':
      updates.push('Add lint rule enforcement for this error class');
      updates.push('Update allowed-warnings whitelist if needed');
      break;
    
    case 'runtime_error':
      updates.push('Add runtime error detection in test suite');
      updates.push('Implement automated runtime health checks');
      break;
    
    case 'silent_failure':
      updates.push('Create specific detection rule for this silent failure');
      updates.push('Add regression test to prevent recurrence');
      break;
    
    case 'schema_mismatch':
      updates.push('Add automated schema cohesion validation');
      updates.push('Implement schema compatibility checks in CI');
      break;
    
    case 'deployment_failure':
      updates.push('Add deployment simulation to QA suite');
      updates.push('Validate deployment configuration in pre-flight');
      break;
  }

  return updates.join('; ');
}

/**
 * Write a Quality Integrity Incident to Governance Memory
 */
export async function recordQIIncident(
  context: QIIncidentContext
): Promise<QIIncidentWriteResult> {
  try {
    const incidentId = generateQIIncidentId(context.incidentType);
    const timestamp = new Date().toISOString();

    // Determine error class and affected subsystem if not provided
    const errorClass = context.errorClass || determineErrorClass(context.incidentType, context.details);
    const affectedSubsystem = context.affectedSubsystem || determineAffectedSubsystem(context.source);

    // Generate recommendations if not provided
    const architectureUpdateNeeded = context.architectureUpdateNeeded || 
      generateArchitectureUpdate(context.incidentType, errorClass, affectedSubsystem);
    
    const qaUpdateNeeded = context.qaUpdateNeeded || 
      generateQAUpdate(context.incidentType, errorClass);

    // Create the QI Incident
    const incident: QualityIntegrityIncident = {
      id: incidentId,
      timestamp,
      incidentType: context.incidentType,
      severity: context.severity,
      source: context.source,
      description: context.description,
      details: {
        ...context.details,
        errorClass,
        affectedSubsystem,
        sourceLogs: context.sourceLogs || [],
        architectureUpdateNeeded,
        qaUpdateNeeded,
      },
      metadata: {
        buildId: context.buildId,
        sequenceId: context.sequenceId,
        commitSha: context.commitSha,
        branch: context.branch,
        environment: context.environment,
      },
    };

    // Write to Governance Memory
    await writeMemory({
      scope: 'foreman',
      key: `qi-incident-${incidentId}`,
      value: incident,
      tags: [
        'quality-integrity',
        'incident',
        context.incidentType,
        context.severity,
        errorClass,
        affectedSubsystem,
      ],
      createdBy: 'qiel-system',
    });

    console.log(`[QIEL-7] Recorded QI Incident: ${incidentId} - ${context.incidentType} (${context.severity})`);

    return {
      success: true,
      incident,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[QIEL-7] Failed to record QI Incident:`, errorMessage);
    
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Record multiple QI Incidents
 */
export async function recordQIIncidents(
  contexts: QIIncidentContext[]
): Promise<QIIncidentWriteResult[]> {
  const results: QIIncidentWriteResult[] = [];
  
  for (const context of contexts) {
    const result = await recordQIIncident(context);
    results.push(result);
  }
  
  return results;
}

/**
 * Helper: Create QI Incident from build error
 */
export async function recordBuildErrorIncident(
  error: string,
  source: string,
  buildId?: string
): Promise<QIIncidentWriteResult> {
  return recordQIIncident({
    incidentType: 'build_error',
    severity: 'critical',
    source,
    description: `Build error detected: ${error}`,
    details: { error },
    buildId,
  });
}

/**
 * Helper: Create QI Incident from lint error
 */
export async function recordLintErrorIncident(
  error: string,
  source: string,
  buildId?: string
): Promise<QIIncidentWriteResult> {
  return recordQIIncident({
    incidentType: 'lint_error',
    severity: 'high',
    source,
    description: `Lint error detected: ${error}`,
    details: { error },
    buildId,
  });
}

/**
 * Helper: Create QI Incident from runtime error
 */
export async function recordRuntimeErrorIncident(
  error: string,
  source: string,
  stackTrace?: string,
  buildId?: string
): Promise<QIIncidentWriteResult> {
  return recordQIIncident({
    incidentType: 'runtime_error',
    severity: 'critical',
    source,
    description: `Runtime error detected: ${error}`,
    details: { error, stackTrace },
    buildId,
  });
}

/**
 * Helper: Create QI Incident from schema mismatch
 */
export async function recordSchemaMismatchIncident(
  engine1: string,
  engine2: string,
  field: string,
  mismatch: string
): Promise<QIIncidentWriteResult> {
  return recordQIIncident({
    incidentType: 'schema_mismatch',
    severity: 'high',
    source: `schema:${engine1},${engine2}`,
    description: `Schema mismatch detected between ${engine1} and ${engine2}`,
    details: { engine1, engine2, field, mismatch },
  });
}

/**
 * Helper: Create QI Incident from deployment failure
 */
export async function recordDeploymentFailureIncident(
  stage: string,
  error: string,
  buildId?: string
): Promise<QIIncidentWriteResult> {
  return recordQIIncident({
    incidentType: 'deployment_failure',
    severity: 'critical',
    source: `deployment:${stage}`,
    description: `Deployment failure in ${stage}: ${error}`,
    details: { stage, error },
    buildId,
  });
}
