import type { Metadata } from '@site8/shared';

/**
 * Test group definition
 */
export type TestGroup = {
  readonly comments?: string;
  readonly id: number;
  readonly name: string;
  readonly sectionId: number;
  readonly tags?: readonly string[];
};

/**
 * Test section definition
 */
export type TestSection = {
  readonly description?: string;
  readonly id: number;
  readonly name: string;
};

export type Test = {
  readonly code?: TestCode[];
  readonly comments?: string;
  readonly groupId: number;
  readonly id: number;
  readonly name: string;
  readonly tags?: readonly string[];
};

export type TestCode = {
  readonly content: string;
  readonly id: number;
  readonly type: string;
};

/**
 * Complete test file structure
 */
export type TestFile = {
  readonly groups: readonly TestGroup[];
  readonly items: readonly Test[];
  readonly metadata: Metadata;
  readonly sections: readonly TestSection[];
};
