import type { Page } from '@site8/shared';

import { createGetHandlerWithParams } from '../../lib/http/genericHandlers.js';
import { Logger } from '../../utils/logger.js';

import { GenericService } from './GenericService.js';

/**
 * Handler for retrieving a page item by name and optional parent
 * Route: GET /generic/:parent?/:name
 */
export const getItemByName = createGetHandlerWithParams<Page>({
  errorResponse: {} as Page,
  getData: async (req) => {
    const { name, parent } = req.params;
    const actualParent = parent ?? 'generic';

    Logger.info(
      `getItemByName: Fetching item '${name}' with parent '${actualParent}'`,
    );

    const service = new GenericService();
    const result = await service.getItem(actualParent, name ?? '');

    if (!result) {
      Logger.warn(`getItemByName: No item found for '${name}'`);
      throw new Error(`Page not found: ${name}`);
    }

    Logger.info(`getItemByName: Found item with id ${result.id}`);
    return result;
  },
  handlerName: 'Generic:getItemByName',
  return204OnEmpty: false,
  validateParams: (req) => {
    const { name } = req.params;

    if (!name || name.trim() === '') {
      return {
        errorMessage: 'Invalid parameter: name is required and cannot be empty',
        isValid: false,
      };
    }

    return { isValid: true };
  },
});
