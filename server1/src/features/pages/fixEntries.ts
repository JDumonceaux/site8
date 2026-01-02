import type { Request, Response } from 'express';

import { Logger } from '../../utils/logger.js';
import { getPagesService } from '../../utils/ServiceFactory.js';

/**
 * Handles GET requests to fix/clean all page entries
 * Applies cleanup operations to all pages in the collection
 * @param _req - Express request (unused)
 * @param res - Express response with success message or error status
 */
export const fixEntries = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  Logger.info('Pages: Fix Entries called');

  const service = getPagesService();
  await service.fixAllEntries();

  Logger.info('Pages: Successfully fixed all entries');
  res.json({ message: 'Successfully fixed all entries' });
};
