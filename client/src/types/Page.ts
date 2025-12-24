export type Parent = {
  readonly id: number;
  readonly seq: number;
  readonly sortBy?: string;
};

export type Page = {
  readonly create_date?: Date;
  readonly edit_date?: Date;
  readonly file?: boolean;
  readonly id: number;
  readonly issue?: string;
  readonly line?: number;
  readonly parentItems?: Parent[];
  readonly readability_score?: string;
  readonly reading_time?: string;
  readonly text?: string;
  readonly title: string;
  readonly to?: string;
  readonly toComplete?: string;
  readonly type: 'page' | 'root' | 'menu';
  readonly url?: string;
};

export type PageEdit = {
  readonly text?: string;
} & Page;
