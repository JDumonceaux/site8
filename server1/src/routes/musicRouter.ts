import { getItems } from '../features/music/getItems.js';
import { createSimpleRouter } from './createSimpleRouter.js';

export const musicRouter = createSimpleRouter({
  getItemsHandler: getItems,
  routerName: 'music',
});
