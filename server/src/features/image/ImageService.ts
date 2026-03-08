import { constants as fsConstants } from 'node:fs';
import { access, mkdir, readdir, rename, unlink } from 'node:fs/promises';
import path from 'path';

import FilePath from '../../lib/filesystem/FilePath.js';
import { CURRENT_YEAR } from '../../utils/constants.js';
import { getFileService } from '../../utils/ServiceFactory.js';
import {
  normalizeFolder,
  parseImageSrc,
  toCapitalizedFolderName,
  toImageSrc,
} from '../images/imageUtils.js';

// ---------------------------------------------------------------------------
// Internal types
// ---------------------------------------------------------------------------

type ImagesIndexItem = {
  readonly description?: string;
  readonly fileName?: string;
  readonly folder?: string;
  readonly id?: number;
  readonly src?: string;
  readonly title?: string;
} & Record<string, unknown>;

type ImagesIndexFile = {
  readonly items?: readonly ImagesIndexItem[];
  readonly metadata?: Record<string, unknown>;
};

type ImagesJsonEntry = {
  readonly fileName: string;
  readonly folder: string;
  readonly id: number;
} & Record<string, unknown>;

// ---------------------------------------------------------------------------
// Public parameter / result types
// ---------------------------------------------------------------------------

export type UpdateImageParams = {
  readonly description?: string;
  readonly src: string;
  readonly targetFileName: string;
  readonly targetFolderLabel?: string;
  readonly title?: string;
};

export type UpdateImageResult = {
  readonly id: number;
  readonly src: string;
};

// ---------------------------------------------------------------------------
// ImageService
// ---------------------------------------------------------------------------

export class ImageService {
  private readonly fileService = getFileService();

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
      items.length > 0 ? Math.max(...items.map((item) => item.id ?? 0)) + 1 : 1;

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
      // eslint-disable-next-line security/detect-non-literal-fs-filename -- path is constructed from validated parsed src
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

  public async updateImage(
    params: UpdateImageParams,
  ): Promise<UpdateImageResult> {
    // 1. Parse src into fileName + folder, match record on these two attributes
    const imagesIndex = await this.readIndex();
    const items = imagesIndex.items ?? [];

    const parsed = parseImageSrc(params.src);
    const currentFileName = parsed?.fileName;
    const currentFolder = parsed ? normalizeFolder(parsed.folder) : '';

    if (!currentFileName) {
      throw new Error(`Invalid src: ${params.src}`);
    }

    const sourceItem = items.find(
      (item) =>
        item.fileName?.toLowerCase() === currentFileName.toLowerCase() &&
        normalizeFolder(item.folder ?? '').toLowerCase() ===
          currentFolder.toLowerCase(),
    );

    // 2. If no match, add a new record (upsert)
    let recordId: number;
    if (!sourceItem) {
      const newId =
        items.length > 0
          ? Math.max(...items.map((item) => item.id ?? 0)) + 1
          : 1;
      recordId = newId;
    } else {
      if (typeof sourceItem.id !== 'number') {
        throw new Error('Image record is missing an id');
      }
      recordId = sourceItem.id;
    }

    const resolvedCurrentFileName = sourceItem?.fileName ?? currentFileName;
    const resolvedCurrentFolder = sourceItem?.folder ?? currentFolder;

    if (
      typeof resolvedCurrentFileName !== 'string' ||
      !resolvedCurrentFileName
    ) {
      throw new Error('Image record is missing a fileName');
    }

    // 3. Validate target file name
    const targetFileName = params.targetFileName.trim();
    if (!targetFileName) {
      throw new Error('targetFileName is required');
    }

    const targetFileNameBase = path.parse(targetFileName).name.trim();
    if (targetFileNameBase.length < 3) {
      throw new Error('File name must be at least 3 characters');
    }

    const sourceExtension = path.extname(resolvedCurrentFileName).toLowerCase();
    const targetExtension = path.extname(targetFileName).toLowerCase();
    if (sourceExtension !== targetExtension) {
      throw new Error('File extension cannot be changed');
    }

    // 4. Resolve target folder (keep current folder if no new folder label given)
    let targetFolder: string;
    if (params.targetFolderLabel) {
      const targetFolderName = await this.resolveCurrentYearFolderName(
        params.targetFolderLabel,
      );
      if (!targetFolderName) {
        throw new Error('Target folder not found');
      }
      targetFolder = normalizeFolder(
        path.join(String(CURRENT_YEAR), targetFolderName),
      );
    } else {
      targetFolder = normalizeFolder(resolvedCurrentFolder);
    }

    // 5. Build absolute paths and move/rename the physical file if needed
    const sourceAbsolutePath = path.join(
      FilePath.getImageDirAbsolute(),
      normalizeFolder(
        path.join(resolvedCurrentFolder, resolvedCurrentFileName),
      ),
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
      // eslint-disable-next-line security/detect-non-literal-fs-filename -- path is constructed from validated rename params
      await mkdir(path.dirname(targetAbsolutePath), { recursive: true });
      // eslint-disable-next-line security/detect-non-literal-fs-filename -- paths are constructed from validated rename params
      await rename(sourceAbsolutePath, targetAbsolutePath);
    }

    // 6. Guard against a different index entry already occupying the target path
    const updatedSrc = toImageSrc(targetFolder, targetFileName);
    const targetFolderLower = targetFolder.toLowerCase();
    const targetFileNameLower = targetFileName.toLowerCase();

    const hasExistingTargetEntry = items.some((item) => {
      if (item.id === recordId) return false;
      if (typeof item.fileName !== 'string') return false;
      return (
        item.fileName.toLowerCase() === targetFileNameLower &&
        normalizeFolder(item.folder ?? '').toLowerCase() === targetFolderLower
      );
    });

    if (hasExistingTargetEntry) {
      throw new Error('File name already exists');
    }

    // 7. Persist updated index
    const hasDescriptionUpdate = params.description !== undefined;
    const trimmedDescription = params.description?.trim();
    const hasTitleUpdate = params.title !== undefined;
    const trimmedTitle = params.title?.trim();

    const isNewRecord = !items.some((item) => item.id === recordId);

    const buildUpdatedItem = (base: ImagesIndexItem): ImagesIndexItem => {
      const withoutSrc = { ...base };
      delete withoutSrc.src;

      let result: ImagesIndexItem = {
        ...withoutSrc,
        fileName: targetFileName,
        folder: targetFolder,
        id: recordId,
      };

      if (hasDescriptionUpdate) {
        if (trimmedDescription) {
          result = { ...result, description: trimmedDescription };
        } else {
          const withoutDescription = { ...result };
          delete withoutDescription.description;
          result = withoutDescription;
        }
      }

      if (hasTitleUpdate) {
        if (trimmedTitle) {
          result = { ...result, title: trimmedTitle };
        } else {
          const withoutTitle = { ...result };
          delete withoutTitle.title;
          result = withoutTitle;
        }
      }

      return result;
    };

    const baseForNew: ImagesIndexItem = {
      fileName: resolvedCurrentFileName,
      folder: resolvedCurrentFolder,
      id: recordId,
    };

    const updatedItems = isNewRecord
      ? [...items, buildUpdatedItem(sourceItem ?? baseForNew)]
      : items.map((item) =>
          item.id === recordId ? buildUpdatedItem(item) : item,
        );

    await this.writeIndex({ ...imagesIndex, items: updatedItems });

    return { id: recordId, src: updatedSrc };
  }

  // -------------------------------------------------------------------------
  // Private helpers
  // -------------------------------------------------------------------------

  private async readIndex(): Promise<ImagesIndexFile> {
    return this.fileService.readFile<ImagesIndexFile>(
      FilePath.getDataDir('images.json'),
    );
  }

  private async resolveCurrentYearFolderName(
    folderLabel: string,
  ): Promise<string | undefined> {
    const yearDir = path.join(
      FilePath.getImageDirAbsolute(),
      String(CURRENT_YEAR),
    );
    // eslint-disable-next-line security/detect-non-literal-fs-filename -- path is constructed from a known base directory constant
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

  private async writeIndex(data: ImagesIndexFile): Promise<void> {
    await this.fileService.writeFile(data, FilePath.getDataDir('images.json'));
  }
}
