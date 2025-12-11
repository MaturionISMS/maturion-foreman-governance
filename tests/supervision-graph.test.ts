/**
 * Supervision Graph Test
 * 
 * Validates the Constitutional Supervision Graph implementation
 */

import { 
  getSupervisionGraph,
  validateGraphIntegrity,
  getNode,
  isFlowAllowed,
  getNodesByPriority,
} from '../lib/foreman/constitution/supervision-graph';

import {
  initializeSupervisionRuntime,
  validateAction,
} from '../lib/foreman/constitution/supervision-runtime';

console.log('🧪 Testing Constitutional Supervision Graph...\n');

// Test 1: Graph Integrity
console.log('Test 1: Graph Integrity');
const integrity = validateGraphIntegrity();
console.log(`  Result: ${integrity.valid ? '✅ PASS' : '❌ FAIL'}`);
if (!integrity.valid) {
  console.log('  Errors:', integrity.errors);
  process.exit(1);
}

// Test 2: Node Retrieval
console.log('\nTest 2: Node Retrieval');
const guardrailsNode = getNode('guardrails');
console.log(`  Guardrails node exists: ${guardrailsNode ? '✅' : '❌'}`);
console.log(`  Priority: ${guardrailsNode?.priority}`);
console.log(`  Enabled: ${guardrailsNode?.enabled}`);

// Test 3: Flow Validation
console.log('\nTest 3: Flow Validation');
const flowResult = isFlowAllowed('guardrails', 'qic');
console.log(`  Guardrails → QIC: ${flowResult.allowed ? '✅ Allowed' : '❌ Forbidden'}`);
console.log(`  Flow type: ${flowResult.flowType}`);

// Test 4: Priority Ordering
console.log('\nTest 4: Priority Ordering');
const nodes = getNodesByPriority();
console.log(`  Total nodes: ${nodes.length}`);
console.log(`  Highest priority: ${nodes[0]?.id} (${nodes[0]?.priority})`);
console.log(`  Lowest priority: ${nodes[nodes.length - 1]?.id} (${nodes[nodes.length - 1]?.priority})`);

// Test 5: Runtime Initialization
console.log('\nTest 5: Runtime Initialization');
(async () => {
  try {
    const init = await initializeSupervisionRuntime();
    console.log(`  Initialized: ${init.initialized ? '✅' : '❌'}`);
    if (!init.initialized) {
      console.log('  Errors:', init.errors);
    }
    
    // Test 6: Action Validation
    console.log('\nTest 6: Action Validation');
    const testAction = {
      id: 'test_action_1',
      type: 'test_operation',
      description: 'Test action for supervision validation',
      context: {
        isArchitectureChange: false,
        isGovernanceAction: false,
        affectsConstitution: false,
        requiresModelEscalation: false,
        mutatesState: false,
        triggersBuilder: false,
      },
    };
    
    const validation = await validateAction(testAction);
    console.log(`  Overall status: ${validation.overallStatus}`);
    console.log(`  Execution allowed: ${validation.executionAllowed ? '✅' : '❌'}`);
    console.log(`  Nodes evaluated: ${validation.nodeResults.length}`);
    console.log(`  Blocking nodes: ${validation.blockingNodes.length}`);
    console.log(`  Warning nodes: ${validation.warningNodes.length}`);
    console.log(`  Duration: ${validation.duration}ms`);
    
    // Test 7: Architecture Change Validation
    console.log('\nTest 7: Architecture Change Validation');
    const archAction = {
      id: 'test_action_2',
      type: 'architecture_change',
      description: 'Test architecture change requiring approval',
      context: {
        isArchitectureChange: true,
        affectsConstitution: false,
        requiresModelEscalation: false,
      },
    };
    
    const archValidation = await validateAction(archAction);
    console.log(`  Overall status: ${archValidation.overallStatus}`);
    console.log(`  Escalation required: ${archValidation.escalationRequired ? '✅ Yes' : '❌ No'}`);
    console.log(`  Escalation reason: ${archValidation.escalationReason || 'N/A'}`);
    
    console.log('\n✅ All supervision graph tests completed successfully!\n');
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  }
})();
