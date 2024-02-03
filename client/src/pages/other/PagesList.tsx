import { Link } from 'react-router-dom';
import LoadingWrapper from '../../components/common/Loading/LoadingWrapper';
import PageTitle from '../../components/common/PageTitle/PageTitle';

import SEO from '../../components/common/SEO/SEO';
import { IPages } from '../../services/api/models/pages/IPages';
import useFetch from '../../services/hooks/useFetch';
import { ServiceUrl } from '../../utils';

export default function PagesList() {
  const { data, loading, error } = useFetch<IPages>(
    `${ServiceUrl.ENDPOINT_PAGES}`
  );

  const title = 'Pages';

  const sortedData = data?.items.sort((a, b) =>
    a.short_title.localeCompare(b.short_title)
  );

  return (
    <>
      <SEO title={title} />
      <main className='main-content'>
        <LoadingWrapper error={error} isLoading={loading}>
          <PageTitle title={title} />
          <section className='section'>
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
