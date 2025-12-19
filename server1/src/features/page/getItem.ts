import type { PageText } from '../../types/PageText.js';

import { createGetHandlerWithParams } from '../../lib/http/genericHandlers.js';
import { parseRequestId } from '../../utils/helperUtils.js';

import { PageService } from './PageService.js';

export const getItem = createGetHandlerWithParams<PageText>({
  errorResponse: { message: 'Page not found' } as unknown as PageText,
  getData: async (req) => {
    const { id } = req.params;
    const { id: idNum, isValid } = parseRequestId(id?.trim() ?? '');

    if (!isValid || !idNum) {
      return { message: 'Invalid ID' } as unknown as PageText;
    }

    const service = new PageService();
    const result = await service.getItemCompleteById(idNum);
    return result ?? ({ message: 'Page not found' } as unknown as PageText);
  },
  handlerName: 'Page:getItem',
  return204OnEmpty: false,
  validateParams: (req) => {
    const { id } = req.params;
    if (!id) {
      return { errorMessage: 'Invalid ID', isValid: false };
    }
    return { isValid: true };
  },
});
