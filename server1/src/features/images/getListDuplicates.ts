import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getImagesService } from '../../utils/ServiceFactory.js';

export const getListDuplicates = createGetHandler<string | string[]>({
  errorResponse: [],
  getData: async () => {
    const data = await getImagesService().listDuplicates();
    return data ?? [];
  },
  getItemCount: (data) => (Array.isArray(data) ? data.length : 1),
  handlerName: 'Images:getListDuplicates',
  return204OnEmpty: true,
});
