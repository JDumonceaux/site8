import axios, { isCancel } from 'axios';
import { useState } from 'react';
import { httpErrorHandler } from '../../utils/errorHandler';
import { AcceptHeader } from 'utils';

const REQUEST_CANCELLED = 'Request canceled';

export const useAxiosHelper = <T>() => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  // eslint-disable-next-line import/no-named-as-default-member
  const source = axios.CancelToken.source(); // Create a cancel token

  const fetchDataAsync = async ({
    url,
    accept = AcceptHeader.JSON,
  }: {
    url: string;
    accept?: AcceptHeader;
  }) => {
    await axios
      .get<T>(url, {
        cancelToken: source.token,
        headers: { Accept: accept },
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

  const patchDataAsync = async ({
    url,
    data,
    accept = AcceptHeader.JSON,
  }: {
    url: string;
    data: T;
    accept?: AcceptHeader;
  }) => {
    setIsLoading(true);
    setData(undefined);
    setError(undefined);

    await axios
      .patch<T>(url, data, {
        headers: { Accept: accept, Prefer: `return=representation` },
      })
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
        setIsLoading(false);
      });
  };

  const postDataAsync = async ({
    url,
    data,
    accept = AcceptHeader.JSON,
  }: {
    url: string;
    data: T;
    accept?: AcceptHeader;
  }) => {
    setIsLoading(true);
    setData(undefined);
    setError(undefined);

    await axios
      .post<T>(url, data, {
        headers: { Accept: accept, Prefer: `return=representation` },
      })
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
        setIsLoading(false);
      });
  };

  const deleteDataAsync = async (url: string) => {
    setIsLoading(true);
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
        setIsLoading(false);
      });
  };

  return {
    data,
    isLoading,
    error,
    fetchData: fetchDataAsync,
    deleteData: deleteDataAsync,
    postData: postDataAsync,
    patchData: patchDataAsync,
  };
};
