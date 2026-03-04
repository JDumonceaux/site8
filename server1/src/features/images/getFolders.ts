import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { CURRENT_YEAR } from '../../utils/constants.js';
import { getImagesApiService } from '../../utils/ServiceFactory.js';

const foldersServiceAdapter = () => ({
  getItems: async () => getImagesApiService().getFolderNames(),
});

export const getFolders = createCollectionHandler<string>({
  defaultTitle: `Image Folders ${String(CURRENT_YEAR)}`,
  getService: foldersServiceAdapter,
  handlerName: 'Images:getFolders',
  return204OnEmpty: false,
});
