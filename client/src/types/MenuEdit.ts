export type MenuEdit = {
  readonly id: number;
  readonly name?: string;
  readonly parentId?: number;
  readonly parentSeq: number;
  readonly sortby: 'seq' | 'name';
  readonly newParentId?: number;
  readonly newParentSeq: number;
  readonly newSortby: 'seq' | 'name' | undefined;
};
