import axios, { isCancel } from 'axios';
import { useCallback, useState } from 'react';
import { AcceptHeader, PreferHeader } from 'utils';
import { httpErrorHandler } from 'utils/errorHandler';

export const useAxios = <T>() => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const reset = () => {
    setData(undefined);
    setIsLoading(true);
    setError(undefined);
  };

  // Private function to fetch data
  const fetchDataAsync = useCallback(async (url: string) => {
    try {
      reset();
      const response = await axios.get<T>(url, {
        responseType: 'json',
        headers: { Accept: AcceptHeader.JSON },
      });

      setData(response.data);
      return Promise.resolve(true);
    } catch (error) {
      setError(httpErrorHandler(error));
    } finally {
      setIsLoading(false);
    }
    return Promise.resolve(false);
  }, []);

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
      setData(response.data);
      return true;
    } catch (error) {
      if (isCancel(error)) {
        // console.log(REQUEST_CANCELLED, error.message);
      } else {
        setError(httpErrorHandler(error));
      }
    } finally {
      setIsLoading(false);
    }
    return false;
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
      setData(response.data);
      return true;
    } catch (error) {
      if (isCancel(error)) {
        // console.log(REQUEST_CANCELLED, error.message);
      } else {
        setError(httpErrorHandler(error));
      }
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  const deleteDataAsync = async (url: string) => {
    setIsLoading(true);
    setData(undefined);
    setError(undefined);

    try {
      const response = await axios.delete<T>(url, {
        responseType: 'json',
      });
      setData(response.data);
      return true;
    } catch (error) {
      if (isCancel(error)) {
        // console.log(REQUEST_CANCELLED, error.message);
      } else {
        setError(httpErrorHandler(error));
      }
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  return {
    data,
    isLoading,
    error,
    fetchData: fetchDataAsync,
    postData: postDataAsync,
    patchData: patchDataAsync,
    deleteData: deleteDataAsync,
  };
};
