import type { Request, Response } from 'express';

import { Logger } from '../../utils/logger.js';
import { RequestValidator } from '../../lib/http/RequestValidator.js';
import { ResponseHelper } from '../../lib/http/ResponseHelper.js';
import {
  getPageFileService,
  getPageService,
} from '../../utils/ServiceFactory.js';

/**
 * Handles DELETE requests to remove a page item
 * Deletes both page metadata and page text file
 * Note: Custom implementation required due to dual-service deletion
 * @param req - Express request with id in body
 * @param res - Express response with 204 No Content on success or error object
 */
export const deleteItem = async (
  req: Request,
  res: Response<{ error: string }>,
): Promise<void> => {
  // Validate ID using standardized validator
  const idValidation = RequestValidator.validateId(req.body);
  if (!idValidation.isValid) {
    ResponseHelper.badRequest(res, idValidation.errorMessage!);
    return;
  }

  const idNum = idValidation.id!;
  Logger.info(`Page: Delete Item called: ${idNum}`);

  const service = getPageService();
  const fileService = getPageFileService();

  // Delete from both services (metadata and text file)
  await Promise.all([
    Promise.try(() => service.deleteItem(idNum)),
    Promise.try(() => fileService.deleteFile(idNum)),
  ]);

  ResponseHelper.noContent(res, 'Page');
};
