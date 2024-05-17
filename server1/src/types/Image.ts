export type Image = {
  readonly id: number;
  readonly name: string;
  readonly location?: string;
  readonly src?: string;
  readonly description?: string;
  readonly official_url?: string;
  readonly tags?: string[];
  readonly childCount?: number;
  readonly isMatched?: boolean;
  readonly matchedId?: number;
  readonly folder?: string;
};
