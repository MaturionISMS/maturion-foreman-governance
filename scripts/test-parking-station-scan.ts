/**
 * Test Parking Station Scan
 * Script to test the discovery engine and populate parking station
 */

import { runFullScan } from '../lib/foreman/parking-station/discovery-engine'
import { getAllEntries, getStats } from '../lib/foreman/parking-station/storage'

async function main() {
  console.log('🅿️ Parking Station Discovery Test\n')
  
  console.log('Step 1: Running full scan...')
  const scanResult = await runFullScan()
  
  console.log(`\n✅ Scan complete!`)
  console.log(`   Files scanned: ${scanResult.filesScanned}`)
  console.log(`   Upgrades found: ${scanResult.upgradesFound}`)
  console.log(`   Duration: ${scanResult.duration}ms`)
  
  if (scanResult.errors && scanResult.errors.length > 0) {
    console.log(`\n⚠️  Errors encountered:`)
    scanResult.errors.forEach(err => console.log(`   - ${err}`))
  }
  
  console.log('\nStep 2: Fetching all entries...')
  const allEntries = await getAllEntries()
  console.log(`   Total entries: ${allEntries.length}`)
  
  console.log('\nStep 3: Getting statistics...')
  const stats = await getStats()
  console.log(`   Total: ${stats.total}`)
  console.log(`   Parked: ${stats.byStatus.Parked}`)
  console.log(`   Promoted: ${stats.byStatus.Promoted}`)
  console.log(`   Implemented: ${stats.byStatus.Implemented}`)
  console.log(`   Rejected: ${stats.byStatus.Rejected}`)
  console.log(`   Average Priority: ${stats.averagePriority.toFixed(1)}`)
  
  console.log('\nStep 4: Sample entries (top 5 by priority)...')
  const top5 = allEntries.slice(0, 5)
  top5.forEach((entry, idx) => {
    console.log(`\n   ${idx + 1}. ${entry.name}`)
    console.log(`      Category: ${entry.category}`)
    console.log(`      Priority: ${entry.priority}`)
    console.log(`      Wave: ${entry.suggestedWave}`)
    console.log(`      Source: ${entry.source} (${entry.sourceLocation})`)
    console.log(`      Summary: ${entry.summary.substring(0, 100)}${entry.summary.length > 100 ? '...' : ''}`)
  })
  
  console.log('\n✅ Parking Station scan test complete!')
}

main().catch(error => {
  console.error('❌ Error running scan test:', error)
  process.exit(1)
})
