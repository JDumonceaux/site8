import type { Request, Response } from 'express';
import type { z } from 'zod';

import { PREFER_HEADER } from '../../utils/constants.js';
import { Logger } from '../../utils/logger.js';

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
          Logger.info(`${handlerName}: No items found`);
          res.sendStatus(204);
          return;
        }

        Logger.info(
          `${handlerName}: Successfully retrieved ${itemCount} items`,
        );
      } else {
        Logger.info(`${handlerName}: Successfully retrieved data`);
      }

      res.status(200).json(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      Logger.error(`${handlerName}: Failed to retrieve data`, {
        error: errorMessage,
      });

      res.status(500).json(errorResponse);
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
          Logger.warn(
            `${handlerName}: ${validation.errorMessage ?? 'Invalid parameters'}`,
          );
          res.status(400).json(errorResponse);
          return;
        }
      }

      Logger.info(`${handlerName}: Retrieving data`);

      const data = await getData(req);

      // Check for empty results if configured
      if (getItemCount && return204OnEmpty) {
        const itemCount = getItemCount(data);

        if (itemCount === 0) {
          Logger.info(`${handlerName}: No items found`);
          res.sendStatus(204);
          return;
        }

        Logger.info(
          `${handlerName}: Successfully retrieved ${itemCount} items`,
        );
      } else {
        Logger.info(`${handlerName}: Successfully retrieved data`);
      }

      res.status(200).json(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      Logger.error(`${handlerName}: Failed to retrieve data`, {
        error: errorMessage,
      });

      res.status(500).json(errorResponse);
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
      const { id } = req.params;
      const prefer = req.get('Prefer');
      const returnRepresentation = prefer === PREFER_HEADER.REPRESENTATION;

      if (!id) {
        res.status(400).json({ error: 'ID parameter is required' });
        return;
      }

      const requestData = { ...(req.body as Record<string, unknown>), id };
      const validationResult = schema.safeParse(requestData);

      if (!validationResult.success) {
        const errorMessage = validationResult.error.issues
          .map(
            (err: { message: string; path: PropertyKey[] }) =>
              `${err.path.join('.')}: ${err.message}`,
          )
          .join(', ');
        res.status(400).json({ error: `Validation error: ${errorMessage}` });
        return;
      }

      // Convert string IDs to numbers
      const data: Record<string, unknown> = {
        ...(validationResult.data as Record<string, unknown>),
      };
      for (const field of idFields) {
        if (data[field] && typeof data[field] === 'string') {
          const num = Number(data[field]);
          if (isNaN(num)) {
            res.status(400).json({ error: `${field} must be a valid number` });
            return;
          }
          data[field] = num;
        }
      }

      // Ensure ID consistency between URL and body
      const validatedData = validationResult.data as { id?: string };
      if (validatedData.id && validatedData.id !== id) {
        res
          .status(400)
          .json({ error: 'ID in request body must match ID in URL' });
        return;
      }

      Logger.info(`${serviceName}: Patch Item called for ID: ${id}`);

      const service = getService();

      try {
        const updatedId = await service.updateItem(data as T);

        if (returnRepresentation) {
          const result = await service.getItem(updatedId);
          if (!result) {
            res.status(404).json({ error: 'Item not found after update' });
            return;
          }
          res.status(200).json(result);
          return;
        }
        res.sendStatus(204);
      } catch (serviceError) {
        if (serviceError instanceof Error) {
          if (serviceError.message.includes('not found')) {
            res.status(404).json({ error: 'Item not found' });
            return;
          }
          if (serviceError.message.includes('validation')) {
            res.status(400).json({ error: serviceError.message });
            return;
          }
        }
        throw serviceError;
      }
    } catch (error) {
      Logger.error(`Error in ${serviceName} patchItem:`, error);
      res.sendStatus(500);
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
      const prefer = req.get('Prefer');
      const returnRepresentation = prefer === PREFER_HEADER.REPRESENTATION;

      const validationResult = schema.safeParse(req.body);
      if (!validationResult.success) {
        const errorMessage = validationResult.error.issues
          .map(
            (err: { message: string; path: PropertyKey[] }) =>
              `${err.path.join('.')}: ${err.message}`,
          )
          .join(', ');
        res.status(400).json({ error: `Validation error: ${errorMessage}` });
        return;
      }

      const { data } = validationResult;
      Logger.info(`${serviceName}: Post Item called (create new)`);

      const service = getService();

      try {
        const newId = await service.addItem(data);

        if (returnRepresentation) {
          const newItem = await service.getItem(newId);
          if (!newItem) {
            res.status(500).json({ error: 'Failed to retrieve created item' });
            return;
          }
          res.setHeader('Location', `${resourcePath}/${newId}`);
          res.status(201).json(newItem);
          return;
        }

        res.setHeader('Location', `${resourcePath}/${newId}`);
        res.status(201).send();
      } catch (serviceError) {
        if (serviceError instanceof Error) {
          if (serviceError.message.includes('validation')) {
            res.status(400).json({ error: serviceError.message });
            return;
          }
          if (
            serviceError.message.includes('duplicate') ||
            serviceError.message.includes('already exists')
          ) {
            res.status(409).json({ error: serviceError.message });
            return;
          }
        }
        throw serviceError;
      }
    } catch (error) {
      Logger.error(`${serviceName}: Post Item error:`, error);
      res.sendStatus(500);
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
      const prefer = req.get('Prefer');
      const returnRepresentation = prefer === PREFER_HEADER.REPRESENTATION;

      const validationResult = schema.safeParse(req.body);
      if (!validationResult.success) {
        const errorMessage = validationResult.error.issues
          .map(
            (err: { message: string; path: PropertyKey[] }) =>
              `${err.path.join('.')}: ${err.message}`,
          )
          .join(', ');
        res.status(400).json({ error: `Validation error: ${errorMessage}` });
        return;
      }

      const { data } = validationResult;
      Logger.info(`${serviceName}: Put Item called`);

      const service = getService();
      const newId = await service.addItem(data);

      if (returnRepresentation) {
        const newItem = await service.getItem(newId);
        if (newItem) {
          res.status(200).json(newItem);
          return;
        }
        res.status(404).json({ error: 'Created item not found' });
        return;
      }

      res.setHeader('Location', `${resourcePath}/${newId}`);
      res.status(201).send();
    } catch (error) {
      Logger.error(`${serviceName}: Put Item error:`, error);
      res.sendStatus(500);
    }
  };
};
