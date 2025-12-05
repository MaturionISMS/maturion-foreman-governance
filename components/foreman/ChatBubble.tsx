/**
 * ChatBubble Component
 * Rich chat message display with markdown, code blocks, and metadata
 */

'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ChatMessage } from '@/types/foreman';

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';
  const icon = isUser ? '🧑‍💼' : '👷';
  const label = isUser ? 'Johan' : 'Foreman';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-3xl rounded-lg shadow-lg ${
          isUser
            ? 'bg-foremanOffice-primary text-white'
            : 'bg-foremanOffice-panel border border-foremanOffice-border text-foremanOffice-text'
        }`}
      >
        {/* Message Header */}
        <div className={`flex items-center gap-2 px-4 pt-3 pb-2 border-b ${
          isUser ? 'border-blue-400/30' : 'border-foremanOffice-border'
        }`}>
          <span className="text-xl">{icon}</span>
          <span className="font-semibold text-sm">{label}</span>
          <span className={`text-xs ml-auto ${isUser ? 'text-blue-200' : 'text-gray-500'}`}>
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>

        {/* Message Content with Markdown */}
        <div className="px-4 py-3">
          <div className={`prose prose-sm max-w-none ${
            isUser 
              ? 'prose-invert prose-headings:text-white prose-p:text-white prose-strong:text-white prose-code:text-blue-100' 
              : 'prose-headings:text-foremanOffice-text prose-p:text-foremanOffice-text prose-code:text-foremanOffice-accent'
          }`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Metadata Tags */}
        {message.metadata && (
          <div className="flex flex-wrap gap-2 px-4 pb-3">
            {message.metadata.wave && (
              <span className={`px-2 py-1 text-xs rounded font-medium ${
                isUser 
                  ? 'bg-blue-400/20 text-blue-100' 
                  : 'bg-purple-900/40 text-purple-300 border border-purple-700/50'
              }`}>
                Wave: {message.metadata.wave}
              </span>
            )}
            {message.metadata.module && (
              <span className={`px-2 py-1 text-xs rounded font-medium ${
                isUser 
                  ? 'bg-blue-400/20 text-blue-100' 
                  : 'bg-green-900/40 text-green-300 border border-green-700/50'
              }`}>
                Module: {message.metadata.module}
              </span>
            )}
            {message.metadata.actionType && (
              <span className={`px-2 py-1 text-xs rounded font-medium ${
                isUser 
                  ? 'bg-blue-400/20 text-blue-100' 
                  : 'bg-yellow-900/40 text-yellow-300 border border-yellow-700/50'
              }`}>
                Action: {message.metadata.actionType}
              </span>
            )}
            {message.metadata.builderType && (
              <span className={`px-2 py-1 text-xs rounded font-medium ${
                isUser 
                  ? 'bg-blue-400/20 text-blue-100' 
                  : 'bg-blue-900/40 text-blue-300 border border-blue-700/50'
              }`}>
                Builder: {message.metadata.builderType}
              </span>
            )}
            {message.metadata.tags?.map((tag) => (
              <span
                key={tag}
                className={`px-2 py-1 text-xs rounded font-medium ${
                  isUser 
                    ? 'bg-blue-400/20 text-blue-100' 
                    : 'bg-gray-800 text-gray-400 border border-gray-700'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Proposed Actions */}
        {message.proposedActions && message.proposedActions.length > 0 && (
          <div className={`mx-4 mb-3 pt-3 border-t ${
            isUser ? 'border-blue-400/30' : 'border-foremanOffice-border'
          }`}>
            <p className="text-sm font-semibold mb-2">Proposed Actions:</p>
            <div className="space-y-2">
              {message.proposedActions.map((action, idx) => (
                <div
                  key={idx}
                  className={`text-sm px-3 py-2 rounded border ${
                    isUser 
                      ? 'bg-blue-400/10 border-blue-400/30' 
                      : 'bg-foremanOffice-background border-foremanOffice-border'
                  }`}
                >
                  <div className="font-medium">{action.type}</div>
                  {action.params?.description && (
                    <div className={`mt-1 ${isUser ? 'text-blue-100' : 'text-gray-400'}`}>
                      {action.params.description}
                    </div>
                  )}
                  {action.params?.builder && (
                    <div className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-gray-500'}`}>
                      Builder: {action.params.builder}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
