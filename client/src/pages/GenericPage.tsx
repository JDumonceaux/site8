import { ServiceUrl } from 'utils';

import { Resources } from 'components/common/Resources';
import { Suspense, useDeferredValue } from 'react';
import { IPage } from 'services/api/models/pages/IPage';
import useFetch from 'services/hooks/useFetch';
import { PageTitle } from 'components/common/PageTitle';
import { LoadingWrapper } from 'components/common/Loading';
import { SEO } from 'components/common/SEO';

type GenericPageProps = {
  id: number;
  pageTitle: string;
};

export default function GenericPage({
  id,
  pageTitle,
}: GenericPageProps): JSX.Element {
  const { data, isLoading, error } = useFetch<IPage>(
    `${ServiceUrl.ENDPOINT_PAGE}/${id}`,
  );

  const deferredData = useDeferredValue(data);

  const title = deferredData?.long_title || pageTitle;

  return (
    <>
      <SEO title={title} />
      <main className="main-content">
        <LoadingWrapper error={error} isLoading={isLoading}>
          <PageTitle title={title} />
          <time>Fill In</time>
          <section className="section">
            <Suspense fallback="Loading results ...">
              <div
                dangerouslySetInnerHTML={{
                  __html: deferredData?.text ? deferredData.text : '',
                }}
              />
            </Suspense>
          </section>
        </LoadingWrapper>
        <Resources id={id} />
      </main>
      <aside className="right-sidebar"></aside>
    </>
  );
}
