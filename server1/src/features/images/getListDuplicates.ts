import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getImagesService } from '../../utils/ServiceFactory.js';

export const getListDuplicates = createGetHandler<{ readonly items: string[] }>(
  {
    errorResponse: { items: [] },
    getData: async () => {
      const data = await getImagesService().listDuplicates();
      return data ?? { items: [] };
    },
    getItemCount: (data) => (Array.isArray(data) ? data.length : 1),
    handlerName: 'Images:getListDuplicates',
    return204OnEmpty: true,
  },
);
