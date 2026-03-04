/**
 * Common generic utility types shared across client and server.
 */

/**
 * Generic type for entities with a numeric or string ID and a display name.
 * Used for lookup tables, dropdowns, and key-value pairs.
 */
export type EntityPair<TKey extends number | string = number> = {
  readonly id: TKey;
  readonly name: string;
};

/**
 * Generic type for indexed key-value pairs.
 * Useful for array indices mapped to values.
 */
export type IndexedPair<
  TValue = string,
  TKey extends number | string = number,
> = {
  readonly key: TKey;
  readonly value: TValue;
};
