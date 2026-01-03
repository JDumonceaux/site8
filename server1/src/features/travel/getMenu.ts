import type { MenuItem } from '@site8/shared';
import type { Request, Response } from 'express';

import { ResponseHelper } from '../../lib/http/ResponseHelper.js';
import { Logger } from '../../utils/logger.js';
import { getPlacesMenuService } from '../../utils/ServiceFactory.js';

/**
 * GET /api/travel/menu handler
 * Returns hierarchical menu structure: Country > City > Place Name
 */
export const getMenu = async (
  _req: Request,
  res: Response<
    { error: string } | { items: MenuItem[]; metadata: { title: string } }
  >,
): Promise<void> => {
  const handlerName = 'getMenu';
  Logger.info(`${handlerName}: GET /api/travel/menu`);

  try {
    const placesMenuService = getPlacesMenuService();
    const menu = await placesMenuService.getPlacesMenu();

    if (!menu) {
      ResponseHelper.notFound(res, 'Places menu not found');
      return;
    }

    ResponseHelper.ok(
      res,
      { items: menu, metadata: { title: 'Travel' } },
      handlerName,
    );
  } catch (error) {
    ResponseHelper.internalError(res, handlerName, error, {
      error: 'Failed to retrieve travel menu',
    });
  }
};
