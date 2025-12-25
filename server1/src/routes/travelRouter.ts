import { getItems } from '../features/travel/getItems.js';
import { createSimpleRouter } from './createSimpleRouter.js';

export const travelRouter = createSimpleRouter({
  getItemsHandler: getItems,
  routerName: 'travel',
});
