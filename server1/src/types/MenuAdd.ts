export type MenuAdd = {
  readonly id: number;
  readonly parentId: number;
  readonly name: string;
  readonly seq: number;
  readonly sortby: 'seq' | 'name';
};
