import type { FileService } from '../../lib/filesystem/FileService.js';
import type { ImageFile as ImageFileEntry } from './Image.js';
import type { ImagesFileService } from './ImagesFileService.js';
import type { ImagesService } from './ImagesService.js';
import type { Collection, Image, ImageFile, ImageFiles } from '@site8/shared';

import { mkdir, readdir, rename } from 'node:fs/promises';
import path from 'path';

import FilePath from '../../lib/filesystem/FilePath.js';
import { CURRENT_YEAR } from '../../utils/constants.js';

import {
  isSiteFolder,
  parseImageSrc as parseImageSource,
  toCapitalizedFolderName,
  toImageSrc as toImageSource,
  toTitle,
} from './imageUtils.js';

type NewImageJsonEntry = {
  readonly fileName: string;
  readonly folder: string;
};

type ImagesIndexFile = {
  readonly items?: readonly Partial<Image>[];
  readonly metadata?: Record<string, unknown>;
};

type ImagesJsonEntry = {
  readonly fileName: string;
  readonly folder: string;
  readonly id: number;
} & Record<string, unknown>;

export class ImagesApiService {
  private readonly fileService: FileService;
  private readonly imagesFileService: ImagesFileService;
  private readonly imagesService: ImagesService;

  public constructor(
    fileService: FileService,
    imagesFileService: ImagesFileService,
    imagesService: ImagesService,
  ) {
    this.fileService = fileService;
    this.imagesFileService = imagesFileService;
    this.imagesService = imagesService;
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

  public async getAllItems(
    folder?: string,
    matchedFilter: 'all' | 'matchedOnly' | 'unmatchedOnly' = 'all',
  ): Promise<ImageFiles> {
    const files = this.expandImageFile(this.getDirectoryImages());
    const imageRecords = await this.readImageItems();
    const recordMap = this.buildImageRecordMap(imageRecords);

    const merged = files.map((file) =>
      this.mergeFileWithRecord(file, recordMap),
    );

    const folderFiltered = folder
      ? merged.filter(
          (item) =>
            toCapitalizedFolderName(
              item.folder.split('/').at(-1) ?? '',
            ).toLowerCase() === folder.toLowerCase(),
        )
      : merged;

    const matchedFiltered =
      matchedFilter === 'matchedOnly'
        ? folderFiltered.filter((item) => (item.id ?? 0) > 0)
        : matchedFilter === 'unmatchedOnly'
          ? folderFiltered.filter((item) => (item.id ?? 0) <= 0)
          : folderFiltered;

    return {
      items: matchedFiltered,
      metadata: {
        title: 'Images',
        totalItems: matchedFiltered.length,
      },
    };
  }

  public async getFolderNames(): Promise<Collection<string>> {
    const yearDir = path.join(
      FilePath.getImageDirAbsolute(),
      String(CURRENT_YEAR),
    );

    // eslint-disable-next-line security/detect-non-literal-fs-filename -- Path built from validated constant
    const dirEntries = await readdir(yearDir, { withFileTypes: true });
    const folderNames = dirEntries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .toSorted((first, second) => first.localeCompare(second));

    const items = folderNames.map(toCapitalizedFolderName);

    return {
      items,
      metadata: {
        title: `Image Folders ${String(CURRENT_YEAR)}`,
        totalItems: items.length,
      },
    };
  }

  public getItems(): ImageFiles {
    const items = this.expandImageFile(this.getDirectoryImages());
    return {
      items,
      metadata: {
        title: 'Image Files',
        totalItems: items.length,
      },
    };
  }

  public async getMatchedItems(): Promise<ImageFiles> {
    const files = this.expandImageFile(this.getDirectoryImages());
    const imageRecords = await this.readImageItems();
    const recordMap = this.buildImageRecordMap(imageRecords);

    // Returns unmatched items (id === 0, no corresponding JSON record)
    const unmatchedItems = files
      .map((file) => this.mergeFileWithRecord(file, recordMap))
      .filter((item) => item.id === 0);

    return {
      items: unmatchedItems,
      metadata: {
        title: 'Unmatched Images',
        totalItems: unmatchedItems.length,
      },
    };
  }

  public async moveImagesToFolder(
    imageSrcs: readonly string[],
    targetFolderLabel: string,
  ): Promise<number> {
    const yearDir = path.join(
      FilePath.getImageDirAbsolute(),
      String(CURRENT_YEAR),
    );
    const targetFolderName =
      await this.resolveFolderNameByLabel(targetFolderLabel);

    if (!targetFolderName) {
      throw new Error(
        `Target folder not found for label: ${targetFolderLabel}`,
      );
    }

    const destinationFolderAbsolute = path.join(yearDir, targetFolderName);
    // eslint-disable-next-line security/detect-non-literal-fs-filename -- Path built from validated constant
    await mkdir(destinationFolderAbsolute, { recursive: true });

    let movedCount = 0;

    for (const source of imageSrcs) {
      const parsed = parseImageSource(source);
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

      // eslint-disable-next-line security/detect-non-literal-fs-filename -- Paths validated via parseImageSrc
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

  private expandImageFile(items: ImageFile[]): ImageFile[] {
    return items.map((item, index) => ({
      ...item,
      seq: index,
      src: toImageSource(item.folder, item.fileName),
      title: toTitle(item.fileName),
    }));
  }

  private getDirectoryImages(): ImageFileEntry[] {
    return (this.imagesFileService.getItemsFromBaseDirectory() ?? [])
      .filter((file) => !isSiteFolder(file.folder))
      .filter((file) => path.extname(file.fileName).toLowerCase() !== '.heic');
  }

  private async readImageItems(): Promise<Image[]> {
    const data = await this.imagesService.getItems();
    return data.items ?? [];
  }

  private async readImagesIndexFile(): Promise<ImagesIndexFile> {
    return this.fileService.readFile<ImagesIndexFile>(
      FilePath.getDataDir('images.json'),
    );
  }

  private async resolveFolderNameByLabel(
    folderLabel: string,
  ): Promise<string | undefined> {
    const yearDir = path.join(
      FilePath.getImageDirAbsolute(),
      String(CURRENT_YEAR),
    );
    // eslint-disable-next-line security/detect-non-literal-fs-filename -- Path built from validated constant
    const dirEntries = await readdir(yearDir, { withFileTypes: true });

    return dirEntries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .find(
        (folderName) =>
          toCapitalizedFolderName(folderName).toLowerCase() ===
          folderLabel.toLowerCase(),
      );
  }

  /** Builds a keyed map for O(1) record lookup instead of O(n) linear scan per file. */
  private buildImageRecordMap(
    imageRecords: Image[],
  ): Map<string, Image | 'duplicate'> {
    const map = new Map<string, Image | 'duplicate'>();
    for (const img of imageRecords) {
      const key = `${img.folder.toLowerCase()}/${img.fileName.toLowerCase()}`;
      map.set(key, map.has(key) ? 'duplicate' : img);
    }
    return map;
  }

  private mergeFileWithRecord(
    file: ImageFile,
    recordMap: Map<string, Image | 'duplicate'>,
  ): ImageFile {
    const key = `${file.folder.toLowerCase()}/${file.fileName.toLowerCase()}`;
    const record = recordMap.get(key);

    if (record === undefined) {
      return { ...file, id: 0 };
    }

    if (record === 'duplicate') {
      return { ...file, id: -1 };
    }

    return {
      ...file,
      ...(record.description ? { description: record.description } : {}),
      id: record.id,
      title: record.title ?? file.title,
    };
  }
}
