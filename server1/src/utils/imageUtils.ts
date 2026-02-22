import path from 'path';

import FilePath from '../lib/filesystem/FilePath.js';

export type ParsedImageSrc = {
  readonly fileName: string;
  readonly folder: string;
  readonly relativePath: string;
};

export const parseImageSrc = (src: string): ParsedImageSrc | null => {
  if (!src.startsWith('/images/')) {
    return null;
  }

  const relativePath = src.replace(/^\/images\//, '');
  const segments = relativePath.split('/').filter(Boolean);
  const fileName = segments.at(-1);

  if (!fileName) {
    return null;
  }

  return {
    fileName,
    folder: segments.slice(0, -1).join('/'),
    relativePath,
  };
};

export const getImageMimeType = (inputPath: string): string => {
  const extension = path.extname(inputPath).toLowerCase();

  switch (extension) {
    case '.avif':
      return 'image/avif';
    case '.gif':
      return 'image/gif';
    case '.jpeg':
    case '.jpg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.svg':
      return 'image/svg+xml';
    case '.webp':
      return 'image/webp';
    default:
      return 'application/octet-stream';
  }
};

export const resolveSafeImagePath = (relativePath: string): string | null => {
  const imagesRoot = path.resolve(FilePath.getImageDirAbsolute());
  const resolvedImagePath = path.resolve(imagesRoot, relativePath);
  const relativeToRoot = path.relative(imagesRoot, resolvedImagePath);

  if (relativeToRoot.startsWith('..') || path.isAbsolute(relativeToRoot)) {
    return null;
  }

  return resolvedImagePath;
};
