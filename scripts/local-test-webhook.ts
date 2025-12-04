/**
 * Local Test Webhook
 * Sends test webhook events to the local webhook endpoint
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
}

/**
 * Send a test webhook event
 */
async function sendTestWebhook(eventType: string, payload: TestWebhookPayload) {
  console.log(`Sending test webhook: ${eventType}`)
  console.log('Payload:', JSON.stringify(payload, null, 2))
  
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
    console.log('Response:', data)
    console.log('Status:', response.status)
  } catch (error) {
    console.error('Error sending webhook:', error)
  }
}

// Test payloads
const testPayloads = {
  'issues': {
    action: 'opened',
    repository: {
      name: 'test-repo',
      full_name: 'test-owner/test-repo',
      owner: {
        login: 'test-owner'
      }
    },
    sender: {
      login: 'test-user'
    }
  },
  'pull_request': {
    action: 'opened',
    repository: {
      name: 'test-repo',
      full_name: 'test-owner/test-repo',
      owner: {
        login: 'test-owner'
      }
    },
    sender: {
      login: 'test-user'
    }
  },
  'push': {
    action: 'push',
    repository: {
      name: 'test-repo',
      full_name: 'test-owner/test-repo',
      owner: {
        login: 'test-owner'
      }
    },
    sender: {
      login: 'test-user'
    }
  }
}

// Main execution
const eventType = process.argv[2] || 'issues'
const payload = testPayloads[eventType as keyof typeof testPayloads] || testPayloads.issues

console.log('\n=== Local Webhook Test ===\n')
console.log(`Target URL: ${WEBHOOK_URL}`)
console.log(`Event Type: ${eventType}\n`)

sendTestWebhook(eventType, payload)
