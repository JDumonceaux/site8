// Returned to front end
export type MenuItem = {
  readonly id: number;
  readonly localId: number;
  readonly name?: string;
  readonly to?: string;
  readonly url?: string;
  readonly toComplete?: string;
  readonly parentId?: number;
  readonly seq: number;
  readonly type: 'root' | 'menu' | 'page';
  readonly items?: MenuItem[];
  readonly sortby: 'seq' | 'name';
};
