export type Page = {
  readonly id: number;
  readonly name: string;
  readonly long_title?: string;
  readonly edit_date?: Date;
  readonly resources?: boolean;
  readonly parentId?: number;
  readonly fileName?: string;
  readonly text?: string;
  readonly reading_time?: string;
  readonly readability_score?: string;
  readonly url?: string;
  readonly seq?: number;
};
