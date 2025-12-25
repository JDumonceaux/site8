import type { Parent } from './Parent.js';

export type Test = {
  readonly action?: 'add' | 'edit' | 'delete';
  readonly id: number;
  readonly level?: 'page' | 'project';
  readonly name: string;
  readonly parent: Parent;
  readonly parentItems?: Parent[];
  readonly projectType?: ['react', 'nodejs'];
  readonly text?: string;
  readonly type?: 'section' | 'test';
  readonly value?: string;
};
