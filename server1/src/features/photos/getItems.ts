import type { Photos } from '../../types/Photos.js';

import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getPhotosService } from '../../utils/ServiceFactory.js';

export const getItems = createGetHandler<Photos>({
  errorResponse: {
    items: [],
    metadata: { title: 'Photos' },
    sets: [],
    title: 'Photos',
  },
  getData: async () => {
    const data = await getPhotosService().getItems();
    return (
      data ?? {
        items: [],
        metadata: { title: 'Photos' },
        sets: [],
        title: 'Photos',
      }
    );
  },
  getItemCount: (data) => data.items.length,
  handlerName: 'Photos:getItems',
  return204OnEmpty: false,
});
