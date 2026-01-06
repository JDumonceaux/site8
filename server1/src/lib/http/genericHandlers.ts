import type { Request, Response } from 'express';
import type { ZodType } from 'zod';

import { Logger } from '../../utils/logger.js';

import { wantsRepresentation } from './PreferHeaderHandler.js';
import { convertIdsToNumbers, validateBody } from './RequestValidator.js';
import {
  badRequest,
  conflict,
  created,
  internalError,
  isConflictError,
  isNotFoundError,
  isValidationError,
  noContent,
  notFound,
  ok,
} from './ResponseHelper.js';

/**
 * Base service interface for CRUD operations
 */
type CrudService<T, TAdd = T> = {
  addItem: (data: TAdd) => Promise<number>;
  deleteItem: (id: number) => Promise<T | undefined>;
  getItem: (id: number) => Promise<T | undefined>;
  patchItem?: (data: T) => Promise<number>;
  updateItem: (data: T) => Promise<number>;
};

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
  getService: () => Partial<CrudService<T>>;
  idFields?: string[];
  schema: ZodType<T>;
  serviceName: string;
};

type DeleteOptions<T> = {
  getService: () => Pick<CrudService<T>, 'deleteItem'>;
  returnDeleted?: boolean;
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

      // Check for empty results if configured
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

      // Validate request body (ID should be in body, not URL)
      const validation = validateBody(req, schema);
      if (!validation.isValid) {
        badRequest(res, validation.errorMessage ?? 'Invalid request body');
        return;
      }

      const validatedData = validation.data as Record<string, unknown>;

      // Convert string IDs to numbers
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

      // Validate ID exists in body
      const id = typeof data.id === 'number' ? data.id : undefined;
      if (!id) {
        badRequest(res, 'ID is required in request body');
        return;
      }

      Logger.info(`${serviceName}: Patch Item called for ID: ${id}`);

      const service = getService();

      try {
        // Prefer `patchItem` when available on the service, fall back to `updateItem` for compatibility
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

type PostOptions<T, TAdd> = {
  getService: () => Pick<CrudService<T, TAdd>, 'addItem' | 'getItem'>;
  resourcePath: string;
  schema: ZodType<TAdd>;
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
      const returnRepresentation = wantsRepresentation(req);

      // Validate request body
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

type PutOptions<T, TAdd> = PostOptions<T, TAdd>;

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

      // Validate request body
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

/**
 * Creates a generic DELETE handler for Express routes
 * @template T - The resource type
 * @param config - Configuration for the handler
 * @returns Express request handler
 *
 * @example
 * ```typescript
 * export const deleteItem = createDeleteHandler<Image>({
 *   getService: getImageService,
 *   serviceName: 'Image',
 *   returnDeleted: true,
 * });
 * ```
 */
export const createDeleteHandler = <T>({
  getService,
  returnDeleted = false,
  serviceName,
}: DeleteOptions<T>) => {
  return async (
    req: Request,
    res: Response<T | { error: string }>,
  ): Promise<void> => {
    try {
      // Safely extract id from request body
      const id =
        req.body && typeof req.body === 'object'
          ? (req.body as Record<string, unknown>).id
          : undefined;

      if (!id) {
        badRequest(res, 'Invalid ID');
        return;
      }

      // Parse and validate ID
      const idNum = Number(id);
      if (Number.isNaN(idNum) || idNum <= 0) {
        badRequest(res, 'Invalid ID');
        return;
      }

      Logger.info(`${serviceName}: Delete Item called: ${idNum}`);

      const service = getService();
      const deletedItem = await service.deleteItem(idNum);

      if (!deletedItem) {
        notFound(res, 'Item not found');
        return;
      }

      if (returnDeleted) {
        ok(res, deletedItem, serviceName);
      } else {
        noContent(res, serviceName);
      }
    } catch (error) {
      internalError(res, serviceName, error);
    }
  };
};
