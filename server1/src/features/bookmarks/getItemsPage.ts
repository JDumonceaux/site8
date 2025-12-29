import type { Bookmarks } from '@site8/shared';

import { createGetHandlerWithParams } from '../../lib/http/genericHandlers.js';
import { getBookmarksService } from '../../utils/ServiceFactory.js';

export const getItemsPage = createGetHandlerWithParams<Bookmarks>({
  errorResponse: { items: [], metadata: { title: 'Bookmarks' } },
  getData: async (req) => {
    const { id } = req.params;
    const service = getBookmarksService();
    const result = await service.getBookmarksForPage(id ?? '');
    return result ?? { items: [], metadata: { title: 'Bookmarks' } };
  },
  getItemCount: (data) =>
    Array.isArray(data) ? data.length : (data.items?.length ?? 0),
  handlerName: 'Bookmarks:getItemsPage',
  return204OnEmpty: true,
  validateParams: (req) => {
    const { id } = req.params;
    if (!id) {
      return { errorMessage: 'Missing page id parameter', isValid: false };
    }
    return { isValid: true };
  },
});
