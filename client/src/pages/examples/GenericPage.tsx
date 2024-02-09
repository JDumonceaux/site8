import axios from 'axios';
import { Loading } from 'components/common/Loading/Loading';
import { useEffect, useState } from 'react';
import { IPage } from 'services/api/models/pages/IPage';
import { ServiceUrl } from 'utils';

interface IProps {
  id: number;
}

export default function GenericPage({ id }: IProps) {
  const [data, setData] = useState<IPage | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setIsLoading(true);
    setError(undefined);
    // responseType: default Json.  Options: arraybuffer, document, blob, text, or stream
    axios
      .get<IPage>(`${ServiceUrl.ENDPOINT_PAGE}/${id}`, {
        responseType: 'text',
      })
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
  }, [id]);

  return (
    <div className="generic-page" data-testid="GenericPage.root">
      <main className="main">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data ? data : '',
            }}
          />
        )}
      </main>

      <div className="right-column">
        <img src="./face.png" alt="" />
      </div>
    </div>
  );
}
