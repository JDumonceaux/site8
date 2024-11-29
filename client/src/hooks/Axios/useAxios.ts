import { useEffect, useRef, useState } from 'react';

import axios, { isCancel } from 'axios';
import { AcceptHeader, PreferHeader } from 'lib/utils/constants';
import { httpErrorHandler } from 'lib/utils/errorHandler';

export const useAxios = <T>() => {
  const [data, setData] = useState<null | T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>();
  // Abort Controller is recommended for cancelling fetch requests
  // and avoiding memory leaks and race conditions.
  // Race conditions happen most often with paging - where the user
  // requests page 1, 2, etc. and the data for page 1 arrives after
  // the data for page 2. This can lead to the UI displaying the wrong
  // data for a brief moment.
  const abortControllerRef = useRef<AbortController | null>(null);

  const reset = () => {
    setData(null);
    setIsLoading(true);
    setError(null);
  };

  const fetchData = async (url: string) => {
    try {
      reset();
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      const ret = await axios.get<T>(url, {
        headers: { Accept: AcceptHeader.JSON },
        responseType: 'json',
        signal: abortControllerRef.current.signal,
      });
      return ret.data;
    } catch (error_: unknown) {
      if (!isCancel(error_)) {
        setError(httpErrorHandler(error_));
      }
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  // Clean up if component unmounts
  useEffect(() => {
    const controller = abortControllerRef.current;
    return () => {
      controller?.abort();
    };
  }, []);

  const fetchDataAsync = async (url: string) => {
    try {
      reset();
      const ret = await fetchData(url);
      setData(ret);
    } catch (error_) {
      if (!isCancel(error_)) {
        setError(httpErrorHandler(error_));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const putDataAsync = async (url: string, item: T) => {
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
      if (!isCancel(error_)) {
        setError(httpErrorHandler(error_));
      }
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  const patchDataAsync = async (url: string, item: T) => {
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
  };

  const deleteDataAsync = async (url: string) => {
    try {
      reset();
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
  };

  return {
    data,
    deleteData: deleteDataAsync,
    error,
    fetchData: fetchDataAsync,
    isLoading,
    patchData: patchDataAsync,
    putData: putDataAsync,
  };
};
