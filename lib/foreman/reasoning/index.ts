/**
 * Reasoning Engine Exports
 * Central export point for Memory-Aware Reasoning Engine (MARE)
 */

// Main engine
export {
  loadMemorySnapshot,
  executeReasoning,
  reason
} from './engine'

// Router
export {
  routeMemory,
  getRecommendedScopes,
  getRecommendedTags,
  isMemoryContextSufficient
} from './router'

// Patterns
export {
  loadReasoningPatterns,
  findApplicablePatterns,
  applyPattern,
  getBuiltInPatterns,
  validatePattern
} from './patterns'

// Evolution Engine
export {
  runEvolutionCycle,
  getEvolutionStats,
  shouldTriggerEvolution,
  calculatePatternScore,
  analyzePatternPerformance,
  generateEvolutionProposal,
  classifyPattern
} from './evolution-engine'
