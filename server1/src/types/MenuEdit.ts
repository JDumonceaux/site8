// Returned to front end
export type MenuEdit = {
  readonly id: number;
  readonly tempId?: number;
  readonly parentId?: number;
  readonly seq: number;
  readonly sortby: 'seq' | 'name';
  readonly newParentId?: number;
  readonly newSeq?: number;
  readonly newSortby?: 'seq' | 'name';
};
