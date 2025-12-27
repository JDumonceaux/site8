import { useId } from 'react';

/**
 * Custom hook for generating stable component IDs
 *
 * Returns the provided ID if given, otherwise generates a unique ID
 * using React's useId hook. Useful for accessibility attributes.
 *
 * @param id - Optional custom ID
 * @returns A stable ID string
 *
 * @example
 * ```typescript
 * const id = useGetId(props.id);
 * return <input id={id} aria-describedby={`${id}-error`} />;
 * ```
 */
const useGetId = (id?: string): string => {
  const fallbackId = useId();
  return id ?? fallbackId;
};

export type UseGetId = typeof useGetId;
export default useGetId;
