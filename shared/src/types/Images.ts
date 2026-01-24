/**
 * Image type - represents an image with metadata
 */
export type Image = {
  readonly alt: string;
  readonly id: number;
  readonly src: string;
  readonly title: string;
};

/**
 * Images type - array of Image objects
 */
export type Images = Image[];
