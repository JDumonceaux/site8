export type Image = {
  readonly id: number;
  readonly name: string;
  readonly location?: string;
  readonly src?: string;
  readonly folder?: string;
  readonly official_url?: string;
  readonly tags?: string[];
  readonly description?: string;
  readonly edit_date?: Date;
  readonly create_date?: Date;
  readonly isMatched?: boolean;
};
