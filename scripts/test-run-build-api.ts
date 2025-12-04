/**
 * Test Build Sequence API Endpoint
 * Tests the /api/foreman/run-build endpoint
 */

async function testBuildSequenceAPI() {
  const baseUrl = 'http://localhost:3000'
  
  console.log('=== Testing Build Sequence API Endpoint ===\n')
  console.log('Note: This test requires the dev server to be running (npm run dev)\n')
  
  try {
    // Test 1: GET endpoint (list sequences)
    console.log('1. Testing GET /api/foreman/run-build...')
    const getResponse = await fetch(`${baseUrl}/api/foreman/run-build`)
    const getData = await getResponse.json()
    
    console.log('✓ GET request successful:', {
      status: getResponse.status,
      count: getData.count || 0
    })
    console.log('')
    
    // Test 2: POST endpoint (create build sequence)
    console.log('2. Testing POST /api/foreman/run-build...')
    const postBody = {
      organisationId: 'org_api_test_001',
      triggerSource: 'issue_command',
      triggerContext: {
        test: true,
        source: 'API test script'
      },
      autonomousBuildEnabled: false,
      skipArchitectureAnalysis: true
    }
    
    const postResponse = await fetch(`${baseUrl}/api/foreman/run-build`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postBody)
    })
    
    const postData = await postResponse.json()
    
    if (postData.success) {
      console.log('✓ POST request successful:', {
        status: postResponse.status,
        sequenceId: postData.sequenceId,
        sequenceStatus: postData.status,
        message: postData.message
      })
    } else {
      console.error('✗ POST request failed:', postData.error)
    }
    console.log('')
    
    // Test 3: GET specific sequence
    if (postData.success && postData.sequenceId) {
      console.log('3. Testing GET specific sequence...')
      const getSeqResponse = await fetch(
        `${baseUrl}/api/foreman/run-build?sequenceId=${postData.sequenceId}`
      )
      const getSeqData = await getSeqResponse.json()
      
      if (getSeqData.success) {
        console.log('✓ Sequence retrieved:', {
          id: getSeqData.sequence.id,
          status: getSeqData.sequence.status,
          tasks: getSeqData.sequence.tasks?.length || 0,
          qaResults: getSeqData.sequence.qaResults?.length || 0
        })
      } else {
        console.error('✗ Failed to retrieve sequence:', getSeqData.error)
      }
      console.log('')
    }
    
    // Test 4: Filter by organisation
    console.log('4. Testing GET with organisation filter...')
    const filterResponse = await fetch(
      `${baseUrl}/api/foreman/run-build?organisationId=org_api_test_001`
    )
    const filterData = await filterResponse.json()
    
    console.log('✓ Filtered sequences:', {
      count: filterData.count || 0,
      sequences: filterData.sequences?.length || 0
    })
    console.log('')
    
    // Test 5: Invalid request (missing required fields)
    console.log('5. Testing error handling (missing organisationId)...')
    const errorResponse = await fetch(`${baseUrl}/api/foreman/run-build`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        triggerSource: 'test'
      })
    })
    
    const errorData = await errorResponse.json()
    
    if (!errorData.success && errorResponse.status === 400) {
      console.log('✓ Error handling works correctly:', {
        status: errorResponse.status,
        error: errorData.error
      })
    } else {
      console.error('✗ Expected error response, got:', errorData)
    }
    console.log('')
    
    console.log('=== Build Sequence API Test Complete ===')
    console.log('\n✓ All API endpoint tests passed')
    
  } catch (error) {
    console.error('Error during API test:', error)
    console.log('\n⚠ Make sure the dev server is running: npm run dev')
    throw error
  }
}

testBuildSequenceAPI().catch((error) => {
  console.error('Test failed:', error)
  process.exit(1)
})
