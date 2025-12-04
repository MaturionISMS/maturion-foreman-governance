/**
 * Run Foreman Task
 * CLI script to manually trigger Foreman tasks
 */

const API_URL = process.env.API_URL || 'http://localhost:3000/api/foreman/run'

interface TaskParams {
  taskName: string
  params?: Record<string, any>
}

/**
 * Run a Foreman task via API
 */
async function runForemanTask(taskName: string, params: Record<string, any> = {}) {
  console.log(`Running Foreman task: ${taskName}`)
  console.log('Parameters:', JSON.stringify(params, null, 2))
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskName,
        params,
      }),
    })
    
    const data = await response.json()
    console.log('\nResponse:')
    console.log(JSON.stringify(data, null, 2))
    console.log('\nStatus:', response.status)
    
    return data
  } catch (error) {
    console.error('Error running task:', error)
    throw error
  }
}

// Parse command line arguments
const args = process.argv.slice(2)
const taskName = args[0]
const paramsJson = args[1]

if (!taskName) {
  console.log('Usage: node run-foreman-task.ts <taskName> [paramsJson]')
  console.log('\nAvailable tasks:')
  console.log('  - interpret-governance')
  console.log('  - run-build-wave')
  console.log('  - run-self-test')
  console.log('  - apply-file-changes')
  console.log('\nExample:')
  console.log('  node run-foreman-task.ts run-self-test')
  console.log('  node run-foreman-task.ts interpret-governance \'{"owner":"test","repo":"test-repo"}\'')
  process.exit(1)
}

const params = paramsJson ? JSON.parse(paramsJson) : {}

console.log('\n=== Run Foreman Task ===\n')
console.log(`API URL: ${API_URL}`)
console.log(`Task: ${taskName}\n`)

runForemanTask(taskName, params)
  .then(() => {
    console.log('\nTask completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\nTask failed:', error)
    process.exit(1)
  })
