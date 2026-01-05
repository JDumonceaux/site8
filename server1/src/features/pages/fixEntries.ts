import type { Request, Response } from 'express';

import { ok } from '../../lib/http/ResponseHelper.js';
import { getPagesService } from '../../utils/ServiceFactory.js';

/**
 * Handles GET requests to fix/clean all page entries
 * Applies cleanup operations to all pages in the collection
 * @param _req - Express request (unused)
 * @param res - Express response with success message or error status
 */
export const fixEntries = async (
  _req: Request,
  res: Response<{ message: string }>,
): Promise<void> => {
  const service = getPagesService();
  await service.fixAllEntries();

  ok(res, { message: 'Successfully fixed all entries' }, 'Pages: Fix Entries');
};
