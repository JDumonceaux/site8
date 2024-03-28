import axios, { isCancel } from 'axios';
import { useEffect, useState } from 'react';
import { httpErrorHandler } from '../../utils/errorHandler';

const useFetch = <T>(url: string | undefined) => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setIsLoading(true);
    setData(undefined);
    setError(undefined);
    // eslint-disable-next-line import/no-named-as-default-member
    const source = axios.CancelToken.source(); // Create a cancel token

    const fetchDataAsync = async () => {
      if (!url) {
        setIsLoading(false);
        return;
      }
      await axios
        .get<T>(url, {
          cancelToken: source.token,
        })
        .then((response) => {
          // eslint-disable-next-line promise/always-return
          response.data && setData(response.data);
        })
        .catch((error) => {
          if (isCancel(error)) {
            console.log('Request canceled', error.message);
          } else {
            console.log('error', error);
            setError(httpErrorHandler(error));
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchDataAsync();

    // Return a cleanup function directly from useEffect
    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, [url]); // Add url as a dependency

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetch;
