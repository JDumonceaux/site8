import { useCallback, useState } from 'react';
import { IPage } from '../api/models/page/IPage';
import axios from 'axios';
import { ServiceUrl } from '../../utils';

const usePage = () => {
  const [data, setData] = useState<IPage | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const dispatchFetchPage = useCallback((id: number) => {
    setIsLoading(true);
    setError(undefined);
    // responseType: default Json.  Options: arraybuffer, document, blob, text, or stream
    axios
      .get<IPage>(`${ServiceUrl.ENDPOINT_PAGE}/${id}`)
      .then(function (response) {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 404) {
          setError('Record not found');
        } else {
          setError('Unknown error');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    data: data,
    loading: isLoading,
    error,
    fetchData: dispatchFetchPage,
  };
};

export default usePage;
