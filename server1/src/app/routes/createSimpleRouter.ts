import express, { type Request, type Response, type Router } from 'express';

import { asyncHandler } from '../../utils/routerUtils.js';

type SimpleRouterConfig = {
  /** The handler function to call for GET / */
  getItemsHandler: (req: Request, res: Response) => Promise<void>;
  /** Name for the router (used for logging) */
  routerName?: string;
};

/**
 * Factory function to create simple routers with a single GET / endpoint.
 * Consolidates the common pattern used by tests, music, photos, and travel routers.
 *
 * @param config - Configuration for the router
 * @returns Express router instance
 *
 * @example
 * ```typescript
 * export const testsRouter = createSimpleRouter({
 *   getItemsHandler: getItems,
 *   routerName: 'tests'
 * });
 * ```
 */
export const createSimpleRouter = (config: SimpleRouterConfig): Router => {
  const router = express.Router();
  router.get('/', asyncHandler(config.getItemsHandler));
  return router;
};
