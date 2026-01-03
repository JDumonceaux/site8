import { ImageAddSchema } from '@site8/shared';

import { createPostHandler } from '../../lib/http/genericHandlers.js';
import { getImageService } from '../../utils/ServiceFactory.js';

export const postItem = createPostHandler({
  getService: getImageService,
  resourcePath: '/image',
  schema: ImageAddSchema,
  serviceName: 'Image',
});
