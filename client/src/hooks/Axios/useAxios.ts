import { useEffect, useState } from 'react';
import axios, { isCancel } from 'axios';
import { httpErrorHandler } from 'utils/errorHandler';
import { AcceptHeader, PreferHeader } from 'utils';

export const useAxios = <T>(url?: string) => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  // Private function to fetch data
  const fetchDataAsync = async (url: string) => {
    setData(undefined);
    setIsLoading(true);
    setError(undefined);

    const controller = AbortSignal.timeout(5000);
    try {
      const response = await axios.get<T>(url, {
        signal: controller,
        responseType: 'json',
        headers: { Accept: AcceptHeader.JSON },
      });
      const res = await response.data;
      setData(res);
    } catch (error) {
      if (isCancel(error)) {
        // console.log(REQUEST_CANCELLED, error.message);
      } else {
        setError(httpErrorHandler(error));
      }
    } finally {
      setIsLoading(false);
    }
    return undefined;
  };

  const postDataAsync = async (url: string, data: T) => {
    setData(undefined);
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await axios.post<T>(url, data, {
        responseType: 'json',
        headers: {
          Prefer: PreferHeader.REPRESENTATION,
          Accept: AcceptHeader.JSON,
        },
      });
      const res = await response.data;
      setData(res);
    } catch (error) {
      if (isCancel(error)) {
        // console.log(REQUEST_CANCELLED, error.message);
      } else {
        setError(httpErrorHandler(error));
      }
    } finally {
      setIsLoading(false);
    }
    return undefined;
  };

  const patchDataAsync = async (url: string, data: T) => {
    setData(undefined);
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await axios.patch<T>(url, data, {
        responseType: 'json',
        headers: {
          Prefer: PreferHeader.REPRESENTATION,
          Accept: AcceptHeader.JSON,
        },
      });
      const res = await response.data;
      setData(res);
    } catch (error) {
      if (isCancel(error)) {
        // console.log(REQUEST_CANCELLED, error.message);
      } else {
        setError(httpErrorHandler(error));
      }
    } finally {
      setIsLoading(false);
    }
    return undefined;
  };

  const deleteDataAsync = async (url: string) => {
    setIsLoading(true);
    setData(undefined);
    setError(undefined);

    try {
      const response = await axios.delete<T>(url, {
        responseType: 'json',
      });
      const res = await response.data;
      setData(res);
    } catch (error) {
      if (isCancel(error)) {
        // console.log(REQUEST_CANCELLED, error.message);
      } else {
        setError(httpErrorHandler(error));
      }
    } finally {
      setIsLoading(false);
    }
    return undefined;
  };

  useEffect(() => {
    if (!url || url.length === 0) {
      return;
    }
    fetchDataAsync(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return {
    data,
    isLoading,
    error,
    fetchDat: fetchDataAsync,
    postData: postDataAsync,
    patchData: patchDataAsync,
    deleteData: deleteDataAsync,
  };
};
