import type { Pages } from '../../types/Pages.js';

import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getPagesService } from '../../utils/ServiceFactory.js';

export const getItems = createGetHandler<Pages>({
  errorResponse: { items: [], metadata: { title: 'Pages' } },
  getData: async () => {
    const data = await getPagesService().getItems();
    return data ?? { items: [], metadata: { title: 'Pages' } };
  },
  getItemCount: (data) => data.items.length,
  handlerName: 'Pages:getItems',
  return204OnEmpty: false,
});
