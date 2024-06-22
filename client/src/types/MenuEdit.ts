export type MenuEdit = {
  readonly id: number;
  readonly localId: number;
  readonly parentId?: number;
  readonly name?: string;
  readonly seq: number;
  readonly sortby: 'seq' | 'name';
  readonly newParentId?: number;
  readonly newSeq: number;
  readonly newSortby: 'seq' | 'name' | undefined;
};
