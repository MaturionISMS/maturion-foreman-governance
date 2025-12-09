/**
 * Prompt Compression Service
 * 
 * Implements semantic chunking and intelligent compression for long prompts.
 * Preserves governance rules, architectural constraints, and critical instructions.
 */

import { estimateTokenCount } from '../context-manager';

export interface CompressionResult {
  compressedPrompt: string;
  originalTokens: number;
  compressedTokens: number;
  compressionRatio: number;
  chunksProcessed: number;
  criticalInstructions: string[];
  metadata: {
    compressed: boolean;
    algorithmUsed: 'semantic-chunking' | 'sliding-window' | 'none';
    governancePreserved: boolean;
    architecturePreserved: boolean;
  };
}

export interface CompressionOptions {
  targetMaxTokens?: number;
  preserveGovernance?: boolean;
  preserveArchitecture?: boolean;
  preserveCriticalInstructions?: boolean;
  chunkSize?: number;
}

/**
 * Keywords that indicate critical governance content
 */
const GOVERNANCE_KEYWORDS = [
  'governance', 'policy', 'compliance', 'security', 'audit', 'regulation',
  'QIEL', 'mandatory', 'required', 'must', 'shall', 'forbidden', 'prohibited',
  'critical', 'essential', 'constraint', 'rule', 'guideline'
];

/**
 * Keywords that indicate architectural content
 */
const ARCHITECTURE_KEYWORDS = [
  'architecture', 'design', 'pattern', 'structure', 'component', 'module',
  'interface', 'api', 'schema', 'data model', 'system', 'integration',
  'microservice', 'monolith', 'framework', 'infrastructure'
];

/**
 * Compress a long prompt using semantic chunking and intelligent summarization
 */
export async function compressPrompt(
  prompt: string,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const {
    targetMaxTokens = 4000,
    preserveGovernance = true,
    preserveArchitecture = true,
    preserveCriticalInstructions = true,
    chunkSize = 1000,
  } = options;

  const originalTokens = estimateTokenCount(prompt);

  // If already within limits, no compression needed
  if (originalTokens <= targetMaxTokens) {
    return {
      compressedPrompt: prompt,
      originalTokens,
      compressedTokens: originalTokens,
      compressionRatio: 1.0,
      chunksProcessed: 0,
      criticalInstructions: [],
      metadata: {
        compressed: false,
        algorithmUsed: 'none',
        governancePreserved: true,
        architecturePreserved: true,
      },
    };
  }

  console.log(`[PromptCompressor] Compressing ${originalTokens} tokens to ~${targetMaxTokens} tokens`);

  // Extract critical sections that must be preserved
  const criticalSections = extractCriticalSections(
    prompt,
    preserveGovernance,
    preserveArchitecture,
    preserveCriticalInstructions
  );

  // Split into semantic chunks
  const chunks = splitIntoSemanticChunks(prompt, chunkSize);
  
  console.log(`[PromptCompressor] Split into ${chunks.length} chunks`);

  // Compress each chunk
  const compressedChunks = chunks.map(chunk => compressChunk(chunk, criticalSections));

  // Combine compressed chunks with critical sections
  let compressedPrompt = buildCompressedPrompt(compressedChunks, criticalSections);

  // If still too large, apply additional compression
  let compressedTokens = estimateTokenCount(compressedPrompt);
  if (compressedTokens > targetMaxTokens) {
    console.log(`[PromptCompressor] Applying additional compression (${compressedTokens} -> ${targetMaxTokens})`);
    compressedPrompt = applyAdditionalCompression(compressedPrompt, targetMaxTokens, criticalSections);
    compressedTokens = estimateTokenCount(compressedPrompt);
  }

  const compressionRatio = compressedTokens / originalTokens;

  console.log(`[PromptCompressor] Compression complete: ${originalTokens} -> ${compressedTokens} tokens (${(compressionRatio * 100).toFixed(1)}%)`);

  return {
    compressedPrompt,
    originalTokens,
    compressedTokens,
    compressionRatio,
    chunksProcessed: chunks.length,
    criticalInstructions: criticalSections.instructions,
    metadata: {
      compressed: true,
      algorithmUsed: 'semantic-chunking',
      governancePreserved: preserveGovernance,
      architecturePreserved: preserveArchitecture,
    },
  };
}

/**
 * Extract critical sections from the prompt that must be preserved
 */
function extractCriticalSections(
  prompt: string,
  preserveGovernance: boolean,
  preserveArchitecture: boolean,
  preserveCriticalInstructions: boolean
): {
  governance: string[];
  architecture: string[];
  instructions: string[];
} {
  const lines = prompt.split('\n');
  const governance: string[] = [];
  const architecture: string[] = [];
  const instructions: string[] = [];

  for (const line of lines) {
    const lowerLine = line.toLowerCase();

    // Check for governance content
    if (preserveGovernance && GOVERNANCE_KEYWORDS.some(kw => lowerLine.includes(kw))) {
      governance.push(line);
    }

    // Check for architecture content
    if (preserveArchitecture && ARCHITECTURE_KEYWORDS.some(kw => lowerLine.includes(kw))) {
      architecture.push(line);
    }

    // Check for critical instructions (numbered lists, bullet points, etc.)
    if (preserveCriticalInstructions) {
      if (/^\s*[-*•]\s+/.test(line) || // Bullet points
          /^\s*\d+[\.)]\s+/.test(line) || // Numbered lists
          /must|required|critical|essential/i.test(line)) { // Critical keywords
        instructions.push(line);
      }
    }
  }

  return { governance, architecture, instructions };
}

/**
 * Split text into semantic chunks based on paragraphs and sections
 */
function splitIntoSemanticChunks(text: string, chunkSize: number): string[] {
  const chunks: string[] = [];
  
  // Split by double newlines (paragraphs) first
  const paragraphs = text.split(/\n\n+/);
  
  let currentChunk = '';
  let currentTokens = 0;

  for (const paragraph of paragraphs) {
    const paragraphTokens = estimateTokenCount(paragraph);

    // If adding this paragraph would exceed chunk size, save current chunk
    if (currentTokens + paragraphTokens > chunkSize && currentChunk) {
      chunks.push(currentChunk.trim());
      currentChunk = '';
      currentTokens = 0;
    }

    // If single paragraph is larger than chunk size, split it by sentences
    if (paragraphTokens > chunkSize) {
      const sentences = paragraph.split(/\.\s+/);
      for (const sentence of sentences) {
        const sentenceTokens = estimateTokenCount(sentence);
        if (currentTokens + sentenceTokens > chunkSize && currentChunk) {
          chunks.push(currentChunk.trim());
          currentChunk = '';
          currentTokens = 0;
        }
        currentChunk += sentence + '. ';
        currentTokens += sentenceTokens;
      }
    } else {
      currentChunk += paragraph + '\n\n';
      currentTokens += paragraphTokens;
    }
  }

  // Add remaining chunk
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

/**
 * Compress a single chunk while preserving critical content
 */
function compressChunk(chunk: string, criticalSections: ReturnType<typeof extractCriticalSections>): string {
  const lines = chunk.split('\n');
  const compressed: string[] = [];

  for (const line of lines) {
    // Keep critical lines unchanged
    const isCritical = 
      criticalSections.governance.includes(line) ||
      criticalSections.architecture.includes(line) ||
      criticalSections.instructions.includes(line);

    if (isCritical) {
      compressed.push(line);
    } else {
      // Compress non-critical lines by removing redundancy
      const compressedLine = compressLine(line);
      if (compressedLine) {
        compressed.push(compressedLine);
      }
    }
  }

  return compressed.join('\n');
}

/**
 * Compress a single line by removing redundancy and filler words
 */
function compressLine(line: string): string {
  if (!line.trim()) return '';

  let compressed = line;

  // Remove common filler phrases
  const fillerPhrases = [
    'it is important to note that',
    'please be aware that',
    'it should be noted that',
    'as mentioned earlier',
    'in other words',
    'to put it simply',
    'basically',
    'essentially',
    'actually',
  ];

  for (const filler of fillerPhrases) {
    const regex = new RegExp(filler, 'gi');
    compressed = compressed.replace(regex, '');
  }

  // Remove excessive whitespace
  compressed = compressed.replace(/\s+/g, ' ').trim();

  return compressed;
}

/**
 * Build the final compressed prompt from chunks and critical sections
 */
function buildCompressedPrompt(
  compressedChunks: string[],
  criticalSections: ReturnType<typeof extractCriticalSections>
): string {
  const parts: string[] = [];

  // Add governance section if present
  if (criticalSections.governance.length > 0) {
    parts.push('## Governance & Compliance\n' + criticalSections.governance.join('\n'));
  }

  // Add architecture section if present
  if (criticalSections.architecture.length > 0) {
    parts.push('## Architecture Constraints\n' + criticalSections.architecture.join('\n'));
  }

  // Add critical instructions if present
  if (criticalSections.instructions.length > 0) {
    parts.push('## Critical Instructions\n' + criticalSections.instructions.join('\n'));
  }

  // Add compressed content
  parts.push('## Details (Compressed)\n' + compressedChunks.join('\n\n'));

  return parts.join('\n\n');
}

/**
 * Apply additional compression if still exceeding target
 */
function applyAdditionalCompression(
  prompt: string,
  targetMaxTokens: number,
  criticalSections: ReturnType<typeof extractCriticalSections>
): string {
  // Calculate how much we need to compress
  const currentTokens = estimateTokenCount(prompt);
  const criticalTokens = estimateTokenCount(
    [...criticalSections.governance, ...criticalSections.architecture, ...criticalSections.instructions].join('\n')
  );
  
  const targetDetailsTokens = targetMaxTokens - criticalTokens - 100; // Reserve 100 tokens for structure

  if (targetDetailsTokens <= 0) {
    // Critical sections alone exceed target - keep only critical sections
    console.warn('[PromptCompressor] Critical sections exceed target tokens, keeping only critical content');
    return buildCompressedPrompt([], criticalSections);
  }

  // Extract the details section and further compress it
  const detailsMatch = prompt.match(/## Details \(Compressed\)\n([\s\S]*)/);
  if (!detailsMatch) {
    return prompt; // Can't find details section, return as-is
  }

  const details = detailsMatch[1];
  const detailsTokens = estimateTokenCount(details);
  
  if (detailsTokens <= targetDetailsTokens) {
    return prompt; // Already within limits
  }

  // Calculate truncation point
  const compressionRatio = targetDetailsTokens / detailsTokens;
  const targetChars = Math.floor(details.length * compressionRatio);
  
  // Truncate at nearest paragraph boundary
  let truncated = details.substring(0, targetChars);
  const lastParagraph = truncated.lastIndexOf('\n\n');
  if (lastParagraph > 0) {
    truncated = truncated.substring(0, lastParagraph);
  }

  truncated += '\n\n[... additional details omitted for context efficiency]';

  // Rebuild prompt with truncated details
  const parts: string[] = [];
  if (criticalSections.governance.length > 0) {
    parts.push('## Governance & Compliance\n' + criticalSections.governance.join('\n'));
  }
  if (criticalSections.architecture.length > 0) {
    parts.push('## Architecture Constraints\n' + criticalSections.architecture.join('\n'));
  }
  if (criticalSections.instructions.length > 0) {
    parts.push('## Critical Instructions\n' + criticalSections.instructions.join('\n'));
  }
  parts.push('## Details (Compressed)\n' + truncated);

  return parts.join('\n\n');
}

/**
 * Check if a prompt requires compression
 */
export function requiresCompression(prompt: string, maxTokens: number = 4000): boolean {
  const tokens = estimateTokenCount(prompt);
  return tokens > maxTokens;
}

/**
 * Get compression statistics for a prompt
 */
export function getCompressionStats(prompt: string): {
  tokens: number;
  requiresCompression: boolean;
  estimatedCompressionRatio: number;
} {
  const tokens = estimateTokenCount(prompt);
  const requiresComp = tokens > 4000;
  
  // Estimate compression ratio based on token count
  let estimatedRatio = 1.0;
  if (requiresComp) {
    // Assume we can compress to about 60-70% for non-critical content
    estimatedRatio = 0.65;
  }

  return {
    tokens,
    requiresCompression: requiresComp,
    estimatedCompressionRatio: estimatedRatio,
  };
}
