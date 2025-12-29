import type { Images } from '@site8/shared';

import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getImagesService } from '../../utils/ServiceFactory.js';

export const getItemsEdit = createGetHandler<Images>({
  errorResponse: { items: [], metadata: { title: 'Images' } },
  getData: async () => {
    const data = await getImagesService().getItemsEdit();
    return data ?? { items: [], metadata: { title: 'Images' } };
  },
  getItemCount: (data) => data.items?.length ?? 0,
  handlerName: 'Images:getItemsEdit',
  return204OnEmpty: true,
});
