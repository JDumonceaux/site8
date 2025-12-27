import { useCallback } from 'react';

import { useAsyncOperation } from '../../hooks/useAsyncOperation';
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
 * Handles loading state, error management, and error clearing
 */
export const useAuthAsync = (authState: AuthState): UseAuthAsyncReturn => {
  const { clearError, handleError, setIsLoading } = authState;
  const { execute } = useAsyncOperation();

  const executeAuthOperation = useCallback(
    async <T>(operation: () => Promise<T>): Promise<T | undefined> => {
      clearError();
      setIsLoading(true);

      const result = await execute(operation, {
        onError: (error) => {
          handleError(error);
          setIsLoading(false);
        },
      });

      setIsLoading(false);
      return result;
    },
    [clearError, execute, handleError, setIsLoading],
  );

  return {
    executeAuthOperation,
  };
};
