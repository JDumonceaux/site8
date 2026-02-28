import type { ImageItem } from '../../types/ImageItem.js';

import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { getClientImagesService } from '../../utils/ServiceFactory.js';

const imagesServiceAdapter = () => ({
  getItems: async () => getClientImagesService().getItems(),
});

export const getItems = createCollectionHandler<ImageItem>({
  defaultTitle: 'Images',
  getService: imagesServiceAdapter,
  handlerName: 'Images:getItems',
  return204OnEmpty: false,
});
