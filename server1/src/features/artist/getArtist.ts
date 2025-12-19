import type { Artists } from '../../types/Artists.js';

import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getArtistsService } from '../../utils/ServiceFactory.js';

export const getArtist = createGetHandler<Artists>({
  errorResponse: {
    items: undefined,
    metadata: { title: 'Artists' },
  },
  getData: async () => {
    const artistService = getArtistsService();
    return artistService.getArtists();
  },
  getItemCount: (data) => data.items?.length ?? 0,
  handlerName: 'getArtist',
});
