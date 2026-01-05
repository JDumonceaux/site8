import type { Request, Response } from 'express';

import { validateId } from '../../lib/http/RequestValidator.js';
import { badRequest, noContent } from '../../lib/http/ResponseHelper.js';
import { Logger } from '../../utils/logger.js';
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
  const idValidation = validateId(req.body);
  if (!idValidation.isValid) {
    badRequest(res, idValidation.errorMessage ?? 'Invalid ID');
    return;
  }

  const idNum = idValidation.id;
  if (idNum == null) {
    badRequest(res, 'Invalid ID');
    return;
  }

  Logger.info(`Page: Delete Item called: ${idNum}`);

  const service = getPageService();
  const fileService = getPageFileService();

  // Delete from both services (metadata and text file)
  await Promise.all([
    Promise.try(async () => service.deleteItem(idNum)),
    Promise.try(async () => fileService.deleteFile(idNum)),
  ]);

  noContent(res, 'Page');
};
