import type { Image } from '../../types/Image.js';

import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { getImagesService } from '../../utils/ServiceFactory.js';

export const getItems = createCollectionHandler<Image>({
  defaultTitle: 'Images',
  getService: getImagesService,
  handlerName: 'Images:getItems',
  return204OnEmpty: true,
});
