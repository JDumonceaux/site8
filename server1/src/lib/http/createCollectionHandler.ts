import type { Collection } from '../../types/Collection.js';

import { createGetHandler } from './genericHandlers.js';

type CollectionServiceGetter<T> = () => {
  getItems: () => Promise<Collection<T> | undefined>;
};

type SimpleCollectionHandlerConfig<T> = {
  /** Default title for metadata when no data exists */
  defaultTitle: string;
  /** Service getter function */
  getService: CollectionServiceGetter<T>;
  /** Handler name for logging */
  handlerName: string;
  /** Whether to return 204 when no items found (default: false) */
  return204OnEmpty?: boolean;
};

/**
 * Creates a simplified GET handler for Collection types.
 * Reduces boilerplate for the common pattern of fetching collections from services.
 *
 * @template T - The item type in the collection
 * @param config - Configuration for the handler
 * @returns Express request handler
 *
 * @example
 * ```typescript
 * export const getItems = createCollectionHandler<Test>({
 *   defaultTitle: 'Tests',
 *   getService: getTestsService,
 *   handlerName: 'Tests:getItems',
 *   return204OnEmpty: false
 * });
 * ```
 */
export const createCollectionHandler = <T>(
  config: SimpleCollectionHandlerConfig<T>,
) => {
  const defaultResponse: Collection<T> = {
    items: undefined,
    metadata: { title: config.defaultTitle },
  };

  return createGetHandler<Collection<T>>({
    errorResponse: defaultResponse,
    getData: async () => {
      const data = await config.getService().getItems();
      return data ?? defaultResponse;
    },
    getItemCount: (data) => data.items?.length ?? 0,
    handlerName: config.handlerName,
    return204OnEmpty: config.return204OnEmpty ?? false,
  });
};
