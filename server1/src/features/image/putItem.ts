import { createPutHandler } from '../../lib/http/genericHandlers.js';
import { ImageAddSchema } from '../../types/Image.js';
import { getImageService } from '../../utils/ServiceFactory.js';

export const putItem = createPutHandler({
  getService: getImageService,
  resourcePath: '/image',
  schema: ImageAddSchema,
  serviceName: 'Image',
});
