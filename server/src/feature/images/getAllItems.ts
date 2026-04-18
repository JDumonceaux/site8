import type { ImageFiles } from '@site8/shared';

import { createGetHandlerWithParams } from '../../lib/http/genericHandlers.js';
import { getImagesApiService } from '../../utils/ServiceFactory.js';

const VALID_MATCHED_VALUES = ['all', 'matchedOnly', 'unmatchedOnly'] as const;
type MatchedFilter = (typeof VALID_MATCHED_VALUES)[number];

const isValidMatchedFilter = (value: unknown): value is MatchedFilter =>
  VALID_MATCHED_VALUES.includes(value as MatchedFilter);

const errorResponse: ImageFiles = {
  items: undefined,
  metadata: { title: 'Images' },
};

export const getAllItems = createGetHandlerWithParams<ImageFiles>({
  errorResponse,
  getData: async (req) => {
    const { folder, matched } = req.query;
    const folderParam =
      typeof folder === 'string' && folder ? folder : undefined;
    const matchedParam = isValidMatchedFilter(matched) ? matched : 'all';
    return getImagesApiService().getAllItems(folderParam, matchedParam);
  },
  getItemCount: (data) => data.items?.length ?? 0,
  handlerName: 'Images:getAllItems',
});
