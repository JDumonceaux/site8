import type { Item } from '../../types/Item.js';

import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { getItemsService } from '../../utils/ServiceFactory.js';

export const getItems = createCollectionHandler<Item>({
  defaultTitle: 'Items',
  getService: getItemsService,
  handlerName: 'Items:getItems',
  return204OnEmpty: true,
});
