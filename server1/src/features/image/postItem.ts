import { createPostHandler } from '../../lib/http/genericHandlers.js';
import { ImageAddSchema } from '../../types/Image.js';
import { getImageService } from '../../utils/ServiceFactory.js';

export const postItem = createPostHandler({
  getService: getImageService,
  resourcePath: '/image',
  schema: ImageAddSchema,
  serviceName: 'Image',
});
