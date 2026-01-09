import type { Collection } from "./Collection.js";
import { Metadata } from "./Metadata.js";

/**
 * Tests collection type with groups and sections
 */
export type Tests = Collection<TestSection> & {
  readonly seq?: number;
  readonly metadata: Metadata;
};

export type TestSection = {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
  readonly groups?: { seq: number; item: TestGroup }[];
};

export type TestGroup = {
  readonly id: number;
  readonly name: string;
  readonly items?: { seq: number; item: Test }[];
  readonly comments?: string;
  readonly tags?: string[];
  readonly seq?: number;
};

export type Test = {
  readonly id: number;
  readonly name: string;
  readonly code?: string;
  readonly seq?: number;
  readonly tags?: string[];
  readonly comments?: string;
};
