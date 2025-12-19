import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getPagesService } from '../../utils/ServiceFactory.js';

type DuplicatesResponse = {
  readonly items: string[];
};

export const listDuplicates = createGetHandler<DuplicatesResponse>({
  errorResponse: { items: [] },
  getData: async () => getPagesService().listDuplicates(),
  getItemCount: (data) => data.items.length,
  handlerName: 'Pages:listDuplicates',
  return204OnEmpty: false,
});
