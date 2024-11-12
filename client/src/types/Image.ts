export type Image = {
  readonly artist?: string;
  readonly description?: string;
  readonly fileName: string;
  readonly folder?: string;
  readonly id: number;
  readonly isDuplicate?: boolean;
  readonly isMatched?: boolean;
  readonly localId?: number;
  readonly location?: string;
  readonly matchedId?: number;
  readonly name?: string;
  readonly official_url?: string;
  readonly tags?: string[];
  readonly year?: string;
};
