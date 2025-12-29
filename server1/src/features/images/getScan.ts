import type { Images } from '@site8/shared';

import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getImagesService } from '../../utils/ServiceFactory.js';

export const getScan = createGetHandler<Images>({
  errorResponse: { items: [], metadata: { title: 'Images' } },
  getData: async () => {
    const data = await getImagesService().scanForNewItems();
    return data ?? { items: [], metadata: { title: 'Images' } };
  },
  getItemCount: (data) => data.items?.length ?? 0,
  handlerName: 'Images:getScan',
  return204OnEmpty: true,
});
