import { getItems } from '../../features/menu/getItems.js';

import { createSimpleRouter } from './createSimpleRouter.js';

export const routeConfig = { path: '/api/menus', mutations: true } as const;

export const menuRouter = createSimpleRouter({
  getItemsHandler: getItems,
  routerName: 'menu',
});
