# Dynamic Model Indicator - UI Enhancement

## Overview

The chat interface now displays a **dynamic model indicator** that shows which AI model is currently being used and whether it has been escalated for complex tasks.

## Location

The indicator appears **underneath the chat input box**, replacing the static "Foreman uses GPT-4..." text.

## Visual Design

### Standard Model (gpt-4)
```
┌─────────────────────────────────────────────────────────────┐
│  Current model: [gpt-4]                    5 messages       │
│                  └─ Blue badge                               │
└─────────────────────────────────────────────────────────────┘
```

**Styling**:
- Background: `bg-blue-900/30` (dark blue with transparency)
- Text: `text-blue-400` (light blue)
- Border: `border-blue-700/50` (medium blue border)
- Font: Monospace

### Escalated Model (gpt-4-turbo)
```
┌─────────────────────────────────────────────────────────────┐
│  Current model: [gpt-4-turbo] ⬆️ Escalated  12 messages    │
│                  └─ Yellow badge  └─ Escalation indicator   │
└─────────────────────────────────────────────────────────────┘
```

**Styling**:
- Background: `bg-yellow-900/30` (dark yellow with transparency)
- Text: `text-yellow-400` (light yellow)
- Border: `border-yellow-700/50` (medium yellow border)
- Font: Monospace
- Icon: ⬆️ (up arrow indicating escalation)

### Escalated Model (gpt-5.1)
```
┌─────────────────────────────────────────────────────────────┐
│  Current model: [gpt-5.1] ⬆️ Escalated      8 messages      │
│                  └─ Yellow badge                             │
└─────────────────────────────────────────────────────────────┘
```

## Behavior

### Model Selection
The indicator updates in real-time based on the API response:

1. **User sends message** → Indicator shows current model (or "gpt-4" as default)
2. **API analyzes complexity** → Model selected based on task type
3. **Response received** → Indicator updates to show actual model used
4. **Badge color changes** → Blue for standard, Yellow for escalated

### Escalation Triggers
The model escalates (changes from blue to yellow) when:

- **Architecture tasks**: Keywords like "architecture", "design pattern", "refactor"
- **Governance tasks**: Keywords like "governance", "policy", "compliance", "security"
- **Project milestones**: Milestone-related queries
- **Multi-step tasks**: Complex queries with multiple steps
- **Orchestration**: Coordinating multiple builders

### User Experience

**Initial State** (no messages):
```
Current model: [gpt-4]
```

**After Simple Query**:
```
Current model: [gpt-4]                    1 message
```

**After Architecture Query**:
```
Current model: [gpt-5.1] ⬆️ Escalated      2 messages
```

**Tooltip**:
Hovering over the ⬆️ icon shows: "Model escalated for complex task"

## Code Implementation

### State Variables
```typescript
const [currentModel, setCurrentModel] = useState<string>('gpt-4');
const [modelEscalated, setModelEscalated] = useState<boolean>(false);
```

### Update Logic
```typescript
// Update from API response
if (data.modelUsed) {
  setCurrentModel(data.modelUsed);
  setModelEscalated(data.modelUsed !== 'gpt-4');
}
```

### UI Component
```tsx
<div className="flex items-center gap-2">
  <p className="text-xs text-gray-600">Current model:</p>
  <span className={`text-xs font-mono px-2 py-0.5 rounded ${
    modelEscalated 
      ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/50' 
      : 'bg-blue-900/30 text-blue-400 border border-blue-700/50'
  }`}>
    {currentModel}
  </span>
  {modelEscalated && (
    <span className="text-xs text-yellow-400" title="Model escalated for complex task">
      ⬆️ Escalated
    </span>
  )}
</div>
```

## Benefits

1. **Transparency**: Users can see which model is handling their request
2. **Feedback**: Visual indication when complex tasks trigger escalation
3. **Understanding**: Helps users understand why some responses may be slower/more expensive
4. **Diagnostics**: Allows users to verify model selection is working correctly
5. **Trust**: Shows that the system is intelligently adapting to task complexity

## Examples

### Example 1: Simple Dashboard Query
```
User: "Show me the project dashboard"
Model: gpt-4 (blue badge, no escalation)
```

### Example 2: Architecture Analysis
```
User: "Analyze the architecture for scalability issues and suggest improvements"
Model: gpt-5.1 (yellow badge, ⬆️ Escalated)
```

### Example 3: Governance Review
```
User: "Review compliance with our security governance policies"
Model: gpt-5.1 (yellow badge, ⬆️ Escalated)
```

### Example 4: Multi-file Refactor
```
User: "Refactor the API layer to use dependency injection across all controllers"
Model: gpt-4-turbo (yellow badge, ⬆️ Escalated)
```

## Technical Details

### API Response Format
The chat API now includes `modelUsed` in the response:

```json
{
  "success": true,
  "conversationId": "conv_...",
  "modelUsed": "gpt-5.1",
  "response": {
    "replyText": "...",
    "proposedActions": [...]
  }
}
```

### Model Options
- `gpt-4`: Standard model (8k context)
- `gpt-4-turbo`: High-performance model (128k context)
- `gpt-5.1`: Premium model for complex tasks (128k context)
- `local-builder`: Fallback local model

## Future Enhancements

1. **Cost Indicator**: Show estimated cost per message based on model
2. **Token Usage**: Display tokens used/remaining in context window
3. **Escalation Reason**: Tooltip showing why model was escalated
4. **Model History**: Track model changes throughout conversation
5. **Manual Override**: Allow users to request specific models

---

**Implementation Date**: 2025-12-09  
**Status**: ✅ Complete  
**Files Modified**: `app/foreman/page.tsx`
