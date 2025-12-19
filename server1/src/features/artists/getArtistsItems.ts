import type { ArtistsItems } from '../../types/ArtistsItems.js';

import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getArtistsService } from '../../utils/ServiceFactory.js';

export const getArtistsItems = createGetHandler<ArtistsItems>({
  errorResponse: {
    items: undefined,
    metadata: { title: 'Artists Items' },
  },
  getData: async () => {
    const artistsService = getArtistsService();
    return artistsService.getArtistsItems();
  },
  getItemCount: (data) => data.items?.length ?? 0,
  handlerName: 'getArtistsItems',
  return204OnEmpty: true,
});
