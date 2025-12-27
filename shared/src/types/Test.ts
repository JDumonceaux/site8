/**
 * Test type - represents a test item
 */
export type Test = {
  readonly goal?: string;
  readonly id: number;
  readonly level?: string;
  readonly name: string;
  readonly notes?: string;
  readonly parentId?: number[];
  readonly projectType?: string[];
  readonly seq?: number;
  readonly text?: string;
  readonly type?: string;
  readonly value?: string;
};
