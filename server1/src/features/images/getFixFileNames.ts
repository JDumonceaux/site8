import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getImagesService } from '../../utils/ServiceFactory.js';

export const getFixFileNames = createGetHandler<boolean>({
  errorResponse: false,
  getData: async () => getImagesService().fixNames(),
  handlerName: 'Images:getFixFileNames',
  return204OnEmpty: true,
});
