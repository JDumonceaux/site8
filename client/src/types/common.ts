/**
 * Common generic types used across the application
 */

/**
 * Generic type for entities with numeric ID and string value/name
 * Used for simple lookup tables, dropdowns, and key-value pairs
 */
export type EntityPair<TKey extends number | string = number> = {
  readonly id: TKey;
  readonly name: string;
};

/**
 * Generic type for indexed key-value pairs
 * Useful for array indices mapped to values
 */
export type IndexedPair<
  TValue = string,
  TKey extends number | string = number,
> = {
  readonly key: TKey;
  readonly value: TValue;
};
