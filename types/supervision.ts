/**
 * Constitutional Supervision Graph Types
 * 
 * Defines the supervision graph structure that validates every autonomous
 * action against all constitutional layers (PHASE_08).
 */

/**
 * Constitutional nodes in the supervision graph
 */
export type SupervisionNodeType =
  | 'guardrails'
  | 'qic'
  | 'qiel'
  | 'governance_memory'
  | 'architecture_approval'
  | 'incident_loop'
  | 'performance_engine'
  | 'drift_detector'
  | 'mutation_governor'
  | 'model_escalation_governor'
  | 'builder_protocol_kernel'
  | 'robotics_law_layer';

/**
 * Flow types between nodes
 */
export type SupervisionFlowType =
  | 'allowed'        // Direct approval
  | 'forbidden'      // Explicitly blocked
  | 'conditional';   // Requires approval/escalation

/**
 * Action status after supervision
 */
export type SupervisionStatus =
  | 'approved'
  | 'blocked'
  | 'warning'
  | 'requires_escalation';

/**
 * Supervision node definition
 */
export interface SupervisionNode {
  id: SupervisionNodeType;
  name: string;
  description: string;
  enabled: boolean;
  priority: number; // Higher priority = evaluated first
}

/**
 * Supervision edge (flow between nodes)
 */
export interface SupervisionEdge {
  from: SupervisionNodeType;
  to: SupervisionNodeType;
  flowType: SupervisionFlowType;
  condition?: string; // Condition for conditional flows
}

/**
 * Action to be validated by supervision graph
 */
export interface SupervisionAction {
  id: string;
  type: string;
  description: string;
  context: {
    isArchitectureChange?: boolean;
    isGovernanceAction?: boolean;
    affectsConstitution?: boolean;
    requiresModelEscalation?: boolean;
    mutatesState?: boolean;
    triggersBuilder?: boolean;
    [key: string]: any;
  };
  metadata?: any;
}

/**
 * Result from a single node validation
 */
export interface NodeValidationResult {
  nodeId: SupervisionNodeType;
  status: SupervisionStatus;
  message: string;
  warnings?: string[];
  blockers?: string[];
  metadata?: any;
  timestamp: string;
}

/**
 * Complete supervision validation result
 */
export interface SupervisionValidationResult {
  actionId: string;
  overallStatus: SupervisionStatus;
  approved: boolean;
  nodeResults: NodeValidationResult[];
  blockingNodes: SupervisionNodeType[];
  warningNodes: SupervisionNodeType[];
  escalationRequired: boolean;
  escalationReason?: string;
  executionAllowed: boolean;
  timestamp: string;
  duration: number; // ms
}

/**
 * Supervision graph configuration
 */
export interface SupervisionGraphConfig {
  version: string;
  nodes: SupervisionNode[];
  edges: SupervisionEdge[];
  enforceAll: boolean; // If true, all nodes must pass
  blockOnWarning: boolean; // If true, warnings block execution
  logAllActions: boolean;
  immutable: boolean; // If true, graph cannot be modified at runtime
}

/**
 * Supervision log entry
 */
export interface SupervisionLogEntry {
  id: string;
  timestamp: string;
  action: SupervisionAction;
  validationResult: SupervisionValidationResult;
  executionStatus: 'pending' | 'executed' | 'blocked' | 'escalated';
  outcome?: string;
}
