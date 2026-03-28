import * as v from "valibot";

import type { Metadata } from "./Metadata.js";

export const TestCodeSchema = v.object({
  content: v.string(),
  id: v.pipe(v.number(), v.integer(), v.minValue(1)),
  type: v.string(),
});

export const TestSchema = v.object({
  code: v.optional(v.array(TestCodeSchema)),
  comments: v.optional(v.string()),
  id: v.pipe(v.number(), v.integer(), v.minValue(1)),
  name: v.pipe(v.string(), v.minLength(1)),
  tags: v.optional(v.array(v.string())),
});

export const TestGroupSchema = v.object({
  comments: v.optional(v.string()),
  id: v.pipe(v.number(), v.integer(), v.minValue(1)),
  items: v.optional(v.array(TestSchema)),
  name: v.pipe(v.string(), v.minLength(1)),
  sectionId: v.optional(v.pipe(v.number(), v.integer())),
  sectionName: v.optional(v.string()),
  tags: v.optional(v.array(v.string())),
});

export const TestSectionSchema = v.object({
  description: v.optional(v.string()),
  groups: v.optional(v.array(TestGroupSchema)),
  id: v.pipe(v.number(), v.integer(), v.minValue(1)),
  name: v.pipe(v.string(), v.minLength(1)),
});

export type TestCode = v.InferOutput<typeof TestCodeSchema>;
export type Test = v.InferOutput<typeof TestSchema>;
export type TestGroup = v.InferOutput<typeof TestGroupSchema>;
export type TestSection = v.InferOutput<typeof TestSectionSchema>;

/**
 * Tests collection type with groups and sections
 */
export type Tests = {
  readonly metadata: Metadata;
  readonly sections?: TestSection[];
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
