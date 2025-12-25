import type { MenuItem } from '../../types/MenuItem.js';

import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { getMenuService } from '../../utils/ServiceFactory.js';

/** Wrapper to adapt getMenu to getItems interface */
const menuServiceAdapter = () => ({
  getItems: async () => getMenuService().getMenu(),
});

export const getItems = createCollectionHandler<MenuItem>({
  defaultTitle: 'Menu',
  getService: menuServiceAdapter,
  handlerName: 'Menu:getItems',
  return204OnEmpty: true,
});
