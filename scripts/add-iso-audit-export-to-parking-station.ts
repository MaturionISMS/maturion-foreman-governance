#!/usr/bin/env tsx

/**
 * Add ISO Audit Export Feature to Parking Station
 * 
 * This script creates a parking station entry for the ISO/IEC 27001 Audit Export feature.
 * The feature is PARKED pending governance gate stabilization.
 */

import { addEntry } from '../lib/foreman/parking-station/storage'
import type { ParkingStationEntry } from '../types/parking-station'

async function main() {
  console.log('Adding ISO Audit Export feature to Parking Station...\n')

  const entry: ParkingStationEntry = {
    id: `ps_${Date.now()}_iso_audit_export`,
    name: 'ISO/IEC 27001 Audit Export Feature',
    category: 'Governance',
    source: 'Manual Entry',
    sourceLocation: '/docs/specifications/iso-audit-export-feature-spec.md',
    summary: 'One-click exportable ISO/IEC 27001 audit report with automated evidence aggregation, clause coverage, Annex A control mapping, and multi-format export (PDF/JSON/Markdown)',
    description: `
Comprehensive ISO 27001 audit export system that automatically aggregates:
- Governance gate artifacts and evidence
- QA results and test metrics
- Architecture documentation
- Risk register (NIST-aligned)
- Constitutional compliance (CS1-CS6)
- Incident reports

Generates audit-ready reports covering:
- All ISO clauses (4-10)
- All 93 Annex A controls
- Evidence references with timestamps
- Nonconformities (if any)
- Compliance status per control
- Risk assessment summary

Export formats: PDF (human-readable), JSON (machine-readable), Markdown (version-controlled)

Key constraints:
- No manual input allowed
- No post-hoc editing
- Evidence-linked only
- Fully automated

PARKED: Awaiting governance gate stabilization (6+ months proven reliability required)
    `.trim(),
    suggestedWave: 'Wave 3',
    dependencies: [
      'Governance Gate must be stable in production',
      'QA systems producing reliable evidence',
      'Risk register operational',
      'Incident management functional',
      'ACF (Audit & Compliance Framework) foundation implemented',
    ],
    priority: 75, // High priority but not urgent (parked)
    status: 'Parked',
    tags: [
      'iso-27001',
      'compliance',
      'audit',
      'governance',
      'export',
      'reporting',
      'evidence',
      'annex-a',
      'nist',
      'security',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'foreman-manual-entry',
    metadata: {
      complexity: 'Very High',
      estimatedEffort: 120, // hours
      impact: 'High',
      foremanNotes: 'Feature specification complete. Implementation blocked pending governance gate stability. Requires 6+ months of proven gate reliability before implementation can begin. Related to ACF spec.',
      extractedContext: 'Issue #ISO_AUDIT_EXPORT_FEATURE requested this capability. All inputs (governance artifacts, QA, evidence, architecture, risk register) already exist. Core challenge is mapping to ISO structure and ensuring evidence completeness.',
    },
  }

  try {
    await addEntry(entry)
    
    console.log('✅ Successfully added ISO Audit Export feature to Parking Station')
    console.log('')
    console.log('Entry Details:')
    console.log(`  ID: ${entry.id}`)
    console.log(`  Name: ${entry.name}`)
    console.log(`  Category: ${entry.category}`)
    console.log(`  Status: ${entry.status}`)
    console.log(`  Priority: ${entry.priority}/100`)
    console.log(`  Wave: ${entry.suggestedWave}`)
    console.log(`  Specification: ${entry.sourceLocation}`)
    console.log('')
    console.log('View in Parking Station UI: /foreman/parking-station')
    console.log('')
  } catch (error) {
    console.error('❌ Error adding entry:', error)
    process.exit(1)
  }
}

main()
