import { LoadingWrapper } from 'components/common/Loading';
import { PageTitle } from 'components/common/PageTitle';
import { Meta } from 'components/common/Meta';
import { useDeferredValue } from 'react';
import { Link } from 'react-router-dom';
import { Pages } from 'services/types/Pages';
import useFetch from 'services/hooks/useFetch';
import { ServiceUrl } from 'utils';

export const PagesList = (): JSX.Element => {
  const title = 'Pages';
  const { data, isLoading, error } = useFetch<Pages>(
    `${ServiceUrl.ENDPOINT_PAGES}`,
  );
  const deferredData = useDeferredValue(data);

  const sortedData = deferredData?.items.toSorted((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <>
      <Meta title={title} />
      <main className="main-content">
        <LoadingWrapper error={error} isLoading={isLoading}>
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
                    <td>{item.name}</td>
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
};

export default PagesList;
