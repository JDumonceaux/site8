import { useCallback } from 'react';

import type { AuthState } from './useAuthState';

type UseAuthAsyncReturn = {
  /**
   * Execute an async auth operation with automatic state management
   */
  executeAuthOperation: <T>(
    operation: () => Promise<T>,
  ) => Promise<T | undefined>;
};

/**
 * Specialized async operation hook for authentication flows
 * Manages loading state and error handling via authState.
 */
export const useAuthAsync = (authState: AuthState): UseAuthAsyncReturn => {
  const { clearError, handleError, setIsLoading } = authState;

  const executeAuthOperation = useCallback(
    async <T>(operation: () => Promise<T>): Promise<T | undefined> => {
      clearError();
      setIsLoading(true);
      try {
        const result = await operation();
        return result;
      } catch (error) {
        handleError(error);
        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [clearError, handleError, setIsLoading],
  );

  return {
    executeAuthOperation,
  };
};
