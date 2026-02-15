import type { Image } from '@site8/shared';

import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { getClientImagesService } from '../../utils/ServiceFactory.js';

const unmatchedImagesServiceAdapter = () => ({
  getItems: async () => getClientImagesService().getUnmatchedItems(),
});

export const getUnmatchedItems = createCollectionHandler<Image>({
  defaultTitle: 'Unmatched Images',
  getService: unmatchedImagesServiceAdapter,
  handlerName: 'Images:getUnmatchedItems',
  return204OnEmpty: false,
});
