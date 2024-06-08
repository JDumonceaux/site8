export type Page = {
  readonly id: number;
  readonly name: string;
  readonly to?: string;
  readonly url?: string;
  readonly text?: string;
  readonly edit_date?: Date;
  readonly create_date?: Date;
  readonly file?: boolean;
  readonly reading_time?: string;
  readonly readability_score?: string;
  readonly type: 'root' | 'menu' | 'page';
  readonly items?: Page[];
  readonly toComplete?: string;
  readonly parentId?: number;
  readonly seq: number;
  parent?: { id: number; seq: number }[];
  sortby?: 'seq' | 'name';
};
