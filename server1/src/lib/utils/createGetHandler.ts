import type { Request, Response } from 'express';

import { Logger } from './logger.js';

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
    isValid: boolean;
    errorMessage?: string;
  };
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
