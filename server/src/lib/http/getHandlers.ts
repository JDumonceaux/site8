import type {
  GetHandlerConfig,
  GetHandlerWithParamsConfig,
} from './genericHandlerTypes.js';
import type { Request, Response } from 'express';

import { Logger } from '../../utils/logger.js';

import { badRequest, internalError, noContent, ok } from './ResponseHelper.js';

export const createGetHandler = <T>(config: GetHandlerConfig<T>) => {
  const {
    errorResponse,
    getData,
    getItemCount,
    handlerName,
    return204OnEmpty = false,
  } = config;

  return async (_req: Request, res: Response<T>): Promise<void> => {
    try {
      Logger.info(`${handlerName}: Retrieving data`);

      const data = await getData();

      if (getItemCount && return204OnEmpty) {
        const itemCount = getItemCount(data);

        if (itemCount === 0) {
          noContent(res, handlerName, 'No items found');
          return;
        }

        ok(res, data, handlerName, itemCount);
      } else {
        ok(res, data, handlerName);
      }
    } catch (error) {
      internalError(res, handlerName, error, errorResponse);
    }
  };
};

export const createGetHandlerWithParams = <T>(
  config: GetHandlerWithParamsConfig<T>,
) => {
  const {
    errorResponse,
    getData,
    getItemCount,
    handlerName,
    return204OnEmpty = false,
    validateParams,
  } = config;

  return async (req: Request, res: Response<T>): Promise<void> => {
    try {
      if (validateParams) {
        const validation = validateParams(req);
        if (!validation.isValid) {
          badRequest(
            res as Response<{ error: string }>,
            validation.errorMessage ?? 'Invalid parameters',
            handlerName,
          );
          return;
        }
      }

      Logger.info(`${handlerName}: Retrieving data`);

      const data = await getData(req);

      if (getItemCount && return204OnEmpty) {
        const itemCount = getItemCount(data);

        if (itemCount === 0) {
          noContent(res, handlerName, 'No items found');
          return;
        }

        ok(res, data, handlerName, itemCount);
      } else {
        ok(res, data, handlerName);
      }
    } catch (error) {
      internalError(res, handlerName, error, errorResponse);
    }
  };
};
