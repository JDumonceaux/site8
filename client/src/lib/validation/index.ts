/**
 * Validation Module
 *
 * Centralized exports for Valibot-based form validation
 */

// Schemas
export * from './schemas';

// Utilities
export * from './utils';

// Hook
export { default as useValibotValidation } from '@hooks/useValibotValidation';

// Re-export commonly used Valibot functions
export * as v from 'valibot';
