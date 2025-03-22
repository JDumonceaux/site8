import { useCallback, useRef, useState } from 'react';

import axios from 'axios';
import { AcceptHeader, PreferHeader } from 'lib/utils/constants';
import { httpErrorHandler } from 'lib/utils/errorHandler';

const useServerApi = <T>() => {
  const [data, setData] = useState<null | T>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>();
  const abortControllerRef = useRef<AbortController | null>(null);

  const reset = () => {
    setData(null);
    setIsLoading(false);
    setError(null);
  };

  const fetchDataAsync = useCallback(async (url: string) => {
    reset();
    abortControllerRef.current = new AbortController();
    try {
      const response = await axios.get<T>(url, {
        signal: AbortSignal.timeout(5000),
      });
      setData(response.data);
    } catch (error_) {
      setError(httpErrorHandler(error_));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cleanup = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  const putDataAsync = useCallback(async (url: string, item: T) => {
    try {
      reset();
      const response = await axios.put<T>(url, item, {
        headers: {
          Accept: AcceptHeader.JSON,
          Prefer: PreferHeader.REPRESENTATION,
        },
        responseType: 'json',
      });
      setData(response.data);
      return true;
    } catch (error_) {
      setError(httpErrorHandler(error_));
    } finally {
      setIsLoading(false);
    }
    return false;
  }, []);

  const patchDataAsync = useCallback(async (url: string, item: T) => {
    try {
      reset();
      const response = await axios.patch<T>(url, item, {
        headers: {
          Accept: AcceptHeader.JSON,
          Prefer: PreferHeader.REPRESENTATION,
        },
        responseType: 'json',
      });
      setData(response.data);
      return true;
    } catch (error_) {
      setError(httpErrorHandler(error_));
    } finally {
      setIsLoading(false);
    }
    return false;
  }, []);

  const deleteDataAsync = useCallback(async (url: string) => {
    try {
      const response = await axios.delete<T>(url, {
        responseType: 'json',
      });
      setData(response.data);
      return true;
    } catch (error_) {
      setError(httpErrorHandler(error_));
    } finally {
      setIsLoading(false);
    }
    return false;
  }, []);

  return {
    cleanup,
    data,
    deleteData: deleteDataAsync,
    error,
    fetchData: fetchDataAsync,
    isLoading,
    patchData: patchDataAsync,
    putData: putDataAsync,
  };
};

export default useServerApi;
