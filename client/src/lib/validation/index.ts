/**
 * Validation Module
 *
 * Centralized exports for Valibot-based form validation
 */

// Hook
export { default as useValibotValidation } from '@hooks/useValibotValidation';

// Schemas
export * from './schemas';

// Utilities
export * from './utils';

// Re-export commonly used Valibot functions
export * as v from 'valibot';
