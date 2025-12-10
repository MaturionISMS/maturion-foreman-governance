#!/usr/bin/env node
/**
 * Functional App Verification for CS3
 * 
 * This script tests that the CS3 Incident Feedback Loop actually WORKS
 * as a functional application, not just that it compiles.
 * 
 * Per True North principle: QA must verify architecture materializes
 * as a functional, working app.
 */

import http from 'http';
import fs from 'fs/promises';
import path from 'path';

const BASE_URL = 'http://localhost:3000';
const API_BASE = `${BASE_URL}/api/foreman/incidents`;

// Test colors
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

let passCount = 0;
let failCount = 0;

function pass(message: string) {
  console.log(`${GREEN}✓${RESET} ${message}`);
  passCount++;
}

function fail(message: string, error?: any) {
  console.log(`${RED}✗${RESET} ${message}`);
  if (error) {
    console.log(`  ${RED}Error: ${error.message || error}${RESET}`);
  }
  failCount++;
}

function section(title: string) {
  console.log(`\n${YELLOW}━━━ ${title} ━━━${RESET}\n`);
}

async function fetchJSON(url: string, options: any = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

async function waitForServer(maxAttempts = 10) {
  section('Checking Server Availability');
  
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await fetch(`${BASE_URL}/api/foreman/status`);
      pass(`Server is running at ${BASE_URL}`);
      return true;
    } catch (error) {
      if (i === maxAttempts - 1) {
        fail('Server is not running', error);
        console.log(`\nPlease start the server with: npm run dev\n`);
        return false;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return false;
}

async function testIncidentCreation() {
  section('Test 1: Incident Creation');
  
  try {
    const response = await fetchJSON(`${API_BASE}/create`, {
      method: 'POST',
      body: JSON.stringify({
        component: 'functional-test-component',
        description: 'Functional test incident - verifying CS3 works',
        deploymentId: 'deploy_test_123',
        prUrl: 'https://github.com/test/pr/999',
      }),
    });

    if (response.success && response.incident) {
      pass('Incident created successfully via API');
      pass(`Incident ID: ${response.incident.id}`);
      pass(`Initial state: ${response.incident.state}`);
      return response.incident;
    } else {
      fail('Incident creation returned unexpected response');
      return null;
    }
  } catch (error) {
    fail('Failed to create incident', error);
    return null;
  }
}

async function testIncidentList(testIncident: any) {
  section('Test 2: Incident Listing');
  
  try {
    const response = await fetchJSON(`${API_BASE}?active=true`);

    if (response.success && Array.isArray(response.incidents)) {
      pass(`Retrieved ${response.incidents.length} active incident(s)`);
      
      const found = response.incidents.find((i: any) => i.id === testIncident.id);
      if (found) {
        pass('Test incident found in active list');
      } else {
        fail('Test incident not found in active list');
      }
    } else {
      fail('Incident listing returned unexpected response');
    }
  } catch (error) {
    fail('Failed to list incidents', error);
  }
}

async function testFeedbackSubmission(testIncident: any, feedback: string) {
  section(`Test 3: Submit Feedback - "${feedback}"`);
  
  try {
    const response = await fetchJSON(`${API_BASE}/verify`, {
      method: 'POST',
      body: JSON.stringify({
        incidentId: testIncident.id,
        feedback,
        userId: 'functional-tester',
      }),
    });

    if (response.success && response.incident) {
      pass(`Feedback "${feedback}" submitted successfully`);
      pass(`Updated state: ${response.incident.state}`);
      pass(`User feedback recorded: ${response.incident.user_feedback}`);
      return response.incident;
    } else {
      fail(`Feedback submission returned unexpected response`);
      return null;
    }
  } catch (error) {
    fail(`Failed to submit feedback "${feedback}"`, error);
    return null;
  }
}

async function testLessonsLearned(testIncident: any) {
  section('Test 4: Lessons Learned Generation');
  
  const lessonsPath = path.join(
    process.cwd(),
    'memory',
    'lessons-learned',
    `incident-${testIncident.id}.md`
  );
  
  try {
    const content = await fs.readFile(lessonsPath, 'utf-8');
    
    if (content.includes('Lessons Learned')) {
      pass('Lessons learned file generated');
      pass(`File location: ${lessonsPath}`);
      
      if (content.includes(testIncident.component)) {
        pass('Lessons file contains incident component');
      } else {
        fail('Lessons file missing incident component');
      }
    } else {
      fail('Lessons file missing expected content');
    }
  } catch (error) {
    fail('Lessons learned file not found', error);
  }
}

async function testIncidentStorage(testIncident: any) {
  section('Test 5: Incident Persistence');
  
  const incidentPath = path.join(
    process.cwd(),
    'memory',
    'incidents',
    `${testIncident.id}.json`
  );
  
  try {
    const content = await fs.readFile(incidentPath, 'utf-8');
    const stored = JSON.parse(content);
    
    if (stored.id === testIncident.id) {
      pass('Incident persisted to storage');
      pass(`File location: ${incidentPath}`);
      
      if (stored.state === 'resolved') {
        pass('Incident state correctly saved as resolved');
      } else {
        fail(`Incident state incorrect: ${stored.state}`);
      }
      
      if (stored.resolved_by === 'functional-tester') {
        pass('Resolver correctly recorded');
      } else {
        fail(`Resolver incorrect: ${stored.resolved_by}`);
      }
    } else {
      fail('Stored incident ID mismatch');
    }
  } catch (error) {
    fail('Incident file not found in storage', error);
  }
}

async function testUIAccessibility() {
  section('Test 6: UI Page Accessibility');
  
  try {
    const response = await fetch(`${BASE_URL}/foreman/incidents`);
    
    if (response.ok) {
      pass('Incidents page is accessible');
      
      const html = await response.text();
      
      if (html.includes('Incident Verification')) {
        pass('Page title rendered correctly');
      } else {
        fail('Page title not found in HTML');
      }
      
      // Check for button text in HTML
      const buttons = ['Not Visible', 'Not Functional', 'Incorrect Behavior', 'Resolved'];
      buttons.forEach(buttonText => {
        if (html.includes(buttonText)) {
          pass(`Button "${buttonText}" found in page`);
        } else {
          fail(`Button "${buttonText}" not found in page`);
        }
      });
    } else {
      fail(`UI page returned HTTP ${response.status}`);
    }
  } catch (error) {
    fail('Failed to access UI page', error);
  }
}

async function cleanup(testIncident: any) {
  section('Cleanup');
  
  try {
    // Delete test incident file
    const incidentPath = path.join(
      process.cwd(),
      'memory',
      'incidents',
      `${testIncident.id}.json`
    );
    await fs.unlink(incidentPath);
    pass('Test incident file deleted');
    
    // Delete lessons file
    const lessonsPath = path.join(
      process.cwd(),
      'memory',
      'lessons-learned',
      `incident-${testIncident.id}.md`
    );
    await fs.unlink(lessonsPath);
    pass('Test lessons file deleted');
  } catch (error) {
    console.log(`⚠️  Cleanup warning: ${error.message || error}`);
  }
}

async function runTests() {
  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║  CS3 Functional App Verification        ║');
  console.log('║  Testing Architecture → Functional App  ║');
  console.log('╚══════════════════════════════════════════╝');

  // Check server
  const serverAvailable = await waitForServer();
  if (!serverAvailable) {
    process.exit(1);
  }

  // Run functional tests
  const testIncident = await testIncidentCreation();
  
  if (!testIncident) {
    console.log(`\n${RED}Cannot continue tests without creating incident${RESET}\n`);
    process.exit(1);
  }

  await testIncidentList(testIncident);
  
  // Test "not_visible" feedback
  const updated1 = await testFeedbackSubmission(testIncident, 'not_visible');
  
  if (updated1) {
    // Test "resolved" feedback
    const updated2 = await testFeedbackSubmission(updated1, 'resolved');
    
    if (updated2) {
      await testLessonsLearned(updated2);
      await testIncidentStorage(updated2);
      await testUIAccessibility();
      
      // Cleanup
      await cleanup(updated2);
    }
  }

  // Summary
  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║  Test Summary                            ║');
  console.log('╚══════════════════════════════════════════╝\n');
  console.log(`  ${GREEN}Passed:${RESET} ${passCount}`);
  console.log(`  ${RED}Failed:${RESET} ${failCount}`);
  
  if (failCount === 0) {
    console.log(`\n${GREEN}✓ All tests passed! CS3 is functionally working.${RESET}\n`);
    process.exit(0);
  } else {
    console.log(`\n${RED}✗ Some tests failed. CS3 needs fixes.${RESET}\n`);
    process.exit(1);
  }
}

// Run tests
runTests().catch(error => {
  console.error(`\n${RED}Fatal error:${RESET}`, error);
  process.exit(1);
});
