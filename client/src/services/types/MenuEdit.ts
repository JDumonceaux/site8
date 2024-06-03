// Returned to front end
export type MenuEdit = {
  readonly id: number;
  readonly parentId?: number;
  readonly seq: number;
  readonly sortby: 'seq' | 'name';
};
