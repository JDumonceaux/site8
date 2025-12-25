import type { Test } from '../../types/Test.js';

import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { getTestsService } from '../../utils/ServiceFactory.js';

export const getItems = createCollectionHandler<Test>({
  defaultTitle: 'Tests',
  getService: getTestsService,
  handlerName: 'Tests:getItems',
  return204OnEmpty: false,
});
