import type { Bookmark } from '@site8/shared';

import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { getBookmarksService } from '../../utils/ServiceFactory.js';

/** Wrapper to adapt getAllItems to getItems interface */
const bookmarksServiceAdapter = () => ({
  getItems: async () => getBookmarksService().getAllItems(),
});

export const getItems = createCollectionHandler<Bookmark>({
  defaultTitle: 'Bookmarks',
  getService: bookmarksServiceAdapter,
  handlerName: 'Bookmarks:getItems',
  return204OnEmpty: true,
});
