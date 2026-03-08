import type { PostOptions, PutOptions } from './genericHandlerTypes.js';
import type { Request, Response } from 'express';

import { Logger } from '../../utils/logger.js';

import { wantsRepresentation } from './PreferHeaderHandler.js';
import { validateBody } from './RequestValidator.js';
import {
  badRequest,
  conflict,
  created,
  internalError,
  isConflictError,
  isValidationError,
  notFound,
  ok,
} from './ResponseHelper.js';

export const createPostHandler = <T, TAdd>({
  getService,
  resourcePath,
  schema,
  serviceName,
}: PostOptions<T, TAdd>) => {
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

      if (!validation.data) {
        badRequest(res, 'Missing request data');
        return;
      }
      const { data } = validation;
      Logger.info(`${serviceName}: Post Item called (create new)`);

      const service = getService();

      try {
        const newId = await service.addItem(data);

        if (returnRepresentation) {
          const newItem = await service.getItem(newId);
          if (!newItem) {
            internalError(
              res,
              serviceName,
              new Error('Failed to retrieve created item'),
            );
            return;
          }
          created(res, resourcePath, newId, newItem);
          return;
        }

        created(res, resourcePath, newId);
      } catch (serviceError) {
        if (isValidationError(serviceError)) {
          badRequest(
            res,
            serviceError instanceof Error
              ? serviceError.message
              : 'Validation error',
          );
          return;
        }
        if (isConflictError(serviceError)) {
          conflict(
            res,
            serviceError instanceof Error ? serviceError.message : 'Conflict',
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

export const createPutHandler = <T, TAdd>({
  getService,
  resourcePath,
  schema,
  serviceName,
}: PutOptions<T, TAdd>) => {
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

      if (!validation.data) {
        badRequest(res, 'Missing request data');
        return;
      }
      const { data } = validation;
      Logger.info(`${serviceName}: Put Item called`);

      const service = getService();
      const newId = await service.addItem(data);

      if (returnRepresentation) {
        const newItem = await service.getItem(newId);
        if (newItem) {
          ok(res, newItem, serviceName);
          return;
        }
        notFound(res, 'Created item not found');
        return;
      }

      created(res, resourcePath, newId);
    } catch (error) {
      internalError(res, serviceName, error);
    }
  };
};
