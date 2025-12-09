/**
 * Test Model Escalation Integration with Chat API
 * 
 * This test verifies that the chat API properly integrates with
 * the model escalation service to select appropriate models based
 * on task complexity.
 */

import { selectModel } from '@/lib/foreman/model-escalation';
import type { ModelSelectionContext } from '@/types/model-escalation';

async function testModelEscalationIntegration() {
  console.log('\n=== Testing Model Escalation Integration ===\n');

  // Test 1: Simple chat query (should use gpt-4)
  console.log('Test 1: Simple chat query');
  const simpleContext: ModelSelectionContext = {
    taskType: 'general',
    complexity: 'low',
    filesAffected: 0,
    isArchitectureTask: false,
    isGovernanceTask: false,
    isMilestoneNearing: false,
    existingEscalationsToday: 0,
    quotaRemaining: 100
  };

  const simpleResult = selectModel(simpleContext);
  console.log('  Selected model:', simpleResult.selectedModel);
  console.log('  Escalated:', simpleResult.escalated);
  console.log('  Expected: gpt-4, no escalation');
  console.log('  Result:', simpleResult.selectedModel === 'gpt-4' && !simpleResult.escalated ? '✅ PASS' : '❌ FAIL');

  // Test 2: Architecture task (should escalate to gpt-5.1)
  console.log('\nTest 2: Architecture task');
  const archContext: ModelSelectionContext = {
    taskType: 'architecture',
    complexity: 'high',
    filesAffected: 15,
    isArchitectureTask: true,
    isGovernanceTask: false,
    isMilestoneNearing: false,
    existingEscalationsToday: 0,
    quotaRemaining: 100
  };

  const archResult = selectModel(archContext);
  console.log('  Selected model:', archResult.selectedModel);
  console.log('  Escalated:', archResult.escalated);
  console.log('  Escalation reason:', archResult.escalationReason);
  console.log('  Expected: gpt-5.1, escalated for architecture_impact');
  console.log('  Result:', archResult.selectedModel === 'gpt-5.1' && archResult.escalated ? '✅ PASS' : '❌ FAIL');

  // Test 3: Governance task (should escalate to gpt-5.1)
  console.log('\nTest 3: Governance task');
  const govContext: ModelSelectionContext = {
    taskType: 'governance',
    complexity: 'high',
    filesAffected: 0,
    isArchitectureTask: false,
    isGovernanceTask: true,
    isMilestoneNearing: false,
    existingEscalationsToday: 0,
    quotaRemaining: 100
  };

  const govResult = selectModel(govContext);
  console.log('  Selected model:', govResult.selectedModel);
  console.log('  Escalated:', govResult.escalated);
  console.log('  Escalation reason:', govResult.escalationReason);
  console.log('  Expected: gpt-5.1, escalated for governance_task');
  console.log('  Result:', govResult.selectedModel === 'gpt-5.1' && govResult.escalated ? '✅ PASS' : '❌ FAIL');

  // Test 4: Project milestone (should escalate to gpt-5.1)
  console.log('\nTest 4: Project milestone');
  const milestoneContext: ModelSelectionContext = {
    taskType: 'orchestration',
    complexity: 'high',
    filesAffected: 0,
    isArchitectureTask: false,
    isGovernanceTask: false,
    isMilestoneNearing: true,
    existingEscalationsToday: 0,
    quotaRemaining: 100
  };

  const milestoneResult = selectModel(milestoneContext);
  console.log('  Selected model:', milestoneResult.selectedModel);
  console.log('  Escalated:', milestoneResult.escalated);
  console.log('  Escalation reason:', milestoneResult.escalationReason);
  console.log('  Expected: gpt-5.1, escalated for project_milestone');
  console.log('  Result:', milestoneResult.selectedModel === 'gpt-5.1' && milestoneResult.escalated ? '✅ PASS' : '❌ FAIL');

  // Test 5: Multi-file refactor (should escalate to gpt-4-turbo)
  console.log('\nTest 5: Multi-file refactor');
  const refactorContext: ModelSelectionContext = {
    taskType: 'refactor',
    complexity: 'high',
    filesAffected: 12,
    isArchitectureTask: false,
    isGovernanceTask: false,
    isMilestoneNearing: false,
    existingEscalationsToday: 0,
    quotaRemaining: 100
  };

  const refactorResult = selectModel(refactorContext);
  console.log('  Selected model:', refactorResult.selectedModel);
  console.log('  Escalated:', refactorResult.escalated);
  console.log('  Escalation reason:', refactorResult.escalationReason);
  console.log('  Expected: gpt-4-turbo, escalated for multi_file_refactor');
  console.log('  Result:', refactorResult.selectedModel === 'gpt-4-turbo' && refactorResult.escalated ? '✅ PASS' : '❌ FAIL');

  // Test 6: Fallback chain verification
  console.log('\nTest 6: Fallback chain');
  console.log('  Fallback chain for architecture task:', archResult.fallbackChain);
  console.log('  Expected: [gpt-5.1, gpt-4-turbo, gpt-4, local-builder]');
  const expectedChain = ['gpt-5.1', 'gpt-4-turbo', 'gpt-4', 'local-builder'];
  const chainMatches = JSON.stringify(archResult.fallbackChain) === JSON.stringify(expectedChain);
  console.log('  Result:', chainMatches ? '✅ PASS' : '❌ FAIL');

  console.log('\n=== Model Escalation Integration Test Complete ===\n');
}

// Run the test
testModelEscalationIntegration().catch(console.error);
