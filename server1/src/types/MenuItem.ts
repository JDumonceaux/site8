export type MenuItem = {
  readonly id: number;
  readonly name: string;
  readonly url: string;
  readonly to: string;
  readonly parentId?: number[];
  readonly level?: number[];
  readonly seq: number[];
  readonly sortby: 'seq' | 'name';
};
