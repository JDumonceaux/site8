import { getItems } from '../../feature/menu/getItems.js';

import { createSimpleRouter } from './createSimpleRouter.js';

export const routeConfig = { path: '/api/menus' } as const;

export const menuRouter = createSimpleRouter({
  getItemsHandler: getItems,
  routerName: 'menu',
});
