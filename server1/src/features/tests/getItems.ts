import type { Tests } from '@site8/shared';

import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getTestsService } from '../../utils/ServiceFactory.js';

export const getItems = createGetHandler<Tests>({
  errorResponse: { metadata: { title: 'Tests' }, sections: [] },
  getData: async () => {
    const service = getTestsService();
    return service.getAiTests();
  },
  handlerName: 'Tests:getItems',
  return204OnEmpty: false,
});
