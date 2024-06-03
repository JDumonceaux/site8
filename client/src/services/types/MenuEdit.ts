// Returned to front end
export type MenuEdit = {
  id: number;
  parentId?: number;
  seq?: number;
  type?: 'menu' | 'page';
  sortby?: 'seq' | 'name' | undefined;
};
