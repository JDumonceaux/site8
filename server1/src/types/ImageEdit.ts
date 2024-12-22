export type ImageEdit = {
  readonly fileName: string;
  readonly folder?: string;
  readonly id: number;
  readonly itemId: number;
  readonly originalFolder?: string;
  readonly isNewItem?: boolean;
};
