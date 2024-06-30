export type ImageEdit = {
  readonly id: number;
  readonly name?: string;
  readonly location?: string;
  readonly description?: string;
  readonly official_url?: string;
  readonly tags?: string[];
  readonly fileName: string;
  readonly folder?: string;
  readonly src?: string;
};
