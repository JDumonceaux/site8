export type Test = {
  readonly line: number;
  readonly action?: 'add' | 'edit' | 'delete';
  readonly id: number;
  readonly name: string;
  readonly text?: string;
  readonly type?: 'section' | 'test';
  readonly level?: 'page' | 'project';
  readonly projectType?: ['react', 'nodejs'];
  readonly parentId: number;
  readonly parentSeq: number;
};
