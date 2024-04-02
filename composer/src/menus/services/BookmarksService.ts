import { Logger } from '../utils/Logger.js';
import { getFilePath } from '../utils/getFilePath.js';
import { readFile } from 'fs/promises';
import { Bookmarks } from 'types/Bookmarks.js';
import { Bookmark } from 'types/Bookmark.js';
import { BookmarksTags } from 'types/BookmarksTags.js';
import { BookmarksTag } from 'types/BookmarksTag.js';

export class BookmarksService {
  private fileName = 'bookmarks.json';
  private filePath = '';

  constructor() {
    this.filePath = getFilePath(this.fileName);
  }

  public async getAllItems(): Promise<Bookmarks | undefined> {
    Logger.info(`BookmarkService: getFilteredBookmarks -> `);

    try {
      const fileData = await readFile(this.filePath, { encoding: 'utf8' });
      const data = JSON.parse(fileData) as Bookmarks;
      const sortedItmes: Bookmark[] = data.items.toSorted((a, b) =>
        a.name.localeCompare(b.name),
      );
      return { metadata: data.metadata, items: sortedItmes };
    } catch (error) {
      Logger.error(`BookmarkService: getAllItems --> Error: ${error}`);
    }
    return undefined;
  }

  public async getAllItemsByTag(): Promise<BookmarksTags | undefined> {
    Logger.info(`BookmarkService: getAllItemsByTag -> `);

    try {
      const fileData = await readFile(this.filePath, { encoding: 'utf8' });
      const data = Object.freeze(JSON.parse(fileData) as Bookmarks);
      // Clean up and normalize tags
      const fixedTags = this.CleanUpAndNormalizeTags(data.items);
      // Get unique tags
      const uniqueTags = this.GetUniqueTags(fixedTags);
      // Remap bookmarks
      const remappedBookmarks = this.RemapBookmarks(data.items, uniqueTags);
      return { metadata: data.metadata, items: remappedBookmarks };
    } catch (error) {
      Logger.error(`BookmarkService: getAllItemsByTag --> Error: ${error}`);
    }
    return undefined;
  }

  public async getBookmarksForPage(
    pageId: string,
  ): Promise<Bookmarks | undefined> {
    Logger.info(`BookmarkService: getBookmarksForPage -> `);

    try {
      const fileData = await readFile(this.filePath, { encoding: 'utf8' });
      const data = JSON.parse(fileData) as Bookmarks;
      const searchId = parseInt(pageId);
      const items = data.items.filter((x) => x.page?.includes(searchId));
      const sortedItmes: Bookmark[] = items.toSorted((a, b) =>
        a.name.localeCompare(b.name),
      );

      return { metadata: data.metadata, items: sortedItmes };
    } catch (error) {
      Logger.error(`BookmarkService: getBookmarksForPage --> Error: ${error}`);
    }
    return undefined;
  }

  private GetUniqueTags(items: Bookmark[] | undefined): string[] | undefined {
    try {
      if (!items) {
        return undefined;
      }

      const uniqueArr = items.reduce((arr, item) => {
        if (item?.tags) {
          item.tags.forEach((tag) => {
            if (!arr.includes(tag)) {
              arr.push(tag);
            }
          });
        }
        return arr;
      }, [] as string[]);

      Object.freeze(uniqueArr);
      return uniqueArr.toSorted();
    } catch (error) {
      Logger.error(`BookmarkService: GetUniqueTags --> Error: ${error}`);
    }
    return undefined;
  }

  private CleanUpAndNormalizeTags(
    items: Bookmark[] | undefined,
  ): Bookmark[] | undefined {
    try {
      if (!items) {
        return undefined;
      }

      const tagsWithDefault = items.map((x) => {
        // Remove empty tags
        const nonEmptyTags = x.tags?.filter((x) => x);
        // Remove tag element if empty
        const tagsWithValues = nonEmptyTags?.length ? nonEmptyTags : undefined;
        // Return tag element or default to General
        return { ...x, tags: tagsWithValues ?? ['General'] };
      });
      return tagsWithDefault;
    } catch (error) {
      Logger.error(
        `BookmarkService: CleanUpAndNormalizeTags --> Error: ${error}`,
      );
    }
    return undefined;
  }

  private RemapBookmarks(
    items: Bookmark[] | undefined,
    tags: string[] | undefined,
  ): BookmarksTag[] | undefined {
    try {
      if (!items || !tags) {
        return undefined;
      }

      const ret: BookmarksTag[] = tags.map((x) => {
        const filteredItems = items.filter((item) => item.tags?.includes(x));
        const sortedItems = filteredItems.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        return {
          tag: x,
          items: sortedItems,
        };
      });
      return ret;
    } catch (error) {
      Logger.error(`BookmarkService: RemapBookmarks --> Error: ${error}`);
    }
    return undefined;
  }
}
