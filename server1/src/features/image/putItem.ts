import { createPutHandler } from '../../lib/http/genericHandlers.js';
import { ImageAddSchema } from '@site8/shared';
import { getImageService } from '../../utils/ServiceFactory.js';

export const putItem = createPutHandler({
  getService: getImageService,
  resourcePath: '/image',
  schema: ImageAddSchema,
  serviceName: 'Image',
});
