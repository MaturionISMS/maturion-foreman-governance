/**
 * Prompt Compressor Tests
 * Validates semantic chunking, compression fidelity, and token budgeting
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  compressPrompt,
  requiresCompression,
  getCompressionStats,
  type CompressionOptions,
} from '@/lib/foreman/context/prompt-compressor';

describe('Prompt Compressor', () => {
  describe('requiresCompression', () => {
    it('should detect prompts that need compression', () => {
      const largePrompt = 'a'.repeat(20000); // ~5000 tokens
      assert.strictEqual(requiresCompression(largePrompt, 4000), true);
    });

    it('should not compress prompts within limits', () => {
      const smallPrompt = 'This is a short message';
      assert.strictEqual(requiresCompression(smallPrompt, 4000), false);
    });

    it('should respect custom max tokens', () => {
      const mediumPrompt = 'a'.repeat(8000); // ~2000 tokens
      assert.strictEqual(requiresCompression(mediumPrompt, 1000), true);
      assert.strictEqual(requiresCompression(mediumPrompt, 3000), false);
    });
  });

  describe('getCompressionStats', () => {
    it('should calculate compression stats', () => {
      const prompt = 'a'.repeat(20000); // ~5000 tokens
      const stats = getCompressionStats(prompt);

      assert.ok(stats.tokens > 0, 'Should have token count');
      assert.strictEqual(stats.requiresCompression, true, 'Should require compression');
      assert.ok(stats.estimatedCompressionRatio < 1, 'Should have compression ratio < 1');
    });

    it('should indicate no compression needed for small prompts', () => {
      const prompt = 'Short message';
      const stats = getCompressionStats(prompt);

      assert.strictEqual(stats.requiresCompression, false);
      assert.strictEqual(stats.estimatedCompressionRatio, 1.0);
    });
  });

  describe('compressPrompt', () => {
    it('should not compress prompts already within limits', async () => {
      const prompt = 'This is a short governance message with critical instructions.';
      const result = await compressPrompt(prompt);

      assert.strictEqual(result.metadata.compressed, false);
      assert.strictEqual(result.compressedPrompt, prompt);
      assert.strictEqual(result.compressionRatio, 1.0);
      assert.strictEqual(result.metadata.algorithmUsed, 'none');
    });

    it('should compress large prompts', async () => {
      const prompt = generateLargePrompt(30000); // ~7500 tokens (well over 4000)
      const result = await compressPrompt(prompt, { targetMaxTokens: 4000 });

      assert.strictEqual(result.metadata.compressed, true);
      assert.ok(result.compressedTokens <= 4000, 'Should compress to target');
      assert.ok(result.compressedTokens < result.originalTokens, 'Should reduce token count');
      assert.ok(result.compressionRatio < 1, 'Should have compression ratio < 1');
      assert.strictEqual(result.metadata.algorithmUsed, 'semantic-chunking');
    });

    it('should preserve governance content', async () => {
      const prompt = `
This is some regular content that can be compressed.

GOVERNANCE: This is a critical governance rule that must be preserved.
COMPLIANCE: This mandatory compliance requirement shall be followed.

More regular content here that can be compressed or removed.

SECURITY: This security constraint is essential for the system.
      `.trim();

      const result = await compressPrompt(prompt, { 
        targetMaxTokens: 100,
        preserveGovernance: true 
      });

      assert.ok(result.compressedPrompt.includes('governance'), 'Should preserve governance content');
      assert.ok(result.compressedPrompt.includes('compliance'), 'Should preserve compliance content');
      assert.ok(result.compressedPrompt.includes('security'), 'Should preserve security content');
      assert.strictEqual(result.metadata.governancePreserved, true);
    });

    it('should preserve architecture content', async () => {
      const prompt = `
Some filler content that can be removed.
${'More filler. '.repeat(500)}

ARCHITECTURE: This is the system architecture design pattern.
COMPONENT: This module is part of the core infrastructure.

More filler content.
${'Extra filler. '.repeat(500)}

INTERFACE: This API interface must be preserved.
      `.trim();

      const result = await compressPrompt(prompt, { 
        targetMaxTokens: 100,
        preserveArchitecture: true 
      });

      const compressedLower = result.compressedPrompt.toLowerCase();
      assert.ok(
        compressedLower.includes('architecture') || 
        compressedLower.includes('component') || 
        compressedLower.includes('interface'),
        'Should preserve some architecture content'
      );
      assert.strictEqual(result.metadata.architecturePreserved, true);
    });

    it('should preserve critical instructions', async () => {
      const prompt = `
Regular text that can be compressed.

Critical instructions:
- This is a required step
- This must be followed
- This is essential for success

1. First critical step
2. Second critical step
3. Third critical step

More regular content.
      `.trim();

      const result = await compressPrompt(prompt, { 
        targetMaxTokens: 100,
        preserveCriticalInstructions: true 
      });

      // Check that numbered lists are preserved
      assert.ok(
        result.compressedPrompt.includes('1.') || 
        result.compressedPrompt.includes('required') ||
        result.compressedPrompt.includes('must'),
        'Should preserve critical instructions'
      );
    });

    it('should split into semantic chunks', async () => {
      const prompt = generateLargePrompt(30000); // ~7500 tokens
      const result = await compressPrompt(prompt, { 
        targetMaxTokens: 4000,
        chunkSize: 1000 
      });

      assert.ok(result.chunksProcessed > 0, 'Should process chunks');
      assert.ok(result.compressedTokens <= 4000, 'Should compress to target');
    });

    it('should apply additional compression if needed', async () => {
      const prompt = generateVeryLargePrompt(80000); // ~20000 tokens
      const result = await compressPrompt(prompt, { targetMaxTokens: 3000 });

      assert.ok(result.compressedTokens <= 3500, 'Should aggressively compress');
      assert.ok(result.compressionRatio < 0.2, 'Should have high compression ratio');
    });

    it('should handle prompts with mixed content', async () => {
      const prompt = `
# System Overview

This is a regular paragraph with some details that can be compressed.

## Governance Section

GOVERNANCE: All changes must follow the approval process.
POLICY: No direct commits to main branch.

## Architecture Section

ARCHITECTURE: The system uses a microservices architecture.
DESIGN PATTERN: Event-driven architecture for async operations.

## Details

More details here that can be compressed...
${'Regular content. '.repeat(1000)}
      `.trim();

      const result = await compressPrompt(prompt, { targetMaxTokens: 2000 });

      // Verify compression
      assert.ok(result.metadata.compressed, 'Should compress mixed content');
      assert.ok(result.compressedTokens < result.originalTokens, 'Should reduce tokens');
      
      // Verify preservation - check case-insensitively
      const compressedLower = result.compressedPrompt.toLowerCase();
      const hasGovernance = compressedLower.includes('governance') || compressedLower.includes('policy');
      const hasArchitecture = compressedLower.includes('architecture') || compressedLower.includes('design');
      assert.ok(hasGovernance || hasArchitecture, 'Should preserve some critical content');
    });

    it('should respect compression options', async () => {
      const prompt = generateLargePrompt(25000);

      const options: CompressionOptions = {
        targetMaxTokens: 3000,
        preserveGovernance: false,
        preserveArchitecture: false,
        preserveCriticalInstructions: false,
        chunkSize: 500,
      };

      const result = await compressPrompt(prompt, options);

      assert.ok(result.compressedTokens <= 3000, 'Should respect target tokens');
      assert.strictEqual(result.metadata.governancePreserved, false);
      assert.strictEqual(result.metadata.architecturePreserved, false);
    });
  });

  describe('compression fidelity', () => {
    it('should maintain readability after compression', async () => {
      const prompt = `
This is an important architectural document.

ARCHITECTURE: The system uses a layered architecture with:
- Presentation layer
- Business logic layer
- Data access layer

GOVERNANCE: All code must pass QA validation before deployment.

Additional details about the implementation approach and best practices follow...
${'More implementation details. '.repeat(500)}
      `.trim();

      const result = await compressPrompt(prompt, { targetMaxTokens: 1000 });

      // Check that compressed prompt is still readable
      assert.ok(result.compressedPrompt.length > 0, 'Should have content');
      assert.ok(!result.compressedPrompt.includes('undefined'), 'Should not have undefined');
      
      // Check structure is maintained
      assert.ok(
        result.compressedPrompt.includes('##') || 
        result.compressedPrompt.includes('Governance') ||
        result.compressedPrompt.includes('Architecture'),
        'Should maintain structure'
      );
    });

    it('should handle edge cases gracefully', async () => {
      // Empty prompt
      const emptyResult = await compressPrompt('');
      assert.strictEqual(emptyResult.originalTokens, 0);
      assert.strictEqual(emptyResult.metadata.compressed, false);

      // Very short prompt
      const shortResult = await compressPrompt('Hi');
      assert.strictEqual(shortResult.metadata.compressed, false);

      // Prompt with only whitespace
      const whitespaceResult = await compressPrompt('   \n\n   ');
      assert.ok(whitespaceResult.compressedTokens <= 5, 'Whitespace should compress to very few tokens');
    });
  });

  describe('token budgeting', () => {
    it('should stay within target token budget', async () => {
      const testCases = [
        { promptSize: 20000, targetTokens: 2000 },
        { promptSize: 40000, targetTokens: 3000 },
        { promptSize: 80000, targetTokens: 4000 },
      ];

      for (const testCase of testCases) {
        const prompt = generateLargePrompt(testCase.promptSize);
        const result = await compressPrompt(prompt, { targetMaxTokens: testCase.targetTokens });

        assert.ok(
          result.compressedTokens <= testCase.targetTokens * 1.1, // Allow 10% tolerance
          `Should stay within budget for ${testCase.promptSize} chars -> ${testCase.targetTokens} tokens`
        );
      }
    });

    it('should report accurate token counts', async () => {
      const prompt = generateLargePrompt(30000); // Ensure it's large enough to compress
      const result = await compressPrompt(prompt, { targetMaxTokens: 3000 });

      assert.ok(result.originalTokens > 0, 'Should have original token count');
      assert.ok(result.compressedTokens > 0, 'Should have compressed token count');
      assert.ok(result.compressedTokens < result.originalTokens, 'Compressed should be less than original');
      assert.strictEqual(
        result.compressionRatio,
        result.compressedTokens / result.originalTokens,
        'Compression ratio should be accurate'
      );
    });
  });
});

/**
 * Helper: Generate a large prompt for testing
 */
function generateLargePrompt(chars: number): string {
  const paragraphs: string[] = [];
  const paragraphSize = 500;
  const numParagraphs = Math.ceil(chars / paragraphSize);

  for (let i = 0; i < numParagraphs; i++) {
    paragraphs.push(
      `This is paragraph ${i + 1} with some regular content. ` +
      `It contains details that can be compressed. ` +
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. ` +
      `Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ` +
      `Ut enim ad minim veniam, quis nostrud exercitation ullamco.`
    );
  }

  return paragraphs.join('\n\n');
}

/**
 * Helper: Generate a very large prompt with governance and architecture content
 */
function generateVeryLargePrompt(chars: number): string {
  let prompt = `
# Large System Specification

GOVERNANCE: This system must comply with all regulatory requirements.
ARCHITECTURE: The system uses a distributed microservices architecture.

## Critical Requirements
- REQUIRED: All data must be encrypted at rest
- MANDATORY: Multi-factor authentication for all users
- ESSENTIAL: Audit logging for all sensitive operations

## System Design
`;

  // Add lots of regular content
  const contentSize = chars - 2000; // Reserve space for critical content
  prompt += generateLargePrompt(contentSize);

  return prompt;
}
