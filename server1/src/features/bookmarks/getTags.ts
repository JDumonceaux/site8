import type { BookmarksTags } from '@site8/shared';

import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getBookmarksService } from '../../utils/ServiceFactory.js';

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
