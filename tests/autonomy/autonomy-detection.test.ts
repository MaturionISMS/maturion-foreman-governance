/**
 * Test script to verify autonomy mode detection
 */

// Test 1: FOREMAN_AUTONOMY_ENABLED should be detected
process.env.FOREMAN_AUTONOMY_ENABLED = 'true';
delete process.env.MATURION_AUTONOMOUS_MODE;
delete process.env.MATURION_ALLOW_AUTONOMOUS_BUILDS;

// Import the function
import { isAutonomousModeEnabled } from '@/lib/foreman/dispatch';

const test1 = isAutonomousModeEnabled();
console.log('Test 1 - FOREMAN_AUTONOMY_ENABLED=true:', test1 ? 'PASS ✓' : 'FAIL ✗');

// Test 2: MATURION_AUTONOMOUS_MODE should work as fallback
delete process.env.FOREMAN_AUTONOMY_ENABLED;
process.env.MATURION_AUTONOMOUS_MODE = 'true';

const test2 = isAutonomousModeEnabled();
console.log('Test 2 - MATURION_AUTONOMOUS_MODE=true:', test2 ? 'PASS ✓' : 'FAIL ✗');

// Test 3: MATURION_ALLOW_AUTONOMOUS_BUILDS should work as fallback
delete process.env.MATURION_AUTONOMOUS_MODE;
process.env.MATURION_ALLOW_AUTONOMOUS_BUILDS = 'true';

const test3 = isAutonomousModeEnabled();
console.log('Test 3 - MATURION_ALLOW_AUTONOMOUS_BUILDS=true:', test3 ? 'PASS ✓' : 'FAIL ✗');

// Test 4: Should return false when all are false
process.env.FOREMAN_AUTONOMY_ENABLED = 'false';
process.env.MATURION_AUTONOMOUS_MODE = 'false';
process.env.MATURION_ALLOW_AUTONOMOUS_BUILDS = 'false';

const test4 = !isAutonomousModeEnabled();
console.log('Test 4 - All variables false:', test4 ? 'PASS ✓' : 'FAIL ✗');

// Test 5: Priority order - FOREMAN_AUTONOMY_ENABLED should take precedence
process.env.FOREMAN_AUTONOMY_ENABLED = 'true';
process.env.MATURION_AUTONOMOUS_MODE = 'false';
process.env.MATURION_ALLOW_AUTONOMOUS_BUILDS = 'false';

const test5 = isAutonomousModeEnabled();
console.log('Test 5 - FOREMAN_AUTONOMY_ENABLED takes precedence:', test5 ? 'PASS ✓' : 'FAIL ✗');

// Summary
const allPassed = test1 && test2 && test3 && test4 && test5;
console.log('\n' + '='.repeat(50));
console.log('Overall:', allPassed ? 'ALL TESTS PASSED ✓' : 'SOME TESTS FAILED ✗');
console.log('='.repeat(50));

if (!allPassed) {
  throw new Error('Autonomy detection tests failed');
}
