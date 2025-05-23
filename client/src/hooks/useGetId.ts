import { useId, useMemo } from 'react';

/**
 * Returns a stable ID: uses the provided `id` if given,
 * otherwise generates one via React's `useId`.
 *
 * @param id Optional external ID
 * @returns A string ID that is stable across renders
 */
const useGetId = (id?: string): string => {
  const fallbackId = useId();
  return useMemo(() => id ?? fallbackId, [id, fallbackId]);
};

export type UseGetId = typeof useGetId;
export default useGetId;
