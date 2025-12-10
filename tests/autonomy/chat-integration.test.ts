/**
 * Test to verify autonomy mode detection in the context of chat API
 */

// Simulate the environment configuration from .env.local
process.env.FOREMAN_AUTONOMY_ENABLED = 'true';
process.env.NEXT_PUBLIC_FOREMAN_AUTONOMY_UI_FLAG = 'true';

import { isAutonomousModeEnabled } from '@/lib/foreman/dispatch';

console.log('='.repeat(60));
console.log('Simulating Foreman Chat Environment Status Check');
console.log('='.repeat(60));
console.log();

console.log('Environment Variables:');
console.log('  FOREMAN_AUTONOMY_ENABLED:', process.env.FOREMAN_AUTONOMY_ENABLED);
console.log('  NEXT_PUBLIC_FOREMAN_AUTONOMY_UI_FLAG:', process.env.NEXT_PUBLIC_FOREMAN_AUTONOMY_UI_FLAG);
console.log();

const autonomyEnabled = isAutonomousModeEnabled();
console.log('Autonomy Mode Detection Result:');
console.log('  isAutonomousModeEnabled():', autonomyEnabled);
console.log();

if (autonomyEnabled) {
  console.log('✅ SUCCESS: Autonomy mode is ENABLED');
  console.log('   Foreman will auto-approve tasks and execute autonomously');
} else {
  console.log('❌ FAILURE: Autonomy mode is DISABLED');
  console.log('   This would require manual approval for all actions');
}

console.log();
console.log('Expected behavior in chat:');
if (autonomyEnabled) {
  console.log('  ✓ Foreman should show "Autonomy mode enabled"');
  console.log('  ✓ Actions will be executed automatically');
  console.log('  ✓ No manual approval required');
} else {
  console.log('  ✗ Foreman would show "Autonomy mode is disabled"');
  console.log('  ✗ Actions would require manual approval');
}
console.log();
console.log('='.repeat(60));

if (!autonomyEnabled) {
  throw new Error('Autonomy mode detection failed - expected enabled, got disabled');
}
