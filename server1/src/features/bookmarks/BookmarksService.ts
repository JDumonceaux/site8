import type { Bookmark } from '../../types/Bookmark.js';
import type { Bookmarks } from '../../types/Bookmarks.js';
import type { BookmarksTag } from '../../types/BookmarksTag.js';
import type { BookmarksTags } from '../../types/BookmarksTags.js';

import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';
import FilePath from '../../lib/filesystem/FilePath.js';

export class BookmarksService extends BaseDataService<Bookmarks> {
  public constructor() {
    super({
      filePath: FilePath.getDataDir('bookmarks.json'),
    });
  }

  public async getAllItems(): Promise<Bookmarks | undefined> {
    Logger.info(`BookmarkService: getAllItems called`);

    try {
      const data = await this.readFile();
      const sortedItems: Bookmark[] = data.items.toSorted((a, b) =>
        a.name.localeCompare(b.name),
      );
      return { items: sortedItems, metadata: data.metadata };
    } catch (error) {
      Logger.error(`BookmarkService: getAllItems --> Error: ${String(error)}`);
      return undefined;
    }
  }

  public async getAllItemsByTag(): Promise<BookmarksTags | undefined> {
    Logger.info(`BookmarkService: getAllItemsByTag called`);

    try {
      const data = await this.readFile();

      // Clean up and normalize tags in bookmarks
      const normalizedItems = this.cleanUpAndNormalizeTags(data.items);
      if (!normalizedItems) {
        throw new Error('Failed to normalize tags');
      }

      // Get unique tags from normalized items
      const uniqueTags = this.getUniqueTags(normalizedItems);
      if (!uniqueTags) {
        throw new Error('Failed to retrieve unique tags');
      }

      // Remap bookmarks using the normalized items
      const remappedBookmarks = this.remapBookmarks(
        normalizedItems,
        uniqueTags,
      );
      return { items: remappedBookmarks ?? [], metadata: data.metadata };
    } catch (error) {
      Logger.error(
        `BookmarkService: getAllItemsByTag --> Error: ${String(error)}`,
      );
      return undefined;
    }
  }

  public async getBookmarksForPage(
    pageId: string,
  ): Promise<Bookmarks | undefined> {
    Logger.info(`BookmarkService: getBookmarksForPage called`);

    try {
      const data = await this.readFile();
      const searchId = parseInt(pageId, 10);
      const filteredItems = data.items.filter((x) =>
        x.page?.includes(searchId),
      );
      const sortedItems: Bookmark[] = filteredItems.toSorted((a, b) =>
        a.name.localeCompare(b.name),
      );
      return { items: sortedItems, metadata: data.metadata };
    } catch (error) {
      Logger.error(
        `BookmarkService: getBookmarksForPage --> Error: ${String(error)}`,
      );
      return undefined;
    }
  }

  // Private helper to clean up and normalize tags in bookmarks
  private cleanUpAndNormalizeTags(
    items: Bookmark[] | undefined,
  ): Bookmark[] | undefined {
    if (!items) {
      return undefined;
    }
    try {
      return items.map((bookmark) => {
        // Filter out empty or falsy tags
        const nonEmptyTags = bookmark.tags?.filter((tag) => Boolean(tag));
        // Default to 'General' if no valid tags remain
        return {
          ...bookmark,
          tags:
            nonEmptyTags && nonEmptyTags.length > 0
              ? nonEmptyTags
              : ['General'],
        };
      });
    } catch (error) {
      Logger.error(
        `BookmarkService: cleanUpAndNormalizeTags --> Error: ${String(error)}`,
      );
      return undefined;
    }
  }

  // Private helper to get unique tags from bookmarks
  private getUniqueTags(items: Bookmark[] | undefined): string[] | undefined {
    if (!items) {
      return undefined;
    }
    try {
      const uniqueTags = items.reduce<string[]>((acc: string[], item) => {
        if (item.tags) {
          const newTags = item.tags.filter((tag) => !acc.includes(tag));
          return [...acc, ...newTags];
        }
        return acc;
      }, []);
      Object.freeze(uniqueTags);
      return uniqueTags.toSorted();
    } catch (error) {
      Logger.error(
        `BookmarkService: getUniqueTags --> Error: ${String(error)}`,
      );
      return undefined;
    }
  }

  // Private helper to remap bookmarks by tag
  private remapBookmarks(
    items: Bookmark[] | undefined,
    tags: string[] | undefined,
  ): BookmarksTag[] | undefined {
    if (!items || !tags) {
      return undefined;
    }
    try {
      return tags.map((tag) => {
        const filteredItems = items.filter((bookmark) =>
          bookmark.tags?.includes(tag),
        );
        const sortedItems = filteredItems.toSorted((a, b) =>
          a.name.localeCompare(b.name),
        );
        return {
          items: sortedItems,
          tag,
        };
      });
    } catch (error) {
      Logger.error(
        `BookmarkService: remapBookmarks --> Error: ${String(error)}`,
      );
      return undefined;
    }
  }
}
