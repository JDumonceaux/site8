import axios, { isCancel } from 'axios';
import { useState } from 'react';
import { httpErrorHandler } from '../../utils/errorHandler';

const REQUEST_CANCELLED = 'Request canceled';

const usePost = <T>() => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const patchDataAsync = async (url: string, data: T) => {
    setLoading(true);
    setData(undefined);
    setError(undefined);

    await axios
      .patch(url, data)
      .then((response) => {
        // eslint-disable-next-line promise/always-return
        response.data && setData(response.data);
      })
      .catch((error) => {
        if (isCancel(error)) {
          console.log(REQUEST_CANCELLED, error.message);
        } else {
          console.log('error', error);
          setError(httpErrorHandler(error));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const postDataAsync = async (url: string, data: T) => {
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
          console.log(REQUEST_CANCELLED, error.message);
        } else {
          console.log('error', error);
          setError(httpErrorHandler(error));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteDataAsync = async (url: string) => {
    setLoading(true);
    setData(undefined);
    setError(undefined);

    await axios
      .delete(url)
      .then((response) => {
        // eslint-disable-next-line promise/always-return
        response.data && setData(response.data);
      })
      .catch((error) => {
        if (isCancel(error)) {
          console.log(REQUEST_CANCELLED, error.message);
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
    deleteData: deleteDataAsync,
    postData: postDataAsync,
    patchData: patchDataAsync,
  };
};

export default usePost;
