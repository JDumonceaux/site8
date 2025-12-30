import type { Request, Response } from 'express';
import type { z } from 'zod';

import { Logger } from '../../utils/logger.js';
import { PreferHeaderHandler } from './PreferHeaderHandler.js';
import { RequestValidator } from './RequestValidator.js';
import { ResponseHelper } from './ResponseHelper.js';

/**
 * Configuration for creating a generic GET handler without parameters
 */
type GetHandlerConfig<T> = {
  /** Default response for errors */
  errorResponse: T;
  /** Function that retrieves the data */
  getData: () => Promise<T>;
  /** Function to extract item count from the response (optional) */
  getItemCount?: (data: T) => number;
  /** Name of the handler for logging purposes */
  handlerName: string;
  /** Whether to return 204 when no items found (default: false) */
  return204OnEmpty?: boolean;
};

/**
 * Configuration for creating a generic GET handler with request parameters
 */
type GetHandlerWithParamsConfig<T> = {
  /** Default response for errors */
  errorResponse: T;
  /** Function that retrieves the data using request object */
  getData: (req: Request) => Promise<T>;
  /** Function to extract item count from the response (optional) */
  getItemCount?: (data: T) => number;
  /** Name of the handler for logging purposes */
  handlerName: string;
  /** Whether to return 204 when no items found (default: false) */
  return204OnEmpty?: boolean;
  /** Function to validate request parameters (optional) */
  validateParams?: (req: Request) => {
    errorMessage?: string;
    isValid: boolean;
  };
};

type PatchOptions<T> = {
  getService: () => {
    getItem: (id: number) => Promise<T | undefined>;
    updateItem: (data: T) => Promise<number>;
  };
  idFields?: string[];
  schema: z.ZodType<any>;
  serviceName: string;
};

/**
 * Creates a generic GET handler for Express routes
 * @template T - The response type
 * @param config - Configuration for the handler
 * @returns Express request handler
 *
 * @example
 * ```typescript
 * export const getArtists = createGetHandler<Artists>({
 *   handlerName: 'getArtists',
 *   getData: async () => {
 *     const service = getArtistsService();
 *     return service.getArtists();
 *   },
 *   getItemCount: (data) => data.items?.length ?? 0,
 *   return204OnEmpty: true,
 *   errorResponse: {
 *     items: undefined,
 *     metadata: { title: 'Artists' },
 *   },
 * });
 * ```
 */
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

      // Check for empty results if configured
      if (getItemCount && return204OnEmpty) {
        const itemCount = getItemCount(data);

        if (itemCount === 0) {
          ResponseHelper.noContent(res, handlerName, 'No items found');
          return;
        }

        ResponseHelper.ok(res, data, handlerName, itemCount);
      } else {
        ResponseHelper.ok(res, data, handlerName);
      }
    } catch (error) {
      ResponseHelper.internalError(res, handlerName, error, errorResponse);
    }
  };
};

/**
 * Creates a generic GET handler for Express routes that requires request parameters
 * @template T - The response type
 * @param config - Configuration for the handler with request parameter support
 * @returns Express request handler
 *
 * @example
 * ```typescript
 * export const getItemsPage = createGetHandlerWithParams<Bookmarks>({
 *   handlerName: 'getItemsPage',
 *   getData: async (req) => {
 *     const { id } = req.params;
 *     const service = getBookmarksService();
 *     const result = await service.getBookmarksForPage(id);
 *     return result ?? { items: [], metadata: { title: 'Bookmarks' } };
 *   },
 *   validateParams: (req) => {
 *     const { id } = req.params;
 *     if (!id) {
 *       return { isValid: false, errorMessage: 'Missing page id parameter' };
 *     }
 *     return { isValid: true };
 *   },
 *   getItemCount: (data) => data.items.length,
 *   return204OnEmpty: true,
 *   errorResponse: {
 *     items: [],
 *     metadata: { title: 'Bookmarks' },
 *   },
 * });
 * ```
 */
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
      // Validate parameters if validator is provided
      if (validateParams) {
        const validation = validateParams(req);
        if (!validation.isValid) {
          ResponseHelper.badRequest(
            res as Response<{ error: string }>,
            validation.errorMessage ?? 'Invalid parameters',
            handlerName,
          );
          return;
        }
      }

      Logger.info(`${handlerName}: Retrieving data`);

      const data = await getData(req);

      // Check for empty results if configured
      if (getItemCount && return204OnEmpty) {
        const itemCount = getItemCount(data);

        if (itemCount === 0) {
          ResponseHelper.noContent(res, handlerName, 'No items found');
          return;
        }

        ResponseHelper.ok(res, data, handlerName, itemCount);
      } else {
        ResponseHelper.ok(res, data, handlerName);
      }
    } catch (error) {
      ResponseHelper.internalError(res, handlerName, error, errorResponse);
    }
  };
};

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
      const returnRepresentation = PreferHeaderHandler.wantsRepresentation(req);

      // Validate ID parameter
      const idValidation = RequestValidator.validateIdParam(req);
      if (!idValidation.isValid) {
        ResponseHelper.badRequest(res, idValidation.errorMessage!);
        return;
      }
      const id = idValidation.data!;

      // Validate request body with ID
      const validation = RequestValidator.validateBodyWithData(req, schema, {
        id,
      });
      if (!validation.isValid) {
        ResponseHelper.badRequest(res, validation.errorMessage!);
        return;
      }

      let data = validation.data as Record<string, unknown>;

      // Convert string IDs to numbers
      const idConversion = RequestValidator.convertIdsToNumbers(data, idFields);
      if (!idConversion.isValid) {
        ResponseHelper.badRequest(res, idConversion.errorMessage!);
        return;
      }
      data = idConversion.data!;

      // Ensure ID consistency between URL and body
      const validatedData = data as { id?: string };
      const consistencyCheck = RequestValidator.validateIdConsistency(
        id,
        validatedData.id,
      );
      if (!consistencyCheck.isValid) {
        ResponseHelper.badRequest(res, consistencyCheck.errorMessage!);
        return;
      }

      Logger.info(`${serviceName}: Patch Item called for ID: ${id}`);

      const service = getService();

      try {
        // Prefer `patchItem` when available on the service, fall back to `updateItem` for compatibility
        const updatedId =
          typeof (service as any).patchItem === 'function'
            ? await (service as any).patchItem(data as T)
            : await service.updateItem(data as T);

        if (returnRepresentation) {
          const result = await service.getItem(updatedId);
          if (!result) {
            ResponseHelper.notFound(res, 'Item not found after update');
            return;
          }
          ResponseHelper.ok(res, result, serviceName);
          return;
        }
        ResponseHelper.noContent(res, serviceName);
      } catch (serviceError) {
        if (ResponseHelper.isNotFoundError(serviceError)) {
          ResponseHelper.notFound(res);
          return;
        }
        if (ResponseHelper.isValidationError(serviceError)) {
          ResponseHelper.badRequest(
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
      ResponseHelper.internalError(res, serviceName, error);
    }
  };
};

type PostOptions<T, TAdd> = {
  getService: () => {
    addItem: (data: TAdd) => Promise<number>;
    getItem: (id: number) => Promise<T | undefined>;
  };
  resourcePath: string;
  schema: z.ZodType<TAdd>;
  serviceName: string;
};

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
      const returnRepresentation = PreferHeaderHandler.wantsRepresentation(req);

      // Validate request body
      const validation = RequestValidator.validateBody(req, schema);
      if (!validation.isValid) {
        ResponseHelper.badRequest(res, validation.errorMessage!);
        return;
      }

      const data = validation.data!;
      Logger.info(`${serviceName}: Post Item called (create new)`);

      const service = getService();

      try {
        const newId = await service.addItem(data);

        if (returnRepresentation) {
          const newItem = await service.getItem(newId);
          if (!newItem) {
            ResponseHelper.internalError(
              res,
              serviceName,
              new Error('Failed to retrieve created item'),
            );
            return;
          }
          ResponseHelper.created(res, resourcePath, newId, newItem);
          return;
        }

        ResponseHelper.created(res, resourcePath, newId);
      } catch (serviceError) {
        if (ResponseHelper.isValidationError(serviceError)) {
          ResponseHelper.badRequest(
            res,
            serviceError instanceof Error
              ? serviceError.message
              : 'Validation error',
          );
          return;
        }
        if (ResponseHelper.isConflictError(serviceError)) {
          ResponseHelper.conflict(
            res,
            serviceError instanceof Error ? serviceError.message : 'Conflict',
          );
          return;
        }
        throw serviceError;
      }
    } catch (error) {
      ResponseHelper.internalError(res, serviceName, error);
    }
  };
};

type PutOptions<T, TAdd> = {
  getService: () => {
    addItem: (data: TAdd) => Promise<number>;
    getItem: (id: number) => Promise<T | undefined>;
  };
  resourcePath: string;
  schema: z.ZodType<TAdd>;
  serviceName: string;
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
      const returnRepresentation = PreferHeaderHandler.wantsRepresentation(req);

      // Validate request body
      const validation = RequestValidator.validateBody(req, schema);
      if (!validation.isValid) {
        ResponseHelper.badRequest(res, validation.errorMessage!);
        return;
      }

      const data = validation.data!;
      Logger.info(`${serviceName}: Put Item called`);

      const service = getService();
      const newId = await service.addItem(data);

      if (returnRepresentation) {
        const newItem = await service.getItem(newId);
        if (newItem) {
          ResponseHelper.ok(res, newItem, serviceName);
          return;
        }
        ResponseHelper.notFound(res, 'Created item not found');
        return;
      }

      ResponseHelper.created(res, resourcePath, newId);
    } catch (error) {
      ResponseHelper.internalError(res, serviceName, error);
    }
  };
};
