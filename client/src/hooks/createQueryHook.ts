import { USEQUERY_DEFAULT_OPTIONS } from '@lib/utils/constants';
import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';

/**
 * Configuration for creating a query hook
 */
export type QueryHookConfig<TData> = {
  /**
   * The endpoint URL to fetch from
   */
  endpoint: string;
  /**
   * The query key for caching
   */
  queryKey: readonly string[];
  /**
   * Optional additional query options to override defaults
   */
  queryOptions?: Partial<
    Omit<UseQueryOptions<TData>, 'queryFn' | 'queryKey'>
  >;
};

/**
 * Factory function to create consistent React Query hooks
 * Eliminates duplication across useMenu, useTravel, usePhotos, etc.
 *
 * @example
 * ```ts
 * const useMenu = createQueryHook<Menu>({
 *   endpoint: ServiceUrl.ENDPOINT_MENUS,
 *   queryKey: ['menu'],
 * });
 * ```
 */
export const createQueryHook = <TData>({
  endpoint,
  queryKey,
  queryOptions,
}: QueryHookConfig<TData>) => {
  return (signal?: AbortSignal): UseQueryResult<TData> => {
    const fetchData = async (): Promise<TData> => {
      const res = await fetch(endpoint, { signal });
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }
      return res.json() as Promise<TData>;
    };

    return useQuery<TData>({
      queryFn: fetchData,
      queryKey,
      ...USEQUERY_DEFAULT_OPTIONS,
      ...queryOptions,
    });
  };
};

/**
 * Factory function for query hooks with dynamic parameters
 * Useful when the endpoint or query key depends on runtime values
 *
 * @example
 * ```ts
 * const useArtistItems = createParameterizedQueryHook<ArtistItems, { artistId: number }>(
 *   ({ artistId }) => ({
 *     endpoint: ServiceUrl.ENDPOINT_ARTIST_ITEMS.replace('{0}', String(artistId)),
 *     queryKey: ['artistItems', artistId],
 *   })
 * );
 * ```
 */
export const createParameterizedQueryHook = <TData, TParams = undefined>(
  configFactory: (params: TParams) => QueryHookConfig<TData>,
) => {
  return (
    params: TParams,
    signal?: AbortSignal,
  ): UseQueryResult<TData> => {
    const config = configFactory(params);
    const hook = createQueryHook<TData>(config);
    return hook(signal);
  };
};
