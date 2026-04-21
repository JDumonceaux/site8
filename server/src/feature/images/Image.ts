/**
 * File system representation of an image
 */
export type ImageFile = {
  readonly fileName: string;
  readonly folder: string;
};

/**
 * Image file with edit tracking
 */
export type ImageFileEdit = ImageFile & {
  readonly originalFolder?: string;
};
