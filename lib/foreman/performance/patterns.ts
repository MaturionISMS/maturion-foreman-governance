/**
 * CS5 Performance Patterns - Inefficiency Detection Definitions
 * 
 * Defines all forbidden patterns and inefficiencies that must be detected.
 * 
 * Constitutional Requirements:
 * - Zero-tolerance for TODO/FIXME/HACK comments
 * - Mandatory optimization of obvious inefficiencies
 * - Detection of performance anti-patterns
 */

export type PerformanceSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface PerformancePattern {
  id: string;
  name: string;
  description: string;
  pattern: RegExp;
  severity: PerformanceSeverity;
  category: 'forbidden_comment' | 'inefficient_code' | 'anti_pattern' | 'react_performance' | 'code_quality';
  action: 'block' | 'warn' | 'track';
  fix?: string;
}

/**
 * Forbidden Comment Patterns (ZERO TOLERANCE)
 */
export const FORBIDDEN_COMMENTS: PerformancePattern[] = [
  {
    id: 'TODO_COMMENT',
    name: 'TODO Comment',
    description: 'TODO comments are not allowed - track in Parking Station',
    pattern: /\bTODO\b/i,
    severity: 'critical',
    category: 'forbidden_comment',
    action: 'block',
    fix: 'Remove TODO and create Parking Station entry',
  },
  {
    id: 'FIXME_COMMENT',
    name: 'FIXME Comment',
    description: 'FIXME comments are not allowed - fix or track in Parking Station',
    pattern: /\bFIXME\b/i,
    severity: 'critical',
    category: 'forbidden_comment',
    action: 'block',
    fix: 'Remove FIXME and create Parking Station entry',
  },
  {
    id: 'HACK_COMMENT',
    name: 'HACK Comment',
    description: 'HACK comments indicate poor code quality',
    pattern: /\bHACK\b/i,
    severity: 'critical',
    category: 'forbidden_comment',
    action: 'block',
    fix: 'Refactor hack into proper solution',
  },
  {
    id: 'TEMP_COMMENT',
    name: 'Temporary Code Comment',
    description: 'Temporary code should not be committed',
    pattern: /\b(TEMP|temporary fix|temporary workaround)\b/i,
    severity: 'high',
    category: 'forbidden_comment',
    action: 'block',
    fix: 'Make permanent solution or track in Parking Station',
  },
  {
    id: 'OPTIMIZE_LATER',
    name: 'Optimize Later Comment',
    description: 'Optimization should happen now, not later',
    pattern: /(optimize later|improve performance|performance TODO)/i,
    severity: 'high',
    category: 'forbidden_comment',
    action: 'block',
    fix: 'Optimize now or create Parking Station entry with plan',
  },
  {
    id: 'FIX_LATER',
    name: 'Fix Later Comment',
    description: 'Code should be fixed before commit',
    pattern: /fix later/i,
    severity: 'high',
    category: 'forbidden_comment',
    action: 'block',
    fix: 'Fix now or track in Parking Station',
  },
  {
    id: 'QUICK_DIRTY',
    name: 'Quick and Dirty Comment',
    description: 'Code should be production-quality',
    pattern: /quick and dirty/i,
    severity: 'high',
    category: 'forbidden_comment',
    action: 'block',
    fix: 'Refactor to production quality',
  },
];

/**
 * Inefficient Code Patterns
 */
export const INEFFICIENT_PATTERNS: PerformancePattern[] = [
  {
    id: 'JSON_PARSE_STRINGIFY',
    name: 'JSON.parse(JSON.stringify()) Deep Clone',
    description: 'Use structuredClone() instead of JSON.parse(JSON.stringify())',
    pattern: /JSON\.parse\s*\(\s*JSON\.stringify\s*\(/,
    severity: 'medium',
    category: 'inefficient_code',
    action: 'warn',
    fix: 'Replace with structuredClone()',
  },
  {
    id: 'SYNC_FS_OPS',
    name: 'Synchronous File Operations',
    description: 'Use async file operations instead of sync',
    pattern: /fs\.(readFileSync|writeFileSync|existsSync|readdirSync)/,
    severity: 'low',
    category: 'inefficient_code',
    action: 'warn',
    fix: 'Use async fs.promises API',
  },
  {
    id: 'CONSOLE_LOG_PRODUCTION',
    name: 'Console.log in Production',
    description: 'Use proper logging framework instead of console.log',
    pattern: /console\.log\(/,
    severity: 'low',
    category: 'code_quality',
    action: 'warn',
    fix: 'Use logging framework or remove',
  },
  {
    id: 'NESTED_MAP_FILTER',
    name: 'Nested Array Methods',
    description: 'Chained .map().filter().reduce() can be inefficient',
    pattern: /\.(map|filter|reduce)\s*\([^)]+\)\s*\.\s*(map|filter|reduce)/,
    severity: 'low',
    category: 'inefficient_code',
    action: 'warn',
    fix: 'Consider combining operations or using for loop',
  },
  {
    id: 'COMMENTED_CODE',
    name: 'Commented Out Code',
    description: 'Remove commented code - use version control',
    pattern: /\/\/\s*(?:const|let|var|function|class|if|for|while|return)\s+/,
    severity: 'medium',
    category: 'code_quality',
    action: 'warn',
    fix: 'Remove commented code',
  },
];

/**
 * React Performance Anti-Patterns
 */
export const REACT_PATTERNS: PerformancePattern[] = [
  {
    id: 'INLINE_FUNCTION_PROP',
    name: 'Inline Function in JSX',
    description: 'Inline functions create new references on every render',
    pattern: /(?:onClick|onChange|onSubmit|on[A-Z]\w+)=\{(?:\([^)]*\)|[a-zA-Z_$][\w$]*)\s*=>/,
    severity: 'low',
    category: 'react_performance',
    action: 'warn',
    fix: 'Use useCallback for event handlers',
  },
  {
    id: 'MISSING_MEMO_EXPENSIVE',
    name: 'Expensive Computation Without Memo',
    description: 'Expensive computations should use useMemo',
    pattern: /(?:const|let)\s+\w+\s*=\s*(?:data|items|list)\s*\.\s*(?:map|filter|reduce|sort)/,
    severity: 'low',
    category: 'react_performance',
    action: 'warn',
    fix: 'Wrap expensive computation in useMemo',
  },
];

/**
 * All Performance Patterns Combined
 */
export const ALL_PATTERNS: PerformancePattern[] = [
  ...FORBIDDEN_COMMENTS,
  ...INEFFICIENT_PATTERNS,
  ...REACT_PATTERNS,
];

/**
 * Get patterns by action type
 */
export function getPatternsByAction(action: 'block' | 'warn' | 'track'): PerformancePattern[] {
  return ALL_PATTERNS.filter(p => p.action === action);
}

/**
 * Get patterns by severity
 */
export function getPatternsBySeverity(severity: PerformanceSeverity): PerformancePattern[] {
  return ALL_PATTERNS.filter(p => p.severity === severity);
}

/**
 * Get critical blocking patterns
 */
export function getCriticalPatterns(): PerformancePattern[] {
  return ALL_PATTERNS.filter(p => p.severity === 'critical' && p.action === 'block');
}
