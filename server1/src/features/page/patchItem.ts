import type { Request, Response } from 'express';

import { PageEditSchema } from '@site8/shared';

import { RequestValidator } from '../../lib/http/RequestValidator.js';
import { ResponseHelper } from '../../lib/http/ResponseHelper.js';
import { Logger } from '../../utils/logger.js';
import {
  getPageFileService,
  getPageService,
} from '../../utils/ServiceFactory.js';

/**
 * Handles PATCH requests to update a single page item
 * Updates both page metadata (via PageService) and page text content (via PageFileService)
 * Note: Custom implementation required due to dual-service update
 * @param req - Express request with PageEdit object in body
 * @param res - Express response with 204 No Content on success or error object
 */
export const patchItem = async (
  req: Request,
  res: Response<unknown>,
): Promise<void> => {
  // Validate request body using standardized validator
  const validation = RequestValidator.validateBody(req, PageEditSchema);
  if (!validation.isValid) {
    ResponseHelper.badRequest(res, validation.errorMessage!);
    return;
  }

  const item = validation.data!;
  Logger.info(`Page: Patch Item called for ID: ${item.id}`);

  const service = getPageService();
  const fileService = getPageFileService();

  // Meta data and text are stored in separate files - therefore two updates are needed.
  const results = await Promise.allSettled([
    Promise.try(async () => service.updateItem(item)),
    Promise.try(async () => fileService.updateFile(item.id, item.text)),
  ]);

  // Check if any update failed
  for (const result of results) {
    if (result.status === 'rejected') {
      const error = new Error(String(result.reason) || 'Update failed');
      ResponseHelper.internalError(res, 'Page', error);
      return;
    }
  }

  ResponseHelper.noContent(res, 'Page');
};
