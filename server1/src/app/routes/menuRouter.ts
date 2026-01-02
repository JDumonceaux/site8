import { getItems } from '../../features/menu/getItems.js';

import { createSimpleRouter } from './createSimpleRouter.js';

export const menuRouter = createSimpleRouter({
  getItemsHandler: getItems,
  routerName: 'menu',
});
