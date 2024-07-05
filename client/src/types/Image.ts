export type Image = {
  readonly id: number;
  readonly localId?: number;
  readonly name?: string;
  readonly location?: string;
  readonly description?: string;
  readonly official_url?: string;
  readonly tags?: string[];
  readonly isMatched?: boolean;
  readonly matchedId?: number;
  readonly fileName: string;
  readonly folder?: string;
  readonly isDuplicate?: boolean;
};
