import type { Parent } from './Parent.js';

export type Test = {
  readonly action?: 'add' | 'edit' | 'delete';
  readonly id: number;
  readonly name: string;
  readonly text?: string;
  readonly type?: 'section' | 'test';
  readonly level?: 'page' | 'project';
  readonly projectType?: ['react', 'nodejs'];
  readonly parent: Parent;
  readonly parentItems?: Parent[];
};
