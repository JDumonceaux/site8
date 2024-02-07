import axios from 'axios';
import { useState } from 'react';
import { httpErrorHandler } from '../../utils/errorHandler';

const usePost = <T>(url: string) => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

    const postDataAsync = async (data: T) => {
      setLoading(true);
      setData(undefined);
      setError(undefined);
    
      await axios
        .post(url, data)
        .then((response) => {
          response.data && setData(response.data);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
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

  return {
    data,
    loading,
    error,
    postData: postDataAsync
  };
};

export default usePost;
