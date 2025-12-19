import type { Menus } from '../../types/Menus.js';

import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getMenuService } from '../../utils/ServiceFactory.js';

export const getItemsEdit = createGetHandler<Menus>({
  errorResponse: { items: [], metadata: { title: 'Menu' } },
  getData: async () => {
    const data = await getMenuService().getMenu();
    return data ?? { items: [], metadata: { title: 'Menu' } };
  },
  getItemCount: (data) => data.items?.length ?? 0,
  handlerName: 'Menu:getItemsEdit',
  return204OnEmpty: true,
});
