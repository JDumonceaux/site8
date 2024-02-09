import './photoList.css';

import { LoadingWrapper, PageTitle, SEO } from 'components/common';
import { useDeferredValue, useEffect } from 'react';
import usePhotos from 'services/hooks/usePhotos';
import { APP_NAME } from 'utils/constants';

export default function PhotoList(): JSX.Element {
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
      <SEO title={title} />
      <main className="main-content">
        <PageTitle title={title} />
        <section className="section">
          <LoadingWrapper isLoading={loading} error={error}>
            <ul>
              {deferredData?.items?.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={item.url} data-fancybox data-caption={item.description}>
                      <img src={item.url} alt={item.description} loading="lazy" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </LoadingWrapper>
        </section>
      </main>
      <aside className="right-sidebar"></aside>
    </>
  );
}
