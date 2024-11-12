import { useCallback, useState } from 'react';

import axios, { isCancel } from 'axios';
import { AcceptHeader, PreferHeader } from 'lib/utils/constants';
import { httpErrorHandler } from 'lib/utils/errorHandler';

export const useAxios = <T>() => {
  const [data, setData] = useState<null | T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>();

  const reset = () => {
    setData(null);
    setIsLoading(true);
    setError(null);
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
    } catch (error_) {
      setError(httpErrorHandler(error_));
    } finally {
      setIsLoading(false);
    }
    return false;
  }, []);

  const postDataAsync = async (url: string, item: T) => {
    setData(null);
    setIsLoading(true);
    setError(null);

    try {
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
      if (isCancel(error_)) {
        // console.log(REQUEST_CANCELLED, error.message);
      } else {
        setError(httpErrorHandler(error_));
      }
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  const patchDataAsync = async (url: string, item: T) => {
    setData(null);
    setIsLoading(true);
    setError(null);

    try {
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
      if (isCancel(error_)) {
        // console.log(REQUEST_CANCELLED, error.message);
      } else {
        setError(httpErrorHandler(error_));
      }
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  const deleteDataAsync = async (url: string) => {
    setIsLoading(true);
    setData(null);
    setError(null);

    try {
      const response = await axios.delete<T>(url, {
        responseType: 'json',
      });
      setData(response.data);
      return true;
    } catch (error_) {
      if (isCancel(error_)) {
        // console.log(REQUEST_CANCELLED, error.message);
      } else {
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
    postData: postDataAsync,
  };
};
