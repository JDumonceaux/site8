import axios, { isCancel } from 'axios';
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

  return {
    data,
    loading,
    error,
    postData: postDataAsync,
  };
};

export default usePost;
