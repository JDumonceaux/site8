import { useCallback, useState } from 'react';

import { apiClient } from '@lib/api';
import { useAsyncOperation } from '../useAsyncOperation';

type UseApiRequestReturn<T> = {
  data: null | T;
  error: Error | null;
  isLoading: boolean;
  patchData: (url: string, payload: unknown) => Promise<null | T>;
  putData: (url: string, payload: unknown) => Promise<null | T>;
};

export const useApiRequest = <T>(): UseApiRequestReturn<T> => {
  const [data, setData] = useState<null | T>(null);
  const { error, execute, isLoading } = useAsyncOperation<Error>();

  const patchData = useCallback(
    async (url: string, payload: unknown) => {
      const result = await execute(async () => {
        return apiClient.patch<T>(url, payload as Record<string, unknown>);
      });

      if (result != null) {
        setData(result);
        return result;
      }
      return null;
    },
    [execute],
  );

  const putData = useCallback(
    async (url: string, payload: unknown) => {
      const result = await execute(async () => {
        return apiClient.put<T>(url, payload as Record<string, unknown>);
      });

      if (result != null) {
        setData(result);
        return result;
      }
      return null;
    },
    [execute],
  );

  return { data, error, isLoading, patchData, putData };
};
