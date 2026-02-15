import type { Collection, Image } from '@site8/shared';
import type { ImageFile } from './types.js';

import { readdir } from 'node:fs/promises';
import path from 'path';
import { access, mkdir, rename, unlink } from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';

import FilePath from '../../lib/filesystem/FilePath.js';
import { FileService } from '../../lib/filesystem/FileService.js';
import { ImagesFileService } from './ImagesFileService.js';

const IMAGE_EXTENSIONS = new Set([
  '.avif',
  '.gif',
  '.jpeg',
  '.jpg',
  '.png',
  '.svg',
  '.webp',
]);

const normalizeFolder = (folder: string): string => {
  return folder.replace(/\\/g, '/').replace(/^\.?\//, '');
};

const isSiteFolder = (folder: string): boolean => {
  const normalized = normalizeFolder(folder);
  return normalized === 'site' || normalized.startsWith('site/');
};

const toTitle = (fileName: string): string => {
  const baseName = path.parse(fileName).name;
  return baseName.replace(/[-_]+/g, ' ').trim();
};

const toCapitalizedFolderName = (folderName: string): string => {
  return folderName
    .replace(/[-_]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');
};

const buildImageKey = (folder: string, fileName: string): string => {
  return `${normalizeFolder(folder).toLowerCase()}|${fileName.toLowerCase()}`;
};

const imageKeyFromSrc = (src: string): string | undefined => {
  if (!src.startsWith('/images/')) {
    return undefined;
  }

  const relativePath = src.replace(/^\/images\//, '');
  const segments = relativePath.split('/').filter(Boolean);

  if (segments.length === 0) {
    return undefined;
  }

  const fileName = segments.at(-1);
  if (!fileName) {
    return undefined;
  }

  const folder = segments.slice(0, -1).join('/');
  return buildImageKey(folder, fileName);
};

type ImagesIndexItem = {
  readonly id?: number;
  readonly fileName?: string;
  readonly folder?: string;
  readonly src?: string;
} & Record<string, unknown>;

type NewImageJsonEntry = {
  readonly fileName: string;
  readonly folder: string;
};

type ImagesIndexFile = {
  readonly metadata?: Record<string, unknown>;
  readonly items?: readonly ImagesIndexItem[];
};

type ImagesJsonEntry = {
  readonly id: number;
  readonly fileName: string;
  readonly folder: string;
} & Record<string, unknown>;

const parseImageSrc = (
  src: string,
): {
  readonly fileName: string;
  readonly folder: string;
} | null => {
  if (!src.startsWith('/images/')) {
    return null;
  }

  const relativePath = src.replace(/^\/images\//, '');
  const segments = relativePath.split('/').filter(Boolean);
  const fileName = segments.at(-1);

  if (!fileName) {
    return null;
  }

  const folder = segments.slice(0, -1).join('/');

  return {
    fileName,
    folder,
  };
};

const toImageSrc = (folder: string, fileName: string): string => {
  const normalizedFolder = normalizeFolder(folder);
  if (!normalizedFolder || normalizedFolder === '.') {
    return `/images/${fileName}`;
  }

  return `/images/${normalizedFolder}/${fileName}`;
};

export class ClientImagesService {
  private readonly fileService: FileService;
  private readonly imagesFileService: ImagesFileService;

  public constructor(imagesFileService?: ImagesFileService) {
    this.fileService = new FileService();
    this.imagesFileService = imagesFileService ?? new ImagesFileService();
  }

  public async getItems(): Promise<Collection<Image>> {
    const files = this.getDirectoryImages();
    const items = this.mapFilesToImages(files);

    return {
      items,
      metadata: {
        title: 'Images',
        totalItems: items.length,
      },
    };
  }

  public async getUnmatchedItems(): Promise<Collection<Image>> {
    const files = this.getDirectoryImages();
    const indexedKeys = await this.getIndexedImageKeys();

    const unmatchedFiles = files.filter(
      (file) => !indexedKeys.has(buildImageKey(file.folder, file.fileName)),
    );

    const items = this.mapFilesToImages(unmatchedFiles);

    return {
      items,
      metadata: {
        title: 'Unmatched Images',
        totalItems: items.length,
      },
    };
  }

  public async getYear2025FolderNames(): Promise<Collection<string>> {
    const year2025Dir = path.join(FilePath.getImageDirAbsolute(), '2025');

    const dirEntries = await readdir(year2025Dir, { withFileTypes: true });
    const folderNames = dirEntries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .toSorted((first, second) => first.localeCompare(second));

    const items = folderNames.map(toCapitalizedFolderName);

    return {
      items,
      metadata: {
        title: 'Image Folders 2025',
        totalItems: items.length,
      },
    };
  }

  public async moveImagesTo2025Folder(
    imageSrcs: readonly string[],
    targetFolderLabel: string,
  ): Promise<number> {
    const year2025Dir = path.join(FilePath.getImageDirAbsolute(), '2025');
    const targetFolderName =
      await this.resolve2025FolderNameByLabel(targetFolderLabel);

    if (!targetFolderName) {
      throw new Error(
        `Target folder not found for label: ${targetFolderLabel}`,
      );
    }

    const destinationFolderAbsolute = path.join(year2025Dir, targetFolderName);
    await mkdir(destinationFolderAbsolute, { recursive: true });

    let movedCount = 0;

    for (const src of imageSrcs) {
      const parsed = parseImageSrc(src);
      if (!parsed) {
        continue;
      }

      const sourceRelativePath = parsed.folder
        ? path.join(parsed.folder, parsed.fileName)
        : parsed.fileName;
      const sourceAbsolutePath = path.join(
        FilePath.getImageDirAbsolute(),
        sourceRelativePath,
      );
      const targetAbsolutePath = path.join(
        destinationFolderAbsolute,
        parsed.fileName,
      );

      if (sourceAbsolutePath === targetAbsolutePath) {
        continue;
      }

      await rename(sourceAbsolutePath, targetAbsolutePath);
      movedCount += 1;
    }

    return movedCount;
  }

  public async addImageEntry(
    entry: NewImageJsonEntry & Record<string, unknown>,
  ): Promise<ImagesJsonEntry> {
    const imagesIndex = await this.readImagesIndexFile();
    const items = [...(imagesIndex.items ?? [])];

    const newId =
      items.length > 0
        ? Math.max(
            ...items.map((item) => (item.id as number | undefined) ?? 0),
          ) + 1
        : 1;

    const newEntry: ImagesJsonEntry = {
      ...entry,
      id: newId,
    };

    await this.fileService.writeFile(
      {
        ...imagesIndex,
        items: [...items, newEntry],
      },
      FilePath.getDataDir('images.json'),
    );

    return newEntry;
  }

  public async updateImageEntry(
    id: number,
    updates: Partial<NewImageJsonEntry & Record<string, unknown>>,
  ): Promise<ImagesJsonEntry | null> {
    const imagesIndex = await this.readImagesIndexFile();
    const items = [...(imagesIndex.items ?? [])];

    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      return null;
    }

    const currentItem = items[itemIndex] as ImagesJsonEntry;
    const updatedItem: ImagesJsonEntry = {
      ...currentItem,
      ...updates,
      id,
    };

    items[itemIndex] = updatedItem;

    await this.fileService.writeFile(
      {
        ...imagesIndex,
        items,
      },
      FilePath.getDataDir('images.json'),
    );

    return updatedItem;
  }

  public async deleteImageEntry(id: number): Promise<boolean> {
    const imagesIndex = await this.readImagesIndexFile();
    const items = [...(imagesIndex.items ?? [])];
    const filteredItems = items.filter((item) => item.id !== id);

    if (filteredItems.length === items.length) {
      return false;
    }

    await this.fileService.writeFile(
      {
        ...imagesIndex,
        items: filteredItems,
      },
      FilePath.getDataDir('images.json'),
    );

    return true;
  }

  public async deleteImageBySrc(src: string): Promise<{
    readonly deletedFile: boolean;
    readonly removedEntries: number;
  }> {
    const parsed = parseImageSrc(src);
    if (!parsed) {
      throw new Error('Invalid image src');
    }

    const imagePath = path.join(
      FilePath.getImageDirAbsolute(),
      parsed.folder,
      parsed.fileName,
    );

    let deletedFile = false;

    try {
      await unlink(imagePath);
      deletedFile = true;
    } catch (error) {
      if (
        !(error instanceof Error) ||
        !('code' in error) ||
        error.code !== 'ENOENT'
      ) {
        throw error;
      }
    }

    const imagesIndex = await this.readImagesIndexFile();
    const items = imagesIndex.items ?? [];
    const srcLower = src.toLowerCase();
    const fileNameLower = parsed.fileName.toLowerCase();
    const folderLower = normalizeFolder(parsed.folder).toLowerCase();

    const filteredItems = items.filter((item) => {
      if (typeof item.src === 'string' && item.src.toLowerCase() === srcLower) {
        return false;
      }

      if (typeof item.fileName === 'string') {
        const itemFileNameLower = item.fileName.toLowerCase();
        const itemFolderLower = normalizeFolder(
          item.folder ?? '',
        ).toLowerCase();

        if (
          itemFileNameLower === fileNameLower &&
          itemFolderLower === folderLower
        ) {
          return false;
        }
      }

      return true;
    });

    const removedEntries = items.length - filteredItems.length;

    if (removedEntries > 0) {
      await this.fileService.writeFile(
        {
          ...imagesIndex,
          items: filteredItems,
        },
        FilePath.getDataDir('images.json'),
      );
    }

    return {
      deletedFile,
      removedEntries,
    };
  }

  public async renameImageBySrc(params: {
    readonly src: string;
    readonly targetFileName: string;
    readonly targetFolderLabel: string;
  }): Promise<{ readonly src: string }> {
    const parsed = parseImageSrc(params.src);
    if (!parsed) {
      throw new Error('Invalid image src');
    }

    const targetFileName = params.targetFileName.trim();
    if (!targetFileName) {
      throw new Error('targetFileName is required');
    }

    const targetFileNameBase = path.parse(targetFileName).name.trim();
    if (targetFileNameBase.length < 3) {
      throw new Error('File name must be at least 3 characters');
    }

    const sourceExtension = path.extname(parsed.fileName).toLowerCase();
    const targetExtension = path.extname(targetFileName).toLowerCase();
    if (sourceExtension !== targetExtension) {
      throw new Error('File extension cannot be changed');
    }

    const targetFolderName = await this.resolve2025FolderNameByLabel(
      params.targetFolderLabel,
    );

    if (!targetFolderName) {
      throw new Error('Target folder not found');
    }

    const targetFolder = normalizeFolder(path.join('2025', targetFolderName));
    const sourceRelativePath = normalizeFolder(
      path.join(parsed.folder, parsed.fileName),
    );
    const targetRelativePath = normalizeFolder(
      path.join(targetFolder, targetFileName),
    );

    const sourceAbsolutePath = path.join(
      FilePath.getImageDirAbsolute(),
      sourceRelativePath,
    );
    const targetAbsolutePath = path.join(
      FilePath.getImageDirAbsolute(),
      targetRelativePath,
    );

    const isSamePath =
      sourceAbsolutePath.toLowerCase() === targetAbsolutePath.toLowerCase();

    if (!isSamePath) {
      try {
        await access(targetAbsolutePath, fsConstants.F_OK);
        throw new Error('File name already exists');
      } catch (error) {
        if (
          !(error instanceof Error) ||
          error.message === 'File name already exists'
        ) {
          throw error;
        }
      }

      const targetFolderAbsolute = path.dirname(targetAbsolutePath);
      await mkdir(targetFolderAbsolute, { recursive: true });
      await rename(sourceAbsolutePath, targetAbsolutePath);
    }

    const updatedSrc = toImageSrc(targetFolder, targetFileName);
    const sourceFolderLower = normalizeFolder(parsed.folder).toLowerCase();
    const sourceFileNameLower = parsed.fileName.toLowerCase();
    const sourceSrcLower = params.src.toLowerCase();
    const targetFolderLower = targetFolder.toLowerCase();
    const targetFileNameLower = targetFileName.toLowerCase();

    const imagesIndex = await this.readImagesIndexFile();
    const items = imagesIndex.items ?? [];

    const hasExistingTargetEntry = items.some((item) => {
      if (typeof item.fileName !== 'string') {
        return false;
      }

      const itemFolderLower = normalizeFolder(item.folder ?? '').toLowerCase();
      const itemFileNameLower = item.fileName.toLowerCase();
      const itemSrcLower =
        typeof item.src === 'string' ? item.src.toLowerCase() : undefined;
      const isSourceEntry =
        itemSrcLower === sourceSrcLower ||
        (itemFileNameLower === sourceFileNameLower &&
          itemFolderLower === sourceFolderLower);

      if (isSourceEntry) {
        return false;
      }

      return (
        itemFileNameLower === targetFileNameLower &&
        itemFolderLower === targetFolderLower
      );
    });

    if (hasExistingTargetEntry) {
      throw new Error('File name already exists');
    }

    const updatedItems = items.map((item) => {
      const matchesBySrc =
        typeof item.src === 'string' &&
        item.src.toLowerCase() === sourceSrcLower;
      const matchesByFileAndFolder =
        typeof item.fileName === 'string' &&
        item.fileName.toLowerCase() === sourceFileNameLower &&
        normalizeFolder(item.folder ?? '').toLowerCase() === sourceFolderLower;

      if (!matchesBySrc && !matchesByFileAndFolder) {
        return item;
      }

      return {
        ...item,
        fileName: targetFileName,
        folder: targetFolder,
        src: updatedSrc,
      };
    });

    await this.fileService.writeFile(
      {
        ...imagesIndex,
        items: updatedItems,
      },
      FilePath.getDataDir('images.json'),
    );

    return { src: updatedSrc };
  }

  private getDirectoryImages(): ImageFile[] {
    return (this.imagesFileService.getItemsFromBaseDirectory() ?? [])
      .filter((file) => !isSiteFolder(file.folder))
      .filter((file) =>
        IMAGE_EXTENSIONS.has(path.extname(file.fileName).toLowerCase()),
      );
  }

  private async getIndexedImageKeys(): Promise<Set<string>> {
    const imageIndex = await this.fileService.readFile<ImagesIndexFile>(
      FilePath.getDataDir('images.json'),
    );

    const keys = (imageIndex.items ?? []).flatMap((item) => {
      if (item.fileName) {
        return [buildImageKey(item.folder ?? '', item.fileName)];
      }

      if (item.src) {
        const keyFromSrc = imageKeyFromSrc(item.src);
        return keyFromSrc ? [keyFromSrc] : [];
      }

      return [];
    });

    return new Set(keys);
  }

  private mapFilesToImages(files: readonly ImageFile[]): Image[] {
    return files.map((file, index) => {
      const folder = normalizeFolder(file.folder);
      const src = toImageSrc(folder, file.fileName);
      const title = toTitle(file.fileName);

      return {
        alt: title,
        id: index + 1,
        src,
        title,
      };
    });
  }

  private async resolve2025FolderNameByLabel(
    folderLabel: string,
  ): Promise<string | undefined> {
    const year2025Dir = path.join(FilePath.getImageDirAbsolute(), '2025');
    const dirEntries = await readdir(year2025Dir, { withFileTypes: true });

    return dirEntries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .find(
        (folderName) =>
          toCapitalizedFolderName(folderName).toLowerCase() ===
          folderLabel.toLowerCase(),
      );
  }

  private async readImagesIndexFile(): Promise<ImagesIndexFile> {
    return this.fileService.readFile<ImagesIndexFile>(
      FilePath.getDataDir('images.json'),
    );
  }
}
