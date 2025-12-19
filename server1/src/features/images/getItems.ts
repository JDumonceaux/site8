import type { Images } from '../../types/Images.js';

import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getImagesService } from '../../utils/ServiceFactory.js';

export const getItems = createGetHandler<Images>({
  errorResponse: { items: [], metadata: { title: 'Images' } },
  getData: async () => {
    const data = await getImagesService().getItems();
    return data ?? { items: [], metadata: { title: 'Images' } };
  },
  getItemCount: (data) => data.items?.length ?? 0,
  handlerName: 'Images:getItems',
  return204OnEmpty: true,
});
