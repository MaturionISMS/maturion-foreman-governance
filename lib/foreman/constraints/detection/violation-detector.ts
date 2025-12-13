/**
 * Violation Detector
 * 
 * Main detection engine for architecture constraint violations.
 * Compares observed architecture against declared constraints and detects deviations.
 * 
 * Wave 3B: Observe and Report Only (No Enforcement)
 */

import {
  ArchitectureSignature,
  ConstraintDeclaration,
  ConstraintType,
} from '../../../../types/constraints';

import {
  ViolationReport,
  RawViolation,
  StructuralViolation,
  ContractViolation,
  GovernanceViolation,
} from '../../../../types/violations';

/**
 * Detect violations in current architecture against constraints
 * 
 * @param signature - Current architecture signature
 * @param constraints - Constraints to check against
 * @returns Complete violation report
 */
export async function detectViolations(
  signature: ArchitectureSignature,
  constraints: ConstraintDeclaration[]
): Promise<ViolationReport> {
  try {
    const violations: RawViolation[] = [];

    // Detect structural violations
    const structuralConstraints = constraints.filter(c => c.type === 'structural');
    const structuralViolations = await detectStructuralViolations(signature, structuralConstraints);
    violations.push(...structuralViolations);

    // Detect governance violations
    const governanceConstraints = constraints.filter(c => c.type === 'governance');
    const governanceViolations = await detectGovernanceViolations(signature, governanceConstraints);
    violations.push(...governanceViolations);

    // Contract violations require two signatures (old and new)
    // For now, return empty array as we don't have baseline signature
    const contractViolations: ContractViolation[] = [];

    // Aggregate by type
    const byType: Record<ConstraintType, number> = {
      structural: structuralViolations.length,
      contract: contractViolations.length,
      governance: governanceViolations.length,
    };

    return {
      signatureHash: signature.hash,
      commit: signature.repository.commit,
      timestamp: new Date().toISOString(),
      violations,
      summary: {
        total: violations.length,
        byType,
      },
    };
  } catch (error) {
    // Graceful degradation on error
    console.error('[ViolationDetector] Detection error:', error);
    return {
      signatureHash: signature.hash,
      commit: signature.repository.commit,
      timestamp: new Date().toISOString(),
      violations: [],
      summary: {
        total: 0,
        byType: {
          structural: 0,
          contract: 0,
          governance: 0,
        },
      },
    };
  }
}

/**
 * Detect structural violations (circular deps, layer violations, etc.)
 * 
 * @param signature - Architecture signature
 * @param constraints - Structural constraints
 * @returns Array of structural violations
 */
export async function detectStructuralViolations(
  signature: ArchitectureSignature,
  constraints: ConstraintDeclaration[]
): Promise<StructuralViolation[]> {
  const violations: StructuralViolation[] = [];

  for (const constraint of constraints) {
    // Detect circular dependencies
    if (constraint.category === 'dependency_direction' || constraint.id.includes('circular')) {
      const circularViolations = detectCircularDependencies(signature, constraint);
      violations.push(...circularViolations);
    }

    // Detect layer violations
    if (constraint.category === 'layer_violation' || constraint.id.includes('layer')) {
      const layerViolations = detectLayerViolations(signature, constraint);
      violations.push(...layerViolations);
    }
  }

  return violations;
}

/**
 * Detect circular dependencies in dependency graph
 */
function detectCircularDependencies(
  signature: ArchitectureSignature,
  constraint: ConstraintDeclaration
): StructuralViolation[] {
  const violations: StructuralViolation[] = [];
  const graph = signature.structure.dependencies;

  // Build adjacency list
  const adjacency = new Map<string, string[]>();
  for (const edge of graph.edges) {
    if (!adjacency.has(edge.from)) {
      adjacency.set(edge.from, []);
    }
    adjacency.get(edge.from)!.push(edge.to);
  }

  // Detect cycles using DFS
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  function hasCycle(node: string, path: string[]): string[] | null {
    visited.add(node);
    recursionStack.add(node);
    path.push(node);

    const neighbors = adjacency.get(node) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        const cycle = hasCycle(neighbor, [...path]);
        if (cycle) return cycle;
      } else if (recursionStack.has(neighbor)) {
        // Found a cycle
        const cycleStart = path.indexOf(neighbor);
        return path.slice(cycleStart).concat(neighbor);
      }
    }

    recursionStack.delete(node);
    return null;
  }

  // Check each node
  for (const node of graph.nodes) {
    if (!visited.has(node)) {
      const cycle = hasCycle(node, []);
      if (cycle) {
        violations.push({
          constraintId: constraint.id,
          type: 'structural',
          structuralType: 'circular_dependency',
          description: `Circular dependency detected: ${cycle.join(' → ')}`,
          affectedModules: cycle,
          dependencyChain: cycle,
          context: {
            cycle,
          },
          detectedAt: new Date().toISOString(),
        });
      }
    }
  }

  return violations;
}

/**
 * Detect layer violations
 */
function detectLayerViolations(
  signature: ArchitectureSignature,
  constraint: ConstraintDeclaration
): StructuralViolation[] {
  const violations: StructuralViolation[] = [];
  const { layers, dependencies } = signature.structure;

  // Build layer map
  const moduleToLayer = new Map<string, string>();
  for (const layer of layers) {
    for (const moduleName of layer.modules) {
      moduleToLayer.set(moduleName, layer.name);
    }
  }

  // Build allowed dependencies map
  const allowedDepsMap = new Map<string, Set<string>>();
  for (const layer of layers) {
    allowedDepsMap.set(layer.name, new Set(layer.allowedDependencies));
  }

  // Check each dependency edge
  for (const edge of dependencies.edges) {
    const fromLayer = moduleToLayer.get(edge.from);
    const toLayer = moduleToLayer.get(edge.to);

    if (fromLayer && toLayer) {
      const allowedDeps = allowedDepsMap.get(fromLayer);
      if (allowedDeps && !allowedDeps.has(toLayer)) {
        violations.push({
          constraintId: constraint.id,
          type: 'structural',
          structuralType: 'layer_violation',
          description: `Layer violation: ${fromLayer} layer cannot depend on ${toLayer} layer`,
          affectedModules: [edge.from, edge.to],
          context: {
            fromLayer,
            toLayer,
            allowedDependencies: Array.from(allowedDeps),
          },
          detectedAt: new Date().toISOString(),
        });
      }
    }
  }

  return violations;
}

/**
 * Detect contract violations (requires two signatures for comparison)
 * 
 * @param oldSignature - Previous architecture signature
 * @param newSignature - Current architecture signature
 * @param constraints - Contract constraints
 * @returns Array of contract violations
 */
export async function detectContractViolations(
  oldSignature: ArchitectureSignature,
  newSignature: ArchitectureSignature,
  constraints: ConstraintDeclaration[]
): Promise<ContractViolation[]> {
  const violations: ContractViolation[] = [];

  for (const constraint of constraints) {
    // Detect API contract violations
    if (constraint.category === 'api_stability' || constraint.id.includes('api')) {
      const apiViolations = detectAPIContractViolations(oldSignature, newSignature, constraint);
      violations.push(...apiViolations);
    }
  }

  return violations;
}

/**
 * Detect API contract violations (breaking changes)
 */
function detectAPIContractViolations(
  oldSignature: ArchitectureSignature,
  newSignature: ArchitectureSignature,
  constraint: ConstraintDeclaration
): ContractViolation[] {
  const violations: ContractViolation[] = [];

  const oldAPIs = new Map(oldSignature.contracts.apis.map(api => [api.endpoint, api]));
  const newAPIs = new Map(newSignature.contracts.apis.map(api => [api.endpoint, api]));

  // Check for modified APIs
  for (const [endpoint, oldAPI] of Array.from(oldAPIs.entries())) {
    const newAPI = newAPIs.get(endpoint);
    if (newAPI) {
      // Check if response schema changed (potential breaking change)
      const oldResponseStr = JSON.stringify(oldAPI.responseSchema);
      const newResponseStr = JSON.stringify(newAPI.responseSchema);

      if (oldResponseStr !== newResponseStr) {
        violations.push({
          constraintId: constraint.id,
          type: 'contract',
          contractType: 'api',
          description: `Breaking API change detected in ${endpoint}`,
          oldVersion: oldAPI.version,
          newVersion: newAPI.version,
          breakingChange: true,
          migrationRequired: true,
          context: {
            endpoint,
            oldResponse: oldAPI.responseSchema,
            newResponse: newAPI.responseSchema,
          },
          detectedAt: new Date().toISOString(),
        });
      }
    }
  }

  return violations;
}

/**
 * Detect governance violations (protected paths, CS boundaries, etc.)
 * 
 * @param signature - Architecture signature
 * @param constraints - Governance constraints
 * @returns Array of governance violations
 */
export async function detectGovernanceViolations(
  signature: ArchitectureSignature,
  constraints: ConstraintDeclaration[]
): Promise<GovernanceViolation[]> {
  const violations: GovernanceViolation[] = [];

  for (const constraint of constraints) {
    // Detect protected path modifications
    if (constraint.category === 'protected_path' || constraint.id.includes('protected')) {
      const protectedPathViolations = detectProtectedPathViolations(signature, constraint);
      violations.push(...protectedPathViolations);
    }
  }

  return violations;
}

/**
 * Detect protected path modifications
 */
function detectProtectedPathViolations(
  signature: ArchitectureSignature,
  constraint: ConstraintDeclaration
): GovernanceViolation[] {
  const violations: GovernanceViolation[] = [];

  // Get protected paths from constraint metadata or governance section
  const protectedPaths = constraint.metadata?.protectedPaths || signature.governance.protectedPaths || [];

  // Check if any modules match protected paths
  for (const moduleItem of signature.structure.modules) {
    for (const protectedPath of protectedPaths) {
      if (moduleItem.path.includes(protectedPath)) {
        violations.push({
          constraintId: constraint.id,
          type: 'governance',
          governanceType: 'protected_path',
          description: `Protected file modified: ${moduleItem.path}`,
          protectedFile: moduleItem.path,
          location: {
            file: moduleItem.path,
            module: moduleItem.name,
          },
          context: {
            protectedPath,
            moduleHash: moduleItem.hash,
          },
          detectedAt: new Date().toISOString(),
        });
      }
    }
  }

  return violations;
}

/**
 * Detect violations for a specific constraint type
 * 
 * @param signature - Architecture signature
 * @param type - Constraint type to detect
 * @param constraints - Constraints of that type
 * @returns Violation report filtered by type
 */
export async function detectViolationsByType(
  signature: ArchitectureSignature,
  type: ConstraintType,
  constraints: ConstraintDeclaration[]
): Promise<ViolationReport> {
  const filteredConstraints = constraints.filter(c => c.type === type);
  return detectViolations(signature, filteredConstraints);
}
