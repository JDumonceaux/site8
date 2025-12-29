import type { ArtistsItems } from '@site8/shared';

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
