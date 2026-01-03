import { useEffectEvent, useState } from 'react';

import { useAsyncOperation } from '../useAsyncOperation';

type UseAxiosReturn<T> = {
  data: null | T;
  error: Error | null;
  isLoading: boolean;
  patchData: (url: string, payload: unknown) => Promise<null | T>;
  putData: (url: string, payload: unknown) => Promise<null | T>;
};

export const useAxios = <T>(): UseAxiosReturn<T> => {
  const [data, setData] = useState<null | T>(null);
  const { error, execute, isLoading } = useAsyncOperation<Error>();

  const patchData = useEffectEvent(async (url: string, payload: unknown) => {
    const result = await execute(async () => {
      const response = await fetch(url, {
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        method: 'PATCH',
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return (await response.json()) as T;
    });

    if (result != null) {
      setData(result);
      return result;
    }
    return null;
  });

  const putData = useEffectEvent(async (url: string, payload: unknown) => {
    const result = await execute(async () => {
      const response = await fetch(url, {
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return (await response.json()) as T;
    });

    if (result != null) {
      setData(result);
      return result;
    }
    return null;
  });

  return { data, error, isLoading, patchData, putData };
};
