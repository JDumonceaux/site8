import { Metadata } from "./Metadata.js";

/**
 * Tests collection type with groups and sections
 */
export type Tests = {
  readonly sections?: TestSection[];
  readonly metadata: Metadata;
};

export type TestSection = {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
  readonly seq?: number;
  readonly groups?: TestGroup[];
};

export type TestGroup = {
  readonly id: number;
  readonly name: string;
  readonly items?: Test[];
  readonly comments?: string;
  readonly tags?: string[];
  readonly seq?: number;
};

export type Test = {
  readonly id: number;
  readonly name: string;
  readonly code?: TestCode[];
  readonly seq?: number;
  readonly tags?: string[];
  readonly comments?: string;
};

export type TestCode = {
  readonly content: string;
  readonly id: number;
  readonly seq: number;
  readonly type: string;
};
