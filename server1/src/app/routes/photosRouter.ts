import { getItems } from '../../features/photos/getItems.js';
import { createSimpleRouter } from './createSimpleRouter.js';

export const photosRouter = createSimpleRouter({
  getItemsHandler: getItems,
  routerName: 'photos',
});
