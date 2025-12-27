import { useCallback, useState } from 'react';

type AsyncOperationState<TError = unknown> = {
  error: TError | null;
  isLoading: boolean;
};

type AsyncOperationOptions<TError = unknown> = {
  onError?: (error: TError) => void;
  onSuccess?: () => void;
};

type UseAsyncOperationReturn<TError = unknown> = {
  /**
   * Clear the error state
   */
  clearError: () => void;
  /**
   * Execute an async operation with automatic loading and error state management
   */
  execute: <T>(
    operation: () => Promise<T>,
    options?: AsyncOperationOptions<TError>,
  ) => Promise<T | undefined>;
  /**
   * Current error state
   */
  error: TError | null;
  /**
   * Whether an operation is currently in progress
   */
  isLoading: boolean;
};

/**
 * Generic hook for managing async operations with loading and error states
 *
 * This hook eliminates the repetitive pattern of:
 * - setError(null)
 * - setIsLoading(true)
 * - try/catch/finally blocks
 * - setIsLoading(false)
 *
 * @example
 * ```typescript
 * const { execute, isLoading, error } = useAsyncOperation();
 *
 * const handleSave = async () => {
 *   await execute(async () => {
 *     await saveData(formData);
 *   }, {
 *     onSuccess: () => console.log('Saved!'),
 *     onError: (err) => console.error('Failed:', err)
 *   });
 * };
 * ```
 */
export const useAsyncOperation = <
  TError = unknown,
>(): UseAsyncOperationReturn<TError> => {
  const [state, setState] = useState<AsyncOperationState<TError>>({
    error: null,
    isLoading: false,
  });

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const execute = useCallback(
    async <T>(
      operation: () => Promise<T>,
      options?: AsyncOperationOptions<TError>,
    ): Promise<T | undefined> => {
      setState({ error: null, isLoading: true });

      try {
        const result = await operation();
        options?.onSuccess?.();
        return result;
      } catch (error) {
        const typedError = error as TError;
        setState({ error: typedError, isLoading: false });
        options?.onError?.(typedError);
        return undefined;
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [],
  );

  return {
    clearError,
    error: state.error,
    execute,
    isLoading: state.isLoading,
  };
};
