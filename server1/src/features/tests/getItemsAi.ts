import type { Test } from '@site8/shared';

import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { getTestsAiService } from '../../utils/ServiceFactory.js';

export const getItemsAi = createCollectionHandler<Test>({
  defaultTitle: 'Tests - AI',
  getService: getTestsAiService,
  handlerName: 'Tests:getItemsAi',
  return204OnEmpty: false,
});
