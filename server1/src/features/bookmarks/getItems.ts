import type { Bookmarks } from '../../types/Bookmarks.js';

import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getBookmarksService } from '../../utils/ServiceFactory.js';

/**
 * Retrieves all bookmarks
 */
export const getItems = createGetHandler<Bookmarks>({
  errorResponse: {
    items: [],
    metadata: { title: 'Bookmarks' },
  },
  getData: async () => {
    const service = getBookmarksService();
    const result = await service.getAllItems();
    return result ?? { items: [], metadata: { title: 'Bookmarks' } };
  },
  getItemCount: (data) => data.items.length,
  handlerName: 'getItems',
  return204OnEmpty: true,
});
