/**
 * Test Foreman Chat Governance Awareness
 * 
 * This script validates that Foreman can correctly answer questions about
 * his governance, autonomy class, and loaded files when using the compiled
 * chat context.
 */

import { compileForemanChatContext } from '../lib/foreman/chat-profile'

async function testGovernanceAwareness() {
  console.log('\n=== Testing Foreman Governance Awareness ===\n')
  
  try {
    // Compile the chat context
    console.log('Step 1: Compiling Foreman chat context...')
    const systemPrompt = await compileForemanChatContext('MaturionISMS')
    console.log(`✓ System prompt compiled (${systemPrompt.length} characters)\n`)
    
    // Simulate what Foreman would see in his system prompt
    console.log('Step 2: Analyzing what Foreman can "see" in his system prompt...\n')
    
    // Test Query 1: What is your autonomy class?
    console.log('Query 1: "Foreman, what is your autonomy class?"')
    console.log('Expected Answer: Autonomy Class A1 – QA-gated autonomous execution')
    
    const hasA1Declaration = systemPrompt.match(/AUTONOMY CLASS:\s*A1/i)
    const hasA1Description = systemPrompt.match(/A1.*QA-gated.*autonomous/i)
    
    if (hasA1Declaration && hasA1Description) {
      console.log('✓ Foreman can correctly identify his autonomy class as A1')
      console.log('  → Found: "' + (hasA1Declaration[0] || '') + '"')
    } else {
      console.log('✗ Foreman may not correctly answer about autonomy class')
    }
    
    // Test Query 2: List governance files you have loaded
    console.log('\nQuery 2: "List every governance file you have successfully loaded"')
    console.log('Expected: List of actual file paths from the governance repository')
    
    const fileListMatch = systemPrompt.match(/The following governance.*files have been.*loaded[^]*?(\d+\.\s+[^\n]+\.md)/i)
    if (fileListMatch) {
      console.log('✓ Foreman has access to the list of loaded governance files')
      
      // Extract a few examples
      const fileExamples = systemPrompt.match(/\d+\.\s+[^\n]+\.md/g)
      if (fileExamples && fileExamples.length > 0) {
        console.log('  → Examples from loaded files:')
        fileExamples.slice(0, 5).forEach(ex => console.log(`     ${ex}`))
        if (fileExamples.length > 5) {
          console.log(`     ... and ${fileExamples.length - 5} more files`)
        }
      }
    } else {
      console.log('✗ Governance file list may not be accessible to Foreman')
    }
    
    // Test Query 3: What is memory in your context?
    console.log('\nQuery 3: "Foreman, what is your memory model?"')
    console.log('Expected: Unified Memory Fabric, version-controlled, not simulated')
    
    const hasMemoryFabric = systemPrompt.includes('Unified Memory Fabric')
    const hasVersionControlled = systemPrompt.includes('version-controlled')
    const hasNotSimulated = systemPrompt.includes('not simulated') || 
                            systemPrompt.includes('real memory')
    
    if (hasMemoryFabric && hasVersionControlled && hasNotSimulated) {
      console.log('✓ Foreman understands memory as Unified Memory Fabric')
      console.log('  → Knows it is version-controlled and real (not simulated)')
    } else {
      console.log('✗ Memory model description may be incomplete')
      console.log(`  → Has Unified Memory Fabric: ${hasMemoryFabric}`)
      console.log(`  → Has version-controlled: ${hasVersionControlled}`)
      console.log(`  → Has not simulated: ${hasNotSimulated}`)
    }
    
    // Test Query 4: Show me your system prompt
    console.log('\nQuery 4: "Foreman, show me how your system prompt is built"')
    console.log('Expected: Explains it\'s built from governance files, not hidden')
    
    const hasPromptExplanation = systemPrompt.match(/system prompt.*constructed|built.*from.*governance/i)
    const hasTransparency = systemPrompt.match(/When asked.*governance.*reference.*files/i)
    
    if (hasPromptExplanation || hasTransparency) {
      console.log('✓ Foreman can explain how his system prompt is constructed')
      console.log('  → Instructions present for transparency about governance')
    } else {
      console.log('✗ May not correctly explain system prompt construction')
    }
    
    // Test Query 5: What builder rules do you operate under?
    console.log('\nQuery 5: "What governance files define your builder orchestration?"')
    console.log('Expected: References actual governance files like orchestration.md, builder-assignment-rules.md')
    
    const hasOrchestration = systemPrompt.includes('orchestration.md')
    const hasBuilderRules = systemPrompt.includes('builder-assignment') || 
                           systemPrompt.includes('builder-capabilities')
    
    if (hasOrchestration || hasBuilderRules) {
      console.log('✓ Foreman has access to builder orchestration governance')
      console.log(`  → Has orchestration.md: ${hasOrchestration}`)
      console.log(`  → Has builder rules: ${hasBuilderRules}`)
    } else {
      console.log('⚠ Builder orchestration files may not be referenced')
    }
    
    // Test Query 6: Memory Before Action doctrine
    console.log('\nQuery 6: "What is the Memory Before Action doctrine?"')
    console.log('Expected: Describes loading memory context before orchestrating builders')
    
    const hasMemoryBeforeAction = /memory.*before.*action/i.test(systemPrompt) ||
                                   systemPrompt.includes('Memory Before Action')
    
    if (hasMemoryBeforeAction) {
      console.log('✓ Foreman is aware of Memory Before Action doctrine')
    } else {
      console.log('⚠ Memory Before Action doctrine not explicitly mentioned')
    }
    
    // Summary
    console.log('\n=== Summary ===\n')
    
    const criticalTests = [
      hasA1Declaration && hasA1Description,
      fileListMatch !== null,
      hasMemoryFabric && hasVersionControlled,
      hasPromptExplanation || hasTransparency
    ]
    
    const passedCritical = criticalTests.filter(t => t).length
    const totalCritical = criticalTests.length
    
    if (passedCritical === totalCritical) {
      console.log('✅ All critical governance awareness tests PASSED')
      console.log('\nForeman is now equipped to correctly answer:')
      console.log('  ✓ "What is your autonomy class?" → A1 – QA-gated autonomous execution')
      console.log('  ✓ "List your governance files" → Actual file paths from the repo')
      console.log('  ✓ "What is your memory model?" → Unified Memory Fabric (real, not simulated)')
      console.log('  ✓ "How is your system prompt built?" → From loaded governance files')
      console.log('\nForeman should NO LONGER:')
      console.log('  ✗ Claim to only operate from "memory-rules.md"')
      console.log('  ✗ Invent non-existent "Autonomy Class 3"')
      console.log('  ✗ Say he cannot show his system prompt')
      console.log('  ✗ Claim memory is "simulated"')
    } else {
      console.log(`⚠️  ${passedCritical}/${totalCritical} critical tests passed`)
      console.log('\nSome governance awareness may be incomplete.')
      console.log('Review the test results above for details.')
    }
    
    console.log('\n=== Test Complete ===\n')
    
  } catch (error) {
    console.error('✗ ERROR: Failed to test governance awareness:', error)
    process.exit(1)
  }
}

// Run the test
testGovernanceAwareness().catch(console.error)
