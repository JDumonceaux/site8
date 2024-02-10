import axios, { isCancel } from 'axios';
import { useEffect, useState } from 'react';
import { httpErrorHandler } from '../../utils/errorHandler';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
    setData(undefined);
    setError(undefined);
    // eslint-disable-next-line import/no-named-as-default-member
    const source = axios.CancelToken.source(); // Create a cancel token

    const fetchDataAsync = async () => {
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
          setLoading(false);
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
    loading,
    error,
  };
};

export default useFetch;
