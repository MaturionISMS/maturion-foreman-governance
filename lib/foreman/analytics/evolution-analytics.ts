/**
 * Evolution Analytics Aggregator
 * Collects and analyzes reasoning pattern evolution metrics
 */

import { EvolutionAnalytics } from '@/types/analytics'
import { loadReasoningPatterns } from '../reasoning/patterns'
import * as fs from 'fs'
import * as path from 'path'

/**
 * Get evolution analytics
 */
export async function getEvolutionAnalytics(): Promise<EvolutionAnalytics> {
  const patterns = await loadReasoningPatterns()
  
  // Count patterns improved (those with performance score >= 0.8)
  const patternsImproved = patterns.filter(
    p => p.performanceScore && p.performanceScore >= 0.8
  ).length
  
  // Count patterns with low scores (candidates for removal)
  const patternsRemoved = patterns.filter(
    p => p.performanceScore && p.performanceScore < 0.4
  ).length
  
  // Count evolution cycles (patterns that have been evolved)
  const evolutionCycles = patterns.filter(
    p => p.lastEvolved
  ).length
  
  // Analyze performance score movement
  let improved = 0
  let degraded = 0
  let stable = 0
  
  for (const pattern of patterns) {
    if (pattern.performanceScore) {
      if (pattern.performanceScore >= 0.8) {
        improved++
      } else if (pattern.performanceScore < 0.4) {
        degraded++
      } else {
        stable++
      }
    } else {
      stable++ // No score = stable/untracked
    }
  }
  
  // Count new heuristics created
  const newHeuristicsCreated = patterns.filter(
    p => {
      const createdAt = p.lastEvolved ? new Date(p.lastEvolved) : new Date(0)
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      return createdAt > thirtyDaysAgo
    }
  ).length
  
  // Build cognitive improvement curve
  const cognitiveImprovementCurve: Array<{
    timestamp: string
    avgScore: number
  }> = []
  
  // Group patterns by last evolved date and calculate average score
  const scoreMap = new Map<string, number[]>()
  
  for (const pattern of patterns) {
    if (pattern.lastEvolved && pattern.performanceScore) {
      const date = new Date(pattern.lastEvolved).toISOString().split('T')[0]
      
      if (!scoreMap.has(date)) {
        scoreMap.set(date, [])
      }
      
      scoreMap.get(date)!.push(pattern.performanceScore)
    }
  }
  
  // Convert to trend data
  const sortedDates = Array.from(scoreMap.keys()).sort()
  
  for (const date of sortedDates) {
    const scores = scoreMap.get(date)!
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length
    
    cognitiveImprovementCurve.push({
      timestamp: date,
      avgScore: Math.round(avgScore * 100) / 100
    })
  }
  
  return {
    patternsImproved,
    patternsRemoved,
    evolutionCycles,
    performanceScoreMovement: {
      improved,
      degraded,
      stable
    },
    newHeuristicsCreated,
    cognitiveImprovementCurve
  }
}
