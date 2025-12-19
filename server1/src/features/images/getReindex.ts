import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getImagesService } from '../../utils/ServiceFactory.js';

export const getReindex = createGetHandler<boolean>({
  errorResponse: false,
  getData: async () => getImagesService().fixIndex(),
  handlerName: 'Images:getReindex',
  return204OnEmpty: true,
});
