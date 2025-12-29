import type { Item } from '@site8/shared';

import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { getItemsService } from '../../utils/ServiceFactory.js';

export const getItems = createCollectionHandler<Item>({
  defaultTitle: 'Items',
  getService: getItemsService,
  handlerName: 'Items:getItems',
  return204OnEmpty: true,
});
