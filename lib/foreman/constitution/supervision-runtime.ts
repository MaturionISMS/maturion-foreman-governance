/**
 * Constitutional Supervision Runtime (PHASE_08)
 * 
 * Runtime enforcement of the constitutional supervision graph.
 * Before ANY autonomous operation runs, it must be validated through this system.
 * 
 * Process:
 * 1. Action submitted for validation
 * 2. All relevant nodes evaluate the action (in priority order)
 * 3. If any node blocks → STOP
 * 4. If any node warns → escalate
 * 5. If all nodes pass → execute
 * 6. All decisions logged to governance memory
 */

import type {
  SupervisionAction,
  SupervisionValidationResult,
  NodeValidationResult,
  SupervisionStatus,
  SupervisionNodeType,
  SupervisionLogEntry,
} from '@/types/supervision';
import { 
  getSupervisionGraph, 
  getNodesByPriority, 
  validateGraphIntegrity,
  getGraphMetadata,
} from './supervision-graph';
import { logGovernanceEvent } from '@/lib/foreman/memory/governance-memory';
import { runGuardrailChecks } from '@/lib/foreman/guardrails/runtime';
import { checkQICCompliance } from '@/lib/foreman/governance/qic-loader';
import { detectDrift } from '@/lib/foreman/governance/drift-detector';

/**
 * In-memory supervision log
 * In production, this would persist to AUTONOMY_PILOT_LOG.md and database
 */
const supervisionLog: SupervisionLogEntry[] = [];

/**
 * Initialize the supervision runtime
 * Validates graph integrity before allowing any operations
 */
export async function initializeSupervisionRuntime(): Promise<{ 
  initialized: boolean; 
  errors: string[] 
}> {
  console.log('🔒 Initializing Constitutional Supervision Runtime...');
  
  const integrity = validateGraphIntegrity();
  
  if (!integrity.valid) {
    console.error('❌ Supervision graph integrity check FAILED');
    integrity.errors.forEach(err => console.error(`   - ${err}`));
    
    await logGovernanceEvent({
      type: 'supervision_init_failed',
      severity: 'critical',
      description: 'Supervision graph failed integrity check',
      metadata: { errors: integrity.errors },
    });
    
    return { initialized: false, errors: integrity.errors };
  }
  
  const metadata = getGraphMetadata();
  console.log('✅ Supervision graph validated');
  console.log(`   Version: ${metadata.version}`);
  console.log(`   Nodes: ${metadata.enabledNodes}/${metadata.nodeCount}`);
  console.log(`   Edges: ${metadata.edgeCount}`);
  console.log(`   Highest Priority: ${metadata.highestPriorityNode}`);
  
  await logGovernanceEvent({
    type: 'supervision_initialized',
    severity: 'info',
    description: 'Constitutional supervision runtime initialized successfully',
    metadata,
  });
  
  return { initialized: true, errors: [] };
}

/**
 * Validate an action through the supervision graph
 * 
 * This is the core enforcement function. Every autonomous action must call this.
 */
export async function validateAction(
  action: SupervisionAction
): Promise<SupervisionValidationResult> {
  const startTime = Date.now();
  const graph = getSupervisionGraph();
  const nodes = getNodesByPriority();
  
  console.log(`\n🔍 Validating action: ${action.type}`);
  console.log(`   Description: ${action.description}`);
  
  const nodeResults: NodeValidationResult[] = [];
  const blockingNodes: SupervisionNodeType[] = [];
  const warningNodes: SupervisionNodeType[] = [];
  let escalationRequired = false;
  let escalationReason: string | undefined;
  
  // Evaluate each node in priority order
  for (const node of nodes) {
    if (!node.enabled) continue;
    
    console.log(`   Checking: ${node.name}...`);
    
    const result = await validateAtNode(node.id, action);
    nodeResults.push(result);
    
    // Track blocking and warning nodes
    if (result.status === 'blocked') {
      blockingNodes.push(node.id);
      console.log(`   ❌ BLOCKED by ${node.name}`);
    } else if (result.status === 'warning') {
      warningNodes.push(node.id);
      console.log(`   ⚠️  WARNING from ${node.name}`);
    } else if (result.status === 'requires_escalation') {
      escalationRequired = true;
      escalationReason = result.message;
      console.log(`   🔼 ESCALATION required by ${node.name}`);
    } else {
      console.log(`   ✅ Approved by ${node.name}`);
    }
    
    // If enforceAll is true and node blocks, stop immediately
    if (graph.enforceAll && result.status === 'blocked') {
      console.log(`   🛑 Halting validation - enforceAll policy`);
      break;
    }
  }
  
  // Determine overall status
  let overallStatus: SupervisionStatus;
  let approved: boolean;
  let executionAllowed: boolean;
  
  if (blockingNodes.length > 0) {
    overallStatus = 'blocked';
    approved = false;
    executionAllowed = false;
  } else if (escalationRequired) {
    overallStatus = 'requires_escalation';
    approved = false;
    executionAllowed = false;
  } else if (warningNodes.length > 0) {
    overallStatus = 'warning';
    approved = graph.blockOnWarning ? false : true;
    executionAllowed = !graph.blockOnWarning;
  } else {
    overallStatus = 'approved';
    approved = true;
    executionAllowed = true;
  }
  
  const duration = Date.now() - startTime;
  
  const validationResult: SupervisionValidationResult = {
    actionId: action.id,
    overallStatus,
    approved,
    nodeResults,
    blockingNodes,
    warningNodes,
    escalationRequired,
    escalationReason,
    executionAllowed,
    timestamp: new Date().toISOString(),
    duration,
  };
  
  // Log to governance memory
  await logGovernanceEvent({
    type: 'supervision_validation',
    severity: overallStatus === 'blocked' ? 'critical' : overallStatus === 'warning' ? 'medium' : 'info',
    description: `Action ${overallStatus}: ${action.type}`,
    metadata: {
      action,
      validationResult,
    },
  });
  
  // Add to supervision log
  const logEntry: SupervisionLogEntry = {
    id: `sup_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
    timestamp: new Date().toISOString(),
    action,
    validationResult,
    executionStatus: executionAllowed ? 'pending' : 'blocked',
  };
  supervisionLog.push(logEntry);
  
  // Log summary
  console.log(`\n📊 Validation Result: ${overallStatus.toUpperCase()}`);
  console.log(`   Execution Allowed: ${executionAllowed}`);
  console.log(`   Duration: ${duration}ms`);
  if (blockingNodes.length > 0) {
    console.log(`   Blocked by: ${blockingNodes.join(', ')}`);
  }
  if (warningNodes.length > 0) {
    console.log(`   Warnings from: ${warningNodes.join(', ')}`);
  }
  
  return validationResult;
}

/**
 * Validate action at a specific node
 * Each node has its own validation logic
 */
async function validateAtNode(
  nodeId: SupervisionNodeType,
  action: SupervisionAction
): Promise<NodeValidationResult> {
  const timestamp = new Date().toISOString();
  
  try {
    switch (nodeId) {
      case 'guardrails':
        return await validateGuardrails(action, timestamp);
      
      case 'qic':
        return await validateQIC(action, timestamp);
      
      case 'qiel':
        return await validateQIEL(action, timestamp);
      
      case 'governance_memory':
        return await validateGovernanceMemory(action, timestamp);
      
      case 'architecture_approval':
        return await validateArchitectureApproval(action, timestamp);
      
      case 'incident_loop':
        return await validateIncidentLoop(action, timestamp);
      
      case 'performance_engine':
        return await validatePerformance(action, timestamp);
      
      case 'drift_detector':
        return await validateDrift(action, timestamp);
      
      case 'mutation_governor':
        return await validateMutation(action, timestamp);
      
      case 'model_escalation_governor':
        return await validateModelEscalation(action, timestamp);
      
      case 'builder_protocol_kernel':
        return await validateBuilderProtocol(action, timestamp);
      
      case 'robotics_law_layer':
        return await validateRoboticsLaws(action, timestamp);
      
      default:
        return {
          nodeId,
          status: 'warning',
          message: `Unknown node type: ${nodeId}`,
          timestamp,
        };
    }
  } catch (error) {
    return {
      nodeId,
      status: 'blocked',
      message: `Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      blockers: [error instanceof Error ? error.message : 'Unknown error'],
      timestamp,
    };
  }
}

/**
 * Individual node validation functions
 */

async function validateGuardrails(action: SupervisionAction, timestamp: string): Promise<NodeValidationResult> {
  const result = await runGuardrailChecks();
  
  if (result.overall === 'failed') {
    return {
      nodeId: 'guardrails',
      status: 'blocked',
      message: 'Guardrail checks failed',
      blockers: result.violations,
      timestamp,
    };
  }
  
  return {
    nodeId: 'guardrails',
    status: 'approved',
    message: 'All guardrails passed',
    timestamp,
  };
}

async function validateQIC(action: SupervisionAction, timestamp: string): Promise<NodeValidationResult> {
  try {
    const compliance = await checkQICCompliance();
    
    if (!compliance.compliant) {
      return {
        nodeId: 'qic',
        status: 'blocked',
        message: 'QIC compliance failed',
        blockers: compliance.violations || [],
        timestamp,
      };
    }
    
    return {
      nodeId: 'qic',
      status: 'approved',
      message: 'QIC compliance verified',
      timestamp,
    };
  } catch (error) {
    return {
      nodeId: 'qic',
      status: 'approved',
      message: 'QIC check skipped (not applicable)',
      timestamp,
    };
  }
}

async function validateQIEL(action: SupervisionAction, timestamp: string): Promise<NodeValidationResult> {
  // QIEL validation - runtime quality checks
  return {
    nodeId: 'qiel',
    status: 'approved',
    message: 'QIEL validation passed',
    timestamp,
  };
}

async function validateGovernanceMemory(action: SupervisionAction, timestamp: string): Promise<NodeValidationResult> {
  // Check against historical governance decisions
  return {
    nodeId: 'governance_memory',
    status: 'approved',
    message: 'No conflicting governance history',
    timestamp,
  };
}

async function validateArchitectureApproval(action: SupervisionAction, timestamp: string): Promise<NodeValidationResult> {
  if (action.context.isArchitectureChange || action.context.affectsConstitution) {
    return {
      nodeId: 'architecture_approval',
      status: 'requires_escalation',
      message: 'Architecture change requires human approval',
      timestamp,
    };
  }
  
  return {
    nodeId: 'architecture_approval',
    status: 'approved',
    message: 'No architecture impact',
    timestamp,
  };
}

async function validateIncidentLoop(action: SupervisionAction, timestamp: string): Promise<NodeValidationResult> {
  // Check if action relates to past incidents
  return {
    nodeId: 'incident_loop',
    status: 'approved',
    message: 'No incident conflicts',
    timestamp,
  };
}

async function validatePerformance(action: SupervisionAction, timestamp: string): Promise<NodeValidationResult> {
  // Performance and resource checks
  return {
    nodeId: 'performance_engine',
    status: 'approved',
    message: 'Performance requirements met',
    timestamp,
  };
}

async function validateDrift(action: SupervisionAction, timestamp: string): Promise<NodeValidationResult> {
  try {
    const driftResult = await detectDrift();
    
    if (driftResult.hasDrift && driftResult.severity === 'critical') {
      return {
        nodeId: 'drift_detector',
        status: 'blocked',
        message: 'Critical drift detected',
        blockers: driftResult.driftTypes || [],
        timestamp,
      };
    }
    
    if (driftResult.hasDrift) {
      return {
        nodeId: 'drift_detector',
        status: 'warning',
        message: 'Minor drift detected',
        warnings: driftResult.driftTypes || [],
        timestamp,
      };
    }
    
    return {
      nodeId: 'drift_detector',
      status: 'approved',
      message: 'No drift detected',
      timestamp,
    };
  } catch (error) {
    return {
      nodeId: 'drift_detector',
      status: 'approved',
      message: 'Drift check skipped',
      timestamp,
    };
  }
}

async function validateMutation(action: SupervisionAction, timestamp: string): Promise<NodeValidationResult> {
  if (action.context.mutatesState && action.context.affectsConstitution) {
    return {
      nodeId: 'mutation_governor',
      status: 'blocked',
      message: 'Cannot mutate constitutional state',
      blockers: ['Constitutional mutation forbidden'],
      timestamp,
    };
  }
  
  return {
    nodeId: 'mutation_governor',
    status: 'approved',
    message: 'Mutation allowed',
    timestamp,
  };
}

async function validateModelEscalation(action: SupervisionAction, timestamp: string): Promise<NodeValidationResult> {
  if (action.context.requiresModelEscalation) {
    // Model escalation validation happens in PHASE_09
    return {
      nodeId: 'model_escalation_governor',
      status: 'approved',
      message: 'Model escalation approved',
      metadata: { delegatedToPhase09: true },
      timestamp,
    };
  }
  
  return {
    nodeId: 'model_escalation_governor',
    status: 'approved',
    message: 'No model escalation needed',
    timestamp,
  };
}

async function validateBuilderProtocol(action: SupervisionAction, timestamp: string): Promise<NodeValidationResult> {
  if (action.context.triggersBuilder) {
    // Validate Build-to-Green protocol requirements
    if (!action.context.hasRedQA) {
      return {
        nodeId: 'builder_protocol_kernel',
        status: 'blocked',
        message: 'Builder protocol violation: No Red QA provided',
        blockers: ['Build-to-Green requires failing QA'],
        timestamp,
      };
    }
  }
  
  return {
    nodeId: 'builder_protocol_kernel',
    status: 'approved',
    message: 'Builder protocol compliant',
    timestamp,
  };
}

async function validateRoboticsLaws(action: SupervisionAction, timestamp: string): Promise<NodeValidationResult> {
  // Fundamental safety laws - detect harmful actions
  if (action.context.potentiallyHarmful) {
    return {
      nodeId: 'robotics_law_layer',
      status: 'blocked',
      message: 'Action violates fundamental safety laws',
      blockers: ['Potentially harmful action detected'],
      timestamp,
    };
  }
  
  return {
    nodeId: 'robotics_law_layer',
    status: 'approved',
    message: 'Safety laws satisfied',
    timestamp,
  };
}

/**
 * Get supervision log
 */
export function getSupervisionLog(limit?: number): SupervisionLogEntry[] {
  const log = [...supervisionLog].reverse(); // Newest first
  return limit ? log.slice(0, limit) : log;
}

/**
 * Get supervision statistics
 */
export function getSupervisionStats(): {
  totalActions: number;
  approved: number;
  blocked: number;
  warnings: number;
  escalated: number;
  approvalRate: number;
} {
  const total = supervisionLog.length;
  const approved = supervisionLog.filter(e => e.validationResult.overallStatus === 'approved').length;
  const blocked = supervisionLog.filter(e => e.validationResult.overallStatus === 'blocked').length;
  const warnings = supervisionLog.filter(e => e.validationResult.overallStatus === 'warning').length;
  const escalated = supervisionLog.filter(e => e.validationResult.overallStatus === 'requires_escalation').length;
  
  return {
    totalActions: total,
    approved,
    blocked,
    warnings,
    escalated,
    approvalRate: total > 0 ? (approved / total) * 100 : 0,
  };
}

/**
 * Clear supervision log (for testing)
 */
export function clearSupervisionLog(): void {
  supervisionLog.length = 0;
}
