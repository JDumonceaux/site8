export interface Page {
  readonly id: number;
  readonly name: string;
  readonly long_title?: string;
  readonly edit_date?: Date;
  readonly resources?: boolean;
  readonly parentId?: number;
  readonly fileName?: string;
  readonly text?: string;
}
