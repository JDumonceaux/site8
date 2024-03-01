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

  public async getFilteredItems(id: string): Promise<Bookmarks | undefined> {
    Logger.info(`BookmarkService: getFilteredItems -> `);

    try {
      const fileData = await readFile(this.filePath, { encoding: 'utf8' });
      const data = JSON.parse(fileData) as Bookmarks;
      const searchId = parseInt(id);
      const items = data.items.filter((x) => x.set?.includes(searchId));
      const sortedItmes: Bookmark[] = items.toSorted((a, b) =>
        a.name.localeCompare(b.name),
      );

      return { metadata: data.metadata, items: sortedItmes };
    } catch (error) {
      Logger.error(`BookmarkService: getFilteredItems --> Error: ${error}`);
      return undefined;
    }
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
      return undefined;
    }
  }

  public async getAllItemsByTag(): Promise<BookmarksTags | undefined> {
    Logger.info(`BookmarkService: getAllItemsByTag -> `);

    try {
      const fileData = await readFile(this.filePath, { encoding: 'utf8' });
      const data = JSON.parse(fileData) as Bookmarks;
      const tags = data.items.flatMap((x) => x.tags);

      const ret: BookmarksTags = {
        metadata: data.metadata,
        items: [],
      };

      const x: BookmarksTag[] = tags.map((x) => {
        const items = data.items.filter((y) =>
          y.tags && x ? y.tags.includes(x) : [],
        );

        const sortedItmes: Bookmark[] = items.toSorted((a, b) =>
          a.name.localeCompare(b.name),
        );

        return {
          tag: x ?? '',
          items: sortedItmes,
        };
      });

      const sortedTags = x.toSorted((a, b) => a.tag.localeCompare(b.tag));

      return { ...ret, items: sortedTags };
    } catch (error) {
      Logger.error(`BookmarkService: getAllItemsByTag --> Error: ${error}`);
      return undefined;
    }
  }
}
