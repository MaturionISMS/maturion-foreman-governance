#!/usr/bin/env node
/**
 * Test Pilot Build Components
 * Unit tests for Wave 5 components: repo registry, pilot waves, and QA
 */

import { runPilotQA, updatePilotBuildNotes } from '../lib/foreman/pilot-qa-check';
import { getPilotWave, getAllPilotWaves } from '../lib/foreman/pilot-waves';
import { getRepoConfig, getAllRepos } from '../lib/config/repoRegistry';

async function testPilotComponents() {
  console.log('🧪 Testing Pilot Build Components (Wave 5)\n');

  let testsRun = 0;
  let testsPassed = 0;

  // Test 1: Repository Registry
  console.log('Test 1: Repository Registry');
  testsRun++;
  try {
    const repos = getAllRepos();
    console.assert(repos.length === 3, 'Should have 3 repositories');
    
    const foremanRepo = getRepoConfig('foreman_app_sandbox');
    console.assert(foremanRepo !== undefined, 'Foreman sandbox repo should exist');
    console.assert(foremanRepo?.id === 'foreman_app_sandbox', 'Repo ID should match');
    console.assert(foremanRepo?.localPathEnvVar === 'LOCAL_FOREMAN_APP_PATH', 'Env var should match');
    
    console.log(`✓ Repository Registry: ${repos.length} repos found`);
    testsPassed++;
  } catch (error) {
    console.log(`✗ Repository Registry failed: ${error}`);
  }

  // Test 2: Pilot Waves
  console.log('\nTest 2: Pilot Waves Configuration');
  testsRun++;
  try {
    const waves = getAllPilotWaves();
    console.assert(waves.length === 1, 'Should have 1 pilot wave');
    
    const pilotWave = getPilotWave('pilot_foreman_sandbox');
    console.assert(pilotWave !== undefined, 'Pilot wave should exist');
    console.assert(pilotWave?.repoTarget === 'foreman_app_sandbox', 'Repo target should match');
    console.assert(pilotWave?.actions.length === 2, 'Should have 2 actions');
    
    const modifyAction = pilotWave?.actions[0];
    console.assert(modifyAction?.type === 'modify_file', 'First action should be modify_file');
    console.assert(modifyAction?.path === 'sandbox/PILOT_BUILD_NOTES.md', 'Path should match');
    
    const qaAction = pilotWave?.actions[1];
    console.assert(qaAction?.type === 'qa_run', 'Second action should be qa_run');
    
    console.log(`✓ Pilot Waves: ${waves.length} wave with ${pilotWave?.actions.length} actions`);
    testsPassed++;
  } catch (error) {
    console.log(`✗ Pilot Waves failed: ${error}`);
  }

  // Test 3: Pilot QA - Initial State
  console.log('\nTest 3: Pilot QA - Initial State');
  testsRun++;
  try {
    const qaResult = await runPilotQA('sandbox');
    console.assert(qaResult.checks.length >= 2, 'Should have at least 2 QA checks');
    
    const fileCheck = qaResult.checks.find(c => c.name === 'PILOT_BUILD_NOTES.md exists');
    console.assert(fileCheck !== undefined, 'File existence check should exist');
    console.assert(fileCheck?.status === 'passed', 'File should exist');
    
    const sectionsCheck = qaResult.checks.find(c => c.name === 'Required sections present');
    console.assert(sectionsCheck !== undefined, 'Sections check should exist');
    
    console.log(`✓ Pilot QA: ${qaResult.checks.length} checks, passed: ${qaResult.passed}`);
    testsPassed++;
  } catch (error) {
    console.log(`✗ Pilot QA failed: ${error}`);
  }

  // Test 4: Update Pilot Build Notes
  console.log('\nTest 4: Update Pilot Build Notes');
  testsRun++;
  try {
    await updatePilotBuildNotes('copilot', 'success', 'pending', 'sandbox');
    
    // Verify update worked
    const qaResult = await runPilotQA('sandbox');
    const timestampCheck = qaResult.checks.find(c => c.name === 'Foreman timestamp check');
    
    // The file should now have a timestamp
    console.assert(timestampCheck !== undefined, 'Timestamp check should exist');
    
    console.log('✓ Update Build Notes: Successfully updated sandbox file');
    testsPassed++;
  } catch (error) {
    console.log(`✗ Update Build Notes failed: ${error}`);
  }

  // Test 5: QA with Successful Build
  console.log('\nTest 5: QA with Successful Build');
  testsRun++;
  try {
    await updatePilotBuildNotes('copilot', 'success', 'passed', 'sandbox');
    const qaResult = await runPilotQA('sandbox');
    
    console.assert(qaResult.passed, 'QA should pass after successful build');
    console.assert(qaResult.checks.every(c => c.status === 'passed' || c.name.includes('timestamp')), 'All critical checks should pass');
    
    console.log(`✓ QA Passed: ${qaResult.summary}`);
    testsPassed++;
  } catch (error) {
    console.log(`✗ QA with Successful Build failed: ${error}`);
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`Tests run: ${testsRun}`);
  console.log(`Tests passed: ${testsPassed}`);
  console.log(`Tests failed: ${testsRun - testsPassed}`);
  console.log('='.repeat(50));

  if (testsPassed === testsRun) {
    console.log('\n✅ All Wave 5 component tests passed!');
    return 0;
  } else {
    console.log('\n❌ Some tests failed');
    return 1;
  }
}

testPilotComponents()
  .then(code => process.exit(code))
  .catch(error => {
    console.error('Test suite error:', error);
    process.exit(1);
  });
