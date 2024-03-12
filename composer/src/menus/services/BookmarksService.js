import { Logger } from '../utils/Logger.js';
import { getFilePath } from '../utils/getFilePath.js';
import { readFile } from 'fs/promises';
export class BookmarksService {
    fileName = 'bookmarks.json';
    filePath = '';
    constructor() {
        this.filePath = getFilePath(this.fileName);
    }
    async getAllItems() {
        Logger.info(`BookmarkService: getFilteredBookmarks -> `);
        try {
            const fileData = await readFile(this.filePath, { encoding: 'utf8' });
            const data = JSON.parse(fileData);
            const sortedItmes = data.items.toSorted((a, b) => a.name.localeCompare(b.name));
            return { metadata: data.metadata, items: sortedItmes };
        }
        catch (error) {
            Logger.error(`BookmarkService: getAllItems --> Error: ${error}`);
        }
        return undefined;
    }
    async getAllItemsByTag() {
        Logger.info(`BookmarkService: getAllItemsByTag -> `);
        try {
            const fileData = await readFile(this.filePath, { encoding: 'utf8' });
            const data = Object.freeze(JSON.parse(fileData));
            // Clean up and normalize tags
            const fixedTags = this.CleanUpAndNormalizeTags(data.items);
            // Get unique tags
            const uniqueTags = this.GetUniqueTags(fixedTags);
            // Remap bookmarks
            const remappedBookmarks = this.RemapBookmarks(data.items, uniqueTags);
            return { metadata: data.metadata, items: remappedBookmarks };
        }
        catch (error) {
            Logger.error(`BookmarkService: getAllItemsByTag --> Error: ${error}`);
        }
        return undefined;
    }
    async getBookmarksForPage(pageId) {
        Logger.info(`BookmarkService: getBookmarksForPage -> `);
        try {
            const fileData = await readFile(this.filePath, { encoding: 'utf8' });
            const data = JSON.parse(fileData);
            const searchId = parseInt(pageId);
            const items = data.items.filter((x) => x.page?.includes(searchId));
            const sortedItmes = items.toSorted((a, b) => a.name.localeCompare(b.name));
            return { metadata: data.metadata, items: sortedItmes };
        }
        catch (error) {
            Logger.error(`BookmarkService: getBookmarksForPage --> Error: ${error}`);
        }
        return undefined;
    }
    GetUniqueTags(items) {
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
            }, []);
            Object.freeze(uniqueArr);
            return uniqueArr.toSorted();
        }
        catch (error) {
            Logger.error(`BookmarkService: GetUniqueTags --> Error: ${error}`);
        }
        return undefined;
    }
    CleanUpAndNormalizeTags(items) {
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
        }
        catch (error) {
            Logger.error(`BookmarkService: CleanUpAndNormalizeTags --> Error: ${error}`);
        }
        return undefined;
    }
    RemapBookmarks(items, tags) {
        try {
            if (!items || !tags) {
                return undefined;
            }
            const ret = tags.map((x) => {
                const filteredItems = items.filter((item) => item.tags?.includes(x));
                const sortedItems = filteredItems.sort((a, b) => a.name.localeCompare(b.name));
                return {
                    tag: x,
                    items: sortedItems,
                };
            });
            return ret;
        }
        catch (error) {
            Logger.error(`BookmarkService: RemapBookmarks --> Error: ${error}`);
        }
        return undefined;
    }
}
