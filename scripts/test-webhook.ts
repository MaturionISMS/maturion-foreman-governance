/**
 * Comprehensive Webhook Test Script
 * Tests the Foreman webhook endpoint with various scenarios
 */

const WEBHOOK_URL = process.env.WEBHOOK_URL || 'http://localhost:3000/api/github/webhook'

interface TestWebhookPayload {
  action: string
  repository: {
    name: string
    full_name: string
    owner: {
      login: string
    }
  }
  sender: {
    login: string
  }
  installation?: {
    account?: {
      id: number
    }
  }
  issue?: {
    number: number
    title: string
    body: string
    user: {
      login: string
    }
  }
  pull_request?: {
    number: number
    title: string
    body: string
    user: {
      login: string
    }
  }
  comment?: {
    body: string
    user: {
      login: string
    }
  }
}

/**
 * Send a test webhook event
 */
async function sendTestWebhook(
  eventType: string, 
  payload: TestWebhookPayload,
  testName: string
): Promise<boolean> {
  console.log(`\n📤 Test: ${testName}`)
  console.log(`   Event: ${eventType}`)
  
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-GitHub-Event': eventType,
        'X-GitHub-Delivery': `test-${Date.now()}`,
      },
      body: JSON.stringify(payload),
    })
    
    const data = await response.json()
    
    if (response.status === 200 && data.ok !== false) {
      console.log(`   ✅ Status: ${response.status}`)
      console.log(`   Response:`, data)
      return true
    } else {
      console.log(`   ❌ Status: ${response.status}`)
      console.log(`   Response:`, data)
      return false
    }
  } catch (error) {
    console.log(`   ❌ Error:`, error instanceof Error ? error.message : 'Unknown error')
    return false
  }
}

// Test payloads
const baseRepository = {
  name: 'test-repo',
  full_name: 'test-owner/test-repo',
  owner: {
    login: 'test-owner'
  }
}

const baseSender = {
  login: 'test-user'
}

const baseInstallation = {
  account: {
    id: 12345
  }
}

const tests = [
  {
    name: 'Issue opened event',
    eventType: 'issues',
    payload: {
      action: 'opened',
      repository: baseRepository,
      sender: baseSender,
      installation: baseInstallation,
      issue: {
        number: 1,
        title: 'Test issue',
        body: 'This is a test issue',
        user: baseSender
      }
    }
  },
  {
    name: 'Issue comment with @foreman mention',
    eventType: 'issue_comment',
    payload: {
      action: 'created',
      repository: baseRepository,
      sender: baseSender,
      installation: baseInstallation,
      issue: {
        number: 1,
        title: 'Test issue',
        body: 'Original issue',
        user: baseSender
      },
      comment: {
        body: '@foreman test',
        user: baseSender
      }
    }
  },
  {
    name: 'Pull request opened',
    eventType: 'pull_request',
    payload: {
      action: 'opened',
      repository: baseRepository,
      sender: baseSender,
      installation: baseInstallation,
      pull_request: {
        number: 1,
        title: 'Test PR',
        body: 'This is a test pull request',
        user: baseSender
      }
    }
  },
  {
    name: 'Push event (should be ignored)',
    eventType: 'push',
    payload: {
      action: 'push',
      repository: baseRepository,
      sender: baseSender
    }
  }
]

// Run tests
async function runTests() {
  console.log('='.repeat(60))
  console.log('🧪 Foreman Webhook Test Suite')
  console.log('='.repeat(60))
  console.log(`Target URL: ${WEBHOOK_URL}`)
  
  let passed = 0
  let failed = 0
  
  // Test GET endpoint
  console.log('\n📤 Test: GET request to webhook endpoint')
  try {
    const response = await fetch(WEBHOOK_URL, { method: 'GET' })
    const data = await response.json()
    if (response.status === 200) {
      console.log(`   ✅ Status: ${response.status}`)
      console.log(`   Response:`, data)
      passed++
    } else {
      console.log(`   ❌ Status: ${response.status}`)
      failed++
    }
  } catch (error) {
    console.log(`   ❌ Error:`, error instanceof Error ? error.message : 'Unknown error')
    failed++
  }
  
  // Test POST endpoints
  for (const test of tests) {
    const result = await sendTestWebhook(
      test.eventType, 
      test.payload, 
      test.name
    )
    
    if (result) {
      passed++
    } else {
      failed++
    }
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('📊 Test Summary')
  console.log('='.repeat(60))
  console.log(`✅ Passed: ${passed}`)
  console.log(`❌ Failed: ${failed}`)
  console.log(`📈 Total: ${passed + failed}`)
  console.log('='.repeat(60))
  
  if (failed > 0) {
    console.log('\n⚠️  Some tests failed. Check the output above for details.')
    console.log('💡 Note: Tests may fail if required environment variables are not set.')
    console.log('   See .env.example for required configuration.')
    process.exit(1)
  } else {
    console.log('\n✨ All tests passed!')
    process.exit(0)
  }
}

// Main execution
runTests().catch((error) => {
  console.error('\n❌ Test suite failed:', error)
  process.exit(1)
})
