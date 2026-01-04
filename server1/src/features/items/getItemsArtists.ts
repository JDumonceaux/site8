import type { Items } from '../../types/Items.js';

import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getItemsService } from '../../utils/ServiceFactory.js';

export const getItemsArtists = createGetHandler<Items>({
  errorResponse: { artists: [], items: [], metadata: { title: 'Items' } },
  getData: async () => {
    const data = await getItemsService().getAllItems();
    return data ?? { artists: [], items: [], metadata: { title: 'Items' } };
  },
  getItemCount: (data) => data.items.length,
  handlerName: 'Items:getItemsArtists',
  return204OnEmpty: true,
});
