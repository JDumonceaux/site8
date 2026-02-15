import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { getClientImagesService } from '../../utils/ServiceFactory.js';

const year2025FoldersServiceAdapter = () => ({
  getItems: async () => getClientImagesService().getYear2025FolderNames(),
});

export const getYear2025Folders = createCollectionHandler<string>({
  defaultTitle: 'Image Folders 2025',
  getService: year2025FoldersServiceAdapter,
  handlerName: 'Images:getYear2025Folders',
  return204OnEmpty: false,
});
