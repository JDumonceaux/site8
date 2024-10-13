export type ImageEdit = {
  readonly localId: number;
  readonly description?: string;
  readonly fileName: string;
  readonly folder?: string;
  readonly id: number;
  readonly location?: string;
  readonly name?: string;
  readonly official_url?: string;
  readonly tags?: string[];
  readonly src?: string;
  readonly isDuplicate?: boolean;
  readonly delete?: boolean;

};
