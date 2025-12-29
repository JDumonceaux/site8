import type { Artist } from '@site8/shared';
import type { Item } from '@site8/shared';
import type { Metadata } from '@site8/shared';

/**
 * Server-specific Items type
 * Extended collection with both items and artists
 */
export type Items = {
  readonly artists: Artist[];
  readonly items: Item[];
  readonly metadata: Metadata;
};
