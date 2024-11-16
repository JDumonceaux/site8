import { useCallback, useRef, useState } from 'react';

import axios, { isCancel } from 'axios';
import { AcceptHeader, PreferHeader } from 'lib/utils/constants';
import { httpErrorHandler } from 'lib/utils/errorHandler';

const useServerApi = <T>() => {
  const [data, setData] = useState<null | T>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>();
  const abortControllerRef = useRef<AbortController | null>(null);

  const reset = () => {
    setData(null);
    setIsLoading(true);
    setError(null);
  };

  const fetchDataAsync = useCallback(async (url: string) => {
    reset();
    abortControllerRef.current = new AbortController();
    try {
      const response = await axios.get<T>(url, {
        signal: abortControllerRef.current.signal,
      });
      setData(response.data);
    } catch (error_) {
      // Ignore cancelation errors
      if (!isCancel(error_)) {
        if (error_ instanceof Error) {
          setError(error_.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cleanup = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  const postDataAsync = useCallback(async (url: string, item: T) => {
    try {
      reset();
      const response = await axios.post<T>(url, item, {
        headers: {
          Accept: AcceptHeader.JSON,
          Prefer: PreferHeader.REPRESENTATION,
        },
        responseType: 'json',
      });
      setData(response.data);
      return true;
    } catch (error_) {
      if (!isCancel(error_)) {
        setError(httpErrorHandler(error_));
      }
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
      if (!isCancel(error_)) {
        setError(httpErrorHandler(error_));
      }
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
      if (!isCancel(error_)) {
        setError(httpErrorHandler(error_));
      }
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
    postData: postDataAsync,
  };
};

export default useServerApi;
