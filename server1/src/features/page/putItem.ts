import type { Request, Response } from 'express';

import { notImplemented } from '../../lib/http/ResponseHelper.js';

/**
 * Handles PUT requests to replace a page item completely
 * @param _req - Express request (currently unused)
 * @param res - Express response
 * @todo Implement full page update logic with PageService
 */
export const putItem = (
  _req: Request,
  res: Response<{ error: string }>,
): void => {
  // TODO: Implement full page update logic with PageService
  notImplemented(res, 'Page PUT not yet implemented');
};
