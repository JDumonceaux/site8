export type MenuItem = {
  readonly id: number;
  readonly name?: string;
  readonly to?: string;
  readonly url?: string;
  readonly toComplete?: string;
  readonly parentId: number;
  readonly parentSeq: number;
  readonly type: 'root' | 'menu' | 'page';
  readonly sortby: 'seq' | 'name';
  readonly file?: boolean;
  readonly seq: number;
};
