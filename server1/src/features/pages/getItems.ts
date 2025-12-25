import type { PageMenu } from '../../types/PageMenu.js';

import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { getPagesService } from '../../utils/ServiceFactory.js';

export const getItems = createCollectionHandler<PageMenu>({
  defaultTitle: 'Pages',
  getService: getPagesService,
  handlerName: 'Pages:getItems',
  return204OnEmpty: false,
});
