/**
 * Test Enhanced QA System
 * 
 * Tests the complete QA enhancement suite including:
 * - Log parsing QA
 * - Zero-warning policy
 * - Vercel simulation
 * - QA miss tracking
 */

import { runEnhancedQA, runQuickQA } from '../lib/foreman/qa/enhanced-qa-runner';
import { recordQAMiss, getQAMissStatistics, generateQAMissReport } from '../lib/foreman/memory/qa-miss-tracker';

async function testEnhancedQA() {
  console.log('\n=== Testing Enhanced QA System ===\n');

  // Test 1: Quick QA (logs only)
  console.log('Test 1: Running Quick QA (logs only)...');
  try {
    const quickResult = runQuickQA('/tmp');
    console.log('Quick QA Result:', quickResult.overallSummary);
    console.log('Checks:', quickResult.checks);
    console.log('Blockers:', quickResult.blockersFound.length);
  } catch (error) {
    console.error('Quick QA Test Error:', error);
  }

  // Test 2: Log parsing validation
  console.log('\nTest 2: Testing log parsing...');
  try {
    const result = runEnhancedQA({ logsDir: '/tmp', skipVercelSimulation: true });
    console.log('Log Parsing:', {
      buildParsed: result.logParsing.build.parsed,
      lintParsed: result.logParsing.lint.parsed,
      testParsed: result.logParsing.test.parsed,
    });
    console.log('Build Errors:', result.logParsing.build.errors.length);
    console.log('Lint Errors:', result.logParsing.lint.errors.length);
    console.log('Test Errors:', result.logParsing.test.errors.length);
  } catch (error) {
    console.error('Log Parsing Test Error:', error);
  }

  // Test 3: Zero-warning policy
  console.log('\nTest 3: Testing zero-warning policy...');
  try {
    const result = runEnhancedQA({ logsDir: '/tmp', skipVercelSimulation: true });
    console.log('Zero-Warning Policy:', result.zeroWarning.summary);
    console.log('Total Issues:', result.zeroWarning.totalIssues);
    console.log('Build Warnings:', result.zeroWarning.buildWarnings.length);
    console.log('Lint Warnings:', result.zeroWarning.lintWarnings.length);
  } catch (error) {
    console.error('Zero-Warning Policy Test Error:', error);
  }

  // Test 4: QA miss tracking
  console.log('\nTest 4: Testing QA miss tracking...');
  try {
    // Record a sample QA miss
    const miss = recordQAMiss({
      missedSignal: {
        errorType: 'test_build_error',
        errorMessage: 'Sample build error for testing',
        logFile: '/tmp/build.log',
        lineNumber: 42,
        impactLevel: 'high',
      },
      rootCause: {
        category: 'missing_pattern',
        description: 'Error pattern not in detection list',
        whyMissed: 'Pattern was new and not yet added to QA checks',
      },
      architecturalGap: {
        gapType: 'missing_qa_rule',
        description: 'QA did not check for this error type',
        documentationNeeded: ['Error pattern documentation'],
        architectureUpdate: 'Add pattern to error detection',
      },
      qaGap: {
        checkMissing: 'Build error pattern check',
        checkType: 'pattern_matching',
        howToDetect: 'Add regex pattern to ERROR_PATTERNS',
        implementationPlan: 'Update log-parsing-qa.ts',
      },
      enforcementRuleAdded: {
        ruleType: 'error_pattern',
        ruleName: 'detect_sample_error',
        ruleDescription: 'Detect sample build errors',
        implementation: 'Added to ERROR_PATTERNS array',
        filesModified: ['lib/foreman/qa/log-parsing-qa.ts'],
        verificationMethod: 'Test with sample error log',
      },
      preventionStatus: 'pending',
    });

    console.log('QA Miss Recorded:', miss.id);
    console.log('Error Type:', miss.missedSignal.errorType);
    console.log('Impact Level:', miss.missedSignal.impactLevel);

    // Get statistics
    const stats = getQAMissStatistics();
    console.log('\nQA Miss Statistics:');
    console.log('Total Misses:', stats.totalMisses);
    console.log('By Error Type:', stats.byErrorType);
    console.log('By Impact Level:', stats.byImpactLevel);

    // Generate report
    console.log('\n--- QA Miss Report Preview ---');
    const report = generateQAMissReport();
    console.log(report.substring(0, 500) + '...');
  } catch (error) {
    console.error('QA Miss Tracking Test Error:', error);
  }

  // Test 5: Generate comprehensive report
  console.log('\nTest 5: Generating comprehensive QA report...');
  try {
    const result = runEnhancedQA({ 
      logsDir: '/tmp', 
      skipVercelSimulation: true,
      buildSequenceId: 'test_sequence_123',
      projectId: 'test_project_456',
    });
    
    console.log('\n--- QA Report Preview ---');
    console.log(result.reportMarkdown.substring(0, 1000) + '...');
    
    console.log('\n--- Full Report Statistics ---');
    console.log('Report Length:', result.reportMarkdown.length, 'characters');
    console.log('Passed:', result.passed);
    console.log('Blockers:', result.blockersFound.length);
  } catch (error) {
    console.error('Report Generation Test Error:', error);
  }

  console.log('\n=== Enhanced QA System Tests Complete ===\n');
}

// Run tests
testEnhancedQA().catch(error => {
  console.error('Test suite failed:', error);
  process.exit(1);
});
