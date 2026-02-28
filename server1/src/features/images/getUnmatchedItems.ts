import type { ImageItem } from '../../types/ImageItem.js';

import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { getClientImagesService } from '../../utils/ServiceFactory.js';

const unmatchedImagesServiceAdapter = () => ({
  getItems: async () => getClientImagesService().getUnmatchedItems(),
});

export const getUnmatchedItems = createCollectionHandler<ImageItem>({
  defaultTitle: 'Unmatched Images',
  getService: unmatchedImagesServiceAdapter,
  handlerName: 'Images:getUnmatchedItems',
  return204OnEmpty: false,
});
