import type { Test } from '@site8/shared';

import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { getTestsService } from '../../utils/ServiceFactory.js';

export const getItems = createCollectionHandler<Test>({
  defaultTitle: 'Tests',
  getService: getTestsService,
  handlerName: 'Tests:getItems',
  return204OnEmpty: false,
});
