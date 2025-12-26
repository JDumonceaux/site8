import { useCallback, useState } from 'react';

type UseAxiosReturn<T> = {
  data: null | T;
  error: Error | null;
  isLoading: boolean;
  patchData: (url: string, payload: unknown) => Promise<null | T>;
  putData: (url: string, payload: unknown) => Promise<null | T>;
};

export const useAxios = <T>(): UseAxiosReturn<T> => {
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const patchData = useCallback(async (url: string, payload: unknown) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        method: 'PATCH',
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const result = (await response.json()) as T;
      setData(result);
      return result;
    } catch (error_) {
      const error =
        error_ instanceof Error ? error_ : new Error('Unknown error');
      setError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const putData = useCallback(async (url: string, payload: unknown) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const result = (await response.json()) as T;
      setData(result);
      return result;
    } catch (error_) {
      const error =
        error_ instanceof Error ? error_ : new Error('Unknown error');
      setError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, error, isLoading, patchData, putData };
};
