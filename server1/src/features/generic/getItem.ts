import { createGetHandlerWithParams } from '../../lib/http/genericHandlers.js';

import { GenericService } from './GenericService.js';

export const getItemByName = createGetHandlerWithParams<unknown>({
  errorResponse: {},
  getData: async (req) => {
    const { name, parent } = req.params;
    const actualParent = parent ?? 'generic';
    const service = new GenericService();
    const result = await service.getItem(actualParent, name ?? '');
    return result ?? {};
  },
  handlerName: 'Generic:getItemByName',
  return204OnEmpty: true,
  validateParams: (req) => {
    const { name } = req.params;
    if (!name) {
      return {
        errorMessage: 'Invalid parameter: name is required',
        isValid: false,
      };
    }
    return { isValid: true };
  },
});
