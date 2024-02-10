import { LoadingWrapper, PageTitle, Seo } from 'components/common';
import { Resources } from 'components/common/Resources';
import { useDeferredValue, useEffect } from 'react';
import useResources from 'services/hooks/useResources';
import { APP_NAME } from 'utils/constants';

export default function ResourcesList(): JSX.Element {
  const title = 'Resources';
  const { data, error, loading, fetchData } = useResources();
  const deferredData = useDeferredValue(data);

  useEffect(() => {
    document.title = `${APP_NAME} - ${title}`;
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Seo title={title} />
      <main className="main-content">
        <PageTitle title={title} />
        <section className="section">
          <p>These are some of my favorite resources.</p>

          <LoadingWrapper
            isLoading={loading}
            error={error}>
            <Resources data={deferredData} />
          </LoadingWrapper>
        </section>
      </main>
      <aside className="right-sidebar"></aside>
    </>
  );
}
