import { IPage } from 'services/api/models/pages/IPage';

import Resources from '../components/common/Resources';
import SEO from '../components/common/SEO/SEO';
import useFetch from '../services/hooks/useFetch';
import { ServiceUrl } from '../utils';
import LoadingWrapper from '../components/common/Loading/LoadingWrapper';
import PageTitle from '../components/common/PageTitle/PageTitle';

type GenericPageProps = {
  id: number;
  pageTitle: string;
};

export default function GenericPage({ id, pageTitle }: GenericPageProps) {
  const { data, loading, error } = useFetch<IPage>(
    `${ServiceUrl.ENDPOINT_PAGE}/${id}`
  );

  const title = data?.long_title || pageTitle;

  return (
    <>
      <SEO title={title} />
      <main className='main-content'>
        <LoadingWrapper error={error} isLoading={loading}>
          <PageTitle title={title} />
          <section className='section'>
            <div
              dangerouslySetInnerHTML={{
                __html: data?.text ? data.text : '',
              }}
            />
          </section>
        </LoadingWrapper>
        <Resources id={id} />
      </main>
      <aside className='right-sidebar'></aside>
    </>
  );
}
