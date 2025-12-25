import type { EntityPair } from './common';

/**
 * @deprecated Use EntityPair<number> instead
 * Legacy type for backward compatibility
 */
export type IdValue = {
  readonly id: number;
  readonly value: string;
};

// Re-export the modern generic type
export type { EntityPair };
