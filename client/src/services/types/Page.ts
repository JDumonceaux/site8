export type Page = {
  readonly id: number;
  readonly name: string;
  readonly edit_date?: Date;
  readonly create_date?: Date;
  readonly parent?: { id?: number; seq?: number }[];
  readonly file?: boolean;
  readonly text?: string;
  readonly reading_time?: string;
  readonly readability_score?: string;
  readonly to?: string;
  readonly url?: string;
};
