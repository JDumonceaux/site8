import { createPutHandler } from '../../lib/http/genericHandlers.js';
import { ImageSchemaAdd } from '../../types/Image.js';
import { getImageService } from '../../utils/ServiceFactory.js';

export const putItem = createPutHandler({
  getService: getImageService,
  resourcePath: '/image',
  schema: ImageSchemaAdd,
  serviceName: 'Image',
});
