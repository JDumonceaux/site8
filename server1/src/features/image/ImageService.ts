import { readdir } from 'node:fs/promises';
import { access, mkdir, rename, unlink } from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import path from 'path';

import FilePath from '../../lib/filesystem/FilePath.js';
import { FileService } from '../../lib/filesystem/FileService.js';

// ---------------------------------------------------------------------------
// Internal types
// ---------------------------------------------------------------------------

type ImagesIndexItem = {
  readonly description?: string;
  readonly id?: number;
  readonly fileName?: string;
  readonly folder?: string;
  readonly src?: string;
} & Record<string, unknown>;

type ImagesIndexFile = {
  readonly metadata?: Record<string, unknown>;
  readonly items?: readonly ImagesIndexItem[];
};

type ImagesJsonEntry = {
  readonly id: number;
  readonly fileName: string;
  readonly folder: string;
} & Record<string, unknown>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const normalizeFolder = (folder: string): string =>
  folder.replace(/\\/g, '/').replace(/^\.?\//, '');

const toImageSrc = (folder: string, fileName: string): string => {
  const normalizedFolder = normalizeFolder(folder);
  if (!normalizedFolder || normalizedFolder === '.') {
    return `/images/${fileName}`;
  }
  return `/images/${normalizedFolder}/${fileName}`;
};

const parseImageSrc = (
  src: string,
): { readonly fileName: string; readonly folder: string } | null => {
  if (!src.startsWith('/images/')) {
    return null;
  }
  const segments = src.replace(/^\/images\//, '').split('/').filter(Boolean);
  const fileName = segments.at(-1);
  if (!fileName) {
    return null;
  }
  return { fileName, folder: segments.slice(0, -1).join('/') };
};

const toCapitalizedFolderName = (folderName: string): string =>
  folderName
    .replace(/[-_]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');

// ---------------------------------------------------------------------------
// Public parameter / result types
// ---------------------------------------------------------------------------

export type UpdateImageParams = {
  readonly description?: string;
  readonly src: string;
  readonly targetFileName: string;
  readonly targetFolderLabel?: string;
};

export type UpdateImageResult = {
  readonly src: string;
};

// ---------------------------------------------------------------------------
// ImageService
// ---------------------------------------------------------------------------

export class ImageService {
  private readonly fileService = new FileService();

  // -------------------------------------------------------------------------
  // addItem
  // -------------------------------------------------------------------------

  public async addItem(
    entry: { readonly fileName: string; readonly folder: string } & Record<
      string,
      unknown
    >,
  ): Promise<{ readonly id: number }> {
    const imagesIndex = await this.readIndex();
    const items = [...(imagesIndex.items ?? [])];

    const newId =
      items.length > 0
        ? Math.max(
            ...items.map((item) => (item.id as number | undefined) ?? 0),
          ) + 1
        : 1;

    const newEntry: ImagesJsonEntry = { ...entry, id: newId };

    await this.writeIndex({ ...imagesIndex, items: [...items, newEntry] });

    return { id: newId };
  }

  // -------------------------------------------------------------------------
  // deleteItem
  // -------------------------------------------------------------------------

  public async deleteItem(src: string): Promise<{
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
        (error as NodeJS.ErrnoException).code !== 'ENOENT'
      ) {
        throw error;
      }
    }

    const imagesIndex = await this.readIndex();
    const items = imagesIndex.items ?? [];
    const srcLower = src.toLowerCase();
    const fileNameLower = parsed.fileName.toLowerCase();
    const folderLower = normalizeFolder(parsed.folder).toLowerCase();

    const filteredItems = items.filter((item) => {
      if (typeof item.src === 'string' && item.src.toLowerCase() === srcLower) {
        return false;
      }
      if (
        typeof item.fileName === 'string' &&
        item.fileName.toLowerCase() === fileNameLower &&
        normalizeFolder(item.folder ?? '').toLowerCase() === folderLower
      ) {
        return false;
      }
      return true;
    });

    const removedEntries = items.length - filteredItems.length;
    if (removedEntries > 0) {
      await this.writeIndex({ ...imagesIndex, items: filteredItems });
    }

    return { deletedFile, removedEntries };
  }

  // -------------------------------------------------------------------------
  // updateImage
  // -------------------------------------------------------------------------

  public async updateImage(params: UpdateImageParams): Promise<UpdateImageResult> {
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

    let targetFolder: string;
    if (params.targetFolderLabel) {
      const targetFolderName = await this.resolve2025FolderName(
        params.targetFolderLabel,
      );
      if (!targetFolderName) {
        throw new Error('Target folder not found');
      }
      targetFolder = normalizeFolder(path.join('2025', targetFolderName));
    } else {
      targetFolder = normalizeFolder(parsed.folder);
    }

    const sourceAbsolutePath = path.join(
      FilePath.getImageDirAbsolute(),
      normalizeFolder(path.join(parsed.folder, parsed.fileName)),
    );
    const targetAbsolutePath = path.join(
      FilePath.getImageDirAbsolute(),
      normalizeFolder(path.join(targetFolder, targetFileName)),
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
      await mkdir(path.dirname(targetAbsolutePath), { recursive: true });
      await rename(sourceAbsolutePath, targetAbsolutePath);
    }

    const updatedSrc = toImageSrc(targetFolder, targetFileName);
    const sourceFolderLower = normalizeFolder(parsed.folder).toLowerCase();
    const sourceFileNameLower = parsed.fileName.toLowerCase();
    const sourceSrcLower = params.src.toLowerCase();
    const targetFolderLower = targetFolder.toLowerCase();
    const targetFileNameLower = targetFileName.toLowerCase();
    const hasDescriptionUpdate = params.description !== undefined;
    const trimmedDescription = params.description?.trim();

    const imagesIndex = await this.readIndex();
    const items = imagesIndex.items ?? [];

    const hasExistingTargetEntry = items.some((item) => {
      if (typeof item.fileName !== 'string') return false;
      const itemFolderLower = normalizeFolder(item.folder ?? '').toLowerCase();
      const itemFileNameLower = item.fileName.toLowerCase();
      const itemSrcLower =
        typeof item.src === 'string' ? item.src.toLowerCase() : undefined;
      const isSourceEntry =
        itemSrcLower === sourceSrcLower ||
        (itemFileNameLower === sourceFileNameLower &&
          itemFolderLower === sourceFolderLower);
      if (isSourceEntry) return false;
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

      if (!matchesBySrc && !matchesByFileAndFolder) return item;

      const updatedItem: ImagesIndexItem = {
        ...item,
        fileName: targetFileName,
        folder: targetFolder,
        src: updatedSrc,
      };

      if (!hasDescriptionUpdate) return updatedItem;

      if (trimmedDescription) {
        return { ...updatedItem, description: trimmedDescription };
      }

      const itemWithoutDescription = { ...updatedItem };
      delete itemWithoutDescription.description;
      return itemWithoutDescription;
    });

    await this.writeIndex({ ...imagesIndex, items: updatedItems });

    return { src: updatedSrc };
  }

  // -------------------------------------------------------------------------
  // Private helpers
  // -------------------------------------------------------------------------

  private async resolve2025FolderName(
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

  private async readIndex(): Promise<ImagesIndexFile> {
    return this.fileService.readFile<ImagesIndexFile>(
      FilePath.getDataDir('images.json'),
    );
  }

  private async writeIndex(data: ImagesIndexFile): Promise<void> {
    await this.fileService.writeFile(data, FilePath.getDataDir('images.json'));
  }
}
