import { LoadingWrapper } from 'components/common/Loading';
import { PageTitle } from 'components/common/PageTitle';
import { Resources } from 'components/common/Resources';
import { Meta } from 'components/common/Meta';
import { useDeferredValue, useEffect } from 'react';
import useResources from 'services/hooks/useResources';
import { APP_NAME } from 'utils/constants';

export const ResourcesList = (): JSX.Element => {
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
      <Meta title={title} />
      <main className="main-content">
        <PageTitle title={title} />
        <section className="section">
          <p>These are some of my favorite resources.</p>

          <LoadingWrapper error={error} isLoading={loading}>
            <Resources data={deferredData} />
          </LoadingWrapper>
        </section>
      </main>
      <aside className="right-sidebar" />
    </>
  );
};

export default ResourcesList;
