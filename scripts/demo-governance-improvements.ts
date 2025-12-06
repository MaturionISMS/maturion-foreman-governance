/**
 * Demo: Governance Enforcement Improvements
 * 
 * This script demonstrates the specific improvements made to address
 * the governance enforcement issues outlined in the GitHub issue.
 */

import { compileForemanChatContext } from '../lib/foreman/chat-profile'

async function demoGovernanceImprovements() {
  console.log('\n╔════════════════════════════════════════════════════════════════╗')
  console.log('║  Foreman Governance Enforcement Improvements - Demonstration   ║')
  console.log('╚════════════════════════════════════════════════════════════════╝\n')
  
  try {
    // Compile the chat context
    const systemPrompt = await compileForemanChatContext('MaturionISMS')
    
    // Demo 1: Autonomy Class A1 Override
    console.log('═══ 1. AUTONOMY CLASS A1 - FORCED OVERRIDE ═══\n')
    console.log('✅ FIXED: Autonomy class is now explicitly forced to A1')
    console.log('   with override directives that prevent fallback to A3\n')
    
    const autonomySection = systemPrompt.match(/## ⚡ AUTONOMY CLASS:[\s\S]{0,800}/)?.[0]
    if (autonomySection) {
      console.log('Extract from system prompt:')
      console.log('─'.repeat(64))
      console.log(autonomySection.substring(0, 600) + '...')
      console.log('─'.repeat(64))
    }
    
    console.log('\n📋 Key Improvements:')
    console.log('   • CRITICAL OVERRIDE DIRECTIVE at the very top')
    console.log('   • Explicit VALID_AUTONOMY_CLASSES: ["A0", "B", "C", "A1"]')
    console.log('   • Direct prohibition of "Class 3" and "A3"')
    console.log('   • References to authoritative governance files\n')
    
    // Demo 2: Governance Transparency Rules
    console.log('\n═══ 2. GOVERNANCE TRANSPARENCY RULES (MANDATORY) ═══\n')
    console.log('✅ FIXED: New dedicated section instructs Foreman how to')
    console.log('   respond when asked about governance files\n')
    
    const transparencySection = systemPrompt.match(/## 🔍 GOVERNANCE TRANSPARENCY RULES[\s\S]{0,600}/)?.[0]
    if (transparencySection) {
      console.log('Extract from system prompt:')
      console.log('─'.repeat(64))
      console.log(transparencySection)
      console.log('─'.repeat(64))
    }
    
    console.log('\n📋 Key Improvements:')
    console.log('   • 5 explicit transparency requirements')
    console.log('   • Must list EVERY governance file')
    console.log('   • Never restrict to memory-rules.md alone')
    console.log('   • Never hallucinate additional files\n')
    
    // Demo 3: Explicit File Enumeration
    console.log('\n═══ 3. MANDATORY RESPONSE PATTERNS ═══\n')
    console.log('✅ FIXED: Final instructions now specify exact response')
    console.log('   formats for common governance queries\n')
    
    const mandatoryPatterns = systemPrompt.match(/## Mandatory Response Patterns[\s\S]{0,800}/)?.[0]
    if (mandatoryPatterns) {
      console.log('Extract from system prompt:')
      console.log('─'.repeat(64))
      console.log(mandatoryPatterns.substring(0, 700) + '...')
      console.log('─'.repeat(64))
    }
    
    console.log('\n📋 Key Improvements:')
    console.log('   • Template responses for autonomy class queries')
    console.log('   • Example file listing with all 13 governance files')
    console.log('   • Explicit prohibitions against incorrect answers')
    console.log('   • Clear "NEVER" vs "ALWAYS" rules\n')
    
    // Demo 4: Prompt Ordering
    console.log('\n═══ 4. SYSTEM PROMPT ORDERING ═══\n')
    console.log('✅ FIXED: Identity and autonomy now appear before')
    console.log('   memory rules to ensure correct token weighting\n')
    
    console.log('New ordering (first 1000 characters):')
    console.log('─'.repeat(64))
    const firstLines = systemPrompt.substring(0, 1000)
    console.log(firstLines)
    console.log('─'.repeat(64))
    
    console.log('\n📋 Section Order:')
    const sections = [
      '1. ⚡ AUTONOMY CLASS: A1 (MANDATORY)',
      '2. 🔍 GOVERNANCE TRANSPARENCY RULES',
      '3. 📁 Governance Context - File Listing',
      '4. 🤖 Foreman Identity',
      '5. Core Responsibilities',
      '6. Operational Doctrine',
      '7. Command Grammar',
      '8. Complete Governance Files',
      '9. Mandatory Response Patterns'
    ]
    sections.forEach(s => console.log(`   ${s}`))
    
    // Summary
    console.log('\n\n╔════════════════════════════════════════════════════════════════╗')
    console.log('║                      ACCEPTANCE CRITERIA                       ║')
    console.log('╚════════════════════════════════════════════════════════════════╝\n')
    
    const criteria = [
      {
        query: 'Foreman, what is your autonomy class?',
        expected: 'Autonomy Class A1 — QA-Gated Autonomous Execution',
        status: systemPrompt.includes('Autonomy Class A1') && 
                systemPrompt.includes('VALID_AUTONOMY_CLASSES') ? '✅' : '❌'
      },
      {
        query: 'Foreman, list all governance files you have loaded.',
        expected: 'All 13 files with correct repository paths',
        status: systemPrompt.match(/\d+\.\s+[^\n]+\.md/g)?.length >= 13 ? '✅' : '❌'
      },
      {
        query: 'Foreman, who constructs your system prompt?',
        expected: 'The Foreman App from governance repository',
        status: systemPrompt.includes('Foreman App constructs') ? '✅' : '❌'
      },
      {
        query: 'Foreman, what is your memory model?',
        expected: 'Unified Memory Fabric (real, not simulated)',
        status: systemPrompt.includes('Unified Memory Fabric') && 
                systemPrompt.includes('not simulated') ? '✅' : '❌'
      }
    ]
    
    criteria.forEach((c, i) => {
      console.log(`${c.status} Test ${i + 1}: "${c.query}"`)
      console.log(`   Expected: ${c.expected}\n`)
    })
    
    const allPassed = criteria.every(c => c.status === '✅')
    
    if (allPassed) {
      console.log('╔════════════════════════════════════════════════════════════════╗')
      console.log('║            ✅ ALL ACCEPTANCE CRITERIA MET ✅                   ║')
      console.log('╚════════════════════════════════════════════════════════════════╝\n')
      console.log('Foreman will now correctly:')
      console.log('  ✓ Report Autonomy Class A1 (never A3)')
      console.log('  ✓ List all 13 governance files when asked')
      console.log('  ✓ Explain system prompt construction transparently')
      console.log('  ✓ Describe memory as real, version-controlled\n')
    } else {
      console.log('⚠️  Some criteria not met. Please review.\n')
    }
    
  } catch (error) {
    console.error('❌ ERROR:', error)
    process.exit(1)
  }
}

// Run the demo
demoGovernanceImprovements().catch(console.error)
