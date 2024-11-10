import axios, { isCancel } from 'axios';
import { AcceptHeader, PreferHeader } from '../lib/utils/constants';
import { httpErrorHandler } from '../lib/utils/errorHandler';
import { useCallback, useState } from 'react';

export const useAxios = <T>() => {
  const [data, setData] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

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
        headers: { Accept: AcceptHeader.JSON },
        responseType: 'json',
      });

      setData(response.data);
      return true;
    } catch (error) {
      setError(httpErrorHandler(error));
    } finally {
      setIsLoading(false);
    }
    return false;
  }, []);

  const postDataAsync = async (url: string, data: T) => {
    setData(undefined);
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await axios.post<T>(url, data, {
        headers: {
          Accept: AcceptHeader.JSON,
          Prefer: PreferHeader.REPRESENTATION,
        },
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

  const patchDataAsync = async (url: string, data: T) => {
    setData(undefined);
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await axios.patch<T>(url, data, {
        headers: {
          Accept: AcceptHeader.JSON,
          Prefer: PreferHeader.REPRESENTATION,
        },
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
    deleteData: deleteDataAsync,
    error,
    fetchData: fetchDataAsync,
    isLoading,
    patchData: patchDataAsync,
    postData: postDataAsync,
  };
};
