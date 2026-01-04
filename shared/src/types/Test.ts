import type { Parent } from "./Page.js";

/**
 * Test type - represents a test item
 */
export type Test = {
  readonly goal?: string;
  readonly groupIds?: number[];
  readonly id: number;
  readonly level?: string;
  readonly name: string;
  readonly notes?: string;
  readonly parentId?: number[];
  readonly parentItems?: Parent[];
  readonly projectType?: string[];
  readonly prompt?: string;
  readonly seq?: number;
  readonly tags?: string[];
  readonly text?: string;
  readonly type?: string;
  readonly value?: string;
};
