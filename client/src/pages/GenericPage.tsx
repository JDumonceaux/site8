import { useDeferredValue } from 'react';

import LoadingWrapper from '../components/common/Loading/LoadingWrapper';
import PageTitle from '../components/common/PageTitle/PageTitle';
import Resources from '../components/common/Resources';
import SEO from '../components/common/SEO/SEO';
import { IPage } from '../services/api/models/pages/IPage';
import useFetch from '../services/hooks/useFetch';
import { ServiceUrl } from '../utils';

type GenericPageProps = {
  id: number;
  pageTitle: string;
};

export default function GenericPage({ id, pageTitle }: GenericPageProps) {
  const { data, loading, error } = useFetch<IPage>(`${ServiceUrl.ENDPOINT_PAGE}/${id}`);

  const deferredData = useDeferredValue(data);

  const title = deferredData?.long_title || pageTitle;

  return (
    <>
      <SEO title={title} />
      <main className="main-content">
        <LoadingWrapper error={error} isLoading={loading}>
          <PageTitle title={title} />
          <time>Fill In</time>
          <section className="section">
            <div
              dangerouslySetInnerHTML={{
                __html: deferredData?.text ? deferredData.text : '',
              }}
            />
          </section>
        </LoadingWrapper>
        <Resources id={id} />
      </main>
      <aside className="right-sidebar"></aside>
    </>
  );
}
