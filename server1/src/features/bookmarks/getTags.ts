import type { BookmarksTags } from '../../types/BookmarksTags.js';

import { createGetHandler } from '../../lib/utils/createGetHandler.js';
import { getBookmarksService } from '../../lib/utils/ServiceFactory.js';

/**
 * Retrieves all bookmarks organized by tags
 */
export const getTags = createGetHandler<BookmarksTags>({
  errorResponse: {
    metadata: { title: 'Bookmarks Tags' },
  },
  getData: async () => {
    const service = getBookmarksService();
    const result = await service.getAllItemsByTag();
    return result ?? { metadata: { title: 'Bookmarks Tags' } };
  },
  getItemCount: (data) => data.items?.length ?? 0,
  handlerName: 'getTags',
  return204OnEmpty: true,
});
