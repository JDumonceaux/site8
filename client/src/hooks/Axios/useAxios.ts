import { useEffect, useState } from 'react';
import axios, { isCancel } from 'axios';
import { httpErrorHandler } from 'utils/errorHandler';
import { AcceptHeader, PreferHeader } from 'utils';

export const useAxios = <T>(url?: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  // Private function to fetch data
  const fetchDataAsync = async (url: string) => {
    setData(null);
    setIsLoading(true);
    setError(undefined);

    const controller = AbortSignal.timeout(5000);
    try {
      const response = await axios.get<T>(url, {
        signal: controller,
        responseType: 'json',
        headers: { Accept: AcceptHeader.JSON },
      });
      return response.data;
    } catch (error) {
      if (isCancel(error)) {
        // console.log(REQUEST_CANCELLED, error.message);
      } else {
        setError(httpErrorHandler(error));
      }
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  const postDataAsync = async (url: string, data: T) => {
    setData(null);
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
      return response.data;
    } catch (error) {
      if (isCancel(error)) {
        // console.log(REQUEST_CANCELLED, error.message);
      } else {
        setError(httpErrorHandler(error));
      }
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  const patchDataAsync = async (url: string, data: T) => {
    setData(null);
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
      return response.data;
    } catch (error) {
      if (isCancel(error)) {
        // console.log(REQUEST_CANCELLED, error.message);
      } else {
        setError(httpErrorHandler(error));
      }
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  const deleteDataAsync = async (url: string) => {
    setIsLoading(true);
    setData(null);
    setError(undefined);

    try {
      const response = await axios.delete<T>(url, {
        responseType: 'json',
      });
      return response.data;
    } catch (error) {
      if (isCancel(error)) {
        // console.log(REQUEST_CANCELLED, error.message);
      } else {
        setError(httpErrorHandler(error));
      }
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  useEffect(() => {
    if (!url || url.length === 0) {
      return;
    }
    fetchData(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const fetchData = async (url: string) => {
    const result = await fetchDataAsync(url);
    setData(result);
  };

  const patchData = async (url: string, data: T) => {
    const result = await patchDataAsync(url, data);
    setData(result);
  };

  const postData = async (url: string, data: T) => {
    const result = await postDataAsync(url, data);
    setData(result);
  };

  const deleteData = async (url: string) => {
    const result = await deleteDataAsync(url);
    setData(result);
  };

  return {
    data,
    isLoading,
    error,
    fetchData,
    postData,
    patchData,
    deleteData,
  };
};
