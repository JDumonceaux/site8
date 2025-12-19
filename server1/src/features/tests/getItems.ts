import type { Tests } from '../../types/Tests.js';

import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getTestsService } from '../../utils/ServiceFactory.js';

export const getItems = createGetHandler<Tests>({
  errorResponse: { items: [], metadata: { title: 'Tests' } },
  getData: async () => {
    const data = await getTestsService().getItems();
    return data ?? { items: [], metadata: { title: 'Tests' } };
  },
  getItemCount: (data) => data.items?.length ?? 0,
  handlerName: 'Tests:getItems',
  return204OnEmpty: false,
});
