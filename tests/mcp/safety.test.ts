/**
 * MCP Safety Validation Tests
 * 
 * Tests the safety validation layer that enforces governance rules before GitHub operations.
 * All tests should be RED initially (failing) because implementation doesn't exist yet.
 * 
 * Test Coverage:
 * - CI status validation
 * - Branch protection validation
 * - QA approval validation
 * - Compliance approval validation
 * - Merge conflict detection
 * - Safety check bypass prevention
 */

import { describe, it, expect, beforeEach, jest } from '@jest/globals'

describe('MCP Safety Validation', () => {
  describe('validateMergeSafety', () => {
    it('should pass when all safety checks pass', async () => {
      const { validateMergeSafety } = await import('@/lib/mcp/safety')
      
      const result = await validateMergeSafety({
        owner: 'MaturionISMS',
        repo: 'test-repo',
        prNumber: 123,
        config: {
          requireCIGreen: true,
          respectBranchProtection: true,
          requireQAApproval: true,
          requireComplianceApproval: true
        }
      })
      
      expect(result.passed).toBe(true)
      expect(result.checks.ciStatus.passed).toBe(true)
      expect(result.checks.branchProtection.passed).toBe(true)
      expect(result.checks.qaApproval.passed).toBe(true)
      expect(result.checks.complianceApproval.passed).toBe(true)
      expect(result.checks.mergeConflicts.passed).toBe(true)
      expect(result.blockingReasons).toHaveLength(0)
    })

    it('should fail when CI is not green', async () => {
      const { validateMergeSafety } = await import('@/lib/mcp/safety')
      
      // Mock GitHub API to return failing CI
      jest.mock('@/lib/github/client', () => ({
        github: {
          rest: {
            repos: {
              getCombinedStatusForRef: jest.fn().mockResolvedValue({
                data: { state: 'failure' }
              })
            }
          }
        }
      }))
      
      const result = await validateMergeSafety({
        owner: 'MaturionISMS',
        repo: 'test-repo',
        prNumber: 123,
        config: {
          requireCIGreen: true,
          respectBranchProtection: true,
          requireQAApproval: true,
          requireComplianceApproval: true
        }
      })
      
      expect(result.passed).toBe(false)
      expect(result.checks.ciStatus.passed).toBe(false)
      expect(result.blockingReasons).toContain('CI status is not green')
    })

    it('should fail when QA approval label is missing', async () => {
      const { validateMergeSafety } = await import('@/lib/mcp/safety')
      
      // Mock PR without QA approval label
      jest.mock('@/lib/github/client', () => ({
        github: {
          rest: {
            pulls: {
              get: jest.fn().mockResolvedValue({
                data: {
                  labels: [{ name: 'feature' }] // No qa-approved label
                }
              })
            }
          }
        }
      }))
      
      const result = await validateMergeSafety({
        owner: 'MaturionISMS',
        repo: 'test-repo',
        prNumber: 123,
        config: {
          requireCIGreen: true,
          respectBranchProtection: true,
          requireQAApproval: true,
          requireComplianceApproval: true
        }
      })
      
      expect(result.passed).toBe(false)
      expect(result.checks.qaApproval.passed).toBe(false)
      expect(result.blockingReasons).toContain('QA approval label missing')
    })

    it('should fail when QA blocked label is present', async () => {
      const { validateMergeSafety } = await import('@/lib/mcp/safety')
      
      // Mock PR with QA blocked label
      jest.mock('@/lib/github/client', () => ({
        github: {
          rest: {
            pulls: {
              get: jest.fn().mockResolvedValue({
                data: {
                  labels: [
                    { name: 'qa-approved' },
                    { name: 'qa-blocked' } // Blocking label
                  ]
                }
              })
            }
          }
        }
      }))
      
      const result = await validateMergeSafety({
        owner: 'MaturionISMS',
        repo: 'test-repo',
        prNumber: 123,
        config: {
          requireCIGreen: true,
          respectBranchProtection: true,
          requireQAApproval: true,
          requireComplianceApproval: true
        }
      })
      
      expect(result.passed).toBe(false)
      expect(result.checks.qaApproval.passed).toBe(false)
      expect(result.blockingReasons).toContain('QA blocked label present')
    })

    it('should fail when compliance approval is missing', async () => {
      const { validateMergeSafety } = await import('@/lib/mcp/safety')
      
      const result = await validateMergeSafety({
        owner: 'MaturionISMS',
        repo: 'test-repo',
        prNumber: 123,
        config: {
          requireCIGreen: true,
          respectBranchProtection: true,
          requireQAApproval: true,
          requireComplianceApproval: true
        }
      })
      
      expect(result.passed).toBe(false)
      expect(result.checks.complianceApproval.passed).toBe(false)
      expect(result.blockingReasons).toContain('Compliance approval label missing')
    })

    it('should fail when branch protection rules are violated', async () => {
      const { validateMergeSafety } = await import('@/lib/mcp/safety')
      
      // Mock branch protection requiring reviews
      jest.mock('@/lib/github/client', () => ({
        github: {
          rest: {
            repos: {
              getBranchProtection: jest.fn().mockResolvedValue({
                data: {
                  required_pull_request_reviews: {
                    required_approving_review_count: 2
                  }
                }
              })
            },
            pulls: {
              listReviews: jest.fn().mockResolvedValue({
                data: [
                  { state: 'APPROVED' }
                  // Only 1 approval, needs 2
                ]
              })
            }
          }
        }
      }))
      
      const result = await validateMergeSafety({
        owner: 'MaturionISMS',
        repo: 'test-repo',
        prNumber: 123,
        config: {
          requireCIGreen: true,
          respectBranchProtection: true,
          requireQAApproval: true,
          requireComplianceApproval: true
        }
      })
      
      expect(result.passed).toBe(false)
      expect(result.checks.branchProtection.passed).toBe(false)
      expect(result.blockingReasons).toContain('Insufficient reviews')
    })

    it('should fail when PR has merge conflicts', async () => {
      const { validateMergeSafety } = await import('@/lib/mcp/safety')
      
      // Mock PR with merge conflicts
      jest.mock('@/lib/github/client', () => ({
        github: {
          rest: {
            pulls: {
              get: jest.fn().mockResolvedValue({
                data: {
                  mergeable: false,
                  mergeable_state: 'dirty'
                }
              })
            }
          }
        }
      }))
      
      const result = await validateMergeSafety({
        owner: 'MaturionISMS',
        repo: 'test-repo',
        prNumber: 123,
        config: {
          requireCIGreen: true,
          respectBranchProtection: true,
          requireQAApproval: true,
          requireComplianceApproval: true
        }
      })
      
      expect(result.passed).toBe(false)
      expect(result.checks.mergeConflicts.passed).toBe(false)
      expect(result.blockingReasons).toContain('PR has merge conflicts')
    })

    it('should allow disabling individual safety checks', async () => {
      const { validateMergeSafety } = await import('@/lib/mcp/safety')
      
      // Mock PR without CI green
      const result = await validateMergeSafety({
        owner: 'MaturionISMS',
        repo: 'test-repo',
        prNumber: 123,
        config: {
          requireCIGreen: false, // Disabled
          respectBranchProtection: true,
          requireQAApproval: true,
          requireComplianceApproval: true
        }
      })
      
      // Should not check CI if disabled
      expect(result.checks.ciStatus).toBeUndefined()
    })

    it('should prevent bypass attempts', async () => {
      const { validateMergeSafety } = await import('@/lib/mcp/safety')
      
      // Attempt to bypass by passing fake safety result
      await expect(validateMergeSafety({
        owner: 'MaturionISMS',
        repo: 'test-repo',
        prNumber: 123,
        config: {
          requireCIGreen: true,
          respectBranchProtection: true,
          requireQAApproval: true,
          requireComplianceApproval: true
        },
        // @ts-expect-error - attempting bypass
        bypassSafety: true
      })).rejects.toThrow('Safety bypass is not allowed')
    })
  })

  describe('validateIssueCloseSafety', () => {
    it('should pass when issue has linked merged PRs', async () => {
      const { validateIssueCloseSafety } = await import('@/lib/mcp/safety')
      
      const result = await validateIssueCloseSafety({
        owner: 'MaturionISMS',
        repo: 'test-repo',
        issueNumber: 456,
        reason: 'Completed via PR #123',
        linkedPRs: [123]
      })
      
      expect(result.passed).toBe(true)
      expect(result.blockingReasons).toHaveLength(0)
    })

    it('should require closure reason', async () => {
      const { validateIssueCloseSafety } = await import('@/lib/mcp/safety')
      
      const result = await validateIssueCloseSafety({
        owner: 'MaturionISMS',
        repo: 'test-repo',
        issueNumber: 456,
        reason: '', // Empty reason
        linkedPRs: []
      })
      
      expect(result.passed).toBe(false)
      expect(result.blockingReasons).toContain('Closure reason is required')
    })
  })

  describe('validateCommentSafety', () => {
    it('should pass for comments without secrets', async () => {
      const { validateCommentSafety } = await import('@/lib/mcp/safety')
      
      const result = await validateCommentSafety({
        owner: 'MaturionISMS',
        repo: 'test-repo',
        issueNumber: 123,
        body: 'This is a normal comment'
      })
      
      expect(result.passed).toBe(true)
      expect(result.secretsDetected).toBe(false)
    })

    it('should detect API keys in comments', async () => {
      const { validateCommentSafety } = await import('@/lib/mcp/safety')
      
      const result = await validateCommentSafety({
        owner: 'MaturionISMS',
        repo: 'test-repo',
        issueNumber: 123,
        body: 'API key: sk-1234567890abcdef'
      })
      
      expect(result.passed).toBe(false)
      expect(result.secretsDetected).toBe(true)
      expect(result.blockingReasons).toContain('Secrets detected in comment')
    })

    it('should detect GitHub tokens in comments', async () => {
      const { validateCommentSafety } = await import('@/lib/mcp/safety')
      
      const result = await validateCommentSafety({
        owner: 'MaturionISMS',
        repo: 'test-repo',
        issueNumber: 123,
        body: 'Token: ghp_abcdefghijklmnopqrstuvwxyz123456'
      })
      
      expect(result.passed).toBe(false)
      expect(result.secretsDetected).toBe(true)
    })

    it('should detect AWS keys in comments', async () => {
      const { validateCommentSafety } = await import('@/lib/mcp/safety')
      
      const result = await validateCommentSafety({
        owner: 'MaturionISMS',
        repo: 'test-repo',
        issueNumber: 123,
        body: 'AWS key: AKIAIOSFODNN7EXAMPLE'
      })
      
      expect(result.passed).toBe(false)
      expect(result.secretsDetected).toBe(true)
    })
  })
})
