import type { Metadata } from "./Metadata.js";

/**
 * Generic collection type for data with items and metadata.
 * Standardizes the structure used across multiple domain types.
 *
 * @template T - The type of items in the collection
 */
export type Collection<T> = {
  /** Array of items, may be optional or undefined depending on usage */
  readonly items: T[] | undefined;
  /** Metadata about the collection */
  readonly metadata: Metadata;
};

/**
 * Generic collection type with required items array.
 * Use when items should never be undefined.
 *
 * @template T - The type of items in the collection
 */
export type RequiredCollection<T> = {
  /** Array of items, always defined */
  readonly items: T[];
  /** Metadata about the collection */
  readonly metadata: Metadata;
};
