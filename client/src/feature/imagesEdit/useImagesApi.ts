import { useRef, useState } from 'react';
import axios, { isCancel } from 'axios';
import { ServiceUrl } from 'lib/utils/constants';

const useImagesApi = <T>() => {
  const [data, setData] = useState<null | T>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>();
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = async (url: string) => {
    setIsLoading(true);
    setError(null);
    abortControllerRef.current = new AbortController();
    try {
      const response = await axios.get<T>(url, {
        // Important: current could be null - use ?
        signal: abortControllerRef.current?.signal,
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
  };

  const cleanup = () => {
    abortControllerRef.current?.abort();
  };

  return {
    data,
    error,
    isLoading,
    fetchData,
    cleanup,
  };
};

export default useImagesApi;
