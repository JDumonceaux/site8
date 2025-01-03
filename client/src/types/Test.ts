import type { Parent } from './Parent';

export type Test = {
  readonly action?: 'add' | 'delete' | 'edit';
  readonly id: number;
  readonly level?: 'page' | 'project';
  readonly lineId: number;
  readonly name: string;
  readonly parent: Parent;
  readonly projectType?: ['react', 'nodejs'];
  readonly text?: string;
  readonly type?: 'section' | 'test';
};
