import path from 'path';

import FilePath from '../../lib/filesystem/FilePath.js';

export const IMAGE_SRC_ROOT = '/public/images';

export const normalizeFolder = (folder: string): string =>
  folder.replace(/\\/g, '/').replace(/^\.?\//, '');

export const toImageSrc = (folder: string, fileName: string): string => {
  const normalizedFolder = normalizeFolder(folder);
  if (!normalizedFolder || normalizedFolder === '.') {
    return `${IMAGE_SRC_ROOT}/${fileName}`;
  }
  return `${IMAGE_SRC_ROOT}/${normalizedFolder}/${fileName}`;
};

export type ParsedImageSrc = {
  readonly fileName: string;
  readonly folder: string;
  readonly relativePath: string;
};

export const parseImageSrc = (src: string): ParsedImageSrc | null => {
  if (!src.startsWith(IMAGE_SRC_ROOT)) {
    return null;
  }

  const relativePath = src.slice(IMAGE_SRC_ROOT.length + 1);
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

export const isSiteFolder = (folder: string): boolean => {
  const normalized = normalizeFolder(folder);
  return normalized === 'site' || normalized.startsWith('site/');
};

export const toTitle = (fileName: string): string => {
  const baseName = path.parse(fileName).name;
  return baseName.replace(/[-_]+/g, ' ').trim();
};

export const toCapitalizedFolderName = (folderName: string): string =>
  folderName
    .replace(/[-_]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');

export const resolveSafeImagePath = (relativePath: string): string | null => {
  const imagesRoot = path.resolve(FilePath.getImageDirAbsolute());
  const resolvedImagePath = path.resolve(imagesRoot, relativePath);
  const relativeToRoot = path.relative(imagesRoot, resolvedImagePath);

  if (relativeToRoot.startsWith('..') || path.isAbsolute(relativeToRoot)) {
    return null;
  }

  return resolvedImagePath;
};
