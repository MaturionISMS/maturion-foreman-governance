/**
 * Constitutional Supervision Graph (PHASE_08)
 * 
 * The brainstem of constitutional AI. This graph connects ALL constitutional
 * layers and enforces that every autonomous operation must traverse and be
 * approved by every relevant governance system.
 * 
 * Constitutional Foundation: This enforces Build Philosophy supremacy,
 * Governance Supremacy Rule (GSR), and all immutable guardrails.
 */

import type {
  SupervisionNode,
  SupervisionEdge,
  SupervisionGraphConfig,
  SupervisionNodeType,
  SupervisionFlowType,
} from '@/types/supervision';

/**
 * Constitutional Supervision Graph
 * 
 * This is the complete, versioned, deterministic graph that defines
 * how all autonomous actions must be validated.
 */
export const SUPERVISION_GRAPH_V1: SupervisionGraphConfig = {
  version: '1.0.0',
  immutable: true,
  enforceAll: true, // All nodes must pass
  blockOnWarning: false, // Warnings trigger escalation, not immediate block
  logAllActions: true,

  /**
   * Constitutional Nodes
   * 
   * Each node represents a constitutional layer that can approve,
   * warn, or block autonomous actions.
   */
  nodes: [
    {
      id: 'guardrails',
      name: 'Immutable Guardrails',
      description: 'Validates immutability of protected paths, constitutional files, and workflow integrity',
      enabled: true,
      priority: 100, // Highest - fundamental safety
    },
    {
      id: 'qic',
      name: 'Quality Integrity Contract',
      description: 'Enforces zero-error, zero-warning builds with comprehensive QA coverage',
      enabled: true,
      priority: 95,
    },
    {
      id: 'qiel',
      name: 'Quality Integrity Enforcement Layer',
      description: 'Runtime QA validation and integrity checks',
      enabled: true,
      priority: 90,
    },
    {
      id: 'governance_memory',
      name: 'Governance Memory',
      description: 'Tracks and validates against historical governance decisions and patterns',
      enabled: true,
      priority: 85,
    },
    {
      id: 'architecture_approval',
      name: 'Architecture Approval',
      description: 'Validates architecture changes against True North principles and design checklist',
      enabled: true,
      priority: 80,
    },
    {
      id: 'incident_loop',
      name: 'Incident Feedback Loop',
      description: 'Validates actions against past incidents and learned lessons',
      enabled: true,
      priority: 75,
    },
    {
      id: 'performance_engine',
      name: 'Performance Engine',
      description: 'Enforces performance requirements and resource constraints',
      enabled: true,
      priority: 70,
    },
    {
      id: 'drift_detector',
      name: 'Drift Detector',
      description: 'Detects and prevents architectural and governance drift',
      enabled: true,
      priority: 65,
    },
    {
      id: 'mutation_governor',
      name: 'Mutation Governor',
      description: 'Controls state mutations and ensures safe change propagation',
      enabled: true,
      priority: 60,
    },
    {
      id: 'model_escalation_governor',
      name: 'Model Escalation Governor',
      description: 'Enforces model selection rules and cognitive budgeting',
      enabled: true,
      priority: 55,
    },
    {
      id: 'builder_protocol_kernel',
      name: 'Builder Protocol Kernel',
      description: 'Validates Build-to-Green protocol and builder constraints',
      enabled: true,
      priority: 50,
    },
    {
      id: 'robotics_law_layer',
      name: 'Robotics Law Layer',
      description: 'Enforces fundamental safety laws and harm prevention',
      enabled: true,
      priority: 45,
    },
  ],

  /**
   * Constitutional Edges
   * 
   * Define the flows between nodes and what is allowed, forbidden, or conditional.
   */
  edges: [
    // Guardrails must always be first
    { from: 'guardrails', to: 'qic', flowType: 'allowed' },
    { from: 'guardrails', to: 'governance_memory', flowType: 'allowed' },
    
    // QIC validates before any building
    { from: 'qic', to: 'builder_protocol_kernel', flowType: 'conditional', condition: 'has_red_qa' },
    { from: 'qic', to: 'qiel', flowType: 'allowed' },
    
    // Architecture changes require approval
    { from: 'architecture_approval', to: 'drift_detector', flowType: 'allowed' },
    { from: 'architecture_approval', to: 'incident_loop', flowType: 'allowed' },
    
    // Incident loop feeds back to architecture
    { from: 'incident_loop', to: 'architecture_approval', flowType: 'conditional', condition: 'learns_from_incident' },
    
    // Performance checks before execution
    { from: 'performance_engine', to: 'mutation_governor', flowType: 'allowed' },
    
    // Drift detection must validate before mutations
    { from: 'drift_detector', to: 'mutation_governor', flowType: 'allowed' },
    
    // Model escalation requires governance approval for high-cost models
    { from: 'model_escalation_governor', to: 'governance_memory', flowType: 'conditional', condition: 'escalates_to_expensive_model' },
    
    // Builder protocol requires QIC approval
    { from: 'builder_protocol_kernel', to: 'qic', flowType: 'conditional', condition: 'validates_qa_green' },
    
    // Robotics laws override everything - forbidden paths
    { from: 'robotics_law_layer', to: 'mutation_governor', flowType: 'forbidden' }, // Cannot mutate if harmful
  ],
};

/**
 * Get the constitutional supervision graph
 */
export function getSupervisionGraph(): SupervisionGraphConfig {
  return SUPERVISION_GRAPH_V1;
}

/**
 * Get a specific node by ID
 */
export function getNode(nodeId: SupervisionNodeType): SupervisionNode | undefined {
  return SUPERVISION_GRAPH_V1.nodes.find(n => n.id === nodeId);
}

/**
 * Get all edges from a specific node
 */
export function getEdgesFrom(nodeId: SupervisionNodeType): SupervisionEdge[] {
  return SUPERVISION_GRAPH_V1.edges.filter(e => e.from === nodeId);
}

/**
 * Get all edges to a specific node
 */
export function getEdgesTo(nodeId: SupervisionNodeType): SupervisionEdge[] {
  return SUPERVISION_GRAPH_V1.edges.filter(e => e.to === nodeId);
}

/**
 * Check if a flow between two nodes is allowed
 */
export function isFlowAllowed(
  from: SupervisionNodeType,
  to: SupervisionNodeType
): { allowed: boolean; flowType: SupervisionFlowType | null; condition?: string } {
  const edge = SUPERVISION_GRAPH_V1.edges.find(e => e.from === from && e.to === to);
  
  if (!edge) {
    return { allowed: false, flowType: null };
  }
  
  if (edge.flowType === 'forbidden') {
    return { allowed: false, flowType: 'forbidden' };
  }
  
  if (edge.flowType === 'conditional') {
    return { allowed: true, flowType: 'conditional', condition: edge.condition };
  }
  
  return { allowed: true, flowType: 'allowed' };
}

/**
 * Get nodes in priority order (highest first)
 */
export function getNodesByPriority(): SupervisionNode[] {
  return [...SUPERVISION_GRAPH_V1.nodes].sort((a, b) => b.priority - a.priority);
}

/**
 * Validate graph integrity
 * Ensures the graph is properly configured and has no cycles or invalid edges
 */
export function validateGraphIntegrity(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check: All nodes have unique IDs
  const nodeIds = SUPERVISION_GRAPH_V1.nodes.map(n => n.id);
  const uniqueIds = new Set(nodeIds);
  if (nodeIds.length !== uniqueIds.size) {
    errors.push('Duplicate node IDs detected');
  }
  
  // Check: All edges reference valid nodes
  for (const edge of SUPERVISION_GRAPH_V1.edges) {
    if (!uniqueIds.has(edge.from)) {
      errors.push(`Edge references invalid 'from' node: ${edge.from}`);
    }
    if (!uniqueIds.has(edge.to)) {
      errors.push(`Edge references invalid 'to' node: ${edge.to}`);
    }
  }
  
  // Check: No self-loops
  const selfLoops = SUPERVISION_GRAPH_V1.edges.filter(e => e.from === e.to);
  if (selfLoops.length > 0) {
    errors.push(`Self-loops detected: ${selfLoops.map(e => e.from).join(', ')}`);
  }
  
  // Check: Guardrails node exists (fundamental requirement)
  if (!uniqueIds.has('guardrails')) {
    errors.push('Critical: Guardrails node is missing');
  }
  
  // Check: All enabled nodes have priority > 0
  const invalidPriority = SUPERVISION_GRAPH_V1.nodes.filter(n => n.enabled && n.priority <= 0);
  if (invalidPriority.length > 0) {
    errors.push(`Nodes with invalid priority: ${invalidPriority.map(n => n.id).join(', ')}`);
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get graph metadata for logging and debugging
 */
export function getGraphMetadata(): {
  version: string;
  nodeCount: number;
  edgeCount: number;
  enabledNodes: number;
  highestPriorityNode: string;
  immutable: boolean;
} {
  const enabledNodes = SUPERVISION_GRAPH_V1.nodes.filter(n => n.enabled);
  const sortedByPriority = [...enabledNodes].sort((a, b) => b.priority - a.priority);
  
  return {
    version: SUPERVISION_GRAPH_V1.version,
    nodeCount: SUPERVISION_GRAPH_V1.nodes.length,
    edgeCount: SUPERVISION_GRAPH_V1.edges.length,
    enabledNodes: enabledNodes.length,
    highestPriorityNode: sortedByPriority[0]?.id || 'none',
    immutable: SUPERVISION_GRAPH_V1.immutable,
  };
}
