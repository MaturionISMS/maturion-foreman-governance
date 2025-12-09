/**
 * File Upload Processor
 * 
 * Processes uploaded files (PDF, MD, TXT, JSON) and converts them to context-injectable format.
 * Implements semantic chunking and metadata extraction.
 */

import { estimateTokenCount } from '../context-manager';
import { compressPrompt, type CompressionOptions } from './prompt-compressor';

export interface ProcessedFile {
  filename: string;
  contentType: string;
  content: string;
  tokens: number;
  chunks: FileChunk[];
  metadata: FileMetadata;
}

export interface FileChunk {
  id: string;
  content: string;
  tokens: number;
  type: 'text' | 'code' | 'data' | 'governance' | 'architecture';
  metadata?: Record<string, any>;
}

export interface FileMetadata {
  originalSize: number;
  processedSize: number;
  encoding?: string;
  extractedAt: string;
  fileType: 'pdf' | 'markdown' | 'text' | 'json';
  hasGovernanceContent: boolean;
  hasArchitectureContent: boolean;
}

/**
 * Supported file types for upload
 */
export const SUPPORTED_FILE_TYPES = {
  'text/markdown': ['md', 'markdown'],
  'text/plain': ['txt', 'text'],
  'application/json': ['json'],
  'application/pdf': ['pdf'], // Note: PDF processing would require additional library
};

/**
 * Maximum file size for uploads (10MB)
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

/**
 * Process uploaded file and convert to injectable context
 */
export async function processUploadedFile(
  file: File | Buffer,
  filename: string,
  contentType: string
): Promise<ProcessedFile> {
  console.log(`[FileProcessor] Processing file: ${filename} (${contentType})`);

  // Validate file type
  if (!isSupportedFileType(contentType, filename)) {
    throw new Error(`Unsupported file type: ${contentType}. Supported: ${Object.keys(SUPPORTED_FILE_TYPES).join(', ')}`);
  }

  // Extract content based on file type
  const content = await extractContent(file, contentType, filename);
  
  // Validate size
  if (content.length > MAX_FILE_SIZE) {
    throw new Error(`File too large: ${content.length} bytes (max: ${MAX_FILE_SIZE} bytes)`);
  }

  const originalSize = content.length;
  const tokens = estimateTokenCount(content);

  console.log(`[FileProcessor] Extracted ${tokens} tokens from ${filename}`);

  // Detect content type
  const hasGovernance = detectGovernanceContent(content);
  const hasArchitecture = detectArchitectureContent(content);

  // Split into semantic chunks
  const chunks = createSemanticChunks(content, filename);

  const metadata: FileMetadata = {
    originalSize,
    processedSize: content.length,
    extractedAt: new Date().toISOString(),
    fileType: getFileType(contentType, filename),
    hasGovernanceContent: hasGovernance,
    hasArchitectureContent: hasArchitecture,
  };

  return {
    filename,
    contentType,
    content,
    tokens,
    chunks,
    metadata,
  };
}

/**
 * Check if file type is supported
 */
function isSupportedFileType(contentType: string, filename: string): boolean {
  // Check by content type
  if (SUPPORTED_FILE_TYPES[contentType as keyof typeof SUPPORTED_FILE_TYPES]) {
    return true;
  }

  // Check by file extension
  const extension = filename.split('.').pop()?.toLowerCase();
  if (!extension) return false;

  return Object.values(SUPPORTED_FILE_TYPES).some(exts => 
    exts.includes(extension)
  );
}

/**
 * PDF processing error message
 */
const PDF_NOT_SUPPORTED_ERROR = 'PDF processing not yet implemented - please use text or markdown files';

/**
 * Extract content from file based on type
 */
async function extractContent(
  file: File | Buffer,
  contentType: string,
  filename: string
): Promise<string> {
  const fileType = getFileType(contentType, filename);

  // Handle Buffer (server-side)
  if (Buffer.isBuffer(file)) {
    if (fileType === 'pdf') {
      // PDF processing would require a library like pdf-parse
      // For now, return a placeholder
      throw new Error(PDF_NOT_SUPPORTED_ERROR);
    }
    return file.toString('utf-8');
  }

  // Handle File (client-side)
  if (fileType === 'pdf') {
    throw new Error(PDF_NOT_SUPPORTED_ERROR);
  }

  return await file.text();
}

/**
 * Determine file type from content type or filename
 */
function getFileType(contentType: string, filename: string): 'pdf' | 'markdown' | 'text' | 'json' {
  if (contentType === 'application/pdf' || filename.endsWith('.pdf')) {
    return 'pdf';
  }
  if (contentType === 'application/json' || filename.endsWith('.json')) {
    return 'json';
  }
  if (contentType === 'text/markdown' || filename.match(/\.(md|markdown)$/i)) {
    return 'markdown';
  }
  return 'text';
}

/**
 * Detect if content contains governance-related information
 */
function detectGovernanceContent(content: string): boolean {
  const governanceKeywords = [
    'governance', 'policy', 'compliance', 'security', 'audit', 'regulation',
    'QIEL', 'mandatory', 'required', 'constraint', 'rule'
  ];

  const lowerContent = content.toLowerCase();
  return governanceKeywords.some(keyword => lowerContent.includes(keyword));
}

/**
 * Detect if content contains architecture-related information
 */
function detectArchitectureContent(content: string): boolean {
  const architectureKeywords = [
    'architecture', 'design', 'pattern', 'component', 'module',
    'interface', 'api', 'schema', 'system', 'infrastructure'
  ];

  const lowerContent = content.toLowerCase();
  return architectureKeywords.some(keyword => lowerContent.includes(keyword));
}

/**
 * Create semantic chunks from file content
 */
function createSemanticChunks(content: string, filename: string): FileChunk[] {
  const chunks: FileChunk[] = [];
  const maxChunkTokens = 1000;

  // For JSON files, try to parse and chunk by structure
  if (filename.endsWith('.json')) {
    try {
      const parsed = JSON.parse(content);
      return createJsonChunks(parsed, filename);
    } catch {
      // Fall through to text chunking
    }
  }

  // For markdown files, chunk by sections
  if (filename.match(/\.(md|markdown)$/i)) {
    return createMarkdownChunks(content, filename);
  }

  // For plain text, chunk by paragraphs
  const paragraphs = content.split(/\n\n+/);
  let currentChunk = '';
  let currentTokens = 0;
  let chunkIndex = 0;

  for (const paragraph of paragraphs) {
    const paragraphTokens = estimateTokenCount(paragraph);

    if (currentTokens + paragraphTokens > maxChunkTokens && currentChunk) {
      // Save current chunk
      chunks.push({
        id: `${filename}_chunk_${chunkIndex++}`,
        content: currentChunk.trim(),
        tokens: currentTokens,
        type: classifyChunkType(currentChunk),
      });

      currentChunk = '';
      currentTokens = 0;
    }

    currentChunk += paragraph + '\n\n';
    currentTokens += paragraphTokens;
  }

  // Add final chunk
  if (currentChunk.trim()) {
    chunks.push({
      id: `${filename}_chunk_${chunkIndex}`,
      content: currentChunk.trim(),
      tokens: currentTokens,
      type: classifyChunkType(currentChunk),
    });
  }

  return chunks;
}

/**
 * Create chunks from JSON content
 */
function createJsonChunks(data: any, filename: string): FileChunk[] {
  const chunks: FileChunk[] = [];
  
  // If it's an array, chunk by items
  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      const content = JSON.stringify(item, null, 2);
      chunks.push({
        id: `${filename}_item_${index}`,
        content,
        tokens: estimateTokenCount(content),
        type: 'data',
        metadata: { index, isArray: true },
      });
    });
  } else if (typeof data === 'object') {
    // If it's an object, chunk by top-level keys
    Object.entries(data).forEach(([key, value]) => {
      const content = JSON.stringify({ [key]: value }, null, 2);
      chunks.push({
        id: `${filename}_${key}`,
        content,
        tokens: estimateTokenCount(content),
        type: 'data',
        metadata: { key },
      });
    });
  } else {
    // Fallback: treat as single chunk
    const content = JSON.stringify(data, null, 2);
    chunks.push({
      id: `${filename}_chunk_0`,
      content,
      tokens: estimateTokenCount(content),
      type: 'data',
    });
  }

  return chunks;
}

/**
 * Create chunks from markdown content by sections
 */
function createMarkdownChunks(content: string, filename: string): FileChunk[] {
  const chunks: FileChunk[] = [];
  
  // Split by headers
  const sections = content.split(/^(#{1,6}\s+.+)$/gm);
  
  let currentSection = '';
  let currentHeader = '';
  let chunkIndex = 0;

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    
    // Check if this is a header
    if (/^#{1,6}\s+/.test(section)) {
      // Save previous section if exists
      if (currentSection.trim()) {
        chunks.push({
          id: `${filename}_section_${chunkIndex++}`,
          content: (currentHeader + '\n' + currentSection).trim(),
          tokens: estimateTokenCount(currentSection),
          type: classifyChunkType(currentSection),
          metadata: { header: currentHeader.replace(/^#+\s+/, '') },
        });
      }
      
      currentHeader = section;
      currentSection = '';
    } else {
      currentSection += section;
    }
  }

  // Add final section
  if (currentSection.trim()) {
    chunks.push({
      id: `${filename}_section_${chunkIndex}`,
      content: (currentHeader + '\n' + currentSection).trim(),
      tokens: estimateTokenCount(currentSection),
      type: classifyChunkType(currentSection),
      metadata: { header: currentHeader.replace(/^#+\s+/, '') },
    });
  }

  return chunks;
}

/**
 * Classify chunk content type
 */
function classifyChunkType(content: string): 'text' | 'code' | 'data' | 'governance' | 'architecture' {
  const lowerContent = content.toLowerCase();

  // Check for governance
  if (detectGovernanceContent(content)) {
    return 'governance';
  }

  // Check for architecture
  if (detectArchitectureContent(content)) {
    return 'architecture';
  }

  // Check for code blocks
  if (content.includes('```') || content.includes('    ') || /^[\t ]+/m.test(content)) {
    return 'code';
  }

  // Check for data structures
  if (content.includes('{') || content.includes('[') || content.includes('|')) {
    return 'data';
  }

  return 'text';
}

/**
 * Convert processed file to context-injectable string
 */
export async function fileToContext(
  processedFile: ProcessedFile,
  options: CompressionOptions = {}
): Promise<string> {
  const { filename, metadata, content } = processedFile;

  // Build header with metadata
  const header = `# Uploaded File: ${filename}
File Type: ${metadata.fileType}
Size: ${metadata.originalSize} bytes
Tokens: ${processedFile.tokens}
${metadata.hasGovernanceContent ? '⚠️ Contains Governance Content\n' : ''}${metadata.hasArchitectureContent ? '🏗️ Contains Architecture Content\n' : ''}
---
`;

  // Compress if needed
  if (processedFile.tokens > (options.targetMaxTokens || 4000)) {
    console.log(`[FileProcessor] Compressing file content (${processedFile.tokens} tokens)`);
    const compressed = await compressPrompt(content, options);
    return header + compressed.compressedPrompt;
  }

  return header + content;
}
