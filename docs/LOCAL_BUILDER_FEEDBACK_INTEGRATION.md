# Local Builder Feedback Integration Guide

## Overview
This document describes how to integrate the Local Builder with the Multi-Agent Reasoning Feedback Loop.

## Integration Points

### 1. Builder Feedback Emission
The Local Builder must emit structured feedback after each task completion.

### Required Changes in `maturion-local-builder/agent.js`

Add feedback emission function:

```javascript
async function emitBuilderFeedback(taskId, executionMetrics) {
  const feedback = {
    taskId: taskId,
    builder: 'local',
    difficultyScore: calculateDifficultyScore(executionMetrics),
    timestamp: new Date().toISOString(),
    failures: executionMetrics.errors || [],
    uncertainties: executionMetrics.warnings || [],
    missingMemoryDetected: identifyMissingMemory(executionMetrics),
    governanceConflicts: identifyGovernanceConflicts(executionMetrics),
    newKnowledgeCandidates: extractKnowledgeCandidates(executionMetrics)
  }
  
  // Send to Foreman
  await fetch('http://foreman-app/api/foreman/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback)
  })
}

function calculateDifficultyScore(metrics) {
  // Calculate based on:
  // - Number of retries
  // - Execution time vs expected
  // - Number of errors encountered
  // - Complexity of task
  let score = 0
  
  if (metrics.retries > 0) score += 0.2
  if (metrics.errors?.length > 0) score += 0.3
  if (metrics.executionTime > metrics.expectedTime * 2) score += 0.3
  if (metrics.taskComplexity === 'high') score += 0.2
  
  return Math.min(score, 1.0)
}

function identifyMissingMemory(metrics) {
  const missing = []
  
  // Check if task required context that wasn't available
  if (metrics.requiredContext && !metrics.providedContext) {
    missing.push(`Missing context: ${metrics.requiredContext}`)
  }
  
  return missing
}

function identifyGovernanceConflicts(metrics) {
  // Extract governance-related errors
  return metrics.errors?.filter(e => 
    e.includes('governance') || 
    e.includes('compliance') ||
    e.includes('policy')
  ) || []
}

function extractKnowledgeCandidates(metrics) {
  // Extract learnings from successful task execution
  const candidates = []
  
  if (metrics.novelApproach) {
    candidates.push(`Novel approach: ${metrics.novelApproach}`)
  }
  
  if (metrics.workaround) {
    candidates.push(`Workaround discovered: ${metrics.workaround}`)
  }
  
  return candidates
}
```

### Required Changes in `maturion-local-builder/python_agent/agent_core.py`

Add feedback emission to Python agent:

```python
import requests
from datetime import datetime

def emit_builder_feedback(task_id, execution_metrics):
    """Emit structured feedback to Foreman"""
    feedback = {
        'taskId': task_id,
        'builder': 'local',
        'difficultyScore': calculate_difficulty_score(execution_metrics),
        'timestamp': datetime.utcnow().isoformat() + 'Z',
        'failures': execution_metrics.get('errors', []),
        'uncertainties': execution_metrics.get('warnings', []),
        'missingMemoryDetected': identify_missing_memory(execution_metrics),
        'governanceConflicts': identify_governance_conflicts(execution_metrics),
        'newKnowledgeCandidates': extract_knowledge_candidates(execution_metrics)
    }
    
    # Send to Foreman
    response = requests.post(
        'http://foreman-app/api/foreman/feedback',
        json=feedback,
        headers={'Content-Type': 'application/json'}
    )
    
    if response.status_code != 200:
        print(f"Warning: Failed to submit feedback: {response.text}")

def calculate_difficulty_score(metrics):
    """Calculate task difficulty based on metrics"""
    score = 0.0
    
    if metrics.get('retries', 0) > 0:
        score += 0.2
    if len(metrics.get('errors', [])) > 0:
        score += 0.3
    if metrics.get('execution_time', 0) > metrics.get('expected_time', 0) * 2:
        score += 0.3
    if metrics.get('task_complexity') == 'high':
        score += 0.2
    
    return min(score, 1.0)

def identify_missing_memory(metrics):
    """Identify missing memory context"""
    missing = []
    
    if metrics.get('required_context') and not metrics.get('provided_context'):
        missing.append(f"Missing context: {metrics.get('required_context')}")
    
    return missing

def identify_governance_conflicts(metrics):
    """Extract governance-related errors"""
    errors = metrics.get('errors', [])
    return [e for e in errors if any(keyword in e.lower() for keyword in ['governance', 'compliance', 'policy'])]

def extract_knowledge_candidates(metrics):
    """Extract potential knowledge from task execution"""
    candidates = []
    
    if metrics.get('novel_approach'):
        candidates.append(f"Novel approach: {metrics.get('novel_approach')}")
    
    if metrics.get('workaround'):
        candidates.append(f"Workaround discovered: {metrics.get('workaround')}")
    
    return candidates
```

### Integration Checklist

- [ ] Add feedback emission to Local Builder agent.js
- [ ] Add feedback emission to Python agent agent_core.py
- [ ] Configure Foreman API endpoint URL in Local Builder config
- [ ] Test feedback submission from Local Builder
- [ ] Verify feedback appears in builder-feedback-history.json
- [ ] Verify feedback processing triggers drift detection
- [ ] Monitor feedback statistics via GET /api/foreman/feedback

## Testing

Test feedback submission:

```bash
curl -X POST http://localhost:3000/api/foreman/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "taskId": "test-task-123",
    "builder": "local",
    "difficultyScore": 0.5,
    "timestamp": "2024-01-01T00:00:00Z",
    "failures": ["Example failure"],
    "uncertainties": ["Example uncertainty"]
  }'
```

Expected response:
```json
{
  "success": true,
  "feedbackId": "fb_1234567890_test-task-123",
  "processed": true,
  "patternsDetected": [],
  "driftIssuesIdentified": 0,
  "memoryUpdates": 1
}
```

## Monitoring

View feedback statistics:

```bash
curl http://localhost:3000/api/foreman/feedback?days=30
```

This will return aggregated statistics for the last 30 days including:
- Total feedback count
- Average difficulty score
- Builder breakdown (local vs copilot)
- Top failures and uncertainties
- Governance conflict rate
- Missing memory rate
