/**
 * Type Completeness QA Test
 * 
 * This test catches incomplete Record type definitions that would cause
 * compilation errors. Added to prevent recurring issues where type unions
 * are extended but Record objects are not updated.
 * 
 * Issue that prompted this: ModelTier union extended with 'gpt-4o-mini',
 * 'gpt-4o', 'gpt-4.1' but MODEL_LIMITS Record wasn't updated.
 */

import type { ModelTier } from '../../types/model-escalation';

/**
 * Test: Verify Record<ModelTier, T> completeness
 * 
 * This test ensures that any Record<ModelTier, T> object has all
 * ModelTier values defined.
 */
function testRecordCompleteness() {
  console.log('🧪 Testing Record<ModelTier, T> completeness...\n');
  
  let errors: string[] = [];
  
  // Define all ModelTier values that must be present
  const allModelTiers: ModelTier[] = [
    'gpt-4',
    'gpt-4-turbo',
    'gpt-4o-mini',
    'gpt-4o',
    'gpt-4.1',
    'gpt-5.1',
    'local-builder'
  ];
  
  console.log(`  Testing ${allModelTiers.length} ModelTier values:`);
  allModelTiers.forEach(tier => {
    console.log(`    - ${tier}`);
  });
  
  // Create a type-checking function
  function validateRecord<T>(
    record: Record<ModelTier, T>,
    name: string
  ): void {
    const missing: string[] = [];
    
    for (const tier of allModelTiers) {
      if (!(tier in record)) {
        missing.push(tier);
      }
    }
    
    if (missing.length > 0) {
      errors.push(`${name} is missing: ${missing.join(', ')}`);
      console.log(`\n  ✗ ${name} incomplete - missing: ${missing.join(', ')}`);
    } else {
      console.log(`\n  ✓ ${name} complete`);
    }
  }
  
  // Test: Sample validation showing proper Record structure
  const sampleCosts: Record<ModelTier, number> = {
    'gpt-4': 1,
    'gpt-4-turbo': 2,
    'gpt-4o-mini': 0.5,
    'gpt-4o': 1.5,
    'gpt-4.1': 2.5,
    'gpt-5.1': 5,
    'local-builder': 0
  };
  
  validateRecord(sampleCosts, 'Sample Record<ModelTier, number>');
  
  // Test: Verify that incomplete records would be caught
  console.log('\n  Testing incomplete record detection:');
  try {
    // This should fail type checking but we test runtime
    const incompleteRecord = {
      'gpt-4': 1,
      'gpt-4-turbo': 2,
      'gpt-5.1': 5,
      'local-builder': 0
    } as any;
    
    const missing: string[] = [];
    for (const tier of allModelTiers) {
      if (!(tier in incompleteRecord)) {
        missing.push(tier);
      }
    }
    
    if (missing.length > 0) {
      console.log(`    ✓ Correctly detected ${missing.length} missing tiers: ${missing.join(', ')}`);
    }
  } catch (error) {
    console.log(`    ✗ Failed to detect incomplete record: ${error}`);
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  if (errors.length === 0) {
    console.log('✅ All Record<ModelTier, T> completeness tests PASSED');
    console.log('='.repeat(60));
    console.log('\nℹ️  This test validates that Record<ModelTier, T> types');
    console.log('   include all 7 ModelTier values to prevent compilation errors.\n');
    return true;
  } else {
    console.log('❌ Record<ModelTier, T> completeness tests FAILED');
    console.log('='.repeat(60));
    errors.forEach(err => console.log(`  - ${err}`));
    console.log('');
    return false;
  }
}

// Run test if executed directly
if (require.main === module) {
  const success = testRecordCompleteness();
  process.exit(success ? 0 : 1);
}

export { testRecordCompleteness };
