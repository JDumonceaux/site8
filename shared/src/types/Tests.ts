import type { Collection } from "./Collection.js";
import type { Test } from "./Test.js";

/**
 * Tests collection type
 * Wraps Test items in a Collection structure
 */
export type Tests = Collection<Test>;
