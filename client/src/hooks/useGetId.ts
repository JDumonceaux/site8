import { useId } from 'react';

/**
 * Returns a stable ID: uses the provided `id` if given,
 * otherwise generates one via React's `useId`.
 */
const useGetId = (id?: string): string => {
  const fallbackId = useId();
  return id ?? fallbackId;
};

export type UseGetId = typeof useGetId;
export default useGetId;
