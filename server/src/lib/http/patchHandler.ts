import type { PatchOptions } from './genericHandlerTypes.js';
import type { Request, Response } from 'express';

import { Logger } from '../../utils/logger.js';

import { wantsRepresentation } from './PreferHeaderHandler.js';
import { convertIdsToNumbers, validateBody } from './RequestValidator.js';
import {
  badRequest,
  internalError,
  isNotFoundError,
  isValidationError,
  noContent,
  notFound,
  ok,
} from './ResponseHelper.js';

export const createPatchHandler = <T>({
  getService,
  idFields = ['id', 'itemId'],
  schema,
  serviceName,
}: PatchOptions<T>) => {
  return async (
    req: Request,
    res: Response<T | { error: string }>,
  ): Promise<void> => {
    try {
      const returnRepresentation = wantsRepresentation(req);

      const validation = validateBody(req, schema);
      if (!validation.isValid) {
        badRequest(res, validation.errorMessage ?? 'Invalid request body');
        return;
      }

      const validatedData = validation.data as Record<string, unknown>;

      const idConversion = convertIdsToNumbers(validatedData, idFields);
      if (!idConversion.isValid) {
        badRequest(res, idConversion.errorMessage ?? 'Invalid ID format');
        return;
      }

      if (!idConversion.data) {
        badRequest(res, 'Missing data after ID conversion');
        return;
      }
      const { data } = idConversion;

      const id = typeof data.id === 'number' ? data.id : undefined;
      if (!id) {
        badRequest(res, 'ID is required in request body');
        return;
      }

      Logger.info(`${serviceName}: Patch Item called for ID: ${id}`);

      const service = getService();

      try {
        let updatedId: number;
        if (service.patchItem) {
          updatedId = await service.patchItem(data as T);
        } else if (service.updateItem) {
          updatedId = await service.updateItem(data as T);
        } else {
          internalError(
            res,
            serviceName,
            new Error('Service missing update method'),
          );
          return;
        }

        if (returnRepresentation) {
          if (!service.getItem) {
            internalError(
              res,
              serviceName,
              new Error('Service missing getItem method'),
            );
            return;
          }
          const result = await service.getItem(updatedId);
          if (!result) {
            notFound(res, 'Item not found after update');
            return;
          }
          ok(res, result, serviceName);
          return;
        }
        noContent(res, serviceName);
      } catch (serviceError) {
        if (isNotFoundError(serviceError)) {
          notFound(res);
          return;
        }
        if (isValidationError(serviceError)) {
          badRequest(
            res,
            serviceError instanceof Error
              ? serviceError.message
              : 'Validation error',
          );
          return;
        }
        throw serviceError;
      }
    } catch (error) {
      internalError(res, serviceName, error);
    }
  };
};
