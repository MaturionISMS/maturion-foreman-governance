#!/usr/bin/env node
/**
 * Test Pilot Build Wave 1
 * 
 * Tests the complete pilot build wave flow:
 * 1. Trigger via API with pilotWave: true
 * 2. Generate build report
 * 3. Validate end-to-end flow
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

interface PilotBuildRequest {
  organisationId: string
  triggerSource: 'issue_command' | 'webhook' | 'scheduled'
  triggerContext?: any
  autonomousBuildEnabled: boolean
  pilotWave: boolean
  waveNumber: number
  feature: string
  createPR: boolean
  owner: string
  repo: string
  branch: string
  baseBranch: string
  generateReport: boolean
}

interface PilotBuildResponse {
  success: boolean
  sequenceId?: string
  status?: string
  prUrl?: string
  reportPath?: string
  message?: string
  error?: string
}

async function testPilotBuild() {
  console.log('🧪 Testing Pilot Build Wave 1...\n')
  
  // Test 1: Trigger pilot build via API
  console.log('📋 Test 1: Trigger Pilot Build via API')
  console.log('----------------------------------------')
  
  const request: PilotBuildRequest = {
    organisationId: 'maturion_isms',
    triggerSource: 'issue_command',
    triggerContext: {
      pilotWave: true,
      waveNumber: 1,
      feature: 'foreman-status-dashboard',
      test: true
    },
    autonomousBuildEnabled: true,
    pilotWave: true,
    waveNumber: 1,
    feature: 'foreman-status-dashboard',
    createPR: false, // Don't actually create PR in test
    owner: 'MaturionISMS',
    repo: 'maturion-foreman-app',
    branch: 'foreman/pilot-wave-1',
    baseBranch: 'main',
    generateReport: true
  }
  
  console.log('Request:', JSON.stringify(request, null, 2))
  console.log('')
  
  try {
    const response = await fetch(`${BASE_URL}/api/foreman/run-build`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
    
    const result: PilotBuildResponse = await response.json()
    
    console.log('Response Status:', response.status)
    console.log('Response:', JSON.stringify(result, null, 2))
    console.log('')
    
    if (result.success) {
      console.log('✅ Pilot build triggered successfully')
      console.log(`   Sequence ID: ${result.sequenceId}`)
      console.log(`   Status: ${result.status}`)
      console.log(`   Message: ${result.message}`)
      if (result.reportPath) {
        console.log(`   Report: ${result.reportPath}`)
      }
    } else {
      console.log('❌ Pilot build failed')
      console.log(`   Error: ${result.error}`)
    }
    
  } catch (error) {
    console.error('❌ Request failed:', error)
  }
  
  console.log('')
  
  // Test 2: Verify build sequence status
  console.log('📋 Test 2: Verify Build Sequence Status')
  console.log('----------------------------------------')
  
  try {
    const response = await fetch(`${BASE_URL}/api/foreman/run-build?organisationId=maturion_isms`)
    const result = await response.json()
    
    console.log('Response Status:', response.status)
    console.log('Build Sequences Count:', result.count)
    
    if (result.success && result.sequences) {
      console.log('')
      console.log('Recent Build Sequences:')
      result.sequences.slice(0, 3).forEach((seq: any, index: number) => {
        console.log(`\n${index + 1}. Sequence ${seq.id}`)
        console.log(`   Status: ${seq.status}`)
        console.log(`   Tasks: ${seq.tasksCount}`)
        console.log(`   QA Results: ${seq.qaResultsCount}`)
        console.log(`   Created: ${new Date(seq.createdAt).toLocaleString()}`)
      })
      
      console.log('\n✅ Build sequence status verified')
    } else {
      console.log('⚠️  No build sequences found')
    }
    
  } catch (error) {
    console.error('❌ Status check failed:', error)
  }
  
  console.log('')
  
  // Test 3: Test GitHub issue command detection
  console.log('📋 Test 3: Test GitHub Issue Command Detection')
  console.log('------------------------------------------------')
  
  const testCommands = [
    '@foreman execute Pilot Build Wave 1',
    'foreman, execute pilot build wave 2',
    'Hey @foreman execute Pilot Build Wave 3 please',
    'This is not a pilot build command'
  ]
  
  // Import the detection function
  const { detectPilotBuildCommand } = await import('../lib/foreman/orchestrator.js')
  
  testCommands.forEach((command, index) => {
    const event = {
      event: 'issue_comment',
      payload: {
        comment: {
          body: command
        }
      }
    }
    
    const result = detectPilotBuildCommand(event)
    console.log(`\n${index + 1}. "${command}"`)
    console.log(`   Detected: ${result.isPilotBuild ? '✅ Yes' : '❌ No'}`)
    if (result.isPilotBuild) {
      console.log(`   Wave Number: ${result.waveNumber}`)
    }
  })
  
  console.log('\n✅ Command detection test completed')
  
  console.log('')
  console.log('=' .repeat(50))
  console.log('🎉 All pilot build tests completed!')
  console.log('=' .repeat(50))
}

// Run tests
testPilotBuild().catch(error => {
  console.error('Test suite failed:', error)
  process.exit(1)
})
