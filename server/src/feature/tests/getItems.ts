import type { Tests } from '@site8/shared';

import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getTestsService } from '../../utils/ServiceFactory.js';

export const getTestsSorted = createGetHandler<Tests>({
  errorResponse: { metadata: { title: 'Tests' }, sections: [] },
  getData: async () => {
    const service = getTestsService();
    return service.getTestsSorted();
  },
  handlerName: 'Tests:getTestsSorted',
  return204OnEmpty: false,
});
