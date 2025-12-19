import type { Items } from '../../types/Items.js';

import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getItemsService } from '../../utils/ServiceFactory.js';

export const getItems = createGetHandler<Items>({
  errorResponse: { items: [], metadata: { title: 'Items' } },
  getData: async () => {
    const data = await getItemsService().getItems();
    return data ?? { items: [], metadata: { title: 'Items' } };
  },
  getItemCount: (data) => data.items?.length ?? 0,
  handlerName: 'Items:getItems',
  return204OnEmpty: true,
});
