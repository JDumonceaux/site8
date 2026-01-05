import type { Collection } from "./Collection.js";
import type { Test } from "./Test.js";

/**
 * Test group type
 */
export type TestGroup = {
  readonly id: number;
  readonly name: string;
};

/**
 * Tests collection type with groups
 */
export type Tests = Collection<Test> & {
  readonly groups?: TestGroup[];
};
