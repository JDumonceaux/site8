import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const source = axios.CancelToken.source(); // Create a cancel token
    setLoading(true);

    const fetchDataAsync = async () => {
      try {
        const response = await axios.get<T>(url, {
          cancelToken: source.token,
        });
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          setError('Error');
        }
      } finally {
        setLoading(false);
      }
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
