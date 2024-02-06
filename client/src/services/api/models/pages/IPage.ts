export interface IPage {
  readonly id: number;
  readonly short_title: string;
  readonly long_title?: string;
  readonly edit_date?: Date;
  readonly resources?: boolean;
  readonly parent?: string;
  readonly fileName?: string;
  readonly text: string;
  readonly reading_time?: string;
  readonly readability_score?: string;
}
