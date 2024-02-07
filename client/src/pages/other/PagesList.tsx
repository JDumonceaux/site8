import { useDeferredValue } from 'react';
import { Link } from 'react-router-dom';

import { LoadingWrapper, PageTitle, SEO } from '../../components/common';
import { IPages } from '../../services/api/models/pages/IPages';
import useFetch from '../../services/hooks/useFetch';
import { ServiceUrl } from '../../utils';

export default function PagesList(): JSX.Element {
  const { data, loading, error } = useFetch<IPages>(`${ServiceUrl.ENDPOINT_PAGES}`);
  const deferredData = useDeferredValue(data);

  const sortedData = deferredData?.items.toSorted((a, b) =>
    a.short_title.localeCompare(b.short_title),
  );

  const title = 'Pages';

  return (
    <>
      <SEO title={title} />
      <main className="main-content">
        <LoadingWrapper error={error} isLoading={loading}>
          <PageTitle title={title} />
          <section className="section">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Short Title</th>
                  <th>Text</th>
                </tr>
              </thead>
              <tbody>
                {sortedData?.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <Link to={`/admin/page/edit/${item.id}`}>{item.id}</Link>
                    </td>
                    <td>{item.short_title}</td>
                    <td>{item.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </LoadingWrapper>
      </main>
    </>
  );
}
