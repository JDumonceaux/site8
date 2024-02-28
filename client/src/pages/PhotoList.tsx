import { LoadingWrapper } from 'components/common/Loading';
import { PageTitle } from 'components/common/PageTitle';
import { Meta } from 'components/common/Meta';

import { useDeferredValue, useEffect } from 'react';
import usePhotos from 'services/hooks/usePhotos';
import { APP_NAME } from 'utils/constants';

export const PhotoList = (): JSX.Element => {
  const title = 'Photos';
  const { data, loading, error, fetchData } = usePhotos();
  const deferredData = useDeferredValue(data);

  useEffect(() => {
    document.title = `${APP_NAME} - ${title}`;
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Meta title={title} />
      <main>
        <PageTitle title={title} />
        <section>
          <LoadingWrapper error={error} isLoading={loading}>
            <ul>
              {deferredData?.items?.map((item) => {
                return (
                  <li key={item.id}>
                    <a
                      data-caption={item.description}
                      data-fancybox
                      href={item.url}>
                      <img
                        alt={item.description}
                        loading="lazy"
                        src={item.url}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </LoadingWrapper>
        </section>
      </main>
      <aside className="right-sidebar" />
    </>
  );
};

export default PhotoList;
