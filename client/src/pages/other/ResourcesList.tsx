import { useEffect } from 'react';

import { APP_NAME } from '../../utils/constants';

import PageTitle from '../../components/common/PageTitle/PageTitle';
import TwoColumn from '../Layouts/TwoColumn/TwoColumn';

import LoadingWrapper from '../../components/common/LoadingWrapper';
import useResources from '../../services/hooks/useResources';
import Resources from '../../components/common/Resources';

export default function ResourcesList() {
  const pageTitle = 'Resources';
  const { data, loading, error, fetchData } = useResources();

  useEffect(() => {
    document.title = `${APP_NAME} - ${pageTitle}`;
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <TwoColumn
      pageTitle={<PageTitle title={pageTitle} />}
      left={
        <section className='section'>
          <p>These are some of my favorite resources.</p>
          <LoadingWrapper isLoading={loading} error={error}>
            <Resources data={data} />
          </LoadingWrapper>
        </section>
      }
      right={<div className='right-column'></div>}
    />
  );
}
