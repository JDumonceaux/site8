import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getImagesFileService } from '../../utils/ServiceFactory.js';

export const getFolders = createGetHandler<string[]>({
  errorResponse: [],
  getData: async () => {
    const folders = getImagesFileService().getFolders();
    return Promise.try(() => folders ?? []);
  },
  getItemCount: (data) => data.length,
  handlerName: 'Images:getFolders',
  return204OnEmpty: true,
});
