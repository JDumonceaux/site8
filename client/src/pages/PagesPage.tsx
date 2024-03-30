import { LoadingWrapper } from 'components/common/Loading';
import { PageTitle } from 'components/common/PageTitle';
import { Meta } from 'components/common/Meta';
import { useDeferredValue } from 'react';
import { Pages } from 'services/types/Pages';
import useFetch from 'services/hooks/useFetch';
import { ServiceUrl } from 'utils';
import { StyledLink } from 'components/ui/Form/StyledLink';
import { styled } from 'styled-components';

const PagesPage = (): JSX.Element => {
  const { data, isLoading, error } = useFetch<Pages>(
    `${ServiceUrl.ENDPOINT_PAGES}`,
  );
  const deferredData = useDeferredValue(data);

  const sortedData = deferredData?.items
    ? deferredData?.items.toSorted((a, b) => a.name.localeCompare(b.name))
    : undefined;

  return (
    <>
      <Meta title="Pages" />
      <StyledMain>
        <LoadingWrapper error={error} isLoading={isLoading}>
          <PageTitle title="Pages" />
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
                      <StyledLink to={`/admin/page/edit/${item.id}`}>
                        {item.id}
                      </StyledLink>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </LoadingWrapper>
      </StyledMain>
    </>
  );
};

export default PagesPage;

const StyledMain = styled.main`
  background-color: #fff;
  background-size: contain;
`;
