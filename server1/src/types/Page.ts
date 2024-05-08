export type Page = {
  readonly id: number;
  readonly name: string;
  readonly to?: string;
  readonly url?: string;
  readonly text?: string;
  readonly long_title?: string;
  readonly edit_date?: Date;
  readonly create_date?: Date;
  readonly parent: { id?: number; seq?: number }[];
  readonly file?: boolean;
  readonly reading_time?: string;
  readonly readability_score?: string;
};
