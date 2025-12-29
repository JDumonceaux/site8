import { getItems } from '../../features/tests/getItems.js';
import { createSimpleRouter } from './createSimpleRouter.js';

export const testsRouter = createSimpleRouter({
  getItemsHandler: getItems,
  routerName: 'tests',
});
