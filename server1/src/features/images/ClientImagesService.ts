import type { Collection, Image } from '@site8/shared';
import type { ImageFile } from './Image.js';

import { readdir } from 'node:fs/promises';
import path from 'path';
import { mkdir, rename } from 'node:fs/promises';

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
  readonly description?: string;
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
    const imageIndexMap = await this.getIndexedImageMap();
    const items = this.mapFilesToImages(files, imageIndexMap);

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
    const imageIndexMap = await this.getIndexedImageMap();
    const indexedKeys = new Set(imageIndexMap.keys());

    const unmatchedFiles = files.filter(
      (file) => !indexedKeys.has(buildImageKey(file.folder, file.fileName)),
    );

    const items = this.mapFilesToImages(unmatchedFiles, imageIndexMap);

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

  private getDirectoryImages(): ImageFile[] {
    return (this.imagesFileService.getItemsFromBaseDirectory() ?? [])
      .filter((file) => !isSiteFolder(file.folder))
      .filter((file) =>
        IMAGE_EXTENSIONS.has(path.extname(file.fileName).toLowerCase()),
      );
  }

  private async getIndexedImageMap(): Promise<Map<string, ImagesIndexItem>> {
    const imageIndex = await this.fileService.readFile<ImagesIndexFile>(
      FilePath.getDataDir('images.json'),
    );

    const entries = (imageIndex.items ?? []).flatMap((item) => {
      if (item.fileName) {
        return [
          [buildImageKey(item.folder ?? '', item.fileName), item] as const,
        ];
      }

      if (item.src) {
        const keyFromSrc = imageKeyFromSrc(item.src);
        return keyFromSrc ? [[keyFromSrc, item] as const] : [];
      }

      return [];
    });

    return new Map(entries);
  }

  private mapFilesToImages(
    files: readonly ImageFile[],
    imageIndexMap: ReadonlyMap<string, ImagesIndexItem>,
  ): Image[] {
    return files.map((file, index) => {
      const folder = normalizeFolder(file.folder);
      const src = toImageSrc(folder, file.fileName);
      const title = toTitle(file.fileName);
      const imageIndexItem = imageIndexMap.get(
        buildImageKey(folder, file.fileName),
      );
      const description =
        typeof imageIndexItem?.description === 'string'
          ? imageIndexItem.description
          : undefined;
      const id =
        typeof imageIndexItem?.id === 'number' && imageIndexItem.id > 0
          ? imageIndexItem.id
          : index + 1;

      return {
        alt: title,
        ...(description ? { description } : {}),
        id,
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
