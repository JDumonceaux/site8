import type { Metadata } from "./Metadata.js";

/**
 * Tests collection type with groups and sections
 */
export type Tests = {
  readonly metadata: Metadata;
  readonly sections?: TestSection[];
};

export type TestSection = {
  readonly description?: string;
  readonly groups?: TestGroup[];
  readonly id: number;
  readonly name: string;
};

export type TestGroup = {
  readonly comments?: string;
  readonly id: number;
  readonly items?: Test[];
  readonly name: string;
  readonly sectionId?: number;
  readonly sectionName?: string;
  readonly tags?: string[];
};

export type Test = {
  readonly code?: TestCode[];
  readonly comments?: string;
  readonly id: number;
  readonly name: string;
  readonly tags?: string[];
};

export type TestCode = {
  readonly content: string;
  readonly id: number;
  readonly type: string;
};

/**
 * TestGroup with item count for sections list
 */
export type TestsSectionGroup = {
  readonly comments?: string;
  readonly id: number;
  readonly itemCount: number;
  readonly name: string;
  readonly sectionId?: number;
  readonly sectionName?: string;
  readonly tags?: string[];
};

/**
 * TestSection with groups including item counts
 */
export type TestsSection = {
  readonly description?: string;
  readonly groups: TestsSectionGroup[];
  readonly id: number;
  readonly name: string;
};
