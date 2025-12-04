/**
 * Builder Capabilities Manifest
 * Defines available builders, their permissions, and supported task types
 */

import { BuilderCapability, BuilderType } from '@/types/builder'

/**
 * Builder Capabilities Registry
 * Lists all available builders and their capabilities
 */
export const BUILDER_CAPABILITIES: Record<BuilderType, BuilderCapability> = {
  ui: {
    name: 'UI Builder',
    type: 'ui',
    description: 'Generates and modifies user interface components and pages',
    permissions: [
      {
        resource: 'components',
        access: 'write',
        scope: 'ui-components'
      },
      {
        resource: 'pages',
        access: 'write',
        scope: 'app-pages'
      },
      {
        resource: 'styles',
        access: 'write',
        scope: 'css-styles'
      }
    ],
    supportedTaskTypes: [
      'create_component',
      'update_component',
      'create_page',
      'update_page',
      'create_layout',
      'update_styles'
    ],
    inputFormat: {
      required: ['module', 'taskDescription', 'organisationId'],
      optional: ['context', 'metadata', 'designSpecs'],
      schema: {
        type: 'object',
        properties: {
          module: { type: 'string' },
          taskDescription: { type: 'string' },
          organisationId: { type: 'string' },
          context: { type: 'object' },
          metadata: { type: 'object' },
          designSpecs: { type: 'object' }
        }
      }
    },
    outputFormat: {
      fields: ['success', 'artifacts', 'qaResults'],
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          artifacts: { type: 'array' },
          qaResults: { type: 'array' }
        }
      }
    }
  },
  
  api: {
    name: 'API Builder',
    type: 'api',
    description: 'Creates and maintains API endpoints and backend services',
    permissions: [
      {
        resource: 'api-routes',
        access: 'write',
        scope: 'app/api'
      },
      {
        resource: 'lib',
        access: 'write',
        scope: 'lib'
      },
      {
        resource: 'middleware',
        access: 'write',
        scope: 'middleware'
      }
    ],
    supportedTaskTypes: [
      'create_endpoint',
      'update_endpoint',
      'create_service',
      'update_service',
      'create_middleware',
      'update_middleware'
    ],
    inputFormat: {
      required: ['module', 'taskDescription', 'organisationId'],
      optional: ['context', 'metadata', 'apiSpecs'],
      schema: {
        type: 'object',
        properties: {
          module: { type: 'string' },
          taskDescription: { type: 'string' },
          organisationId: { type: 'string' },
          context: { type: 'object' },
          metadata: { type: 'object' },
          apiSpecs: { type: 'object' }
        }
      }
    },
    outputFormat: {
      fields: ['success', 'artifacts', 'qaResults'],
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          artifacts: { type: 'array' },
          qaResults: { type: 'array' }
        }
      }
    }
  },
  
  schema: {
    name: 'Schema Builder',
    type: 'schema',
    description: 'Manages database schemas, type definitions, and data models',
    permissions: [
      {
        resource: 'types',
        access: 'write',
        scope: 'types'
      },
      {
        resource: 'schema',
        access: 'write',
        scope: 'database-schema'
      },
      {
        resource: 'migrations',
        access: 'write',
        scope: 'migrations'
      }
    ],
    supportedTaskTypes: [
      'create_type',
      'update_type',
      'create_schema',
      'update_schema',
      'create_migration',
      'validate_schema'
    ],
    inputFormat: {
      required: ['module', 'taskDescription', 'organisationId'],
      optional: ['context', 'metadata', 'schemaSpecs'],
      schema: {
        type: 'object',
        properties: {
          module: { type: 'string' },
          taskDescription: { type: 'string' },
          organisationId: { type: 'string' },
          context: { type: 'object' },
          metadata: { type: 'object' },
          schemaSpecs: { type: 'object' }
        }
      }
    },
    outputFormat: {
      fields: ['success', 'artifacts', 'qaResults'],
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          artifacts: { type: 'array' },
          qaResults: { type: 'array' }
        }
      }
    }
  },
  
  integration: {
    name: 'Integration Builder',
    type: 'integration',
    description: 'Builds integrations with external services and APIs',
    permissions: [
      {
        resource: 'integrations',
        access: 'write',
        scope: 'lib/integrations'
      },
      {
        resource: 'api-clients',
        access: 'write',
        scope: 'lib/clients'
      },
      {
        resource: 'webhooks',
        access: 'write',
        scope: 'app/api/webhooks'
      }
    ],
    supportedTaskTypes: [
      'create_integration',
      'update_integration',
      'create_client',
      'update_client',
      'create_webhook',
      'update_webhook'
    ],
    inputFormat: {
      required: ['module', 'taskDescription', 'organisationId'],
      optional: ['context', 'metadata', 'integrationSpecs'],
      schema: {
        type: 'object',
        properties: {
          module: { type: 'string' },
          taskDescription: { type: 'string' },
          organisationId: { type: 'string' },
          context: { type: 'object' },
          metadata: { type: 'object' },
          integrationSpecs: { type: 'object' }
        }
      }
    },
    outputFormat: {
      fields: ['success', 'artifacts', 'qaResults'],
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          artifacts: { type: 'array' },
          qaResults: { type: 'array' }
        }
      }
    }
  },
  
  qa: {
    name: 'QA Builder',
    type: 'qa',
    description: 'Creates tests and validates builder outputs',
    permissions: [
      {
        resource: 'tests',
        access: 'write',
        scope: 'tests'
      },
      {
        resource: 'e2e',
        access: 'write',
        scope: 'e2e'
      },
      {
        resource: 'validation',
        access: 'execute',
        scope: 'all'
      }
    ],
    supportedTaskTypes: [
      'create_test',
      'update_test',
      'run_tests',
      'validate_output',
      'qa_review',
      'qa_of_qa_review'
    ],
    inputFormat: {
      required: ['module', 'taskDescription', 'organisationId'],
      optional: ['context', 'metadata', 'testSpecs', 'artifactsToValidate'],
      schema: {
        type: 'object',
        properties: {
          module: { type: 'string' },
          taskDescription: { type: 'string' },
          organisationId: { type: 'string' },
          context: { type: 'object' },
          metadata: { type: 'object' },
          testSpecs: { type: 'object' },
          artifactsToValidate: { type: 'array' }
        }
      }
    },
    outputFormat: {
      fields: ['success', 'artifacts', 'qaResults'],
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          artifacts: { type: 'array' },
          qaResults: { type: 'array' }
        }
      }
    }
  }
}

/**
 * Get capability for a specific builder
 */
export function getBuilderCapability(builderType: BuilderType): BuilderCapability {
  return BUILDER_CAPABILITIES[builderType]
}

/**
 * Get all available builder types
 */
export function getAvailableBuilders(): BuilderType[] {
  return Object.keys(BUILDER_CAPABILITIES) as BuilderType[]
}

/**
 * Validate if a builder supports a specific task type
 */
export function isTaskTypeSupported(builderType: BuilderType, taskType: string): boolean {
  const capability = BUILDER_CAPABILITIES[builderType]
  return capability.supportedTaskTypes.includes(taskType)
}

/**
 * Get builder permissions
 */
export function getBuilderPermissions(builderType: BuilderType) {
  return BUILDER_CAPABILITIES[builderType].permissions
}
