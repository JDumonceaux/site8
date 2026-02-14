import type { IndexedPair } from './common';

/**
 * Key-value pair with numeric or string key
 * This is an alias of IndexedPair<string, number | string> for semantic clarity
 */
export type KeyValue = IndexedPair<string, number | string>;
