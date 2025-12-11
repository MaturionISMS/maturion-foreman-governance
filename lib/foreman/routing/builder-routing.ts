/**
 * Builder Routing - Phase 3 v1.1
 */

export type BuilderType = 'ui' | 'api' | 'schema' | 'integration' | 'qa' | 'github-copilot' | 'local'

export interface BuilderRoute {
  builder: BuilderType
  reason: string
}

export function routeTaskToBuilder(taskType: string, complexity: 'simple' | 'complex'): BuilderRoute {
  if (taskType.includes('ui')) return { builder: 'ui', reason: 'UI task' }
  if (taskType.includes('api')) return { builder: 'api', reason: 'API task' }
  if (taskType.includes('schema')) return { builder: 'schema', reason: 'Schema task' }
  if (taskType.includes('integration')) return { builder: 'integration', reason: 'Integration task' }
  if (taskType.includes('qa')) return { builder: 'qa', reason: 'QA task' }
  
  return complexity === 'complex' 
    ? { builder: 'local', reason: 'Complex task' }
    : { builder: 'github-copilot', reason: 'Simple task' }
}

export function selectPrimarySecondaryBuilders(taskType: string): {
  primary: BuilderType
  secondary: BuilderType
} {
  const route = routeTaskToBuilder(taskType, 'simple')
  return {
    primary: route.builder === 'local' ? 'local' : 'github-copilot',
    secondary: route.builder === 'local' ? 'github-copilot' : 'local'
  }
}
