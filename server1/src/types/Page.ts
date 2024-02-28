export type Page = {
  readonly id: number;
  readonly short_title: string;
  readonly long_title?: string;
  readonly edit_date?: Date;
  readonly resources?: boolean;
  readonly parent?: string;
  readonly fileName?: string;
  readonly text?: string;
};
