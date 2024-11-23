export type ItemEdit = {
  readonly artist?: string;
  readonly description?: string;
  readonly fileName: string;
  readonly folder?: string;
  readonly id: number;
  readonly location?: string;
  readonly name?: string;
  readonly official_url?: string;
  readonly tags?: string[];
  readonly year?: string;
};
