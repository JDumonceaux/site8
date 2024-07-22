import axios from 'axios';
import { useState } from 'react';
import { Page } from 'types';
import { AcceptHeader, ServiceUrl } from 'utils/constants';

const [data, setData] = useState<Page | undefined | null>(undefined);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | undefined>(undefined);

const reset = () => {
  setData(undefined);
  setIsLoading(false);
  setError(undefined);
};

export const useFetchPage = async (id: number) => {
  reset();
  setIsLoading(true);
  await axios
    .get<Page>(`${ServiceUrl.ENDPOINT_PAGE}/${id.toString()}`, {
      responseType: 'json',
      headers: { Accept: AcceptHeader.JSON },
    })
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      setError(err.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
  return { data, isLoading, error };
};
