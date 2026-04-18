import type { Test } from '@site8/shared';

import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { getTestsService } from '../../utils/ServiceFactory.js';

const testsServiceAdapter = () => ({
  getItems: async () => getTestsService().getTests(),
});

export const getTests = createCollectionHandler<Test>({
  defaultTitle: 'Tests',
  getService: testsServiceAdapter,
  handlerName: 'Tests:getTests',
  return204OnEmpty: false,
});
