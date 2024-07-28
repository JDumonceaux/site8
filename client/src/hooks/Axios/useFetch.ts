// 07-2024 Subset imports not supported by Axios
import axios, { isCancel } from 'axios';
import { AcceptHeader } from 'lib/utils/constants';
import { httpErrorHandler } from 'lib/utils/errorHandler';
import { useEffect, useRef, useState } from 'react';

export const useFetch = <T>() => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Private function to fetch data
  const fetchDataAsync = async (url: string) => {
    setData(undefined);
    setError(undefined);

    // Abort Controller is recommended for cancelling fetch requests
    // and avoiding memory leaks and race conditions.
    // Race conditions happen most often with paging - where the user
    // requests page 1, 2, etc. and the data for page 1 arrives after
    // the data for page 2. This can lead to the UI displaying the wrong
    // data for a brief moment.
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setIsLoading(true);

    try {
      const response = await axios.get<T>(url, {
        responseType: 'json',
        headers: { Accept: AcceptHeader.JSON },
        signal: abortControllerRef.current.signal,
      });
      setData(response.data);
    } catch (err) {
      if (isCancel(err)) {
        console.log('Request was cancelled');
        return;
      }
      setError(httpErrorHandler(err));
    } finally {
      setIsLoading(false);
    }
  };

  // Clean up if component unmounts
  useEffect(() => {
    const controller = abortControllerRef.current;
    return () => {
      controller?.abort();
    };
  }, []);

  const clearData = () => {
    setData(undefined);
    setError(undefined);
  };

  const fetchData = (url: string) => {
    fetchDataAsync(url);
  };

  return {
    data,
    isLoading,
    error,
    fetchData,
    clearData,
  };
};
