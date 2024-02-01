import { useEffect } from 'react';
import { APP_NAME } from '../../utils/constants';
import PageTitle from '../../components/common/PageTitle/PageTitle';
import useResources from '../../services/hooks/useResources';
import SEO from '../../components/common/SEO/SEO';

export default function ResourcesList() {
  const title = 'Resources';
  const { data, loading, error, fetchData } = useResources();

  useEffect(() => {
    document.title = `${APP_NAME} - ${title}`;
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <SEO title={title} />
      <main className='main-content'>
        <PageTitle title={title} />
        <section className='section'>
          <p>These are some of my favorite resources.</p>
          {/* <LoadingWrapper isLoading={loading} error={error}>
            <Resources data={data} />
          </LoadingWrapper> */}
        </section>
      </main>
      <aside className='right-sidebar'></aside>
    </>
  );
}
