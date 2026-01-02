import express from 'express';

import { getItems } from '../../features/travel/getItems.js';
import { PlacesMenuService } from '../../features/travel/PlacesMenuService.js';
import { asyncHandler } from '../../utils/routerUtils.js';
import { Logger } from '../../utils/logger.js';
import { getTravelService } from '../../utils/ServiceFactory.js';

export const travelRouter = express.Router();

// GET /api/travel - Get all travel places
travelRouter.get('/', asyncHandler(getItems));

// GET /api/travel/menu - Get hierarchical menu (Country > City > Name)
travelRouter.get(
  '/menu',
  asyncHandler(async (_req, res) => {
    Logger.info('GET /api/travel/menu');

    const travelService = getTravelService();
    const placesMenuService = new PlacesMenuService(travelService);
    const menu = await placesMenuService.getPlacesMenu();

    if (!menu) {
      res.status(404).json({ error: 'Places menu not found' });
      return;
    }

    res.json({ items: menu, metadata: { title: 'Travel' } });
  }),
);
