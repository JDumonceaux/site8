import type { Metadata } from '@site8/shared';

/**
 * Types for the tests.json data structure
 */

/**
 * Section reference with optional sequence number
 */
export type SectionReference = {
  readonly id: number;
  readonly seq: number;
};

/**
 * Test group definition
 */
export type TestGroup = {
  readonly comments?: string;
  readonly id: number;
  readonly name: string;
  readonly sectionIds: readonly SectionReference[];
  readonly tags: readonly string[];
};

/**
 * Test section definition
 */
export type TestSection = {
  readonly description?: string;
  readonly id: number;
  readonly name: string;
};

/**
 * Base test item properties
 */
type BaseTestItem = {
  readonly code?: string;
  readonly id: number;
  readonly level?: string;
  readonly name: string;
  readonly parentId?: readonly [number, number];
  readonly seq?: number;
  readonly tags?: readonly string[];
  readonly type?: 'section' | 'test';
};

/**
 * Test item (union of all possible item structures)
 */
export type TestItem = BaseTestItem;

/**
 * Complete test file structure
 */
export type TestFile = {
  readonly groups: readonly TestGroup[];
  readonly items: readonly TestItem[];
  readonly metadata: Metadata;
  readonly sections: readonly TestSection[];
};
